/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { DeclarationReflection, ReferenceType } from "typedoc";
import { RenderContext } from "../DocumentRenderer";
import { renderType } from "../partial/type";
import { escape } from "../utils";
import DocumentItem from "./DocumentTemplate";

class Inheritance implements DocumentItem {
  public render(item: DeclarationReflection, ctx: RenderContext) {
    const items: string[] = [];

    const extended = (item.extendedTypes ?? [])
      .filter(type => type.type === "reference")
      .map(type => type as ReferenceType);

    const implemented = (item.implementedTypes ?? [])
      .filter(type => type.type === "reference")
      .map(type => type as ReferenceType);

    if (extended.length > 0) {
      items.push(
        "<h3>Extends</h3>",
        ...extended.map(type => `- ${escape(renderType(type, ctx))}`)
      );
    }

    if (implemented.length > 0) {
      items.push(
        "<h3>Implements</h3>",
        ...implemented.map(type => `- ${escape(renderType(type, ctx))}`)
      );
    }

    return items.join("\n\n");
  }
}

export default Inheritance;
