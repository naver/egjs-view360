import { SpinViewerOptions, SpinViewerEvent } from "./SpinViewer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SPINVIEWER_OPTIONS: { [key in keyof SpinViewerOptions]: true } = {
  imageUrl: true,
  rowCount: true,
  colCount: true,
  width: true,
  height: true,
  autoHeight: true,
  colRow: true,
  scale: true,
  frameIndex: true,
  wrapperClass: true,
  imageClass: true
};

export const SPINVIEWER_EVENTS: {
  [key: string]: keyof SpinViewerEvent;
} = {
  LOAD: "load",
  IMAGE_ERROR: "imageError",
  CHANGE: "change",
  ANIMATION_END: "animationEnd"
};

export const DEFAULT_WRAPPER_CLASS = "view360-wrapper";
export const DEFAULT_IMAGE_CLASS = "view360-image";
