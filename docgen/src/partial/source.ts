/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Reflection } from "typedoc";
import { RenderContext } from "../DocumentRenderer";

export function source(item: Reflection, ctx: RenderContext) {
  if (!item.sources) return null;

  const sources = item.sources.filter(source => source.url);

  if (sources.length <= 0) return null;

  // Take only 1 source url
  return `<div className="${ctx.classPrefix}-source">\n\n[source](${sources[0].url!})\n\n</div>`;
}
