/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { vec2, vec3 } from "gl-matrix";
import Hotspot from "./Hotspot";
import Camera from "../core/Camera";
import WebGLRenderer from "../core/WebGLRenderer";
import View360Error from "../core/View360Error";
import { getNullableElement } from "../utils";
import ERROR from "../const/error";
import { DEFAULT_CLASS } from "../const/external";
import { DEG_TO_RAD } from "../const/internal";

/**
 * Options for {@link HotspotRenderer}
 * @ko {@link HotspotRenderer}용 옵션들
 * @since 4.0.0
 */
export interface HotspotOptions {
  /**
   * Apply scale for hotspots, makes their size sync with background panorama image.
   * @ko 핫스팟에 스케일을 적용해서 배경 파노라마 이미지의 크기 변화와 동일하게 크기를 조절합니다.
   * @since 4.0.0
   */
  zoom: boolean;
}

/**
 * Hotspot renderer
 * @ko Hotspot 렌더러
 * @since 4.0.0
 */
class HotspotRenderer {
  // Options
  private _zoom: HotspotOptions["zoom"];

  // Internal properties
  private _containerEl: HTMLElement | null;
  private _renderer: WebGLRenderer;
  private _hotspots: Hotspot[];

  /**
   * Create new instance
   * @ko 새 인스턴스를 생성합니다.
   * @param rootEl - Container element for hotspots {@ko 핫스팟들의 컨테이너 엘리먼트}
   * @param renderer - instance of WebGLRenderer {@ko WebGLRenderer의 인스턴스}
   * @param options - Hotspot options {@ko Hotspot 옵션들 }
   */
  public constructor(rootEl: HTMLElement, renderer: WebGLRenderer, {
    zoom = false
  }: Partial<HotspotOptions>) {
    this._containerEl = getNullableElement(`.${DEFAULT_CLASS.HOTSPOT_CONTAINER}`, rootEl);
    this._renderer = renderer;
    this._hotspots = [];

    this._zoom = zoom;
  }

  /**
   * Refresh hotspots by collecting hotspot elements from current hotspot root element
   * @ko 현재 핫스팟 루트 엘리먼트 내에서 핫스팟 엘리먼트들을 수집하여 갱신합니다.
   * @throws {ERROR_CODES.INSUFFICIENT_ARGS} if data-position doesn't include all x, y, z values {@ko data-position이 x, y, z좌표를 전부 포함하고 있지 않을 때}
   */
  public refresh() {
    const container = this._containerEl;
    if (!container) return;

    const hotspotEls = [].slice.apply(container.querySelectorAll(`.${DEFAULT_CLASS.HOTSPOT}`)) as HTMLElement[];
    this._hotspots = hotspotEls.map(el => this._parseHotspot(el));
  }

  /**
   * Render hotspots
   * @ko 핫스팟들을 렌더링합니다.
   * @param camera - Instance of Camera {@ko Camera의 인스턴스}
   */
  public render(camera: Camera) {
    const hotspots = this._hotspots;
    const halfWidth = this._renderer.width * 0.5;
    const halfHeight = this._renderer.height * 0.5;
    const zoom = camera.zoom;
    const centerTransform = "translate(-50%, -50%)";
    const zoomTransform = this._zoom ? `scale(${zoom})` : "";

    hotspots.forEach(hotspot => {
      const position = hotspot.position;
      const relPos = vec3.create();

      vec3.copy(relPos, position);
      vec3.transformMat4(relPos, relPos, camera.viewMatrix);
      vec3.transformMat4(relPos, relPos, camera.projectionMatrix);

      if (relPos[2] > 1 || relPos[2] < 0) {
        hotspot.element.classList.remove(DEFAULT_CLASS.HOTSPOT_VISIBLE);
        return;
      }

      const screenPos = vec2.fromValues(
        relPos[0] * halfWidth + halfWidth,
        -relPos[1] * halfHeight + halfHeight
      );

      hotspot.element.classList.add(DEFAULT_CLASS.HOTSPOT_VISIBLE);
      hotspot.element.style.transform = [
        centerTransform,
        `translate(${screenPos[0]}px, ${screenPos[1]}px)`,
        zoomTransform
      ].join(" ");
    });
  }

  private _parseHotspot(element: HTMLElement): Hotspot {
    const yawStr = element.dataset.yaw;
    const pitchStr = element.dataset.pitch;
    const positionStr = element.dataset.position;

    if (yawStr || pitchStr) {
      const yaw = yawStr ? parseFloat(yawStr) : 0;
      const pitch = pitchStr ? parseFloat(pitchStr) : 0;

      const position = this._yawPitchToVec3(yaw, pitch);

      return new Hotspot(element, position);
    } else if (positionStr) {
      const pos: number[] = positionStr.split(" ").map(val => parseFloat(val));
      if (pos.length < 3) {
        throw new View360Error(ERROR.MESSAGES.INSUFFICIENT_ARGS(positionStr, "hotspot attribute \"data-position\""), ERROR.CODES.INSUFFICIENT_ARGS);
      }

      return new Hotspot(element, vec3.fromValues(pos[0], pos[1], pos[2]));
    } else {
      // Place hotspot at yaw: 0, pitch: 0
      const defaultPos = vec3.fromValues(0, 0, -1);

      return new Hotspot(element, defaultPos);
    }
  }

  private _yawPitchToVec3(yaw: number, pitch: number) {
    const yawRad = yaw * DEG_TO_RAD;
    const pitchRad = pitch * DEG_TO_RAD;
    const position = vec3.create();

    position[1] = Math.sin(pitchRad);
    position[2] = Math.cos(pitchRad);

    position[0] = position[2] * Math.sin(-yawRad);
    position[2] = -position[2] * Math.cos(-yawRad);

    return position;
  }
}

export default HotspotRenderer;
