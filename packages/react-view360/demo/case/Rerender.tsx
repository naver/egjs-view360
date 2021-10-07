import React from "react";
import { PanoViewer, PROJECTION_TYPE } from "src/index";

export default class Rerender extends React.Component<{}, { image: number }> {
  public constructor(props) {
    super(props);

    this.state = {
      image: 1
    }
  }

  public render() {
    return <div>
      <h1>Rerender</h1>
      <button onClick={() => {
        this.setState({
          image: this.state.image === 1 ? 2 : 1
        })
      }}>Change Image</button>
      <button onClick={() => { this.forceUpdate(); }}>Force Update</button>
      <PanoViewer id="viewer"
        image={`https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube${this.state.image}.jpg`}
        useZoom={false}
        projectionType={PROJECTION_TYPE.CUBEMAP}
        cubemapConfig={{ tileConfig: { flipHorizontal: true, rotation: 0 } }}
      />
    </div>
  }
}
