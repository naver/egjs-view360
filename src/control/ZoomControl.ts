/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Motion from "../core/Motion";
import Pose from "../core/Pose";
import * as BROWSER from "../const/browser";
import { getObjectOption } from "../utils";
import { OptionGetters, ValueOf } from "../type/utils";

import CameraControl from "./CameraControl";

/**
 * @interface
 * @param {ZOOM_TYPE} [type="fov"] Zoom control type.
 * @param {number} [scale=1] Scale factor for panning.
 * @param {number} [duration=300] Duration of the input animation (ms)
 * @param {number} [minFov=1] Minimum vertical fov(field of view).
 * Only available when type is "fov".
 * You can get a bigger image with the smaller value of this.
 * @param {number} [maxFov="auto"] Maximum vertical fov(field of view).
 * Only available when type is "fov".
 * You can get a smaller image with the bigger value of this.
 * If `"auto"` is given, it will use Math.min(default fov + 45, 175).
 * @param {number} [minDistance=0.1] Minimum camera distance. This will be scaled to camera's default distance({@link camera.baseDistance Camera#baseDistance})
 * Only available when type is "distance".
 * @param {number} [maxDistance=2] Maximum camera distance. This will be scaled to camera's default distance({@link camera.baseDistance Camera#baseDistance})
 * Only available when type is "distance".
 * @param {function} [easing=EASING.EASE_OUT_CUBIC] Easing function of the animation.
 */
export interface ZoomControlOptions {
  scale: number;
  duration: number;
  minFov: number;
  maxFov: typeof AUTO | number;
  easing: (x: number) => number;
}

/**
 * Distance controller handling both mouse wheel and pinch zoom(fov)
 */
class ZoomControl implements CameraControl, OptionGetters<ZoomControlOptions> {
  // Options
  private _scale: ZoomControlOptions["scale"];
  private _duration: ZoomControlOptions["duration"];
  private _minFov: ZoomControlOptions["minFov"];
  private _maxFov: ZoomControlOptions["maxFov"];
  private _easing: ZoomControlOptions["easing"];

  // Internal values
  private _view3D: View3D;
  private _scaleModifier: number = 1;
  private _wheelModifier: number = 0.02;
  private _touchModifier: number = 0.05;
  private _motion: Motion;
  private _prevTouchDistance: number = -1;
  private _enabled: boolean = false;
  private _isFirstTouch: boolean = true;
  private _isWheelScrolling: boolean = false;

  /**
   * Whether this control is enabled or not
   * @readonly
   */
  public get enabled() { return this._enabled; }
  /**
   * Whether this control is animating the camera
   * @readonly
   * @type {boolean}
   */
  public get animating() { return this._motion.activated; }
  /**
   * Currenet fov/distance range
   * @readonly
   * @type {Range}
   */
  public get range() { return this._motion.range; }

  /**
   * Current control type
   * @readonly
   * @see {ZOOM_TYPE}
   * @default "fov"
   */
  public get type() { return this._type; }
  /**
   * Scale factor of the zoom
   * @type number
   * @default 1
   */
  public get scale() { return this._scale; }
  /**
   * Duration of the input animation (ms)
   * @type {number}
   * @default 300
   */
  public get duration() { return this._duration; }
  /**
   * Minimum vertical fov(field of view).
   * Only available when type is "fov".
   * You can get a bigger image with the smaller value of this.
   * @type {number}
   * @default 1
   */
  public get minFov() { return this._minFov; }
  /**
   * Maximum vertical fov(field of view).
   * Only available when type is "fov".
   * You can get a smaller image with the bigger value of this.
   * If `"auto"` is given, it will use Math.min(default fov + 45, 175).
   * @type {"auto" | number}
   * @default "auto"
   */
  public get maxFov() { return this._maxFov; }
  /**
   * Minimum camera distance. This will be scaled to camera's default distance({@link camera.baseDistance Camera#baseDistance})
   * Only available when type is "distance".
   * @type {number}
   * @default 0.1
   */
  public get minDistance() { return this._minDistance; }
  /**
   * Maximum camera distance. This will be scaled to camera's default distance({@link camera.baseDistance Camera#baseDistance})
   * Only available when type is "distance".
   * @type {number}
   * @default 2
   */
  public get maxDistance() { return this._maxDistance; }
  public get doubleTap() { return this._doubleTap; }
  /**
   * Easing function of the animation
   * @type {function}
   * @default EASING.EASE_OUT_CUBIC
   * @see EASING
   */
  public get easing() { return this._easing; }

