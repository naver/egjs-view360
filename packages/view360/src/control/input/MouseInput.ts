/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import * as BROWSER from "../../const/browser";
import { CONTROL_EVENTS } from "../../const/internal";
import { InputEvents } from "../../type/internal";

class MouseInput extends Component<InputEvents<{ x: number, y: number }, MouseEvent>> {
  private _el: HTMLElement | null;
  private _prevPos: [number, number];

  public constructor() {
    super();

    this._el = null;
    this._prevPos = [0, 0];
  }

  public enable(element: HTMLElement) {
    if (this._el) return;

    element.addEventListener(BROWSER.EVENTS.MOUSE_DOWN, this._onMouseDown);

    this._el = element;
  }

  public disable() {
    const element = this._el;
    if (!element) return;

    element.removeEventListener(BROWSER.EVENTS.MOUSE_DOWN, this._onMouseDown);
    window.removeEventListener(BROWSER.EVENTS.MOUSE_MOVE, this._onMouseMove, false);
    window.removeEventListener(BROWSER.EVENTS.MOUSE_UP, this._onMouseUp, false);

    this._el = null;
  }

  private _onMouseDown = (evt: MouseEvent) => {
    const el = this._el;
    if (!el || evt.button !== BROWSER.MOUSE_BUTTON.LEFT) return;

    evt.preventDefault();

    if (el.focus) {
      el.focus();
    } else {
      window.focus();
    }

    this._prevPos[0] = evt.clientX;
    this._prevPos[1] = evt.clientY;

    window.addEventListener(BROWSER.EVENTS.MOUSE_MOVE, this._onMouseMove, false);
    window.addEventListener(BROWSER.EVENTS.MOUSE_UP, this._onMouseUp, false);

    this.trigger(CONTROL_EVENTS.INPUT_START, {
      srcEvent: evt,
      isTouch: false,
      isKeyboard: false
    });
  }

  private _onMouseMove = (evt: MouseEvent) => {
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
  }

  private _onMouseUp = () => {
    this._prevPos[0] = 0;
    this._prevPos[1] = 0;

    window.removeEventListener(BROWSER.EVENTS.MOUSE_MOVE, this._onMouseMove, false);
    window.removeEventListener(BROWSER.EVENTS.MOUSE_UP, this._onMouseUp, false);

    this.trigger(CONTROL_EVENTS.INPUT_END, {
      isTouch: false,
      isKeyboard: false,
      scrolling: false
    });
  }
}

export default MouseInput;
