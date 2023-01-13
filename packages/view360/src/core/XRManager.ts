import { mat4 } from "gl-matrix";
import Component from "@egjs/component";
import WebGLContext from "./WebGLContext";
import GyroControl from "../control/GyroControl";
import * as BROWSER from "../const/browser";
import { SESSION_VR, XR_REFERENCE_SPACE } from "../const/internal";
import { EVENTS } from "../const/external";

interface XRSessionOptions extends XRSessionInit {
  [key: string]: any;
}

/**
 * WebXR manager class
 * @ko WebXR 매니저 클래스
 * @since 4.0.0
 */
class XRManager extends Component<{
  /**
   * An event that fires on entering VR session
   * @ko VR 세션 진입시에 트리거되는 이벤트
   * @eventName vrStart
   * @eventOf XRManager
   * @version 4.0.0
   */
  [EVENTS.VR_START]: {
    session: XRSession;
  };
  /**
   * An event that fires on exiting VR session
   * @ko VR 세션에서 나갈 때 트리거되는 이벤트
   * @eventName vrEnd
   * @eventOf XRManager
   * @version 4.0.0
   */
  [EVENTS.VR_END]: void;
}> {
  private _ctx: WebGLContext;
  private _xrSession: XRSession | null;
  private _xrRefSpace: XRReferenceSpace | null;
  private _options: XRSessionOptions;

  /**
   * Create new instance.
   * 새 인스턴스를 생성합니다.
   * @param ctx - Instance of WebGL context helper {@ko WebGL 콘텍스트 헬퍼의 인스턴스}
   * @param options - Options {@ko 옵션들}
   */
  public constructor(ctx: WebGLContext, options: XRSessionOptions = {}) {
    super();

    this._xrSession = null;
    this._xrRefSpace = null;
    this._ctx = ctx;
    this._options = options;
  }

  /**
   * Destroy instance and end XR session if there was any.
   * @ko 인스턴스를 제거하고, XR 세션이 존재할 경우 종료합니다.
   * @since 4.0.0
   */
  public destroy = () => {
    this.exit();
    this.off();
  };

  /**
   * Returns WebXR availability.
   * @ko WebXR 사용 가능 여부를 반환합니다.
   * @since 4.0.0
   */
  public async isAvailable(): Promise<boolean> {
    // eslint-disable-next-line compat/compat
    const xr = window.navigator.xr;
    if (!xr) return false;

    return xr.isSessionSupported(SESSION_VR)
      .then(available => {
        return available;
      }).catch(() => {
        return false;
      });
  }

  /**
   * Enter VR session
   * @ko VR 세션에 진입합니다.
   * @since 4.0.0
   */
  public async enter() {
    const ctx = this._ctx;

    // eslint-disable-next-line compat/compat
    const xr = window.navigator.xr;
    if (!xr) return;

    await GyroControl.requestSensorPermission();

    const options = {
      ...{
        requiredFeatures: [XR_REFERENCE_SPACE]
      },
      ...this._options
    };

    await ctx.makeXRCompatible();

    const session = await xr.requestSession(SESSION_VR, options);
    ctx.bindXRLayer(session);

    const refSpace = await session.requestReferenceSpace(XR_REFERENCE_SPACE);

    this._setSession(session, refSpace);

    this.trigger(EVENTS.VR_START, {
      session
    });
  }

  /**
   * Exit VR session
   * @ko VR 세션에서 나갑니다.
   * @since 4.0.0
   */
  public exit() {
    const xrSession = this._xrSession;

    if (xrSession) {
      xrSession.end()
        .catch(() => void 0);
    }

    this._xrSession = null;
    this._xrRefSpace = null;
  }

  /**
   * @hidden
   */
  public canRender(frame: XRFrame) {
    const refSpace = this._xrRefSpace;

    if (!refSpace) return false;

    const pose = frame.getViewerPose(refSpace);

    return !!pose;
  }

  /**
   * @hidden
   */
  public getEyeParams(frame: XRFrame): Array<{
    viewport: XRViewport;
    vMatrix: mat4;
    pMatrix: mat4;
  }> | null {
    const session = frame.session;
    const pose = frame.getViewerPose(this._xrRefSpace!);

    if (!pose) return null;

    const glLayer = session.renderState.baseLayer;

    if (!glLayer) return null;

    return pose.views.map(view => {
      const viewport = glLayer.getViewport(view)!;
      const vMatrix = view.transform.inverse.matrix;

      return {
        viewport,
        vMatrix,
        pMatrix: view.projectionMatrix
      };
    });
  }

  private _setSession(session: XRSession, refSpace: XRReferenceSpace) {
    this._xrSession = session;
    this._xrRefSpace = refSpace;

    session.addEventListener(BROWSER.EVENTS.XR_END, this._onSessionEnd);
  }

  private _onSessionEnd = () => {
    this.exit();
    this.trigger(EVENTS.VR_END);
  }
}

export default XRManager;
