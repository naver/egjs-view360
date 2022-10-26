/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * An event that fires when the component is initialized.
 * This will be called once after `init()` is called.
 * @event ready
 * @property A type of the event.
 * @property An instance of the component that triggered this event.
 */
export interface ReadyEvent<T> {
  type: string;
  target: T;
}

/**
 * An event that fires when the content is loaded.
 * @event load
 * @property A type of the event.
 * @property An instance of the component that triggered this event.
 */
export interface LoadEvent<T> {
  type: string;
  target: T;
}

/**
 * An event that fires when component's `resize()` is called.
 * @event resize
 * @property A type of the event.
 * @property An instance of the component that triggered this event.
 * @property New width of the element.
 * @property New height of the element.
 */
export interface ResizeEvent<T> {
  type: string;
  target: T;
  width: number;
  height: number;
}

/**
 * An event that fires before rendering a frame.
 * @event beforeRender
 * @property A type of the event.
 * @property An instance of the component that triggered this event.
 */
export interface BeforeRenderEvent<T> {
  type: string;
  target: T;
}

/**
 * An event that fires after rendering a frame.
 * @property A type of the event.
 * @property An instance of the component that triggered this event.
 */
export interface RenderEvent<T> {
  type: string;
  target: T;
}
