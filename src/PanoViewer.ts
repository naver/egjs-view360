/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import Camera, { CameraOptions } from "./core/Camera";
import PanoControl, { PanoControlOptions } from "./control/PanoControl";
import Entity from "./core/Entity";
import TextureLoader from "./core/TextureLoader";
import FrameAnimator from "./core/FrameAnimator";
import AutoResizer from "./core/AutoResizer";
import View360Error from "./core/View360Error";
import Projection from "./projection/Projection";
import EquirectProjection from "./projection/EquirectProjection";
import CubeMapProjection from "./projection/CubeMapProjection";
import CubeStripProjection from "./projection/CubeStripProjection";
import EACProjection from "./projection/EACProjection";
import PanoramaProjection from "./projection/PanoramaProjection";
import StereoEquiProjection from "./projection/StereoEquiProjection";
import WebGLRenderer from "./renderer/WebGLRenderer";
import Texture from "./texture/Texture";
import Texture2D from "./texture/Texture2D";
import TextureCube from "./texture/TextureCube";
import ERROR from "./const/error";
import { EVENTS, PROJECTION_TYPE } from "./const/external";
import { findCanvas } from "./utils";
import * as EVENT_TYPES from "./type/event";
import { ValueOf } from "./type/utils";

/**
 * @interface
 * @see [Events](/docs/events/ready) page for detailed information
 */
export interface PanoViewerEvents {
  [EVENTS.READY]: EVENT_TYPES.ReadyEvent<PanoViewer>;
  [EVENTS.LOAD]: EVENT_TYPES.LoadEvent<PanoViewer>;
  [EVENTS.RESIZE]: EVENT_TYPES.ResizeEvent<PanoViewer>;
  [EVENTS.BEFORE_RENDER]: EVENT_TYPES.BeforeRenderEvent<PanoViewer>;
  [EVENTS.RENDER]: EVENT_TYPES.RenderEvent<PanoViewer>;
}

/**
 * Options related to panorama source and its config
 */
export interface PanoSourceOptions {
  src: string | string[] | null;
  isVideo: boolean;
  projectionType: ValueOf<typeof PROJECTION_TYPE>;
  cubemapOrder: string;
  cubemapFlipX: boolean;
  is360Panorama: boolean;
}

/**
 * @interface
 * @see [Options](/docs/options/PanoViewer/source/src) page for detailed information
 */
export interface PanoViewerOptions extends PanoSourceOptions, CameraOptions, PanoControlOptions {
  autoInit: boolean;
  autoResize: boolean;
  canvasSelector: string;
  useResizeObserver: boolean;
  debug: boolean;
}

/**
 *
 */
class PanoViewer extends Component<PanoViewerEvents> {
  private _rootEl: HTMLElement;
  private _renderer: WebGLRenderer;
  private _camera: Camera;
  private _control: PanoControl;
  private _animator: FrameAnimator;
  private _scene: Entity;
  private _projection: Projection | null;
  private _autoResizer: AutoResizer;
  private _initialized: boolean;

  private _src: PanoViewerOptions["src"];
  private _isVideo: PanoViewerOptions["isVideo"];
  private _projectionType: PanoViewerOptions["projectionType"];
  private _cubemapOrder: PanoViewerOptions["cubemapOrder"];
  private _cubemapFlipX: PanoViewerOptions["cubemapFlipX"];
  private _is360Panorama: PanoViewerOptions["is360Panorama"];
  private _autoInit: PanoViewerOptions["autoInit"];
  private _autoResize: PanoViewerOptions["autoResize"];
  private _canvasSelector: PanoViewerOptions["canvasSelector"];
  private _useResizeObserver: PanoViewerOptions["useResizeObserver"];
  private _debug: PanoViewerOptions["debug"];

  public get root() { return this._rootEl; }

