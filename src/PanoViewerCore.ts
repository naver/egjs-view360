/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "./core/Camera";
import Entity from "./core/Entity";
import TextureLoader from "./core/TextureLoader";
import FrameAnimator from "./core/FrameAnimator";
import View360Error from "./core/View360Error";
import Projection from "./projection/Projection";
import WebGLRenderer from "./renderer/WebGLRenderer";
import ERROR from "./const/error";
import { EVENTS } from "./const/external";
import { findCanvas } from "./utils";
import Emittable from "./type/Emittable";
import * as EVENT_TYPES from "./type/event";
import Texture from "./texture/Texture";
import EquirectProjection from "./projection/EquirectProjection";

/**
 * @interface
 * @see [Events](/docs/events/ready) page for detailed information
 */
export interface PanoViewerEvents {
  [EVENTS.READY]: EVENT_TYPES.ReadyEvent<PanoViewerCore>;
  [EVENTS.RESIZE]: EVENT_TYPES.ResizeEvent<PanoViewerCore>;
  [EVENTS.BEFORE_RENDER]: EVENT_TYPES.BeforeRenderEvent<PanoViewerCore>;
  [EVENTS.RENDER]: EVENT_TYPES.RenderEvent<PanoViewerCore>;
}

/**
 * @interface
 * @see [Options](/docs/options/source/src) page for detailed information
 */
export interface PanoViewerOptions {
  src: string | string[];
  isVideo: boolean;
  canvasSelector: string;
}

/**
 *
 */
class PanoViewerCore {
  private _rootEl: HTMLElement;
  private _emitter: Emittable<PanoViewerEvents>;
  private _renderer: WebGLRenderer;
  private _camera: Camera;
  private _animator: FrameAnimator;
  private _scene: Entity;
  private _initialized: boolean;

  private _src?: PanoViewerOptions["src"];
  private _isVideo: PanoViewerOptions["isVideo"];
  private _canvasSelector: PanoViewerOptions["canvasSelector"];

  public get root() { return this._rootEl; }
  public get isVideo() { return this._isVideo; }

  public get src() { return this._src; }
  public set src(val: PanoViewerOptions["src"] | undefined) {
    if (!val) return;

    if (this._initialized) {
      this.load(val, this._isVideo);
    } else {
      this._src = val;
    }
  }

  /**
   *
   */
  public constructor(root: HTMLElement, eventEmitter: Emittable<PanoViewerEvents>, {
    src,
    isVideo = false,
    canvasSelector = "canvas"
  }: Partial<PanoViewerOptions> = {}) {
    this._rootEl = root;
    this._emitter = eventEmitter;
    this._initialized = false;

    // Options
    this._src = src;
    this._isVideo = isVideo;
    this._canvasSelector = canvasSelector;

    // Core components
    const canvas = findCanvas(root, canvasSelector);
    this._renderer = new WebGLRenderer(eventEmitter, canvas);
    this._camera = new Camera();
    this._scene = new Entity();
    this._animator = new FrameAnimator();

    this.init();
  }

  public destroy() {
    this._renderer.destroy();
    this._animator.stop();
  }

  /**
   * Initialize PanoViewer
   */
  public async init() {
    if (!this._src) {
      throw new View360Error(ERROR.MESSAGES.PROVIDE_SRC_FIRST, ERROR.CODES.PROVIDE_SRC_FIRST);
    }

    this._renderer.init();

    const texture = await this._loadTexture(this._src, this._isVideo);
    const projection = this._createProjection(texture);

    this._scene.add(projection);
    this._animator.start(this.renderFrame);
  }

  public async load(src: string | string[], isVideo: boolean) {
    const contentLoader = new TextureLoader();
    const texture = await contentLoader.load(src, isVideo);

    this._src = src;
  }

  /**
   */
  public resize() {
    this._renderer.resize();

    this.renderFrame(0);
  }

  public renderFrame = (delta: number) => {
    const scene = this._scene;
    const camera = this._camera;

    if (delta > 0) {
      // scene.update();
      // camera.update();
    }

    this._renderer.render(scene, camera);
  };

  private _createProjection(texture: Texture): Projection {
    const ctx = this._renderer.ctx;

    // TODO: add more projections
    return new EquirectProjection(texture, ctx);
  }

  private async _loadTexture(src: string | string[], isVideo: boolean): Promise<Texture> {
    const contentLoader = new TextureLoader();
    return await contentLoader.load(src, isVideo);
  }
}

export default PanoViewerCore;
