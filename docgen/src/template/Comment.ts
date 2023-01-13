/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import DocumentItem from "./DocumentTemplate";
import { comment } from "../partial/comment";
import { RenderContext } from "../DocumentRenderer";

class Comment implements DocumentItem {
  public render(item: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    const items: string[] = [];

    if (item.hasComment()) {
      items.push(comment(item, ctx));
    }

    return items.join("\n");
  }
}

export default Comment;
