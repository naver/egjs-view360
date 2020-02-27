import {mat4, glMatrix} from "gl-matrix";
import {IS_SAFARI_ON_DESKTOP} from "../../utils/browser";

const XR_REFERENCE_SPACE = "local";

class XRManager {
	get context() { return this._xrSession; }

	constructor() {
		this._clear();
	}

	destroy = () => {
		const xrSession = this._xrSession;

		this.removeEndCallback(this.destroy);

		if (xrSession) {
			// Capture to avoid errors
			xrSession.end().then(() => {}, () => {});
		}
		this._clear();
	}

	canRender(frame) {
		const pose = frame.getViewerPose(this._xrRefSpace);

		return Boolean(pose);
	}

	beforeRender(gl, frame) {
		const session = frame.session;
		const baseLayer = session.renderState.baseLayer;

		gl.bindFramebuffer(gl.FRAMEBUFFER, baseLayer.framebuffer);
	}

	afterRender() {}

	getEyeParams(gl, frame) {
		const session = frame.session;
		const pose = frame.getViewerPose(this._xrRefSpace);

		if (!pose) {
			// Can't render
			return null;
		}

		const glLayer = session.renderState.baseLayer;

		return pose.views.map(view => {
			const viewport = glLayer.getViewport(view);
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

	isPresenting() {
		return this._presenting;
	}

	addEndCallback(callback) {
		const session = this._xrSession;

		if (!session) return;

		session.addEventListener("end", callback);
	}

	removeEndCallback(callback) {
		const session = this._xrSession;

		if (!session) return;

		session.removeEventListener("end", callback);
	}

	requestPresent(canvas, gl) {
		return navigator.xr.requestSession("immersive-vr", {
			requiredFeatures: [XR_REFERENCE_SPACE],
		}).then(session => {
			const xrLayer = new window.XRWebGLLayer(session, gl);

			session.updateRenderState({baseLayer: xrLayer});
			return session.requestReferenceSpace(XR_REFERENCE_SPACE)
				.then(refSpace => {
					this._setSession(session, xrLayer, refSpace);
				});
		});
	}

	setYawOffset(offset) {
		this._yawOffset = offset;
	}

	_setSession(session, xrLayer, refSpace) {
		this._xrSession = session;
		this._xrLayer = xrLayer;
		this._xrRefSpace = refSpace;
		this._presenting = true;
		this.addEndCallback(this.destroy);
	}

	_clear() {
		this._xrSession = null;
		this._xrLayer = null;
		this._xrRefSpace = null;
		this._presenting = false;
		this._yawOffset = 0;
	}
}

export default XRManager;
