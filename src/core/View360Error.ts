/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Error thrown by View360
 */
class View360Error extends Error {
  public code: number;

  /**
   * Create new instance of View360Error
   * @param {string} message Error message
   * @param {number} code Error code, see {@link ERROR_CODES}
   */
  public constructor(message: string, code: number) {
    super(message);

    Object.setPrototypeOf(this, View360Error.prototype);

    this.name = "View360Error";
    this.code = code;
  }
}

export default View360Error;
