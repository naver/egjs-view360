/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import DocumentItem from "./DocumentTemplate";
import { RenderContext } from "../DocumentRenderer";
import { name } from "../utils";

class Header implements DocumentItem {
  public render(item: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    const items: string[] = [];

    items.push(`# ${name(item)}`);

    const versionTag = item.comment?.blockTags.find(comment => comment.tag === "@version" || comment.tag === "@since");
    const source = (item.sources ?? []).filter(source => source.url)[0];
    if (versionTag || source) {
      items.push(`<div className="${ctx.classPrefix}-side">`);

      if (versionTag) {
        const version = versionTag.content.map(({ text }) => text).join("");

        items.push(`<div className="${ctx.classPrefix}-version">Since version ${version}</div>`);
      }
      if (source) {
        items.push(`<div className="${ctx.classPrefix}-main-source">\n\n[source](${source.url!})\n\n</div>`);
      }

      items.push("</div>");
    }

    return items.join("\n");
  }
}

export default Header;
