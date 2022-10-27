/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import AutoResizer from "./core/AutoResizer";
import Canvas2DRenderer from "./renderer/Canvas2DRenderer";
import FrameAnimator from "./core/FrameAnimator";
import TextureLoader from "./core/TextureLoader";
import View360Error from "./core/View360Error";
import Sprite from "./sprite/Sprite";
import PackedSprite from "./sprite/PackedSprite";
import SeparateSprite from "./sprite/SeparateSprite";
import SpinControl, { SpinControlOptions } from "./control/SpinControl";
import ERROR from "./const/error";
import { EVENTS } from "./const/external";
import { circulate, findCanvas } from "./utils";
import * as EVENT_TYPES from "./type/event";

/**
 * @interface
 */
export interface SpinViewerEvents {
  [EVENTS.READY]: EVENT_TYPES.ReadyEvent<SpinViewer>;
  [EVENTS.LOAD]: EVENT_TYPES.LoadEvent<SpinViewer>;
  [EVENTS.RESIZE]: EVENT_TYPES.ResizeEvent<SpinViewer>;
  [EVENTS.BEFORE_RENDER]: EVENT_TYPES.BeforeRenderEvent<SpinViewer>;
  [EVENTS.RENDER]: EVENT_TYPES.RenderEvent<SpinViewer>;
}

/**
 * @interface
 * @see [Options](/docs/options/source/src) page for detailed information
 */
export interface SpinViewerOptions extends SpinControlOptions {
  src: string | string[] | null;
  rows: number;
  columns: number;
  autoInit: boolean;
  autoResize: boolean;
  canvasSelector: string;
  useResizeObserver: boolean;
  debug: boolean;
}

/**
 *
 */
class SpinViewer extends Component<SpinViewerEvents> {
  private _rootEl: HTMLElement;
  private _renderer: Canvas2DRenderer;
  private _control: SpinControl;
  private _animator: FrameAnimator;
  private _autoResizer: AutoResizer;
  private _sprite: Sprite | null;
  private _imageIndex: number;
  private _initialized: boolean;

  private _src: SpinViewerOptions["src"];
  private _rows: SpinViewerOptions["rows"];
  private _columns: SpinViewerOptions["columns"];
  private _autoInit: SpinViewerOptions["autoInit"];
  private _autoResize: SpinViewerOptions["autoResize"];
  private _canvasSelector: SpinViewerOptions["canvasSelector"];
  private _useResizeObserver: SpinViewerOptions["useResizeObserver"];

  public get root() { return this._rootEl; }

  public get src() { return this._src; }
  public set src(val: SpinViewerOptions["src"]) {
    if (val && this._initialized) {
      this.load(val);
    } else {
      this._src = val;
    }
  }

  public get rows() { return this._rows; }
  public get columns() { return this._columns; }

  public get autoInit() { return this._autoInit; }
  public get autoResize() { return this._autoResize; }
  public get canvasSelector() { return this._canvasSelector; }
  public get useResizeObserver() { return this._useResizeObserver; }

  // Control options
  public get useGrabCursor() { return this._control.useGrabCursor; }
  public set useGrabCursor(val: SpinViewerOptions["useGrabCursor"]) { this._control.useGrabCursor = val; }
  public get scrollable() { return this._control.rotate.scrollable; }
  public set scrollable(val: SpinViewerOptions["scrollable"]) { this._control.rotate.scrollable = val; }
  public get wheelScrollable() { return this._control.zoom.scrollable; }
  public set wheelScrollable(val: SpinViewerOptions["wheelScrollable"]) { this._control.zoom.scrollable = val; }

  public constructor(root: HTMLElement, {
    src = null,
    rows = 1,
    columns = 1,
    useGrabCursor = true,
    rotate = true,
    zoom = true,
    scrollable = true,
    wheelScrollable = false,
    autoInit = true,
    autoResize = true,
    canvasSelector = "canvas",
    useResizeObserver = true,
  }: Partial<SpinViewerOptions> = {}) {
    super();

    this._rootEl = root;
    this._imageIndex = 0;
    this._initialized = false;

    this._src = src;
    this._rows = rows;
    this._columns = columns;
    this._autoInit = autoInit;
    this._autoResize = autoResize;
    this._canvasSelector = canvasSelector;
    this._useResizeObserver = useResizeObserver;

    // Core components
    const canvas = findCanvas(root, canvasSelector);
    this._renderer = new Canvas2DRenderer(canvas);
    this._animator = new FrameAnimator();
    this._control = new SpinControl(canvas, {
      useGrabCursor,
      rotate,
      zoom,
      scrollable,
      wheelScrollable
    });
    this._autoResizer = new AutoResizer(useResizeObserver, () => this.resize());
    this._sprite = null;

    if (src && autoInit) {
      this.init();
    }
  }

  public destroy() {
    this._animator.stop();
    this._control.destroy();
    this._autoResizer.disable();
  }

  public async init() {
    if (!this._src) {
      throw new View360Error(ERROR.MESSAGES.PROVIDE_SRC_FIRST, ERROR.CODES.PROVIDE_SRC_FIRST);
    }

    const renderer = this._renderer;
    const control = this._control;
    const animator = this._animator;

    this._resizeComponents();
    this._sprite = await this._loadSprite(this._src);

    renderer.render(this._sprite, this._imageIndex);
    animator.start(this.renderFrame);
    control.enable();

    this._initialized = true;

    this.trigger(EVENTS.READY, {
      type: EVENTS.READY,
      target: this
    });
  }

  public async load(src: SpinViewerOptions["src"]) {
    if (!src) return;

    // TODO:
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
    const renderer = this._renderer;
    const control = this._control;
    const sprite = this._sprite;

    if (!sprite) return;

    this.trigger(EVENTS.BEFORE_RENDER, {
      type: EVENTS.BEFORE_RENDER,
      target: this
    });

    control.update(delta);

    const newIdx = Math.floor(sprite.length * (-control.rotate.yaw / 360));
    this._imageIndex = circulate(newIdx, 0, sprite.length);
    renderer.render(sprite, this._imageIndex);

    this.trigger(EVENTS.RENDER, {
      type: EVENTS.RENDER,
      target: this
    });
  };

  private async _loadSprite(src: string | string[]): Promise<Sprite> {
    const textureLoader = new TextureLoader();
    const sprite = Array.isArray(src)
      ? new SeparateSprite(await textureLoader.loadMultipleImages(src))
      : new PackedSprite({
        texture: await textureLoader.loadImage(src),
        columns: this._columns,
        rows: this.rows
      });

    this.trigger(EVENTS.LOAD, {
      type: EVENTS.LOAD,
      target: this
    });

    return sprite;
  }

  private _resizeComponents() {
    const renderer = this._renderer;
    const control = this._control;

    renderer.resize();
    control.resize(renderer.width, renderer.height);
  }
}

export default SpinViewer;
