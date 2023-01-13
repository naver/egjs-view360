/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ControlBar from "./ControlBar";
import ControlBarItem, { ControlBarItemOptions } from "./ControlBarItem";
import View360 from "../../View360";
import { circulate, getObjectOption } from "../../utils";
import * as BROWSER from "../../const/browser";
import { EVENTS } from "../../const/external";
import { SVG_NAMESPACE } from "../../const/internal";

/**
 * Options for {@link PieView}
 * @ko {@link PieView}용 옵션들
 * @category Plugin
 */
export interface PieViewOptions extends ControlBarItemOptions {
  /**
   * @copy PieView#resetCamera
   */
  resetCamera: boolean | Partial<{
    yaw: number;
    pitch: number;
    zoom: number;
    duration: number;
    easing: (x: number) => number;
  }>;
}

/**
 * Show camera direction/fov indicator.
 * @ko 카메라가 향하는 방향 및 FOV를 표시합니다.
 * @category Plugin
 * @group ControlBar
 * @since 4.0.0
 */
class PieView extends ControlBarItem {
  public readonly element: HTMLElement;

  /**
   * Set rotation to reset camera to when PieView is clicked.
   * `false` will disable this value, and `true` will enable with default options.
   * @ko PieView가 클릭되었을 때 카메라를 리셋할 방향을 지정합니다.
   * `false`일 경우 이 동작을 비활성화하며, `true`일 경우 기본값을 사용합니다.
   * @since 4.0.0
   */
  public resetCamera: PieViewOptions["resetCamera"];

  private _viewer: View360 | null;
  private _pieSVGEl: SVGSVGElement;
  private _piePathEl: SVGPathElement;
  private _rangeCircleEl: SVGCircleElement;

  /**
   * Create a new instance.
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor({
    resetCamera = true,
    position = ControlBar.POSITION.TOP_RIGHT,
    order = 9999
  }: Partial<PieViewOptions> = {}) {
    super({
      position,
      order
    });

    this.element = document.createElement(BROWSER.EL_DIV);
    this.element.title = "Reset view";
    this.resetCamera = resetCamera;
    this._createPieElements();
    this._viewer = null;
  }

  public init(viewer: View360, controlBar: ControlBar) {
    const element = this.element;

    if (!viewer.initialized) {
      viewer.once(EVENTS.READY, this._updatePie);
    } else {
      this._updatePie({ target: viewer });
    }

    const rootClass = controlBar.className.PIEVIEW_ROOT;
    element.classList.add(rootClass);

    if (this.resetCamera) {
      element.addEventListener(BROWSER.EVENTS.CLICK, this._onClick);
    }

    viewer.on(EVENTS.VIEW_CHANGE, this._updatePie);

    this._viewer = viewer;
  }

  public destroy(viewer: View360) {
    const element = this.element;

    element.removeEventListener(BROWSER.EVENTS.CLICK, this._onClick);
    element.className = "";
    viewer.off(EVENTS.READY, this._updatePie);
    viewer.off(EVENTS.VIEW_CHANGE, this._updatePie);

    this._viewer = null;
  }

  private _onClick = () => {
    const viewer = this._viewer;
    const resetCamera = this.resetCamera;

    if (!viewer || !resetCamera) return;

    const {
      yaw = viewer.initialYaw,
      pitch = viewer.initialPitch,
      zoom = viewer.initialZoom,
      duration = 500
    } = getObjectOption(resetCamera);

    viewer.camera.animateTo({
      yaw,
      pitch,
      zoom,
      duration
    });
  };

  private _createPieElements() {
    const root = this.element;
    const pieSVG = document.createElementNS(SVG_NAMESPACE, "svg");
    pieSVG.setAttribute("viewBox", "0 0 48 48");
    pieSVG.setAttribute("width", "100%");
    pieSVG.setAttribute("height", "100%");

    const piePath = document.createElementNS(SVG_NAMESPACE, "circle");

    piePath.setAttribute("stroke", "currentColor");
    piePath.setAttribute("fill", "transparent");
    piePath.setAttribute("cx", "24");
    piePath.setAttribute("cy", "24");
    piePath.setAttribute("r", "12");
    piePath.setAttribute("stroke-width", "24");
    pieSVG.appendChild(piePath);

    const rangeCircle = document.createElementNS(SVG_NAMESPACE, "circle");

    rangeCircle.setAttribute("stroke", "currentColor");
    rangeCircle.setAttribute("fill", "transparent");
    rangeCircle.setAttribute("cx", "24");
    rangeCircle.setAttribute("cy", "24");
    rangeCircle.setAttribute("r", "22.5");
    rangeCircle.setAttribute("stroke-width", "3");
    pieSVG.appendChild(rangeCircle);

    root.appendChild(pieSVG);

    this._pieSVGEl = pieSVG;
    this._piePathEl = piePath;
    this._rangeCircleEl = rangeCircle;
  }

  private _updatePie = ({ target: viewer }: { target: View360 }) => {
    const piePath = this._piePathEl;
    const rangeCircle = this._rangeCircleEl;
    const camera = viewer.camera;
    const fov = camera.getHorizontalFov();
    const yawRange = camera.getYawRange(camera.zoom);
    const halfFov = fov * 0.5;

    const pieRadius = 24 * Math.PI;
    const pieDeg = pieRadius * fov / 360;
    const pieOffset = pieRadius * (camera.yaw + halfFov + 90) / 360;

    piePath.setAttribute("stroke-dasharray", `${pieDeg} ${pieRadius - pieDeg}`);
    piePath.setAttribute("stroke-dashoffset", `${pieOffset}`);

    if (isFinite(yawRange.min) && isFinite(yawRange.max)) {
      const radius = 45 * Math.PI; // 2 * PI * r
      const min = (circulate(yawRange.min, -180, 180) - halfFov) / 360;
      const max = (circulate(yawRange.max, -180, 180) + halfFov) / 360;

      const rangeDiff = radius * Math.abs(max - min);
      const offset = -radius * (min - 0.25);

      rangeCircle.setAttribute("stroke-dasharray", `${rangeDiff} ${radius - rangeDiff}`);
      rangeCircle.setAttribute("stroke-dashoffset", `${offset}`);
    } else {
      rangeCircle.setAttribute("stroke-dasharray", "");
      rangeCircle.setAttribute("stroke-dashoffset", "");
    }
  };
}

export default PieView;
