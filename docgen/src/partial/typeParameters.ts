/**
 * "typeParameters.tsx", Adapted and modified from TypeDoc's default theme licensed under Apache License 2.0
 * https://github.com/TypeStrong/typedoc/blob/8a3e195d3814b6cf54f036fa528ad3a804678d1a/src/lib/output/themes/default/partials/typeParameters.tsx
 * @see https://github.com/TypeStrong/typedoc/blob/master/LICENSE
 */
import { TypeParameterReflection } from "typedoc";
import { RenderContext } from "../DocumentRenderer";
import { renderType } from "./type";

export function typeParameters(typeParameters: TypeParameterReflection[], ctx: RenderContext, includeLink: boolean = true) {
  const params = typeParameters.map(item => {
    const varianceModifier = item.varianceModifier ?? "";
    const extended = item.type ? ` extends ${renderType(item.type, ctx, { includeLink })}` : "";
    const defaultVal = item.default ? ` = ${renderType(item.default, ctx, { includeLink })}` : "";

    return `${varianceModifier}${item.name}${extended}${defaultVal}`;
  }).join(", ");

  return `${params}`;
}
