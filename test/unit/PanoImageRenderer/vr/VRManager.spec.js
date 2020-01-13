import {expect} from "chai";
import sinon from "sinon";
import {mat4, vec3, quat, glMatrix} from "gl-matrix";
import VRManager from "../../../../src/PanoImageRenderer/vr/VRManager";

const VR_DISPLAY_PRESENT_CHANGE = "vrdisplaypresentchange";

describe("VRManager", () => {
	let reqPresentStub;
	let frameDataStub;

	before(() => {
		/* Ensure that VR Polyfill exists */
		window.WebVRConfig = {
			FORCE_ENABLE_VR: true,
		};

		// eslint-disable-next-line no-new
		new window.WebVRPolyfill();

		reqPresentStub = sinon.stub(window.VRDisplay.prototype, "requestPresent");
		reqPresentStub.returns(Promise.resolve());

		frameDataStub = sinon.stub(window.VRDisplay.prototype, "getFrameData");
		frameDataStub.callsFake(frameData => {
			frameData.leftProjectionMatrix = mat4.create();
			frameData.leftViewMatrix = mat4.create();
			frameData.rightProjectionMatrix = mat4.create();
			frameData.rightViewMatrix = mat4.create();
			frameData.pose = {
				position: vec3.create(),
				orientation: quat.create(),
			};
			frameData.timestamp = 0;
		});
	});

	after(() => {
		reqPresentStub.reset();
		frameDataStub.reset();
	});

	it("should bind to default framebuffer before render", () => {
		// Given
		const vrManager = new VRManager();
		// Prepare gl context bind with different framebuffer
		const canvas = document.createElement("canvas");
		const gl = canvas.getContext("webgl");
		const defaultFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
		const otherFramebuffer = gl.createFramebuffer();

		gl.bindFramebuffer(gl.FRAMEBUFFER, otherFramebuffer);
		const afterBindFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);

		// When
		vrManager.beforeRender(gl);

		// Then
		const currentFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);

		expect(afterBindFramebuffer).equals(otherFramebuffer);
		expect(currentFramebuffer).equals(defaultFramebuffer);
		expect(currentFramebuffer).not.equals(otherFramebuffer);
	});

	it("should submit frame after render", async () => {
		// Given
		const vrManager = new VRManager();
		const canvas = document.createElement("canvas");

		await vrManager.requestPresent(canvas);
		const vrDisplay = vrManager.context;
		const submitSpy = sinon.spy(vrDisplay, "submitFrame");

		// When
		vrManager.afterRender();

		// Then
		expect(submitSpy.calledOnce).to.be.true;
	});

	it("should make it renderable after it has vr display attached", async () => {
		// Given
		const vrManager = new VRManager();
		const renderableAfterInit = vrManager.canRender();
		const canvas = document.createElement("canvas");

		// When
		await vrManager.requestPresent(canvas);
		const isVRDisplayExistAfterPresent = !!vrManager.context;
		const renderableAfterPresent = vrManager.canRender();

		// Then
		expect(renderableAfterInit).to.be.false;
		expect(isVRDisplayExistAfterPresent).to.be.true;
		expect(renderableAfterPresent).to.be.true;
	});

	it("should attach end callback to window vrdisplaypresentchange event", () => {
		// Given
		const vrManager = new VRManager();
		const fakeCallback = sinon.fake();
		const addEventSpy = sinon.spy(window, "addEventListener");

		// When
		vrManager.addEndCallback(fakeCallback);

		// Then
		expect(addEventSpy.calledOnce).to.be.true;
		expect(addEventSpy.calledWith(VR_DISPLAY_PRESENT_CHANGE, fakeCallback)).to.be.true;
		addEventSpy.restore(); // reset window addEventListener
	});

	it("can remove window vrdisplaypresentchange end callback", () => {
		// Given
		const vrManager = new VRManager();
		const fakeCallback = sinon.fake();
		const removeEventSpy = sinon.spy(window, "removeEventListener");

		// When
		vrManager.addEndCallback(fakeCallback);
		vrManager.removeEndCallback(fakeCallback);

		// Then
		expect(removeEventSpy.calledOnce).to.be.true;
		expect(removeEventSpy.calledWith(VR_DISPLAY_PRESENT_CHANGE, fakeCallback)).to.be.true;
		removeEventSpy.restore(); // reset window removeEventListener
	});

	it("should attach destroy callback after present", async () => {
		// Given
		const vrManager = new VRManager();
		const canvas = document.createElement("canvas");
		const addEventSpy = sinon.spy(window, "addEventListener");

		// When
		await vrManager.requestPresent(canvas);

		// Then
		expect(addEventSpy.calledOnce).to.be.true;
		expect(addEventSpy.calledWith(VR_DISPLAY_PRESENT_CHANGE, vrManager.destroy)).to.be.true;
		addEventSpy.restore();
	});

	it("should return eye param viewport with half width of drawingBuffer", async () => {
		// Given
		const vrManager = new VRManager();
		const canvas = document.createElement("canvas");
		const gl = canvas.getContext("webgl");

		// When
		await vrManager.requestPresent(canvas);
		const eyeParams = vrManager.getEyeParams(gl);

		// Then
		const width = gl.drawingBufferWidth;
		const height = gl.drawingBufferHeight;

		expect(eyeParams[0].viewport).deep.equals([0, 0, width / 2, height]);
		expect(eyeParams[1].viewport).deep.equals([width / 2, 0, width / 2, height]);
	});

	it("should rotate model-view matrix to yaw offset", async () => {
		// Given
		const vrManager = new VRManager();
		const canvas = document.createElement("canvas");
		const gl = canvas.getContext("webgl");

		await vrManager.requestPresent(canvas);

		// When
		const beforeEyeParams = vrManager.getEyeParams(gl);

		vrManager.setYawOffset(glMatrix.toRadian(90));

		const afterEyeParams = vrManager.getEyeParams(gl);


		// Then
		expect(beforeEyeParams[0].mvMatrix).to.deep.equal(mat4.create());
		expect(beforeEyeParams[1].mvMatrix).to.deep.equal(mat4.create());
		expect(afterEyeParams[0].mvMatrix)
			.deep.equals(mat4.rotateY(mat4.create(), mat4.create(), glMatrix.toRadian(90)));
		expect(afterEyeParams[1].mvMatrix)
			.deep.equals(mat4.rotateY(mat4.create(), mat4.create(), glMatrix.toRadian(90)));
	});

	it("can't render after destroy", async () => {
		// Given
		const vrManager = new VRManager();
		const canvas = document.createElement("canvas");

		// When
		await vrManager.requestPresent(canvas);
		const canRenderBeforeDestroy = vrManager.canRender();

		vrManager.destroy();
		const canRenderAfterDestroy = vrManager.canRender();

		// Then
		expect(canRenderBeforeDestroy).to.be.true;
		expect(canRenderAfterDestroy).to.be.false;
	});

	it("should reset yaw offset after destroy", async () => {
		// Given
		const vrManager = new VRManager();
		const canvas = document.createElement("canvas");
		const gl = canvas.getContext("webgl");

		await vrManager.requestPresent(canvas);
		vrManager.setYawOffset(glMatrix.toRadian(90));
		const eyeParamsWithOffset = vrManager.getEyeParams(gl);

		// When
		vrManager.destroy();

		await vrManager.requestPresent(canvas);
		const eyeParamsWithoutOffset = vrManager.getEyeParams(gl);

		// Then
		expect(eyeParamsWithOffset[0].mvMatrix)
			.deep.equals(mat4.rotateY(mat4.create(), mat4.create(), glMatrix.toRadian(90)));
		expect(eyeParamsWithOffset[1].mvMatrix)
			.deep.equals(mat4.rotateY(mat4.create(), mat4.create(), glMatrix.toRadian(90)));
		expect(eyeParamsWithoutOffset[0].mvMatrix).to.deep.equal(mat4.create());
		expect(eyeParamsWithoutOffset[1].mvMatrix).to.deep.equal(mat4.create());
	});
});
