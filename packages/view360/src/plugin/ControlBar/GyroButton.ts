/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ControlBar from "./ControlBar";
import ControlBarItem, { ControlBarItemOptions } from "./ControlBarItem";
import View360 from "../../View360";
import * as BROWSER from "../../const/browser";
import GyroControl from "../../control/GyroControl";
import { CONTROL_EVENTS } from "../../const/internal";
import { sensorCanBeEnabledIOS } from "../../utils";

/**
 * Show gyroscope control enable / disable button
 * @ko 자이로스코프 컨트롤 활성화 / 비활성화 버튼을 표시합니다.
 * @category Plugin
 * @group ControlBar
 * @since 4.0.0
 */
class GyroButton extends ControlBarItem {
  public readonly element: HTMLElement;
  private _viewer: View360 | null;
  private _controlBar: ControlBar | null;

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

    this.element = document.createElement(BROWSER.EL_DIV);
    this.element.title = "Toggle gyroscope control";
  }

  public init(viewer: View360, controlBar: ControlBar) {
    const element = this.element;
    const className = controlBar.className;

    element.addEventListener(BROWSER.EVENTS.CLICK, this._onClick);
    element.classList.add(className.CONTROLS_BUTTON);
    element.classList.add(className.UNAVAILABLE);

    const enableButton = () => {
      element.classList.remove(className.UNAVAILABLE);
      viewer.control.gyro.on(CONTROL_EVENTS.ENABLE, this._updateStyle);
      viewer.control.gyro.on(CONTROL_EVENTS.DISABLE, this._updateStyle);
    };

    if (sensorCanBeEnabledIOS()) {
      enableButton();
    } else {
      GyroControl.isAvailable().then(available => {
        if (!available) return;
        enableButton();
      });
    }

    this._controlBar = controlBar;
    this._viewer = viewer;
    this._updateStyle();
  }

  public destroy(viewer: View360) {
    const element = this.element;

    viewer.control.gyro.off(CONTROL_EVENTS.ENABLE, this._updateStyle);
    viewer.control.gyro.off(CONTROL_EVENTS.DISABLE, this._updateStyle);
    element.removeEventListener(BROWSER.EVENTS.CLICK, this._onClick);
    element.className = "";

    this._controlBar = null;
    this._viewer = null;
  }

  private _onClick = () => {
    const viewer = this._viewer;
    const controlBar = this._controlBar;

    if (!viewer || !controlBar) return;

    const gyroControl = viewer.control.gyro;
    if (gyroControl.enabled) {
      gyroControl.disable();
    } else {
      GyroControl.requestSensorPermission().then(available => {
        if (available) {
          gyroControl.enable();
        } else {
          this.element.classList.add(controlBar.className.UNAVAILABLE);
        }
      });
    }
  };

  private _updateStyle = () => {
    const element = this.element;
    const viewer = this._viewer;
    const controlBar = this._controlBar;

    if (!viewer || !controlBar) return;

    const gyroControl = viewer.control.gyro;
    const className = controlBar.className;

    if (gyroControl.enabled) {
      element.classList.add(className.GYRO_ENABLED);
      element.classList.remove(className.GYRO_DISABLED);
    } else {
      element.classList.add(className.GYRO_DISABLED);
      element.classList.remove(className.GYRO_ENABLED);
    }
  };
}

export default GyroButton;
