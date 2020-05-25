import Component from "@egjs/component";

type ValueOf<V> = V[keyof V];

interface PanoErrorType {
  INVALID_DEVICE: number;
  NO_WEBGL: number;
  FAIL_IMAGE_LOAD: number;
  FAIL_BIND_TEXTURE: number;
  INVALID_RESOURCE: number;
  RENDERING_CONTEXT_LOST: number;
}

interface PanoEvents {
  READY: string;
  VIEW_CHANGE: string;
  ANIMATION_END: string;
  ERROR: string;
}

interface ProjectionType {
  EQUIRECTANGULAR: string;
  CUBEMAP: string;
  CUBESTRIP: string;
  PANORAMA: string;
  STEREOSCOPIC_EQUI: string;
}

interface CubemapConfig {
  order: string;
  tileConfig: {
    flipHorizontal: boolean;
    rotation: number;
  }
}

interface GyroMode {
  NONE: string;
  YAWPITCH: string;
  VR: string;
}

interface StereoFormat {
  TOP_BOTTOM: string;
  LEFT_RIGHT: string;
  NONE: string;
}

interface TouchDirection {
  NONE: number;
  YAW: number;
  PITCH: number;
  ALL: number;
}

interface PanoOptions {
  image: string | HTMLImageElement;
  video: string | HTMLVideoElement;
  projectionType: ValueOf<ProjectionType>;
  cubemapConfig: CubemapConfig;
  stereoFormat: ValueOf<StereoFormat>;
  width: number;
  height: number;
  yaw: number;
  pitch: number;
  fov: number;
  showPolePoint: boolean;
  useZoom: boolean;
  useKeyboard: boolean;
  gyroMode: ValueOf<GyroMode>;
  yawRange: number[];
  pitchRange: number[];
  fovRange: number[];
  touchDirection: ValueOf<TouchDirection>;
}

declare class PanoViewer extends Component {
  static VERSION: string;
  static ERROR_TYPE: PanoErrorType;
  static EVENTS: PanoEvents;
  static PROJECTION_TYPE: ProjectionType;
  static ProjectionType: ProjectionType;
  static GYRO_MODE: GyroMode;
  static STEREO_FORMAT: StereoFormat;
  static TOUCH_DIRECTION: TouchDirection;

  static isSupported(): boolean;
  static isWebGLAvailable(): boolean;
  static isGyroSensorAvailable(callback: (isAvailable: boolean) => any): void;

  constructor(container: HTMLElement, param?: Partial<PanoOptions>);
  destroy(): this;
  getFov(): number;
  getFovRange(): number[];
  getImage(): HTMLImageElement | null;
  getPitch(): number;
  getPitchRange(): number[];
  getProjectionType(): string;
  getTouchDirection(): number;
  getVideo(): HTMLVideoElement | null;
  getYaw(): number;
  getYawRange(): number[];
  keepUpdate(doUpdate: boolean): this;
  lookAt(orientation: object, duration?: number): this;
  setFovRange(range: number[]): this;
  setGyroMode(gyroMode: string): this;
  setImage(image: string | HTMLImageElement | object, param?: Partial<{
    projectionType: ValueOf<ProjectionType>;
    cubemapConfig: CubemapConfig;
    stereoFormat: ValueOf<StereoFormat>;
  }>): this;
  setPitchRange(pitchRange: number[]): this;
  setShowPolePoint(showPolePoint: boolean): this;
  setTouchDirection(direction: number): this;
  setUseKeyboard(useKeyboard: boolean): this;
  setUseZoom(useZoom: boolean): this;
  setVideo(video: string | HTMLVideoElement | object, param?: Partial<{
    projectionType: ValueOf<ProjectionType>;
    cubemapConfig: CubemapConfig;
    stereoFormat: ValueOf<StereoFormat>;
  }>): this;
  setYawRange(yawRange: number[]): this;
  updateViewportDimensions(size?: Partial<{
    width: number;
    height: number;
  }>): this;
  enableSensor(): Promise<string>;
  disableSensor(): this;
  enterVR(): Promise<string>;
  exitVR(): this;
}

export default PanoViewer;
