/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import DocumentItem from "./DocumentTemplate";
import { RenderContext } from "../DocumentRenderer";
import { commentText } from "../utils";

class MainDescription implements DocumentItem {
  public render(item: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    if (item.hasComment()) {
      const text = commentText(item.comment!, ctx);

      return `<div className="${ctx.classPrefix}-subtitle">\n\n${text}\n\n</div>`;
    } else {
      return "";
    }
  }
}

export default MainDescription;
