/* eslint-disable @typescript-eslint/naming-convention */
import { VERSION } from "../version";
import { merge } from "../utils/utils";

import SpinViewer from "./SpinViewer";
import SpriteImage from "./SpriteImage";
import * as Constants from "./consts";

const SpinViewerModule = {
  SpinViewer,
  SpriteImage,
  VERSION
};

merge(SpinViewerModule, Constants);

export default SpinViewerModule;
