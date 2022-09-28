/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import * as BROWSER from "../../const/browser";
import { CONTROL_EVENTS } from "../../const/internal";
import { ZoomInputEvents } from "../../type/internal";

class WheelInput extends Component<ZoomInputEvents> {
  private _el: HTMLElement | null;
  private _scrollable: boolean;
  private _baseScale: number;

  public get scrollable() { return this._scrollable; }
  public set scrollable(val: boolean) { this._scrollable = val; }

  public constructor() {
    super();

    this._el = null;
    this._baseScale = 0.04;
    this._scrollable = false;
  }

  public enable(element: HTMLElement) {
    if (this._el) return;

    element.addEventListener(BROWSER.EVENTS.WHEEL, this._onWheel, { passive: false, capture: false });

    this._el = element;
  }

  public disable() {
    const element = this._el;
    if (!element) return;

    element.removeEventListener(BROWSER.EVENTS.WHEEL, this._onWheel, false);

    this._el = null;
  }

  private _onWheel = (evt: WheelEvent) => {
    const scrollable = this._scrollable;

    if (evt.deltaY === 0 || scrollable) return;

    evt.preventDefault();
    evt.stopPropagation();

    const delta = this._baseScale * evt.deltaY;

    this.trigger(CONTROL_EVENTS.CHANGE, delta);
  };
}

export default WheelInput;
