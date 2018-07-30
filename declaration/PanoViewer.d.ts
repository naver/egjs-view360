import Component from "@egjs/component";

declare class PanoViewer extends Component {
  constructor(container: HTMLElement, param: object);
  destroy(): this;
  getFov(): number;
  getFovRange(): number[];
  getImage(): HTMLImageElement|object;
  getPitch(): number;
  getPitchRange(): number[];
  getProjectionType(): string;
  getTouchDirection(): number;
  getVideo(): HTMLVideoElement;
  getYaw(): number;
  getYawRange(): number[];
  keepUpdate(doUpdate: boolean): this;
  lookAt(orientation: object, duration?: number): this;
  setFovRange(range: number[]): this;
  setGyroMode(gyroMode: string): this;
  setImage(image: string | HTMLImageElement | object, param?: object): this;
  setPitchRange(pitchRange: number[]): this;
  setShowPolePoint(showPolePoint: boolean): this;
  setTouchDirection(direction: number): this;
  setUseKeyboard(useKeyboard: boolean): this;
  setUseZoom(useZoom: boolean): this;
  setVideo(video: string | HTMLVideoElement | object, param?: object): this;
  setYawRange(yawRange: number[]): this;
  updateViewportDimensions(size?: object): this;
}

export default PanoViewer;