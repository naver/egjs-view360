const STATUS = {
	"NONE": 0,
	"LOADING": 1,
	"LOADED": 2,
	"ERROR": 3
};

export default class ImageLoader {
	constructor(image) {
		this._image = null;
		this._loadStatus = STATUS.NONE;

		image && this.set(image);
	}

	get() {
		return new Promise((res, rej) => {
			if (!this._image) {
				rej("ImageLoader: image is not defiend");
			} else if (this._loadStatus === STATUS.LOADED || ImageLoader._isMaybeLoaded(this._image)) {
				/* Check isMaybeLoaded() first because there may have posibilities that image already loaded before get is called. for example calling get on external image onload callback.*/
				res(this._image);
			} else if (this._loadStatus === STATUS.LOADING) {
				ImageLoader._once(this._image, "load", () => {
					this._loadStatus = STATUS.LOADED;
					res(this._image);
				});
				ImageLoader._once(this._image, "error", () => {
					this._loadStatus = STATUS.ERROR;
					rej("ImageLoader: failed to load images.");
				});
			} else {
				rej("ImageLoader: failed to load images");
			}
		});
	}

	/**
	 * @param image img element or img url
	 */
	set(image) {
		if (typeof image === "string") {
			this._image = new Image();
			this._loadStatus = STATUS.LOADING;
			this._image.onload = () => {
				this._loadStatus = STATUS.LOADED;
			};
			this._image.onerror = () => {
				this._loadStatus = STATUS.ERROR;
			};
			this._image.src = image;
		} else if (typeof image === "object") {
			if (ImageLoader._isMaybeLoaded(image)) {
				this._loadStatus = STATUS.LOADED;
			} else {
				this._loadStatus = STATUS.LOADING;
			}
			this._image = image;
		}

		// promise for image
		return this.get();
	}

	static _isMaybeLoaded(image) {
		return image && (image.width || image.height);
	}

	static _once(target, type, listener) {
		target.addEventListener(type, function fn(event) {
			target.removeEventListener(type, fn);
			listener(event);
		});
	}

	destroy() {
		this._image.src = "";
		this._image = null;
	}
}
