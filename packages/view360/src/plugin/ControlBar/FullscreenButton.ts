/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ControlBar from "./ControlBar";
import ControlBarItem, { ControlBarItemOptions } from "./ControlBarItem";
import { CONTROL_BAR_ITEM_POSITION } from "./const";
import View360 from "../../View360";
import * as BROWSER from "../../const/browser";
import { isFullscreen } from "../../utils";

/**
 * Show fullscreen enter / exit button.
 * @ko 풀스크린 진입 / 해제 버튼을 표시합니다.
 * @category Plugin
 * @group ControlBar
 * @since 4.0.0
 */
class FullscreenButton extends ControlBarItem {
  public readonly element: HTMLElement;
  private _controlBar: ControlBar | null;
  private _targetEl: HTMLElement | null;

  /**
   * Create a new instance.
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor({
    position = CONTROL_BAR_ITEM_POSITION.MAIN_RIGHT,
    order = 9999
  }: Partial<ControlBarItemOptions> = {}) {
    super({
      position,
      order
    });

    this.element = document.createElement(BROWSER.EL_BUTTON);
    this.element.title = "Toggle Fullscreen";
    this._controlBar = null;
    this._targetEl = null;
  }

  public init(viewer: View360, controlBar: ControlBar) {
    const element = this.element;
    const className = controlBar.className;

    if (!this._fullscreenAvailable()) {
      element.classList.add(className.UNAVAILABLE);
      return;
    }

    element.classList.add(className.CONTROLS_BUTTON);
    element.classList.remove(className.UNAVAILABLE);
    element.addEventListener(BROWSER.EVENTS.CLICK, this._onClick);
    this._addFullscreenHandlers();

    if (isFullscreen()) {
      element.classList.add(className.FULLSCREEN_EXIT_BUTTON);
    } else {
      element.classList.add(className.FULLSCREEN_BUTTON);
    }

    this._controlBar = controlBar;
    this._targetEl = viewer.rootEl;
  }

  public destroy() {
    const element = this.element;

    element.className = "";
    element.removeEventListener(BROWSER.EVENTS.CLICK, this._onClick);
    this._removeFullscreenHandlers();

    this._controlBar = null;
    this._targetEl = null;
  }

  private _onClick = () => {
    const target = this._targetEl;
    if (!target) return;

    if (isFullscreen()) {
      this._exitFullscreen();
    } else {
      this._requestFullscreen(target);
    }
  };

  private _fullscreenAvailable() {
    return BROWSER.FULLSCREEN_REQUEST.some(key => !!document[key]);
  }

  private _requestFullscreen(el: HTMLElement) {
    for (const key of BROWSER.FULLSCREEN_REQUEST) {
      const request = el[key];
      if (request) {
        request.call(el);
        return;
      }
    }
  }

  private _exitFullscreen() {
    for (const key of BROWSER.FULLSCREEN_EXIT) {
      const exit = document[key];

      if (exit) {
        exit.call(document);
        return;
      }
    }
  }

  private _addFullscreenHandlers() {
    BROWSER.FULLSCREEN_CHANGE.forEach(evtName => {
      document.addEventListener(evtName, this._onFullscreenChange);
    });
  }

  private _removeFullscreenHandlers() {
    BROWSER.FULLSCREEN_CHANGE.forEach(evtName => {
      document.removeEventListener(evtName, this._onFullscreenChange);
    });
  }

  private _onFullscreenChange = () => {
    const element = this.element;
    const controlBar = this._controlBar;

    if (!controlBar) return;

    const className = controlBar.className;

    if (isFullscreen()) {
      element.classList.add(className.FULLSCREEN_EXIT_BUTTON);
      element.classList.remove(className.FULLSCREEN_BUTTON);
    } else {
      element.classList.add(className.FULLSCREEN_BUTTON);
      element.classList.remove(className.FULLSCREEN_EXIT_BUTTON);
    }
  };
}

export default FullscreenButton;
