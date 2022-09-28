/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import View360Error from "./core/View360Error";
import ERROR from "./const/error";
import { NoBoolean } from "./type/utils";

export const isNumber = (val: any): val is number => typeof val === "number";
export const isString = (val: any): val is string => typeof val === "string";
export const isElement = (val: any): val is Element => !!val && val.nodeType === Node.ELEMENT_NODE;

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

export const isCSSSelector = (val: any) => {
  if (!isString(val)) return false;

  const dummyEl = document.createDocumentFragment();

  try {
    dummyEl.querySelector(val);
  } catch (err) {
    return false;
  }

  return true;
};

export const range = (end: number): number[] => {
  if (!end || end <= 0) {
    return [];
  }

  return Array.apply(0, Array(end)).map((undef, idx) => idx);
};

export const toRadian = (x: number) => x * Math.PI / 180;
export const toDegree = (x: number) => x * 180 / Math.PI;
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

export const toPowerOfTwo = (val: number) => {
  let result = 1;

  while (result < val) {
    result *= 2;
  }

  return result;
};

export const findIndex = <T>(array: T[], checker: (val: T) => boolean): number => {
  for (let idx = 0; idx < array.length; idx++) {
    if (checker(array[idx])) {
      return idx;
    }
  }

  return -1;
};

export const getObjectOption = <T extends boolean | Partial<object>>(val: T): NoBoolean<T> => typeof val === "object" ? val : {} as any;
export const toBooleanString = (val: boolean) => val ? "true" : "false";

export const getAllAttributes = (element: HTMLElement) => {
  const attribNames: string[] = "getAttributeNames" in element
    ? element.getAttributeNames()
    : [].slice.call(element.attributes).map(attr => attr.nodeName);

  return attribNames.reduce((attribs, name) => ({
    ...attribs,
    [name]: element.getAttribute(name)
  }), {});
};

export const toVerticalFov = (fovRadian: number, aspect: number) => {
  return Math.atan(Math.tan(fovRadian * 0.5) / aspect) * 2;
};
