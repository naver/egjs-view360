/*
Copyright (c) 2017-present NAVER Corp.
name: @egjs/view360
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-view360
version: 3.6.4
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@egjs/component'), require('@egjs/axes'), require('@egjs/agent')) :
  typeof define === 'function' && define.amd ? define(['@egjs/component', '@egjs/axes', '@egjs/agent'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.eg = global.eg || {}, global.eg.view360 = factory(global.eg.Component, global.eg.Axes, global.eg.agent)));
}(this, (function (Component, Axes, getAgent) { 'use strict';

  var VERSION = "3.6.4";

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  /* global Reflect, Promise */
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  function __extends(d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = function () {
    __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }

      return t;
    };

    return __assign.apply(this, arguments);
  };
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;

    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = {
        error: error
      };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }

    return ar;
  }
  function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

    return ar;
  }

  var merge = function (target) {
    var srcs = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      srcs[_i - 1] = arguments[_i];
    }

    srcs.forEach(function (source) {
      Object.keys(source).forEach(function (key) {
        var value = source[key];

        if (Array.isArray(target[key]) && Array.isArray(value)) {
          target[key] = __spread(target[key], value);
        } else {
          target[key] = value;
        }
      });
    });
    return target;
  };

  /* eslint-disable @typescript-eslint/no-implied-eval */
  /* eslint-disable no-new-func, no-nested-ternary */

  var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
  /* eslint-enable no-new-func, no-nested-ternary */

  var doc = win.document;
  var nav = win.navigator;
  var agent = getAgent();
  var osName = agent.os.name;
  var browserName = agent.browser.name;

  /* eslint-disable @typescript-eslint/naming-convention */
  win.Float32Array = typeof win.Float32Array !== "undefined" ? win.Float32Array : win.Array;
  var Float32Array = win.Float32Array;
  var getComputedStyle = win.getComputedStyle;
  var userAgent = win.navigator && win.navigator.userAgent;
  var DeviceMotionEvent = win.DeviceMotionEvent;
  var devicePixelRatio = win.devicePixelRatio;

  var TRANSFORM = function () {
    var _a;

    var docStyle = (_a = doc === null || doc === void 0 ? void 0 : doc.documentElement.style) !== null && _a !== void 0 ? _a : {};
    var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

    for (var i = 0, len = target.length; i < len; i++) {
      if (target[i] in docStyle) {
        return target[i];
      }
    }

    return "";
  }(); // check for will-change support


  var SUPPORT_WILLCHANGE = win.CSS && win.CSS.supports && win.CSS.supports("will-change", "transform");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var SPINVIEWER_OPTIONS = {
    imageUrl: true,
    rowCount: true,
    colCount: true,
    width: true,
    height: true,
    autoHeight: true,
    colRow: true,
    scale: true,
    frameIndex: true,
    wrapperClass: true,
    imageClass: true
  };
  var SPINVIEWER_EVENTS = {
    LOAD: "load",
    IMAGE_ERROR: "imageError",
    CHANGE: "change",
    ANIMATION_END: "animationEnd"
  };
  var DEFAULT_WRAPPER_CLASS = "view360-wrapper";
  var DEFAULT_IMAGE_CLASS = "view360-image";

  var Constants = {
    __proto__: null,
    SPINVIEWER_OPTIONS: SPINVIEWER_OPTIONS,
    SPINVIEWER_EVENTS: SPINVIEWER_EVENTS,
    DEFAULT_WRAPPER_CLASS: DEFAULT_WRAPPER_CLASS,
    DEFAULT_IMAGE_CLASS: DEFAULT_IMAGE_CLASS
  };

  /**
   * @memberof eg.view360
   * @extends eg.Component
   * SpriteImage
   */

  var SpriteImage =
  /*#__PURE__*/
  function (_super) {
    __extends(SpriteImage, _super);
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


    function SpriteImage(element, options) {
      if (options === void 0) {
        options = {};
      }

      var _this = _super.call(this) || this;

      var opt = options || {};
      _this._el = element;
      _this._rowCount = opt.rowCount || 1;
      _this._colCount = opt.colCount || 1;
      _this._totalCount = _this._rowCount * _this._colCount; // total frames

      _this._width = opt.width || "auto";
      _this._height = opt.height || "auto";
      _this._autoHeight = opt.autoHeight != null ? opt.autoHeight : true; // If autoHeight is specified, _height will be overwritten.

      _this._colRow = [0, 0];

      if (opt.colRow) {
        _this._colRow = opt.colRow;
      } else if (opt.frameIndex) {
        _this.setFrameIndex(opt.frameIndex);
      }

      _this._el.style.width = SpriteImage._getSizeString(_this._width);
      _this._el.style.height = SpriteImage._getSizeString(_this._height);
      var wrapperClass = opt.wrapperClass || DEFAULT_WRAPPER_CLASS;
      var imageClass = opt.imageClass || DEFAULT_IMAGE_CLASS;

      if (!opt.imageUrl) {
        setTimeout(function () {
          _this.trigger(new Component.ComponentEvent("imageError", {
            imageUrl: opt.imageUrl
          }));
        }, 0);
        return _this;
      }

      var imageInContainer = element.querySelector("." + imageClass);
      var wrapperInContainer = element.querySelector("." + wrapperClass);

      if (wrapperInContainer && imageInContainer) {
        // Set it to invisible to prevent wrapper being resized
        imageInContainer.style.display = "none";
      }

      _this._image = imageInContainer || new Image();
      /**
       * Event
       */

      var image = _this._image;

      image.onload = function () {
        if (wrapperInContainer && imageInContainer) {
          imageInContainer.style.display = "";
        }

        _this._bg = SpriteImage._createBgDiv(wrapperInContainer, image, _this._rowCount, _this._colCount, _this._autoHeight);

        _this._el.appendChild(_this._bg);

        _this.setColRow(_this._colRow[0], _this._colRow[1]);

        _this.trigger(new Component.ComponentEvent("load", {
          target: _this._el,
          bgElement: _this._bg
        }));

        if (_this._autoPlayReservedInfo) {
          _this.play(_this._autoPlayReservedInfo);

          _this._autoPlayReservedInfo = null;
        }
      };

      image.onerror = function () {
        _this.trigger(new Component.ComponentEvent("imageError", {
          imageUrl: opt.imageUrl
        }));
      };

      image.src = opt.imageUrl;
      return _this;
    }

    var __proto = SpriteImage.prototype;

    SpriteImage._createBgDiv = function (wrapperInContainer, img, rowCount, colCount, autoHeight) {
      var el = wrapperInContainer || document.createElement("div");
      el.style.position = "relative";
      el.style.overflow = "hidden";
      img.style.position = "absolute";
      img.style.width = colCount * 100 + "%";
      img.style.height = rowCount * 100 + "%";
      /** Prevent image from being dragged on IE10, IE11, Safari especially */

      img.ondragstart = function () {
        return false;
      }; // img.style.pointerEvents = "none";
      // Use hardware accelerator if available


      if (SUPPORT_WILLCHANGE) {
        img.style.willChange = "transform";
      }

      el.appendChild(img);
      var unitWidth = img.naturalWidth / colCount;
      var unitHeight = img.naturalHeight / rowCount;

      if (autoHeight) {
        var r = unitHeight / unitWidth;
        el.style.paddingBottom = r * 100 + "%";
      } else {
        el.style.height = "100%";
      }

      return el;
    };

    SpriteImage._getSizeString = function (size) {
      if (typeof size === "number") {
        return size + "px";
      }

      return size;
    };
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


    __proto.setFrameIndex = function (index) {
      var colRow = this.toColRow(index);
      this.setColRow(colRow[0], colRow[1]);
    };
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


    __proto.getFrameIndex = function () {
      return this._colRow[1] * this._colCount + this._colRow[0];
    };
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


    __proto.setColRow = function (col, row) {
      if (row > this._rowCount - 1 || col > this._colCount - 1) {
        return;
      }

      if (this._image && TRANSFORM) {
        // NOTE: Currently, do not apply translate3D for using layer hack. Do we need layer hack for old browser?
        this._image.style[TRANSFORM] = "translate(" + -(col / this._colCount * 100) + "%, " + -(row / this._rowCount * 100) + "%)";
      }

      this._colRow = [col, row];
    };
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


    __proto.getColRow = function () {
      return this._colRow;
    };
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


    __proto.stop = function () {
      if (this._autoPlayTimer) {
        clearInterval(this._autoPlayTimer);
        this._autoPlayTimer = -1;
      }
    };
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


    __proto.play = function (_a) {
      var _this = this;

      var _b = _a === void 0 ? {
        interval: 1000 / this._totalCount,
        playCount: 0
      } : _a,
          interval = _b.interval,
          playCount = _b.playCount;

      if (!this._bg) {
        this._autoPlayReservedInfo = {
          interval: interval,
          playCount: playCount
        };
        return;
      }

      if (this._autoPlayTimer) {
        clearInterval(this._autoPlayTimer);
        this._autoPlayTimer = -1;
      }

      var frameIndex = this.getFrameIndex();
      var count = 0;
      var frameCount = 0; // for checking 1 cycle

      this._autoPlayTimer = window.setInterval(function () {
        frameIndex %= _this._totalCount;

        var colRow = _this.toColRow(frameIndex);

        _this.setColRow(colRow[0], colRow[1]);

        frameIndex++; // Done 1 Cycle?

        if (++frameCount === _this._totalCount) {
          frameCount = 0;
          count++;
        }

        if (playCount > 0 && count === playCount) {
          clearInterval(_this._autoPlayTimer);
        }
      }, interval);
    };

    __proto.toColRow = function (frameIndex) {
      var colCount = this._colCount;
      var rowCount = this._rowCount;

      if (frameIndex < 0) {
        return [0, 0];
      } else if (frameIndex >= this._totalCount) {
        return [colCount - 1, rowCount - 1];
      }

      var col = frameIndex % colCount;
      var row = Math.floor(frameIndex / colCount); // console.log(frameIndex, col, row);

      return [col, row];
    };

    SpriteImage.VERSION = VERSION;
    return SpriteImage;
  }(Component);

  var DEFAULT_PAN_SCALE = 0.21;
  /**
   * @memberof eg.view360
   * @extends eg.Component
   * SpinViewer
   */

  var SpinViewer =
  /*#__PURE__*/
  function (_super) {
    __extends(SpinViewer, _super);
    /**
     * @classdesc A module used to displays each image sequentially according to the direction of the user's touch movement (left / right) of the sprite image that is collected by rotating the object.
     * @ko 물체 주위를 회전하여 촬영한 이미지들을 모은 스프라이트 이미지를 사용자의 터치 이동 방향(좌 / 우) 에 따라 각 이미지들을 순차적으로 보여주는 컴포넌트입니다.
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
     * @param {Number} [options.scale=1] Spin scale (The larger the spin, the more).<ko>Spin 배율 (클 수록 더 많이 움직임)</ko>
     * @param {Number} [options.frameIndex] The frameIndex of the frame to be shown in the sprite image<ko>스프라이트 이미지 중 보여질 프레임의 frameIndex 값</ko>
     * @param {String} [options.wrapperClass="view360-wrapper"] A class name for the parent element of the image element inside the container element. SpinViewer will use the element that has this class instead of creating one if it exists<ko>이미지 엘리먼트의 부모 엘리먼트의 클래스 이름. SpinViewer는 해당 클래스를 갖는 엘리먼트가 콘테이너 엘리먼트 내부에 존재할 경우, 새로 생성하는 대신 그 엘리먼트를 사용할 것입니다</ko>
     * @param {String} [options.imageClass="view360-image"] A class name for the image element inside the container element. SpinViewer will use the image element that has this class instead of creating one if it exists<ko>콘테이너 엘리먼트 내부의 이미지 엘리먼트의 클래스 이름. SpinViewer는 해당 클래스를 갖는 이미지 엘리먼트가 콘테이너 엘리먼트 내부에 존재할 경우, 새로 생성하는 대신 그 엘리먼트를 사용할 것입니다</ko>
     * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
     * @example
     * ```
     * // Initialize SpinViewer
     * var el = document.getElementById("product-360");
     * var viewer = new eg.view360.SpinViewer(el, {
     * 	imageUrl: "/img/bag360.jpg", // required
     * 	rowCount: 24 //required
     * });
     * ```
     */


    function SpinViewer(element, options) {
      if (options === void 0) {
        options = {};
      }

      var _this = _super.call(this) || this;

      _this._el = element;

      var opt = __assign({}, options);

      var colCount = opt.colCount || 1;
      var rowCount = opt.rowCount || 1;
      _this._scale = opt.scale || 1;
      _this._panScale = _this._scale * DEFAULT_PAN_SCALE;
      _this._frameCount = colCount * rowCount; // Init SpriteImage

      _this._sprites = new SpriteImage(element, opt).on({
        "load": function (evt) {
          _this.trigger(new Component.ComponentEvent("load", evt));
        },
        "imageError": function (evt) {
          _this.trigger(new Component.ComponentEvent("imageError", {
            imageUrl: evt.imageUrl
          }));
        }
      }); // Init Axes

      _this._panInput = new Axes.PanInput(_this._el, {
        scale: [_this._panScale, _this._panScale]
      });
      _this._axes = new Axes({
        angle: {
          range: [0, 359],
          circular: true
        }
      }).on({
        "change": function (evt) {
          var curr = Math.floor(evt.pos.angle / (360 / _this._frameCount));
          var frameIndex = _this._frameCount - curr - 1;

          _this._sprites.setFrameIndex(frameIndex);

          _this.trigger(new Component.ComponentEvent("change", {
            frameIndex: frameIndex,
            colRow: _this._sprites.getColRow(),
            angle: evt.pos.angle
          }));
        },
        "animationEnd": function (evt) {
          _this.trigger(new Component.ComponentEvent("animationEnd", {
            isTrusted: evt.isTrusted
          }));
        }
      });

      _this._axes.connect("angle", _this._panInput);

      return _this;
    }
    /**
     * Set spin scale
     * @ko scale 을 조정할 수 있는 함수
     * @param {Number} scale Rotation multiples at spin, the larger the rotation<ko>Spin 시 회전 배수값, 커질 수록 더 많이 회전</ko>
     *
     * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
     *
     * @example
     * viewer.setScale(2);// It moves twice as much.
     */


    var __proto = SpinViewer.prototype;

    __proto.setScale = function (scale) {
      if (isNaN(scale) || scale < 0) {
        return this;
      }

      this._scale = scale;
      this._panScale = scale * DEFAULT_PAN_SCALE;
      this._panInput.options.scale = [this._panScale, this._panScale];
      return this;
    };
    /**
     * Get spin scale
     * @ko scale 값을 반환한다.
     *
     * @return {Number} Rotation multiples at spin, the larger the rotation<ko>Spin 시 회전 배수값, 커질 수록 더 많이 회전</ko>
     *
     * @example
     * viewer.getScale();// It returns number
     */


    __proto.getScale = function () {
      return this._scale;
    };
    /**
     * It gives the effect of rotating for a certain duration by the specified angle based on the current rotation angle.
     * @ko 현재 회전 각도를 기준으로 지정된 각도(angle)만큼 일정 시간동안(duration) 회전하는 효과를 준다.
     * @param {Number} [angle = 0] angle<ko>상대적 회전 각도</ko>
     * @param {Object} param The parameter object<ko>파라미터 객체</ko>
     * @param {Number} [param.duration = 0] duration<ko>회전할 시간 - 밀리세컨드 단위</ko>
     *
     * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
     *
     * @example
     * viewer.spinBy(720, {duration: 500});
     */


    __proto.spinBy = function (angle, param) {
      if (angle === void 0) {
        angle = 0;
      }

      if (param === void 0) {
        param = {
          duration: 0
        };
      }

      this._axes.setBy({
        angle: angle
      }, param.duration);

      return this;
    };
    /**
     * It gives the effect of rotating for a certain duration (duration) by the specified angle (angle).
     * @ko 지정된 각도(angle)만큼 일정 시간동안(duration) 회전하는 효과를 준다.
     * @param {Number} [angle = 0] angle<ko>회전 각도</ko>
     * @param {Object} param The parameter object<ko>파라미터 객체</ko>
     * @param {Number} [param.duration = 0] duration<ko>회전할 시간 - 밀리세컨드 단위</ko>
     *
     * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
     *
     * @example
     * viewer.spinTo(30, {duration:100});
     */


    __proto.spinTo = function (angle, param) {
      if (angle === void 0) {
        angle = 0;
      }

      if (param === void 0) {
        param = {
          duration: 0
        };
      }

      this._axes.setTo({
        angle: angle
      }, param.duration);

      return this;
    };
    /**
     * Returns current angles
     * @ko 현재 각도를 반환한다.
     *
     * @return {Number} Current angle <ko>현재 각도</ko>
     */


    __proto.getAngle = function () {
      return this._axes.get().angle || 0;
    };
    /**
     * Version info string
     * @ko 버전정보 문자열
     * @static
     * @example
     * eg.view360.SpinViewer.VERSION;  // ex) 3.0.1
     * @memberof eg.view360.SpinViewer
     */


    SpinViewer.VERSION = VERSION;
    return SpinViewer;
  }(Component);

  /* eslint-disable @typescript-eslint/naming-convention */
  var SpinViewerModule = {
    SpinViewer: SpinViewer,
    SpriteImage: SpriteImage,
    VERSION: VERSION
  };
  merge(SpinViewerModule, Constants);

  return SpinViewerModule;

})));
//# sourceMappingURL=view360.spinviewer.js.map
