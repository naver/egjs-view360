import Component from "@egjs/component";

const STATUS = {
	"NONE": 0,
	"LOADING": 1,
	"LOADED": 2,
	"ERROR": 3
};

const EVENT = {
	"READYSTATECHANGE": "readystatechange"
};

class ImageLoader extends Component {
	static STATUS = STATUS;
	constructor(image) {
		// Super constructor
		super();

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
				res(this.getElement());
			} else if (this._loadStatus === STATUS.LOADING) {
				/* Check isMaybeLoaded() first because there may have
					posibilities that image already loaded before get is called.
					for example calling get on external image onload callback.*/
				if (ImageLoader.isMaybeLoaded(this._image)) {
					this._loadStatus = STATUS.LOADED;
					res(this.getElement());
				} else {
					this.on(EVENT.READYSTATECHANGE, e => {
						if (e.type === STATUS.LOADED) {
							res(this.getElement());
						} else {
							rej("ImageLoader: failed to load images.");
						}
					});
				}
			} else {
				rej("ImageLoader: failed to load images");
			}
		});
	}

	/**
	 * @param image img element or img url or array of img element or array of img url
	 */
	set(image) {
		this._loadStatus = STATUS.LOADING;

		this._image = ImageLoader.createElement(image);

		if (ImageLoader.isMaybeLoaded(this._image)) {
			this._loadStatus = STATUS.LOADED;
			return;
		}

		this.onceLoaded(
			this._image,
			() => {
				this._loadStatus = STATUS.LOADED;
				this.trigger(EVENT.READYSTATECHANGE, {
					type: STATUS.LOADED
				});
			},
			() => {
				this._loadStatus = STATUS.ERROR;
				this.trigger(EVENT.READYSTATECHANGE, {
					type: STATUS.ERROR
				});
			}
		);
	}

	static createElement(image) {
		const images = image instanceof Array ? image : [image];

		return images.map(img => {
			let _img = img;

			if (typeof img === "string") {
				_img = new Image();
				_img.crossOrigin = "anonymous";
				_img.src = img;
			}
			return _img;
		});
	}

	getElement() {
		return this._image.length === 1 ? this._image[0] : this._image;
	}

	static isMaybeLoaded(image) {
		let result = false;

		if (image instanceof Image) {
			result = image.complete && image.naturalWidth !== 0;
		} else if (image instanceof Array) {
			result = !image.some(img => !img.complete || img.naturalWidth === 0);
		}

		return result;
	}

	onceLoaded(target, onload, onerror) {
		const targets = target instanceof Array ? target : [target];
		const targetsNotLoaded = targets.filter(img => !ImageLoader.isMaybeLoaded(img));
		const loadPromises = targetsNotLoaded.map(img => new Promise((res, rej) => {
			this._once(img, "load", () => (res(img)));
			this._once(img, "error", () => (rej(img)));
		}));

		Promise.all(loadPromises).then(
			result => (onload(targets.length === 1 ? targets[0] : targets)),
			reason => (onerror(reason))
		);
	}

	_once(target, type, listener) {
		const fn = event => {
			target.removeEventListener(type, fn);
			listener(event);
		};

		target.addEventListener(type, fn);
		this._onceHandlers.push({target, type, fn});
	}

	getStatus() {
		return this._loadStatus;
	}

	destroy() {
		this._onceHandlers.forEach(handler => {
			handler.target.removeEventListener(handler.type, handler.fn);
		});
		this._onceHandlers = [];
		this._image.src = "";
		this._image = null;
		this._loadStatus = STATUS.NONE;
	}
}

export default ImageLoader;
