/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import * as BROWSER from "../../const/browser";
import { CONTROL_EVENTS } from "../../const/internal";
import { InputEvents } from "../../type/internal";

class PointerInput extends Component<InputEvents<{ x: number, y: number }, PointerEvent>> {
  private _el: HTMLElement | null;
  private _prevPos: [number, number];

  public constructor() {
    super();

    this._el = null;
    this._prevPos = [0, 0];
  }

  public enable(element: HTMLElement) {
    if (this._el) return;

    element.addEventListener(BROWSER.EVENTS.POINTER_DOWN, this._onPointerDown);
    element.addEventListener(BROWSER.EVENTS.POINTER_CANCEL, this._onPointerCancel);

    this._el = element;
  }

  public disable() {
    const el = this._el;
    if (!el) return;

    el.removeEventListener(BROWSER.EVENTS.POINTER_DOWN, this._onPointerDown);
    this._clearSubevents(el);

    this._el = null;
  }

  private _clearSubevents(el: HTMLElement) {
    el.removeEventListener(BROWSER.EVENTS.POINTER_MOVE, this._onPointerMove);
    el.removeEventListener(BROWSER.EVENTS.POINTER_UP, this._onPointerUp);
  }

  private _onPointerDown = (evt: PointerEvent) => {
    const el = this._el;

    if (!el || !evt.isPrimary) return;

    if (el.focus) {
      el.focus();
    } else {
      window.focus();
    }

    this._prevPos[0] = evt.clientX;
    this._prevPos[1] = evt.clientY;

    el.setPointerCapture(evt.pointerId);
    el.addEventListener(BROWSER.EVENTS.POINTER_MOVE, this._onPointerMove);
    el.addEventListener(BROWSER.EVENTS.POINTER_UP, this._onPointerUp);

    this.trigger(CONTROL_EVENTS.INPUT_START, {
      srcEvent: evt,
      isTouch: false,
      isKeyboard: false
    });
  };

  private _onPointerMove = (evt: PointerEvent) => {
    if (!evt.isPrimary) return;

    evt.preventDefault();

    const x = evt.clientX;
    const y = evt.clientY;
    const prevPos = this._prevPos;
    const deltaX = x - prevPos[0];
    const deltaY = y - prevPos[1];

    this.trigger(CONTROL_EVENTS.CHANGE, {
      delta: {
        x: deltaX,
        y: deltaY
      },
      isTouch: false,
      isKeyboard: false
    });

    prevPos[0] = x;
    prevPos[1] = y;
  };

  private _onPointerUp = (evt: PointerEvent) => {
    const el = this._el;
    if (!el || !evt.isPrimary) return;

    this._prevPos[0] = 0;
    this._prevPos[1] = 0;

    this._clearSubevents(el);

    this.trigger(CONTROL_EVENTS.INPUT_END, {
      isTouch: false,
      isKeyboard: false,
      scrolling: false
    });
  };

  private _onPointerCancel = (evt: PointerEvent) => {
    const el = this._el;
    if (!el || !evt.isPrimary) return;

    this._clearSubevents(el);
  };
}

export default PointerInput;
