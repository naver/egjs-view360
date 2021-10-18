import { SpinViewer, withSpinViewerMethods } from "@egjs/view360";

export default class SpinViewerInterface {
  @withSpinViewerMethods protected _vanillaSpinViewer: SpinViewer | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface SpinViewerInterface extends SpinViewer { }
