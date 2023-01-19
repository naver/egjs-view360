/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { VueConstructor } from "vue";

import View360 from "./View360";

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

const version = "#__VERSION__#";
const install = (Vue: VueConstructor) => {
  Vue.component("View360", View360);
};

const plugin = {
  View360,
  install,
  version
};

export * from "@egjs/view360";

export default plugin;
export {
  View360,
  install,
  version
};
