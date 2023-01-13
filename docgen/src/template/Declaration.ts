/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import DocumentItem from "./DocumentTemplate";
import { KIND_NAME } from "../const";
import { block, hasTypeParameters, name } from "../utils";
import { typeParameters } from "../partial/typeParameters";
import { RenderContext } from "../DocumentRenderer";
import { renderType } from "../partial/type";

class Declaration implements DocumentItem {
  public render(item: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    const header = [
      this._kindName(item),
      this._itemName(item, ctx)
    ];

    if (item.extendedTypes) {
      header.push(this._extendedType(item.extendedTypes, ctx));
    }

    if (item.implementedTypes) {
      header.push(this._implementedType(item.implementedTypes, ctx));
    }

    if (item.defaultValue) {
      header.push(`: ${renderType(item.type, ctx, { includeLink: false })}`);
    }

    return block(header.filter(val => !!val).join(""), "ts");
  }

  private _kindName(item: TypeDoc.DeclarationReflection) {
    if (item.kind === TypeDoc.ReflectionKind.Project) return null;
    const kindString = KIND_NAME[item.kind] ?? item.kindString ?? "";
    const abstract = item.flags.isAbstract ? "abstract " : "";

    return `${abstract}${kindString}`;
  }

  private _itemName(item: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    if (hasTypeParameters(item)) {
      return ` ${name(item)}<${typeParameters(item.typeParameters, ctx)}>`;
    } else {
      return ` ${name(item)}`;
    }
  }

  private _extendedType(parents: TypeDoc.SomeType[], ctx: RenderContext) {
    if (!parents.length) return null;

    return ` extends ${parents.map(item => renderType(item, ctx, { includeLink: false })).join(", ")}`;
  }

  private _implementedType(parents: TypeDoc.SomeType[], ctx: RenderContext) {
    if (!parents.length) return null;

    return ` implements ${parents.map(item => renderType(item, ctx, { includeLink: false })).join(", ")}`;
  }
}

export default Declaration;
