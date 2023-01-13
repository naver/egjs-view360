import React, { useCallback, useEffect, useRef, useState } from "react";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import View360 from "@site/src/components/View360";
import clsx from "clsx";
import styles from "./hotspot.module.css";
import data from "./hotspot.data";

export default () => {
  const viewerRef = useRef<any>();
  const modalRef = useRef<HTMLDivElement>();
  const imgRef = useRef<HTMLImageElement>();
  const [srcNum, setSrc] = useState<number>(1);
  const { withBaseUrl } = useBaseUrlUtils();

  const openLayer = useCallback(name => {
    imgRef.current.src = withBaseUrl(`/demo/book${name}.jpg`);
    modalRef.current.dataset.visible = "true";
  }, []);

  useEffect(() => {
    viewerRef.current.refreshHotspots();
  }, [srcNum]);

  const changeProjection = useCallback(() => {
    // 2 if 1 or 1 if 2
    const nextRoom = 3 - srcNum;
    setSrc(nextRoom);
  }, [srcNum]);

  const hotspots = data[srcNum];

  return <View360
    ref={viewerRef}
    projectionOptions={{
      src: `/pano/cube/bookcube${srcNum}.jpg`,
      cubemapFlipX: true
    }}
    projectionType="cubemap"
    hotspot={{ zoom: true }}
    initialYaw={180}
    showControlBar>
    <div className="view360-hotspots">
      {hotspots.map((hotspot, idx) => (
        <div key={srcNum * 100 + idx}
          className={clsx("view360-hotspot", hotspot.type === "search" ? styles.search : styles.link)}
          data-yaw={hotspot.yaw}
          data-pitch={hotspot.pitch}
          onClick={() => {
            if (hotspot.type === "search") {
              openLayer(hotspot.book);
            } else {
              changeProjection();
            }
          }}>{ hotspot.type === "link" ? hotspot.text : "" }</div>
      ))}
    </div>
    <div ref={modalRef}
      className={styles.modal}
      data-visible="false"
      onClickCapture={evt => {
        evt.stopPropagation();
        modalRef.current.dataset.visible = "false";
      }}>
      <img ref={imgRef} />
    </div>
  </View360>;
}
