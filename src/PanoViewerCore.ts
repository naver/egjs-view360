/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "./core/Camera";
import Scene from "./core/Scene";
import FrameAnimator from "./core/FrameAnimator";
import View360Error from "./core/View360Error";
import WebGLRenderer from "./renderer/WebGLRenderer";
import ERROR from "./const/error";
import { EVENTS } from "./const/external";
import { findCanvas } from "./utils";
import Emittable from "./type/Emittable";
import * as EVENT_TYPES from "./type/event";

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
  private _scene: Scene;
  private _initialized: boolean;

  private _src?: PanoViewerOptions["src"];
  private _isVideo: PanoViewerOptions["isVideo"];
  private _canvasSelector: PanoViewerOptions["canvasSelector"];

  public get root() { return this._rootEl; }
  public get src() { return this._src; }
  public get isVideo() { return this._isVideo; }

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
    this._scene = new Scene();
    this._animator = new FrameAnimator();
  }

  public destroy() {
    this._renderer.destroy();
  }

  /**
   * Initialize PanoViewer
   */
  public async init() {
    if (!this._src) {
      throw new View360Error(ERROR.MESSAGES.PROVIDE_SRC_FIRST, ERROR.CODES.PROVIDE_SRC_FIRST);
    }

    this._renderer.init();
    this._fillScene();

    this._animator.start(this._renderFrame);
  }

  /**
   */
  public resize() {
    this._renderer.resize();
  }

  private _renderFrame = () => {
    const scene = this._scene;
    const camera = this._camera;

    if (!scene) return;

    this._renderer.render(scene, camera);
  };

  private _fillScene() {
    const scene = this._scene;

    // TODO: 현재 옵션에 따라 Scene 구조 생성
  }
}

export default PanoViewerCore;
