/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "../core/Camera";
import Renderer from "../renderer/Renderer";
import { CONTROL_EVENTS } from "../const/internal";

export interface Renderable {
  render(renderer: Renderer, camera: Camera): void;
}

export interface PanInputEvents {
  [CONTROL_EVENTS.HOLD]: void;
  [CONTROL_EVENTS.CHANGE]: {
    x: number;
    y: number;
  };
  [CONTROL_EVENTS.RELEASE]: void;
}

export interface ZoomInputEvents {
  [CONTROL_EVENTS.CHANGE]: number;
}
