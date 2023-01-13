const data: Array<{
  id: string;
  title: string;
  desc: string;
  thumb?: string;
}> = [
  {
    id: "hotspot",
    title: "📍 Hotspot",
    desc: "Drag and rotate the photo. An anchor will follow.",
    thumb: "hotspot.png"
  },
  {
    id: "videojs",
    title: "Video.js with View360",
    desc: "You can use video.js with View360",
    thumb: "videojs.png"
  },
  {
    id: "sync",
    title: "🔄 Synchronize",
    desc: "Synchronize view direction of two viewers",
    thumb: "synchronize.png"
  },
  {
    id: "hls",
    title: "m3u8 HLS video",
    desc: "Play m3u8 HLS 360 video with PanoViewer, with hls.js",
    thumb: "hls.png"
  }
];

export default data;
