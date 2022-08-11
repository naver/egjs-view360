/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Error codes of {@link View360Error}
 * @type object
 * @property {0} WRONG_TYPE The given value's type is not expected
 * @property {1} ELEMENT_NOT_FOUND The element with given CSS selector does not exist
 * @property {2} CANVAS_NOT_FOUND The element given is not a \<canvas\> element
 * @property {3} WEBGL_NOT_SUPPORTED The browser does not support WebGL
 * @property {4} PROVIDE_SRC_FIRST `init()` is called before setting `src`
 */
export const ERROR_CODES: {
  [key in keyof typeof MESSAGES]: number;
} = {
  WRONG_TYPE: 0,
  ELEMENT_NOT_FOUND: 1,
  CANVAS_NOT_FOUND: 2,
  WEBGL_NOT_SUPPORTED: 3,
  PROVIDE_SRC_FIRST: 4,
  FAILED_COMPILE_SHADER: 5,
  FAILED_COMPILE_PROGRAM: 6
};

export const MESSAGES = {
  WRONG_TYPE: (val: any, types: string[]) => `${typeof val} is not a ${types.map(type => `"${type}"`).join(" or ")}.`,
  ELEMENT_NOT_FOUND: (query: string) => `Element with selector "${query}" not found.`,
  CANVAS_NOT_FOUND: "The canvas element was not found inside the given root element.",
  WEBGL_NOT_SUPPORTED: "WebGL is not supported on this browser.",
  PROVIDE_SRC_FIRST: "\"src\" should be provided before initialization.",
  FAILED_COMPILE_SHADER: (msg: string | null) => `Failed compiling shader - "${msg}"`,
  FAILED_COMPILE_PROGRAM: (msg: string | null) => `Failed compiling WebGL program - "${msg}"`,
};

export default {
  CODES: ERROR_CODES,
  MESSAGES
};
