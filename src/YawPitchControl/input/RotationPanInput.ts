import Axes, { PanInput } from "@egjs/axes";
import { InputTypeObserver } from "@egjs/axes/declaration/inputType/InputType";
import { PanInputOption } from "@egjs/axes/declaration/inputType/PanInput";

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
  private _useRotation: boolean;
  private _screenRotationAngle: ScreenRotationAngle | null;
  private _userDirection: number;

  /**
   * Constructor
   * @private
   * @param {HTMLElement} el target element
   * @param {Object} [options] The option object
   * @param {Boolean} [options.useRotation]  Whether to use rotation(or VR)
   */
  public constructor(el: HTMLElement, options: Partial<{ useRotation: boolean } & PanInputOption> = {}) {
    super(el, options);

    this._useRotation = false;
    this._screenRotationAngle = null;

    this.setUseRotation(!!(options && options.useRotation));

    this._userDirection = Axes.DIRECTION_ALL;
  }

  public setUseRotation(useRotation: boolean) {
    this._useRotation = useRotation;

    if (this._screenRotationAngle) {
      this._screenRotationAngle.unref();
      this._screenRotationAngle = null;
    }

    if (this._useRotation) {
      this._screenRotationAngle = new ScreenRotationAngle();
    }
  }

  public connect(observer: InputTypeObserver) {
    // User intetened direction
    this._userDirection = this._direction;

    // In VR Mode, Use ALL direction if direction is not none
    // Because horizontal and vertical is changed dynamically by screen rotation.
    // this._direction is used to initialize hammerjs
    if (this._useRotation && (this._direction & Axes.DIRECTION_ALL)) {
      this._direction = Axes.DIRECTION_HORIZONTAL;
    }

    return super.connect(observer);
  }

  public destroy() {
    if (this._useRotation && this._screenRotationAngle) {
      this._screenRotationAngle.unref();
    }

    super.destroy();
  }

  protected _getOffset(properties: number[], useDirection: boolean[]) {
    if (this._useRotation === false) {
      return super._getOffset(properties, useDirection);
    }

    const offset = super._getOffset(properties, [true, true]);
    const newOffset = [0, 0];

    const theta = this._screenRotationAngle!.getRadian();

    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    // RotateZ
    newOffset[0] = offset[0] * cosTheta - offset[1] * sinTheta;
    newOffset[1] = offset[1] * cosTheta + offset[0] * sinTheta;

    // Use only user allowed direction.
    if (!(this._userDirection & Axes.DIRECTION_HORIZONTAL)) {
      newOffset[0] = 0;
    } else if (!(this._userDirection & Axes.DIRECTION_VERTICAL)) {
      newOffset[1] = 0;
    }

    return newOffset;
  }
}

/**
 * Override getDirectionByAngle to return DIRECTION_ALL
 * Ref: https://github.com/naver/egjs-axes/issues/99
 *
 * But we obey axes's rule. If axes's rule is problem, let's apply following code.
 */
// PanInput.getDirectionByAngle = function (angle, thresholdAngle) {
// 	return DIRECTION_ALL;
// };
