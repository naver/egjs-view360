import Promise from "promise-polyfill";
import Component from "@egjs/component";
import { ValueOf } from "../types";

const STATUS: {
  "NONE": 0;
  "LOADING": 1;
  "LOADED": 2;
  "ERROR": 3;
} = {
  "NONE": 0,
  "LOADING": 1,
  "LOADED": 2,
  "ERROR": 3
};

const EVENT: {
  READYSTATECHANGE: "readystatechange";
} = {
  "READYSTATECHANGE": "readystatechange"
};

type ImageCandidate = HTMLImageElement | string;

class ImageLoader extends Component<{
  [EVENT.READYSTATECHANGE]: {
    type: ValueOf<typeof STATUS>;
  }
}> {
  public static STATUS = STATUS;

  private _image: HTMLImageElement[] | null;
  private _onceHandlers
  private _loadStatus: ValueOf<typeof STATUS>;

  constructor(image?: ImageCandidate | ImageCandidate[]) {
    // Super constructor
    super();

    this._image = null;
    this._onceHandlers = [];
    this._loadStatus = STATUS.NONE;

    if (image) {
      this.set(image);
    }
  }

  public static createElement(image: ImageCandidate | ImageCandidate[]): HTMLImageElement[] {
    const images = image instanceof Array ? image : [image];

    return images.map(img => {
      let _img = img;

      if (typeof img === "string") {
        _img = new Image();
        _img.crossOrigin = "anonymous";
        _img.src = img;
      }
      return _img as HTMLImageElement;
    });
  }

  public static isMaybeLoaded(image: HTMLImageElement | HTMLImageElement[]) {
    let result = false;

    if (image instanceof Image) {
      result = image.complete && image.naturalWidth !== 0;
    } else if (image instanceof Array) {
      result = !image.some(img => !img.complete || img.naturalWidth === 0);
    }

    return result;
  }

  public get() {
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
  public set(image: ImageCandidate | ImageCandidate[]) {
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

  public getElement(): HTMLImageElement | HTMLImageElement[] {
    const images = this._image!;

    return images.length === 1 ? images[0] : images;
  }

  public onceLoaded(
    target: HTMLImageElement | HTMLImageElement[],
    onload: (images: HTMLImageElement | HTMLImageElement[]) => any,
    onerror: (images: HTMLImageElement | HTMLImageElement[]) => any
  ) {
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

  public getStatus() {
    return this._loadStatus;
  }

  public destroy() {
    this._onceHandlers.forEach(handler => {
      handler.target.removeEventListener(handler.type, handler.fn);
    });
    this._onceHandlers = [];
    this._image!.forEach(img => img.src = "");
    this._image = null;
    this._loadStatus = STATUS.NONE;
  }

  private _once(target: HTMLImageElement, type: string, listener: (evt: Event) => any) {
    const fn = event => {
      target.removeEventListener(type, fn);
      listener(event);
    };

    target.addEventListener(type, fn);
    this._onceHandlers.push({target, type, fn});
  }
}

export default ImageLoader;
