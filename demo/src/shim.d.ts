import React from "react";
import { PanoViewerElement, PanoViewerOptions, SpinViewerElement, SpinViewerOptions } from "../../src";

// Definitions to let TS understand .vs, .fs, .glsl shader files
declare module "*.module.css" {
  const value: Record<string, any>;
  export default value;
}
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare global {
  interface HTMLElementTagNameMap {
    "pano-viewer": PanoViewerElement;
    "spin-viewer": SpinViewerElement;
  }

  interface PanoAttributes extends React.HTMLAttributes<HTMLDivElement>, Partial<PanoViewerOptions> {
    ref: React.LegacyRef<PanoViewerElement>;
  }

  namespace JSX {
    interface IntrinsicElements {
      "pano-viewer": PanoAttributes;
      "spin-viewer": Partial<SpinViewerOptions> & React.HTMLAttributes<HTMLDivElement>;
    }
  }
}
