import clsx from "clsx";
import React from "react";
import { SpinViewer as VanillaSpinViewer, SpinViewerOptions } from "../../../src";
import OptionExample from "./OptionExample";
import License, { LicenseProps } from "./License";

interface DemoOptions extends Partial<SpinViewerOptions>, React.HTMLAttributes<HTMLDivElement> {
  license: LicenseProps["items"];
  showExampleCode: boolean | string[];
}

class SpinViewer extends React.Component<DemoOptions> {
  public static defaultProps: DemoOptions = {
    license: [],
    showExampleCode: false
  };

  private _viewer: VanillaSpinViewer;
  private _wrapperRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    const {
      children,
      showExampleCode,
      ...restProps
    } = this.props;

    const options = {
      ...restProps
    }

    const viewer = new VanillaSpinViewer(this._wrapperRef.current!, options);
    this._viewer = viewer;
  }

  public render() {
    const {
      children,
      className,
      showExampleCode,
      style,
      license,
      on,
      ...restProps
    } = this.props;

    const optionsToInclude = Array.isArray(showExampleCode) ? showExampleCode : [];
    const view3DOptions = Object.keys(restProps)
      .filter(key => {
        return key in VanillaSpinViewer.prototype && (restProps[key] !== SpinViewer.defaultProps[key] || optionsToInclude.includes(key));
      })
      .reduce((options, key) => {
        return { ...options, [key]: restProps[key] };
      }, {});

    return <>
      <div ref={this._wrapperRef} className={clsx(className, "view360-container", "is-16by9")} style={style}>
        <canvas className="view360-canvas"></canvas>
        { <License items={license} /> }
        { children }
      </div>
      { showExampleCode && <OptionExample isPano={false} options={view3DOptions} />}
    </>;
  }
}

export default SpinViewer;
