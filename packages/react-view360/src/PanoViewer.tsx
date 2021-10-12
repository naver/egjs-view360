/*
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";
import {
  PanoViewer as VanillaPanoViewer,
  PanoViewerOptions,
  withPanoViewerMethods,
  PANOVIEWER_EVENTS,
  PANOVIEWER_OPTIONS,
  updatePanoViewer,
  DEFAULT_CANVAS_CLASS
} from "@egjs/view360";

import { PANOVIEWER_DEFAULT_PROPS } from "./consts";
import { PanoViewerProps } from "./types";

type PanoViewerPropsAndOptions = Partial<PanoViewerProps & PanoViewerOptions>;

class PanoViewer extends React.PureComponent<PanoViewerPropsAndOptions> {
  public static defaultProps: PanoViewerProps = PANOVIEWER_DEFAULT_PROPS;

  @withPanoViewerMethods private _vanillaPanoViewer: VanillaPanoViewer;
  private _containerEl: HTMLElement;
  private _prevProps: Partial<PanoViewerProps & PanoViewerOptions>;
  private _canvasKey: number;

  public get element() { return this._containerEl; }

  public constructor(props: PanoViewerPropsAndOptions) {
    super(props);

    this._canvasKey = -1;
  }

  public componentDidMount() {
    const props = { ...this.props };

    this._vanillaPanoViewer = new VanillaPanoViewer(
      this._containerEl,
      props
    );
    this._prevProps = props;

    this._bindEvents();
  }

  public componentWillUnmount() {
    this._vanillaPanoViewer.destroy();
  }

  public componentWillUpdate(nextProps: PanoViewerPropsAndOptions) {
    const props = this.props;

    if ((nextProps.image != null && nextProps.image !== props.image)
      || (nextProps.video != null && nextProps.video !== props.video)) {
      // Re-generate canvas
      this._canvasKey = this._generateCanvasKey();
    }
  }

  public componentDidUpdate() {
    const props = this.props;
    const lastProps = this._prevProps;
    const panoViewer = this._vanillaPanoViewer;

    updatePanoViewer(panoViewer, props, lastProps);

    this._prevProps = { ...props };
  }

  public render() {
    const props = this.props;
    const Container = props.tag as any;
    const canvasClass = props.canvasClass ?? DEFAULT_CANVAS_CLASS;
    const attributes: { [key: string]: any } = {};

    for (const name in props) {
      if (!(name in PANOVIEWER_DEFAULT_PROPS) && !(name in PANOVIEWER_OPTIONS)) {
        attributes[name] = props[name];
      }
    }

    return <Container {...attributes} ref={(e?: HTMLElement) => {
      e && (this._containerEl = e);
    }}>
      <canvas className={canvasClass} key={this._canvasKey} />
      { this.props.children }
    </Container>;
  }

  private _bindEvents() {
    const panoViewer = this._vanillaPanoViewer;
    const props = this.props as Required<PanoViewerProps>;

    Object.keys(PANOVIEWER_EVENTS).forEach((eventKey: keyof typeof PANOVIEWER_EVENTS) => {
      const eventName = PANOVIEWER_EVENTS[eventKey];
      const propName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;

      panoViewer.on(eventName, e => {
        e.currentTarget = this;

        props[propName](e);
      });
    });
  }

  private _generateCanvasKey() {
    let newKey: number;
    const oldKey = this._canvasKey;

    do {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      newKey = array[0];
    } while (newKey === oldKey);

    return newKey;
  }
}

interface PanoViewer extends React.Component<Partial<PanoViewerProps & PanoViewerOptions>>, VanillaPanoViewer { }
export default PanoViewer;
