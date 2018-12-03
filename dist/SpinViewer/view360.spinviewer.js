/*
Copyright (c) 2017 NAVER Corp.
@egjs/view360 project is licensed under the MIT license
@egjs/view360 JavaScript library
https://github.com/naver/egjs-view360
@version 3.2.0-rc
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@egjs/axes'), require('@egjs/component')) :
  typeof define === 'function' && define.amd ? define(['exports', '@egjs/axes', '@egjs/component'], factory) :
  (factory((global.eg = global.eg || {}, global.eg.view360 = {}),global.eg.Axes,global.eg.Component));
}(this, (function (exports,Axes,Component) { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  /**
   * Copyright (c) 2015 NAVER Corp.
   * egjs projects are licensed under the MIT license
   */

  /* eslint-disable no-new-func, no-nested-ternary */
  var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
  /* eslint-enable no-new-func, no-nested-ternary */

  var doc = win.document;

  /**
   * Copyright (c) 2015 NAVER Corp.
   * egjs projects are licensed under the MIT license
   */
  win.Float32Array = typeof win.Float32Array !== "undefined" ? win.Float32Array : win.Array;
  var Float32Array = win.Float32Array;
  var getComputedStyle = win.getComputedStyle;
  var userAgent = win.navigator.userAgent;
  var DeviceMotionEvent = win.DeviceMotionEvent;
  var devicePixelRatio = win.devicePixelRatio;

  var TRANSFORM = function () {
    var docStyle = doc.documentElement.style;
    var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

    for (var i = 0, len = target.length; i < len; i++) {
      if (target[i] in docStyle) {
        return target[i];
      }
    }

    return "";
  }(); // check for will-change support


  var SUPPORT_WILLCHANGE = win.CSS && win.CSS.supports && win.CSS.supports("will-change", "transform");

  var VERSION = "3.2.0-rc";

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

  var SpriteImage =
  /*#__PURE__*/
  function () {
    var SpriteImage =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(SpriteImage, _Component);

      function SpriteImage(element, options) {
        var _this;

        _this = _Component.call(this) || this;
        var opt = options || {};
        _this._el = element;
        _this._rowCount = opt.rowCount || 1;
        _this._colCount = opt.colCount || 1;
        _this._totalCount = _this._rowCount * _this._colCount; // total frames

        _this._width = opt.width || "auto";
        _this._height = opt.height || "auto";
        _this._autoHeight = opt.autoHeight != null ? opt.autoHeight : "true"; // If autoHeight is specified, _height will be overwritten.

        _this._colRow = [0, 0];

        if (opt.colRow) {
          _this._colRow = opt.colRow;
        } else if (opt.frameIndex) {
          _this.setFrameIndex(opt.frameIndex);
        }

        _this._el.style.width = SpriteImage._getSizeString(_this._width);
        _this._el.style.height = SpriteImage._getSizeString(_this._height);

        if (!opt.imageUrl) {
          setTimeout(function () {
            _this.trigger("imageError", {
              imageUrl: opt.imageUrl
            });
          }, 0);
          return _assertThisInitialized(_this);
        }

        _this._image = new Image();
        /**
         * Event
         */

        _this._image.onload = function () {
          _this._bg = SpriteImage._createBgDiv(_this._image, _this._rowCount, _this._colCount, _this._autoHeight);

          _this._el.appendChild(_this._bg);

          _this.setColRow(_this._colRow[0], _this._colRow[1]);
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
           *	"load" : function(evt) {
           *		console.log("load event fired - e.target", e.target, "e.bgElement", e.bgElement);
           *	}
           * });
           */


          _this.trigger("load", {
            target: _this._el,
            bgElement: _this._bg
          });

          if (_this._autoPlayReservedInfo) {
            _this.play(_this._autoPlayReservedInfo);

            _this._autoPlayReservedInfo = null;
          }
        };

        _this._image.onerror = function (e) {
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
           *	"imageError" : function(evt) {
           *		// Error handling
           *		console.log(e.imageUrl);
           *	}
           * });
           */
          _this.trigger("imageError", {
            imageUrl: opt.imageUrl
          });
        };

        _this._image.src = opt.imageUrl;
        return _this;
      }

      SpriteImage._createBgDiv = function _createBgDiv(img, rowCount, colCount, autoHeight) {
        var el = document.createElement("div");
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


        SUPPORT_WILLCHANGE && (img.style.willChange = "transform");
        el.appendChild(img);
        var unitWidth = img.width / colCount;
        var unitHeight = img.height / rowCount;

        if (autoHeight) {
          var r = unitHeight / unitWidth;
          el.style.paddingBottom = r * 100 + "%";
        } else {
          el.style.height = "100%";
        }

        return el;
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


      var _proto = SpriteImage.prototype;

      _proto.setFrameIndex = function setFrameIndex(index) {
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


      _proto.getFrameIndex = function getFrameIndex() {
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


      _proto.setColRow = function setColRow(col, row) {
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


      _proto.getColRow = function getColRow() {
        return this._colRow;
      };

      SpriteImage._getSizeString = function _getSizeString(size) {
        if (typeof size === "number") {
          return size + "px";
        }

        return size;
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


      _proto.stop = function stop() {
        if (this._autoPlayTimer) {
          clearInterval(this._autoPlayTimer);
          this._autoPlayTimer = null;
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


      _proto.play = function play(_temp) {
        var _this2 = this;

        var _ref = _temp === void 0 ? {
          interval: 1000 / this._totalCount,
          playCount: 0
        } : _temp,
            interval = _ref.interval,
            playCount = _ref.playCount;

        if (!this._bg) {
          this._autoPlayReservedInfo = {
            interval: interval,
            playCount: playCount
          };
          return;
        }

        if (this._autoPlayTimer) {
          clearInterval(this._autoPlayTimer);
          this._autoPlayTimer = null;
        }

        var frameIndex = this.getFrameIndex();
        var count = 0;
        var frameCount = 0; // for checking 1 cycle

        this._autoPlayTimer = setInterval(function () {
          frameIndex %= _this2._totalCount;

          var colRow = _this2.toColRow(frameIndex);

          _this2.setColRow(colRow[0], colRow[1]);

          frameIndex++; // Done 1 Cycle?

          if (++frameCount === _this2._totalCount) {
            frameCount = 0;
            count++;
          }

          if (playCount > 0 && count === playCount) {
            clearInterval(_this2._autoPlayTimer);
          }
        }, interval);
      };

      _proto.toColRow = function toColRow(frameIndex) {
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

      return SpriteImage;
    }(Component);

    SpriteImage.VERSION = VERSION;
    return SpriteImage;
  }();

  var DEFAULT_PAN_SCALE = 0.21;
  /**
   * @class eg.view360.SpinViewer
   * @classdesc A module used to displays each image sequentially according to the direction of the user's touch movement (left / right) of the sprite image that is collected by rotating the object.
   * @ko 물체 주위를 회전하여 촬영한 이미지들을 모은 스프라이트 이미지를 사용자의 터치 이동 방향(좌 / 우) 에 따라 각 이미지들을 순차적으로 보여주는 컴포넌트입니다.
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
   * @param {Number} [options.scale=1] Spin scale (The larger the spin, the more).<ko>Spin 배율 (클 수록 더 많이 움직임)</ko>
   * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
   * @example
   *
   * // Initialize SpinViewer
   * var el = document.getElementById("product-360");
   * var viewer = new eg.view360.SpinViewer(el, {
   * 	imageUrl: "/img/bag360.jpg", // required
   * 	rowCount: 24 //required
   * });
   */

  var SpinViewer =
  /*#__PURE__*/
  function () {
    var SpinViewer =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(SpinViewer, _Component);

      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @type {String}
       * @example
       * eg.view360.SpinViewer.VERSION;  // ex) 3.0.1
       * @memberof eg.view360.SpinViewer
       */
      function SpinViewer(element, options) {
        var _this;

        _this = _Component.call(this) || this;
        _this._el = element;

        var opt = _extends({}, options);

        var colCount = opt.colCount || 1;
        var rowCount = opt.rowCount || 1;
        _this._scale = opt.scale || 1;
        _this._panScale = _this._scale * DEFAULT_PAN_SCALE;
        _this._frameCount = colCount * rowCount; // Init SpriteImage

        _this._sprites = new SpriteImage(element, opt).on({
          "load": function load(evt) {
            /**
             * Events that occur when component loading is complete
             * @ko 컴포넌트 로딩이 완료되면 발생하는 이벤트
             * @name eg.view360.SpinViewer#load
             * @event
             * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             * @param {HTMLElement} param.target The target element for which to display the image <ko>이미지를 보여줄 대상 엘리먼트</ko>
             * @param {HTMLElement} param.bgElement Generated background image element <ko>생성된 background 이미지 엘리먼트</ko>
             *
             * @example
             *
             * viwer.on({
             *	"load" : function(evt) {
             *		this.spinBy(360, {duration: 300});
             *	}
             * });
             */
            _this.trigger("load", evt);
          },
          "imageError": function imageError(evt) {
            /**
             * An event that occurs when the image index is changed by the user's left / right panning
             * @ko 사용자의 좌우 Panning 에 의해 이미지 인덱스가 변경되었을때 발생하는 이벤트
             * @name eg.view360.SpinViewer#imageError
             * @event
             * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             * @param {String} param.imageUrl User-specified image URL <ko>사용자가 지정한 이미지 URL</ko>
             *
             * @example
             *
             * viewer.on({
             *	"imageError" : function(evt) {
             *		// Error handling
             *		console.log(e.imageUrl);
             *	}
             * });
             */
            _this.trigger("imageError", {
              imageUrl: evt.imageUrl
            });
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
          "change": function change(evt) {
            var curr = Math.floor(evt.pos.angle / (360 / _this._frameCount));
            var frameIndex = _this._frameCount - curr - 1;

            _this._sprites.setFrameIndex(frameIndex);
            /**
             * An event that occurs when the image index is changed by the user's left / right panning
             * @ko 사용자의 좌우 Panning 에 의해 이미지 인덱스가 변경되었을때 발생하는 이벤트
             * @name eg.view360.SpinViewer#change
             * @event
             * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             * @param {Number[]} param.colRow Column, row of the frame in the sprite image <ko>스프라이트 이미지 내 프레임의 column, row</ko>
             * @param {Number} param.frameIndex Index value that is sequentially appended in Z direction based on col and row.<ko>col, row 를 기반으로 Z 방향으로 순차적으로 붙여지는 index 값</ko>
             * @param {Number} param.angle The angle that is currently internally held at an angle between 0 and 359. (not a real product angle) <ko>0 ~ 359 범위의 각도로 현재 내부적으로 유지하고 있는 각도 (실제 이미지의 각도가 아님)</ko>
             *
             * @example
             *
             * viwer.on({
             *	"change" : function(evt) {
             *		console.log(event.frameIndex, event.colRow, event.angle);   // event.colRow = [0, 4] event.frameIndex = 4, event = 30
             *	}
             * });
             */


            _this.trigger("change", {
              frameIndex: frameIndex,
              colRow: _this._sprites.getColRow(),
              angle: evt.pos.angle
            });
          },
          "animationEnd": function animationEnd(evt) {
            /**
             * This event is fired when animation ends.
             * @ko 에니메이션이 끝났을 때 발생하는 이벤트
             * @name eg.view360.SpinViewer#animationEnd
             * @event
             * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             * @param {Boolean} param.isTrusted true if an event was generated by the user action, or false if it was caused by a script or API call<ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
             *
             * @example
             *
             * viwer.on({
             *	"animationEnd" : function(evt) {
             *		// evt.isTrusted === true or false
             *	}
             * });
             */
            _this.trigger("animationEnd", {
              isTrusted: evt.isTrusted
            });
          }
        });

        _this._axes.connect("angle", _this._panInput);

        return _this;
      }
      /**
       * Set spin scale
       * @ko scale 을 조정할 수 있는 함수
       * @method eg.view360.SpinViewer#setScale
       * @param {Number} scale Rotation multiples at spin, the larger the rotation<ko>Spin 시 회전 배수값, 커질 수록 더 많이 회전</ko>
       *
       * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
       *
       * @example
       *
       * viewer.setScale(2);// It moves twice as much.
       */


      var _proto = SpinViewer.prototype;

      _proto.setScale = function setScale(scale) {
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
       * @method eg.view360.SpinViewer#getScale
       *
       * @return {Number} Rotation multiples at spin, the larger the rotation<ko>Spin 시 회전 배수값, 커질 수록 더 많이 회전</ko>
       *
       * @example
       *
       * viewer.getScale();// It returns number
       */


      _proto.getScale = function getScale() {
        return this._scale;
      };
      /**
       * It gives the effect of rotating for a certain duration by the specified angle based on the current rotation angle.
       * @ko 현재 회전 각도를 기준으로 지정된 각도(angle)만큼 일정 시간동안(duration) 회전하는 효과를 준다.
       * @method eg.view360.SpinViewer#spinBy
       *
       * @param {Number} [angle = 0] angle<ko>상대적 회전 각도</ko>
       * @param {Object} param The parameter object<ko>파라미터 객체</ko>
       * @param {Number} [param.duration = 0] duration<ko>회전할 시간 - 밀리세컨드 단위</ko>
       *
       * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
       *
       * @example
       *
       * viewer.spinBy(720, {duration: 500});
       */


      _proto.spinBy = function spinBy(angle, param) {
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
       * @method eg.view360.SpinViewer#spinTo
       *
       * @param {Number} [angle = 0] angle<ko>회전 각도</ko>
       * @param {Object} param The parameter object<ko>파라미터 객체</ko>
       * @param {Number} [param.duration = 0] duration<ko>회전할 시간 - 밀리세컨드 단위</ko>
       *
       * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
       *
       * @example
       *
       * viewer.spinTo(30, {duration:100});
       */


      _proto.spinTo = function spinTo(angle, param) {
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


      _proto.getAngle = function getAngle() {
        return this._axes.get().angle || 0;
      };

      return SpinViewer;
    }(Component);

    SpinViewer.VERSION = VERSION;
    return SpinViewer;
  }();

  exports.SpinViewer = SpinViewer;
  exports.SpriteImage = SpriteImage;
  exports.VERSION = VERSION;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=view360.spinviewer.js.map
