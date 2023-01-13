/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import { mat4, quat, vec3 } from "gl-matrix";
import CameraAnimation from "./CameraAnimation";
import {
  CAMERA_EVENTS,
  DEG_TO_RAD,
  INFINITE_RANGE,
  DEFAULT_PITCH_RANGE,
  RAD_TO_DEG,
  DEFAULT_ZOOM_RANGE,
  DEFAULT_EASING,
  EPSILON
} from "../const/internal";
import {
  circulate,
  clamp,
  eulerToQuat,
  quatToEuler,
  toVerticalFov
} from "../utils";
import { Range } from "../type/utils";

/**
 * Events that {@link Camera} can trigger
 * @ko {@link Camera}가 트리거할 수 있는 이벤트들
 * @since 4.0.0
 */
export interface CameraEvents {
  /**
   * An event that fires when camera's animation stops
   * @ko 카메라 애니메이션이 멈췄을 때 트리거되는 이벤트
   * @eventName animationEnd
   * @eventOf Camera
   * @version 4.0.0
   */
  [CAMERA_EVENTS.ANIMATION_END]: {
    animation: CameraAnimation
  };
}

/**
 * Options for {@link Camera}
 * @ko {@link Camera}용 옵션들
 * @since 4.0.0
 */
export interface CameraOptions {
  /**
   * @copy View360#initialYaw
   */
  initialYaw: number;
  /**
   * @copy View360#initialPitch
   */
  initialPitch: number;
  /**
   * @copy View360#initialZoom
   */
  initialZoom: number;
  /**
   * @copy View360#yawRange
   */
  yawRange: Range | null;
  /**
   * @copy View360#pitchRange
   */
  pitchRange: Range | null;
  /**
   * @copy View360#zoomRange
   */
  zoomRange: Range | null;
  /**
   * @copy View360#fov
   */
  fov: number;
}

/**
 * Camera for View360
 * @ko View360용 카메라 구현체
 * @version 4.0.0
 */
class Camera extends Component<CameraEvents> {
  /**
   * Current yaw(y-axis rotation) value
   * @ko 현재 yaw(y축 회전) 값
   * @since 4.0.0
   */
  public yaw: number;
  /**
   * Current pitch(x-axis rotation) value
   * @ko 현재 pitch(x축 회전) 값
   * @since 4.0.0
   */
  public pitch: number;
  /**
   * Current zoom value
   * @ko 현재 줌 값
   * @since 4.0.0
   */
  public zoom: number;

  /**
   * @copy View360#initialYaw
   */
  public initialYaw: number;
  /**
   * @copy View360#initialPitch
   */
  public initialPitch: number;
  /**
   * @copy View360#initialPitch
   */
  public initialZoom: number;
  /**
   * @hidden
   * TODO: Please add comment for this when `rollOffset` is added
   */
  public rollOffset: number;

  /**
   * Current camera quaternion
   * @ko 현재 회전을 나타내는 quaternion 값
   * @since 4.0.0
   * @internal
   */
  public quaternion: quat;
  /**
   * Current camera position
   * @ko 현재 카메라 위치 좌표
   * @since 4.0.0
   * @internal
   */
  public position: vec3;
  /**
   * Active camera animation, `null` if there isn't.
   * @ko 현재 활성화된 카메라 애니메이션, 없을 경우 `null`값을 가집니다.
   * @since 4.0.0
   */
  public animation: CameraAnimation | null;
  /**
   * Camera's view matrix
   * @ko 카메라의 뷰 변환 행렬
   * @internal
   * @since 4.0.0
   */
  public viewMatrix: mat4;
  /**
   * Camera's projection matrix
   * @ko 카메라의 프로젝션 변환 행렬
   * @internal
   * @since 4.0.0
   */
  public projectionMatrix: mat4;

  /**
   * Camera's horizontal FOV(Field of View) value
   * @ko 카메라의 수평 FOV(Field of View) 값
   * @internal
   * @since 4.0.0
   */
  public fov: number;

  private _initialYawRange: Range | null;
  private _initialPitchRange: Range | null;
  private _initialZoomRange: Range | null;

  private _yawRange: Range | null;
  private _pitchRange: Range | null;
  private _zoomRange: Range | null;

  private _up: vec3;
  private _aspect: number;
  private _changed: boolean;
  private _maxRenderHeight: number;

