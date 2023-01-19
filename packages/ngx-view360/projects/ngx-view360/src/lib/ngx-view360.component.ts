/**
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy,
  NgZone,
  Inject,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import VanillaView360, {
  EVENTS,
  DEFAULT_CLASS,
  ReadyEvent,
  LoadStartEvent,
  LoadEvent,
  ProjectionChangeEvent,
  ResizeEvent,
  BeforeRenderEvent,
  RenderEvent,
  InputStartEvent,
  InputEndEvent,
  ViewChangeEvent,
  StaticClickEvent,
  VRStartEvent,
  VREndEvent,
  View360Options
} from "@egjs/view360";
import View360Interface from "./View360Interface";
import { setterNames } from "./const";

@Component({
  selector: "ngx-view360, [NgxView360]",
  template: `
    <canvas #canvas [ngClass]="_canvasElClass"></canvas>
    <ng-content></ng-content>
  `,
  host: {
    style: "display: block;",
    class: "view360-container"
  }
})
export class NgxView360Component extends View360Interface
  implements AfterViewInit, OnDestroy, OnChanges {
  @Input() public options!: Partial<View360Options>;
  @Input() public canvasClass!: string;

  @Output("ready") public readyEmitter = new EventEmitter<ReadyEvent>();
  @Output("loadStart") public loadStartEmitter = new EventEmitter<LoadStartEvent>();
  @Output("load") public loadEmitter = new EventEmitter<LoadEvent>();
  @Output("projectionChange") public projectionChangeEmitter = new EventEmitter<ProjectionChangeEvent>();
  @Output("resize") public resizeEmitter = new EventEmitter<ResizeEvent>();
  @Output("beforeRender") public beforeRenderEmitter = new EventEmitter<BeforeRenderEvent>();
  @Output("render") public renderEmitter = new EventEmitter<RenderEvent>();
  @Output("inputStart") public inputStartEmitter = new EventEmitter<InputStartEvent>();
  @Output("inputEnd") public inputEndEmitter = new EventEmitter<InputEndEvent>();
  @Output("viewChange") public viewChangeEmitter = new EventEmitter<ViewChangeEvent>();
  @Output("staticClick") public staticClickEmitter = new EventEmitter<StaticClickEvent>();
  @Output("vrStart") public vrStartEmitter = new EventEmitter<VRStartEvent>();
  @Output("vrEnd") public vrEndEmitter = new EventEmitter<VREndEvent>();

  @ViewChild("canvas") public canvas!: ElementRef<HTMLCanvasElement>;

  public get element() { return this._elRef.nativeElement; }
  public get _canvasElClass() { return `${DEFAULT_CLASS.CANVAS} ${this.canvasClass ?? ""}`.trim(); }
  private _destroy$ = new Subject<void>();

  public constructor(
    private _elRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private _platformId: any,
    private _ngZone: NgZone
  ) {
    super();
    this._view360 = null;
  }

  public ngAfterViewInit() {
    if (isPlatformServer(this._platformId)) return;

    const container = this._elRef.nativeElement;
    const options = this.options ?? {};

    this._view360 = this._ngZone.runOutsideAngular(
      () => new VanillaView360(container, options)
    );

    this._bindEvents();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._view360?.destroy();
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const view360 = this._view360;
    if (!view360) return;

    const changed = changes.options;
    if (!changed) return;

    const prev = changed.previousValue;
    const current = changed.currentValue;

    setterNames.forEach(name => {
      const oldProp = prev[name];
      const newProp = current[name];

      if (newProp !== oldProp) {
        (view360 as any)[name] = newProp;
      }
    });
  }

  private _bindEvents() {
    const view360 = this._view360!;

    Object.keys(EVENTS).forEach(evtKey => {
      const evtName = (EVENTS as any)[evtKey];

      fromEvent(view360, evtName)
        .pipe(takeUntil(this._destroy$))
        .subscribe(event => {
          const emitter = (this as any)[`${evtName}Emitter`];
          if (emitter && emitter.observers.length > 0) {
            this._ngZone.run(() => emitter.emit(event));
          }
        });
    });
  }
}
