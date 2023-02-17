/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import * as BROWSER from "../../const/browser";
import { CONTROL_EVENTS, DEFAULT_ANIMATION_DURATION } from "../../const/internal";
import { InputEvents } from "../../type/internal";

class WheelInput extends Component<InputEvents<number, WheelEvent>> {
  private _el: HTMLElement | null;
  private _scrollable: boolean;
  private _baseScale: number;
  private _inputTimer: number;

  public get scrollable() { return this._scrollable; }
  public set scrollable(val: boolean) { this._scrollable = val; }

  public constructor() {
    super();

    this._el = null;
    this._baseScale = 0.04;
    this._scrollable = false;
    this._inputTimer = -1;
  }

  public enable(element: HTMLElement) {
    if (this._el) return;

    element.addEventListener(BROWSER.EVENTS.WHEEL, this._onWheel, { passive: false, capture: false });

    this._el = element;
    this._clearTimer();
  }

  public disable() {
    const element = this._el;
    if (!element) return;

    element.removeEventListener(BROWSER.EVENTS.WHEEL, this._onWheel, false);

    this._el = null;
    this._clearTimer();
  }

  private _onWheel = (evt: WheelEvent) => {
    const scrollable = this._scrollable;

    if (evt.deltaY === 0 || scrollable) return;

    evt.preventDefault();
    evt.stopPropagation();

    if (this._inputTimer < 0) {
      this.trigger(CONTROL_EVENTS.INPUT_START, {
        srcEvent: evt,
        isTouch: false,
        isKeyboard: false
      });
    } else {
      this._clearTimer();
    }

    const delta = this._baseScale * evt.deltaY;

    this.trigger(CONTROL_EVENTS.CHANGE, {
      delta,
      isTouch: false,
      isKeyboard: false
    });

    this._inputTimer = window.setTimeout(() => {
      this.trigger(CONTROL_EVENTS.INPUT_END, {
        isTouch: false,
        isKeyboard: false,
        scrolling: false
      });
      this._inputTimer = -1;
    }, DEFAULT_ANIMATION_DURATION);
  };

  private _clearTimer() {
    window.clearTimeout(this._inputTimer);
    this._inputTimer = -1;
  }
}

export default WheelInput;
