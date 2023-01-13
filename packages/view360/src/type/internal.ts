/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import CameraControl from "../control/CameraControl";
import Uniform from "../uniform/Uniform";
import UniformMatrix from "../uniform/UniformMatrix";
import { CONTROL_EVENTS } from "../const/internal";

export interface CommonUniforms {
  uMVMatrix: UniformMatrix
  uPMatrix: UniformMatrix
}

export type UniformLocations<T extends Record<string, Uniform | null>> = {
  [key in keyof (T & CommonUniforms)]: WebGLUniformLocation
};

export interface InputEvents<DeltaType, BrowserEvent = MouseEvent | TouchEvent | KeyboardEvent> {
  [CONTROL_EVENTS.INPUT_START]: {
    srcEvent: BrowserEvent;
    isTouch: boolean;
    isKeyboard: boolean;
  };
  [CONTROL_EVENTS.CHANGE]: {
    delta: DeltaType;
    isTouch: boolean;
    isKeyboard: boolean;
  };
  [CONTROL_EVENTS.INPUT_END]: {
    isTouch: boolean;
    isKeyboard: boolean;
    scrolling: boolean;
  };
  [CONTROL_EVENTS.STATIC_CLICK]: {
    isTouch: boolean;
  };
  [CONTROL_EVENTS.ENABLE]: {
    control: CameraControl;
    updateCursor: boolean;
  };
  [CONTROL_EVENTS.DISABLE]: {
    updateCursor: boolean
  };
}

export interface ControlEvents<DeltaType> extends InputEvents<DeltaType> {
  [CONTROL_EVENTS.INPUT_START]: { inputType: "rotate" | "zoom" }
    & InputEvents<DeltaType>[typeof CONTROL_EVENTS.INPUT_START];
  [CONTROL_EVENTS.INPUT_END]: { inputType: "rotate" | "zoom" }
    & InputEvents<DeltaType>[typeof CONTROL_EVENTS.INPUT_END];
}

export type VAO = WebGLVertexArrayObject | WebGLVertexArrayObjectOES;