  /**
   * Camera's width / height ratio
   * @ko 카메라의 가로 / 세로 비율
   * @readonly
   */
  public get aspect() { return this._aspect; }
  /**
   * Whether the camera's rotation changed from the last frame.
   * @ko 마지막 프레임 이후로 카메라의 회전값이 변경되었는지 나타내는 플래그.
   * @readonly
   */
  public get changed() { return this._changed; }
  /**
   * @copy View360#yawRange
   */
  public get yawRange() { return this._initialYawRange; }
  public set yawRange(val: Range | null) {
    this._initialYawRange = val;
  }
  /**
   * @copy View360#pitchRange
   */
  public get pitchRange() { return this._initialPitchRange; }
  public set pitchRange(val: Range | null) {
    this._initialPitchRange = val;
  }
  /**
   * @copy View360#zoomRange
   */
  public get zoomRange() { return this._initialZoomRange; }
  public set zoomRange(val: Range | null) {
    this._initialZoomRange = val;
  }

  /**
   * Create new instance of Camera
   * @param options - Camera options {@ko 카메라 옵션들}
   */
  public constructor({
    initialYaw,
    initialPitch,
    initialZoom,
    yawRange,
    pitchRange,
    zoomRange,
    fov
  }: CameraOptions) {
    super();

    this.yaw = initialYaw;
    this.pitch = initialPitch;
    this.zoom = initialZoom;
    this.rollOffset = 0;

    this.initialYaw = initialYaw;
    this.initialPitch = initialPitch;
    this.initialZoom = initialZoom;

    this.position = vec3.create();
    this.animation = null;

    this._up = vec3.fromValues(0, 1, 0);
    this._aspect = 1;

    this._initialYawRange = yawRange;
    this._initialPitchRange = pitchRange;
    this._initialZoomRange = zoomRange;

    this._yawRange = yawRange;
    this._pitchRange = pitchRange;
    this._zoomRange = zoomRange;

    this.quaternion = quat.create();
    this._updateQuaternion();

    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
    this.fov = fov;

    this._maxRenderHeight = -1;
  }

  /**
   * Destroy instance and detach all event listeners
   * @ko 인스턴스를 삭제하고 모든 이벤트 리스너를 삭제합니다.
   * @since 4.0.0
   */
  public destroy() {
    this.off();
  }

  /**
   * Refresh internal size value.
   * @ko 내부 크기값을 갱신합니다.
   * @param width - New width {@ko 변경된 너비값}
   * @param height - New height {@ko 변경된 높이값}
   * @since 4.0.0
   */
  public resize(width: number, height: number) {
    const prevAspect = this._aspect;

    this._aspect = width / height;

    if (this._aspect !== prevAspect) {
      this.updateMatrix();
    }
  }

  /**
   * Change camera's rotation with euler values.
   * @ko 카메라 회전을 오일러 각 방향으로 변경합니다.
   * @param rotation - Rotation values {@ko 회전 값}
   * @param rotation.yaw - yaw(y-axis rotation) to look at {@ko 바라볼 yaw(y축 회전) 값}
   * @param rotation.pitch - pitch(x-axis rotation) to look at {@ko 바라볼 pitch(x축 회전) 값}
   * @param rotation.zoom - zoom value to apply {@ko 적용할 카메라 줌 값}
   * @since 4.0.0
   */
  public lookAt({
    yaw = this.yaw,
    pitch = this.pitch,
    zoom = this.zoom
  }: Partial<{
    yaw: number;
    pitch: number;
    zoom: number;
  }>) {
    const prevQuaternion = quat.clone(this.quaternion);
    const prevZoom = this.zoom;

    this.yaw = circulate(yaw, 0, 360);
    this.pitch = clamp(pitch, -90, 90);
    this.zoom = zoom;

    this._updateQuaternion();

    const zoomDiff = Math.abs(zoom - prevZoom);

    if (
      !quat.equals(this.quaternion, prevQuaternion)
      || zoomDiff >= EPSILON * 10 // ignore small changes
    ) {
      this.updateMatrix();
    }
  }

  /**
   * Change camera's rotation with quaternion.
   * @ko 카메라 회전을 Quaternion을 이용해서 변경합니다.
   * @param rotation - Quaternion to apply {@ko 적용할 Quaternion}
   * @param zoom - zoom value to apply {@ko 적용할 카메라 줌 값}
   * @since 4.0.0
   */
  public rotate(rotation: quat, zoom: number = this.zoom) {
    const normalized = quat.normalize(quat.create(), rotation);
    const isSameRotation = quat.equals(this.quaternion, normalized);
    quat.copy(this.quaternion, normalized);

    const prevZoom = this.zoom;
    const { yaw, pitch } = quatToEuler(normalized);

    this.yaw = yaw;
    this.pitch = pitch;
    this.zoom = zoom;

    const zoomDiff = Math.abs(zoom - prevZoom);

    if (!isSameRotation || zoomDiff >= EPSILON * 10) {
      this.updateMatrix();
    }
  }

