const STATUS = {
	"NONE": 0,
	"LOADING": 1,
	"LOADED": 2,
	"ERROR": 3
};

export default class ImageLoader {
	constructor(image) {
		this.image = null;
		this._loadStatus = STATUS.NONE;

		image && this.set(image);
	}

	get() {
		return new Promise((res, rej) => {
			if (!this.image) {
				rej("ImageLoader: image is not defiend");
			} else if (this._loadStatus === STATUS.LOADED) {
				res(this.image);
			} else if (this._loadStatus === STATUS.LOADING) {
				ImageLoader._once(this.image, "load", () => {
					res(this.image);
				});
				ImageLoader._once(this.image, "error", () => {
					rej("ImageLoader: failed to load images.");
				});
			} else {
				rej("ImageLoader: failed to load images");
			}
		});
	}

	set(image) { // img element or img url
		if (typeof image === "string") {
			this.image = new Image();
			this._loadStatus = STATUS.LOADING;
			this.image.onload = () => {
				this._loadStatus = STATUS.LOADED;
			};
			this.image.onerror = () => {
				this._loadStatus = STATUS.ERROR;
			};
			this.image.src = image;
		} else if (typeof image === "object") { // img element 나 image object 이어야 함
			this.image = image;
		}

		// promise for image
		return this.get();
	}

	static _once(target, type, listener) {
		target.addEventListener(type, function fn(event) {
			target.removeEventListener(type, fn);
			listener(event);
		});
		// target.addEventListener(type, listener);
	}

	isImageLoaded() {
		if (!this.image) {
			return false;
		}

		return !!this.image.src && !!this.image.complete;
	}

	loadImage() {
		if (this._imageURL && !this.isImageLoaded()) {
			this.image.setAttribute("crossorigin", "anonymous");
			this.image.src = this._imageURL;
		}
	}

	destroy() {
		this.image.src = "";
		this.image = null;
	}
}
