/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import DocumentItem from "./DocumentTemplate";
import { bindLinkByName, commentText, escape, getComment } from "../utils";
import { RenderContext } from "../DocumentRenderer";
import { renderType } from "../partial/type";
import { source } from "../partial/source";
import { comment } from "../partial/comment";
import { version } from "../partial/version";

class Events implements DocumentItem {
  public render(item: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    const { currentItem } = ctx;
    const events = currentItem.events.map(item => {
      const eventName = item.comment?.blockTags.find(tag => tag.tag === "@eventName");

      return {
        event: item,
        name: eventName?.content.map(({ text }) => text).join("") as string
      };
    }).filter(name => !!name);

    if (events.length <= 0) return null;

    const items: string[] = [
      "## Events",
      this._renderEvents(events, ctx)
    ];

    return items.join("\n\n");
  }

  private _renderEvents(events: Array<{ event: TypeDoc.Reflection, name: string }>, ctx: RenderContext) {
    return events.map(({ name, event }) => {
      const items = [
        `<div className="${ctx.classPrefix}-header-hidden">`,
        `### ${name} {#event-${name}}`,
        "</div>",
        `<div className="${ctx.classPrefix}-entry">`,
        version(event, ctx),
        `<details open className="${ctx.classPrefix}-event">`,
        this._renderHeader(event, name, ctx),
        this._renderDescription(event, ctx),
        comment(event, ctx),
        "</details>",
        source(event, ctx),
        "</div>"
      ].filter(val => !!val);

      return items.join("\n\n");
    }).join("\n\n");
  }

  private _renderHeader(event: TypeDoc.Reflection, name: string, ctx: RenderContext) {
    const typeName = (event as TypeDoc.DeclarationReflection).type
      ? renderType((event as TypeDoc.DeclarationReflection).type, ctx)
      : bindLinkByName(event.name, ctx);

    return [
      `<summary className="${ctx.classPrefix}-member">`,
      `<span className="${ctx.classPrefix}-name">${name}</span>`,
      `<span className="${ctx.classPrefix}-type">`,
      escape(typeName.replace(/\n/g, " ").replace(/\s{2,}/, " ")),
      "</span>",
      "</summary>"
    ].join("\n\n");
  }

  private _renderDescription(event: TypeDoc.Reflection | undefined, ctx: RenderContext) {
    const comment = getComment(event);
    if (!comment) return null;

    const text = commentText(comment, ctx);

    return `<div className="${ctx.classPrefix}-desc">\n\n${text}\n\n</div>`;
  }
}

export default Events;
