/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import Camera, { CameraOptions } from "./core/Camera";
import PanoControl, { PanoControlOptions } from "./control/PanoControl";
import TextureLoader from "./core/TextureLoader";
import FrameAnimator from "./core/FrameAnimator";
import AutoResizer from "./core/AutoResizer";
import Autoplay, { AutoplayOptions } from "./core/Autoplay";
import XRManager from "./core/XRManager";
import View360Error from "./core/View360Error";
import Projection from "./projection/Projection";
import HotspotRenderer, { HotspotOptions } from "./hotspot/HotspotRenderer";
import WebGLRenderer from "./core/WebGLRenderer";
import Texture from "./texture/Texture";
import View360Plugin from "./plugin/View360Plugin";
import ERROR from "./const/error";
import { CONTROL_EVENTS } from "./const/internal";
import { DEFAULT_CLASS, EVENTS } from "./const/external";
import { findCanvas, getElement } from "./utils";
import * as EVENT_TYPES from "./type/events";
import { EventParams } from "./type/utils";

/**
 * Events that {@link View360} can trigger
 * @ko {@link View360}가 트리거할 수 있는 이벤트들
 * @see [Detailed Example](/docs/events/ready)
 * @since 4.0.0
 */
export interface View360Events {
  [EVENTS.READY]: EVENT_TYPES.ReadyEvent;
  [EVENTS.LOAD_START]: EVENT_TYPES.LoadStartEvent;
  [EVENTS.LOAD]: EVENT_TYPES.LoadEvent;
  [EVENTS.PROJECTION_CHANGE]: EVENT_TYPES.ProjectionChangeEvent;
  [EVENTS.RESIZE]: EVENT_TYPES.ResizeEvent;
  [EVENTS.BEFORE_RENDER]: EVENT_TYPES.BeforeRenderEvent;
  [EVENTS.RENDER]: EVENT_TYPES.RenderEvent;
  [EVENTS.INPUT_START]: EVENT_TYPES.InputStartEvent;
  [EVENTS.INPUT_END]: EVENT_TYPES.InputEndEvent;
  [EVENTS.VIEW_CHANGE]: EVENT_TYPES.ViewChangeEvent;
  [EVENTS.STATIC_CLICK]: EVENT_TYPES.StaticClickEvent;
  [EVENTS.VR_START]: EVENT_TYPES.VRStartEvent;
  [EVENTS.VR_END]: EVENT_TYPES.VREndEvent;
}

/**
 * Options for {@link View360}
 * @ko {@link View360}용 옵션들
 * @see [Detailed Example](/docs/options)
 * @since 4.0.0
 */
export interface View360Options extends CameraOptions, PanoControlOptions {
  projection: Projection | null;
  hotspot: Partial<HotspotOptions>;
  autoplay: boolean | Partial<AutoplayOptions>;
  autoInit: boolean;
  autoResize: boolean;
  canvasSelector: string;
  useResizeObserver: boolean;
  tabIndex: number | null;
  on: Partial<{ [key in keyof View360Events]: (evt: View360Events[key]) => any }>;
  plugins: View360Plugin[];
  maxDeltaTime: number;
  debug: boolean;
}

/**
 * Panorama 360 image viewer
 * @ko 파노라마 360 이미지 뷰어
 * @since 4.0.0
 * @see View360Options
 * @see View360Events
 */
class View360 extends Component<View360Events> {
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
  public static readonly VERSION = "#__VERSION__#";

  private _rootEl: HTMLElement;
  private _renderer: WebGLRenderer;
  private _camera: Camera;
  private _control: PanoControl;
  private _animator: FrameAnimator;
  private _autoplay: Autoplay;
  private _hotspot: HotspotRenderer;
  private _projection: Projection | null;
  private _autoResizer: AutoResizer;
  private _vr: XRManager;
  private _plugins: View360Plugin[];
  private _initialized: boolean;

