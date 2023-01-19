/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { quat, vec3 } from "gl-matrix";
import View360Error from "./core/View360Error";
import ERROR from "./const/error";
import * as BROWSER from "./const/browser";
import { DEG_TO_RAD, RAD_TO_DEG } from "./const/internal";
import { NoBoolean } from "./type/utils";

export const isString = (val: any): val is string => typeof val === "string";
export const isElement = (val: any): val is Element => !!val && val.nodeType === Node.ELEMENT_NODE;

export const createElement = (className: string, tag = BROWSER.EL_DIV) => {
  const el = document.createElement(tag);

  el.classList.add(className);

  return el;
};

export const getNullableElement = (el: HTMLElement | string | null, parent?: HTMLElement): HTMLElement | null => {
  let targetEl: HTMLElement | null = null;

  if (isString(el)) {
    const parentEl = parent ? parent : document;
    const queryResult = parentEl.querySelector(el);

    if (!queryResult) {
      return null;
    }

    targetEl = queryResult as HTMLElement;
  } else if (isElement(el)) {
    targetEl = el;
  }

  return targetEl;
};

export const getElement = (el: HTMLElement | string, parent?: HTMLElement): HTMLElement => {
  const targetEl = getNullableElement(el, parent);

  if (!targetEl) {
    if (isString(el)) {
      throw new View360Error(ERROR.MESSAGES.ELEMENT_NOT_FOUND(el), ERROR.CODES.ELEMENT_NOT_FOUND);
    } else {
      throw new View360Error(ERROR.MESSAGES.WRONG_TYPE(el, ["HTMLElement", "string"]), ERROR.CODES.WRONG_TYPE);
    }
  }

  return targetEl;
};

export const findCanvas = (root: HTMLElement, selector: string): HTMLCanvasElement => {
  const canvas = root.querySelector(selector) as HTMLCanvasElement;

  if (!canvas) {
    throw new View360Error(ERROR.MESSAGES.CANVAS_NOT_FOUND, ERROR.CODES.CANVAS_NOT_FOUND);
  }

  return canvas;
};

export const range = (end: number): number[] => {
  if (!end || end <= 0) {
    return [];
  }

  return Array.apply(0, Array(end)).map((undef, idx) => idx);
};

export const clamp = (x: number, min: number, max: number) => Math.max(Math.min(x, max), min);

// Linear interpolation between a and b
export const lerp = (a: number, b: number, t: number) => {
  return a * (1 - t) + b * t;
};

export const circulate = (val: number, min: number, max: number) => {
  const size = Math.abs(max - min);

  if (val < min) {
    const offset = (min - val) % size;
    val = max - offset;
  } else if (val > max) {
    const offset = (val - max) % size;
    val = min + offset;
  }

  return val;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const merge = (target: object, ...srcs: object[]): object => {
  srcs.forEach(source => {
    Object.keys(source).forEach(key => {
      const value = source[key];
      if (Array.isArray(target[key]) && Array.isArray(value)) {
        target[key] = [...target[key], ...value];
      } else {
        target[key] = value;
      }
    });
  });

  return target;
};

export const findIndex = <T>(array: T[], checker: (val: T) => boolean): number => {
  for (let idx = 0; idx < array.length; idx++) {
    if (checker(array[idx])) {
      return idx;
    }
  }

  return -1;
};

export const getObjectOption = <T extends boolean | Partial<object>>(val?: T): NoBoolean<T> => typeof val === "object" ? val : {} as any;
export const toVerticalFov = (fovRadian: number, aspect: number) => {
  return Math.atan(Math.tan(fovRadian * 0.5) / aspect) * 2;
};

export const reorderCube = <T>(arr: T[], order: string, defaultOrder = "RLUDFB"): T[] => {
  return defaultOrder.split("")
    .map(face => order.indexOf(face))
    .map(index => arr[index]);
};

export const isFullscreen = () => {
  if (!document) return false;

  for (const key of BROWSER.FULLSCREEN_ELEMENT) {
    if (document[key]) return true;
  }

  return false;
};

export const sensorCanBeEnabledIOS = () => {
  return !!DeviceMotionEvent && "requestPermission" in DeviceMotionEvent && window.isSecureContext;
};

export const hfovToZoom = (baseFov: number, fov: number) => {
  const renderingWidth = Math.tan(DEG_TO_RAD * baseFov * 0.5);
  const zoomedWidth = Math.tan(DEG_TO_RAD * fov * 0.5);

  return renderingWidth / zoomedWidth;
};

export const eulerToQuat = (out: quat, yaw: number, pitch: number, roll: number): quat => {
  quat.identity(out);

  const pitchThreshold = 0.01;
  const pitchClamped = clamp(pitch, -90 + pitchThreshold, 90 - pitchThreshold);

  quat.rotateY(out, out, yaw * DEG_TO_RAD);
  quat.rotateX(out, out, pitchClamped * DEG_TO_RAD);
  quat.rotateZ(out, out, roll * DEG_TO_RAD);

  return out;
};

/**
 * Extract euler angles from the quaternion, except roll(z-axis rotation)
 * @hidden
 */
export const quatToEuler = (quaternion: quat) => {
  const x = quaternion[0];
  const y = quaternion[1];
  const z = quaternion[2];
  const w = quaternion[3];
  const x2 = x * x;
  const y2 = y * y;
  const z2 = z * z;
  const w2 = w * w;

  const unit = x2 + y2 + z2 + w2;
  const test = x * w - y * z;

  let pitch: number, yaw: number;

  if (test > 0.499995 * unit) {
    // singularity at the north pole
    pitch = Math.PI / 2;
    yaw = 2 * Math.atan2(y, x);
  } else if (test < -0.499995 * unit) {
    // singularity at the south pole
    pitch = -Math.PI / 2;
    yaw = -2 * Math.atan2(y, x);
  } else {
    const view = vec3.fromValues(0, 0, 1);
    const up = vec3.fromValues(0, 1, 0);

    vec3.transformQuat(view, view, quaternion);
    vec3.transformQuat(up, up, quaternion);

    const viewXZ = Math.sqrt(view[0] * view[0] + view[2] * view[2]);

    pitch = Math.atan2(-view[1], viewXZ);
    yaw = Math.atan2(view[0], view[2]);
  }

  return {
    pitch: clamp(pitch * RAD_TO_DEG, -90, 90),
    yaw: circulate(yaw * RAD_TO_DEG, 0, 360)
  };
};
