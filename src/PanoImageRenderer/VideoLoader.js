export default class VideoLoader {
	constructor(video) {
		this._isLoaded = false;
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
			this._isLoaded = true;
		} else {
			this.destroy();
		}

		return this.get();
	}

	get() {
		/**
		 * TODO: How about to resolve(null) if video is defiend.
		 */
		return new Promise((res, rej) => {
			if (!this._video) {
				rej("VideoLoader: video is undefined");
			} else if (this._isLoaded) {
				res(this._video);
			} else {
				this._once("canplaythrough", () => {
					this._isLoaded = false;
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

		this._isLoaded = false;
	}

	_once(type, listener) {
		if (!this._video) {
			return;
		}
		const target = this._video;

		const fn = event => {
			target.removeEventListener(type, fn);
			listener(event);
		};

		target.addEventListener(type, fn);
		this._handlers.push({type, fn});
	}
}
