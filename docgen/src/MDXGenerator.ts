/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import fs from "fs-extra";
import path from "path";
import * as TypeDoc from "typedoc";
import { ProgramOptions } from "./CLICommand";
import { SIDEBAR_CATEGORY_NAME } from "./const";
import DocumentRenderer from "./DocumentRenderer";
import { getComment, name } from "./utils";

export interface DocumentItem {
  url: string;
  item: TypeDoc.DeclarationReflection;
  categoryName: string | null;
  group: TypeDoc.ReflectionGroup;
  properties: TypeDoc.DeclarationReflection[];
  methods: TypeDoc.DeclarationReflection[];
  events: TypeDoc.Reflection[];
}
export type DocumentItems = Record<string, DocumentItem>;

class MDXGenerator {
  private _items: DocumentItems;
  private _template: DocumentRenderer;
  private _outDir: string;
  private _locales: string[];
  private _localesDir?: string;

  public constructor(project: TypeDoc.ProjectReflection, {
    outDir,
    locales = [],
    localesDir
  }: ProgramOptions) {
    if (!outDir) {
      throw new Error("error: required option '-o, --outDir <path>', or '-c, --config <path>' not specified");
    }

    this._items = this._createDocumentItemsRef(project);
    this._template = new DocumentRenderer();
    this._locales = locales;
    this._outDir = path.resolve(process.cwd(), outDir);
    this._localesDir = localesDir;

    const itemsArr = Object.values(this._items).map(({ item }) => item);
    this._bindEventsAsChildren(this._items, itemsArr);
    this._bindInheritedEvents(this._items);
    this._bindCopiedChildren(this._items);

    fs.rmSync(outDir, { recursive: true, force: true });
    fs.ensureDirSync(outDir);
  }

  public async writeDocuments() {
    const items = Object.values(this._items);

    items.forEach(item => this._sortItemChildren(item));

    items.forEach(async ({ item, group, categoryName }) => {
      await this.writeDocument({
        item,
        group: group.title,
        category: categoryName,
        locale: null,
        rootDir: this._outDir
      });
    });

    const locales = this._locales;
    const localesDir = this._localesDir;

    if (locales.length > 0 && localesDir) {
      locales.forEach(locale => {
        const localeOutDir = path.resolve(localesDir.replace(/{locale}/g, locale));
        fs.rmSync(localeOutDir, { recursive: true, force: true });
        fs.ensureDirSync(localeOutDir);

        items.forEach(async ({ item, group, categoryName }) => {
          await this.writeDocument({
            item,
            group: group.title,
            category: categoryName,
            locale,
            rootDir: localeOutDir
          });
        });
      });
    }

    console.log("Done");
  }

  public async writeDocument({
    item,
    group,
    category,
    locale,
    rootDir
  }: {
    item: TypeDoc.DeclarationReflection,
    group: string;
    category: string | null;
    locale: string | null;
    rootDir: string;
  }) {
    const paths = [rootDir];

    if (category) {
      paths.push(category);
    }

    paths.push(SIDEBAR_CATEGORY_NAME[group] ?? group);

    const dirPath = path.join(...paths);
    const filePath = path.resolve(dirPath, `${name(item)}.mdx`);

    // Write main document
    fs.ensureDirSync(dirPath);
    fs.writeFileSync(filePath, this._template.render(item, {
      classPrefix: "doc",
      locales: this._locales,
      currentLocale: locale,
      currentItem: this._items[name(item)],
      items: this._items
    }));
  }

  private _createDocumentItemsRef(project: TypeDoc.ProjectReflection) {
    const groups = project.groups ?? [];
    const items: DocumentItems = {};

    groups.forEach(group => {
      const groupName = SIDEBAR_CATEGORY_NAME[group.title] ?? group.title;

      if (group.categories) {
        group.categories.forEach(category => {
          const categoryName = category.title !== "Other" ? category.title : null;

          category.children
            .forEach(item => {
              items[name(item)] = {
                item,
                url: categoryName
                  ? `${categoryName}/${groupName}/${name(item)}`
                  : `${groupName}/${name(item)}`,
                categoryName,
                group,
                ...this._getSubItems(item)
              };
            });
        });
      } else {
        group.children
          .forEach(item => {
            items[name(item)] = {
              item,
              url: `${groupName}/${name(item)}`,
              categoryName: null,
              group,
              ...this._getSubItems(item)
            };
          });
      }
    });

    return items;
  }

  private _getSubItems(item: TypeDoc.DeclarationReflection) {
    const properties: TypeDoc.DeclarationReflection[] = [];
    const methods: TypeDoc.DeclarationReflection[] = [];
    const events: TypeDoc.DeclarationReflection[] = [];

    if (item.kind !== TypeDoc.ReflectionKind.Variable) {
      const children = item.children ?? [];

      children
        .filter(child => {
          const comment = getComment(child);

          if (child.flags.isStatic && child.inheritedFrom) return false;
          if (
            comment && comment.blockTags
            && (comment.blockTags.find(tag => tag.tag === "@hidden") || comment.blockTags.find(tag => tag.tag === "@ignore"))
          ) return false;

          return true;
        })
        .forEach(child => {
          switch (child.kind) {
            case TypeDoc.ReflectionKind.Property:
            case TypeDoc.ReflectionKind.Accessor:
              properties.push(child);
              break;
            case TypeDoc.ReflectionKind.Method:
              methods.push(child);
              break;
          }
        });
    } else {
      const type = item.type;
      if (type instanceof TypeDoc.ReflectionType) {
        const children = type.declaration.children ?? [];
        properties.push(
          ...children
        );
      }
    }

    return {
      properties,
      methods,
      events
    };
  }