  private _autoInit: View360Options["autoInit"];
  private _autoResize: View360Options["autoResize"];
  private _canvasSelector: View360Options["canvasSelector"];
  private _useResizeObserver: View360Options["useResizeObserver"];
  private _tabIndex: View360Options["tabIndex"];
  private _debug: View360Options["debug"];

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
   * console.log(viewer.root); // Element with id "viewer"
   * ```
   */
  public get root() { return this._rootEl; }
  /**
   * Projection renderer.
   * @ko 프로젝션 렌더러.
   * @since 4.0.0
   * @readonly
   */
  public get renderer() { return this._renderer; }
  /**
   * Projection camera.
   * @ko 프로젝션 카메라.
   * @since 4.0.0
   * @readonly
   */
  public get camera() { return this._camera; }
  /**
   * Rotate/Zoom Controller.
   * @ko 회전/줌 컨트롤러.
   * @since 4.0.0
   * @readonly
   */
  public get control() { return this._control; }
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
  public get vr() { return this._vr; }
  /**
   * Hotspot renderer.
   * You can also change options of {@link View360Options#hotspot} with this.
   * @ko 핫스팟 렌더러 인스턴스.
   * {@link View360Options#hotspot} 옵션 변경도 가능합니다.
   * @since 4.0.0
   * @readonly
   */
  public get hotspot() { return this._hotspot; }
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
  public get plugins() { return this._plugins; }
  /**
   * A instance of {@link Projection} that currently enabled. `null` if not initialized yet.
   * You should call {@link View360#load} to change panorama src or projection type.
   * @ko 현재 사용중인 {@link Projection}의 인스턴스. 프로젝션을 활성화하지 않았을 경우 `null`입니다.
   * 파노라마 이미지 소스나 프로젝션 타입을 변경하려면 {@link View360#load}를 호출하면 됩니다.
   * @since 4.0.0
   * @readonly
   * @example
   * ```ts
   * const viewer = new View360
   * ```
   */
  public get projection() { return this._projection; }
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
  public get initialized() { return this._initialized; }
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
  public get autoplay() { return this._autoplay; }
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
  public get autoInit() { return this._autoInit; }
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
  public get autoResize() { return this._autoResize; }
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
  public get canvasSelector() { return this._canvasSelector; }
  /**
   * When `true`, it will use {@link ResizeObserver} API to detect canvas size change when {@link View360Options#autoResize} is enabled.
   * @ko `true`일 때 {@link View360Options#autoResize}가 활성화되었으면, 사용 가능한 환경에서 {@link ResizeObserver} API를 사용해서 캔버스 크기 변화를 추적합니다.
   * @default true
   * @since 4.0.0
   */
  public get useResizeObserver() { return this._useResizeObserver; }
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
  public get tabIndex() { return this._tabIndex; }
  public set tabIndex(val: View360Options["tabIndex"]) {
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
  public get maxDeltaTime() { return this._animator.maxDeltaTime; }
  public set maxDeltaTime(val: View360Options["maxDeltaTime"]) { this._animator.maxDeltaTime = val; }
  /**
   * Enable WebGL debugging. Setting this to `true` can decrease performance.
   * This is used internally on developing View360.
   * @ko WebGL 디버깅을 활성화합니다. 이 값을 `true`로 할 경우 성능이 하락할 수 있습니다.
   * 이 옵션은 View360을 개발하기 위해 내부적으로 사용됩니다.
   * @default false
   */
  public get debug() { return this._debug; }
  public set debug(val: View360Options["debug"]) { this._debug = val; }

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
  public get initialYaw() { return this._camera.initialYaw; }
  public set initialYaw(val: View360Options["initialYaw"]) { this._camera.initialYaw = val; }
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
  public get initialPitch() { return this._camera.initialPitch; }
  public set initialPitch(val: View360Options["initialPitch"]) { this._camera.initialPitch = val; }
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
  public get initialZoom() { return this._camera.initialZoom; }
  public set initialZoom(val: View360Options["initialZoom"]) { this._camera.initialZoom = val; }
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
  public get yawRange() { return this._camera.yawRange; }
  public set yawRange(val: View360Options["yawRange"]) {
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
  public get pitchRange() { return this._camera.pitchRange; }
  public set pitchRange(val: View360Options["pitchRange"]) {
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
  public get zoomRange() { return this._camera.zoomRange; }
  public set zoomRange(val: View360Options["zoomRange"]) {
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
  public get fov() { return this._camera.fov; }
  public set fov(val: View360Options["fov"]) {
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
  public get rotate() { return this._control.rotate; }
  /**
   * A control for camera zoom.
   * You can also change options of {@link View360Options#zoom} with this.
   * @ko 카메라 줌을 담당하는 컨트롤.
   * {@link View360Options#zoom} 옵션 변경도 가능합니다.
   * @since 4.0.0
   * @readonly
   */
  public get zoom() { return this._control.zoom; }
  /**
   * A control for camera rotation with gyroscope input.
   * You can also change options of {@link View360Options#gyro} with this.
   * @ko 자이로스코프를 통한 카메라 회전을 담당하는 컨트롤.
   * {@link View360Options#gyro} 옵션 변경도 가능합니다.
   * @since 4.0.0
   * @readonly
   */
  public get gyro() { return this._control.gyro; }
  /**
   * Apply CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor cursor} by current state of input when using mouse.
   * If `true`, this will add CSS style to canvas element. It'll apply `cursor: "grab"` by default and `cursor: "grabbing"` when holding the mouse button.
   * @ko 마우스 사용시 CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor cursor}값을 자동으로 변경할지 여부.
   * `true`일 경우 기본 상태에서 `cursor: "grab"`을, 입력 도중에 `cursor: "grabbing"`을 캔버스에 적용합니다.
   * @default true
   * @since 4.0.0
   */
  public get useGrabCursor() { return this._control.useGrabCursor; }
  public set useGrabCursor(val: View360Options["useGrabCursor"]) { this._control.useGrabCursor = val; }
  /**
   * Disable context menu which pops up on mouse right click.
   * @ko 마우스 우클릭시 표시되는 컨텍스트 메뉴를 비활성화합니다.
   * @default false
   * @since 4.0.0
   */
  public get disableContextMenu() { return this._control.disableContextMenu; }
  public set disableContextMenu(val: View360Options["disableContextMenu"]) { this._control.disableContextMenu = val; }
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
  public get scrollable() { return this._control.scrollable; }
  public set scrollable(val: View360Options["scrollable"]) { this._control.scrollable = val; }
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
  public get wheelScrollable() { return this._control.wheelScrollable; }
  public set wheelScrollable(val: View360Options["wheelScrollable"]) { this._control.wheelScrollable = val; }

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
  public constructor(root: string | HTMLElement, {
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
  }: Partial<View360Options> = {}) {
    super();

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
  public destroy() {
    this._camera.destroy();
    this._animator.stop();
    this._renderer.destroy();
    this._control.destroy();
    this._autoResizer.disable();

    if (this._projection) {
      this._projection.releaseAllResources(this._renderer.ctx);
      this._projection = null;
    }

    this._plugins.forEach(plugin => plugin.destroy(this));

    this._initialized = false;
  }

  /**
   * Initialize inner components and load projection src.
   * @ko 내부 컴포넌트들을 초기화하고 프로젝션 소스를 로드합니다.
   * @since 4.0.0
   */
  public async init() {
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

    const texture = await this._loadTexture(projection);
    this._applyProjection(projection, texture, null);
    hotspot.refresh();
    animator.start(this._renderFrameOnDemand);
    await control.enable();

    if (this._tabIndex != null && !canvas.hasAttribute("tabIndex")) {
      canvas.tabIndex = this._tabIndex;
    }

    this._initialized = true;
    this.renderFrame(0);

    this._emit(EVENTS.READY);
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
  public async load(projection: Projection): Promise<boolean> {
    if (!projection) return false;

    if (this._initialized) {
      const texture = await this._loadTexture(projection);
      this._applyProjection(projection, texture, this._projection);
      this.renderFrame(0);
    } else {
      // Should update internal options before init
      this._projection = projection;
      this.init();
    }

    return true;
  }

  /**
   * Refresh component's size by current
   * @ko View360이 내부적으로 캐시하고 있는 엘리먼트 크기를 현재 크기로 갱신합니다.
   * @since 4.0.0
   */
  public resize() {
    this._resizeComponents();

    // To prevent flickering, render immediately after resizing components
    this.renderFrame(0);

    const { width, height } = this._renderer;

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
  public addPlugins(...plugins: View360Plugin[]) {
    if (this._initialized) {
      plugins.forEach(plugin => { plugin.init(this); });
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
  public removePlugins(...plugins: View360Plugin[]) {
    plugins.forEach(plugin => {
      const pluginIdx = this._plugins.indexOf(plugin);

      if (pluginIdx < 0) return;

      plugin.destroy(this);
      this._plugins.splice(pluginIdx, 1);
    });
  }

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
  public renderFrame = (delta: number) => {
    const camera = this._camera;
    const renderer = this._renderer;
    const control = this._control;
    const hotspot = this._hotspot;
    const autoPlayer = this._autoplay;
    const projection = this._projection;

    if (!projection) return;

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

    renderer.render(projection, camera);
    hotspot.render(camera);

    if (camera.changed) {
      this._emit(EVENTS.VIEW_CHANGE, {
        yaw: camera.yaw,
        pitch: camera.pitch,
        zoom: camera.zoom,
        quaternion: [
          camera.quaternion[0],
          camera.quaternion[1],
          camera.quaternion[2],
          camera.quaternion[3]
        ]
      });
    }
    camera.onFrameRender();

    this._emit(EVENTS.RENDER);
  };

  private _emit<K extends keyof View360Events>(eventName: K, ...params: EventParams<View360Events, K>) {
    const evtParams = params ? params[0] : {};

    this.trigger(eventName as any, {
      type: eventName,
      target: this,
      ...evtParams
    });
  }

  private _renderFrameOnDemand = (delta: number) => {
    const camera = this._camera;
    const control = this._control;
    const autoplay = this._autoplay;
    const texture = this._projection?.getTexture();

    if (!this._initialized || !texture) return;
    if (
      !camera.animation
      && !control.animating
      && !autoplay.playing
      && !texture.isVideo()
    ) return;

    this.renderFrame(delta);
  };

  private _renderVRFrame = (_delta: number, frame: XRFrame) => {
    const vr = this._vr;
    const projection = this._projection;
    const renderer = this._renderer;

    if (!projection) return;

    this._emit(EVENTS.BEFORE_RENDER);

    renderer.renderVR(projection, vr, frame);

    this._emit(EVENTS.RENDER);
  }

  private _applyProjection(projection: Projection, texture: Texture, prevProjection: Projection | null) {
    const camera = this._camera;
    const control = this._control;
    const renderer = this._renderer;

    // Remove previous projection
    if (prevProjection) {
      prevProjection.releaseAllResources(this._renderer.ctx);
    }

    projection.applyTexture(renderer.ctx, texture);
    projection.updateCamera(camera);
    projection.updateControl(control);

    this._projection = projection;
    this._emit(EVENTS.PROJECTION_CHANGE, {
      projection
    });
  }

  private async _loadTexture(projection: Projection): Promise<Texture> {
    const contentLoader = new TextureLoader();
    const { src, video } = projection;

    this._emit(EVENTS.LOAD_START, {
      src,
      video
    });

    const texture = await contentLoader.load(src, video);

    this._emit(EVENTS.LOAD, {
      src,
      video
    });

    return texture;
  }

  private _resizeComponents() {
    const renderer = this._renderer;
    const camera = this._camera;
    const control = this._control;

    renderer.resize();
    camera.resize(renderer.width, renderer.height);
    control.resize(renderer.width, renderer.height);
  }

  private _addEventHandlers(events: View360Options["on"]) {
    // Bind option "on"
    Object.keys(events).forEach((evtName: keyof typeof EVENT_TYPES) => {
      this.on(evtName, events[evtName]);
    });
  }

  private _bindComponentEvents() {
    // Bind internal component events
    const root = this._rootEl;
    const control = this._control;
    const animator = this._animator;
    const renderer = this._renderer;
    const vr = this._vr;

    const controlEventsToPropagate = [
      CONTROL_EVENTS.STATIC_CLICK,
      CONTROL_EVENTS.INPUT_START,
      CONTROL_EVENTS.INPUT_END
    ];

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

export default View360;
