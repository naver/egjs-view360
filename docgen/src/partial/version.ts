/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Reflection } from "typedoc";
import { RenderContext } from "../DocumentRenderer";

export function version(item: Reflection, ctx: RenderContext) {
  if (!item.hasComment()) return null;

  const blockTags = item.comment!.blockTags;
  const versionTag = blockTags.find(comment => {
    return comment.tag === "@version" || comment.tag === "@since";
  });

  if (!versionTag) return null;

  const version = versionTag.content.map(({ text }) => text).join("");

  // Take only 1 source url
  return `<div className="${ctx.classPrefix}-entry-version" title="Supported Version">\n>=${version}\n\n</div>`;
}