  private _bindEventsAsChildren(itemsMap: DocumentItems, items: TypeDoc.DeclarationReflection[]) {
    items.forEach(item => {
      this._addEventOwner(itemsMap, item);

      /**
       * Get events defined in extended type args
       * @example
       * ```ts
       * class Camera extends Component<{
       *  /**
       *   * An event that fires when camera's matrix changes
       *   * @eventName change
       *   * @eventOf Camera
       *   * @version 4.0.0
       *   *\/
       *  [CAMERA_EVENTS.CHANGE]: void;
       *  /**
       *   * An event that fires when camera's animation stops
       *   * @eventName animationEnd
       *   * @eventOf Camera
       *   * @version 4.0.0
       *   *\/
       *  [CAMERA_EVENTS.ANIMATION_END]: {
       *    animation: CameraAnimation
       *  };
       * }>
       * ```
       */
      if (item.extendedTypes) {
        item.extendedTypes.forEach(extended => {
          if (extended.type !== "reference") return;

          const typeArgs = extended.typeArguments;
          if (!typeArgs) return;

          typeArgs.forEach(type => {
            if (type.type !== "reflection") return;

            type.declaration.children?.forEach(child => {
              this._addEventOwner(itemsMap, child);
            });
          });
        });
      }
    });

    Object.values(itemsMap).forEach(item => {
      item.properties.forEach(prop => {
        this._addEventOwner(itemsMap, prop);
      });
    });
  }

  private _bindInheritedEvents(itemsMap: DocumentItems) {
    const items = Object.values(itemsMap);
    items.forEach(({ item, events }) => {
      const extended = item.extendedTypes;

      if (extended) {
        extended.forEach(parent => {
          if (parent.type !== "reference") return;

          const parentItem = itemsMap[parent.name];
          const parentEvents = parentItem ? parentItem.events : null;
          if (parentEvents) {
            events.push(...parentEvents);
            events.sort((a, b) => a.name.localeCompare(b.name));
          }
        });
      }
    });
  }

  private _bindCopiedChildren(itemsMap: DocumentItems) {
    const items = Object.values(itemsMap);
    items.forEach(({ item, properties, methods, events }) => {
      [[item], properties, methods, events].forEach(category => {
        category.forEach(child => {
          const copied = this._getCopiedReflection(child, itemsMap);
          if (!copied) return;

          const comment = getComment(copied);
          if (!comment) return;

          child.comment = comment;
        });
      });
    });
  }

  private _addEventOwner(itemsMap: DocumentItems, item: TypeDoc.Reflection) {
    if (!item.comment) return null;

    const eventOf = item.comment.blockTags.find(tag => tag.tag === "@eventOf");
    if (!eventOf) return null;

    const ownerName = eventOf.content.map(({ text }) => text).join("");
    const owner = itemsMap[ownerName];
    if (!owner) return null;

    owner.events.push(item);
  }

  private _getCopiedReflection = (reflection: TypeDoc.Reflection, itemsMap: DocumentItems) => {
    const comment = getComment(reflection);
    const copyTag = comment?.blockTags.find(tag => tag.tag === "@copy");

    if (!copyTag) return null;

    const copied = copyTag.content.map(content => content.text).join("").split("#");
    const owner = itemsMap[copied[0]];
    const childName: string | undefined = copied[1];

    if (!owner) {
      const source = (reflection.sources ?? [])[0];
      const srcPath = source
        ? `${source.fullFileName}:${source.line}:${source.character}`
        : "?";

      throw new Error(`Couldn't find copied item: ${copied[0]} at (${srcPath})`);
    }

    if (childName) {
      const items = [owner.properties, owner.methods, owner.events];

      for (const category of items) {
        for (const child of category) {
          if (child.name === childName) return child as TypeDoc.DeclarationReflection;
        }
      }

      const source = (reflection.sources ?? [])[0];
      const srcPath = source
        ? `${source.fullFileName}:${source.line}:${source.character}`
        : "?";

      throw new Error(`Couldn't find copied item: ${copied[0]}#${copied[1]} at (${srcPath})`);
    } else {
      return owner.item;
    }
  };

  private _sortItemChildren(item: DocumentItem) {
    const { properties, methods } = item;

    this._sortChildrenByWeight(properties);
    this._sortChildrenByWeight(methods);
  }

  private _sortChildrenByWeight(items: TypeDoc.DeclarationReflection[]) {
    items.sort((a, b) => {
      let weightA = 0;
      let weightB = 0;

      if (a.flags.isStatic) weightA -= 1;
      if (b.flags.isStatic) weightB -= 1;

      return weightA - weightB;
    });
  }
}

export default MDXGenerator;
