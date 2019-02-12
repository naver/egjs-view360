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
export const getChromeVersion = (() => {
	const match = userAgent.match(/.*Chrome\/([0-9]+)/);
	const value = match ? parseInt(match[1], 10) : -1;

	return () => value;
})();

/**
 * In Chrome m65, `devicemotion` events are broken but subsequently fixed
 * in 65.0.3325.148. Since many browsers use Chromium, ensure that
 * we scope this detection by branch and build numbers to provide
 * a proper fallback.
 * https://github.com/immersive-web/webvr-polyfill/issues/307
 */
export const isChromeWithoutDeviceMotion = (() => {
	let value = false;

	if (getChromeVersion() === 65) {
		const match = userAgent.match(/.*Chrome\/([0-9.]*)/);

		if (match) {
			const versionToken = match[1].split(".");
			const branch = versionToken[2];
			const build = versionToken[3];

			value = parseInt(branch, 10) === 3325 && parseInt(build, 10) < 148;
		}
	}
	return () => value;
})();

export const isAndroid = () => /Android/i.test(userAgent);
