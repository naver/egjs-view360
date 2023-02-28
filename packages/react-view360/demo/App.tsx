import React, { useMemo } from "react";
import View360, { EquirectProjection } from "../src";
import "./App.css";
import "@egjs/view360/css/view360.min.css";

export default () => {
  const projection = useMemo(() => new EquirectProjection({
    src: "https://iili.io/HGJXGLl.jpg"
  }), []);

  return <View360
    projection={projection}
    className="is-3by1" />;
};
