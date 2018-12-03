/*
Copyright (c) 2017 NAVER Corp.
@egjs/view360 project is licensed under the MIT license
@egjs/view360 JavaScript library
https://github.com/naver/egjs-view360
@version 3.2.0-rc
All-in-one packaged file for ease use of '@egjs/view360' with below dependencies.
- @egjs/agent ^2.1.5, @egjs/axes ^2.5.8, @egjs/component ^2.1.2, es6-promise ^4.2.5, webvr-polyfill ^0.9.16
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.eg = global.eg || {}, global.eg.view360 = {})));
}(this, (function (exports) { 'use strict';

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

  /*
  Copyright (c) 2017 NAVER Corp.
  @egjs/component project is licensed under the MIT license

  @egjs/component JavaScript library
  https://naver.github.io/egjs-component

  @version 2.1.2
  */

  /**
   * Copyright (c) 2015 NAVER Corp.
   * egjs projects are licensed under the MIT license
   */
  function isUndefined(value) {
    return typeof value === "undefined";
  }
  /**
   * A class used to manage events in a component
   * @ko 컴포넌트의 이벤트을 관리할 수 있게 하는 클래스
   * @alias eg.Component
   */


  var Component =
  /*#__PURE__*/
  function () {
    var Component =
    /*#__PURE__*/
    function () {
      /**
      * Version info string
      * @ko 버전정보 문자열
      * @name VERSION
      * @static
      * @type {String}
      * @example
      * eg.Component.VERSION;  // ex) 2.0.0
      * @memberof eg.Component
      */

      /**
       * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
       */
      function Component() {
        this._eventHandler = {};
        this.options = {};
      }
      /**
       * Triggers a custom event.
       * @ko 커스텀 이벤트를 발생시킨다
       * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
       * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
       * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
       * @example
      class Some extends eg.Component {
       some(){
       	if(this.trigger("beforeHi")){ // When event call to stop return false.
      	this.trigger("hi");// fire hi event.
       	}
       }
      }
      const some = new Some();
      some.on("beforeHi", (e) => {
      if(condition){
      	e.stop(); // When event call to stop, `hi` event not call.
      }
      });
      some.on("hi", (e) => {
      // `currentTarget` is component instance.
      console.log(some === e.currentTarget); // true
      });
      // If you want to more know event design. You can see article.
      // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
       */


      var _proto = Component.prototype;

      _proto.trigger = function trigger(eventName, customEvent) {
        if (customEvent === void 0) {
          customEvent = {};
        }

        var handlerList = this._eventHandler[eventName] || [];
        var hasHandlerList = handlerList.length > 0;

        if (!hasHandlerList) {
          return true;
        } // If detach method call in handler in first time then handler list calls.


        handlerList = handlerList.concat();
        customEvent.eventType = eventName;
        var isCanceled = false;
        var arg = [customEvent];
        var i = 0;

        customEvent.stop = function () {
          isCanceled = true;
        };

        customEvent.currentTarget = this;

        for (var _len = arguments.length, restParam = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          restParam[_key - 2] = arguments[_key];
        }

        if (restParam.length >= 1) {
          arg = arg.concat(restParam);
        }

        for (i = 0; handlerList[i]; i++) {
          handlerList[i].apply(this, arg);
        }

        return !isCanceled;
      };
      /**
       * Executed event just one time.
       * @ko 이벤트가 한번만 실행된다.
       * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
       * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
      class Some extends eg.Component {
       hi() {
         alert("hi");
       }
       thing() {
         this.once("hi", this.hi);
       }
      }
      var some = new Some();
      some.thing();
      some.trigger("hi");
      // fire alert("hi");
      some.trigger("hi");
      // Nothing happens
       */


      _proto.once = function once(eventName, handlerToAttach) {
        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;
          var i;

          for (i in eventHash) {
            this.once(i, eventHash[i]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var self = this;
          this.on(eventName, function listener() {
            for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              arg[_key2] = arguments[_key2];
            }

            handlerToAttach.apply(self, arg);
            self.off(eventName, listener);
          });
        }

        return this;
      };
      /**
       * Checks whether an event has been attached to a component.
       * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
       * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
       * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
       * @example
      class Some extends eg.Component {
       some() {
         this.hasOn("hi");// check hi event.
       }
      }
       */


      _proto.hasOn = function hasOn(eventName) {
        return !!this._eventHandler[eventName];
      };
      /**
       * Attaches an event to a component.
       * @ko 컴포넌트에 이벤트를 등록한다.
       * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
       * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
      class Some extends eg.Component {
       hi() {
         console.log("hi");
       }
       some() {
         this.on("hi",this.hi); //attach event
       }
      }
      */


      _proto.on = function on(eventName, handlerToAttach) {
        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;
          var name;

          for (name in eventHash) {
            this.on(name, eventHash[name]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var handlerList = this._eventHandler[eventName];

          if (isUndefined(handlerList)) {
            this._eventHandler[eventName] = [];
            handlerList = this._eventHandler[eventName];
          }

          handlerList.push(handlerToAttach);
        }

        return this;
      };
      /**
       * Detaches an event from the component.
       * @ko 컴포넌트에 등록된 이벤트를 해제한다
       * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
       * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
       * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
       * @example
      class Some extends eg.Component {
       hi() {
         console.log("hi");
       }
       some() {
         this.off("hi",this.hi); //detach event
       }
      }
       */


      _proto.off = function off(eventName, handlerToDetach) {
        // All event detach.
        if (isUndefined(eventName)) {
          this._eventHandler = {};
          return this;
        } // All handler of specific event detach.


        if (isUndefined(handlerToDetach)) {
          if (typeof eventName === "string") {
            this._eventHandler[eventName] = undefined;
            return this;
          } else {
            var eventHash = eventName;
            var name;

            for (name in eventHash) {
              this.off(name, eventHash[name]);
            }

            return this;
          }
        } // The handler of specific event detach.


        var handlerList = this._eventHandler[eventName];

        if (handlerList) {
          var k;
          var handlerFunction;

          for (k = 0; (handlerFunction = handlerList[k]) !== undefined; k++) {
            if (handlerFunction === handlerToDetach) {
              handlerList = handlerList.splice(k, 1);
              break;
            }
          }
        }

        return this;
      };

      return Component;
    }();

    Component.VERSION = "2.1.2";
    return Component;
  }();

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
  var Float32Array$1 = win.Float32Array;
  var getComputedStyle = win.getComputedStyle;
  var userAgent = win.navigator.userAgent;
  var SUPPORT_TOUCH = "ontouchstart" in win;
  var SUPPORT_DEVICEMOTION = "ondevicemotion" in win;
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

  /*! Hammer.JS - v2.0.13 - 2018-10-29
   * http://naver.github.io/egjs
   *
   * Forked By Naver egjs
   * Copyright (c) hammerjs
   * Licensed under the MIT license */
  function _extends$1() {
    _extends$1 = Object.assign || function (target) {
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

    return _extends$1.apply(this, arguments);
  }

  function _inheritsLoose$1(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }
  /**
   * @private
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} target
   * @param {...Object} objects_to_assign
   * @returns {Object} target
   */


  var assign;

  if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];

        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }

      return output;
    };
  } else {
    assign = Object.assign;
  }

  var assign$1 = assign;
  var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
  var TEST_ELEMENT = typeof document === "undefined" ? {
    style: {}
  } : document.createElement('div');
  var TYPE_FUNCTION = 'function';
  var round = Math.round,
      abs = Math.abs;
  var now = Date.now;
  /**
   * @private
   * get the prefixed property
   * @param {Object} obj
   * @param {String} property
   * @returns {String|Undefined} prefixed
   */

  function prefixed(obj, property) {
    var prefix;
    var prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);
    var i = 0;

    while (i < VENDOR_PREFIXES.length) {
      prefix = VENDOR_PREFIXES[i];
      prop = prefix ? prefix + camelProp : property;

      if (prop in obj) {
        return prop;
      }

      i++;
    }

    return undefined;
  }
  /* eslint-disable no-new-func, no-nested-ternary */


  var win$1;

  if (typeof window === "undefined") {
    // window is undefined in node.js
    win$1 = {};
  } else {
    win$1 = window;
  }

  var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
  var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

  function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
      return false;
    }

    var touchMap = {};
    var cssSupports = win$1.CSS && win$1.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
      // If css.supports is not supported but there is native touch-action assume it supports
      // all values. This is the case for IE 10 and 11.
      return touchMap[val] = cssSupports ? win$1.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
  }

  var TOUCH_ACTION_COMPUTE = 'compute';
  var TOUCH_ACTION_AUTO = 'auto';
  var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

  var TOUCH_ACTION_NONE = 'none';
  var TOUCH_ACTION_PAN_X = 'pan-x';
  var TOUCH_ACTION_PAN_Y = 'pan-y';
  var TOUCH_ACTION_MAP = getTouchActionProps();
  var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
  var SUPPORT_TOUCH$1 = 'ontouchstart' in win$1;
  var SUPPORT_POINTER_EVENTS = prefixed(win$1, 'PointerEvent') !== undefined;
  var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH$1 && MOBILE_REGEX.test(navigator.userAgent);
  var INPUT_TYPE_TOUCH = 'touch';
  var INPUT_TYPE_PEN = 'pen';
  var INPUT_TYPE_MOUSE = 'mouse';
  var INPUT_TYPE_KINECT = 'kinect';
  var COMPUTE_INTERVAL = 25;
  var INPUT_START = 1;
  var INPUT_MOVE = 2;
  var INPUT_END = 4;
  var INPUT_CANCEL = 8;
  var DIRECTION_NONE = 1;
  var DIRECTION_LEFT = 2;
  var DIRECTION_RIGHT = 4;
  var DIRECTION_UP = 8;
  var DIRECTION_DOWN = 16;
  var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
  var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
  var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
  var PROPS_XY = ['x', 'y'];
  var PROPS_CLIENT_XY = ['clientX', 'clientY'];
  /**
   * @private
   * walk objects and arrays
   * @param {Object} obj
   * @param {Function} iterator
   * @param {Object} context
   */

  function each(obj, iterator, context) {
    var i;

    if (!obj) {
      return;
    }

    if (obj.forEach) {
      obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
      i = 0;

      while (i < obj.length) {
        iterator.call(context, obj[i], i, obj);
        i++;
      }
    } else {
      for (i in obj) {
        obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
      }
    }
  }
  /**
   * @private
   * let a boolean value also be a function that must return a boolean
   * this first item in args will be used as the context
   * @param {Boolean|Function} val
   * @param {Array} [args]
   * @returns {Boolean}
   */


  function boolOrFn(val, args) {
    if (typeof val === TYPE_FUNCTION) {
      return val.apply(args ? args[0] || undefined : undefined, args);
    }

    return val;
  }
  /**
   * @private
   * small indexOf wrapper
   * @param {String} str
   * @param {String} find
   * @returns {Boolean} found
   */


  function inStr(str, find) {
    return str.indexOf(find) > -1;
  }
  /**
   * @private
   * when the touchActions are collected they are not a valid value, so we need to clean things up. *
   * @param {String} actions
   * @returns {*}
   */


  function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
      return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning

    if (hasPanX && hasPanY) {
      return TOUCH_ACTION_NONE;
    } // pan-x OR pan-y


    if (hasPanX || hasPanY) {
      return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    } // manipulation


    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
      return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
  }
  /**
   * @private
   * Touch Action
   * sets the touchAction property or uses the js alternative
   * @param {Manager} manager
   * @param {String} value
   * @constructor
   */


  var TouchAction =
  /*#__PURE__*/
  function () {
    function TouchAction(manager, value) {
      this.manager = manager;
      this.set(value);
    }
    /**
     * @private
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */


    var _proto = TouchAction.prototype;

    _proto.set = function set(value) {
      // find out the touch-action by the event handlers
      if (value === TOUCH_ACTION_COMPUTE) {
        value = this.compute();
      }

      if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
        this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
      }

      this.actions = value.toLowerCase().trim();
    };
    /**
     * @private
     * just re-set the touchAction value
     */


    _proto.update = function update() {
      this.set(this.manager.options.touchAction);
    };
    /**
     * @private
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */


    _proto.compute = function compute() {
      var actions = [];
      each(this.manager.recognizers, function (recognizer) {
        if (boolOrFn(recognizer.options.enable, [recognizer])) {
          actions = actions.concat(recognizer.getTouchAction());
        }
      });
      return cleanTouchActions(actions.join(' '));
    };
    /**
     * @private
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */


    _proto.preventDefaults = function preventDefaults(input) {
      var srcEvent = input.srcEvent;
      var direction = input.offsetDirection; // if the touch action did prevented once this session

      if (this.manager.session.prevented) {
        srcEvent.preventDefault();
        return;
      }

      var actions = this.actions;
      var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
      var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
      var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

      if (hasNone) {
        // do not prevent defaults if this is a tap gesture
        var isTapPointer = input.pointers.length === 1;
        var isTapMovement = input.distance < 2;
        var isTapTouchTime = input.deltaTime < 250;

        if (isTapPointer && isTapMovement && isTapTouchTime) {
          return;
        }
      }

      if (hasPanX && hasPanY) {
        // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
        return;
      }

      if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
        return this.preventSrc(srcEvent);
      }
    };
    /**
     * @private
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */


    _proto.preventSrc = function preventSrc(srcEvent) {
      this.manager.session.prevented = true;
      srcEvent.preventDefault();
    };

    return TouchAction;
  }();
  /**
   * @private
   * find if a node is in the given parent
   * @method hasParent
   * @param {HTMLElement} node
   * @param {HTMLElement} parent
   * @return {Boolean} found
   */


  function hasParent(node, parent) {
    while (node) {
      if (node === parent) {
        return true;
      }

      node = node.parentNode;
    }

    return false;
  }
  /**
   * @private
   * get the center of all the pointers
   * @param {Array} pointers
   * @return {Object} center contains `x` and `y` properties
   */


  function getCenter(pointers) {
    var pointersLength = pointers.length; // no need to loop when only one touch

    if (pointersLength === 1) {
      return {
        x: round(pointers[0].clientX),
        y: round(pointers[0].clientY)
      };
    }

    var x = 0;
    var y = 0;
    var i = 0;

    while (i < pointersLength) {
      x += pointers[i].clientX;
      y += pointers[i].clientY;
      i++;
    }

    return {
      x: round(x / pointersLength),
      y: round(y / pointersLength)
    };
  }
  /**
   * @private
   * create a simple clone from the input used for storage of firstInput and firstMultiple
   * @param {Object} input
   * @returns {Object} clonedInputData
   */


  function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;

    while (i < input.pointers.length) {
      pointers[i] = {
        clientX: round(input.pointers[i].clientX),
        clientY: round(input.pointers[i].clientY)
      };
      i++;
    }

    return {
      timeStamp: now(),
      pointers: pointers,
      center: getCenter(pointers),
      deltaX: input.deltaX,
      deltaY: input.deltaY
    };
  }
  /**
   * @private
   * calculate the absolute distance between two points
   * @param {Object} p1 {x, y}
   * @param {Object} p2 {x, y}
   * @param {Array} [props] containing x and y keys
   * @return {Number} distance
   */


  function getDistance(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }

    var x = p2[props[0]] - p1[props[0]];
    var y = p2[props[1]] - p1[props[1]];
    return Math.sqrt(x * x + y * y);
  }
  /**
   * @private
   * calculate the angle between two coordinates
   * @param {Object} p1
   * @param {Object} p2
   * @param {Array} [props] containing x and y keys
   * @return {Number} angle
   */


  function getAngle(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }

    var x = p2[props[0]] - p1[props[0]];
    var y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
  }
  /**
   * @private
   * get the direction between two points
   * @param {Number} x
   * @param {Number} y
   * @return {Number} direction
   */


  function getDirection(x, y) {
    if (x === y) {
      return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
      return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
  }

  function computeDeltaXY(session, input) {
    var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
    // jscs throwing error on defalut destructured values and without defaults tests fail

    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
      prevDelta = session.prevDelta = {
        x: prevInput.deltaX || 0,
        y: prevInput.deltaY || 0
      };
      offset = session.offsetDelta = {
        x: center.x,
        y: center.y
      };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
  }
  /**
   * @private
   * calculate the velocity between two points. unit is in px per ms.
   * @param {Number} deltaTime
   * @param {Number} x
   * @param {Number} y
   * @return {Object} velocity `x` and `y`
   */


  function getVelocity(deltaTime, x, y) {
    return {
      x: x / deltaTime || 0,
      y: y / deltaTime || 0
    };
  }
  /**
   * @private
   * calculate the scale factor between two pointersets
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} scale
   */


  function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
  }
  /**
   * @private
   * calculate the rotation degrees between two pointersets
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} rotation
   */


  function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
  }
  /**
   * @private
   * velocity is calculated every x ms
   * @param {Object} session
   * @param {Object} input
   */


  function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input;
    var deltaTime = input.timeStamp - last.timeStamp;
    var velocity;
    var velocityX;
    var velocityY;
    var direction;

    if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
      var deltaX = input.deltaX - last.deltaX;
      var deltaY = input.deltaY - last.deltaY;
      var v = getVelocity(deltaTime, deltaX, deltaY);
      velocityX = v.x;
      velocityY = v.y;
      velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
      direction = getDirection(deltaX, deltaY);
      session.lastInterval = input;
    } else {
      // use latest velocity info if it doesn't overtake a minimum period
      velocity = last.velocity;
      velocityX = last.velocityX;
      velocityY = last.velocityY;
      direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
  }
  /**
  * @private
   * extend the data with some usable properties like scale, rotate, velocity etc
   * @param {Object} manager
   * @param {Object} input
   */


  function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length; // store the first input to calculate the distance and direction

    if (!session.firstInput) {
      session.firstInput = simpleCloneInputData(input);
    } // to compute scale and rotation we need to store the multiple touches


    if (pointersLength > 1 && !session.firstMultiple) {
      session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
      session.firstMultiple = false;
    }

    var firstInput = session.firstInput,
        firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;
    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);
    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
    input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
    computeIntervalInputData(session, input); // find the correct target

    var target = manager.element;

    if (hasParent(input.srcEvent.target, target)) {
      target = input.srcEvent.target;
    }

    input.target = target;
  }
  /**
   * @private
   * handle input events
   * @param {Manager} manager
   * @param {String} eventType
   * @param {Object} input
   */


  function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
    var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
      manager.session = {};
    } // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'


    input.eventType = eventType; // compute scale, rotation etc

    computeInputData(manager, input); // emit secret event

    manager.emit('hammer.input', input);
    manager.recognize(input);
    manager.session.prevInput = input;
  }
  /**
   * @private
   * split string on whitespace
   * @param {String} str
   * @returns {Array} words
   */


  function splitStr(str) {
    return str.trim().split(/\s+/g);
  }
  /**
   * @private
   * addEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */


  function addEventListeners(target, types, handler) {
    each(splitStr(types), function (type) {
      target.addEventListener(type, handler, false);
    });
  }
  /**
   * @private
   * removeEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */


  function removeEventListeners(target, types, handler) {
    each(splitStr(types), function (type) {
      target.removeEventListener(type, handler, false);
    });
  }
  /**
   * @private
   * get the window object of an element
   * @param {HTMLElement} element
   * @returns {DocumentView|Window}
   */


  function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return doc.defaultView || doc.parentWindow || window;
  }
  /**
   * @private
   * create new input type manager
   * @param {Manager} manager
   * @param {Function} callback
   * @returns {Input}
   * @constructor
   */


  var Input =
  /*#__PURE__*/
  function () {
    function Input(manager, callback) {
      var self = this;
      this.manager = manager;
      this.callback = callback;
      this.element = manager.element;
      this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
      // so when disabled the input events are completely bypassed.

      this.domHandler = function (ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
          self.handler(ev);
        }
      };

      this.init();
    }
    /**
     * @private
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */


    var _proto = Input.prototype;

    _proto.handler = function handler() {};
    /**
     * @private
     * bind the events
     */


    _proto.init = function init() {
      this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    };
    /**
     * @private
     * unbind the events
     */


    _proto.destroy = function destroy() {
      this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    };

    return Input;
  }();
  /**
   * @private
   * find if a array contains the object using indexOf or a simple polyFill
   * @param {Array} src
   * @param {String} find
   * @param {String} [findByKey]
   * @return {Boolean|Number} false when not found, or the index
   */


  function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
      return src.indexOf(find);
    } else {
      var i = 0;

      while (i < src.length) {
        if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
          // do not use === here, test fails
          return i;
        }

        i++;
      }

      return -1;
    }
  }

  var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
  }; // in IE10 the pointer types is defined as an enum

  var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

  };
  var POINTER_ELEMENT_EVENTS = 'pointerdown';
  var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

  if (win$1.MSPointerEvent && !win$1.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
  }
  /**
   * @private
   * Pointer events input
   * @constructor
   * @extends Input
   */


  var PointerEventInput =
  /*#__PURE__*/
  function (_Input) {
    _inheritsLoose$1(PointerEventInput, _Input);

    function PointerEventInput() {
      var _this;

      var proto = PointerEventInput.prototype;
      proto.evEl = POINTER_ELEMENT_EVENTS;
      proto.evWin = POINTER_WINDOW_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.store = _this.manager.session.pointerEvents = [];
      return _this;
    }
    /**
     * @private
     * handle mouse events
     * @param {Object} ev
     */


    var _proto = PointerEventInput.prototype;

    _proto.handler = function handler(ev) {
      var store = this.store;
      var removePointer = false;
      var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
      var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
      var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
      var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

      var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

      if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
        if (storeIndex < 0) {
          store.push(ev);
          storeIndex = store.length - 1;
        }
      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        removePointer = true;
      } // it not found, so the pointer hasn't been down (so it's probably a hover)


      if (storeIndex < 0) {
        return;
      } // update the event in the store


      store[storeIndex] = ev;
      this.callback(this.manager, eventType, {
        pointers: store,
        changedPointers: [ev],
        pointerType: pointerType,
        srcEvent: ev
      });

      if (removePointer) {
        // remove from the store
        store.splice(storeIndex, 1);
      }
    };

    return PointerEventInput;
  }(Input);
  /**
   * @private
   * convert array-like objects to real arrays
   * @param {Object} obj
   * @returns {Array}
   */


  function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
  }
  /**
   * @private
   * unique array with objects based on a key (like 'id') or just by the array's value
   * @param {Array} src [{id:1},{id:2},{id:1}]
   * @param {String} [key]
   * @param {Boolean} [sort=False]
   * @returns {Array} [{id:1},{id:2}]
   */


  function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
      var val = key ? src[i][key] : src[i];

      if (inArray(values, val) < 0) {
        results.push(src[i]);
      }

      values[i] = val;
      i++;
    }

    if (sort) {
      if (!key) {
        results = results.sort();
      } else {
        results = results.sort(function (a, b) {
          return a[key] > b[key];
        });
      }
    }

    return results;
  }

  var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
  /**
   * @private
   * Multi-user touch events input
   * @constructor
   * @extends Input
   */

  var TouchInput =
  /*#__PURE__*/
  function (_Input) {
    _inheritsLoose$1(TouchInput, _Input);

    function TouchInput() {
      TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
      TouchInput.prototype.targetIds = {};
      return _Input.apply(this, arguments) || this; // this.evTarget = TOUCH_TARGET_EVENTS;
      // this.targetIds = {};
    }

    var _proto = TouchInput.prototype;

    _proto.handler = function handler(ev) {
      var type = TOUCH_INPUT_MAP[ev.type];
      var touches = getTouches.call(this, ev, type);

      if (!touches) {
        return;
      }

      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    };

    return TouchInput;
  }(Input);

  function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
      targetIds[allTouches[0].identifier] = true;
      return [allTouches, allTouches];
    }

    var i;
    var targetTouches;
    var changedTouches = toArray(ev.changedTouches);
    var changedTargetTouches = [];
    var target = this.target; // get target touches from touches

    targetTouches = allTouches.filter(function (touch) {
      return hasParent(touch.target, target);
    }); // collect touches

    if (type === INPUT_START) {
      i = 0;

      while (i < targetTouches.length) {
        targetIds[targetTouches[i].identifier] = true;
        i++;
      }
    } // filter changed touches to only contain touches that exist in the collected target ids


    i = 0;

    while (i < changedTouches.length) {
      if (targetIds[changedTouches[i].identifier]) {
        changedTargetTouches.push(changedTouches[i]);
      } // cleanup removed touches


      if (type & (INPUT_END | INPUT_CANCEL)) {
        delete targetIds[changedTouches[i].identifier];
      }

      i++;
    }

    if (!changedTargetTouches.length) {
      return;
    }

    return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
    uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
  }

  var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
  };
  var MOUSE_ELEMENT_EVENTS = 'mousedown';
  var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
  /**
   * @private
   * Mouse events input
   * @constructor
   * @extends Input
   */

  var MouseInput =
  /*#__PURE__*/
  function (_Input) {
    _inheritsLoose$1(MouseInput, _Input);

    function MouseInput() {
      var _this;

      var proto = MouseInput.prototype;
      proto.evEl = MOUSE_ELEMENT_EVENTS;
      proto.evWin = MOUSE_WINDOW_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.pressed = false; // mousedown state

      return _this;
    }
    /**
     * @private
     * handle mouse events
     * @param {Object} ev
     */


    var _proto = MouseInput.prototype;

    _proto.handler = function handler(ev) {
      var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

      if (eventType & INPUT_START && ev.button === 0) {
        this.pressed = true;
      }

      if (eventType & INPUT_MOVE && ev.which !== 1) {
        eventType = INPUT_END;
      } // mouse must be down


      if (!this.pressed) {
        return;
      }

      if (eventType & INPUT_END) {
        this.pressed = false;
      }

      this.callback(this.manager, eventType, {
        pointers: [ev],
        changedPointers: [ev],
        pointerType: INPUT_TYPE_MOUSE,
        srcEvent: ev
      });
    };

    return MouseInput;
  }(Input);
  /**
   * @private
   * Combined touch and mouse input
   *
   * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
   * This because touch devices also emit mouse events while doing a touch.
   *
   * @constructor
   * @extends Input
   */


  var DEDUP_TIMEOUT = 2500;
  var DEDUP_DISTANCE = 25;

  function setLastTouch(eventData) {
    var _eventData$changedPoi = eventData.changedPointers,
        touch = _eventData$changedPoi[0];

    if (touch.identifier === this.primaryTouch) {
      var lastTouch = {
        x: touch.clientX,
        y: touch.clientY
      };
      var lts = this.lastTouches;
      this.lastTouches.push(lastTouch);

      var removeLastTouch = function removeLastTouch() {
        var i = lts.indexOf(lastTouch);

        if (i > -1) {
          lts.splice(i, 1);
        }
      };

      setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
  }

  function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
      this.primaryTouch = eventData.changedPointers[0].identifier;
      setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      setLastTouch.call(this, eventData);
    }
  }

  function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX;
    var y = eventData.srcEvent.clientY;

    for (var i = 0; i < this.lastTouches.length; i++) {
      var t = this.lastTouches[i];
      var dx = Math.abs(x - t.x);
      var dy = Math.abs(y - t.y);

      if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
        return true;
      }
    }

    return false;
  }

  var TouchMouseInput =
  /*#__PURE__*/
  function () {
    var TouchMouseInput =
    /*#__PURE__*/
    function (_Input) {
      _inheritsLoose$1(TouchMouseInput, _Input);

      function TouchMouseInput(_manager, callback) {
        var _this;

        _this = _Input.call(this, _manager, callback) || this;

        _this.handler = function (manager, inputEvent, inputData) {
          var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
          var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

          if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
          } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


          if (isTouch) {
            recordTouches.call(_assertThisInitialized$1(_assertThisInitialized$1(_this)), inputEvent, inputData);
          } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized$1(_assertThisInitialized$1(_this)), inputData)) {
            return;
          }

          _this.callback(manager, inputEvent, inputData);
        };

        _this.touch = new TouchInput(_this.manager, _this.handler);
        _this.mouse = new MouseInput(_this.manager, _this.handler);
        _this.primaryTouch = null;
        _this.lastTouches = [];
        return _this;
      }
      /**
       * @private
       * handle mouse and touch events
       * @param {Hammer} manager
       * @param {String} inputEvent
       * @param {Object} inputData
       */


      var _proto = TouchMouseInput.prototype;
      /**
       * @private
       * remove the event listeners
       */

      _proto.destroy = function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
      };

      return TouchMouseInput;
    }(Input);

    return TouchMouseInput;
  }();
  /**
   * @private
   * create new input type manager
   * called by the Manager constructor
   * @param {Hammer} manager
   * @returns {Input}
   */


  function createInputInstance(manager) {
    var Type; // let inputClass = manager.options.inputClass;

    var inputClass = manager.options.inputClass;

    if (inputClass) {
      Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
      Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
      Type = TouchInput;
    } else if (!SUPPORT_TOUCH$1) {
      Type = MouseInput;
    } else {
      Type = TouchMouseInput;
    }

    return new Type(manager, inputHandler);
  }
  /**
   * @private
   * if the argument is an array, we want to execute the fn on each entry
   * if it aint an array we don't want to do a thing.
   * this is used by all the methods that accept a single and array argument.
   * @param {*|Array} arg
   * @param {String} fn
   * @param {Object} [context]
   * @returns {Boolean}
   */


  function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
      each(arg, context[fn], context);
      return true;
    }

    return false;
  }

  var STATE_POSSIBLE = 1;
  var STATE_BEGAN = 2;
  var STATE_CHANGED = 4;
  var STATE_ENDED = 8;
  var STATE_RECOGNIZED = STATE_ENDED;
  var STATE_CANCELLED = 16;
  var STATE_FAILED = 32;
  /**
   * @private
   * get a unique id
   * @returns {number} uniqueId
   */

  var _uniqueId = 1;

  function uniqueId() {
    return _uniqueId++;
  }
  /**
   * @private
   * get a recognizer by name if it is bound to a manager
   * @param {Recognizer|String} otherRecognizer
   * @param {Recognizer} recognizer
   * @returns {Recognizer}
   */


  function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;

    if (manager) {
      return manager.get(otherRecognizer);
    }

    return otherRecognizer;
  }
  /**
   * @private
   * get a usable string, used as event postfix
   * @param {constant} state
   * @returns {String} state
   */


  function stateStr(state) {
    if (state & STATE_CANCELLED) {
      return 'cancel';
    } else if (state & STATE_ENDED) {
      return 'end';
    } else if (state & STATE_CHANGED) {
      return 'move';
    } else if (state & STATE_BEGAN) {
      return 'start';
    }

    return '';
  }
  /**
   * @private
   * Recognizer flow explained; *
   * All recognizers have the initial state of POSSIBLE when a input session starts.
   * The definition of a input session is from the first input until the last input, with all it's movement in it. *
   * Example session for mouse-input: mousedown -> mousemove -> mouseup
   *
   * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
   * which determines with state it should be.
   *
   * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
   * POSSIBLE to give it another change on the next cycle.
   *
   *               Possible
   *                  |
   *            +-----+---------------+
   *            |                     |
   *      +-----+-----+               |
   *      |           |               |
   *   Failed      Cancelled          |
   *                          +-------+------+
   *                          |              |
   *                      Recognized       Began
   *                                         |
   *                                      Changed
   *                                         |
   *                                  Ended/Recognized
   */

  /**
   * @private
   * Recognizer
   * Every recognizer needs to extend from this class.
   * @constructor
   * @param {Object} options
   */


  var Recognizer =
  /*#__PURE__*/
  function () {
    function Recognizer(options) {
      if (options === void 0) {
        options = {};
      }

      this.options = _extends$1({
        enable: true
      }, options);
      this.id = uniqueId();
      this.manager = null; // default is enable true

      this.state = STATE_POSSIBLE;
      this.simultaneous = {};
      this.requireFail = [];
    }
    /**
     * @private
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */


    var _proto = Recognizer.prototype;

    _proto.set = function set(options) {
      assign$1(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

      this.manager && this.manager.touchAction.update();
      return this;
    };
    /**
     * @private
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */


    _proto.recognizeWith = function recognizeWith(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
        return this;
      }

      var simultaneous = this.simultaneous;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

      if (!simultaneous[otherRecognizer.id]) {
        simultaneous[otherRecognizer.id] = otherRecognizer;
        otherRecognizer.recognizeWith(this);
      }

      return this;
    };
    /**
     * @private
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */


    _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
        return this;
      }

      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      delete this.simultaneous[otherRecognizer.id];
      return this;
    };
    /**
     * @private
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */


    _proto.requireFailure = function requireFailure(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
        return this;
      }

      var requireFail = this.requireFail;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

      if (inArray(requireFail, otherRecognizer) === -1) {
        requireFail.push(otherRecognizer);
        otherRecognizer.requireFailure(this);
      }

      return this;
    };
    /**
     * @private
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */


    _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
        return this;
      }

      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      var index = inArray(this.requireFail, otherRecognizer);

      if (index > -1) {
        this.requireFail.splice(index, 1);
      }

      return this;
    };
    /**
     * @private
     * has require failures boolean
     * @returns {boolean}
     */


    _proto.hasRequireFailures = function hasRequireFailures() {
      return this.requireFail.length > 0;
    };
    /**
     * @private
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */


    _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
      return !!this.simultaneous[otherRecognizer.id];
    };
    /**
     * @private
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */


    _proto.emit = function emit(input) {
      var self = this;
      var state = this.state;

      function emit(event) {
        self.manager.emit(event, input);
      } // 'panstart' and 'panmove'


      if (state < STATE_ENDED) {
        emit(self.options.event + stateStr(state));
      }

      emit(self.options.event); // simple 'eventName' events

      if (input.additionalEvent) {
        // additional event(panleft, panright, pinchin, pinchout...)
        emit(input.additionalEvent);
      } // panend and pancancel


      if (state >= STATE_ENDED) {
        emit(self.options.event + stateStr(state));
      }
    };
    /**
     * @private
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */


    _proto.tryEmit = function tryEmit(input) {
      if (this.canEmit()) {
        return this.emit(input);
      } // it's failing anyway


      this.state = STATE_FAILED;
    };
    /**
     * @private
     * can we emit?
     * @returns {boolean}
     */


    _proto.canEmit = function canEmit() {
      var i = 0;

      while (i < this.requireFail.length) {
        if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
          return false;
        }

        i++;
      }

      return true;
    };
    /**
     * @private
     * update the recognizer
     * @param {Object} inputData
     */


    _proto.recognize = function recognize(inputData) {
      // make a new copy of the inputData
      // so we can change the inputData without messing up the other recognizers
      var inputDataClone = assign$1({}, inputData); // is is enabled and allow recognizing?

      if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
        this.reset();
        this.state = STATE_FAILED;
        return;
      } // reset when we've reached the end


      if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
        this.state = STATE_POSSIBLE;
      }

      this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
      // so trigger an event

      if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
        this.tryEmit(inputDataClone);
      }
    };
    /**
     * @private
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {constant} STATE
     */

    /* jshint ignore:start */


    _proto.process = function process(inputData) {};
    /* jshint ignore:end */

    /**
     * @private
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */


    _proto.getTouchAction = function getTouchAction() {};
    /**
     * @private
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */


    _proto.reset = function reset() {};

    return Recognizer;
  }();

  var defaults = {
    /**
     * @private
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * @private
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @private
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * @private
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * @private
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * @private
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [],

    /**
     * @private
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
      /**
       * @private
       * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
       * @type {String}
       * @default 'none'
       */
      userSelect: "none",

      /**
       * @private
       * Disable the Windows Phone grippers when pressing an element.
       * @type {String}
       * @default 'none'
       */
      touchSelect: "none",

      /**
       * @private
       * Disables the default callout shown when you touch and hold a touch target.
       * On iOS, when you touch and hold a touch target such as a link, Safari displays
       * a callout containing information about the link. This property allows you to disable that callout.
       * @type {String}
       * @default 'none'
       */
      touchCallout: "none",

      /**
       * @private
       * Specifies whether zooming is enabled. Used by IE10>
       * @type {String}
       * @default 'none'
       */
      contentZooming: "none",

      /**
       * @private
       * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
       * @type {String}
       * @default 'none'
       */
      userDrag: "none",

      /**
       * @private
       * Overrides the highlight color shown when the user taps a link or a JavaScript
       * clickable element in iOS. This property obeys the alpha value, if specified.
       * @type {String}
       * @default 'rgba(0,0,0,0)'
       */
      tapHighlightColor: "rgba(0,0,0,0)"
    }
  };
  var STOP = 1;
  var FORCED_STOP = 2;
  /**
   * @private
   * add/remove the css properties as defined in manager.options.cssProps
   * @param {Manager} manager
   * @param {Boolean} add
   */

  function toggleCssProps(manager, add) {
    var element = manager.element;

    if (!element.style) {
      return;
    }

    var prop;
    each(manager.options.cssProps, function (value, name) {
      prop = prefixed(element.style, name);

      if (add) {
        manager.oldCssProps[prop] = element.style[prop];
        element.style[prop] = value;
      } else {
        element.style[prop] = manager.oldCssProps[prop] || "";
      }
    });

    if (!add) {
      manager.oldCssProps = {};
    }
  }
  /**
   * @private
   * trigger dom event
   * @param {String} event
   * @param {Object} data
   */


  function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent("Event");
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
  }
  /**
  * @private
   * Manager
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */


  var Manager =
  /*#__PURE__*/
  function () {
    function Manager(element, options) {
      var _this = this;

      this.options = assign$1({}, defaults, options || {});
      this.options.inputTarget = this.options.inputTarget || element;
      this.handlers = {};
      this.session = {};
      this.recognizers = [];
      this.oldCssProps = {};
      this.element = element;
      this.input = createInputInstance(this);
      this.touchAction = new TouchAction(this, this.options.touchAction);
      toggleCssProps(this, true);
      each(this.options.recognizers, function (item) {
        var recognizer = _this.add(new item[0](item[1]));

        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
      }, this);
    }
    /**
     * @private
     * set options
     * @param {Object} options
     * @returns {Manager}
     */


    var _proto = Manager.prototype;

    _proto.set = function set(options) {
      assign$1(this.options, options); // Options that need a little more setup

      if (options.touchAction) {
        this.touchAction.update();
      }

      if (options.inputTarget) {
        // Clean up existing event listeners and reinitialize
        this.input.destroy();
        this.input.target = options.inputTarget;
        this.input.init();
      }

      return this;
    };
    /**
     * @private
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */


    _proto.stop = function stop(force) {
      this.session.stopped = force ? FORCED_STOP : STOP;
    };
    /**
     * @private
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */


    _proto.recognize = function recognize(inputData) {
      var session = this.session;

      if (session.stopped) {
        return;
      } // run the touch-action polyfill


      this.touchAction.preventDefaults(inputData);
      var recognizer;
      var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
      // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
      // if no recognizer is detecting a thing, it is set to `null`

      var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
      // or when we're in a new session

      if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
        session.curRecognizer = null;
        curRecognizer = null;
      }

      var i = 0;

      while (i < recognizers.length) {
        recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
        // 1.   allow if the session is NOT forced stopped (see the .stop() method)
        // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
        //      that is being recognized.
        // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
        //      this can be setup with the `recognizeWith()` method on the recognizer.

        if (session.stopped !== FORCED_STOP && ( // 1
        !curRecognizer || recognizer === curRecognizer || // 2
        recognizer.canRecognizeWith(curRecognizer))) {
          // 3
          recognizer.recognize(inputData);
        } else {
          recognizer.reset();
        } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
        // current active recognizer. but only if we don't already have an active recognizer


        if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
          session.curRecognizer = recognizer;
          curRecognizer = recognizer;
        }

        i++;
      }
    };
    /**
     * @private
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */


    _proto.get = function get(recognizer) {
      if (recognizer instanceof Recognizer) {
        return recognizer;
      }

      var recognizers = this.recognizers;

      for (var i = 0; i < recognizers.length; i++) {
        if (recognizers[i].options.event === recognizer) {
          return recognizers[i];
        }
      }

      return null;
    };
    /**
     * @private add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */


    _proto.add = function add(recognizer) {
      if (invokeArrayArg(recognizer, "add", this)) {
        return this;
      } // remove existing


      var existing = this.get(recognizer.options.event);

      if (existing) {
        this.remove(existing);
      }

      this.recognizers.push(recognizer);
      recognizer.manager = this;
      this.touchAction.update();
      return recognizer;
    };
    /**
     * @private
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */


    _proto.remove = function remove(recognizer) {
      if (invokeArrayArg(recognizer, "remove", this)) {
        return this;
      }

      var targetRecognizer = this.get(recognizer); // let's make sure this recognizer exists

      if (recognizer) {
        var recognizers = this.recognizers;
        var index = inArray(recognizers, targetRecognizer);

        if (index !== -1) {
          recognizers.splice(index, 1);
          this.touchAction.update();
        }
      }

      return this;
    };
    /**
     * @private
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */


    _proto.on = function on(events, handler) {
      if (events === undefined || handler === undefined) {
        return this;
      }

      var handlers = this.handlers;
      each(splitStr(events), function (event) {
        handlers[event] = handlers[event] || [];
        handlers[event].push(handler);
      });
      return this;
    };
    /**
     * @private unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */


    _proto.off = function off(events, handler) {
      if (events === undefined) {
        return this;
      }

      var handlers = this.handlers;
      each(splitStr(events), function (event) {
        if (!handler) {
          delete handlers[event];
        } else {
          handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
        }
      });
      return this;
    };
    /**
     * @private emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */


    _proto.emit = function emit(event, data) {
      // we also want to trigger dom events
      if (this.options.domEvents) {
        triggerDomEvent(event, data);
      } // no handlers, so skip it all


      var handlers = this.handlers[event] && this.handlers[event].slice();

      if (!handlers || !handlers.length) {
        return;
      }

      data.type = event;

      data.preventDefault = function () {
        data.srcEvent.preventDefault();
      };

      var i = 0;

      while (i < handlers.length) {
        handlers[i](data);
        i++;
      }
    };
    /**
     * @private
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */


    _proto.destroy = function destroy() {
      this.element && toggleCssProps(this, false);
      this.handlers = {};
      this.session = {};
      this.input.destroy();
      this.element = null;
    };

    return Manager;
  }();

  var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
  var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
  /**
   * @private
   * Touch events input
   * @constructor
   * @extends Input
   */

  var SingleTouchInput =
  /*#__PURE__*/
  function (_Input) {
    _inheritsLoose$1(SingleTouchInput, _Input);

    function SingleTouchInput() {
      var _this;

      var proto = SingleTouchInput.prototype;
      proto.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
      proto.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.started = false;
      return _this;
    }

    var _proto = SingleTouchInput.prototype;

    _proto.handler = function handler(ev) {
      var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

      if (type === INPUT_START) {
        this.started = true;
      }

      if (!this.started) {
        return;
      }

      var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

      if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
        this.started = false;
      }

      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    };

    return SingleTouchInput;
  }(Input);

  function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
      all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
  }
  /**
   * @private
   * This recognizer is just used as a base for the simple attribute recognizers.
   * @constructor
   * @extends Recognizer
   */


  var AttrRecognizer =
  /*#__PURE__*/
  function (_Recognizer) {
    _inheritsLoose$1(AttrRecognizer, _Recognizer);

    function AttrRecognizer(options) {
      if (options === void 0) {
        options = {};
      }

      return _Recognizer.call(this, _extends$1({
        pointers: 1
      }, options)) || this;
    }
    /**
     * @private
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */


    var _proto = AttrRecognizer.prototype;

    _proto.attrTest = function attrTest(input) {
      var optionPointers = this.options.pointers;
      return optionPointers === 0 || input.pointers.length === optionPointers;
    };
    /**
     * @private
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */


    _proto.process = function process(input) {
      var state = this.state;
      var eventType = input.eventType;
      var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
      var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

      if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
        return state | STATE_CANCELLED;
      } else if (isRecognized || isValid) {
        if (eventType & INPUT_END) {
          return state | STATE_ENDED;
        } else if (!(state & STATE_BEGAN)) {
          return STATE_BEGAN;
        }

        return state | STATE_CHANGED;
      }

      return STATE_FAILED;
    };

    return AttrRecognizer;
  }(Recognizer);
  /**
   * @private
   * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
   * between the given interval and position. The delay option can be used to recognize multi-taps without firing
   * a single tap.
   *
   * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
   * multi-taps being recognized.
   * @constructor
   * @extends Recognizer
   */


  var TapRecognizer =
  /*#__PURE__*/
  function (_Recognizer) {
    _inheritsLoose$1(TapRecognizer, _Recognizer);

    function TapRecognizer(options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _Recognizer.call(this, _extends$1({
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300,
        // max time between the multi-tap taps
        time: 250,
        // max time of the pointer to be down (like finger on the screen)
        threshold: 9,
        // a minimal movement is ok, but keep it low
        posThreshold: 10
      }, options)) || this; // previous time and center,
      // used for tap counting

      _this.pTime = false;
      _this.pCenter = false;
      _this._timer = null;
      _this._input = null;
      _this.count = 0;
      return _this;
    }

    var _proto = TapRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_MANIPULATION];
    };

    _proto.process = function process(input) {
      var _this2 = this;

      var options = this.options;
      var validPointers = input.pointers.length === options.pointers;
      var validMovement = input.distance < options.threshold;
      var validTouchTime = input.deltaTime < options.time;
      this.reset();

      if (input.eventType & INPUT_START && this.count === 0) {
        return this.failTimeout();
      } // we only allow little movement
      // and we've reached an end event, so a tap is possible


      if (validMovement && validTouchTime && validPointers) {
        if (input.eventType !== INPUT_END) {
          return this.failTimeout();
        }

        var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
        var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
        this.pTime = input.timeStamp;
        this.pCenter = input.center;

        if (!validMultiTap || !validInterval) {
          this.count = 1;
        } else {
          this.count += 1;
        }

        this._input = input; // if tap count matches we have recognized it,
        // else it has began recognizing...

        var tapCount = this.count % options.taps;

        if (tapCount === 0) {
          // no failing requirements, immediately trigger the tap event
          // or wait as long as the multitap interval to trigger
          if (!this.hasRequireFailures()) {
            return STATE_RECOGNIZED;
          } else {
            this._timer = setTimeout(function () {
              _this2.state = STATE_RECOGNIZED;

              _this2.tryEmit();
            }, options.interval);
            return STATE_BEGAN;
          }
        }
      }

      return STATE_FAILED;
    };

    _proto.failTimeout = function failTimeout() {
      var _this3 = this;

      this._timer = setTimeout(function () {
        _this3.state = STATE_FAILED;
      }, this.options.interval);
      return STATE_FAILED;
    };

    _proto.reset = function reset() {
      clearTimeout(this._timer);
    };

    _proto.emit = function emit() {
      if (this.state === STATE_RECOGNIZED) {
        this._input.tapCount = this.count;
        this.manager.emit(this.options.event, this._input);
      }
    };

    return TapRecognizer;
  }(Recognizer);
  /**
   * @private
   * direction cons to string
   * @param {constant} direction
   * @returns {String}
   */


  function directionStr(direction) {
    if (direction === DIRECTION_DOWN) {
      return 'down';
    } else if (direction === DIRECTION_UP) {
      return 'up';
    } else if (direction === DIRECTION_LEFT) {
      return 'left';
    } else if (direction === DIRECTION_RIGHT) {
      return 'right';
    }

    return '';
  }
  /**
   * @private
   * Pan
   * Recognized when the pointer is down and moved in the allowed direction.
   * @constructor
   * @extends AttrRecognizer
   */


  var PanRecognizer =
  /*#__PURE__*/
  function (_AttrRecognizer) {
    _inheritsLoose$1(PanRecognizer, _AttrRecognizer);

    function PanRecognizer(options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _AttrRecognizer.call(this, _extends$1({
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
      }, options)) || this;
      _this.pX = null;
      _this.pY = null;
      return _this;
    }

    var _proto = PanRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      var direction = this.options.direction;
      var actions = [];

      if (direction & DIRECTION_HORIZONTAL) {
        actions.push(TOUCH_ACTION_PAN_Y);
      }

      if (direction & DIRECTION_VERTICAL) {
        actions.push(TOUCH_ACTION_PAN_X);
      }

      return actions;
    };

    _proto.directionTest = function directionTest(input) {
      var options = this.options;
      var hasMoved = true;
      var distance = input.distance;
      var direction = input.direction;
      var x = input.deltaX;
      var y = input.deltaY; // lock to axis?

      if (!(direction & options.direction)) {
        if (options.direction & DIRECTION_HORIZONTAL) {
          direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
          hasMoved = x !== this.pX;
          distance = Math.abs(input.deltaX);
        } else {
          direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
          hasMoved = y !== this.pY;
          distance = Math.abs(input.deltaY);
        }
      }

      input.direction = direction;
      return hasMoved && distance > options.threshold && direction & options.direction;
    };

    _proto.attrTest = function attrTest(input) {
      return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
      this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
    };

    _proto.emit = function emit(input) {
      this.pX = input.deltaX;
      this.pY = input.deltaY;
      var direction = directionStr(input.direction);

      if (direction) {
        input.additionalEvent = this.options.event + direction;
      }

      _AttrRecognizer.prototype.emit.call(this, input);
    };

    return PanRecognizer;
  }(AttrRecognizer);
  /**
   * @private
   * Swipe
   * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
   * @constructor
   * @extends AttrRecognizer
   */


  var SwipeRecognizer =
  /*#__PURE__*/
  function (_AttrRecognizer) {
    _inheritsLoose$1(SwipeRecognizer, _AttrRecognizer);

    function SwipeRecognizer(options) {
      if (options === void 0) {
        options = {};
      }

      return _AttrRecognizer.call(this, _extends$1({
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
      }, options)) || this;
    }

    var _proto = SwipeRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      return PanRecognizer.prototype.getTouchAction.call(this);
    };

    _proto.attrTest = function attrTest(input) {
      var direction = this.options.direction;
      var velocity;

      if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
        velocity = input.overallVelocity;
      } else if (direction & DIRECTION_HORIZONTAL) {
        velocity = input.overallVelocityX;
      } else if (direction & DIRECTION_VERTICAL) {
        velocity = input.overallVelocityY;
      }

      return _AttrRecognizer.prototype.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    };

    _proto.emit = function emit(input) {
      var direction = directionStr(input.offsetDirection);

      if (direction) {
        this.manager.emit(this.options.event + direction, input);
      }

      this.manager.emit(this.options.event, input);
    };

    return SwipeRecognizer;
  }(AttrRecognizer);
  /**
   * @private
   * Pinch
   * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
   * @constructor
   * @extends AttrRecognizer
   */


  var PinchRecognizer =
  /*#__PURE__*/
  function (_AttrRecognizer) {
    _inheritsLoose$1(PinchRecognizer, _AttrRecognizer);

    function PinchRecognizer(options) {
      if (options === void 0) {
        options = {};
      }

      return _AttrRecognizer.call(this, _extends$1({
        event: 'pinch',
        threshold: 0,
        pointers: 2
      }, options)) || this;
    }

    var _proto = PinchRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_NONE];
    };

    _proto.attrTest = function attrTest(input) {
      return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    };

    _proto.emit = function emit(input) {
      if (input.scale !== 1) {
        var inOut = input.scale < 1 ? 'in' : 'out';
        input.additionalEvent = this.options.event + inOut;
      }

      _AttrRecognizer.prototype.emit.call(this, input);
    };

    return PinchRecognizer;
  }(AttrRecognizer);
  /**
   * @private
   * Rotate
   * Recognized when two or more pointer are moving in a circular motion.
   * @constructor
   * @extends AttrRecognizer
   */


  var RotateRecognizer =
  /*#__PURE__*/
  function (_AttrRecognizer) {
    _inheritsLoose$1(RotateRecognizer, _AttrRecognizer);

    function RotateRecognizer(options) {
      if (options === void 0) {
        options = {};
      }

      return _AttrRecognizer.call(this, _extends$1({
        event: 'rotate',
        threshold: 0,
        pointers: 2
      }, options)) || this;
    }

    var _proto = RotateRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_NONE];
    };

    _proto.attrTest = function attrTest(input) {
      return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    };

    return RotateRecognizer;
  }(AttrRecognizer);
  /**
   * @private
   * Press
   * Recognized when the pointer is down for x ms without any movement.
   * @constructor
   * @extends Recognizer
   */


  var PressRecognizer =
  /*#__PURE__*/
  function (_Recognizer) {
    _inheritsLoose$1(PressRecognizer, _Recognizer);

    function PressRecognizer(options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _Recognizer.call(this, _extends$1({
        event: 'press',
        pointers: 1,
        time: 251,
        // minimal time of the pointer to be pressed
        threshold: 9
      }, options)) || this;
      _this._timer = null;
      _this._input = null;
      return _this;
    }

    var _proto = PressRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_AUTO];
    };

    _proto.process = function process(input) {
      var _this2 = this;

      var options = this.options;
      var validPointers = input.pointers.length === options.pointers;
      var validMovement = input.distance < options.threshold;
      var validTime = input.deltaTime > options.time;
      this._input = input; // we only allow little movement
      // and we've reached an end event, so a tap is possible

      if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
        this.reset();
      } else if (input.eventType & INPUT_START) {
        this.reset();
        this._timer = setTimeout(function () {
          _this2.state = STATE_RECOGNIZED;

          _this2.tryEmit();
        }, options.time);
      } else if (input.eventType & INPUT_END) {
        return STATE_RECOGNIZED;
      }

      return STATE_FAILED;
    };

    _proto.reset = function reset() {
      clearTimeout(this._timer);
    };

    _proto.emit = function emit(input) {
      if (this.state !== STATE_RECOGNIZED) {
        return;
      }

      if (input && input.eventType & INPUT_END) {
        this.manager.emit(this.options.event + "up", input);
      } else {
        this._input.timeStamp = now();
        this.manager.emit(this.options.event, this._input);
      }
    };

    return PressRecognizer;
  }(Recognizer);

  /*
  Copyright (c) 2017 NAVER Corp.
  @egjs/axes project is licensed under the MIT license

  @egjs/axes JavaScript library
  https://github.com/naver/egjs-axes

  @version 2.5.8
  */
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  /* global Reflect, Promise */

  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  function __extends(d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  function getInsidePosition(destPos, range, circular, bounce) {
    var toDestPos = destPos;
    var targetRange = [circular[0] ? range[0] : bounce ? range[0] - bounce[0] : range[0], circular[1] ? range[1] : bounce ? range[1] + bounce[1] : range[1]];
    toDestPos = Math.max(targetRange[0], toDestPos);
    toDestPos = Math.min(targetRange[1], toDestPos);
    return +toDestPos.toFixed(5);
  } // determine outside


  function isOutside(pos, range) {
    return pos < range[0] || pos > range[1];
  }

  function getDuration(distance, deceleration) {
    var duration = Math.sqrt(distance / deceleration * 2); // when duration is under 100, then value is zero

    return duration < 100 ? 0 : duration;
  }

  function isCircularable(destPos, range, circular) {
    return circular[1] && destPos > range[1] || circular[0] && destPos < range[0];
  }

  function getCirculatedPos(pos, range, circular) {
    var toPos = pos;
    var min = range[0];
    var max = range[1];
    var length = max - min;

    if (circular[1] && pos > max) {
      // right
      toPos = (toPos - max) % length + min;
    }

    if (circular[0] && pos < min) {
      // left
      toPos = (toPos - min) % length + max;
    }

    return +toPos.toFixed(5);
  }

  function equal(target, base) {
    for (var k in target) {
      if (target[k] !== base[k]) {
        return false;
      }
    }

    return true;
  }

  var AxisManager =
  /*#__PURE__*/
  function () {
    function AxisManager(axis, options) {
      var _this = this;

      this.axis = axis;
      this.options = options;

      this._complementOptions();

      this._pos = Object.keys(this.axis).reduce(function (acc, v) {
        acc[v] = _this.axis[v].range[0];
        return acc;
      }, {});
    }
    /**
       * set up 'css' expression
       * @private
       */


    var __proto = AxisManager.prototype;

    __proto._complementOptions = function () {
      var _this = this;

      Object.keys(this.axis).forEach(function (axis) {
        _this.axis[axis] = __assign({
          range: [0, 100],
          bounce: [0, 0],
          circular: [false, false]
        }, _this.axis[axis]);
        ["bounce", "circular"].forEach(function (v) {
          var axisOption = _this.axis;
          var key = axisOption[axis][v];

          if (/string|number|boolean/.test(typeof key)) {
            axisOption[axis][v] = [key, key];
          }
        });
      });
    };

    __proto.getDelta = function (depaPos, destPos) {
      var fullDepaPos = this.get(depaPos);
      return this.map(this.get(destPos), function (v, k) {
        return v - fullDepaPos[k];
      });
    };

    __proto.get = function (axes) {
      var _this = this;

      if (axes && Array.isArray(axes)) {
        return axes.reduce(function (acc, v) {
          if (v && v in _this._pos) {
            acc[v] = _this._pos[v];
          }

          return acc;
        }, {});
      } else {
        return __assign({}, this._pos, axes || {});
      }
    };

    __proto.moveTo = function (pos) {
      var _this = this;

      var delta = this.map(this._pos, function (v, key) {
        return pos[key] ? pos[key] - _this._pos[key] : 0;
      });
      this.set(pos);
      return {
        pos: __assign({}, this._pos),
        delta: delta
      };
    };

    __proto.set = function (pos) {
      for (var k in pos) {
        if (k && k in this._pos) {
          this._pos[k] = pos[k];
        }
      }
    };

    __proto.every = function (pos, callback) {
      var axisOptions = this.axis;

      for (var k in pos) {
        if (k) {
          if (!callback(pos[k], k, axisOptions[k])) {
            return false;
          }
        }
      }

      return true;
    };

    __proto.filter = function (pos, callback) {
      var filtered = {};
      var axisOptions = this.axis;

      for (var k in pos) {
        if (k) {
          callback(pos[k], k, axisOptions[k]) && (filtered[k] = pos[k]);
        }
      }

      return filtered;
    };

    __proto.map = function (pos, callback) {
      var tranformed = {};
      var axisOptions = this.axis;

      for (var k in pos) {
        if (k) {
          tranformed[k] = callback(pos[k], k, axisOptions[k]);
        }
      }

      return tranformed;
    };

    __proto.isOutside = function (axes) {
      return !this.every(axes ? this.get(axes) : this._pos, function (v, k, opt) {
        return !isOutside(v, opt.range);
      });
    };

    return AxisManager;
  }();
  /* eslint-disable no-new-func, no-nested-ternary */


  var win$2;

  if (typeof window === "undefined") {
    // window is undefined in node.js
    win$2 = {};
  } else {
    win$2 = window;
  }

  function toArray$1(nodes) {
    // const el = Array.prototype.slice.call(nodes);
    // for IE8
    var el = [];

    for (var i = 0, len = nodes.length; i < len; i++) {
      el.push(nodes[i]);
    }

    return el;
  }

  function $(param, multi) {
    if (multi === void 0) {
      multi = false;
    }

    var el;

    if (typeof param === "string") {
      // String (HTML, Selector)
      // check if string is HTML tag format
      var match = param.match(/^<([a-z]+)\s*([^>]*)>/); // creating element

      if (match) {
        // HTML
        var dummy = document.createElement("div");
        dummy.innerHTML = param;
        el = toArray$1(dummy.childNodes);
      } else {
        // Selector
        el = toArray$1(document.querySelectorAll(param));
      }

      if (!multi) {
        el = el.length >= 1 ? el[0] : undefined;
      }
    } else if (param === win$2) {
      // window
      el = param;
    } else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
      // HTMLElement, Document
      el = param;
    } else if ("jQuery" in win$2 && param instanceof jQuery || param.constructor.prototype.jquery) {
      // jQuery
      el = multi ? param.toArray() : param.get(0);
    } else if (Array.isArray(param)) {
      el = param.map(function (v) {
        return $(v);
      });

      if (!multi) {
        el = el.length >= 1 ? el[0] : undefined;
      }
    }

    return el;
  }

  var raf = win$2.requestAnimationFrame || win$2.webkitRequestAnimationFrame;
  var caf = win$2.cancelAnimationFrame || win$2.webkitCancelAnimationFrame;

  if (raf && !caf) {
    var keyInfo_1 = {};
    var oldraf_1 = raf;

    raf = function (callback) {
      function wrapCallback(timestamp) {
        if (keyInfo_1[key]) {
          callback(timestamp);
        }
      }

      var key = oldraf_1(wrapCallback);
      keyInfo_1[key] = true;
      return key;
    };

    caf = function (key) {
      delete keyInfo_1[key];
    };
  } else if (!(raf && caf)) {
    raf = function (callback) {
      return win$2.setTimeout(function () {
        callback(win$2.performance && win$2.performance.now && win$2.performance.now() || new Date().getTime());
      }, 16);
    };

    caf = win$2.clearTimeout;
  }
  /**
   * A polyfill for the window.requestAnimationFrame() method.
   * @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
   * @private
   */


  function requestAnimationFrame(fp) {
    return raf(fp);
  }
  /**
  * A polyfill for the window.cancelAnimationFrame() method. It cancels an animation executed through a call to the requestAnimationFrame() method.
  * @param {Number} key −	The ID value returned through a call to the requestAnimationFrame() method. <ko>requestAnimationFrame() 메서드가 반환한 아이디 값</ko>
  * @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
  * @private
  */


  function cancelAnimationFrame(key) {
    caf(key);
  }

  function minMax(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }

  var AnimationManager =
  /*#__PURE__*/
  function () {
    function AnimationManager(_a) {
      var options = _a.options,
          itm = _a.itm,
          em = _a.em,
          axm = _a.axm;
      this.options = options;
      this.itm = itm;
      this.em = em;
      this.axm = axm;
      this.animationEnd = this.animationEnd.bind(this);
    }

    var __proto = AnimationManager.prototype;

    __proto.getDuration = function (depaPos, destPos, wishDuration) {
      var _this = this;

      var duration;

      if (typeof wishDuration !== "undefined") {
        duration = wishDuration;
      } else {
        var durations_1 = this.axm.map(destPos, function (v, k) {
          return getDuration(Math.abs(Math.abs(v) - Math.abs(depaPos[k])), _this.options.deceleration);
        });
        duration = Object.keys(durations_1).reduce(function (max, v) {
          return Math.max(max, durations_1[v]);
        }, -Infinity);
      }

      return minMax(duration, this.options.minimumDuration, this.options.maximumDuration);
    };

    __proto.createAnimationParam = function (pos, duration, option) {
      var depaPos = this.axm.get();
      var destPos = pos;
      var inputEvent = option && option.event || null;
      return {
        depaPos: depaPos,
        destPos: destPos,
        duration: minMax(duration, this.options.minimumDuration, this.options.maximumDuration),
        delta: this.axm.getDelta(depaPos, destPos),
        inputEvent: inputEvent,
        input: option && option.input || null,
        isTrusted: !!inputEvent,
        done: this.animationEnd
      };
    };

    __proto.grab = function (axes, option) {
      if (this._animateParam && axes.length) {
        var orgPos_1 = this.axm.get(axes);
        var pos = this.axm.map(orgPos_1, function (v, k, opt) {
          return getCirculatedPos(v, opt.range, opt.circular);
        });

        if (!this.axm.every(pos, function (v, k) {
          return orgPos_1[k] === v;
        })) {
          this.em.triggerChange(pos, option, !!option);
        }

        this._animateParam = null;
        this._raf && cancelAnimationFrame(this._raf);
        this._raf = null;
        this.em.triggerAnimationEnd(!!(option && option.event));
      }
    };

    __proto.getEventInfo = function () {
      if (this._animateParam && this._animateParam.input && this._animateParam.inputEvent) {
        return {
          input: this._animateParam.input,
          event: this._animateParam.inputEvent
        };
      } else {
        return null;
      }
    };

    __proto.restore = function (option) {
      var pos = this.axm.get();
      var destPos = this.axm.map(pos, function (v, k, opt) {
        return Math.min(opt.range[1], Math.max(opt.range[0], v));
      });
      this.animateTo(destPos, this.getDuration(pos, destPos), option);
    };

    __proto.animationEnd = function () {
      var beforeParam = this.getEventInfo();
      this._animateParam = null; // for Circular

      var circularTargets = this.axm.filter(this.axm.get(), function (v, k, opt) {
        return isCircularable(v, opt.range, opt.circular);
      });
      Object.keys(circularTargets).length > 0 && this.setTo(this.axm.map(circularTargets, function (v, k, opt) {
        return getCirculatedPos(v, opt.range, opt.circular);
      }));
      this.itm.setInterrupt(false);
      this.em.triggerAnimationEnd(!!beforeParam);

      if (this.axm.isOutside()) {
        this.restore(beforeParam);
      } else {
        this.em.triggerFinish(!!beforeParam);
      }
    };

    __proto.animateLoop = function (param, complete) {
      this._animateParam = __assign({}, param);
      this._animateParam.startTime = new Date().getTime();

      if (param.duration) {
        var info_1 = this._animateParam;
        var self_1 = this;

        (function loop() {
          self_1._raf = null;

          if (self_1.frame(info_1) >= 1) {
            if (!equal(param.destPos, self_1.axm.get(Object.keys(param.destPos)))) {
              self_1.em.triggerChange(param.destPos);
            }

            complete();
            return;
          } // animationEnd


          self_1._raf = requestAnimationFrame(loop);
        })();
      } else {
        this.em.triggerChange(param.destPos);
        complete();
      }
    };

    __proto.getUserControll = function (param) {
      var userWish = param.setTo();
      userWish.destPos = this.axm.get(userWish.destPos);
      userWish.duration = minMax(userWish.duration, this.options.minimumDuration, this.options.maximumDuration);
      return userWish;
    };

    __proto.animateTo = function (destPos, duration, option) {
      var _this = this;

      var param = this.createAnimationParam(destPos, duration, option);

      var depaPos = __assign({}, param.depaPos);

      var retTrigger = this.em.triggerAnimationStart(param); // to control

      var userWish = this.getUserControll(param); // You can't stop the 'animationStart' event when 'circular' is true.

      if (!retTrigger && this.axm.every(userWish.destPos, function (v, k, opt) {
        return isCircularable(v, opt.range, opt.circular);
      })) {
        console.warn("You can't stop the 'animation' event when 'circular' is true.");
      }

      if (retTrigger && !equal(userWish.destPos, depaPos)) {
        var inputEvent = option && option.event || null;
        this.animateLoop({
          depaPos: depaPos,
          destPos: userWish.destPos,
          duration: userWish.duration,
          delta: this.axm.getDelta(depaPos, userWish.destPos),
          isTrusted: !!inputEvent,
          inputEvent: inputEvent,
          input: option && option.input || null
        }, function () {
          return _this.animationEnd();
        });
      }
    }; // animation frame (0~1)


    __proto.frame = function (param) {
      var curTime = new Date().getTime() - param.startTime;
      var easingPer = this.easing(curTime / param.duration);
      var toPos = param.depaPos;
      toPos = this.axm.map(toPos, function (v, k, opt) {
        v += param.delta[k] * easingPer;
        return getCirculatedPos(v, opt.range, opt.circular);
      });
      this.em.triggerChange(toPos);
      return easingPer;
    };

    __proto.easing = function (p) {
      return p > 1 ? 1 : this.options.easing(p);
    };

    __proto.setTo = function (pos, duration) {
      if (duration === void 0) {
        duration = 0;
      }

      var axes = Object.keys(pos);
      this.grab(axes);
      var orgPos = this.axm.get(axes);

      if (equal(pos, orgPos)) {
        return this;
      }

      this.itm.setInterrupt(true);
      var movedPos = this.axm.filter(pos, function (v, k) {
        return orgPos[k] !== v;
      });

      if (!Object.keys(movedPos).length) {
        return this;
      }

      movedPos = this.axm.map(movedPos, function (v, k, opt) {
        if (opt.circular && (opt.circular[0] || opt.circular[1])) {
          return duration > 0 ? v : getCirculatedPos(v, opt.range, opt.circular);
        } else {
          return getInsidePosition(v, opt.range, opt.circular);
        }
      });

      if (equal(movedPos, orgPos)) {
        return this;
      }

      if (duration > 0) {
        this.animateTo(movedPos, duration);
      } else {
        this.em.triggerChange(movedPos);
        this.itm.setInterrupt(false);
      }

      return this;
    };

    __proto.setBy = function (pos, duration) {
      if (duration === void 0) {
        duration = 0;
      }

      return this.setTo(this.axm.map(this.axm.get(Object.keys(pos)), function (v, k) {
        return v + pos[k];
      }), duration);
    };

    return AnimationManager;
  }();

  var EventManager =
  /*#__PURE__*/
  function () {
    function EventManager(axes) {
      this.axes = axes;
    }
    /**
     * This event is fired when a user holds an element on the screen of the device.
     * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
     * @name eg.Axes#hold
     * @event
     * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Object.<string, number>} pos coordinate <ko>좌표 정보</ko>
     * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
     * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("hold", function(event) {
     *   // event.pos
     *   // event.input
     *   // event.inputEvent
     *   // isTrusted
     * });
     */


    var __proto = EventManager.prototype;

    __proto.triggerHold = function (pos, option) {
      this.axes.trigger("hold", {
        pos: pos,
        input: option.input || null,
        inputEvent: option.event || null,
        isTrusted: true
      });
    };
    /**
     * Specifies the coordinates to move after the 'change' event. It works when the holding value of the change event is true.
     * @ko 'change' 이벤트 이후 이동할 좌표를 지정한다. change이벤트의 holding 값이 true일 경우에 동작한다
     * @name set
    * @function
     * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("change", function(event) {
     *   event.holding && event.set({x: 10});
     * });
     */

    /** Specifies the animation coordinates to move after the 'release' or 'animationStart' events.
     * @ko 'release' 또는 'animationStart' 이벤트 이후 이동할 좌표를 지정한다.
     * @name setTo
    * @function
     * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
     * @param {Number} [duration] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("animationStart", function(event) {
     *   event.setTo({x: 10}, 2000);
     * });
     */

    /**
     * This event is fired when a user release an element on the screen of the device.
     * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
     * @name eg.Axes#release
     * @event
     * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Object.<string, number>} depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표 </ko>
     * @property {Object.<string, number>} destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
     * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
     * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
     * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
     * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("release", function(event) {
     *   // event.depaPos
     *   // event.destPos
     *   // event.delta
     *   // event.input
     *   // event.inputEvent
     *   // event.setTo
     *   // event.isTrusted
     *
     *   // if you want to change the animation coordinates to move after the 'release' event.
     *   event.setTo({x: 10}, 2000);
     * });
     */


    __proto.triggerRelease = function (param) {
      param.setTo = this.createUserControll(param.destPos, param.duration);
      this.axes.trigger("release", param);
    };
    /**
     * This event is fired when coordinate changes.
     * @ko 좌표가 변경됐을 때 발생하는 이벤트
     * @name eg.Axes#change
     * @event
     * @type {object} The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Object.<string, number>} pos  The coordinate <ko>좌표</ko>
     * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
     * @property {Boolean} holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
     * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
     * @property {Object} inputEvent The event object received from inputType. If the value is changed by animation, it returns 'null'.<ko>inputType으로 부터 받은 이벤트 객체. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
     * @property {set} set Specifies the coordinates to move after the event. It works when the holding value is true <ko>이벤트 이후 이동할 좌표를 지정한다. holding 값이 true일 경우에 동작한다.</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("change", function(event) {
     *   // event.pos
     *   // event.delta
     *   // event.input
     *   // event.inputEvent
     *   // event.holding
     *   // event.set
     *   // event.isTrusted
     *
     *   // if you want to change the coordinates to move after the 'change' event.
     *   // it works when the holding value of the change event is true.
     *   event.holding && event.set({x: 10});
     * });
     */


    __proto.triggerChange = function (pos, option, holding) {
      if (option === void 0) {
        option = null;
      }

      if (holding === void 0) {
        holding = false;
      }

      var eventInfo = this.am.getEventInfo();
      var moveTo = this.am.axm.moveTo(pos);
      var inputEvent = option && option.event || eventInfo && eventInfo.event || null;
      var param = {
        pos: moveTo.pos,
        delta: moveTo.delta,
        holding: holding,
        inputEvent: inputEvent,
        isTrusted: !!inputEvent,
        input: option && option.input || eventInfo && eventInfo.input || null,
        set: inputEvent ? this.createUserControll(moveTo.pos) : function () {}
      };
      this.axes.trigger("change", param);
      inputEvent && this.am.axm.set(param.set()["destPos"]);
    };
    /**
     * This event is fired when animation starts.
     * @ko 에니메이션이 시작할 때 발생한다.
     * @name eg.Axes#animationStart
     * @event
     * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Object.<string, number>} depaPos The coordinates when animation starts<ko>애니메이션이 시작 되었을 때의 좌표 </ko>
     * @property {Object.<string, number>} destPos The coordinates to move to. If you change this value, you can run the animation<ko>이동할 좌표. 이값을 변경하여 애니메이션을 동작시킬수 있다</ko>
     * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
     * @property {Number} duration Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.<ko>애니메이션 진행 시간(단위: ms). 이값을 변경하여 애니메이션의 이동시간을 조절할 수 있다.</ko>
     * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
     * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
     * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("release", function(event) {
     *   // event.depaPos
     *   // event.destPos
     *   // event.delta
     *   // event.input
     *   // event.inputEvent
     *   // event.setTo
     *   // event.isTrusted
     *
     *   // if you want to change the animation coordinates to move after the 'animationStart' event.
     *   event.setTo({x: 10}, 2000);
     * });
     */


    __proto.triggerAnimationStart = function (param) {
      param.setTo = this.createUserControll(param.destPos, param.duration);
      return this.axes.trigger("animationStart", param);
    };
    /**
     * This event is fired when animation ends.
     * @ko 에니메이션이 끝났을 때 발생한다.
     * @name eg.Axes#animationEnd
     * @event
     * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("animationEnd", function(event) {
     *   // event.isTrusted
     * });
     */


    __proto.triggerAnimationEnd = function (isTrusted) {
      if (isTrusted === void 0) {
        isTrusted = false;
      }

      this.axes.trigger("animationEnd", {
        isTrusted: isTrusted
      });
    };
    /**
     * This event is fired when all actions have been completed.
     * @ko 에니메이션이 끝났을 때 발생한다.
     * @name eg.Axes#finish
     * @event
     * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("finish", function(event) {
     *   // event.isTrusted
     * });
     */


    __proto.triggerFinish = function (isTrusted) {
      if (isTrusted === void 0) {
        isTrusted = false;
      }

      this.axes.trigger("finish", {
        isTrusted: isTrusted
      });
    };

    __proto.createUserControll = function (pos, duration) {
      if (duration === void 0) {
        duration = 0;
      } // to controll


      var userControl = {
        destPos: __assign({}, pos),
        duration: duration
      };
      return function (toPos, userDuration) {
        toPos && (userControl.destPos = __assign({}, toPos));
        userDuration !== undefined && (userControl.duration = userDuration);
        return userControl;
      };
    };

    __proto.setAnimationManager = function (am) {
      this.am = am;
    };

    __proto.destroy = function () {
      this.axes.off();
    };

    return EventManager;
  }();

  var InterruptManager =
  /*#__PURE__*/
  function () {
    function InterruptManager(options) {
      this.options = options;
      this._prevented = false; //  check whether the animation event was prevented
    }

    var __proto = InterruptManager.prototype;

    __proto.isInterrupting = function () {
      // when interruptable is 'true', return value is always 'true'.
      return this.options.interruptable || this._prevented;
    };

    __proto.isInterrupted = function () {
      return !this.options.interruptable && this._prevented;
    };

    __proto.setInterrupt = function (prevented) {
      !this.options.interruptable && (this._prevented = prevented);
    };

    return InterruptManager;
  }();

  var InputObserver =
  /*#__PURE__*/
  function () {
    function InputObserver(_a) {
      var options = _a.options,
          itm = _a.itm,
          em = _a.em,
          axm = _a.axm,
          am = _a.am;
      this.isOutside = false;
      this.moveDistance = null;
      this.options = options;
      this.itm = itm;
      this.em = em;
      this.axm = axm;
      this.am = am;
    } // when move pointer is held in outside


    var __proto = InputObserver.prototype;

    __proto.atOutside = function (pos) {
      var _this = this;

      if (this.isOutside) {
        return this.axm.map(pos, function (v, k, opt) {
          var tn = opt.range[0] - opt.bounce[0];
          var tx = opt.range[1] + opt.bounce[1];
          return v > tx ? tx : v < tn ? tn : v;
        });
      } else {
        // when start pointer is held in inside
        // get a initialization slope value to prevent smooth animation.
        var initSlope_1 = this.am.easing(0.00001) / 0.00001;
        return this.axm.map(pos, function (v, k, opt) {
          var min = opt.range[0];
          var max = opt.range[1];
          var out = opt.bounce;

          if (v < min) {
            // left
            return min - _this.am.easing((min - v) / (out[0] * initSlope_1)) * out[0];
          } else if (v > max) {
            // right
            return max + _this.am.easing((v - max) / (out[1] * initSlope_1)) * out[1];
          }

          return v;
        });
      }
    };

    __proto.get = function (input) {
      return this.axm.get(input.axes);
    };

    __proto.hold = function (input, event) {
      if (this.itm.isInterrupted() || !input.axes.length) {
        return;
      }

      var changeOption = {
        input: input,
        event: event
      };
      this.itm.setInterrupt(true);
      this.am.grab(input.axes, changeOption);
      !this.moveDistance && this.em.triggerHold(this.axm.get(), changeOption);
      this.isOutside = this.axm.isOutside(input.axes);
      this.moveDistance = this.axm.get(input.axes);
    };

    __proto.change = function (input, event, offset) {
      if (!this.itm.isInterrupting() || this.axm.every(offset, function (v) {
        return v === 0;
      })) {
        return;
      }

      var depaPos = this.axm.get(input.axes);
      var destPos; // for outside logic

      destPos = this.axm.map(this.moveDistance || depaPos, function (v, k) {
        return v + (offset[k] || 0);
      });
      this.moveDistance && (this.moveDistance = destPos);
      destPos = this.axm.map(destPos, function (v, k, opt) {
        return getCirculatedPos(v, opt.range, opt.circular);
      }); // from outside to inside

      if (this.isOutside && this.axm.every(depaPos, function (v, k, opt) {
        return !isOutside(v, opt.range);
      })) {
        this.isOutside = false;
      }

      destPos = this.atOutside(destPos);
      this.em.triggerChange(destPos, {
        input: input,
        event: event
      }, true);
    };

    __proto.release = function (input, event, offset, inputDuration) {
      if (!this.itm.isInterrupting()) {
        return;
      }

      if (!this.moveDistance) {
        return;
      }

      var pos = this.axm.get(input.axes);
      var depaPos = this.axm.get();
      var destPos = this.axm.get(this.axm.map(offset, function (v, k, opt) {
        if (opt.circular && (opt.circular[0] || opt.circular[1])) {
          return pos[k] + v;
        } else {
          return getInsidePosition(pos[k] + v, opt.range, opt.circular, opt.bounce);
        }
      }));
      var duration = this.am.getDuration(destPos, pos, inputDuration);

      if (duration === 0) {
        destPos = __assign({}, depaPos);
      } // prepare params


      var param = {
        depaPos: depaPos,
        destPos: destPos,
        duration: duration,
        delta: this.axm.getDelta(depaPos, destPos),
        inputEvent: event,
        input: input,
        isTrusted: true
      };
      this.em.triggerRelease(param);
      this.moveDistance = null; // to contol

      var userWish = this.am.getUserControll(param);
      var isEqual = equal(userWish.destPos, depaPos);
      var changeOption = {
        input: input,
        event: event
      };

      if (isEqual || userWish.duration === 0) {
        !isEqual && this.em.triggerChange(userWish.destPos, changeOption, true);
        this.itm.setInterrupt(false);

        if (this.axm.isOutside()) {
          this.am.restore(changeOption);
        } else {
          this.em.triggerFinish(true);
        }
      } else {
        this.am.animateTo(userWish.destPos, userWish.duration, changeOption);
      }
    };

    return InputObserver;
  }(); // export const DIRECTION_NONE = 1;


  var TRANSFORM$1 = function () {
    if (typeof document === "undefined") {
      return "";
    }

    var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
    var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

    for (var i = 0, len = target.length; i < len; i++) {
      if (target[i] in bodyStyle) {
        return target[i];
      }
    }

    return "";
  }();
  /**
   * @typedef {Object} AxisOption The Axis information. The key of the axis specifies the name to use as the logical virtual coordinate system.
   * @ko 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.
   * @property {Number[]} [range] The coordinate of range <ko>좌표 범위</ko>
   * @property {Number} [range.0=0] The coordinate of the minimum <ko>최소 좌표</ko>
   * @property {Number} [range.1=0] The coordinate of the maximum <ko>최대 좌표</ko>
   * @property {Number[]} [bounce] The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
   * @property {Number} [bounce.0=0] The size of coordinate of the minimum area <ko>최소 좌표 바운스 영역의 크기</ko>
   * @property {Number} [bounce.1=0] The size of coordinate of the maximum area <ko>최대 좌표 바운스 영역의 크기</ko>
   * @property {Boolean[]} [circular] Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
   * @property {Boolean} [circular.0=false] Indicates whether to circulate to the coordinate of the minimum <ko>최소 좌표 방향의 순환 여부</ko>
   * @property {Boolean} [circular.1=false] Indicates whether to circulate to the coordinate of the maximum <ko>최대 좌표 방향의 순환 여부</ko>
  **/

  /**
   * @typedef {Object} AxesOption The option object of the eg.Axes module
   * @ko eg.Axes 모듈의 옵션 객체
   * @property {Function} [easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
   * @property {Number} [maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
   * @property {Number} [minimumDuration=0] Minimum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최소 좌표 이동 시간</ko>
   * @property {Number} [deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
   * @property {Boolean} [interruptable=true] Indicates whether an animation is interruptible.<br>- true: It can be paused or stopped by user action or the API.<br>- false: It cannot be paused or stopped by user action or the API while it is running.<ko>진행 중인 애니메이션 중지 가능 여부.<br>- true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.<br>- false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
  **/

  /**
   * @class eg.Axes
   * @classdesc A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates. You can easily create a UI that responds to user actions.
   * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치를 통해 전달 받은 사용자의 동작을 논리적인 가상 좌표로 변경하는 모듈이다. 사용자 동작에 반응하는 UI를 손쉽게 만들수 있다.
   * @extends eg.Component
   *
   * @param {Object.<string, AxisOption>} axis Axis information managed by eg.Axes. The key of the axis specifies the name to use as the logical virtual coordinate system.  <ko>eg.Axes가 관리하는 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.</ko>
   * @param {AxesOption} [options] The option object of the eg.Axes module<ko>eg.Axes 모듈의 옵션 객체</ko>
   * @param {Object.<string, number>} [startPos] The coordinates to be moved when creating an instance. not triggering change event.<ko>인스턴스 생성시 이동할 좌표, change 이벤트는 발생하지 않음.</ko>
   *
   * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
   * @example
   *
   * // 1. Initialize eg.Axes
   * const axes = new eg.Axes({
   *	something1: {
   *		range: [0, 150],
   *		bounce: 50
   *	},
   *	something2: {
   *		range: [0, 200],
   *		bounce: 100
   *	},
   *	somethingN: {
   *		range: [1, 10],
   *	}
   * }, {
   *  deceleration : 0.0024
   * });
   *
   * // 2. attach event handler
   * axes.on({
   *	"hold" : function(evt) {
   *	},
   *	"release" : function(evt) {
   *	},
   *	"animationStart" : function(evt) {
   *	},
   *	"animationEnd" : function(evt) {
   *	},
   *	"change" : function(evt) {
   *	}
   * });
   *
   * // 3. Initialize inputTypes
   * const panInputArea = new eg.Axes.PanInput("#area", {
   *	scale: [0.5, 1]
   * });
   * const panInputHmove = new eg.Axes.PanInput("#hmove");
   * const panInputVmove = new eg.Axes.PanInput("#vmove");
   * const pinchInputArea = new eg.Axes.PinchInput("#area", {
   *	scale: 1.5
   * });
   *
   * // 4. Connect eg.Axes and InputTypes
   * // [PanInput] When the mouse or touchscreen is down and moved.
   * // Connect the 'something2' axis to the mouse or touchscreen x position and
   * // connect the 'somethingN' axis to the mouse or touchscreen y position.
   * axes.connect(["something2", "somethingN"], panInputArea); // or axes.connect("something2 somethingN", panInputArea);
   *
   * // Connect only one 'something1' axis to the mouse or touchscreen x position.
   * axes.connect(["something1"], panInputHmove); // or axes.connect("something1", panInputHmove);
   *
   * // Connect only one 'something2' axis to the mouse or touchscreen y position.
   * axes.connect(["", "something2"], panInputVmove); // or axes.connect(" something2", panInputVmove);
   *
   * // [PinchInput] Connect 'something2' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
   * axes.connect("something2", pinchInputArea);
   */


  var Axes =
  /*#__PURE__*/
  function (_super) {
    __extends(Axes, _super);

    function Axes(axis, options, startPos) {
      if (axis === void 0) {
        axis = {};
      }

      var _this = _super.call(this) || this;

      _this.axis = axis;
      _this._inputs = [];
      _this.options = __assign({
        easing: function easeOutCubic(x) {
          return 1 - Math.pow(1 - x, 3);
        },
        interruptable: true,
        maximumDuration: Infinity,
        minimumDuration: 0,
        deceleration: 0.0006
      }, options);
      _this.itm = new InterruptManager(_this.options);
      _this.axm = new AxisManager(_this.axis, _this.options);
      _this.em = new EventManager(_this);
      _this.am = new AnimationManager(_this);
      _this.io = new InputObserver(_this);

      _this.em.setAnimationManager(_this.am);

      startPos && _this.em.triggerChange(startPos);
      return _this;
    }
    /**
     * Connect the axis of eg.Axes to the inputType.
     * @ko eg.Axes의 축과 inputType을 연결한다
     * @method eg.Axes#connect
     * @param {(String[]|String)} axes The name of the axis to associate with inputType <ko>inputType과 연결할 축의 이름</ko>
     * @param {Object} inputType The inputType instance to associate with the axis of eg.Axes <ko>eg.Axes의 축과 연결할 inputType 인스턴스<ko>
     * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   }
     * });
     *
     * axes.connect("x", new eg.Axes.PanInput("#area1"))
     *    .connect("x xOther", new eg.Axes.PanInput("#area2"))
     *    .connect(" xOther", new eg.Axes.PanInput("#area3"))
     *    .connect(["x"], new eg.Axes.PanInput("#area4"))
     *    .connect(["xOther", "x"], new eg.Axes.PanInput("#area5"))
     *    .connect(["", "xOther"], new eg.Axes.PanInput("#area6"));
     */


    var __proto = Axes.prototype;

    __proto.connect = function (axes, inputType) {
      var mapped;

      if (typeof axes === "string") {
        mapped = axes.split(" ");
      } else {
        mapped = axes.concat();
      } // check same instance


      if (~this._inputs.indexOf(inputType)) {
        this.disconnect(inputType);
      } // check same element in hammer type for share


      if ("hammer" in inputType) {
        var targets = this._inputs.filter(function (v) {
          return v.hammer && v.element === inputType.element;
        });

        if (targets.length) {
          inputType.hammer = targets[0].hammer;
        }
      }

      inputType.mapAxes(mapped);
      inputType.connect(this.io);

      this._inputs.push(inputType);

      return this;
    };
    /**
     * Disconnect the axis of eg.Axes from the inputType.
     * @ko eg.Axes의 축과 inputType의 연결을 끊는다.
     * @method eg.Axes#disconnect
     * @param {Object} [inputType] An inputType instance associated with the axis of eg.Axes <ko>eg.Axes의 축과 연결한 inputType 인스턴스<ko>
     * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   }
     * });
     *
     * const input1 = new eg.Axes.PanInput("#area1");
     * const input2 = new eg.Axes.PanInput("#area2");
     * const input3 = new eg.Axes.PanInput("#area3");
     *
     * axes.connect("x", input1);
     *    .connect("x xOther", input2)
     *    .connect(["xOther", "x"], input3);
     *
     * axes.disconnect(input1); // disconnects input1
     * axes.disconnect(); // disconnects all of them
     */


    __proto.disconnect = function (inputType) {
      if (inputType) {
        var index = this._inputs.indexOf(inputType);

        if (index >= 0) {
          this._inputs[index].disconnect();

          this._inputs.splice(index, 1);
        }
      } else {
        this._inputs.forEach(function (v) {
          return v.disconnect();
        });

        this._inputs = [];
      }

      return this;
    };
    /**
     * Returns the current position of the coordinates.
     * @ko 좌표의 현재 위치를 반환한다
     * @method eg.Axes#get
     * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
     * @return {Object.<string, number>} Axis coordinate information <ko>축 좌표 정보</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   },
     * 	 "zoom": {
     *      range: [50, 30]
     *   }
     * });
     *
     * axes.get(); // {"x": 0, "xOther": -100, "zoom": 50}
     * axes.get(["x", "zoom"]); // {"x": 0, "zoom": 50}
     */


    __proto.get = function (axes) {
      return this.axm.get(axes);
    };
    /**
     * Moves an axis to specific coordinates.
     * @ko 좌표를 이동한다.
     * @method eg.Axes#setTo
     * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
     * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
     * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   },
     * 	 "zoom": {
     *      range: [50, 30]
     *   }
     * });
     *
     * axes.setTo({"x": 30, "zoom": 60});
     * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
     *
     * axes.setTo({"x": 100, "xOther": 60}, 1000); // animatation
     *
     * // after 1000 ms
     * axes.get(); // {"x": 100, "xOther": 60, "zoom": 60}
     */


    __proto.setTo = function (pos, duration) {
      if (duration === void 0) {
        duration = 0;
      }

      this.am.setTo(pos, duration);
      return this;
    };
    /**
     * Moves an axis from the current coordinates to specific coordinates.
     * @ko 현재 좌표를 기준으로 좌표를 이동한다.
     * @method eg.Axes#setBy
     * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
     * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
     * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   },
     * 	 "zoom": {
     *      range: [50, 30]
     *   }
     * });
     *
     * axes.setBy({"x": 30, "zoom": 10});
     * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
     *
     * axes.setBy({"x": 70, "xOther": 60}, 1000); // animatation
     *
     * // after 1000 ms
     * axes.get(); // {"x": 100, "xOther": -40, "zoom": 60}
     */


    __proto.setBy = function (pos, duration) {
      if (duration === void 0) {
        duration = 0;
      }

      this.am.setBy(pos, duration);
      return this;
    };
    /**
     * Returns whether there is a coordinate in the bounce area of ​​the target axis.
     * @ko 대상 축 중 bounce영역에 좌표가 존재하는지를 반환한다
     * @method eg.Axes#isBounceArea
     * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
     * @return {Boolen} Whether the bounce area exists. <ko>bounce 영역 존재 여부</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   },
     * 	 "zoom": {
     *      range: [50, 30]
     *   }
     * });
     *
     * axes.isBounceArea(["x"]);
     * axes.isBounceArea(["x", "zoom"]);
     * axes.isBounceArea();
     */


    __proto.isBounceArea = function (axes) {
      return this.axm.isOutside(axes);
    };
    /**
    * Destroys properties, and events used in a module and disconnect all connections to inputTypes.
    * @ko 모듈에 사용한 속성, 이벤트를 해제한다. 모든 inputType과의 연결을 끊는다.
    * @method eg.Axes#destroy
    */


    __proto.destroy = function () {
      this.disconnect();
      this.em.destroy();
    };
    /**
     * Version info string
     * @ko 버전정보 문자열
     * @name VERSION
     * @static
     * @type {String}
     * @example
     * eg.Axes.VERSION;  // ex) 3.3.3
     * @memberof eg.Axes
     */


    Axes.VERSION = "2.5.8";
    /**
     * @name eg.Axes.TRANSFORM
     * @desc Returns the transform attribute with CSS vendor prefixes.
     * @ko CSS vendor prefixes를 붙인 transform 속성을 반환한다.
     *
     * @constant
     * @type {String}
     * @example
     * eg.Axes.TRANSFORM; // "transform" or "webkitTransform"
     */

    Axes.TRANSFORM = TRANSFORM$1;
    /**
     * @name eg.Axes.DIRECTION_NONE
     * @constant
     * @type {Number}
     */

    Axes.DIRECTION_NONE = DIRECTION_NONE;
    /**
     * @name eg.Axes.DIRECTION_LEFT
     * @constant
     * @type {Number}
    */

    Axes.DIRECTION_LEFT = DIRECTION_LEFT;
    /**
     * @name eg.Axes.DIRECTION_RIGHT
     * @constant
     * @type {Number}
    */

    Axes.DIRECTION_RIGHT = DIRECTION_RIGHT;
    /**
     * @name eg.Axes.DIRECTION_UP
     * @constant
     * @type {Number}
    */

    Axes.DIRECTION_UP = DIRECTION_UP;
    /**
     * @name eg.Axes.DIRECTION_DOWN
     * @constant
     * @type {Number}
    */

    Axes.DIRECTION_DOWN = DIRECTION_DOWN;
    /**
     * @name eg.Axes.DIRECTION_HORIZONTAL
     * @constant
     * @type {Number}
    */

    Axes.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
    /**
     * @name eg.Axes.DIRECTION_VERTICAL
     * @constant
     * @type {Number}
    */

    Axes.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
    /**
     * @name eg.Axes.DIRECTION_ALL
     * @constant
     * @type {Number}
    */

    Axes.DIRECTION_ALL = DIRECTION_ALL;
    return Axes;
  }(Component);

  var SUPPORT_POINTER_EVENTS$1 = "PointerEvent" in win$2 || "MSPointerEvent" in win$2;
  var SUPPORT_TOUCH$2 = "ontouchstart" in win$2;
  var UNIQUEKEY = "_EGJS_AXES_INPUTTYPE_";

  function toAxis(source, offset) {
    return offset.reduce(function (acc, v, i) {
      if (source[i]) {
        acc[source[i]] = v;
      }

      return acc;
    }, {});
  }

  function createHammer(element, options) {
    try {
      // create Hammer
      return new Manager(element, __assign({}, options));
    } catch (e) {
      return null;
    }
  }

  function convertInputType(inputType) {
    if (inputType === void 0) {
      inputType = [];
    }

    var hasTouch = false;
    var hasMouse = false;
    var hasPointer = false;
    inputType.forEach(function (v) {
      switch (v) {
        case "mouse":
          hasMouse = true;
          break;

        case "touch":
          hasTouch = SUPPORT_TOUCH$2;
          break;

        case "pointer":
          hasPointer = SUPPORT_POINTER_EVENTS$1;
        // no default
      }
    });

    if (hasPointer) {
      return PointerEventInput;
    } else if (hasTouch && hasMouse) {
      return TouchMouseInput;
    } else if (hasTouch) {
      return TouchInput;
    } else if (hasMouse) {
      return MouseInput;
    }

    return null;
  }

  function getDirectionByAngle(angle, thresholdAngle) {
    if (thresholdAngle < 0 || thresholdAngle > 90) {
      return DIRECTION_NONE;
    }

    var toAngle = Math.abs(angle);
    return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ? DIRECTION_VERTICAL : DIRECTION_HORIZONTAL;
  }

  function getNextOffset(speeds, deceleration) {
    var normalSpeed = Math.sqrt(speeds[0] * speeds[0] + speeds[1] * speeds[1]);
    var duration = Math.abs(normalSpeed / -deceleration);
    return [speeds[0] / 2 * duration, speeds[1] / 2 * duration];
  }

  function useDirection(checkType, direction, userDirection) {
    if (userDirection) {
      return !!(direction === DIRECTION_ALL || direction & checkType && userDirection & checkType);
    } else {
      return !!(direction & checkType);
    }
  }
  /**
   * @typedef {Object} PanInputOption The option object of the eg.Axes.PanInput module.
   * @ko eg.Axes.PanInput 모듈의 옵션 객체
   * @property {String[]} [inputType=["touch","mouse", "pointer"]] Types of input devices.<br>- touch: Touch screen<br>- mouse: Mouse <ko>입력 장치 종류.<br>- touch: 터치 입력 장치<br>- mouse: 마우스</ko>
   * @property {Number[]} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
   * @property {Number} [scale.0=1] horizontal axis scale <ko>수평축 배율</ko>
   * @property {Number} [scale.1=1] vertical axis scale <ko>수직축 배율</ko>
   * @property {Number} [thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
   * @property {Number} [threshold=0] Minimal pan distance required before recognizing <ko>사용자의 Pan 동작을 인식하기 위해산 최소한의 거리</ko>
   * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager의 옵션</ko>
  **/

  /**
   * @class eg.Axes.PanInput
   * @classdesc A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.
   * @ko 마우스나 터치 스크린을 누르고 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
   *
   * @example
   * const pan = new eg.Axes.PanInput("#area", {
   * 		inputType: ["touch"],
   * 		scale: [1, 1.3],
   * });
   *
   * // Connect the 'something2' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
   * // Connect the 'somethingN' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
   * axes.connect(["something2", "somethingN"], pan); // or axes.connect("something2 somethingN", pan);
   *
   * // Connect only one 'something1' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
   * axes.connect(["something1"], pan); // or axes.connect("something1", pan);
   *
   * // Connect only one 'something2' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
   * axes.connect(["", "something2"], pan); // or axes.connect(" something2", pan);
   *
   * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PanInput module <ko>eg.Axes.PanInput 모듈을 사용할 엘리먼트</ko>
   * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
   */


  var PanInput =
  /*#__PURE__*/
  function () {
    function PanInput(el, options) {
      this.axes = [];
      this.hammer = null;
      this.element = null;
      this.panRecognizer = null;
      /**
       * Hammer helps you add support for touch gestures to your page
       *
       * @external Hammer
       * @see {@link http://hammerjs.github.io|Hammer.JS}
       * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
       * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
       */

      if (typeof Manager === "undefined") {
        throw new Error("The Hammerjs must be loaded before eg.Axes.PanInput.\nhttp://hammerjs.github.io/");
      }

      this.element = $(el);
      this.options = __assign({
        inputType: ["touch", "mouse", "pointer"],
        scale: [1, 1],
        thresholdAngle: 45,
        threshold: 0,
        hammerManagerOptions: {
          // css properties were removed due to usablility issue
          // http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
          cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            userDrag: "none"
          }
        }
      }, options);
      this.onHammerInput = this.onHammerInput.bind(this);
      this.onPanmove = this.onPanmove.bind(this);
      this.onPanend = this.onPanend.bind(this);
    }

    var __proto = PanInput.prototype;

    __proto.mapAxes = function (axes) {
      var useHorizontal = !!axes[0];
      var useVertical = !!axes[1];

      if (useHorizontal && useVertical) {
        this._direction = DIRECTION_ALL;
      } else if (useHorizontal) {
        this._direction = DIRECTION_HORIZONTAL;
      } else if (useVertical) {
        this._direction = DIRECTION_VERTICAL;
      } else {
        this._direction = DIRECTION_NONE;
      }

      this.axes = axes;
    };

    __proto.connect = function (observer) {
      var hammerOption = {
        direction: this._direction,
        threshold: this.options.threshold
      };

      if (this.hammer) {
        // for sharing hammer instance.
        // hammer remove previous PanRecognizer.
        this.removeRecognizer();
        this.dettachEvent();
      } else {
        var keyValue = this.element[UNIQUEKEY];

        if (!keyValue) {
          keyValue = String(Math.round(Math.random() * new Date().getTime()));
        }

        var inputClass = convertInputType(this.options.inputType);

        if (!inputClass) {
          throw new Error("Wrong inputType parameter!");
        }

        this.hammer = createHammer(this.element, __assign({
          inputClass: inputClass
        }, this.options.hammerManagerOptions));
        this.element[UNIQUEKEY] = keyValue;
      }

      this.panRecognizer = new PanRecognizer(hammerOption);
      this.hammer.add(this.panRecognizer);
      this.attachEvent(observer);
      return this;
    };

    __proto.disconnect = function () {
      this.removeRecognizer();

      if (this.hammer) {
        this.dettachEvent();
      }

      this._direction = DIRECTION_NONE;
      return this;
    };
    /**
    * Destroys elements, properties, and events used in a module.
    * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
    * @method eg.Axes.PanInput#destroy
    */


    __proto.destroy = function () {
      this.disconnect();

      if (this.hammer && this.hammer.recognizers.length === 0) {
        this.hammer.destroy();
      }

      delete this.element[UNIQUEKEY];
      this.element = null;
      this.hammer = null;
    };
    /**
     * Enables input devices
     * @ko 입력 장치를 사용할 수 있게 한다
     * @method eg.Axes.PanInput#enable
     * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    __proto.enable = function () {
      this.hammer && (this.hammer.get("pan").options.enable = true);
      return this;
    };
    /**
     * Disables input devices
     * @ko 입력 장치를 사용할 수 없게 한다.
     * @method eg.Axes.PanInput#disable
     * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    __proto.disable = function () {
      this.hammer && (this.hammer.get("pan").options.enable = false);
      return this;
    };
    /**
     * Returns whether to use an input device
     * @ko 입력 장치를 사용 여부를 반환한다.
     * @method eg.Axes.PanInput#isEnable
     * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
     */


    __proto.isEnable = function () {
      return !!(this.hammer && this.hammer.get("pan").options.enable);
    };

    __proto.removeRecognizer = function () {
      if (this.hammer && this.panRecognizer) {
        this.hammer.remove(this.panRecognizer);
        this.panRecognizer = null;
      }
    };

    __proto.onHammerInput = function (event) {
      if (this.isEnable()) {
        if (event.isFirst) {
          this.observer.hold(this, event);
        } else if (event.isFinal) {
          this.onPanend(event);
        }
      }
    };

    __proto.onPanmove = function (event) {
      var userDirection = getDirectionByAngle(event.angle, this.options.thresholdAngle); // not support offset properties in Hammerjs - start

      var prevInput = this.hammer.session.prevInput;
      /* eslint-disable no-param-reassign */

      if (prevInput) {
        event.offsetX = event.deltaX - prevInput.deltaX;
        event.offsetY = event.deltaY - prevInput.deltaY;
      } else {
        event.offsetX = 0;
        event.offsetY = 0;
      }

      var offset = this.getOffset([event.offsetX, event.offsetY], [useDirection(DIRECTION_HORIZONTAL, this._direction, userDirection), useDirection(DIRECTION_VERTICAL, this._direction, userDirection)]);
      var prevent = offset.some(function (v) {
        return v !== 0;
      });

      if (prevent) {
        event.srcEvent.preventDefault();
        event.srcEvent.stopPropagation();
      }

      event.preventSystemEvent = prevent;
      prevent && this.observer.change(this, event, toAxis(this.axes, offset));
    };

    __proto.onPanend = function (event) {
      var offset = this.getOffset([Math.abs(event.velocityX) * (event.deltaX < 0 ? -1 : 1), Math.abs(event.velocityY) * (event.deltaY < 0 ? -1 : 1)], [useDirection(DIRECTION_HORIZONTAL, this._direction), useDirection(DIRECTION_VERTICAL, this._direction)]);
      offset = getNextOffset(offset, this.observer.options.deceleration);
      this.observer.release(this, event, toAxis(this.axes, offset));
    };

    __proto.attachEvent = function (observer) {
      this.observer = observer;
      this.hammer.on("hammer.input", this.onHammerInput).on("panstart panmove", this.onPanmove);
    };

    __proto.dettachEvent = function () {
      this.hammer.off("hammer.input", this.onHammerInput).off("panstart panmove", this.onPanmove);
      this.observer = null;
    };

    __proto.getOffset = function (properties, direction) {
      var offset = [0, 0];
      var scale = this.options.scale;

      if (direction[0]) {
        offset[0] = properties[0] * scale[0];
      }

      if (direction[1]) {
        offset[1] = properties[1] * scale[1];
      }

      return offset;
    };

    return PanInput;
  }();
  /**
   * @typedef {Object} PinchInputOption The option object of the eg.Axes.PinchInput module
   * @ko eg.Axes.PinchInput 모듈의 옵션 객체
   * @property {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
   * @property {Number} [threshold=0] Minimal scale before recognizing <ko>사용자의 Pinch 동작을 인식하기 위해산 최소한의 배율</ko>
   * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager의 옵션</ko>
  **/

  /**
   * @class eg.Axes.PinchInput
   * @classdesc A module that passes the amount of change to eg.Axes when two pointers are moving toward (zoom-in) or away from each other (zoom-out). use one axis.
   * @ko 2개의 pointer를 이용하여 zoom-in하거나 zoom-out 하는 동작의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
   * @example
   * const pinch = new eg.Axes.PinchInput("#area", {
   * 		scale: 1
   * });
   *
   * // Connect 'something' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
   * axes.connect("something", pinch);
   *
   * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PinchInput module <ko>eg.Axes.PinchInput 모듈을 사용할 엘리먼트</ko>
   * @param {PinchInputOption} [options] The option object of the eg.Axes.PinchInput module<ko>eg.Axes.PinchInput 모듈의 옵션 객체</ko>
   */


  var PinchInput =
  /*#__PURE__*/
  function () {
    function PinchInput(el, options) {
      this.axes = [];
      this.hammer = null;
      this.element = null;
      this._base = null;
      this._prev = null;
      this.pinchRecognizer = null;
      /**
       * Hammer helps you add support for touch gestures to your page
       *
       * @external Hammer
       * @see {@link http://hammerjs.github.io|Hammer.JS}
       * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
       * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
       */

      if (typeof Manager === "undefined") {
        throw new Error("The Hammerjs must be loaded before eg.Axes.PinchInput.\nhttp://hammerjs.github.io/");
      }

      this.element = $(el);
      this.options = __assign({
        scale: 1,
        threshold: 0,
        inputType: ["touch", "pointer"],
        hammerManagerOptions: {
          // css properties were removed due to usablility issue
          // http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
          cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            userDrag: "none"
          }
        }
      }, options);
      this.onPinchStart = this.onPinchStart.bind(this);
      this.onPinchMove = this.onPinchMove.bind(this);
      this.onPinchEnd = this.onPinchEnd.bind(this);
    }

    var __proto = PinchInput.prototype;

    __proto.mapAxes = function (axes) {
      this.axes = axes;
    };

    __proto.connect = function (observer) {
      var hammerOption = {
        threshold: this.options.threshold
      };

      if (this.hammer) {
        // for sharing hammer instance.
        // hammer remove previous PinchRecognizer.
        this.removeRecognizer();
        this.dettachEvent();
      } else {
        var keyValue = this.element[UNIQUEKEY];

        if (!keyValue) {
          keyValue = String(Math.round(Math.random() * new Date().getTime()));
        }

        var inputClass = convertInputType(this.options.inputType);

        if (!inputClass) {
          throw new Error("Wrong inputType parameter!");
        }

        this.hammer = createHammer(this.element, __assign({
          inputClass: inputClass
        }, this.options.hammerManagerOptions));
        this.element[UNIQUEKEY] = keyValue;
      }

      this.pinchRecognizer = new PinchRecognizer(hammerOption);
      this.hammer.add(this.pinchRecognizer);
      this.attachEvent(observer);
      return this;
    };

    __proto.disconnect = function () {
      this.removeRecognizer();

      if (this.hammer) {
        this.hammer.remove(this.pinchRecognizer);
        this.pinchRecognizer = null;
        this.dettachEvent();
      }

      return this;
    };
    /**
    * Destroys elements, properties, and events used in a module.
    * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
    * @method eg.Axes.PinchInput#destroy
    */


    __proto.destroy = function () {
      this.disconnect();

      if (this.hammer && this.hammer.recognizers.length === 0) {
        this.hammer.destroy();
      }

      delete this.element[UNIQUEKEY];
      this.element = null;
      this.hammer = null;
    };

    __proto.removeRecognizer = function () {
      if (this.hammer && this.pinchRecognizer) {
        this.hammer.remove(this.pinchRecognizer);
        this.pinchRecognizer = null;
      }
    };

    __proto.onPinchStart = function (event) {
      this._base = this.observer.get(this)[this.axes[0]];
      var offset = this.getOffset(event.scale);
      this.observer.hold(this, event);
      this.observer.change(this, event, toAxis(this.axes, [offset]));
      this._prev = event.scale;
    };

    __proto.onPinchMove = function (event) {
      var offset = this.getOffset(event.scale, this._prev);
      this.observer.change(this, event, toAxis(this.axes, [offset]));
      this._prev = event.scale;
    };

    __proto.onPinchEnd = function (event) {
      var offset = this.getOffset(event.scale, this._prev);
      this.observer.change(this, event, toAxis(this.axes, [offset]));
      this.observer.release(this, event, toAxis(this.axes, [0]), 0);
      this._base = null;
      this._prev = null;
    };

    __proto.getOffset = function (pinchScale, prev) {
      if (prev === void 0) {
        prev = 1;
      }

      return this._base * (pinchScale - prev) * this.options.scale;
    };

    __proto.attachEvent = function (observer) {
      this.observer = observer;
      this.hammer.on("pinchstart", this.onPinchStart).on("pinchmove", this.onPinchMove).on("pinchend", this.onPinchEnd);
    };

    __proto.dettachEvent = function () {
      this.hammer.off("pinchstart", this.onPinchStart).off("pinchmove", this.onPinchMove).off("pinchend", this.onPinchEnd);
      this.observer = null;
      this._prev = null;
    };
    /**
     * Enables input devices
     * @ko 입력 장치를 사용할 수 있게 한다
     * @method eg.Axes.PinchInput#enable
     * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    __proto.enable = function () {
      this.hammer && (this.hammer.get("pinch").options.enable = true);
      return this;
    };
    /**
     * Disables input devices
     * @ko 입력 장치를 사용할 수 없게 한다.
     * @method eg.Axes.PinchInput#disable
     * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    __proto.disable = function () {
      this.hammer && (this.hammer.get("pinch").options.enable = false);
      return this;
    };
    /**
     * Returns whether to use an input device
     * @ko 입력 장치를 사용 여부를 반환한다.
     * @method eg.Axes.PinchInput#isEnable
     * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
     */


    __proto.isEnable = function () {
      return !!(this.hammer && this.hammer.get("pinch").options.enable);
    };

    return PinchInput;
  }();
  /**
   * @typedef {Object} WheelInputOption The option object of the eg.Axes.WheelInput module
   * @ko eg.Axes.WheelInput 모듈의 옵션 객체
   * @property {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
  **/

  /**
   * @class eg.Axes.WheelInput
   * @classdesc A module that passes the amount of change to eg.Axes when the mouse wheel is moved. use one axis.
   * @ko 마우스 휠이 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
   *
   * @example
   * const wheel = new eg.Axes.WheelInput("#area", {
   * 		scale: 1
   * });
   *
   * // Connect 'something' axis when the mousewheel is moved.
   * axes.connect("something", wheel);
   *
   * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.WheelInput module <ko>eg.Axes.WheelInput 모듈을 사용할 엘리먼트</ko>
   * @param {WheelInputOption} [options] The option object of the eg.Axes.WheelInput module<ko>eg.Axes.WheelInput 모듈의 옵션 객체</ko>
   */


  var WheelInput =
  /*#__PURE__*/
  function () {
    function WheelInput(el, options) {
      this.axes = [];
      this.element = null;
      this._isEnabled = false;
      this._isHolded = false;
      this._timer = null;
      this.element = $(el);
      this.options = __assign({
        scale: 1,
        useNormalized: true
      }, options);
      this.onWheel = this.onWheel.bind(this);
    }

    var __proto = WheelInput.prototype;

    __proto.mapAxes = function (axes) {
      this.axes = axes;
    };

    __proto.connect = function (observer) {
      this.dettachEvent();
      this.attachEvent(observer);
      return this;
    };

    __proto.disconnect = function () {
      this.dettachEvent();
      return this;
    };
    /**
    * Destroys elements, properties, and events used in a module.
    * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
    * @method eg.Axes.WheelInput#destroy
    */


    __proto.destroy = function () {
      this.disconnect();
      this.element = null;
    };

    __proto.onWheel = function (event) {
      var _this = this;

      if (!this._isEnabled) {
        return;
      }

      event.preventDefault();

      if (event.deltaY === 0) {
        return;
      }

      if (!this._isHolded) {
        this.observer.hold(this, event);
        this._isHolded = true;
      }

      var offset = (event.deltaY > 0 ? -1 : 1) * this.options.scale * (this.options.useNormalized ? 1 : Math.abs(event.deltaY));
      this.observer.change(this, event, toAxis(this.axes, [offset]));
      clearTimeout(this._timer);
      this._timer = setTimeout(function () {
        if (_this._isHolded) {
          _this._isHolded = false;

          _this.observer.release(_this, event, toAxis(_this.axes, [0]));
        }
      }, 50);
    };

    __proto.attachEvent = function (observer) {
      this.observer = observer;
      this.element.addEventListener("wheel", this.onWheel);
      this._isEnabled = true;
    };

    __proto.dettachEvent = function () {
      this.element.removeEventListener("wheel", this.onWheel);
      this._isEnabled = false;
      this.observer = null;

      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    };
    /**
     * Enables input devices
     * @ko 입력 장치를 사용할 수 있게 한다
     * @method eg.Axes.WheelInput#enable
     * @return {eg.Axes.WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    __proto.enable = function () {
      this._isEnabled = true;
      return this;
    };
    /**
     * Disables input devices
     * @ko 입력 장치를 사용할 수 없게 한다.
     * @method eg.Axes.WheelInput#disable
     * @return {eg.Axes.WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    __proto.disable = function () {
      this._isEnabled = false;
      return this;
    };
    /**
     * Returns whether to use an input device
     * @ko 입력 장치를 사용 여부를 반환한다.
     * @method eg.Axes.WheelInput#isEnable
     * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
     */


    __proto.isEnable = function () {
      return this._isEnabled;
    };

    return WheelInput;
  }();

  var KEY_LEFT_ARROW = 37;
  var KEY_A = 65;
  var KEY_UP_ARROW = 38;
  var KEY_W = 87;
  var KEY_RIGHT_ARROW = 39;
  var KEY_D = 68;
  var KEY_DOWN_ARROW = 40;
  var KEY_S = 83;
  var DIRECTION_REVERSE = -1;
  var DIRECTION_FORWARD = 1;
  var DIRECTION_HORIZONTAL$1 = -1;
  var DIRECTION_VERTICAL$1 = 1;
  var DELAY = 80;
  /**
   * @typedef {Object} MoveKeyInputOption The option object of the eg.Axes.MoveKeyInput module
   * @ko eg.Axes.MoveKeyInput 모듈의 옵션 객체
   * @property {Array<Number>} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
   * @property {Number} [scale[0]=1] Coordinate scale for the first axis<ko>첫번째 축의 배율</ko>
   * @property {Number} [scale[1]=1] Coordinate scale for the decond axis<ko>두번째 축의 배율</ko>
  **/

  /**
   * @class eg.Axes.MoveKeyInput
   * @classdesc A module that passes the amount of change to eg.Axes when the move key stroke is occured. use two axis.
   * @ko 이동키 입력이 발생했을 때의 변화량을 eg.Axes에 전달하는 모듈. 두 개 의 축을 사용한다.
   *
   * @example
   * const moveKey = new eg.Axes.MoveKeyInput("#area", {
   * 		scale: [1, 1]
   * });
   *
   * // Connect 'x', 'y' axes when the moveKey is pressed.
   * axes.connect(["x", "y"], moveKey);
   *
   * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.MoveKeyInput module <ko>eg.Axes.MoveKeyInput 모듈을 사용할 엘리먼트</ko>
   * @param {MoveKeyInputOption} [options] The option object of the eg.Axes.MoveKeyInput module<ko>eg.Axes.MoveKeyInput 모듈의 옵션 객체</ko>
   */

  var MoveKeyInput =
  /*#__PURE__*/
  function () {
    function MoveKeyInput(el, options) {
      this.axes = [];
      this.element = null;
      this._isEnabled = false;
      this._isHolded = false;
      this._timer = null;
      this.element = $(el);
      this.options = __assign({
        scale: [1, 1]
      }, options);
      this.onKeydown = this.onKeydown.bind(this);
      this.onKeyup = this.onKeyup.bind(this);
    }

    var __proto = MoveKeyInput.prototype;

    __proto.mapAxes = function (axes) {
      this.axes = axes;
    };

    __proto.connect = function (observer) {
      this.dettachEvent(); // add tabindex="0" to the container for making it focusable

      if (this.element.getAttribute("tabindex") !== "0") {
        this.element.setAttribute("tabindex", "0");
      }

      this.attachEvent(observer);
      return this;
    };

    __proto.disconnect = function () {
      this.dettachEvent();
      return this;
    };
    /**
    * Destroys elements, properties, and events used in a module.
    * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
    * @method eg.Axes.MoveKeyInput#destroy
    */


    __proto.destroy = function () {
      this.disconnect();
      this.element = null;
    };

    __proto.onKeydown = function (e) {
      if (!this._isEnabled) {
        return;
      }

      var isMoveKey = true;
      var direction = DIRECTION_FORWARD;
      var move = DIRECTION_HORIZONTAL$1;

      switch (e.keyCode) {
        case KEY_LEFT_ARROW:
        case KEY_A:
          direction = DIRECTION_REVERSE;
          break;

        case KEY_RIGHT_ARROW:
        case KEY_D:
          break;

        case KEY_DOWN_ARROW:
        case KEY_S:
          direction = DIRECTION_REVERSE;
          move = DIRECTION_VERTICAL$1;
          break;

        case KEY_UP_ARROW:
        case KEY_W:
          move = DIRECTION_VERTICAL$1;
          break;

        default:
          isMoveKey = false;
      }

      if (move === DIRECTION_HORIZONTAL$1 && !this.axes[0] || move === DIRECTION_VERTICAL$1 && !this.axes[1]) {
        isMoveKey = false;
      }

      if (!isMoveKey) {
        return;
      }

      var offsets = move === DIRECTION_HORIZONTAL$1 ? [+this.options.scale[0] * direction, 0] : [0, +this.options.scale[1] * direction];

      if (!this._isHolded) {
        this.observer.hold(this, event);
        this._isHolded = true;
      }

      clearTimeout(this._timer);
      this.observer.change(this, event, toAxis(this.axes, offsets));
    };

    __proto.onKeyup = function (e) {
      var _this = this;

      if (!this._isHolded) {
        return;
      }

      clearTimeout(this._timer);
      this._timer = setTimeout(function () {
        _this.observer.release(_this, e, toAxis(_this.axes, [0, 0]));

        _this._isHolded = false;
      }, DELAY);
    };

    __proto.attachEvent = function (observer) {
      this.observer = observer;
      this.element.addEventListener("keydown", this.onKeydown, false);
      this.element.addEventListener("keypress", this.onKeydown, false);
      this.element.addEventListener("keyup", this.onKeyup, false);
      this._isEnabled = true;
    };

    __proto.dettachEvent = function () {
      this.element.removeEventListener("keydown", this.onKeydown, false);
      this.element.removeEventListener("keypress", this.onKeydown, false);
      this.element.removeEventListener("keyup", this.onKeyup, false);
      this._isEnabled = false;
      this.observer = null;
    };
    /**
     * Enables input devices
     * @ko 입력 장치를 사용할 수 있게 한다
     * @method eg.Axes.MoveKeyInput#enable
     * @return {eg.Axes.MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    __proto.enable = function () {
      this._isEnabled = true;
      return this;
    };
    /**
     * Disables input devices
     * @ko 입력 장치를 사용할 수 없게 한다.
     * @method eg.Axes.MoveKeyInput#disable
     * @return {eg.Axes.MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    __proto.disable = function () {
      this._isEnabled = false;
      return this;
    };
    /**
     * Returns whether to use an input device
     * @ko 입력 장치를 사용 여부를 반환한다.
     * @method eg.Axes.MoveKeyInput#isEnable
     * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
     */


    __proto.isEnable = function () {
      return this._isEnabled;
    };

    return MoveKeyInput;
  }();

  function toAxis$1(source, offset) {
    return offset.reduce(function (acc, v, i) {
      if (source[i]) {
        acc[source[i]] = v;
      }

      return acc;
    }, {});
  }

  /*
  Copyright (c) 2017 NAVER Corp.
  @egjs/agent project is licensed under the MIT license

  @egjs/agent JavaScript library


  @version 2.1.5
  */
  var win$3 = typeof window !== "undefined" && window || {};
  var RegExp$1 = win$3.RegExp;
  var navigator$1 = win$3.navigator;
  var parseRules = {
    browser: [{
      criteria: "PhantomJS",
      identity: "PhantomJS"
    }, {
      criteria: /Whale/,
      identity: "Whale",
      versionSearch: "Whale"
    }, {
      criteria: /Edge/,
      identity: "Edge",
      versionSearch: "Edge"
    }, {
      criteria: /MSIE|Trident|Windows Phone/,
      identity: "IE",
      versionSearch: "IEMobile|MSIE|rv"
    }, {
      criteria: /MiuiBrowser/,
      identity: "MIUI Browser",
      versionSearch: "MiuiBrowser"
    }, {
      criteria: /SamsungBrowser/,
      identity: "Samsung Internet",
      versionSearch: "SamsungBrowser"
    }, {
      criteria: /SAMSUNG /,
      identity: "Samsung Internet",
      versionSearch: "Version"
    }, {
      criteria: /Chrome|CriOS/,
      identity: "Chrome"
    }, {
      criteria: /Android/,
      identity: "Android Browser",
      versionSearch: "Version"
    }, {
      criteria: /iPhone|iPad/,
      identity: "Safari",
      versionSearch: "Version"
    }, {
      criteria: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    }, {
      criteria: "Firefox",
      identity: "Firefox"
    }],
    os: [{
      criteria: /Windows Phone/,
      identity: "Windows Phone",
      versionSearch: "Windows Phone"
    }, {
      criteria: "Windows 2000",
      identity: "Window",
      versionAlias: "5.0"
    }, {
      criteria: /Windows NT/,
      identity: "Window",
      versionSearch: "Windows NT"
    }, {
      criteria: /iPhone|iPad/,
      identity: "iOS",
      versionSearch: "iPhone OS|CPU OS"
    }, {
      criteria: "Mac",
      versionSearch: "OS X",
      identity: "MAC"
    }, {
      criteria: /Android/,
      identity: "Android"
    }, {
      criteria: /Tizen/,
      identity: "Tizen"
    }, {
      criteria: /Web0S/,
      identity: "WebOS"
    }],
    // Webview check condition
    // ios: If has no version information
    // Android 5.0 && chrome 40+: Presence of "; wv" in userAgent
    // Under android 5.0: Presence of "NAVER" or "Daum" in userAgent
    webview: [{
      criteria: /iPhone|iPad/,
      browserVersionSearch: "Version",
      webviewBrowserVersion: /-1/
    }, {
      criteria: /iPhone|iPad|Android/,
      webviewToken: /NAVER|DAUM|; wv/
    }],
    defaultString: {
      browser: {
        version: "-1",
        name: "unknown"
      },
      os: {
        version: "-1",
        name: "unknown"
      }
    }
  };

  function filter(arr, compare) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      compare(arr[i]) && result.push(arr[i]);
    }

    return result;
  }

  function some(arr, compare) {
    for (var i = 0; i < arr.length; i++) {
      if (compare(arr[i])) {
        return true;
      }
    }

    return false;
  }

  var UA = void 0;

  function setUa(ua) {
    UA = ua;
  }

  function isMatched(base, target) {
    return target && target.test ? !!target.test(base) : base.indexOf(target) > -1;
  }

  function getIdentityStringFromArray(rules, defaultStrings) {
    var matchedRule = filter(rules, function (rule) {
      return isMatched(UA, rule.criteria);
    })[0];
    return matchedRule && matchedRule.identity || defaultStrings.name;
  }

  function getRule(rules, targetIdentity) {
    return filter(rules, function (rule) {
      var criteria = rule.criteria;
      var identityMatched = new RegExp(rule.identity, "i").test(targetIdentity);

      if (criteria ? identityMatched && isMatched(UA, criteria) : identityMatched) {
        return true;
      } else {
        return false;
      }
    })[0];
  }

  function getBrowserName() {
    return getIdentityStringFromArray(parseRules.browser, parseRules.defaultString.browser);
  }

  function getBrowserRule(browserName) {
    var rule = getRule(parseRules.browser, browserName);

    if (!rule) {
      rule = {
        criteria: browserName,
        versionSearch: browserName,
        identity: browserName
      };
    }

    return rule;
  }

  function extractBrowserVersion(versionToken, ua) {
    var browserVersion = parseRules.defaultString.browser.version;
    var versionRegexResult = new RegExp("(" + versionToken + ")", "i").exec(ua);

    if (!versionRegexResult) {
      return browserVersion;
    }

    var versionTokenIndex = versionRegexResult.index;
    var verTkn = versionRegexResult[0];

    if (versionTokenIndex > -1) {
      var versionIndex = versionTokenIndex + verTkn.length + 1;
      browserVersion = ua.substring(versionIndex).split(" ")[0].replace(/_/g, ".").replace(/;|\)/g, "");
    }

    return browserVersion;
  }

  function getBrowserVersion(browserName) {
    if (!browserName) {
      return undefined;
    } // console.log(browserRule);
    // const versionToken = browserRule ? browserRule.versionSearch : browserName;


    var browserRule = getBrowserRule(browserName);
    var versionToken = browserRule.versionSearch || browserName;
    var browserVersion = extractBrowserVersion(versionToken, UA);
    return browserVersion;
  }

  function isWebview() {
    var webviewRules = parseRules.webview;
    var browserVersion = void 0;
    return some(filter(webviewRules, function (rule) {
      return isMatched(UA, rule.criteria);
    }), function (rule) {
      browserVersion = extractBrowserVersion(rule.browserVersionSearch, UA);

      if (isMatched(UA, rule.webviewToken) || isMatched(browserVersion, rule.webviewBrowserVersion)) {
        return true;
      } else {
        return false;
      }
    });
  }

  function getOSRule(osName) {
    return getRule(parseRules.os, osName);
  }

  function getOsName() {
    return getIdentityStringFromArray(parseRules.os, parseRules.defaultString.os);
  }

  function getOsVersion(osName) {
    var osRule = getOSRule(osName) || {};
    var defaultOSVersion = parseRules.defaultString.os.version;
    var osVersion = void 0;

    if (!osName) {
      return undefined;
    }

    if (osRule.versionAlias) {
      return osRule.versionAlias;
    }

    var osVersionToken = osRule.versionSearch || osName;
    var osVersionRegex = new RegExp("(" + osVersionToken + ")\\s([\\d_\\.]+|\\d_0)", "i");
    var osVersionRegexResult = osVersionRegex.exec(UA);

    if (osVersionRegexResult) {
      osVersion = osVersionRegex.exec(UA)[2].replace(/_/g, ".").replace(/;|\)/g, "");
    }

    return osVersion || defaultOSVersion;
  }

  function getOs() {
    var name = getOsName();
    var version = getOsVersion(name);
    return {
      name: name,
      version: version
    };
  }

  function getBrowser() {
    var name = getBrowserName();
    var version = getBrowserVersion(name);
    return {
      name: name,
      version: version,
      webview: isWebview()
    };
  }

  function getIsMobile() {
    return UA.indexOf("Mobi") !== -1;
  }
  /**
   * Copyright (c) NAVER Corp.
   * egjs-agent projects are licensed under the MIT license
   */

  /**
   * @namespace eg.agent
   */

  /**
   * Extracts browser and operating system information from the user agent string.
   * @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
   * @function eg.agent#agent
   * @param {String} [userAgent=navigator.userAgent] user agent string to parse <ko>파싱할 유저에이전트 문자열</ko>
   * @return {Object} agentInfo
   * @return {Object} agentInfo.os os Operating system information <ko>운영체제 정보</ko>
   * @return {String} agentInfo.os.name Operating system name (android, ios, window, mac, unknown) <ko>운영체제 이름 (android, ios, window, mac, unknown)</ko>
   * @return {String} agentInfo.os.version Operating system version <ko>운영체제 버전</ko>
   * @return {String} agentInfo.browser Browser information <ko>브라우저 정보</ko>
   * @return {String} agentInfo.browser.name Browser name (safari, chrome, sbrowser, ie, firefox, unknown) <ko>브라우저 이름 (safari, chrome, sbrowser, ie, firefox, unknown)</ko>
   * @return {String} agentInfo.browser.version Browser version <ko>브라우저 버전 </ko>
   * @return {Boolean} agentInfo.browser.webview Indicates whether the browser is inapp<ko>웹뷰 브라우저 여부</ko>
   * @return {Boolean} agentInfo.isMobile Indicates whether the browser is for mobile<ko>모바일 브라우저 여부</ko>
   * @example
  import agent from "@egjs/agent";

  const {os, browser, isMobile} = agent();
   */


  function agent() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator$1.userAgent;
    setUa(ua);
    var agentInfo = {
      os: getOs(),
      browser: getBrowser(),
      isMobile: getIsMobile()
    };
    agentInfo.browser.name = agentInfo.browser.name.toLowerCase();
    agentInfo.os.name = agentInfo.os.name.toLowerCase();
    agentInfo.os.version = agentInfo.os.version.toLowerCase();

    if (agentInfo.os.name === "ios" && agentInfo.browser.webview) {
      agentInfo.browser.version = "-1";
    }

    return agentInfo;
  }
  /**
   * Version info string
   * @ko 버전정보 문자열
   * @name VERSION
   * @static
   * @type {String}
   * @example
   * eg.agent.VERSION;  // ex) 2.2.0
   * @memberof eg.agent
   */


  agent.VERSION = "2.1.5";

  /*
   * Copyright 2016 Google Inc. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var MathUtil = window.MathUtil || {};
  MathUtil.degToRad = Math.PI / 180;
  MathUtil.radToDeg = 180 / Math.PI; // Some minimal math functionality borrowed from THREE.Math and stripped down
  // for the purposes of this library.

  MathUtil.Vector2 = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };

  MathUtil.Vector2.prototype = {
    constructor: MathUtil.Vector2,
    set: function (x, y) {
      this.x = x;
      this.y = y;
      return this;
    },
    copy: function (v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    },
    subVectors: function (a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      return this;
    }
  };

  MathUtil.Vector3 = function (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  };

  MathUtil.Vector3.prototype = {
    constructor: MathUtil.Vector3,
    set: function (x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    },
    copy: function (v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    },
    length: function () {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    normalize: function () {
      var scalar = this.length();

      if (scalar !== 0) {
        var invScalar = 1 / scalar;
        this.multiplyScalar(invScalar);
      } else {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      }

      return this;
    },
    multiplyScalar: function (scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
    },
    applyQuaternion: function (q) {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var qx = q.x;
      var qy = q.y;
      var qz = q.z;
      var qw = q.w; // calculate quat * vector

      var ix = qw * x + qy * z - qz * y;
      var iy = qw * y + qz * x - qx * z;
      var iz = qw * z + qx * y - qy * x;
      var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

      this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
      return this;
    },
    dot: function (v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    crossVectors: function (a, b) {
      var ax = a.x,
          ay = a.y,
          az = a.z;
      var bx = b.x,
          by = b.y,
          bz = b.z;
      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;
      return this;
    }
  };

  MathUtil.Quaternion = function (x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w !== undefined ? w : 1;
  };

  MathUtil.Quaternion.prototype = {
    constructor: MathUtil.Quaternion,
    set: function (x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      return this;
    },
    copy: function (quaternion) {
      this.x = quaternion.x;
      this.y = quaternion.y;
      this.z = quaternion.z;
      this.w = quaternion.w;
      return this;
    },
    setFromEulerXYZ: function (x, y, z) {
      var c1 = Math.cos(x / 2);
      var c2 = Math.cos(y / 2);
      var c3 = Math.cos(z / 2);
      var s1 = Math.sin(x / 2);
      var s2 = Math.sin(y / 2);
      var s3 = Math.sin(z / 2);
      this.x = s1 * c2 * c3 + c1 * s2 * s3;
      this.y = c1 * s2 * c3 - s1 * c2 * s3;
      this.z = c1 * c2 * s3 + s1 * s2 * c3;
      this.w = c1 * c2 * c3 - s1 * s2 * s3;
      return this;
    },
    setFromEulerYXZ: function (x, y, z) {
      var c1 = Math.cos(x / 2);
      var c2 = Math.cos(y / 2);
      var c3 = Math.cos(z / 2);
      var s1 = Math.sin(x / 2);
      var s2 = Math.sin(y / 2);
      var s3 = Math.sin(z / 2);
      this.x = s1 * c2 * c3 + c1 * s2 * s3;
      this.y = c1 * s2 * c3 - s1 * c2 * s3;
      this.z = c1 * c2 * s3 - s1 * s2 * c3;
      this.w = c1 * c2 * c3 + s1 * s2 * s3;
      return this;
    },
    setFromAxisAngle: function (axis, angle) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
      // assumes axis is normalized
      var halfAngle = angle / 2,
          s = Math.sin(halfAngle);
      this.x = axis.x * s;
      this.y = axis.y * s;
      this.z = axis.z * s;
      this.w = Math.cos(halfAngle);
      return this;
    },
    multiply: function (q) {
      return this.multiplyQuaternions(this, q);
    },
    multiplyQuaternions: function (a, b) {
      // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
      var qax = a.x,
          qay = a.y,
          qaz = a.z,
          qaw = a.w;
      var qbx = b.x,
          qby = b.y,
          qbz = b.z,
          qbw = b.w;
      this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
      return this;
    },
    inverse: function () {
      this.x *= -1;
      this.y *= -1;
      this.z *= -1;
      this.normalize();
      return this;
    },
    normalize: function () {
      var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

      if (l === 0) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;
      } else {
        l = 1 / l;
        this.x = this.x * l;
        this.y = this.y * l;
        this.z = this.z * l;
        this.w = this.w * l;
      }

      return this;
    },
    slerp: function (qb, t) {
      if (t === 0) return this;
      if (t === 1) return this.copy(qb);
      var x = this.x,
          y = this.y,
          z = this.z,
          w = this.w; // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

      var cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;

      if (cosHalfTheta < 0) {
        this.w = -qb.w;
        this.x = -qb.x;
        this.y = -qb.y;
        this.z = -qb.z;
        cosHalfTheta = -cosHalfTheta;
      } else {
        this.copy(qb);
      }

      if (cosHalfTheta >= 1.0) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
      }

      var halfTheta = Math.acos(cosHalfTheta);
      var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

      if (Math.abs(sinHalfTheta) < 0.001) {
        this.w = 0.5 * (w + this.w);
        this.x = 0.5 * (x + this.x);
        this.y = 0.5 * (y + this.y);
        this.z = 0.5 * (z + this.z);
        return this;
      }

      var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
          ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
      this.w = w * ratioA + this.w * ratioB;
      this.x = x * ratioA + this.x * ratioB;
      this.y = y * ratioA + this.y * ratioB;
      this.z = z * ratioA + this.z * ratioB;
      return this;
    },
    setFromUnitVectors: function () {
      // http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final
      // assumes direction vectors vFrom and vTo are normalized
      var v1, r;
      var EPS = 0.000001;
      return function (vFrom, vTo) {
        if (v1 === undefined) v1 = new MathUtil.Vector3();
        r = vFrom.dot(vTo) + 1;

        if (r < EPS) {
          r = 0;

          if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
            v1.set(-vFrom.y, vFrom.x, 0);
          } else {
            v1.set(0, -vFrom.z, vFrom.y);
          }
        } else {
          v1.crossVectors(vFrom, vTo);
        }

        this.x = v1.x;
        this.y = v1.y;
        this.z = v1.z;
        this.w = r;
        this.normalize();
        return this;
      };
    }()
  };
  var mathUtil = MathUtil;
  var mathUtil_1 = mathUtil.MathUtil;

  /*
   * Copyright 2015 Google Inc. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var Util = window.Util || {};
  Util.MIN_TIMESTEP = 0.001;
  Util.MAX_TIMESTEP = 1;

  Util.base64 = function (mimeType, base64) {
    return 'data:' + mimeType + ';base64,' + base64;
  };

  Util.clamp = function (value, min, max) {
    return Math.min(Math.max(min, value), max);
  };

  Util.lerp = function (a, b, t) {
    return a + (b - a) * t;
  };
  /**
   * Light polyfill for `Promise.race`. Returns
   * a promise that resolves when the first promise
   * provided resolves.
   *
   * @param {Array<Promise>} promises
   */


  Util.race = function (promises) {
    if (Promise.race) {
      return Promise.race(promises);
    }

    return new Promise(function (resolve, reject) {
      for (var i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    });
  };

  Util.isIOS = function () {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
    return function () {
      return isIOS;
    };
  }();

  Util.isWebViewAndroid = function () {
    var isWebViewAndroid = navigator.userAgent.indexOf('Version') !== -1 && navigator.userAgent.indexOf('Android') !== -1 && navigator.userAgent.indexOf('Chrome') !== -1;
    return function () {
      return isWebViewAndroid;
    };
  }();

  Util.isSafari = function () {
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    return function () {
      return isSafari;
    };
  }();

  Util.isFirefoxAndroid = function () {
    var isFirefoxAndroid = navigator.userAgent.indexOf('Firefox') !== -1 && navigator.userAgent.indexOf('Android') !== -1;
    return function () {
      return isFirefoxAndroid;
    };
  }();

  Util.isR7 = function () {
    var isR7 = navigator.userAgent.indexOf('R7 Build') !== -1;
    return function () {
      return isR7;
    };
  }();

  Util.isLandscapeMode = function () {
    var rtn = window.orientation == 90 || window.orientation == -90;
    return Util.isR7() ? !rtn : rtn;
  }; // Helper method to validate the time steps of sensor timestamps.


  Util.isTimestampDeltaValid = function (timestampDeltaS) {
    if (isNaN(timestampDeltaS)) {
      return false;
    }

    if (timestampDeltaS <= Util.MIN_TIMESTEP) {
      return false;
    }

    if (timestampDeltaS > Util.MAX_TIMESTEP) {
      return false;
    }

    return true;
  };

  Util.getScreenWidth = function () {
    return Math.max(window.screen.width, window.screen.height) * window.devicePixelRatio;
  };

  Util.getScreenHeight = function () {
    return Math.min(window.screen.width, window.screen.height) * window.devicePixelRatio;
  };

  Util.requestFullscreen = function (element) {
    if (Util.isWebViewAndroid()) {
      return false;
    }

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else {
      return false;
    }

    return true;
  };

  Util.exitFullscreen = function () {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else {
      return false;
    }

    return true;
  };

  Util.getFullscreenElement = function () {
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
  };

  Util.linkProgram = function (gl, vertexSource, fragmentSource, attribLocationMap) {
    // No error checking for brevity.
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    for (var attribName in attribLocationMap) gl.bindAttribLocation(program, attribLocationMap[attribName], attribName);

    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return program;
  };

  Util.getProgramUniforms = function (gl, program) {
    var uniforms = {};
    var uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    var uniformName = '';

    for (var i = 0; i < uniformCount; i++) {
      var uniformInfo = gl.getActiveUniform(program, i);
      uniformName = uniformInfo.name.replace('[0]', '');
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }

    return uniforms;
  };

  Util.orthoMatrix = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  };

  Util.copyArray = function (source, dest) {
    for (var i = 0, n = source.length; i < n; i++) {
      dest[i] = source[i];
    }
  };

  Util.isMobile = function () {
    var check = false;

    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);

    return check;
  };

  Util.extend = function (dest, src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dest[key] = src[key];
      }
    }

    return dest;
  };

  Util.safariCssSizeWorkaround = function (canvas) {
    // TODO(smus): Remove this workaround when Safari for iOS is fixed.
    // iOS only workaround (for https://bugs.webkit.org/show_bug.cgi?id=152556).
    //
    // "To the last I grapple with thee;
    //  from hell's heart I stab at thee;
    //  for hate's sake I spit my last breath at thee."
    // -- Moby Dick, by Herman Melville
    if (Util.isIOS()) {
      var width = canvas.style.width;
      var height = canvas.style.height;
      canvas.style.width = parseInt(width) + 1 + 'px';
      canvas.style.height = parseInt(height) + 'px';
      setTimeout(function () {
        canvas.style.width = width;
        canvas.style.height = height;
      }, 100);
    } // Debug only.


    window.Util = Util;
    window.canvas = canvas;
  };

  Util.isDebug = function () {
    return Util.getQueryParameter('debug');
  };

  Util.getQueryParameter = function (name) {
    var name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  Util.frameDataFromPose = function () {
    var piOver180 = Math.PI / 180.0;
    var rad45 = Math.PI * 0.25; // Borrowed from glMatrix.

    function mat4_perspectiveFromFieldOfView(out, fov, near, far) {
      var upTan = Math.tan(fov ? fov.upDegrees * piOver180 : rad45),
          downTan = Math.tan(fov ? fov.downDegrees * piOver180 : rad45),
          leftTan = Math.tan(fov ? fov.leftDegrees * piOver180 : rad45),
          rightTan = Math.tan(fov ? fov.rightDegrees * piOver180 : rad45),
          xScale = 2.0 / (leftTan + rightTan),
          yScale = 2.0 / (upTan + downTan);
      out[0] = xScale;
      out[1] = 0.0;
      out[2] = 0.0;
      out[3] = 0.0;
      out[4] = 0.0;
      out[5] = yScale;
      out[6] = 0.0;
      out[7] = 0.0;
      out[8] = -((leftTan - rightTan) * xScale * 0.5);
      out[9] = (upTan - downTan) * yScale * 0.5;
      out[10] = far / (near - far);
      out[11] = -1.0;
      out[12] = 0.0;
      out[13] = 0.0;
      out[14] = far * near / (near - far);
      out[15] = 0.0;
      return out;
    }

    function mat4_fromRotationTranslation(out, q, v) {
      // Quaternion math
      var x = q[0],
          y = q[1],
          z = q[2],
          w = q[3],
          x2 = x + x,
          y2 = y + y,
          z2 = z + z,
          xx = x * x2,
          xy = x * y2,
          xz = x * z2,
          yy = y * y2,
          yz = y * z2,
          zz = z * z2,
          wx = w * x2,
          wy = w * y2,
          wz = w * z2;
      out[0] = 1 - (yy + zz);
      out[1] = xy + wz;
      out[2] = xz - wy;
      out[3] = 0;
      out[4] = xy - wz;
      out[5] = 1 - (xx + zz);
      out[6] = yz + wx;
      out[7] = 0;
      out[8] = xz + wy;
      out[9] = yz - wx;
      out[10] = 1 - (xx + yy);
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }

    function mat4_translate(out, a, v) {
      var x = v[0],
          y = v[1],
          z = v[2],
          a00,
          a01,
          a02,
          a03,
          a10,
          a11,
          a12,
          a13,
          a20,
          a21,
          a22,
          a23;

      if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
      } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
      }

      return out;
    }

    function mat4_invert(out, a) {
      var a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3],
          a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7],
          a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11],
          a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15],
          b00 = a00 * a11 - a01 * a10,
          b01 = a00 * a12 - a02 * a10,
          b02 = a00 * a13 - a03 * a10,
          b03 = a01 * a12 - a02 * a11,
          b04 = a01 * a13 - a03 * a11,
          b05 = a02 * a13 - a03 * a12,
          b06 = a20 * a31 - a21 * a30,
          b07 = a20 * a32 - a22 * a30,
          b08 = a20 * a33 - a23 * a30,
          b09 = a21 * a32 - a22 * a31,
          b10 = a21 * a33 - a23 * a31,
          b11 = a22 * a33 - a23 * a32,
          // Calculate the determinant
      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

      if (!det) {
        return null;
      }

      det = 1.0 / det;
      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
      out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
      out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
      out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
      out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
      out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
      out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
      return out;
    }
    var defaultOrientation = new Float32Array([0, 0, 0, 1]);
    var defaultPosition = new Float32Array([0, 0, 0]);

    function updateEyeMatrices(projection, view, pose, parameters, vrDisplay) {
      mat4_perspectiveFromFieldOfView(projection, parameters ? parameters.fieldOfView : null, vrDisplay.depthNear, vrDisplay.depthFar);
      var orientation = pose.orientation || defaultOrientation;
      var position = pose.position || defaultPosition;
      mat4_fromRotationTranslation(view, orientation, position);
      if (parameters) mat4_translate(view, view, parameters.offset);
      mat4_invert(view, view);
    }

    return function (frameData, pose, vrDisplay) {
      if (!frameData || !pose) return false;
      frameData.pose = pose;
      frameData.timestamp = pose.timestamp;
      updateEyeMatrices(frameData.leftProjectionMatrix, frameData.leftViewMatrix, pose, vrDisplay.getEyeParameters("left"), vrDisplay);
      updateEyeMatrices(frameData.rightProjectionMatrix, frameData.rightViewMatrix, pose, vrDisplay.getEyeParameters("right"), vrDisplay);
      return true;
    };
  }();

  Util.isInsideCrossDomainIFrame = function () {
    var isFramed = window.self !== window.top;
    var refDomain = Util.getDomainFromUrl(document.referrer);
    var thisDomain = Util.getDomainFromUrl(window.location.href);
    return isFramed && refDomain !== thisDomain;
  }; // From http://stackoverflow.com/a/23945027.


  Util.getDomainFromUrl = function (url) {
    var domain; // Find & remove protocol (http, ftp, etc.) and get domain.

    if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
    } else {
      domain = url.split('/')[0];
    } //find & remove port number


    domain = domain.split(':')[0];
    return domain;
  };

  var util = Util;

  /*
   * Copyright 2015 Google Inc. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */



  /**
   * Given an orientation and the gyroscope data, predicts the future orientation
   * of the head. This makes rendering appear faster.
   *
   * Also see: http://msl.cs.uiuc.edu/~lavalle/papers/LavYerKatAnt14.pdf
   *
   * @param {Number} predictionTimeS time from head movement to the appearance of
   * the corresponding image.
   */


  function PosePredictor(predictionTimeS) {
    this.predictionTimeS = predictionTimeS; // The quaternion corresponding to the previous state.

    this.previousQ = new mathUtil.Quaternion(); // Previous time a prediction occurred.

    this.previousTimestampS = null; // The delta quaternion that adjusts the current pose.

    this.deltaQ = new mathUtil.Quaternion(); // The output quaternion.

    this.outQ = new mathUtil.Quaternion();
  }

  PosePredictor.prototype.getPrediction = function (currentQ, gyro, timestampS) {
    if (!this.previousTimestampS) {
      this.previousQ.copy(currentQ);
      this.previousTimestampS = timestampS;
      return currentQ;
    } // Calculate axis and angle based on gyroscope rotation rate data.


    var axis = new mathUtil.Vector3();
    axis.copy(gyro);
    axis.normalize();
    var angularSpeed = gyro.length(); // If we're rotating slowly, don't do prediction.

    if (angularSpeed < mathUtil.degToRad * 20) {
      if (util.isDebug()) {
        console.log('Moving slowly, at %s deg/s: no prediction', (mathUtil.radToDeg * angularSpeed).toFixed(1));
      }

      this.outQ.copy(currentQ);
      this.previousQ.copy(currentQ);
      return this.outQ;
    } // Get the predicted angle based on the time delta and latency.


    var deltaT = timestampS - this.previousTimestampS;
    var predictAngle = angularSpeed * this.predictionTimeS;
    this.deltaQ.setFromAxisAngle(axis, predictAngle);
    this.outQ.copy(this.previousQ);
    this.outQ.multiply(this.deltaQ);
    this.previousQ.copy(currentQ);
    this.previousTimestampS = timestampS;
    return this.outQ;
  };

  var posePredictor = PosePredictor;

  /**
   * Original Code
   * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/common.js
   * Common utilities
   * modified by egjs
   */
  var glMatrix = {};
  glMatrix.ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  var degree = Math.PI / 180;

  glMatrix.toRadian = function (a) {
    return a * degree;
  };

  glMatrix.toDegree = function (a) {
    return a / degree;
  }; // glMatrix.EPSILON = 0.000001;


  glMatrix.EPSILON = 0.0001;

  /**
   * Original Code
   * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/vec3.js
   * 3 Dimensional Vector Util
   * modified by egjs
   */
  /**
   * @class 3 Dimensional Vector
   * @name vec3
   */

  var vec3 = {};
  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  vec3.create = function () {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
  };
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */


  vec3.fromValues = function (x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  };

  vec3.set = function (out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  };

  vec3.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  };
  /**
   * Scales a vec3 by a scalar number
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec3} out
   */


  vec3.scale = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  };
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */


  vec3.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  };
  /**
   * Calculates the length of a vec3
   *
   * @param {vec3} a vector to calculate length of
   * @returns {Number} length of a
   */


  vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  };
  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to normalize
   * @returns {vec3} out
   */


  vec3.normalize = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x * x + y * y + z * z;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
      out[0] = a[0] * len;
      out[1] = a[1] * len;
      out[2] = a[2] * len;
    }

    return out;
  };
  /**
   * Calculates the dot product of two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} dot product of a and b
   */


  vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  };
  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */


  vec3.cross = function (out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        bx = b[0],
        by = b[1],
        bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  };
  /**
   * Transforms the vec3 with a quat
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec3} out
   */


  vec3.transformQuat = function (out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations
    var x = a[0],
        y = a[1],
        z = a[2],
        qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],
        // calculate quat * vec
    ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
  };
  /**
   * Rotate a 3D vector around the z-axis
   * @param {vec3} out The receiving vec3
   * @param {vec3} a The vec3 point to rotate
   * @param {vec3} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec3} out
   */


  vec3.rotateZ = function (out, a, b, c) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
    r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
    r[2] = p[2]; //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  };

  /**
   * Original Code
   * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/vec2.js
   * 2 Dimensional Vector Util
   * modified by egjs
   */
  /**
   * @class 2 Dimensional Vector
   * @name vec2
   */

  var vec2 = {};

  vec2.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
  };

  /**
   * Original Code
   * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/quat.js
   * Quaternion util
   * modified by egjs
   */
  /**
   * @class Quaternion
   * @name quat
   */

  var quat = {};
  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */

  quat.create = function () {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  };
  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {quat} a quaternion to clone
   * @returns {quat} a new quaternion
   * @function
   */


  quat.clone = function (a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  };
  /**
   * Creates a new quat initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} a new quaternion
   * @function
   */


  quat.fromValues = function (x, y, z, w) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  };
  /**
   * Copy the values from one quat to another
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the source quaternion
   * @returns {quat} out
   * @function
   */

  quat.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  };
  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {vec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/


  quat.setAxisAngle = function (out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  };
  /**
   * Multiplies two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {quat} out
   */


  quat.multiply = function (out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  };
  /**
   * Rotates a quaternion by the given angle about the X axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */


  quat.rotateX = function (out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  };
  /**
   * Rotates a quaternion by the given angle about the Y axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */


  quat.rotateY = function (out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        by = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  };
  /**
   * Calculates the conjugate of a quat
   * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate conjugate of
   * @returns {quat} out
   */


  quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
  };
  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */


  quat.normalize = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
      out[3] = w * len;
    }

    return out;
  };
  /**
   * Returns whether or not the quaternions have approximately the same elements in the same position (when compared with ===)
   *
   * @param {quat} a The first quaternion.
   * @param {quat} b The second quaternion.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  quat.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
  };
  /**
   * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {quat} a The first quaternion.
   * @param {quat} b The second quaternion.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  quat.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  };

  /**
   * Original Code
   * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/mat4.js
   * 4x4 Matrix util
   * modified by egjs
   */
  /**
   * @class 4x4 Matrix
   * @name mat4
   */

  var mat4 = {};
  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  mat4.create = function () {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  };
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */


  mat4.identity = function (out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  };
  /**
   * Rotates a matrix by the given angle around the X axis not using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  };
  /**
   * Rotates a matrix by the given angle around the Y axis not using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  };
  /**
   * Calculates a 4x4 matrix from the given quaternion
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat} q Quaternion to create matrix from
   *
   * @returns {mat4} out
   */


  mat4.fromQuat = function (out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  };
  /**
   * Generates a perspective projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */


  mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
  };

  /**
   * Original Code
   * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix.js
   * Math Util
   * modified by egjs
   */

  function quatToVec3(quaternion) {
    var baseV = vec3.fromValues(0, 0, 1);
    vec3.transformQuat(baseV, baseV, quaternion);
    return baseV;
  }

  var util$1 = {};

  util$1.isPowerOfTwo = function (n) {
    return n && (n & n - 1) === 0;
  };

  util$1.extractPitchFromQuat = function (quaternion) {
    var baseV = quatToVec3(quaternion);
    return -1 * Math.atan2(baseV[1], Math.sqrt(Math.pow(baseV[0], 2) + Math.pow(baseV[2], 2)));
  }; // implement reference
  // the general equation of a plane : http://www.gisdeveloper.co.kr/entry/평면의-공식
  // calculating angle between two vectors : http://darkpgmr.tistory.com/121


  var ROTATE_CONSTANT = {
    PITCH_DELTA: 1,
    YAW_DELTA_BY_ROLL: 2,
    YAW_DELTA_BY_YAW: 3
  };
  ROTATE_CONSTANT[ROTATE_CONSTANT.PITCH_DELTA] = {
    targetAxis: [0, 1, 0],
    meshPoint: [0, 0, 1]
  };
  ROTATE_CONSTANT[ROTATE_CONSTANT.YAW_DELTA_BY_ROLL] = {
    targetAxis: [0, 1, 0],
    meshPoint: [1, 0, 0]
  };
  ROTATE_CONSTANT[ROTATE_CONSTANT.YAW_DELTA_BY_YAW] = {
    targetAxis: [1, 0, 0],
    meshPoint: [0, 0, 1]
  };

  function getRotationDelta(prevQ, curQ, rotateKind) {
    var targetAxis = vec3.fromValues(ROTATE_CONSTANT[rotateKind].targetAxis[0], ROTATE_CONSTANT[rotateKind].targetAxis[1], ROTATE_CONSTANT[rotateKind].targetAxis[2]);
    var meshPoint = ROTATE_CONSTANT[rotateKind].meshPoint;
    var prevQuaternion = quat.clone(prevQ);
    var curQuaternion = quat.clone(curQ);
    quat.normalize(prevQuaternion, prevQuaternion);
    quat.normalize(curQuaternion, curQuaternion);
    var prevPoint = vec3.fromValues(0, 0, 1);
    var curPoint = vec3.fromValues(0, 0, 1);
    vec3.transformQuat(prevPoint, prevPoint, prevQuaternion);
    vec3.transformQuat(curPoint, curPoint, curQuaternion);
    vec3.transformQuat(targetAxis, targetAxis, curQuaternion);
    var rotateDistance = vec3.dot(targetAxis, vec3.cross(vec3.create(), prevPoint, curPoint));
    var rotateDirection = rotateDistance > 0 ? 1 : -1; // when counter clock wise, use vec3.fromValues(0,1,0)
    // when clock wise, use vec3.fromValues(0,-1,0)
    // const meshPoint1 = vec3.fromValues(0, 0, 0);

    var meshPoint2 = vec3.fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
    var meshPoint3;

    if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
      meshPoint3 = vec3.fromValues(0, rotateDirection, 0);
    } else {
      meshPoint3 = vec3.fromValues(rotateDirection, 0, 0);
    }

    vec3.transformQuat(meshPoint2, meshPoint2, curQuaternion);
    vec3.transformQuat(meshPoint3, meshPoint3, curQuaternion);
    var vecU = meshPoint2;
    var vecV = meshPoint3;
    var vecN = vec3.create();
    vec3.cross(vecN, vecU, vecV);
    vec3.normalize(vecN, vecN);
    var coefficientA = vecN[0];
    var coefficientB = vecN[1];
    var coefficientC = vecN[2]; //	const coefficientD = -1 * vec3.dot(vecN, meshPoint1);
    // a point on the plane

    curPoint = vec3.fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
    vec3.transformQuat(curPoint, curPoint, curQuaternion); // a point should project on the plane

    prevPoint = vec3.fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
    vec3.transformQuat(prevPoint, prevPoint, prevQuaternion); // distance between prevPoint and the plane

    var distance = Math.abs(prevPoint[0] * coefficientA + prevPoint[1] * coefficientB + prevPoint[2] * coefficientC);
    var projectedPrevPoint = vec3.create();
    vec3.subtract(projectedPrevPoint, prevPoint, vec3.scale(vec3.create(), vecN, distance));
    var trigonometricRatio = (projectedPrevPoint[0] * curPoint[0] + projectedPrevPoint[1] * curPoint[1] + projectedPrevPoint[2] * curPoint[2]) / (vec3.length(projectedPrevPoint) * vec3.length(curPoint)); // defensive block

    trigonometricRatio > 1 && (trigonometricRatio = 1);
    var theta = Math.acos(trigonometricRatio);
    var crossVec = vec3.cross(vec3.create(), curPoint, projectedPrevPoint);
    distance = coefficientA * crossVec[0] + coefficientB * crossVec[1] + coefficientC * crossVec[2];
    var thetaDirection;

    if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
      thetaDirection = distance > 0 ? 1 : -1;
    } else {
      thetaDirection = distance < 0 ? 1 : -1;
    }

    var deltaRadian = theta * thetaDirection * rotateDirection;
    return glMatrix.toDegree(deltaRadian);
  }

  util$1.getRotationDelta = getRotationDelta;

  var STILLNESS_THRESHOLD = 200; // millisecond

  /**
   * In Chrome m65, `devicemotion` events are broken but subsequently fixed
   * in 65.0.3325.148. Since many browsers use Chromium, ensure that
   * we scope this detection by branch and build numbers to provide
   * a proper fallback.
   * https://github.com/immersive-web/webvr-polyfill/issues/307
   */

  var isChromeWithoutDeviceMotion = function isChromeWithoutDeviceMotion() {
    var value = false;
    var agentInfo = agent();
    var browserVersion = agentInfo.browser.version;

    if (agentInfo.browser.name === "chrome" && parseInt(browserVersion, 10) === 65) {
      var versionToken = browserVersion.split(".");
      var branch = versionToken[2];
      var build = versionToken[3];
      value = parseInt(branch, 10) === 3325 && parseInt(build, 10) < 148;
    }

    return value;
  };

  var DeviceMotion =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(DeviceMotion, _Component);

    function DeviceMotion() {
      var _this;

      _this = _Component.call(this) || this;
      _this._onDeviceMotion = _this._onDeviceMotion.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._onDeviceOrientation = _this._onDeviceOrientation.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._onChromeWithoutDeviceMotion = _this._onChromeWithoutDeviceMotion.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.isWithoutDeviceMotion = isChromeWithoutDeviceMotion();
      _this.isAndroid = agent().os.name === "android";
      _this.stillGyroVec = vec3.create();
      _this.rawGyroVec = vec3.create();
      _this.adjustedGyroVec = vec3.create();
      _this._timer = null;
      _this.lastDevicemotionTimestamp = 0;
      _this._isEnabled = false;

      _this.enable();

      return _this;
    }

    var _proto = DeviceMotion.prototype;

    _proto._onChromeWithoutDeviceMotion = function _onChromeWithoutDeviceMotion(e) {
      var alpha = e.alpha,
          beta = e.beta,
          gamma = e.gamma; // There is deviceorientation event trigged with empty values
      // on Headless Chrome.

      if (alpha === null) {
        return;
      } // convert to radian


      alpha = (alpha || 0) * Math.PI / 180;
      beta = (beta || 0) * Math.PI / 180;
      gamma = (gamma || 0) * Math.PI / 180;
      this.trigger("devicemotion", {
        inputEvent: {
          deviceorientation: {
            alpha: alpha,
            beta: beta,
            gamma: -gamma
          }
        }
      });
    };

    _proto._onDeviceOrientation = function _onDeviceOrientation() {
      var _this2 = this;

      this._timer && clearTimeout(this._timer);
      this._timer = setTimeout(function () {
        if (new Date().getTime() - _this2.lastDevicemotionTimestamp < STILLNESS_THRESHOLD) {
          vec3.copy(_this2.stillGyroVec, _this2.rawGyroVec);
        }
      }, STILLNESS_THRESHOLD);
    };

    _proto._onDeviceMotion = function _onDeviceMotion(e) {
      // desktop chrome triggers devicemotion event with empthy sensor values.
      // Those events should ignored.
      var isGyroSensorAvailable = !(e.rotationRate.alpha == null);
      var isGravitySensorAvailable = !(e.accelerationIncludingGravity.x == null);

      if (e.interval === 0 || !(isGyroSensorAvailable && isGravitySensorAvailable)) {
        return;
      }

      var devicemotionEvent = _extends({}, e);

      devicemotionEvent.interval = e.interval;
      devicemotionEvent.timeStamp = e.timeStamp;
      devicemotionEvent.type = e.type;
      devicemotionEvent.rotationRate = {
        alpha: e.rotationRate.alpha,
        beta: e.rotationRate.beta,
        gamma: e.rotationRate.gamma
      };
      devicemotionEvent.accelerationIncludingGravity = {
        x: e.accelerationIncludingGravity.x,
        y: e.accelerationIncludingGravity.y,
        z: e.accelerationIncludingGravity.z
      };
      devicemotionEvent.acceleration = {
        x: e.acceleration.x,
        y: e.acceleration.y,
        z: e.acceleration.z
      };

      if (this.isAndroid) {
        vec3.set(this.rawGyroVec, e.rotationRate.alpha || 0, e.rotationRate.beta || 0, e.rotationRate.gamma || 0);
        vec3.subtract(this.adjustedGyroVec, this.rawGyroVec, this.stillGyroVec);
        this.lastDevicemotionTimestamp = new Date().getTime();
        devicemotionEvent.adjustedRotationRate = {
          alpha: this.adjustedGyroVec[0],
          beta: this.adjustedGyroVec[1],
          gamma: this.adjustedGyroVec[2]
        };
      }

      this.trigger("devicemotion", {
        inputEvent: devicemotionEvent
      });
    };

    _proto.enable = function enable() {
      if (this.isAndroid) {
        win.addEventListener("deviceorientation", this._onDeviceOrientation);
      }

      if (this.isWithoutDeviceMotion) {
        win.addEventListener("deviceorientation", this._onChromeWithoutDeviceMotion);
      } else {
        win.addEventListener("devicemotion", this._onDeviceMotion);
      }

      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      win.removeEventListener("deviceorientation", this._onDeviceOrientation);
      win.removeEventListener("deviceorientation", this._onChromeWithoutDeviceMotion);
      win.removeEventListener("devicemotion", this._onDeviceMotion);
      this._isEnabled = false;
    };

    return DeviceMotion;
  }(Component);

  function SensorSample(sample, timestampS) {
    this.set(sample, timestampS);
  }

  SensorSample.prototype.set = function (sample, timestampS) {
    this.sample = sample;
    this.timestampS = timestampS;
  };

  SensorSample.prototype.copy = function (sensorSample) {
    this.set(sensorSample.sample, sensorSample.timestampS);
  };

  var sensorSample = SensorSample;

  /*
   * Copyright 2015 Google Inc. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */





  /**
   * An implementation of a simple complementary filter, which fuses gyroscope and
   * accelerometer data from the 'devicemotion' event.
   *
   * Accelerometer data is very noisy, but stable over the long term.
   * Gyroscope data is smooth, but tends to drift over the long term.
   *
   * This fusion is relatively simple:
   * 1. Get orientation estimates from accelerometer by applying a low-pass filter
   *    on that data.
   * 2. Get orientation estimates from gyroscope by integrating over time.
   * 3. Combine the two estimates, weighing (1) in the long term, but (2) for the
   *    short term.
   */


  function ComplementaryFilter(kFilter) {
    this.kFilter = kFilter; // Raw sensor measurements.

    this.currentAccelMeasurement = new sensorSample();
    this.currentGyroMeasurement = new sensorSample();
    this.previousGyroMeasurement = new sensorSample(); // Set default look direction to be in the correct direction.

    if (util.isIOS()) {
      this.filterQ = new mathUtil.Quaternion(-1, 0, 0, 1);
    } else {
      this.filterQ = new mathUtil.Quaternion(1, 0, 0, 1);
    }

    this.previousFilterQ = new mathUtil.Quaternion();
    this.previousFilterQ.copy(this.filterQ); // Orientation based on the accelerometer.

    this.accelQ = new mathUtil.Quaternion(); // Whether or not the orientation has been initialized.

    this.isOrientationInitialized = false; // Running estimate of gravity based on the current orientation.

    this.estimatedGravity = new mathUtil.Vector3(); // Measured gravity based on accelerometer.

    this.measuredGravity = new mathUtil.Vector3(); // Debug only quaternion of gyro-based orientation.

    this.gyroIntegralQ = new mathUtil.Quaternion();
  }

  ComplementaryFilter.prototype.addAccelMeasurement = function (vector, timestampS) {
    this.currentAccelMeasurement.set(vector, timestampS);
  };

  ComplementaryFilter.prototype.addGyroMeasurement = function (vector, timestampS) {
    this.currentGyroMeasurement.set(vector, timestampS);
    var deltaT = timestampS - this.previousGyroMeasurement.timestampS;

    if (util.isTimestampDeltaValid(deltaT)) {
      this.run_();
    }

    this.previousGyroMeasurement.copy(this.currentGyroMeasurement);
  };

  ComplementaryFilter.prototype.run_ = function () {
    if (!this.isOrientationInitialized) {
      this.accelQ = this.accelToQuaternion_(this.currentAccelMeasurement.sample);
      this.previousFilterQ.copy(this.accelQ);
      this.isOrientationInitialized = true;
      return;
    }

    var deltaT = this.currentGyroMeasurement.timestampS - this.previousGyroMeasurement.timestampS; // Convert gyro rotation vector to a quaternion delta.

    var gyroDeltaQ = this.gyroToQuaternionDelta_(this.currentGyroMeasurement.sample, deltaT);
    this.gyroIntegralQ.multiply(gyroDeltaQ); // filter_1 = K * (filter_0 + gyro * dT) + (1 - K) * accel.

    this.filterQ.copy(this.previousFilterQ);
    this.filterQ.multiply(gyroDeltaQ); // Calculate the delta between the current estimated gravity and the real
    // gravity vector from accelerometer.

    var invFilterQ = new mathUtil.Quaternion();
    invFilterQ.copy(this.filterQ);
    invFilterQ.inverse();
    this.estimatedGravity.set(0, 0, -1);
    this.estimatedGravity.applyQuaternion(invFilterQ);
    this.estimatedGravity.normalize();
    this.measuredGravity.copy(this.currentAccelMeasurement.sample);
    this.measuredGravity.normalize(); // Compare estimated gravity with measured gravity, get the delta quaternion
    // between the two.

    var deltaQ = new mathUtil.Quaternion();
    deltaQ.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
    deltaQ.inverse();

    if (util.isDebug()) {
      console.log('Delta: %d deg, G_est: (%s, %s, %s), G_meas: (%s, %s, %s)', mathUtil.radToDeg * util.getQuaternionAngle(deltaQ), this.estimatedGravity.x.toFixed(1), this.estimatedGravity.y.toFixed(1), this.estimatedGravity.z.toFixed(1), this.measuredGravity.x.toFixed(1), this.measuredGravity.y.toFixed(1), this.measuredGravity.z.toFixed(1));
    } // Calculate the SLERP target: current orientation plus the measured-estimated
    // quaternion delta.


    var targetQ = new mathUtil.Quaternion();
    targetQ.copy(this.filterQ);
    targetQ.multiply(deltaQ); // SLERP factor: 0 is pure gyro, 1 is pure accel.

    this.filterQ.slerp(targetQ, 1 - this.kFilter);
    this.previousFilterQ.copy(this.filterQ);
  };

  ComplementaryFilter.prototype.getOrientation = function () {
    return this.filterQ;
  };

  ComplementaryFilter.prototype.accelToQuaternion_ = function (accel) {
    var normAccel = new mathUtil.Vector3();
    normAccel.copy(accel);
    normAccel.normalize();
    var quat = new mathUtil.Quaternion();
    quat.setFromUnitVectors(new mathUtil.Vector3(0, 0, -1), normAccel);
    quat.inverse();
    return quat;
  };

  ComplementaryFilter.prototype.gyroToQuaternionDelta_ = function (gyro, dt) {
    // Extract axis and angle from the gyroscope data.
    var quat = new mathUtil.Quaternion();
    var axis = new mathUtil.Vector3();
    axis.copy(gyro);
    axis.normalize();
    quat.setFromAxisAngle(axis, gyro.length() * dt);
    return quat;
  };

  var complementaryFilter = ComplementaryFilter;

  complementaryFilter.prototype.run_ = function () {
    if (!this.isOrientationInitialized) {
      this.accelQ = this.accelToQuaternion_(this.currentAccelMeasurement.sample);
      this.previousFilterQ.copy(this.accelQ);
      this.isOrientationInitialized = true;
      return;
    }

    var deltaT = this.currentGyroMeasurement.timestampS - this.previousGyroMeasurement.timestampS; // Convert gyro rotation vector to a quaternion delta.

    var gyroDeltaQ = this.gyroToQuaternionDelta_(this.currentGyroMeasurement.sample, deltaT);
    this.gyroIntegralQ.multiply(gyroDeltaQ); // filter_1 = K * (filter_0 + gyro * dT) + (1 - K) * accel.

    this.filterQ.copy(this.previousFilterQ);
    this.filterQ.multiply(gyroDeltaQ); // Calculate the delta between the current estimated gravity and the real
    // gravity vector from accelerometer.

    var invFilterQ = new mathUtil.Quaternion();
    invFilterQ.copy(this.filterQ);
    invFilterQ.inverse();
    this.estimatedGravity.set(0, 0, -1);
    this.estimatedGravity.applyQuaternion(invFilterQ);
    this.estimatedGravity.normalize();
    this.measuredGravity.copy(this.currentAccelMeasurement.sample);
    this.measuredGravity.normalize(); // Compare estimated gravity with measured gravity, get the delta quaternion
    // between the two.

    var deltaQ = new mathUtil.Quaternion();
    deltaQ.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
    deltaQ.inverse(); // Calculate the SLERP target: current orientation plus the measured-estimated
    // quaternion delta.

    var targetQ = new mathUtil.Quaternion();
    targetQ.copy(this.filterQ);
    targetQ.multiply(deltaQ); // SLERP factor: 0 is pure gyro, 1 is pure accel.

    this.filterQ.slerp(targetQ, 1 - this.kFilter);
    this.previousFilterQ.copy(this.filterQ);

    if (!this.isFilterQuaternionInitialized) {
      this.isFilterQuaternionInitialized = true;
    }
  };

  complementaryFilter.prototype.getOrientation = function () {
    if (this.isFilterQuaternionInitialized) {
      return this.filterQ;
    } else {
      return null;
    }
  };

  var K_FILTER = 0.98;
  var PREDICTION_TIME_S = 0.040;
  var agentInfo = agent();

  var FusionPoseSensor =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(FusionPoseSensor, _Component);

    function FusionPoseSensor() {
      var _this;

      _this = _Component.call(this) || this;
      _this.deviceMotion = new DeviceMotion();
      _this.accelerometer = new mathUtil.Vector3();
      _this.gyroscope = new mathUtil.Vector3();
      _this._onDeviceMotionChange = _this._onDeviceMotionChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._onScreenOrientationChange = _this._onScreenOrientationChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.filter = new complementaryFilter(K_FILTER);
      _this.posePredictor = new posePredictor(PREDICTION_TIME_S);
      _this.filterToWorldQ = new mathUtil.Quaternion();
      _this.isFirefoxAndroid = util.isFirefoxAndroid();
      _this.isIOS = util.isIOS(); // Ref https://github.com/immersive-web/cardboard-vr-display/issues/18

      _this.isChromeUsingDegrees = agentInfo.browser.name === "chrome" && parseInt(agentInfo.browser.version, 10) >= 66;
      _this._isEnabled = false; // Set the filter to world transform, depending on OS.

      if (_this.isIOS) {
        _this.filterToWorldQ.setFromAxisAngle(new mathUtil.Vector3(1, 0, 0), Math.PI / 2);
      } else {
        _this.filterToWorldQ.setFromAxisAngle(new mathUtil.Vector3(1, 0, 0), -Math.PI / 2);
      }

      _this.inverseWorldToScreenQ = new mathUtil.Quaternion();
      _this.worldToScreenQ = new mathUtil.Quaternion();
      _this.originalPoseAdjustQ = new mathUtil.Quaternion();

      _this.originalPoseAdjustQ.setFromAxisAngle(new mathUtil.Vector3(0, 0, 1), -win.orientation * Math.PI / 180);

      _this._setScreenTransform(); // Adjust this filter for being in landscape mode.


      if (util.isLandscapeMode()) {
        _this.filterToWorldQ.multiply(_this.inverseWorldToScreenQ);
      } // Keep track of a reset transform for resetSensor.


      _this.resetQ = new mathUtil.Quaternion();

      _this.deviceMotion.on("devicemotion", _this._onDeviceMotionChange);

      _this.enable();

      return _this;
    }

    var _proto = FusionPoseSensor.prototype;

    _proto.enable = function enable() {
      if (this.isEnabled()) {
        return;
      }

      this.deviceMotion.enable();
      this._isEnabled = true;
      win.addEventListener("orientationchange", this._onScreenOrientationChange);
    };

    _proto.disable = function disable() {
      if (!this.isEnabled()) {
        return;
      }

      this.deviceMotion.disable();
      this._isEnabled = false;
      win.removeEventListener("orientationchange", this._onScreenOrientationChange);
    };

    _proto.isEnabled = function isEnabled() {
      return this._isEnabled;
    };

    _proto.destroy = function destroy() {
      this.disable();
      this.deviceMotion = null;
    };

    _proto._triggerChange = function _triggerChange() {
      var orientation = this.getOrientation(); // if orientation is not prepared. don't trigger change event

      if (!orientation) {
        return;
      }

      if (!this._prevOrientation) {
        this._prevOrientation = orientation;
        return;
      }

      if (quat.equals(this._prevOrientation, orientation)) {
        return;
      }

      this.trigger("change", {
        quaternion: orientation
      });
    };

    _proto.getOrientation = function getOrientation() {
      var orientation; // Hack around using deviceorientation instead of devicemotion

      if (this.deviceMotion.isWithoutDeviceMotion && this._deviceOrientationQ) {
        this.deviceOrientationFixQ = this.deviceOrientationFixQ || function () {
          var y = new mathUtil.Quaternion().setFromAxisAngle(new mathUtil.Vector3(0, 1, 0), -this._alpha);
          return y;
        }.bind(this)();

        orientation = this._deviceOrientationQ;
        var out = new mathUtil.Quaternion();
        out.copy(orientation);
        out.multiply(this.filterToWorldQ);
        out.multiply(this.resetQ);
        out.multiply(this.worldToScreenQ);
        out.multiplyQuaternions(this.deviceOrientationFixQ, out); // return quaternion as glmatrix quaternion object

        var out_ = quat.fromValues(out.x, out.y, out.z, out.w);
        return quat.normalize(out_, out_);
      } else {
        // Convert from filter space to the the same system used by the
        // deviceorientation event.
        orientation = this.filter.getOrientation();

        if (!orientation) {
          return null;
        }

        var _out = this._convertFusionToPredicted(orientation); // return quaternion as glmatrix quaternion object


        var _out_ = quat.fromValues(_out.x, _out.y, _out.z, _out.w);

        return quat.normalize(_out_, _out_);
      }
    };

    _proto._convertFusionToPredicted = function _convertFusionToPredicted(orientation) {
      // Predict orientation.
      this.predictedQ = this.posePredictor.getPrediction(orientation, this.gyroscope, this.previousTimestampS); // Convert to THREE coordinate system: -Z forward, Y up, X right.

      var out = new mathUtil.Quaternion();
      out.copy(this.filterToWorldQ);
      out.multiply(this.resetQ);
      out.multiply(this.predictedQ);
      out.multiply(this.worldToScreenQ);
      return out;
    };

    _proto._onDeviceMotionChange = function _onDeviceMotionChange(_ref) {
      var inputEvent = _ref.inputEvent;
      var deviceorientation = inputEvent.deviceorientation;
      var deviceMotion = inputEvent;
      var accGravity = deviceMotion.accelerationIncludingGravity;
      var rotRate = deviceMotion.adjustedRotationRate || deviceMotion.rotationRate;
      var timestampS = deviceMotion.timeStamp / 1000;

      if (deviceorientation) {
        if (!this._alpha) {
          this._alpha = deviceorientation.alpha;
        }

        this._deviceOrientationQ = this._deviceOrientationQ || new mathUtil.Quaternion();

        this._deviceOrientationQ.setFromEulerYXZ(deviceorientation.beta, deviceorientation.alpha, deviceorientation.gamma);

        this._triggerChange();
      } else {
        // Firefox Android timeStamp returns one thousandth of a millisecond.
        if (this.isFirefoxAndroid) {
          timestampS /= 1000;
        }

        this.accelerometer.set(-accGravity.x, -accGravity.y, -accGravity.z);
        this.gyroscope.set(rotRate.alpha, rotRate.beta, rotRate.gamma); // Browsers on iOS, Firefox/Android, and Chrome m66/Android `rotationRate`
        // is reported in degrees, so we first convert to radians.

        if (this.isIOS || this.isFirefoxAndroid || this.isChromeUsingDegrees) {
          this.gyroscope.multiplyScalar(Math.PI / 180);
        }

        this.filter.addAccelMeasurement(this.accelerometer, timestampS);
        this.filter.addGyroMeasurement(this.gyroscope, timestampS);

        this._triggerChange();

        this.previousTimestampS = timestampS;
      }
    };

    _proto._onScreenOrientationChange = function _onScreenOrientationChange(screenOrientation) {
      this._setScreenTransform(win.orientation);
    };

    _proto._setScreenTransform = function _setScreenTransform() {
      this.worldToScreenQ.set(0, 0, 0, 1);

      switch (win.orientation) {
        case 0:
          break;

        case 90:
          this.worldToScreenQ.setFromAxisAngle(new mathUtil.Vector3(0, 0, 1), 90 / -180 * Math.PI);
          break;

        case -90:
          this.worldToScreenQ.setFromAxisAngle(new mathUtil.Vector3(0, 0, 1), -90 / -180 * Math.PI);
          break;

        case 180:
          this.worldToScreenQ.setFromAxisAngle(new mathUtil.Vector3(0, 0, 1), 180 / -180 * Math.PI);
          break;

        default:
          break;
      }

      this.inverseWorldToScreenQ.copy(this.worldToScreenQ);
      this.inverseWorldToScreenQ.inverse();
    };

    return FusionPoseSensor;
  }(Component);

  function getDeltaYaw(prvQ, curQ) {
    var yawDeltaByYaw = util$1.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_YAW);
    var yawDeltaByRoll = util$1.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL) * Math.sin(util$1.extractPitchFromQuat(curQ));
    return yawDeltaByRoll + yawDeltaByYaw;
  }

  function getDeltaPitch(prvQ, curQ) {
    var pitchDelta = util$1.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.PITCH_DELTA);
    return pitchDelta;
  }

  var TiltMotionInput =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(TiltMotionInput, _Component);

    function TiltMotionInput(el, options) {
      var _this;

      _this = _Component.call(this) || this;
      _this.element = el;
      _this._prevQuaternion = null;
      _this._quaternion = null;
      _this.fusionPoseSensor = null;
      _this.options = _extends({
        scale: 1,
        threshold: 0
      }, options);
      _this._onPoseChange = _this._onPoseChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = TiltMotionInput.prototype;

    _proto.mapAxes = function mapAxes(axes) {
      this.axes = axes;
    };

    _proto.connect = function connect(observer) {
      if (this.observer) {
        return this;
      }

      this.observer = observer;
      this.fusionPoseSensor = new FusionPoseSensor();
      this.fusionPoseSensor.enable();

      this._attachEvent();

      return this;
    };

    _proto.disconnect = function disconnect() {
      if (!this.observer) {
        return this;
      }

      this._dettachEvent();

      this.fusionPoseSensor.disable();
      this.fusionPoseSensor.destroy();
      this.fusionPoseSensor = null;
      this.observer = null;
      return this;
    };

    _proto.destroy = function destroy() {
      this.disconnect();
      this.element = null;
      this.options = null;
      this.axes = null;
      this._prevQuaternion = null;
      this._quaternion = null;
    };

    _proto._onPoseChange = function _onPoseChange(event) {
      if (!this._prevQuaternion) {
        this._prevQuaternion = quat.clone(event.quaternion);
        this._quaternion = quat.clone(event.quaternion);
        return;
      }

      quat.copy(this._prevQuaternion, this._quaternion);
      quat.copy(this._quaternion, event.quaternion);
      this.observer.change(this, event, toAxis$1(this.axes, [getDeltaYaw(this._prevQuaternion, this._quaternion), getDeltaPitch(this._prevQuaternion, this._quaternion)]));
    };

    _proto._attachEvent = function _attachEvent() {
      this.fusionPoseSensor.on("change", this._onPoseChange);
    };

    _proto._dettachEvent = function _dettachEvent() {
      this.fusionPoseSensor.off("change", this._onPoseChange);
    };

    return TiltMotionInput;
  }(Component);

  var screenRotationAngleInst = null;
  var refCount = 0;

  var ScreenRotationAngle =
  /*#__PURE__*/
  function () {
    function ScreenRotationAngle() {
      refCount++;

      if (screenRotationAngleInst) {
        return screenRotationAngleInst;
      }
      /* eslint-disable */


      screenRotationAngleInst = this;
      /* eslint-enable */

      this._onDeviceOrientation = this._onDeviceOrientation.bind(this);
      this._onOrientationChange = this._onOrientationChange.bind(this);
      this._spinR = 0;
      this._screenOrientationAngle = 0;
      win.addEventListener("deviceorientation", this._onDeviceOrientation);
      win.addEventListener("orientationchange", this._onOrientationChange);
    }

    var _proto = ScreenRotationAngle.prototype;

    _proto._onDeviceOrientation = function _onDeviceOrientation(e) {
      if (e.beta === null || e.gamma === null) {
        // (Chrome) deviceorientation is fired with invalid information {alpha=null, beta=null, ...} despite of not dispatching it. We skip it.
        return;
      } // Radian


      var betaR = glMatrix.toRadian(e.beta);
      var gammaR = glMatrix.toRadian(e.gamma);
      /* spinR range = [-180, 180], left side: 0 ~ -180(deg), right side: 0 ~ 180(deg) */

      this._spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));
    };

    _proto._onOrientationChange = function _onOrientationChange(e) {
      if (win.screen && win.screen.orientation && win.screen.orientation.angle !== undefined) {
        this._screenOrientationAngle = screen.orientation.angle;
      } else if (win.orientation !== undefined) {
        /* iOS */
        this._screenOrientationAngle = win.orientation >= 0 ? win.orientation : 360 + win.orientation;
      }
    };

    _proto.getRadian = function getRadian() {
      // Join with screen orientation
      // this._testVal = this._spinR + ", " + this._screenOrientationAngle + ", " + window.orientation;
      return this._spinR + glMatrix.toRadian(this._screenOrientationAngle);
    };

    _proto.unref = function unref() {
      if (--refCount > 0) {
        return;
      }

      win.removeEventListener("deviceorientation", this._onDeviceOrientation);
      win.removeEventListener("orientationchange", this._onOrientationChange);
      this._spinR = 0;
      this._screenOrientationAngle = 0;
      /* eslint-disable */

      screenRotationAngleInst = null;
      /* eslint-enable */

      refCount = 0;
    };

    return ScreenRotationAngle;
  }();

  /**
   * RotationPanInput is extension of PanInput to compensate coordinates by screen rotation angle.
   *
   * The reason for using this function is that in VR mode,
   * the roll angle is adjusted in the direction opposite to the screen rotation angle.
   *
   * Therefore, the angle that the user touches and moves does not match the angle at which the actual object should move.
   * @extends PanInput
   */

  var RotationPanInput =
  /*#__PURE__*/
  function (_PanInput) {
    _inheritsLoose(RotationPanInput, _PanInput);

    /**
     * Constructor
     *
     * @private
     * @param {HTMLElement} el target element
     * @param {Object} [options] The option object
     * @param {Boolean} [options.useRotation]  Whether to use rotation(or VR)
     */
    function RotationPanInput(el, options) {
      var _this;

      _this = _PanInput.call(this, el, options) || this;
      _this._useRotation = false;
      _this._screenRotationAngle = null;

      _this.setUseRotation(!!(options && options.useRotation));

      _this._userDirection = Axes.DIRECTION_ALL;
      return _this;
    }

    var _proto = RotationPanInput.prototype;

    _proto.setUseRotation = function setUseRotation(useRotation) {
      this._useRotation = useRotation;

      if (this._screenRotationAngle) {
        this._screenRotationAngle.unref();

        this._screenRotationAngle = null;
      }

      if (this._useRotation) {
        this._screenRotationAngle = new ScreenRotationAngle();
      }
    };

    _proto.connect = function connect(observer) {
      // User intetened direction
      this._userDirection = this._direction; // In VR Mode, Use ALL direction if direction is not none
      // Because horizontal and vertical is changed dynamically by screen rotation.
      // this._direction is used to initialize hammerjs

      if (this._useRotation && this._direction & Axes.DIRECTION_ALL) {
        this._direction = Axes.DIRECTION_ALL;
      }

      _PanInput.prototype.connect.call(this, observer);
    };

    _proto.getOffset = function getOffset(properties, useDirection) {
      if (this._useRotation === false) {
        return _PanInput.prototype.getOffset.call(this, properties, useDirection);
      }

      var offset = _PanInput.prototype.getOffset.call(this, properties, [true, true]);

      var newOffset = [0, 0];

      var theta = this._screenRotationAngle.getRadian();

      var cosTheta = Math.cos(theta);
      var sinTheta = Math.sin(theta);
      newOffset[0] = offset[0] * cosTheta - offset[1] * sinTheta;
      newOffset[1] = offset[1] * cosTheta + offset[0] * sinTheta; // Use only user allowed direction.

      if (!(this._userDirection & Axes.DIRECTION_HORIZONTAL)) {
        newOffset[0] = 0;
      } else if (!(this._userDirection & Axes.DIRECTION_VERTICAL)) {
        newOffset[1] = 0;
      }

      return newOffset;
    };

    _proto.destroy = function destroy() {
      if (this._useRotation) {
        this._screenRotationAngle && this._screenRotationAngle.unref();
      }

      _PanInput.prototype.destroy.call(this);
    };

    return RotationPanInput;
  }(PanInput);

  var ORIGIN_VECTOR = vec3.fromValues(0, 0, 0);
  var X_AXIS_VECTOR = vec3.fromValues(1, 0, 0);
  var Y_AXIS_VECTOR = vec3.fromValues(0, 1, 0);

  var DeviceQuaternion =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(DeviceQuaternion, _Component);

    function DeviceQuaternion() {
      var _this;

      _this = _Component.call(this) || this;
      _this._screenRotationAngle = new ScreenRotationAngle();
      _this._fusionPoseSensor = new FusionPoseSensor();
      _this._quaternion = quat.create();

      _this._fusionPoseSensor.enable();

      _this._fusionPoseSensor.on("change", function (e) {
        _this._quaternion = e.quaternion;

        _this.trigger("change", {
          isTrusted: true
        });
      });

      return _this;
    }

    var _proto = DeviceQuaternion.prototype;

    _proto.getCombinedQuaternion = function getCombinedQuaternion(yaw, pitch) {
      var deviceR = this._screenRotationAngle.getRadian(); // rotate x-axis around z-axis about screen rotation angle.


      var pitchAxis = vec3.rotateZ(vec3.create(), X_AXIS_VECTOR, ORIGIN_VECTOR, deviceR);
      var yawQ = quat.setAxisAngle(quat.create(), Y_AXIS_VECTOR, glMatrix.toRadian(-yaw)); // rotate quaternion around new x-axis about pitch angle.

      var pitchQ = quat.setAxisAngle(quat.create(), pitchAxis, glMatrix.toRadian(-pitch));
      var conj = quat.conjugate(quat.create(), this._quaternion); // Multiply pitch quaternion -> device quaternion -> yaw quaternion

      var outQ = quat.multiply(quat.create(), pitchQ, conj);
      quat.multiply(outQ, outQ, yawQ);
      return outQ;
    };

    _proto.destroy = function destroy() {
      // detach all event handler
      this.off();

      if (this._fusionPoseSensor) {
        this._fusionPoseSensor.off();

        this._fusionPoseSensor.destroy();

        this._fusionPoseSensor = null;
      }

      if (this._screenRotationAngle) {
        this._screenRotationAngle.unref();

        this._screenRotationAngle = null;
      }
    };

    return DeviceQuaternion;
  }(Component);

  var CONTROL_MODE_VR = 1;
  var CONTROL_MODE_YAWPITCH = 2;
  var TOUCH_DIRECTION_NONE = 1;
  var TOUCH_DIRECTION_YAW = 2;
  var TOUCH_DIRECTION_PITCH = 4;
  var TOUCH_DIRECTION_ALL = TOUCH_DIRECTION_YAW | TOUCH_DIRECTION_PITCH;
  /* Const for MovableCoord */

  var MC_DECELERATION = 0.0014;
  var MC_MAXIMUM_DURATION = 1000;
  var MC_BIND_SCALE = [0.20, 0.20];
  var MAX_FIELD_OF_VIEW = 110;
  var PAN_SCALE = 320; // const DELTA_THRESHOLD = 0.015;

  var YAW_RANGE_HALF = 180;
  var PITCH_RANGE_HALF = 90;
  var CIRCULAR_PITCH_RANGE_HALF = 180;
  var GYRO_MODE = {
    NONE: "none",
    YAWPITCH: "yawPitch",
    VR: "VR"
  };

  var VERSION = "3.2.0-rc";

  var DEFAULT_YAW_RANGE = [-YAW_RANGE_HALF, YAW_RANGE_HALF];
  var DEFAULT_PITCH_RANGE = [-PITCH_RANGE_HALF, PITCH_RANGE_HALF];
  var CIRCULAR_PITCH_RANGE = [-CIRCULAR_PITCH_RANGE_HALF, CIRCULAR_PITCH_RANGE_HALF];
  /**
   * A module used to provide coordinate based on yaw/pitch orientation. This module receives user touch action, keyboard, mouse and device orientation(if it exists) as input, then combines them and converts it to yaw/pitch coordinates.
   *
   * @alias eg.YawPitchControl
   * @extends eg.Component
   *
   * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
   */

  var YawPitchControl =
  /*#__PURE__*/
  function () {
    var YawPitchControl =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(YawPitchControl, _Component);

      // Expose DeviceOrientationControls sub module for test purpose

      /**
       * @param {Object} options The option object of the eg.YawPitch module
       * @param {Element}[options.element=null] element A base element for the eg.YawPitch module
       * @param {Number} [options.yaw=0] initial yaw (degree)
       * @param {Number} [options.pitch=0] initial pitch (degree)
       * @param {Number} [options.fov=65] initial field of view (degree)
       * @param {Boolean} [optiosn.showPolePoint=true] Indicates whether pole is shown
       * @param {Boolean} [options.useZoom=true] Indicates whether zoom is available
       * @param {Boolean} [options.useKeyboard=true] Indicates whether keyboard is enabled
       * @param {String} [config.gyroMode=yawPitch] Enables control through device motion.
       * @param {Number} [options.touchDirection=TOUCH_DIRECTION_ALL] Direction of the touch movement (TOUCH_DIRECTION_ALL: all,  TOUCH_DIRECTION_YAW: horizontal, TOUCH_DIRECTION_PITCH: vertical, TOUCH_DIRECTION_NONE: no move)
       * @param {Array} [options.yawRange=[-180, 180] Range of visible yaw
       * @param {Array} [options.pitchRange=[-90, 90] Range of visible pitch
       * @param {Array} [options.fovRange=[30, 110] Range of FOV
       * @param {Number} [options.aspectRatio=1] Aspect Ratio
       */
      function YawPitchControl(options) {
        var _this;

        _this = _Component.call(this) || this;

        var opt = _extends({
          element: null,
          yaw: 0,
          pitch: 0,
          fov: 65,
          showPolePoint: false,
          useZoom: true,
          useKeyboard: true,
          gyroMode: GYRO_MODE.YAWPITCH,
          touchDirection: TOUCH_DIRECTION_ALL,
          yawRange: DEFAULT_YAW_RANGE,
          pitchRange: DEFAULT_PITCH_RANGE,
          fovRange: [30, 110],
          aspectRatio: 1
          /* TODO: Need Mandatory? */

        }, options);

        _this._element = opt.element;
        _this._initialFov = opt.fov;
        _this._enabled = false;
        _this._isAnimating = false;
        _this._deviceQuaternion = null;

        _this._initAxes(opt);

        _this.option(opt);

        return _this;
      }

      var _proto = YawPitchControl.prototype;

      _proto._initAxes = function _initAxes(opt) {
        var _this2 = this;

        var yRange = this._updateYawRange(opt.yawRange, opt.fov, opt.aspectRatio);

        var pRange = this._updatePitchRange(opt.pitchRange, opt.fov, opt.showPolePoint);

        var useRotation = opt.gyroMode === GYRO_MODE.VR;
        this.axesPanInput = new RotationPanInput(this._element, {
          useRotation: useRotation
        });
        this.axesWheelInput = new WheelInput(this._element, {
          scale: -4
        });
        this.axesTiltMotionInput = null;
        this.axesPinchInput = SUPPORT_TOUCH ? new PinchInput(this._element, {
          scale: -1
        }) : null;
        this.axesMoveKeyInput = new MoveKeyInput(this._element, {
          scale: [-6, 6]
        });
        this.axes = new Axes({
          yaw: {
            range: yRange,
            circular: YawPitchControl.isCircular(yRange),
            bounce: [0, 0]
          },
          pitch: {
            range: pRange,
            circular: YawPitchControl.isCircular(pRange),
            bounce: [0, 0]
          },
          fov: {
            range: opt.fovRange,
            circular: [false, false],
            bounce: [0, 0]
          }
        }, {
          deceleration: MC_DECELERATION,
          maximumDuration: MC_MAXIMUM_DURATION
        }, {
          yaw: opt.yaw,
          pitch: opt.pitch,
          fov: opt.fov
        }).on({
          hold: function hold(evt) {
            // Restore maximumDuration not to be spin too mush.
            _this2.axes.options.maximumDuration = MC_MAXIMUM_DURATION;

            _this2.trigger("hold", {
              isTrusted: evt.isTrusted
            });
          },
          change: function change(evt) {
            if (evt.delta.fov !== 0) {
              _this2._updateControlScale(evt);

              _this2.updatePanScale();
            }

            _this2._triggerChange(evt);
          },
          release: function release(evt) {
            _this2._triggerChange(evt);
          },
          animationStart: function animationStart(evt) {},
          animationEnd: function animationEnd(evt) {
            _this2.trigger("animationEnd", {
              isTrusted: evt.isTrusted
            });
          }
        });
      };
      /**
       * Update Pan Scale
       *
       * Scale(Sensitivity) values of panning is related with fov and height.
       * If at least one of them is changed, this function need to be called.
       * @param {*} param
       */


      _proto.updatePanScale = function updatePanScale(param) {
        if (param === void 0) {
          param = {};
        }

        var fov = this.axes.get().fov;
        var areaHeight = param.height || parseInt(getComputedStyle(this._element).height, 10);
        var scale = MC_BIND_SCALE[0] * fov / this._initialFov * PAN_SCALE / areaHeight;
        this.axesPanInput.options.scale = [scale, scale];
        this.axes.options.deceleration = MC_DECELERATION * fov / MAX_FIELD_OF_VIEW;
        return this;
      };
      /*
       * Override component's option method
       * to call method for updating values which is affected by option change.
       *
       * @param {*} args
       */


      _proto.option = function option() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var argLen = args.length; // Getter

        if (argLen === 0) {
          return this._getOptions();
        } else if (argLen === 1 && typeof args[0] === "string") {
          return this._getOptions(args[0]);
        } // Setter


        var beforeOptions = _extends({}, this.options);

        var newOptions = {};
        var changedKeyList = []; // TODO: if value is not changed, then do not push on changedKeyList.

        if (argLen === 1) {
          changedKeyList = Object.keys(args[0]);
          newOptions = _extends({}, args[0]);
        } else if (argLen >= 2) {
          changedKeyList.push(args[0]);
          newOptions[args[0]] = args[1];
        }

        this._setOptions(this._getValidatedOptions(newOptions));

        this._applyOptions(changedKeyList, beforeOptions);

        return this;
      };

      _proto._getValidatedOptions = function _getValidatedOptions(newOptions) {
        if (newOptions.yawRange) {
          newOptions.yawRange = this._getValidYawRange(newOptions.yawRange, newOptions.fov, newOptions.aspectRatio);
        }

        if (newOptions.pitchRange) {
          newOptions.pitchRange = this._getValidPitchRange(newOptions.pitchRange, newOptions.fov);
        }

        return newOptions;
      };

      _proto._getOptions = function _getOptions(key) {
        var value;

        if (typeof key === "string") {
          value = this.options[key];
        } else if (arguments.length === 0) {
          value = this.options;
        }

        return value;
      };

      _proto._setOptions = function _setOptions(options) {
        for (var key in options) {
          this.options[key] = options[key];
        }
      };

      _proto._applyOptions = function _applyOptions(keys, prevOptions) {
        // If one of below is changed, call updateControlScale()
        if (keys.some(function (key) {
          return key === "showPolePoint" || key === "fov" || key === "aspectRatio" || key === "yawRange" || key === "pitchRange";
        })) {
          this._updateControlScale(); // If fov is changed, update pan scale


          if (keys.indexOf("fov") >= 0) {
            this.updatePanScale();
          }
        }

        if (keys.some(function (key) {
          return key === "fovRange";
        })) {
          /**
           * Temporary Fix Code
           * Changed float number as toFixed(5) format for temporary.
           *
           * TODO: it should not use toFixed(5) after axes.js is fixed.
           */
          var fovRange = this.options.fovRange.map(function (v) {
            return +v.toFixed(5);
          });
          var prevFov = this.axes.get().fov;
          var nextFov = this.axes.get().fov;
          vec2.copy(this.axes.axis.fov.range, fovRange);

          if (nextFov < fovRange[0]) {
            nextFov = fovRange[0];
          } else if (prevFov > fovRange[1]) {
            nextFov = fovRange[1];
          }

          if (prevFov !== nextFov) {
            this.axes.setTo({
              fov: nextFov
            }, 0);

            this._updateControlScale();

            this.updatePanScale();
          }
        }

        if (keys.some(function (key) {
          return key === "gyroMode";
        }) && SUPPORT_DEVICEMOTION) {
          var isVR = this.options.gyroMode === GYRO_MODE.VR;
          var isYawPitch = this.options.gyroMode === GYRO_MODE.YAWPITCH; // Disconnect first

          if (this.axesTiltMotionInput) {
            this.axes.disconnect(this.axesTiltMotionInput);
            this.axesTiltMotionInput.destroy();
            this.axesTiltMotionInput = null;
          }

          if (this._deviceQuaternion) {
            this._deviceQuaternion.destroy();

            this._deviceQuaternion = null;
          }

          if (isVR) {
            this._initDeviceQuaternion();
          } else if (isYawPitch) {
            this.axesTiltMotionInput = new TiltMotionInput(this._element);
            this.axes.connect(["yaw", "pitch"], this.axesTiltMotionInput);
          }

          this.axesPanInput.setUseRotation(isVR);
        }

        if (keys.some(function (key) {
          return key === "useKeyboard";
        })) {
          var useKeyboard = this.options.useKeyboard;

          if (useKeyboard) {
            this.axes.connect(["yaw", "pitch"], this.axesMoveKeyInput);
          } else {
            this.axes.disconnect(this.axesMoveKeyInput);
          }
        }

        if (keys.some(function (key) {
          return key === "useZoom";
        })) {
          var useZoom = this.options.useZoom; // Disconnect first

          this.axes.disconnect(this.axesWheelInput);

          if (useZoom) {
            this.axes.connect(["fov"], this.axesWheelInput);
          }
        }

        this._togglePinchInputByOption(this.options.touchDirection, this.options.useZoom);

        if (keys.some(function (key) {
          return key === "touchDirection";
        })) {
          this._enabled && this._enableTouch(this.options.touchDirection);
        }
      };

      _proto._togglePinchInputByOption = function _togglePinchInputByOption(touchDirection, useZoom) {
        if (this.axesPinchInput) {
          // disconnect first
          this.axes.disconnect(this.axesPinchInput); // If the touchDirection option is not ALL, pinchInput should be disconnected to make use of a native scroll.

          if (useZoom && touchDirection === TOUCH_DIRECTION_ALL && // TODO: Get rid of using private property of axes instance.
          this.axes._inputs.indexOf(this.axesPinchInput) === -1) {
            this.axes.connect(["fov"], this.axesPinchInput);
          }
        }
      };

      _proto._enableTouch = function _enableTouch(direction) {
        // Disconnect first
        this.axesPanInput && this.axes.disconnect(this.axesPanInput);
        var yawEnabled = direction & TOUCH_DIRECTION_YAW ? "yaw" : null;
        var pitchEnabled = direction & TOUCH_DIRECTION_PITCH ? "pitch" : null;
        this.axes.connect([yawEnabled, pitchEnabled], this.axesPanInput);
      };

      _proto._initDeviceQuaternion = function _initDeviceQuaternion() {
        var _this3 = this;

        this._deviceQuaternion = new DeviceQuaternion();

        this._deviceQuaternion.on("change", function (e) {
          _this3._triggerChange(e);
        });
      };

      _proto._getValidYawRange = function _getValidYawRange(newYawRange, newFov, newAspectRatio) {
        var ratio = YawPitchControl.adjustAspectRatio(newAspectRatio || this.options.aspectRatio || 1);
        var fov = newFov || this.axes.get().fov;
        var horizontalFov = fov * ratio;
        var isValid = newYawRange[1] - newYawRange[0] >= horizontalFov;

        if (isValid) {
          return newYawRange;
        } else {
          return this.options.yawRange || DEFAULT_YAW_RANGE;
        }
      };

      _proto._getValidPitchRange = function _getValidPitchRange(newPitchRange, newFov) {
        var fov = newFov || this.axes.get().fov;
        var isValid = newPitchRange[1] - newPitchRange[0] >= fov;

        if (isValid) {
          return newPitchRange;
        } else {
          return this.options.pitchRange || DEFAULT_PITCH_RANGE;
        }
      };

      YawPitchControl.isCircular = function isCircular(range) {
        return range[1] - range[0] < 360 ? [false, false] : [true, true];
      };
      /**
       * Update yaw/pitch min/max by 5 factor
       *
       * 1. showPolePoint
       * 2. fov
       * 3. yawRange
       * 4. pitchRange
       * 5. aspectRatio
       *
       * If one of above is changed, call this function
       */


      _proto._updateControlScale = function _updateControlScale(changeEvt) {
        var opt = this.options;
        var fov = this.axes.get().fov;

        var pRange = this._updatePitchRange(opt.pitchRange, fov, opt.showPolePoint);

        var yRange = this._updateYawRange(opt.yawRange, fov, opt.aspectRatio); // TODO: If not changed!?


        var pos = this.axes.get();
        var y = pos.yaw;
        var p = pos.pitch;
        vec2.copy(this.axes.axis.yaw.range, yRange);
        vec2.copy(this.axes.axis.pitch.range, pRange);
        this.axes.axis.yaw.circular = YawPitchControl.isCircular(yRange);
        this.axes.axis.pitch.circular = YawPitchControl.isCircular(pRange);
        /**
         * update yaw/pitch by it's range.
         */

        if (y < yRange[0]) {
          y = yRange[0];
        } else if (y > yRange[1]) {
          y = yRange[1];
        }

        if (p < pRange[0]) {
          p = pRange[0];
        } else if (p > pRange[1]) {
          p = pRange[1];
        }

        if (changeEvt) {
          changeEvt.set({
            yaw: y,
            pitch: p
          });
        }

        this.axes.setTo({
          yaw: y,
          pitch: p
        }, 0);
        return this;
      };

      _proto._updatePitchRange = function _updatePitchRange(pitchRange, fov, showPolePoint) {
        if (this.options.gyroMode === GYRO_MODE.VR) {
          // Circular pitch on VR
          return CIRCULAR_PITCH_RANGE;
        }

        var verticalAngle = pitchRange[1] - pitchRange[0];
        var halfFov = fov / 2;
        var isPanorama = verticalAngle < 180;

        if (showPolePoint && !isPanorama) {
          // Use full pinch range
          return pitchRange.map(function (v) {
            return +v.toFixed(5);
          });
        } // Round value as movableCood do.


        return [pitchRange[0] + halfFov, pitchRange[1] - halfFov].map(function (v) {
          return +v.toFixed(5);
        });
      };

      _proto._updateYawRange = function _updateYawRange(yawRange, fov, aspectRatio) {
        if (this.options.gyroMode === GYRO_MODE.VR) {
          return DEFAULT_YAW_RANGE;
        }

        var horizontalAngle = yawRange[1] - yawRange[0];
        /**
         * Full 360 Mode
         */

        if (horizontalAngle >= 360) {
          // Don't limit yaw range on Full 360 mode.
          return yawRange.map(function (v) {
            return +v.toFixed(5);
          });
        }
        /**
         * Panorama mode
         */


        var MAGIC_NUMBER = 1;
        var ratio = YawPitchControl.adjustAspectRatio(aspectRatio);
        var halfHorizontalFov = fov / 2 * ratio; // TODO: Magic Number Fix!

        if (horizontalAngle > 290) {
          MAGIC_NUMBER = 0.794; // horizontalAngle = 286;
        } else if (horizontalAngle > 125) {
          MAGIC_NUMBER = 0.98; // horizontalAngle *= 0.98;
        } // Round value as movableCood do.


        return [yawRange[0] * MAGIC_NUMBER + halfHorizontalFov, yawRange[1] * MAGIC_NUMBER - halfHorizontalFov].map(function (v) {
          return +v.toFixed(5);
        });
      };

      _proto._triggerChange = function _triggerChange(evt) {
        var pos = this.axes.get();
        var opt = this.options;
        var event = {
          targetElement: opt.element,
          isTrusted: evt.isTrusted
        };
        event.yaw = pos.yaw;
        event.pitch = pos.pitch;
        event.fov = pos.fov;

        if (opt.gyroMode === GYRO_MODE.VR && this._deviceQuaternion) {
          event.quaternion = this._deviceQuaternion.getCombinedQuaternion(pos.yaw, pos.pitch);
        }

        this.trigger("change", event);
      }; // TODO: makes constant to be logic


      YawPitchControl.adjustAspectRatio = function adjustAspectRatio(input) {
        var inputRange = [0.520, 0.540, 0.563, 0.570, 0.584, 0.590, 0.609, 0.670, 0.702, 0.720, 0.760, 0.780, 0.820, 0.920, 0.970, 1.00, 1.07, 1.14, 1.19, 1.25, 1.32, 1.38, 1.40, 1.43, 1.53, 1.62, 1.76, 1.77, 1.86, 1.96, 2.26, 2.30, 2.60, 3.00, 5.00, 6.00];
        var outputRange = [0.510, 0.540, 0.606, 0.560, 0.628, 0.630, 0.647, 0.710, 0.736, 0.757, 0.780, 0.770, 0.800, 0.890, 0.975, 1.00, 1.07, 1.10, 1.15, 1.18, 1.22, 1.27, 1.30, 1.33, 1.39, 1.45, 1.54, 1.55, 1.58, 1.62, 1.72, 1.82, 1.92, 2.00, 2.24, 2.30];
        var rangeIdx = -1;

        for (var i = 0; i < inputRange.length - 1; i++) {
          if (inputRange[i] <= input && inputRange[i + 1] >= input) {
            rangeIdx = i;
            break;
          }
        }

        if (rangeIdx === -1) {
          if (inputRange[0] > input) {
            return outputRange[0];
          } else {
            return outputRange[outputRange[0].length - 1];
          }
        }

        var inputA = inputRange[rangeIdx];
        var inputB = inputRange[rangeIdx + 1];
        var outputA = outputRange[rangeIdx];
        var outputB = outputRange[rangeIdx + 1];
        return YawPitchControl.lerp(outputA, outputB, (input - inputA) / (inputB - inputA));
      };

      YawPitchControl.lerp = function lerp(a, b, fraction) {
        return a + fraction * (b - a);
      };
      /**
       * Enable YawPitch functionality
       *
       * @method eg.YawPitch#enable
       */


      _proto.enable = function enable() {
        if (this._enabled) {
          return this;
        }

        this._enabled = true; // touchDirection is decided by parameter is valid string (Ref. Axes.connect)

        this._applyOptions(Object.keys(this.options), this.options); // TODO: Is this code is needed? Check later.


        this.updatePanScale();
        return this;
      };
      /**
       * Disable YawPitch functionality
       *
       * @method eg.YawPitch#disable
       */


      _proto.disable = function disable(persistOrientation) {
        if (!this._enabled) {
          return this;
        } // TODO: Check peristOrientation is needed!


        if (!persistOrientation) {
          this._resetOrientation();
        }

        this.axes.disconnect();
        this._enabled = false;
        return this;
      };

      _proto._resetOrientation = function _resetOrientation() {
        var opt = this.options;
        this.axes.setTo({
          yaw: opt.yaw,
          pitch: opt.pitch,
          fov: opt.fov
        }, 0);
        return this;
      };
      /**
       * Set one or more of yaw, pitch, fov
       *
       * @param {Object} coordinate yaw, pitch, fov
       * @param {Number} duration Animation duration. if it is above 0 then it's animated.
       */


      _proto.lookAt = function lookAt(_ref, duration) {
        var yaw = _ref.yaw,
            pitch = _ref.pitch,
            fov = _ref.fov;
        var pos = this.axes.get();
        var y = yaw === undefined ? 0 : yaw - pos.yaw;
        var p = pitch === undefined ? 0 : pitch - pos.pitch;
        var f = fov === undefined ? 0 : fov - pos.fov; // Allow duration of animation to have more than MC_MAXIMUM_DURATION.

        this.axes.options.maximumDuration = Infinity;
        this.axes.setBy({
          yaw: y,
          pitch: p,
          fov: f
        }, duration);
      };

      _proto.get = function get() {
        return this.axes.get();
      };

      _proto.getYaw = function getYaw() {
        return this.axes.get().yaw;
      };

      _proto.getPitch = function getPitch() {
        return this.axes.get().pitch;
      };

      _proto.getFov = function getFov() {
        return this.axes.get().fov;
      };
      /**
       * Destroys objects
       */


      _proto.destroy = function destroy() {
        this.axes && this.axes.destroy();
        this.axisPanInput && this.axisPanInput.destroy();
        this.axesWheelInput && this.axesWheelInput.destroy();
        this.axesTiltMotionInput && this.axesTiltMotionInput.destroy();
        this.axesDeviceOrientationInput && this.axesDeviceOrientationInput.destroy();
        this.axesPinchInput && this.axesPinchInput.destroy();
        this.axesMoveKeyInput && this.axesMoveKeyInput.destroy();
        this._deviceQuaternion && this._deviceQuaternion.destroy();
      };

      return YawPitchControl;
    }(Component);

    YawPitchControl.VERSION = VERSION;
    YawPitchControl.CONTROL_MODE_VR = CONTROL_MODE_VR;
    YawPitchControl.CONTROL_MODE_YAWPITCH = CONTROL_MODE_YAWPITCH;
    YawPitchControl.TOUCH_DIRECTION_ALL = TOUCH_DIRECTION_ALL;
    YawPitchControl.TOUCH_DIRECTION_YAW = TOUCH_DIRECTION_YAW;
    YawPitchControl.TOUCH_DIRECTION_PITCH = TOUCH_DIRECTION_PITCH;
    YawPitchControl.TOUCH_DIRECTION_NONE = TOUCH_DIRECTION_NONE;
    return YawPitchControl;
  }();

  var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;
  var STATUS = {
    "NONE": 0,
    "LOADING": 1,
    "LOADED": 2,
    "ERROR": 3
  };
  var EVENT = {
    "READYSTATECHANGE": "readystatechange"
  };

  var ImageLoader =
  /*#__PURE__*/
  function () {
    var ImageLoader =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(ImageLoader, _Component);

      function ImageLoader(image) {
        var _this;

        // Super constructor
        _this = _Component.call(this) || this;
        _this._image = null;
        _this._onceHandlers = [];
        _this._loadStatus = STATUS.NONE;
        image && _this.set(image);
        return _this;
      }

      var _proto = ImageLoader.prototype;

      _proto.get = function get() {
        var _this2 = this;

        return new _Promise(function (res, rej) {
          if (!_this2._image) {
            rej("ImageLoader: image is not defiend");
          } else if (_this2._loadStatus === STATUS.LOADED) {
            res(_this2.getElement());
          } else if (_this2._loadStatus === STATUS.LOADING) {
            /* Check isMaybeLoaded() first because there may have
            	posibilities that image already loaded before get is called.
            	for example calling get on external image onload callback.*/
            if (ImageLoader.isMaybeLoaded(_this2._image)) {
              _this2._loadStatus = STATUS.LOADED;
              res(_this2.getElement());
            } else {
              _this2.on(EVENT.READYSTATECHANGE, function (e) {
                if (e.type === STATUS.LOADED) {
                  res(_this2.getElement());
                } else {
                  rej("ImageLoader: failed to load images.");
                }
              });
            }
          } else {
            rej("ImageLoader: failed to load images");
          }
        });
      };
      /**
       * @param image img element or img url or array of img element or array of img url
       */


      _proto.set = function set(image) {
        var _this3 = this;

        this._loadStatus = STATUS.LOADING;
        this._image = ImageLoader.createElement(image);

        if (ImageLoader.isMaybeLoaded(this._image)) {
          this._loadStatus = STATUS.LOADED;
          return;
        }

        this.onceLoaded(this._image, function () {
          _this3._loadStatus = STATUS.LOADED;

          _this3.trigger(EVENT.READYSTATECHANGE, {
            type: STATUS.LOADED
          });
        }, function () {
          _this3._loadStatus = STATUS.ERROR;

          _this3.trigger(EVENT.READYSTATECHANGE, {
            type: STATUS.ERROR
          });
        });
      };

      ImageLoader.createElement = function createElement(image) {
        var images = image instanceof Array ? image : [image];
        return images.map(function (img) {
          var _img = img;

          if (typeof img === "string") {
            _img = new Image();
            _img.crossOrigin = "anonymous";
            _img.src = img;
          }

          return _img;
        });
      };

      _proto.getElement = function getElement() {
        return this._image.length === 1 ? this._image[0] : this._image;
      };

      ImageLoader.isMaybeLoaded = function isMaybeLoaded(image) {
        var result = false;

        if (image instanceof Image) {
          result = image.complete && image.naturalWidth !== 0;
        } else if (image instanceof Array) {
          result = !image.some(function (img) {
            return !img.complete || img.naturalWidth === 0;
          });
        }

        return result;
      };

      _proto.onceLoaded = function onceLoaded(target, onload, onerror) {
        var _this4 = this;

        var targets = target instanceof Array ? target : [target];
        var targetsNotLoaded = targets.filter(function (img) {
          return !ImageLoader.isMaybeLoaded(img);
        });
        var loadPromises = targetsNotLoaded.map(function (img) {
          return new _Promise(function (res, rej) {
            _this4._once(img, "load", function () {
              return res(img);
            });

            _this4._once(img, "error", function () {
              return rej(img);
            });
          });
        });

        _Promise.all(loadPromises).then(function (result) {
          return onload(targets.length === 1 ? targets[0] : targets);
        }, function (reason) {
          return onerror(reason);
        });
      };

      _proto._once = function _once(target, type, listener) {
        var fn = function fn(event) {
          target.removeEventListener(type, fn);
          listener(event);
        };

        target.addEventListener(type, fn);

        this._onceHandlers.push({
          target: target,
          type: type,
          fn: fn
        });
      };

      _proto.getStatus = function getStatus() {
        return this._loadStatus;
      };

      _proto.destroy = function destroy() {
        this._onceHandlers.forEach(function (handler) {
          handler.target.removeEventListener(handler.type, handler.fn);
        });

        this._onceHandlers = [];
        this._image.src = "";
        this._image = null;
        this._loadStatus = STATUS.NONE;
      };

      return ImageLoader;
    }(Component);

    ImageLoader.STATUS = STATUS;
    return ImageLoader;
  }();

  var _Promise$1 = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

  // import Agent from "@egjs/agent";

  /* Ref https://www.w3schools.com/tags/av_prop_readystate.asp */
  var READY_STATUS = {
    HAVE_NOTHING: 0,
    // no information whether or not the audio/video is ready
    HAVE_METADATA: 1,
    // HAVE_METADATA - metadata for the audio/video is ready
    HAVE_CURRENT_DATA: 2,
    // data for the current playback position is available, but not enough data to play next frame/millisecond
    HAVE_FUTURE_DATA: 3,
    // data for the current and at least the next frame is available
    HAVE_ENOUGH_DATA: 4,
    // enough data available to start playing
    // below is custom status for failed to load status
    LOADING_FAILED: -1
  };
  var READYSTATECHANGE_EVENT_NAME = {};
  READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_METADATA] = "loadedmetadata";
  READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_CURRENT_DATA] = "loadeddata";
  READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_FUTURE_DATA] = "canplay";
  READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_ENOUGH_DATA] = "canplaythrough";

  var VideoLoader =
  /*#__PURE__*/
  function () {
    function VideoLoader(video) {
      this._handlers = [];
      this._sourceCount = 0; // on iOS safari, 'loadeddata' will not triggered unless the user hits play,
      // so used 'loadedmetadata' instead.

      this._thresholdReadyState = READY_STATUS.HAVE_METADATA;
      this._thresholdEventName = READYSTATECHANGE_EVENT_NAME[this._thresholdReadyState];
      this._loadStatus = video && video.readyState || READY_STATUS.HAVE_NOTHING;
      this._onerror = this._onerror.bind(this);
      video && this.set(video);
    }

    var _proto = VideoLoader.prototype;

    _proto._onerror = function _onerror() {
      this._errorCount++;

      if (this._errorCount >= this._sourceCount) {
        this._loadStatus = READY_STATUS.LOADING_FAILED;

        this._detachErrorHandler(this._onerror);
      }
    };
    /**
     *
     * @param {Object | String} video Object or String containing Video Source URL<ko>비디오 URL 정보를 담고 있는 문자열이나 객체 {type, src}</ko>
     */


    _proto._appendSourceElement = function _appendSourceElement(videoUrl) {
      var videoSrc;
      var videoType;

      if (typeof videoUrl === "object") {
        videoSrc = videoUrl.src;
        videoType = videoUrl.type;
      } else if (typeof videoUrl === "string") {
        videoSrc = videoUrl;
      }

      if (!videoSrc) {
        return false;
      }

      var sourceElement = document.createElement("source");
      sourceElement.src = videoSrc;
      videoType && (sourceElement.type = videoType);

      this._video.appendChild(sourceElement);

      return true;
    };

    _proto.set = function set(video) {
      var _this = this;

      this._reset(); // reset resources.


      if (!video) {
        return;
      }

      if (video instanceof HTMLVideoElement) {
        // video tag
        this._video = video;
      } else if (typeof video === "string" || typeof video === "object") {
        // url
        this._video = document.createElement("video");

        this._video.setAttribute("crossorigin", "anonymous");

        this._video.setAttribute("webkit-playsinline", "");

        this._video.setAttribute("playsinline", "");

        if (video instanceof Array) {
          video.forEach(function (v) {
            return _this._appendSourceElement(v);
          });
        } else {
          this._appendSourceElement(video);
        }

        this._sourceCount = this._video.querySelectorAll("source").length;

        if (this._sourceCount > 0) {
          if (this._video.readyState < this._thresholdReadyState) {
            this._video.load(); // attach loading error listener


            this._attachErrorHandler(this._onerror);
          }
        } else {
          this._video = null;
        }
      }
    };

    _proto._attachErrorHandler = function _attachErrorHandler(handler) {
      this._video.addEventListener("error", handler);

      this._sources = this._video.querySelectorAll("source");
      [].forEach.call(this._sources, function (source) {
        source.addEventListener("error", handler);
      });
    };

    _proto._detachErrorHandler = function _detachErrorHandler(handler) {
      this._video.removeEventListener("error", handler);

      [].forEach.call(this._sources, function (source) {
        source.removeEventListener("error", handler);
      });
    };

    _proto.get = function get() {
      var _this2 = this;

      return new _Promise$1(function (res, rej) {
        if (!_this2._video) {
          rej("VideoLoader: video is undefined");
        } else if (_this2._loadStatus === READY_STATUS.LOADING_FAILED) {
          rej("VideoLoader: video source is invalid");
        } else if (_this2._video.readyState >= _this2._thresholdReadyState) {
          res(_this2._video);
        } else {
          // check errorCnt and reject
          var rejector = function rejector() {
            if (_this2._loadStatus === READY_STATUS.LOADING_FAILED) {
              _this2._detachErrorHandler(rejector);

              rej("VideoLoader: video source is invalid");
            }
          };

          _this2._attachErrorHandler(rejector);

          _this2._once(_this2._thresholdEventName, function () {
            return res(_this2._video);
          });
        }
      });
    };

    _proto.getElement = function getElement() {
      return this._video;
    };

    _proto.destroy = function destroy() {
      this._reset();
    };

    _proto._reset = function _reset() {
      var _this3 = this;

      this._handlers.forEach(function (handler) {
        _this3._video.removeEventListener(handler.type, handler.fn);
      });

      this._handlers = [];
      this._video = null;
      this._sourceCount = 0;
      this._errorCount = 0;
    };

    _proto._once = function _once(type, listener) {
      var target = this._video;

      var fn = function fn(event) {
        target.removeEventListener(type, fn);
        listener(event);
      };
      /* By useCapture mode enabled, you can capture the error event being fired on source(child)*/


      target.addEventListener(type, fn, true);

      this._handlers.push({
        type: type,
        fn: fn
      });
    };

    return VideoLoader;
  }();

  var WEBGL_ERROR_CODE = {
    "0": "NO_ERROR",
    "1280": "INVALID_ENUM",
    "1281": "INVALID_VALUE",
    "1282": "INVALID_OPERATION",
    "1285": "OUT_OF_MEMORY",
    "1286": "INVALID_FRAMEBUFFER_OPERATION",
    "37442": "CONTEXT_LOST_WEBGL"
  };
  var webglAvailability = null;
  var MAX_TEXTURE_SIZE_FOR_TEST = null;

  var WebGLUtils =
  /*#__PURE__*/
  function () {
    function WebGLUtils() {}

    WebGLUtils.createShader = function createShader(gl, type, source) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

      if (success) {
        return shader;
      }

      gl.deleteShader(shader);
      return null;
    };

    WebGLUtils.createProgram = function createProgram(gl, vertexShader, fragmentShader) {
      var program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      var success = gl.getProgramParameter(program, gl.LINK_STATUS);

      if (success) {
        return program;
      }

      gl.deleteProgram(program);
      return null;
    };

    WebGLUtils.initBuffer = function initBuffer(gl, target
    /* bind point */
    , data, itemSize, attr) {
      var buffer = gl.createBuffer();
      gl.bindBuffer(target, buffer);
      gl.bufferData(target, data, gl.STATIC_DRAW);

      if (buffer) {
        buffer.itemSize = itemSize;
        buffer.numItems = data.length / itemSize;
      }

      if (attr !== undefined) {
        gl.enableVertexAttribArray(attr);
        gl.vertexAttribPointer(attr, buffer.itemSize, gl.FLOAT, false, 0, 0);
      }

      return buffer;
    };

    WebGLUtils.getWebglContext = function getWebglContext(canvas, userContextAttributes) {
      var webglIdentifiers = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
      var context = null;

      var contextAttributes = _extends({
        preserveDrawingBuffer: false,
        antialias: false
      }, userContextAttributes);

      function onWebglcontextcreationerror(e) {
        return e.statusMessage;
      }

      canvas.addEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

      for (var i = 0; i < webglIdentifiers.length; i++) {
        try {
          context = canvas.getContext(webglIdentifiers[i], contextAttributes);
        } catch (t) {}

        if (context) {
          break;
        }
      }

      canvas.removeEventListener("webglcontextcreationerror", onWebglcontextcreationerror);
      return context;
    };

    WebGLUtils.createTexture = function createTexture(gl, textureTarget) {
      var texture = gl.createTexture();
      gl.bindTexture(textureTarget, texture);
      gl.texParameteri(textureTarget, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(textureTarget, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(textureTarget, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(textureTarget, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(textureTarget, null);
      return texture;
    };
    /**
     * Returns the webgl availability of the current browser.
     * @method WebGLUtils#isWebGLAvailable
     * @retuen {Boolean} isWebGLAvailable
     */


    WebGLUtils.isWebGLAvailable = function isWebGLAvailable() {
      if (webglAvailability === null) {
        var canvas = document.createElement("canvas");
        var webglContext = WebGLUtils.getWebglContext(canvas);
        webglAvailability = !!webglContext; // webglContext Resource forced collection

        if (webglContext) {
          var loseContextExtension = webglContext.getExtension("WEBGL_lose_context");
          loseContextExtension && loseContextExtension.loseContext();
        }
      }

      return webglAvailability;
    };
    /**
     * Returns whether webgl is stable in the current browser.
     * @method WebGLUtils#isStableWebGL
     * @retuen {Boolean} isStableWebGL
     */


    WebGLUtils.isStableWebGL = function isStableWebGL() {
      var agentInfo = agent();
      var isStableWebgl = true;

      if (agentInfo.os.name === "android" && parseFloat(agentInfo.os.version) <= 4.3) {
        isStableWebgl = false;
      } else if (agentInfo.os.name === "android" && parseFloat(agentInfo.os.version) === 4.4) {
        if (agentInfo.browser.name !== "chrome") {
          isStableWebgl = false;
        }
      }

      return isStableWebgl;
    };

    WebGLUtils.getErrorNameFromWebGLErrorCode = function getErrorNameFromWebGLErrorCode(code) {
      if (!(code in WEBGL_ERROR_CODE)) {
        return "UNKNOWN_ERROR";
      }

      return WEBGL_ERROR_CODE[code];
    };
    /**
     * This function is wrapper for texImage2D to handle exceptions on texImage2D.
     * Purpose is to prevent service from being stopped by script error.
     *
     * @param {*} gl
     * @param {*} target
     * @param {*} pixels
     */


    WebGLUtils.texImage2D = function texImage2D(gl, target, pixels) {
      try {
        gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      } catch (error) {
        /* eslint-disable no-console */
        console.error("WebGLUtils.texImage2D error:", error);
        /* eslint-enable no-console */
      }
    };

    WebGLUtils.getMaxTextureSize = function getMaxTextureSize(gl) {
      // WARN: MAX_TEXTURE_SIZE_FOR_TEST is used for test
      return MAX_TEXTURE_SIZE_FOR_TEST || gl.getParameter(gl.MAX_TEXTURE_SIZE);
    };

    return WebGLUtils;
  }();

  var agent$1 = agent();
  var isIE11 = agent$1.browser.name === "ie" && agent$1.browser.version === "11.0";
  var EVENTS = {
    ERROR: "error"
  };
  /**
   *
   * Extends Component for firing errors occurs internally.
   */

  var Renderer =
  /*#__PURE__*/
  function () {
    var Renderer =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(Renderer, _Component);

      function Renderer() {
        var _this;

        _this = _Component.call(this) || this;
        _this._forceDimension = null;
        _this._pixelCanvas = null;
        _this._pixelContext = null;
        return _this;
      } // Define interface for Renderers

      /**
       * Following MUST BE DEFINED on Child of Renderer
       *
       * DATA
       *
       *  - getVertexPositionData
       *  - getIndexData
       *  - getTextureCoordData
       *
       * SOURCE
       *
       *  - getVertexShaderSource
       *  - getFragmentShaderSource
       *
       * TEXTURE
       *
       *  - bindTexture
       */


      var _proto = Renderer.prototype;

      _proto.getDimension = function getDimension(pixelSource) {
        var width = pixelSource.naturalWidth || pixelSource.videoWidth;
        var height = pixelSource.naturalHeight || pixelSource.videoHeight;
        return {
          width: width,
          height: height
        };
      };
      /**
       * Update data used by shader
       * 	-
       *
       *
       * @param {*} param
       */


      _proto.updateShaderData = function updateShaderData(param) {}
      /*
      * Update following data in implementation layer.
      * If the data is not changed, it does not need to implement this function.
      *
      * - _VERTEX_POSITION_DATA
      * - _TEXTURE_COORD_DATA
      * - _INDEX_DATA
      */

      /**
       *
       * @param {HTMLImageElement | HTMLVideoElement} image
       * @param {Object = {width, height}} forceDimension Forced dimension to resize
       */
      ;

      _proto._initPixelSource = function _initPixelSource(image, forceDimension) {
        var isIE11Video = isIE11 && image instanceof HTMLVideoElement;

        if (isIE11Video || forceDimension) {
          var _ref = forceDimension || this.getDimension(image),
              width = _ref.width,
              height = _ref.height;

          this._pixelCanvas = document.createElement("canvas");
          this._pixelCanvas.width = width;
          this._pixelCanvas.height = height;
          this._pixelContext = this._pixelCanvas.getContext("2d");
        }

        this._forceDimension = forceDimension;
      };

      _proto._getPixelSource = function _getPixelSource(image) {
        if (!this._pixelCanvas) {
          return image;
        }
        /**
         * IE11 && Video
         * or
         * Dimension is forced (Image is larger than texture size.)
         */


        var contentDimension = this.getDimension(image);
        var textureDimension = this._forceDimension || contentDimension;

        if (this._pixelCanvas.width !== textureDimension.width) {
          this._pixelCanvas.width = textureDimension.width;
        }

        if (this._pixelCanvas.height !== textureDimension.height) {
          this._pixelCanvas.height = textureDimension.height;
        }

        if (this._forceDimension) {
          this._pixelContext.drawImage(image, 0, 0, contentDimension.width, contentDimension.height, 0, 0, textureDimension.width, textureDimension.height);
        } else {
          this._pixelContext.drawImage(image, 0, 0);
        }

        return this._pixelCanvas;
      };

      _proto._extractTileConfig = function _extractTileConfig(imageConfig) {
        var tileConfig = Array.isArray(imageConfig.tileConfig) ? imageConfig.tileConfig : Array.apply(void 0, Array(6)).map(function () {
          return imageConfig.tileConfig;
        });
        tileConfig = tileConfig.map(function (config) {
          return _extends({
            flipHorizontal: false,
            rotation: 0
          }, config);
        });
        return tileConfig;
      };

      _proto._triggerError = function _triggerError(error) {
        /* eslint-disable no-console */
        console.error("Renderer Error:", error);
        /* eslint-enable no-console */

        this.trigger(EVENTS.ERROR, {
          message: typeof error === "string" ? error : error.message
        });
      };

      return Renderer;
    }(Component);

    Renderer.EVENTS = EVENTS;
    return Renderer;
  }();

  var CubeRenderer =
  /*#__PURE__*/
  function () {
    var CubeRenderer =
    /*#__PURE__*/
    function (_Renderer) {
      _inheritsLoose(CubeRenderer, _Renderer);

      function CubeRenderer() {
        return _Renderer.apply(this, arguments) || this;
      }

      var _proto = CubeRenderer.prototype;

      _proto.getVertexPositionData = function getVertexPositionData() {
        CubeRenderer._VERTEX_POSITION_DATA = CubeRenderer._VERTEX_POSITION_DATA !== null ? CubeRenderer._VERTEX_POSITION_DATA : [// back
        1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1, // front
        -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, // top
        -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, // bottom
        1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, // right
        1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, -1, // left
        -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1];
        return CubeRenderer._VERTEX_POSITION_DATA;
      };

      _proto.getIndexData = function getIndexData() {
        if (CubeRenderer._INDEX_DATA) {
          return CubeRenderer._INDEX_DATA;
        }

        var indexData = [];
        var vertexPositionData = this.getVertexPositionData();

        for (var i = 0; i < vertexPositionData.length / 3; i += 4) {
          indexData.push(i, i + 2, i + 1, i, i + 3, i + 2);
        }

        CubeRenderer._INDEX_DATA = indexData;
        return indexData;
      };

      CubeRenderer.extractOrder = function extractOrder(imageConfig) {
        return imageConfig.order || "RLUDBF";
      };

      _proto.getTextureCoordData = function getTextureCoordData(imageConfig) {
        var vertexOrder = "BFUDRL";
        var order = CubeRenderer.extractOrder(imageConfig);
        var base = this.getVertexPositionData();

        var tileConfig = this._extractTileConfig(imageConfig);

        var elemSize = 3;
        var vertexPerTile = 4;
        var textureCoordData = vertexOrder.split("").map(function (face) {
          return tileConfig[order.indexOf(face)];
        }).map(function (config, i) {
          var rotation = parseInt(config.rotation / 90, 10);
          var ordermap_ = config.flipHorizontal ? [0, 1, 2, 3] : [1, 0, 3, 2];

          for (var r = 0; r < Math.abs(rotation); r++) {
            if (config.flipHorizontal && rotation > 0 || !config.flipHorizontal && rotation < 0) {
              ordermap_.push(ordermap_.shift());
            } else {
              ordermap_.unshift(ordermap_.pop());
            }
          }

          var elemPerTile = elemSize * vertexPerTile;
          var tileVertex = base.slice(i * elemPerTile, i * elemPerTile + elemPerTile);
          var tileTemp = [];

          for (var j = 0; j < vertexPerTile; j++) {
            tileTemp[ordermap_[j]] = tileVertex.splice(0, elemSize);
          }

          return tileTemp;
        }).join().split(",").map(function (v) {
          return parseInt(v, 10);
        });
        return textureCoordData;
      };

      _proto.getVertexShaderSource = function getVertexShaderSource() {
        return "\n\t\t\tattribute vec3 aVertexPosition;\n\t\t\tattribute vec3 aTextureCoord;\n\t\t\tuniform mat4 uMVMatrix;\n\t\t\tuniform mat4 uPMatrix;\n\t\t\tvarying highp vec3 vVertexDirectionVector;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\t\t\t\tvVertexDirectionVector = aTextureCoord;\n\t\t\t}";
      };

      _proto.getFragmentShaderSource = function getFragmentShaderSource() {
        return "\n\t\t\tvarying highp vec3 vVertexDirectionVector;\n\t\t\tuniform samplerCube uSampler;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_FragColor = textureCube(uSampler, vVertexDirectionVector);\n\t\t\t}";
      };

      _proto.updateTexture = function updateTexture(gl, image, imageConfig) {
        var baseOrder = "RLUDBF";
        var order = CubeRenderer.extractOrder(imageConfig);
        var orderMap = {};
        order.split("").forEach(function (v, i) {
          orderMap[v] = i;
        });

        try {
          if (image instanceof Array) {
            for (var surfaceIdx = 0; surfaceIdx < 6; surfaceIdx++) {
              var tileIdx = orderMap[baseOrder[surfaceIdx]];
              WebGLUtils.texImage2D(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_X + surfaceIdx, image[tileIdx]);
            }
          } else {
            var maxCubeMapTextureSize = this.getMaxCubeMapTextureSize(gl, image);

            for (var _surfaceIdx = 0; _surfaceIdx < 6; _surfaceIdx++) {
              var _tileIdx = orderMap[baseOrder[_surfaceIdx]];
              var tile = this.extractTileFromImage(image, _tileIdx, maxCubeMapTextureSize);
              WebGLUtils.texImage2D(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_X + _surfaceIdx, tile);
            }
          }
        } catch (e) {
          this._triggerError(e);
        }
      };

      _proto.bindTexture = function bindTexture(gl, texture, image, imageConfig) {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        this.updateTexture(gl, image, imageConfig);
      };

      _proto.getSourceTileSize = function getSourceTileSize(image) {
        var _this$getDimension = this.getDimension(image),
            width = _this$getDimension.width,
            height = _this$getDimension.height;

        var aspectRatio = width / height;
        var inputTextureSize;

        if (aspectRatio === 1 / 6) {
          inputTextureSize = width;
        } else if (aspectRatio === 6) {
          inputTextureSize = height;
        } else if (aspectRatio === 2 / 3) {
          inputTextureSize = width / 2;
        } else {
          inputTextureSize = width / 3;
        }

        return inputTextureSize;
      };

      _proto.extractTileFromImage = function extractTileFromImage(image, tileIdx, outputTextureSize) {
        var _this$getDimension2 = this.getDimension(image),
            width = _this$getDimension2.width;

        var inputTextureSize = this.getSourceTileSize(image);
        var canvas = document.createElement("canvas");
        canvas.width = outputTextureSize;
        canvas.height = outputTextureSize;
        var context = canvas.getContext("2d");
        var tilePerRow = width / inputTextureSize;
        var x = inputTextureSize * tileIdx % (inputTextureSize * tilePerRow);
        var y = parseInt(tileIdx / tilePerRow, 10) * inputTextureSize;
        context.drawImage(image, x, y, inputTextureSize, inputTextureSize, 0, 0, outputTextureSize, outputTextureSize);
        return canvas;
      };

      _proto.getMaxCubeMapTextureSize = function getMaxCubeMapTextureSize(gl, image) {
        var agent$$1 = agent();
        var maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

        var _imageWidth = this.getSourceTileSize(image);

        if (agent$$1.browser.name === "ie" && parseInt(agent$$1.browser.version, 10) === 11) {
          if (!util$1.isPowerOfTwo(_imageWidth)) {
            for (var i = 1; i < maxCubeMapTextureSize; i *= 2) {
              if (i < _imageWidth) {
                continue;
              } else {
                _imageWidth = i;
                break;
              }
            }
          }
        } // ios 9 의 경우 텍스쳐 최대사이즈는 1024 이다.


        if (agent$$1.os.name === "ios" && parseInt(agent$$1.os.version, 10) === 9) {
          _imageWidth = 1024;
        } // ios 8 의 경우 텍스쳐 최대사이즈는 512 이다.


        if (agent$$1.os.name === "ios" && parseInt(agent$$1.os.version, 10) === 8) {
          _imageWidth = 512;
        } // maxCubeMapTextureSize 보다는 작고, imageWidth 보다 큰 2의 승수 중 가장 작은 수


        return Math.min(maxCubeMapTextureSize, _imageWidth);
      };

      return CubeRenderer;
    }(Renderer);

    CubeRenderer._VERTEX_POSITION_DATA = null;
    CubeRenderer._INDEX_DATA = null;
    return CubeRenderer;
  }();

  var CubeStripRenderer =
  /*#__PURE__*/
  function (_Renderer) {
    _inheritsLoose(CubeStripRenderer, _Renderer);

    function CubeStripRenderer() {
      return _Renderer.apply(this, arguments) || this;
    }

    var _proto = CubeStripRenderer.prototype;

    _proto.getVertexShaderSource = function getVertexShaderSource() {
      return "\n\t\t\tattribute vec3 aVertexPosition;\n\t\t\tattribute vec2 aTextureCoord;\n\t\t\tuniform mat4 uMVMatrix;\n\t\t\tuniform mat4 uPMatrix;\n\t\t\tvarying highp vec2 vTextureCoord;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\t\t\t\tvTextureCoord = aTextureCoord;\n\t\t\t}";
    };

    _proto.getFragmentShaderSource = function getFragmentShaderSource() {
      return "\n\t\t\t#define PI 3.14159265359\n\n\t\t\tprecision mediump float;\n\t\t\tvarying highp vec2 vTextureCoord;\n\t\t\tuniform sampler2D uSampler;\n\t\t\tuniform bool uIsEAC;\n\n\t\t\tconst vec2 OPERATE_COORDS_RANGE = vec2(-1.0, 1.0);\n\t\t\tconst vec2 TEXTURE_COORDS_RANGE = vec2(0.0, 1.0);\n\t\t\t// vector type is used for initializing values instead of array.\n\t\t\tconst vec4 TEXTURE_DIVISION_X = vec4(0.0, 1.0 / 3.0, 2.0 / 3.0, 1.0);\n\t\t\tconst vec3 TEXTURE_DIVISION_Y = vec3(0.0, 1.0 / 2.0, 1.0);\n\t\t\tconst float EAC_CONST = 2.0 / PI;\n\n\t\t\tfloat scale(vec2 domainRange, vec2 targetRange, float val) {\n\t\t\t\tfloat unit = 1.0 / (domainRange[1] - domainRange[0]);\n\t\t\t\treturn targetRange[0] + (targetRange[1] - targetRange[0]) * (val - domainRange[0]) * unit;\n\t\t\t}\n\n\t\t\tvoid main(void) {\n\t\t\t\tfloat transformedCoordX;\n\t\t\t\tfloat transformedCoordY;\n\n\t\t\t\tif (uIsEAC) {\n\t\t\t\t\tvec2 orgTextureRangeX;\n\t\t\t\t\tvec2 orgTextureRangeY;\n\n\t\t\t\t\t// Apply EAC transform\n\t\t\t\t\tif (vTextureCoord.s >= TEXTURE_DIVISION_X[2]) {\n\t\t\t\t\t\torgTextureRangeX = vec2(TEXTURE_DIVISION_X[2], TEXTURE_DIVISION_X[3]);\n\t\t\t\t\t} else if (vTextureCoord.s >= TEXTURE_DIVISION_X[1]) {\n\t\t\t\t\t\torgTextureRangeX = vec2(TEXTURE_DIVISION_X[1], TEXTURE_DIVISION_X[2]);\n\t\t\t\t\t} else {\n\t\t\t\t\t\torgTextureRangeX = vec2(TEXTURE_DIVISION_X[0], TEXTURE_DIVISION_X[1]);\n\t\t\t\t\t}\n\n\t\t\t\t\tif (vTextureCoord.t >= TEXTURE_DIVISION_Y[1]) {\n\t\t\t\t\t\torgTextureRangeY = vec2(TEXTURE_DIVISION_Y[1], TEXTURE_DIVISION_Y[2]);\n\t\t\t\t\t} else {\n\t\t\t\t\t\torgTextureRangeY = vec2(TEXTURE_DIVISION_Y[0], TEXTURE_DIVISION_Y[1]);\n\t\t\t\t\t}\n\n\t\t\t\t\t// scaling coors by the coordinates following the range from -1.0 to 1.0.\n\t\t\t\t\tfloat px = scale(orgTextureRangeX, OPERATE_COORDS_RANGE, vTextureCoord.s);\n\t\t\t\t\tfloat py = scale(orgTextureRangeY, OPERATE_COORDS_RANGE, vTextureCoord.t);\n\n\t\t\t\t\tfloat qu = EAC_CONST * atan(px) + 0.5;\n\t\t\t\t\tfloat qv = EAC_CONST * atan(py) + 0.5;\n\n\t\t\t\t\t// re-scaling coors by original coordinates ranges\n\t\t\t\t\ttransformedCoordX = scale(TEXTURE_COORDS_RANGE, orgTextureRangeX, qu);\n\t\t\t\t\ttransformedCoordY = scale(TEXTURE_COORDS_RANGE, orgTextureRangeY, qv);\n\t\t\t\t} else {\n\t\t\t\t\t// normal cubemap\n\t\t\t\t\ttransformedCoordX = vTextureCoord.s;\n\t\t\t\t\ttransformedCoordY = vTextureCoord.t;\n\t\t\t\t}\n\n\t\t\t\tgl_FragColor = texture2D(uSampler, vec2(transformedCoordX, transformedCoordY));\n\t\t\t}";
    };

    _proto.getVertexPositionData = function getVertexPositionData() {
      if (!this._vertices) {
        this._vertices = [// back
        1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1, // front
        -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, // up
        -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, // down
        -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1, // right
        1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, -1, // left
        -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1];
      }

      return this._vertices;
    };

    _proto.getIndexData = function getIndexData() {
      var _this = this;

      // TODO: 한번만 계산하도록 수정하기
      var indices = function () {
        var indexData = [];

        for (var i = 0; i < _this._vertices.length / 3; i += 4) {
          indexData.push(i, i + 1, i + 2, i, i + 2, i + 3);
        }

        return indexData;
      }();

      return indices;
    };

    _proto.getTextureCoordData = function getTextureCoordData(imageConfig) {
      var _this2 = this;

      // TODO: make it cols, rows as config.
      var cols = 3;
      var rows = 2;
      var order = imageConfig.order || "RLUDFB";
      var coords = []; // 텍스쳐의 좌표는 윗쪽이 큰 값을 가지므로 row 는 역순으로 넣는다.

      for (var r = rows - 1; r >= 0; r--) {
        for (var c = 0; c < cols; c++) {
          var coord = [c / cols, r / rows, (c + 1) / cols, r / rows, (c + 1) / cols, (r + 1) / rows, c / cols, (r + 1) / rows];
          coords.push(coord);
        }
      }

      var tileConfigs = this._extractTileConfig(imageConfig); // Transform Coord By Flip & Rotation


      coords = coords // shrink coord to avoid pixel bleeding
      .map(function (coord) {
        return _this2._shrinkCoord(coord);
      }).map(function (coord, i) {
        return _this2._transformCoord(coord, tileConfigs[i]);
      }); // vertices 에서 지정된 순서대로 그대로 그리기 위해 vertex 의 순서를 BFUDRL 로 재배치

      return "BFUDRL".split("").map(function (face) {
        return order.indexOf(face);
      }).map(function (index) {
        return coords[index];
      }).reduce(function (acc, val) {
        return acc.concat(val);
      }, []);
    };

    _proto.updateTexture = function updateTexture(gl, image) {
      WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
    };

    _proto.bindTexture = function bindTexture(gl, texture, image) {
      // Make sure image isn't too big
      var _this$getDimension = this.getDimension(image),
          width = _this$getDimension.width,
          height = _this$getDimension.height;

      var size = Math.max(width, height);
      var maxSize = WebGLUtils.getMaxTextureSize(gl);

      if (size > maxSize) {
        this._triggerError("Image width(" + width + ") exceeds device limit(" + maxSize + "))");

        return;
      } // Pixel Source for IE11 & Video


      this._initPixelSource(image);

      gl.activeTexture(gl.TEXTURE0);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      this.updateTexture(gl, image);
    };

    _proto._transformCoord = function _transformCoord(coord, tileConfig) {
      var newCoord = coord.slice();

      if (tileConfig.flipHorizontal) {
        newCoord = this._flipHorizontalCoord(newCoord);
      }

      if (tileConfig.rotation) {
        newCoord = this._rotateCoord(newCoord, tileConfig.rotation);
      }

      return newCoord;
    };

    _proto._shrinkCoord = function _shrinkCoord(coord) {
      var SHRINK_Y = 0.00;
      var SHRINK_X = 0.00;
      return [coord[0] + SHRINK_X, coord[1] + SHRINK_Y, coord[2] - SHRINK_X, coord[3] + SHRINK_Y, coord[4] - SHRINK_X, coord[5] - SHRINK_Y, coord[6] + SHRINK_X, coord[7] - SHRINK_Y];
    };

    _proto._rotateCoord = function _rotateCoord(coord, rotationAngle) {
      var SIZE = 2; // coord means x,y coordinates. Two values(x, y) makes a one coord.

      var shiftCount = parseInt(rotationAngle / 90, 10) % 4;

      if (shiftCount === 0) {
        return coord;
      }

      var moved;
      var rotatedCoord = [];

      if (shiftCount > 0) {
        moved = coord.splice(0, shiftCount * SIZE);
        rotatedCoord = coord.concat(moved);
      } else {
        moved = coord.splice((4 + shiftCount) * SIZE, -shiftCount * SIZE);
        rotatedCoord = moved.concat(coord);
      }

      return rotatedCoord;
    };

    _proto._flipHorizontalCoord = function _flipHorizontalCoord(coord) {
      return [coord[2], coord[3], coord[0], coord[1], coord[6], coord[7], coord[4], coord[5]];
    };

    return CubeStripRenderer;
  }(Renderer);

  var latitudeBands = 60;
  var longitudeBands = 60;
  var radius = 2;
  var ANGLE_CORRECTION_FOR_CENTER_ALIGN = -0.5 * Math.PI;
  var textureCoordData = [];
  var vertexPositionData = [];
  var indexData = [];
  var latIdx;
  var lngIdx;

  for (latIdx = 0; latIdx <= latitudeBands; latIdx++) {
    var theta = (latIdx / latitudeBands - 0.5) * Math.PI;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (lngIdx = 0; lngIdx <= longitudeBands; lngIdx++) {
      var phi = (lngIdx / longitudeBands - 0.5) * 2 * Math.PI + ANGLE_CORRECTION_FOR_CENTER_ALIGN;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      var x = cosPhi * cosTheta;
      var y = sinTheta;
      var z = sinPhi * cosTheta;
      var u = lngIdx / longitudeBands;
      var v = latIdx / latitudeBands;
      textureCoordData.push(u, v);
      vertexPositionData.push(radius * x, radius * y, radius * z);

      if (lngIdx !== longitudeBands && latIdx !== latitudeBands) {
        var a = latIdx * (longitudeBands + 1) + lngIdx;
        var b = a + longitudeBands + 1;
        indexData.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  }

  var SphereRenderer =
  /*#__PURE__*/
  function () {
    var SphereRenderer =
    /*#__PURE__*/
    function (_Renderer) {
      _inheritsLoose(SphereRenderer, _Renderer);

      function SphereRenderer(config) {
        var _this;

        _this = _Renderer.call(this) || this;
        _this._isStereoscopic = config && config.isStereoscopic || false;
        return _this;
      }

      var _proto = SphereRenderer.prototype;

      _proto.getVertexPositionData = function getVertexPositionData() {
        return SphereRenderer._VERTEX_POSITION_DATA;
      };

      _proto.getIndexData = function getIndexData() {
        return SphereRenderer._INDEX_DATA;
      };

      _proto.getTextureCoordData = function getTextureCoordData() {
        if (this._isStereoscopic) {
          // Use vertical half size of image.
          return SphereRenderer._TEXTURE_COORD_DATA.map(function (value, index) {
            return index % 2 === 1 ? value / 2 : value;
          });
        }

        return SphereRenderer._TEXTURE_COORD_DATA;
      };

      _proto.getVertexShaderSource = function getVertexShaderSource() {
        return "\n\t\t\tattribute vec3 aVertexPosition;\n\t\t\tattribute vec2 aTextureCoord;\n\t\t\tuniform mat4 uMVMatrix;\n\t\t\tuniform mat4 uPMatrix;\n\t\t\tvarying highp vec2 vTextureCoord;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\t\t\t\tvTextureCoord = aTextureCoord;\n\t\t\t}";
      };

      _proto.getFragmentShaderSource = function getFragmentShaderSource() {
        return "\n\t\t\tvarying highp vec2 vTextureCoord;\n\t\t\tuniform sampler2D uSampler;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_FragColor = texture2D(\n\t\t\t\t\tuSampler,\n\t\t\t\t\tvec2(vTextureCoord.s, vTextureCoord.t)\n\t\t\t\t);\n\t\t\t}";
      };

      _proto.updateTexture = function updateTexture(gl, image) {
        WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
      };

      _proto.bindTexture = function bindTexture(gl, texture, image) {
        // Make sure image isn't too big
        var _this$getDimension = this.getDimension(image),
            width = _this$getDimension.width,
            height = _this$getDimension.height;

        var size = Math.max(width, height);
        var maxSize = WebGLUtils.getMaxTextureSize(gl);

        if (size > maxSize) {
          this._triggerError("Image width(" + width + ") exceeds device limit(" + maxSize + "))");

          return;
        } // Pixel Source for IE11 & Video


        this._initPixelSource(image);

        gl.activeTexture(gl.TEXTURE0);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        this.updateTexture(gl, image);
      };

      return SphereRenderer;
    }(Renderer);

    SphereRenderer._VERTEX_POSITION_DATA = vertexPositionData;
    SphereRenderer._TEXTURE_COORD_DATA = textureCoordData;
    SphereRenderer._INDEX_DATA = indexData;
    return SphereRenderer;
  }();

  var MIN_ASPECT_RATIO_FOR_FULL_PANORAMA = 6;
  var longitudeBands$1 = 60;
  var textureCoordData$1 = [];
  var vertexPositionData$1 = [];
  var indexData$1 = [];

  var CylinderRenderer =
  /*#__PURE__*/
  function () {
    var CylinderRenderer =
    /*#__PURE__*/
    function (_Renderer) {
      _inheritsLoose(CylinderRenderer, _Renderer);

      function CylinderRenderer() {
        return _Renderer.apply(this, arguments) || this;
      }

      var _proto = CylinderRenderer.prototype;

      _proto.getVertexPositionData = function getVertexPositionData() {
        return CylinderRenderer._VERTEX_POSITION_DATA;
      };

      _proto.getIndexData = function getIndexData() {
        return CylinderRenderer._INDEX_DATA;
      };

      _proto.getTextureCoordData = function getTextureCoordData() {
        return CylinderRenderer._TEXTURE_COORD_DATA;
      };

      _proto.getVertexShaderSource = function getVertexShaderSource() {
        return "\n\t\t\tattribute vec3 aVertexPosition;\n\t\t\tattribute vec2 aTextureCoord;\n\t\t\tuniform mat4 uMVMatrix;\n\t\t\tuniform mat4 uPMatrix;\n\t\t\tvarying highp vec2 vTextureCoord;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\t\t\t\tvTextureCoord = aTextureCoord;\n\t\t\t}";
      };

      _proto.getFragmentShaderSource = function getFragmentShaderSource() {
        return "\n\t\t\tvarying highp vec2 vTextureCoord;\n\t\t\tuniform sampler2D uSampler;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_FragColor = texture2D(\n\t\t\t\t\tuSampler,\n\t\t\t\t\tvec2(vTextureCoord.s, vTextureCoord.t)\n\t\t\t\t);\n\t\t\t}";
      };

      _proto.updateTexture = function updateTexture(gl, image) {
        WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
      };

      _proto.bindTexture = function bindTexture(gl, texture, image) {
        // Make sure image isn't too big
        var _this$getDimension = this.getDimension(image),
            width = _this$getDimension.width,
            height = _this$getDimension.height;

        var size = Math.max(width, height);
        var maxSize = WebGLUtils.getMaxTextureSize(gl);
        var resizeDimension;

        if (size > maxSize) {
          this._triggerError("Image width(" + width + ") exceeds device texture limit(" + maxSize + "))"); // Request resizing texture.

          /**
           * TODO: Is it need to apply on another projection type?
           */


          resizeDimension = width > height ? {
            width: maxSize,
            height: maxSize * height / width
          } : {
            width: maxSize * width / height,
            height: maxSize
          };
        } // Pixel Source for IE11 & Video or resizing needed


        this._initPixelSource(image, resizeDimension);

        gl.activeTexture(gl.TEXTURE0);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        this.updateTexture(gl, image);
      };

      _proto.updateShaderData = function updateShaderData(_ref) {
        var _ref$imageAspectRatio = _ref.imageAspectRatio,
            imageAspectRatio = _ref$imageAspectRatio === void 0 ? MIN_ASPECT_RATIO_FOR_FULL_PANORAMA : _ref$imageAspectRatio;
        var lngIdx;
        var cylinderMaxRadian;
        var halfCylinderY;
        var rotated;
        var aspectRatio; // Exception case: orientation is rotated.

        if (imageAspectRatio < 1) {
          /**
           * If rotated is true, we assume that image is rotated counter clockwise.
           * TODO: If there's other rotation, it is need to implement by each rotation.
           */
          rotated = true;
          aspectRatio = 1 / imageAspectRatio;
        } else {
          rotated = false;
          aspectRatio = imageAspectRatio;
        }

        if (aspectRatio >= MIN_ASPECT_RATIO_FOR_FULL_PANORAMA) {
          var fov = 360 / aspectRatio;
          cylinderMaxRadian = 2 * Math.PI; // 360 deg

          halfCylinderY = Math.tan(glMatrix.toRadian(fov / 2));
        } else {
          cylinderMaxRadian = aspectRatio;
          halfCylinderY = 0.5; // Range of cylinder is [-0.5, 0.5] to make height to 1.
        } // intialize shader data before update


        textureCoordData$1.length = 0;
        vertexPositionData$1.length = 0;
        indexData$1.length = 0;
        var CYLIDER_Y = [-halfCylinderY, halfCylinderY];
        var startAngleForCenterAlign = Math.PI / 2 + (2 * Math.PI - cylinderMaxRadian) / 2; // Math.PI / 2 start point when cylinderMaxRadian is 2 phi(360)
        // console.log("cylinderMaxRadian:", glMatrix.toDegree(cylinderMaxRadian), "CYLIDER_Y", CYLIDER_Y, "start angle", glMatrix.toDegree(startAngleForCenterAlign));

        for (var yIdx = 0, yLength = CYLIDER_Y.length; yIdx < yLength
        /* bottom & top */
        ; yIdx++) {
          for (lngIdx = 0; lngIdx <= longitudeBands$1; lngIdx++) {
            var angle = startAngleForCenterAlign + lngIdx / longitudeBands$1 * cylinderMaxRadian;
            var x = Math.cos(angle);
            var y = CYLIDER_Y[yIdx];
            var z = Math.sin(angle);
            var u = void 0;
            var v = void 0;

            if (rotated) {
              // Rotated 90 degree (counter clock wise)
              u = 1 - yIdx; // yLength - yIdx;

              v = lngIdx / longitudeBands$1;
            } else {
              // 	// Normal case (Not rotated)
              u = lngIdx / longitudeBands$1;
              v = yIdx;
            }

            textureCoordData$1.push(u, v);
            vertexPositionData$1.push(x, y, z);

            if (yIdx === 0 && lngIdx < longitudeBands$1) {
              var a = lngIdx;
              var b = a + longitudeBands$1 + 1;
              indexData$1.push(a, b, a + 1, b, b + 1, a + 1);
            }
          }
        }
      };

      return CylinderRenderer;
    }(Renderer);

    CylinderRenderer._VERTEX_POSITION_DATA = vertexPositionData$1;
    CylinderRenderer._TEXTURE_COORD_DATA = textureCoordData$1;
    CylinderRenderer._INDEX_DATA = indexData$1;
    return CylinderRenderer;
  }();

  /**
   * Constant value for gyro mode. <br>(Reference {@link https://github.com/naver/egjs-view360/wiki/PanoViewer-3.0-User-Guide})
   * @ko gyro 모드 대한 상수 값. <br>({@link https://github.com/naver/egjs-view360/wiki/PanoViewer-3.0-User-Guide} 참고)
   * @namespace
   * @name GYRO_MODE
   * @memberof eg.view360.PanoViewer
   */
  /**
   * Constant value for errors
   * @ko 에러에 대한 상수 값
   * @namespace
   * @name ERROR_TYPE
   * @memberof eg.view360.PanoViewer
   */

  var ERROR_TYPE = {
    /**
     * Unsupported device
     * @ko 미지원 기기
     * @name INVALID_DEVICE
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 10
     */
    INVALID_DEVICE: 10,

    /**
     * Webgl not support
     * @ko WEBGL 미지원
     * @name NO_WEBGL
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 11
     */
    NO_WEBGL: 11,

    /**
     * Failed to load image
     * @ko 이미지 로드 실패
     * @name FAIL_IMAGE_LOAD
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 12
     */
    FAIL_IMAGE_LOAD: 12,

    /**
     * Failed to bind texture
     * @ko 텍스쳐 바인딩 실패
     * @name FAIL_BIND_TEXTURE
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 13
     */
    FAIL_BIND_TEXTURE: 13,

    /**
     * Only one resource(image or video) should be specified
     * @ko 리소스 지정 오류 (image 혹은 video 중 하나만 지정되어야 함)
     * @name INVALID_RESOURCE
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 14
     */
    INVALID_RESOURCE: 14,

    /**
     * WebGL context lost occurred
     * @ko WebGL context lost 발생
     * @name RENDERING_CONTEXT_LOST
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 15
     */
    RENDERING_CONTEXT_LOST: 15
  };
  /**
   * Constant value for events
   * @ko 이벤트에 대한 상수 값
   * @namespace
   * @name EVENTS
   * @memberof eg.view360.PanoViewer
   */

  var EVENTS$1 = {
    /**
     * Events that is fired when PanoViewer is ready to show image and handle user interaction.
     * @ko PanoViewer 가 사용자의 인터렉션 및 렌더링이 준비되상태에 발생하는 이벤트
     * @name READY
     * @memberof eg.view360.PanoViewer.EVENTS
     * @constant
     * @type {String}
     * @default ready
     */
    READY: "ready",

    /**
     * Events that is fired when direction or fov is changed.
     * @ko PanoViewer 에서 바라보고 있는 방향이나 FOV(화각)가 변경되었을때 발생하는 이벤트
     * @name VIEW_CHANGE
     * @memberof eg.view360.PanoViewer.EVENTS
     * @constant
     * @type {String}
     * @default viewChange
     */
    VIEW_CHANGE: "viewChange",

    /**
     * Events that is fired when animation which is triggered by inertia is ended.
     * @ko 관성에 의한 애니메이션 동작이 완료되었을때 발생하는 이벤트
     * @name ANIMATION_END
     * @memberof eg.view360.PanoViewer.EVENTS
     * @constant
     * @type {String}
     * @default animationEnd
     */
    ANIMATION_END: "animationEnd",

    /**
     * Events that is fired when error occurs
     * @ko 에러 발생 시 발생하는 이벤트
     * @name ERROR
     * @memberof eg.view360.PanoViewer.EVENTS
     * @constant
     * @type {String}
     * @default error
     */
    ERROR: "error"
  };
  /**
   * Constant value for projection type
   * @ko 프로젝션 타입 대한 상수 값
   * @namespace
   * @name PROJECTION_TYPE
   * @memberof eg.view360.PanoViewer
   */

  var PROJECTION_TYPE = {
    /**
     * Constant value for equirectangular type.
     * @ko equirectangular 에 대한 상수 값.
     * @name EQUIRECTANGULAR
     * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
     * @constant
     * @type {String}
     * @default equirectangular
     */
    EQUIRECTANGULAR: "equirectangular",

    /**
     * Constant value for cubemap type.
     * @ko cubemap 에 대한 상수 값.
     * @name CUBEMAP
     * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
     * @constant
     * @type {String}
     * @default cubemap
     */
    CUBEMAP: "cubemap",

    /**
     * Constant value for cubestrip type.
     * Cubestrip is a format for a single image with a combination of six cube faces. It is almost identical to cubemap, but it is implemented in a different way. It aims at better performance and efficiency. In addition, it automatically detects and supports EAC.
     *
     * @ko cubemap 에 대한 상수 값.Cubestrip 은 cube 면이 6개가 조합된 조합을 한장의 이미지를 위한 포맷이다. cubemap 과 사용방법이 거의 동일하지만 다른 방식으로 구현되었다. 보다 좋은 성능과 효율성을 목적으로 한다. 더불어 자동으로 EAC 를 감지하고 지원한다.
     * @name CUBESTRIP
     * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
     * @constant
     * @type {String}
     * @default cubestrip
     */
    CUBESTRIP: "cubestrip",

    /**
     * Constant value for PANORAMA type.
     *
     * PANORAMA is a format for a panorma image which is taken from smartphone.
     *
     * @ko PANORAMA 에 대한 상수값. 파노라마는 스마트 폰에서 가져온 파노라마 이미지의 형식입니다.
     *
     * @name PANORAMA
     * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
     * @constant
     * @type {String}
     * @default panorama
     */
    PANORAMA: "panorama",

    /**
     * Constant value for EQUI_STEREOSCOPY type.
     *
     * Constant value for EQUI_STEREOSCOPY. Stereoscopy image format of EQUIRECTANGULAR. It is an experimental function to show a stereoscopic type equirectangular image on a plane. It does not support stereoscopic viewing function through special visual equipment at present.
     *
     * @ko EQUI_STEREOSCOPY 에 대한 상수값. EQUIRECTANGULAR 의 Stereoscopy 이미지 형식입니다. Stereoscopic 형태의 equirectangular 이미지를 평면에 보여주기 위한 실험적인 기능으로 현재는 특수한 시각 장비를 통한 입체적인 보기 기능은 지원하지 않습니다.
     *
     * @name PANORAMA
     * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
     * @constant
     * @type {String}
     * @default stereoequi
     */
    STEREOSCOPIC_EQUI: "stereoequi"
  };

  var _Promise$2 = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;
  var ImageType = PROJECTION_TYPE;
  var DEVICE_PIXEL_RATIO = devicePixelRatio || 1; // DEVICE_PIXEL_RATIO 가 2를 초과하는 경우는 리소스 낭비이므로 2로 맞춘다.

  if (DEVICE_PIXEL_RATIO > 2) {
    DEVICE_PIXEL_RATIO = 2;
  } // define custom events name

  /**
   * TODO: how to manage events/errortype with PanoViewer
   *
   * I think renderer events should be seperated from viewer events although it has same name.
   */


  var EVENTS$2 = {
    BIND_TEXTURE: "bindTexture",
    IMAGE_LOADED: "imageLoaded",
    ERROR: "error",
    RENDERING_CONTEXT_LOST: "renderingContextLost",
    RENDERING_CONTEXT_RESTORE: "renderingContextRestore"
  };
  var ERROR_TYPE$1 = {
    INVALID_DEVICE: 10,
    NO_WEBGL: 11,
    FAIL_IMAGE_LOAD: 12,
    RENDERER_ERROR: 13
  };

  var PanoImageRenderer =
  /*#__PURE__*/
  function () {
    var PanoImageRenderer =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(PanoImageRenderer, _Component);

      function PanoImageRenderer(image, width, height, isVideo, sphericalConfig, renderingContextAttributes) {
        var _this;

        // Super constructor
        _this = _Component.call(this) || this;
        _this.sphericalConfig = sphericalConfig;
        _this.fieldOfView = sphericalConfig.fieldOfView;
        _this.width = width;
        _this.height = height;
        _this._lastQuaternion = null;
        _this._lastYaw = null;
        _this._lastPitch = null;
        _this._lastFieldOfView = null;
        _this.pMatrix = mat4.create();
        _this.mvMatrix = mat4.create(); // initialzie pMatrix

        mat4.perspective(_this.pMatrix, glMatrix.toRadian(_this.fieldOfView), width / height, 0.1, 100);
        _this.textureCoordBuffer = null;
        _this.vertexBuffer = null;
        _this.indexBuffer = null;
        _this.canvas = _this._initCanvas(width, height);
        _this._renderingContextAttributes = renderingContextAttributes;
        _this._image = null;
        _this._imageConfig = null;
        _this._imageIsReady = false;
        _this._shouldForceDraw = false;
        _this._keepUpdate = false; // Flag to specify 'continuous update' on video even when still.

        _this._onContentLoad = _this._onContentLoad.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this._onContentError = _this._onContentError.bind(_assertThisInitialized(_assertThisInitialized(_this)));

        if (image) {
          _this.setImage({
            image: image,
            imageType: sphericalConfig.imageType,
            isVideo: isVideo,
            cubemapConfig: sphericalConfig.cubemapConfig
          });
        }

        return _this;
      }

      var _proto = PanoImageRenderer.prototype;

      _proto.getContent = function getContent() {
        return this._image;
      };

      _proto.setImage = function setImage(_ref) {
        var image = _ref.image,
            imageType = _ref.imageType,
            _ref$isVideo = _ref.isVideo,
            isVideo = _ref$isVideo === void 0 ? false : _ref$isVideo,
            cubemapConfig = _ref.cubemapConfig;
        this._imageIsReady = false;
        this._isVideo = isVideo;
        this._imageConfig = _extends({
          /* RLUDBF is abnormal, we use it on CUBEMAP only */
          order: imageType === ImageType.CUBEMAP ? "RLUDBF" : "RLUDFB",
          tileConfig: {
            flipHirozontal: false,
            rotation: 0
          }
        }, cubemapConfig);

        this._setImageType(imageType);

        if (this._contentLoader) {
          this._contentLoader.destroy();
        }

        if (isVideo) {
          this._contentLoader = new VideoLoader();
          this._keepUpdate = true;
        } else {
          this._contentLoader = new ImageLoader();
          this._keepUpdate = false;
        } // img element or img url


        this._contentLoader.set(image); // 이미지의 사이즈를 캐시한다.
        // image is reference for content in contentLoader, so it may be not valid if contentLoader is destroyed.


        this._image = this._contentLoader.getElement();
        return this._contentLoader.get().then(this._onContentLoad, this._onContentError)["catch"](function (e) {
          return setTimeout(function () {
            throw e;
          });
        }); // Prevent exceptions from being isolated in promise chain.
      };

      _proto._setImageType = function _setImageType(imageType) {
        var _this2 = this;

        if (!imageType || this._imageType === imageType) {
          return;
        }

        this._imageType = imageType;
        this._isCubeMap = imageType === ImageType.CUBEMAP;

        if (this._renderer) {
          this._renderer.off();
        }

        switch (imageType) {
          case ImageType.CUBEMAP:
            this._renderer = new CubeRenderer();
            break;

          case ImageType.CUBESTRIP:
            this._renderer = new CubeStripRenderer();
            break;

          case ImageType.PANORAMA:
            this._renderer = new CylinderRenderer();
            break;

          case ImageType.STEREOSCOPIC_EQUI:
            this._renderer = new SphereRenderer({
              isStereoscopic: true
            });
            break;

          default:
            this._renderer = new SphereRenderer();
            break;
        }

        this._renderer.on(Renderer.EVENTS.ERROR, function (e) {
          _this2.trigger(EVENTS$2.ERROR, {
            type: ERROR_TYPE$1.RENDERER_ERROR,
            message: e.message
          });
        });

        this._initWebGL();
      };

      _proto._initCanvas = function _initCanvas(width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.style.bottom = 0;
        canvas.style.left = 0;
        canvas.style.right = 0;
        canvas.style.top = 0;
        canvas.style.margin = "auto";
        canvas.style.maxHeight = "100%";
        canvas.style.maxWidth = "100%";
        canvas.style.outline = "none";
        canvas.style.position = "absolute";
        this._onWebglcontextlost = this._onWebglcontextlost.bind(this);
        this._onWebglcontextrestored = this._onWebglcontextrestored.bind(this);
        canvas.addEventListener("webglcontextlost", this._onWebglcontextlost);
        canvas.addEventListener("webglcontextrestored", this._onWebglcontextrestored);
        return canvas;
      };

      _proto._onContentError = function _onContentError(error) {
        this._imageIsReady = false;
        this._image = null;
        this.trigger(EVENTS$2.ERROR, {
          type: ERROR_TYPE$1.FAIL_IMAGE_LOAD,
          message: "failed to load image"
        });
        return false;
      };

      _proto._triggerContentLoad = function _triggerContentLoad() {
        this.trigger(EVENTS$2.IMAGE_LOADED, {
          content: this._image,
          isVideo: this._isVideo,
          projectionType: this._imageType
        });
      };

      _proto._onContentLoad = function _onContentLoad(image) {
        this._imageIsReady = true;

        this._triggerContentLoad();

        return true;
      };

      _proto.isImageLoaded = function isImageLoaded() {
        return !!this._image && this._imageIsReady && (!this._isVideo || this._image.readyState >= 2
        /* HAVE_CURRENT_DATA */
        );
      };

      _proto.bindTexture = function bindTexture() {
        var _this3 = this;

        return new _Promise$2(function (res, rej) {
          if (!_this3._contentLoader) {
            rej("ImageLoader is not initialized");
            return;
          }

          _this3._contentLoader.get().then(function () {
            return _this3._bindTexture();
          }, rej).then(res);
        });
      }; // 부모 엘리먼트에 canvas 를 붙임


      _proto.attachTo = function attachTo(parentElement) {
        this.detach();
        parentElement.appendChild(this.canvas);
      };

      _proto.forceContextLoss = function forceContextLoss() {
        if (this.hasRenderingContext()) {
          var loseContextExtension = this.context.getExtension("WEBGL_lose_context");

          if (loseContextExtension) {
            loseContextExtension.loseContext();
          }
        }
      }; // 부모 엘리먼트에서 canvas 를 제거


      _proto.detach = function detach() {
        if (this.canvas.parentElement) {
          this.canvas.parentElement.removeChild(this.canvas);
        }
      };

      _proto.destroy = function destroy() {
        if (this._contentLoader) {
          this._contentLoader.destroy();
        }

        this.detach();
        this.forceContextLoss();
        this.off();
        this.canvas.removeEventListener("webglcontextlost", this._onWebglcontextlost);
        this.canvas.removeEventListener("webglcontextrestored", this._onWebglcontextrestored);
      };

      _proto.hasRenderingContext = function hasRenderingContext() {
        if (!(this.context && !this.context.isContextLost())) {
          return false;
        } else if (this.context && !this.context.getProgramParameter(this.shaderProgram, this.context.LINK_STATUS)) {
          return false;
        }

        return true;
      };

      _proto._onWebglcontextlost = function _onWebglcontextlost(e) {
        e.preventDefault();
        this.trigger(EVENTS$2.RENDERING_CONTEXT_LOST);
      };

      _proto._onWebglcontextrestored = function _onWebglcontextrestored(e) {
        this._initWebGL();

        this.trigger(EVENTS$2.RENDERING_CONTEXT_RESTORE);
      };

      _proto.updateFieldOfView = function updateFieldOfView(fieldOfView) {
        this.fieldOfView = fieldOfView;

        this._updateViewport();
      };

      _proto.updateViewportDimensions = function updateViewportDimensions(width, height) {
        var viewPortChanged = false;
        this.width = width;
        this.height = height;
        var w = width * DEVICE_PIXEL_RATIO;
        var h = height * DEVICE_PIXEL_RATIO;

        if (w !== this.canvas.width) {
          this.canvas.width = w;
          viewPortChanged = true;
        }

        if (h !== this.canvas.height) {
          this.canvas.height = h;
          viewPortChanged = true;
        }

        if (!viewPortChanged) {
          return;
        }

        this._updateViewport();

        this._shouldForceDraw = true;
      };

      _proto._updateViewport = function _updateViewport() {
        mat4.perspective(this.pMatrix, glMatrix.toRadian(this.fieldOfView), this.canvas.width / this.canvas.height, 0.1, 100);
        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
      };

      _proto._initWebGL = function _initWebGL() {
        var gl; // TODO: Following code does need to be executed only if width/height, cubicStrip property is changed.

        try {
          this._initRenderingContext();

          gl = this.context;
          this.updateViewportDimensions(this.width, this.height);

          if (this.shaderProgram) {
            gl.deleteProgram(this.shaderProgram);
          }

          this.shaderProgram = this._initShaderProgram(gl);

          if (!this.shaderProgram) {
            throw new Error("Failed to intialize shaders: " + WebGLUtils.getErrorNameFromWebGLErrorCode(gl.getError()));
          }
        } catch (e) {
          this.trigger(EVENTS$2.ERROR, {
            type: ERROR_TYPE$1.NO_WEBGL,
            message: "no webgl support"
          });
          this.destroy();
          console.error(e); // eslint-disable-line no-console

          return;
        } // 캔버스를 투명으로 채운다.


        gl.clearColor(0, 0, 0, 0);
        var textureTarget = this._isCubeMap ? gl.TEXTURE_CUBE_MAP : gl.TEXTURE_2D;

        if (this.texture) {
          gl.deleteTexture(this.texture);
        }

        this.texture = WebGLUtils.createTexture(gl, textureTarget);

        if (this._imageType === ImageType.CUBESTRIP) {
          // TODO: Apply following options on other projection type.
          gl.enable(gl.CULL_FACE); // gl.enable(gl.DEPTH_TEST);
        }
      };

      _proto._initRenderingContext = function _initRenderingContext() {
        if (this.hasRenderingContext()) {
          return;
        }

        if (!window.WebGLRenderingContext) {
          throw new Error("WebGLRenderingContext not available.");
        }

        this.context = WebGLUtils.getWebglContext(this.canvas, this._renderingContextAttributes);

        if (!this.context) {
          throw new Error("Failed to acquire 3D rendering context");
        }
      };

      _proto._initShaderProgram = function _initShaderProgram(gl) {
        var vertexShaderSource = this._renderer.getVertexShaderSource();

        var vertexShader = WebGLUtils.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

        if (!vertexShader) {
          return false;
        }

        var fragmentShaderSource = this._renderer.getFragmentShaderSource();

        var fragmentShader = WebGLUtils.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        if (!fragmentShader) {
          return false;
        }

        var shaderProgram = WebGLUtils.createProgram(gl, vertexShader, fragmentShader);

        if (!shaderProgram) {
          return null;
        }

        gl.useProgram(shaderProgram);
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute); // clear buffer

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT); // Use TEXTURE0

        gl.uniform1i(shaderProgram.samplerUniform, 0);
        return shaderProgram;
      };

      _proto._initBuffers = function _initBuffers() {
        var vertexPositionData = this._renderer.getVertexPositionData();

        var indexData = this._renderer.getIndexData();

        var textureCoordData = this._renderer.getTextureCoordData(this._imageConfig);

        var gl = this.context;
        this.vertexBuffer = WebGLUtils.initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), 3, this.shaderProgram.vertexPositionAttribute);
        this.indexBuffer = WebGLUtils.initBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), 1);
        this.textureCoordBuffer = WebGLUtils.initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(textureCoordData), this._isCubeMap ? 3 : 2, this.shaderProgram.textureCoordAttribute);
      };

      _proto._bindTexture = function _bindTexture() {
        // Detect if it is EAC Format while CUBESTRIP mode.
        // We assume it is EAC if image is not 3/2 ratio.
        if (this._imageType === ImageType.CUBESTRIP) {
          var _this$_renderer$getDi = this._renderer.getDimension(this._image),
              width = _this$_renderer$getDi.width,
              height = _this$_renderer$getDi.height;

          var isEAC = width && height && width / height !== 1.5;
          this.context.uniform1f(this.context.getUniformLocation(this.shaderProgram, "uIsEAC"), isEAC);
        } else if (this._imageType === ImageType.PANORAMA) {
          var _this$_renderer$getDi2 = this._renderer.getDimension(this._image),
              _width = _this$_renderer$getDi2.width,
              _height = _this$_renderer$getDi2.height;

          var imageAspectRatio = _width && _height && _width / _height;

          this._renderer.updateShaderData({
            imageAspectRatio: imageAspectRatio
          });
        } // intialize shader buffers after image is loaded.(by updateShaderData)
        // because buffer may be differ by image size.(eg. CylinderRenderer)


        this._initBuffers();

        this._renderer.bindTexture(this.context, this.texture, this._image, this._imageConfig);

        this._shouldForceDraw = true;
        this.trigger(EVENTS$2.BIND_TEXTURE);
      };

      _proto._updateTexture = function _updateTexture() {
        this._renderer.updateTexture(this.context, this._image, this._imageConfig);
      };

      _proto.keepUpdate = function keepUpdate(doUpdate) {
        if (doUpdate && this.isImageLoaded() === false) {
          // Force to draw a frame after image is loaded on render()
          this._shouldForceDraw = true;
        }

        this._keepUpdate = doUpdate;
      };

      _proto.renderWithQuaternion = function renderWithQuaternion(quaternion, fieldOfView) {
        if (!this.isImageLoaded()) {
          return;
        }

        if (this._keepUpdate === false && this._lastQuaternion && quat.exactEquals(this._lastQuaternion, quaternion) && this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
          return;
        } // updatefieldOfView only if fieldOfView is changed.


        if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
          this.updateFieldOfView(fieldOfView);
        }

        this.mvMatrix = mat4.fromQuat(mat4.create(), quaternion);

        this._draw();

        this._lastQuaternion = quat.clone(quaternion);

        if (this._shouldForceDraw) {
          this._shouldForceDraw = false;
        }
      };

      _proto.render = function render(yaw, pitch, fieldOfView) {
        if (!this.isImageLoaded()) {
          return;
        }

        if (this._keepUpdate === false && this._lastYaw !== null && this._lastYaw === yaw && this._lastPitch !== null && this._lastPitch === pitch && this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
          return;
        } // fieldOfView 가 존재하면서 기존의 값과 다를 경우에만 업데이트 호출


        if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
          this.updateFieldOfView(fieldOfView);
        }

        mat4.identity(this.mvMatrix);
        mat4.rotateX(this.mvMatrix, this.mvMatrix, -glMatrix.toRadian(pitch));
        mat4.rotateY(this.mvMatrix, this.mvMatrix, -glMatrix.toRadian(yaw));

        this._draw();

        this._lastYaw = yaw;
        this._lastPitch = pitch;

        if (this._shouldForceDraw) {
          this._shouldForceDraw = false;
        }
      };

      _proto._draw = function _draw() {
        var gl = this.context;
        gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
        gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);

        if (this._isVideo && this._keepUpdate) {
          this._updateTexture();
        }

        if (this.indexBuffer) {
          gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
      };
      /**
       * Returns projection renderer by each type
       */


      _proto.getProjectionRenderer = function getProjectionRenderer() {
        return this._renderer;
      };

      return PanoImageRenderer;
    }(Component);

    PanoImageRenderer.EVENTS = EVENTS$2;
    PanoImageRenderer.ERROR_TYPE = ERROR_TYPE$1;
    return PanoImageRenderer;
  }();

  var _Promise$3 = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

  var PanoViewer =
  /*#__PURE__*/
  function () {
    var PanoViewer =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(PanoViewer, _Component);

      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @type {String}
       * @example
       * eg.view360.PanoViewer.VERSION;  // ex) 3.0.1
       * @memberof eg.view360.PanoViewer
       */
      // It should be deprecated!

      /**
       * Constant value for touch directions
       * @ko 터치 방향에 대한 상수 값.
       * @namespace
       * @name TOUCH_DIRECTION
       * @memberof eg.view360.PanoViewer
       */

      /**
       * @classdesc 360 media viewer
       * @ko 360 미디어 뷰어
       * @class
       * @name eg.view360.PanoViewer
       * @extends eg.Component
       *
       * @param {HTMLElement} container The container element for the renderer. <ko>렌더러의 컨테이너 엘리먼트</ko>
       * @param {Object} config
       *
       * @param {String|Image} config.image Input image url or element (Use only image property or video property)<ko>입력 이미지 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정)</ko>
       * @param {String|HTMLVideoElement} config.video Input video url or element(Use only image property or video property)<ko>입력 비디오 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정)</ko>
       * @param {String} [config.projectionType=equirectangular] The type of projection: equirectangular, cubemap <br/>{@link eg.view360.PanoViewer.PROJECTION_TYPE}<ko>Projection 유형 : equirectangular, cubemap <br/>{@link eg.view360.PanoViewer.PROJECTION_TYPE}</ko>
       * @param {Object} config.cubemapConfig config cubemap projection layout. It is applied when projectionType is {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP} or {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBESTRIP}<ko>cubemap projection type 의 레이아웃을 설정한다. 이 설정은 ProjectionType 이 {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP} 혹은 {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBESTRIP} 인 경우에만 적용된다.</ko>
       * @param {Object} [config.cubemapConfig.order = "RLUDBF"(ProjectionType === CUBEMAP) | "RLUDFB" (ProjectionType === CUBESTRIP)] Order of cubemap faces <ko>Cubemap 형태의 이미지가 배치된 순서</ko>
       * @param {Object} [config.cubemapConfig.tileConfig = {flipHirozontal:false, rotation: 0}] Setting about rotation angle(degree) and whether to flip horizontal for each cubemap faces, if you put this object as a array, you can set each faces with different setting. For example, [{flipHorizontal:false, rotation:90}, {flipHorizontal: true, rotation: 180}, ...]<ko>각 Cubemap 면에 대한 회전 각도/좌우반전 여부 설정, 객체를 배열 형태로 지정하여 각 면에 대한 설정을 다르게 지정할 수도 있다. 예를 들어 [{flipHorizontal:false, rotation:90}, {flipHorizontal: true, rotation: 180}, ...]과 같이 지정할 수 있다.</ko>
       * @param {Number} [config.width=width of container] the viewer's width. (in px) <ko>뷰어의 너비 (px 단위)</ko>
       * @param {Number} [config.height=height of container] the viewer's height.(in px) <ko>뷰어의 높이 (px 단위)</ko>
       *
       * @param {Number} [config.yaw=0] Initial Yaw of camera (in degree) <ko>카메라의 초기 Yaw (degree 단위)</ko>
       * @param {Number} [config.pitch=0] Initial Pitch of camera (in degree) <ko>카메라의 초기 Pitch (degree 단위)</ko>
       * @param {Number} [config.fov=65] Initial vertical field of view of camera (in degree) <ko>카메라의 초기 수직 field of view (degree 단위)</ko>
       * @param {Boolean} [config.showPolePoint=false] If false, the pole is not displayed inside the viewport <ko>false 인 경우, 극점은 뷰포트 내부에 표시되지 않습니다</ko>
       * @param {Boolean} [config.useZoom=true] When true, enables zoom with the wheel and Pinch gesture <ko>true 일 때 휠 및 집기 제스춰로 확대 / 축소 할 수 있습니다.</ko>
       * @param {Boolean} [config.useKeyboard=true] When true, enables the keyboard move key control: awsd, arrow keys <ko>true 이면 키보드 이동 키 컨트롤을 활성화합니다: awsd, 화살표 키</ko>
       * @param {String} [config.gyroMode=yawPitch] Enables control through device motion. ("none", "yawPitch", "VR") <br/>{@link eg.view360.PanoViewer.GYRO_MODE} <ko>디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch", "VR") <br/>{@link eg.view360.PanoViewer.GYRO_MODE} </ko>
       * @param {Array} [config.yawRange=[-180, 180]] Range of controllable Yaw values <ko>제어 가능한 Yaw 값의 범위</ko>
       * @param {Array} [config.pitchRange=[-90, 90]] Range of controllable Pitch values <ko>제어 가능한 Pitch 값의 범위</ko>
       * @param {Array} [config.fovRange=[30, 110]] Range of controllable vertical field of view values <ko>제어 가능한 수직 field of view 값의 범위</ko>
       * @param {Number} [config.touchDirection= {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL}(6)] Direction of touch that can be controlled by user <br/>{@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>사용자가 터치로 조작 가능한 방향 <br/>{@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
       *
       * @example
       * // PanoViewer Creation
       * // create PanoViewer with option
       * var PanoViewer = eg.view360.PanoViewer;
       * // Area where the image will be displayed(HTMLElement)
       * var container = document.getElementById("myPanoViewer");
       *
       * var panoViewer = new PanoViewer(container, {
       *     // If projectionType is not specified, the default is "equirectangular".
       *     // Specifies an image of the "equirectangular" type.
       *     image: "/path/to/image/image.jpg"
       *});
       *
       * @example
       * // Cubemap Config Setting Example
       * // For support Youtube EAC projection, You should set cubemapConfig as follows.
       * cubemapConfig: {
       * 	order: "LFRDBU",
       * 	tileConfig: [
       * 		tileConfig: [{rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: -90}, {rotation: 180}]
       * 	]
       * }
       */
      function PanoViewer(container, options) {
        var _this;

        if (options === void 0) {
          options = {};
        }

        _this = _Component.call(this) || this; // Raises the error event if webgl is not supported.

        if (!WebGLUtils.isWebGLAvailable()) {
          setTimeout(function () {
            _this.trigger(EVENTS$1.ERROR, {
              type: ERROR_TYPE.NO_WEBGL,
              message: "no webgl support"
            });
          }, 0);
          return _assertThisInitialized(_assertThisInitialized(_this)) || _assertThisInitialized(_this);
        }

        if (!WebGLUtils.isStableWebGL()) {
          setTimeout(function () {
            _this.trigger(EVENTS$1.ERROR, {
              type: ERROR_TYPE.INVALID_DEVICE,
              message: "blacklisted browser"
            });
          }, 0);
          return _assertThisInitialized(_assertThisInitialized(_this)) || _assertThisInitialized(_this);
        }

        if (!!options.image && !!options.video) {
          setTimeout(function () {
            _this.trigger(EVENTS$1.ERROR, {
              type: ERROR_TYPE.INVALID_RESOURCE,
              message: "Specifying multi resouces(both image and video) is not valid."
            });
          }, 0);
          return _assertThisInitialized(_assertThisInitialized(_this)) || _assertThisInitialized(_this);
        }

        _this._container = container;
        _this._image = options.image || options.video;
        _this._isVideo = !!options.video;
        _this._projectionType = options.projectionType || PROJECTION_TYPE.EQUIRECTANGULAR;
        _this._cubemapConfig = _extends({
          /* RLUDBF is abnormal, we use it on CUBEMAP only for backward compatibility*/
          order: _this._projectionType === PROJECTION_TYPE.CUBEMAP ? "RLUDBF" : "RLUDFB",
          tileConfig: {
            flipHirozontal: false,
            rotation: 0
          }
        }, options.cubemapConfig); // If the width and height are not provided, will use the size of the container.

        _this._width = options.width || parseInt(window.getComputedStyle(container).width, 10);
        _this._height = options.height || parseInt(window.getComputedStyle(container).height, 10);
        /**
         * Cache the direction for the performance in renderLoop
         *
         * This value should be updated by "change" event of YawPitchControl.
         */

        _this._yaw = options.yaw || 0;
        _this._pitch = options.pitch || 0;
        _this._fov = options.fov || 65;
        _this._gyroMode = options.gyroMode || GYRO_MODE.YAWPITCH;
        _this._quaternion = null;
        _this._aspectRatio = _this._height !== 0 ? _this._width / _this._height : 1;
        var fovRange = options.fovRange || [30, 110];
        var touchDirection = PanoViewer._isValidTouchDirection(options.touchDirection) ? options.touchDirection : YawPitchControl.TOUCH_DIRECTION_ALL;

        var yawPitchConfig = _extends(options, {
          element: container,
          yaw: _this._yaw,
          pitch: _this._pitch,
          fov: _this._fov,
          gyroMode: _this._gyroMode,
          fovRange: fovRange,
          aspectRatio: _this._aspectRatio,
          touchDirection: touchDirection
        });

        _this._isReady = false;

        _this._initYawPitchControl(yawPitchConfig);

        _this._initRenderer(_this._yaw, _this._pitch, _this._fov, _this._projectionType, _this._cubemapConfig);

        return _this;
      }
      /**
      	* Get the video element that the viewer is currently playing. You can use this for playback.
      	* @ko 뷰어가 현재 사용 중인 비디오 요소를 얻습니다. 이 요소를 이용해 비디오의 컨트롤을 할 수 있습니다.
      	* @method eg.view360.PanoViewer#getVideo
      	* @return {HTMLVideoElement} HTMLVideoElement<ko>HTMLVideoElement</ko>
      	* @example
      	* var videoTag = panoViewer.getVideo();
      	* videoTag.play(); // play video!
      	*/


      var _proto = PanoViewer.prototype;

      _proto.getVideo = function getVideo() {
        if (!this._isVideo) {
          return null;
        }

        return this._photoSphereRenderer.getContent();
      };
      /**
       * Set the video information to be used by the viewer.
       * @ko 뷰어가 사용할 이미지 정보를 설정합니다.
       * @method eg.view360.PanoViewer#setVideo
       * @param {String|HTMLVideoElement|Object} video Input video url or element or config object<ko>입력 비디오 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정)</ko>
       * @param {Object} param
       * @param {String} [param.projectionType={@link eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR}("equirectangular")] Projection Type<ko>프로젝션 타입</ko>
       * @param {Object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 의 레이아웃 설정</ko>
       *
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setVideo("/path/to/video/video.mp4", {
       *     projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR
       * });
       */


      _proto.setVideo = function setVideo(video, param) {
        if (param === void 0) {
          param = {};
        }

        if (video) {
          this.setImage(video, {
            projectionType: param.projectionType,
            isVideo: true,
            cubemapConfig: param.cubemapConfig
          });
        }

        return this;
      };
      /**
       * Get the image information that the viewer is currently using.
       * @ko 뷰어가 현재 사용하고있는 이미지 정보를 얻습니다.
       * @method eg.view360.PanoViewer#getImage
       * @return {Image} Image Object<ko>이미지 객체</ko>
       * @example
       * var imageObj = panoViewer.getImage();
       */


      _proto.getImage = function getImage() {
        if (this._isVideo) {
          return null;
        }

        return this._photoSphereRenderer.getContent();
      };
      /**
       * Set the image information to be used by the viewer.
       * @ko 뷰어가 사용할 이미지 정보를 설정합니다.
       * @method eg.view360.PanoViewer#setImage
       * @param {String|Image|Object} image Input image url or element or config object<ko>입력 이미지 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정한다.)</ko>
       * @param {Object} param Additional information<ko>이미지 추가 정보</ko>
       * @param {String} [param.projectionType="equirectangular"] Projection Type<ko>프로젝션 타입</ko>
       * @param {Object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 레이아웃</ko>
       *
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setImage("/path/to/image/image.png", {
       *     projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP
       * });
       */


      _proto.setImage = function setImage(image, param) {
        if (param === void 0) {
          param = {};
        }

        var cubemapConfig = _extends({
          order: "RLUDBF",
          tileConfig: {
            flipHirozontal: false,
            rotation: 0
          }
        }, param.cubemapConfig);

        var isVideo = !!param.isVideo;

        if (this._image && this._isVideo !== isVideo) {
          /* eslint-disable no-console */
          console.warn("Currently not supporting to change content type(Image <--> Video)");
          /* eslint-enable no-console */

          return this;
        }

        if (image) {
          this._image = image;
          this._isVideo = isVideo;
          this._projectionType = param.projectionType || PROJECTION_TYPE.EQUIRECTANGULAR;
          this._cubemapConfig = cubemapConfig;

          this._deactivate();

          this._initRenderer(this._yaw, this._pitch, this._fov, this._projectionType, this._cubemapConfig);
        }

        return this;
      };
      /**
       * Set whether the renderer always updates the texture and renders.
       * @ko 렌더러가 항상 텍스쳐를 갱신하고 화면을 렌더링 할지 여부를 설정할 수 있습니다.
       *
       * @method eg.view360.PanoViewer#keepUpdate
       * @param {Boolean} doUpdate When true viewer will always update texture and render, when false viewer will not update texture and render only camera config is changed.<ko>true면 항상 텍스쳐를 갱신하고 화면을 그리는 반면, false면 텍스쳐 갱신은 하지 않으며, 카메라 요소에 변화가 있을 때에만 화면을 그립니다.</ko>
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      _proto.keepUpdate = function keepUpdate(doUpdate) {
        this._photoSphereRenderer.keepUpdate(doUpdate);

        return this;
      };
      /**
       * Get projection type (equirectangular/cube)
       * @ko 프로젝션 타입(Equirectangular 혹은 Cube)을 반환합니다.
       *
       * @method eg.view360.PanoViewer#getProjectionType
       * @return {String} {@link eg.view360.PanoViewer.PROJECTION_TYPE}
       */


      _proto.getProjectionType = function getProjectionType() {
        return this._projectionType;
      };

      _proto._initRenderer = function _initRenderer(yaw, pitch, fov, projectionType, cubemapConfig) {
        var _this2 = this;

        this._photoSphereRenderer = new PanoImageRenderer(this._image, this._width, this._height, this._isVideo, {
          initialYaw: yaw,
          initialPitch: pitch,
          fieldOfView: fov,
          imageType: projectionType,
          cubemapConfig: cubemapConfig
        });

        this._bindRendererHandler();

        this._photoSphereRenderer.bindTexture().then(function () {
          return _this2._activate();
        })["catch"](function () {
          _this2._triggerEvent(EVENTS$1.ERROR, {
            type: ERROR_TYPE.FAIL_BIND_TEXTURE,
            message: "failed to bind texture"
          });
        });
      };
      /**
       * update values of YawPitchControl if needed.
       * For example, In Panorama mode, initial fov and pitchRange is changed by aspect ratio of image.
       *
       * This function should be called after isReady status is true.
       */


      _proto._updateYawPitchIfNeeded = function _updateYawPitchIfNeeded() {
        if (this._projectionType === PanoViewer.ProjectionType.PANORAMA) {
          // update fov by aspect ratio
          var image = this._photoSphereRenderer.getContent();

          var imageAspectRatio = image.naturalWidth / image.naturalHeight;
          var isCircular;
          var yawSize;
          var maxFov; // If height is larger than width, then we assume it's rotated by 90 degree.

          if (imageAspectRatio < 1) {
            // So inverse the aspect ratio.
            imageAspectRatio = 1 / imageAspectRatio;
          }

          if (imageAspectRatio < 6) {
            yawSize = glMatrix.toDegree(imageAspectRatio);
            isCircular = false; // 0.5 means ratio of half height of cylinder(0.5) and radius of cylider(1). 0.5/1 = 0.5

            maxFov = glMatrix.toDegree(Math.atan(0.5)) * 2;
          } else {
            yawSize = 360;
            isCircular = true;
            maxFov = 360 / imageAspectRatio; // Make it 5 fixed as axes does.
          } // console.log("_updateYawPitchIfNeeded", maxFov, "aspectRatio", image.naturalWidth, image.naturalHeight, "yawSize", yawSize);


          var minFov = this._yawPitchControl.option("fovRange")[0]; // this option should be called after fov is set.


          this._yawPitchControl.option({
            "fov": maxFov,

            /* parameter for internal validation for pitchrange */
            "yawRange": [-yawSize / 2, yawSize / 2],
            isCircular: isCircular,
            "pitchRange": [-maxFov / 2, maxFov / 2],
            "fovRange": [minFov, maxFov]
          });

          this.lookAt({
            fov: maxFov
          });
        }
      };

      _proto._bindRendererHandler = function _bindRendererHandler() {
        var _this3 = this;

        this._photoSphereRenderer.on(PanoImageRenderer.EVENTS.ERROR, function (e) {
          _this3.trigger(EVENTS$1.ERROR, e);
        });

        this._photoSphereRenderer.on(PanoImageRenderer.EVENTS.RENDERING_CONTEXT_LOST, function (e) {
          _this3._deactivate();

          _this3.trigger(EVENTS$1.ERROR, {
            type: ERROR_TYPE.RENDERING_CONTEXT_LOST,
            message: "webgl rendering context lost"
          });
        });
      };

      _proto._initYawPitchControl = function _initYawPitchControl(yawPitchConfig) {
        var _this4 = this;

        this._yawPitchControl = new YawPitchControl(yawPitchConfig);

        this._yawPitchControl.on(EVENTS$1.ANIMATION_END, function (e) {
          _this4._triggerEvent(EVENTS$1.ANIMATION_END, e);
        });

        this._yawPitchControl.on("change", function (e) {
          _this4._yaw = e.yaw;
          _this4._pitch = e.pitch;
          _this4._fov = e.fov;
          _this4._quaternion = e.quaternion;

          _this4._triggerEvent(EVENTS$1.VIEW_CHANGE, e);
        });
      };

      _proto._triggerEvent = function _triggerEvent(name, param) {
        var evt = param || {};
        /**
         * Events that is fired when error occurs
         * @ko 에러 발생 시 발생하는 이벤트
         * @name eg.view360.PanoViewer#error
         * @event
         * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {Number} param.type Error type
         * 		10: INVALID_DEVICE: Unsupported device
         * 		11: NO_WEBGL: Webgl not support
         * 		12, FAIL_IMAGE_LOAD: Failed to load image
         * 		13: FAIL_BIND_TEXTURE: Failed to bind texture
         * 		14: INVALID_RESOURCE: Only one resource(image or video) should be specified
         * 		15: RENDERING_CONTEXT_LOST: WebGL context lost occurred
         * <ko>에러 종류
         * 		10: INVALID_DEVICE: 미지원 기기
         * 		11: NO_WEBGL: WEBGL 미지원
         * 		12, FAIL_IMAGE_LOAD: 이미지 로드 실패
         * 		13: FAIL_BIND_TEXTURE: 텍스쳐 바인딩 실패
         * 		14: INVALID_RESOURCE: 리소스 지정 오류 (image 혹은 video 중 하나만 지정되어야 함)
         * 		15: RENDERING_CONTEXT_LOST: WebGL context lost 발생
         * </ko>
         * @param {String} param.message Error message <ko>에러 메시지</ko>
         * @see {@link eg.view360.PanoViewer.ERROR_TYPE}
         * @example
         *
         * viwer.on({
         *	"error" : function(evt) {
         *		// evt.type === 13
         *		// evt.message === "failed to bind texture"
         * });
         *
         * // constant can be used
         * viwer.on({
         *	eg.view360.PanoViewer.EVENTS.ERROR : function(evt) {
         *		// evt.type === eg.view360.PanoViewer.ERROR_TYPE.FAIL_BIND_TEXTURE
         *		// evt.message === "failed to bind texture"
         * });
         */

        /**
         * Events that is fired when PanoViewer is ready to go.
         * @ko PanoViewer 가 준비된 상태에 발생하는 이벤트
         * @name eg.view360.PanoViewer#ready
         * @event
         *
         * @example
         *
         * viwer.on({
         *	"ready" : function(evt) {
         *		// PanoViewer is ready to show image and handle user interaction.
         * });
         */

        /**
         * Events that is fired when direction or fov is changed.
         * @ko PanoViewer 에서 바라보고 있는 방향이나 FOV(화각)가 변경되었을때 발생하는 이벤트
         * @name eg.view360.PanoViewer#viewChange
         * @event
         * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {Number} param.yaw yaw<ko>yaw</ko>
         * @param {Number} param.pitch pitch <ko>pitch</ko>
         * @param {Number} param.fov Field of view (fov) <ko>화각</ko>
         * @example
         *
         * viwer.on({
         *	"viewChange" : function(evt) {
         *		//evt.yaw, evt.pitch, evt.fov is available.
         * });
         */

        /**
         * Events that is fired when animation which is triggered by inertia is ended.
         * @ko 관성에 의한 애니메이션 동작이 완료되었을때 발생하는 이벤트
         * @name eg.view360.PanoViewer#animationEnd
         * @event
         * @example
         *
         * viwer.on({
         *	"animationEnd" : function(evt) {
         *		// animation is ended.
         * });
         */

        return this.trigger(name, evt);
      };
      /**
       * When set true, enables zoom with the wheel or pinch gesture. However, in the case of touch, pinch works only when the touchDirection setting is {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL}.
       * @ko true 로 설정 시 휠 혹은 집기 동작으로 확대/축소 할 수 있습니다. false 설정 시 확대/축소 기능을 비활성화 합니다. 단, 터치인 경우 touchDirection 설정이 {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL} 인 경우에만 pinch 가 동작합니다.
       * @method eg.view360.PanoViewer#setUseZoom
       * @param {Boolean} useZoom
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      _proto.setUseZoom = function setUseZoom(useZoom) {
        typeof useZoom === "boolean" && this._yawPitchControl.option("useZoom", useZoom);
        return this;
      };
      /**
       * When true, enables the keyboard move key control: awsd, arrow keys
       * @ko true이면 키보드 이동 키 컨트롤을 활성화합니다. (awsd, 화살표 키)
       * @method eg.view360.PanoViewer#setUseKeyboard
       * @param {Boolean} useKeyboard
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      _proto.setUseKeyboard = function setUseKeyboard(useKeyboard) {
        this._yawPitchControl.option("useKeyboard", useKeyboard);

        return this;
      };
      /**
       * Enables control through device motion. ("none", "yawPitch", "VR")
       * @ko 디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch", "VR")
       * @method eg.view360.PanoViewer#setGyroMode
       * @param {String} gyroMode {@link eg.view360.PanoViewer.GYRO_MODE}
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setGyroMode("yawPitch");
       * //equivalent
       * panoViewer.setGyroMode(eg.view360.PanoViewer.GYRO_MODE.YAWPITCH);
       */


      _proto.setGyroMode = function setGyroMode(gyroMode) {
        this._yawPitchControl.option("gyroMode", gyroMode);

        return this;
      };
      /**
       * Set the range of controllable FOV values
       * @ko 제어 가능한 FOV 구간을 설정합니다.
       * @method eg.view360.PanoViewer#setFovRange
       * @param {Array} range
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setFovRange([50, 90]);
       */


      _proto.setFovRange = function setFovRange(range) {
        this._yawPitchControl.option("fovRange", range);

        return this;
      };
      /**
       * Getting the range of controllable FOV values
       * @ko 제어 가능한 FOV 구간을 반환합니다.
       * @method eg.view360.PanoViewer#getFovRange
       * @return {Array}
       * @example
       * var range = panoViewer.getFovRange(); //[50, 90]
       */


      _proto.getFovRange = function getFovRange() {
        return this._yawPitchControl.option("fovRange");
      };
      /**
       * Update size of canvas element by it's container element's or specified size. If size is not specified, the size of the container area is obtained and updated to that size.
       * @ko 캔버스 엘리먼트의 크기를 컨테이너 엘리먼트의 크기나 지정된 크기로 업데이트합니다. 만약 size 가 지정되지 않으면 컨테이너 영역의 크기를 얻어와 해당 크기로 갱신합니다.
       * @method eg.view360.PanoViewer#updateViewportDimensions
       * @param {Object} [size]
       * @param {Number} [size.width=width of container]
       * @param {Number} [size.height=height of container]
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      _proto.updateViewportDimensions = function updateViewportDimensions(size) {
        if (size === void 0) {
          size = {
            width: undefined,
            height: undefined
          };
        }

        if (!this._isReady) {
          return this;
        }

        var containerSize;

        if (size.width === undefined || size.height === undefined) {
          containerSize = window.getComputedStyle(this._container);
        }

        var width = size.width || parseInt(containerSize.width, 10);
        var height = size.height || parseInt(containerSize.height, 10); // Skip if viewport is not changed.

        if (width === this._width && height === this._height) {
          return this;
        }

        this._width = width;
        this._height = height;
        this._aspectRatio = width / height;

        this._photoSphereRenderer.updateViewportDimensions(width, height);

        this._yawPitchControl.option("aspectRatio", this._aspectRatio);

        this._yawPitchControl.updatePanScale({
          height: height
        });

        this.lookAt({}, 0);
        return this;
      };
      /**
       * Get the current field of view(FOV)
       * @ko 현재 field of view(FOV) 값을 반환합니다.
       * @method eg.view360.PanoViewer#getFov
       * @return {Number}
       */


      _proto.getFov = function getFov() {
        return this._fov;
      };
      /**
       * Get the horizontal field of view in degree
       */


      _proto._getHFov = function _getHFov() {
        return glMatrix.toDegree(2 * Math.atan(this._aspectRatio * Math.tan(glMatrix.toRadian(this._fov) / 2)));
      };
      /**
       * Get current yaw value
       * @ko 현재 yaw 값을 반환합니다.
       * @method eg.view360.PanoViewer#getYaw
       * @return {Number}
       */


      _proto.getYaw = function getYaw() {
        return this._yaw;
      };
      /**
       * Get current pitch value
       * @ko 현재 pitch 값을 반환합니다.
       * @method eg.view360.PanoViewer#getPitch
       * @return {Number}
       */


      _proto.getPitch = function getPitch() {
        return this._pitch;
      };
      /**
       * Get the range of controllable Yaw values
       * @ko 컨트롤 가능한 Yaw 구간을 반환합니다.
       * @method eg.view360.PanoViewer#getYawRange
       * @return {Array}
       */


      _proto.getYawRange = function getYawRange() {
        return this._yawPitchControl.option("yawRange");
      };
      /**
       * Get the range of controllable Pitch values
       * @ko 컨트롤 가능한 Pitch 구간을 가져옵니다.
       * @method eg.view360.PanoViewer#getPitchRange
       * @return {Array}
       */


      _proto.getPitchRange = function getPitchRange() {
        return this._yawPitchControl.option("pitchRange");
      };
      /**
       * Set the range of controllable yaw
       * @ko 컨트롤 가능한 Yaw 구간을 반환합니다.
       * @method eg.view360.PanoViewer#setYawRange
       * @param {Array} range
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setYawRange([-90, 90]);
       */


      _proto.setYawRange = function setYawRange(yawRange) {
        this._yawPitchControl.option("yawRange", yawRange);

        return this;
      };
      /**
       * Set the range of controllable Pitch values
       * @ko 컨트롤 가능한 Pitch 구간을 설정합니다.
       * @method eg.view360.PanoViewer#setPitchRange
       * @param {Array} range
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setPitchRange([-40, 40]);
       */


      _proto.setPitchRange = function setPitchRange(pitchRange) {
        this._yawPitchControl.option("pitchRange", pitchRange);

        return this;
      };
      /**
       * Specifies whether to display the pole by limiting the pitch range. If it is true, pole point can be displayed. If it is false, it is not displayed.
       * @ko pitch 범위를 제한하여 극점을 표시할지를 지정합니다. true 인 경우 극점까지 표현할 수 있으며 false 인 경우 극점까지 표시하지 않습니다.
       * @method eg.view360.PanoViewer#setShowPolePoint
       * @param {Boolean} showPolePoint
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      _proto.setShowPolePoint = function setShowPolePoint(showPolePoint) {
        this._yawPitchControl.option("showPolePoint", showPolePoint);

        return this;
      };
      /**
       * Set a new view by setting camera configuration. Any parameters not specified remain the same.
       * @ko 카메라 설정을 지정하여 화면을 갱신합니다. 지정되지 않은 매개 변수는 동일하게 유지됩니다.
       * @method eg.view360.PanoViewer#lookAt
       * @param {Object} orientation
       * @param {Number} orientation.yaw Target yaw in degree <ko>목표 yaw (degree 단위)</ko>
       * @param {Number} orientation.pitch Target pitch in degree <ko>목표 pitch (degree 단위)</ko>
       * @param {Number} orientation.fov Target vertical fov in degree <ko>목표 수직 fov (degree 단위)</ko>
       * @param {Number} duration Animation duration in milliseconds <ko>애니메이션 시간 (밀리 초)</ko>
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * // Change the yaw angle (absolute angle) to 30 degrees for one second.
       * panoViewer.lookAt({yaw: 30}, 1000);
       */


      _proto.lookAt = function lookAt(orientation, duration) {
        if (!this._isReady) {
          return this;
        }

        var yaw = orientation.yaw !== undefined ? orientation.yaw : this._yaw;
        var pitch = orientation.pitch !== undefined ? orientation.pitch : this._pitch;

        var pitchRange = this._yawPitchControl.option("pitchRange");

        var verticalAngleOfImage = pitchRange[1] - pitchRange[0];
        var fov = orientation.fov !== undefined ? orientation.fov : this._fov;

        if (verticalAngleOfImage < fov) {
          fov = verticalAngleOfImage;
        }

        this._yawPitchControl.lookAt({
          yaw: yaw,
          pitch: pitch,
          fov: fov
        }, duration);

        if (duration === 0) {
          this._photoSphereRenderer.render(yaw, pitch, fov);
        }

        return this;
      };

      _proto._activate = function _activate() {
        this._photoSphereRenderer.attachTo(this._container);

        this._yawPitchControl.enable();

        this.updateViewportDimensions();
        this._isReady = true; // update yawPitchControl after isReady status is true.

        this._updateYawPitchIfNeeded();

        this._triggerEvent(EVENTS$1.READY);

        this._startRender();
      };
      /**
       * Register the callback on the raf to call _renderLoop every frame.
       */


      _proto._startRender = function _startRender() {
        this._renderLoop = this._renderLoop.bind(this);
        this._rafId = window.requestAnimationFrame(this._renderLoop);
      };

      _proto._renderLoop = function _renderLoop() {
        if (this._photoSphereRenderer) {
          if (this._quaternion) {
            this._photoSphereRenderer.renderWithQuaternion(this._quaternion, this._fov);
          } else {
            this._photoSphereRenderer.render(this._yaw, this._pitch, this._fov);
          }
        }

        this._rafId = window.requestAnimationFrame(this._renderLoop);
      };

      _proto._stopRender = function _stopRender() {
        if (this._rafId) {
          window.cancelAnimationFrame(this._rafId);
          delete this._rafId;
        }
      };
      /**
       * Destroy webgl context and block user interaction and stop rendering
       */


      _proto._deactivate = function _deactivate() {
        if (this._photoSphereRenderer) {
          this._photoSphereRenderer.destroy();

          this._photoSphereRenderer = null;
        }

        if (this._isReady) {
          this._yawPitchControl.disable();

          this._stopRender();

          this._isReady = false;
        }
      };

      PanoViewer._isValidTouchDirection = function _isValidTouchDirection(direction) {
        return direction === PanoViewer.TOUCH_DIRECTION.NONE || direction === PanoViewer.TOUCH_DIRECTION.YAW || direction === PanoViewer.TOUCH_DIRECTION.PITCH || direction === PanoViewer.TOUCH_DIRECTION.ALL;
      };
      /**
       * Set touch direction by which user can control.
       * @ko 사용자가 조작가능한 터치 방향을 지정합니다.
       * @method eg.view360.PanoViewer#setTouchDirection
       * @param {Number} direction of the touch. {@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
       * @return {eg.view360.PanoViewer} PanoViewer instance
       * @example
       *
       * panoViewer = new PanoViewer(el);
       * // Limit the touch direction to the yaw direction only.
       * panoViewer.setTouchDirection(eg.view360.PanoViewer.TOUCH_DIRECTION.YAW);
       */


      _proto.setTouchDirection = function setTouchDirection(direction) {
        if (PanoViewer._isValidTouchDirection(direction)) {
          this._yawPitchControl.option("touchDirection", direction);
        }

        return this;
      };
      /**
       * Returns touch direction by which user can control
       * @ko 사용자가 조작가능한 터치 방향을 반환한다.
       * @method eg.view360.PanoViewer#getTouchDirection
       * @return {Number} direction of the touch. {@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
       * @example
       *
       * panoViewer = new PanoViewer(el);
       * // Returns the current touch direction.
       * var dir = panoViewer.getTouchDirection();
       */


      _proto.getTouchDirection = function getTouchDirection() {
        return this._yawPitchControl.option("touchDirection");
      };
      /**
       * Destroy viewer. Remove all registered event listeners and remove viewer canvas.
       * @ko 뷰어 인스턴스를 해제합니다. 모든 등록된 이벤트리스너를 제거하고 뷰어 캔버스를 삭제합니다.
       * @method eg.view360.PanoViewer#destroy
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      _proto.destroy = function destroy() {
        this._deactivate();

        if (this._yawPitchControl) {
          this._yawPitchControl.destroy();

          this._yawPitchControl = null;
        }

        return this;
      };
      /**
       * Check whether the current environment can execute PanoViewer
       * @ko 현재 브라우저 환경에서 PanoViewer 실행이 가능한지 여부를 반환합니다.
       * @function isSupported
       * @memberof eg.view360.PanoViewer
       * @return {Boolean} PanoViewer executable <ko>PanoViewer 실행가능 여부</ko>
       * @static
       */


      PanoViewer.isSupported = function isSupported() {
        return WebGLUtils.isWebGLAvailable() && WebGLUtils.isStableWebGL();
      };
      /**
       * Check whether the current environment supports the WebGL
       * @ko 현재 브라우저 환경이 WebGL 을 지원하는지 여부를 확인합니다.
       * @function isWebGLAvailable
       * @memberof eg.view360.PanoViewer
       * @return {Boolean} WebGL support <ko>WebGL 지원여부</ko>
       * @static
       */


      PanoViewer.isWebGLAvailable = function isWebGLAvailable() {
        return WebGLUtils.isWebGLAvailable();
      };
      /**
       * Check whether the current environment supports the gyro sensor.
       * @ko 현재 브라우저 환경이 자이로 센서를 지원하는지 여부를 확인합니다.
       * @function isGyroSensorAvailable
       * @memberof eg.view360.PanoViewer
       * @param {Function} callback Function to take the gyro sensor availability as argument <ko>자이로 센서를 지원하는지 여부를 인자로 받는 함수</ko>
       * @static
       */


      PanoViewer.isGyroSensorAvailable = function isGyroSensorAvailable(callback) {
        if (!DeviceMotionEvent) {
          callback && callback(false);
          return;
        }

        var onDeviceMotionChange;

        function checkGyro() {
          return new _Promise$3(function (res, rej) {
            onDeviceMotionChange = function onDeviceMotionChange(deviceMotion) {
              var isGyroSensorAvailable = !(deviceMotion.rotationRate.alpha == null);
              res(isGyroSensorAvailable);
            };

            window.addEventListener("devicemotion", onDeviceMotionChange);
          });
        }

        function timeout() {
          return new _Promise$3(function (res, rej) {
            setTimeout(function () {
              return res(false);
            }, 1000);
          });
        }

        _Promise$3.race([checkGyro(), timeout()]).then(function (isGyroSensorAvailable) {
          window.removeEventListener("devicemotion", onDeviceMotionChange);
          callback && callback(isGyroSensorAvailable);

          PanoViewer.isGyroSensorAvailable = function (fb) {
            fb && fb(isGyroSensorAvailable);
            return isGyroSensorAvailable;
          };
        });
      };

      return PanoViewer;
    }(Component);

    PanoViewer.VERSION = VERSION;
    PanoViewer.ERROR_TYPE = ERROR_TYPE;
    PanoViewer.EVENTS = EVENTS$1;
    PanoViewer.PROJECTION_TYPE = PROJECTION_TYPE;
    PanoViewer.GYRO_MODE = GYRO_MODE;
    PanoViewer.ProjectionType = PROJECTION_TYPE;
    PanoViewer.TOUCH_DIRECTION = {
      /**
       * Constant value for none direction.
       * @ko none 방향에 대한 상수 값.
       * @name NONE
       * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
       * @constant
       * @type {Number}
       * @default 1
       */
      NONE: YawPitchControl.TOUCH_DIRECTION_NONE,

      /**
       * Constant value for horizontal(yaw) direction.
       * @ko horizontal(yaw) 방향에 대한 상수 값.
       * @name YAW
       * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
       * @constant
       * @type {Number}
       * @default 6
       */
      YAW: YawPitchControl.TOUCH_DIRECTION_YAW,

      /**
       * Constant value for vertical direction.
       * @ko vertical(pitch) 방향에 대한 상수 값.
       * @name PITCH
       * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
       * @constant
       * @type {Number}
       * @default 24
       */
      PITCH: YawPitchControl.TOUCH_DIRECTION_PITCH,

      /**
       * Constant value for all direction.
       * @ko all 방향에 대한 상수 값.
       * @name ALL
       * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
       * @constant
       * @type {Number}
       * @default 30
       */
      ALL: YawPitchControl.TOUCH_DIRECTION_ALL
    };
    return PanoViewer;
  }();

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

        _this._panInput = new PanInput(_this._el, {
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

  exports.PanoViewer = PanoViewer;
  exports.SpinViewer = SpinViewer;
  exports.SpriteImage = SpriteImage;
  exports.VERSION = VERSION;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=view360.pkgd.js.map
