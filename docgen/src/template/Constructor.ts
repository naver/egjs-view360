/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import DocumentItem from "./DocumentTemplate";
import { RenderContext } from "../DocumentRenderer";
import { ReflectionKind } from "typedoc";
import { commentText } from "../utils";
import { params } from "../partial/params";
import { declaration } from "../partial/declaration";
import { comment } from "../partial/comment";

class Constructor implements DocumentItem {
  public render(item: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    const constructor = item.children?.find(child => child.kind === ReflectionKind.Constructor);
    if (!constructor) return null;

    const signatures = constructor.signatures ?? [];
    const signature = signatures[signatures.length - 1];
    if (!signature) return null;

    const items = [
      "## Constructor",
      this._renderDescription(signature, ctx),
      declaration(signature, ctx),
      params(signature, ctx),
      comment(signature, ctx)
    ].filter(val => !!val);

    return items.join("\n\n");
  }

  private _renderDescription(signature: TypeDoc.SignatureReflection, ctx: RenderContext) {
    if (!signature.hasComment()) return null;

    const text = commentText(signature.comment!, ctx);

    return `<div className="${ctx.classPrefix}-member-subtitle">${text}</div>`;
  }
}

export default Constructor;
