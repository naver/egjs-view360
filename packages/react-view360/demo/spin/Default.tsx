import React from "react";
import { SpinViewer } from "src/index";

export default class Default extends React.Component<{}, {}> {
  private _viewer: SpinViewer;

  public render() {
    return <div>
      <h1>SpinViewer</h1>
      <button onClick={() => { this.forceUpdate(); this.setState({}); }}>Force Update</button>
      <SpinViewer id="spin" ref={ref => {
        ref && (this._viewer = ref);
      }}
        imageUrl={"https://naver.github.io/egjs-view360/common/img/spinviewer/spin_demo.jpg"}
        rowCount={47}
        scale={1}
      ></SpinViewer>
      <button onClick={() => {
        this._viewer?.spinBy(720, {duration: 500});
      }}>spin</button>
    </div>
  }
}
