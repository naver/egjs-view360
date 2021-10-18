import Component, { ComponentEvent } from "@egjs/component";

import { TRANSFORM, SUPPORT_WILLCHANGE } from "../utils/browserFeature";
import { VERSION } from "../version";

import { SpinViewerOptions } from "./SpinViewer";
import { DEFAULT_IMAGE_CLASS, DEFAULT_WRAPPER_CLASS } from "./consts";

export interface SpriteImageEvent {
  /**
   * Events that occur when component loading is complete
   * @ko 컴포넌트 로딩이 완료되면 발생하는 이벤트
   * @name eg.view360.SpriteImage#load
   * @event
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {HTMLElement} param.target The target element for which to display the image <ko>이미지를 보여줄 대상 엘리먼트</ko>
   * @param {HTMLElement} param.bgElement Generated background image element <ko>생성된 background 이미지 엘리먼트</ko>
   *
   * @example
   *
   * sprites.on({
   *  "load" : function(evt) {
   *    console.log("load event fired - e.target", e.target, "e.bgElement", e.bgElement);
   *  }
   * });
   */
  load: {
    target: HTMLElement;
    bgElement: HTMLDivElement;
  };
  /**
   * An event that occurs when the image index is changed by the user's left / right panning
   * @ko 사용자의 좌우 Panning 에 의해 이미지 인덱스가 변경되었을때 발생하는 이벤트
   * @name eg.view360.SpriteImage#imageError
   * @event
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {String} param.imageUrl User-specified image URL <ko>사용자가 지정한 이미지 URL</ko>
   *
   * @example
   *
   * sprites.on({
   *  "imageError" : function(evt) {
   *    // Error handling
   *    console.log(e.imageUrl);
   *  }
   * });
   */
  imageError: {
    imageUrl?: string;
  };
}

/**
 * @memberof eg.view360
 * @extends eg.Component
 * SpriteImage
 */
class SpriteImage extends Component<SpriteImageEvent> {
  private static _createBgDiv(wrapperInContainer: HTMLDivElement | null, img: HTMLImageElement, rowCount: number, colCount: number, autoHeight: boolean) {
    const el = wrapperInContainer || document.createElement("div");

    el.style.position = "relative";
    el.style.overflow = "hidden";

    img.style.position = "absolute";
    img.style.width = `${colCount * 100}%`;
    img.style.height = `${rowCount * 100}%`;

    /** Prevent image from being dragged on IE10, IE11, Safari especially */
    img.ondragstart = () => (false); // img.style.pointerEvents = "none";
    // Use hardware accelerator if available
    if (SUPPORT_WILLCHANGE) {
      (img.style.willChange = "transform");
    }

    el.appendChild(img);

    const unitWidth = img.naturalWidth / colCount;
    const unitHeight = img.naturalHeight / rowCount;

    if (autoHeight) {
      const r = unitHeight / unitWidth;

      el.style.paddingBottom = `${r * 100}%`;
    } else {
      el.style.height = "100%";
    }

    return el;
  }

  private static _getSizeString(size) {
    if (typeof size === "number") {
      return `${size}px`;
    }

    return size;
  }

  public static VERSION = VERSION;

  private _el: HTMLElement;
  private _rowCount: number;
  private _colCount: number;
  private _totalCount: number;
  private _width: number | string;
  private _height: number | string;
  private _autoHeight: boolean;
  private _colRow: number[];
  private _image: HTMLImageElement;
  private _bg: HTMLDivElement;
  private _autoPlayReservedInfo: { interval: number; playCount: number } | null;
  private _autoPlayTimer: number;

