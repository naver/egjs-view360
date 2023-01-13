/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { SignatureReflection } from "typedoc";
import { RenderContext } from "../DocumentRenderer";
import { block } from "../utils";
import { memberSignatureTitle } from "./member.signature.title";

export function declaration(signature: SignatureReflection, ctx: RenderContext) {
  const desc = memberSignatureTitle(signature, {
    ...ctx,
    includeLink: false,
    simplify: true
  });

  return block(desc, "ts");
}
