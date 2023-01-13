/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import DocumentItem from "./DocumentTemplate";
import { commentText, escape, getComment, getReflectionBadges } from "../utils";
import { RenderContext } from "../DocumentRenderer";
import { renderType } from "../partial/type";
import { declaration } from "../partial/declaration";
import { comment } from "../partial/comment";
import { params } from "../partial/params";
import { source } from "../partial/source";
import { version } from "../partial/version";

class Methods implements DocumentItem {
  public render(item: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    const { currentItem } = ctx;
    const methods = currentItem.methods;

    if (methods.length <= 0) return null;

    const items: string[] = [
      "## Methods",
      this._renderMethods(methods, ctx)
    ];

    return items.join("\n\n");
  }

  private _renderMethods(methods: TypeDoc.DeclarationReflection[], ctx: RenderContext) {
    return methods.map(method => {
      const signatures = method.signatures ?? [];
      const signature = signatures[signatures.length - 1];

      const items = [
        `<div className="${ctx.classPrefix}-header-hidden">`,
        `### ${method.name} {#${method.name}}`,
        "</div>",
        version(signature, ctx),
        getReflectionBadges(method).join(" "),
        `<div className="${ctx.classPrefix}-entry">`,
        `<details open className="${ctx.classPrefix}-method">`,
        this._renderHeader(method, ctx),
        declaration(signature, ctx),
        this._renderDescription(signature, ctx),
        params(signature, ctx),
        comment(signature, ctx),
        "</details>",
        source(signature, ctx),
        "</div>"
      ].filter(val => !!val);

      return items.join("\n\n");
    }).join("\n\n");
  }

  private _renderHeader(method: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    const signatures = method.signatures;
    const returnType = signatures
      ? signatures[signatures.length - 1].type
      : undefined;

    return [
      `<summary className="${ctx.classPrefix}-member">`,
      `<span className="${ctx.classPrefix}-name">${method.name}</span>`,
      `<span className="${ctx.classPrefix}-type">`,
      escape(renderType(returnType, ctx).replace(/\n/g, " ").replace(/\s{2,}/, " ")),
      "</span>",
      "</summary>"
    ].join("\n\n");
  }

  private _renderDescription(signature: TypeDoc.SignatureReflection | undefined, ctx: RenderContext) {
    const comment = getComment(signature);
    if (!comment) return null;

    const text = commentText(comment, ctx);

    return `<div className="${ctx.classPrefix}-desc">\n\n${text}\n\n</div>`;
  }
}

export default Methods;
