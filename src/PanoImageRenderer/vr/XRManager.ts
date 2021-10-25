import { mat4, glMatrix } from "gl-matrix";
import { XRFrame, XRLayer, XRReferenceSpace, XRSession, XRSessionInit } from "webxr";

import { IS_SAFARI_ON_DESKTOP } from "../../utils/browser";
import { merge } from "../../utils/utils";

const XR_REFERENCE_SPACE = "local";

interface XRSessionOptions extends XRSessionInit {
  [key: string]: any;
}

class XRManager {
  private _xrSession: XRSession | null;
  private _xrLayer: XRLayer | null;
  private _xrRefSpace: XRReferenceSpace | null;
  private _options: XRSessionOptions;
  private _yawOffset: number;
  private _presenting: boolean;

  public constructor(options: XRSessionOptions = {}) {
    this._clear();
    this._options = options;
  }

  public get context() { return this._xrSession; }

  public destroy = () => {
    const xrSession = this._xrSession;

    this.removeEndCallback(this.destroy);

    if (xrSession) {
      // Capture to avoid errors
      xrSession.end().then(() => void 0, () => void 0);
    }
    this._clear();
  };

  public canRender(frame: XRFrame) {
    const pose = frame.getViewerPose(this._xrRefSpace!);

    return Boolean(pose);
  }

  public beforeRender(gl: WebGLRenderingContext, frame: XRFrame) {
    const session = frame.session;
    const baseLayer = session.renderState.baseLayer;

    gl.bindFramebuffer(gl.FRAMEBUFFER, baseLayer!.framebuffer);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public afterRender() {}

  public getEyeParams(gl: WebGLRenderingContext, frame: XRFrame) {
    const session = frame.session;
    const pose = frame.getViewerPose(this._xrRefSpace!);

    if (!pose) {
      // Can't render
      return null;
    }

    const glLayer = session.renderState.baseLayer;

    return pose.views.map(view => {
      const viewport = glLayer!.getViewport(view);
      const mvMatrix = view.transform.inverse.matrix;

      if (IS_SAFARI_ON_DESKTOP) {
        mat4.rotateX(mvMatrix, mvMatrix, glMatrix.toRadian(180));
      }

      mat4.rotateY(mvMatrix, mvMatrix, this._yawOffset);

      return {
        viewport: [viewport.x, viewport.y, viewport.width, viewport.height],
        mvMatrix,
        pMatrix: view.projectionMatrix
      };
    });
  }

  public isPresenting() {
    return this._presenting;
  }

  public addEndCallback(callback: (evt?: Event) => any) {
    this._xrSession?.addEventListener("end", callback);
  }

  public removeEndCallback(callback: (evt?: Event) => any) {
    this._xrSession?.removeEventListener("end", callback);
  }

  public async requestPresent(canvas: HTMLCanvasElement, gl: WebGLRenderingContext) {
    const options = merge({
      requiredFeatures: [XR_REFERENCE_SPACE]
    }, this._options);

    const attributes = gl.getContextAttributes();
    if (attributes && (attributes as any).xrCompatible !== true) {
      await (gl as any).makeXRCompatible();
    }

    return (navigator as any).xr.requestSession("immersive-vr", options).then(session => {
      const xrLayer = new (window as any).XRWebGLLayer(session, gl);

      session.updateRenderState({baseLayer: xrLayer});
      return session.requestReferenceSpace(XR_REFERENCE_SPACE)
        .then(refSpace => {
          this._setSession(session, xrLayer, refSpace);
        });
    });
  }

  public setYawOffset(offset: number) {
    this._yawOffset = offset;
  }

  private _setSession(session: XRSession, xrLayer: XRLayer, refSpace: XRReferenceSpace) {
    this._xrSession = session;
    this._xrLayer = xrLayer;
    this._xrRefSpace = refSpace;
    this._presenting = true;
    this.addEndCallback(this.destroy);
  }

  private _clear() {
    this._xrSession = null;
    this._xrLayer = null;
    this._xrRefSpace = null;
    this._presenting = false;
    this._yawOffset = 0;
    this._options = {};
  }
}

export default XRManager;
