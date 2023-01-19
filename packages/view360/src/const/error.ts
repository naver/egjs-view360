/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Error codes of {@link View360Error}
 * @ko {@link View360Error}가 가질 수 있는 에러 코드 값들
 * @since 4.0.0
 */
export const ERROR_CODES = {
  /**
   * The given value's type is not expected
   * @ko 주어진 값의 타입이 잘못되었을 경우
   * @since 4.0.0
   */
  WRONG_TYPE: 0,
  /**
   * The given value is not a supported option
   * @ko 잘못된 옵션을 받았을 경우
   * @since 4.0.0
   */
  WRONG_OPTION: 1,
  /**
   * The element with given CSS selector does not exist
   * @ko 주어진 CSS 셀렉터로 엘리먼트를 찾지 못했을 경우
   * @since 4.0.0
   */
  ELEMENT_NOT_FOUND: 2,
  /**
   * Couldn't find canvas element inside the given container element.
   * @ko 컨테이너 엘리먼트 내부에서 캔버스 엘리먼트를 찾지 못했을 경우
   * @since 4.0.0
   */
  CANVAS_NOT_FOUND: 3,
  /**
   * The browser does not support WebGL
   * @ko 브라우저가 WebGL을 지원하지 않는 경우
   * @since 4.0.0
   */
  WEBGL_NOT_SUPPORTED: 4,
  /**
   * Failed creating canvas 2D context
   * @ko 캔버스 2D 컨텍스트를 생성하지 못한 경우
   * @since 4.0.0
   */
  FAILED_CREATE_CONTEXT_2D: 5,
  /**
   * `init()` is called before setting {@link View360Options#projection}
   * @ko {@link View360Options#projection}을 설정하기 전에 `init()`이 호출된 경우
   * @since 4.0.0
   */
  PROVIDE_PROJECTION_FIRST: 6,
  /**
   * Failed linking WebGL program. Only can be thrown when {@link View360Options#debug} is `true`.
   * @ko WebGL 프로그램 링크에 실패한 경우. {@link View360Options#debug}를 `true`로 설정한 경우에만 발생할 수 있습니다.
   * @since 4.0.0
   */
  FAILED_LINKING_PROGRAM: 7,
  /**
   * Arguments are not sufficient for the given property.
   * @ko 프로퍼티에 값이 충분히 주어지지 않았을 때
   * @since 4.0.0
   */
  INSUFFICIENT_ARGS: 8
} as const;

export const MESSAGES = {
  WRONG_TYPE: (val: any, types: string[]) => `${typeof val} is not a ${types.map(type => `"${type}"`).join(" or ")}.`,
  WRONG_OPTION: (val: any, optionName: string) => `Bad option: given "${val}" for option "${optionName}".`,
  ELEMENT_NOT_FOUND: (query: string) => `Element with selector "${query}" not found.`,
  CANVAS_NOT_FOUND: "The canvas element was not found inside the given root element.",
  WEBGL_NOT_SUPPORTED: "WebGL is not supported on this browser.",
  FAILED_CREATE_CONTEXT_2D: "Failed to create canvas 2D context",
  PROVIDE_PROJECTION_FIRST: "\"projection\" should be provided before initialization.",
  FAILED_LINKING_PROGRAM: (msg: string | null, shaderLog: string | null) => `Failed linking WebGL program - "${msg}\nShader compile Log: ${shaderLog}`,
  INSUFFICIENT_ARGS: (val: any, name: string) => `Insufficient arguments: given "${val}" for "${name}".`
};

export default {
  CODES: ERROR_CODES,
  MESSAGES
};
