import React from "react";
import { PanoViewerElement } from "../../../src";

class PanoViewerTest extends React.Component {
  public ref = React.createRef<PanoViewerElement>();

  public componentDidMount() {
    // this.ref.current?.addEventListener("ready");
  }

  public render() {
    // For testing types
    return <pano-viewer ref={this.ref} src="/pano/equirect/equi.jpg" />;
  }
}

export default PanoViewerTest;