  public set type(val: ZoomControlOptions["type"]) {
    this._type = val;
  }

  public set scale(val: ZoomControlOptions["scale"]) { this._scale = val; }

  /**
   * Create new ZoomControl instance
   * @param {View3D} view3D An instance of View3D
   * @param {ZoomControlOptions} [options={}] Options
   */
  public constructor(view3D: View3D, {
    type = ZOOM_TYPE.FOV,
    scale = 1,
    duration = DEFAULT.ANIMATION_DURATION,
    minFov = 1,
    maxFov = AUTO,
    minDistance = 0.1,
    maxDistance = 2,
    doubleTap = true,
    easing = DEFAULT.EASING
  }: Partial<ZoomControlOptions> = {}) {
    super();

    this._view3D = view3D;
    this._type = type;
    this._scale = scale;
    this._duration = duration;
    this._minFov = minFov;
    this._maxFov = maxFov;
    this._minDistance = minDistance;
    this._maxDistance = maxDistance;
    this._doubleTap = doubleTap;
    this._easing = easing;

    this._motion = new Motion({
      duration,
      easing,
      range: {
        min: -Infinity,
        max: Infinity
      }
    });
  }

  /**
   * Destroy the instance and remove all event listeners attached
   * @returns {void}
   */
  public destroy(): void {
    this.disable();
    this.reset();
    this.off();
  }

  /**
   * Reset internal values
   * @returns {void}
   */
  public reset(): void {
    this._prevTouchDistance = -1;
    this._isFirstTouch = true;
    this._isWheelScrolling = false;
  }

