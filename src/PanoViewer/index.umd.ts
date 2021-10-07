/* eslint-disable @typescript-eslint/naming-convention */
import { VERSION } from "../version";
import { merge } from "../utils/utils";

import PanoViewer from "./PanoViewer";
import * as Constants from "./consts";

const PanoViewerModule = {
  PanoViewer,
  VERSION
};

merge(PanoViewerModule, Constants);

export default PanoViewerModule;
