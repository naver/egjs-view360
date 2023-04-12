/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { VueConstructor } from "vue";

import View360 from "./View360";
import * as modules from "@egjs/view360";

for (const name in modules) {
  (View360 as any)[name] = (modules as any)[name];
}

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
export default plugin;
