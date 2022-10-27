/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Error codes of {@link View360Error}
 * @property The given value's type is not expected
 * @property The given value's type is not expected
 * @property The element with given CSS selector does not exist
 * @property The element given is not a \<canvas\> element
 * @property The browser does not support WebGL
 * @property Failed creating canvas 2D context
 * @property `init()` is called before setting `src`
 * @property Failed linking WebGL program
 */
export const ERROR_CODES: {
  [key in keyof typeof MESSAGES]: number;
} = {
  WRONG_TYPE: 0,
  WRONG_OPTION: 1,
  ELEMENT_NOT_FOUND: 2,
  CANVAS_NOT_FOUND: 3,
  WEBGL_NOT_SUPPORTED: 4,
  FAILED_CREATE_CONTEXT_2D: 5,
  PROVIDE_SRC_FIRST: 6,
  FAILED_LINKING_PROGRAM: 7
};

export const MESSAGES = {
  WRONG_TYPE: (val: any, types: string[]) => `${typeof val} is not a ${types.map(type => `"${type}"`).join(" or ")}.`,
  WRONG_OPTION: (val: any, optionName: string) => `Bad option: given "${val}" for option "${optionName}".`,
  ELEMENT_NOT_FOUND: (query: string) => `Element with selector "${query}" not found.`,
  CANVAS_NOT_FOUND: "The canvas element was not found inside the given root element.",
  WEBGL_NOT_SUPPORTED: "WebGL is not supported on this browser.",
  FAILED_CREATE_CONTEXT_2D: "Failed to create canvas 2D context",
  PROVIDE_SRC_FIRST: "\"src\" should be provided before initialization.",
  FAILED_LINKING_PROGRAM: (msg: string | null, shaderLog: string | null) => `Failed linking WebGL program - "${msg}\nShader compile Log: ${shaderLog}`,
};

export default {
  CODES: ERROR_CODES,
  MESSAGES
};
