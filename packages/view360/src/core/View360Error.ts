/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Error thrown by {@link View360}
 * @ko {@link View360}이 발생시킨 에러
 * @since 4.0.0
 */
class View360Error extends Error {
  /**
   * Error code
   * @ko 에러 코드
   * @see ERROR_CODES
   */
  public code: number;

  /**
   * Create new instance of View360Error
   * @ko View360Error의 인스턴스를 생성합니다.
   * @param message - Error message {@ko 에러 메시지}
   * @param code - Error code {@ko 에러 코드}
   */
  public constructor(message: string, code: number) {
    super(message);

    Object.setPrototypeOf(this, View360Error.prototype);

    this.name = "View360Error";
    this.code = code;
  }
}

export default View360Error;
