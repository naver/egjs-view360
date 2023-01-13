/**
 * Copyright (c) 2022 NAVER Corp.
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
  ViewChild,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
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
import { optionNames, optionInputs, setterNames } from "./const";

@Component({
  selector: "ngx-view360, [NgxView360]",
  template: `
    <canvas #canvas [ngClass]="_canvasElClass"></canvas>
    <ng-content></ng-content>
  `,
  host: {
    style: "display: block;",
    class: DEFAULT_CLASS.CONTAINER
  },
  inputs: optionInputs
})
export class NgxView360Component extends View360Interface
  implements AfterViewInit, OnDestroy, OnChanges {
  @Input() public canvasClass: string;

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

  @ViewChild("canvas") public canvas: ElementRef<HTMLCanvasElement>;

  public get element() { return this._elRef.nativeElement; }
  private get _canvasElClass() { return `${DEFAULT_CLASS.CANVAS} ${this.canvasClass ?? ""}`.trim(); }

  public constructor(
    private _elRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private _platformId
  ) {
    super();
    this._view360 = null;
  }

  public ngAfterViewInit() {
    if (!isPlatformBrowser(this._platformId)) return;

    const container = this._elRef.nativeElement;
    const options = this._getOptions();

    this._view360 = new VanillaView360(container, options);

    this._bindEvents();
  }

  public ngOnDestroy() {
    this._view360?.destroy();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (!this._view360) return;

    setterNames.forEach(name => {
      const changed = changes[`opt-${name}`];
      if (!changed) return;

      const oldProp = changed.previousValue;
      const newProp = changed.currentValue;

      if (newProp !== oldProp) {
        this._view360[name] = newProp;
      }
    });
  }

  private _getOptions() {
    return optionNames.reduce((options, name) => {
      options[name] = this[`opt-${name}`];
      return options;
    }, {}) as View360Options;
  }

  private _bindEvents() {
    const view360 = this._view360;

    Object.keys(EVENTS).forEach(evtKey => {
      const evtName = EVENTS[evtKey];

      view360.on(evtName, e => {
        const emitter = this[`${evtName}Emitter`];

        e.currentTarget = this;

        if (emitter) {
          emitter.emit(e);
        }
      });
    });
  }
}
