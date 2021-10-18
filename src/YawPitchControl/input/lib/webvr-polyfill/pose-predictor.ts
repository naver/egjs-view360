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
import MathUtil from "./math-util";
import Util from "./util";

/**
 * Given an orientation and the gyroscope data, predicts the future orientation
 * of the head. This makes rendering appear faster.
 *
 * Also see: http://msl.cs.uiuc.edu/~lavalle/papers/LavYerKatAnt14.pdf
 * @param {Number} predictionTimeS time from head movement to the appearance of
 * the corresponding image.
 */
class PosePredictor {
  public predictionTimeS;
  public previousQ;
  public previousTimestampS;
  public deltaQ;
  public outQ;

  public constructor(predictionTimeS) {
    this.predictionTimeS = predictionTimeS;

    // The quaternion corresponding to the previous state.
    this.previousQ = new MathUtil.Quaternion();
    // Previous time a prediction occurred.
    this.previousTimestampS = null;

    // The delta quaternion that adjusts the current pose.
    this.deltaQ = new MathUtil.Quaternion();
    // The output quaternion.
    this.outQ = new MathUtil.Quaternion();
  }

  public getPrediction(currentQ, gyro, timestampS) {
    if (!this.previousTimestampS) {
      this.previousQ.copy(currentQ);
      this.previousTimestampS = timestampS;
      return currentQ;
    }

    // Calculate axis and angle based on gyroscope rotation rate data.
    const axis = new MathUtil.Vector3();
    axis.copy(gyro);
    axis.normalize();

    const angularSpeed = gyro.length();

    // If we're rotating slowly, don't do prediction.
    if (angularSpeed < MathUtil.degToRad * 20) {
      if (Util.isDebug()) {
        console.log("Moving slowly, at %s deg/s: no prediction",
          (MathUtil.radToDeg * angularSpeed).toFixed(1));
      }
      this.outQ.copy(currentQ);
      this.previousQ.copy(currentQ);
      return this.outQ;
    }

    // Get the predicted angle based on the time delta and latency.
    const deltaT = timestampS - this.previousTimestampS;
    const predictAngle = angularSpeed * this.predictionTimeS;

    this.deltaQ.setFromAxisAngle(axis, predictAngle);
    this.outQ.copy(this.previousQ);
    this.outQ.multiply(this.deltaQ);

    this.previousQ.copy(currentQ);
    this.previousTimestampS = timestampS;

    return this.outQ;
  }
}

export default PosePredictor;
