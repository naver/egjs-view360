/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import PanoViewerElement from "../PanoViewerElement";

customElements.define("pano-viewer", PanoViewerElement);

declare global {
  interface HTMLElementTagNameMap {
    "pano-viewer": PanoViewerElement;
  }
}
