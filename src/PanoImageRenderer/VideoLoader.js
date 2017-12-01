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
		video && this.set(video);
	}

	set(video) {
		if (typeof video === "string") {
			// url
			this._video = document.createElement("video");
			this._video.src = video;
		} else if (video instanceof HTMLVideoElement) {
			// video tag
			this._video = video;
		} else {
			this.destroy();
		}
	}

	get() {
		/**
		 * TODO: How about to resolve(null) if video is defiend.
		 */
		return new Promise((res, rej) => {
			if (!this._video) {
				rej("VideoLoader: video is undefined");
			} else if (this._video.readyState === READY_STATUS.HAVE_ENOUGH_DATA) {
				res(this._video);
			} else {
				this._once("canplaythrough", () => {
					res(this._video);
				});
				this._once("error", () => rej(`VideoLoader: failed to load ${this._video.src}`));
				this._video.load();
			}
		});
	}

	destroy() {
		this._handlers.forEach(handler => {
			this._video.removeEventListener(handler.type, handler.fn);
		});
		this._handlers = [];

		if (this._video) {
			this._video.pause();
			this._video.src = "";
			this._video = null;
		}
	}

	_once(type, listener) {
		const target = this._video;

		const fn = event => {
			target.removeEventListener(type, fn);
			listener(event);
		};

		target.addEventListener(type, fn);
		this._handlers.push({type, fn});
	}
}
