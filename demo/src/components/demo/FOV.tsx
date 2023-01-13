import React, { useEffect, useRef, useState } from "react";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import View360, { CubemapProjection } from "../../../../packages/view360/src";
import clsx from "clsx";

const AutoResize: React.FunctionComponent = () => {
  const wrapperRef = useRef<HTMLDivElement>();
  const [view360, setViewer] = useState<View360>();
  const [fov, setFOV] = useState(90);
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    const viewer = new View360(wrapperRef.current, {
      projection: new CubemapProjection({
        src: withBaseUrl("/pano/cube/cubemap.jpg")
      })
    });

    setViewer(viewer);

    return () => {
      // onUnmount
      viewer.destroy();
    }
  }, []);

  useEffect(() => {
    if (!view360) return;
    view360.fov = fov;
    view360.renderFrame(0);
  }, [fov]);

  return <>
    <div style={{ marginBottom: "0.5rem" }}>
      <input type="range" min={1} max={180} step={1} value={fov} onChange={evt => {
        setFOV(parseFloat(evt.target.value));
      }}></input>
      <span>fov: {fov}</span>
    </div>
    <div ref={wrapperRef} className={clsx("view360-container", "is-16by9")}>
      <canvas className="view360-canvas"></canvas>
    </div>
  </>
}

export default AutoResize;