  /**
   * Source URL to Panorama image/video.
   * See [Example](/docs/options/PanoViewer/source/src)
   */
  public get src() { return this._src; }
  public set src(val: PanoViewerOptions["src"]) {
    if (val && this._initialized) {
      this.load({ src: val });
    } else {
      this._src = val;
    }
  }
  /**
   * Whether the content is in video format like mp4
   */
  public get isVideo() { return this._isVideo; }
  public set isVideo(val: PanoViewerOptions["isVideo"]) { this._isVideo = val; }
  public get projectionType() { return this._projectionType; }
  public get cubemapOrder() { return this._cubemapOrder; }
  public get cubemapFlipX() { return this._cubemapFlipX; }
  public get is360Panorama() { return this._is360Panorama; }
  public get autoInit() { return this._autoInit; }
  public get autoResize() { return this._autoResize; }
  public get canvasSelector() { return this._canvasSelector; }
  public get useResizeObserver() { return this._useResizeObserver; }
  public get debug() { return this._debug; }
  public set debug(val: PanoViewerOptions["debug"]) { this._debug = val; }

  // Camera options
  public get yaw() { return this._camera.yaw; }
  public set yaw(val: PanoViewerOptions["yaw"]) { this._camera.yaw = val; }
  public get pitch() { return this._camera.yaw; }
  public set pitch(val: PanoViewerOptions["yaw"]) { this._camera.yaw = val; }
  public get fov() { return this._camera.baseFov; }
  public set fov(val: PanoViewerOptions["fov"]) { this._camera.baseFov = val; }

  // Control options
  public get useGrabCursor() { return this._control.useGrabCursor; }
  public set useGrabCursor(val: PanoViewerOptions["useGrabCursor"]) { this._control.useGrabCursor = val; }
  public get scrollable() { return this._control.rotate.scrollable; }
  public set scrollable(val: PanoViewerOptions["scrollable"]) { this._control.rotate.scrollable = val; }
  public get wheelScrollable() { return this._control.zoom.scrollable; }
  public set wheelScrollable(val: PanoViewerOptions["wheelScrollable"]) { this._control.zoom.scrollable = val; }

  /**
   *
   */
  public constructor(root: HTMLElement, {
    src = null,
    projectionType = PROJECTION_TYPE.EQUIRECTANGULAR,
    isVideo = false,
    cubemapOrder = "RLUDFB",
    cubemapFlipX = false,
    yaw = 0,
    pitch = 0,
    initialZoom = 1,
    fov = 90,
    useGrabCursor = true,
    rotate = true,
    zoom = true,
    scrollable = true,
    wheelScrollable = false,
    autoInit = true,
    autoResize = true,
    canvasSelector = "canvas",
    useResizeObserver = true,
    debug = false
  }: Partial<PanoViewerOptions> = {}) {
    super();

    this._rootEl = root;
    this._initialized = false;

    // Options
    this._src = src;
    this._projectionType = projectionType;
    this._isVideo = isVideo;
    this._cubemapOrder = cubemapOrder;
    this._cubemapFlipX = cubemapFlipX;
    this._autoInit = autoInit;
    this._autoResize = autoResize;
    this._canvasSelector = canvasSelector;
    this._useResizeObserver = useResizeObserver;
    this._debug = debug;

    // Core components
    const canvas = findCanvas(root, canvasSelector);
    this._renderer = new WebGLRenderer(canvas, debug);
    this._camera = new Camera({
      yaw,
      pitch,
      initialZoom,
      fov
    });
    this._scene = new Entity();
    this._animator = new FrameAnimator();
    this._control = new PanoControl(canvas, this._camera, {
      useGrabCursor,
      rotate,
      zoom,
      scrollable,
      wheelScrollable
    });
    this._projection = null;
    this._autoResizer = new AutoResizer(useResizeObserver, () => this.resize());

    if (src && autoInit) {
      this.init();
    }
  }

  public destroy() {
    this._scene.destroy();
    this._animator.stop();
    this._control.destroy();
    this._autoResizer.disable();
  }

  /**
   * Initialize PanoViewer
   */
  public async init() {
    if (!this._src) {
      throw new View360Error(ERROR.MESSAGES.PROVIDE_SRC_FIRST, ERROR.CODES.PROVIDE_SRC_FIRST);
    }

    const renderer = this._renderer;
    const camera = this._camera;
    const control = this._control;
    const scene = this._scene;
    const animator = this._animator;

    renderer.ctx.init();
    this._resizeComponents();
    camera.updateMatrix();

    if (this._autoResize) {
      this._autoResizer.enable(renderer.canvas);
    }

    const texture = await this._loadTexture(this._src, this._isVideo);
    const projection = this._createProjection(texture, {
      projectionType: this._projectionType,
      cubemapOrder: this._cubemapOrder,
      cubemapFlipX: this._cubemapFlipX,
      is360Panorama: this._is360Panorama
    });

    scene.add(projection);
    projection.updateControlMode(control, camera);
    animator.start(this.renderFrame);
    control.enable();

    this._projection = projection;
    this._initialized = true;

    this.trigger(EVENTS.READY, {
      type: EVENTS.READY,
      target: this
    });
  }

