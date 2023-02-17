import React, { useRef } from "react";
import View360 from "@site/src/components/View360";

let ignoreViewer1 = false;
let ignoreViewer2 = false;

export default () => {
  const viewer1 = useRef<any>();
  const viewer2 = useRef<any>();

  return <>
    <View360
      ref={viewer1}
      projectionOptions={{
        src: `/pano/equirect/veste.jpg`
      }}
      on={{
        viewChange: evt => {
          const otherTarget = viewer2.current?.viewer();
          if (!otherTarget || !otherTarget.initialized) return;
          if (ignoreViewer1) {
            ignoreViewer1 = false;
            return;
          }

          ignoreViewer2 = true;
          otherTarget.camera.animateTo({
            yaw: evt.yaw,
            pitch: evt.pitch,
            zoom: evt.zoom,
            duration: 0
          });
        }
      }}
      projectionType="equirect"
      license="veste"
      showControlBar={false}
      style={{ width: "50%", display: "inline-block" }} />
    <View360
      ref={viewer2}
      projectionOptions={{
        src: [
          "/pano/cube/FishermansBastion/posx.jpg",
          "/pano/cube/FishermansBastion/negx.jpg",
          "/pano/cube/FishermansBastion/posy.jpg",
          "/pano/cube/FishermansBastion/negy.jpg",
          "/pano/cube/FishermansBastion/posz.jpg",
          "/pano/cube/FishermansBastion/negz.jpg"
        ]
      }}
      projectionType="cubemap"
      on={{
        viewChange: (evt) => {
          const otherTarget = viewer1.current?.viewer();
          if (!otherTarget || !otherTarget.initialized) return;
          if (ignoreViewer2) {
            ignoreViewer1 = false;
            return;
          }

          ignoreViewer1 = true;
          otherTarget.camera.animateTo({
            yaw: evt.yaw,
            pitch: evt.pitch,
            zoom: evt.zoom,
            duration: 0
          });
        }
      }}
      license="veste"
      showControlBar={false}
      style={{ width: "50%", display: "inline-block" }} />
  </>;
}
