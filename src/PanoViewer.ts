/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera, { CameraOptions } from "./core/Camera";
import PanoControl, { PanoControlOptions } from "./control/PanoControl";
import Entity from "./core/Entity";
import TextureLoader from "./core/TextureLoader";
import FrameAnimator from "./core/FrameAnimator";
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
  [EVENTS.RESIZE]: EVENT_TYPES.ResizeEvent<PanoViewer>;
  [EVENTS.BEFORE_RENDER]: EVENT_TYPES.BeforeRenderEvent<PanoViewer>;
  [EVENTS.RENDER]: EVENT_TYPES.RenderEvent<PanoViewer>;
}

/**
 * @interface
 * @see [Options](/docs/options/source/src) page for detailed information
 */
export interface PanoViewerOptions extends CameraOptions, PanoControlOptions {
  src: string | string[] | null;
  isVideo: boolean;
  projectionType: ValueOf<typeof PROJECTION_TYPE>;
  cubemapOrder: string;
  cubemapFlipX: boolean;
  autoInit: boolean;
  canvasSelector: string;
  debug: boolean;
}

/**
 *
 */
class PanoViewer {
  private _rootEl: HTMLElement;
  private _renderer: WebGLRenderer;
  private _camera: Camera;
  private _control: PanoControl;
  private _animator: FrameAnimator;
  private _scene: Entity;
  private _projection: Projection | null;
  private _initialized: boolean;

  private _src: PanoViewerOptions["src"];
  private _isVideo: PanoViewerOptions["isVideo"];
  private _projectionType: PanoViewerOptions["projectionType"];
  private _cubemapOrder: PanoViewerOptions["cubemapOrder"];
  private _cubemapFlipX: PanoViewerOptions["cubemapFlipX"];
  private _autoInit: PanoViewerOptions["autoInit"];
  private _canvasSelector: PanoViewerOptions["canvasSelector"];
  private _debug: PanoViewerOptions["debug"];

  public get root() { return this._rootEl; }

  /**
   * Source URL to Panorama image/video.
   * See [Example](/docs/options/PanoViewer/source/src)
   */
  public get src() { return this._src; }
  public set src(val: PanoViewerOptions["src"]) {
    if (val && this._initialized) {
      this.load(val, this._isVideo);
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
  public get autoInit() { return this._autoInit; }
  public get canvasSelector() { return this._canvasSelector; }
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
  public set wheelScrollable(val: PanoViewerOptions["scrollable"]) { this._control.zoom.scrollable = val; }

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
    canvasSelector = "canvas",
    debug = false
  }: Partial<PanoViewerOptions> = {}) {
    this._rootEl = root;
    this._initialized = false;

    // Options
    this._src = src;
    this._projectionType = projectionType;
    this._isVideo = isVideo;
    this._cubemapOrder = cubemapOrder;
    this._cubemapFlipX = cubemapFlipX;
    this._autoInit = autoInit;
    this._canvasSelector = canvasSelector;
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

    this.init();
  }

  public destroy() {
    this._scene.destroy();
    this._animator.stop();
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

    const texture = await this._loadTexture(this._src, this._isVideo);
    const projection = this._createProjection(texture, this._projectionType);

    scene.add(projection);
    animator.start(this.renderFrame);
    control.enable();

    this._projection = projection;
    this._initialized = true;
  }

  public async load(src: string | string[], isVideo: boolean) {
    if (this._initialized) {
      const scene = this._scene;
      const texture = await this._loadTexture(src, isVideo);
      const projection = this._createProjection(texture, this._projectionType);

      // Remove previous projection
      const prevProjection = this._projection;
      if (prevProjection) {
        scene.remove(prevProjection);
        prevProjection.destroy();
      }

      scene.add(projection);

      this._src = src;
      this._isVideo = isVideo;
      this._projection = projection;
    } else {
      this._src = src;
      this._isVideo = isVideo;

      this.init();
    }
  }

  /**
   */
  public resize() {
    this._resizeComponents();

    // To prevent flickering, render immediately after resizing components
    this.renderFrame(0);
  }

  public renderFrame = (delta: number) => {
    const scene = this._scene;
    const camera = this._camera;
    const renderer = this._renderer;
    const control = this._control;

    control.update(camera, delta);

    renderer.render(scene, camera);
  };

  private _createProjection(texture: Texture, projectionType: PanoViewerOptions["projectionType"]): Projection {
    const ctx = this._renderer.ctx;
    const cubemapOrder = this._cubemapOrder;
    const cubemapFlipX = this._cubemapFlipX;

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

    return await contentLoader.load(src, isVideo);
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
