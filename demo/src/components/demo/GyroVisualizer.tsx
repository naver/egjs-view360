import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import View360, { ControlBar, EVENTS, CubemapProjection } from "../../../../packages/view360/src";

const GyroVisualizer: React.FunctionComponent = () => {
  const wrapperRef = useRef<HTMLDivElement>();
  const gyroRef = useRef<HTMLCanvasElement>();
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    // onMount
    const viewer = new View360(wrapperRef.current, {
      projection: new CubemapProjection({
        src: withBaseUrl("/pano/cube/cubemap.jpg")
      }),
      gyro: true,
      plugins: [new ControlBar()]
    });

    const canvas = gyroRef.current;
    const ctx = canvas.getContext("2d");
    const maxPoints = 100;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const columnWidth = width / maxPoints;
    const columnHeight = height;
    const zoom = 2;

    canvas.width = width;
    canvas.height = height;

    let pointIdx = 0;
    let prevPitch = 0;
    let prevDiff = 0;
    viewer.on(EVENTS.VIEW_CHANGE, () => {
      const pitch = viewer.camera.pitch;
      const diff = pitch - prevPitch;

      if (pointIdx > 0) {
        const xFrom = (pointIdx - 1) * columnWidth;
        const xTo = xFrom + columnWidth;
        const yFrom = (prevDiff * zoom / 10 + 0.5) * columnHeight;
        const yTo = (diff * zoom / 10 + 0.5) * columnHeight;

        ctx.clearRect(xFrom, 0, columnWidth, columnHeight);
        ctx.beginPath();
        ctx.moveTo(xFrom, yFrom);
        ctx.lineTo(xTo, yTo);
        ctx.stroke();
      }

      prevPitch = pitch;
      prevDiff = diff;
      pointIdx += 1;
      if (pointIdx >= maxPoints) {
        pointIdx = 0;
      }
    });

    return () => {
      // onUnmount
      viewer.destroy();
    }
  });

  return <>
    <div ref={wrapperRef} className={clsx("view360-container", "is-16by9")}>
      <canvas className="view360-canvas"></canvas>
    </div>
    <div>
      <canvas ref={gyroRef} style={{ width: "100%" }}></canvas>
    </div>
  </>
}

export default GyroVisualizer;
