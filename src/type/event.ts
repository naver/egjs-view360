/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * An event that fires when PanoViewerBase is initialized.
 * This will be called once after the first 3D model is loaded.
 * @event PanoViewerBase#ready
 * @type {object}
 * @property {string} type A type of the event.
 * @property {T} target An instance of PanoViewerBase that triggered this event.
 */
export interface ReadyEvent<T> {
  type: string;
  target: T;
}

/**
 * An event that fires when PanoViewerBase's {@link PanoViewerBase#resize resize()} is called
 * @event PanoViewerBase#resize
 * @type {object}
 * @property {string} type A type of the event.
 * @property {T} target An instance of PanoViewerBase that triggered this event.
 * @property {number} width New width of the canvas.
 * @property {number} height New height of the canvas.
 */
export interface ResizeEvent<T> {
  type: string;
  target: T;
  width: number;
  height: number;
}

/**
 * An event that fires before rendering a frame.
 * @event PanoViewerBase#beforeRender
 * @type {object}
 * @property {string} type A type of the event.
 * @property {T} target An instance of PanoViewerBase that triggered this event.
 */
export interface BeforeRenderEvent<T> {
  type: string;
  target: T;
}

/**
 * An event that fires after rendering a frame.
 * @event PanoViewerBase#afterRender
 * @type {object}
 * @property {string} type A type of the event.
 * @property {T} target An instance of PanoViewerBase that triggered this event.
 */
export interface RenderEvent<T> {
  type: string;
  target: T;
}