  /**
   * @class eg.view360.SpriteImage
   * @classdesc A module that displays a single or continuous image of any one of the "sprite images". SpinViewer internally uses SpriteImage to show each frame of the sprite image.
   * @ko 스프라이트 이미지 중 임의의 한 프레임을 단발성 혹은 연속적으로 보여주는 컴포넌트입니다. SpinViewer 는 내부적으로 SpriteImage 를 사용하여 스프라이트 이미지의 각 프레임을 보여줍니다.
   * @extends eg.Component
   *
   * @param {HTMLElement} element The element to show the image <ko>이미지를 보여줄 대상 요소</ko>
   * @param {Object} options The option object<ko>파라미터 객체</ko>
   * @param {String} options.imageUrl The url of the sprite image <ko>스프라이트 이미지의 url</ko>
   * @param {Number} [options.rowCount=1] Number of horizontal frames in the sprite image <ko>스프라이트 이미지의 가로 프레임 갯수</ko>
   * @param {Number} [options.colCount=1] Number of vertical frames in the sprite image <ko>스프라이트 이미지의 세로 프레임 갯수</ko>
   * @param {Number|String} [options.width="auto"] The width of the target element to show the image <ko>이미지를 보여줄 대상 요소의 너비</ko>
   * @param {Number|String} [options.height="auto"] The height of the target element to show the image <ko>이미지를 보여줄 대상 요소의 높이</ko>
   * @param {Boolean} [options.autoHeight=true] Whether to automatically set the height of the image area to match the original image's proportion <ko>원본 이미지 비율에 맞게 이미지 영역의 높이를 자동으로 설정할지 여부</ko>
   * @param {Number[]} [options.colRow=[0, 0]] The column, row coordinates of the first frame of the sprite image (based on 0 index) <ko> 스프라이트 이미지 중 처음 보여줄 프레임의 (column, row) 좌표 (0 index 기반)</ko>
   * @param {Number} [options.frameIndex=0] frameIndex specifies the index of the frame to be displayed in the "Sprite image". The frameIndex order is zero-based and indexed in Z form (left-to-right, top-to-bottom, and newline again from left to right).<br>- colRow is equivalent to frameIndex. However, if colRow is specified at the same time, colRow takes precedence.<ko>스프라이트 이미지 중에서 보여질 프레임의 인덱스를 지정합니다. frameIndex 순서는 0부터 시작하며 Z 형태(왼쪽에서 오른쪽, 위에서 아래, 개행 시 다시 왼쪽 부터)로 인덱싱합니다.<br>- colRow 는 frameIndex 와 동일한 기능을 합니다. 단, colRow 가 동시에 지정된 경우 colRow 가 우선합니다.</ko>
   * @param {Number} [options.scale=1] Spin scale (The larger the spin, the more).<ko>Spin 배율 (클 수록 더 많이 움직임)</ko>
   *
   * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
   * @example
   *
   * // Initialize SpriteImage
   *
   * var el = document.getElementById("image-div");
   * var sprites = new eg.view360.SpriteImage(el, {
   * 	imageUrl: "/img/bag360.jpg", // required
   * 	rowCount: 24
   * });
   */
  public constructor(element: HTMLElement, options: Partial<SpinViewerOptions> = {}) {
    super();
    const opt = options || {};

    this._el = element;
    this._rowCount = opt.rowCount || 1;
    this._colCount = opt.colCount || 1;
    this._totalCount = this._rowCount * this._colCount; // total frames
    this._width = opt.width || "auto";
    this._height = opt.height || "auto";
    this._autoHeight = opt.autoHeight != null ? opt.autoHeight : true; // If autoHeight is specified, _height will be overwritten.
    this._colRow = [0, 0];

    if (opt.colRow) {
      this._colRow = opt.colRow;
    } else if (opt.frameIndex) {
      this.setFrameIndex(opt.frameIndex);
    }

    this._el.style.width = SpriteImage._getSizeString(this._width);
    this._el.style.height = SpriteImage._getSizeString(this._height);

    const wrapperClass = opt.wrapperClass || DEFAULT_WRAPPER_CLASS;
    const imageClass = opt.imageClass || DEFAULT_IMAGE_CLASS;

    if (!opt.imageUrl) {
      setTimeout(() => {
        this.trigger(new ComponentEvent("imageError", {
          imageUrl: opt.imageUrl
        }));
      }, 0);
      return;
    }

    const imageInContainer = element.querySelector<HTMLImageElement>(`.${imageClass}`);
    const wrapperInContainer = element.querySelector<HTMLDivElement>(`.${wrapperClass}`);

    if (wrapperInContainer && imageInContainer) {
      // Set it to invisible to prevent wrapper being resized
      imageInContainer.style.display = "none";
    }

    this._image = imageInContainer || new Image();
    /**
     * Event
     */

    const image = this._image;

    image.onload = () => {
      if (wrapperInContainer && imageInContainer) {
        imageInContainer.style.display = "";
      }

      this._bg = SpriteImage._createBgDiv(
        wrapperInContainer,
        image,
        this._rowCount,
        this._colCount,
        this._autoHeight
      );
      this._el.appendChild(this._bg);
      this.setColRow(this._colRow[0], this._colRow[1]);

      this.trigger(new ComponentEvent("load", {
        target: this._el,
        bgElement: this._bg
      }));

      if (this._autoPlayReservedInfo) {
        this.play(this._autoPlayReservedInfo);
        this._autoPlayReservedInfo = null;
      }
    };

    image.onerror = () => {
      this.trigger(new ComponentEvent("imageError", {
        imageUrl: opt.imageUrl
      }));
    };

    image.src = opt.imageUrl;
  }

  /**
   * Specifies the frameIndex of the frame to be shown in the sprite image.
   * @ko 스프라이트 이미지 중 보여질 프레임의 frameIndex 값을 지정
   * @method eg.view360.SpriteImage#setFrameIndex
   * @param {Number} frameIndex frame index of a frame<ko>프레임의 인덱스</ko>
   *
   * @example
   *
   * sprites.setFrameIndex(0, 1);// col = 0, row = 1
   */
  public setFrameIndex(index: number) {
    const colRow = this.toColRow(index);

    this.setColRow(colRow[0], colRow[1]);
  }

