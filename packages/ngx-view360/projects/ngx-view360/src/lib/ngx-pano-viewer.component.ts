/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  SimpleChanges,
  Renderer2,
  ViewChild
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import {
  PanoViewer as VanillaPanoViewer,
  updatePanoViewer,
  AnimationEndEvent,
  ErrorEvent,
  ReadyEvent,
  ViewChangeEvent,
  PanoViewerOptions,
  DEFAULT_CANVAS_CLASS,
  PANOVIEWER_OPTIONS,
  PANOVIEWER_EVENTS
} from "@egjs/view360";

import PanoViewerInterface from "./PanoViewerInterface";

@Component({
  selector: "ngx-pano-viewer, [NgxPanoViewer]",
  template: `
    <canvas #canvas [ngClass]="_canvasElClass"></canvas>
    <ng-content></ng-content>
  `,
  host: {
    style: "display: block;"
  }
})
export class NgxPanoViewerComponent extends PanoViewerInterface
  implements AfterViewInit, OnDestroy, OnChanges, PanoViewerOptions {
  @Input() public image: PanoViewerOptions["image"];
  @Input() public video: PanoViewerOptions["video"];
  @Input() public projectionType: PanoViewerOptions["projectionType"];
  @Input() public cubemapConfig: PanoViewerOptions["cubemapConfig"];
  @Input() public stereoFormat: PanoViewerOptions["stereoFormat"];
  @Input() public width: PanoViewerOptions["width"];
  @Input() public height: PanoViewerOptions["height"];
  @Input() public yaw: PanoViewerOptions["yaw"];
  @Input() public pitch: PanoViewerOptions["pitch"];
  @Input() public fov: PanoViewerOptions["fov"];
  @Input() public showPolePoint: PanoViewerOptions["showPolePoint"];
  @Input() public useZoom: PanoViewerOptions["useZoom"];
  @Input() public useKeyboard: PanoViewerOptions["useKeyboard"];
  @Input() public gyroMode: PanoViewerOptions["gyroMode"];
  @Input() public yawRange: PanoViewerOptions["yawRange"];
  @Input() public pitchRange: PanoViewerOptions["pitchRange"];
  @Input() public fovRange: PanoViewerOptions["fovRange"];
  @Input() public touchDirection: PanoViewerOptions["touchDirection"];
  @Input() public canvasClass: PanoViewerOptions["canvasClass"];

  @Output() public ready: EventEmitter<ReadyEvent<NgxPanoViewerComponent>>;
  @Output() public viewChange: EventEmitter<ViewChangeEvent<NgxPanoViewerComponent>>;
  @Output() public animationEnd: EventEmitter<AnimationEndEvent<NgxPanoViewerComponent>>;
  @Output() public error: EventEmitter<ErrorEvent<NgxPanoViewerComponent>>;

  @ViewChild("canvas") public canvas: ElementRef<HTMLCanvasElement>;
  private _prevProps: PanoViewerOptions;

  public get element() { return this._elRef.nativeElement; }
  private get _canvasElClass() { return this.canvasClass ?? DEFAULT_CANVAS_CLASS; }

  public constructor(
    private _elRef: ElementRef<HTMLElement>,
    private _renderer: Renderer2,
    @Inject(PLATFORM_ID) private _platformId
  ) {
    super();

    this._vanillaPanoViewer = null;

    Object.keys(PANOVIEWER_EVENTS).forEach(evtKey => {
      const evtName = PANOVIEWER_EVENTS[evtKey];
      this[evtName] = new EventEmitter();
    });
  }

  public ngAfterViewInit() {
    if (!isPlatformBrowser(this._platformId)) return;

    const container = this._elRef.nativeElement;
    const props = this._getProps();

    this._vanillaPanoViewer = new VanillaPanoViewer(container, props);

    this._bindEvents();

    this._prevProps = { ...props };
  }

  public ngOnDestroy() {
    this._vanillaPanoViewer?.destroy();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (!this._vanillaPanoViewer) return;

    const props = this._getProps();
    const prevProps = this._prevProps;

    const [changedProps, changedPrevProps] = Object.keys(changes).reduce(([propsCollected, prevPropsCollected], propName) => {
      propsCollected[propName] = changes[propName].currentValue;
      prevPropsCollected[propName] = changes[propName].previousValue;

      return [propsCollected, prevPropsCollected];
    }, [{}, {}] as [PanoViewerOptions, PanoViewerOptions]);

    // Image is changed, change canvas element to prevent context lost
    if (changes.image.currentValue != null || changes.video.currentValue != null) {
      const renderer = this._renderer;
      const container = this._elRef.nativeElement;
      const originalCanvas = this.canvas.nativeElement;
      const clonedCanvas = originalCanvas.cloneNode(true) as HTMLCanvasElement;

      renderer.insertBefore(container, clonedCanvas, originalCanvas);
      renderer.removeChild(container, originalCanvas);

      this.canvas.nativeElement = clonedCanvas;
    }

    updatePanoViewer(this._vanillaPanoViewer, { ...props, ...changedProps }, { ...prevProps, ...changedPrevProps });

    this._prevProps = props;
  }

  private _bindEvents() {
    const panoViewer = this._vanillaPanoViewer;

    Object.keys(PANOVIEWER_EVENTS).forEach(evtKey => {
      const evtName = PANOVIEWER_EVENTS[evtKey];

      panoViewer.on(evtName, e => {
        const emitter = this[evtName];

        e.currentTarget = this;

        if (emitter) {
          emitter.emit(e);
        }
      });
    });
  }

  private _getProps() {
    return Object.keys(PANOVIEWER_OPTIONS).reduce((collected, key) => {
      if (this[key] !== undefined) {
        collected[key] = this[key];
      }

      return collected;
    }, {} as PanoViewerOptions);
  }
}
