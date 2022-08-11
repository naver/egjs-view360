/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import PanoViewerCore, { PanoViewerEvents } from "./PanoViewerCore";
import { EL_DIV, EL_SLOT } from "./const/browser";
import { DEFAULT_CLASS } from "./const/external";
import elStyles from "../sass/pano-el.sass";
import commonStyles from "../sass/pano-viewer.sass";
import { getAllAttributes } from "./utils";
import Emittable from "./type/Emittable";
import { EventKey } from "./type/utils";

class PanoViewerElement extends HTMLElement implements Emittable<PanoViewerEvents> {
  public shadowRoot: ShadowRoot;
  private _core: PanoViewerCore;

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

    this._core = new PanoViewerCore(container, this, {
      ...options
    });
  }

  public disconnectedCallback() {
    this._core.destroy();
  }

  // public addEventListener<K extends keyof HTMLElementEventMap | keyof PanoViewerEvents>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void {
  //   super.addEventListener(type, listener, options);
  // }

  public trigger<K extends EventKey<PanoViewerEvents>>(eventName: K, param: Omit<PanoViewerEvents[K], "target">): this {
    const evt = new CustomEvent(eventName, { detail: param });

    this.dispatchEvent(evt);

    return this;
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
