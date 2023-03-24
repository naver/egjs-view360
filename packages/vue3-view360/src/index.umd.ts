/**
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { App } from "vue";

import View360 from "./View360";
import * as modules from "@egjs/view360";

for (const name in modules) {
  (View360 as any)[name] = (modules as any)[name];
}

export default {
  install: (app: App) => {
    app.component("View360", View360);

  },
  View360
};
