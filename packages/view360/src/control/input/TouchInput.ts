/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import * as BROWSER from "../../const/browser";
import { CONTROL_EVENTS } from "../../const/internal";
import { InputEvents } from "../../type/internal";
import { isFullscreen } from "../../utils";

class TouchInput extends Component<InputEvents<{ x: number, y: number }, TouchEvent>> {
  private _el: HTMLElement | null;
  private _prevPos: [number, number];
  private _isFirstTouch: boolean;
  private _scrolling: boolean;
  private _scrollable: boolean;

  public get scrollable() { return this._scrollable; }
  public set scrollable(val: boolean) { this._scrollable = val; }

  public constructor() {
    super();

    this._el = null;
    this._prevPos = [0, 0];
    this._isFirstTouch = false;
    this._scrolling = false;
    this._scrollable = false;
  }

  public enable(element: HTMLElement) {
    if (this._el) return;

    element.addEventListener(BROWSER.EVENTS.TOUCH_START, this._onTouchStart, { passive: false });
    element.addEventListener(BROWSER.EVENTS.TOUCH_MOVE, this._onTouchMove, { passive: false });
    element.addEventListener(BROWSER.EVENTS.TOUCH_END, this._onTouchEnd);

    this._el = element;
  }

  public disable() {
    const element = this._el;
    if (!element) return;

    element.removeEventListener(BROWSER.EVENTS.TOUCH_START, this._onTouchStart);
    element.removeEventListener(BROWSER.EVENTS.TOUCH_MOVE, this._onTouchMove);
    element.removeEventListener(BROWSER.EVENTS.TOUCH_END, this._onTouchEnd);

    this._el = null;
  }

  private _onTouchStart = (evt: TouchEvent) => {
    if (evt.touches.length > 1 || this._scrolling) return;

    const touch = evt.touches[0];

    this._isFirstTouch = true;
    this._prevPos[0] = touch.clientX;
    this._prevPos[1] = touch.clientY;

    this.trigger(CONTROL_EVENTS.INPUT_START, {
      srcEvent: evt,
      isTouch: true,
      isKeyboard: false
    });
  };

  private _onTouchMove = (evt: TouchEvent) => {
    // Only the one finger motion should be considered
    if (evt.touches.length > 1 || this._scrolling) return;

    const touch = evt.touches[0];
    const scrollable = this._scrollable;
    const prevPos = this._prevPos;

    const x = touch.clientX;
    const y = touch.clientY;
    const deltaX = x - prevPos[0];
    const deltaY = y - prevPos[1];

    if (this._isFirstTouch) {
      if (scrollable && !isFullscreen()) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          // Assume Scrolling
          this._scrolling = true;
          return;
        }
      }

      this._isFirstTouch = false;
    }

    if (evt.cancelable !== false) {
      evt.preventDefault();
    }

    this.trigger(CONTROL_EVENTS.CHANGE, {
      delta: {
        x: deltaX,
        y: deltaY
      },
      isTouch: true,
      isKeyboard: false
    });

    prevPos[0] = x;
    prevPos[1] = y;
  };

  private _onTouchEnd = (evt: TouchEvent) => {
    if (evt.touches.length !== 0) return;

    const touch = evt.touches[0];
    const prevPos = this._prevPos;

    if (touch) {
      prevPos[0] = touch.clientX;
      prevPos[1] = touch.clientY;
    } else {
      prevPos[0] = 0;
      prevPos[1] = 0;

      this.trigger(CONTROL_EVENTS.INPUT_END, {
        isTouch: true,
        isKeyboard: false,
        scrolling: this._scrolling
      });
    }

    if (evt.cancelable !== false) {
      evt.preventDefault();
    }

    this._scrolling = false;
  };
}

export default TouchInput;
