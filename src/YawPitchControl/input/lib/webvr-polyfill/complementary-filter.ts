/* eslint-disable */
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import SensorSample from "./sensor-sample";
import MathUtil from "./math-util";
import Util from "./util";

/**
 * An implementation of a simple complementary filter, which fuses gyroscope and
 * accelerometer data from the 'devicemotion' event.
 *
 * Accelerometer data is very noisy, but stable over the long term.
 * Gyroscope data is smooth, but tends to drift over the long term.
 *
 * This fusion is relatively simple:
 * 1. Get orientation estimates from accelerometer by applying a low-pass filter
 *    on that data.
 * 2. Get orientation estimates from gyroscope by integrating over time.
 * 3. Combine the two estimates, weighing (1) in the long term, but (2) for the
 *    short term.
 */
class ComplementaryFilter {
  public kFilter;
  public currentAccelMeasurement;
  public currentGyroMeasurement;
  public previousGyroMeasurement;
  public filterQ;
  public previousFilterQ;
  public accelQ;
  public isOrientationInitialized;
  public estimatedGravity;
  public measuredGravity;
  public gyroIntegralQ;

  constructor(kFilter) {
    this.kFilter = kFilter;

    // Raw sensor measurements.
    this.currentAccelMeasurement = new SensorSample();
    this.currentGyroMeasurement = new SensorSample();
    this.previousGyroMeasurement = new SensorSample();

    // Set default look direction to be in the correct direction.
    if (Util.isIOS()) {
      this.filterQ = new MathUtil.Quaternion(-1, 0, 0, 1);
    } else {
      this.filterQ = new MathUtil.Quaternion(1, 0, 0, 1);
    }
    this.previousFilterQ = new MathUtil.Quaternion();
    this.previousFilterQ.copy(this.filterQ);

    // Orientation based on the accelerometer.
    this.accelQ = new MathUtil.Quaternion();
    // Whether or not the orientation has been initialized.
    this.isOrientationInitialized = false;
    // Running estimate of gravity based on the current orientation.
    this.estimatedGravity = new MathUtil.Vector3();
    // Measured gravity based on accelerometer.
    this.measuredGravity = new MathUtil.Vector3();

    // Debug only quaternion of gyro-based orientation.
    this.gyroIntegralQ = new MathUtil.Quaternion();
  }

  public addAccelMeasurement(vector, timestampS) {
    this.currentAccelMeasurement.set(vector, timestampS);
  }

  public addGyroMeasurement = function(vector, timestampS) {
    this.currentGyroMeasurement.set(vector, timestampS);

    const deltaT = timestampS - this.previousGyroMeasurement.timestampS;
    if (Util.isTimestampDeltaValid(deltaT)) {
      this.run_();
    }

    this.previousGyroMeasurement.copy(this.currentGyroMeasurement);
  };

  public getOrientation() {
    return this.filterQ;
  }

  public run_() {
    if (!this.isOrientationInitialized) {
      this.accelQ = this.accelToQuaternion_(this.currentAccelMeasurement.sample);
      this.previousFilterQ.copy(this.accelQ);
      this.isOrientationInitialized = true;
      return;
    }

    const deltaT = this.currentGyroMeasurement.timestampS -
        this.previousGyroMeasurement.timestampS;

    // Convert gyro rotation vector to a quaternion delta.
    const gyroDeltaQ = this.gyroToQuaternionDelta_(this.currentGyroMeasurement.sample, deltaT);
    this.gyroIntegralQ.multiply(gyroDeltaQ);

    // filter_1 = K * (filter_0 + gyro * dT) + (1 - K) * accel.
    this.filterQ.copy(this.previousFilterQ);
    this.filterQ.multiply(gyroDeltaQ);

    // Calculate the delta between the current estimated gravity and the real
    // gravity vector from accelerometer.
    const invFilterQ = new MathUtil.Quaternion();
    invFilterQ.copy(this.filterQ);
    invFilterQ.inverse();

    this.estimatedGravity.set(0, 0, -1);
    this.estimatedGravity.applyQuaternion(invFilterQ);
    this.estimatedGravity.normalize();

    this.measuredGravity.copy(this.currentAccelMeasurement.sample);
    this.measuredGravity.normalize();

    // Compare estimated gravity with measured gravity, get the delta quaternion
    // between the two.
    const deltaQ = new MathUtil.Quaternion();
    deltaQ.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
    deltaQ.inverse();

    if (Util.isDebug()) {
      console.log("Delta: %d deg, G_est: (%s, %s, %s), G_meas: (%s, %s, %s)",
        MathUtil.radToDeg * Util.getQuaternionAngle(deltaQ),
        (this.estimatedGravity.x).toFixed(1),
        (this.estimatedGravity.y).toFixed(1),
        (this.estimatedGravity.z).toFixed(1),
        (this.measuredGravity.x).toFixed(1),
        (this.measuredGravity.y).toFixed(1),
        (this.measuredGravity.z).toFixed(1));
    }

    // Calculate the SLERP target: current orientation plus the measured-estimated
    // quaternion delta.
    const targetQ = new MathUtil.Quaternion();
    targetQ.copy(this.filterQ);
    targetQ.multiply(deltaQ);

    // SLERP factor: 0 is pure gyro, 1 is pure accel.
    this.filterQ.slerp(targetQ, 1 - this.kFilter);

    this.previousFilterQ.copy(this.filterQ);
  }

  private accelToQuaternion_(accel) {
    const normAccel = new MathUtil.Vector3();
    normAccel.copy(accel);
    normAccel.normalize();
    const quat = new MathUtil.Quaternion();
    quat.setFromUnitVectors(new MathUtil.Vector3(0, 0, -1), normAccel);
    quat.inverse();
    return quat;
  }

  private gyroToQuaternionDelta_(gyro, dt) {
    // Extract axis and angle from the gyroscope data.
    const quat = new MathUtil.Quaternion();
    const axis = new MathUtil.Vector3();
    axis.copy(gyro);
    axis.normalize();
    quat.setFromAxisAngle(axis, gyro.length() * dt);
    return quat;
  }
}

export default ComplementaryFilter;
