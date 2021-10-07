import React from "react";
import { PanoViewer } from "src/index";

export default class RerenderVideo extends React.Component<{}, { image: number, overlay: boolean }> {
  private _panoViewer: PanoViewer;

  public constructor(props) {
    super(props);

    this.state = {
      image: 1,
      overlay: true
    }
  }

  public render() {
    return <div>
      <h1>Rerender</h1>
      <button onClick={() => { this.forceUpdate(); }}>Force Update</button>
      <PanoViewer ref={ref => {
        ref && (this._panoViewer = ref);
      }} id="viewer"
        video={"https://naver.github.io/egjs-view360/examples/img/equi.mp4"}
      >
        <div className={`overlay${this.state.overlay ? "" : " hidden"}`}
          onClick={() => {
            if (!this._panoViewer) return;

            this._panoViewer.getVideo().play();
            this.setState({
              overlay: false
            });
          }}
        >Click to play</div>
      </PanoViewer>
    </div>
  }
}
