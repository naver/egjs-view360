/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ReflectionKind } from "typedoc";

export const SIDEBAR_CATEGORY_NAME = {
  Functions: "Function",
  Classes: "Class",
  Interfaces: "Interface",
  "Type Aliases": "Type",
  Variables: "Variables",
  Enumerations: "Enum",
  Events: "Event"
};

export const KIND_NAME = {
  [ReflectionKind.Enum]: "enum",
  [ReflectionKind.Function]: "function",
  [ReflectionKind.Class]: "class",
  [ReflectionKind.Interface]: "interface",
  [ReflectionKind.TypeAlias]: "type",
  [ReflectionKind.Variable]: "const"
};

export const DOC_FRONT_MATTER = `---
custom_edit_url: null
---`;
