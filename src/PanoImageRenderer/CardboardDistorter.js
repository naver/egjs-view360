export default class CardboardDistorter {
	constructor(config) {
		// DEFAULT_ANDROID from cardboard-vr-display
		// https://github.com/immersive-web/cardboard-vr-display/blob/master/src/device-info.js
		this._deviceInfo = {
			widthMeters: 0.110,
			heightMeters: 0.062,
			bevelMeters: 0.004,
		};
		// Cardboard I/O 2015 from cardboard-vr-display
		this._viewerInfo = {
			fov: 60,
			interLensDistance: 0.064,
			baselineLensDistance: 0.035,
			screenLensDistance: 0.039,
			distortionCoefficients: [0.34, 0.55],
			inverseCoefficients: [
				-0.33836704, -0.18162185, 0.862655, -1.2462051,
				1.0560602, -0.58208317, 0.21609078, -0.05444823,
				0.009177956, -9.904169E-4, 6.183535E-5, -1.6981803E-6
			],
		};
	}
}
