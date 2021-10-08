import { PanoViewer, withPanoViewerMethods } from "@egjs/view360";

export default class PanoViewerInterface {
  @withPanoViewerMethods protected _vanillaPanoViewer: PanoViewer | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface PanoViewerInterface extends PanoViewer { }
