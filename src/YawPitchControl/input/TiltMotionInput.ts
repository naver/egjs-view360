import Component from "@egjs/component";
import { quat } from "gl-matrix";
import { IInputTypeObserver } from "@egjs/axes/declaration/inputType/InputType";

import { toAxis } from "../utils";
import { util, ROTATE_CONSTANT } from "../../utils/math-util";

import FusionPoseSensor from "./FusionPoseSensor";

const getDeltaYaw = (prvQ: quat, curQ: quat): number => {
  const yawDeltaByYaw = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_YAW) as number;
  const yawDeltaByRoll = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL) *
    Math.sin(util.extractPitchFromQuat(curQ));

  return yawDeltaByRoll + yawDeltaByYaw;
};

const getDeltaPitch = (prvQ: quat, curQ: quat): number => {
  const pitchDelta = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.PITCH_DELTA);

  return pitchDelta;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export default class TiltMotionInput extends Component<{}> {
  public element: HTMLElement;
  public options: { scale: number; threshold: number };
  public fusionPoseSensor: FusionPoseSensor | null;
  public axes: string[];
  public observer: IInputTypeObserver | null;

  private _prevQuaternion: quat | null;
  private _quaternion: quat | null;

  public constructor(el: HTMLElement, options: Partial<{ scale: number; threshold: number }> = {}) {
    super();
    this.element = el;

    this._prevQuaternion = null;
    this._quaternion = null;

    this.fusionPoseSensor = null;

    this.options = {
      ...{
        scale: 1,
        threshold: 0
      }, ...options
    };

    this._onPoseChange = this._onPoseChange.bind(this);
  }

  public mapAxes(axes: string[]) {
    this.axes = axes;
  }

  public connect(observer: IInputTypeObserver) {
    if (this.observer) {
      return this;
    }
    this.observer = observer;
    this.fusionPoseSensor = new FusionPoseSensor();
    this.fusionPoseSensor.enable();
    this._attachEvent();
    return this;
  }

  public disconnect() {
    if (!this.observer) {
      return this;
    }

    this._dettachEvent();
    this.fusionPoseSensor!.disable();
    this.fusionPoseSensor!.destroy();
    this.fusionPoseSensor = null;
    this.observer = null;
    return this;
  }

  public destroy() {
    this.disconnect();
    (this.element as any) = null;
    (this.options as any) = null;
    (this.axes as any) = null;
    this._prevQuaternion = null;
    this._quaternion = null;
  }

  private _onPoseChange(event) {
    if (!this._prevQuaternion) {
      this._prevQuaternion = quat.clone(event.quaternion);
      this._quaternion = quat.clone(event.quaternion);
      return;
    }

    quat.copy(this._prevQuaternion, this._quaternion!);
    quat.copy(this._quaternion!, event.quaternion);

    this.observer!.change(this, event, toAxis(this.axes, [
      getDeltaYaw(this._prevQuaternion, this._quaternion as quat),
      getDeltaPitch(this._prevQuaternion, this._quaternion as quat)
    ]));
  }

  private _attachEvent() {
    this.fusionPoseSensor!.on("change", this._onPoseChange);
  }

  private _dettachEvent() {
    this.fusionPoseSensor!.off("change", this._onPoseChange);
  }
}
