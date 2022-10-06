/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Error codes of {@link View360Error}
 * @type object
 * @property {0} WRONG_TYPE The given value's type is not expected
 * @property {1} WRONG_OPTION The given value's type is not expected
 * @property {2} ELEMENT_NOT_FOUND The element with given CSS selector does not exist
 * @property {3} CANVAS_NOT_FOUND The element given is not a \<canvas\> element
 * @property {4} WEBGL_NOT_SUPPORTED The browser does not support WebGL
 * @property {5} PROVIDE_SRC_FIRST `init()` is called before setting `src`
 * @property {6} FAILED_LINKING_PROGRAM Failed linking WebGL program
 */
export const ERROR_CODES: {
  [key in keyof typeof MESSAGES]: number;
} = {
  WRONG_TYPE: 0,
  WRONG_OPTION: 1,
  ELEMENT_NOT_FOUND: 2,
  CANVAS_NOT_FOUND: 3,
  WEBGL_NOT_SUPPORTED: 4,
  PROVIDE_SRC_FIRST: 5,
  FAILED_LINKING_PROGRAM: 6
};

export const MESSAGES = {
  WRONG_TYPE: (val: any, types: string[]) => `${typeof val} is not a ${types.map(type => `"${type}"`).join(" or ")}.`,
  WRONG_OPTION: (val: any, optionName: string) => `Bad option: given "${val}" for option "${optionName}".`,
  ELEMENT_NOT_FOUND: (query: string) => `Element with selector "${query}" not found.`,
  CANVAS_NOT_FOUND: "The canvas element was not found inside the given root element.",
  WEBGL_NOT_SUPPORTED: "WebGL is not supported on this browser.",
  PROVIDE_SRC_FIRST: "\"src\" should be provided before initialization.",
  FAILED_LINKING_PROGRAM: (msg: string | null, shaderLog: string | null) => `Failed linking WebGL program - "${msg}\nShader compile Log: ${shaderLog}`,
};

export default {
  CODES: ERROR_CODES,
  MESSAGES
};
