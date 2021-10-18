import Promise from "promise-polyfill";
import { mat4 } from "gl-matrix";

const VR_DISPLAY_PRESENT_CHANGE = "vrdisplaypresentchange";
const DEFAULT_LEFT_BOUNDS = [0, 0, 0.5, 1];
const DEFAULT_RIGHT_BOUNDS = [0.5, 0, 0.5, 1];
const EYES = {
  LEFT: "left",
  RIGHT: "right"
} as const;

class VRManager {
  private _vrDisplay: VRDisplay | null;
  private _frameData: VRFrameData;
  private _yawOffset: number;
  private _leftBounds: number[];
  private _rightBounds: number[];

  public constructor() {
    this._frameData = new window.VRFrameData();
    this._clear();
  }

  public get context() { return this._vrDisplay; }

  public destroy = () => {
    const vrDisplay = this._vrDisplay;

    this.removeEndCallback(this.destroy);

    if (vrDisplay && vrDisplay.isPresenting) {
      void vrDisplay.exitPresent();
    }

    this._clear();
  };

  public canRender() {
    return Boolean(this._vrDisplay);
  }

  public beforeRender(gl: WebGLRenderingContext) {
    // Render to the default backbuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  public afterRender() {
    this._vrDisplay!.submitFrame();
  }

  public getEyeParams(gl: WebGLRenderingContext) {
    const display = this._vrDisplay!;
    const halfWidth = gl.drawingBufferWidth * 0.5;
    const height = gl.drawingBufferHeight;
    const frameData = this._frameData;

    display.getFrameData(frameData);

    const leftMVMatrix = frameData.leftViewMatrix;
    const rightMVMatrix = frameData.rightViewMatrix;

    mat4.rotateY(leftMVMatrix, leftMVMatrix, this._yawOffset);
    mat4.rotateY(rightMVMatrix, rightMVMatrix, this._yawOffset);

    return [
      {
        viewport: [0, 0, halfWidth, height],
        mvMatrix: leftMVMatrix,
        pMatrix: frameData.leftProjectionMatrix
      },
      {
        viewport: [halfWidth, 0, halfWidth, height],
        mvMatrix: rightMVMatrix,
        pMatrix: frameData.rightProjectionMatrix
      }
    ];
  }

  public isPresenting() {
    return Boolean(this._vrDisplay && this._vrDisplay.isPresenting);
  }

  public addEndCallback(callback: (evt?: Event) => any) {
    window.addEventListener(VR_DISPLAY_PRESENT_CHANGE, callback);
  }

  public removeEndCallback(callback: (evt?: Event) => any) {
    window.removeEventListener(VR_DISPLAY_PRESENT_CHANGE, callback);
  }

  public requestPresent(canvas: HTMLCanvasElement) {
    return navigator.getVRDisplays().then(displays => {
      const vrDisplay = displays.length && displays[0];

      if (!vrDisplay) {
        return Promise.reject(new Error("No displays available."));
      }
      if (!vrDisplay.capabilities.canPresent) {
        return Promise.reject(new Error("Display lacking capability to present."));
      }

      return vrDisplay.requestPresent([{source: canvas}]).then(() => {
        const leftEye = vrDisplay.getEyeParameters(EYES.LEFT);
        const rightEye = vrDisplay.getEyeParameters(EYES.RIGHT);

        canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
        canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);

        this._setDisplay(vrDisplay);
      });
    });
  }

  public setYawOffset(offset: number) {
    this._yawOffset = offset;
  }

  private _setDisplay(vrDisplay: VRDisplay) {
    this._vrDisplay = vrDisplay;

    const layers = vrDisplay.getLayers();

    if (layers.length) {
      const layer = layers[0];

      this._leftBounds = layer.leftBounds as number[];
      this._rightBounds = layer.rightBounds as number[];
    }

    this.addEndCallback(this.destroy);
  }

  private _clear() {
    this._vrDisplay = null;
    this._leftBounds = DEFAULT_LEFT_BOUNDS;
    this._rightBounds = DEFAULT_RIGHT_BOUNDS;
    this._yawOffset = 0;
  }
}

export default VRManager;
