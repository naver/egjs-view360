import View360, { ControlBar, EquirectProjection } from "@site/../packages/view360/src";
import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

class VideoJSDemo extends React.Component {
  private _containerRef: React.RefObject<HTMLDivElement>;
  private _videoRef: React.RefObject<HTMLVideoElement>;

  public constructor(props) {
    super(props);
    this._containerRef = React.createRef<HTMLDivElement>();
    this._videoRef = React.createRef<HTMLVideoElement>();
  }

  public componentDidMount() {
    videojs(this._videoRef.current).ready(() => {
      const viewer = new View360(this._containerRef.current, {
        projection: new EquirectProjection({
          src: this._videoRef.current,
          video: {
            autoplay: false
          }
        }),
        plugins: [new ControlBar({
          autoHide: false,
          showBackground: false,
          progressBar: false,
          playButton: false,
          volumeButton: false,
          fullscreenButton: false,
          videoTime: false,
          pieView: { order: 0 },
          gyroButton: { position: "top-right", order: 1 },
          vrButton: { position: "top-right", order: 2 }
        })]
      });
    });
  }

  public render() {
    return <div ref={this._containerRef} data-vjs-player>
      <video ref={this._videoRef} className="video-js vjs-fluid vjs-default-skin vjs-big-play-centered vjs-controls-enabled" data-setup='{"controls": true, "autoplay": false, "playsinline": true}'>
        <source src={require("/pano/equirect/seven.mp4").default} type="video/mp4" />
        <source src={require("/pano/equirect/seven.webm").default} type="video/webm" />
      </video>
      <canvas className="view360-canvas"></canvas>
    </div>
  }
}


export default VideoJSDemo;
