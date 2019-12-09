import {
	util as mathUtil,
	ROTATE_CONSTANT,
} from "../utils/math-util";

export function toAxis(source, offset) {
	return offset.reduce((acc, v, i) => {
		if (source[i]) {
			acc[source[i]] = v;
		}
		return acc;
	}, {});
}

export function getDeltaYaw(prvQ, curQ) {
	const yawDeltaByYaw = mathUtil.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_YAW);
	const yawDeltaByRoll = mathUtil.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL) *
		Math.sin(mathUtil.extractPitchFromQuat(curQ));

	return yawDeltaByRoll + yawDeltaByYaw;
}

export function getDeltaPitch(prvQ, curQ) {
	const pitchDelta = mathUtil.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.PITCH_DELTA);

	return pitchDelta;
}
