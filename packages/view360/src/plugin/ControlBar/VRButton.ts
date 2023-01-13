/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ControlBar from "./ControlBar";
import ControlBarItem, { ControlBarItemOptions } from "./ControlBarItem";
import View360 from "../../View360";
import * as BROWSER from "../../const/browser";

/**
 * Show VR enter button.
 * @ko VR 진입 버튼을 표시합니다.
 * @category Plugin
 * @group ControlBar
 * @since 4.0.0
 */
class VRButton extends ControlBarItem {
  public readonly element: HTMLElement;

  private _viewer: View360 | null;

  /**
   * Create a new instance.
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor({
    position = ControlBar.POSITION.MAIN_RIGHT,
    order = 9999
  }: Partial<ControlBarItemOptions> = {}) {
    super({
      position,
      order
    });

    this.element = document.createElement(BROWSER.EL_BUTTON);
    this.element.title = "Enter VR";
    this._viewer = null;
  }

  public init(viewer: View360, controlBar: ControlBar) {
    const element = this.element;
    const className = controlBar.className;

    element.classList.add(className.UNAVAILABLE);
    element.classList.add(className.VR_BUTTON);
    element.classList.add(className.CONTROLS_BUTTON);

    viewer.vr.isAvailable()
      .then(available => {
        if (available) {
          element.classList.remove(className.UNAVAILABLE);
        }
      });

    element.addEventListener(BROWSER.EVENTS.CLICK, this._onClick);
    this._viewer = viewer;
  }

  public destroy() {
    const element = this.element;

    element.className = "";
    element.removeEventListener(BROWSER.EVENTS.CLICK, this._onClick);

    this._viewer = null;
  }

  private _onClick = () => {
    const viewer = this._viewer;
    if (!viewer) return;

    viewer.vr.enter();
  };
}

export default VRButton;
