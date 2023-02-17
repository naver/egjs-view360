/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import { quat, vec3 } from "gl-matrix";
import * as BROWSER from "../../const/browser";
import { DEG_TO_RAD, RAD_TO_DEG } from "../../const/internal";
import { InputEvents } from "../../type/internal";
import { quatToEuler } from "../../utils";

export const ROTATE_CONSTANT = {
  PITCH_DELTA: 1,
  YAW_DELTA_BY_ROLL: 2,
  YAW_DELTA_BY_YAW: 3
} as const;

ROTATE_CONSTANT[ROTATE_CONSTANT.PITCH_DELTA] = {
  targetAxis: [0, 1, 0],
  meshPoint: [0, 0, 1]
};
ROTATE_CONSTANT[ROTATE_CONSTANT.YAW_DELTA_BY_ROLL] = {
  targetAxis: [0, 1, 0],
  meshPoint: [1, 0, 0]
};
ROTATE_CONSTANT[ROTATE_CONSTANT.YAW_DELTA_BY_YAW] = {
  targetAxis: [1, 0, 0],
  meshPoint: [0, 0, 1]
};

class GyroInput extends Component<InputEvents<{ x: number, y: number, z: number }, MouseEvent>> {
  public quaternion: quat;

  private _ignoreRoll: boolean;

  private _yawOrigin: number;
  private _yawOffset: number;
  private _orientation: {
    alpha: number;
    beta: number;
    gamma: number;
  }
  private _orientationUpdated: boolean;
  private _needsCalibrate: boolean;
  private _screenOrientation: number;
  private _enabled: boolean;

  public get enabled() { return this._enabled; }
  public get orientationUpdated() { return this._orientationUpdated; }
  public get ignoreRoll() { return this._ignoreRoll; }
  public set ignoreRoll(val: boolean) { this._ignoreRoll = val; }

  public constructor() {
    super();

    this.quaternion = quat.create();

    this._orientation = {
      alpha: 0,
      beta: 90,
      gamma: 0
    };
    this._yawOrigin = 0;
    this._yawOffset = 0;
    this._orientationUpdated = false;
    this._screenOrientation = 0;
    this._needsCalibrate = true;
    this._enabled = false;
  }

  public enable() {
    if (this._enabled) return;

    window.addEventListener(BROWSER.EVENTS.DEVICE_ORIENTATION, this._onDeviceOrientation);
    window.addEventListener(BROWSER.EVENTS.ORIENTATION_CHANGE, this._updateScreenOrientation);

    this._updateScreenOrientation();
    this._orientationUpdated = false;
    this._needsCalibrate = true;
    this._enabled = true;
  }

  public disable() {
    if (!this._enabled) return;

    window.removeEventListener(BROWSER.EVENTS.DEVICE_ORIENTATION, this._onDeviceOrientation);
    window.removeEventListener(BROWSER.EVENTS.ORIENTATION_CHANGE, this._updateScreenOrientation);

    this._enabled = false;
  }

  public update() {
    this._updateRotation();
    this._orientationUpdated = false;
  }

  public collectDelta() {
    if (!this._orientationUpdated) {
      return {
        pitch: 0,
        yaw: 0
      };
    }

    const prevRotation = quat.clone(this.quaternion);

    this._updateRotation();
    this._orientationUpdated = false;

    return this._toEulerDelta(prevRotation, this.quaternion);
  }

  public setInitialRotation(yaw: number) {
    this._yawOrigin = yaw;
  }

  private _onDeviceOrientation = (evt: DeviceOrientationEvent) => {
    const prevOrientation = this._orientation;
    const { alpha, beta, gamma } = evt;

    if (
      alpha == null
      || beta == null
      || gamma == null
    ) return;

    prevOrientation.alpha = alpha;
    prevOrientation.beta = beta;
    prevOrientation.gamma = gamma;

    this._orientationUpdated = true;

    if (this._needsCalibrate) {
      this._needsCalibrate = false;
      this._calibrateSensor();
    }
  };

  private _calibrateSensor() {
    const yawOrigin = this._yawOrigin;
    const rotation = this.quaternion;

    this._yawOffset = 0;
    this._updateRotation();

    const { yaw: sensorYaw } = quatToEuler(rotation);
    this._yawOffset = sensorYaw - yawOrigin;
    this._updateRotation();

    this._needsCalibrate = false;
  }

  private _updateRotation() {
    const rotation = this.quaternion;
    const { alpha, beta, gamma } = this._orientation;

    quat.identity(rotation);
    quat.rotateY(rotation, rotation, (alpha - this._yawOffset) * DEG_TO_RAD);
    quat.rotateX(rotation, rotation, beta * DEG_TO_RAD);
    quat.rotateZ(rotation, rotation, -gamma * DEG_TO_RAD);

    const screen = quat.create();
    const screenAngle = -this._screenOrientation * 0.5 * DEG_TO_RAD;
    const world = quat.fromValues(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));

    quat.set(screen, 0, Math.sin(screenAngle), 0, Math.cos(screenAngle));
    quat.multiply(rotation, rotation, screen);
    quat.multiply(rotation, rotation, world);

