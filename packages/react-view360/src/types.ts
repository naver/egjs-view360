/*
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ReactPanoViewer from "./PanoViewer";
import { AnimationEndEvent, ErrorEvent, ReadyEvent, ViewChangeEvent } from "~/index";

export interface PanoViewerProps {
  tag: keyof JSX.IntrinsicElements;
  onReady: (evt: ReadyEvent<ReactPanoViewer>) => any;
  onViewChange: (evt: ViewChangeEvent<ReactPanoViewer>) => any;
  onAnimationEnd: (evt: AnimationEndEvent<ReactPanoViewer>) => any;
  onError: (evt: ErrorEvent<ReactPanoViewer>) => any;
  [key: string]: any;
}
