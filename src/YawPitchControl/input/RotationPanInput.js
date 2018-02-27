import {PanInput} from "@egjs/axes";
import ScreenRotationAngle from "../ScreenRotationAngle";

/**
 * RotationPanInput is extension of PanInput to compensate coordinates by screen rotation angle.
 *
 * The reason for using this function is that in VR mode,
 * the roll angle is adjusted in the direction opposite to the screen rotation angle.
 *
 * Therefore, the angle that the user touches and moves does not match the angle at which the actual object should move.
 * @extends PanInput
 */
export default class RotationPanInput extends PanInput {
	/**
	 * Constructor
	 *
	 * @private
	 * @param {HTMLElement} el target element
	 * @param {Object} [options] The option object
	 * @param {Boolean} [options.useRotation]  Whether to use rotation(or VR)
	 */
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

		const newOffset = [0, 0];
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
