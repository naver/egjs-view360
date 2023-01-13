/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import path from "path";
import * as TypeDoc from "typedoc";
import escapeHTML from "escape-html";
import { RenderContext } from "./DocumentRenderer";
import * as badge from "./partial/badge";

export const block = (word: string, lang = "") => `\`\`\`${lang}\n${word}\n\`\`\``;

export const hasTypeParameters = (
  reflection: TypeDoc.Reflection
): reflection is TypeDoc.Reflection & { typeParameters: TypeDoc.TypeParameterReflection[] } => {
  return (
    (reflection instanceof TypeDoc.DeclarationReflection || reflection instanceof TypeDoc.SignatureReflection) &&
    reflection.typeParameters != null &&
    reflection.typeParameters.length > 0
  );
};

export const stringify = (data: unknown) => {
  if (typeof data === "bigint") {
      return data.toString() + "n";
  }
  return JSON.stringify(data);
};

export const renderTypeParametersSignature = (
  typeParameters?: readonly TypeDoc.TypeParameterReflection[]
): string | null => {
  if (!typeParameters || typeParameters.length <= 0) return null;

  return `<${typeParameters.map(item => `${item.varianceModifier ? `${item.varianceModifier} ` : ""}${name(item)}`)}>`;
};

export const camelToTitleCase = (text: string) => {
  return text.substring(0, 1).toUpperCase() + text.substring(1).replace(/[a-z][A-Z]/g, (x) => `${x[0]} ${x[1]}`);
};

export const bindLink = (item: TypeDoc.Reflection, ctx: RenderContext, displayName?: string) => {
  return bindLinkByName(name(item), ctx, displayName);
};

export const bindLinkByName = (name: string, ctx: RenderContext, displayName?: string) => {
  const currentPath = path.resolve(ctx.currentItem.url, "..");
  const hasSubItem = /^[^#]+#[^#]+$/;

  let itemName: string = name;
  let subName: string = "";
  displayName = displayName ?? name;

  if (hasSubItem.test(name)) {
    const splitted = name.split("#");
    itemName = splitted[0];
    subName = `#${splitted[1]}`;
  }

  const url = ctx.items[itemName]?.url;

  if (url) {
    const relPath = path.relative(currentPath, url);

    return `[${displayName}](${relPath}${subName})`;
  } else {
    return displayName;
  }
};

export const hashLink = (name: string, id: string) => `<a href="#${id}">${name}</a>`;

export const commentText = (comment: TypeDoc.Comment, ctx: RenderContext) => {
  const blockTags = comment.blockTags;
  const localeTag = ctx.currentLocale
    ? blockTags.find(tag => tag.tag === `@${ctx.currentLocale}`)
    : null;

  const descs = localeTag
    ? localeTag.content
    : comment.summary;

  return commentDisplayText(descs, ctx);
};

export const commentInlineText = (comment: TypeDoc.Comment, ctx: RenderContext) => {
  const descs = comment.summary;
  const currentLocale = ctx.currentLocale;
  const locales = ctx.locales;

  const localeDescs = descs.filter(tag => {
    if (currentLocale) {
      return tag.kind === "inline-tag"
        && (tag as TypeDoc.InlineTagDisplayPart).tag === `@${currentLocale}`;
    } else {
      return tag.kind !== "inline-tag"
        || !locales.includes((tag as TypeDoc.InlineTagDisplayPart).tag.substring(1));
    }
  });

  if (currentLocale) {
    // Locales tags can't have additional inline tags like @link at the moment.
    return localeDescs.map(tag => tag.text).join("");
  } else {
    return commentDisplayText(localeDescs, ctx);
  }
};

export const commentDisplayText = (content: TypeDoc.CommentDisplayPart[], ctx: RenderContext) => {
  return content.map((desc) => {
    if (desc.kind === "inline-tag") {
      if (desc.target) {
        const targetName = typeof desc.target === "string"
          ? desc.target
          : name(desc.target);

        return bindLinkByName(targetName, ctx, desc.text);
      } else {
        const separator = desc.text.includes("|") ? "|" : " ";
        const link = desc.text.split(separator);

        return bindLinkByName(link[0], ctx, link[1]);
      }
    } else {
      return desc.text;
    }
  }).join("");
};

export const escape = (text: string) => {
  return escapeHTML(text).replace(/ /g, "&nbsp;");
};

export const getComment = (reflection?: TypeDoc.Reflection) => {
  if (!reflection) return null;

  if (reflection.comment) {
    return reflection.comment;
  }

  if (reflection.kind === TypeDoc.ReflectionKind.Accessor) {
    const prop = reflection as TypeDoc.DeclarationReflection;

    if (prop.getSignature && prop.getSignature.hasComment()) return prop.getSignature.comment!;
    if (prop.setSignature && prop.setSignature.hasComment()) return prop.setSignature.comment!;
  }

  if (reflection.kind === TypeDoc.ReflectionKind.Method) {
    const signatures = (reflection as TypeDoc.DeclarationReflection).signatures ?? [];
    const signature = signatures[signatures.length - 1];

    if (signature && signature.hasComment()) return signature.comment;
  }

  return null;
};

export const propertyDescription = (property: TypeDoc.DeclarationReflection, ctx: RenderContext) => {
  const comment = getComment(property);

  return comment ? commentText(comment, ctx) : null;
};

export const name = (item: TypeDoc.Reflection) => {
  return (item as any).escapedName ?? item.name;
};

export const getReflectionBadges = (member: TypeDoc.Reflection): string[] => {
  const badges: string[] = [];

  if (member.flags.isProtected) {
    badges.push(badge.warning("protected"));
  }

  if (member.flags.isPrivate) {
    badges.push(badge.danger("private"));
  }

  if (member.flags.isAbstract) {
    badges.push(badge.secondary("abstract"));
  }

  if (member.flags.isStatic) {
    badges.push(badge.info("static"));
  }

  const hasOnlyGetter = member.hasGetterOrSetter() && !(member as TypeDoc.DeclarationReflection).setSignature;
  if (member.flags.isReadonly || hasOnlyGetter) {
    badges.push(badge.success("readonly"));
  }

  if ((member as TypeDoc.DeclarationReflection).inheritedFrom) {
    badges.push(badge.primary("inherited"));
  }

  return badges;
};
