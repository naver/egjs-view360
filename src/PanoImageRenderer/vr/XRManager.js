const XR_REFERENCE_SPACE = "local";

export default class XRManager {
	get context() { return this._xrSession; }

	constructor() {
		this._xrSession = null;
		this._xrLayer = null;
		this._xrRefSpace = null;
		this._presenting = false;
		this._animationCallback = null;
	}

	destroy = () => {
		const xrSession = this._xrSession;

		this.removeEndCallback(this.destroy);

		if (xrSession) {
			// Capture to avoid errors
			xrSession.end().then(() => {}, () => {});
		}

		this._xrSession = null;
		this._xrLayer = null;
		this._xrRefSpace = null;
		this._presenting = false;
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

			return {
				viewport: [viewport.x, viewport.y, viewport.width, viewport.height],
				mvMatrix: view.transform.inverse.matrix,
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
			return session.requestReferenceSpace(XR_REFERENCE_SPACE).then(refSpace => {
				this._setSession(session, xrLayer, refSpace);
			});
		});
	}

	_setSession(session, xrLayer, refSpace) {
		this._xrSession = session;
		this._xrLayer = xrLayer;
		this._xrRefSpace = refSpace;
		this._presenting = true;
		this.addEndCallback(this.destroy);
	}
}
