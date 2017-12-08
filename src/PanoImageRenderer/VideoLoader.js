/* Ref https://www.w3schools.com/tags/av_prop_readystate.asp */
const READY_STATUS = {
	HAVE_NOTHING: 0, // no information whether or not the audio/video is ready
	HAVE_METADATA: 1, // HAVE_METADATA - metadata for the audio/video is ready
	HAVE_CURRENT_DATA: 2, // data for the current playback position is available, but not enough data to play next frame/millisecond
	HAVE_FUTURE_DATA: 3, // data for the current and at least the next frame is available
	HAVE_ENOUGH_DATA: 4 // enough data available to start playing
};

export default class VideoLoader {
	constructor(video) {
		this._handlers = [];
		this._sourceCount = 0;

		video && this.set(video);
	}

	/**
	 *
	 * @param {Object | String} video Object or String containing Video Source URL<ko>비디오 URL 정보를 담고 있는 문자열이나 객체 {type, src}</ko>
	 */
	_appendSourceElement(videoUrl) {
		let videoSrc;
		let videoType;

		if (typeof videoUrl === "object") {
			videoSrc = videoUrl.src;
			videoType = videoUrl.type;
		} else if (typeof videoUrl === "string") {
			videoSrc = videoUrl;
		}

		if (!videoSrc) {
			return false;
		}

		const sourceElement = document.createElement("source");

		sourceElement.src = videoSrc;
		videoType && (sourceElement.type = videoType);

		this._video.appendChild(sourceElement);
		this._sourceCount++;
		return true;
	}

	set(video) {
		this._reset(); // reset resources.

		if (video instanceof HTMLVideoElement) {
			// video tag
			this._video = video;
		} else if (typeof video === "string" || typeof video === "object") {
			// url
			this._video = document.createElement("video");

			if (video instanceof Array) {
				video.forEach(v => this._appendSourceElement(v));
			} else {
				this._appendSourceElement(video);
			}

			if (this._sourceCount > 0) {
				this._video.load();
			} else {
				this._video = null;
			}
		}
	}

	get() {
		return new Promise((res, rej) => {
			if (!this._video) {
				rej("VideoLoader: video is undefined");
			} else if (this._video.readyState >= READY_STATUS.HAVE_CURRENT_DATA) {
				res(this._video);
			} else {
				this._once("loadeddata", () => res(this._video));
				// DO NOT HANDLE ERRORS, DELEGATE IT TO USER BY USING VIDEO ELEMENT.
				// this._once("error", e => rej(`VideoLoader: failed to load ${e.target.src}`));
			}
		});
	}

	getElement() {
		return this._video;
	}

	destroy() {
		this._reset();
	}

	_reset() {
		this._handlers.forEach(handler => {
			this._video.removeEventListener(handler.type, handler.fn);
		});
		this._handlers = [];
		this._video = null;

		this._sourceCount = 0;
	}

	_once(type, listener) {
		const target = this._video;

		const fn = event => {
			target.removeEventListener(type, fn);
			listener(event);
		};

		/* By useCapture mode enabled, you can capture the error event being fired on source(child)*/
		target.addEventListener(type, fn, true);
		this._handlers.push({type, fn});
	}
}
