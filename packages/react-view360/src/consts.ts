/*
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { PanoViewerProps, SpinViewerProps } from "./types";

export const PANOVIEWER_DEFAULT_PROPS: PanoViewerProps = {
  tag: "div",
  onReady: () => {},
  onViewChange: () => {},
  onAnimationEnd: () => {},
  onError: () => {}
};

export const SPINVIEWER_DEFAULT_PROPS: SpinViewerProps = {
  tag: "div",
  onLoad: () => {},
  onImageError: () => {},
  onChange: () => {},
  onAnimationEnd: () => {}
};
