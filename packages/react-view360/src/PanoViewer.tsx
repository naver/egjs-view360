/*
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";
import { PanoViewer as VanillaPanoViewer, PanoViewerOptions, withPanoViewerMethods, PANOVIEWER_EVENTS, PANOVIEWER_OPTIONS, updatePanoViewer } from "~/index";

import { DEFAULT_PROPS } from "./consts";
import { PanoViewerProps } from "./types";

class PanoViewer extends React.PureComponent<Partial<PanoViewerProps & PanoViewerOptions>> {
  public static defaultProps: PanoViewerProps = DEFAULT_PROPS;

  @withPanoViewerMethods private _vanillaPanoViewer: VanillaPanoViewer;
  private _containerEl: HTMLElement;
  private _prevProps: Partial<PanoViewerProps & PanoViewerOptions>;

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
    const attributes: { [key: string]: any } = {};

    for (const name in props) {
      if (!(name in DEFAULT_PROPS) && !(name in PANOVIEWER_OPTIONS)) {
        attributes[name] = props[name];
      }
    }

    return <Container {...attributes} ref={(e?: HTMLElement) => {
      e && (this._containerEl = e);
    }}>
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
}

interface PanoViewer extends React.Component<Partial<PanoViewerProps & PanoViewerOptions>>, VanillaPanoViewer { }
export default PanoViewer;
