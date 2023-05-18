/*
Copyright (c) 2023-present NAVER Corp.
name: @egjs/view360
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-view360
version: 4.0.0-beta.7
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@egjs/component'), require('gl-matrix'), require('@egjs/imready')) :
    typeof define === 'function' && define.amd ? define(['@egjs/component', 'gl-matrix', '@egjs/imready'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.View360 = factory(global.Component, global.glMatrix, global.eg.ImReady));
})(this, (function (Component, glMatrix, ImReady) { 'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

    var Component__default = /*#__PURE__*/_interopDefault(Component);
    var ImReady__default = /*#__PURE__*/_interopDefault(ImReady);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Error thrown by {@link View360}
     * @ko {@link View360}이 발생시킨 에러
     * @since 4.0.0
     */
    class View360Error extends Error {
      /**
       * Create new instance of View360Error
       * @ko View360Error의 인스턴스를 생성합니다.
       * @param message - Error message {@ko 에러 메시지}
       * @param code - Error code {@ko 에러 코드}
       */
      constructor(message, code) {
        super(message);
        Object.setPrototypeOf(this, View360Error.prototype);
        this.name = "View360Error";
        this.code = code;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Error codes of {@link View360Error}
     * @ko {@link View360Error}가 가질 수 있는 에러 코드 값들
     * @since 4.0.0
     */
    const ERROR_CODES = {
      /**
       * The given value's type is not expected
       * @ko 주어진 값의 타입이 잘못되었을 경우
       * @since 4.0.0
       */
      WRONG_TYPE: 0,
      /**
       * The given value is not a supported option
       * @ko 잘못된 옵션을 받았을 경우
       * @since 4.0.0
       */
      WRONG_OPTION: 1,
      /**
       * The element with given CSS selector does not exist
       * @ko 주어진 CSS 셀렉터로 엘리먼트를 찾지 못했을 경우
       * @since 4.0.0
       */
      ELEMENT_NOT_FOUND: 2,
      /**
       * Couldn't find canvas element inside the given container element.
       * @ko 컨테이너 엘리먼트 내부에서 캔버스 엘리먼트를 찾지 못했을 경우
       * @since 4.0.0
       */
      CANVAS_NOT_FOUND: 3,
      /**
       * The browser does not support WebGL
       * @ko 브라우저가 WebGL을 지원하지 않는 경우
       * @since 4.0.0
       */
      WEBGL_NOT_SUPPORTED: 4,
      /**
       * Failed creating canvas 2D context
       * @ko 캔버스 2D 컨텍스트를 생성하지 못한 경우
       * @since 4.0.0
       */
      FAILED_CREATE_CONTEXT_2D: 5,
      /**
       * `init()` is called before setting {@link View360Options#projection}
       * @ko {@link View360Options#projection}을 설정하기 전에 `init()`이 호출된 경우
       * @since 4.0.0
       */
      PROVIDE_PROJECTION_FIRST: 6,
      /**
       * Failed linking WebGL program. Only can be thrown when {@link View360Options#debug} is `true`.
       * @ko WebGL 프로그램 링크에 실패한 경우. {@link View360Options#debug}를 `true`로 설정한 경우에만 발생할 수 있습니다.
       * @since 4.0.0
       */
      FAILED_LINKING_PROGRAM: 7,
      /**
       * Arguments are not sufficient for the given property.
       * @ko 프로퍼티에 값이 충분히 주어지지 않았을 때
       * @since 4.0.0
       */
      INSUFFICIENT_ARGS: 8
    };
    const MESSAGES = {
      WRONG_TYPE: (val, types) => `${typeof val} is not a ${types.map(type => `"${type}"`).join(" or ")}.`,
      WRONG_OPTION: (val, optionName) => `Bad option: given "${val}" for option "${optionName}".`,
      ELEMENT_NOT_FOUND: query => `Element with selector "${query}" not found.`,
      CANVAS_NOT_FOUND: "The canvas element was not found inside the given root element.",
      WEBGL_NOT_SUPPORTED: "WebGL is not supported on this browser.",
      FAILED_CREATE_CONTEXT_2D: "Failed to create canvas 2D context",
      PROVIDE_PROJECTION_FIRST: "\"projection\" should be provided before initialization.",
      FAILED_LINKING_PROGRAM: (msg, shaderLog) => `Failed linking WebGL program - "${msg}\nShader compile Log: ${shaderLog}`,
      INSUFFICIENT_ARGS: (val, name) => `Insufficient arguments: given "${val}" for "${name}".`
    };
    var ERROR = {
      CODES: ERROR_CODES,
      MESSAGES
    };

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    const EVENTS$1 = {
      MOUSE_DOWN: "mousedown",
      MOUSE_MOVE: "mousemove",
      MOUSE_UP: "mouseup",
      TOUCH_START: "touchstart",
      TOUCH_MOVE: "touchmove",
      TOUCH_END: "touchend",
      WHEEL: "wheel",
      RESIZE: "resize",
      CONTEXT_MENU: "contextmenu",
      MOUSE_ENTER: "mouseenter",
      MOUSE_LEAVE: "mouseleave",
      POINTER_DOWN: "pointerdown",
      POINTER_MOVE: "pointermove",
      POINTER_UP: "pointerup",
      POINTER_CANCEL: "pointercancel",
      POINTER_ENTER: "pointerenter",
      POINTER_LEAVE: "pointerleave",
      KEY_DOWN: "keydown",
      KEY_UP: "keyup",
      LOAD: "load",
      ERROR: "error",
      CLICK: "click",
      DOUBLE_CLICK: "dblclick",
      CONTEXT_CREATE_ERROR: "webglcontextcreationerror",
      CONTEXT_LOST: "webglcontextlost",
      CONTEXT_RESTORED: "webglcontextrestored",
      DEVICE_ORIENTATION: "deviceorientation",
      DEVICE_MOTION: "devicemotion",
      ORIENTATION_CHANGE: "orientationchange",
      VIDEO_PLAY: "play",
      VIDEO_PAUSE: "pause",
      VIDEO_LOADED_DATA: "loadeddata",
      VIDEO_VOLUME_CHANGE: "volumechange",
      VIDEO_TIME_UPDATE: "timeupdate",
      VIDEO_DURATION_CHANGE: "durationchange",
      VIDEO_CAN_PLAYTHROUGH: "canplaythrough",
      TRANSITION_END: "transitionend",
      XR_END: "end"
    };
    const EL_DIV = "div";
    const EL_BUTTON = "button";
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button
    var MOUSE_BUTTON;
    (function (MOUSE_BUTTON) {
      MOUSE_BUTTON[MOUSE_BUTTON["LEFT"] = 0] = "LEFT";
      MOUSE_BUTTON[MOUSE_BUTTON["MIDDLE"] = 1] = "MIDDLE";
      MOUSE_BUTTON[MOUSE_BUTTON["RIGHT"] = 2] = "RIGHT";
    })(MOUSE_BUTTON || (MOUSE_BUTTON = {}));
    const CURSOR = {
      GRAB: "grab",
      GRABBING: "grabbing",
      NONE: ""
    };
    const KEY_DIRECTION = ["LEFT", "UP", "RIGHT", "DOWN"];
    var DIRECTION_KEY_CODE;
    (function (DIRECTION_KEY_CODE) {
      DIRECTION_KEY_CODE[DIRECTION_KEY_CODE["LEFT"] = 37] = "LEFT";
      DIRECTION_KEY_CODE[DIRECTION_KEY_CODE["UP"] = 38] = "UP";
      DIRECTION_KEY_CODE[DIRECTION_KEY_CODE["RIGHT"] = 39] = "RIGHT";
      DIRECTION_KEY_CODE[DIRECTION_KEY_CODE["DOWN"] = 40] = "DOWN";
    })(DIRECTION_KEY_CODE || (DIRECTION_KEY_CODE = {}));
    const SPACE_KEY_CODE = 32;
    const DIRECTION_KEY_NAME = {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      DOWN: "ArrowDown"
    };
    const SPACE_KEY_NAME = " ";
    const FULLSCREEN_REQUEST = ["requestFullscreen", "webkitRequestFullscreen", "webkitRequestFullScreen", "webkitCancelFullScreen", "mozRequestFullScreen", "msRequestFullscreen"];
    const FULLSCREEN_ELEMENT = ["fullscreenElement", "webkitFullscreenElement", "webkitCurrentFullScreenElement", "mozFullScreenElement", "msFullscreenElement"];
    const FULLSCREEN_EXIT = ["exitFullscreen", "webkitExitFullscreen", "webkitCancelFullScreen", "mozCancelFullScreen", "msExitFullscreen"];
    const FULLSCREEN_CHANGE = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Default class names
     * @ko 기본 클래스 이름들
     * @since 4.0.0
     */
    const DEFAULT_CLASS = {
      CONTAINER: "view360-container",
      CANVAS: "view360-canvas",
      CTX_LOST: "view360-ctx-lost",
      IN_VR: "view360-vr-presenting",
      HOTSPOT_CONTAINER: "view360-hotspots",
      HOTSPOT: "view360-hotspot",
      HOTSPOT_VISIBLE: "view360-hotspot-visible",
      HOTSPOT_FLIP_X: "view360-hotspot-flip-x",
      HOTSPOT_FLIP_Y: "view360-hotspot-flip-y"
    };
    /**
     * Event names
     * @ko 이벤트 이름들
     * @since 4.0.0
     * @example
     * ```ts
     * import View360, { EVENTS } from "@egjs/view360";
     *
     * const viewer = new View360("#el_id");
     *
     * viewer.on(EVENTS.READY, evt => {
     *   console.log("View360 is ready!");
     * });
     * ```
     */
    const EVENTS = {
      READY: "ready",
      LOAD_START: "loadStart",
      LOAD: "load",
      PROJECTION_CHANGE: "projectionChange",
      RESIZE: "resize",
      BEFORE_RENDER: "beforeRender",
      RENDER: "render",
      INPUT_START: "inputStart",
      INPUT_END: "inputEnd",
      VIEW_CHANGE: "viewChange",
      STATIC_CLICK: "staticClick",
      VR_START: "vrStart",
      VR_END: "vrEnd"
    };
    /**
     * Collection of predefined easing functions
     * @ko 미리 정의된 easing 함수들
     */
    const EASING = {
      LINEAR: x => x,
      SINE_WAVE: x => Math.sin(x * Math.PI * 2),
      EASE_OUT_CUBIC: x => 1 - Math.pow(1 - x, 3),
      EASE_OUT_BOUNCE: x => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (x < 1 / d1) {
          return n1 * x * x;
        } else if (x < 2 / d1) {
          return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
          return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
          return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
      }
    };

    var _a;
    const CAMERA_EVENTS = {
      CHANGE: "change",
      ANIMATION_END: "animationEnd"
    };
    const OBJECT_3D_EVENTS = {
      UPDATE: "update"
    };
    const CONTROL_EVENTS = {
      INPUT_START: "inputStart",
      CHANGE: "change",
      INPUT_END: "inputEnd",
      ENABLE: "enable",
      DISABLE: "disable",
      STATIC_CLICK: "staticClick"
    };
    const DEG_TO_RAD = Math.PI / 180;
    const RAD_TO_DEG = 180 / Math.PI;
    const DEFAULT_EASING = EASING.EASE_OUT_CUBIC;
    const DEFAULT_ANIMATION_DURATION = 300;
    const INFINITE_RANGE = {
      min: -Infinity,
      max: Infinity
    };
    const DEFAULT_PITCH_RANGE = {
      min: -90,
      max: 90
    };
    const DEFAULT_ZOOM_RANGE = {
      min: 0.6,
      max: 10
    };
    var ROTATE;
    (function (ROTATE) {
      ROTATE[ROTATE["ZERO"] = 0] = "ZERO";
      ROTATE[ROTATE["CW_90"] = 1] = "CW_90";
      ROTATE[ROTATE["CCW_90"] = 2] = "CCW_90";
      ROTATE[ROTATE["CW_180"] = 3] = "CW_180";
    })(ROTATE || (ROTATE = {}));
    // Custom event name for video time change
    const VIDEO_TIME_CHANGE_EVENT = "view360videotimechange";
    const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
    const SESSION_VR = "immersive-vr";
    const XR_REFERENCE_SPACE = "local";
    const EPSILON = (_a = Number.EPSILON) !== null && _a !== void 0 ? _a : 2.220446049250313e-16;

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    const isString = val => typeof val === "string";
    const isElement = val => !!val && val.nodeType === Node.ELEMENT_NODE;
    const createElement = (className, tag = EL_DIV) => {
      const el = document.createElement(tag);
      el.classList.add(className);
      return el;
    };
    const getNullableElement = (el, parent) => {
      let targetEl = null;
      if (isString(el)) {
        const parentEl = parent ? parent : document;
        const queryResult = parentEl.querySelector(el);
        if (!queryResult) {
          return null;
        }
        targetEl = queryResult;
      } else if (isElement(el)) {
        targetEl = el;
      }
      return targetEl;
    };
    const getElement = (el, parent) => {
      const targetEl = getNullableElement(el, parent);
      if (!targetEl) {
        if (isString(el)) {
          throw new View360Error(ERROR.MESSAGES.ELEMENT_NOT_FOUND(el), ERROR.CODES.ELEMENT_NOT_FOUND);
        } else {
          throw new View360Error(ERROR.MESSAGES.WRONG_TYPE(el, ["HTMLElement", "string"]), ERROR.CODES.WRONG_TYPE);
        }
      }
      return targetEl;
    };
    const findCanvas = (root, selector) => {
      const canvas = root.querySelector(selector);
      if (!canvas) {
        throw new View360Error(ERROR.MESSAGES.CANVAS_NOT_FOUND, ERROR.CODES.CANVAS_NOT_FOUND);
      }
      return canvas;
    };
    const range = end => {
      if (!end || end <= 0) {
        return [];
      }
      return Array.apply(0, Array(end)).map((undef, idx) => idx);
    };
    const clamp = (x, min, max) => Math.max(Math.min(x, max), min);
    // Linear interpolation between a and b
    const lerp = (a, b, t) => {
      return a * (1 - t) + b * t;
    };
    const circulate = (val, min, max) => {
      const size = Math.abs(max - min);
      if (val < min) {
        const offset = (min - val) % size;
        val = max - offset;
      } else if (val > max) {
        const offset = (val - max) % size;
        val = min + offset;
      }
      return val;
    };
    // eslint-disable-next-line @typescript-eslint/ban-types
    const merge = (target, ...srcs) => {
      srcs.forEach(source => {
        Object.keys(source).forEach(key => {
          const value = source[key];
          if (Array.isArray(target[key]) && Array.isArray(value)) {
            target[key] = [...target[key], ...value];
          } else {
            target[key] = value;
          }
        });
      });
      return target;
    };
    const findIndex = (array, checker) => {
      for (let idx = 0; idx < array.length; idx++) {
        if (checker(array[idx])) {
          return idx;
        }
      }
      return -1;
    };
    const getObjectOption = val => typeof val === "object" ? val : {};
    const toVerticalFov = (fovRadian, aspect) => {
      return Math.atan(Math.tan(fovRadian * 0.5) / aspect) * 2;
    };
    const reorderCube = (arr, order, defaultOrder = "RLUDFB") => {
      return defaultOrder.split("").map(face => order.indexOf(face)).map(index => arr[index]);
    };
    const isFullscreen = () => {
      if (!document) return false;
      for (const key of FULLSCREEN_ELEMENT) {
        if (document[key]) return true;
      }
      return false;
    };
    const sensorCanBeEnabledIOS = () => {
      return window.isSecureContext && !!DeviceMotionEvent && "requestPermission" in DeviceMotionEvent;
    };
    const hfovToZoom = (baseFov, fov) => {
      const renderingWidth = Math.tan(DEG_TO_RAD * baseFov * 0.5);
      const zoomedWidth = Math.tan(DEG_TO_RAD * fov * 0.5);
      return renderingWidth / zoomedWidth;
    };
    const eulerToQuat = (out, yaw, pitch, roll) => {
      glMatrix.quat.identity(out);
      const pitchThreshold = 0.01;
      const pitchClamped = clamp(pitch, -90 + pitchThreshold, 90 - pitchThreshold);
      glMatrix.quat.rotateY(out, out, yaw * DEG_TO_RAD);
      glMatrix.quat.rotateX(out, out, pitchClamped * DEG_TO_RAD);
      glMatrix.quat.rotateZ(out, out, roll * DEG_TO_RAD);
      return out;
    };
    /**
     * Extract euler angles from the quaternion, except roll(z-axis rotation)
     * @hidden
     */
    const quatToEuler = quaternion => {
      const x = quaternion[0];
      const y = quaternion[1];
      const z = quaternion[2];
      const w = quaternion[3];
      const x2 = x * x;
      const y2 = y * y;
      const z2 = z * z;
      const w2 = w * w;
      const unit = x2 + y2 + z2 + w2;
      const test = x * w - y * z;
      let pitch, yaw;
      if (test > 0.499995 * unit) {
        // singularity at the north pole
        pitch = Math.PI / 2;
        yaw = 2 * Math.atan2(y, x);
      } else if (test < -0.499995 * unit) {
        // singularity at the south pole
        pitch = -Math.PI / 2;
        yaw = -2 * Math.atan2(y, x);
      } else {
        const view = glMatrix.vec3.fromValues(0, 0, 1);
        const up = glMatrix.vec3.fromValues(0, 1, 0);
        glMatrix.vec3.transformQuat(view, view, quaternion);
        glMatrix.vec3.transformQuat(up, up, quaternion);
        const viewXZ = Math.sqrt(view[0] * view[0] + view[2] * view[2]);
        pitch = Math.atan2(-view[1], viewXZ);
        yaw = Math.atan2(view[0], view[2]);
      }
      return {
        pitch: clamp(pitch * RAD_TO_DEG, -90, 90),
        yaw: circulate(yaw * RAD_TO_DEG, 0, 360)
      };
    };

    /*
     * Copyright (c) 2020 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Interpolator between two values with duration
     * @ko 특정 시간동안 두 값을 보간해주는 보간기
     * @since 4.0.0
     */
    class Motion {
      /**
       * Current interpolated value
       * @ko 현재 보간된 값
       * @since 4.0.0
       */
      get val() {
        return this._val;
      }
      /**
       * Start(from) value of interpolation
       * @ko 보간 시작 값
       * @since 4.0.0
       */
      get start() {
        return this._start;
      }
      /**
       * End(to) value of interpolation
       * @ko 보간 끝 값
       * @since 4.0.0
       */
      get end() {
        return this._end;
      }
      /**
       * Interpolation progress value (0 ~ 1)
       * @ko 현재 보간 진행정도 (0 ~ 1)
       * @since 4.0.0
       */
      get progress() {
        return this._progress;
      }
      /**
       * Whether the interpolation is in active state.
       * @ko 보간 진행중인지 여부. `true`일 경우 보간이 진행중입니다.
       * @since 4.0.0
       */
      get activated() {
        return this._activated;
      }
      /**
       * Duration of the interpolation
       * @ko 보간할 시간
       * @since 4.0.0
       */
      get duration() {
        return this._duration;
      }
      set duration(val) {
        this._duration = val;
      }
      /**
       * Whether to loop interpolation on finish
       * @ko 보간이 끝난 이후에 다시 시작할지 여부
       * @since 4.0.0
       */
      get loop() {
        return this._loop;
      }
      set loop(val) {
        this._loop = val;
      }
      /**
       * Range of the interpolation
       * @ko 보간 범위
       * @since 4.0.0
       */
      get range() {
        return this._range;
      }
      /**
       * Easing function of the interpolation
       * @ko 보간에 사용되는 easing function
       * @since 4.0.0
       */
      get easing() {
        return this._easing;
      }
      set easing(val) {
        this._easing = val;
      }
      /**
       * Create new instance.
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options Options {@ko 옵션들}
       * @param options.duration Duration of the interpolation {@ko 보간할 시간}
       * @param options.loop Whether to loop interpolation on finish {@ko 보간이 끝난 이후에 다시 시작할지 여부}
       * @param options.range Range of the interpolation {@ko 보간 범위}
       * @param options.loop Easing function of the interpolation {@ko 보간에 사용되는 easing function}
       */
      constructor({
        duration = DEFAULT_ANIMATION_DURATION,
        loop = false,
        range = {
          min: 0,
          max: 1
        },
        easing = DEFAULT_EASING
      } = {}) {
        this._duration = duration;
        this._loop = loop;
        this._range = range;
        this._easing = easing;
        this._activated = false;
        this.reset(0);
      }
      /**
       * Update motion and progress it by given deltaTime
       * @ko 주어진 deltaTime만큼 보간을 진행합니다.
       * @param deltaTime - number of milisec to update motion {@ko 보간을 진행할 시간, 밀리초 단위}
       * @returns Difference(delta) of the value from the last update. {@ko 지난 업데이트 이후의 값 변화량}
       * @since 4.0.0
       */
      update(deltaTime) {
        if (!this._activated) {
          this._val = this._end;
          return 0;
        }
        const start = this._start;
        const end = this._end;
        const duration = this._duration;
        const prev = this._val;
        const loop = this._loop;
        const nextProgress = this._progress + deltaTime / duration;
        this._progress = loop ? circulate(nextProgress, 0, 1) : clamp(nextProgress, 0, 1);
        const easedProgress = this._easing(this._progress);
        this._val = lerp(start, end, easedProgress);
        if (!loop && this._progress >= 1) {
          this._activated = false;
        }
        return this._val - prev;
      }
      /**
       * Set `start`, `end` to the given value and set `progress` to 0.
       * @ko 주어진 값으로 시작 지점, 끝 지점을 초기화하고 progress를 0으로 세팅합니다.
       * @param defaultVal - Value to reset {@ko 초기화할 값}
       * @since 4.0.0
       */
      reset(defaultVal) {
        const range = this._range;
        const val = clamp(defaultVal, range.min, range.max);
        this._start = val;
        this._end = val;
        this._val = val;
        this._progress = 0;
        this._activated = false;
      }
      /**
       * Add delta to start & end and current value.
       * @ko 현재 & 끝 및 현재 값에 주어진 값을 더합니다.
       * @param delta - Delta value to add {@ko 추가할 값}
       */
      add(delta) {
        const range = this._range;
        this._start = clamp(this._start + delta, range.min, range.max);
        this._end = clamp(this._end + delta, range.min, range.max);
        this._val = clamp(this._val + delta, range.min, range.max);
      }
      /**
       * Set current value to start, and end to current value + delta, then reset progress to 0.
       * @ko 현재 값을 시작 지점으로, 그에서 delta만큼 추가된 값을 끝점으로 하고 progress를 0으로 갱신합니다.
       * @param delta - Delta value to add {@ko 추가할 값}
       */
      setNewEndByDelta(delta) {
        const range = this._range;
        this._start = this._val;
        this._end = clamp(this._end + delta, range.min, range.max);
        this._progress = 0;
        this._activated = true;
      }
      /**
       * Set new range of the interpolation.
       * @ko 보간의 범위를 변경합니다.
       * @param min - New minimum range {@ko 변경할 범위의 최소값}
       * @param max - New maximum range {@ko 변경할 범위의 최대값}
       */
      setRange(min, max) {
        this._start = clamp(this._start, min, max);
        this._end = clamp(this._end, min, max);
        this._range = {
          min,
          max
        };
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Animation of the {@link Camera}
     * @internal
     * @ko {@link Camera}의 애니메이션
     * @since 4.0.0
     */
    class CameraAnimation {
      /**
       * Duration of the animation
       * @ko 애니메이션 재생시간
       * @since 4.0.0
       */
      get duration() {
        return this._motion.duration;
      }
      set duration(val) {
        this._motion.duration = val;
      }
      /**
       * Easing function of the animation
       * @ko 애니메이션의 easing function
       * @since 4.0.0
       */
      get easing() {
        return this._motion.easing;
      }
      set easing(val) {
        this._motion.easing = val;
      }
      /**
       * Create new instance
       * @ko 새로운 인스턴스를 생성합니다.
       * @param camera - Camera to animate {@ko 애니메이션을 적용할 카메라}
       * @param from - Start pose {@ko 애니메이션이 시작 시점의 카메라의 회전 및 줌}
       * @param to - End pose {@ko 애니메이션이 끝났을 때 카메라의 회전 및 줌}
       * @param options - Options {@ko 옵션들}
       * @param options.duration - Animation duration {@ko 애니메이션 재생 시간}
       * @param options.easing - Animation easing function {@ko 애니메이션 easing function}
       */
      constructor(camera, from, to, {
        duration = DEFAULT_ANIMATION_DURATION,
        easing = DEFAULT_EASING
      } = {}) {
        this._camera = camera;
        this._motion = new Motion({
          duration,
          easing,
          range: {
            min: 0,
            max: 1
          }
        });
        this._from = from;
        this._to = to;
        this._finishPromise = new Promise(resolve => {
          this._finish = resolve;
        });
        // Enable motion
        this._motion.setNewEndByDelta(1);
      }
      /**
       * Return a promise that resolved on animation end.
       * @ko 애니메이션 재생이 끝났을 때 resolve되는 Promise를 반환합니다.
       * @since 4.0.0
       */
      getFinishPromise() {
        return this._finishPromise;
      }
      /**
       * Update animation by given deltaTime.
       * @ko 주어진 시간만큼 애니메이션을 업데이트합니다.
       * @param deltaTime Number of milisec to update {@ko 업데이트할 시간, 밀리초 단위}
       * @since 4.0.0
       */
      update(deltaTime) {
        const camera = this._camera;
        const from = this._from;
        const to = this._to;
        const motion = this._motion;
        motion.update(deltaTime);
        // Progress that easing is applied
        const progress = motion.val;
        const rotation = glMatrix.quat.create();
        const zoom = lerp(from.zoom, to.zoom, progress);
        glMatrix.quat.slerp(rotation, from.rotation, to.rotation, progress);
        camera.rotate(rotation, zoom);
        if (progress >= 1) {
          this._finish();
        }
      }
    }

    /**
     * Camera for View360
     * @ko View360용 카메라 구현체
     * @version 4.0.0
     */
    class Camera extends Component__default["default"] {
      /**
       * Camera's width / height ratio
       * @ko 카메라의 가로 / 세로 비율
       * @readonly
       */
      get aspect() {
        return this._aspect;
      }
      /**
       * Whether the camera's rotation changed from the last frame.
       * @ko 마지막 프레임 이후로 카메라의 회전값이 변경되었는지 나타내는 플래그.
       * @readonly
       */
      get changed() {
        return this._changed;
      }
      /**
       * @copy View360#yawRange
       */
      get yawRange() {
        return this._initialYawRange;
      }
      set yawRange(val) {
        this._initialYawRange = val;
      }
      /**
       * @copy View360#pitchRange
       */
      get pitchRange() {
        return this._initialPitchRange;
      }
      set pitchRange(val) {
        this._initialPitchRange = val;
      }
      /**
       * @copy View360#zoomRange
       */
      get zoomRange() {
        return this._initialZoomRange;
      }
      set zoomRange(val) {
        this._initialZoomRange = val;
      }
      /**
       * Create new instance of Camera
       * @param options - Camera options {@ko 카메라 옵션들}
       */
      constructor({
        initialYaw,
        initialPitch,
        initialZoom,
        yawRange,
        pitchRange,
        zoomRange,
        fov
      }) {
        super();
        this.yaw = initialYaw;
        this.pitch = initialPitch;
        this.zoom = initialZoom;
        this.rollOffset = 0;
        this.initialYaw = initialYaw;
        this.initialPitch = initialPitch;
        this.initialZoom = initialZoom;
        this.position = glMatrix.vec3.create();
        this.animation = null;
        this._up = glMatrix.vec3.fromValues(0, 1, 0);
        this._aspect = 1;
        this._initialYawRange = yawRange;
        this._initialPitchRange = pitchRange;
        this._initialZoomRange = zoomRange;
        this._yawRange = yawRange;
        this._pitchRange = pitchRange;
        this._zoomRange = zoomRange;
        this.quaternion = glMatrix.quat.create();
        this._updateQuaternion();
        this.viewMatrix = glMatrix.mat4.create();
        this.projectionMatrix = glMatrix.mat4.create();
        this.fov = fov;
        this._maxRenderHeight = -1;
      }
      /**
       * Destroy instance and detach all event listeners
       * @ko 인스턴스를 삭제하고 모든 이벤트 리스너를 삭제합니다.
       * @since 4.0.0
       */
      destroy() {
        this.off();
      }
      /**
       * Refresh internal size value.
       * @ko 내부 크기값을 갱신합니다.
       * @param width - New width {@ko 변경된 너비값}
       * @param height - New height {@ko 변경된 높이값}
       * @since 4.0.0
       */
      resize(width, height) {
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
      lookAt({
        yaw = this.yaw,
        pitch = this.pitch,
        zoom = this.zoom
      }) {
        const prevQuaternion = glMatrix.quat.clone(this.quaternion);
        const prevZoom = this.zoom;
        this.yaw = circulate(yaw, 0, 360);
        this.pitch = clamp(pitch, -90, 90);
        this.zoom = zoom;
        this._updateQuaternion();
        const zoomDiff = Math.abs(zoom - prevZoom);
        if (!glMatrix.quat.equals(this.quaternion, prevQuaternion) || zoomDiff >= EPSILON * 10 // ignore small changes
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
      rotate(rotation, zoom = this.zoom) {
        const normalized = glMatrix.quat.normalize(glMatrix.quat.create(), rotation);
        const isSameRotation = glMatrix.quat.equals(this.quaternion, normalized);
        glMatrix.quat.copy(this.quaternion, normalized);
        const prevZoom = this.zoom;
        const {
          yaw,
          pitch
        } = quatToEuler(normalized);
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
      animateTo({
        yaw = this.yaw,
        pitch = this.pitch,
        zoom = this.zoom,
        duration = 0,
        easing = DEFAULT_EASING
      } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          if (this.yaw === yaw && this.pitch === pitch && this.zoom === zoom) return;
          const from = {
            rotation: glMatrix.quat.clone(this.quaternion),
            zoom: this.zoom
          };
          const to = {
            rotation: eulerToQuat(glMatrix.quat.create(), yaw, pitch, this.rollOffset),
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
            this.trigger(CAMERA_EVENTS.ANIMATION_END, {
              animation
            });
          });
          return finishPromise;
        });
      }
      /**
       * @hidden
       */
      restrictYawRange(min, max) {
        this._yawRange = {
          min,
          max
        };
      }
      /**
       * @hidden
       */
      restrictPitchRange(min, max) {
        this._pitchRange = {
          min,
          max
        };
      }
      /**
       * @hidden
       */
      restrictZoomRange(min, max) {
        this._zoomRange = {
          min,
          max
        };
      }
      /**
       * @hidden
       */
      restrictRenderHeight(height) {
        this._maxRenderHeight = height;
      }
      /**
       * @hidden
       */
      resetRange() {
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
      getYawRange(zoom) {
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
      getPitchRange(zoom) {
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
      getZoomRange() {
        var _a;
        const limit = (_a = this._zoomRange) !== null && _a !== void 0 ? _a : DEFAULT_ZOOM_RANGE;
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
      getHorizontalFov(zoom = this.zoom) {
        return this._getZoomedHorizontalFov(zoom) * RAD_TO_DEG;
      }
      /**
       * Return vertical fov value when the given zoom is applied. (in degrees, °)
       * @ko 주어진 zoom 값이 적용되었을 때의 수직 fov값을 반환합니다. (도 단위, °)
       * @returns Zoomed vertical FOV {@ko 줌이 적용된 수직 fov값}
       * @since 4.0.0
       */
      getVerticalFov(zoom = this.zoom) {
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
      fovToZoom(fov) {
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
      updateMatrix() {
        const up = this._up;
        const aspect = this._aspect;
        const viewMatrix = this.viewMatrix;
        const projMatrix = this.projectionMatrix;
        const position = this.position;
        const rotation = this.quaternion;
        const upDir = glMatrix.vec3.create();
        const viewDir = glMatrix.vec3.fromValues(0, 0, -1);
        glMatrix.vec3.transformQuat(viewDir, viewDir, rotation);
        glMatrix.vec3.transformQuat(upDir, up, rotation);
        const hFov = this._getZoomedHorizontalFov(); // In radians
        const vFov = toVerticalFov(hFov, aspect);
        glMatrix.mat4.lookAt(viewMatrix, position, viewDir, upDir);
        glMatrix.mat4.perspective(projMatrix, vFov, aspect, 0.1, 100);
        this._changed = true;
      }
      /**
       * @hidden
       */
      onFrameRender() {
        this._changed = false;
      }
      _updateQuaternion() {
        eulerToQuat(this.quaternion, this.yaw, this.pitch, this.rollOffset);
      }
      /**
       * @param zoom Current zoom value
       * @returns horizontal fov including zoom, in radian
       */
      _getZoomedHorizontalFov(zoom = this.zoom) {
        return 2 * Math.atan(Math.tan(DEG_TO_RAD * this.fov * 0.5) / zoom);
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    class MouseInput extends Component__default["default"] {
      constructor() {
        super();
        this._onMouseDown = evt => {
          const el = this._el;
          if (!el || evt.button !== MOUSE_BUTTON.LEFT) return;
          evt.preventDefault();
          if (el.focus) {
            el.focus();
          } else {
            window.focus();
          }
          this._prevPos[0] = evt.clientX;
          this._prevPos[1] = evt.clientY;
          window.addEventListener(EVENTS$1.MOUSE_MOVE, this._onMouseMove, false);
          window.addEventListener(EVENTS$1.MOUSE_UP, this._onMouseUp, false);
          this.trigger(CONTROL_EVENTS.INPUT_START, {
            srcEvent: evt,
            isTouch: false,
            isKeyboard: false
          });
        };
        this._onMouseMove = evt => {
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
        this._onMouseUp = () => {
          this._prevPos[0] = 0;
          this._prevPos[1] = 0;
          window.removeEventListener(EVENTS$1.MOUSE_MOVE, this._onMouseMove, false);
          window.removeEventListener(EVENTS$1.MOUSE_UP, this._onMouseUp, false);
          this.trigger(CONTROL_EVENTS.INPUT_END, {
            isTouch: false,
            isKeyboard: false,
            scrolling: false
          });
        };
        this._el = null;
        this._prevPos = [0, 0];
      }
      enable(element) {
        if (this._el) return;
        element.addEventListener(EVENTS$1.MOUSE_DOWN, this._onMouseDown);
        this._el = element;
      }
      disable() {
        const element = this._el;
        if (!element) return;
        element.removeEventListener(EVENTS$1.MOUSE_DOWN, this._onMouseDown);
        window.removeEventListener(EVENTS$1.MOUSE_MOVE, this._onMouseMove, false);
        window.removeEventListener(EVENTS$1.MOUSE_UP, this._onMouseUp, false);
        this._el = null;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    class TouchInput extends Component__default["default"] {
      get scrollable() {
        return this._scrollable;
      }
      set scrollable(val) {
        this._scrollable = val;
      }
      constructor() {
        super();
        this._onTouchStart = evt => {
          if (evt.touches.length > 1 || this._scrolling) return;
          const touch = evt.touches[0];
          this._isFirstTouch = true;
          this._prevPos[0] = touch.clientX;
          this._prevPos[1] = touch.clientY;
          this.trigger(CONTROL_EVENTS.INPUT_START, {
            srcEvent: evt,
            isTouch: true,
            isKeyboard: false
          });
        };
        this._onTouchMove = evt => {
          // Only the one finger motion should be considered
          if (evt.touches.length > 1 || this._scrolling) return;
          const touch = evt.touches[0];
          const scrollable = this._scrollable;
          const prevPos = this._prevPos;
          const x = touch.clientX;
          const y = touch.clientY;
          const deltaX = x - prevPos[0];
          const deltaY = y - prevPos[1];
          if (this._isFirstTouch) {
            if (scrollable && !isFullscreen()) {
              if (Math.abs(deltaY) > Math.abs(deltaX)) {
                // Assume Scrolling
                this._scrolling = true;
                return;
              }
            }
            this._isFirstTouch = false;
          }
          if (evt.cancelable !== false) {
            evt.preventDefault();
          }
          this.trigger(CONTROL_EVENTS.CHANGE, {
            delta: {
              x: deltaX,
              y: deltaY
            },
            isTouch: true,
            isKeyboard: false
          });
          prevPos[0] = x;
          prevPos[1] = y;
        };
        this._onTouchEnd = evt => {
          if (evt.touches.length !== 0) return;
          const touch = evt.touches[0];
          const prevPos = this._prevPos;
          if (touch) {
            prevPos[0] = touch.clientX;
            prevPos[1] = touch.clientY;
          } else {
            prevPos[0] = 0;
            prevPos[1] = 0;
            this.trigger(CONTROL_EVENTS.INPUT_END, {
              isTouch: true,
              isKeyboard: false,
              scrolling: this._scrolling
            });
          }
          if (evt.cancelable !== false) {
            evt.preventDefault();
          }
          this._scrolling = false;
        };
        this._el = null;
        this._prevPos = [0, 0];
        this._isFirstTouch = false;
        this._scrolling = false;
        this._scrollable = false;
      }
      enable(element) {
        if (this._el) return;
        element.addEventListener(EVENTS$1.TOUCH_START, this._onTouchStart, {
          passive: false
        });
        element.addEventListener(EVENTS$1.TOUCH_MOVE, this._onTouchMove, {
          passive: false
        });
        element.addEventListener(EVENTS$1.TOUCH_END, this._onTouchEnd);
        this._el = element;
      }
      disable() {
        const element = this._el;
        if (!element) return;
        element.removeEventListener(EVENTS$1.TOUCH_START, this._onTouchStart);
        element.removeEventListener(EVENTS$1.TOUCH_MOVE, this._onTouchMove);
        element.removeEventListener(EVENTS$1.TOUCH_END, this._onTouchEnd);
        this._el = null;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    class KeyboardInput extends Component__default["default"] {
      get active() {
        const pressed = this._pressed;
        return pressed.LEFT || pressed.UP || pressed.RIGHT || pressed.DOWN;
      }
      constructor() {
        super();
        this._onKeyDown = evt => {
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
        this._onKeyUp = evt => {
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
        this._el = null;
        this._clearPressedKeys();
      }
      enable(element) {
        if (this._el) return;
        element.addEventListener(EVENTS$1.KEY_DOWN, this._onKeyDown);
        element.addEventListener(EVENTS$1.KEY_UP, this._onKeyUp);
        this._el = element;
        this._clearPressedKeys();
      }
      disable() {
        const element = this._el;
        if (!element) return;
        element.removeEventListener(EVENTS$1.KEY_DOWN, this._onKeyDown);
        element.removeEventListener(EVENTS$1.KEY_UP, this._onKeyUp);
        this._el = null;
        this._clearPressedKeys();
      }
      update() {
        const delta = this._getDeltaByPressedKeys();
        if (delta.x !== 0 || delta.y !== 0) {
          this.trigger(CONTROL_EVENTS.CHANGE, {
            delta,
            isTouch: false,
            isKeyboard: true
          });
        }
      }
      _clearPressedKeys() {
        this._pressed = KEY_DIRECTION.reduce((obj, keyName) => {
          return Object.assign(Object.assign({}, obj), {
            [keyName]: false
          });
        }, {});
      }
      _updateKeyPress(event, isEnable) {
        const pressed = this._pressed;
        const keyToUpdate = event.keyCode != null ? DIRECTION_KEY_CODE[event.keyCode] : DIRECTION_KEY_NAME[event.key];
        if (!keyToUpdate) return;
        pressed[keyToUpdate] = isEnable;
      }
      _getPressedKeyCount() {
        return KEY_DIRECTION.filter(key => this._pressed[key]).length;
      }
      _getDeltaByPressedKeys() {
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
          x,
          y
        };
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Camera's rotation control
     * @ko 카메라의 회전을 담당하는 컨트롤
     * @since 4.0.0
     */
    class RotateControl extends Component__default["default"] {
      /**
       * @copy CameraControl#enabled
       */
      get enabled() {
        return this._enabled;
      }
      /**
       * @hidden
       */
      get enableBlocked() {
        return this._enableBlocked;
      }
      /**
       * @copy CameraControl#animating
       */
      get animating() {
        return this._keyboardInput.active || this._xMotion.activated || this._yMotion.activated;
      }
      /**
       * Current yaw value
       * @ko 현재 yaw 값
       * @readonly
       * @since 4.0.0
       */
      get yaw() {
        return this._xMotion;
      }
      /**
       * Current pitch value
       * @ko 현재 pitch 값
       * @readonly
       * @since 4.0.0
       */
      get pitch() {
        return this._yMotion;
      }
      /**
       * @copy View360#scrollable
       */
      get scrollable() {
        return this._touchInput.scrollable;
      }
      set scrollable(val) {
        this._touchInput.scrollable = val;
      }
      /**
       * Scale factor for mouse/touch rotation
       * @ko 마우스/터치를 통한 회전 배율
       * @default [1, 1]
       * @since 4.0.0
       */
      get pointerScale() {
        return this._pointerScale;
      }
      set pointerScale(val) {
        this._pointerScale = val;
      }
      /**
       * Scale factor for keyboard rotation
       * @ko 키보드를 통한 회전 배율
       * @default [1, 1]
       * @since 4.0.0
       */
      get keyboardScale() {
        return this._keyboardScale;
      }
      set keyboardScale(val) {
        this._keyboardScale = val;
      }
      /**
       * Duration of the input animation (ms)
       * @ko 회전 애니메이션의 시간 (ms)
       * @default 300
       */
      get duration() {
        return this._duration;
      }
      set duration(val) {
        this._duration = val;
        this._xMotion.duration = val;
        this._yMotion.duration = val;
      }
      /**
       * Easing function of the animation
       * @ko 회전 애니메이션에 적용할 easing 함수
       * @default EASING.EASE_OUT_CUBIC
       * @see EASING
       */
      get easing() {
        return this._easing;
      }
      set easing(val) {
        this._easing = val;
        this._xMotion.easing = val;
        this._yMotion.easing = val;
      }
      /**
       * Disable X-axis(pitch) rotation.
       * @ko x축 회전(pitch)을 비활성화합니다.
       * @default false
       */
      get disablePitch() {
        return this._disablePitch;
      }
      set disablePitch(val) {
        this._disablePitch = val;
      }
      /**
       * Disable Y-axis(yaw) rotation.
       * @ko y축 회전(yaw)을 비활성화합니다.
       * @default false
       */
      get disableYaw() {
        return this._disableYaw;
      }
      set disableYaw(val) {
        this._disableYaw = val;
      }
      /**
       * Disable rotation by keyboard.
       * @ko 키보드를 이용한 회전을 비활성화합니다.
       * @default false
       */
      get disableKeyboard() {
        return this._disableKeyboard;
      }
      set disableKeyboard(val) {
        this._disableKeyboard = val;
      }
      /**
       * Create new RotateControl instance
       * @ko RotateControl의 인스턴스를 생성합니다.
       * @param controlEl - Element to attach handlers {@ko 입력을 받을 엘리먼트}
       * @param enableBlocked - Whether to disable control on init {@ko 초기화 과정에서 컨트롤 활성화 여부}
       * @param options - Options for control {@ko 컨트롤 옵션들}
       */
      constructor(controlEl, enableBlocked, {
        duration = DEFAULT_ANIMATION_DURATION,
        easing = DEFAULT_EASING,
        pointerScale = [1, 1],
        keyboardScale = [1, 1],
        disablePitch = false,
        disableYaw = false,
        disableKeyboard = false
      } = {}) {
        super();
        this._onInputStart = evt => {
          this._changedWhileDragging = false;
          this.trigger(CONTROL_EVENTS.INPUT_START, Object.assign(Object.assign({}, evt), {
            inputType: "rotate"
          }));
        };
        this._onChange = evt => {
          const delta = evt.delta;
          const invZoomScale = 1 / this._zoomScale; // Reduce speed on zoom
          const screenScale = this._screenScale;
          const keyboardScale = this._keyboardScale;
          const pointerScale = this._pointerScale;
          let scale;
          if (evt.isKeyboard) {
            scale = [keyboardScale[0] * invZoomScale, keyboardScale[1] * invZoomScale];
          } else {
            scale = [pointerScale[0] * screenScale[0] * invZoomScale, pointerScale[1] * screenScale[1] * invZoomScale];
          }
          const scaledX = delta.x * scale[0];
          const scaledY = delta.y * scale[1];
          this._xMotion.setNewEndByDelta(scaledX);
          this._yMotion.setNewEndByDelta(scaledY);
          this._changedWhileDragging = true;
        };
        this._onInputEnd = evt => {
          this.trigger(CONTROL_EVENTS.INPUT_END, Object.assign(Object.assign({}, evt), {
            inputType: "rotate"
          }));
          if (!this._changedWhileDragging && !evt.isKeyboard && !evt.scrolling) {
            this.trigger(CONTROL_EVENTS.STATIC_CLICK, {
              isTouch: evt.isTouch
            });
          }
          this._changedWhileDragging = false;
        };
        this._controlEl = controlEl;
        this._pointerScale = pointerScale;
        this._keyboardScale = keyboardScale;
        this._duration = duration;
        this._easing = easing;
        this._disablePitch = disablePitch;
        this._disableYaw = disableYaw;
        this._disableKeyboard = disableKeyboard;
        this._enableBlocked = enableBlocked;
        this._mouseInput = new MouseInput();
        this._touchInput = new TouchInput();
        this._keyboardInput = new KeyboardInput();
        this._xMotion = new Motion({
          duration,
          range: INFINITE_RANGE,
          easing
        });
        this._yMotion = new Motion({
          duration,
          range: DEFAULT_PITCH_RANGE,
          easing
        });
        this._screenScale = [1, 1];
        this._zoomScale = 1;
        this._enabled = false;
        this._changedWhileDragging = false;
        this._bindInputs();
      }
      destroy() {
        this.disable();
        this._mouseInput.off();
        this._touchInput.off();
        this._keyboardInput.off();
        this.off();
        this._changedWhileDragging = false;
      }
      /**
       * @hidden
       */
      update(delta) {
        if (!this._enabled) return;
        const xMotion = this._xMotion;
        const yMotion = this._yMotion;
        const keyboardInput = this._keyboardInput;
        if (!this._disableKeyboard) {
          keyboardInput.update();
        }
        if (!this._disablePitch) {
          yMotion.update(delta);
        }
        if (!this._disableYaw) {
          xMotion.update(delta);
        }
      }
      /**
       * @hidden
       */
      updateRange(camera, zoom) {
        const yawRange = camera.getYawRange(zoom);
        const pitchRange = camera.getPitchRange(zoom);
        this._xMotion.setRange(yawRange.min, yawRange.max);
        this._yMotion.setRange(pitchRange.min, pitchRange.max);
      }
      /**
       * @hidden
       */
      setZoomScale(val) {
        this._zoomScale = val;
      }
      /**
       * Resize control to match target size.
       * @ko 컨트롤의 내부 크기를 갱신합니다.
       * @param hfov - Camera horizontal fov in degrees {@ko 카메라의 수평방향 fov값 (도 단위)}
       * @param aspect - Camera aspect {@ko 카메라 가로/세로 비율}
       * @param width - New width {@ko 갱신된 너비}
       * @param height - New height {@ko 갱신된 높이}
       */
      resize(hfov, aspect, width, height) {
        const vfov = toVerticalFov(hfov * DEG_TO_RAD, aspect) * RAD_TO_DEG;
        this._screenScale[0] = hfov / width;
        this._screenScale[1] = vfov / height;
      }
      enable() {
        if (this._enabled) return;
        const element = this._controlEl;
        this._mouseInput.enable(element);
        this._touchInput.enable(element);
        this._keyboardInput.enable(element);
        this._enabled = true;
        this._enableBlocked = false;
        this.trigger(CONTROL_EVENTS.ENABLE, {
          control: this,
          updateCursor: true
        });
      }
      disable() {
        if (!this._enabled) return;
        this._mouseInput.disable();
        this._touchInput.disable();
        this._keyboardInput.disable();
        this._enabled = false;
        this.trigger(CONTROL_EVENTS.DISABLE, {
          updateCursor: true
        });
      }
      sync(camera) {
        this.updateRange(camera, camera.zoom);
        this._xMotion.reset(camera.yaw);
        this._yMotion.reset(camera.pitch);
      }
      _bindInputs() {
        const mouseInput = this._mouseInput;
        const touchInput = this._touchInput;
        const keyboardInput = this._keyboardInput;
        mouseInput.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
        mouseInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
        mouseInput.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
        touchInput.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
        touchInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
        touchInput.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
        keyboardInput.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
        keyboardInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
        keyboardInput.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    class WheelInput extends Component__default["default"] {
      get scrollable() {
        return this._scrollable;
      }
      set scrollable(val) {
        this._scrollable = val;
      }
      constructor() {
        super();
        this._onWheel = evt => {
          const scrollable = this._scrollable;
          if (evt.deltaY === 0 || scrollable) return;
          evt.preventDefault();
          evt.stopPropagation();
          if (this._inputTimer < 0) {
            this.trigger(CONTROL_EVENTS.INPUT_START, {
              srcEvent: evt,
              isTouch: false,
              isKeyboard: false
            });
          } else {
            this._clearTimer();
          }
          const delta = this._baseScale * evt.deltaY;
          this.trigger(CONTROL_EVENTS.CHANGE, {
            delta,
            isTouch: false,
            isKeyboard: false
          });
          this._inputTimer = window.setTimeout(() => {
            this.trigger(CONTROL_EVENTS.INPUT_END, {
              isTouch: false,
              isKeyboard: false,
              scrolling: false
            });
            this._inputTimer = -1;
          }, DEFAULT_ANIMATION_DURATION);
        };
        this._el = null;
        this._baseScale = 0.04;
        this._scrollable = false;
        this._inputTimer = -1;
      }
      enable(element) {
        if (this._el) return;
        element.addEventListener(EVENTS$1.WHEEL, this._onWheel, {
          passive: false,
          capture: false
        });
        this._el = element;
        this._clearTimer();
      }
      disable() {
        const element = this._el;
        if (!element) return;
        element.removeEventListener(EVENTS$1.WHEEL, this._onWheel, false);
        this._el = null;
        this._clearTimer();
      }
      _clearTimer() {
        window.clearTimeout(this._inputTimer);
        this._inputTimer = -1;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    class PinchInput extends Component__default["default"] {
      constructor() {
        super();
        this._onTouchMove = evt => {
          const touches = evt.touches;
          if (touches.length !== 2) return;
          if (!evt.cancelable) return;
          evt.preventDefault();
          evt.stopPropagation();
          const prevDistance = this._prevDistance;
          const diff = [touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY];
          const distance = Math.sqrt(diff[0] * diff[0] + diff[1] * diff[1]) * this._baseScale;
          const delta = this._isFirstTouch ? 0 : distance - prevDistance;
          if (this._isFirstTouch) {
            this.trigger(CONTROL_EVENTS.INPUT_START, {
              srcEvent: evt,
              isTouch: true,
              isKeyboard: false
            });
          }
          this._prevDistance = distance;
          this._isFirstTouch = false;
          this.trigger(CONTROL_EVENTS.CHANGE, {
            delta,
            isTouch: true,
            isKeyboard: false
          });
        };
        this._onTouchEnd = evt => {
          if (evt.touches.length !== 0) return;
          if (!this._isFirstTouch) {
            this.trigger(CONTROL_EVENTS.INPUT_END, {
              isTouch: true,
              isKeyboard: false,
              scrolling: false
            });
          }
          this._prevDistance = -1;
          this._isFirstTouch = true;
        };
        this._el = null;
        this._baseScale = -0.2;
        this._prevDistance = -1;
        this._isFirstTouch = true;
      }
      enable(element) {
        if (this._el) return;
        element.addEventListener(EVENTS$1.TOUCH_MOVE, this._onTouchMove, {
          passive: false,
          capture: false
        });
        element.addEventListener(EVENTS$1.TOUCH_END, this._onTouchEnd);
        this._el = element;
        this._prevDistance = -1;
        this._isFirstTouch = true;
      }
      disable() {
        const element = this._el;
        if (!element) return;
        element.removeEventListener(EVENTS$1.TOUCH_MOVE, this._onTouchMove, false);
        element.removeEventListener(EVENTS$1.TOUCH_END, this._onTouchEnd);
        this._el = null;
      }
    }

    /*
    * Copyright (c) 2023-present NAVER Corp.
    * egjs projects are licensed under the MIT license
    */
    /**
     * Camera's zoom control
     * @ko 카메라의 줌 값을 담당하는 컨트롤
     * @since 4.0.0
     */
    class ZoomControl extends Component__default["default"] {
      /**
       * @copy CameraControl#enabled
       */
      get enabled() {
        return this._enabled;
      }
      /**
       * @hidden
       */
      get enableBlocked() {
        return this._enableBlocked;
      }
      /**
       * @copy CameraControl#animating
       */
      get animating() {
        return this._motion.activated;
      }
      /**
       * Current zoom value
       * @ko 현재 줌 값
       * @since 4.0.0
       * @readonly
       */
      get zoom() {
        return this._motion.val;
      }
      /**
       * @copy View360#wheelScrollable
       */
      get scrollable() {
        return this._wheelInput.scrollable;
      }
      set scrollable(val) {
        this._wheelInput.scrollable = val;
      }
      /**
       * @hidden
       */
      get range() {
        return this._motion.range;
      }
      /**
       * Scale factor of the zoom
       * @ko 입력에 의한 줌 배율
       * @default 1
       * @since 4.0.0
       */
      get scale() {
        return this._scale;
      }
      set scale(val) {
        this._scale = val;
      }
      /**
       * Duration of the input animation (ms)
       * @ko 회전 애니메이션의 시간 (ms)
       * @default 300
       * @since 4.0.0
       */
      get duration() {
        return this._motion.duration;
      }
      /**
       * Easing function of the animation
       * @ko 회전 애니메이션에 적용할 easing 함수
       * @default EASING.EASE_OUT_CUBIC
       * @see EASING
       * @since 4.0.0
       */
      get easing() {
        return this._motion.easing;
      }
      /**
       * Create new ZoomControl instance
       * @ko ZoomControl의 인스턴스를 생성합니다.
       * @param controlEl - Element to attach handlers {@ko 입력을 받을 엘리먼트}
       * @param enableBlocked - Whether to disable control on init {@ko 초기화 과정에서 컨트롤 활성화 여부}
       * @param options - Options for control {@ko 컨트롤 옵션들}
       */
      constructor(controlEl, enableBlocked, {
        scale = 1,
        duration = DEFAULT_ANIMATION_DURATION,
        easing = DEFAULT_EASING
      } = {}) {
        super();
        this._onInputStart = evt => {
          this.trigger(CONTROL_EVENTS.INPUT_START, Object.assign(Object.assign({}, evt), {
            inputType: "zoom"
          }));
        };
        this._onChange = ({
          delta
        }) => {
          const scale = this._scale;
          const scaledDelta = delta * scale;
          this._motion.setNewEndByDelta(scaledDelta);
        };
        this._onInputEnd = evt => {
          this.trigger(CONTROL_EVENTS.INPUT_END, Object.assign(Object.assign({}, evt), {
            inputType: "zoom"
          }));
        };
        this._scale = scale;
        this._controlEl = controlEl;
        this._enableBlocked = enableBlocked;
        this._wheelInput = new WheelInput();
        this._pinchInput = new PinchInput();
        this._motion = new Motion({
          duration,
          easing,
          range: INFINITE_RANGE
        });
        this._enabled = false;
        this._bindInputs();
      }
      destroy() {
        this.disable();
        this._wheelInput.off();
        this._pinchInput.off();
        this.off();
      }
      /**
       * @hidden
       */
      update(delta) {
        if (!this._enabled) return;
        const motion = this._motion;
        motion.update(delta);
      }
      enable() {
        if (this._enabled) return;
        const element = this._controlEl;
        this._wheelInput.enable(element);
        this._pinchInput.enable(element);
        this._enabled = true;
        this._enableBlocked = false;
        this.trigger(CONTROL_EVENTS.ENABLE, {
          control: this,
          updateCursor: false
        });
      }
      disable() {
        if (!this._enabled) return;
        this._wheelInput.disable();
        this._pinchInput.disable();
        this._enabled = false;
        this.trigger(CONTROL_EVENTS.DISABLE, {
          updateCursor: false
        });
      }
      sync(camera) {
        const motion = this._motion;
        const range = camera.getZoomRange();
        motion.setRange(range.min, range.max);
        motion.reset(range.current);
      }
      _bindInputs() {
        const wheelInput = this._wheelInput;
        const pinchInput = this._pinchInput;
        wheelInput.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
        wheelInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
        wheelInput.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
        pinchInput.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
        pinchInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
        pinchInput.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    const ROTATE_CONSTANT = {
      PITCH_DELTA: 1,
      YAW_DELTA_BY_ROLL: 2,
      YAW_DELTA_BY_YAW: 3
    };
    ROTATE_CONSTANT[ROTATE_CONSTANT.PITCH_DELTA] = {
      targetAxis: [0, 1, 0],
      meshPoint: [0, 0, 1]
    };
    ROTATE_CONSTANT[ROTATE_CONSTANT.YAW_DELTA_BY_ROLL] = {
      targetAxis: [0, 1, 0],
      meshPoint: [1, 0, 0]
    };
    ROTATE_CONSTANT[ROTATE_CONSTANT.YAW_DELTA_BY_YAW] = {
      targetAxis: [1, 0, 0],
      meshPoint: [0, 0, 1]
    };
    class GyroInput extends Component__default["default"] {
      get enabled() {
        return this._enabled;
      }
      get orientationUpdated() {
        return this._orientationUpdated;
      }
      get ignoreRoll() {
        return this._ignoreRoll;
      }
      set ignoreRoll(val) {
        this._ignoreRoll = val;
      }
      constructor() {
        super();
        this._onDeviceOrientation = evt => {
          const prevOrientation = this._orientation;
          const {
            alpha,
            beta,
            gamma
          } = evt;
          if (alpha == null || beta == null || gamma == null) return;
          prevOrientation.alpha = alpha;
          prevOrientation.beta = beta;
          prevOrientation.gamma = gamma;
          this._orientationUpdated = true;
          if (this._needsCalibrate) {
            this._needsCalibrate = false;
            this._calibrateSensor();
          }
        };
        this._updateScreenOrientation = () => {
          if (window.screen && window.screen.orientation && window.screen.orientation.angle !== undefined) {
            this._screenOrientation = screen.orientation.angle;
          } else if (window.orientation !== undefined) {
            this._screenOrientation = window.orientation >= 0 ? window.orientation : 360 + window.orientation;
          } else {
            this._screenOrientation = 0;
          }
        };
        this.quaternion = glMatrix.quat.create();
        this._orientation = {
          alpha: 0,
          beta: 90,
          gamma: 0
        };
        this._yawOrigin = 0;
        this._yawOffset = 0;
        this._orientationUpdated = false;
        this._screenOrientation = 0;
        this._needsCalibrate = true;
        this._enabled = false;
      }
      enable() {
        if (this._enabled) return;
        window.addEventListener(EVENTS$1.DEVICE_ORIENTATION, this._onDeviceOrientation);
        window.addEventListener(EVENTS$1.ORIENTATION_CHANGE, this._updateScreenOrientation);
        this._updateScreenOrientation();
        this._orientationUpdated = false;
        this._needsCalibrate = true;
        this._enabled = true;
      }
      disable() {
        if (!this._enabled) return;
        window.removeEventListener(EVENTS$1.DEVICE_ORIENTATION, this._onDeviceOrientation);
        window.removeEventListener(EVENTS$1.ORIENTATION_CHANGE, this._updateScreenOrientation);
        this._enabled = false;
      }
      update() {
        this._updateRotation();
        this._orientationUpdated = false;
      }
      collectDelta() {
        if (!this._orientationUpdated) {
          return {
            pitch: 0,
            yaw: 0
          };
        }
        const prevRotation = glMatrix.quat.clone(this.quaternion);
        this._updateRotation();
        this._orientationUpdated = false;
        return this._toEulerDelta(prevRotation, this.quaternion);
      }
      setInitialRotation(yaw) {
        this._yawOrigin = yaw;
      }
      _calibrateSensor() {
        const yawOrigin = this._yawOrigin;
        const rotation = this.quaternion;
        this._yawOffset = 0;
        this._updateRotation();
        const {
          yaw: sensorYaw
        } = quatToEuler(rotation);
        this._yawOffset = sensorYaw - yawOrigin;
        this._updateRotation();
        this._needsCalibrate = false;
      }
      _updateRotation() {
        const rotation = this.quaternion;
        const {
          alpha,
          beta,
          gamma
        } = this._orientation;
        glMatrix.quat.identity(rotation);
        glMatrix.quat.rotateY(rotation, rotation, (alpha - this._yawOffset) * DEG_TO_RAD);
        glMatrix.quat.rotateX(rotation, rotation, beta * DEG_TO_RAD);
        glMatrix.quat.rotateZ(rotation, rotation, -gamma * DEG_TO_RAD);
        const screen = glMatrix.quat.create();
        const screenAngle = -this._screenOrientation * 0.5 * DEG_TO_RAD;
        const world = glMatrix.quat.fromValues(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
        glMatrix.quat.set(screen, 0, Math.sin(screenAngle), 0, Math.cos(screenAngle));
        glMatrix.quat.multiply(rotation, rotation, screen);
        glMatrix.quat.multiply(rotation, rotation, world);
        glMatrix.quat.normalize(rotation, rotation);
      }
      _toEulerDelta(prevQuat, currentQuat) {
        return {
          yaw: this._getDeltaYaw(prevQuat, currentQuat),
          pitch: this._getDeltaPitch(prevQuat, currentQuat)
        };
      }
      _getDeltaYaw(prvQ, curQ) {
        const yawDeltaByYaw = this._getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_YAW);
        const yawDeltaByRoll = this._getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL) * Math.sin(this._extractPitchFromQuat(curQ));
        return yawDeltaByRoll + yawDeltaByYaw;
      }
      _getDeltaPitch(prvQ, curQ) {
        return this._getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.PITCH_DELTA);
      }
      _getRotationDelta(prevQ, curQ, rotateKind) {
        const targetAxis = glMatrix.vec3.fromValues(ROTATE_CONSTANT[rotateKind].targetAxis[0], ROTATE_CONSTANT[rotateKind].targetAxis[1], ROTATE_CONSTANT[rotateKind].targetAxis[2]);
        const meshPoint = ROTATE_CONSTANT[rotateKind].meshPoint;
        const prevQuaternion = glMatrix.quat.clone(prevQ);
        const curQuaternion = glMatrix.quat.clone(curQ);
        glMatrix.quat.normalize(prevQuaternion, prevQuaternion);
        glMatrix.quat.normalize(curQuaternion, curQuaternion);
        let prevPoint = glMatrix.vec3.fromValues(0, 0, 1);
        let curPoint = glMatrix.vec3.fromValues(0, 0, 1);
        glMatrix.vec3.transformQuat(prevPoint, prevPoint, prevQuaternion);
        glMatrix.vec3.transformQuat(curPoint, curPoint, curQuaternion);
        glMatrix.vec3.transformQuat(targetAxis, targetAxis, curQuaternion);
        const rotateDistance = glMatrix.vec3.dot(targetAxis, glMatrix.vec3.cross(glMatrix.vec3.create(), prevPoint, curPoint));
        const rotateDirection = rotateDistance > 0 ? 1 : -1;
        // when counter clock wise, use vec3.fromValues(0,1,0)
        // when clock wise, use vec3.fromValues(0,-1,0)
        // const meshPoint1 = vec3.fromValues(0, 0, 0);
        const meshPoint2 = glMatrix.vec3.fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
        let meshPoint3;
        if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
          meshPoint3 = glMatrix.vec3.fromValues(0, rotateDirection, 0);
        } else {
          meshPoint3 = glMatrix.vec3.fromValues(rotateDirection, 0, 0);
        }
        glMatrix.vec3.transformQuat(meshPoint2, meshPoint2, curQuaternion);
        glMatrix.vec3.transformQuat(meshPoint3, meshPoint3, curQuaternion);
        const vecU = meshPoint2;
        const vecV = meshPoint3;
        const vecN = glMatrix.vec3.create();
        glMatrix.vec3.cross(vecN, vecU, vecV);
        glMatrix.vec3.normalize(vecN, vecN);
        const coefficientA = vecN[0];
        const coefficientB = vecN[1];
        const coefficientC = vecN[2];
        // a point on the plane
        curPoint = glMatrix.vec3.fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
        glMatrix.vec3.transformQuat(curPoint, curPoint, curQuaternion);
        // a point should project on the plane
        prevPoint = glMatrix.vec3.fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
        glMatrix.vec3.transformQuat(prevPoint, prevPoint, prevQuaternion);
        // distance between prevPoint and the plane
        let distance = Math.abs(prevPoint[0] * coefficientA + prevPoint[1] * coefficientB + prevPoint[2] * coefficientC);
        const projectedPrevPoint = glMatrix.vec3.create();
        glMatrix.vec3.subtract(projectedPrevPoint, prevPoint, glMatrix.vec3.scale(glMatrix.vec3.create(), vecN, distance));
        let trigonometricRatio = (projectedPrevPoint[0] * curPoint[0] + projectedPrevPoint[1] * curPoint[1] + projectedPrevPoint[2] * curPoint[2]) / (glMatrix.vec3.length(projectedPrevPoint) * glMatrix.vec3.length(curPoint));
        // defensive block
        if (trigonometricRatio > 1) {
          trigonometricRatio = 1;
        }
        const theta = Math.acos(trigonometricRatio);
        const crossVec = glMatrix.vec3.cross(glMatrix.vec3.create(), curPoint, projectedPrevPoint);
        distance = coefficientA * crossVec[0] + coefficientB * crossVec[1] + coefficientC * crossVec[2];
        let thetaDirection;
        if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
          thetaDirection = distance > 0 ? 1 : -1;
        } else {
          thetaDirection = distance < 0 ? 1 : -1;
        }
        const deltaRadian = theta * thetaDirection * rotateDirection;
        return deltaRadian * RAD_TO_DEG;
      }
      _extractPitchFromQuat(quaternion) {
        const baseV = glMatrix.vec3.fromValues(0, 0, 1);
        glMatrix.vec3.transformQuat(baseV, baseV, quaternion);
        return -1 * Math.atan2(baseV[1], Math.sqrt(Math.pow(baseV[0], 2) + Math.pow(baseV[2], 2)));
      }
    }

    /**
     * Camera's rotation control by gyroscope
     * @ko 자이로스코프를 이용한 회전 컨트롤
     * @since 4.0.0
     */
    class GyroControl extends Component__default["default"] {
      /**
       * @copy CameraControl#enabled
       */
      get enabled() {
        return this._input.enabled;
      }
      /**
       * @hidden
       */
      get enableBlocked() {
        return this._enableBlocked;
      }
      /**
       * @copy CameraControl#animating
       */
      get animating() {
        return this._input.enabled && this._input.orientationUpdated;
      }
      /**
       * When `true`, ignore gyroscope's roll(z-axis rotation) value.
       * :::caution
       * Setting `false` will ignore camera's range limit.
       * Options like {@link View360Options#yawRange}, {@link View360Options#pitchRange} are ignored, and {@link CylinderProjection} also can't force it's camera range limit.
       * :::
       * @ko `true`일 경우 자이로스코프 입력의 roll(z축 회전)값을 무시합니다.
       * :::caution
       * 이 값을 `false`로 설정할 경우 카메라 범위 제약을 무시합니다.
       * {@link View360Options#yawRange}, {@link View360Options#pitchRange}와 같은 값은 무시되며, {@link CylinderProjection} 사용시에도 범위를 벗어날 수 있습니다.
       * :::
       * @default true
       * @since 4.0.0
       */
      get ignoreRoll() {
        return this._ignoreRoll;
      }
      set ignoreRoll(val) {
        this._ignoreRoll = val;
      }
      /**
       * Return availability of the gyroscope.
       * :::caution
       * This will always return false until user permission under environments like iOS which requires user permission when using gyroscope.
       * :::
       * @ko 자이로스코프 사용 가능 여부를 반환합니다.
       * :::caution
       * iOS와 같이 GyroScope 사용시 사용자 Permission을 요구하는 환경에서는 사용자 Permission을 받기 전까지 항상 `false`입니다.
       * :::
       * @example
       * ```ts
       * const gyroAvailable = await GyroControl.isAvailable();
       * ```
       */
      static isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
          if (!DeviceMotionEvent) {
            return false;
          }
          let onDeviceMotionChange;
          const listenDeviceMotion = () => new Promise(res => {
            onDeviceMotionChange = evt => {
              res(evt.rotationRate && evt.rotationRate.alpha != null);
            };
            window.addEventListener(EVENTS$1.DEVICE_MOTION, onDeviceMotionChange);
          });
          const timeout = () => new Promise(res => {
            setTimeout(() => res(false), 1000);
          });
          return Promise.race([listenDeviceMotion(), timeout()]).then(available => {
            window.removeEventListener(EVENTS$1.DEVICE_MOTION, onDeviceMotionChange);
            return available;
          });
        });
      }
      /**
       * Request user permission for gyroscope sensor.
       * This can be used in environments like iOS which requires user permission when using gyroscope sensors.
       * @ko 사용자의 sensor permission 취득을 요청합니다.
       * iOS와 같이 gyroscope 사용시 사용자 Permission을 요구하는 환경에서 사용 가능합니다.
       * @returns Whether the permission is granted {@ko 사용자 permission 취득 여부}
       */
      static requestSensorPermission() {
        return __awaiter(this, void 0, void 0, function* () {
          // Request sensor permission, on iOS13+
          if (sensorCanBeEnabledIOS()) {
            return DeviceMotionEvent.requestPermission().then(permissionState => {
              return permissionState === "granted";
            }).catch(() => false);
          }
          return true;
        });
      }
      /**
       * Create new GyroControl instance
       * @ko GyroControl의 인스턴스를 생성합니다.
       * @param enableBlocked - Whether to disable control on init {@ko 초기화 과정에서 컨트롤 활성화 여부}
       * @param options - Options for control {@ko 컨트롤 옵션들}
       */
      constructor(enableBlocked, {
        ignoreRoll = true
      } = {}) {
        super();
        this._enableBlocked = enableBlocked;
        this._ignoreRoll = ignoreRoll;
        this._input = new GyroInput();
      }
      /**
       * @copy CameraControl#destroy
       */
      destroy() {
        this.disable();
        this._input.off();
        this.off();
      }
      /**
       * @hidden
       */
      update(camera, yaw, pitch, zoom) {
        if (!this._ignoreRoll) {
          this._updateQuaternion(camera, zoom);
        } else {
          this._updateYawPitch(camera, yaw, pitch, zoom);
        }
      }
      /**
       * @copy CameraControl#enable
       */
      enable() {
        if (this._input.enabled) return;
        this._input.enable();
        this._enableBlocked = false;
        this.trigger(CONTROL_EVENTS.ENABLE, {
          control: this,
          updateCursor: false
        });
      }
      /**
       * @copy CameraControl#disable
       */
      disable() {
        if (!this._input.enabled) return;
        this._input.disable();
        this.trigger(CONTROL_EVENTS.DISABLE, {
          updateCursor: false
        });
      }
      /**
       * @copy CameraControl#sync
       */
      sync() {} // eslint-disable-line @typescript-eslint/no-empty-function
      _updateYawPitch(camera, yaw, pitch, zoom) {
        const input = this._input;
        if (!input.enabled) return;
        const {
          yaw: yawDelta,
          pitch: pitchDelta
        } = input.collectDelta();
        yaw.add(yawDelta);
        pitch.add(pitchDelta);
        camera.lookAt({
          yaw: yaw.val,
          pitch: pitch.val,
          zoom
        });
      }
      _updateQuaternion(camera, zoom) {
        const input = this._input;
        if (!input.enabled) return;
        input.update();
        camera.rotate(input.quaternion, zoom);
      }
    }

    /**
     * Panorama control for View360
     * @ko View360용 파노라마 컨트롤
     * @since 4.0.0
     */
    class PanoControl {
      /**
       * @copy View360#useGrabCursor
       */
      get useGrabCursor() {
        return this._useGrabCursor;
      }
      set useGrabCursor(val) {
        if (val === this._useGrabCursor) return;
        this._useGrabCursor = val;
        if (val && this._enabled) {
          this._setCursor(CURSOR.GRAB);
        } else if (!val) {
          this._setCursor(CURSOR.NONE);
        }
      }
      /**
       * @copy View360#disableContextMenu
       */
      get disableContextMenu() {
        return this._disableContextMenu;
      }
      set disableContextMenu(val) {
        if (val === this._disableContextMenu) return;
        this._disableContextMenu = val;
        if (val && this._enabled) {
          this._blockContextMenu();
        } else if (!val) {
          this._restoreContextMenu();
        }
      }
      /**
       * @copy View360#disableContextMenu
       */
      get scrollable() {
        return this._rotateControl.scrollable;
      }
      set scrollable(val) {
        this._rotateControl.scrollable = val;
      }
      /**
       * @copy View360#disableContextMenu
       */
      get wheelScrollable() {
        return this._zoomControl.scrollable;
      }
      set wheelScrollable(val) {
        this._zoomControl.scrollable = val;
      }
      /**
       * When `true`, disables rotation slow-down by zoom-value.
       * @ko `true`일 경우 줌 된 정도에 따라 회전속도를 늦추는 동작을 비활성화합니다.
       * @since 4.0.0
       */
      get ignoreZoomScale() {
        return this._ignoreZoomScale;
      }
      set ignoreZoomScale(val) {
        this._ignoreZoomScale = val;
      }
      /**
       * Whether the control is enabled or not
       * @ko 컨트롤 활성화 여부를 가리키는 값
       * @readonly
       * @since 4.0.0
       */
      get enabled() {
        return this._enabled;
      }
      /**
       * @copy View360#rotate
       */
      get rotate() {
        return this._rotateControl;
      }
      /**
       * @copy View360#zoom
       */
      get zoom() {
        return this._zoomControl;
      }
      /**
       * @copy View360#gyro
       */
      get gyro() {
        return this._gyroControl;
      }
      /**
       * Whether one of the controls is animating at the moment
       * @ko 현재 컨트롤 중 하나라도 동작중인지 여부를 나타내는 값
       * @readonly
       * @since 4.0.0
       */
      get animating() {
        return this._rotateControl.animating || this._zoomControl.animating || this._gyroControl.animating;
      }
      /**
       * Create new instance.
       * @ko 새 인스턴스를 생성합니다.
       * @param element - Canvas element {@ko 캔버스 엘리먼트}
       * @param camera - Camera instance {@ko Camera 인스턴스}
       * @param options - Options for PanoControl {@ko PanoControl 옵션들}
       */
      constructor(element, camera, {
        useGrabCursor,
        scrollable,
        wheelScrollable,
        disableContextMenu,
        rotate,
        zoom,
        gyro
      }) {
        this._preventContextMenu = evt => {
          evt.preventDefault();
        };
        this._onInputStart = evt => {
          if (this._useGrabCursor && !evt.isKeyboard) {
            this._setCursor(CURSOR.GRABBING);
          }
        };
        this._onInputEnd = evt => {
          if (this._useGrabCursor && !evt.isKeyboard) {
            this._setCursor(CURSOR.GRAB);
          }
        };
        this._onEnable = ({
          control,
          updateCursor
        }) => {
          if (updateCursor && this._useGrabCursor) {
            this._setCursor(CURSOR.GRAB);
          }
          control.sync(this._camera);
        };
        this._onDisable = ({
          updateCursor
        }) => {
          if (updateCursor) {
            this._setCursor(CURSOR.NONE);
          }
        };
        this._onCameraAnimationEnd = ({
          animation
        }) => {
          animation.getFinishPromise().then(() => {
            this.sync();
          });
        };
        // Bind Options
        this._useGrabCursor = useGrabCursor;
        this._disableContextMenu = disableContextMenu;
        // Set internal values
        this._camera = camera;
        this._controlEl = element;
        this._ignoreZoomScale = false;
        this._enabled = false;
        this._rotateControl = new RotateControl(element, !rotate, getObjectOption(rotate));
        this._zoomControl = new ZoomControl(element, !zoom, getObjectOption(zoom));
        this._gyroControl = new GyroControl(!gyro, getObjectOption(gyro));
        this._rotateControl.scrollable = scrollable;
        this._zoomControl.scrollable = wheelScrollable;
        this._bindEvents();
      }
      /**
       * Destroy the instance and remove all event listeners attached.
       * This also will reset CSS cursor to initial.
       * @ko 인스턴스를 삭제하고 부착된 모든 이벤트 리스너를 제거합니다.
       * 또한, 캔버스에 적용된 CSS cursor도 제거합니다.
       * @since 4.0.0
       */
      destroy() {
        this.disable();
        this._rotateControl.destroy();
        this._zoomControl.destroy();
        this._setCursor(CURSOR.NONE);
      }
      /**
       * Resize control to match target size.
       * @ko 컨트롤이 내부에 캐시하고 있는 크기값을 갱신합니다.
       * @param width New width {@ko 변경된 너비}
       * @param height New height {@ko 변경된 높이}
       * @since 4.0.0
       */
      resize(width, height) {
        const camera = this._camera;
        this._rotateControl.resize(camera.fov, camera.aspect, width, height);
      }
      /**
       * Enable this control and add event listeners.
       * @ko 컨트롤을 활성화하고 이벤트 리스너들을 추가합니다.
       * @since 4.0.0
       */
      enable() {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._enabled) return;
          if (!this._rotateControl.enableBlocked) {
            this._rotateControl.enable();
          }
          if (!this._zoomControl.enableBlocked) {
            this._zoomControl.enable();
          }
          if (!this._gyroControl.enableBlocked) {
            if (yield GyroControl.isAvailable()) {
              this._gyroControl.enable();
            }
          }
          this.sync();
          if (this._disableContextMenu) {
            this._blockContextMenu();
          }
          this._enabled = true;
        });
      }
      /**
       * Disable this control and remove all event listeners
       * @ko 컨트롤을 비활성화하고 모든 이벤트 리스너들을 제거합니다.
       * @since 4.0.0
       */
      disable() {
        if (!this._enabled) return;
        this._rotateControl.disable();
        this._zoomControl.disable();
        this._gyroControl.disable();
        this._restoreContextMenu();
        this._enabled = false;
      }
      /**
       * Update control by given deltaTime
       * @ko 컨트롤을 주어진 시간만큼 업데이트합니다.
       * @param delta Number of milisec to update {@ko 업데이트할 시간, 밀리초 단위}
       * @since 4.0.0
       * @internal
       */
      update(delta) {
        const camera = this._camera;
        const rotateControl = this._rotateControl;
        const zoomControl = this._zoomControl;
        const gyroControl = this._gyroControl;
        zoomControl.update(delta);
        const zoom = hfovToZoom(camera.fov, zoomControl.zoom);
        // Slow down rotation on zoom-in
        const zoomScale = this._ignoreZoomScale ? 1 : Math.max(zoom, 1);
        rotateControl.setZoomScale(zoomScale);
        rotateControl.updateRange(camera, zoom);
        rotateControl.update(delta);
        const yaw = rotateControl.yaw;
        const pitch = rotateControl.pitch;
        if (gyroControl.enabled) {
          gyroControl.update(camera, yaw, pitch, zoom);
        } else {
          camera.lookAt({
            yaw: yaw.val,
            pitch: pitch.val,
            zoom
          });
        }
      }
      /**
       * Synchronize this control's state to current camera state
       * @ko 컨트롤을 카메라의 현재 상태와 동기화합니다.
       * @since 4.0.0
       */
      sync() {
        const camera = this._camera;
        this._zoomControl.sync(camera);
        this._rotateControl.sync(camera);
      }
      _blockContextMenu() {
        const el = this._controlEl;
        el.addEventListener(EVENTS$1.CONTEXT_MENU, this._preventContextMenu);
      }
      _restoreContextMenu() {
        const el = this._controlEl;
        el.removeEventListener(EVENTS$1.CONTEXT_MENU, this._preventContextMenu);
      }
      _setCursor(newCursor) {
        if (!this._useGrabCursor && newCursor !== CURSOR.NONE) return;
        const targetEl = this._controlEl;
        targetEl.style.cursor = newCursor;
      }
      _bindEvents() {
        const rotateControl = this._rotateControl;
        const zoomControl = this._zoomControl;
        rotateControl.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
        rotateControl.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
        rotateControl.on(CONTROL_EVENTS.ENABLE, this._onEnable);
        rotateControl.on(CONTROL_EVENTS.DISABLE, this._onDisable);
        zoomControl.on(CONTROL_EVENTS.ENABLE, this._onEnable);
        zoomControl.on(CONTROL_EVENTS.DISABLE, this._onDisable);
        this._camera.on(CAMERA_EVENTS.ANIMATION_END, this._onCameraAnimationEnd);
      }
    }

    /**
     * @hidden
     */
    class Texture {
      constructor({
        width,
        height,
        flipY
      }) {
        this.width = width;
        this.height = height;
        this.flipY = flipY;
        this.wrapS = WebGLRenderingContext.CLAMP_TO_EDGE;
        this.wrapT = WebGLRenderingContext.CLAMP_TO_EDGE;
      }
      destroy() {
        // DO_NOTHING
      }
      isVideo() {
        return false;
      }
      isCube() {
        return false;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @hidden
     */
    class Texture2D extends Texture {
      constructor({
        source,
        width,
        height,
        flipY
      }) {
        super({
          width,
          height,
          flipY
        });
        this.source = source;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @hidden
     */
    class TextureVideo extends Texture2D {
      destroy() {
        const video = this.source;
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
      isVideo() {
        return true;
      }
      isPaused() {
        const video = this.source;
        return video.paused || video.ended || video.readyState <= 2;
      }
      hasAudio() {
        const video = this.source;
        if (video.audioTracks) {
          return video.audioTracks.length > 0;
        }
        if (video.webkitAudioDecodedByteCount != null) {
          return video.webkitAudioDecodedByteCount > 0;
        }
        if (video.mozHasAudio != null) {
          return video.mozHasAudio;
        }
        // We don't know whether the video has audio or not, return true
        return true;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @hidden
     */
    class TextureCube extends Texture {
      constructor({
        sources,
        width,
        height,
        flipY
      }) {
        super({
          width,
          height,
          flipY
        });
        this.sources = sources;
      }
      isCube() {
        return true;
      }
    }

    /**
     * @hidden
     */
    class TextureLoader {
      constructor() {
        this._loadChecker = new ImReady__default["default"]();
      }
      load(src, video) {
        return __awaiter(this, void 0, void 0, function* () {
          if (video) {
            return this.loadVideo(src, getObjectOption(video));
          } else {
            if (Array.isArray(src) && src.length > 1) {
              return this.loadCubeImage(src);
            } else {
              const imgSrc = Array.isArray(src) ? src[0] : src;
              return this.loadImage(imgSrc);
            }
          }
        });
      }
      loadImage(src) {
        return __awaiter(this, void 0, void 0, function* () {
          const images = this._toImageArray(src);
          return this._load(images, resolve => {
            const image = images[0];
            resolve(new Texture2D({
              source: image,
              width: image.naturalWidth,
              height: image.naturalHeight,
              flipY: true
            }));
          });
        });
      }
      loadCubeImage(src) {
        return __awaiter(this, void 0, void 0, function* () {
          const images = this._toImageArray(src);
          return this._load(images, resolve => {
            resolve(new TextureCube({
              sources: images,
              width: images[0].naturalWidth,
              height: images[0].naturalHeight,
              flipY: false
            }));
          });
        });
      }
      loadVideo(src, videoConfig) {
        return __awaiter(this, void 0, void 0, function* () {
          const config = Object.assign({
            autoplay: true,
            muted: true,
            loop: false,
            volume: 1
          }, videoConfig);
          const video = this._toVideoElement(src, config);
          return this._load([video], resolve => {
            const {
              autoplay,
              muted
            } = config;
            video.currentTime = 0;
            if (autoplay && muted) {
              video.play().catch(() => void 0);
            }
            resolve(new TextureVideo({
              source: video,
              width: video.videoWidth,
              height: video.videoHeight,
              flipY: true
            }));
          });
        });
      }
      _load(content, onLoad) {
        const loader = this._loadChecker;
        return new Promise((resolve, reject) => {
          loader.once("ready", evt => {
            if (evt.errorCount > 0) return;
            onLoad(resolve);
          });
          loader.once("error", reject);
          loader.check(content);
        });
      }
      _toImageArray(src) {
        const srcs = Array.isArray(src) ? src : [src];
        return srcs.map(source => {
          if (isString(source)) {
            const imgEl = new Image();
            imgEl.crossOrigin = "anonymous";
            imgEl.src = source;
            return imgEl;
          } else {
            return source;
          }
        });
      }
      _toVideoElement(src, {
        muted,
        loop,
        volume
      }) {
        if (src instanceof HTMLVideoElement) {
          return src;
        }
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.playsInline = true;
        video.setAttribute("webkit-playsinline", "");
        video.muted = muted;
        video.volume = volume;
        video.loop = loop;
        if (Array.isArray(src)) {
          src.forEach(source => this._appendSourceElement(video, source));
        } else {
          this._appendSourceElement(video, src);
        }
        const sourceCount = video.querySelectorAll("source").length;
        if (sourceCount > 0 && video.readyState < 1) {
          video.load();
        }
        return video;
      }
      _appendSourceElement(video, src) {
        if (src instanceof HTMLSourceElement) {
          return src;
        }
        const sourceEl = document.createElement("source");
        sourceEl.src = src;
        video.appendChild(sourceEl);
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @internal
     */
    class FrameAnimator {
      /** */
      constructor(maxDeltaTime, context = window) {
        this.maxDeltaTime = maxDeltaTime;
        this._context = context;
        this._rafId = -1;
        this._rafTimer = -1;
        this._lastUpdateTime = -1;
      }
      start(callback) {
        const context = this._context;
        // No context / callback set
        if (!context || !callback) return;
        // Animation already started
        if (this._rafId >= 0 || this._rafTimer >= 0) return;
        const loop = (_time, frame) => {
          const time = Date.now();
          const delta = Math.min(time - this._lastUpdateTime, this.maxDeltaTime * 1000);
          callback(delta, frame);
          this._lastUpdateTime = time;
          this._rafId = context.requestAnimationFrame(loop);
        };
        this._lastUpdateTime = Date.now();
        this._rafId = context.requestAnimationFrame(loop);
      }
      stop() {
        if (this._rafId >= 0) {
          this._context.cancelAnimationFrame(this._rafId);
        }
        if (this._rafTimer >= 0) {
          clearTimeout(this._rafTimer);
        }
        this._rafId = -1;
        this._rafTimer = -1;
      }
      changeContext(context) {
        this.stop();
        this._context = context;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Automatic resizer that uses both ResizeObserver and window resize event
     */
    class AutoResizer {
      get useResizeObserver() {
        return this._useResizeObserver;
      }
      /**
       * Returns whether AutoResizer is enabled
       */
      get enabled() {
        return this._enabled;
      }
      /** */
      constructor(useResizeObserver, onResize) {
        // eslint-disable-next-line @typescript-eslint/member-ordering
        this._skipFirstResize = (() => {
          let isFirstResize = true;
          return () => {
            if (isFirstResize) {
              isFirstResize = false;
              return;
            }
            this._onResize();
          };
        })();
        this._useResizeObserver = useResizeObserver;
        this._enabled = false;
        this._resizeObserver = null;
        this._onResize = onResize;
      }
      /**
       * Enable resizer
       */
      enable(element) {
        if (this._enabled) {
          this.disable();
        }
        if (this._useResizeObserver && !!window.ResizeObserver) {
          const bbox = element.getBoundingClientRect();
          const resizeImmediate = bbox.width !== 0 || bbox.height !== 0;
          const resizeObserver = new ResizeObserver(resizeImmediate ? this._skipFirstResize : this._onResize);
          resizeObserver.observe(element);
          this._resizeObserver = resizeObserver;
        } else {
          window.addEventListener(EVENTS$1.RESIZE, this._onResize);
        }
        this._enabled = true;
        return this;
      }
      /**
       * Disable resizer
       */
      disable() {
        if (!this._enabled) return this;
        const resizeObserver = this._resizeObserver;
        if (resizeObserver) {
          resizeObserver.disconnect();
          this._resizeObserver = null;
        } else {
          window.removeEventListener(EVENTS$1.RESIZE, this._onResize);
        }
        this._enabled = false;
        return this;
      }
    }

    /**
     * A manager class for autoplay feature.
     * @ko Autoplay 기능의 매니저 클래스.
     * @since 4.0.0
     */
    class Autoplay {
      /**
       * Whether autoplay is enabled or not
       * @ko 자동재생 활성화 여부를 나타내는 값
       * @readonly
       * @since 4.0.0
       */
      get enabled() {
        return this._enabled;
      }
      /**
       * @hidden
       */
      get enableBlocked() {
        return this._enableBlocked;
      }
      /**
       * Whether autoplay is updating the camera at the moment
       * @ko 현재 자동재생이 동작중인지 여부를 나타내는 값
       * @readonly
       * @since 4.0.0
       */
      get playing() {
        return this._enabled && !this._interrupted;
      }
      /**
       * Reactivation delay after mouse input in milisecond.
       * @ko 재활성화되기까지의 시간 (밀리초 단위)
       * @default 2000
       * @since 4.0.0
       */
      get delay() {
        return this._delay;
      }
      set delay(val) {
        this._delay = val;
      }
      /**
       * Reactivation delay after mouse leave when using {@link AutoplayOptions#pauseOnHover}
       * @ko {@link AutoplayOptions#pauseOnHover} 사용시 마우스가 캔버스 영역을 떠난 뒤 자동재생이 다시 활성화되기까지의 시간
       * @default 0
       * @since 4.0.0
       */
      get delayOnMouseLeave() {
        return this._delayOnMouseLeave;
      }
      set delayOnMouseLeave(val) {
        this._delayOnMouseLeave = val;
      }
      /**
       * Y-axis(yaw) rotation speed
       * @ko Y-축 회전(yaw)의 속도
       * @default 1
       * @since 4.0.0
       */
      get speed() {
        return this._speed;
      }
      set speed(val) {
        this._speed = val;
      }
      /**
       * Whether to pause rotation on mouse hover
       * @ko 마우스가 캔버스 영역에 들어왔을 때 자동재생을 정지할지 여부
       * @default false
       * @since 4.0.0
       */
      get pauseOnHover() {
        return this._pauseOnHover;
      }
      set pauseOnHover(val) {
        this._pauseOnHover = val;
      }
      /**
       * Whether user can interrupt the rotation with click/wheel input
       * @ko 클릭이나 휠같은 사용자 인터랙션시 자동재생을 멈출지 여부
       * @default true
       * @since 4.0.0
       */
      get canInterrupt() {
        return this._canInterrupt;
      }
      set canInterrupt(val) {
        this._canInterrupt = val;
      }
      /**
       * Whether to disable autoplay on user interrupt
       * @ko 사용자 동작에 의해 자동재생이 정지할 때, {@link Autoplay#disable}을 호출하여 자동재생을 영구히 정지할지 여부
       * @default false
       * @since 4.0.0
       */
      get disableOnInterrupt() {
        return this._disableOnInterrupt;
      }
      set disableOnInterrupt(val) {
        this._disableOnInterrupt = val;
      }
      /**
       * Create new AutoPlayer instance
       * @param camera - Instance of the {@link Camera} {@ko Camera의 인스턴스}
       * @param element - Canvas element {@ko 캔버스 엘리먼트}
       * @param options - Autoplay options {@ko 자동재생 옵션들}
       * @since 4.0.0
       */
      constructor(viewer, element, options) {
        this._onInputStart = () => {
          if (!this._canInterrupt) return;
          this._interrupted = true;
          this._clearTimeout();
        };
        this._onInputEnd = () => {
          this._setUninterruptedAfterDelay(this._delay);
        };
        this._onGyroEnable = () => {
          this.disable();
        };
        this._onMouseEnter = () => {
          if (!this._pauseOnHover) return;
          this._interrupted = true;
          this._hovering = true;
        };
        this._onMouseLeave = () => {
          if (!this._pauseOnHover) return;
          this._hovering = false;
          this._setUninterruptedAfterDelay(this._delayOnMouseLeave);
        };
        this._camera = viewer.camera;
        this._control = viewer.control;
        this._element = element;
        this._enabled = false;
        this._interrupted = false;
        this._interruptionTimer = -1;
        this._hovering = false;
        const {
          delay = 2000,
          delayOnMouseLeave = 0,
          speed = 1,
          pauseOnHover = false,
          canInterrupt = true,
          disableOnInterrupt = false
        } = getObjectOption(options);
        this._enableBlocked = !options;
        this._delay = delay;
        this._delayOnMouseLeave = delayOnMouseLeave;
        this._speed = speed;
        this._pauseOnHover = pauseOnHover;
        this._canInterrupt = canInterrupt;
        this._disableOnInterrupt = disableOnInterrupt;
      }
      /**
       * Destroy the instance and remove all event listeners attached
       * @ko 인스턴스를 제거하고 연결된 모든 이벤트 핸들러를 삭제합니다.
       * @since 4.0.0
       */
      destroy() {
        this.disable();
      }
      /**
       * Rotate camera by given deltaTime
       * @ko 주어진 deltaTime만큼 카메라를 회전시킵니다.
       * @param deltaTime - Number of milisec to update {@ko 업데이트할 시간, 밀리초 단위}
       * @since 4.0.0
       */
      update(deltaTime) {
        if (!this._enabled) return;
        if (this._interrupted) {
          if (this._disableOnInterrupt) {
            this.disable();
          }
          return;
        }
        const camera = this._camera;
        const delta = -this._speed * deltaTime / 100;
        camera.yaw = circulate(camera.yaw + delta, 0, 360);
      }
      /**
       * Enable autoplay and add event listeners.
       * @ko 자동재생을 활성화하고 이벤트리스너들을 추가합니다.
       * @since 4.0.0
       */
      enable() {
        const control = this._control;
        const element = this._element;
        if (this._enabled || control.gyro.enabled) return;
        control.rotate.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
        control.rotate.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
        control.zoom.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
        control.zoom.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
        control.gyro.on(CONTROL_EVENTS.ENABLE, this._onGyroEnable);
        element.addEventListener(EVENTS$1.MOUSE_ENTER, this._onMouseEnter, false);
        element.addEventListener(EVENTS$1.MOUSE_LEAVE, this._onMouseLeave, false);
        this._enabled = true;
        this._enableBlocked = false;
      }
      /**
       * Enable autoplay after current `delay` value.
       * @ko 현재의 `delay`값만큼 시간이 지난 다음에 자동재생을 활성화합니다.
       * @since 4.0.0
       */
      enableAfterDelay() {
        this.enable();
        this._interrupted = true;
        this._setUninterruptedAfterDelay(this._delay);
      }
      /**
       * Disable autoplay and remove all event handlers.
       * @ko 자동재생을 비활성화하고 모든 이벤트 핸들러를 제거합니다.
       * @since 4.0.0
       */
      disable() {
        if (!this._enabled) return;
        const control = this._control;
        const element = this._element;
        control.rotate.off(CONTROL_EVENTS.INPUT_START, this._onInputStart);
        control.rotate.off(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
        control.zoom.off(CONTROL_EVENTS.INPUT_START, this._onInputStart);
        control.zoom.off(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
        control.gyro.off(CONTROL_EVENTS.ENABLE, this._onGyroEnable);
        element.removeEventListener(EVENTS$1.MOUSE_ENTER, this._onMouseEnter, false);
        element.removeEventListener(EVENTS$1.MOUSE_LEAVE, this._onMouseLeave, false);
        this._enabled = false;
        this._interrupted = false;
        this._hovering = false;
        this._clearTimeout();
      }
      _setUninterruptedAfterDelay(delay) {
        if (this._hovering) return;
        this._clearTimeout();
        if (delay > 0) {
          this._interruptionTimer = window.setTimeout(() => {
            this._interrupted = false;
            this._interruptionTimer = -1;
          }, delay);
        } else {
          this._interrupted = false;
          this._interruptionTimer = -1;
        }
      }
      _clearTimeout() {
        if (this._interruptionTimer >= 0) {
          window.clearTimeout(this._interruptionTimer);
          this._interruptionTimer = -1;
        }
      }
    }

    /**
     * WebXR manager class
     * @ko WebXR 매니저 클래스
     * @since 4.0.0
     */
    class XRManager extends Component__default["default"] {
      /**
       * Create new instance.
       * 새 인스턴스를 생성합니다.
       * @param ctx - Instance of WebGL context helper {@ko WebGL 콘텍스트 헬퍼의 인스턴스}
       * @param options - Options {@ko 옵션들}
       */
      constructor(ctx, options = {}) {
        super();
        /**
         * Destroy instance and end XR session if there was any.
         * @ko 인스턴스를 제거하고, XR 세션이 존재할 경우 종료합니다.
         * @since 4.0.0
         */
        this.destroy = () => {
          this.exit();
          this.off();
        };
        this._onSessionEnd = () => {
          this.exit();
          this.trigger(EVENTS.VR_END);
        };
        this._xrSession = null;
        this._xrRefSpace = null;
        this._ctx = ctx;
        this._options = options;
      }
      /**
       * Returns WebXR availability.
       * @ko WebXR 사용 가능 여부를 반환합니다.
       * @since 4.0.0
       */
      isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
          // eslint-disable-next-line compat/compat
          const xr = window.navigator.xr;
          if (!xr) return false;
          return xr.isSessionSupported(SESSION_VR).then(available => {
            return available;
          }).catch(() => {
            return false;
          });
        });
      }
      /**
       * Enter VR session
       * @ko VR 세션에 진입합니다.
       * @since 4.0.0
       */
      enter() {
        return __awaiter(this, void 0, void 0, function* () {
          const ctx = this._ctx;
          // eslint-disable-next-line compat/compat
          const xr = window.navigator.xr;
          if (!xr) return;
          yield GyroControl.requestSensorPermission();
          const options = Object.assign({
            requiredFeatures: [XR_REFERENCE_SPACE]
          }, this._options);
          yield ctx.makeXRCompatible();
          const session = yield xr.requestSession(SESSION_VR, options);
          ctx.bindXRLayer(session);
          const refSpace = yield session.requestReferenceSpace(XR_REFERENCE_SPACE);
          this._setSession(session, refSpace);
          this.trigger(EVENTS.VR_START, {
            session
          });
        });
      }
      /**
       * Exit VR session
       * @ko VR 세션에서 나갑니다.
       * @since 4.0.0
       */
      exit() {
        const xrSession = this._xrSession;
        if (xrSession) {
          xrSession.end().catch(() => void 0);
        }
        this._xrSession = null;
        this._xrRefSpace = null;
      }
      /**
       * @hidden
       */
      canRender(frame) {
        const refSpace = this._xrRefSpace;
        if (!refSpace) return false;
        const pose = frame.getViewerPose(refSpace);
        return !!pose;
      }
      /**
       * @hidden
       */
      getEyeParams(frame) {
        const session = frame.session;
        const pose = frame.getViewerPose(this._xrRefSpace);
        if (!pose) return null;
        const glLayer = session.renderState.baseLayer;
        if (!glLayer) return null;
        return pose.views.map(view => {
          const viewport = glLayer.getViewport(view);
          const vMatrix = view.transform.inverse.matrix;
          return {
            viewport,
            vMatrix,
            pMatrix: view.projectionMatrix
          };
        });
      }
      _setSession(session, refSpace) {
        this._xrSession = session;
        this._xrRefSpace = refSpace;
        session.addEventListener(EVENTS$1.XR_END, this._onSessionEnd);
      }
    }

    /**
     * Hotspot data
     * @ko 핫스팟 데이터
     * @since 4.0.0
     */
    class Hotspot {
      constructor(element, position) {
        this.element = element;
        this.position = position;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Hotspot renderer
     * @ko Hotspot 렌더러
     * @since 4.0.0
     */
    class HotspotRenderer {
      /**
       * Create new instance
       * @ko 새 인스턴스를 생성합니다.
       * @param rootEl - Container element for hotspots {@ko 핫스팟들의 컨테이너 엘리먼트}
       * @param renderer - instance of WebGLRenderer {@ko WebGLRenderer의 인스턴스}
       * @param options - Hotspot options {@ko Hotspot 옵션들 }
       */
      constructor(rootEl, renderer, {
        zoom = false
      }) {
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
      refresh() {
        const container = this._containerEl;
        if (!container) return;
        const hotspotEls = [].slice.apply(container.querySelectorAll(`.${DEFAULT_CLASS.HOTSPOT}`));
        this._hotspots = hotspotEls.map(el => this._parseHotspot(el));
      }
      /**
       * Render hotspots
       * @ko 핫스팟들을 렌더링합니다.
       * @param camera - Instance of Camera {@ko Camera의 인스턴스}
       */
      render(camera) {
        const hotspots = this._hotspots;
        const halfWidth = this._renderer.width * 0.5;
        const halfHeight = this._renderer.height * 0.5;
        const zoom = camera.zoom;
        const centerTransform = "translate(-50%, -50%)";
        const zoomTransform = this._zoom ? `scale(${zoom})` : "";
        hotspots.forEach(hotspot => {
          const position = hotspot.position;
          const relPos = glMatrix.vec3.create();
          glMatrix.vec3.copy(relPos, position);
          glMatrix.vec3.transformMat4(relPos, relPos, camera.viewMatrix);
          glMatrix.vec3.transformMat4(relPos, relPos, camera.projectionMatrix);
          if (relPos[2] > 1 || relPos[2] < 0) {
            hotspot.element.classList.remove(DEFAULT_CLASS.HOTSPOT_VISIBLE);
            return;
          }
          const screenPos = glMatrix.vec2.fromValues(relPos[0] * halfWidth + halfWidth, -relPos[1] * halfHeight + halfHeight);
          hotspot.element.classList.add(DEFAULT_CLASS.HOTSPOT_VISIBLE);
          hotspot.element.style.transform = [centerTransform, `translate(${screenPos[0]}px, ${screenPos[1]}px)`, zoomTransform].join(" ");
        });
      }
      _parseHotspot(element) {
        const yawStr = element.dataset.yaw;
        const pitchStr = element.dataset.pitch;
        const positionStr = element.dataset.position;
        if (yawStr || pitchStr) {
          const yaw = yawStr ? parseFloat(yawStr) : 0;
          const pitch = pitchStr ? parseFloat(pitchStr) : 0;
          const position = this._yawPitchToVec3(yaw, pitch);
          return new Hotspot(element, position);
        } else if (positionStr) {
          const pos = positionStr.split(" ").map(val => parseFloat(val));
          if (pos.length < 3) {
            throw new View360Error(ERROR.MESSAGES.INSUFFICIENT_ARGS(positionStr, "hotspot attribute \"data-position\""), ERROR.CODES.INSUFFICIENT_ARGS);
          }
          return new Hotspot(element, glMatrix.vec3.fromValues(pos[0], pos[1], pos[2]));
        } else {
          // Place hotspot at yaw: 0, pitch: 0
          const defaultPos = glMatrix.vec3.fromValues(0, 0, -1);
          return new Hotspot(element, defaultPos);
        }
      }
      _yawPitchToVec3(yaw, pitch) {
        const yawRad = yaw * DEG_TO_RAD;
        const pitchRad = pitch * DEG_TO_RAD;
        const position = glMatrix.vec3.create();
        position[1] = Math.sin(pitchRad);
        position[2] = Math.cos(pitchRad);
        position[0] = position[2] * Math.sin(-yawRad);
        position[2] = -position[2] * Math.cos(-yawRad);
        return position;
      }
    }

    /**
     * @hidden
     */
    class VertexArrayObject {
      get count() {
        return this.geometry.indicies.count;
      }
      constructor(obj, geometry, buffers) {
        this.obj = obj;
        this.geometry = geometry;
        this.buffers = buffers;
      }
    }

    /**
     * @hidden
     */
    class WebGLContext {
      get canvas() {
        return this._canvas;
      }
      get maxTextureSize() {
        return this._maxTextureSize;
      }
      get isWebGL2() {
        return this._isWebGL2;
      }
      get supportVAO() {
        return this._isWebGL2 || !!this._extensions.vao;
      }
      get lost() {
        return this._contextLost;
      }
      get debug() {
        return this._debug;
      }
      constructor(canvas, debug) {
        this._onContextLost = () => {
          const canvas = this._canvas;
          canvas.classList.add(DEFAULT_CLASS.CTX_LOST);
          this._contextLost = true;
        };
        this._onContextRestore = () => {
          const canvas = this._canvas;
          canvas.classList.remove(DEFAULT_CLASS.CTX_LOST);
          this._contextLost = false;
        };
        this._canvas = canvas;
        this._contextLost = false;
        this._debug = debug;
        this._extensions = {
          vao: null,
          loseContext: null
        };
      }
      init() {
        const canvas = this._canvas;
        const {
          gl,
          isWebGL2
        } = this._getContext(canvas);
        this._gl = gl;
        this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this._isWebGL2 = isWebGL2;
        if (!this._isWebGL2) {
          this._extensions.vao = gl.getExtension("OES_vertex_array_object");
        }
        this._extensions.loseContext = gl.getExtension("WEBGL_lose_context");
        canvas.addEventListener(EVENTS$1.CONTEXT_LOST, this._onContextLost);
        canvas.addEventListener(EVENTS$1.CONTEXT_RESTORED, this._onContextRestore);
        // gl.enable(gl.DEPTH_TEST);
      }

      destroy() {
        const gl = this._gl;
        const canvas = this._canvas;
        if (gl) {
          // gl is not defined when destroy is called before init
          gl.bindBuffer(gl.ARRAY_BUFFER, null);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }
        canvas.removeEventListener(EVENTS$1.CONTEXT_LOST, this._onContextLost);
        canvas.removeEventListener(EVENTS$1.CONTEXT_RESTORED, this._onContextRestore);
      }
      forceLoseContext() {
        const extension = this._extensions.loseContext;
        if (!extension) return;
        extension.loseContext();
      }
      forceRestoreContext() {
        const extension = this._extensions.loseContext;
        if (!extension) return;
        extension.restoreContext();
      }
      clear() {
        const gl = this._gl;
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      resize() {
        const gl = this._gl;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
      viewport(x, y, width, height) {
        const gl = this._gl;
        gl.viewport(x, y, width, height);
      }
      createVAO(geometry, shaderProgram) {
        const nativeVAO = this._createNativeVAO();
        const vao = new VertexArrayObject(nativeVAO, geometry, {
          indicies: this._createBuffer(),
          position: this._createBuffer(),
          uv: this._createBuffer()
        });
        if (nativeVAO) {
          this._bindNativeVAO(nativeVAO);
          this._supplyGeometryData(vao, shaderProgram);
          this._bindNativeVAO(null);
          this._unbindBuffers();
        }
        return vao;
      }
      draw(vao, shaderProgram) {
        const gl = this._gl;
        if (vao.obj) {
          this._bindNativeVAO(vao.obj);
        } else {
          this._supplyGeometryData(vao, shaderProgram);
        }
        gl.drawElements(gl.TRIANGLES, vao.count, gl.UNSIGNED_SHORT, 0);
        if (vao.obj) {
          this._bindNativeVAO(null);
        } else {
          this._unbindBuffers();
        }
      }
      releaseVAO(vao) {
        if (vao.obj) {
          this._deleteNativeVAO(vao.obj);
        }
        this._deleteBuffer(vao.buffers.indicies);
        this._deleteBuffer(vao.buffers.position);
        this._deleteBuffer(vao.buffers.uv);
      }
      getUniformLocations(program, uniforms) {
        const gl = this._gl;
        const uniformLocations = Object.keys(uniforms).reduce((locations, key) => {
          locations[key] = gl.getUniformLocation(program, key);
          return locations;
        }, {});
        return Object.assign(Object.assign({}, this._getCommonUniformLocations(program)), uniformLocations);
      }
      updateCommonUniforms(entity, camera, shaderProgram) {
        const gl = this._gl;
        const uniformLocations = shaderProgram.uniformLocations;
        // We're using "matrix"(=local matrix) here for efficiency
        // As projection doesn't require world matrix, as it doesn't have any parent or child
        const matrix = entity.matrix;
        const mvMatrix = glMatrix.mat4.create();
        glMatrix.mat4.multiply(mvMatrix, camera.viewMatrix, matrix);
        gl.uniformMatrix4fv(uniformLocations.uMVMatrix, false, mvMatrix);
        gl.uniformMatrix4fv(uniformLocations.uPMatrix, false, camera.projectionMatrix);
      }
      updateVRUniforms(shaderProgram, mvMatrix, pMatrix, eyeIndex) {
        const gl = this._gl;
        const uniformLocations = shaderProgram.uniformLocations;
        gl.uniformMatrix4fv(uniformLocations.uMVMatrix, false, mvMatrix);
        gl.uniformMatrix4fv(uniformLocations.uPMatrix, false, pMatrix);
        if (uniformLocations.uEye) {
          gl.uniform1f(uniformLocations.uEye, eyeIndex);
        }
      }
      updateUniforms(shaderProgram) {
        const gl = this._gl;
        const uniforms = shaderProgram.uniforms;
        const uniformLocations = shaderProgram.uniformLocations;
        for (const key in uniforms) {
          const uniform = uniforms[key];
          const location = uniformLocations[key];
          if (!uniform) continue;
          if (uniform.needsUpdate) {
            uniform.update(gl, location, this._isWebGL2);
          }
        }
      }
      releaseShaderResources(shaderProgram) {
        const gl = this._gl;
        const uniforms = shaderProgram.uniforms;
        for (const key in uniforms) {
          const uniform = uniforms[key];
          if (!uniform) continue;
          if (uniform.needsUpdate) {
            uniform.destroy(gl);
          }
        }
        gl.deleteProgram(shaderProgram.program);
      }
      useProgram(shaderProgram) {
        const gl = this._gl;
        gl.useProgram(shaderProgram.program);
      }
      createProgram(vertexShader, fragmentShader) {
        const gl = this._gl;
        const program = gl.createProgram();
        const vs = this._compileShader(gl.VERTEX_SHADER, vertexShader);
        const fs = this._compileShader(gl.FRAGMENT_SHADER, fragmentShader);
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.bindAttribLocation(program, 0, "position");
        gl.bindAttribLocation(program, 1, "uv");
        gl.linkProgram(program);
        if (this._debug && !gl.getProgramParameter(program, gl.LINK_STATUS)) {
          let shaderLog = null;
          if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
            shaderLog = gl.getShaderInfoLog(vs);
          } else if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
            shaderLog = gl.getShaderInfoLog(fs);
          }
          throw new View360Error(ERROR.MESSAGES.FAILED_LINKING_PROGRAM(gl.getProgramInfoLog(program), shaderLog), ERROR.CODES.FAILED_LINKING_PROGRAM);
        }
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return program;
      }
      createWebGLTexture(texData) {
        const gl = this._gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, texData.wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, texData.wrapT);
        if (!texData.isVideo() && this._isWebGL2) {
          const gl2 = gl;
          gl2.texStorage2D(gl2.TEXTURE_2D, 1, gl2.RGBA8, texData.width, texData.height);
        }
        return texture;
      }
      createWebGLCubeTexture(texData, size) {
        const gl = this._gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, texData.wrapS);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, texData.wrapT);
        if (this._isWebGL2) {
          const gl2 = gl;
          gl2.texStorage2D(gl2.TEXTURE_CUBE_MAP, 1, gl2.RGBA8, size, size);
        }
        return texture;
      }
      makeXRCompatible() {
        return __awaiter(this, void 0, void 0, function* () {
          const gl = this._gl;
          const attributes = gl.getContextAttributes();
          if (attributes && attributes.xrCompatible !== true) {
            yield gl.makeXRCompatible();
          }
        });
      }
      bindXRLayer(session) {
        const gl = this._gl;
        const xrLayer = new XRWebGLLayer(session, gl);
        session.updateRenderState({
          baseLayer: xrLayer
        });
      }
      bindXRFrame(frame) {
        const gl = this._gl;
        const session = frame.session;
        const baseLayer = session.renderState.baseLayer;
        gl.bindFramebuffer(gl.FRAMEBUFFER, baseLayer.framebuffer);
      }
      useDefaultFrameBuffer() {
        const gl = this._gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      _createBuffer() {
        return this._gl.createBuffer();
      }
      _deleteBuffer(buffer) {
        return this._gl.deleteBuffer(buffer);
      }
      _createNativeVAO() {
        const gl = this._gl;
        if (this._isWebGL2) {
          return gl.createVertexArray();
        } else {
          const ext = this._extensions.vao;
          return (ext === null || ext === void 0 ? void 0 : ext.createVertexArrayOES()) || null;
        }
      }
      _bindNativeVAO(vao) {
        const gl = this._gl;
        if (this._isWebGL2) {
          gl.bindVertexArray(vao);
        } else {
          const ext = this._extensions.vao;
          ext === null || ext === void 0 ? void 0 : ext.bindVertexArrayOES(vao);
        }
      }
      _deleteNativeVAO(vao) {
        const gl = this._gl;
        if (this._isWebGL2) {
          gl.deleteVertexArray(vao);
        } else {
          const ext = this._extensions.vao;
          ext === null || ext === void 0 ? void 0 : ext.deleteVertexArrayOES(vao);
        }
      }
      _supplyGeometryData(vao, shaderProgram) {
        const geometry = vao.geometry;
        this._supplyIndiciesData(geometry.indicies, vao.buffers.indicies);
        this._supplyAttributeData(geometry.vertices, shaderProgram.program, "position", vao.buffers.position);
        this._supplyAttributeData(geometry.uvs, shaderProgram.program, "uv", vao.buffers.uv);
      }
      _unbindBuffers() {
        const gl = this._gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      }
      _supplyIndiciesData(indicies, buffer) {
        const gl = this._gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicies.data, gl.STATIC_DRAW);
      }
      _supplyAttributeData(attribute, program, name, buffer) {
        const gl = this._gl;
        const attribLocation = gl.getAttribLocation(program, name);
        // Attribute not used
        if (attribLocation < 0) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, attribute.data, gl.STATIC_DRAW);
        gl.vertexAttribPointer(attribLocation, attribute.itemSize, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(attribLocation);
      }
      _compileShader(type, src) {
        const gl = this._gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        return shader;
      }
      _getCommonUniformLocations(program) {
        const gl = this._gl;
        return {
          uMVMatrix: gl.getUniformLocation(program, "uMVMatrix"),
          uPMatrix: gl.getUniformLocation(program, "uPMatrix")
        };
      }
      _getContext(canvas) {
        const webglIdentifiers = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        let context = null;
        let isWebGL2 = false;
        const contextAttributes = {
          preserveDrawingBuffer: false,
          antialias: false
        };
        const onWebglContextCreationError = e => e.statusMessage;
        canvas.addEventListener(EVENTS$1.CONTEXT_CREATE_ERROR, onWebglContextCreationError);
        for (const identifier of webglIdentifiers) {
          try {
            context = canvas.getContext(identifier, contextAttributes);
            isWebGL2 = identifier === "webgl2";
          } catch (t) {} // eslint-disable-line no-empty
          if (context) {
            break;
          }
        }
        canvas.removeEventListener(EVENTS$1.CONTEXT_CREATE_ERROR, onWebglContextCreationError);
        if (!context) {
          throw new View360Error(ERROR.MESSAGES.WEBGL_NOT_SUPPORTED, ERROR.CODES.WEBGL_NOT_SUPPORTED);
        }
        return {
          gl: context,
          isWebGL2
        };
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Projection renderer, based on WebGL
     * @ko WebGL 기반의 프로젝션 렌더러
     * @since 4.0.0
     */
    class WebGLRenderer {
      /**
       * Canvas element
       * @ko 캔버스 엘리먼트
       * @since 4.0.0
       */
      get canvas() {
        return this._canvas;
      }
      /**
       * Canvas's width (`devicePixelRatio` is not applied)
       * @ko 캔버스의 보이는 너비 (`devicePixelRatio`가 적용되지 않은)
       * @since 4.0.0
       */
      get width() {
        return this._elementSize.x;
      }
      /**
       * Canvas's height (`devicePixelRatio` is not applied)
       * @ko 캔버스의 높이 (`devicePixelRatio`가 적용되지 않은)
       * @since 4.0.0
       */
      get height() {
        return this._elementSize.y;
      }
      /**
       * Current `devicePixelRatio` value.
       * @ko 현재 `devicePixelRatio` 값.
       * @since 4.0.0
       * @example
       * ```js
       * cosnt renderingWidth = view360.renderer.width * view360.renderer.pixelRatio;
       * ```
       */
      get pixelRatio() {
        return this._pixelRatio;
      }
      /**
       * Width / height ratio (= width / height)
       * @ko 너비 / 높이의 비율 (= width / height)
       * @since 4.0.0
       * @example
       * ```js
       * const aspect = view360.renderer.width / view360.renderer.pixelRatio;
       * assert(aspect === view360.renderer.aspect);
       * ```
       */
      get aspect() {
        return this._elementSize.x / this._elementSize.y;
      }
      /**
       * Create new instance
       * @ko 새 인스턴스를 생성합니다.
       * @param canvas - Canvas element {@ko 캔버스 엘리먼트}
       * @param debug - Whether to enable WebGL debugging {@ko WebGL debug 활성화 여부 }
       */
      constructor(canvas, debug) {
        this._canvas = canvas;
        this._elementSize = {
          x: 0,
          y: 0
        };
        this._pixelRatio = 1;
        this.ctx = new WebGLContext(canvas, debug);
      }
      /**
       * Destroy instance and release all resources.
       * @ko 인스턴스를 제거하고 사용된 리소스를 전부 해제합니다.
       * @since 4.0.0
       */
      destroy() {
        const canvas = this._canvas;
        this.ctx.destroy();
        canvas.width = 1;
        canvas.height = 1;
      }
      /**
       * Resize canvas and renew inner size cache.
       * @ko 캔버스의 크기를 재계산해서 내부의 사이즈 캐시값을 갱신합니다.
       * @since 4.0.0
       */
      resize() {
        const canvas = this._canvas;
        const canvasSize = this._elementSize;
        const devicePixelRatio = window.devicePixelRatio;
        canvasSize.x = canvas.clientWidth;
        canvasSize.y = canvas.clientHeight;
        canvas.width = canvasSize.x * devicePixelRatio;
        canvas.height = canvasSize.y * devicePixelRatio;
        this._pixelRatio = devicePixelRatio;
        this.ctx.resize();
      }
      /**
       * Render projection
       * @ko 프로젝션을 렌더링합니다.
       * @param projection - Projection to render {@ko 렌더링할 프로젝션}
       * @param cameraa - Camera instance {@ko 카메라의 인스턴스}
       * @since 4.0.0
       */
      render(mesh, camera) {
        const ctx = this.ctx;
        if (ctx.lost) return;
        ctx.clear();
        ctx.useProgram(mesh.program);
        ctx.updateCommonUniforms(mesh, camera, mesh.program);
        mesh.update({
          camera
        });
        ctx.updateUniforms(mesh.program);
        ctx.draw(mesh.vao, mesh.program);
      }
      /**
       * Render VR frame, only used for rendering frames inside VR sessions.
       * @ko VR 프레임을 렌더링합니다. VR 세션 진입 도중에만 사용됩니다.
       * @internal
       * @param mesh - Triangle mesh to render {@ko 렌더링할 메쉬}
       * @param vr - Instance of XRManager {@ko XRManager의 인스턴스}
       * @param frame - VR frame {@ko VR 프레임}
       * @since 4.0.0
       */
      renderVR(mesh, vr, frame) {
        const ctx = this.ctx;
        const eyeParams = vr.getEyeParams(frame);
        if (!eyeParams || !mesh) return;
        ctx.bindXRFrame(frame);
        ctx.useProgram(mesh.program);
        ctx.updateUniforms(mesh.program);
        eyeParams.forEach((eye, eyeIndex) => {
          const viewport = eye.viewport;
          // We're using "mesh.matrix"(=local matrix) here for efficiency
          // As projection doesn't require world matrix, as it doesn't have any parent or child
          const mvMatrix = glMatrix.mat4.multiply(glMatrix.mat4.create(), eye.vMatrix, mesh.matrix);
          ctx.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
          ctx.updateVRUniforms(mesh.program, mvMatrix, eye.pMatrix, eyeIndex);
          ctx.draw(mesh.vao, mesh.program);
        });
      }
    }

    /**
     * Panorama 360 image viewer
     * @ko 파노라마 360 이미지 뷰어
     * @since 4.0.0
     * @see View360Options
     * @see View360Events
     */
    class View360 extends Component__default["default"] {
      /**
       * Root element (`.view360-container`)
       * @ko 루트 엘리먼트 (`.view360-container`)
       * @since 4.0.0
       * @readonly
       * @example
       * ```html
       * <div id="viewer" class="view360-container">
       *   <canvas class="view360-canvas"></canvas>
       * </div>
       * ```
       * ```ts
       * import View360 from "@egjs/view360";
       *
       * const viewer = new View360("#viewer");
       * console.log(viewer.rootEl); // Element with id "viewer"
       * ```
       */
      get rootEl() {
        return this._rootEl;
      }
      /**
       * Projection renderer.
       * @ko 프로젝션 렌더러.
       * @since 4.0.0
       * @readonly
       */
      get renderer() {
        return this._renderer;
      }
      /**
       * Projection camera.
       * @ko 프로젝션 카메라.
       * @since 4.0.0
       * @readonly
       */
      get camera() {
        return this._camera;
      }
      /**
       * Rotate/Zoom Controller.
       * @ko 회전/줌 컨트롤러.
       * @since 4.0.0
       * @readonly
       */
      get control() {
        return this._control;
      }
      /**
       * WebXR-based VR manager.
       * @ko WebXR 기반의 VR 기능 매니저 인스턴스.
       * @since 4.0.0
       * @readonly
       * @example
       * ```ts
       * // Example: Enter VR
       * // This must be called on user interaction, else will be rejected.
       * viewer.vr.enter();
       * ```
       */
      get vr() {
        return this._vr;
      }
      /**
       * Hotspot renderer.
       * You can also change options of {@link View360Options#hotspot} with this.
       * @ko 핫스팟 렌더러 인스턴스.
       * {@link View360Options#hotspot} 옵션 변경도 가능합니다.
       * @since 4.0.0
       * @readonly
       */
      get hotspot() {
        return this._hotspot;
      }
      /**
       * An array of plugins added.
       * @ko 추가된 플러그인의 배열
       * @since 4.0.0
       * @readonly
       * @example
       * ```ts
       * const viewer = new View360("#el_id", {
       *   plugins: [new ControlBar()]
       * });
       *
       * console.log(viewer.plugins); // [ControlBar]
       *
       * viewer.addPlugins(new LoadingSpinner()) // [ControlBar, LoadingSpinner];
       * ```
       */
      get plugins() {
        return this._plugins;
      }
      /**
       * An instance of {@link Projection} that currently enabled. `null` if not initialized yet.
       * You should call {@link View360#load} to change panorama src or projection type.
       * @ko 현재 사용중인 {@link Projection}의 인스턴스. 프로젝션을 활성화하지 않았을 경우 `null`입니다.
       * 파노라마 이미지 소스나 프로젝션 타입을 변경하려면 {@link View360#load}를 호출하면 됩니다.
       * @since 4.0.0
       * @example
       * ```ts
       * const viewer = new View360
       * ```
       */
      get projection() {
        return this._projection;
      }
      set projection(val) {
        if (this._initialized && val) {
          this.load(val);
        } else {
          this._projection = val;
        }
      }
      /**
       * An instance of triangle mesh to render.
       * @ko 렌더링할 triangle mesh의 인스턴스
       * @internal
       * @since 4.0.0
       * @readonly
       */
      get mesh() {
        return this._mesh;
      }
      /**
       * A boolean value whether {@link View360#init init()} is called before.
       * @ko {@link View360#init init()}이 호출되었는지 여부를 가리키는 값
       * @since 4.0.0
       * @readonly
       * @example
       * ```ts
       * const viewer = new View360("#el", { autoInit: false });
       *
       * console.log(viewer.initialized); // false
       *
       * await viewer.init();
       *
       * console.log(viewer.initialized); // true
       * ```
       */
      get initialized() {
        return this._initialized;
      }
      /**
       * Instance of the Autoplay manager.
       * You can also change {@link View360Options#autoplay} options with this.
       * @ko Autoplay 기능의 매니저 인스턴스.
       * 이 인스턴스를 통해 {@link View360Options#autoplay} 옵션을 변경하는 것도 가능합니다.
       * @since 4.0.0
       * @readonly
       * @example
       * ```ts
       * // Disable autoplay
       * viewer.autoplay.disable();
       * ```
       */
      get autoplay() {
        return this._autoplay;
      }
      /**
       * When this value is `true` and {@link View360Options#projection} is set, {@link View360#init init()} will be called automatically when instance is created.
       * @ko 이 값이 `true`이고, {@link View360Options#projection}이 설정되었으면, 인스턴스 생성 시점에 자동으로 {@link View360#init init()}을 호출합니다.
       * @default true
       * @since 4.0.0
       * @example
       * ```ts
       * import View360, { EquirectProjection, EVENTS } from "@egjs/view360";
       *
       * // viewer.init() is called on instance creation
       * // But as `init` is asynchronous, you should wait for "ready" event if you want to do something after initialization.
       * const viewer = new View360("#el_id", {
       *   autoInit: true,
       *   projection: new EquirectProjection({ src: "SRC_TO_URL" })
       * });
       *
       * console.log(viewer.initialized); // false, as `init` is asynchronous
       *
       * viewer.once(EVENTS.READY, () => {
       *   console.log(viewer.initialized); // true
       * });
       * ```
       */
      get autoInit() {
        return this._autoInit;
      }
      /**
       * When `true`, {@link View360#resize} is called when the canvas size is changed.
       * @ko `true`일 경우, 캔버스의 크기가 변경되었을 때 자동으로 {@link View360#resize}를 호출합니다.
       * @default true
       * @since 4.0.0
       * @see View360#useResizeObserver
       * @example
       * ```ts
       * const viewer = new View360("#el_id", {
       *   autoResize: true
       * });
       *
       * // This can trigger `viewer.resize()` if the canvas size was not 400px
       * const canvas = viewer.renderer.canvas;
       * canvas.style.width = "400px";
       * ```
       */
      get autoResize() {
        return this._autoResize;
      }
      /**
       * CSS selector for canvas element to render panorama image/video.
       * The canvas element should be placed inside the root element. (Dont' have to be direct child)
       * @ko 파노라마 이미지/비디오를 렌더링할 canvas 엘리먼트의 CSS 선택자
       * 캔버스 엘리먼트는 루트 엘리먼트 내부에 있어야합니다. 루트 엘리먼트의 직계 자식 엘리먼트(Direct child element)일 필요는 없습니다.
       * @default "canvas"
       * @since 4.0.0
       * @example
       * ```html
       * <div class="view360-container">
       *   <canvas id="not_this_one"></canvas>
       *   <!-- This will be selected -->
       *   <canvas id="canvas_to_select"></canvas>
       * </div>
       * ```
       *
       * ```ts
       * const viewer = new View360("#el_id", {
       *   canvasSelector: "#canvas_to_select"
       * });
       * ```
       */
      get canvasSelector() {
        return this._canvasSelector;
      }
      /**
       * When `true`, it will use {@link ResizeObserver} API to detect canvas size change when {@link View360Options#autoResize} is enabled.
       * @ko `true`일 때 {@link View360Options#autoResize}가 활성화되었으면, 사용 가능한 환경에서 {@link ResizeObserver} API를 사용해서 캔버스 크기 변화를 추적합니다.
       * @default true
       * @since 4.0.0
       */
      get useResizeObserver() {
        return this._useResizeObserver;
      }
      /**
       * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex tabindex} attribute for the canvas element.
       * This is necessary for the keyboard controls.
       * By default, `0` will be assigned. `null` to disable.
       * @ko 캔버스 엘리먼트에 적용할 {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex tabindex} 어트리뷰트의 값.
       * 이 값을 설정해야만 키보드 컨트롤을 사용 가능합니다.
       * 기본값으로 `0`이 설정됩니다. `null`로 지정하면 `tabindex`를 설정하지 않습니다.
       * @see RotateControlOptions#disableKeyboard
       * @default 0
       * @since 4.0.0
       * @example
       * ```ts
       * const viewer = new View360("#el_id", {
       *   tabindex: 5
       * });
       * ```
       *
       * ```html
       * <!-- After init -->
       * <div class="view360-container">
       *   <canvas class="view360-canvas" tabindex="5"></canvas>
       * </div>
       * ```
       */
      get tabIndex() {
        return this._tabIndex;
      }
      set tabIndex(val) {
        const canvas = this._renderer.canvas;
        this._tabIndex = val;
        if (val != null) {
          canvas.tabIndex = val;
        } else {
          canvas.removeAttribute("tabindex");
        }
      }
      /**
       * A maximum delta time between frames in seconds.
       * It can prevent camera or control changing too fast when frame being late.
       * @ko 프레임간 시간 차이의 최대값. (초 단위)
       * 퍼포먼스 등의 이유로 프레임 렌더링이 늦어졌을 때, 화면이 갑작스럽게 바뀌는 것을 막아줍니다.
       * @default 1 / 30
       * @since 4.0.0
       */
      get maxDeltaTime() {
        return this._animator.maxDeltaTime;
      }
      set maxDeltaTime(val) {
        this._animator.maxDeltaTime = val;
      }
      /**
       * Enable WebGL debugging. Setting this to `true` can decrease performance.
       * This is used internally on developing View360.
       * @ko WebGL 디버깅을 활성화합니다. 이 값을 `true`로 할 경우 성능이 하락할 수 있습니다.
       * 이 옵션은 View360을 개발하기 위해 내부적으로 사용됩니다.
       * @default false
       */
      get debug() {
        return this._debug;
      }
      set debug(val) {
        this._debug = val;
      }
      // Camera options
      /**
       * Initial yaw (y-axis rotation) value for camera. (in degrees, °)
       * As View360 uses right-handed coordinate system internally, camera will rotate counter-clockwise by this value.
       * @ko 카메라의 초기 yaw(y축 회전)값 (도 단위, °)
       * View360은 오른손 좌표계를 사용하기 때문에, 카메라가 해당 값만큼 시계 반대방향으로 회전합니다.
       * @default 0
       * @since 4.0.0
       * @example
       * ```ts
       * const viewer = new View360("#el_id", {
       *   initialYaw: 30
       * });
       *
       * viewer.on("ready", () => {
       *   console.log(viewer.camera.yaw); // 30
       * });
       * ```
       */
      get initialYaw() {
        return this._camera.initialYaw;
      }
      set initialYaw(val) {
        this._camera.initialYaw = val;
      }
      /**
       * Initial pitch (x-axis rotation) value for camera. (in degrees, °)
       * As View360 uses right-handed coordinate system internally, positive value will make camera to look upside, while negative value will look down.
       * @ko 카메라의 초기 pitch(x축 회전)값 (도 단위, °)
       * View360은 오른손 좌표계를 사용하기 때문에, 양(+)의 값은 카메라가 위를 보게 하고, 음(-)의 값은 카메라가 아래를 보게 합니다.
       * @default 0
       * @since 4.0.0
       * @example
       * ```ts
       * const viewer = new View360("#el_id", {
       *   initialPitch: 60
       * });
       *
       * viewer.on("ready", () => {
       *   console.log(viewer.camera.pitch); // 60
       * });
       * ```
       */
      get initialPitch() {
        return this._camera.initialPitch;
      }
      set initialPitch(val) {
        this._camera.initialPitch = val;
      }
      /**
       * Initial zoom value for camera.
       * Setting this value to `2` will enlarge panorama 200% by width.
       * @ko 카메라의 초기 줌 값.
       * 이 값을 `2`로 설정할 경우 파노라마 이미지를 가로 기준 200%만큼 확대합니다.
       * @default 1
       * @since 4.0.0
       * @example
       * ```ts
       * const viewer = new View360("#el_id", {
       *   initialZoom: 2
       * });
       *
       * viewer.on("ready", () => {
       *   console.log(viewer.camera.zoom); // 2
       * });
       * ```
       */
      get initialZoom() {
        return this._camera.initialZoom;
      }
      set initialZoom(val) {
        this._camera.initialZoom = val;
      }
      /**
       * Restrict yaw(y-axis rotation) range. (in degrees, °)
       * @ko yaw(y축 회전) 범위를 제한합니다. (도 단위, °)
       * @since 4.0.0
       * @example
       * ```ts
       * const viewer = new View360("#el_id", {
       *   yawRange: [-30, 30]
       * });
       *
       * viewer.on("ready", () => {
       *   console.log(viewer.camera.yaw); // 0
       *   viewer.camera.lookAt({ yaw: 60  });
       *   console.log(viewer.camera.yaw); // 30
       * });
       * ```
       */
      get yawRange() {
        return this._camera.yawRange;
      }
      set yawRange(val) {
        this._camera.yawRange = val;
        if (this._projection) this._projection.updateCamera(this._camera);
      }
      /**
       * Restrict pitch(x-axis rotation) range. (in degrees, °)
       * @ko pitch(x축 회전) 범위를 제한합니다. (도 단위, °)
       * @default null
       * @since 4.0.0
       * @example
       * ```ts
       * const viewer = new View360("#el_id", {
       *   pitchRange: [-45, 45]
       * });
       *
       * viewer.on("ready", () => {
       *   console.log(viewer.camera.pitch); // 0
       *   viewer.camera.lookAt({ pitch: 60  });
       *   console.log(viewer.camera.pitch); // 45
       * });
       * ```
       */
      get pitchRange() {
        return this._camera.pitchRange;
      }
      set pitchRange(val) {
        this._camera.pitchRange = val;
        if (this._projection) this._projection.updateCamera(this._camera);
      }
      /**
       * Restrict camera zoom range.
       * If `null`, a default zoom range from `0.6` to `10` will be used.
       * @ko 카메라 줌 범위를 제한합니다.
       * `null`일 경우 기본값으로 `0.6`에서 `10`의 범위를 사용합니다.
       * @default null
       * @since 4.0.0
       * @example
       * ```ts
       * const viewer = new View360("#el_id", {
       *   zoomRange: [0.5, 4]
       * });
       *
       * viewer.on("ready", () => {
       *   console.log(viewer.camera.zoom); // 1
       *   viewer.camera.lookAt({ zoom: 6  });
       *   console.log(viewer.camera.zoom); // 4
       * });
       * ```
       */
      get zoomRange() {
        return this._camera.zoomRange;
      }
      set zoomRange(val) {
        this._camera.zoomRange = val;
        if (this._projection) this._projection.updateCamera(this._camera);
      }
      /**
       * Camera's horizontal FOV(Field of View). (in degrees, °)
       * @ko 카메라의 수평 FOV(Field of View) 값. (도 단위, °)
       * @default 90
       * @since 4.0.0
       * @example
       * ```ts
       * // Init with fov: 120
       * const viewer = new View360("#el_id", { fov: 120 });
       *
       * // Back to 90
       * viewer.fov = 90;
       * ```
       */
      get fov() {
        return this._camera.fov;
      }
      set fov(val) {
        const camera = this._camera;
        const control = this._control;
        camera.fov = val;
        camera.updateMatrix();
        control.sync();
      }
      // Control options
      /**
       * A control for camera rotation.
       * You can also change options of {@link View360Options#rotate} with this.
       * @ko 카메라 회전을 담당하는 컨트롤.
       * {@link View360Options#rotate} 옵션 변경도 가능합니다.
       * @since 4.0.0
       * @readonly
       */
      get rotate() {
        return this._control.rotate;
      }
      /**
       * A control for camera zoom.
       * You can also change options of {@link View360Options#zoom} with this.
       * @ko 카메라 줌을 담당하는 컨트롤.
       * {@link View360Options#zoom} 옵션 변경도 가능합니다.
       * @since 4.0.0
       * @readonly
       */
      get zoom() {
        return this._control.zoom;
      }
      /**
       * A control for camera rotation with gyroscope input.
       * You can also change options of {@link View360Options#gyro} with this.
       * @ko 자이로스코프를 통한 카메라 회전을 담당하는 컨트롤.
       * {@link View360Options#gyro} 옵션 변경도 가능합니다.
       * @since 4.0.0
       * @readonly
       */
      get gyro() {
        return this._control.gyro;
      }
      /**
       * Apply CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor cursor} by current state of input when using mouse.
       * If `true`, this will add CSS style to canvas element. It'll apply `cursor: "grab"` by default and `cursor: "grabbing"` when holding the mouse button.
       * @ko 마우스 사용시 CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor cursor}값을 자동으로 변경할지 여부.
       * `true`일 경우 기본 상태에서 `cursor: "grab"`을, 입력 도중에 `cursor: "grabbing"`을 캔버스에 적용합니다.
       * @default true
       * @since 4.0.0
       */
      get useGrabCursor() {
        return this._control.useGrabCursor;
      }
      set useGrabCursor(val) {
        this._control.useGrabCursor = val;
      }
      /**
       * Disable context menu which pops up on mouse right click.
       * @ko 마우스 우클릭시 표시되는 컨텍스트 메뉴를 비활성화합니다.
       * @default false
       * @since 4.0.0
       */
      get disableContextMenu() {
        return this._control.disableContextMenu;
      }
      set disableContextMenu(val) {
        this._control.disableContextMenu = val;
      }
      /**
       * If `true`, enables scroll on mobile(touch) devices on canvas.
       * :::caution
       * When this option is enabled, users must swipe horizontally first then vertically to change view up or down.
       * :::
       * @ko `true`로 설정할 경우, 모바일(터치) 환경의 캔버스 영역 내에서 스크롤을 가능하게 합니다.
       * :::caution
       * 이 값을 활성화할 경우, 사용자가 카메라 뷰를 위/아래로 바꾸기 위해서는 먼저 가로로 스와이프한 이후에 세로로 스와이프해야만 합니다.
       * :::
       * @since 4.0.0
       * @default true
       */
      get scrollable() {
        return this._control.scrollable;
      }
      set scrollable(val) {
        this._control.scrollable = val;
      }
      /**
       * If `true`, enables scroll by mouse wheel on canvas.
       * :::caution
       * When this option is enabled, zoom by mouse wheel will be disabled.
       * :::
       * @ko `true`로 설정할 경우, 캔버스 영역 내에서 마우스 휠을 이용한 페이지 스크롤이 가능해집니다.
       * :::caution
       * 이 값을 활성화할 경우, 마우스 휠을 통한 줌이 불가능하게 됩니다.
       * :::
       * @since 4.0.0
       * @default false
       */
      get wheelScrollable() {
        return this._control.wheelScrollable;
      }
      set wheelScrollable(val) {
        this._control.wheelScrollable = val;
      }
      /**
       * Create new instance of View360
       * @ko View360의 새로운 인스턴스를 생성합니다
       * @param root - Root element(`.view360-container`) to mount View360
       * Can be either a CSS selector or HTMLElement.
       * {@ko View360을 마운트할 루트 엘리먼트, CSS 셀렉터나 HTMLElement를 지정 가능합니다.}
       * @param options - Options to apply
       * {@ko 적용할 옵션들}
       * @example
       * ```ts
       * import View360, { EquirectProjection } from "@egjs/view360";
       *
       * // Create new View360 instance
       * const viewer = new View360("#id-of-a-container", {
       *   projection: new EquirectProjection({
       *     src: "URL_TO_PANORAMA_IMAGE_OR_VIDEO",
       *   })
       * });
       * ```
       */
      constructor(root, {
        projection = null,
        initialYaw = 0,
        initialPitch = 0,
        initialZoom = 1,
        yawRange = null,
        pitchRange = null,
        zoomRange = null,
        fov = 90,
        useGrabCursor = true,
        disableContextMenu = false,
        rotate = true,
        zoom = true,
        gyro = false,
        scrollable = true,
        wheelScrollable = false,
        autoplay = false,
        hotspot = {},
        autoInit = true,
        autoResize = true,
        canvasSelector = "canvas",
        useResizeObserver = true,
        on = {},
        plugins = [],
        maxDeltaTime = 1 / 30,
        tabIndex = 0,
        debug = false
      } = {}) {
        super();
        /**
         * Render a single panorama image/video frame.
         * Rendering is performed automatically on demand, so you usually don't have to call this.
         * Call this when a frame is not renewed after changing options.
         * @ko 파노라마 이미지/비디오의 한 프레임을 렌더링합니다.
         * 프레임 갱신은 보통 필요한 때에만 자동적으로 이루어지기 때문에, 보통은 이 메소드를 호출할 필요는 없습니다.
         * 옵션 변경 이후에도 프레임 갱신이 이루어지지 않는다면, 이 메소드를 호출해주세요.
         * @param delta Delta time in milisec. {@ko 프레임간 시간 차이, 밀리초 단위}
         * @since 4.0.0
         */
        this.renderFrame = delta => {
          const camera = this._camera;
          const renderer = this._renderer;
          const control = this._control;
          const hotspot = this._hotspot;
          const autoPlayer = this._autoplay;
          const mesh = this._mesh;
          if (!mesh) return;
          this._emit(EVENTS.BEFORE_RENDER);
          if (autoPlayer.playing) {
            autoPlayer.update(delta);
            control.sync();
          }
          if (camera.animation) {
            camera.animation.update(delta);
          } else {
            control.update(delta);
          }
          renderer.render(mesh, camera);
          hotspot.render(camera);
          if (camera.changed) {
            this._emit(EVENTS.VIEW_CHANGE, {
              yaw: camera.yaw,
              pitch: camera.pitch,
              zoom: camera.zoom,
              quaternion: [camera.quaternion[0], camera.quaternion[1], camera.quaternion[2], camera.quaternion[3]]
            });
          }
          camera.onFrameRender();
          this._emit(EVENTS.RENDER);
        };
        this._renderFrameOnDemand = delta => {
          const camera = this._camera;
          const control = this._control;
          const autoplay = this._autoplay;
          const mesh = this._mesh;
          const texture = mesh === null || mesh === void 0 ? void 0 : mesh.getTexture();
          if (!this._initialized || !texture) return;
          if (!camera.animation && !control.animating && !autoplay.playing && !texture.isVideo()) return;
          this.renderFrame(delta);
        };
        this._renderVRFrame = (_delta, frame) => {
          const vr = this._vr;
          const mesh = this._mesh;
          const renderer = this._renderer;
          if (!mesh) return;
          this._emit(EVENTS.BEFORE_RENDER);
          renderer.renderVR(mesh, vr, frame);
          this._emit(EVENTS.RENDER);
        };
        this._rootEl = getElement(root);
        this._plugins = plugins;
        this._initialized = false;
        // Options
        this._autoInit = autoInit;
        this._autoResize = autoResize;
        this._canvasSelector = canvasSelector;
        this._useResizeObserver = useResizeObserver;
        this._tabIndex = tabIndex;
        this._debug = debug;
        // Core components
        const canvas = findCanvas(this._rootEl, canvasSelector);
        this._renderer = new WebGLRenderer(canvas, debug);
        this._camera = new Camera({
          initialYaw,
          initialPitch,
          initialZoom,
          fov,
          yawRange,
          pitchRange,
          zoomRange
        });
        this._control = new PanoControl(canvas, this._camera, {
          useGrabCursor,
          scrollable,
          wheelScrollable,
          disableContextMenu,
          rotate,
          zoom,
          gyro
        });
        this._animator = new FrameAnimator(maxDeltaTime);
        this._autoplay = new Autoplay(this, canvas, autoplay);
        this._projection = projection;
        this._mesh = null;
        this._autoResizer = new AutoResizer(useResizeObserver, () => this.resize());
        this._vr = new XRManager(this._renderer.ctx);
        this._hotspot = new HotspotRenderer(this._rootEl, this._renderer, hotspot);
        this._addEventHandlers(on);
        if (projection && autoInit) {
          this.init();
        }
      }
      /**
       * Destroy instance and release all resources.
       * @ko 인스턴스를 제거하고 모든 리소스를 해제합니다.
       * @since 4.0.0
       */
      destroy() {
        this._camera.destroy();
        this._animator.stop();
        this._renderer.destroy();
        this._control.destroy();
        this._autoResizer.disable();
        if (this._mesh) {
          this._mesh.destroy(this._renderer.ctx);
          this._mesh = null;
        }
        this._plugins.forEach(plugin => plugin.destroy(this));
        this._initialized = false;
      }
      /**
       * Initialize inner components and load projection src.
       * @ko 내부 컴포넌트들을 초기화하고 프로젝션 소스를 로드합니다.
       * @since 4.0.0
       */
      init() {
        return __awaiter(this, void 0, void 0, function* () {
          if (!this._projection) {
            throw new View360Error(ERROR.MESSAGES.PROVIDE_PROJECTION_FIRST, ERROR.CODES.PROVIDE_PROJECTION_FIRST);
          }
          const renderer = this._renderer;
          const camera = this._camera;
          const control = this._control;
          const animator = this._animator;
          const hotspot = this._hotspot;
          const projection = this._projection;
          const canvas = renderer.canvas;
          this._bindComponentEvents();
          renderer.ctx.init();
          this._resizeComponents();
          camera.updateMatrix();
          if (this._autoResize) {
            this._autoResizer.enable(canvas);
          }
          if (!this._autoplay.enableBlocked) {
            this._autoplay.enable();
          }
          this._plugins.forEach(plugin => {
            plugin.init(this);
          });
          const texture = yield this._loadTexture(projection);
          this._applyProjection(projection, texture);
          hotspot.refresh();
          animator.start(this._renderFrameOnDemand);
          yield control.enable();
          if (this._tabIndex != null && !canvas.hasAttribute("tabIndex")) {
            canvas.tabIndex = this._tabIndex;
          }
          this._initialized = true;
          this.renderFrame(0);
          this._emit(EVENTS.READY);
        });
      }
      /**
       * Load new panorama image/video and display it.
       * This will {@link View360#init init()} View360 if it's not initialized yet.
       * @ko 새로운 파노라마 이미지 혹은 비디오를 로드하고 표시합니다.
       * 만약 View360이 아직 초기화되지 않았다면, {@link View360#init init()}을 호출합니다.
       * @param projection - Projection & video options for new source. {@ko 새로운 파노라마 이미지/비디오에 적용할 옵션들}
       * @returns `Promise<true>` if load was successful. {@ko 프로젝션 로드에 성공했을 경우 `Promise<true>`를 반환합니다. }
       * @since 4.0.0
       * @example
       * ```ts
       * // Change to video
       * viewer.load({
       *   src: "URL_TO_NEW_VIDEO",
       *   video: true
       * });
       * ```
       */
      load(projection) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!projection) return false;
          if (this._initialized) {
            const texture = yield this._loadTexture(projection);
            this._applyProjection(projection, texture);
            this.renderFrame(0);
          } else {
            // Should update internal options before init
            this._projection = projection;
            this.init();
          }
          return true;
        });
      }
      /**
       * Refresh component's size by current
       * @ko View360이 내부적으로 캐시하고 있는 엘리먼트 크기를 현재 크기로 갱신합니다.
       * @since 4.0.0
       */
      resize() {
        if (!this._initialized) return;
        this._resizeComponents();
        // To prevent flickering, render immediately after resizing components
        this.renderFrame(0);
        const {
          width,
          height
        } = this._renderer;
        this._emit(EVENTS.RESIZE, {
          width,
          height
        });
      }
      /**
       * Add new plugins
       * @ko 새로운 플러그인을 추가합니다.
       * @param plugins Plugins to add {@ko 추가할 플러그인들}
       * @see View360Options#plugins
       * @since 4.0.0
       * @example
       * ```ts
       * // Add a single plugin
       * viewer.addPlugins(new ControlBar());
       *
       * // Add multiple plugins
       * viewer.addPlugins(new ControlBar(), new LoadingSpinner());
       * ```
       */
      addPlugins(...plugins) {
        if (this._initialized) {
          plugins.forEach(plugin => {
            plugin.init(this);
          });
        }
        this._plugins.push(...plugins);
      }
      /**
       * Remove plugins.
       * @ko 플러그인을 제거합니다.
       * @param plugins Plugins to remove {@ko 제거할 플러그인들}
       * @since 4.0.0
       * @example
       * ```ts
       * // Remove a single plugin
       * viewer.removePlugins(plugin1);
       *
       * // Remove multiple plugins
       * viewer.removePlugins(plugin2, plugin3);
       * ```
       */
      removePlugins(...plugins) {
        plugins.forEach(plugin => {
          const pluginIdx = this._plugins.indexOf(plugin);
          if (pluginIdx < 0) return;
          plugin.destroy(this);
          this._plugins.splice(pluginIdx, 1);
        });
      }
      _emit(eventName, ...params) {
        const evtParams = params ? params[0] : {};
        this.trigger(eventName, Object.assign({
          type: eventName,
          target: this
        }, evtParams));
      }
      _applyProjection(projection, texture) {
        const camera = this._camera;
        const control = this._control;
        const renderer = this._renderer;
        const mesh = this._mesh;
        // Remove previous context
        if (mesh) {
          mesh.destroy(renderer.ctx);
        }
        const newMesh = projection.createMesh(renderer.ctx, texture);
        projection.updateCamera(camera);
        projection.updateControl(control);
        this._mesh = newMesh;
        this._emit(EVENTS.PROJECTION_CHANGE, {
          projection
        });
      }
      _loadTexture(projection) {
        return __awaiter(this, void 0, void 0, function* () {
          const contentLoader = new TextureLoader();
          const {
            src,
            video
          } = projection;
          this._emit(EVENTS.LOAD_START, {
            src,
            video
          });
          const texture = yield contentLoader.load(src, video);
          this._emit(EVENTS.LOAD, {
            src,
            video
          });
          return texture;
        });
      }
      _resizeComponents() {
        const renderer = this._renderer;
        const camera = this._camera;
        const control = this._control;
        renderer.resize();
        camera.resize(renderer.width, renderer.height);
        control.resize(renderer.width, renderer.height);
      }
      _addEventHandlers(events) {
        // Bind option "on"
        Object.keys(events).forEach(evtName => {
          this.on(evtName, events[evtName]);
        });
      }
      _bindComponentEvents() {
        // Bind internal component events
        const root = this._rootEl;
        const control = this._control;
        const animator = this._animator;
        const renderer = this._renderer;
        const vr = this._vr;
        const controlEventsToPropagate = [CONTROL_EVENTS.STATIC_CLICK, CONTROL_EVENTS.INPUT_START, CONTROL_EVENTS.INPUT_END];
        controlEventsToPropagate.forEach(evtName => {
          control.rotate.on(evtName, evt => {
            this._emit(evtName, evt);
          });
          control.zoom.on(evtName, evt => {
            this._emit(evtName, evt);
          });
        });
        vr.on(EVENTS.VR_START, evt => {
          root.classList.add(DEFAULT_CLASS.IN_VR);
          animator.changeContext(evt.session);
          animator.start(this._renderVRFrame);
          this._emit(EVENTS.VR_START);
        });
        vr.on(EVENTS.VR_END, () => {
          root.classList.remove(DEFAULT_CLASS.IN_VR);
          renderer.ctx.useDefaultFrameBuffer();
          animator.changeContext(window);
          animator.start(this._renderFrameOnDemand);
          this.resize();
          this._emit(EVENTS.VR_END);
        });
      }
    }
    /**
     * Current version string of the View360
     * @ko View360의 현재 버젼 문자열
     * @since 4.0.0
     * @readonly
     * @example
     * ```ts
     * // If the installed version of the View360 is v4.0.0, View360.VERSION is equal to "4.0.0"
     * console.log(View360.VERSION) // 4.0.0
     * ```
     */
    View360.VERSION = "4.0.0-beta.7";

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Base class for 3D objects
     * @ko 3D 오브젝트의 베이스 클래스
     * @since 4.0.0
     * @internal
     */
    class Object3D extends Component__default["default"] {
      /**
       * Create new instance.
       * @ko 새로운 인스턴스를 생성합니다.
       */
      constructor() {
        super();
        this.matrix = glMatrix.mat4.create();
        this.rotation = glMatrix.quat.create();
        this.position = glMatrix.vec3.fromValues(0, 0, 0);
        this.scale = glMatrix.vec3.fromValues(1, 1, 1);
      }
      /**
       * Update local matrix of the object.
       * @ko 오브젝트의 local matrix를 갱신합니다.
       * @since 4.0.0
       */
      updateMatrix() {
        glMatrix.mat4.fromRotationTranslationScale(this.matrix, this.rotation, this.position, this.scale);
      }
      update(ctx) {
        this.trigger(OBJECT_3D_EVENTS.UPDATE, ctx);
      }
    }

    /**
     * A plugin that displays loading spinner while loading the projection.
     * @ko 프로젝션 로딩중에 로딩 스피너를 보여주는 플러그인
     * @since 4.0.0
     * @category Plugin
     */
    class LoadingSpinner {
      /**
       * Create a new instance of LoadingSpinner. {@ko LoadingSpinner의 새 인스턴스를 생성합니다.}
       * @param options Options {@ko 옵션들}
       */
      constructor({
        className = {}
      } = {}) {
        this._startLoading = ({
          target: viewer
        }) => {
          viewer.rootEl.appendChild(this._container);
          if (viewer.initialized) {
            viewer.once(EVENTS.LOAD, this._detachElements);
          } else {
            viewer.once(EVENTS.READY, this._detachElements);
          }
        };
        this._detachElements = ({
          target: viewer
        }) => {
          const container = this._container;
          if (!container) return;
          if (container.parentElement === viewer.rootEl) {
            viewer.rootEl.removeChild(container);
          }
        };
        this.className = className;
        this._container = this._createElements();
      }
      init(viewer) {
        viewer.on(EVENTS.LOAD_START, this._startLoading);
      }
      destroy(viewer) {
        viewer.off(EVENTS.LOAD_START, this._startLoading);
        this._detachElements({
          target: viewer
        });
      }
      _createElements() {
        const className = Object.assign(Object.assign({}, this.className), LoadingSpinner.DEFAULT_CLASS);
        const container = createElement(className.CONTAINER);
        const ring = createElement(className.RING);
        container.appendChild(ring);
        return container;
      }
    }
    /**
     * Default class names that LoadingSpinner uses
     * @ko LoadingSpinner가 사용하는 디폴트 클래스 이름
     * @since 4.0.0
     */
    LoadingSpinner.DEFAULT_CLASS = {
      /**
       * A class name for the container element
       * @ko 컨테이너 엘리먼트의 클래스 이름
       * @since 4.0.0
       */
      CONTAINER: "view360-spinner",
      /**
       * A class name for the spinning ring element
       * @ko 돌아가는 링 엘리먼트의 클래스 이름
       * @since 4.0.0
       */
      RING: "view360-spinner-ring"
    };

    /**
     * Interface of the ControlBar items
     * @ko 컨트롤바 아이템의 인터페이스
     * @category Plugin
     * @group ControlBar
     * @since 4.0.0
     */
    class ControlBarItem {
      /**
       * Create new instance of the ControlBarItem
       * @ko ControlBarItem의 새로운 인스턴스를 생성합니다.
       * @param options Options {@ko 옵션들}
       */
      constructor(options) {
        this.position = options.position;
        this.order = options.order;
      }
    }

    const CONTROL_BAR_DEFAULT_CLASS = {
      CONTROLS_ROOT: "view360-controls",
      CONTROLS_BG: "view360-controls-background",
      CONTROLS_MAIN: "view360-controls-main",
      CONTROLS_TOP: "view360-controls-top",
      CONTROLS_BOTTOM: "view360-controls-bottom",
      CONTROLS_MID: "view360-controls-mid",
      CONTROLS_LEFT: "view360-controls-left",
      CONTROLS_RIGHT: "view360-controls-right",
      CONTROLS_FLOAT_LEFT: "view360-controls-float-left",
      CONTROLS_FLOAT_RIGHT: "view360-controls-float-right",
      CONTROLS_BUTTON: "view360-controls-button",
      PROGRESS_ROOT: "view360-controls-progress",
      VOLUME_ROOT: "view360-controls-volume",
      RANGE_ROOT: "view360-range",
      RANGE_TRACK: "view360-range-track",
      RANGE_THUMB: "view360-range-thumb",
      RANGE_FILLER: "view360-range-filler",
      PLAY_BUTTON: "view360-controls-play",
      PAUSE_BUTTON: "view360-controls-pause",
      UNMUTED_BUTTON: "view360-controls-unmuted",
      MUTED_BUTTON: "view360-controls-muted",
      FULLSCREEN_BUTTON: "view360-controls-fullscreen",
      FULLSCREEN_EXIT_BUTTON: "view360-controls-fullscreen-exit",
      VR_BUTTON: "view360-controls-vr",
      GYRO_ENABLED: "view360-controls-gyro-enabled",
      GYRO_DISABLED: "view360-controls-gyro-disabled",
      VIDEO_TIME_DISPLAY: "view360-controls-time",
      PIEVIEW_ROOT: "view360-controls-pie",
      FIXED: "view360-controls-fixed",
      UNAVAILABLE: "view360-controls-unavailable",
      HIDDEN: "view360-controls-hidden"
    };
    const CONTROL_BAR_ITEM_POSITION = {
      /**
       * Place control bar item floating at top-left corner
       * @ko 아이템을 왼쪽 위 구석에 표시합니다.
       * @since 4.0.0
       */
      TOP_LEFT: "top-left",
      /**
       * Place control bar item floating at top-right corner
       * @ko 아이템을 오른쪽 위 구석에 표시합니다.
       * @since 4.0.0
       */
      TOP_RIGHT: "top-right",
      /**
       * Place control bar item at upper block inside the bottom control bar.
       * @ko 아이템을 하단에 표시되는 컨트롤바 내에서 위쪽 블럭에 표시합니다.
       * @since 4.0.0
       */
      MAIN_TOP: "main-top",
      /**
       * Place control bar item at lower block inside the bottom control bar.
       * @ko 아이템을 하단에 표시되는 컨트롤바 내에서 하단 블럭에 표시합니다.
       * @since 4.0.0
       */
      MAIN_BOTTOM: "main-bottom",
      /**
       * Place control bar item at center-left block inside the bottom control bar.
       * @ko 아이템을 하단에 표시되는 컨트롤바 내에서 중간 왼쪽 블럭에 표시합니다.
       * @since 4.0.0
       */
      MAIN_LEFT: "main-left",
      /**
       * Place control bar item at center-right block inside the bottom control bar.
       * @ko 아이템을 하단에 표시되는 컨트롤바 내에서 중간 오른쪽 블럭에 표시합니다.
       * @since 4.0.0
       */
      MAIN_RIGHT: "main-right"
    };

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    class RangeControl extends Component__default["default"] {
      /**
       *
       */
      constructor() {
        super();
        this._onHold = ({
          srcEvent,
          isTouch
        }) => {
          var _a;
          const bbox = this._bbox;
          if (!bbox) return;
          const x = isTouch ? srcEvent.touches[0].pageX : srcEvent.pageX;
          const elX = bbox.x + ((_a = window.scrollX) !== null && _a !== void 0 ? _a : window.pageXOffset);
          const clamepdX = clamp(x, elX, elX + bbox.width);
          const progress = (clamepdX - elX) / bbox.width;
          this._motion.reset(clamepdX);
          this.thumbEl.classList.add(this._fixedClass);
          this.trigger(CONTROL_EVENTS.INPUT_START, progress);
        };
        this._onChange = ({
          delta
        }) => {
          var _a;
          const motion = this._motion;
          const bbox = this._bbox;
          if (!bbox) return;
          motion.setNewEndByDelta(delta.x);
          motion.update(1);
          const elX = bbox.x + ((_a = window.scrollX) !== null && _a !== void 0 ? _a : window.pageXOffset);
          const clampedX = clamp(motion.val, elX, elX + bbox.width);
          const progress = (clampedX - elX) / bbox.width;
          this.trigger(CONTROL_EVENTS.CHANGE, progress);
        };
        this._onRelease = () => {
          const bbox = this._bbox;
          if (!bbox) return;
          this.thumbEl.classList.remove(this._fixedClass);
          this.trigger(CONTROL_EVENTS.INPUT_END);
        };
        const root = document.createElement(EL_DIV);
        const track = document.createElement(EL_DIV);
        const thumb = document.createElement(EL_DIV);
        const filler = document.createElement(EL_DIV);
        root.draggable = false;
        track.appendChild(filler);
        track.appendChild(thumb);
        root.appendChild(track);
        this.rootEl = root;
        this.trackEl = track;
        this.thumbEl = thumb;
        this.fillerEl = filler;
        this._mouseInput = new MouseInput();
        this._touchInput = new TouchInput();
        this._motion = new Motion({
          duration: 1,
          range: INFINITE_RANGE,
          easing: x => x
        });
        this._bbox = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          left: 0,
          right: 0,
          bottom: 0,
          top: 0
        };
        this._fixedClass = CONTROL_BAR_DEFAULT_CLASS.FIXED;
      }
      init(className) {
        const mouseInput = this._mouseInput;
        const touchInput = this._touchInput;
        this.rootEl.classList.add(className.RANGE_ROOT);
        this.trackEl.classList.add(className.RANGE_TRACK);
        this.thumbEl.classList.add(className.RANGE_THUMB);
        this.fillerEl.classList.add(className.RANGE_FILLER);
        this._fixedClass = className.FIXED;
        mouseInput.on(CONTROL_EVENTS.INPUT_START, this._onHold);
        touchInput.on(CONTROL_EVENTS.INPUT_START, this._onHold);
        mouseInput.on(CONTROL_EVENTS.INPUT_END, this._onRelease);
        touchInput.on(CONTROL_EVENTS.INPUT_END, this._onRelease);
        mouseInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
        touchInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
        mouseInput.enable(this.rootEl);
        touchInput.enable(this.rootEl);
        this.resize();
      }
      destroy() {
        const mouseInput = this._mouseInput;
        const touchInput = this._touchInput;
        this.rootEl.className = "";
        this.trackEl.className = "";
        this.thumbEl.className = "";
        this.fillerEl.className = "";
        mouseInput.off();
        touchInput.off();
        mouseInput.disable();
        touchInput.disable();
      }
      resize() {
        this._bbox = this.trackEl.getBoundingClientRect();
      }
      updateStyle(progress) {
        const width = this._bbox.width;
        const clampedProgress = clamp(progress, 0, 1);
        this.fillerEl.style.width = `${clampedProgress * 100}%`;
        this.thumbEl.style.transform = `translateX(${clampedProgress * width}px)`;
      }
    }

    /**
     * Show video progress bar.
     * @ko 비디오의 프로그레스 바를 표시합니다.
     * @category Plugin
     * @group ControlBar
     * @since 4.0.0
     */
    class ProgressBar extends ControlBarItem {
      get element() {
        return this._rangeControl.rootEl;
      }
      /**
       * Create a new instance.
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor({
        position = CONTROL_BAR_ITEM_POSITION.MAIN_TOP,
        order = 9999
      } = {}) {
        super({
          position,
          order
        });
        this._onResize = () => {
          this._rangeControl.resize();
        };
        this._onTimeUpdate = () => {
          const video = this._video;
          if (!video) return;
          this._currentTime = video.source.currentTime;
          this._rangeControl.updateStyle(this._currentTime / this._duration);
        };
        this._onDurationChange = () => {
          const video = this._video;
          if (!video) return;
          this._duration = video.source.duration;
          this._rangeControl.updateStyle(this._currentTime / this._duration);
        };
        this._onHold = progress => {
          const video = this._video;
          const controlBar = this._controlBar;
          if (!video || !controlBar) return;
          const paused = video.isPaused();
          video.source.pause();
          const time = video.source.duration * progress;
          video.source.currentTime = time;
          video.source.dispatchEvent(new CustomEvent(VIDEO_TIME_CHANGE_EVENT, {
            detail: {
              time
            }
          }));
          controlBar.rootEl.classList.add(controlBar.className.FIXED);
          this._wasPaused = !this._playPromise && paused;
        };
        this._onControl = progress => {
          const video = this._video;
          if (!video) return;
          const time = video.source.duration * progress;
          video.source.currentTime = time;
          video.source.dispatchEvent(new CustomEvent(VIDEO_TIME_CHANGE_EVENT, {
            detail: {
              time
            }
          }));
        };
        this._onRelease = () => {
          const video = this._video;
          const controlBar = this._controlBar;
          if (video && controlBar) {
            if (!this._wasPaused && !this._playPromise) {
              this._playPromise = video.source.play().catch(() => void 0);
              // This should not be chained
              this._playPromise.then(() => {
                this._playPromise = null;
              });
              controlBar.rootEl.classList.remove(controlBar.className.FIXED);
            }
          }
          this._wasPaused = false;
        };
        this.position = position;
        this.order = order;
        this._controlBar = null;
        this._rangeControl = new RangeControl();
        this._video = null;
        this._wasPaused = false;
        this._currentTime = 0;
        this._duration = 0;
        this._playPromise = null;
      }
      init(viewer, controlBar) {
        var _a;
        const video = (_a = viewer.mesh) === null || _a === void 0 ? void 0 : _a.getTexture();
        const element = this.element;
        const rangeControl = this._rangeControl;
        const unavailableClass = controlBar.className.UNAVAILABLE;
        if (!video || !video.isVideo()) {
          element.classList.add(unavailableClass);
          return;
        }
        element.classList.remove(unavailableClass);
        element.classList.add(controlBar.className.PROGRESS_ROOT);
        viewer.on(EVENTS.RESIZE, this._onResize);
        video.source.addEventListener(EVENTS$1.VIDEO_TIME_UPDATE, this._onTimeUpdate);
        video.source.addEventListener(EVENTS$1.VIDEO_DURATION_CHANGE, this._onDurationChange);
        video.source.addEventListener(VIDEO_TIME_CHANGE_EVENT, this._onTimeUpdate);
        rangeControl.init(controlBar.className);
        rangeControl.on(CONTROL_EVENTS.INPUT_START, this._onHold);
        rangeControl.on(CONTROL_EVENTS.CHANGE, this._onControl);
        rangeControl.on(CONTROL_EVENTS.INPUT_END, this._onRelease);
        this._video = video;
        this._currentTime = video.source.currentTime;
        this._duration = video.source.duration;
        this._controlBar = controlBar;
        rangeControl.updateStyle(this._currentTime / this._duration);
      }
      destroy(viewer) {
        const video = this._video;
        viewer.off(EVENTS.RESIZE, this._onResize);
        if (video) {
          video.source.removeEventListener(EVENTS$1.VIDEO_TIME_UPDATE, this._onTimeUpdate);
          video.source.removeEventListener(EVENTS$1.VIDEO_DURATION_CHANGE, this._onDurationChange);
          video.source.removeEventListener(VIDEO_TIME_CHANGE_EVENT, this._onTimeUpdate);
        }
        this._rangeControl.destroy();
        this._video = null;
        this._playPromise = null;
      }
    }

    /**
     * Show video play / pause button.
     * @ko 비디오 재생 / 일시정지 버튼을 표시합니다.
     * @category Plugin
     * @group ControlBar
     * @since 4.0.0
     */
    class PlayButton extends ControlBarItem {
      /**
       * Create a new instance.
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor({
        position = CONTROL_BAR_ITEM_POSITION.MAIN_LEFT,
        order = 9999
      } = {}) {
        super({
          position,
          order
        });
        this._onClick = () => {
          const video = this._video;
          if (!video) return;
          if (this._paused) {
            video.source.play();
          } else {
            video.source.pause();
          }
        };
        this._onPlay = () => {
          if (!this._controlBar) return;
          const element = this.element;
          const className = this._controlBar.className;
          element.classList.add(className.PAUSE_BUTTON);
          element.classList.remove(className.PLAY_BUTTON);
          element.title = "Pause Video";
          this._paused = false;
        };
        this._onPause = () => {
          if (!this._controlBar) return;
          const element = this.element;
          const className = this._controlBar.className;
          element.classList.add(className.PLAY_BUTTON);
          element.classList.remove(className.PAUSE_BUTTON);
          element.title = "Play Video";
          this._paused = true;
        };
        this.element = document.createElement(EL_BUTTON);
        this._video = null;
        this._paused = true;
        this._controlBar = null;
      }
      init(viewer, controlBar) {
        var _a;
        const element = this.element;
        const video = (_a = viewer.mesh) === null || _a === void 0 ? void 0 : _a.getTexture();
        const className = controlBar.className;
        const unavailableClass = className.UNAVAILABLE;
        if (!video || !video.isVideo()) {
          element.classList.add(unavailableClass);
          return;
        }
        element.classList.add(className.CONTROLS_BUTTON);
        element.classList.remove(unavailableClass);
        const paused = video.isPaused();
        this._video = video;
        this._paused = paused;
        this._controlBar = controlBar;
        if (paused) {
          this._onPause();
        } else {
          this._onPlay();
        }
        element.addEventListener(EVENTS$1.CLICK, this._onClick);
        video.source.addEventListener(EVENTS$1.VIDEO_PLAY, this._onPlay);
        video.source.addEventListener(EVENTS$1.VIDEO_PAUSE, this._onPause);
      }
      destroy() {
        const video = this._video;
        const element = this.element;
        if (!video) return;
        element.className = "";
        element.removeEventListener(EVENTS$1.CLICK, this._onClick);
        video.source.removeEventListener(EVENTS$1.VIDEO_PLAY, this._onPlay);
        video.source.removeEventListener(EVENTS$1.VIDEO_PAUSE, this._onPause);
        this._video = null;
        this._paused = true;
        this._controlBar = null;
      }
    }

    /**
     * Show video volume control.
     * @ko 비디오 볼륨 조절 버튼을 표시합니다.
     * @category Plugin
     * @group ControlBar
     * @since 4.0.0
     */
    class VolumeControl extends ControlBarItem {
      get element() {
        return this._rootEl;
      }
      /**
       * Create a new instance.
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor({
        position = CONTROL_BAR_ITEM_POSITION.MAIN_RIGHT,
        order = 9999
      } = {}) {
        super({
          position,
          order
        });
        this._onResize = () => {
          this._rangeControl.resize();
          this._updateDisplay();
        };
        this._onClick = () => {
          const video = this._video;
          if (!video || this._rootEl.disabled) return;
          video.source.muted = !video.source.muted;
        };
        this._onVolumeChange = () => {
          const button = this._buttonEl;
          const video = this._video;
          const controlBar = this._controlBar;
          if (!video || !controlBar) return;
          const className = controlBar.className;
          if (video.source.muted || video.source.volume === 0) {
            button.classList.add(className.MUTED_BUTTON);
            button.classList.remove(className.UNMUTED_BUTTON);
          } else {
            button.classList.add(className.UNMUTED_BUTTON);
            button.classList.remove(className.MUTED_BUTTON);
          }
          this._updateDisplay();
        };
        this._onHold = progress => {
          const video = this._video;
          const controlBar = this._controlBar;
          if (!video || !controlBar) return;
          const className = controlBar.className;
          video.source.volume = progress;
          this._rootEl.classList.add(className.FIXED);
          controlBar.containerEl.classList.add(className.FIXED);
          this._updateDisplay();
        };
        this._onChange = progress => {
          const video = this._video;
          if (!video) return;
          video.source.volume = progress;
          if (progress > 0) {
            video.source.muted = false;
          } else {
            video.source.muted = true;
          }
          this._updateDisplay();
        };
        this._onRelease = () => {
          const controlBar = this._controlBar;
          if (!controlBar) return;
          const className = controlBar.className;
          this._rootEl.classList.remove(className.FIXED);
          controlBar.containerEl.classList.remove(className.FIXED);
        };
        this._updateDisplay = () => {
          const video = this._video;
          const root = this._rootEl;
          if (!video) return;
          if (!video.hasAudio()) {
            root.disabled = true;
            return;
          }
          root.disabled = false;
          const volume = video.source.muted ? 0 : video.source.volume;
          this._rangeControl.updateStyle(volume);
        };
        this._controlBar = null;
        this._rangeControl = new RangeControl();
        this._createElements();
        this._video = null;
      }
      init(viewer, controlBar) {
        var _a;
        const video = (_a = viewer.mesh) === null || _a === void 0 ? void 0 : _a.getTexture();
        const root = this._rootEl;
        const button = this._buttonEl;
        const rangeControl = this._rangeControl;
        const className = controlBar.className;
        const unavailableClass = className.UNAVAILABLE;
        if (!video || !video.isVideo()) {
          root.classList.add(unavailableClass);
          return;
        }
        root.classList.remove(unavailableClass);
        root.classList.add(className.CONTROLS_BUTTON);
        root.classList.add(className.VOLUME_ROOT);
        button.classList.add(className.CONTROLS_BUTTON);
        if (video.source.muted) {
          button.classList.add(className.MUTED_BUTTON);
        } else {
          button.classList.add(className.UNMUTED_BUTTON);
        }
        viewer.on(EVENTS.RESIZE, this._onResize);
        root.addEventListener(EVENTS$1.TRANSITION_END, this._onResize);
        button.addEventListener(EVENTS$1.CLICK, this._onClick);
        video.source.addEventListener(EVENTS$1.VIDEO_VOLUME_CHANGE, this._onVolumeChange);
        video.source.addEventListener(EVENTS$1.VIDEO_LOADED_DATA, this._updateDisplay);
        video.source.addEventListener(EVENTS$1.VIDEO_CAN_PLAYTHROUGH, this._updateDisplay);
        rangeControl.init(className);
        rangeControl.on(CONTROL_EVENTS.INPUT_START, this._onHold);
        rangeControl.on(CONTROL_EVENTS.CHANGE, this._onChange);
        rangeControl.on(CONTROL_EVENTS.INPUT_END, this._onRelease);
        this._controlBar = controlBar;
        this._video = video;
        this._updateDisplay();
      }
      destroy(viewer) {
        const video = this._video;
        const button = this._buttonEl;
        const root = this._rootEl;
        root.className = "";
        button.className = "";
        viewer.off(EVENTS.RESIZE, this._onResize);
        root.removeEventListener(EVENTS$1.TRANSITION_END, this._onResize);
        button.removeEventListener(EVENTS$1.CLICK, this._onClick);
        if (video) {
          video.source.removeEventListener(EVENTS$1.VIDEO_VOLUME_CHANGE, this._onVolumeChange);
          video.source.removeEventListener(EVENTS$1.VIDEO_LOADED_DATA, this._updateDisplay);
          video.source.removeEventListener(EVENTS$1.VIDEO_CAN_PLAYTHROUGH, this._updateDisplay);
        }
        this._controlBar = null;
        this._rangeControl.destroy();
        this._video = null;
      }
      _createElements() {
        const root = document.createElement(EL_BUTTON);
        const buttonEl = document.createElement(EL_DIV);
        root.appendChild(this._rangeControl.rootEl);
        root.appendChild(buttonEl);
        root.title = "Toggle Mute";
        this._rootEl = root;
        this._buttonEl = buttonEl;
      }
    }

    /**
     * Show fullscreen enter / exit button.
     * @ko 풀스크린 진입 / 해제 버튼을 표시합니다.
     * @category Plugin
     * @group ControlBar
     * @since 4.0.0
     */
    class FullscreenButton extends ControlBarItem {
      /**
       * Create a new instance.
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor({
        position = CONTROL_BAR_ITEM_POSITION.MAIN_RIGHT,
        order = 9999
      } = {}) {
        super({
          position,
          order
        });
        this._onClick = () => {
          const target = this._targetEl;
          if (!target) return;
          if (isFullscreen()) {
            this._exitFullscreen();
          } else {
            this._requestFullscreen(target);
          }
        };
        this._onFullscreenChange = () => {
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
        this.element = document.createElement(EL_BUTTON);
        this.element.title = "Toggle Fullscreen";
        this._controlBar = null;
        this._targetEl = null;
      }
      init(viewer, controlBar) {
        const element = this.element;
        const className = controlBar.className;
        if (!this._fullscreenAvailable()) {
          element.classList.add(className.UNAVAILABLE);
          return;
        }
        element.classList.add(className.CONTROLS_BUTTON);
        element.classList.remove(className.UNAVAILABLE);
        element.addEventListener(EVENTS$1.CLICK, this._onClick);
        this._addFullscreenHandlers();
        if (isFullscreen()) {
          element.classList.add(className.FULLSCREEN_EXIT_BUTTON);
        } else {
          element.classList.add(className.FULLSCREEN_BUTTON);
        }
        this._controlBar = controlBar;
        this._targetEl = viewer.rootEl;
      }
      destroy() {
        const element = this.element;
        element.className = "";
        element.removeEventListener(EVENTS$1.CLICK, this._onClick);
        this._removeFullscreenHandlers();
        this._controlBar = null;
        this._targetEl = null;
      }
      _fullscreenAvailable() {
        return FULLSCREEN_REQUEST.some(key => !!document[key]);
      }
      _requestFullscreen(el) {
        for (const key of FULLSCREEN_REQUEST) {
          const request = el[key];
          if (request) {
            request.call(el);
            return;
          }
        }
      }
      _exitFullscreen() {
        for (const key of FULLSCREEN_EXIT) {
          const exit = document[key];
          if (exit) {
            exit.call(document);
            return;
          }
        }
      }
      _addFullscreenHandlers() {
        FULLSCREEN_CHANGE.forEach(evtName => {
          document.addEventListener(evtName, this._onFullscreenChange);
        });
      }
      _removeFullscreenHandlers() {
        FULLSCREEN_CHANGE.forEach(evtName => {
          document.removeEventListener(evtName, this._onFullscreenChange);
        });
      }
    }

    /**
     * Show video current / total time.
     * @ko 비디오의 현재 / 총 재생시간을 표시합니다.
     * @category Plugin
     * @group ControlBar
     * @since 4.0.0
     */
    class VideoTime extends ControlBarItem {
      /**
       * Create a new instance.
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor({
        position = CONTROL_BAR_ITEM_POSITION.MAIN_LEFT,
        order = 9999
      } = {}) {
        super({
          position,
          order
        });
        this._onTimeUpdate = () => {
          const video = this._video;
          if (!video) return;
          this._currentTime = video.source.currentTime;
          this._updateDisplay();
        };
        this._onDurationChange = () => {
          const video = this._video;
          if (!video) return;
          this._duration = video.source.duration;
          this._updateDisplay();
        };
        this._onCustomTimeChange = evt => {
          this._currentTime = evt.detail.time;
          this._updateDisplay();
        };
        this.element = document.createElement(EL_DIV);
        this._video = null;
        this._currentTime = 0;
        this._duration = 0;
      }
      init(viewer, controlBar) {
        var _a;
        const video = (_a = viewer.mesh) === null || _a === void 0 ? void 0 : _a.getTexture();
        const element = this.element;
        const className = controlBar.className;
        if (!video || !video.isVideo()) {
          element.classList.add(className.UNAVAILABLE);
          return;
        }
        element.classList.add(className.VIDEO_TIME_DISPLAY);
        element.classList.remove(className.UNAVAILABLE);
        video.source.addEventListener(EVENTS$1.VIDEO_TIME_UPDATE, this._onTimeUpdate);
        video.source.addEventListener(EVENTS$1.VIDEO_DURATION_CHANGE, this._onDurationChange);
        video.source.addEventListener(VIDEO_TIME_CHANGE_EVENT, this._onCustomTimeChange);
        this._video = video;
        this._currentTime = video.source.currentTime;
        this._duration = video.source.duration;
        this._updateDisplay();
      }
      destroy() {
        const video = this._video;
        if (!video) return;
        this.element.className = "";
        video.source.removeEventListener(EVENTS$1.VIDEO_TIME_UPDATE, this._onTimeUpdate);
        video.source.removeEventListener(EVENTS$1.VIDEO_DURATION_CHANGE, this._onDurationChange);
        video.source.removeEventListener(VIDEO_TIME_CHANGE_EVENT, this._onCustomTimeChange);
        this._video = null;
      }
      _updateDisplay() {
        const time = this._currentTime;
        const timeMinute = Math.floor(time / 60);
        const timeSeconds = Math.floor(time - timeMinute * 60);
        const timeSecondsFormatted = timeSeconds < 10 ? `0${timeSeconds}` : timeSeconds;
        const duration = this._duration;
        const durationMinute = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration - durationMinute * 60);
        const durationSecondsFormatted = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
        this.element.innerText = `${timeMinute}:${timeSecondsFormatted} / ${durationMinute}:${durationSecondsFormatted}`;
      }
    }

    /**
     * Show camera direction/fov indicator.
     * @ko 카메라가 향하는 방향 및 FOV를 표시합니다.
     * @category Plugin
     * @group ControlBar
     * @since 4.0.0
     */
    class PieView extends ControlBarItem {
      /**
       * Create a new instance.
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor({
        resetCamera = true,
        position = CONTROL_BAR_ITEM_POSITION.TOP_RIGHT,
        order = 9999
      } = {}) {
        super({
          position,
          order
        });
        this._onClick = () => {
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
        this._updatePie = ({
          target: viewer
        }) => {
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
        this.element = document.createElement(EL_DIV);
        this.element.title = "Reset view";
        this.resetCamera = resetCamera;
        this._createPieElements();
        this._viewer = null;
      }
      init(viewer, controlBar) {
        const element = this.element;
        if (!viewer.initialized) {
          viewer.once(EVENTS.READY, this._updatePie);
        } else {
          this._updatePie({
            target: viewer
          });
        }
        const rootClass = controlBar.className.PIEVIEW_ROOT;
        element.classList.add(rootClass);
        if (this.resetCamera) {
          element.addEventListener(EVENTS$1.CLICK, this._onClick);
        }
        viewer.on(EVENTS.VIEW_CHANGE, this._updatePie);
        this._viewer = viewer;
      }
      destroy(viewer) {
        const element = this.element;
        element.removeEventListener(EVENTS$1.CLICK, this._onClick);
        element.className = "";
        viewer.off(EVENTS.READY, this._updatePie);
        viewer.off(EVENTS.VIEW_CHANGE, this._updatePie);
        this._viewer = null;
      }
      _createPieElements() {
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
        this._piePathEl = piePath;
        this._rangeCircleEl = rangeCircle;
      }
    }

    /**
     * Show VR enter button.
     * @ko VR 진입 버튼을 표시합니다.
     * @category Plugin
     * @group ControlBar
     * @since 4.0.0
     */
    class VRButton extends ControlBarItem {
      /**
       * Create a new instance.
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor({
        position = CONTROL_BAR_ITEM_POSITION.MAIN_RIGHT,
        order = 9999
      } = {}) {
        super({
          position,
          order
        });
        this._onClick = () => {
          const viewer = this._viewer;
          if (!viewer) return;
          viewer.vr.enter();
        };
        this.element = document.createElement(EL_BUTTON);
        this.element.title = "Enter VR";
        this._viewer = null;
      }
      init(viewer, controlBar) {
        const element = this.element;
        const className = controlBar.className;
        element.classList.add(className.UNAVAILABLE);
        element.classList.add(className.VR_BUTTON);
        element.classList.add(className.CONTROLS_BUTTON);
        viewer.vr.isAvailable().then(available => {
          if (available) {
            element.classList.remove(className.UNAVAILABLE);
          }
        });
        element.addEventListener(EVENTS$1.CLICK, this._onClick);
        this._viewer = viewer;
      }
      destroy() {
        const element = this.element;
        element.className = "";
        element.removeEventListener(EVENTS$1.CLICK, this._onClick);
        this._viewer = null;
      }
    }

    /**
     * Show gyroscope control enable / disable button
     * @ko 자이로스코프 컨트롤 활성화 / 비활성화 버튼을 표시합니다.
     * @category Plugin
     * @group ControlBar
     * @since 4.0.0
     */
    class GyroButton extends ControlBarItem {
      /**
       * Create a new instance.
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor({
        position = CONTROL_BAR_ITEM_POSITION.MAIN_RIGHT,
        order = 9999
      } = {}) {
        super({
          position,
          order
        });
        this._onClick = () => {
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
        this._updateStyle = () => {
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
        this.element = document.createElement(EL_DIV);
        this.element.title = "Toggle gyroscope control";
      }
      init(viewer, controlBar) {
        const element = this.element;
        const className = controlBar.className;
        element.addEventListener(EVENTS$1.CLICK, this._onClick);
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
      destroy(viewer) {
        const element = this.element;
        viewer.control.gyro.off(CONTROL_EVENTS.ENABLE, this._updateStyle);
        viewer.control.gyro.off(CONTROL_EVENTS.DISABLE, this._updateStyle);
        element.removeEventListener(EVENTS$1.CLICK, this._onClick);
        element.className = "";
        this._controlBar = null;
        this._viewer = null;
      }
    }

    class AutoHide {
      get enabled() {
        return !!this._targetEl;
      }
      get hidden() {
        return this._controlBar.containerEl.classList.contains(this._hiddenClass);
      }
      get _hiddenClass() {
        return this._controlBar.className.HIDDEN;
      }
      get _fixedClass() {
        return this._controlBar.className.FIXED;
      }
      constructor(controlBar, {
        initialDelay = 3000,
        delay = 0,
        idleDelay: activationDelay = 3000
      }) {
        this._onMouseEnter = () => {
          this._isCursorInside = true;
          this.show();
        };
        this._onMouseLeave = () => {
          this._isCursorInside = false;
          this._hideAfterDelay();
        };
        this._onMouseMove = () => {
          if (!this._isFullscreen) return;
          this.showTemporaliy();
        };
        this._onHold = evt => {
          this._isGrabbing = true;
          if (evt.pointerType === "mouse") {
            this._isCursorInside = true;
          }
          window.addEventListener(EVENTS$1.MOUSE_UP, this._onRelease);
          this.show();
        };
        this._onRelease = () => {
          this._isGrabbing = false;
          window.removeEventListener(EVENTS$1.MOUSE_UP, this._onRelease);
          this._hideAfterDelay();
        };
        this._onVideoPlay = () => {
          const root = this._targetEl;
          if (!root) return;
          this._controlBar.containerEl.classList.remove(this._fixedClass);
        };
        this._onVideoPause = () => {
          const root = this._targetEl;
          if (!root) return;
          this._controlBar.containerEl.classList.add(this._fixedClass);
        };
        this._onFullscreenChange = () => {
          this._isFullscreen = isFullscreen();
          if (this._isFullscreen) {
            this._hideAfterDelay();
          }
        };
        this._controlBar = controlBar;
        this._initialDelay = initialDelay;
        this._delay = delay;
        this._idleDelay = activationDelay;
        this._timer = -1;
        this._isCursorInside = false;
        this._isGrabbing = false;
        this._isFullscreen = false;
        this._video = null;
        this._targetEl = null;
      }
      enable(viewer) {
        var _a;
        if (this._targetEl) {
          this.disable(viewer);
        }
        const initialDelay = this._initialDelay;
        const root = viewer.rootEl;
        this._targetEl = viewer.rootEl;
        this._timer = window.setTimeout(() => {
          this.hide();
        }, initialDelay);
        root.addEventListener(EVENTS$1.MOUSE_DOWN, this._onHold);
        root.addEventListener(EVENTS$1.MOUSE_ENTER, this._onMouseEnter);
        root.addEventListener(EVENTS$1.MOUSE_MOVE, this._onMouseMove);
        root.addEventListener(EVENTS$1.MOUSE_LEAVE, this._onMouseLeave);
        this._addFullscreenHandlers();
        const video = (_a = viewer.mesh) === null || _a === void 0 ? void 0 : _a.getTexture();
        if (!video || !video.isVideo()) {
          return;
        }
        if (video.isPaused()) {
          this._controlBar.containerEl.classList.add(this._fixedClass);
        }
        video.source.addEventListener(EVENTS$1.VIDEO_PLAY, this._onVideoPlay);
        video.source.addEventListener(EVENTS$1.VIDEO_PAUSE, this._onVideoPause);
        this._video = video;
      }
      disable(viewer) {
        if (!this._targetEl) return;
        const controlBar = this._controlBar;
        const root = viewer.rootEl;
        const video = this._video;
        root.removeEventListener(EVENTS$1.MOUSE_DOWN, this._onHold);
        window.removeEventListener(EVENTS$1.MOUSE_UP, this._onRelease);
        root.removeEventListener(EVENTS$1.MOUSE_ENTER, this._onMouseEnter);
        root.removeEventListener(EVENTS$1.MOUSE_MOVE, this._onMouseMove);
        root.removeEventListener(EVENTS$1.MOUSE_LEAVE, this._onMouseLeave);
        this._removeFullscreenHandlers();
        window.clearTimeout(this._timer);
        controlBar.containerEl.classList.remove(this._fixedClass);
        if (video) {
          video.source.removeEventListener(EVENTS$1.VIDEO_PLAY, this._onVideoPlay);
          video.source.removeEventListener(EVENTS$1.VIDEO_PAUSE, this._onVideoPause);
        }
        this._isCursorInside = false;
        this._isGrabbing = false;
        this._video = null;
        this._targetEl = null;
      }
      show() {
        this._clearHideTimer();
        this._controlBar.containerEl.classList.remove(this._hiddenClass);
      }
      showTemporaliy() {
        this.show();
        this._hideAfterDelay(this._idleDelay);
      }
      hide() {
        this._clearHideTimer();
        this._controlBar.containerEl.classList.add(this._hiddenClass);
      }
      _clearHideTimer() {
        if (this._timer) {
          window.clearTimeout(this._timer);
          this._timer = -1;
        }
      }
      _hideAfterDelay(delay = this._delay) {
        if (this._isGrabbing || !this._isFullscreen && this._isCursorInside) return;
        this._clearHideTimer();
        if (delay <= 0) {
          this.hide();
        } else {
          this._timer = window.setTimeout(() => {
            this.hide();
          }, delay);
        }
      }
      _addFullscreenHandlers() {
        FULLSCREEN_CHANGE.forEach(evtName => {
          document.addEventListener(evtName, this._onFullscreenChange);
        });
      }
      _removeFullscreenHandlers() {
        FULLSCREEN_CHANGE.forEach(evtName => {
          document.removeEventListener(evtName, this._onFullscreenChange);
        });
      }
    }

    class VideoControl {
      constructor() {
        this._onKeyDown = event => {
          const video = this._video;
          if (!video) return;
          event.preventDefault();
          event.stopPropagation();
          const videoEl = video.source;
          const keyPressed = event.keyCode != null ? DIRECTION_KEY_CODE[event.keyCode] : DIRECTION_KEY_NAME[event.key];
          switch (keyPressed) {
            case "LEFT":
            case "RIGHT":
              return this._changeVideoTime(videoEl, keyPressed === "RIGHT");
            case "UP":
            case "DOWN":
              return this._changeVideoVolume(videoEl, keyPressed === "UP");
          }
          const spacePressed = event.keyCode === SPACE_KEY_CODE || event.key === SPACE_KEY_NAME;
          if (spacePressed) {
            this._toggleVideo(video);
          }
        };
      }
      enable(root, video) {
        this._video = video;
        // capture is needed for resolving conflict with keyboard control
        root.addEventListener(EVENTS$1.KEY_DOWN, this._onKeyDown, true);
      }
      disable(root) {
        this._video = null;
        root.removeEventListener(EVENTS$1.KEY_DOWN, this._onKeyDown, true);
      }
      _changeVideoTime(video, forward) {
        const delta = forward ? 5 : -5;
        video.currentTime += delta;
        video.dispatchEvent(new CustomEvent(VIDEO_TIME_CHANGE_EVENT, {
          detail: {
            time: video.currentTime
          }
        }));
      }
      _changeVideoVolume(video, increase) {
        const delta = increase ? 0.1 : -0.1;
        if (video.muted) {
          video.volume = clamp(delta, 0, 1);
        } else {
          video.volume = clamp(video.volume + delta, 0, 1);
        }
        if (video.volume > 0) {
          video.muted = false;
        } else {
          video.muted = true;
        }
      }
      _toggleVideo(video) {
        if (video.isPaused()) {
          video.source.play();
        } else {
          video.source.pause();
        }
      }
    }

    /**
     * A plugin that displays extra buttons & controls that controls {@link View360}.
     * @ko {@link View360}에 부가적인 버튼과 컨트롤을 추가해주는 플러그인.
     * @category Plugin
     * @since 4.0.0
     */
    class ControlBar {
      /**
       * Root element of the control bar
       * @ko 컨트롤바의 루트 엘리먼트
       * @since 4.0.0
       */
      get rootEl() {
        return this._rootEl;
      }
      /**
       * Container element of the control bar
       * @ko 컨트롤바의 컨테이너 엘리먼트
       * @since 4.0.0
       */
      get containerEl() {
        return this._containerEl;
      }
      /**
       * Background element of the control bar
       * @ko 컨트롤바의 배경 엘리먼트
       * @since 4.0.0
       */
      get backgroundEl() {
        return this._bgEl;
      }
      /**
       * Control bar's default items created by {@link ControlBarOptions}
       * @ko 주어진 {@link ControlBarOptions}에 의해 생성된 디폴트 아이템들
       * @since 4.0.0
       */
      get items() {
        return this._items;
      }
      /**
       * Custom control bar items
       * @ko 커스텀 컨트롤바 아이템들을 추가합니다.
       * @since 4.0.0
       */
      get customItems() {
        return this._customItems;
      }
      /**
       * Create new instance of ControlBar.
       * @ko ControlBar의 새 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor({
        autoHide,
        showBackground,
        clickToPlay = true,
        keyboardControls = true,
        progressBar = true,
        playButton = true,
        volumeButton = true,
        fullscreenButton = true,
        videoTime = true,
        pieView = true,
        vrButton = true,
        gyroButton = true,
        className = {},
        customItems = []
      } = {}) {
        var _a;
        this._onStaticClick = ({
          target: viewer,
          isTouch
        }) => {
          var _a;
          const autoHider = this._autoHider;
          if (isTouch) {
            if (!autoHider.enabled) return;
            if (autoHider.hidden) {
              autoHider.showTemporaliy();
            } else {
              autoHider.hide();
            }
          } else {
            if (!this.clickToPlay) return;
            const video = (_a = viewer.mesh) === null || _a === void 0 ? void 0 : _a.getTexture();
            if (!video || !video.isVideo()) return;
            if (video.isPaused()) {
              video.source.play();
            } else {
              video.source.pause();
            }
          }
        };
        this._onNewSrcLoad = ({
          target: viewer
        }) => {
          const items = this._items;
          this._updateBackground(viewer);
          this._updateAutoHide(viewer);
          this._updateKeyboardHandler(viewer);
          Object.keys(items).forEach(key => {
            const category = items[key];
            category.forEach(item => {
              item.destroy(viewer, this);
              item.init(viewer, this);
            });
          });
        };
        this.autoHide = autoHide;
        this.showBackground = showBackground;
        this.clickToPlay = clickToPlay;
        this.keyboardControls = keyboardControls;
        this.progressBar = progressBar;
        this.playButton = playButton;
        this.volumeButton = volumeButton;
        this.fullscreenButton = fullscreenButton;
        this.videoTime = videoTime;
        this.pieView = pieView;
        this.vrButton = vrButton;
        this.gyroButton = gyroButton;
        this.className = Object.assign(Object.assign({}, ControlBar.DEFAULT_CLASS), className);
        const rootClass = (_a = className.CONTROLS_ROOT) !== null && _a !== void 0 ? _a : ControlBar.DEFAULT_CLASS.CONTROLS_ROOT;
        this._rootEl = createElement(rootClass);
        this._createPositionWrappers();
        this._items = Object.keys(ControlBar.POSITION).reduce((items, key) => {
          items[ControlBar.POSITION[key]] = [];
          return items;
        }, {});
        this._customItems = customItems;
        this._autoHider = new AutoHide(this, getObjectOption(autoHide));
        this._videoControl = new VideoControl();
        customItems.forEach(item => {
          this._items[item.position].push(item);
        });
      }
      init(viewer) {
        const panoRoot = viewer.rootEl;
        const controlsRoot = this._rootEl;
        const defaultItems = this._createDefaultItems();
        this._updateBackground(viewer);
        this._updateAutoHide(viewer);
        this._updateKeyboardHandler(viewer);
        panoRoot.appendChild(controlsRoot);
        this._addItem(viewer, defaultItems);
        this._addItem(viewer, this._customItems);
        viewer.on(EVENTS.PROJECTION_CHANGE, this._onNewSrcLoad);
        viewer.on(EVENTS.STATIC_CLICK, this._onStaticClick);
      }
      destroy(viewer) {
        // Remove controls root from pano root
        const panoRoot = viewer.rootEl;
        const controlsRoot = this._rootEl;
        const items = this._items;
        if (controlsRoot.parentElement === panoRoot) {
          panoRoot.removeChild(controlsRoot);
        }
        Object.keys(items).forEach(key => {
          const category = items[key];
          category.forEach(item => {
            item.destroy(viewer, this);
          });
          items[key] = [];
        });
        this._clearItemElements();
        this._autoHider.disable(viewer);
        this._videoControl.disable(panoRoot);
        viewer.off(EVENTS.PROJECTION_CHANGE, this._onNewSrcLoad);
        viewer.off(EVENTS.STATIC_CLICK, this._onStaticClick);
      }
      _addItem(viewer, items) {
        for (const item of items) {
          const category = this._items[item.position];
          const wrapper = this._wrapperEl[item.position];
          const nextSiblingIndex = findIndex(category, sibling => sibling.order > item.order);
          if (nextSiblingIndex >= 0) {
            const nextSibling = category[nextSiblingIndex].element;
            category.splice(nextSiblingIndex, 0, item);
            wrapper.insertBefore(item.element, nextSibling);
          } else {
            category.push(item);
            wrapper.appendChild(item.element);
          }
          item.init(viewer, this);
        }
      }
      _createPositionWrappers() {
        const className = Object.assign(Object.assign({}, ControlBar.DEFAULT_CLASS), this.className);
        const rootEl = this._rootEl;
        // BG & FLOATING CONTROLS
        const backgroundEl = createElement(className.CONTROLS_BG);
        const floatLeftEl = createElement(className.CONTROLS_FLOAT_LEFT);
        const floatRightEl = createElement(className.CONTROLS_FLOAT_RIGHT);
        rootEl.appendChild(floatLeftEl);
        rootEl.appendChild(floatRightEl);
        // BOTTOM CONTROLS
        const container = createElement(className.CONTROLS_MAIN);
        const topWrapper = createElement(className.CONTROLS_TOP);
        const bottomWrapper = createElement(className.CONTROLS_BOTTOM);
        const midWrapper = createElement(className.CONTROLS_MID);
        const leftControlsWrapper = createElement(className.CONTROLS_LEFT);
        const rightControlsWrapper = createElement(className.CONTROLS_RIGHT);
        midWrapper.appendChild(leftControlsWrapper);
        midWrapper.appendChild(rightControlsWrapper);
        container.appendChild(backgroundEl);
        container.appendChild(topWrapper);
        container.appendChild(midWrapper);
        container.appendChild(bottomWrapper);
        rootEl.appendChild(container);
        this._bgEl = backgroundEl;
        this._containerEl = container;
        this._wrapperEl = {
          [ControlBar.POSITION.MAIN_TOP]: topWrapper,
          [ControlBar.POSITION.MAIN_LEFT]: leftControlsWrapper,
          [ControlBar.POSITION.MAIN_RIGHT]: rightControlsWrapper,
          [ControlBar.POSITION.MAIN_BOTTOM]: bottomWrapper,
          [ControlBar.POSITION.TOP_LEFT]: floatLeftEl,
          [ControlBar.POSITION.TOP_RIGHT]: floatRightEl
        };
      }
      _clearItemElements() {
        const wrappers = Object.keys(ControlBar.POSITION).map(key => ControlBar.POSITION[key]).map(pos => this._wrapperEl[pos]);
        // Remove all elements inside wrappers
        wrappers.forEach(wrapper => {
          while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
          }
        });
      }
      _updateAutoHide(viewer) {
        var _a;
        const autoHide = this.autoHide;
        const autoHider = this._autoHider;
        if (autoHide != null) {
          if (autoHide) {
            autoHider.enable(viewer);
          } else {
            autoHider.disable(viewer);
          }
        } else {
          // Automatically choose whether to show background by content type
          const texture = (_a = viewer.mesh) === null || _a === void 0 ? void 0 : _a.getTexture();
          if (texture && texture.isVideo()) {
            // Enable auto hide when content type is video
            autoHider.enable(viewer);
          } else {
            autoHider.disable(viewer);
          }
        }
      }
      _updateBackground(viewer) {
        var _a, _b;
        const background = this._bgEl;
        const showBackground = this.showBackground;
        const hiddenClass = (_a = this.className.HIDDEN) !== null && _a !== void 0 ? _a : ControlBar.DEFAULT_CLASS.HIDDEN;
        if (showBackground != null) {
          if (showBackground) {
            background.classList.remove(hiddenClass);
          } else {
            background.classList.add(hiddenClass);
          }
        } else {
          // Automatically choose whether to show background by content type
          const texture = (_b = viewer.mesh) === null || _b === void 0 ? void 0 : _b.getTexture();
          if (texture && texture.isVideo()) {
            // Show bg when content type is video
            background.classList.remove(hiddenClass);
          } else {
            background.classList.add(hiddenClass);
          }
        }
      }
      _updateKeyboardHandler(viewer) {
        var _a;
        const panoRoot = viewer.rootEl;
        const videoControl = this._videoControl;
        const texture = (_a = viewer.mesh) === null || _a === void 0 ? void 0 : _a.getTexture();
        if (this.keyboardControls && texture && texture.isVideo()) {
          videoControl.enable(panoRoot, texture);
        } else {
          videoControl.disable(panoRoot);
        }
      }
      _createDefaultItems() {
        const items = [];
        if (this.progressBar) {
          items.push(new ProgressBar(getObjectOption(this.progressBar)));
        }
        if (this.playButton) {
          items.push(new PlayButton(getObjectOption(this.playButton)));
        }
        if (this.volumeButton) {
          items.push(new VolumeControl(getObjectOption(this.volumeButton)));
        }
        if (this.gyroButton) {
          items.push(new GyroButton(getObjectOption(this.gyroButton)));
        }
        if (this.vrButton) {
          items.push(new VRButton(getObjectOption(this.vrButton)));
        }
        if (this.fullscreenButton) {
          items.push(new FullscreenButton(getObjectOption(this.fullscreenButton)));
        }
        if (this.videoTime) {
          items.push(new VideoTime(getObjectOption(this.videoTime)));
        }
        if (this.pieView) {
          items.push(new PieView(getObjectOption(this.pieView)));
        }
        return items;
      }
    }
    /**
     * Default class names that ControlBar uses
     * @ko ControlBar가 사용하는 디폴트 클래스 이름들
     * @since 4.0.0
     */
    ControlBar.DEFAULT_CLASS = CONTROL_BAR_DEFAULT_CLASS;
    /**
     * Constants for {@link ControlBarItemOptions#position}
     * @ko {@link ControlBarItemOptions#position}에 사용 가능한 값들
     */
    ControlBar.POSITION = CONTROL_BAR_ITEM_POSITION;

    /**
     * Base class for projections.
     * @ko 프로젝션 베이스 클래스.
     * @category Projection
     * @since 4.0.0
     */
    class Projection {
      /**
       * Create new instance
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor({
        src,
        video = false
      }) {
        this.src = src;
        this.video = video;
      }
      /**
       * Update camera to match projection's settings.
       * @ko 현재 프로젝션의 세팅으로 카메라를 업데이트합니다.
       * @param camera - Instance of the camera to update {@ko 업데이트할 카메라의 인스턴스}
       * @since 4.0.0
       */
      updateCamera(camera) {
        // Use default mode & no view restriction
        camera.resetRange();
      }
      /**
       * Update control to match projection's settings.
       * @ko 현재 프로젝션의 세팅으로 컨트롤을 업데이트합니다.
       * @param control - Instance of the control to update {@ko 업데이트할 컨트롤의 인스턴스}
       * @since 4.0.0
       */
      updateControl(control) {
        control.ignoreZoomScale = false;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    class Uniform {
      constructor() {
        this.needsUpdate = true;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      destroy(gl) {
        // DO_NOTHING
      }
    }

    class UniformTextureCube extends Uniform {
      constructor(ctx, texture, cubemapOrder) {
        super();
        this.texture = texture;
        this._webglTexture = ctx.createWebGLCubeTexture(texture, texture.width);
        this._cubemapOrder = cubemapOrder;
      }
      destroy(gl) {
        this.texture.destroy();
        gl.deleteTexture(this._webglTexture);
      }
      update(gl, location, isWebGL2) {
        const texture = this.texture;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
        gl.uniform1i(location, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._webglTexture);
        const sources = reorderCube(texture.sources, this._cubemapOrder);
        sources.forEach((src, idx) => {
          if (isWebGL2) {
            gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + idx, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, src);
          } else {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + idx, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
          }
        });
        if (!texture.isVideo()) {
          this.needsUpdate = false;
        }
      }
    }

    /** @hidden */
    class CubeTexturePainter {
      get size() {
        return this._size;
      }
      constructor(texture, cubemapOrder) {
        this.texture = texture;
        this._renderingOrder = reorderCube(range(6), cubemapOrder);
        const canvas = document.createElement("canvas");
        this._calcRenderingSize();
        canvas.width = this._size;
        canvas.height = this._size;
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
      }
      destroy() {
        const canvas = this._canvas;
        // release memories
        canvas.width = 1;
        canvas.height = 1;
        this._canvas = null;
      }
      draw(gl, isWebGL2) {
        const size = this._size;
        const texture = this.texture;
        let surfaceIdx = 0;
        for (let row = 0; row < this._row; row++) {
          for (let column = 0; column < this._column; column++) {
            const x = size * column;
            const y = size * row;
            const renderingFace = this._renderingOrder[surfaceIdx];
            this._ctx.drawImage(texture.source, x, y, size, size, 0, 0, size, size);
            if (isWebGL2) {
              gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + renderingFace, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this._canvas);
            } else {
              gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + renderingFace, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._canvas);
            }
            surfaceIdx++;
          }
        }
      }
      _calcRenderingSize() {
        const {
          width,
          height
        } = this.texture;
        const aspect = width / height;
        if (aspect === 1 / 6) {
          this._size = width;
          this._row = 6;
          this._column = 1;
        } else if (aspect === 6) {
          this._size = height;
          this._row = 1;
          this._column = 6;
        } else if (aspect === 2 / 3) {
          this._size = width * 0.5;
          this._row = 3;
          this._column = 2;
        } else {
          this._size = width / 3;
          this._row = 2;
          this._column = 3;
        }
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    class UniformCanvasCube extends Uniform {
      get texture() {
        return this._painter.texture;
      }
      constructor(ctx, texture, cubemapOrder) {
        super();
        this._painter = new CubeTexturePainter(texture, cubemapOrder);
        this._webglTexture = ctx.createWebGLCubeTexture(texture, this._painter.size);
      }
      destroy(gl) {
        gl.deleteTexture(this._webglTexture);
        this._painter.destroy();
      }
      update(gl, location, isWebGL2) {
        const texture = this.texture;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.uniform1i(location, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._webglTexture);
        this._painter.draw(gl, isWebGL2);
        if (!texture.isVideo()) {
          this.needsUpdate = false;
        }
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @hidden
     */
    class TriangleMesh extends Object3D {
      constructor(vao, program) {
        super();
        this.vao = vao;
        this.program = program;
      }
      destroy(ctx) {
        ctx.releaseVAO(this.vao);
        ctx.releaseShaderResources(this.program);
      }
      getTexture() {
        return this.program.uniforms.uTexture.texture;
      }
    }

    class ShaderProgram {
      constructor(ctx, vertexShader, fragmentShader, uniforms) {
        this.program = ctx.createProgram(vertexShader, fragmentShader);
        this.uniforms = uniforms;
        this.uniformLocations = ctx.getUniformLocations(this.program, uniforms);
      }
    }

    /**
     * @hidden
     */
    class VertexData {
      /** */
      constructor(data, itemSize) {
        this.data = data;
        this.itemSize = itemSize;
        this.count = data.length / itemSize;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @hidden
     */
    class Geometry {
      /** */
      constructor(vertices, indicies, uvs) {
        this.vertices = new VertexData(new Float32Array(vertices), 3);
        this.indicies = new VertexData(new Uint16Array(indicies), 1);
        this.uvs = new VertexData(new Float32Array(uvs), 2);
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @hidden
     */
    class CubeGeometry extends Geometry {
      constructor({
        order,
        rotateUV
      }) {
        const vertices = [
        // back
        1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1,
        // front
        -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
        // up
        -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1,
        // down
        -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1,
        // right
        1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, -1,
        // left
        -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1];
        const indicies = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
        const oneThird = 1 / 3;
        const coords = [];
        for (let r = 1; r >= 0; r--) {
          for (let c = 0; c < 3; c++) {
            const coord = [c * oneThird, r * 0.5, (c + 1) * oneThird, r * 0.5, (c + 1) * oneThird, (r + 1) * 0.5, c * oneThird, (r + 1) * 0.5];
            coords.push(coord);
          }
        }
        if (rotateUV) {
          rotateUV.forEach((degree, idx) => {
            if (degree === ROTATE.ZERO) return;
            const coord = coords[idx];
            let newOrder;
            if (degree === ROTATE.CW_90) {
              newOrder = [1, 2, 3, 0];
            } else if (degree === ROTATE.CCW_90) {
              newOrder = [3, 0, 1, 2];
            } else {
              newOrder = [2, 3, 0, 1];
            }
            const newCoords = Array(coord.length);
            for (let uvIdx = 0; uvIdx < coord.length / 2; uvIdx++) {
              newCoords[uvIdx * 2 + 0] = coord[newOrder[uvIdx] * 2 + 0];
              newCoords[uvIdx * 2 + 1] = coord[newOrder[uvIdx] * 2 + 1];
            }
            coords[idx] = newCoords;
          });
        }
        const uvs = reorderCube(coords, order, "BFUDRL").reduce((acc, val) => acc.concat(val), []);
        super(vertices, indicies, uvs);
      }
    }

    var vs$3 = "#define GLSLIFY 1\nattribute vec3 position;attribute vec2 uv;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying highp vec3 vPos;void main(){vPos=position;gl_Position=uPMatrix*uMVMatrix*vec4(position,1.0);}"; // eslint-disable-line

    var fs$3 = "#define GLSLIFY 1\nuniform samplerCube uTexture;varying highp vec3 vPos;void main(){gl_FragColor=textureCube(uTexture,vec3(vPos.x,vPos.y,-vPos.z));}"; // eslint-disable-line

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Projection based on cubemap images, accepts both multiple or single images.
     * @ko 큐브맵 이미지 기반의 프로젝션, 단일 혹은 여러 장의 이미지를 모두 사용 가능합니다.
     * @since 4.0.0
     * @category Projection
     */
    class CubemapProjection extends Projection {
      /**
       * Create new instance.
       * @ko 새 인스턴스를 생성합니다.
       * @param options Options {@ko Options}
       */
      constructor(options) {
        super(options);
        const {
          cubemapOrder = "RLUDFB",
          cubemapFlipX = false
        } = options;
        this._cubemapOrder = cubemapOrder;
        this._cubemapFlipX = cubemapFlipX;
      }
      createMesh(ctx, texture) {
        const cubemapOrder = this._cubemapOrder;
        const cubemapFlipX = this._cubemapFlipX;
        const uniforms = {
          uTexture: texture.isCube() ? new UniformTextureCube(ctx, texture, cubemapOrder) : new UniformCanvasCube(ctx, texture, cubemapOrder)
        };
        const geometry = new CubeGeometry({
          order: cubemapOrder
        });
        const program = new ShaderProgram(ctx, vs$3, fs$3, uniforms);
        const vao = ctx.createVAO(geometry, program);
        const mesh = new TriangleMesh(vao, program);
        if (cubemapFlipX) {
          mesh.scale[0] = -1;
        }
        mesh.updateMatrix();
        return mesh;
      }
    }

    class UniformTexture2D extends Uniform {
      constructor(ctx, texture) {
        super();
        this.texture = texture;
        this._webglTexture = ctx.createWebGLTexture(texture);
      }
      destroy(gl) {
        this.texture.destroy();
        gl.deleteTexture(this._webglTexture);
      }
      update(gl, location, isWebGL2) {
        const texture = this.texture;
        const isVideo = texture.isVideo();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
        gl.uniform1i(location, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this._webglTexture);
        if (!isVideo && isWebGL2) {
          gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
        } else {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
        }
        if (!isVideo) {
          this.needsUpdate = false;
        }
      }
    }

    var vs$2 = "#define GLSLIFY 1\nattribute vec3 position;attribute vec2 uv;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying highp vec2 vUV;void main(){vUV=uv;gl_Position=uPMatrix*uMVMatrix*vec4(position,1.0);}"; // eslint-disable-line

    var fs$2 = "#define GLSLIFY 1\nuniform sampler2D uTexture;varying highp vec2 vUV;void main(){gl_FragColor=texture2D(uTexture,vUV.st);}"; // eslint-disable-line

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Projection based on cubemap strip.
     * Slightly more efficient than {@link CubemapProjection} as it doesn't copy cubemap image to canvas while rendering.
     * Accepts only single image.
     * @ko 큐브맵 스트립 기반의 프로젝션.
     * {@link CubemapProjection}와 달리 렌더링하는 과정에 캔버스에 이미지를 복사하는 과정이 없기 때문에 살짝 더 효율적입니다.
     * 단일 이미지만 사용 가능합니다.
     * @since 4.0.0
     * @category Projection
     */
    class CubestripProjection extends Projection {
      /**
       * Create new instance.
       * @ko 새 인스턴스를 생성합니다.
       * @param options Options {@ko Options}
       */
      constructor(options) {
        super(options);
        const {
          cubemapOrder = "RLUDFB",
          cubemapFlipX = false
        } = options;
        this._cubemapOrder = cubemapOrder;
        this._cubemapFlipX = cubemapFlipX;
      }
      createMesh(ctx, texture) {
        const cubemapOrder = this._cubemapOrder;
        const cubemapFlipX = this._cubemapFlipX;
        const uniforms = {
          uTexture: new UniformTexture2D(ctx, texture)
        };
        const geometry = new CubeGeometry({
          order: cubemapOrder
        });
        const program = new ShaderProgram(ctx, vs$2, fs$2, uniforms);
        const vao = ctx.createVAO(geometry, program);
        const mesh = new TriangleMesh(vao, program);
        if (cubemapFlipX) {
          mesh.scale[0] = -1;
        }
        mesh.updateMatrix();
        return mesh;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @hidden
     */
    class CylinderGeometry extends Geometry {
      constructor(maxTheta) {
        const vertices = [];
        const indicies = [];
        const uvs = [];
        const height = 1;
        const radialSegments = 60;
        const halfHeight = height * 0.5;
        const heightSegments = [-halfHeight, halfHeight];
        const invRadialSegments = 1 / radialSegments;
        const angleConst = maxTheta * invRadialSegments;
        for (let yIdx = 0; yIdx < 2; yIdx++) {
          const y = heightSegments[yIdx];
          for (let lngIdx = 0; lngIdx <= radialSegments; lngIdx++) {
            const angle = lngIdx * angleConst + Math.PI - maxTheta * 0.5;
            const x = Math.cos(angle);
            const z = Math.sin(angle);
            const u = lngIdx * invRadialSegments;
            const v = yIdx;
            uvs.push(u, v);
            vertices.push(x, y, z);
            if (yIdx === 0 && lngIdx < radialSegments) {
              const a = lngIdx;
              const b = a + radialSegments + 1;
              indicies.push(a, b, a + 1, b, b + 1, a + 1);
            }
          }
        }
        super(vertices, indicies, uvs);
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
    */
    /**
     * Projection based on cylindrical projection.
     * This can show panorama images taken from smartphones.
     * @ko 원통 투영법 기반의 프로젝션.
     * 일반적인 스마트폰 파노라마 사진을 표시하는데 사용될 수 있습니다.
     * @since 4.0.0
     * @category Projection
     */
    class CylindricalProjection extends Projection {
      /**
       * Create new instance.
       * @ko 새 인스턴스를 생성합니다.
       * @param options Options {@ko Options}
       */
      constructor(options) {
        super(options);
        const {
          partial = false
        } = options;
        this._partial = partial;
        this._aspect = 1;
        this._halfHeight = 0;
        this._mesh = null;
      }
      createMesh(ctx, texture) {
        if (this._mesh) return this._mesh;
        const partial = this._partial;
        const {
          width,
          height
        } = texture;
        const aspect = width / height;
        const halfVFov = 180 / aspect;
        const cylinderHeight = partial ? 1 : 2 * Math.tan(halfVFov * DEG_TO_RAD);
        const cylinderTheta = partial ? aspect : 2 * Math.PI;
        const geometry = new CylinderGeometry(cylinderTheta);
        const program = new ShaderProgram(ctx, vs$2, fs$2, {
          uTexture: new UniformTexture2D(ctx, texture)
        });
        const vao = ctx.createVAO(geometry, program);
        const mesh = new TriangleMesh(vao, program);
        mesh.scale[1] = cylinderHeight;
        glMatrix.quat.identity(mesh.rotation);
        glMatrix.quat.rotateY(mesh.rotation, mesh.rotation, -Math.PI / 2);
        mesh.updateMatrix();
        this._aspect = aspect;
        this._halfHeight = cylinderHeight * 0.5;
        this._mesh = mesh;
        return mesh;
      }
      updateCamera(camera) {
        super.updateCamera(camera);
        const mesh = this._mesh;
        const aspect = this._aspect;
        const halfHeight = this._halfHeight;
        if (!mesh) return;
        if (this._partial) {
          const restrictedYaw = 0.5 * aspect * RAD_TO_DEG;
          camera.restrictYawRange(-restrictedYaw, restrictedYaw);
        }
        const restrictedPitch = Math.atan2(halfHeight, 1) * RAD_TO_DEG;
        const minZoom = Math.tan(camera.fov * DEG_TO_RAD * 0.5) / (halfHeight * camera.aspect);
        camera.restrictPitchRange(-restrictedPitch, restrictedPitch);
        camera.restrictZoomRange(minZoom, Infinity);
        camera.restrictRenderHeight(halfHeight * 2);
      }
    }

    var fs$1 = "#define PI 3.14159265359\nprecision mediump float;\n#define GLSLIFY 1\nuniform sampler2D uTexture;varying highp vec2 vUV;const vec2 OPERATE_COORDS_RANGE=vec2(-1.0,1.0);const vec2 TEXTURE_COORDS_RANGE=vec2(0.0,1.0);const float ONE_THIRD=1.0/3.0;const float EAC_CONST=2.0/PI;float scale(vec2 domainRange,vec2 targetRange,float val){float unit=1.0/(domainRange[1]-domainRange[0]);return targetRange[0]+(targetRange[1]-targetRange[0])*(val-domainRange[0])*unit;}void main(void){float transformedCoordX;float transformedCoordY;float texRangeXStart=floor(vUV.s*3.)*ONE_THIRD;float texRangeYStart=floor(vUV.t*2.)*0.5;vec2 orgTextureRangeX=vec2(texRangeXStart,texRangeXStart+ONE_THIRD);vec2 orgTextureRangeY=vec2(texRangeYStart,texRangeYStart+0.5);float px=scale(orgTextureRangeX,OPERATE_COORDS_RANGE,vUV.s);float py=scale(orgTextureRangeY,OPERATE_COORDS_RANGE,vUV.t);float qu=EAC_CONST*atan(px)+0.5;float qv=EAC_CONST*atan(py)+0.5;transformedCoordX=scale(TEXTURE_COORDS_RANGE,orgTextureRangeX,qu);transformedCoordY=scale(TEXTURE_COORDS_RANGE,orgTextureRangeY,qv);gl_FragColor=texture2D(uTexture,vec2(transformedCoordX,transformedCoordY));}"; // eslint-disable-line

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Equi-Angular Cubemap Projection.
     * This format is used by Youtube's 360 videos.
     * @ko Equi-Angular Cubemap 프로젝션.
     * 이 포맷은 주로 Youtube의 360 비디오에 사용됩니다.
     * @since 4.0.0
     * @category Projection
     */
    class EquiangularProjection extends Projection {
      createMesh(ctx, texture) {
        const uniforms = {
          uTexture: new UniformTexture2D(ctx, texture)
        };
        const geometry = new CubeGeometry({
          order: "LFRDBU",
          rotateUV: [ROTATE.ZERO, ROTATE.ZERO, ROTATE.ZERO, ROTATE.CW_90, ROTATE.CCW_90, ROTATE.CW_90]
        });
        const program = new ShaderProgram(ctx, vs$2, fs$1, uniforms);
        const vao = ctx.createVAO(geometry, program);
        const mesh = new TriangleMesh(vao, program);
        return mesh;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @hidden
     */
    class SphereGeometry extends Geometry {
      /** */
      constructor() {
        // const radius = 1;
        const widthSegments = 60;
        const heightSegments = 60;
        const ANGLE_CORRECTION_FOR_CENTER_ALIGN = -0.5 * Math.PI;
        const uvs = [];
        const vertices = [];
        const indicies = [];
        let latIdx;
        let lngIdx;
        for (latIdx = 0; latIdx <= widthSegments; latIdx++) {
          const theta = (latIdx / widthSegments - 0.5) * Math.PI;
          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);
          for (lngIdx = 0; lngIdx <= heightSegments; lngIdx++) {
            const phi = (lngIdx / heightSegments - 0.5) * 2 * Math.PI + ANGLE_CORRECTION_FOR_CENTER_ALIGN;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);
            const x = cosPhi * cosTheta;
            const y = sinTheta;
            const z = sinPhi * cosTheta;
            const u = lngIdx / heightSegments;
            const v = latIdx / widthSegments;
            uvs.push(u, v);
            vertices.push(x, y, z);
            if (lngIdx !== heightSegments && latIdx !== widthSegments) {
              const a = latIdx * (heightSegments + 1) + lngIdx;
              const b = a + heightSegments + 1;
              indicies.push(a, a + 1, b, b, a + 1, b + 1);
            }
          }
        }
        super(vertices, indicies, uvs);
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Projection based on equirectangular projection.
     * @ko 등 장방형 도법(Equirectangular projection) 기반의 프로젝션
     * @since 4.0.0
     * @category Projection
     */
    class EquirectProjection extends Projection {
      /**
       * Create new instance
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor(options) {
        super(options);
      }
      createMesh(ctx, texture) {
        const uniforms = {
          uTexture: new UniformTexture2D(ctx, texture)
        };
        const geometry = new SphereGeometry();
        const program = new ShaderProgram(ctx, vs$2, fs$2, uniforms);
        const vao = ctx.createVAO(geometry, program);
        const mesh = new TriangleMesh(vao, program);
        return mesh;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    class UniformFloat extends Uniform {
      constructor(val) {
        super();
        this.val = val;
      }
      update(gl, location) {
        gl.uniform1f(location, this.val);
        this.needsUpdate = false;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * @hidden
     */
    class PlaneGeometry extends Geometry {
      /** */
      constructor(width = 2, height = 2, z = -1) {
        const halfWidth = width * 0.5;
        const halfHeight = height * 0.5;
        const vertices = [-halfWidth, -halfHeight, z, halfWidth, -halfHeight, z, -halfWidth, halfHeight, z, halfWidth, halfHeight, z];
        const indicies = [0, 1, 2, 2, 1, 3];
        const uvs = [0, 0, 1, 0, 0, 1, 1, 1];
        super(vertices, indicies, uvs);
      }
    }

    var vs$1 = "#define GLSLIFY 1\nattribute vec3 position;attribute vec2 uv;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying highp vec2 vUV;void main(){vUV=uv;gl_Position=vec4(position,1.0);}"; // eslint-disable-line

    var fs = "precision mediump float;\n#define GLSLIFY 1\nuniform sampler2D uTexture;uniform float uYaw;uniform float uPitch;uniform float uZoom;varying highp vec2 vUV;const float PI=3.1415926536;const float PI_2=PI*0.5;vec2 toStereographicUV(in vec2 uv,in vec2 center){float R=1.*uZoom;vec2 texLatLon=(uv*2.-1.)*vec2(PI,PI_2);vec2 central=(center*2.-1.)*vec2(PI,PI_2)+vec2(PI,0);float x=texLatLon.x;float y=texLatLon.y;float rou=sqrt(x*x+y*y);float c=2.0*atan(rou,R*0.5);float sin_c=sin(c);float cos_c=cos(c);float sin_cy=sin(central.y);float cos_cy=cos(central.y);float lat=asin(cos_c*sin_cy+(y*sin_c*cos_cy)/rou);float lon=central.x+atan(x*sin_c,rou*cos_cy*cos_c-y*sin_cy*sin_c);float u=(lon/PI+1.0)*0.5;float v=(lat/PI_2+1.0)*0.5;return vec2(u,v);}void main(){vec2 central=vec2(uYaw,uPitch);vec2 uv=toStereographicUV(vUV,central);gl_FragColor=texture2D(uTexture,uv);}"; // eslint-disable-line

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Projection based on so-called "Little planet" or "Tiny planet" effect.
     * @ko "Little planet" 혹은 "Tiny planet"로 불리는 이펙트 기반의 프로젝션
     * @since 4.0.0
     * @category Projection
     */
    class LittlePlanetProjection extends Projection {
      /**
       * Create new instance
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor(options) {
        super(options);
      }
      createMesh(ctx, texture) {
        texture.wrapS = WebGLRenderingContext.REPEAT;
        texture.wrapT = WebGLRenderingContext.REPEAT;
        const uniforms = {
          uTexture: new UniformTexture2D(ctx, texture),
          uYaw: new UniformFloat(0),
          uPitch: new UniformFloat(0.5),
          uZoom: new UniformFloat(1)
        };
        const geometry = new PlaneGeometry();
        const program = new ShaderProgram(ctx, vs$1, fs, uniforms);
        const vao = ctx.createVAO(geometry, program);
        const mesh = new TriangleMesh(vao, program);
        mesh.on(OBJECT_3D_EVENTS.UPDATE, ({
          camera
        }) => {
          const uniforms = mesh.program.uniforms;
          uniforms.uYaw.val = camera.yaw / 360;
          // Range from 0 ~ 1
          uniforms.uPitch.val = camera.pitch / 180 + 0.5;
          uniforms.uZoom.val = camera.zoom;
          uniforms.uYaw.needsUpdate = true;
          uniforms.uPitch.needsUpdate = true;
          uniforms.uZoom.needsUpdate = true;
        });
        return mesh;
      }
      updateControl(control) {
        control.ignoreZoomScale = true;
      }
    }

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    class UniformVector4Array extends Uniform {
      constructor(val) {
        super();
        this.val = val;
      }
      update(gl, location) {
        gl.uniform4fv(location, this.val.reduce((arr, vector) => [...arr, ...vector], []));
        this.needsUpdate = false;
      }
    }

    var vs = "#define GLSLIFY 1\nattribute vec3 position;attribute vec2 uv;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;uniform vec4 uTexScaleOffset[2];uniform float uEye;varying highp vec2 vUV;void main(){vec4 scaleOffset=uTexScaleOffset[int(uEye)];vUV=uv.xy*scaleOffset.xy+scaleOffset.zw;gl_Position=uPMatrix*uMVMatrix*vec4(position,1.0);}"; // eslint-disable-line

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Projection based on stereo equirectangular images.
     * @ko Stereo equirectangular 이미지 기반의 프로젝션
     * @since 4.0.0
     * @category Projection
     */
    class StereoEquiProjection extends Projection {
      /**
       * Create new instance
       * @ko 새로운 인스턴스를 생성합니다.
       * @param options - Options {@ko 옵션들}
       */
      constructor(options) {
        super(options);
        this._mode = options.mode;
      }
      createMesh(ctx, texture) {
        let leftEye;
        let rightEye;
        switch (this._mode) {
          case StereoEquiProjection.MODE.LEFT_RIGHT:
            leftEye = [0.5, 1, 0, 0];
            rightEye = [0.5, 1, 0.5, 0];
            break;
          default:
            // Default, uses "top_bottom"
            leftEye = [1, 0.5, 0, 0];
            rightEye = [1, 0.5, 0, 0.5];
        }
        const uniforms = {
          uTexture: new UniformTexture2D(ctx, texture),
          uEye: new UniformFloat(0),
          uTexScaleOffset: new UniformVector4Array([leftEye, rightEye])
        };
        const geometry = new SphereGeometry();
        const program = new ShaderProgram(ctx, vs, fs$2, uniforms);
        const vao = ctx.createVAO(geometry, program);
        const mesh = new TriangleMesh(vao, program);
        return mesh;
      }
    }
    /**
     * Available stereoscopic modes
     * @ko 사용가능한 스테레오스코픽 모드들
     * @since 4.0.0
     */
    StereoEquiProjection.MODE = {
      /**
       * @ko 이미지가 왼쪽/오른쪽으로 구성되어있을 경우
       * @since 4.0.0
       */
      LEFT_RIGHT: "left_right",
      /**
       * @ko 이미지가 위/아래로 구성되어있을 경우
       * @since 4.0.0
       */
      TOP_BOTTOM: "top_bottom"
    };

    /**
     * @hidden
     */
    const withMethods = (prototype, attr) => {
      [Component__default["default"].prototype, View360.prototype].forEach(proto => {
        Object.getOwnPropertyNames(proto).filter(name => name.charAt(0) !== "_" && name !== "constructor").forEach(name => {
          const descriptor = Object.getOwnPropertyDescriptor(proto, name);
          if (descriptor.value) {
            // Public Function
            Object.defineProperty(prototype, name, {
              value: function (...args) {
                return descriptor.value.call(this[attr], ...args);
              }
            });
          } else {
            const getterDescriptor = {};
            if (descriptor.get) {
              getterDescriptor.get = function () {
                var _a;
                return this[attr] && ((_a = descriptor.get) === null || _a === void 0 ? void 0 : _a.call(this[attr]));
              };
            }
            if (descriptor.set) {
              getterDescriptor.set = function (...args) {
                var _a;
                return (_a = descriptor.set) === null || _a === void 0 ? void 0 : _a.call(this[attr], ...args);
              };
            }
            Object.defineProperty(prototype, name, getterDescriptor);
          }
        });
      });
    };

    /**
     * @hidden
     */
    const getValidProps = propsObj => {
      return Object.keys(propsObj).reduce((props, propName) => {
        if (propsObj[propName] != null) {
          props[propName] = propsObj[propName];
        }
        return props;
      }, {});
    };

    const VIEW360_METHODS = ["destroy", "init", "load", "resize", "addPlugins", "removePlugins", "renderFrame",
    // @egjs/component methods
    "on", "hasOn", "once", "off", "trigger"];

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var modules = {
        __proto__: null,
        'default': View360,
        Autoplay: Autoplay,
        AutoResizer: AutoResizer,
        Camera: Camera,
        CameraAnimation: CameraAnimation,
        Motion: Motion,
        Object3D: Object3D,
        View360Error: View360Error,
        WebGLRenderer: WebGLRenderer,
        XRManager: XRManager,
        PanoControl: PanoControl,
        RotateControl: RotateControl,
        ZoomControl: ZoomControl,
        GyroControl: GyroControl,
        ControlBar: ControlBar,
        ControlBarItem: ControlBarItem,
        FullscreenButton: FullscreenButton,
        PieView: PieView,
        PlayButton: PlayButton,
        ProgressBar: ProgressBar,
        VideoTime: VideoTime,
        VolumeControl: VolumeControl,
        LoadingSpinner: LoadingSpinner,
        Projection: Projection,
        CubemapProjection: CubemapProjection,
        CubestripProjection: CubestripProjection,
        CylindricalProjection: CylindricalProjection,
        EquiangularProjection: EquiangularProjection,
        EquirectProjection: EquirectProjection,
        LittlePlanetProjection: LittlePlanetProjection,
        StereoEquiProjection: StereoEquiProjection,
        Hotspot: Hotspot,
        HotspotRenderer: HotspotRenderer,
        ERROR_CODES: ERROR_CODES,
        DEFAULT_CLASS: DEFAULT_CLASS,
        EVENTS: EVENTS,
        EASING: EASING,
        getValidProps: getValidProps,
        VIEW360_METHODS: VIEW360_METHODS,
        withMethods: withMethods
    };

    /*
     * Copyright (c) 2023-present NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    merge(View360, modules);

    return View360;

}));
//# sourceMappingURL=view360.js.map