  /**
   * Change camera's rotation to given euler values by the given duration.
   * @ko 카메라를 주어진 방향으로 주어진 시간동안 서서히 이동시킵니다.
   * @param options - Animation parameters {@ko 애니메이션 패러미터}
   * @param options.yaw - yaw(y-axis rotation) to look at {@ko 바라볼 yaw(y축 회전) 값}
   * @param options.pitch - pitch(x-axis rotation) to look at {@ko 바라볼 pitch(x축 회전) 값}
   * @param options.zoom - zoom value to apply {@ko 적용할 카메라 줌 값}
   * @param options.duration - Duration of the animation {@ko 애니메이션 시간}
   * @param options.easing - Easing function for the animation {@ko 애니메이션에 적용할 easing function}
   */
  public async animateTo({
    yaw = this.yaw,
    pitch = this.pitch,
    zoom = this.zoom,
    duration = 0,
    easing = DEFAULT_EASING
  }: Partial<{
    yaw: number;
    pitch: number;
    zoom: number;
    duration: number;
    easing: (x: number) => number;
  }> = {}): Promise<void> {
    if (
      this.yaw === yaw
      && this.pitch === pitch
      && this.zoom === zoom
    ) return;

    const from = {
      rotation: quat.clone(this.quaternion),
      zoom: this.zoom
    };
    const to = {
      rotation: eulerToQuat(quat.create(), yaw, pitch, this.rollOffset),
      zoom
    };

    const animation = new CameraAnimation(this, from, to, {
      duration,
      easing
    });
    const finishPromise = animation.getFinishPromise();

    this.animation = animation;
    finishPromise.then(() => {
      this.animation = null;
      this.trigger(CAMERA_EVENTS.ANIMATION_END, { animation });
    });

    return finishPromise;
  }

  /**
   * @hidden
   */
  public restrictYawRange(min: number, max: number) {
    this._yawRange = { min, max };
  }

  /**
   * @hidden
   */
  public restrictPitchRange(min: number, max: number) {
    this._pitchRange = { min, max };
  }

  /**
   * @hidden
   */
  public restrictZoomRange(min: number, max: number) {
    this._zoomRange = { min, max };
  }

  /**
   * @hidden
   */
  public restrictRenderHeight(height: number) {
    this._maxRenderHeight = height;
  }

  /**
   * @hidden
   */
  public resetRange() {
    this._yawRange = this._initialYawRange;
    this._pitchRange = this._initialPitchRange;
    this._zoomRange = this._initialZoomRange;
    this._maxRenderHeight = -1;
  }

  /**
   * Get actual yaw range by the given zoom value.
   * @ko 주어진 zoom 값에 대한 실제 yaw 범위값을 반환합니다.
   * @since 4.0.0
   */
  public getYawRange(zoom: number) {
    const yawLimit = this._yawRange;
    const maxRenderHeight = this._maxRenderHeight;
    if (!yawLimit) return INFINITE_RANGE;

    const halfHFov = this.getHorizontalFov(zoom) * 0.5;
    let minYaw = yawLimit.min;
    let maxYaw = yawLimit.max;

    if (maxRenderHeight > 0) {
      const halfVFovRad = toVerticalFov(halfHFov * DEG_TO_RAD, this._aspect);
      const h = maxRenderHeight * 0.5;
      const t = Math.tan(halfVFovRad);
      const d = Math.sqrt((1 + h * h) / (1 + t * t));
      const theta = Math.atan(Math.tan(halfHFov * DEG_TO_RAD) * d) * RAD_TO_DEG;

      minYaw = yawLimit.min + theta;
      maxYaw = yawLimit.max - theta;
    }

    if (minYaw > maxYaw) {
      minYaw = 0;
      maxYaw = 0;
    }

    return {
      min: minYaw,
      max: maxYaw
    };
  }

