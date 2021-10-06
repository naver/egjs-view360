import { quat } from "gl-matrix";

import {
  util as mathUtil,
  ROTATE_CONSTANT
} from "../utils/math-util";

export const toAxis = (source, offset) => offset.reduce((acc, v, i) => {
  if (source[i]) {
    acc[source[i]] = v;
  }
  return acc;
}, {});

export const getDeltaYaw = (prvQ: quat, curQ: quat) => {
  const yawDeltaByYaw = mathUtil.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_YAW) as number;
  const yawDeltaByRoll = mathUtil.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL) *
    Math.sin(mathUtil.extractPitchFromQuat(curQ));

  return yawDeltaByRoll + yawDeltaByYaw;
};

export const getDeltaPitch = (prvQ: quat, curQ: quat) => {
  const pitchDelta = mathUtil.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.PITCH_DELTA);

  return pitchDelta;
};
