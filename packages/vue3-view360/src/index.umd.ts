/**
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { App } from "vue";

import View360 from "./View360";

export default {
  install: (app: App) => {
    app.component("View360", View360);

  },
  View360
};
