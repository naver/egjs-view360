export default class ImageLoader {
	constructor(image) {
		this.image = null;

		image && this.setImage(image);
	}

	get() {
		return new Promise((res, rej) => {
			if (!this.image) {
				rej("image is not defiend");
			} else if (this.image.complete) {
				res(this.image);
			} else {
				ImageLoader._once(this.image, "load", () => {
					res(this.image);
				});
				ImageLoader._once(this.image, "error", () => {
					rej("failed to load images.");
				});
			}
		});
	}

	setImage(image) { // img element or img url
		if (typeof image === "string") {
			this.image = new Image();
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

	/**
	 * TODO: 이 기능이 정말로 필요한가?
	 */
	cancelLoadImage() {
		if (!!this.image && !this.isImageLoaded()) {
			this.image.src = "";
		}
	}

	loadImage() {
		if (this._imageURL && !this.isImageLoaded()) {
			this.image.setAttribute("crossorigin", "anonymous");
			this.image.src = this._imageURL;
		}
	}

	destroy() {
		this.image = null;
	}
}
