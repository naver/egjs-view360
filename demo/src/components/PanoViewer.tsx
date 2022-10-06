import clsx from "clsx";
import React from "react";
import { PanoViewer as VanillaPanoViewer, PanoViewerOptions } from "../../../src";
import OptionExample from "./OptionExample";

interface DemoOptions extends Partial<PanoViewerOptions>, React.HTMLAttributes<HTMLDivElement> {
  showExampleCode: boolean | string[];
}

class PanoViewer extends React.Component<DemoOptions> {
  public static defaultProps: DemoOptions = {
    showExampleCode: false
  };

  private _viewer: VanillaPanoViewer;
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

    const viewer = new VanillaPanoViewer(this._wrapperRef.current!, options);
    this._viewer = viewer;
  }

  public render() {
    const {
      children,
      className,
      showExampleCode,
      style,
      ...restProps
    } = this.props;

    const optionsToInclude = Array.isArray(showExampleCode) ? showExampleCode : [];
    const view3DOptions = Object.keys(restProps)
      .filter(key => {
        return key in VanillaPanoViewer.prototype && (restProps[key] !== PanoViewer.defaultProps[key] || optionsToInclude.includes(key));
      })
      .reduce((options, key) => {
        return { ...options, [key]: restProps[key] };
      }, {});

    delete view3DOptions["on"];

    return <>
      <div ref={this._wrapperRef} className={clsx(className, "view360-container", "is-16by9")} style={style}>
        <canvas className="view360-canvas"></canvas>
        { children }
      </div>
      { showExampleCode && <OptionExample isPano={true} options={view3DOptions} />}
    </>;
  }
}

export default PanoViewer;
