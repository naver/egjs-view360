/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";
import VanillaView360, {
  withMethods,
  EVENTS,
  DEFAULT_CLASS
} from "@egjs/view360";

import { View360Props } from "./types";

const view360SetterNames = Object.getOwnPropertyNames(VanillaView360.prototype)
  .filter(name => {
    const descriptor = Object.getOwnPropertyDescriptor(VanillaView360.prototype, name);

    if (name.startsWith("_")) return false;
    if (descriptor?.value) return false;

    return !!descriptor!.set;
  });

class View360 extends React.PureComponent<View360Props> {
  public static defaultProps: Partial<View360Props> = {
    tag: "div"
  };

  private _vanillaView360: VanillaView360;
  private _containerEl: HTMLElement;

  public get view360() { return this._vanillaView360; }
  public get element() { return this._containerEl; }

  public constructor(props: View360Props) {
    super(props);

    withMethods(this, "_vanillaView360");
  }

  public componentDidMount() {
    this._vanillaView360 = new VanillaView360(
      this._containerEl,
      this.props
    );

    this._bindEvents();
  }

  public componentWillUnmount() {
    this._vanillaView360.destroy();
  }

  public componentDidUpdate(prevProps) {
    const view360 = this._vanillaView360;

    view360SetterNames.forEach(name => {
      const oldProp = prevProps[name];
      const newProp = this.props[name];

      if (newProp !== oldProp) {
        view360[name] = newProp;
      }
    });
  }

  public render() {
    const {
      tag,
      className = "",
      canvasClass = "",
      ...restProps
    } = this.props;
    const Container = tag as any;

    const containerClassName = `${DEFAULT_CLASS.CONTAINER} ${className}`.trim();
    const canvasClassName = `${DEFAULT_CLASS.CANVAS} ${canvasClass}`.trim();

    const attributes: { [key: string]: any } = {};

    for (const name in restProps) {
      if (!(name.startsWith("on")) && !(name in VanillaView360.prototype)) {
        attributes[name] = restProps[name];
      }
    }

    return <Container {...attributes} className={containerClassName} ref={(e?: HTMLElement) => {
      e && (this._containerEl = e);
    }}>
      <canvas className={canvasClassName} />
      { this.props.children }
    </Container>;
  }

  private _bindEvents() {
    const view360 = this._vanillaView360;

    Object.keys(EVENTS).forEach((eventKey: keyof typeof EVENTS) => {
      const eventName = EVENTS[eventKey];
      const propName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;

      view360.on(eventName, e => {
        e.target = this;

        const evtHandler = this.props[propName];
        if (evtHandler) {
          evtHandler(e);
        }
      });
    });
  }
}

interface View360 extends React.Component<View360Props>, VanillaView360 {}
export default View360;
