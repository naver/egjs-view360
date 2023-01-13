/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import DocumentItem from "./DocumentTemplate";
import { RenderContext } from "../DocumentRenderer";

class VersionInfo implements DocumentItem {
  public render(item: TypeDoc.DeclarationReflection, { classPrefix }: RenderContext) {
    if (!item.hasComment()) return null;
    if (!item.comment!.hasVisibleComponent()) return null;

    const versionTag = item.comment!.blockTags.find(comment => comment.tag === "@version" || comment.tag === "@since");
    if (!versionTag) return null;

    const text = versionTag.content.map(({ text }) => text).join("");

    return `<div className="${classPrefix}-version">Since version ${text}</div>`;
  }
}

export default VersionInfo;
