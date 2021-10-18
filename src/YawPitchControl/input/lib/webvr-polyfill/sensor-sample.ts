class SensorSample {
  public sample;
  public timestampS;

  public constructor(sample?, timestampS?) {
    this.set(sample, timestampS);
  }

  public set(sample, timestampS) {
    this.sample = sample;
    this.timestampS = timestampS;
  }

  public copy(sensorSample) {
    this.set(sensorSample.sample, sensorSample.timestampS);
  }
}

export default SensorSample;
