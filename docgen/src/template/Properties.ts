/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import DocumentItem from "./DocumentTemplate";
import { getReflectionBadges, propertyDescription } from "../utils";
import { RenderContext } from "../DocumentRenderer";
import { comment } from "../partial/comment";
import { source } from "../partial/source";
import { version } from "../partial/version";
import { memberHeader } from "../partial/member.header";

class Properties implements DocumentItem {
  public render(item: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    const { currentItem } = ctx;
    const properties = currentItem.properties;

    if (properties.length <= 0) return null;

    const items: string[] = [
      "## Properties",
      this._renderProperties(properties, ctx)
    ];

    return items.join("\n\n");
  }

  private _renderProperties(properties: TypeDoc.DeclarationReflection[], ctx: RenderContext) {
    return properties.map(property => {
      return this._renderProperty(property, ctx);
    }).join("\n\n");
  }

  private _renderProperty(property: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    const reflection = property.getSignature
      ?? property.setSignature
      ?? property;

    const items = [
      `<div className="${ctx.classPrefix}-header-hidden">`,
      `### ${property.name} {#${property.name}}`,
      "</div>",
      version(reflection, ctx),
      getReflectionBadges(property).join(" "),
      `<div className="${ctx.classPrefix}-entry">`,
      `<details open className="${ctx.classPrefix}-property">`,
      memberHeader(reflection, ctx),
      this._renderDescription(property, ctx),
      comment(reflection, ctx),
      "</details>",
      source(reflection, ctx),
      "</div>"
    ].filter(val => !!val);

    return items.join("\n\n");
  }

  private _renderDescription(property: TypeDoc.DeclarationReflection, ctx: RenderContext): string | null {
    const description = propertyDescription(property, ctx);
    if (!description) return null;

    return `<div className="${ctx.classPrefix}-desc">\n\n${description}\n\n</div>`;
  }
}

export default Properties;
