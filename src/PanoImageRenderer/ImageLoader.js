const STATUS = {
	"NONE": 0,
	"LOADING": 1,
	"LOADED": 2,
	"ERROR": 3
};

export default class ImageLoader {
	constructor(image) {
		this._image = null;
		this._onceHandlers = [];
		this._loadStatus = STATUS.NONE;

		image && this.set(image);
	}

	get() {
		return new Promise((res, rej) => {
			if (!this._image) {
				rej("ImageLoader: image is not defiend");
			} else if (this._loadStatus === STATUS.LOADED) {
				/* Check isMaybeLoaded() first because there may have posibilities that image already loaded before get is called. for example calling get on external image onload callback.*/
				res(this._image);
			} else if (this._loadStatus === STATUS.LOADING) {
				this._once("load", () => res(this._image));
				this._once("error", () => rej("ImageLoader: failed to load images."));
			} else {
				rej("ImageLoader: failed to load images");
			}
		});
	}

	/**
	 * @param image img element or img url
	 */
	set(image) {
		this._loadStatus = STATUS.LOADING;

		if (typeof image === "string") {
			this._image = new Image();
			this._image.src = image;
		} else if (typeof image === "object") {
			this._image = image;
		}

		this._once("load", () => (this._loadStatus = STATUS.LOADED));
		this._once("error", () => (this._loadStatus = STATUS.ERROR));

		if (ImageLoader._isMaybeLoaded(this._image)) {
			// Already loaded image
			this._loadStatus = STATUS.LOADED;
		}
	}

	static _isMaybeLoaded(image) {
		return image && image.naturalWidth !== 0;
	}

	_once(type, listener) {
		const target = this._image;

		const fn = event => {
			target.removeEventListener(type, fn);
			listener(event);
		};

		target.addEventListener(type, fn);
		this._onceHandlers.push({type, fn});
	}

	getStatus() {
		return this._loadStatus;
	}

	destroy() {
		this._onceHandlers.forEach(handler => {
			this._image.removeEventListener(handler.type, handler.fn);
		});
		this._onceHandlers = [];
		this._image.src = "";
		this._image = null;
		this._loadStatus = STATUS.NONE;
	}
}

ImageLoader.STATUS = STATUS;
