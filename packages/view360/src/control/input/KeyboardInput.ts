/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import * as BROWSER from "../../const/browser";
import { CONTROL_EVENTS } from "../../const/internal";
import { InputEvents } from "../../type/internal";

class KeyboardInput extends Component<InputEvents<{ x: number, y: number }, KeyboardEvent>> {
  private _el: HTMLElement | null;
  private _pressed: {
    LEFT: boolean;
    UP: boolean;
    RIGHT: boolean;
    DOWN: boolean;
  };

  public get active() {
    const pressed = this._pressed;
    return pressed.LEFT || pressed.UP || pressed.RIGHT || pressed.DOWN;
  }

  public constructor() {
    super();

    this._el = null;
    this._clearPressedKeys();
  }

  public enable(element: HTMLElement) {
    if (this._el) return;

    element.addEventListener(BROWSER.EVENTS.KEY_DOWN, this._onKeyDown);
    element.addEventListener(BROWSER.EVENTS.KEY_UP, this._onKeyUp);

    this._el = element;
    this._clearPressedKeys();
  }

  public disable() {
    const element = this._el;
    if (!element) return;

    element.removeEventListener(BROWSER.EVENTS.KEY_DOWN, this._onKeyDown);
    element.removeEventListener(BROWSER.EVENTS.KEY_UP, this._onKeyUp);

    this._el = null;
    this._clearPressedKeys();
  }

  public update() {
    const delta = this._getDeltaByPressedKeys();

    if (delta.x !== 0 || delta.y !== 0) {
      this.trigger(CONTROL_EVENTS.CHANGE, {
        delta,
        isTouch: false,
        isKeyboard: true
      });
    }
  }

  private _clearPressedKeys() {
    this._pressed = BROWSER.KEY_DIRECTION.reduce((obj, keyName) => {
      return {
        ...obj,
        [keyName]: false
      };
    }, {} as KeyboardInput["_pressed"]);
  }

  private _updateKeyPress(event: KeyboardEvent, isEnable: boolean): void {
    const pressed = this._pressed;
    const keyToUpdate = event.keyCode != null
      ? BROWSER.DIRECTION_KEY_CODE[event.keyCode]
      : BROWSER.DIRECTION_KEY_NAME[event.key];

    if (!keyToUpdate) return;

    pressed[keyToUpdate] = isEnable;
  }

  private _getPressedKeyCount() {
    return BROWSER.KEY_DIRECTION.filter(key => this._pressed[key]).length;
  }

  private _getDeltaByPressedKeys() {
    const pressed = this._pressed;
    let x = 0;
    let y = 0;

    if (pressed.LEFT) {
      x += 1;
    }

    if (pressed.RIGHT) {
      x -= 1;
    }

    if (pressed.UP) {
      y += 1;
    }

    if (pressed.DOWN) {
      y -= 1;
    }

    return {
      x, y
    };
  }

  private _onKeyDown = (evt: KeyboardEvent) => {
    // Ignore all other keypress except main arrow keys
    if (evt.location !== KeyboardEvent.DOM_KEY_LOCATION_STANDARD) return;

    this._updateKeyPress(evt, true);

    const pressedCount = this._getPressedKeyCount();
    if (pressedCount <= 0) return;

    evt.preventDefault();
    if (pressedCount === 1 && !evt.repeat) {
      // On first keydown
      this.trigger(CONTROL_EVENTS.INPUT_START, {
        srcEvent: evt,
        isTouch: false,
        isKeyboard: true
      });
    }
  };

  private _onKeyUp = (evt: KeyboardEvent) => {
    // Ignore all other keypress except main arrow keys
    if (evt.location !== KeyboardEvent.DOM_KEY_LOCATION_STANDARD) return;

    this._updateKeyPress(evt, false);

    const pressedCount = this._getPressedKeyCount();
    if (pressedCount > 0) return;

    this.trigger(CONTROL_EVENTS.INPUT_END, {
      isTouch: false,
      isKeyboard: true,
      scrolling: false
    });
  };
}

export default KeyboardInput;
