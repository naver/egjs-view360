/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import { ControlBarOptions } from "./ControlBar";
import { CONTROL_BAR_DEFAULT_CLASS } from "./const";
import Motion from "../../core/Motion";
import MouseInput from "../../control/input/MouseInput";
import TouchInput from "../../control/input/TouchInput";
import { CONTROL_EVENTS, INFINITE_RANGE } from "../../const/internal";
import { clamp } from "../../utils";
import { InputEvents } from "../../type/internal";
import { EL_DIV } from "../../const/browser";

class RangeControl extends Component<{
  [CONTROL_EVENTS.INPUT_START]: number;
  [CONTROL_EVENTS.CHANGE]: number;
  [CONTROL_EVENTS.INPUT_END]: void;
}> {
  public readonly rootEl: HTMLElement;
  public readonly thumbEl: HTMLElement;
  public readonly trackEl: HTMLElement;
  public readonly fillerEl: HTMLElement;

  private _motion: Motion;
  private _mouseInput: MouseInput;
  private _touchInput: TouchInput;
  private _fixedClass: string;
  private _bbox: DOMRect;

  /**
   *
   */
  public constructor() {
    super();

    const root = document.createElement(EL_DIV);
    const track = document.createElement(EL_DIV);
    const thumb = document.createElement(EL_DIV);
    const filler = document.createElement(EL_DIV);

    root.draggable = false;

    track.appendChild(filler);
    track.appendChild(thumb);
    root.appendChild(track);

    this.rootEl = root;
    this.trackEl = track;
    this.thumbEl = thumb;
    this.fillerEl = filler;

    this._mouseInput = new MouseInput();
    this._touchInput = new TouchInput();
    this._motion = new Motion({ duration: 1, range: INFINITE_RANGE, easing: x => x });
    this._bbox = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    } as DOMRect;
    this._fixedClass = CONTROL_BAR_DEFAULT_CLASS.FIXED;
  }

  public init(className: Required<ControlBarOptions["className"]>) {
    const mouseInput = this._mouseInput;
    const touchInput = this._touchInput;

    this.rootEl.classList.add(className.RANGE_ROOT);
    this.trackEl.classList.add(className.RANGE_TRACK);
    this.thumbEl.classList.add(className.RANGE_THUMB);
    this.fillerEl.classList.add(className.RANGE_FILLER);
    this._fixedClass = className.FIXED;

    mouseInput.on(CONTROL_EVENTS.INPUT_START, this._onHold);
    touchInput.on(CONTROL_EVENTS.INPUT_START, this._onHold);

    mouseInput.on(CONTROL_EVENTS.INPUT_END, this._onRelease);
    touchInput.on(CONTROL_EVENTS.INPUT_END, this._onRelease);

    mouseInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
    touchInput.on(CONTROL_EVENTS.CHANGE, this._onChange);

    mouseInput.enable(this.rootEl);
    touchInput.enable(this.rootEl);

    this.resize();
  }

  public destroy() {
    const mouseInput = this._mouseInput;
    const touchInput = this._touchInput;

    this.rootEl.className = "";
    this.trackEl.className = "";
    this.thumbEl.className = "";
    this.fillerEl.className = "";

    mouseInput.off();
    touchInput.off();
    mouseInput.disable();
    touchInput.disable();
  }

  public resize() {
    this._bbox = this.trackEl.getBoundingClientRect();
  }

  public updateStyle(progress: number) {
    const width = this._bbox.width;
    const clampedProgress = clamp(progress, 0, 1);

    this.fillerEl.style.width = `${clampedProgress * 100}%`;
    this.thumbEl.style.transform = `translateX(${clampedProgress * width}px)`;
  }

  private _onHold = ({ srcEvent, isTouch }: InputEvents<{ x: number; y: number }>[typeof CONTROL_EVENTS.INPUT_START]) => {
    const bbox = this._bbox;
    if (!bbox) return;

    const x = isTouch
      ? (srcEvent as TouchEvent).touches[0].pageX
      : (srcEvent as MouseEvent).pageX;
    const elX = bbox.x + (window.scrollX ?? window.pageXOffset);

    const clamepdX = clamp(x, elX, elX + bbox.width);
    const progress = (clamepdX - elX) / bbox.width;

    this._motion.reset(clamepdX);
    this.thumbEl.classList.add(this._fixedClass);

    this.trigger(CONTROL_EVENTS.INPUT_START, progress);
  };

  private _onChange = ({ delta }: InputEvents<{ x: number; y: number }>[typeof CONTROL_EVENTS.CHANGE]) => {
    const motion = this._motion;
    const bbox = this._bbox;
    if (!bbox) return;

    motion.setNewEndByDelta(delta.x);
    motion.update(1);

    const elX = bbox.x + (window.scrollX ?? window.pageXOffset);
    const clampedX = clamp(motion.val, elX, elX + bbox.width);
    const progress = (clampedX - elX) / bbox.width;

    this.trigger(CONTROL_EVENTS.CHANGE, progress);
  };

  private _onRelease = () => {
    const bbox = this._bbox;
    if (!bbox) return;

    this.thumbEl.classList.remove(this._fixedClass);

    this.trigger(CONTROL_EVENTS.INPUT_END);
  };
}

export default RangeControl;
