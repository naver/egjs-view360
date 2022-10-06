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
import CubeProjection from "./projection/CubeProjection";
import WebGLRenderer from "./renderer/WebGLRenderer";
import Texture from "./texture/Texture";
import ERROR from "./const/error";
import { EVENTS, PROJECTION_TYPE } from "./const/external";
import { findCanvas } from "./utils";
import * as EVENT_TYPES from "./type/event";
import { ValueOf } from "./type/utils";
import CubeStripProjection from "./projection/CubeStripProjection";
import PanoramaProjection from "./projection/PanoramaProjection";
import StereoEquiProjection from "./projection/StereoEquiProjection";

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
  src: string | string[];
  projectionType: ValueOf<typeof PROJECTION_TYPE>;
  isVideo: boolean;
  canvasSelector: string;
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
  private _initialized: boolean;

  private _src?: PanoViewerOptions["src"];
  private _projectionType: PanoViewerOptions["projectionType"];
  private _isVideo: PanoViewerOptions["isVideo"];
  private _canvasSelector: PanoViewerOptions["canvasSelector"];

  public get root() { return this._rootEl; }

  public get src() { return this._src; }
  public set src(val: PanoViewerOptions["src"] | undefined) {
    if (!val) return;

    if (this._initialized) {
      this.load(val, this._isVideo);
    } else {
      this._src = val;
    }
  }
  public get projectionType() { return this._projectionType; }
  public get isVideo() { return this._isVideo; }
  public get canvasSelector() { return this._canvasSelector; }

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
    src,
    projectionType = PROJECTION_TYPE.EQUIRECTANGULAR,
    isVideo = false,
    yaw = 0,
    pitch = 0,
    initialZoom = 1,
    fov = 90,
    useGrabCursor = true,
    rotate = true,
    zoom = true,
    scrollable = true,
    wheelScrollable = false,
    canvasSelector = "canvas"
  }: Partial<PanoViewerOptions> = {}) {
    this._rootEl = root;
    this._initialized = false;

    // Options
    this._src = src;
    this._projectionType = projectionType;
    this._isVideo = isVideo;
    this._canvasSelector = canvasSelector;

    // Core components
    const canvas = findCanvas(root, canvasSelector);
    this._renderer = new WebGLRenderer(canvas);
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

    this._initialized = true;
  }

  public async load(src: string | string[], isVideo: boolean) {
    const ctx = this._renderer.ctx;
    const contentLoader = new TextureLoader(ctx);
    // TODO:
    const texture = await contentLoader.load(src, isVideo);

    this._src = src;
  }

  /**
   */
  public resize() {
    this._resizeComponents();
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

    if (projectionType === PROJECTION_TYPE.EQUIRECTANGULAR) {
      return new EquirectProjection(ctx, texture);
    } else if (projectionType === PROJECTION_TYPE.CUBEMAP) {
      return new CubeProjection(ctx, texture);
    } else if (projectionType === PROJECTION_TYPE.CUBESTRIP) {
      return new CubeStripProjection(ctx, texture);
    } else if (projectionType === PROJECTION_TYPE.PANORAMA) {
      return new PanoramaProjection(ctx, texture);
    } else if (projectionType === PROJECTION_TYPE.STEREOSCOPIC_EQUI) {
      return new StereoEquiProjection(ctx, texture);
    }

    throw new View360Error(ERROR.MESSAGES.WRONG_OPTION(projectionType, "projectionType"), ERROR.CODES.WRONG_OPTION);
  }

  private async _loadTexture(src: string | string[], isVideo: boolean): Promise<Texture> {
    const ctx = this._renderer.ctx;
    const contentLoader = new TextureLoader(ctx);

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
