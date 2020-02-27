import {mat4} from "gl-matrix";

const VR_DISPLAY_PRESENT_CHANGE = "vrdisplaypresentchange";
const DEFAULT_LEFT_BOUNDS = [0, 0, 0.5, 1];
const DEFAULT_RIGHT_BOUNDS = [0.5, 0, 0.5, 1];
const EYES = {
	LEFT: "left",
	RIGHT: "right"
};

class VRManager {
	get context() { return this._vrDisplay; }

	constructor() {
		this._frameData = new window.VRFrameData();
		this._clear();
	}

	destroy = () => {
		const vrDisplay = this._vrDisplay;

		this.removeEndCallback(this.destroy);

		if (vrDisplay && vrDisplay.isPresenting) {
			vrDisplay.exitPresent();
		}

		this._clear();
	}

	canRender() {
		return Boolean(this._vrDisplay);
	}

	beforeRender(gl) {
		// Render to the default backbuffer
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	afterRender() {
		this._vrDisplay.submitFrame();
	}

	getEyeParams(gl) {
		const display = this._vrDisplay;
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
				pMatrix: frameData.leftProjectionMatrix,
			},
			{
				viewport: [halfWidth, 0, halfWidth, height],
				mvMatrix: rightMVMatrix,
				pMatrix: frameData.rightProjectionMatrix,
			}
		];
	}

	isPresenting() {
		return Boolean(this._vrDisplay && this._vrDisplay.isPresenting);
	}

	addEndCallback(callback) {
		window.addEventListener(VR_DISPLAY_PRESENT_CHANGE, callback);
	}

	removeEndCallback(callback) {
		window.removeEventListener(VR_DISPLAY_PRESENT_CHANGE, callback);
	}

	requestPresent(canvas) {
		return new Promise((resolve, reject) => {
			navigator.getVRDisplays().then(displays => {
				const vrDisplay = displays.length && displays[0];

				if (!vrDisplay) {
					reject(new Error("No displays available."));
					return;
				}
				if (!vrDisplay.capabilities.canPresent) {
					reject(new Error("Display lacking capability to present."));
					return;
				}

				vrDisplay.requestPresent([{source: canvas}]).then(() => {
					const leftEye = vrDisplay.getEyeParameters(EYES.LEFT);
					const rightEye = vrDisplay.getEyeParameters(EYES.RIGHT);

					canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
					canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);

					this._setDisplay(vrDisplay);
					resolve();
				});
			});
		});
	}

	setYawOffset(offset) {
		this._yawOffset = offset;
	}

	_setDisplay(vrDisplay) {
		this._vrDisplay = vrDisplay;

		const layers = vrDisplay.getLayers();

		if (layers.length) {
			const layer = layers[0];

			this._leftBounds = layer.leftBounds;
			this._rightBounds = layer.rightBounds;
		}

		this.addEndCallback(this.destroy);
	}

	_clear() {
		this._vrDisplay = null;
		this._leftBounds = DEFAULT_LEFT_BOUNDS;
		this._rightBounds = DEFAULT_RIGHT_BOUNDS;
		this._yawOffset = 0;
	}
}

export default VRManager;