  public async load({
    src,
    isVideo = this._isVideo,
    projectionType = this._projectionType,
    cubemapOrder = this._cubemapOrder,
    cubemapFlipX = this._cubemapFlipX,
    is360Panorama = this._is360Panorama
  }: Partial<PanoSourceOptions>) {
    if (!src) return;

    const updateOptions = () => {
      this._src = src;
      this._isVideo = isVideo;
      this._projectionType = projectionType;
      this._cubemapOrder = cubemapOrder;
      this._cubemapFlipX = cubemapFlipX;
      this._is360Panorama = is360Panorama;
    };

    if (this._initialized) {
      const scene = this._scene;
      const control = this._control;
      const camera = this._camera;
      const texture = await this._loadTexture(src, isVideo);
      const projection = this._createProjection(texture, {
        projectionType,
        cubemapOrder,
        cubemapFlipX,
        is360Panorama: is360Panorama
      });

      // Remove previous projection
      const prevProjection = this._projection;
      if (prevProjection) {
        scene.remove(prevProjection);
        prevProjection.destroy();
      }

      scene.add(projection);
      projection.updateControlMode(control, camera);

      updateOptions();
      this._projection = projection;
    } else {
      // Should update internal options before init
      updateOptions();
      this.init();
    }
  }

  /**
   */
  public resize() {
    this._resizeComponents();

    // To prevent flickering, render immediately after resizing components
    this.renderFrame(0);

    const { width, height } = this._renderer;

    this.trigger(EVENTS.RESIZE, {
      type: EVENTS.RESIZE,
      target: this,
      width,
      height
    });
  }

  public renderFrame = (delta: number) => {
    const scene = this._scene;
    const camera = this._camera;
    const renderer = this._renderer;
    const control = this._control;

    this.trigger(EVENTS.BEFORE_RENDER, {
      type: EVENTS.BEFORE_RENDER,
      target: this
    });

    control.update(camera, delta);
    renderer.render(scene, camera);

    this.trigger(EVENTS.RENDER, {
      type: EVENTS.RENDER,
      target: this
    });
  };

  private _createProjection(texture: Texture, {
    projectionType,
    cubemapOrder,
    cubemapFlipX,
    is360Panorama
  }: Omit<PanoSourceOptions, "src" | "isVideo">): Projection {
    const ctx = this._renderer.ctx;

    // Projections will throw error when texture type is incorrect
    if (projectionType === PROJECTION_TYPE.EQUIRECTANGULAR) {
      return new EquirectProjection(ctx, {
        texture: texture as Texture2D
      });
    } else if (projectionType === PROJECTION_TYPE.CUBEMAP) {
      return new CubeMapProjection(ctx, {
        texture: texture as TextureCube,
        cubemapOrder,
        cubemapFlipX
      });
    } else if (projectionType === PROJECTION_TYPE.CUBESTRIP) {
      return new CubeStripProjection(ctx, {
        texture: texture as Texture2D,
        cubemapOrder,
        cubemapFlipX
      });
    } else if (projectionType === PROJECTION_TYPE.EAC) {
      return new EACProjection(ctx, {
        texture: texture as Texture2D
      });
    } else if (projectionType === PROJECTION_TYPE.PANORAMA) {
      return new PanoramaProjection(ctx, {
        texture: texture as Texture2D,
        is360Panorama
      });
    } else if (projectionType === PROJECTION_TYPE.STEREOSCOPIC_EQUI) {
      return new StereoEquiProjection(ctx, {
        texture: texture as Texture2D
      });
    }

    throw new View360Error(ERROR.MESSAGES.WRONG_OPTION(projectionType, "projectionType"), ERROR.CODES.WRONG_OPTION);
  }

  private async _loadTexture(src: string | string[], isVideo: boolean): Promise<Texture> {
    const contentLoader = new TextureLoader();
    const texture = await contentLoader.load(src, isVideo);

    this.trigger(EVENTS.LOAD, {
      type: EVENTS.LOAD,
      target: this
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
}

export default PanoViewer;
