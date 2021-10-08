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
  Inject,
  PLATFORM_ID,
  SimpleChanges
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import {
  SpinViewer as VanillaSpinViewer,
  SpinViewerOptions,
  DEFAULT_WRAPPER_CLASS,
  DEFAULT_IMAGE_CLASS,
  SPINVIEWER_OPTIONS,
  SPINVIEWER_EVENTS,
  LoadEvent,
  ImageErrorEvent,
  ChangeEvent,
  AnimationEndEvent
} from "@egjs/view360";

import SpinViewerInterface from "./SpinViewerInterface";

@Component({
  selector: "ngx-spin-viewer, [NgxSpinViewer]",
  template: `
    <div [ngClass]="_wrapperElClass">
      <img [ngClass]="_imageElClass" />
    </div>
    <ng-content></ng-content>
  `,
  host: {
    style: "display: block;"
  }
})
export class NgxSpinViewerComponent extends SpinViewerInterface
  implements AfterViewInit, OnChanges, SpinViewerOptions {
  @Input() public imageUrl: SpinViewerOptions["imageUrl"];
  @Input() public rowCount: SpinViewerOptions["rowCount"];
  @Input() public colCount: SpinViewerOptions["colCount"];
  @Input() public width: SpinViewerOptions["width"];
  @Input() public height: SpinViewerOptions["height"];
  @Input() public autoHeight: SpinViewerOptions["autoHeight"];
  @Input() public colRow: SpinViewerOptions["colRow"];
  @Input() public scale: SpinViewerOptions["scale"];
  @Input() public frameIndex: SpinViewerOptions["frameIndex"];
  @Input() public wrapperClass: SpinViewerOptions["wrapperClass"];
  @Input() public imageClass: SpinViewerOptions["imageClass"];

  @Output() public load: EventEmitter<LoadEvent<NgxSpinViewerComponent>>;
  @Output() public imageError: EventEmitter<ImageErrorEvent<NgxSpinViewerComponent>>;
  @Output() public change: EventEmitter<ChangeEvent<NgxSpinViewerComponent>>;
  @Output() public animationEnd: EventEmitter<AnimationEndEvent<NgxSpinViewerComponent>>;

  public get element() { return this._elRef.nativeElement; }

  private get _wrapperElClass() { return this.wrapperClass ?? DEFAULT_WRAPPER_CLASS; }
  private get _imageClass() { return this.imageClass ?? DEFAULT_IMAGE_CLASS; }

  public constructor(
    private _elRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private _platformId
  ) {
    super();

    this._vanillaSpinViewer = null;

    Object.keys(SPINVIEWER_EVENTS).forEach(evtKey => {
      const evtName = SPINVIEWER_EVENTS[evtKey];
      this[evtName] = new EventEmitter();
    });
  }

  public ngAfterViewInit() {
    if (!isPlatformBrowser(this._platformId)) return;

    const container = this._elRef.nativeElement;
    const props = this._getProps();

    this._vanillaSpinViewer = new VanillaSpinViewer(container, props);

    this._bindEvents();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (!this._vanillaSpinViewer) return;

    if (changes.scale.currentValue != null) {
      this._vanillaSpinViewer.setScale(changes.scale.currentValue);
    }
  }

  private _bindEvents() {
    const spinViewer = this._vanillaSpinViewer!;

    Object.keys(SPINVIEWER_EVENTS).forEach(evtKey => {
      const evtName = SPINVIEWER_EVENTS[evtKey];

      spinViewer.on(evtName, e => {
        const emitter = this[evtName];

        e.currentTarget = this;

        if (emitter) {
          emitter.emit(e as any);
        }
      });
    });
  }

  private _getProps() {
    return Object.keys(SPINVIEWER_OPTIONS).reduce((collected, key) => {
      if (this[key] !== undefined) {
        collected[key] = this[key];
      }

      return collected;
    }, {} as SpinViewerOptions);
  }
}
