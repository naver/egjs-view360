import fs from "fs-extra";
import path from "path";
import typedocConfig from "../typedoc.json";
import { KIND_CLASS, KIND_NAME_REMAPPED, KIND_PROPERTY } from "./const";

import Identifier from "./Identifier";
import print from "./print";

const src = fs.readJsonSync(typedocConfig.json);
const apiRootDir = path.resolve(__dirname, "../demo/docs/api");
const apiDirByType = {
  [KIND_NAME_REMAPPED[KIND_CLASS]]: path.resolve(apiRootDir, "./Class"),
  // TODO:
} as const;
const parsed: {[key in keyof typeof apiDirByType]: Identifier[]} = {
  [KIND_NAME_REMAPPED[KIND_CLASS]]: []
};

fs.removeSync(apiRootDir);

Object.values(apiDirByType).forEach(dir => {
  fs.ensureDirSync(path.resolve(process.cwd(), dir));
});

const parse = (child: Record<string, any>) => {
  if (KIND_NAME_REMAPPED[child.kind] in parsed) {
    const groups = child.groups;
    const properties = (groups.find(group => group.kind === KIND_PROPERTY)?.children ?? [])
      .map(id => child.children.find(entity => entity.id === id))
      .map(entity => ({
        name: entity.name,
        type: entity.type,
        defaultValue: entity.defaultValue,
        comment: entity.comment?.shortText ?? ""
      }));

    parsed[KIND_NAME_REMAPPED[child.kind]].push(new Identifier({
      kind: child.kind,
      name: child.name,
      comment: child.comment?.shortText ?? "",
      sources: child.sources,
      extends: child.extendedTypes ?? [],
      implements: child.implementedTypes ?? [],
      properties
    }));
  }
};

src.children.forEach(child => parse(child));

Object.keys(parsed).forEach(type => {
  parsed[type].forEach((data: Identifier) => {
    fs.writeFileSync(`${apiDirByType[type]}/${data.name}.mdx`, print(data));
  });
});