  /**
   * Update control by given deltaTime
   * @param deltaTime Number of milisec to update
   * @returns {void}
   */
  public update(deltaTime: number): void {
    const camera = this._view3D.camera;
    const newPose = camera.newPose;
    const motion = this._motion;
    const prevProgress = motion.progress;
    const delta = motion.update(deltaTime);
    const newProgress = motion.progress;

    newPose.zoom -= delta;

    if (this._isWheelScrolling && prevProgress < 1 && newProgress >= 1) {
      this.trigger(CONTROL_EVENTS.RELEASE, {
        inputType: INPUT_TYPE.ZOOM
      });
      this._isWheelScrolling = false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public resize(size: { width: number; height: number }) {
    // DO NOTHING
  }

  /**
   * Enable this input and add event listeners
   * @returns {void}
   */
  public enable(): void {
    if (this._enabled) return;

    const targetEl = this._view3D.renderer.canvas;

    targetEl.addEventListener(BROWSER.EVENTS.WHEEL, this._onWheel, { passive: false, capture: false });
    targetEl.addEventListener(BROWSER.EVENTS.TOUCH_MOVE, this._onTouchMove, { passive: false, capture: false });
    targetEl.addEventListener(BROWSER.EVENTS.TOUCH_END, this._onTouchEnd, { passive: false, capture: false });
    targetEl.addEventListener(BROWSER.EVENTS.DOUBLE_CLICK, this._onDoubleClick);

    this._enabled = true;
    this.sync();

    this.trigger(CONTROL_EVENTS.ENABLE, {
      inputType: INPUT_TYPE.ZOOM
    });
  }

  /**
   * Disable this input and remove all event handlers
   * @returns {void}
   */
  public disable(): void {
    if (!this._enabled) return;

    const targetEl = this._view3D.renderer.canvas;

    targetEl.removeEventListener(BROWSER.EVENTS.WHEEL, this._onWheel, false);
    targetEl.removeEventListener(BROWSER.EVENTS.TOUCH_MOVE, this._onTouchMove, false);
    targetEl.removeEventListener(BROWSER.EVENTS.TOUCH_END, this._onTouchEnd, false);
    targetEl.removeEventListener(BROWSER.EVENTS.DOUBLE_CLICK, this._onDoubleClick);

    this._enabled = false;

    this.trigger(CONTROL_EVENTS.DISABLE, {
      inputType: INPUT_TYPE.ZOOM
    });
  }

  /**
   * Synchronize this control's state to given camera position
   * @returns {void}
   */
  public sync(): void {
    const camera = this._view3D.camera;
    const motion = this._motion;

    motion.reset(-camera.zoom);

    if (this._type === ZOOM_TYPE.FOV) {
      this._scaleModifier = -1;
    } else {
      this._scaleModifier = -camera.baseDistance / 44;
    }
  }

  /**
   * Update fov range by the camera's current fov value
   * @returns {void}
   */
  public updateRange(): void {
    const range = this._motion.range;
    const { camera } = this._view3D;

    if (this._type === ZOOM_TYPE.FOV) {
      const baseFov = camera.baseFov;
      const maxFov = this._maxFov;

      range.max = maxFov === AUTO
        ? Math.min(baseFov + 45, 175) - baseFov
        : maxFov - baseFov;
      range.min = this._minFov - baseFov;
    } else {
      range.max = camera.baseDistance * this._maxDistance - camera.baseDistance;
      range.min = camera.baseDistance * this._minDistance - camera.baseDistance;
    }
  }

  private _onWheel = (evt: WheelEvent) => {
    const wheelScrollable = this._view3D.wheelScrollable;

    if (evt.deltaY === 0 || wheelScrollable) return;

    evt.preventDefault();
    evt.stopPropagation();

    const motion = this._motion;
    const delta = -this._scale * this._scaleModifier * this._wheelModifier * evt.deltaY;

    if (!this._isWheelScrolling) {
      this.trigger(CONTROL_EVENTS.HOLD, {
        inputType: INPUT_TYPE.ZOOM
      });
    }
    this._isWheelScrolling = true;

    motion.setEndDelta(delta);
  };

  private _onTouchMove = (evt: TouchEvent) => {
    const touches = evt.touches;
    if (touches.length !== 2) return;

    if (evt.cancelable !== false) {
      evt.preventDefault();
    }
    evt.stopPropagation();

    const motion = this._motion;
    const prevTouchDistance = this._prevTouchDistance;

    const touchPoint1 = new THREE.Vector2(touches[0].pageX, touches[0].pageY);
    const touchPoint2 = new THREE.Vector2(touches[1].pageX, touches[1].pageY);
    const touchDiff = touchPoint1.sub(touchPoint2);
    const touchDistance = touchDiff.length() * this._scale * this._scaleModifier * this._touchModifier;
    const delta = this._isFirstTouch
      ? 0
      : touchDistance - prevTouchDistance;

    this._prevTouchDistance = touchDistance;

    if (this._isFirstTouch) {
      this.trigger(CONTROL_EVENTS.HOLD, {
        inputType: INPUT_TYPE.ZOOM
      });
    }

    this._isFirstTouch = false;

    motion.setEndDelta(delta);
  };

  private _onTouchEnd = (evt: TouchEvent) => {
    if (evt.touches.length !== 0) return;

    this.trigger(CONTROL_EVENTS.RELEASE, {
      inputType: INPUT_TYPE.ZOOM
    });

    this._prevTouchDistance = -1;
    this._isFirstTouch = true;
  };

  private _onDoubleClick = (evt: MouseEvent) => {
    const view3D = this._view3D;
    if (!this._doubleTap || !view3D.model) return;

    const {
      zoomIn = 0.8,
      duration = DEFAULT.ANIMATION_DURATION,
      easing = DEFAULT.EASING,
      useZoomOut = true
    } = getObjectOption(this._doubleTap);
    const zoomRange = this._motion.range;
    const maxZoom = -zoomRange.min * zoomIn;

    if (view3D.camera.zoom >= maxZoom && useZoomOut) {
      const resetPose = view3D.camera.currentPose.clone();
      resetPose.zoom = 0;

      void view3D.camera.reset(duration, easing, resetPose);
      return;
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const canvasSize = view3D.renderer.canvasSize;
    pointer.x = (evt.offsetX / canvasSize.x) * 2 - 1;
    pointer.y = -(evt.offsetY / canvasSize.y) * 2 + 1;

    raycaster.setFromCamera(pointer, view3D.camera.threeCamera);

    const intersects = raycaster.intersectObject(view3D.model.scene);

    if (!intersects.length) return;

    // Nearest
    const intersect = intersects[0];
    const newPivot = intersect.point;

    const { yaw, pitch } = view3D.camera;
    const resetPose = new Pose(yaw, pitch, maxZoom, newPivot.toArray());

    void view3D.camera.reset(duration, easing, resetPose);
  };
}

export default ZoomControl;
