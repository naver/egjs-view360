/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import PanoViewerBase, { PanoViewerOptions } from "./PanoViewerBase";
import { getElement } from "./utils";

class PanoViewer extends PanoViewerBase {
  public constructor(root: string | HTMLElement, options: Partial<PanoViewerOptions> = {}) {
    super(getElement(root), options);
  }
}

export default PanoViewer;
