import React from "react";
import { PanoViewer as VanillaPanoViewer } from "../../../src";

class PanoViewer extends React.Component {
  private _wrapperRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    const viewer = new VanillaPanoViewer(this._wrapperRef.current!, {
      src: "/egjs-view360/pano/equirect/equi-room.jpg"
    });
  }

  public render() {
    // For testing types
    return <div ref={this._wrapperRef} className="view360-container is-16by9">
      <canvas className="view360-canvas"></canvas>
    </div>;
  }
}

export default PanoViewer;
