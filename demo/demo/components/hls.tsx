import React, { useEffect } from "react";
import Hls from "hls.js";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import View360 from "@site/src/components/View360";
import styles from "./hls.module.css";

export default () => {
  const videoRef = React.useRef<HTMLVideoElement>();
  const [src, setSrc] = React.useState<HTMLVideoElement | null>();
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    const video = videoRef.current;
    const videoUrl = withBaseUrl("/pano/equirect/m3u8/equi.m3u8");

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
    }

    setSrc(video);
  }, []);

  return <View360
    projectionType="equirect"
    projectionOptions={{ src, video: { autoplay: false } }}
    showControlBar>
    <video className={styles.video} ref={videoRef} playsInline={true} autoPlay={false} crossOrigin="anonymous"></video>
  </View360>;
};

