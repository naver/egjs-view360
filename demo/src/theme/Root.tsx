import React from "react";
import PanoViewerElement from "../../../src/PanoViewerElement";
import SpinViewerElement from "../../../src/SpinViewerElement";

customElements.define("pano-viewer", PanoViewerElement);
customElements.define("spin-viewer", SpinViewerElement);

// Default implementation, that you can customize
export default function Root({ children }) {
  return <>{children}</>;
}
