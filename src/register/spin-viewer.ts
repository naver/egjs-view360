/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import SpinViewerElement from "../SpinViewerElement";

customElements.define("spin-viewer", SpinViewerElement);

declare global {
  interface HTMLElementTagNameMap {
    "spin-viewer": SpinViewerElement;
  }
}
