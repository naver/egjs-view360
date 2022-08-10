/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import PanoViewerBase from "./PanoViewerBase";
import { EL_DIV, EL_SLOT } from "./const/browser";
import { DEFAULT_CLASS } from "./const/external";
import elStyles from "../sass/pano-el.sass";
import commonStyles from "../sass/pano-viewer.sass";
import { getAllAttributes } from "./utils";

class PanoViewerElement extends HTMLElement {
  public shadowRoot: ShadowRoot;
  public viewer: PanoViewerBase;

  public constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const rootEl = this.shadowRoot;
    const styles = this._createStyles();
    const template = this._createTemplate();

    rootEl.appendChild(styles);
    rootEl.appendChild(template);
  }

  public connectedCallback() {
    const container = this.shadowRoot.querySelector(`.${DEFAULT_CLASS.CONTAINER}`) as HTMLElement;
    const options = getAllAttributes(this);

    this.viewer = new PanoViewerBase(container, {
      ...options
    });
  }

  public disconnectedCallback() {
    this.viewer.destroy();
  }

  private _createTemplate() {
    const container = document.createElement(EL_DIV);

    container.classList.add(DEFAULT_CLASS.CONTAINER);
    container.appendChild(this._createCanvasSlot());
    container.appendChild(this._createEmptySlot());

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

  private _createEmptySlot() {
    return document.createElement(EL_SLOT);
  }
}

export default PanoViewerElement;
