import React, { useMemo } from "react";
import View360, { CubemapProjection } from "src";
import "./App.css";
import "@egjs/view360/css/view360.min.css";

export default () => {
  const projection = useMemo(() => new CubemapProjection({
    src: "https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube1.jpg"
  }), []);

  return <View360
    projection={projection}
    className="is-3by1" />
}
