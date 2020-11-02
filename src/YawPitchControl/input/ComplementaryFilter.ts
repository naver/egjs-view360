import MathUtil from "./lib/webvr-polyfill/math-util";
import ComplementaryFilter from "./lib/webvr-polyfill/complementary-filter";

ComplementaryFilter.prototype.run_ = function() {
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

  // Calculate the SLERP target: current orientation plus the measured-estimated
  // quaternion delta.
  const targetQ = new MathUtil.Quaternion();

  targetQ.copy(this.filterQ);
  targetQ.multiply(deltaQ);

  // SLERP factor: 0 is pure gyro, 1 is pure accel.
  this.filterQ.slerp(targetQ, 1 - this.kFilter);

  this.previousFilterQ.copy(this.filterQ);

  if (!this.isFilterQuaternionInitialized) {
    this.isFilterQuaternionInitialized = true;
  }
};

ComplementaryFilter.prototype.getOrientation = function() {
  if (this.isFilterQuaternionInitialized) {
    return this.filterQ;
  } else {
    return null;
  }
};

export default ComplementaryFilter;
