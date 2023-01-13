/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { CommentDisplayPart, CommentTag, InlineTagDisplayPart, Reflection } from "typedoc";
import { RenderContext } from "../DocumentRenderer";
import { bindLink, bindLinkByName, camelToTitleCase, getComment } from "../utils";

const TAGS_DUPLICATE = [
  "param",
  "property",
  "version",
  "since",
  "copy",
  "default",
  "eventName",
  "eventOf"
];

export function comment(props: Reflection, ctx: RenderContext) {
  const comment = getComment(props);

  if (!comment?.hasVisibleComponent()) return "";

  const { locales } = ctx;
  const blockTags = comment.blockTags
    .map(commentTag => ({
      name: commentTag.tag.substring(1),
      commentTag
    }))
    .filter(({ name, commentTag }) => {
      return !locales.includes(name)
        && commentTag.content.length > 0
        && !TAGS_DUPLICATE.includes(name);
    });

  return blockTags.map(({ name, commentTag }) => {
    const renderer = blockRenderers[name] ?? defaultRenderer;

    return renderer(commentTag, ctx, name);
  }).join("\n");
}

const blockRenderers: Record<string, (item: CommentTag, ctx: RenderContext, name: string) => string> = {
  see(item, ctx) {
    const text = getLocaleText(item, ctx);

    return `:::tip See\n\n${text}\n\n:::`;
  },
  example(item, ctx) {
    const text = getLocaleText(item, ctx);

    return `:::info Example\n\n${text}\n\n:::`;
  }
};

const defaultRenderer = (item: CommentTag, ctx: RenderContext, name: string) => {
  const text = getLocaleText(item, ctx);

  return `<h4 className="${ctx.classPrefix}-comment-title">${camelToTitleCase(name)}</h4>\n\n${text}`;
};

const isInlineTag = (comment: CommentDisplayPart): comment is InlineTagDisplayPart => {
  return comment.kind === "inline-tag";
};

const getLocaleText = (item: CommentTag, ctx: RenderContext) => {
  const localeTag = ctx.currentLocale != null && item.content.find(content => {
    return isInlineTag(content) && content.tag === `@${ctx.currentLocale}`;
  });

  if (!ctx.currentLocale || !localeTag) {
    const nonLocaleTags = item.content.filter(content => {
      return !isInlineTag(content) || !ctx.locales.includes(content.tag.substring(1));
    });

    return nonLocaleTags
      .map(comment => {
        if (isInlineTag(comment) && comment.target) {
          if (typeof comment.target === "string") {
            return bindLinkByName(comment.target, ctx);
          } else {
            return bindLink(comment.target, ctx);
          }
        } else {
          return bindLinkByName(comment.text, ctx);
        }
      })
      .join("");
  } else {
    return localeTag.text;
  }
};
