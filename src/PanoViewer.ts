/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import PanoViewerCore, { PanoViewerEvents, PanoViewerOptions } from "./PanoViewerCore";
import Emittable from "./type/Emittable";
import { getElement } from "./utils";

class PanoViewer extends Component<PanoViewerEvents> implements Emittable<PanoViewerEvents> {
  private _core: PanoViewerCore;

  public constructor(root: string | HTMLElement, options: Partial<PanoViewerOptions> = {}) {
    super();

    this._core = new PanoViewerCore(getElement(root), this, options);
  }
}

export default PanoViewer;