    quat.normalize(rotation, rotation);
  }

  private _updateScreenOrientation = () => {
    if (window.screen && window.screen.orientation && window.screen.orientation.angle !== undefined) {
      this._screenOrientation = screen.orientation.angle;
    } else if (window.orientation !== undefined) {
      this._screenOrientation = window.orientation >= 0 ?
        window.orientation : 360 + window.orientation;
    } else {
      this._screenOrientation = 0;
    }
  }

  private _toEulerDelta(prevQuat: quat, currentQuat: quat) {
    return {
      yaw: this._getDeltaYaw(prevQuat, currentQuat),
      pitch: this._getDeltaPitch(prevQuat, currentQuat),
    };
  }

  private _getDeltaYaw(prvQ: quat, curQ: quat): number {
    const yawDeltaByYaw = this._getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_YAW);
    const yawDeltaByRoll = this._getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL)
      * Math.sin(this._extractPitchFromQuat(curQ));

    return yawDeltaByRoll + yawDeltaByYaw;
  }

  private _getDeltaPitch(prvQ: quat, curQ: quat): number {
    return this._getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.PITCH_DELTA);
  }

  private _getRotationDelta(prevQ: quat, curQ: quat, rotateKind: typeof ROTATE_CONSTANT[keyof typeof ROTATE_CONSTANT]) {
    const targetAxis = vec3.fromValues(
      ROTATE_CONSTANT[rotateKind].targetAxis[0],
      ROTATE_CONSTANT[rotateKind].targetAxis[1],
      ROTATE_CONSTANT[rotateKind].targetAxis[2]
    );
    const meshPoint = ROTATE_CONSTANT[rotateKind].meshPoint;

    const prevQuaternion = quat.clone(prevQ);
    const curQuaternion = quat.clone(curQ);

    quat.normalize(prevQuaternion, prevQuaternion);
    quat.normalize(curQuaternion, curQuaternion);

    let prevPoint = vec3.fromValues(0, 0, 1);
    let curPoint = vec3.fromValues(0, 0, 1);

    vec3.transformQuat(prevPoint, prevPoint, prevQuaternion);
    vec3.transformQuat(curPoint, curPoint, curQuaternion);
    vec3.transformQuat(targetAxis, targetAxis, curQuaternion);

    const rotateDistance = vec3.dot(targetAxis, vec3.cross(vec3.create(), prevPoint, curPoint));
    const rotateDirection = rotateDistance > 0 ? 1 : -1;

    // when counter clock wise, use vec3.fromValues(0,1,0)
    // when clock wise, use vec3.fromValues(0,-1,0)
    // const meshPoint1 = vec3.fromValues(0, 0, 0);
    const meshPoint2 = vec3.fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);

    let meshPoint3;

    if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
      meshPoint3 = vec3.fromValues(0, rotateDirection, 0);
    } else {
      meshPoint3 = vec3.fromValues(rotateDirection, 0, 0);
    }

    vec3.transformQuat(meshPoint2, meshPoint2, curQuaternion);
    vec3.transformQuat(meshPoint3, meshPoint3, curQuaternion);

    const vecU = meshPoint2;
    const vecV = meshPoint3;
    const vecN = vec3.create();

    vec3.cross(vecN, vecU, vecV);
    vec3.normalize(vecN, vecN);

    const coefficientA = vecN[0];
    const coefficientB = vecN[1];
    const coefficientC = vecN[2];

    // a point on the plane
    curPoint = vec3.fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
    vec3.transformQuat(curPoint, curPoint, curQuaternion);

    // a point should project on the plane
    prevPoint = vec3.fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
    vec3.transformQuat(prevPoint, prevPoint, prevQuaternion);

    // distance between prevPoint and the plane
    let distance = Math.abs(
      prevPoint[0] * coefficientA +
      prevPoint[1] * coefficientB +
      prevPoint[2] * coefficientC
    );

    const projectedPrevPoint = vec3.create();

    vec3.subtract(projectedPrevPoint, prevPoint, vec3.scale(vec3.create(), vecN, distance));

    let trigonometricRatio =
      (projectedPrevPoint[0] * curPoint[0] +
      projectedPrevPoint[1] * curPoint[1] +
      projectedPrevPoint[2] * curPoint[2]) /
      (vec3.length(projectedPrevPoint) * vec3.length(curPoint));

    // defensive block
    if (trigonometricRatio > 1) {
      trigonometricRatio = 1;
    }

    const theta = Math.acos(trigonometricRatio);

    const crossVec = vec3.cross(vec3.create(), curPoint, projectedPrevPoint);

    distance = coefficientA * crossVec[0]
      + coefficientB * crossVec[1]
      + coefficientC * crossVec[2];

    let thetaDirection: number;

    if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
      thetaDirection = distance > 0 ? 1 : -1;
    } else {
      thetaDirection = distance < 0 ? 1 : -1;
    }

    const deltaRadian = theta * thetaDirection * rotateDirection;

    return deltaRadian * RAD_TO_DEG;
  }

  private _extractPitchFromQuat(quaternion: quat) {
    const baseV = vec3.fromValues(0, 0, 1);
    vec3.transformQuat(baseV, baseV, quaternion);

    return -1 * Math.atan2(
      baseV[1],
      Math.sqrt(Math.pow(baseV[0], 2) + Math.pow(baseV[2], 2)));
  }
}

export default GyroInput;
