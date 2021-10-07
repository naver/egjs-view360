/*
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ReactPanoViewer from "./PanoViewer";
import ReactSpinViewer from "./SpinViewer";
import {
  AnimationEndEvent,
  ChangeEvent,
  ErrorEvent,
  ImageErrorEvent,
  LoadEvent,
  ReadyEvent,
  ViewChangeEvent
} from "@egjs/view360";

export interface PanoViewerProps {
  tag: keyof JSX.IntrinsicElements;
  onReady: (evt: ReadyEvent<ReactPanoViewer>) => any;
  onViewChange: (evt: ViewChangeEvent<ReactPanoViewer>) => any;
  onAnimationEnd: (evt: AnimationEndEvent<ReactPanoViewer>) => any;
  onError: (evt: ErrorEvent<ReactPanoViewer>) => any;
  [key: string]: any;
}

export interface SpinViewerProps {
  tag: keyof JSX.IntrinsicElements;
  onLoad: (evt: LoadEvent<ReactSpinViewer>) => any;
  onImageError: (evt: ImageErrorEvent<ReactSpinViewer>) => any;
  onChange: (evt: ChangeEvent<ReactSpinViewer>) => any;
  onAnimationEnd: (evt: AnimationEndEvent<ReactSpinViewer>) => any;
  [key: string]: any;
}
