/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import elStyles from "../sass/pano-el.sass";
import commonStyles from "../sass/pano-viewer.sass";

import { EL_DIV, EL_SLOT } from "./const/browser";
import { DEFAULT_CLASS } from "./const/external";

class PanoViewerElement extends HTMLElement {
  public shadowRoot: ShadowRoot;

  public constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const rootEl = this.shadowRoot;
    const template = this._createTemplate();

    rootEl.appendChild(template);
  }

  private _createTemplate(): HTMLElement {
    const container = document.createElement(EL_DIV);

    container.classList.add(DEFAULT_CLASS.CONTAINER);

    container.appendChild(this._createStyles());
    container.appendChild(this._createCanvasSlot());

    return container;
  }

  private _createStyles() {
    const fragment = document.createDocumentFragment();
    const elStyle = document.createElement("style");
    const commonStyle = document.createElement("style");

    elStyle.innerHTML = elStyles;
    commonStyle.innerHTML = commonStyles;

    fragment.appendChild(elStyle);
    fragment.appendChild(commonStyle);
    return fragment;
  }

  private _createCanvasSlot() {
    const slot = document.createElement(EL_SLOT);
    const canvas = document.createElement("canvas");

    canvas.classList.add(DEFAULT_CLASS.CANVAS);

    slot.name = "canvas";
    slot.appendChild(canvas);

    return slot;
  }
}

export default PanoViewerElement;
