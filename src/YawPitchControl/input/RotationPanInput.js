import {PanInput} from "@egjs/axes";
import ScreenRotationAngle from "../ScreenRotationAngle";

export default class RotationPanInput extends PanInput {
	constructor(el, options) {
		super(el, options);
		this._useRotation = !!(options && options.useRotation);

		this._screenRotationAngle = null;
		this._useRotation && (this._screenRotationAngle = new ScreenRotationAngle());
	}

	getOffset(properties, useDirection) {
		const offset = super.getOffset(properties, useDirection);

		if (this._useRotation === false) {
			return offset;
		}

		let newOffset = [0, 0];

		const theta = this._screenRotationAngle.getRadian();
		const cosTheta = Math.cos(theta);
		const sinTheta = Math.sin(theta);

		newOffset[0] = offset[0] * cosTheta - offset[1] * sinTheta;
		newOffset[1] = offset[1] * cosTheta + offset[0] * sinTheta;

		return newOffset;
	}

	destroy() {
		if (this._useRotation) {
			this._screenRotationAngle && this._screenRotationAngle.unref();
		}

		super.destroy();
	}
}
