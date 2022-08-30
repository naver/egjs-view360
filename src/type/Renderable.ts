/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Renderer } from "../renderer";

interface Renderable {
  render(renderer: Renderer): void;
}

export default Renderable;
