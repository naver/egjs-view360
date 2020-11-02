import PanoViewer from "./PanoViewer";
import { VERSION } from "../version";

import { polyfill } from "es6-promise";

polyfill();

export {
  PanoViewer,
  VERSION
};