  /**
   * Returns the frameIndex of the frame to be shown in the sprite image.
   * @ko 스프라이트 이미지 중 보여지는 프레임의 index 값을 반환
   * @method eg.view360.SpriteImage#getFrameIndex
   * @return {Number} frame index <ko>frame 인덱스</ko>
   *
   * @example
   *
   * var frameIndex = sprites.getFrameIndex(); // eg. frameIndex = 1
   *
   */
  public getFrameIndex() {
    return this._colRow[1] * this._colCount + this._colRow[0];
  }

  /**
   * Specifies the col and row values of the frame to be shown in the sprite image.
   * @ko 스프라이트 이미지 중 보여질 프레임의 col, row 값을 지정
   * @method eg.view360.SpriteImage#setColRow
   * @param {Number} col Column number of a frame<ko>프레임의 행값</ko>
   * @param {Number} row Row number of a frame<ko>프레임의 열값</ko>
   *
   * @example
   *
   * sprites.setlColRow(1, 2); // col = 1, row = 2
   */
  public setColRow(col: number, row: number) {
    if (row > this._rowCount - 1 || col > this._colCount - 1) {
      return;
    }

    if (this._image && TRANSFORM) {
      // NOTE: Currently, do not apply translate3D for using layer hack. Do we need layer hack for old browser?
      this._image.style[TRANSFORM] = `translate(${-(col / this._colCount * 100)}%, ${-(row / this._rowCount * 100)}%)`;
    }

    this._colRow = [col, row];
  }

  /**
   * Returns the col and row values of the frame to be shown in the sprite image.
   * @ko 스프라이트 이미지 중 보여지는 프레임의 col, row 값을환반환
   * @method eg.view360.SpriteImage#gelColRow
   * @return {Number[]} Array containing col, row<ko>col, row 정보를 담는 배열</ko>
   *
   * @example
   *
   * var colRow = sprites.getlColRow();
   * // colRow = [1, 2] - index of col is 1, index of row is 2
   *
   */
  public getColRow() {
    return this._colRow;
  }

  /**
   * Stop playing
   * @ko play 되고 있던 프레임 재생을 중지합니다.
   * @method eg.view360.SpriteImage#stop
   *
   * @example
   *
   * viewer.stop();
   *
   */
  public stop() {
    if (this._autoPlayTimer) {
      clearInterval(this._autoPlayTimer);
      this._autoPlayTimer = -1;
    }
  }

  /**
   * Switches frames sequentially in the 'interval' starting from the currently displayed frame and plays all frames by 'playCount'.
   * @ko 현재 보여지고 있는 프레임을 시작으로 'interval' 간격으로 순차적으로 프레임을 전환하며 모든 프레임을 'playCount' 만큼 재생한다.
   * @method eg.view360.SpriteImage#play
   * @param {Object} param The parameter object<ko>파라미터 객체</ko>
   * @param {Number} [param.interval=1000 / totalFrameCount] Interframe Interval - in milliseconds<ko>프레임간 간격 - 밀리세컨드 단위</ko>
   * @param {Number} [param.playCount=0] PlayCount = 1 in which all frames are reproduced once, and playCount = n in which all frames are repeated n times. playCount = 0 in which all frames are repeated infinitely<ko>모든 프레임을 1회씩 재생한 것이 playCount = 1, 모든 프레임을 n 회 재상한 것이 playCount = n 이 된다. 0 dms 무한반복</ko>
   *
   * @example
   *
   * viewer.play({angle: 16, playCount: 1});
   *
   */
  public play({ interval, playCount } = { interval: 1000 / this._totalCount, playCount: 0 }) {
    if (!this._bg) {
      this._autoPlayReservedInfo = {interval, playCount};
      return;
    }

    if (this._autoPlayTimer) {
      clearInterval(this._autoPlayTimer);
      this._autoPlayTimer = -1;
    }

    let frameIndex = this.getFrameIndex();
    let count = 0;
    let frameCount = 0; // for checking 1 cycle

    this._autoPlayTimer = window.setInterval(() => {
      frameIndex %= this._totalCount;
      const colRow = this.toColRow(frameIndex);

      this.setColRow(colRow[0], colRow[1]);
      frameIndex++;

      // Done 1 Cycle?
      if (++frameCount === this._totalCount) {
        frameCount = 0;
        count++;
      }

      if (playCount > 0 && count === playCount) {
        clearInterval(this._autoPlayTimer);
      }
    }, interval);
  }

  public toColRow(frameIndex: number) {
    const colCount = this._colCount;
    const rowCount = this._rowCount;

    if (frameIndex < 0) {
      return [0, 0];
    } else if (frameIndex >= this._totalCount) {
      return [colCount - 1, rowCount - 1];
    }

    const col = frameIndex % colCount;
    const row = Math.floor(frameIndex / colCount);

    // console.log(frameIndex, col, row);
    return [col, row];
  }
}

export default SpriteImage;
