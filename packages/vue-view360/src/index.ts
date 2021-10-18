/* eslint-disable @typescript-eslint/naming-convention */
import { VueConstructor } from "vue";

import PanoViewer from "./PanoViewer";
import SpinViewer from "./SpinViewer";

const version = "#__VERSION__#";
const install = (Vue: VueConstructor) => {
  Vue.component("PanoViewer", PanoViewer);
  Vue.component("SpinViewer", SpinViewer);
};

const plugin = {
  PanoViewer,
  SpinViewer,
  install,
  version
};

export * from "@egjs/view360";

export default plugin;
export {
  PanoViewer,
  SpinViewer,
  install,
  version
};
