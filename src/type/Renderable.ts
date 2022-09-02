/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "../core/Camera";
import Renderer from "../renderer/Renderer";

interface Renderable {
  render(renderer: Renderer, camera: Camera): void;
}

export default Renderable;
