import {expect} from "chai";
import sinon from "sinon";
import {mat4, vec3, quat} from "gl-matrix";
import XRManagerInjector from "inject-loader!../../../../src/PanoImageRenderer/vr/XRManager"; // eslint-disable-line import/no-duplicates
import XRManager from "../../../../src/PanoImageRenderer/vr/XRManager";

describe("XRManager", () => {
	let xrRefSpaceStub;
	let xrSessionStub;
	let xrFrameStub;
	let xrWebGLLayerStub;
	let reqSessionStub;
	let canvas;
	let gl;

	before(() => {
		/* Ensure that XR Polyfill exists */
		// eslint-disable-next-line no-new
		new window.WebXRPolyfill();

		// I have to stub almost everything in WebXR as they need user interaction to be enabled.
		canvas = document.createElement("canvas");
		gl = canvas.getContext("webgl", {
			xrCompatible: true
		});

		const fakeLayer = {
			framebuffer: gl.createFramebuffer(),
			getViewport: view => {
				const halfWidth = gl.drawingBufferWidth / 2;
				const height = gl.drawingBufferHeight;

				return view.eye === "left" ?
					[0, 0, halfWidth, height] :
					[halfWidth, 0, halfWidth, height];
			}
		};
		const fakePose = () => ({
			position: vec3.create(),
			orientation: quat.create(),
			matrix: mat4.create(),
		});
		// CAUTION: Not an actual inverted values
		// Just make sure they are different from normal fakePose
		const fakeInvPose = () => ({
			position: vec3.fromValues(-1, 0, 0),
			orientation: quat.fromValues(1, 0, 0, 1),
			matrix: mat4.fromXRotation(mat4.create(), Math.PI / 2),
		});
		const fakeTransform = () => ({
			...fakePose(),
			inverse: fakeInvPose(),
		});

		// Stub for XRReferenceSpace(https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace)
		xrRefSpaceStub = sinon.stub(window, "XRReferenceSpace");

		// Stub for XRSession(https://developer.mozilla.org/en-US/docs/Web/API/XRSession)
		xrSessionStub = sinon.stub(window, "XRSession");
		xrSessionStub.returns({
			renderState: {
				baseLayer: fakeLayer,
			},
			updateRenderState: sinon.fake(),
			requestReferenceSpace: async () => xrRefSpaceStub(),
			addEventListener: sinon.fake(),
			removeEventListener: sinon.fake(),
			end: async () => sinon.fake(),
		});

		// Stub for XRFrame(https://developer.mozilla.org/en-US/docs/Web/API/XRFrame)
		xrFrameStub = sinon.stub(window, "XRFrame");
		xrFrameStub.returns({
			session: xrSessionStub(),
			getViewerPose: () => ({
				views: [
					{
						eye: "left",
						projectionMatrix: mat4.create(),
						transform: fakeTransform(),
					},
					{
						eye: "right",
						projectionMatrix: mat4.create(),
						transform: fakeTransform(),
					}
				],
			}),
		});

		xrWebGLLayerStub = sinon.stub(window, "XRWebGLLayer");
		xrWebGLLayerStub.returns(fakeLayer);

		// Stub for XR.requestSession(https://developer.mozilla.org/en-US/docs/Web/API/XR/requestSession)
		reqSessionStub = sinon.stub(navigator.xr, "requestSession");
		reqSessionStub.returns(Promise.resolve(xrSessionStub()));
	});

	after(() => {
		xrRefSpaceStub.restore();
		xrSessionStub.restore();
		xrFrameStub.restore();
		xrWebGLLayerStub.restore();
		reqSessionStub.restore();
	});

	it("should bind to default framebuffer before render", async () => {
		// Given
		const xrManager = new XRManager();

		// When
		const beforePresentFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);

		xrManager.beforeRender(gl, xrFrameStub());

		const afterPresentFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);

		// Then
		expect(beforePresentFramebuffer).to.be.null; // Default framebuffer
		expect(afterPresentFramebuffer).not.to.be.null;
	});

	it("can render only when frame has a pose", () => {
		// Given
		const xrManager = new XRManager();

		// When
		const frameWithPose = xrFrameStub();
		const frameWithoutPose = {getViewerPose: sinon.fake()};

		const canRenderWithPose = xrManager.canRender(frameWithPose);
		const canRenderWithoutPose = xrManager.canRender(frameWithoutPose);

		// Then
		expect(canRenderWithPose).to.be.true;
		expect(canRenderWithoutPose).to.be.false;
	});

	it("can attach end callback to session", async () => {
		// Given
		const xrManager = new XRManager();
		const fakeCallback = sinon.fake();

		await xrManager.requestPresent(canvas, gl);
		const session = xrManager.context;

		session.addEventListener.resetHistory();

		// When
		xrManager.addEndCallback(fakeCallback);

		// Then
		expect(session.addEventListener.calledOnceWith("end", fakeCallback)).to.be.true;
	});

	it("can remove end callback in session", async () => {
		// Given
		const xrManager = new XRManager();
		const fakeCallback = sinon.fake();

		await xrManager.requestPresent(canvas, gl);
		const session = xrManager.context;

		session.addEventListener.resetHistory();
		session.removeEventListener.resetHistory();

		// When
		xrManager.addEndCallback(fakeCallback);
		xrManager.removeEndCallback(fakeCallback);

		// Then
		expect(session.addEventListener.calledOnceWith("end", fakeCallback)).to.be.true;
		expect(session.removeEventListener.calledOnceWith("end", fakeCallback)).to.be.true;
		expect(session.removeEventListener.calledAfter(session.addEventListener)).to.be.true;
	});

	it("should attach destroy callback after present", async () => {
		// Given
		const xrManager = new XRManager();
		const addEndCallbackSpy = sinon.spy(xrManager, "addEndCallback");

		// When
		await xrManager.requestPresent(canvas, gl);

		// Then
		expect(addEndCallbackSpy.calledOnceWith(xrManager.destroy)).to.be.true;
	});

	it("should use inverted mv matrix in frame pose", async () => {
		// Given
		const xrManager = new XRManager();
		const xrFrame = xrFrameStub();
		const expectedViews = xrFrame.getViewerPose().views;
		const expectedMatrixLeft = mat4.clone(expectedViews[0].transform.inverse.matrix);
		const expectedMatrixRight = mat4.clone(expectedViews[1].transform.inverse.matrix);

		// When
		const eyeParams = xrManager.getEyeParams(gl, xrFrame);

		// Then
		expect(eyeParams[0].mvMatrix).deep.equals(expectedMatrixLeft);
		expect(eyeParams[1].mvMatrix).deep.equals(expectedMatrixRight);
	});

	it("should rotate mvMatrix by 180 deg on Desktop safari / iPad Pro 13+", () => {
		// Given
		const XRManagerOnDesktopSafari = XRManagerInjector({
			"../../utils/browser": {
				IS_SAFARI_ON_DESKTOP: true,
			}
		}).default;
		const xrManager = new XRManagerOnDesktopSafari();
		const xrFrame = xrFrameStub();
		const origViews = xrFrame.getViewerPose().views;
		const origInvMatrixLeft = mat4.clone(origViews[0].transform.inverse.matrix);
		const origInvMatrixRight = mat4.clone(origViews[1].transform.inverse.matrix);

		// When
		const eyeParams = xrManager.getEyeParams(gl, xrFrame);

		// Then
		const expectedMatrixLeft = mat4.rotateX(mat4.create(), origInvMatrixLeft, Math.PI);
		const expectedMatrixRight = mat4.rotateX(mat4.create(), origInvMatrixRight, Math.PI);

		expect(eyeParams[0].mvMatrix.every(
			(val, idx) => val === expectedMatrixLeft[idx]
		)).to.be.true;
		expect(eyeParams[1].mvMatrix.every(
			(val, idx) => val === expectedMatrixRight[idx]
		)).to.be.true;
	});

	it("should rotate model-view matrix to yaw offset", () => {
		// Given
		const xrManager = new XRManager();
		const xrFrame = xrFrameStub();
		const offset = Math.PI;
		const expectedViews = xrFrame.getViewerPose().views;
		const expectedMatrixLeft = mat4.rotateY(
			mat4.create(), expectedViews[0].transform.inverse.matrix, offset
		);
		const expectedMatrixRight = mat4.rotateY(
			mat4.create(), expectedViews[1].transform.inverse.matrix, offset
		);

		// When
		const eyeParamsWithoutYawOffset = xrManager.getEyeParams(gl, xrFrame);

		xrManager.setYawOffset(offset);

		const eyeParamsWithYawOffset = xrManager.getEyeParams(gl, xrFrame);

		// Then
		expect(eyeParamsWithoutYawOffset[0].mvMatrix).not.equals(expectedMatrixLeft);
		expect(eyeParamsWithoutYawOffset[1].mvMatrix).not.equals(expectedMatrixRight);
		expect(eyeParamsWithYawOffset[0].mvMatrix).deep.equals(expectedMatrixLeft);
		expect(eyeParamsWithYawOffset[1].mvMatrix).deep.equals(expectedMatrixRight);
	});

	it("should remove destroy end callback on destroy", () => {
		// Given
		const xrManager = new XRManager();
		const removeCallbackSpy = sinon.spy(xrManager, "removeEndCallback");

		// When
		xrManager.destroy();

		// Then
		expect(removeCallbackSpy.calledOnceWith(xrManager.destroy));
	});

	it("should end session if it still have XR session on destroy", async () => {
		// Given
		const xrManager = new XRManager();

		await xrManager.requestPresent(canvas, gl);
		const session = xrManager.context;
		const endStub = sinon.stub(session, "end");

		endStub.returns(Promise.resolve());

		// When
		const sessionPresentsBeforeDestroy = Boolean(session);

		xrManager.destroy();

		// Then
		expect(sessionPresentsBeforeDestroy).to.be.true;
		expect(endStub.calledOnce).to.be.true;
	});

	it("should reset yaw offset after destroy", async () => {
		// Given
		const xrManager = new XRManager();
		const xrFrame = xrFrameStub();
		const offset = Math.PI / 2;
		const expectedViews = xrFrame.getViewerPose().views;
		const expectedWithOffset = expectedViews.map(view => ({
			mvMatrix: mat4.rotateY(
				mat4.create(), view.transform.inverse.matrix, offset
			),
		}));
		const expectedWithoutOffset = expectedViews.map(view => ({
			mvMatrix: mat4.clone(view.transform.inverse.matrix),
		}));

		await xrManager.requestPresent(canvas, gl);
		xrManager.setYawOffset(offset);
		const eyeParamsWithOffset = xrManager.getEyeParams(gl, xrFrame).map(param => ({
			mvMatrix: mat4.clone(param.mvMatrix),
		}));

		// When
		xrManager.destroy();

		await xrManager.requestPresent(canvas, gl); // re-activate
		const eyeParamsWithoutOffset = xrManager.getEyeParams(gl, xrFrame).map(param => ({
			mvMatrix: mat4.clone(param.mvMatrix),
		}));

		// Then
		expect(eyeParamsWithOffset[0].mvMatrix)
			.deep.equals(expectedWithOffset[0].mvMatrix);
		expect(eyeParamsWithOffset[1].mvMatrix)
			.deep.equals(expectedWithOffset[1].mvMatrix);
		expect(eyeParamsWithoutOffset[0].mvMatrix)
			.deep.equals(expectedWithoutOffset[0].mvMatrix);
		expect(eyeParamsWithoutOffset[1].mvMatrix)
			.deep.equals(expectedWithoutOffset[1].mvMatrix);
	});
});
