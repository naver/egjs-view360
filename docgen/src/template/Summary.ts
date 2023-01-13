/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { DeclarationReflection, Reflection } from "typedoc";
import { RenderContext } from "../DocumentRenderer";
import { commentText, getComment, hashLink } from "../utils";
import DocumentItem from "./DocumentTemplate";

class Summary implements DocumentItem {
  public render(item: DeclarationReflection, ctx: RenderContext) {
    const {
      properties,
      methods,
      events
    } = ctx.currentItem;

    const eventArr = events.map(item => {
      const eventName = item.comment?.blockTags.find(tag => tag.tag === "@eventName");

      return {
        ...item,
        name: eventName?.content.map(({ text }) => text).join("") as string
      };
    }).filter(name => !!name) as DeclarationReflection[];

    const entries = [{
      name: "Properties",
      arr: properties,
      descs: properties.map(property => this._summaryComment(property, ctx))
    }, {
      name: "Methods",
      arr: methods,
      descs: methods.map(method => {
        const signatures = method.signatures;
        const signature = signatures
          ? signatures[signatures.length - 1]
          : undefined;

        return this._summaryComment(signature, ctx);
      })
    }, {
      name: "Events",
      arr: eventArr,
      descs: eventArr.map(event => {
        return event.comment ? commentText(event.comment, ctx) : null;
      })
    }].filter(({ arr }) => arr.length > 0);
    if (entries.length <= 0) return null;

    return entries.map(({ name, arr, descs }) => {
      const items = [
        `<div className="${ctx.classPrefix}-summary ${ctx.classPrefix}-${name.toLowerCase()}">`,
        `<h3 className="${ctx.classPrefix}-summary-title">${name}</h3>`,
        arr.map((entry, idx) => this._renderColumn(name, entry, descs[idx], ctx)).join("\n"),
        "</div>"
      ];

      return items.join("\n");
    }).join("\n");
  }

  private _renderColumn(category: string, entry: DeclarationReflection, desc: string | null, ctx: RenderContext) {
    const classPrefix = ctx.classPrefix;

    const linkedName = category === "Events"
      ? hashLink(entry.name, `event-${entry.name}`)
      : hashLink(entry.name, entry.name);

    return [
      `<div className="${classPrefix}-summary-item">`,
      `<div className="${classPrefix}-summary-name">${linkedName}</div>`,
      `<div className="${classPrefix}-summary-desc">${desc ? `\n\n${desc}\n\n` : ""}</div>`,
      "</div>"
    ].join("\n");
  }

  private _summaryComment(member: Reflection | undefined, ctx: RenderContext) {
    if (!member) return null;

    const comment = getComment(member);
    if (!comment) return null;

    return commentText(comment, ctx);
  }
}

export default Summary;
