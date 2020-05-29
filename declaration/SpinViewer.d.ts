import Component from "@egjs/component";

declare class SpinViewer extends Component {
  static VERSION: string;
  constructor(element: HTMLElement, param: Partial<{
    imageUrl: string;
    rowCount: number;
    colCount: number;
    width: number | string;
    height: number | string;
    autoHeight: boolean;
    colRow: number[];
    scale: number;
  }>);
  getAngle(): number;
  getScale(): number;
  setScale(scale: number): this;
  spinBy(angle: number, param?: Partial<{ duration: number }>): this;
  spinTo(angle: number, param?: Partial<{ duration: number }>): this;
}

export default SpinViewer;
