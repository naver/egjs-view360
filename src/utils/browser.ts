/* eslint-disable @typescript-eslint/no-implied-eval */
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import getAgent from "@egjs/agent";

/* eslint-disable no-new-func, no-nested-ternary */
const win = typeof window !== "undefined" && window.Math === Math
  ? window
  : typeof self !== "undefined" && self.Math === Math
    ? self
    : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

const doc = win.document;
const nav = win.navigator;
const agent = getAgent();
const osName = agent.os.name;
const browserName = agent.browser.name;
const IS_IOS = osName === "ios";
const IS_SAFARI_ON_DESKTOP = osName === "mac" && browserName === "safari";
const IS_SAMSUNG_BROWSER = browserName === "samsung internet";

export {
  win as window,
  doc as document,
  nav as navigator,
  IS_IOS,
  IS_SAFARI_ON_DESKTOP,
  IS_SAMSUNG_BROWSER
};
