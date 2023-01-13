/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import { RenderContext } from "../DocumentRenderer";

interface DocumentPartial {
  render(item: TypeDoc.Reflection, ctx: RenderContext): string | null;
}

export default DocumentPartial;
