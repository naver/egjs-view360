import Component from "@egjs/component";

declare class SpinViewer {
  constructor(element: HTMLElement, param: object);
  getAngle(): number;
  getScale(): number;
  setScale(scale: number): this;
  spinBy(angle: number, param?: object): this;
  spinTo(angle: number, param?: object): this;
}

export default SpinViewer;