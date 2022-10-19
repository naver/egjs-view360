/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "../core/Camera";
import Renderer from "../renderer/Renderer";
import Uniform from "../uniform/Uniform";
import UniformMatrix from "../uniform/UniformMatrix";
import { CONTROL_EVENTS } from "../const/internal";

export interface Renderable {
  render(renderer: Renderer, camera: Camera): void;
}

export interface CommonUniforms {
  uMVMatrix: UniformMatrix
  uPMatrix: UniformMatrix
}

export type UniformLocations<T extends Record<string, Uniform>> = {
  [key in keyof (T & CommonUniforms)]: WebGLUniformLocation
};

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