  /**
   * Get actual pitch range by the given zoom value.
   * @ko 주어진 zoom 값에 대한 실제 pitch 범위값을 반환합니다.
   * @since 4.0.0
   */
  public getPitchRange(zoom: number) {
    const pitchLimit = this._pitchRange;
    const maxRenderHeight = this._maxRenderHeight;

    if (!pitchLimit) return DEFAULT_PITCH_RANGE;

    let minPitch = pitchLimit.min;
    let maxPitch = pitchLimit.max;

    if (maxRenderHeight > 0) {
      const halfVFov = this.getVerticalFov(zoom) * 0.5;

      minPitch = pitchLimit.min + halfVFov;
      maxPitch = pitchLimit.max - halfVFov;
    }

    if (minPitch > maxPitch) {
      minPitch = 0;
      maxPitch = 0;
    }

    return {
      min: Math.max(minPitch, -90),
      max: Math.min(maxPitch, 90)
    };
  }

  /**
   * Get actual zoom range in fov degrees.
   * @ko 실제 줌 범위를 fov각의 범위로 반환합니다.
   * @since 4.0.0
   */
  public getZoomRange() {
    const limit = this._zoomRange ?? DEFAULT_ZOOM_RANGE;

    // max (zoom in) -> minimum fov
    const minFov = this.getHorizontalFov(limit.max);
    const maxFov = this.getHorizontalFov(limit.min);
    const currentFov = this.getHorizontalFov(this.zoom);

    return {
      min: Math.max(minFov, 1),
      max: Math.min(maxFov, 180),
      current: currentFov
    };
  }

  /**
   * Return horizontal fov value when the given zoom is applied. (in degrees, °)
   * @ko 주어진 zoom 값이 적용되었을 때의 수평 fov값을 반환합니다. (도 단위, °)
   * @returns Zoomed horizontal FOV {@ko 줌이 적용된 수평 fov값}
   * @since 4.0.0
   */
  public getHorizontalFov(zoom = this.zoom) {
    return this._getZoomedHorizontalFov(zoom) * RAD_TO_DEG;
  }

  /**
   * Return vertical fov value when the given zoom is applied. (in degrees, °)
   * @ko 주어진 zoom 값이 적용되었을 때의 수직 fov값을 반환합니다. (도 단위, °)
   * @returns Zoomed vertical FOV {@ko 줌이 적용된 수직 fov값}
   * @since 4.0.0
   */
  public getVerticalFov(zoom = this.zoom) {
    const aspect = this._aspect;
    const hFov = this._getZoomedHorizontalFov(zoom); // In radians
    const vFov = toVerticalFov(hFov, aspect);

    return vFov * RAD_TO_DEG;
  }

  /**
   * Calculate zoom value for the given fov.
   * @ko 주어진 fov값을 zoom값으로 변환합니다.
   * @param fov horizontal fov (in degrees, °) {@ko 수평 fov 값 (도 단위, °)}
   * @since 4.0.0
   */
  public fovToZoom(fov: number) {
    const baseFov = this.fov;
    const renderingWidth = Math.tan(DEG_TO_RAD * baseFov * 0.5);
    const zoomedWidth = Math.tan(DEG_TO_RAD * fov * 0.5);

    return renderingWidth / zoomedWidth;
  }

  /**
   * Update inner matrixes.
   * @ko 내부 행렬들을 업데이트합니다.
   * @internal
   * @since 4.0.0
   */
  public updateMatrix() {
    const up = this._up;
    const aspect = this._aspect;
    const viewMatrix = this.viewMatrix;
    const projMatrix = this.projectionMatrix;
    const position = this.position;
    const rotation = this.quaternion;

    const upDir = vec3.create();
    const viewDir = vec3.fromValues(0, 0, -1);
    vec3.transformQuat(viewDir, viewDir, rotation);
    vec3.transformQuat(upDir, up, rotation);

    const hFov = this._getZoomedHorizontalFov(); // In radians
    const vFov = toVerticalFov(hFov, aspect);

    mat4.lookAt(viewMatrix, position, viewDir, upDir);
    mat4.perspective(projMatrix, vFov, aspect, 0.1, 100);

    this._changed = true;
  }

  /**
   * @hidden
   */
  public onFrameRender() {
    this._changed = false;
  }

  private _updateQuaternion() {
    eulerToQuat(this.quaternion, this.yaw, this.pitch, this.rollOffset);
  }

  /**
   * @param zoom Current zoom value
   * @returns horizontal fov including zoom, in radian
   */
  private _getZoomedHorizontalFov(zoom = this.zoom) {
    return 2 * Math.atan(Math.tan(DEG_TO_RAD * this.fov * 0.5) / zoom);
  }
}

export default Camera;
