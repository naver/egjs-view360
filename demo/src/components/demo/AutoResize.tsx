import React, { useRef } from "react";
import View360 from "../View360";

const AutoResize: React.FunctionComponent = () => {
  const wrapperRef = useRef<HTMLDivElement>();

  return <>
    <div style={{ marginBottom: "0.5rem" }}>
      <button className="button button--outline button--primary" onClick={() => {
        wrapperRef.current.style.width = "25%";
      }}>25%</button>
      <button className="button button--outline button--primary" onClick={() => {
        wrapperRef.current.style.width = "50%";
      }}>50%</button>
      <button className="button button--outline button--primary" onClick={() => {
        wrapperRef.current.style.width = "100%";
      }}>100%</button>
    </div>
    <div ref={wrapperRef} style={{ width: "25%" }}>
      <View360
        projectionOptions={{
          src: "/pano/equirect/veste.jpg"
        }}
        license="veste" />
      <View360
        projectionOptions={{
          src: "/pano/equirect/veste.jpg"
        }}
        autoResize={false}
        license="veste" />
    </div>
  </>
}

export default AutoResize;
