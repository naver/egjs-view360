/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import * as BROWSER from "../../const/browser";
import { CONTROL_EVENTS } from "../../const/internal";
import { InputEvents } from "../../type/internal";

class PinchInput extends Component<InputEvents<number, TouchEvent>> {
  private _el: HTMLElement | null;
  private _baseScale: number;
  private _prevDistance: number;
  private _isFirstTouch: boolean;

  public constructor() {
    super();

    this._el = null;
    this._baseScale = -0.2;
    this._prevDistance = -1;
    this._isFirstTouch = true;
  }

  public enable(element: HTMLElement) {
    if (this._el) return;

    element.addEventListener(BROWSER.EVENTS.TOUCH_MOVE, this._onTouchMove, { passive: false, capture: false });
    element.addEventListener(BROWSER.EVENTS.TOUCH_END, this._onTouchEnd);

    this._el = element;
    this._prevDistance = -1;
    this._isFirstTouch = true;
  }

  public disable() {
    const element = this._el;
    if (!element) return;

    element.removeEventListener(BROWSER.EVENTS.TOUCH_MOVE, this._onTouchMove, false);
    element.removeEventListener(BROWSER.EVENTS.TOUCH_END, this._onTouchEnd);

    this._el = null;
  }

  private _onTouchMove = (evt: TouchEvent) => {
    const touches = evt.touches;
    if (touches.length !== 2) return;

    if (!evt.cancelable) return;

    evt.preventDefault();
    evt.stopPropagation();

    const prevDistance = this._prevDistance;

    const diff = [
      touches[0].pageX - touches[1].pageX,
      touches[0].pageY - touches[1].pageY
    ];

    const distance = Math.sqrt(diff[0] * diff[0] + diff[1] * diff[1]) * this._baseScale;
    const delta = this._isFirstTouch
      ? 0
      : distance - prevDistance;

    if (this._isFirstTouch) {
      this.trigger(CONTROL_EVENTS.INPUT_START, {
        srcEvent: evt,
        isTouch: true,
        isKeyboard: false
      });
    }

    this._prevDistance = distance;
    this._isFirstTouch = false;

    this.trigger(CONTROL_EVENTS.CHANGE, {
      delta,
      isTouch: true,
      isKeyboard: false
    });
  };

  private _onTouchEnd = (evt: TouchEvent) => {
    if (evt.touches.length !== 0) return;

    if (!this._isFirstTouch) {
      this.trigger(CONTROL_EVENTS.INPUT_END, {
        isTouch: true,
        isKeyboard: false,
        scrolling: false
      });
    }

    this._prevDistance = -1;
    this._isFirstTouch = true;
  };
}

export default PinchInput;
