/*
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { PanoViewerProps } from "./types";

export const DEFAULT_PROPS: PanoViewerProps = {
  tag: "div",
  onReady: () => {},
  onViewChange: () => {},
  onAnimationEnd: () => {},
  onError: () => {}
};
