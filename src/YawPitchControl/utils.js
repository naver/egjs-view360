import {userAgent} from "../utils/browserFeature";

export function toAxis(source, offset) {
	return offset.reduce((acc, v, i) => {
		if (source[i]) {
			acc[source[i]] = v;
		}
		return acc;
	}, {});
}

/**
 * Returns a number value indiciating the version of Chrome being used,
 * or otherwise `null` if not on Chrome.
 *
 * Ref: https://github.com/immersive-web/cardboard-vr-display/pull/19
 */
/**
 * In Chrome m65, `devicemotion` events are broken but subsequently fixed
 * in 65.0.3325.148. Since many browsers use Chromium, ensure that
 * we scope this detection by branch and build numbers to provide
 * a proper fallback.
 * https://github.com/immersive-web/webvr-polyfill/issues/307
 */
let version = -1; // It should not be null because it will be compared with number
let branch = null;
let build = null;

const match = /Chrome\/([0-9]+)\.(?:[0-9]*)\.([0-9]*)\.([0-9]*)/i.exec(userAgent);

if (match) {
	version = parseInt(match[1], 10);
	branch = match[2];
	build = match[3];
}

export const CHROME_VERSION = version;
export const IS_CHROME_WITHOUT_DEVICE_MOTION = version === 65 && branch === "3325" && parseInt(build, 10) < 148;
export const IS_ANDROID = /Android/i.test(userAgent);
