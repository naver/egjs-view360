/* eslint-disable @typescript-eslint/naming-convention */
import { App } from "vue";

import PanoViewer from "./PanoViewer";
import SpinViewer from "./SpinViewer";

export default {
  install: (app: App) => {
    app.component("PanoViewer", PanoViewer);
    app.component("SpinViewer", SpinViewer);
  },
  PanoViewer,
  SpinViewer
};
