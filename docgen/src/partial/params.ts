/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ParameterReflection, ReflectionType, SignatureReflection } from "typedoc";
import { RenderContext } from "../DocumentRenderer";
import { commentInlineText, escape } from "../utils";
import { renderType } from "../partial/type";

export function params(signature: SignatureReflection, ctx: RenderContext) {
  if (!signature.parameters || signature.parameters.length <= 0) return null;

  const parameters = signature.parameters;

  return `<h4>Parameters</h4>\n\n${renderParams(parameters, ctx)}`;
}

const renderParams = (parameters: ParameterReflection[], ctx: RenderContext) => {
  const { classPrefix } = ctx;

  const params = parameters.map(param => {
    const items: string[] = [
      `<div className="${classPrefix}-param">`,
      `<div className="${classPrefix}-param-header">`,
      `<span className="${classPrefix}-name">${param.name}</span>`,
      `<div className="${classPrefix}-type">`,
      escape(renderType(param.type, ctx, { simplify: true })),
      "</div>"
    ];

    if (param.defaultValue) {
      items.push(`<div className="${classPrefix}-default" title="Default Value">`);
      items.push(`${param.defaultValue}`);
      items.push("</div>");
    }

    items.push("</div>");

    if (param.type instanceof ReflectionType) {
      const children = param.type.declaration.children;
      if (children) {
        children.forEach(child => {
          items.push(
            `<div className="${classPrefix}-sub-param">`,
            `<span className="${classPrefix}-name">${param.name}.${child.name}</span>`,
            `<div className="${classPrefix}-type">`,
            escape(renderType(child.type, ctx, { simplify: true })),
            "</div>"
          );

          if (child.defaultValue) {
            items.push(`<div className="${classPrefix}-default" title="Default Value">`);
            items.push(`${child.defaultValue}`);
            items.push("</div>");
          }

          if (child.hasComment()) {
            items.push(`<div className="${classPrefix}-desc">`);
            items.push(commentInlineText(child.comment!, ctx));
            items.push("</div>");
          }

          items.push("</div>");
        });
      }
    }

    if (param.hasComment()) {
      items.push(`<div className="${classPrefix}-desc">`);
      items.push(commentInlineText(param.comment!, ctx));
      items.push("</div>");
    }

    items.push("</div>");

    return items.join("\n\n");
  }).join("\n\n");

  return params;
};
