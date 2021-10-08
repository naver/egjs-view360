/*
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import {
  SpinViewer as VanillaSpinViewer,
  SpinViewerOptions,
  SPINVIEWER_EVENTS,
  SPINVIEWER_OPTIONS,
  DEFAULT_IMAGE_CLASS,
  DEFAULT_WRAPPER_CLASS,
  withSpinViewerMethods
} from "@egjs/view360";

import { SPINVIEWER_DEFAULT_PROPS } from "./consts";
import { SpinViewerProps } from "./types";

class SpinViewer extends React.PureComponent<Partial<SpinViewerProps & SpinViewerOptions>> {
  public static defaultProps: SpinViewerProps = SPINVIEWER_DEFAULT_PROPS;

  @withSpinViewerMethods private _vanillaSpinViewer: VanillaSpinViewer;
  private _containerEl: HTMLElement;
  private _prevScale?: number;

  public componentDidMount() {
    const props = { ...this.props };

    this._vanillaSpinViewer = new VanillaSpinViewer(
      this._containerEl,
      props
    );
    this._prevScale = props.scale;

    this._bindEvents();
  }

  public componentDidUpdate() {
    const props = this.props;
    const prevScale = this._prevScale;
    const spinViewer = this._vanillaSpinViewer;

    if (props.scale != null && props.scale !== prevScale) {
      spinViewer.setScale(props.scale);
    }

    this._prevScale = props.scale;
  }

  public render() {
    const props = this.props;
    const Container = props.tag as any;
    const wrapperClass = props.wrapperClass ?? DEFAULT_WRAPPER_CLASS;
    const imageClass = props.imageClass ?? DEFAULT_IMAGE_CLASS;
    const attributes: { [key: string]: any } = {};

    for (const name in props) {
      if (!(name in SPINVIEWER_DEFAULT_PROPS) && !(name in SPINVIEWER_OPTIONS)) {
        attributes[name] = props[name];
      }
    }

    return <Container {...attributes} ref={(e?: HTMLElement) => {
      e && (this._containerEl = e);
    }}>
      <div className={wrapperClass}>
        <img className={imageClass} />
      </div>
      { this.props.children }
    </Container>;
  }

  private _bindEvents() {
    const spinViewer = this._vanillaSpinViewer;
    const props = this.props as Required<SpinViewerProps>;

    Object.keys(SPINVIEWER_EVENTS).forEach((eventKey: keyof typeof SPINVIEWER_EVENTS) => {
      const eventName = SPINVIEWER_EVENTS[eventKey];
      const propName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;

      spinViewer.on(eventName, e => {
        e.currentTarget = this;

        props[propName](e);
      });
    });
  }
}

interface SpinViewer extends React.Component<Partial<SpinViewerProps & SpinViewerOptions>>, VanillaSpinViewer { }
export default SpinViewer;
