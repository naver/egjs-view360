/*
Copyright (c) 2017 NAVER Corp.
name: @egjs/view360
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-view360
version: 3.5.1
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.eg = global.eg || {}, global.eg.view360 = factory()));
}(this, (function () { 'use strict';

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
    function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
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

    /*
    Copyright (c) NAVER Corp.
    name: @egjs/component
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-component
    version: 2.2.2
    */
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
    function __values$1(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    /*
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
      /**
       * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
       */
      function Component() {
        /**
         * @deprecated
         * @private
         */
        this.options = {};
        this._eventHandler = {};
      }
      /**
       * Triggers a custom event.
       * @ko 커스텀 이벤트를 발생시킨다
       * @param {string} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
       * @param {object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
       * @param {any[]} restParam Additional parameters when triggering a custom event <ko>커스텀 이벤트가 발생할 때 필요시 추가적으로 전달할 데이터</ko>
       * @return Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   some(){
       *     if(this.trigger("beforeHi")){ // When event call to stop return false.
       *       this.trigger("hi");// fire hi event.
       *     }
       *   }
       * }
       *
       * const some = new Some();
       * some.on("beforeHi", (e) => {
       *   if(condition){
       *     e.stop(); // When event call to stop, `hi` event not call.
       *   }
       * });
       * some.on("hi", (e) => {
       *   // `currentTarget` is component instance.
       *   console.log(some === e.currentTarget); // true
       * });
       * // If you want to more know event design. You can see article.
       * // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
       * ```
       */


      var __proto = Component.prototype;

      __proto.trigger = function (eventName) {
        var _this = this;

        var params = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          params[_i - 1] = arguments[_i];
        }

        var handlerList = this._eventHandler[eventName] || [];
        var hasHandlerList = handlerList.length > 0;

        if (!hasHandlerList) {
          return true;
        }

        var customEvent = params[0] || {};
        var restParams = params.slice(1); // If detach method call in handler in first time then handler list calls.

        handlerList = handlerList.concat();
        var isCanceled = false; // This should be done like this to pass previous tests

        customEvent.eventType = eventName;

        customEvent.stop = function () {
          isCanceled = true;
        };

        customEvent.currentTarget = this;
        var arg = [customEvent];

        if (restParams.length >= 1) {
          arg = arg.concat(restParams);
        }

        handlerList.forEach(function (handler) {
          handler.apply(_this, arg);
        });
        return !isCanceled;
      };
      /**
       * Executed event just one time.
       * @ko 이벤트가 한번만 실행된다.
       * @param {string} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       * hi() {
       *   alert("hi");
       * }
       * thing() {
       *   this.once("hi", this.hi);
       * }
       *
       * var some = new Some();
       * some.thing();
       * some.trigger("hi");
       * // fire alert("hi");
       * some.trigger("hi");
       * // Nothing happens
       * ```
       */


      __proto.once = function (eventName, handlerToAttach) {
        var _this = this;

        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;

          for (var key in eventHash) {
            this.once(key, eventHash[key]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var listener_1 = function () {
            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }

            handlerToAttach.apply(_this, args);

            _this.off(eventName, listener_1);
          };

          this.on(eventName, listener_1);
        }

        return this;
      };
      /**
       * Checks whether an event has been attached to a component.
       * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
       * @param {string} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
       * @return {boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   some() {
       *     this.hasOn("hi");// check hi event.
       *   }
       * }
       * ```
       */


      __proto.hasOn = function (eventName) {
        return !!this._eventHandler[eventName];
      };
      /**
       * Attaches an event to a component.
       * @ko 컴포넌트에 이벤트를 등록한다.
       * @param {string} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.on("hi",this.hi); //attach event
       *   }
       * }
       * ```
       */


      __proto.on = function (eventName, handlerToAttach) {
        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;

          for (var name in eventHash) {
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
       * @param {string} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
       * @param {function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.off("hi",this.hi); //detach event
       *   }
       * }
       * ```
       */


      __proto.off = function (eventName, handlerToDetach) {
        var e_1, _a; // Detach all event handlers.


        if (isUndefined(eventName)) {
          this._eventHandler = {};
          return this;
        } // Detach all handlers for eventname or detach event handlers by object.


        if (isUndefined(handlerToDetach)) {
          if (typeof eventName === "string") {
            delete this._eventHandler[eventName];
            return this;
          } else {
            var eventHash = eventName;

            for (var name in eventHash) {
              this.off(name, eventHash[name]);
            }

            return this;
          }
        } // Detach single event handler


        var handlerList = this._eventHandler[eventName];

        if (handlerList) {
          var idx = 0;

          try {
            for (var handlerList_1 = __values$1(handlerList), handlerList_1_1 = handlerList_1.next(); !handlerList_1_1.done; handlerList_1_1 = handlerList_1.next()) {
              var handlerFunction = handlerList_1_1.value;

              if (handlerFunction === handlerToDetach) {
                handlerList.splice(idx, 1);
                break;
              }

              idx++;
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (handlerList_1_1 && !handlerList_1_1.done && (_a = handlerList_1.return)) _a.call(handlerList_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }

        return this;
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @example
       * eg.Component.VERSION;  // ex) 2.0.0
       * @memberof eg.Component
       */


      Component.VERSION = "2.2.2";
      return Component;
    }();

    /**
     * @this {Promise}
     */
    function finallyConstructor(callback) {
      var constructor = this.constructor;
      return this.then(
        function(value) {
          // @ts-ignore
          return constructor.resolve(callback()).then(function() {
            return value;
          });
        },
        function(reason) {
          // @ts-ignore
          return constructor.resolve(callback()).then(function() {
            // @ts-ignore
            return constructor.reject(reason);
          });
        }
      );
    }

    function allSettled(arr) {
      var P = this;
      return new P(function(resolve, reject) {
        if (!(arr && typeof arr.length !== 'undefined')) {
          return reject(
            new TypeError(
              typeof arr +
                ' ' +
                arr +
                ' is not iterable(cannot read property Symbol(Symbol.iterator))'
            )
          );
        }
        var args = Array.prototype.slice.call(arr);
        if (args.length === 0) return resolve([]);
        var remaining = args.length;

        function res(i, val) {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(
                val,
                function(val) {
                  res(i, val);
                },
                function(e) {
                  args[i] = { status: 'rejected', reason: e };
                  if (--remaining === 0) {
                    resolve(args);
                  }
                }
              );
              return;
            }
          }
          args[i] = { status: 'fulfilled', value: val };
          if (--remaining === 0) {
            resolve(args);
          }
        }

        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    }

    // Store setTimeout reference so promise-polyfill will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var setTimeoutFunc = setTimeout;

    function isArray(x) {
      return Boolean(x && typeof x.length !== 'undefined');
    }

    function noop() {}

    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
      return function() {
        fn.apply(thisArg, arguments);
      };
    }

    /**
     * @constructor
     * @param {Function} fn
     */
    function Promise(fn) {
      if (!(this instanceof Promise))
        throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function') throw new TypeError('not a function');
      /** @type {!number} */
      this._state = 0;
      /** @type {!boolean} */
      this._handled = false;
      /** @type {Promise|undefined} */
      this._value = undefined;
      /** @type {!Array<!Function>} */
      this._deferreds = [];

      doResolve(fn, this);
    }

    function handle(self, deferred) {
      while (self._state === 3) {
        self = self._value;
      }
      if (self._state === 0) {
        self._deferreds.push(deferred);
        return;
      }
      self._handled = true;
      Promise._immediateFn(function() {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
          return;
        }
        var ret;
        try {
          ret = cb(self._value);
        } catch (e) {
          reject(deferred.promise, e);
          return;
        }
        resolve(deferred.promise, ret);
      });
    }

    function resolve(self, newValue) {
      try {
        // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
        if (newValue === self)
          throw new TypeError('A promise cannot be resolved with itself.');
        if (
          newValue &&
          (typeof newValue === 'object' || typeof newValue === 'function')
        ) {
          var then = newValue.then;
          if (newValue instanceof Promise) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
          } else if (typeof then === 'function') {
            doResolve(bind(then, newValue), self);
            return;
          }
        }
        self._state = 1;
        self._value = newValue;
        finale(self);
      } catch (e) {
        reject(self, e);
      }
    }

    function reject(self, newValue) {
      self._state = 2;
      self._value = newValue;
      finale(self);
    }

    function finale(self) {
      if (self._state === 2 && self._deferreds.length === 0) {
        Promise._immediateFn(function() {
          if (!self._handled) {
            Promise._unhandledRejectionFn(self._value);
          }
        });
      }

      for (var i = 0, len = self._deferreds.length; i < len; i++) {
        handle(self, self._deferreds[i]);
      }
      self._deferreds = null;
    }

    /**
     * @constructor
     */
    function Handler(onFulfilled, onRejected, promise) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.promise = promise;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, self) {
      var done = false;
      try {
        fn(
          function(value) {
            if (done) return;
            done = true;
            resolve(self, value);
          },
          function(reason) {
            if (done) return;
            done = true;
            reject(self, reason);
          }
        );
      } catch (ex) {
        if (done) return;
        done = true;
        reject(self, ex);
      }
    }

    Promise.prototype['catch'] = function(onRejected) {
      return this.then(null, onRejected);
    };

    Promise.prototype.then = function(onFulfilled, onRejected) {
      // @ts-ignore
      var prom = new this.constructor(noop);

      handle(this, new Handler(onFulfilled, onRejected, prom));
      return prom;
    };

    Promise.prototype['finally'] = finallyConstructor;

    Promise.all = function(arr) {
      return new Promise(function(resolve, reject) {
        if (!isArray(arr)) {
          return reject(new TypeError('Promise.all accepts an array'));
        }

        var args = Array.prototype.slice.call(arr);
        if (args.length === 0) return resolve([]);
        var remaining = args.length;

        function res(i, val) {
          try {
            if (val && (typeof val === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(
                  val,
                  function(val) {
                    res(i, val);
                  },
                  reject
                );
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }

        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };

    Promise.allSettled = allSettled;

    Promise.resolve = function(value) {
      if (value && typeof value === 'object' && value.constructor === Promise) {
        return value;
      }

      return new Promise(function(resolve) {
        resolve(value);
      });
    };

    Promise.reject = function(value) {
      return new Promise(function(resolve, reject) {
        reject(value);
      });
    };

    Promise.race = function(arr) {
      return new Promise(function(resolve, reject) {
        if (!isArray(arr)) {
          return reject(new TypeError('Promise.race accepts an array'));
        }

        for (var i = 0, len = arr.length; i < len; i++) {
          Promise.resolve(arr[i]).then(resolve, reject);
        }
      });
    };

    // Use polyfill for setImmediate for performance gains
    Promise._immediateFn =
      // @ts-ignore
      (typeof setImmediate === 'function' &&
        function(fn) {
          // @ts-ignore
          setImmediate(fn);
        }) ||
      function(fn) {
        setTimeoutFunc(fn, 0);
      };

    Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
      if (typeof console !== 'undefined' && console) {
        console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
      }
    };

    /*
    Copyright (c) 2015 NAVER Corp.
    name: @egjs/agent
    license: MIT
    author: NAVER Corp.
    repository: git+https://github.com/naver/agent.git
    version: 2.2.1
    */
    function some(arr, callback) {
      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i)) {
          return true;
        }
      }

      return false;
    }
    function find(arr, callback) {
      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i)) {
          return arr[i];
        }
      }

      return null;
    }
    function getUserAgent(agent) {
      var userAgent = agent;

      if (typeof userAgent === "undefined") {
        if (typeof navigator === "undefined" || !navigator) {
          return "";
        }

        userAgent = navigator.userAgent || "";
      }

      return userAgent.toLowerCase();
    }
    function execRegExp(pattern, text) {
      try {
        return new RegExp(pattern, "g").exec(text);
      } catch (e) {
        return null;
      }
    }
    function hasUserAgentData() {
      if (typeof navigator === "undefined" || !navigator || !navigator.userAgentData) {
        return false;
      }

      var userAgentData = navigator.userAgentData;
      var brands = userAgentData.brands || userAgentData.uaList;
      return !!(brands && brands.length);
    }
    function findVersion(versionTest, userAgent) {
      var result = execRegExp("(" + versionTest + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);
      return result ? result[3] : "";
    }
    function convertVersion(text) {
      return text.replace(/_/g, ".");
    }
    function findPreset(presets, userAgent) {
      var userPreset = null;
      var version = "-1";
      some(presets, function (preset) {
        var result = execRegExp("(" + preset.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);

        if (!result || preset.brand) {
          return false;
        }

        userPreset = preset;
        version = result[3] || "-1";

        if (preset.versionAlias) {
          version = preset.versionAlias;
        } else if (preset.versionTest) {
          version = findVersion(preset.versionTest.toLowerCase(), userAgent) || version;
        }

        version = convertVersion(version);
        return true;
      });
      return {
        preset: userPreset,
        version: version
      };
    }
    function findBrand(brands, preset) {
      return find(brands, function (_a) {
        var brand = _a.brand;
        return execRegExp("" + preset.test, brand.toLowerCase());
      });
    }

    var BROWSER_PRESETS = [{
      test: "phantomjs",
      id: "phantomjs"
    }, {
      test: "whale",
      id: "whale"
    }, {
      test: "edgios|edge|edg",
      id: "edge"
    }, {
      test: "msie|trident|windows phone",
      id: "ie",
      versionTest: "iemobile|msie|rv"
    }, {
      test: "miuibrowser",
      id: "miui browser"
    }, {
      test: "samsungbrowser",
      id: "samsung internet"
    }, {
      test: "samsung",
      id: "samsung internet",
      versionTest: "version"
    }, {
      test: "chrome|crios",
      id: "chrome"
    }, {
      test: "firefox|fxios",
      id: "firefox"
    }, {
      test: "android",
      id: "android browser",
      versionTest: "version"
    }, {
      test: "safari|iphone|ipad|ipod",
      id: "safari",
      versionTest: "version"
    }]; // chromium's engine(blink) is based on applewebkit 537.36.

    var CHROMIUM_PRESETS = [{
      test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
      id: "chrome"
    }, {
      test: "chromium",
      id: "chrome"
    }, {
      test: "whale",
      id: "chrome",
      brand: true
    }];
    var WEBKIT_PRESETS = [{
      test: "applewebkit",
      id: "webkit"
    }];
    var WEBVIEW_PRESETS = [{
      test: "(?=(iphone|ipad))(?!(.*version))",
      id: "webview"
    }, {
      test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
      id: "webview"
    }, {
      // test webview
      test: "webview",
      id: "webview"
    }];
    var OS_PRESETS = [{
      test: "windows phone",
      id: "windows phone"
    }, {
      test: "windows 2000",
      id: "window",
      versionAlias: "5.0"
    }, {
      test: "windows nt",
      id: "window"
    }, {
      test: "iphone|ipad|ipod",
      id: "ios",
      versionTest: "iphone os|cpu os"
    }, {
      test: "mac os x",
      id: "mac"
    }, {
      test: "android",
      id: "android"
    }, {
      test: "tizen",
      id: "tizen"
    }, {
      test: "webos|web0s",
      id: "webos"
    }];

    function parseUserAgentData(osData) {
      var userAgentData = navigator.userAgentData;
      var brands = (userAgentData.uaList || userAgentData.brands).slice();
      var isMobile = userAgentData.mobile || false;
      var firstBrand = brands[0];
      var browser = {
        name: firstBrand.brand,
        version: firstBrand.version,
        majorVersion: -1,
        webkit: false,
        webview: some(WEBVIEW_PRESETS, function (preset) {
          return findBrand(brands, preset);
        }),
        chromium: some(CHROMIUM_PRESETS, function (preset) {
          return findBrand(brands, preset);
        })
      };
      var os = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
      };
      browser.webkit = !browser.chromium && some(WEBKIT_PRESETS, function (preset) {
        return findBrand(brands, preset);
      });

      if (osData) {
        var platform_1 = osData.platform.toLowerCase();
        var result = find(OS_PRESETS, function (preset) {
          return new RegExp("" + preset.test, "g").exec(platform_1);
        });
        os.name = result ? result.id : platform_1;
        os.version = osData.platformVersion;
      }

      some(BROWSER_PRESETS, function (preset) {
        var result = findBrand(brands, preset);

        if (!result) {
          return false;
        }

        browser.name = preset.id;
        browser.version = osData ? osData.uaFullVersion : result.version;
        return true;
      });

      if (navigator.platform === "Linux armv8l") {
        os.name = "android";
      } else if (browser.webkit) {
        os.name = isMobile ? "ios" : "mac";
      }

      if (os.name === "ios" && browser.webview) {
        browser.version = "-1";
      }

      os.version = convertVersion(os.version);
      browser.version = convertVersion(browser.version);
      os.majorVersion = parseInt(os.version, 10);
      browser.majorVersion = parseInt(browser.version, 10);
      return {
        browser: browser,
        os: os,
        isMobile: isMobile,
        isHints: true
      };
    }

    function parseUserAgent(userAgent) {
      var nextAgent = getUserAgent(userAgent);
      var isMobile = !!/mobi/g.exec(nextAgent);
      var browser = {
        name: "unknown",
        version: "-1",
        majorVersion: -1,
        webview: !!findPreset(WEBVIEW_PRESETS, nextAgent).preset,
        chromium: !!findPreset(CHROMIUM_PRESETS, nextAgent).preset,
        webkit: false
      };
      var os = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
      };

      var _a = findPreset(BROWSER_PRESETS, nextAgent),
          browserPreset = _a.preset,
          browserVersion = _a.version;

      var _b = findPreset(OS_PRESETS, nextAgent),
          osPreset = _b.preset,
          osVersion = _b.version;

      browser.webkit = !browser.chromium && !!findPreset(WEBKIT_PRESETS, nextAgent).preset;

      if (osPreset) {
        os.name = osPreset.id;
        os.version = osVersion;
        os.majorVersion = parseInt(osVersion, 10);
      }

      if (browserPreset) {
        browser.name = browserPreset.id;
        browser.version = browserVersion;

        if (browser.webview && os.name === "ios" && browser.name !== "safari") {
          browser.webview = false;
        }
      }

      browser.majorVersion = parseInt(browser.version, 10);
      return {
        browser: browser,
        os: os,
        isMobile: isMobile,
        isHints: false
      };
    }
    /**
     * Extracts browser and operating system information from the user agent string.
     * @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
     * @function eg.agent#agent
     * @param - user agent string to parse <ko>파싱할 유저에이전트 문자열</ko>
     * @return - agent Info <ko> 에이전트 정보 </ko>
     * @example
    import agent from "@egjs/agent";
    // eg.agent();
    const { os, browser, isMobile } = agent();
     */

    function agent(userAgent) {
      if (typeof userAgent === "undefined" && hasUserAgentData()) {
        return parseUserAgentData();
      } else {
        return parseUserAgent(userAgent);
      }
    }

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /* eslint-disable no-new-func, no-nested-ternary */

    var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
    /* eslint-enable no-new-func, no-nested-ternary */

    var doc = win.document;
    var nav = win.navigator;
    var agent$1 = agent();
    var osName = agent$1.os.name;
    var browserName = agent$1.browser.name;
    var IS_IOS = osName === "ios";
    var IS_SAFARI_ON_DESKTOP = osName === "mac" && browserName === "safari";

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    win.Float32Array = typeof win.Float32Array !== "undefined" ? win.Float32Array : win.Array;
    var Float32Array$1 = win.Float32Array;
    var getComputedStyle = win.getComputedStyle;
    var userAgent = win.navigator && win.navigator.userAgent;
    var SUPPORT_TOUCH = ("ontouchstart" in win);
    var SUPPORT_DEVICEMOTION = ("ondevicemotion" in win);
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
    var WEBXR_SUPPORTED = false;

    var checkXRSupport = function () {
      var navigator = window.navigator;

      if (!navigator.xr) {
        return;
      }

      if (navigator.xr.isSessionSupported) {
        navigator.xr.isSessionSupported("immersive-vr").then(function (res) {
          WEBXR_SUPPORTED = res;
        }).catch(function () {}); // tslint:disable-line no-empty
      } else if (navigator.xr.supportsSession) {
        navigator.xr.supportsSession("immersive-vr").then(function (res) {
          WEBXR_SUPPORTED = res;
        }).catch(function () {}); // tslint:disable-line no-empty
      }
    };

    /*! Hammer.JS - v2.0.17-rc - 2019-12-16
     * http://naver.github.io/egjs
     *
     * Forked By Naver egjs
     * Copyright (c) hammerjs
     * Licensed under the MIT license */
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
      var srcEvent = input.srcEvent;
      var srcEventTarget;

      if (srcEvent.composedPath) {
        srcEventTarget = srcEvent.composedPath()[0];
      } else if (srcEvent.path) {
        srcEventTarget = srcEvent.path[0];
      } else {
        srcEventTarget = srcEvent.target;
      }

      if (hasParent(srcEventTarget, target)) {
        target = srcEventTarget;
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
      _inheritsLoose(PointerEventInput, _Input);

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
      _inheritsLoose(TouchInput, _Input);

      function TouchInput() {
        var _this;

        TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
        _this = _Input.apply(this, arguments) || this;
        _this.targetIds = {}; // this.evTarget = TOUCH_TARGET_EVENTS;

        return _this;
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
      _inheritsLoose(MouseInput, _Input);

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
        _inheritsLoose(TouchMouseInput, _Input);

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
              recordTouches.call(_assertThisInitialized(_assertThisInitialized(_this)), inputEvent, inputData);
            } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized(_assertThisInitialized(_this)), inputData)) {
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

        this.options = _extends({
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

    /**
     * @private
     * This recognizer is just used as a base for the simple attribute recognizers.
     * @constructor
     * @extends Recognizer
     */

    var AttrRecognizer =
    /*#__PURE__*/
    function (_Recognizer) {
      _inheritsLoose(AttrRecognizer, _Recognizer);

      function AttrRecognizer(options) {
        if (options === void 0) {
          options = {};
        }

        return _Recognizer.call(this, _extends({
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
      _inheritsLoose(PanRecognizer, _AttrRecognizer);

      function PanRecognizer(options) {
        var _this;

        if (options === void 0) {
          options = {};
        }

        _this = _AttrRecognizer.call(this, _extends({
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
     * Pinch
     * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
     * @constructor
     * @extends AttrRecognizer
     */

    var PinchRecognizer =
    /*#__PURE__*/
    function (_AttrRecognizer) {
      _inheritsLoose(PinchRecognizer, _AttrRecognizer);

      function PinchRecognizer(options) {
        if (options === void 0) {
          options = {};
        }

        return _AttrRecognizer.call(this, _extends({
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

    /*
    Copyright (c) 2017 NAVER Corp.
    @egjs/axes project is licensed under the MIT license

    @egjs/axes JavaScript library
    https://github.com/naver/egjs-axes

    @version 2.7.2
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
    var extendStatics$1 = function (d, b) {
      extendStatics$1 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
      extendStatics$1(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$1 = function () {
      __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$1.apply(this, arguments);
    };

    function getInsidePosition(destPos, range, circular, bounce) {
      var toDestPos = destPos;
      var targetRange = [circular[0] ? range[0] : bounce ? range[0] - bounce[0] : range[0], circular[1] ? range[1] : bounce ? range[1] + bounce[1] : range[1]];
      toDestPos = Math.max(targetRange[0], toDestPos);
      toDestPos = Math.min(targetRange[1], toDestPos);
      return toDestPos;
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

      return toPos;
    }

    /* eslint-disable no-new-func, no-nested-ternary */
    var win$2;

    if (typeof window === "undefined") {
      // window is undefined in node.js
      win$2 = {
        navigator: {
          userAgent: ""
        }
      };
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
    function map(obj, callback) {
      var tranformed = {};

      for (var k in obj) {
        k && (tranformed[k] = callback(obj[k], k));
      }

      return tranformed;
    }
    function filter(obj, callback) {
      var filtered = {};

      for (var k in obj) {
        k && callback(obj[k], k) && (filtered[k] = obj[k]);
      }

      return filtered;
    }
    function every(obj, callback) {
      for (var k in obj) {
        if (k && !callback(obj[k], k)) {
          return false;
        }
      }

      return true;
    }
    function equal(target, base) {
      return every(target, function (v, k) {
        return v === base[k];
      });
    }
    var roundNumFunc = {};
    function roundNumber(num, roundUnit) {
      // Cache for performance
      if (!roundNumFunc[roundUnit]) {
        roundNumFunc[roundUnit] = getRoundFunc(roundUnit);
      }

      return roundNumFunc[roundUnit](num);
    }
    function roundNumbers(num, roundUnit) {
      if (!num || !roundUnit) {
        return num;
      }

      var isNumber = typeof roundUnit === "number";
      return map(num, function (value, key) {
        return roundNumber(value, isNumber ? roundUnit : roundUnit[key]);
      });
    }
    function getDecimalPlace(val) {
      if (!isFinite(val)) {
        return 0;
      }

      var v = val + "";

      if (v.indexOf("e") >= 0) {
        // Exponential Format
        // 1e-10, 1e-12
        var p = 0;
        var e = 1;

        while (Math.round(val * e) / e !== val) {
          e *= 10;
          p++;
        }

        return p;
      } // In general, following has performance benefit.
      // https://jsperf.com/precision-calculation


      return v.indexOf(".") >= 0 ? v.length - v.indexOf(".") - 1 : 0;
    }
    function inversePow(n) {
      // replace Math.pow(10, -n) to solve floating point issue.
      // eg. Math.pow(10, -4) => 0.00009999999999999999
      return 1 / Math.pow(10, n);
    }
    function getRoundFunc(v) {
      var p = v < 1 ? Math.pow(10, getDecimalPlace(v)) : 1;
      return function (n) {
        if (v === 0) {
          return 0;
        }

        return Math.round(Math.round(n / v) * v * p) / p;
      };
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
          var durations_1 = map(destPos, function (v, k) {
            return getDuration(Math.abs(v - depaPos[k]), _this.options.deceleration);
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
          var pos = this.axm.map(orgPos_1, function (v, opt) {
            return getCirculatedPos(v, opt.range, opt.circular);
          });

          if (!every(pos, function (v, k) {
            return orgPos_1[k] === v;
          })) {
            this.em.triggerChange(pos, false, orgPos_1, option, !!option);
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
        var destPos = this.axm.map(pos, function (v, opt) {
          return Math.min(opt.range[1], Math.max(opt.range[0], v));
        });
        this.animateTo(destPos, this.getDuration(pos, destPos), option);
      };

      __proto.animationEnd = function () {
        var beforeParam = this.getEventInfo();
        this._animateParam = null; // for Circular

        var circularTargets = this.axm.filter(this.axm.get(), function (v, opt) {
          return isCircularable(v, opt.range, opt.circular);
        });
        Object.keys(circularTargets).length > 0 && this.setTo(this.axm.map(circularTargets, function (v, opt) {
          return getCirculatedPos(v, opt.range, opt.circular);
        }));
        this.itm.setInterrupt(false);
        this.em.triggerAnimationEnd(!!beforeParam);

        if (this.axm.isOutside()) {
          this.restore(beforeParam);
        } else {
          this.finish(!!beforeParam);
        }
      };

      __proto.finish = function (isTrusted) {
        this._animateParam = null;
        this.itm.setInterrupt(false);
        this.em.triggerFinish(isTrusted);
      };

      __proto.animateLoop = function (param, complete) {
        if (param.duration) {
          this._animateParam = __assign$1({}, param);
          var info_1 = this._animateParam;
          var self_1 = this;
          var destPos_1 = info_1.destPos;
          var prevPos_1 = info_1.depaPos;
          var prevEasingPer_1 = 0;
          var directions_1 = map(prevPos_1, function (value, key) {
            return value <= destPos_1[key] ? 1 : -1;
          });
          var originalIntendedPos_1 = map(destPos_1, function (v) {
            return v;
          });
          var prevTime_1 = new Date().getTime();
          info_1.startTime = prevTime_1;

          (function loop() {
            self_1._raf = null;
            var currentTime = new Date().getTime();
            var ratio = (currentTime - info_1.startTime) / param.duration;
            var easingPer = self_1.easing(ratio);
            var toPos = self_1.axm.map(prevPos_1, function (pos, options, key) {
              var nextPos = ratio >= 1 ? destPos_1[key] : pos + info_1.delta[key] * (easingPer - prevEasingPer_1); // Subtract distance from distance already moved.
              // Recalculate the remaining distance.
              // Fix the bouncing phenomenon by changing the range.

              var circulatedPos = getCirculatedPos(nextPos, options.range, options.circular);

              if (nextPos !== circulatedPos) {
                // circular
                var rangeOffset = directions_1[key] * (options.range[1] - options.range[0]);
                destPos_1[key] -= rangeOffset;
                prevPos_1[key] -= rangeOffset;
              }

              return circulatedPos;
            });
            var isCanceled = !self_1.em.triggerChange(toPos, false, prevPos_1);
            prevPos_1 = toPos;
            prevTime_1 = currentTime;
            prevEasingPer_1 = easingPer;

            if (easingPer >= 1) {
              destPos_1 = self_1.getFinalPos(destPos_1, originalIntendedPos_1);

              if (!equal(destPos_1, self_1.axm.get(Object.keys(destPos_1)))) {
                self_1.em.triggerChange(destPos_1, true, prevPos_1);
              }

              complete();
              return;
            } else if (isCanceled) {
              self_1.finish(false);
            } else {
              // animationEnd
              self_1._raf = requestAnimationFrame(loop);
            }
          })();
        } else {
          this.em.triggerChange(param.destPos, true);
          complete();
        }
      };
      /**
       * Get estimated final value.
       *
       * If destPos is within the 'error range' of the original intended position, the initial intended position is returned.
       *   - eg. original intended pos: 100, destPos: 100.0000000004 ==> return 100;
       * If dest Pos is outside the 'range of error' compared to the originally intended pos, it is returned rounded based on the originally intended pos.
       *   - eg. original intended pos: 100.123 destPos: 50.12345 => return 50.123
       *
       * @param originalIntendedPos
       * @param destPos
       */


      __proto.getFinalPos = function (destPos, originalIntendedPos) {
        var _this = this; // compare destPos and originalIntendedPos


        var ERROR_LIMIT = 0.000001;
        var finalPos = map(destPos, function (value, key) {
          if (value >= originalIntendedPos[key] - ERROR_LIMIT && value <= originalIntendedPos[key] + ERROR_LIMIT) {
            // In error range, return original intended
            return originalIntendedPos[key];
          } else {
            // Out of error range, return rounded pos.
            var roundUnit = _this.getRoundUnit(value, key);

            var result = roundNumber(value, roundUnit);
            return result;
          }
        });
        return finalPos;
      };

      __proto.getRoundUnit = function (val, key) {
        var roundUnit = this.options.round; // manual mode

        var minRoundUnit = null; // auto mode
        // auto mode

        if (!roundUnit) {
          // Get minimum round unit
          var options = this.axm.getAxisOptions(key);
          minRoundUnit = inversePow(Math.max(getDecimalPlace(options.range[0]), getDecimalPlace(options.range[1]), getDecimalPlace(val)));
        }

        return minRoundUnit || roundUnit;
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

        var depaPos = __assign$1({}, param.depaPos);

        var retTrigger = this.em.triggerAnimationStart(param); // to control

        var userWish = this.getUserControll(param); // You can't stop the 'animationStart' event when 'circular' is true.

        if (!retTrigger && this.axm.every(userWish.destPos, function (v, opt) {
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
        var movedPos = filter(pos, function (v, k) {
          return orgPos[k] !== v;
        });

        if (!Object.keys(movedPos).length) {
          return this;
        }

        movedPos = this.axm.map(movedPos, function (v, opt) {
          var range = opt.range,
              circular = opt.circular;

          if (circular && (circular[0] || circular[1])) {
            return v;
          } else {
            return getInsidePosition(v, range, circular);
          }
        });

        if (equal(movedPos, orgPos)) {
          return this;
        }

        if (duration > 0) {
          this.animateTo(movedPos, duration);
        } else {
          this.em.triggerChange(movedPos);
          this.finish(false);
        }

        return this;
      };

      __proto.setBy = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        }

        return this.setTo(map(this.axm.get(Object.keys(pos)), function (v, k) {
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
        var roundPos = this.getRoundPos(pos).roundPos;
        this.axes.trigger("hold", {
          pos: roundPos,
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
        var _a = this.getRoundPos(param.destPos, param.depaPos),
            roundPos = _a.roundPos,
            roundDepa = _a.roundDepa;

        param.destPos = roundPos;
        param.depaPos = roundDepa;
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


      __proto.triggerChange = function (pos, isAccurate, depaPos, option, holding) {
        if (holding === void 0) {
          holding = false;
        }

        var am = this.am;
        var axm = am.axm;
        var eventInfo = am.getEventInfo();

        var _a = this.getRoundPos(pos, depaPos),
            roundPos = _a.roundPos,
            roundDepa = _a.roundDepa;

        var moveTo = axm.moveTo(roundPos, roundDepa);
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
        var result = this.axes.trigger("change", param);
        inputEvent && axm.set(param.set()["destPos"]);
        return result;
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
        var _a = this.getRoundPos(param.destPos, param.depaPos),
            roundPos = _a.roundPos,
            roundDepa = _a.roundDepa;

        param.destPos = roundPos;
        param.depaPos = roundDepa;
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
          destPos: __assign$1({}, pos),
          duration: duration
        };
        return function (toPos, userDuration) {
          toPos && (userControl.destPos = __assign$1({}, toPos));
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

      __proto.getRoundPos = function (pos, depaPos) {
        // round value if round exist
        var roundUnit = this.axes.options.round; // if (round == null) {
        // 	return {pos, depaPos}; // undefined, undefined
        // }

        return {
          roundPos: roundNumbers(pos, roundUnit),
          roundDepa: roundNumbers(depaPos, roundUnit)
        };
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
          _this.axis[axis] = __assign$1({
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
        return map(this.get(destPos), function (v, k) {
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
          return __assign$1(__assign$1({}, this._pos), axes || {});
        }
      };

      __proto.moveTo = function (pos, depaPos) {
        if (depaPos === void 0) {
          depaPos = this._pos;
        }

        var delta = map(this._pos, function (v, key) {
          return key in pos && key in depaPos ? pos[key] - depaPos[key] : 0;
        });
        this.set(this.map(pos, function (v, opt) {
          return opt ? getCirculatedPos(v, opt.range, opt.circular) : 0;
        }));
        return {
          pos: __assign$1({}, this._pos),
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
        return every(pos, function (value, key) {
          return callback(value, axisOptions[key], key);
        });
      };

      __proto.filter = function (pos, callback) {
        var axisOptions = this.axis;
        return filter(pos, function (value, key) {
          return callback(value, axisOptions[key], key);
        });
      };

      __proto.map = function (pos, callback) {
        var axisOptions = this.axis;
        return map(pos, function (value, key) {
          return callback(value, axisOptions[key], key);
        });
      };

      __proto.isOutside = function (axes) {
        return !this.every(axes ? this.get(axes) : this._pos, function (v, opt) {
          return !isOutside(v, opt.range);
        });
      };

      __proto.getAxisOptions = function (key) {
        return this.axis[key];
      };

      return AxisManager;
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
        this.isStopped = false;
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
          return this.axm.map(pos, function (v, opt) {
            var tn = opt.range[0] - opt.bounce[0];
            var tx = opt.range[1] + opt.bounce[1];
            return v > tx ? tx : v < tn ? tn : v;
          });
        } else {
          // when start pointer is held in inside
          // get a initialization slope value to prevent smooth animation.
          var initSlope_1 = this.am.easing(0.00001) / 0.00001;
          return this.axm.map(pos, function (v, opt) {
            var min = opt.range[0];
            var max = opt.range[1];
            var out = opt.bounce;
            var circular = opt.circular;

            if (circular && (circular[0] || circular[1])) {
              return v;
            } else if (v < min) {
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
        this.isStopped = false;
        this.itm.setInterrupt(true);
        this.am.grab(input.axes, changeOption);
        !this.moveDistance && this.em.triggerHold(this.axm.get(), changeOption);
        this.isOutside = this.axm.isOutside(input.axes);
        this.moveDistance = this.axm.get(input.axes);
      };

      __proto.change = function (input, event, offset) {
        if (this.isStopped || !this.itm.isInterrupting() || this.axm.every(offset, function (v) {
          return v === 0;
        })) {
          return;
        }

        var depaPos = this.moveDistance || this.axm.get(input.axes);
        var destPos; // for outside logic

        destPos = map(depaPos, function (v, k) {
          return v + (offset[k] || 0);
        });
        this.moveDistance && (this.moveDistance = destPos); // from outside to inside

        if (this.isOutside && this.axm.every(depaPos, function (v, opt) {
          return !isOutside(v, opt.range);
        })) {
          this.isOutside = false;
        }

        depaPos = this.atOutside(depaPos);
        destPos = this.atOutside(destPos);
        var isCanceled = !this.em.triggerChange(destPos, false, depaPos, {
          input: input,
          event: event
        }, true);

        if (isCanceled) {
          this.isStopped = true;
          this.moveDistance = null;
          this.am.finish(false);
        }
      };

      __proto.release = function (input, event, offset, inputDuration) {
        if (this.isStopped || !this.itm.isInterrupting() || !this.moveDistance) {
          return;
        }

        var pos = this.axm.get(input.axes);
        var depaPos = this.axm.get();
        var destPos = this.axm.get(this.axm.map(offset, function (v, opt, k) {
          if (opt.circular && (opt.circular[0] || opt.circular[1])) {
            return pos[k] + v;
          } else {
            return getInsidePosition(pos[k] + v, opt.range, opt.circular, opt.bounce);
          }
        }));
        var duration = this.am.getDuration(destPos, pos, inputDuration);

        if (duration === 0) {
          destPos = __assign$1({}, depaPos);
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
          !isEqual && this.em.triggerChange(userWish.destPos, false, depaPos, changeOption, true);
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
    }();

    // export const DIRECTION_NONE = 1;
    var IOS_EDGE_THRESHOLD = 30;
    var IS_IOS_SAFARI = "ontouchstart" in win$2 && agent().browser.name === "safari";
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
     * @property {Number} [round = null] Rounding unit. For example, 0.1 rounds to 0.1 decimal point(6.1234 => 6.1), 5 rounds to 5 (93 => 95) <br>[Details](https://github.com/naver/egjs-axes/wiki/round-option)<ko>반올림 단위. 예를 들어 0.1 은 소숫점 0.1 까지 반올림(6.1234 => 6.1), 5 는 5 단위로 반올림(93 => 95).<br>[상세내용](https://github.com/naver/egjs-axes/wiki/round-option)</ko>
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
      __extends$1(Axes, _super);

      function Axes(axis, options, startPos) {
        if (axis === void 0) {
          axis = {};
        }

        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.axis = axis;
        _this._inputs = [];
        _this.options = __assign$1({
          easing: function easeOutCubic(x) {
            return 1 - Math.pow(1 - x, 3);
          },
          interruptable: true,
          maximumDuration: Infinity,
          minimumDuration: 0,
          deceleration: 0.0006,
          round: null
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


      Axes.VERSION = "2.7.2";
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
    var SUPPORT_TOUCH$2 = ("ontouchstart" in win$2);
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
        return new Manager(element, __assign$1({}, options));
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
     * @property {Number} [iOSEdgeSwipeThreshold=30] Area (px) that can go to the next page when swiping the right edge in iOS safari <ko>iOS Safari에서 오른쪽 엣지를 스와이프 하는 경우 다음 페이지로 넘어갈 수 있는 영역(px)</ko>
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
        this.isRightEdge = false;
        this.rightEdgeTimer = 0;
        this.panFlag = false;
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
        this.options = __assign$1({
          inputType: ["touch", "mouse", "pointer"],
          scale: [1, 1],
          thresholdAngle: 45,
          threshold: 0,
          iOSEdgeSwipeThreshold: IOS_EDGE_THRESHOLD,
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

          this.hammer = createHammer(this.element, __assign$1({
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
            this.panFlag = false;

            if (event.srcEvent.cancelable !== false) {
              var edgeThreshold = this.options.iOSEdgeSwipeThreshold;
              this.observer.hold(this, event);
              this.isRightEdge = IS_IOS_SAFARI && event.center.x > window.innerWidth - edgeThreshold;
              this.panFlag = true;
            }
          } else if (event.isFinal) {
            this.onPanend(event);
          }
        }
      };

      __proto.onPanmove = function (event) {
        var _this = this;

        if (!this.panFlag) {
          return;
        }

        var userDirection = getDirectionByAngle(event.angle, this.options.thresholdAngle); // not support offset properties in Hammerjs - start

        var prevInput = this.hammer.session.prevInput;

        if (prevInput && IS_IOS_SAFARI) {
          var swipeLeftToRight = event.center.x < 0;

          if (swipeLeftToRight) {
            // iOS swipe left => right
            this.onPanend(__assign$1(__assign$1({}, prevInput), {
              velocityX: 0,
              velocityY: 0,
              offsetX: 0,
              offsetY: 0
            }));
            return;
          } else if (this.isRightEdge) {
            clearTimeout(this.rightEdgeTimer); // - is right to left

            var edgeThreshold = this.options.iOSEdgeSwipeThreshold;
            var swipeRightToLeft = event.deltaX < -edgeThreshold;

            if (swipeRightToLeft) {
              this.isRightEdge = false;
            } else {
              // iOS swipe right => left
              this.rightEdgeTimer = window.setTimeout(function () {
                _this.onPanend(__assign$1(__assign$1({}, prevInput), {
                  velocityX: 0,
                  velocityY: 0,
                  offsetX: 0,
                  offsetY: 0
                }));
              }, 100);
            }
          }
        }
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
          var srcEvent = event.srcEvent;

          if (srcEvent.cancelable !== false) {
            srcEvent.preventDefault();
          }

          srcEvent.stopPropagation();
        }

        event.preventSystemEvent = prevent;
        prevent && this.observer.change(this, event, toAxis(this.axes, offset));
      };

      __proto.onPanend = function (event) {
        if (!this.panFlag) {
          return;
        }

        clearTimeout(this.rightEdgeTimer);
        this.panFlag = false;
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
        this.options = __assign$1({
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

          this.hammer = createHammer(this.element, __assign$1({
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
        this.options = __assign$1({
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
        this.options = __assign$1({
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

    /**
     * Common utilities
     * @module glMatrix
     */
    // Configuration Constants
    var EPSILON = 0.000001;
    var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
    var degree = Math.PI / 180;
    /**
     * Convert Degree To Radian
     *
     * @param {Number} a Angle in Degrees
     */

    function toRadian(a) {
      return a * degree;
    }
    if (!Math.hypot) Math.hypot = function () {
      var y = 0,
          i = arguments.length;

      while (i--) {
        y += arguments[i] * arguments[i];
      }

      return Math.sqrt(y);
    };

    /**
     * 3x3 Matrix
     * @module mat3
     */

    /**
     * Creates a new identity mat3
     *
     * @returns {mat3} a new 3x3 matrix
     */

    function create() {
      var out = new ARRAY_TYPE(9);

      if (ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
      }

      out[0] = 1;
      out[4] = 1;
      out[8] = 1;
      return out;
    }
    /**
     * Copies the upper-left 3x3 values into the given mat3.
     *
     * @param {mat3} out the receiving 3x3 matrix
     * @param {ReadonlyMat4} a   the source 4x4 matrix
     * @returns {mat3} out
     */

    function fromMat4(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[4];
      out[4] = a[5];
      out[5] = a[6];
      out[6] = a[8];
      out[7] = a[9];
      out[8] = a[10];
      return out;
    }
    /**
     * Inverts a mat3
     *
     * @param {mat3} out the receiving matrix
     * @param {ReadonlyMat3} a the source matrix
     * @returns {mat3} out
     */

    function invert(out, a) {
      var a00 = a[0],
          a01 = a[1],
          a02 = a[2];
      var a10 = a[3],
          a11 = a[4],
          a12 = a[5];
      var a20 = a[6],
          a21 = a[7],
          a22 = a[8];
      var b01 = a22 * a11 - a12 * a21;
      var b11 = -a22 * a10 + a12 * a20;
      var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

      var det = a00 * b01 + a01 * b11 + a02 * b21;

      if (!det) {
        return null;
      }

      det = 1.0 / det;
      out[0] = b01 * det;
      out[1] = (-a22 * a01 + a02 * a21) * det;
      out[2] = (a12 * a01 - a02 * a11) * det;
      out[3] = b11 * det;
      out[4] = (a22 * a00 - a02 * a20) * det;
      out[5] = (-a12 * a00 + a02 * a10) * det;
      out[6] = b21 * det;
      out[7] = (-a21 * a00 + a01 * a20) * det;
      out[8] = (a11 * a00 - a01 * a10) * det;
      return out;
    }

    /**
     * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
     * @module mat4
     */

    /**
     * Creates a new identity mat4
     *
     * @returns {mat4} a new 4x4 matrix
     */

    function create$1() {
      var out = new ARRAY_TYPE(16);

      if (ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
      }

      out[0] = 1;
      out[5] = 1;
      out[10] = 1;
      out[15] = 1;
      return out;
    }
    /**
     * Set a mat4 to the identity matrix
     *
     * @param {mat4} out the receiving matrix
     * @returns {mat4} out
     */

    function identity(out) {
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
    }
    /**
     * Rotates a matrix by the given angle around the X axis
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat4} out
     */

    function rotateX(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a10 = a[4];
      var a11 = a[5];
      var a12 = a[6];
      var a13 = a[7];
      var a20 = a[8];
      var a21 = a[9];
      var a22 = a[10];
      var a23 = a[11];

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
    }
    /**
     * Rotates a matrix by the given angle around the Y axis
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat4} out
     */

    function rotateY(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a00 = a[0];
      var a01 = a[1];
      var a02 = a[2];
      var a03 = a[3];
      var a20 = a[8];
      var a21 = a[9];
      var a22 = a[10];
      var a23 = a[11];

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
    }
    /**
     * Calculates a 4x4 matrix from the given quaternion
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {ReadonlyQuat} q Quaternion to create matrix from
     *
     * @returns {mat4} out
     */

    function fromQuat(out, q) {
      var x = q[0],
          y = q[1],
          z = q[2],
          w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var yx = y * x2;
      var yy = y * y2;
      var zx = z * x2;
      var zy = z * y2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
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
    }
    /**
     * Generates a perspective projection matrix with the given bounds.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     *
     * @param {mat4} out mat4 frustum matrix will be written into
     * @param {number} fovy Vertical field of view in radians
     * @param {number} aspect Aspect ratio. typically viewport width/height
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum, can be null or Infinity
     * @returns {mat4} out
     */

    function perspective(out, fovy, aspect, near, far) {
      var f = 1.0 / Math.tan(fovy / 2),
          nf;
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
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;

      if (far != null && far !== Infinity) {
        nf = 1 / (near - far);
        out[10] = (far + near) * nf;
        out[14] = 2 * far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -2 * near;
      }

      return out;
    }

    /**
     * 3 Dimensional Vector
     * @module vec3
     */

    /**
     * Creates a new, empty vec3
     *
     * @returns {vec3} a new 3D vector
     */

    function create$2() {
      var out = new ARRAY_TYPE(3);

      if (ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
      }

      return out;
    }
    /**
     * Calculates the length of a vec3
     *
     * @param {ReadonlyVec3} a vector to calculate length of
     * @returns {Number} length of a
     */

    function length(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      return Math.hypot(x, y, z);
    }
    /**
     * Creates a new vec3 initialized with the given values
     *
     * @param {Number} x X component
     * @param {Number} y Y component
     * @param {Number} z Z component
     * @returns {vec3} a new 3D vector
     */

    function fromValues(x, y, z) {
      var out = new ARRAY_TYPE(3);
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
    }
    /**
     * Copy the values from one vec3 to another
     *
     * @param {vec3} out the receiving vector
     * @param {ReadonlyVec3} a the source vector
     * @returns {vec3} out
     */

    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      return out;
    }
    /**
     * Set the components of a vec3 to the given values
     *
     * @param {vec3} out the receiving vector
     * @param {Number} x X component
     * @param {Number} y Y component
     * @param {Number} z Z component
     * @returns {vec3} out
     */

    function set(out, x, y, z) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
    }
    /**
     * Subtracts vector b from vector a
     *
     * @param {vec3} out the receiving vector
     * @param {ReadonlyVec3} a the first operand
     * @param {ReadonlyVec3} b the second operand
     * @returns {vec3} out
     */

    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      return out;
    }
    /**
     * Scales a vec3 by a scalar number
     *
     * @param {vec3} out the receiving vector
     * @param {ReadonlyVec3} a the vector to scale
     * @param {Number} b amount to scale the vector by
     * @returns {vec3} out
     */

    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      return out;
    }
    /**
     * Normalize a vec3
     *
     * @param {vec3} out the receiving vector
     * @param {ReadonlyVec3} a vector to normalize
     * @returns {vec3} out
     */

    function normalize(out, a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var len = x * x + y * y + z * z;

      if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
      }

      out[0] = a[0] * len;
      out[1] = a[1] * len;
      out[2] = a[2] * len;
      return out;
    }
    /**
     * Calculates the dot product of two vec3's
     *
     * @param {ReadonlyVec3} a the first operand
     * @param {ReadonlyVec3} b the second operand
     * @returns {Number} dot product of a and b
     */

    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    /**
     * Computes the cross product of two vec3's
     *
     * @param {vec3} out the receiving vector
     * @param {ReadonlyVec3} a the first operand
     * @param {ReadonlyVec3} b the second operand
     * @returns {vec3} out
     */

    function cross(out, a, b) {
      var ax = a[0],
          ay = a[1],
          az = a[2];
      var bx = b[0],
          by = b[1],
          bz = b[2];
      out[0] = ay * bz - az * by;
      out[1] = az * bx - ax * bz;
      out[2] = ax * by - ay * bx;
      return out;
    }
    /**
     * Transforms the vec3 with a mat3.
     *
     * @param {vec3} out the receiving vector
     * @param {ReadonlyVec3} a the vector to transform
     * @param {ReadonlyMat3} m the 3x3 matrix to transform with
     * @returns {vec3} out
     */

    function transformMat3(out, a, m) {
      var x = a[0],
          y = a[1],
          z = a[2];
      out[0] = x * m[0] + y * m[3] + z * m[6];
      out[1] = x * m[1] + y * m[4] + z * m[7];
      out[2] = x * m[2] + y * m[5] + z * m[8];
      return out;
    }
    /**
     * Transforms the vec3 with a quat
     * Can also be used for dual quaternions. (Multiply it with the real part)
     *
     * @param {vec3} out the receiving vector
     * @param {ReadonlyVec3} a the vector to transform
     * @param {ReadonlyQuat} q quaternion to transform with
     * @returns {vec3} out
     */

    function transformQuat(out, a, q) {
      // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
      var qx = q[0],
          qy = q[1],
          qz = q[2],
          qw = q[3];
      var x = a[0],
          y = a[1],
          z = a[2]; // var qvec = [qx, qy, qz];
      // var uv = vec3.cross([], qvec, a);

      var uvx = qy * z - qz * y,
          uvy = qz * x - qx * z,
          uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

      var uuvx = qy * uvz - qz * uvy,
          uuvy = qz * uvx - qx * uvz,
          uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

      var w2 = qw * 2;
      uvx *= w2;
      uvy *= w2;
      uvz *= w2; // vec3.scale(uuv, uuv, 2);

      uuvx *= 2;
      uuvy *= 2;
      uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

      out[0] = x + uvx + uuvx;
      out[1] = y + uvy + uuvy;
      out[2] = z + uvz + uuvz;
      return out;
    }
    /**
     * Alias for {@link vec3.length}
     * @function
     */

    var len = length;
    /**
     * Perform some operation over an array of vec3s.
     *
     * @param {Array} a the array of vectors to iterate over
     * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
     * @param {Number} offset Number of elements to skip at the beginning of the array
     * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
     * @param {Function} fn Function to call for each vector in the array
     * @param {Object} [arg] additional argument to pass to fn
     * @returns {Array} a
     * @function
     */

    var forEach = function () {
      var vec = create$2();
      return function (a, stride, offset, count, fn, arg) {
        var i, l;

        if (!stride) {
          stride = 3;
        }

        if (!offset) {
          offset = 0;
        }

        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }

        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          vec[2] = a[i + 2];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
          a[i + 2] = vec[2];
        }

        return a;
      };
    }();

    /**
     * 4 Dimensional Vector
     * @module vec4
     */

    /**
     * Creates a new, empty vec4
     *
     * @returns {vec4} a new 4D vector
     */

    function create$3() {
      var out = new ARRAY_TYPE(4);

      if (ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
      }

      return out;
    }
    /**
     * Creates a new vec4 initialized with values from an existing vector
     *
     * @param {ReadonlyVec4} a vector to clone
     * @returns {vec4} a new 4D vector
     */

    function clone(a) {
      var out = new ARRAY_TYPE(4);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    /**
     * Creates a new vec4 initialized with the given values
     *
     * @param {Number} x X component
     * @param {Number} y Y component
     * @param {Number} z Z component
     * @param {Number} w W component
     * @returns {vec4} a new 4D vector
     */

    function fromValues$1(x, y, z, w) {
      var out = new ARRAY_TYPE(4);
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = w;
      return out;
    }
    /**
     * Copy the values from one vec4 to another
     *
     * @param {vec4} out the receiving vector
     * @param {ReadonlyVec4} a the source vector
     * @returns {vec4} out
     */

    function copy$1(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    /**
     * Normalize a vec4
     *
     * @param {vec4} out the receiving vector
     * @param {ReadonlyVec4} a vector to normalize
     * @returns {vec4} out
     */

    function normalize$1(out, a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var w = a[3];
      var len = x * x + y * y + z * z + w * w;

      if (len > 0) {
        len = 1 / Math.sqrt(len);
      }

      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
      out[3] = w * len;
      return out;
    }
    /**
     * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
     *
     * @param {ReadonlyVec4} a The first vector.
     * @param {ReadonlyVec4} b The second vector.
     * @returns {Boolean} True if the vectors are equal, false otherwise.
     */

    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    /**
     * Returns whether or not the vectors have approximately the same elements in the same position.
     *
     * @param {ReadonlyVec4} a The first vector.
     * @param {ReadonlyVec4} b The second vector.
     * @returns {Boolean} True if the vectors are equal, false otherwise.
     */

    function equals(a, b) {
      var a0 = a[0],
          a1 = a[1],
          a2 = a[2],
          a3 = a[3];
      var b0 = b[0],
          b1 = b[1],
          b2 = b[2],
          b3 = b[3];
      return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
    }
    /**
     * Perform some operation over an array of vec4s.
     *
     * @param {Array} a the array of vectors to iterate over
     * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
     * @param {Number} offset Number of elements to skip at the beginning of the array
     * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
     * @param {Function} fn Function to call for each vector in the array
     * @param {Object} [arg] additional argument to pass to fn
     * @returns {Array} a
     * @function
     */

    var forEach$1 = function () {
      var vec = create$3();
      return function (a, stride, offset, count, fn, arg) {
        var i, l;

        if (!stride) {
          stride = 4;
        }

        if (!offset) {
          offset = 0;
        }

        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }

        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          vec[2] = a[i + 2];
          vec[3] = a[i + 3];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
          a[i + 2] = vec[2];
          a[i + 3] = vec[3];
        }

        return a;
      };
    }();

    /**
     * Quaternion
     * @module quat
     */

    /**
     * Creates a new identity quat
     *
     * @returns {quat} a new quaternion
     */

    function create$4() {
      var out = new ARRAY_TYPE(4);

      if (ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
      }

      out[3] = 1;
      return out;
    }
    /**
     * Sets a quat from the given angle and rotation axis,
     * then returns it.
     *
     * @param {quat} out the receiving quaternion
     * @param {ReadonlyVec3} axis the axis around which to rotate
     * @param {Number} rad the angle in radians
     * @returns {quat} out
     **/

    function setAxisAngle(out, axis, rad) {
      rad = rad * 0.5;
      var s = Math.sin(rad);
      out[0] = s * axis[0];
      out[1] = s * axis[1];
      out[2] = s * axis[2];
      out[3] = Math.cos(rad);
      return out;
    }
    /**
     * Multiplies two quat's
     *
     * @param {quat} out the receiving quaternion
     * @param {ReadonlyQuat} a the first operand
     * @param {ReadonlyQuat} b the second operand
     * @returns {quat} out
     */

    function multiply(out, a, b) {
      var ax = a[0],
          ay = a[1],
          az = a[2],
          aw = a[3];
      var bx = b[0],
          by = b[1],
          bz = b[2],
          bw = b[3];
      out[0] = ax * bw + aw * bx + ay * bz - az * by;
      out[1] = ay * bw + aw * by + az * bx - ax * bz;
      out[2] = az * bw + aw * bz + ax * by - ay * bx;
      out[3] = aw * bw - ax * bx - ay * by - az * bz;
      return out;
    }
    /**
     * Performs a spherical linear interpolation between two quat
     *
     * @param {quat} out the receiving quaternion
     * @param {ReadonlyQuat} a the first operand
     * @param {ReadonlyQuat} b the second operand
     * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
     * @returns {quat} out
     */

    function slerp(out, a, b, t) {
      // benchmarks:
      //    http://jsperf.com/quaternion-slerp-implementations
      var ax = a[0],
          ay = a[1],
          az = a[2],
          aw = a[3];
      var bx = b[0],
          by = b[1],
          bz = b[2],
          bw = b[3];
      var omega, cosom, sinom, scale0, scale1; // calc cosine

      cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

      if (cosom < 0.0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
      } // calculate coefficients


      if (1.0 - cosom > EPSILON) {
        // standard case (slerp)
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
      } else {
        // "from" and "to" quaternions are very close
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
      } // calculate final values


      out[0] = scale0 * ax + scale1 * bx;
      out[1] = scale0 * ay + scale1 * by;
      out[2] = scale0 * az + scale1 * bz;
      out[3] = scale0 * aw + scale1 * bw;
      return out;
    }
    /**
     * Calculates the conjugate of a quat
     * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
     *
     * @param {quat} out the receiving quaternion
     * @param {ReadonlyQuat} a quat to calculate conjugate of
     * @returns {quat} out
     */

    function conjugate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a[3];
      return out;
    }
    /**
     * Creates a quaternion from the given 3x3 rotation matrix.
     *
     * NOTE: The resultant quaternion is not normalized, so you should be sure
     * to renormalize the quaternion yourself where necessary.
     *
     * @param {quat} out the receiving quaternion
     * @param {ReadonlyMat3} m rotation matrix
     * @returns {quat} out
     * @function
     */

    function fromMat3(out, m) {
      // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
      // article "Quaternion Calculus and Fast Animation".
      var fTrace = m[0] + m[4] + m[8];
      var fRoot;

      if (fTrace > 0.0) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0); // 2w

        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot; // 1/(4w)

        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
      } else {
        // |w| <= 1/2
        var i = 0;
        if (m[4] > m[0]) i = 1;
        if (m[8] > m[i * 3 + i]) i = 2;
        var j = (i + 1) % 3;
        var k = (i + 2) % 3;
        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
      }

      return out;
    }
    /**
     * Creates a new quat initialized with values from an existing quaternion
     *
     * @param {ReadonlyQuat} a quaternion to clone
     * @returns {quat} a new quaternion
     * @function
     */

    var clone$1 = clone;
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

    var fromValues$2 = fromValues$1;
    /**
     * Copy the values from one quat to another
     *
     * @param {quat} out the receiving quaternion
     * @param {ReadonlyQuat} a the source quaternion
     * @returns {quat} out
     * @function
     */

    var copy$2 = copy$1;
    /**
     * Normalize a quat
     *
     * @param {quat} out the receiving quaternion
     * @param {ReadonlyQuat} a quaternion to normalize
     * @returns {quat} out
     * @function
     */

    var normalize$2 = normalize$1;
    /**
     * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
     *
     * @param {ReadonlyQuat} a The first quaternion.
     * @param {ReadonlyQuat} b The second quaternion.
     * @returns {Boolean} True if the vectors are equal, false otherwise.
     */

    var exactEquals$1 = exactEquals;
    /**
     * Returns whether or not the quaternions have approximately the same elements in the same position.
     *
     * @param {ReadonlyQuat} a The first vector.
     * @param {ReadonlyQuat} b The second vector.
     * @returns {Boolean} True if the vectors are equal, false otherwise.
     */

    var equals$1 = equals;
    /**
     * Sets a quaternion to represent the shortest rotation from one
     * vector to another.
     *
     * Both vectors are assumed to be unit length.
     *
     * @param {quat} out the receiving quaternion.
     * @param {ReadonlyVec3} a the initial vector
     * @param {ReadonlyVec3} b the destination vector
     * @returns {quat} out
     */

    var rotationTo = function () {
      var tmpvec3 = create$2();
      var xUnitVec3 = fromValues(1, 0, 0);
      var yUnitVec3 = fromValues(0, 1, 0);
      return function (out, a, b) {
        var dot$1 = dot(a, b);

        if (dot$1 < -0.999999) {
          cross(tmpvec3, xUnitVec3, a);
          if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
          normalize(tmpvec3, tmpvec3);
          setAxisAngle(out, tmpvec3, Math.PI);
          return out;
        } else if (dot$1 > 0.999999) {
          out[0] = 0;
          out[1] = 0;
          out[2] = 0;
          out[3] = 1;
          return out;
        } else {
          cross(tmpvec3, a, b);
          out[0] = tmpvec3[0];
          out[1] = tmpvec3[1];
          out[2] = tmpvec3[2];
          out[3] = 1 + dot$1;
          return normalize$2(out, out);
        }
      };
    }();
    /**
     * Performs a spherical linear interpolation with two control points
     *
     * @param {quat} out the receiving quaternion
     * @param {ReadonlyQuat} a the first operand
     * @param {ReadonlyQuat} b the second operand
     * @param {ReadonlyQuat} c the third operand
     * @param {ReadonlyQuat} d the fourth operand
     * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
     * @returns {quat} out
     */

    var sqlerp = function () {
      var temp1 = create$4();
      var temp2 = create$4();
      return function (out, a, b, c, d, t) {
        slerp(temp1, a, d, t);
        slerp(temp2, b, c, t);
        slerp(out, temp1, temp2, 2 * t * (1 - t));
        return out;
      };
    }();
    /**
     * Sets the specified quaternion with values corresponding to the given
     * axes. Each axis is a vec3 and is expected to be unit length and
     * perpendicular to all other specified axes.
     *
     * @param {ReadonlyVec3} view  the vector representing the viewing direction
     * @param {ReadonlyVec3} right the vector representing the local "right" direction
     * @param {ReadonlyVec3} up    the vector representing the local "up" direction
     * @returns {quat} out
     */

    var setAxes = function () {
      var matr = create();
      return function (out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];
        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];
        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];
        return normalize$2(out, fromMat3(out, matr));
      };
    }();

    /**
     * 2 Dimensional Vector
     * @module vec2
     */

    /**
     * Creates a new, empty vec2
     *
     * @returns {vec2} a new 2D vector
     */

    function create$5() {
      var out = new ARRAY_TYPE(2);

      if (ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
      }

      return out;
    }
    /**
     * Creates a new vec2 initialized with the given values
     *
     * @param {Number} x X component
     * @param {Number} y Y component
     * @returns {vec2} a new 2D vector
     */

    function fromValues$3(x, y) {
      var out = new ARRAY_TYPE(2);
      out[0] = x;
      out[1] = y;
      return out;
    }
    /**
     * Copy the values from one vec2 to another
     *
     * @param {vec2} out the receiving vector
     * @param {ReadonlyVec2} a the source vector
     * @returns {vec2} out
     */

    function copy$3(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      return out;
    }
    /**
     * Normalize a vec2
     *
     * @param {vec2} out the receiving vector
     * @param {ReadonlyVec2} a vector to normalize
     * @returns {vec2} out
     */

    function normalize$3(out, a) {
      var x = a[0],
          y = a[1];
      var len = x * x + y * y;

      if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
      }

      out[0] = a[0] * len;
      out[1] = a[1] * len;
      return out;
    }
    /**
     * Calculates the dot product of two vec2's
     *
     * @param {ReadonlyVec2} a the first operand
     * @param {ReadonlyVec2} b the second operand
     * @returns {Number} dot product of a and b
     */

    function dot$1(a, b) {
      return a[0] * b[0] + a[1] * b[1];
    }
    /**
     * Perform some operation over an array of vec2s.
     *
     * @param {Array} a the array of vectors to iterate over
     * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
     * @param {Number} offset Number of elements to skip at the beginning of the array
     * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
     * @param {Function} fn Function to call for each vector in the array
     * @param {Object} [arg] additional argument to pass to fn
     * @returns {Array} a
     * @function
     */

    var forEach$2 = function () {
      var vec = create$5();
      return function (a, stride, offset, count, fn, arg) {
        var i, l;

        if (!stride) {
          stride = 2;
        }

        if (!offset) {
          offset = 0;
        }

        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }

        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
        }

        return a;
      };
    }();

    /**
     * Original Code
     * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix.js
     * Math Util
     * modified by egjs
     */

    function quatToVec3(quaternion) {
      var baseV = fromValues(0, 0, 1);
      transformQuat(baseV, baseV, quaternion);
      return baseV;
    }

    function toDegree(a) {
      return a * 180 / Math.PI;
    }

    var util = {};

    util.isPowerOfTwo = function (n) {
      return n && (n & n - 1) === 0;
    };

    util.extractPitchFromQuat = function (quaternion) {
      var baseV = quatToVec3(quaternion);
      return -1 * Math.atan2(baseV[1], Math.sqrt(Math.pow(baseV[0], 2) + Math.pow(baseV[2], 2)));
    };

    util.hypot = Math.hypot || function (x, y) {
      return Math.sqrt(x * x + y * y);
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
      var targetAxis = fromValues(ROTATE_CONSTANT[rotateKind].targetAxis[0], ROTATE_CONSTANT[rotateKind].targetAxis[1], ROTATE_CONSTANT[rotateKind].targetAxis[2]);
      var meshPoint = ROTATE_CONSTANT[rotateKind].meshPoint;
      var prevQuaternion = clone$1(prevQ);
      var curQuaternion = clone$1(curQ);
      normalize$2(prevQuaternion, prevQuaternion);
      normalize$2(curQuaternion, curQuaternion);
      var prevPoint = fromValues(0, 0, 1);
      var curPoint = fromValues(0, 0, 1);
      transformQuat(prevPoint, prevPoint, prevQuaternion);
      transformQuat(curPoint, curPoint, curQuaternion);
      transformQuat(targetAxis, targetAxis, curQuaternion);
      var rotateDistance = dot(targetAxis, cross(create$2(), prevPoint, curPoint));
      var rotateDirection = rotateDistance > 0 ? 1 : -1; // when counter clock wise, use vec3.fromValues(0,1,0)
      // when clock wise, use vec3.fromValues(0,-1,0)
      // const meshPoint1 = vec3.fromValues(0, 0, 0);

      var meshPoint2 = fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
      var meshPoint3;

      if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
        meshPoint3 = fromValues(0, rotateDirection, 0);
      } else {
        meshPoint3 = fromValues(rotateDirection, 0, 0);
      }

      transformQuat(meshPoint2, meshPoint2, curQuaternion);
      transformQuat(meshPoint3, meshPoint3, curQuaternion);
      var vecU = meshPoint2;
      var vecV = meshPoint3;
      var vecN = create$2();
      cross(vecN, vecU, vecV);
      normalize(vecN, vecN);
      var coefficientA = vecN[0];
      var coefficientB = vecN[1];
      var coefficientC = vecN[2]; // const coefficientD = -1 * vec3.dot(vecN, meshPoint1);
      // a point on the plane

      curPoint = fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
      transformQuat(curPoint, curPoint, curQuaternion); // a point should project on the plane

      prevPoint = fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
      transformQuat(prevPoint, prevPoint, prevQuaternion); // distance between prevPoint and the plane

      var distance = Math.abs(prevPoint[0] * coefficientA + prevPoint[1] * coefficientB + prevPoint[2] * coefficientC);
      var projectedPrevPoint = create$2();
      subtract(projectedPrevPoint, prevPoint, scale(create$2(), vecN, distance));
      var trigonometricRatio = (projectedPrevPoint[0] * curPoint[0] + projectedPrevPoint[1] * curPoint[1] + projectedPrevPoint[2] * curPoint[2]) / (length(projectedPrevPoint) * length(curPoint)); // defensive block

      if (trigonometricRatio > 1) {
        trigonometricRatio = 1;
      }

      var theta = Math.acos(trigonometricRatio);
      var crossVec = cross(create$2(), curPoint, projectedPrevPoint);
      distance = coefficientA * crossVec[0] + coefficientB * crossVec[1] + coefficientC * crossVec[2];
      var thetaDirection;

      if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
        thetaDirection = distance > 0 ? 1 : -1;
      } else {
        thetaDirection = distance < 0 ? 1 : -1;
      }

      var deltaRadian = theta * thetaDirection * rotateDirection;
      return toDegree(deltaRadian);
    }

    function angleBetweenVec2(v1, v2) {
      var det = v1[0] * v2[1] - v2[0] * v1[1];
      var theta = -Math.atan2(det, dot$1(v1, v2));
      return theta;
    }

    util.yawOffsetBetween = function (viewDir, targetDir) {
      var viewDirXZ = fromValues$3(viewDir[0], viewDir[2]);
      var targetDirXZ = fromValues$3(targetDir[0], targetDir[2]);
      normalize$3(viewDirXZ, viewDirXZ);
      normalize$3(targetDirXZ, targetDirXZ);
      var theta = -angleBetweenVec2(viewDirXZ, targetDirXZ);
      return theta;
    };

    util.toDegree = toDegree;
    util.getRotationDelta = getRotationDelta;
    util.angleBetweenVec2 = angleBetweenVec2;

    function toAxis$1(source, offset) {
      return offset.reduce(function (acc, v, i) {
        if (source[i]) {
          acc[source[i]] = v;
        }

        return acc;
      }, {});
    }

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
    var MathUtil = win.MathUtil || {};
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
        var ax = a.x;
        var ay = a.y;
        var az = a.z;
        var bx = b.x;
        var by = b.y;
        var bz = b.z;
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
        var halfAngle = angle / 2;
        var s = Math.sin(halfAngle);
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
        var qax = a.x;
        var qay = a.y;
        var qaz = a.z;
        var qaw = a.w;
        var qbx = b.x;
        var qby = b.y;
        var qbz = b.z;
        var qbw = b.w;
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
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var w = this.w; // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

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

        var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
        var ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        this.w = w * ratioA + this.w * ratioB;
        this.x = x * ratioA + this.x * ratioB;
        this.y = y * ratioA + this.y * ratioB;
        this.z = z * ratioA + this.z * ratioB;
        return this;
      },
      setFromUnitVectors: function () {
        // http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final
        // assumes direction vectors vFrom and vTo are normalized
        var v1;
        var r;
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
    var _a; // tslint:disable: only-arrow-functions
    var userAgent$1 = (_a = nav === null || nav === void 0 ? void 0 : nav.userAgent) !== null && _a !== void 0 ? _a : "";
    var Util = win.Util || {};
    Util.MIN_TIMESTEP = 0.001;
    Util.MAX_TIMESTEP = 1;

    Util.base64 = function (mimeType, base64) {
      return "data:" + mimeType + ";base64," + base64;
    };

    Util.clamp = function (value, min, max) {
      return Math.min(Math.max(min, value), max);
    };

    Util.lerp = function (a, b, t) {
      return a + (b - a) * t;
    };

    Util.isIOS = function () {
      var isIOS = /iPad|iPhone|iPod/.test(nav === null || nav === void 0 ? void 0 : nav.platform);
      return function () {
        return isIOS;
      };
    }();

    Util.isWebViewAndroid = function () {
      var isWebViewAndroid = userAgent$1.indexOf("Version") !== -1 && userAgent$1.indexOf("Android") !== -1 && userAgent$1.indexOf("Chrome") !== -1;
      return function () {
        return isWebViewAndroid;
      };
    }();

    Util.isSafari = function () {
      var isSafari = /^((?!chrome|android).)*safari/i.test(userAgent$1);
      return function () {
        return isSafari;
      };
    }();

    Util.isFirefoxAndroid = function () {
      var isFirefoxAndroid = userAgent$1.indexOf("Firefox") !== -1 && userAgent$1.indexOf("Android") !== -1;
      return function () {
        return isFirefoxAndroid;
      };
    }();

    Util.isR7 = function () {
      var isR7 = userAgent$1.indexOf("R7 Build") !== -1;
      return function () {
        return isR7;
      };
    }();

    Util.isLandscapeMode = function () {
      var rtn = win.orientation === 90 || win.orientation === -90;
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
      return Math.max(win.screen.width, win.screen.height) * win.devicePixelRatio;
    };

    Util.getScreenHeight = function () {
      return Math.min(win.screen.width, win.screen.height) * win.devicePixelRatio;
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
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      } else {
        return false;
      }

      return true;
    };

    Util.getFullscreenElement = function () {
      return doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement;
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
      var uniformName = "";

      for (var i = 0; i < uniformCount; i++) {
        var uniformInfo = gl.getActiveUniform(program, i);
        uniformName = uniformInfo.name.replace("[0]", "");
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }

      return uniforms;
    };

    Util.orthoMatrix = function (out, left, right, bottom, top, near, far) {
      var lr = 1 / (left - right);
      var bt = 1 / (bottom - top);
      var nf = 1 / (near - far);
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
      })(userAgent$1 || (nav === null || nav === void 0 ? void 0 : nav.vendor) || win.opera);

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
        var width_1 = canvas.style.width;
        var height_1 = canvas.style.height;
        canvas.style.width = parseInt(width_1) + 1 + "px";
        canvas.style.height = parseInt(height_1) + "px";
        setTimeout(function () {
          canvas.style.width = width_1;
          canvas.style.height = height_1;
        }, 100);
      } // Debug only.


      win.Util = Util;
      win.canvas = canvas;
    };

    Util.isDebug = function () {
      return Util.getQueryParameter("debug");
    };

    Util.getQueryParameter = function (name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    Util.frameDataFromPose = function () {
      var piOver180 = Math.PI / 180.0;
      var rad45 = Math.PI * 0.25; // Borrowed from glMatrix.

      function mat4_perspectiveFromFieldOfView(out, fov, near, far) {
        var upTan = Math.tan(fov ? fov.upDegrees * piOver180 : rad45);
        var downTan = Math.tan(fov ? fov.downDegrees * piOver180 : rad45);
        var leftTan = Math.tan(fov ? fov.leftDegrees * piOver180 : rad45);
        var rightTan = Math.tan(fov ? fov.rightDegrees * piOver180 : rad45);
        var xScale = 2.0 / (leftTan + rightTan);
        var yScale = 2.0 / (upTan + downTan);
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
        var x = q[0];
        var y = q[1];
        var z = q[2];
        var w = q[3];
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var xy = x * y2;
        var xz = x * z2;
        var yy = y * y2;
        var yz = y * z2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
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
        var x = v[0];
        var y = v[1];
        var z = v[2];
        var a00;
        var a01;
        var a02;
        var a03;
        var a10;
        var a11;
        var a12;
        var a13;
        var a20;
        var a21;
        var a22;
        var a23;

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
        var a00 = a[0];
        var a01 = a[1];
        var a02 = a[2];
        var a03 = a[3];
        var a10 = a[4];
        var a11 = a[5];
        var a12 = a[6];
        var a13 = a[7];
        var a20 = a[8];
        var a21 = a[9];
        var a22 = a[10];
        var a23 = a[11];
        var a30 = a[12];
        var a31 = a[13];
        var a32 = a[14];
        var a33 = a[15];
        var b00 = a00 * a11 - a01 * a10;
        var b01 = a00 * a12 - a02 * a10;
        var b02 = a00 * a13 - a03 * a10;
        var b03 = a01 * a12 - a02 * a11;
        var b04 = a01 * a13 - a03 * a11;
        var b05 = a02 * a13 - a03 * a12;
        var b06 = a20 * a31 - a21 * a30;
        var b07 = a20 * a32 - a22 * a30;
        var b08 = a20 * a33 - a23 * a30;
        var b09 = a21 * a32 - a22 * a31;
        var b10 = a21 * a33 - a23 * a31;
        var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

        var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

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
      var isFramed = win.self !== win.top;
      var refDomain = Util.getDomainFromUrl(doc.referrer);
      var thisDomain = Util.getDomainFromUrl(win.location.href);
      return isFramed && refDomain !== thisDomain;
    }; // From http://stackoverflow.com/a/23945027.


    Util.getDomainFromUrl = function (url) {
      var domain; // Find & remove protocol (http, ftp, etc.) and get domain.

      if (url.indexOf("://") > -1) {
        domain = url.split("/")[2];
      } else {
        domain = url.split("/")[0];
      } // find & remove port number


      domain = domain.split(":")[0];
      return domain;
    };

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

    var PosePredictor =
    /*#__PURE__*/
    function () {
      function PosePredictor(predictionTimeS) {
        this.predictionTimeS = predictionTimeS; // The quaternion corresponding to the previous state.

        this.previousQ = new MathUtil.Quaternion(); // Previous time a prediction occurred.

        this.previousTimestampS = null; // The delta quaternion that adjusts the current pose.

        this.deltaQ = new MathUtil.Quaternion(); // The output quaternion.

        this.outQ = new MathUtil.Quaternion();
      }

      var __proto = PosePredictor.prototype;

      __proto.getPrediction = function (currentQ, gyro, timestampS) {
        if (!this.previousTimestampS) {
          this.previousQ.copy(currentQ);
          this.previousTimestampS = timestampS;
          return currentQ;
        } // Calculate axis and angle based on gyroscope rotation rate data.


        var axis = new MathUtil.Vector3();
        axis.copy(gyro);
        axis.normalize();
        var angularSpeed = gyro.length(); // If we're rotating slowly, don't do prediction.

        if (angularSpeed < MathUtil.degToRad * 20) {
          if (Util.isDebug()) {
            console.log("Moving slowly, at %s deg/s: no prediction", (MathUtil.radToDeg * angularSpeed).toFixed(1));
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

      return PosePredictor;
    }();

    /**
     * Returns a number value indiciating the version of Chrome being used,
     * or otherwise `null` if not on Chrome.
     *
     * Ref: https://github.com/immersive-web/cardboard-vr-display/pull/19
     */

    /**
     * In Chrome m65, `devicemotion` events are broken but subsequently fixed
     * in 65.0.3325.148. Since many browsers use Chromium, ensure that
     * we scope this detection by branch and build numbers to provide
     * a proper fallback.
     * https://github.com/immersive-web/webvr-polyfill/issues/307
     */

    var version = -1; // It should not be null because it will be compared with number

    var branch = null;
    var build = null;
    var match = /Chrome\/([0-9]+)\.(?:[0-9]*)\.([0-9]*)\.([0-9]*)/i.exec(userAgent);

    if (match) {
      version = parseInt(match[1], 10);
      branch = match[2];
      build = match[3];
    }

    var CHROME_VERSION = version;
    var IS_CHROME_WITHOUT_DEVICE_MOTION = version === 65 && branch === "3325" && parseInt(build, 10) < 148;
    var IS_ANDROID = /Android/i.test(userAgent);
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

    var STILLNESS_THRESHOLD = 200; // millisecond

    var DeviceMotion =
    /*#__PURE__*/
    function (_super) {
      __extends(DeviceMotion, _super);

      function DeviceMotion() {
        var _this = _super.call(this) || this;

        _this._onDeviceMotion = _this._onDeviceMotion.bind(_this);
        _this._onDeviceOrientation = _this._onDeviceOrientation.bind(_this);
        _this._onChromeWithoutDeviceMotion = _this._onChromeWithoutDeviceMotion.bind(_this);
        _this.isWithoutDeviceMotion = IS_CHROME_WITHOUT_DEVICE_MOTION;
        _this.isAndroid = IS_ANDROID;
        _this.stillGyroVec = create$2();
        _this.rawGyroVec = create$2();
        _this.adjustedGyroVec = create$2();
        _this._timer = -1;
        _this.lastDevicemotionTimestamp = 0;
        _this._isEnabled = false;

        _this.enable();

        return _this;
      }

      var __proto = DeviceMotion.prototype;

      __proto.enable = function () {
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

      __proto.disable = function () {
        win.removeEventListener("deviceorientation", this._onDeviceOrientation);
        win.removeEventListener("deviceorientation", this._onChromeWithoutDeviceMotion);
        win.removeEventListener("devicemotion", this._onDeviceMotion);
        this._isEnabled = false;
      };

      __proto._onChromeWithoutDeviceMotion = function (e) {
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

      __proto._onDeviceOrientation = function () {
        var _this = this;

        if (this._timer) {
          clearTimeout(this._timer);
        }

        this._timer = win.setTimeout(function () {
          if (new Date().getTime() - _this.lastDevicemotionTimestamp < STILLNESS_THRESHOLD) {
            copy(_this.stillGyroVec, _this.rawGyroVec);
          }
        }, STILLNESS_THRESHOLD);
      };

      __proto._onDeviceMotion = function (e) {
        // desktop chrome triggers devicemotion event with empthy sensor values.
        // Those events should ignored.
        var isGyroSensorAvailable = !(e.rotationRate.alpha == null);
        var isGravitySensorAvailable = !(e.accelerationIncludingGravity.x == null);

        if (e.interval === 0 || !(isGyroSensorAvailable && isGravitySensorAvailable)) {
          return;
        }

        var devicemotionEvent = __assign({}, e);

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
          set(this.rawGyroVec, e.rotationRate.alpha || 0, e.rotationRate.beta || 0, e.rotationRate.gamma || 0);
          subtract(this.adjustedGyroVec, this.rawGyroVec, this.stillGyroVec);
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

      return DeviceMotion;
    }(Component);

    var SensorSample =
    /*#__PURE__*/
    function () {
      function SensorSample(sample, timestampS) {
        this.set(sample, timestampS);
      }

      var __proto = SensorSample.prototype;

      __proto.set = function (sample, timestampS) {
        this.sample = sample;
        this.timestampS = timestampS;
      };

      __proto.copy = function (sensorSample) {
        this.set(sensorSample.sample, sensorSample.timestampS);
      };

      return SensorSample;
    }();

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

    var ComplementaryFilter =
    /*#__PURE__*/
    function () {
      function ComplementaryFilter(kFilter) {
        this.addGyroMeasurement = function (vector, timestampS) {
          this.currentGyroMeasurement.set(vector, timestampS);
          var deltaT = timestampS - this.previousGyroMeasurement.timestampS;

          if (Util.isTimestampDeltaValid(deltaT)) {
            this.run_();
          }

          this.previousGyroMeasurement.copy(this.currentGyroMeasurement);
        };

        this.kFilter = kFilter; // Raw sensor measurements.

        this.currentAccelMeasurement = new SensorSample();
        this.currentGyroMeasurement = new SensorSample();
        this.previousGyroMeasurement = new SensorSample(); // Set default look direction to be in the correct direction.

        if (Util.isIOS()) {
          this.filterQ = new MathUtil.Quaternion(-1, 0, 0, 1);
        } else {
          this.filterQ = new MathUtil.Quaternion(1, 0, 0, 1);
        }

        this.previousFilterQ = new MathUtil.Quaternion();
        this.previousFilterQ.copy(this.filterQ); // Orientation based on the accelerometer.

        this.accelQ = new MathUtil.Quaternion(); // Whether or not the orientation has been initialized.

        this.isOrientationInitialized = false; // Running estimate of gravity based on the current orientation.

        this.estimatedGravity = new MathUtil.Vector3(); // Measured gravity based on accelerometer.

        this.measuredGravity = new MathUtil.Vector3(); // Debug only quaternion of gyro-based orientation.

        this.gyroIntegralQ = new MathUtil.Quaternion();
      }

      var __proto = ComplementaryFilter.prototype;

      __proto.addAccelMeasurement = function (vector, timestampS) {
        this.currentAccelMeasurement.set(vector, timestampS);
      };

      __proto.getOrientation = function () {
        return this.filterQ;
      };

      __proto.run_ = function () {
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

        var invFilterQ = new MathUtil.Quaternion();
        invFilterQ.copy(this.filterQ);
        invFilterQ.inverse();
        this.estimatedGravity.set(0, 0, -1);
        this.estimatedGravity.applyQuaternion(invFilterQ);
        this.estimatedGravity.normalize();
        this.measuredGravity.copy(this.currentAccelMeasurement.sample);
        this.measuredGravity.normalize(); // Compare estimated gravity with measured gravity, get the delta quaternion
        // between the two.

        var deltaQ = new MathUtil.Quaternion();
        deltaQ.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
        deltaQ.inverse();

        if (Util.isDebug()) {
          console.log("Delta: %d deg, G_est: (%s, %s, %s), G_meas: (%s, %s, %s)", MathUtil.radToDeg * Util.getQuaternionAngle(deltaQ), this.estimatedGravity.x.toFixed(1), this.estimatedGravity.y.toFixed(1), this.estimatedGravity.z.toFixed(1), this.measuredGravity.x.toFixed(1), this.measuredGravity.y.toFixed(1), this.measuredGravity.z.toFixed(1));
        } // Calculate the SLERP target: current orientation plus the measured-estimated
        // quaternion delta.


        var targetQ = new MathUtil.Quaternion();
        targetQ.copy(this.filterQ);
        targetQ.multiply(deltaQ); // SLERP factor: 0 is pure gyro, 1 is pure accel.

        this.filterQ.slerp(targetQ, 1 - this.kFilter);
        this.previousFilterQ.copy(this.filterQ);
      };

      __proto.accelToQuaternion_ = function (accel) {
        var normAccel = new MathUtil.Vector3();
        normAccel.copy(accel);
        normAccel.normalize();
        var quat = new MathUtil.Quaternion();
        quat.setFromUnitVectors(new MathUtil.Vector3(0, 0, -1), normAccel);
        quat.inverse();
        return quat;
      };

      __proto.gyroToQuaternionDelta_ = function (gyro, dt) {
        // Extract axis and angle from the gyroscope data.
        var quat = new MathUtil.Quaternion();
        var axis = new MathUtil.Vector3();
        axis.copy(gyro);
        axis.normalize();
        quat.setFromAxisAngle(axis, gyro.length() * dt);
        return quat;
      };

      return ComplementaryFilter;
    }();

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

      var invFilterQ = new MathUtil.Quaternion();
      invFilterQ.copy(this.filterQ);
      invFilterQ.inverse();
      this.estimatedGravity.set(0, 0, -1);
      this.estimatedGravity.applyQuaternion(invFilterQ);
      this.estimatedGravity.normalize();
      this.measuredGravity.copy(this.currentAccelMeasurement.sample);
      this.measuredGravity.normalize(); // Compare estimated gravity with measured gravity, get the delta quaternion
      // between the two.

      var deltaQ = new MathUtil.Quaternion();
      deltaQ.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
      deltaQ.inverse(); // Calculate the SLERP target: current orientation plus the measured-estimated
      // quaternion delta.

      var targetQ = new MathUtil.Quaternion();
      targetQ.copy(this.filterQ);
      targetQ.multiply(deltaQ); // SLERP factor: 0 is pure gyro, 1 is pure accel.

      this.filterQ.slerp(targetQ, 1 - this.kFilter);
      this.previousFilterQ.copy(this.filterQ);

      if (!this.isFilterQuaternionInitialized) {
        this.isFilterQuaternionInitialized = true;
      }
    };

    ComplementaryFilter.prototype.getOrientation = function () {
      if (this.isFilterQuaternionInitialized) {
        return this.filterQ;
      } else {
        return null;
      }
    };

    var K_FILTER = 0.98;
    var PREDICTION_TIME_S = 0.040;

    var FusionPoseSensor =
    /*#__PURE__*/
    function (_super) {
      __extends(FusionPoseSensor, _super);

      function FusionPoseSensor() {
        var _this = _super.call(this) || this;

        _this.deviceMotion = new DeviceMotion();
        _this.accelerometer = new MathUtil.Vector3();
        _this.gyroscope = new MathUtil.Vector3();
        _this._onDeviceMotionChange = _this._onDeviceMotionChange.bind(_this);
        _this._onScreenOrientationChange = _this._onScreenOrientationChange.bind(_this);
        _this.filter = new ComplementaryFilter(K_FILTER);
        _this.posePredictor = new PosePredictor(PREDICTION_TIME_S);
        _this.filterToWorldQ = new MathUtil.Quaternion();
        _this.isFirefoxAndroid = Util.isFirefoxAndroid(); // This includes iPhone & iPad(both desktop and mobile mode) ref #326

        _this.isIOS = IS_IOS || IS_SAFARI_ON_DESKTOP; // Ref https://github.com/immersive-web/cardboard-vr-display/issues/18

        _this.isChromeUsingDegrees = CHROME_VERSION >= 66;
        _this._isEnabled = false; // Set the filter to world transform, depending on OS.

        if (_this.isIOS) {
          _this.filterToWorldQ.setFromAxisAngle(new MathUtil.Vector3(1, 0, 0), Math.PI / 2);
        } else {
          _this.filterToWorldQ.setFromAxisAngle(new MathUtil.Vector3(1, 0, 0), -Math.PI / 2);
        }

        _this.inverseWorldToScreenQ = new MathUtil.Quaternion();
        _this.worldToScreenQ = new MathUtil.Quaternion();
        _this.originalPoseAdjustQ = new MathUtil.Quaternion();

        _this.originalPoseAdjustQ.setFromAxisAngle(new MathUtil.Vector3(0, 0, 1), -win.orientation * Math.PI / 180);

        _this._setScreenTransform(); // Adjust this filter for being in landscape mode.


        if (Util.isLandscapeMode()) {
          _this.filterToWorldQ.multiply(_this.inverseWorldToScreenQ);
        } // Keep track of a reset transform for resetSensor.


        _this.resetQ = new MathUtil.Quaternion();

        _this.deviceMotion.on("devicemotion", _this._onDeviceMotionChange);

        _this.enable();

        return _this;
      }

      var __proto = FusionPoseSensor.prototype;

      __proto.enable = function () {
        if (this.isEnabled()) {
          return;
        }

        this.deviceMotion.enable();
        this._isEnabled = true;
        win.addEventListener("orientationchange", this._onScreenOrientationChange);
      };

      __proto.disable = function () {
        if (!this.isEnabled()) {
          return;
        }

        this.deviceMotion.disable();
        this._isEnabled = false;
        win.removeEventListener("orientationchange", this._onScreenOrientationChange);
      };

      __proto.isEnabled = function () {
        return this._isEnabled;
      };

      __proto.destroy = function () {
        this.disable();
        this.deviceMotion = null;
      };

      __proto.getOrientation = function () {
        var _this = this;

        var orientation; // Hack around using deviceorientation instead of devicemotion

        if (this.deviceMotion.isWithoutDeviceMotion && this._deviceOrientationQ) {
          this.deviceOrientationFixQ = this.deviceOrientationFixQ || function () {
            var y = new MathUtil.Quaternion().setFromAxisAngle(new MathUtil.Vector3(0, 1, 0), -_this._alpha);
            return y;
          }();

          orientation = this._deviceOrientationQ;
          var out = new MathUtil.Quaternion();
          out.copy(orientation);
          out.multiply(this.filterToWorldQ);
          out.multiply(this.resetQ);
          out.multiply(this.worldToScreenQ);
          out.multiplyQuaternions(this.deviceOrientationFixQ, out); // return quaternion as glmatrix quaternion object

          var out_ = fromValues$2(out.x, out.y, out.z, out.w);
          return normalize$2(out_, out_);
        } else {
          // Convert from filter space to the the same system used by the
          // deviceorientation event.
          orientation = this.filter.getOrientation();

          if (!orientation) {
            return null;
          }

          var out = this._convertFusionToPredicted(orientation); // return quaternion as glmatrix quaternion object


          var out_ = fromValues$2(out.x, out.y, out.z, out.w);
          return normalize$2(out_, out_);
        }
      };

      __proto._triggerChange = function () {
        var orientation = this.getOrientation(); // if orientation is not prepared. don't trigger change event

        if (!orientation) {
          return;
        }

        if (!this._prevOrientation) {
          this._prevOrientation = orientation;
          return;
        }

        if (equals$1(this._prevOrientation, orientation)) {
          return;
        }

        this.trigger("change", {
          quaternion: orientation
        });
      };

      __proto._convertFusionToPredicted = function (orientation) {
        // Predict orientation.
        this.predictedQ = this.posePredictor.getPrediction(orientation, this.gyroscope, this.previousTimestampS); // Convert to THREE coordinate system: -Z forward, Y up, X right.

        var out = new MathUtil.Quaternion();
        out.copy(this.filterToWorldQ);
        out.multiply(this.resetQ);
        out.multiply(this.predictedQ);
        out.multiply(this.worldToScreenQ);
        return out;
      };

      __proto._onDeviceMotionChange = function (_a) {
        var inputEvent = _a.inputEvent;
        var deviceorientation = inputEvent.deviceorientation;
        var deviceMotion = inputEvent;
        var accGravity = deviceMotion.accelerationIncludingGravity;
        var rotRate = deviceMotion.adjustedRotationRate || deviceMotion.rotationRate;
        var timestampS = deviceMotion.timeStamp / 1000;

        if (deviceorientation) {
          if (!this._alpha) {
            this._alpha = deviceorientation.alpha;
          }

          this._deviceOrientationQ = this._deviceOrientationQ || new MathUtil.Quaternion();

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

      __proto._onScreenOrientationChange = function () {
        this._setScreenTransform();
      };

      __proto._setScreenTransform = function () {
        this.worldToScreenQ.set(0, 0, 0, 1);
        var orientation = win.orientation;

        switch (orientation) {
          case 0:
            break;

          case 90:
          case -90:
          case 180:
            this.worldToScreenQ.setFromAxisAngle(new MathUtil.Vector3(0, 0, 1), orientation / -180 * Math.PI);
            break;
        }

        this.inverseWorldToScreenQ.copy(this.worldToScreenQ);
        this.inverseWorldToScreenQ.inverse();
      };

      return FusionPoseSensor;
    }(Component);

    function getDeltaYaw(prvQ, curQ) {
      var yawDeltaByYaw = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_YAW);
      var yawDeltaByRoll = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL) * Math.sin(util.extractPitchFromQuat(curQ));
      return yawDeltaByRoll + yawDeltaByYaw;
    }

    function getDeltaPitch(prvQ, curQ) {
      var pitchDelta = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.PITCH_DELTA);
      return pitchDelta;
    }

    var TiltMotionInput =
    /*#__PURE__*/
    function (_super) {
      __extends(TiltMotionInput, _super);

      function TiltMotionInput(el, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.element = el;
        _this._prevQuaternion = null;
        _this._quaternion = null;
        _this.fusionPoseSensor = null;
        _this.options = __assign({
          scale: 1,
          threshold: 0
        }, options);
        _this._onPoseChange = _this._onPoseChange.bind(_this);
        return _this;
      }

      var __proto = TiltMotionInput.prototype;

      __proto.mapAxes = function (axes) {
        this.axes = axes;
      };

      __proto.connect = function (observer) {
        if (this.observer) {
          return this;
        }

        this.observer = observer;
        this.fusionPoseSensor = new FusionPoseSensor();
        this.fusionPoseSensor.enable();

        this._attachEvent();

        return this;
      };

      __proto.disconnect = function () {
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

      __proto.destroy = function () {
        this.disconnect();
        this.element = null;
        this.options = null;
        this.axes = null;
        this._prevQuaternion = null;
        this._quaternion = null;
      };

      __proto._onPoseChange = function (event) {
        if (!this._prevQuaternion) {
          this._prevQuaternion = clone$1(event.quaternion);
          this._quaternion = clone$1(event.quaternion);
          return;
        }

        copy$2(this._prevQuaternion, this._quaternion);
        copy$2(this._quaternion, event.quaternion);
        this.observer.change(this, event, toAxis$1(this.axes, [getDeltaYaw(this._prevQuaternion, this._quaternion), getDeltaPitch(this._prevQuaternion, this._quaternion)]));
      };

      __proto._attachEvent = function () {
        this.fusionPoseSensor.on("change", this._onPoseChange);
      };

      __proto._dettachEvent = function () {
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

      var __proto = ScreenRotationAngle.prototype;

      __proto.getRadian = function () {
        // Join with screen orientation
        // this._testVal = this._spinR + ", " + this._screenOrientationAngle + ", " + window.orientation;
        return this._spinR + toRadian(this._screenOrientationAngle);
      };

      __proto.unref = function () {
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

      __proto._onDeviceOrientation = function (e) {
        if (e.beta === null || e.gamma === null) {
          // (Chrome) deviceorientation is fired with invalid information {alpha=null, beta=null, ...} despite of not dispatching it. We skip it.
          return;
        } // Radian


        var betaR = toRadian(e.beta);
        var gammaR = toRadian(e.gamma);
        /* spinR range = [-180, 180], left side: 0 ~ -180(deg), right side: 0 ~ 180(deg) */

        this._spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));
      };

      __proto._onOrientationChange = function (e) {
        if (win.screen && win.screen.orientation && win.screen.orientation.angle !== undefined) {
          this._screenOrientationAngle = screen.orientation.angle;
        } else if (win.orientation !== undefined) {
          /* iOS */
          this._screenOrientationAngle = win.orientation >= 0 ? win.orientation : 360 + win.orientation;
        }
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
    // @ts-ignore

    var RotationPanInput =
    /*#__PURE__*/
    function (_super) {
      __extends(RotationPanInput, _super);
      /**
       * Constructor
       *
       * @private
       * @param {HTMLElement} el target element
       * @param {Object} [options] The option object
       * @param {Boolean} [options.useRotation]  Whether to use rotation(or VR)
       */


      function RotationPanInput(el, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this, el, options) || this;

        _this._useRotation = false;
        _this._screenRotationAngle = null;

        _this.setUseRotation(!!(options && options.useRotation));

        _this._userDirection = Axes.DIRECTION_ALL;
        return _this;
      }

      var __proto = RotationPanInput.prototype;

      __proto.setUseRotation = function (useRotation) {
        this._useRotation = useRotation;

        if (this._screenRotationAngle) {
          this._screenRotationAngle.unref();

          this._screenRotationAngle = null;
        }

        if (this._useRotation) {
          this._screenRotationAngle = new ScreenRotationAngle();
        }
      };

      __proto.connect = function (observer) {
        // User intetened direction
        this._userDirection = this._direction; // In VR Mode, Use ALL direction if direction is not none
        // Because horizontal and vertical is changed dynamically by screen rotation.
        // this._direction is used to initialize hammerjs

        if (this._useRotation && this._direction & Axes.DIRECTION_ALL) {
          this._direction = Axes.DIRECTION_HORIZONTAL;
        }

        return _super.prototype.connect.call(this, observer);
      };

      __proto.destroy = function () {
        if (this._useRotation && this._screenRotationAngle) {
          this._screenRotationAngle.unref();
        }

        _super.prototype.destroy.call(this);
      };

      __proto.getOffset = function (properties, useDirection) {
        if (this._useRotation === false) {
          // @ts-ignore
          return _super.prototype.getOffset.call(this, properties, useDirection);
        } // @ts-ignore


        var offset = _super.prototype.getOffset.call(this, properties, [true, true]);

        var newOffset = [0, 0];

        var theta = this._screenRotationAngle.getRadian();

        var cosTheta = Math.cos(theta);
        var sinTheta = Math.sin(theta); // RotateZ

        newOffset[0] = offset[0] * cosTheta - offset[1] * sinTheta;
        newOffset[1] = offset[1] * cosTheta + offset[0] * sinTheta; // Use only user allowed direction.

        if (!(this._userDirection & Axes.DIRECTION_HORIZONTAL)) {
          newOffset[0] = 0;
        } else if (!(this._userDirection & Axes.DIRECTION_VERTICAL)) {
          newOffset[1] = 0;
        }

        return newOffset;
      };

      return RotationPanInput;
    }(PanInput);
    /**
     * Override getDirectionByAngle to return DIRECTION_ALL
     * Ref: https://github.com/naver/egjs-axes/issues/99
     *
     * But we obey axes's rule. If axes's rule is problem, let's apply following code.
     */
    // PanInput.getDirectionByAngle = function (angle, thresholdAngle) {
    // 	return DIRECTION_ALL;
    // };

    var Y_AXIS_VECTOR = fromValues(0, 1, 0);

    var DeviceQuaternion =
    /*#__PURE__*/
    function (_super) {
      __extends(DeviceQuaternion, _super);

      function DeviceQuaternion() {
        var _this = _super.call(this) || this;

        _this._fusionPoseSensor = new FusionPoseSensor();
        _this._quaternion = create$4();

        _this._fusionPoseSensor.enable();

        _this._fusionPoseSensor.on("change", function (e) {
          _this._quaternion = e.quaternion;

          _this.trigger("change", {
            isTrusted: true
          });
        });

        return _this;
      }

      var __proto = DeviceQuaternion.prototype;

      __proto.getCombinedQuaternion = function (yaw) {
        var yawQ = setAxisAngle(create$4(), Y_AXIS_VECTOR, toRadian(-yaw));
        var conj = conjugate(create$4(), this._quaternion); // Multiply pitch quaternion -> device quaternion -> yaw quaternion

        var outQ = multiply(create$4(), conj, yawQ);
        return outQ;
      };

      __proto.destroy = function () {
        // detach all event handler
        this.off();

        if (this._fusionPoseSensor) {
          this._fusionPoseSensor.off();

          this._fusionPoseSensor.destroy();

          this._fusionPoseSensor = null;
        }
      };

      return DeviceQuaternion;
    }(Component);

    var VERSION = "3.5.1";

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
    function (_super) {
      __extends(YawPitchControl, _super);
      /**
       * @param {object} options The option object of the eg.YawPitch module
       * @param {HTMLElement|null}[options.element=null] element A base element for the eg.YawPitch module
       * @param {number} [options.yaw=0] initial yaw (degree)
       * @param {number} [options.pitch=0] initial pitch (degree)
       * @param {number} [options.fov=65] initial field of view (degree)
       * @param {boolean} [optiosn.showPolePoint=true] Indicates whether pole is shown
       * @param {boolean} [options.useZoom=true] Indicates whether zoom is available
       * @param {boolean} [options.useKeyboard=true] Indicates whether keyboard is enabled
       * @param {string} [config.gyroMode=yawPitch] Enables control through device motion.
       * @param {number} [options.touchDirection=TOUCH_DIRECTION_ALL] Direction of the touch movement (TOUCH_DIRECTION_ALL: all,  TOUCH_DIRECTION_YAW: horizontal, TOUCH_DIRECTION_PITCH: vertical, TOUCH_DIRECTION_NONE: no move)
       * @param {number[]} [options.yawRange=[-180, 180] Range of visible yaw
       * @param {number[]} [options.pitchRange=[-90, 90] Range of visible pitch
       * @param {number[]} [options.fovRange=[30, 110] Range of FOV
       * @param {number} [options.aspectRatio=1] Aspect Ratio
       */


      function YawPitchControl(options) {
        var _this = _super.call(this) || this;

        var opt = __assign({
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
      /**
       * Update Pan Scale
       *
       * Scale(Sensitivity) values of panning is related with fov and height.
       * If at least one of them is changed, this function need to be called.
       * @param {*} param
       */


      var __proto = YawPitchControl.prototype;

      __proto.updatePanScale = function (param) {
        if (param === void 0) {
          param = {};
        }

        var fov = this.axes.get().fov;
        var areaHeight = param.height || parseInt(window.getComputedStyle(this._element).height, 10);
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


      __proto.option = function (key, newValue) {
        // Getter
        if (!key) {
          return this._getOptions();
        } else if (key && typeof key === "string" && typeof newValue === "undefined") {
          return this._getOptions(key);
        } // Setter


        var newOptions = {};
        var changedKeyList = []; // TODO: if value is not changed, then do not push on changedKeyList.

        if (typeof key === "string") {
          changedKeyList.push(key);
          newOptions[key] = newValue;
        } else {
          var options = key; // Retrieving object here

          changedKeyList = Object.keys(options);
          newOptions = __assign({}, options);
        }

        this._setOptions(this._getValidatedOptions(newOptions));

        this._applyOptions(changedKeyList);

        return this;
      };
      /**
       * Enable YawPitch functionality
       *
       * @method eg.YawPitch#enable
       */


      __proto.enable = function () {
        if (this._enabled) {
          return this;
        }

        this._enabled = true; // touchDirection is decided by parameter is valid string (Ref. Axes.connect)

        this._applyOptions(Object.keys(this.options)); // TODO: Is this code is needed? Check later.


        this.updatePanScale();
        return this;
      };
      /**
       * Disable YawPitch functionality
       *
       * @method eg.YawPitch#disable
       */


      __proto.disable = function (persistOrientation) {
        if (persistOrientation === void 0) {
          persistOrientation = false;
        }

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
      /**
       * Set one or more of yaw, pitch, fov
       *
       * @param {Object} coordinate yaw, pitch, fov
       * @param {Number} duration Animation duration. if it is above 0 then it's animated.
       */


      __proto.lookAt = function (_a, duration) {
        var yaw = _a.yaw,
            pitch = _a.pitch,
            fov = _a.fov;
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

      __proto.getYawPitch = function () {
        var yawPitch = this.axes.get();
        return {
          yaw: yawPitch.yaw,
          pitch: yawPitch.pitch
        };
      };

      __proto.getFov = function () {
        return this.axes.get().fov;
      };

      __proto.getQuaternion = function () {
        var pos = this.axes.get();
        return this._deviceQuaternion.getCombinedQuaternion(pos.yaw);
      };

      __proto.shouldRenderWithQuaternion = function () {
        return this.options.gyroMode === GYRO_MODE.VR;
      };
      /**
       * Destroys objects
       */


      __proto.destroy = function () {
        /* tslint:disable no-unused-expression */
        this.axes && this.axes.destroy();
        this.axesPanInput && this.axesPanInput.destroy();
        this.axesWheelInput && this.axesWheelInput.destroy();
        this.axesTiltMotionInput && this.axesTiltMotionInput.destroy();
        this.axesPinchInput && this.axesPinchInput.destroy();
        this.axesMoveKeyInput && this.axesMoveKeyInput.destroy();
        this._deviceQuaternion && this._deviceQuaternion.destroy();
      };

      __proto._initAxes = function (opt) {
        var _this = this;

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
            circular: this._isCircular(yRange),
            bounce: [0, 0]
          },
          pitch: {
            range: pRange,
            circular: this._isCircular(pRange),
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
          // TODO: change event type after Axes event type inference update
          hold: function (evt) {
            // Restore maximumDuration not to be spin too mush.
            _this.axes.options.maximumDuration = MC_MAXIMUM_DURATION;

            _this.trigger("hold", {
              isTrusted: evt.isTrusted
            });
          },
          change: function (evt) {
            if (evt.delta.fov !== 0) {
              _this._updateControlScale(evt);

              _this.updatePanScale();
            }

            _this._triggerChange(evt);
          },
          release: function (evt) {
            _this._triggerChange(evt);
          },
          animationEnd: function (evt) {
            _this.trigger("animationEnd", {
              isTrusted: evt.isTrusted
            });
          }
        });
      };

      __proto._getValidatedOptions = function (newOptions) {
        if (newOptions.yawRange) {
          newOptions.yawRange = this._getValidYawRange(newOptions.yawRange, newOptions.fov, newOptions.aspectRatio);
        }

        if (newOptions.pitchRange) {
          newOptions.pitchRange = this._getValidPitchRange(newOptions.pitchRange, newOptions.fov);
        }

        return newOptions;
      };

      __proto._getOptions = function (key) {
        var value;

        if (typeof key === "string") {
          value = this.options[key];
        } else if (arguments.length === 0) {
          value = this.options;
        }

        return value;
      };

      __proto._setOptions = function (options) {
        for (var key in options) {
          this.options[key] = options[key];
        }
      };

      __proto._applyOptions = function (keys) {
        var options = this.options;
        var axes = this.axes;
        var isVR = options.gyroMode === GYRO_MODE.VR;
        var isYawPitch = options.gyroMode === GYRO_MODE.YAWPITCH; // If it's VR mode, restrict user interaction to yaw direction only

        var touchDirection = isVR ? TOUCH_DIRECTION_YAW & options.touchDirection : options.touchDirection; // If one of below is changed, call updateControlScale()

        if (keys.some(function (key) {
          return key === "showPolePoint" || key === "fov" || key === "aspectRatio" || key === "yawRange" || key === "pitchRange";
        })) {
          // If fov is changed, update pan scale
          if (keys.indexOf("fov") >= 0) {
            axes.setTo({
              "fov": options.fov
            });
            this.updatePanScale();
          }

          this._updateControlScale();
        }

        if (keys.some(function (key) {
          return key === "fovRange";
        })) {
          var fovRange = options.fovRange;
          var prevFov = axes.get().fov;
          var nextFov = axes.get().fov;
          copy$3(axes.axis.fov.range, fovRange);

          if (nextFov < fovRange[0]) {
            nextFov = fovRange[0];
          } else if (prevFov > fovRange[1]) {
            nextFov = fovRange[1];
          }

          if (prevFov !== nextFov) {
            axes.setTo({
              fov: nextFov
            }, 0);

            this._updateControlScale();

            this.updatePanScale();
          }
        }

        if (keys.some(function (key) {
          return key === "gyroMode";
        }) && SUPPORT_DEVICEMOTION) {
          // Disconnect first
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
          var useKeyboard = options.useKeyboard;

          if (useKeyboard) {
            axes.connect(["yaw", "pitch"], this.axesMoveKeyInput);
          } else {
            axes.disconnect(this.axesMoveKeyInput);
          }
        }

        if (keys.some(function (key) {
          return key === "useZoom";
        })) {
          var useZoom = options.useZoom; // Disconnect first

          axes.disconnect(this.axesWheelInput);

          if (useZoom) {
            axes.connect(["fov"], this.axesWheelInput);
          }
        }

        this._togglePinchInputByOption(options.touchDirection, options.useZoom);

        if (keys.some(function (key) {
          return key === "touchDirection";
        }) && this._enabled) {
          this._enableTouch(touchDirection);
        }
      };

      __proto._togglePinchInputByOption = function (touchDirection, useZoom) {
        if (this.axesPinchInput) {
          // disconnect first
          this.axes.disconnect(this.axesPinchInput); // If the touchDirection option is not ALL, pinchInput should be disconnected to make use of a native scroll.

          if (useZoom && touchDirection === TOUCH_DIRECTION_ALL && // TODO: Get rid of using private property of axes instance.
          this.axes._inputs.indexOf(this.axesPinchInput) === -1) {
            this.axes.connect(["fov"], this.axesPinchInput);
          }
        }
      };

      __proto._enableTouch = function (direction) {
        // Disconnect first
        if (this.axesPanInput) {
          this.axes.disconnect(this.axesPanInput);
        }

        var yawEnabled = direction & TOUCH_DIRECTION_YAW ? "yaw" : null;
        var pitchEnabled = direction & TOUCH_DIRECTION_PITCH ? "pitch" : null;
        this.axes.connect([yawEnabled, pitchEnabled], this.axesPanInput);
      };

      __proto._initDeviceQuaternion = function () {
        var _this = this;

        this._deviceQuaternion = new DeviceQuaternion();

        this._deviceQuaternion.on("change", function (e) {
          _this._triggerChange(e);
        });
      };

      __proto._getValidYawRange = function (newYawRange, newFov, newAspectRatio) {
        var ratio = this._adjustAspectRatio(newAspectRatio || this.options.aspectRatio || 1);

        var fov = newFov || this.axes.get().fov;
        var horizontalFov = fov * ratio;
        var isValid = newYawRange[1] - newYawRange[0] >= horizontalFov;

        if (isValid) {
          return newYawRange;
        } else {
          return this.options.yawRange || DEFAULT_YAW_RANGE;
        }
      };

      __proto._getValidPitchRange = function (newPitchRange, newFov) {
        var fov = newFov || this.axes.get().fov;
        var isValid = newPitchRange[1] - newPitchRange[0] >= fov;

        if (isValid) {
          return newPitchRange;
        } else {
          return this.options.pitchRange || DEFAULT_PITCH_RANGE;
        }
      };

      __proto._isCircular = function (range) {
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


      __proto._updateControlScale = function (changeEvt) {
        var opt = this.options;
        var fov = this.axes.get().fov;

        var pRange = this._updatePitchRange(opt.pitchRange, fov, opt.showPolePoint);

        var yRange = this._updateYawRange(opt.yawRange, fov, opt.aspectRatio); // TODO: If not changed!?


        var pos = this.axes.get();
        var y = pos.yaw;
        var p = pos.pitch;
        copy$3(this.axes.axis.yaw.range, yRange);
        copy$3(this.axes.axis.pitch.range, pRange);
        this.axes.axis.yaw.circular = this._isCircular(yRange);
        this.axes.axis.pitch.circular = this._isCircular(pRange);
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

      __proto._updatePitchRange = function (pitchRange, fov, showPolePoint) {
        if (this.options.gyroMode === GYRO_MODE.VR) {
          // Circular pitch on VR
          return CIRCULAR_PITCH_RANGE;
        }

        var verticalAngle = pitchRange[1] - pitchRange[0];
        var halfFov = fov / 2;
        var isPanorama = verticalAngle < 180;

        if (showPolePoint && !isPanorama) {
          // Use full pinch range
          return pitchRange.concat();
        } // Round value as movableCood do.


        return [pitchRange[0] + halfFov, pitchRange[1] - halfFov];
      };

      __proto._updateYawRange = function (yawRange, fov, aspectRatio) {
        if (this.options.gyroMode === GYRO_MODE.VR) {
          return DEFAULT_YAW_RANGE;
        }

        var horizontalAngle = yawRange[1] - yawRange[0];
        /**
         * Full 360 Mode
         */

        if (horizontalAngle >= 360) {
          // Don't limit yaw range on Full 360 mode.
          return yawRange.concat();
        }
        /**
         * Panorama mode
         */
        // Ref : https://github.com/naver/egjs-view360/issues/290


        var halfHorizontalFov = util.toDegree(Math.atan2(aspectRatio, 1 / Math.tan(toRadian(fov / 2)))); // Round value as movableCood do.

        return [yawRange[0] + halfHorizontalFov, yawRange[1] - halfHorizontalFov];
      }; // TODO: update param type after Axes event type inference update


      __proto._triggerChange = function (evt) {
        var pos = this.axes.get();
        var opt = this.options;
        var event = {
          targetElement: opt.element,
          isTrusted: evt.isTrusted,
          yaw: pos.yaw,
          pitch: pos.pitch,
          fov: pos.fov,
          quaternion: null
        };

        if (opt.gyroMode === GYRO_MODE.VR && this._deviceQuaternion) {
          event.quaternion = this._deviceQuaternion.getCombinedQuaternion(pos.yaw);
        }

        this.trigger("change", event);
      }; // TODO: makes constant to be logic


      __proto._adjustAspectRatio = function (input) {
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
            // FIXME: this looks definitely wrong
            return outputRange[outputRange[0].length - 1];
          }
        }

        var inputA = inputRange[rangeIdx];
        var inputB = inputRange[rangeIdx + 1];
        var outputA = outputRange[rangeIdx];
        var outputB = outputRange[rangeIdx + 1];
        return this._lerp(outputA, outputB, (input - inputA) / (inputB - inputA));
      };

      __proto._lerp = function (a, b, fraction) {
        return a + fraction * (b - a);
      };

      __proto._resetOrientation = function () {
        var opt = this.options;
        this.axes.setTo({
          yaw: opt.yaw,
          pitch: opt.pitch,
          fov: opt.fov
        }, 0);
        return this;
      };

      YawPitchControl.VERSION = VERSION; // Expose DeviceOrientationControls sub module for test purpose

      YawPitchControl.CONTROL_MODE_VR = CONTROL_MODE_VR;
      YawPitchControl.CONTROL_MODE_YAWPITCH = CONTROL_MODE_YAWPITCH;
      YawPitchControl.TOUCH_DIRECTION_ALL = TOUCH_DIRECTION_ALL;
      YawPitchControl.TOUCH_DIRECTION_YAW = TOUCH_DIRECTION_YAW;
      YawPitchControl.TOUCH_DIRECTION_PITCH = TOUCH_DIRECTION_PITCH;
      YawPitchControl.TOUCH_DIRECTION_NONE = TOUCH_DIRECTION_NONE;
      return YawPitchControl;
    }(Component);

    /*
    Copyright (c) 2020-present NAVER Corp.
    name: @egjs/imready
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-imready
    version: 1.1.2
    */

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
    var extendStatics$2 = function (d, b) {
      extendStatics$2 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      return extendStatics$2(d, b);
    };

    function __extends$2(d, b) {
      extendStatics$2(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$2 = function () {
      __assign$2 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$2.apply(this, arguments);
    };
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    /*
    egjs-imready
    Copyright (c) 2020-present NAVER Corp.
    MIT license
    */
    var isWindow = typeof window !== "undefined";
    var ua = isWindow ? window.navigator.userAgent : "";
    var SUPPORT_COMPUTEDSTYLE = isWindow ? !!("getComputedStyle" in window) : false;
    var IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
    var SUPPORT_ADDEVENTLISTENER = isWindow ? !!("addEventListener" in document) : false;
    var WIDTH = "width";
    var HEIGHT = "height";

    function getAttribute(el, name) {
      return el.getAttribute(name) || "";
    }
    function toArray$2(arr) {
      return [].slice.call(arr);
    }
    function hasSizeAttribute(target, prefix) {
      if (prefix === void 0) {
        prefix = "data-";
      }

      return !!target.getAttribute(prefix + "width");
    }
    function hasLoadingAttribute(target) {
      return "loading" in target && target.getAttribute("loading") === "lazy";
    }
    function hasSkipAttribute(target, prefix) {
      if (prefix === void 0) {
        prefix = "data-";
      }

      return !!target.getAttribute(prefix + "skip");
    }
    function addEvent(element, type, handler) {
      if (SUPPORT_ADDEVENTLISTENER) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    }
    function removeEvent(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    }
    function innerWidth(el) {
      return getSize(el, "Width");
    }
    function innerHeight(el) {
      return getSize(el, "Height");
    }
    function getStyles(el) {
      return (SUPPORT_COMPUTEDSTYLE ? window.getComputedStyle(el) : el.currentStyle) || {};
    }

    function getSize(el, name) {
      var size = el["client" + name] || el["offset" + name];
      return parseFloat(size || getStyles(el)[name.toLowerCase()]) || 0;
    }

    function getContentElements(element, tags, prefix) {
      var skipElements = toArray$2(element.querySelectorAll(__spreadArrays(["[" + prefix + "skip] [" + prefix + "width]"], tags.map(function (tag) {
        return ["[" + prefix + "skip] " + tag, tag + "[" + prefix + "skip]", "[" + prefix + "width] " + tag].join(", ");
      })).join(", ")));
      return toArray$2(element.querySelectorAll("[" + prefix + "width], " + tags.join(", "))).filter(function (el) {
        return skipElements.indexOf(el) === -1;
      });
    }

    /*
    egjs-imready
    Copyright (c) 2020-present NAVER Corp.
    MIT license
    */
    var elements = [];
    function addAutoSizer(element, prefix) {
      !elements.length && addEvent(window, "resize", resizeAllAutoSizers);
      element.__PREFIX__ = prefix;
      elements.push(element);
      resize(element);
    }
    function removeAutoSizer(element, prefix) {
      var index = elements.indexOf(element);

      if (index < 0) {
        return;
      }

      var fixed = getAttribute(element, prefix + "fixed");
      delete element.__PREFIX__;
      element.style[fixed === HEIGHT ? WIDTH : HEIGHT] = "";
      elements.splice(index, 1);
      !elements.length && removeEvent(window, "resize", resizeAllAutoSizers);
    }

    function resize(element, prefix) {
      if (prefix === void 0) {
        prefix = "data-";
      }

      var elementPrefix = element.__PREFIX__ || prefix;
      var dataWidth = parseInt(getAttribute(element, "" + elementPrefix + WIDTH), 10) || 0;
      var dataHeight = parseInt(getAttribute(element, "" + elementPrefix + HEIGHT), 10) || 0;
      var fixed = getAttribute(element, elementPrefix + "fixed");

      if (fixed === HEIGHT) {
        var size = innerHeight(element) || dataHeight;
        element.style[WIDTH] = dataWidth / dataHeight * size + "px";
      } else {
        var size = innerWidth(element) || dataWidth;
        element.style[HEIGHT] = dataHeight / dataWidth * size + "px";
      }
    }

    function resizeAllAutoSizers() {
      elements.forEach(function (element) {
        resize(element);
      });
    }

    var Loader =
    /*#__PURE__*/
    function (_super) {
      __extends$2(Loader, _super);

      function Loader(element, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.isReady = false;
        _this.isPreReady = false;
        _this.hasDataSize = false;
        _this.hasLoading = false;
        _this.isSkip = false;

        _this.onCheck = function (e) {
          _this.clear();

          if (e && e.type === "error") {
            _this.onError(_this.element);
          } // I'm pre-ready and ready!


          var withPreReady = !_this.hasDataSize && !_this.hasLoading;

          _this.onReady(withPreReady);
        };

        _this.options = __assign$2({
          prefix: "data-"
        }, options);
        _this.element = element;
        _this.hasDataSize = hasSizeAttribute(element, _this.options.prefix);
        _this.hasLoading = hasLoadingAttribute(element);
        _this.isSkip = hasSkipAttribute(_this.element);
        return _this;
      }

      var __proto = Loader.prototype;

      __proto.check = function () {
        if (this.isSkip || !this.checkElement()) {
          // I'm Ready
          this.onAlreadyReady(true);
          return false;
        }

        if (this.hasDataSize) {
          addAutoSizer(this.element, this.options.prefix);
        }

        if (this.hasDataSize || this.hasLoading) {
          // I'm Pre Ready
          this.onAlreadyPreReady();
        } // Wati Pre Ready, Ready


        return true;
      };

      __proto.addEvents = function () {
        var _this = this;

        var element = this.element;
        this.constructor.EVENTS.forEach(function (name) {
          addEvent(element, name, _this.onCheck);
        });
      };

      __proto.clear = function () {
        var _this = this;

        var element = this.element;
        this.constructor.EVENTS.forEach(function (name) {
          removeEvent(element, name, _this.onCheck);
        });
        this.removeAutoSizer();
      };

      __proto.destroy = function () {
        this.clear();
        this.off();
      };

      __proto.removeAutoSizer = function () {
        if (this.hasDataSize) {
          // I'm already ready.
          var prefix = this.options.prefix;
          removeAutoSizer(this.element, prefix);
        }
      };

      __proto.onError = function (target) {
        this.trigger("error", {
          element: this.element,
          target: target
        });
      };

      __proto.onPreReady = function () {
        if (this.isPreReady) {
          return;
        }

        this.isPreReady = true;
        this.trigger("preReady", {
          element: this.element,
          hasLoading: this.hasLoading,
          isSkip: this.isSkip
        });
      };

      __proto.onReady = function (withPreReady) {
        if (this.isReady) {
          return;
        }

        if (withPreReady) {
          this.isPreReady = true;
        }

        this.removeAutoSizer();
        this.isReady = true;
        this.trigger("ready", {
          element: this.element,
          withPreReady: withPreReady,
          hasLoading: this.hasLoading,
          isSkip: this.isSkip
        });
      };

      __proto.onAlreadyError = function (target) {
        var _this = this;

        setTimeout(function () {
          _this.onError(target);
        });
      };

      __proto.onAlreadyPreReady = function () {
        var _this = this;

        setTimeout(function () {
          _this.onPreReady();
        });
      };

      __proto.onAlreadyReady = function (withPreReady) {
        var _this = this;

        setTimeout(function () {
          _this.onReady(withPreReady);
        });
      };

      Loader.EVENTS = [];
      return Loader;
    }(Component);

    var ElementLoader =
    /*#__PURE__*/
    function (_super) {
      __extends$2(ElementLoader, _super);

      function ElementLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = ElementLoader.prototype;

      __proto.setHasLoading = function (hasLoading) {
        this.hasLoading = hasLoading;
      };

      __proto.check = function () {
        if (this.isSkip) {
          // I'm Ready
          this.onAlreadyReady(true);
          return false;
        }

        if (this.hasDataSize) {
          addAutoSizer(this.element, this.options.prefix);
          this.onAlreadyPreReady();
        } else {
          // has not data size
          this.trigger("requestChildren");
        }

        return true;
      };

      __proto.checkElement = function () {
        return true;
      };

      __proto.destroy = function () {
        this.clear();
        this.trigger("requestDestroy");
        this.off();
      };

      __proto.onAlreadyPreReady = function () {
        // has data size
        _super.prototype.onAlreadyPreReady.call(this);

        this.trigger("reqeustReadyChildren");
      };

      ElementLoader.EVENTS = [];
      return ElementLoader;
    }(Loader);

    /**
     * @alias eg.ImReady
     * @extends eg.Component
     */

    var ImReadyManager =
    /*#__PURE__*/
    function (_super) {
      __extends$2(ImReadyManager, _super);
      /**
       * @param - ImReady's options
       */


      function ImReadyManager(options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.readyCount = 0;
        _this.preReadyCount = 0;
        _this.totalCount = 0;
        _this.totalErrorCount = 0;
        _this.isPreReadyOver = true;
        _this.elementInfos = [];
        _this.options = __assign$2({
          loaders: {},
          prefix: "data-"
        }, options);
        return _this;
      }
      /**
       * Checks whether elements are in the ready state.
       * @ko 엘리먼트가 준비 상태인지 체크한다.
       * @elements - Elements to check ready status. <ko> 준비 상태를 체크할 엘리먼트들.</ko>
       * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg" data-width="1280" data-height="853"/>
         *    <img src="ERR" data-width="1280" data-height="853"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check(document.querySelectorAll("img")).on({
         *   preReadyElement: e => {
         *     // 1, 3
         *     // 2, 3
         *     // 3, 3
         *     console.log(e.preReadyCount, e.totalCount),
         *   },
         * });
         * ```
       */


      var __proto = ImReadyManager.prototype;

      __proto.check = function (elements) {
        var _this = this;

        var prefix = this.options.prefix;
        this.clear();
        this.elementInfos = toArray$2(elements).map(function (element, index) {
          var loader = _this.getLoader(element, {
            prefix: prefix
          });

          loader.check();
          loader.on("error", function (e) {
            _this.onError(index, e.target);
          }).on("preReady", function (e) {
            var info = _this.elementInfos[index];
            info.hasLoading = e.hasLoading;
            info.isSkip = e.isSkip;

            var isPreReady = _this.checkPreReady(index);

            _this.onPreReadyElement(index);

            isPreReady && _this.onPreReady();
          }).on("ready", function (_a) {
            var withPreReady = _a.withPreReady,
                hasLoading = _a.hasLoading,
                isSkip = _a.isSkip;
            var info = _this.elementInfos[index];
            info.hasLoading = hasLoading;
            info.isSkip = isSkip;

            var isPreReady = withPreReady && _this.checkPreReady(index);

            var isReady = _this.checkReady(index); // Pre-ready and ready occur simultaneously


            withPreReady && _this.onPreReadyElement(index);

            _this.onReadyElement(index);

            isPreReady && _this.onPreReady();
            isReady && _this.onReady();
          });
          return {
            loader: loader,
            element: element,
            hasLoading: false,
            hasError: false,
            isPreReady: false,
            isReady: false,
            isSkip: false
          };
        });
        var length = this.elementInfos.length;
        this.totalCount = length;

        if (!length) {
          setTimeout(function () {
            _this.onPreReady();

            _this.onReady();
          });
        }

        return this;
      };
      /**
       * Gets the total count of elements to be checked.
       * @ko 체크하는 element의 총 개수를 가져온다.
       */


      __proto.getTotalCount = function () {
        return this.totalCount;
      };
      /**
       * Whether the elements are all pre-ready. (all sizes are known)
       * @ko 엘리먼트들이 모두 사전 준비가 됐는지 (사이즈를 전부 알 수 있는지) 여부.
       */


      __proto.isPreReady = function () {
        return this.elementInfos.every(function (info) {
          return info.isPreReady;
        });
      };
      /**
       * Whether the elements are all ready.
       * @ko 엘리먼트들이 모두 준비가 됐는지 여부.
       */


      __proto.isReady = function () {
        return this.elementInfos.every(function (info) {
          return info.isReady;
        });
      };
      /**
       * Whether an error has occurred in the elements in the current state.
       * @ko 현재 상태에서 엘리먼트들이 에러가 발생했는지 여부.
       */


      __proto.hasError = function () {
        return this.totalErrorCount > 0;
      };
      /**
       * Clears events of elements being checked.
       * @ko 체크 중인 엘리먼트들의 이벤트를 해제 한다.
       */


      __proto.clear = function () {
        this.isPreReadyOver = false;
        this.totalCount = 0;
        this.preReadyCount = 0;
        this.readyCount = 0;
        this.totalErrorCount = 0;
        this.elementInfos.forEach(function (info) {
          if (!info.isReady && info.loader) {
            info.loader.destroy();
          }
        });
        this.elementInfos = [];
      };
      /**
       * Destory all events.
       * @ko 모든 이벤트를 해제 한다.
       */


      __proto.destroy = function () {
        this.clear();
        this.off();
      };

      __proto.getLoader = function (element, options) {
        var _this = this;

        var tagName = element.tagName.toLowerCase();
        var loaders = this.options.loaders;
        var tags = Object.keys(loaders);

        if (loaders[tagName]) {
          return new loaders[tagName](element, options);
        }

        var loader = new ElementLoader(element, options);
        var children = toArray$2(element.querySelectorAll(tags.join(", ")));
        loader.setHasLoading(children.some(function (el) {
          return hasLoadingAttribute(el);
        }));
        var withPreReady = false;
        var childrenImReady = this.clone().on("error", function (e) {
          loader.onError(e.target);
        }).on("ready", function () {
          loader.onReady(withPreReady);
        });
        loader.on("requestChildren", function () {
          // has not data size
          var contentElements = getContentElements(element, tags, _this.options.prefix);
          childrenImReady.check(contentElements).on("preReady", function (e) {
            withPreReady = e.isReady;

            if (!withPreReady) {
              loader.onPreReady();
            }
          });
        }).on("reqeustReadyChildren", function () {
          // has data size
          // loader call preReady
          // check only video, image elements
          childrenImReady.check(children);
        }).on("requestDestroy", function () {
          childrenImReady.destroy();
        });
        return loader;
      };

      __proto.clone = function () {
        return new ImReadyManager(__assign$2({}, this.options));
      };

      __proto.checkPreReady = function (index) {
        this.elementInfos[index].isPreReady = true;
        ++this.preReadyCount;

        if (this.preReadyCount < this.totalCount) {
          return false;
        }

        return true;
      };

      __proto.checkReady = function (index) {
        this.elementInfos[index].isReady = true;
        ++this.readyCount;

        if (this.readyCount < this.totalCount) {
          return false;
        }

        return true;
      };

      __proto.onError = function (index, target) {
        var info = this.elementInfos[index];
        info.hasError = true;
        /**
         * An event occurs if the image, video fails to load.
         * @ko 이미지, 비디오가 로딩에 실패하면 이벤트가 발생한다.
         * @event eg.ImReady#error
         * @param {eg.ImReady.OnError} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {HTMLElement} [e.element] - The element with error images.<ko>오류난 이미지가 있는 엘리먼트</ko>
         * @param {number} [e.index] - The item's index with error images. <ko>오류난 이미지가 있는 엘리먼트의 인덱스</ko>
         * @param {HTMLElement} [e.target] - Error image target in element <ko>엘리먼트의 오류난 이미지 타겟</ko>
         * @param {number} [e.errorCount] - The number of elements with errors <ko>에러가 있는 엘리먼트들의 개수</ko>
         * @param {number} [e.totalErrorCount] - The total number of targets with errors <ko>에러가 있는 타겟들의 총 개수</ko>
         * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg"/>
         *    <img src="ERR"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check([document.querySelector("div")]).on({
         *   error: e => {
         *     // <div>...</div>, 0, <img src="ERR"/>
         *     console.log(e.element, e.index, e.target),
         *   },
         * });
         * ```
         */

        this.trigger("error", {
          element: info.element,
          index: index,
          target: target,
          errorCount: this.getErrorCount(),
          totalErrorCount: ++this.totalErrorCount
        });
      };

      __proto.onPreReadyElement = function (index) {
        var info = this.elementInfos[index];
        /**
         * An event occurs when the element is pre-ready (when the loading attribute is applied or the size is known)
         * @ko 해당 엘리먼트가 사전 준비되었을 때(loading 속성이 적용되었거나 사이즈를 알 수 있을 때) 이벤트가 발생한다.
         * @event eg.ImReady#preReadyElement
         * @param {eg.ImReady.OnPreReadyElement} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {HTMLElement} [e.element] - The pre-ready element.<ko>사전 준비된 엘리먼트</ko>
         * @param {number} [e.index] - The index of the pre-ready element. <ko>사전 준비된 엘리먼트의 인덱스</ko>
         * @param {number} [e.preReadyCount] - Number of elements pre-ready <ko>사전 준비된 엘리먼트들의 개수</ko>
         * @param {number} [e.readyCount] - Number of elements ready <ko>준비된 엘리먼트들의 개수</ko>
         * @param {number} [e.totalCount] - Total number of elements <ko>엘리먼트들의 총 개수</ko>
         * @param {boolean} [e.isPreReady] - Whether all elements are pre-ready <ko>모든 엘리먼트가 사전 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.isReady] - Whether all elements are ready <ko>모든 엘리먼트가 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.hasLoading] - Whether the loading attribute has been applied <ko>loading 속성이 적용되었는지 여부</ko>
         * @param {boolean} [e.isSkip] - Whether the check is omitted due to skip attribute <ko>skip 속성으로 인하여 체크가 생략됐는지 여부</ko>
         * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg" data-width="1280" data-height="853"/>
         *    <img src="ERR" data-width="1280" data-height="853"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check(document.querySelectorAll("img")).on({
         *   preReadyElement: e => {
         *     // 1, 3
         *     // 2, 3
         *     // 3, 3
         *     console.log(e.preReadyCount, e.totalCount),
         *   },
         * });
         * ```
         */

        this.trigger("preReadyElement", {
          element: info.element,
          index: index,
          preReadyCount: this.preReadyCount,
          readyCount: this.readyCount,
          totalCount: this.totalCount,
          isPreReady: this.isPreReady(),
          isReady: this.isReady(),
          hasLoading: info.hasLoading,
          isSkip: info.isSkip
        });
      };

      __proto.onPreReady = function () {
        this.isPreReadyOver = true;
        /**
         * An event occurs when all element are pre-ready (When all elements have the loading attribute applied or the size is known)
         * @ko 모든 엘리먼트들이 사전 준비된 경우 (모든 엘리먼트들이 loading 속성이 적용되었거나 사이즈를 알 수 있는 경우) 이벤트가 발생한다.
         * @event eg.ImReady#preReady
         * @param {eg.ImReady.OnPreReady} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {number} [e.readyCount] - Number of elements ready <ko>준비된 엘리먼트들의 개수</ko>
         * @param {number} [e.totalCount] - Total number of elements <ko>엘리먼트들의 총 개수</ko>
         * @param {boolean} [e.isReady] - Whether all elements are ready <ko>모든 엘리먼트가 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.hasLoading] - Whether the loading attribute has been applied <ko>loading 속성이 적용되었는지 여부</ko>
         * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg" data-width="1280" data-height="853"/>
         *    <img src="ERR" data-width="1280" data-height="853"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check(document.querySelectorAll("img")).on({
         *   preReady: e => {
         *     // 0, 3
         *     console.log(e.readyCount, e.totalCount),
         *   },
         * });
         * ```
         */

        this.trigger("preReady", {
          readyCount: this.readyCount,
          totalCount: this.totalCount,
          isReady: this.isReady(),
          hasLoading: this.hasLoading()
        });
      };

      __proto.onReadyElement = function (index) {
        var info = this.elementInfos[index];
        /**
         * An event occurs when the element is ready
         * @ko 해당 엘리먼트가 준비가 되었을 때 이벤트가 발생한다.
         * @event eg.ImReady#readyElement
         * @param {eg.ImReady.OnReadyElement} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {HTMLElement} [e.element] - The ready element.<ko>준비된 엘리먼트</ko>
         * @param {number} [e.index] - The index of the ready element. <ko>준비된 엘리먼트의 인덱스</ko>
         * @param {boolean} [e.hasError] - Whether there is an error in the element <ko>해당 엘리먼트에 에러가 있는지 여부</ko>
         * @param {number} [e.errorCount] - The number of elements with errors <ko>에러가 있는 엘리먼트들의 개수</ko>
         * @param {number} [e.totalErrorCount] - The total number of targets with errors <ko>에러가 있는 타겟들의 총 개수</ko>
         * @param {number} [e.preReadyCount] - Number of elements pre-ready <ko>사전 준비된 엘리먼트들의 개수</ko>
         * @param {number} [e.readyCount] - Number of elements ready <ko>준비된 엘리먼트들의 개수</ko>
         * @param {number} [e.totalCount] - Total number of elements <ko>엘리먼트들의 총 개수</ko>
         * @param {boolean} [e.isPreReady] - Whether all elements are pre-ready <ko>모든 엘리먼트가 사전 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.isReady] - Whether all elements are ready <ko>모든 엘리먼트가 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.hasLoading] - Whether the loading attribute has been applied <ko>loading 속성이 적용되었는지 여부</ko>
         * @param {boolean} [e.isPreReadyOver] - Whether pre-ready is over <ko>사전 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.isSkip] - Whether the check is omitted due to skip attribute <ko>skip 속성으로 인하여 체크가 생략됐는지 여부</ko>
         * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg" data-width="1280" data-height="853"/>
         *    <img src="ERR" data-width="1280" data-height="853"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check(document.querySelectorAll("img")).on({
         *   readyElement: e => {
         *     // 1, 0, false, 3
         *     // 2, 1, false, 3
         *     // 3, 2, true, 3
         *     console.log(e.readyCount, e.index, e.hasError, e.totalCount),
         *   },
         * });
         * ```
         */

        this.trigger("readyElement", {
          index: index,
          element: info.element,
          hasError: info.hasError,
          errorCount: this.getErrorCount(),
          totalErrorCount: this.totalErrorCount,
          preReadyCount: this.preReadyCount,
          readyCount: this.readyCount,
          totalCount: this.totalCount,
          isPreReady: this.isPreReady(),
          isReady: this.isReady(),
          hasLoading: info.hasLoading,
          isPreReadyOver: this.isPreReadyOver,
          isSkip: info.isSkip
        });
      };

      __proto.onReady = function () {
        /**
         * An event occurs when all element are ready
         * @ko 모든 엘리먼트들이 준비된 경우 이벤트가 발생한다.
         * @event eg.ImReady#ready
         * @param {eg.ImReady.OnReady} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {number} [e.errorCount] - The number of elements with errors <ko>에러가 있는 엘리먼트들의 개수</ko>
         * @param {number} [e.totalErrorCount] - The total number of targets with errors <ko>에러가 있는 타겟들의 총 개수</ko>
         * @param {number} [e.totalCount] - Total number of elements <ko>엘리먼트들의 총 개수</ko>
         * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg" data-width="1280" data-height="853"/>
         *    <img src="ERR" data-width="1280" data-height="853"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check(document.querySelectorAll("img")).on({
         *   preReady: e => {
         *     // 0, 3
         *     console.log(e.readyCount, e.totalCount),
         *   },
         *   ready: e => {
         *     // 1, 3
         *     console.log(e.errorCount, e.totalCount),
         *   },
         * });
         * ```
         */
        this.trigger("ready", {
          errorCount: this.getErrorCount(),
          totalErrorCount: this.totalErrorCount,
          totalCount: this.totalCount
        });
      };

      __proto.getErrorCount = function () {
        return this.elementInfos.filter(function (info) {
          return info.hasError;
        }).length;
      };

      __proto.hasLoading = function () {
        return this.elementInfos.some(function (info) {
          return info.hasLoading;
        });
      };

      return ImReadyManager;
    }(Component);

    var ImageLoader =
    /*#__PURE__*/
    function (_super) {
      __extends$2(ImageLoader, _super);

      function ImageLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = ImageLoader.prototype;

      __proto.checkElement = function () {
        var element = this.element;
        var src = element.getAttribute("src");

        if (element.complete && src) {
          if (!element.naturalWidth) {
            this.onAlreadyError(element);
          }

          return false;
        }

        this.addEvents();
        IS_IE && element.setAttribute("src", src);
        return true;
      };

      ImageLoader.EVENTS = ["load", "error"];
      return ImageLoader;
    }(Loader);

    var VideoLoader =
    /*#__PURE__*/
    function (_super) {
      __extends$2(VideoLoader, _super);

      function VideoLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = VideoLoader.prototype;

      __proto.checkElement = function () {
        var element = this.element; // HAVE_NOTHING: 0, no information whether or not the audio/video is ready
        // HAVE_METADATA: 1, HAVE_METADATA - metadata for the audio/video is ready
        // HAVE_CURRENT_DATA: 2, data for the current playback position is available, but not enough data to play next frame/millisecond
        // HAVE_FUTURE_DATA: 3, data for the current and at least the next frame is available
        // HAVE_ENOUGH_DATA: 4, enough data available to start playing

        if (element.readyState >= 1) {
          return false;
        }

        if (element.error) {
          this.onAlreadyError(element);
          return false;
        }

        this.addEvents();
        return true;
      };

      VideoLoader.EVENTS = ["loadedmetadata", "error"];
      return VideoLoader;
    }(Loader);

    var ImReady =
    /*#__PURE__*/
    function (_super) {
      __extends$2(ImReady, _super);

      function ImReady(options) {
        if (options === void 0) {
          options = {};
        }

        return _super.call(this, __assign$2({
          loaders: {
            img: ImageLoader,
            video: VideoLoader
          }
        }, options)) || this;
      }

      return ImReady;
    }(ImReadyManager);

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

    var WebGLUtils =
    /*#__PURE__*/
    function () {
      function WebGLUtils() {}

      WebGLUtils.createShader = function (gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

        if (success) {
          return shader;
        } // eslint-disable-next-line


        console.error(gl.getShaderInfoLog(shader));
        return null;
      };

      WebGLUtils.createProgram = function (gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);

        if (success) {
          return program;
        }

        gl.deleteProgram(program);
        return null;
      };

      WebGLUtils.initBuffer = function (gl, target
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

      WebGLUtils.getWebglContext = function (canvas, userContextAttributes) {
        var e_1, _a;

        var webglIdentifiers = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        var context = null;

        var contextAttributes = __assign({
          preserveDrawingBuffer: false,
          antialias: false,
          xrCompatible: true
        }, userContextAttributes);

        function onWebglcontextcreationerror(e) {
          return e.statusMessage;
        }

        canvas.addEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

        try {
          for (var webglIdentifiers_1 = __values(webglIdentifiers), webglIdentifiers_1_1 = webglIdentifiers_1.next(); !webglIdentifiers_1_1.done; webglIdentifiers_1_1 = webglIdentifiers_1.next()) {
            var identifier = webglIdentifiers_1_1.value;

            try {
              context = canvas.getContext(identifier, contextAttributes);
            } catch (t) {} // tslint:disable-line no-empty


            if (context) {
              break;
            }
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (webglIdentifiers_1_1 && !webglIdentifiers_1_1.done && (_a = webglIdentifiers_1.return)) _a.call(webglIdentifiers_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }

        canvas.removeEventListener("webglcontextcreationerror", onWebglcontextcreationerror);
        return context;
      };

      WebGLUtils.createTexture = function (gl, textureTarget) {
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


      WebGLUtils.isWebGLAvailable = function () {
        if (webglAvailability === null) {
          var canvas = document.createElement("canvas");
          var webglContext = WebGLUtils.getWebglContext(canvas);
          webglAvailability = !!webglContext; // webglContext Resource forced collection

          if (webglContext) {
            var loseContextExtension = webglContext.getExtension("WEBGL_lose_context");

            if (loseContextExtension) {
              loseContextExtension.loseContext();
            }
          }
        }

        return !!webglAvailability;
      };
      /**
       * Returns whether webgl is stable in the current browser.
       * @method WebGLUtils#isStableWebGL
       * @retuen {Boolean} isStableWebGL
       */


      WebGLUtils.isStableWebGL = function () {
        var agentInfo = agent();
        var isStableWebgl = true;

        if (agentInfo.os.name === "android") {
          var version = parseFloat(agentInfo.os.version);

          if (version <= 4.3 && version >= 1) {
            isStableWebgl = false;
          } else if (version === 4.4) {
            if (agentInfo.browser.name !== "chrome") {
              isStableWebgl = false;
            }
          }
        }

        return isStableWebgl;
      };

      WebGLUtils.getErrorNameFromWebGLErrorCode = function (code) {
        if (!(code in WEBGL_ERROR_CODE)) {
          return "UNKNOWN_ERROR";
        }

        return WEBGL_ERROR_CODE[code];
      };
      /**
       * This function is wrapper for texImage2D to handle exceptions on texImage2D.
       * Purpose is to prevent service from being stopped by script error.
       */


      WebGLUtils.texImage2D = function (gl, target, pixels) {
        try {
          gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        } catch (error) {
          /* eslint-disable no-console */
          console.error("WebGLUtils.texImage2D error:", error);
          /* eslint-enable no-console */
        }
      };

      WebGLUtils.getMaxTextureSize = function (gl) {
        // WARN: MAX_TEXTURE_SIZE_FOR_TEST is used for test
        return  gl.getParameter(gl.MAX_TEXTURE_SIZE);
      };

      return WebGLUtils;
    }();

    var agentInfo = agent();
    var isIE11 = agentInfo.browser.name === "ie" && agentInfo.browser.majorVersion === 11;
    var EVENTS = {
      ERROR: "error"
    };
    /**
     *
     * Extends Component for firing errors occurs internally.
     */

    var Renderer =
    /*#__PURE__*/
    function (_super) {
      __extends(Renderer, _super);

      function Renderer() {
        var _this = _super.call(this) || this;

        _this._forceDimension = null;
        _this._pixelCanvas = null;
        _this._pixelContext = null;
        return _this;
      }

      var __proto = Renderer.prototype;

      __proto.render = function (_a) {
        var gl = _a.gl,
            shaderProgram = _a.shaderProgram,
            indexBuffer = _a.indexBuffer,
            mvMatrix = _a.mvMatrix,
            pMatrix = _a.pMatrix;
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

        if (indexBuffer) {
          gl.drawElements(gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
      }; // Define interface for Renderers

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


      __proto.getDimension = function (pixelSource) {
        var width = pixelSource.naturalWidth || pixelSource.videoWidth;
        var height = pixelSource.naturalHeight || pixelSource.videoHeight;
        return {
          width: width,
          height: height
        };
      };
      /**
       * Update data used by shader
       */


      __proto.updateShaderData = function (param) {
        /*
        * Update following data in implementation layer.
        * If the data is not changed, it does not need to implement this function.
        *
        * - _VERTEX_POSITION_DATA
        * - _TEXTURE_COORD_DATA
        * - _INDEX_DATA
        */
      };
      /**
       *
       * @param {HTMLImageElement | HTMLVideoElement} image
       * @param {Object = {width, height}} forceDimension Forced dimension to resize
       */


      __proto._initPixelSource = function (image, forceDimension) {
        if (forceDimension === void 0) {
          forceDimension = null;
        }

        var isIE11Video = isIE11 && image instanceof HTMLVideoElement;

        if (isIE11Video || forceDimension) {
          var _a = forceDimension || this.getDimension(image),
              width = _a.width,
              height = _a.height;

          this._pixelCanvas = document.createElement("canvas");
          this._pixelCanvas.width = width;
          this._pixelCanvas.height = height;
          this._pixelContext = this._pixelCanvas.getContext("2d");
        }

        this._forceDimension = forceDimension;
      };

      __proto._getPixelSource = function (image) {
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

      __proto._extractTileConfig = function (imageConfig) {
        var tileConfig = Array.isArray(imageConfig.tileConfig) ? imageConfig.tileConfig : Array.apply(void 0, __spread(Array(6))).map(function () {
          return imageConfig.tileConfig;
        });
        tileConfig = tileConfig.map(function (config) {
          return __assign({
            flipHorizontal: false,
            rotation: 0
          }, config);
        });
        return tileConfig;
      };

      __proto._triggerError = function (error) {
        /* eslint-disable no-console */
        console.error("Renderer Error:", error);
        /* eslint-enable no-console */

        this.trigger(EVENTS.ERROR, {
          message: typeof error === "string" ? error : error.message
        });
      };

      Renderer.EVENTS = EVENTS;
      return Renderer;
    }(Component);

    var CubeRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends(CubeRenderer, _super);

      function CubeRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = CubeRenderer.prototype;

      CubeRenderer.extractOrder = function (imageConfig) {
        return imageConfig.order || "RLUDBF";
      };

      __proto.getVertexPositionData = function () {
        CubeRenderer._VERTEX_POSITION_DATA = CubeRenderer._VERTEX_POSITION_DATA !== null ? CubeRenderer._VERTEX_POSITION_DATA : [// back
        1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1, // front
        -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, // top
        -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, // bottom
        1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, // right
        1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, -1, // left
        -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1];
        return CubeRenderer._VERTEX_POSITION_DATA;
      };

      __proto.getIndexData = function () {
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

      __proto.getTextureCoordData = function (_a) {
        var _this = this;

        var image = _a.image,
            imageConfig = _a.imageConfig;
        var vertexOrder = "BFUDRL";
        var order = CubeRenderer.extractOrder(imageConfig);
        var base = this.getVertexPositionData();

        var tileConfig = this._extractTileConfig(imageConfig);

        var elemSize = 3;
        var vertexPerTile = 4;
        var trim = imageConfig.trim;
        var texCoords = vertexOrder.split("").map(function (face) {
          return tileConfig[order.indexOf(face)];
        }).map(function (config, i) {
          var rotation = Math.floor(config.rotation / 90);
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
        }).map(function (coord) {
          return _this._shrinkCoord({
            image: image,
            faceCoords: coord,
            trim: trim
          });
        }).reduce(function (acc, val) {
          return __spread(acc, val.reduce(function (coords, coord) {
            return __spread(coords, coord);
          }, []));
        }, []);
        return texCoords;
      };

      __proto.getVertexShaderSource = function () {
        return "\nattribute vec3 aVertexPosition;\nattribute vec3 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying highp vec3 vVertexDirectionVector;\nvoid main(void) {\n  vVertexDirectionVector = aTextureCoord;\n  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
      };

      __proto.getFragmentShaderSource = function () {
        return "\nprecision highp float;\nuniform samplerCube uSampler;\nvarying highp vec3 vVertexDirectionVector;\nvoid main(void) {\n  gl_FragColor = textureCube(uSampler, vVertexDirectionVector);\n}";
      };

      __proto.updateTexture = function (gl, image, imageConfig) {
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

            for (var surfaceIdx = 0; surfaceIdx < 6; surfaceIdx++) {
              var tileIdx = orderMap[baseOrder[surfaceIdx]];
              var tile = this.extractTileFromImage(image, tileIdx, maxCubeMapTextureSize);
              WebGLUtils.texImage2D(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_X + surfaceIdx, tile);
            }
          }
        } catch (e) {
          this._triggerError(e);
        }
      };

      __proto.bindTexture = function (gl, texture, image, imageConfig) {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        this.updateTexture(gl, image, imageConfig);
      };

      __proto.getSourceTileSize = function (image) {
        var _a = this.getDimension(image),
            width = _a.width,
            height = _a.height;

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

      __proto.extractTileFromImage = function (image, tileIdx, outputTextureSize) {
        var width = this.getDimension(image).width;
        var inputTextureSize = this.getSourceTileSize(image);
        var canvas = document.createElement("canvas");
        canvas.width = outputTextureSize;
        canvas.height = outputTextureSize;
        var context = canvas.getContext("2d");
        var tilePerRow = width / inputTextureSize;
        var x = inputTextureSize * tileIdx % (inputTextureSize * tilePerRow);
        var y = Math.floor(tileIdx / tilePerRow) * inputTextureSize;
        context.drawImage(image, x, y, inputTextureSize, inputTextureSize, 0, 0, outputTextureSize, outputTextureSize);
        return canvas;
      };

      __proto.getMaxCubeMapTextureSize = function (gl, image) {
        var agentInfo = agent();
        var maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

        var _imageWidth = this.getSourceTileSize(image);

        if (agentInfo.browser.name === "ie" && agentInfo.browser.majorVersion === 11) {
          if (!util.isPowerOfTwo(_imageWidth)) {
            for (var i = 1; i < maxCubeMapTextureSize; i *= 2) {
              if (i < _imageWidth) {
                continue;
              } else {
                _imageWidth = i;
                break;
              }
            }
          }
        }

        if (agentInfo.os.name === "ios") {
          var majorVersion = agentInfo.os.majorVersion; // ios 9 의 경우 텍스쳐 최대사이즈는 1024 이다.

          if (majorVersion === 9) {
            _imageWidth = 1024;
          } // ios 8 의 경우 텍스쳐 최대사이즈는 512 이다.


          if (majorVersion === 8) {
            _imageWidth = 512;
          }
        } // maxCubeMapTextureSize 보다는 작고, imageWidth 보다 큰 2의 승수 중 가장 작은 수


        return Math.min(maxCubeMapTextureSize, _imageWidth);
      };

      __proto._shrinkCoord = function (coordData) {
        var image = coordData.image,
            faceCoords = coordData.faceCoords,
            trim = coordData.trim;
        var inputTextureSize = Array.isArray(image) ? this.getDimension(image[0]).width : this.getSourceTileSize(image); // Shrink by "trim" px

        var SHRINK_MULTIPLIER = 1 - trim * (2 / inputTextureSize);
        var axisMultipliers = [0, 1, 2].map(function (axisIndex) {
          var axisDir = Math.sign(faceCoords[0][axisIndex]);
          var notSameDir = faceCoords.some(function (coord) {
            return Math.sign(coord[axisIndex]) !== axisDir;
          });
          return notSameDir;
        }).map(function (notSameDir) {
          return notSameDir ? SHRINK_MULTIPLIER : 1;
        });
        return faceCoords.map(function (coords) {
          return coords.map(function (coord, axisIndex) {
            return coord * axisMultipliers[axisIndex];
          });
        });
      };

      CubeRenderer._VERTEX_POSITION_DATA = null;
      CubeRenderer._INDEX_DATA = null;
      return CubeRenderer;
    }(Renderer);

    var CubeStripRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends(CubeStripRenderer, _super);

      function CubeStripRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = CubeStripRenderer.prototype;

      __proto.getVertexShaderSource = function () {
        return "\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying highp vec2 vTextureCoord;\nvoid main(void) {\n  vTextureCoord = aTextureCoord;\n  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
      };

      __proto.getFragmentShaderSource = function () {
        return "\n#define PI 3.14159265359\nprecision highp float;\nvarying highp vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform bool uIsEAC;\nconst vec2 OPERATE_COORDS_RANGE = vec2(-1.0, 1.0);\nconst vec2 TEXTURE_COORDS_RANGE = vec2(0.0, 1.0);\n// vector type is used for initializing values instead of array.\nconst vec4 TEXTURE_DIVISION_X = vec4(0.0, 1.0 / 3.0, 2.0 / 3.0, 1.0);\nconst vec3 TEXTURE_DIVISION_Y = vec3(0.0, 1.0 / 2.0, 1.0);\nconst float EAC_CONST = 2.0 / PI;\nfloat scale(vec2 domainRange, vec2 targetRange, float val) {\n  float unit = 1.0 / (domainRange[1] - domainRange[0]);\n  return targetRange[0] + (targetRange[1] - targetRange[0]) * (val - domainRange[0]) * unit;\n}\nvoid main(void) {\n  float transformedCoordX;\n  float transformedCoordY;\n\n  if (uIsEAC) {\n    vec2 orgTextureRangeX;\n    vec2 orgTextureRangeY;\n\n    // Apply EAC transform\n    if (vTextureCoord.s >= TEXTURE_DIVISION_X[2]) {\n      orgTextureRangeX = vec2(TEXTURE_DIVISION_X[2], TEXTURE_DIVISION_X[3]);\n    } else if (vTextureCoord.s >= TEXTURE_DIVISION_X[1]) {\n      orgTextureRangeX = vec2(TEXTURE_DIVISION_X[1], TEXTURE_DIVISION_X[2]);\n    } else {\n      orgTextureRangeX = vec2(TEXTURE_DIVISION_X[0], TEXTURE_DIVISION_X[1]);\n    }\n\n    if (vTextureCoord.t >= TEXTURE_DIVISION_Y[1]) {\n      orgTextureRangeY = vec2(TEXTURE_DIVISION_Y[1], TEXTURE_DIVISION_Y[2]);\n    } else {\n      orgTextureRangeY = vec2(TEXTURE_DIVISION_Y[0], TEXTURE_DIVISION_Y[1]);\n    }\n\n    // scaling coors by the coordinates following the range from -1.0 to 1.0.\n    float px = scale(orgTextureRangeX, OPERATE_COORDS_RANGE, vTextureCoord.s);\n    float py = scale(orgTextureRangeY, OPERATE_COORDS_RANGE, vTextureCoord.t);\n\n    float qu = EAC_CONST * atan(px) + 0.5;\n    float qv = EAC_CONST * atan(py) + 0.5;\n\n    // re-scaling coors by original coordinates ranges\n    transformedCoordX = scale(TEXTURE_COORDS_RANGE, orgTextureRangeX, qu);\n    transformedCoordY = scale(TEXTURE_COORDS_RANGE, orgTextureRangeY, qv);\n  } else {\n    // normal cubemap\n    transformedCoordX = vTextureCoord.s;\n    transformedCoordY = vTextureCoord.t;\n  }\n\n  gl_FragColor = texture2D(uSampler, vec2(transformedCoordX, transformedCoordY));\n}";
      };

      __proto.getVertexPositionData = function () {
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

      __proto.getIndexData = function () {
        var _this = this; // TODO: 한번만 계산하도록 수정하기


        var indices = function () {
          var indexData = [];

          for (var i = 0; i < _this._vertices.length / 3; i += 4) {
            indexData.push(i, i + 1, i + 2, i, i + 2, i + 3);
          }

          return indexData;
        }();

        return indices;
      };

      __proto.getTextureCoordData = function (_a) {
        var _this = this;

        var image = _a.image,
            imageConfig = _a.imageConfig; // TODO: make it cols, rows as config.

        var cols = 3;
        var rows = 2;
        var textureSize = this.getDimension(image);
        var trim = imageConfig.trim;
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
          return _this._shrinkCoord(coord, textureSize, trim);
        }).map(function (coord, i) {
          return _this._transformCoord(coord, tileConfigs[i]);
        }); // vertices 에서 지정된 순서대로 그대로 그리기 위해 vertex 의 순서를 BFUDRL 로 재배치

        return "BFUDRL".split("").map(function (face) {
          return order.indexOf(face);
        }).map(function (index) {
          return coords[index];
        }).reduce(function (acc, val) {
          return acc.concat(val);
        }, []);
      };

      __proto.updateTexture = function (gl, image) {
        WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
      };

      __proto.bindTexture = function (gl, texture, image) {
        // Make sure image isn't too big
        var _a = this.getDimension(image),
            width = _a.width,
            height = _a.height;

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

      __proto._transformCoord = function (coord, tileConfig) {
        var newCoord = coord.slice();

        if (tileConfig.flipHorizontal) {
          newCoord = this._flipHorizontalCoord(newCoord);
        }

        if (tileConfig.rotation) {
          newCoord = this._rotateCoord(newCoord, tileConfig.rotation);
        }

        return newCoord;
      };

      __proto._shrinkCoord = function (coord, textureSize, trim) {
        var width = textureSize.width,
            height = textureSize.height; // Shrink by "trim" px

        var SHRINK_Y = trim * (1 / height);
        var SHRINK_X = trim * (1 / width);
        return [coord[0] + SHRINK_X, coord[1] + SHRINK_Y, coord[2] - SHRINK_X, coord[3] + SHRINK_Y, coord[4] - SHRINK_X, coord[5] - SHRINK_Y, coord[6] + SHRINK_X, coord[7] - SHRINK_Y];
      };

      __proto._rotateCoord = function (coord, rotationAngle) {
        var SIZE = 2; // coord means x,y coordinates. Two values(x, y) makes a one coord.

        var shiftCount = Math.floor(rotationAngle / 90) % 4;

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

      __proto._flipHorizontalCoord = function (coord) {
        return [coord[2], coord[3], coord[0], coord[1], coord[6], coord[7], coord[4], coord[5]];
      };

      return CubeStripRenderer;
    }(Renderer);

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
       * @name STEREOSCOPIC_EQUI
       * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
       * @constant
       * @type {String}
       * @default stereoequi
       */
      STEREOSCOPIC_EQUI: "stereoequi"
    };
    /**
     * A constant value for the format of the stereoscopic equirectangular projection type.
     * @ko Stereoscopic equirectangular 프로젝션 타입의 포맷에 대한 상수 값
     * @namespace
     * @name STEREO_FORMAT
     * @memberof eg.view360.PanoViewer
     */

    var STEREO_FORMAT = {
      /**
       * A constant value for format of top bottom stereoscopic 360 equirectangular projection.
       * @ko top bottom stereoscopic 360 equirectangular projection 콘텐츠 포맷에 대한 상수값.
       * @name TOP_BOTTOM
       * @memberof eg.view360.PanoViewer.STEREO_FORMAT
       * @constant
       * @type {String}
       * @default "3dv"
       */
      TOP_BOTTOM: "3dv",

      /**
       * A constant value for format of left right stereoscopic 360 equirectangular projection.
       * @ko Left right stereoscopic 360 equirectangular projection 콘텐츠 포맷에 대한 상수값.
       * @name LEFT_RIGHT
       * @memberof eg.view360.PanoViewer.STEREO_FORMAT
       * @constant
       * @type {String}
       * @default "3dh"
       */
      LEFT_RIGHT: "3dh",

      /**
       * A constant value specifying media is not in stereoscopic format.
       * @ko Stereoscopic 영상이 아닐 경우에 적용하는 상수값.
       * @name NONE
       * @memberof eg.view360.PanoViewer.STEREO_FORMAT
       * @constant
       * @type {String}
       * @default ""
       */
      NONE: ""
    };

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
    function (_super) {
      __extends(SphereRenderer, _super);

      function SphereRenderer(format) {
        var _this = _super.call(this) || this;

        _this._stereoFormat = format;
        return _this;
      }

      var __proto = SphereRenderer.prototype;

      __proto.render = function (ctx) {
        var gl = ctx.gl,
            shaderProgram = ctx.shaderProgram;
        var leftEyeScaleOffset;
        var rightEyeScaleOffset;

        switch (this._stereoFormat) {
          case STEREO_FORMAT.TOP_BOTTOM:
            leftEyeScaleOffset = [1, 0.5, 0, 0];
            rightEyeScaleOffset = [1, 0.5, 0, 0.5];
            break;

          case STEREO_FORMAT.LEFT_RIGHT:
            leftEyeScaleOffset = [0.5, 1, 0, 0];
            rightEyeScaleOffset = [0.5, 1, 0.5, 0];
            break;

          default:
            leftEyeScaleOffset = [1, 1, 0, 0];
            rightEyeScaleOffset = [1, 1, 0, 0];
        }

        var uTexScaleOffset = gl.getUniformLocation(shaderProgram, "uTexScaleOffset");
        gl.uniform4fv(uTexScaleOffset, __spread(leftEyeScaleOffset, rightEyeScaleOffset));

        _super.prototype.render.call(this, ctx);
      };

      __proto.getVertexPositionData = function () {
        return SphereRenderer._VERTEX_POSITION_DATA;
      };

      __proto.getIndexData = function () {
        return SphereRenderer._INDEX_DATA;
      };

      __proto.getTextureCoordData = function () {
        return SphereRenderer._TEXTURE_COORD_DATA;
      };

      __proto.getVertexShaderSource = function () {
        return "\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform float uEye;\nuniform vec4 uTexScaleOffset[2];\nvarying highp vec2 vTextureCoord;\nvoid main(void) {\n  vec4 scaleOffset = uTexScaleOffset[int(uEye)];\n  vTextureCoord = aTextureCoord.xy * scaleOffset.xy + scaleOffset.zw;\n  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
      };

      __proto.getFragmentShaderSource = function () {
        return "\nprecision highp float;\nvarying highp vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main(void) {\n  gl_FragColor = texture2D(uSampler, vTextureCoord.st);\n}";
      };

      __proto.updateTexture = function (gl, image) {
        WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
      };

      __proto.bindTexture = function (gl, texture, image) {
        // Make sure image isn't too big
        var _a = this.getDimension(image),
            width = _a.width,
            height = _a.height;

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

      SphereRenderer._VERTEX_POSITION_DATA = vertexPositionData;
      SphereRenderer._TEXTURE_COORD_DATA = textureCoordData;
      SphereRenderer._INDEX_DATA = indexData;
      return SphereRenderer;
    }(Renderer);

    var MIN_ASPECT_RATIO_FOR_FULL_PANORAMA = 6;
    var longitudeBands$1 = 60;
    var textureCoordData$1 = [];
    var vertexPositionData$1 = [];
    var indexData$1 = [];

    var CylinderRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends(CylinderRenderer, _super);

      function CylinderRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = CylinderRenderer.prototype;

      __proto.getVertexPositionData = function () {
        return CylinderRenderer._VERTEX_POSITION_DATA;
      };

      __proto.getIndexData = function () {
        return CylinderRenderer._INDEX_DATA;
      };

      __proto.getTextureCoordData = function () {
        return CylinderRenderer._TEXTURE_COORD_DATA;
      };

      __proto.getVertexShaderSource = function () {
        return "\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying highp vec2 vTextureCoord;\nvoid main(void) {\n  vTextureCoord = aTextureCoord;\n  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
      };

      __proto.getFragmentShaderSource = function () {
        return "\nprecision highp float;\nvarying highp vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main(void) {\n  gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n}";
      };

      __proto.updateTexture = function (gl, image) {
        WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
      };

      __proto.bindTexture = function (gl, texture, image) {
        // Make sure image isn't too big
        var _a = this.getDimension(image),
            width = _a.width,
            height = _a.height;

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

      __proto.updateShaderData = function (_a) {
        var _b = _a.imageAspectRatio,
            imageAspectRatio = _b === void 0 ? MIN_ASPECT_RATIO_FOR_FULL_PANORAMA : _b;
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

          halfCylinderY = Math.tan(toRadian(fov / 2));
        } else {
          cylinderMaxRadian = aspectRatio;
          halfCylinderY = 0.5; // Range of cylinder is [-0.5, 0.5] to make height to 1.
        } // initialize shader data before update


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

      CylinderRenderer._VERTEX_POSITION_DATA = vertexPositionData$1;
      CylinderRenderer._TEXTURE_COORD_DATA = textureCoordData$1;
      CylinderRenderer._INDEX_DATA = indexData$1;
      return CylinderRenderer;
    }(Renderer);

    var VR_DISPLAY_PRESENT_CHANGE = "vrdisplaypresentchange";
    var DEFAULT_LEFT_BOUNDS = [0, 0, 0.5, 1];
    var DEFAULT_RIGHT_BOUNDS = [0.5, 0, 0.5, 1];
    var EYES = {
      LEFT: "left",
      RIGHT: "right"
    };

    var VRManager =
    /*#__PURE__*/
    function () {
      function VRManager() {
        var _this = this;

        this.destroy = function () {
          var vrDisplay = _this._vrDisplay;

          _this.removeEndCallback(_this.destroy);

          if (vrDisplay && vrDisplay.isPresenting) {
            vrDisplay.exitPresent();
          }

          _this._clear();
        };

        this._frameData = new window.VRFrameData();

        this._clear();
      }

      var __proto = VRManager.prototype;
      Object.defineProperty(__proto, "context", {
        get: function () {
          return this._vrDisplay;
        },
        enumerable: false,
        configurable: true
      });

      __proto.canRender = function () {
        return Boolean(this._vrDisplay);
      };

      __proto.beforeRender = function (gl) {
        // Render to the default backbuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      };

      __proto.afterRender = function () {
        this._vrDisplay.submitFrame();
      };

      __proto.getEyeParams = function (gl) {
        var display = this._vrDisplay;
        var halfWidth = gl.drawingBufferWidth * 0.5;
        var height = gl.drawingBufferHeight;
        var frameData = this._frameData;
        display.getFrameData(frameData);
        var leftMVMatrix = frameData.leftViewMatrix;
        var rightMVMatrix = frameData.rightViewMatrix;
        rotateY(leftMVMatrix, leftMVMatrix, this._yawOffset);
        rotateY(rightMVMatrix, rightMVMatrix, this._yawOffset);
        return [{
          viewport: [0, 0, halfWidth, height],
          mvMatrix: leftMVMatrix,
          pMatrix: frameData.leftProjectionMatrix
        }, {
          viewport: [halfWidth, 0, halfWidth, height],
          mvMatrix: rightMVMatrix,
          pMatrix: frameData.rightProjectionMatrix
        }];
      };

      __proto.isPresenting = function () {
        return Boolean(this._vrDisplay && this._vrDisplay.isPresenting);
      };

      __proto.addEndCallback = function (callback) {
        window.addEventListener(VR_DISPLAY_PRESENT_CHANGE, callback);
      };

      __proto.removeEndCallback = function (callback) {
        window.removeEventListener(VR_DISPLAY_PRESENT_CHANGE, callback);
      };

      __proto.requestPresent = function (canvas) {
        var _this = this;

        return navigator.getVRDisplays().then(function (displays) {
          var vrDisplay = displays.length && displays[0];

          if (!vrDisplay) {
            return Promise.reject(new Error("No displays available."));
          }

          if (!vrDisplay.capabilities.canPresent) {
            return Promise.reject(new Error("Display lacking capability to present."));
          }

          return vrDisplay.requestPresent([{
            source: canvas
          }]).then(function () {
            var leftEye = vrDisplay.getEyeParameters(EYES.LEFT);
            var rightEye = vrDisplay.getEyeParameters(EYES.RIGHT);
            canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
            canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);

            _this._setDisplay(vrDisplay);
          });
        });
      };

      __proto.setYawOffset = function (offset) {
        this._yawOffset = offset;
      };

      __proto._setDisplay = function (vrDisplay) {
        this._vrDisplay = vrDisplay;
        var layers = vrDisplay.getLayers();

        if (layers.length) {
          var layer = layers[0];
          this._leftBounds = layer.leftBounds;
          this._rightBounds = layer.rightBounds;
        }

        this.addEndCallback(this.destroy);
      };

      __proto._clear = function () {
        this._vrDisplay = null;
        this._leftBounds = DEFAULT_LEFT_BOUNDS;
        this._rightBounds = DEFAULT_RIGHT_BOUNDS;
        this._yawOffset = 0;
      };

      return VRManager;
    }();

    function merge(target) {
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
    }
    function toImageElement(image) {
      var images = image instanceof Array ? image : [image];
      var parsedImages = images.map(function (img) {
        var _img = img;

        if (typeof img === "string") {
          _img = new Image();
          _img.crossOrigin = "anonymous";
          _img.src = img;
        }

        return _img;
      });
      return parsedImages.length === 1 ? parsedImages[0] : parsedImages;
    }
    function toVideoElement(videoCandidate) {
      if (videoCandidate instanceof HTMLVideoElement) {
        return videoCandidate;
      } else {
        // url
        var video_1 = document.createElement("video");
        video_1.setAttribute("crossorigin", "anonymous");
        video_1.setAttribute("webkit-playsinline", "");
        video_1.setAttribute("playsinline", "");

        if (videoCandidate instanceof Array) {
          videoCandidate.forEach(function (v) {
            return appendSourceElement(video_1, v);
          });
        } else {
          appendSourceElement(video_1, videoCandidate);
        }

        var sourceCount = video_1.querySelectorAll("source").length;

        if (sourceCount > 0) {
          if (video_1.readyState < 1) {
            video_1.load();
          }
        }

        return video_1;
      }
    }
    /**
     *
     * @param {Object | String} videoUrl Object or String containing Video Source URL<ko>비디오 URL 정보를 담고 있는 문자열이나 객체 {type, src}</ko>
     */

    function appendSourceElement(video, videoUrl) {
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

      if (videoType) {
        sourceElement.type = videoType;
      }

      video.appendChild(sourceElement);
    }

    var XR_REFERENCE_SPACE = "local";

    var XRManager =
    /*#__PURE__*/
    function () {
      function XRManager(options) {
        var _this = this;

        if (options === void 0) {
          options = {};
        }

        this.destroy = function () {
          var xrSession = _this._xrSession;

          _this.removeEndCallback(_this.destroy);

          if (xrSession) {
            // Capture to avoid errors
            // tslint:disable-next-line no-empty
            xrSession.end().then(function () {}, function () {});
          }

          _this._clear();
        };

        this._clear();

        this._options = options;
      }

      var __proto = XRManager.prototype;
      Object.defineProperty(__proto, "context", {
        get: function () {
          return this._xrSession;
        },
        enumerable: false,
        configurable: true
      });

      __proto.canRender = function (frame) {
        var pose = frame.getViewerPose(this._xrRefSpace);
        return Boolean(pose);
      };

      __proto.beforeRender = function (gl, frame) {
        var session = frame.session;
        var baseLayer = session.renderState.baseLayer;
        gl.bindFramebuffer(gl.FRAMEBUFFER, baseLayer.framebuffer);
      }; // tslint:disable-next-line no-empty


      __proto.afterRender = function () {};

      __proto.getEyeParams = function (gl, frame) {
        var _this = this;

        var session = frame.session;
        var pose = frame.getViewerPose(this._xrRefSpace);

        if (!pose) {
          // Can't render
          return null;
        }

        var glLayer = session.renderState.baseLayer;
        return pose.views.map(function (view) {
          var viewport = glLayer.getViewport(view);
          var mvMatrix = view.transform.inverse.matrix;

          if (IS_SAFARI_ON_DESKTOP) {
            rotateX(mvMatrix, mvMatrix, toRadian(180));
          }

          rotateY(mvMatrix, mvMatrix, _this._yawOffset);
          return {
            viewport: [viewport.x, viewport.y, viewport.width, viewport.height],
            mvMatrix: mvMatrix,
            pMatrix: view.projectionMatrix
          };
        });
      };

      __proto.isPresenting = function () {
        return this._presenting;
      };

      __proto.addEndCallback = function (callback) {
        var _a;

        (_a = this._xrSession) === null || _a === void 0 ? void 0 : _a.addEventListener("end", callback);
      };

      __proto.removeEndCallback = function (callback) {
        var _a;

        (_a = this._xrSession) === null || _a === void 0 ? void 0 : _a.removeEventListener("end", callback);
      };

      __proto.requestPresent = function (canvas, gl) {
        var _this = this;

        var options = merge({
          requiredFeatures: [XR_REFERENCE_SPACE]
        }, this._options);
        var attributes = gl.getContextAttributes();

        if (attributes && attributes.xrCompatible !== true) {
          gl.makeXRCompatible();
        }

        return navigator.xr.requestSession("immersive-vr", options).then(function (session) {
          var xrLayer = new window.XRWebGLLayer(session, gl);
          session.updateRenderState({
            baseLayer: xrLayer
          });
          return session.requestReferenceSpace(XR_REFERENCE_SPACE).then(function (refSpace) {
            _this._setSession(session, xrLayer, refSpace);
          });
        });
      };

      __proto.setYawOffset = function (offset) {
        this._yawOffset = offset;
      };

      __proto._setSession = function (session, xrLayer, refSpace) {
        this._xrSession = session;
        this._xrLayer = xrLayer;
        this._xrRefSpace = refSpace;
        this._presenting = true;
        this.addEndCallback(this.destroy);
      };

      __proto._clear = function () {
        this._xrSession = null;
        this._xrLayer = null;
        this._xrRefSpace = null;
        this._presenting = false;
        this._yawOffset = 0;
        this._options = {};
      };

      return XRManager;
    }();

    var WebGLAnimator =
    /*#__PURE__*/
    function () {
      function WebGLAnimator() {
        var _this = this;
        /**
         * There can be more than 1 argument when we use XRSession's raf
         */


        this._onLoop = function () {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          _this._callback.apply(_this, __spread(args));

          _this._rafId = _this._context.requestAnimationFrame(_this._onLoop);
        };
        /**
         * MacOS X Safari Bug Fix
         * This code guarantees that rendering should be occurred.
         *
         * In MacOS X(10.14.2), Safari (12.0.2)
         * The requestAnimationFrame(RAF) callback is called just after previous RAF callback without term
         * only if requestAnimationFrame is called for next frame while updating frame is delayed (~over 2ms)
         * So browser cannot render the frame and may be freezing.
         */


        this._onLoopNextTick = function () {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          var before = performance.now();

          _this._callback.apply(_this, __spread(args));

          var diff = performance.now() - before;

          if (_this._rafTimer >= 0) {
            clearTimeout(_this._rafTimer);
            _this._rafTimer = -1;
          }
          /* Use requestAnimationFrame only if current rendering could be possible over 60fps (1000/60) */


          if (diff < 16) {
            _this._rafId = _this._context.requestAnimationFrame(_this._onLoop);
          } else {
            /* Otherwise, Call setTimeout instead of requestAnimationFrame to gaurantee renering should be occurred */
            _this._rafTimer = window.setTimeout(_this._onLoop, 0);
          }
        };

        this._callback = null;
        this._context = window;
        this._rafId = -1;
        this._rafTimer = -1;
      }

      var __proto = WebGLAnimator.prototype;

      __proto.setCallback = function (callback) {
        this._callback = callback;
      };

      __proto.setContext = function (context) {
        this._context = context;
      };

      __proto.start = function () {
        var context = this._context;
        var callback = this._callback; // No context / callback set

        if (!context || !callback) return; // Animation already started

        if (this._rafId >= 0 || this._rafTimer >= 0) return;

        if (IS_SAFARI_ON_DESKTOP) {
          this._rafId = context.requestAnimationFrame(this._onLoopNextTick);
        } else {
          this._rafId = context.requestAnimationFrame(this._onLoop);
        }
      };

      __proto.stop = function () {
        if (this._rafId >= 0) {
          this._context.cancelAnimationFrame(this._rafId);
        }

        if (this._rafTimer >= 0) {
          clearTimeout(this._rafTimer);
        }

        this._rafId = -1;
        this._rafTimer = -1;
      };

      return WebGLAnimator;
    }();

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
    function (_super) {
      __extends(PanoImageRenderer, _super);

      function PanoImageRenderer(image, width, height, isVideo, sphericalConfig, renderingContextAttributes) {
        var _this = // Super constructor
        _super.call(this) || this;

        _this.textureCoordBuffer = null;
        _this.vertexBuffer = null;
        _this.indexBuffer = null;

        _this.exitVR = function () {
          var vr = _this._vr;
          var gl = _this.context;
          var animator = _this._animator;
          if (!vr) return;
          vr.removeEndCallback(_this.exitVR);
          vr.destroy();
          _this._vr = null; // Restore canvas & context on iOS

          if (IS_IOS) {
            _this._restoreStyle();
          }

          _this.updateViewportDimensions(_this.width, _this.height);

          _this._updateViewport();

          gl.bindFramebuffer(gl.FRAMEBUFFER, null);

          _this._bindBuffers();

          _this._shouldForceDraw = true;
          animator.stop();
          animator.setContext(window);
          animator.setCallback(_this._render.bind(_this));
          animator.start();
        };

        _this._renderStereo = function (time, frame) {
          var e_1, _a;

          var vr = _this._vr;
          var gl = _this.context;
          var eyeParams = vr.getEyeParams(gl, frame);
          if (!eyeParams) return;
          vr.beforeRender(gl, frame);

          try {
            // Render both eyes
            for (var _b = __values([0, 1]), _c = _b.next(); !_c.done; _c = _b.next()) {
              var eyeIndex = _c.value;
              var eyeParam = eyeParams[eyeIndex];
              _this.mvMatrix = eyeParam.mvMatrix;
              _this.pMatrix = eyeParam.pMatrix;
              gl.viewport.apply(gl, __spread(eyeParam.viewport));
              gl.uniform1f(_this.shaderProgram.uEye, eyeIndex);

              _this._bindBuffers();

              _this._draw();
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
              if (e_1) throw e_1.error;
            }
          }

          vr.afterRender();
        };

        _this._onFirstVRFrame = function (time, frame) {
          var vr = _this._vr;
          var gl = _this.context;
          var animator = _this._animator; // If rendering is not ready, wait for next frame

          if (!vr.canRender(frame)) return;
          var minusZDir = fromValues(0, 0, -1);
          var eyeParam = vr.getEyeParams(gl, frame)[0]; // Extract only rotation

          var mvMatrix = fromMat4(create(), eyeParam.mvMatrix);
          var pMatrix = fromMat4(create(), eyeParam.pMatrix);
          var mvInv = invert(create(), mvMatrix);
          var pInv = invert(create(), pMatrix);
          var viewDir = transformMat3(create$2(), minusZDir, pInv);
          transformMat3(viewDir, viewDir, mvInv);
          var yawOffset = util.yawOffsetBetween(viewDir, fromValues(0, 0, 1));

          if (yawOffset === 0) {
            // If the yawOffset is exactly 0, then device sensor is not ready
            // So read it again until it has any value in it
            return;
          }

          vr.setYawOffset(yawOffset);
          animator.setCallback(_this._renderStereo);
        };

        _this.sphericalConfig = sphericalConfig;
        _this.fieldOfView = sphericalConfig.fieldOfView;
        _this.width = width;
        _this.height = height;
        _this._lastQuaternion = null;
        _this._lastYaw = null;
        _this._lastPitch = null;
        _this._lastFieldOfView = null;
        _this.pMatrix = create$1();
        _this.mvMatrix = create$1(); // initialzie pMatrix

        perspective(_this.pMatrix, toRadian(_this.fieldOfView), width / height, 0.1, 100);
        _this.textureCoordBuffer = null;
        _this.vertexBuffer = null;
        _this.indexBuffer = null;
        _this.canvas = _this._initCanvas(width, height);

        _this._setDefaultCanvasStyle();

        _this._wrapper = null; // canvas wrapper

        _this._wrapperOrigStyle = null;
        _this._renderingContextAttributes = renderingContextAttributes;
        _this._image = null;
        _this._imageConfig = null;
        _this._imageIsReady = false;
        _this._shouldForceDraw = false;
        _this._keepUpdate = false; // Flag to specify 'continuous update' on video even when still.

        _this._onContentLoad = _this._onContentLoad.bind(_this);
        _this._onContentError = _this._onContentError.bind(_this);
        _this._animator = new WebGLAnimator(); // VR/XR manager

        _this._vr = null;

        if (image) {
          _this.setImage({
            image: image,
            imageType: sphericalConfig.imageType,
            isVideo: isVideo,
            cubemapConfig: sphericalConfig.cubemapConfig
          });
        }

        return _this;
      } // FIXME: Please refactor me to have more loose connection to yawpitchcontrol


      var __proto = PanoImageRenderer.prototype;

      __proto.setYawPitchControl = function (yawPitchControl) {
        this._yawPitchControl = yawPitchControl;
      };

      __proto.getContent = function () {
        return this._image;
      };

      __proto.setImage = function (_a) {
        var image = _a.image,
            imageType = _a.imageType,
            _b = _a.isVideo,
            isVideo = _b === void 0 ? false : _b,
            cubemapConfig = _a.cubemapConfig;
        this._imageIsReady = false;
        this._isVideo = isVideo;
        this._imageConfig = __assign({
          /* RLUDBF is abnormal, we use it on CUBEMAP only */
          order: imageType === ImageType.CUBEMAP ? "RLUDBF" : "RLUDFB",
          tileConfig: {
            flipHorizontal: false,
            rotation: 0
          },
          trim: 0
        }, cubemapConfig);

        this._setImageType(imageType);

        if (this._contentLoader) {
          this._contentLoader.destroy();
        }

        this._contentLoader = new ImReady().on("ready", this._onContentLoad).on("error", this._onContentError);

        if (isVideo) {
          this._image = toVideoElement(image);

          this._contentLoader.check([this._image]);

          this._keepUpdate = true;
        } else {
          this._image = toImageElement(image);

          this._contentLoader.check(Array.isArray(this._image) ? this._image : [this._image]);

          this._keepUpdate = false;
        }
      };

      __proto.isImageLoaded = function () {
        return !!this._image && this._imageIsReady && (!this._isVideo || this._image.readyState >= 2
        /* HAVE_CURRENT_DATA */
        );
      };

      __proto.bindTexture = function () {
        var _this = this;

        return new Promise(function (res, rej) {
          var contentLoader = _this._contentLoader;

          if (!_this._image) {
            return rej("Image is not defined");
          }

          if (!contentLoader) {
            return rej("ImageLoader is not initialized");
          }

          if (contentLoader.isReady()) {
            _this._bindTexture();

            res();
          } else {
            contentLoader.check(Array.isArray(_this._image) ? _this._image : [_this._image]);
            contentLoader.once("ready", function (e) {
              if (e.errorCount > 0) {
                rej("Failed to load images.");
              } else {
                _this._bindTexture();

                res();
              }
            });
          }
        });
      }; // 부모 엘리먼트에 canvas 를 붙임


      __proto.attachTo = function (parentElement) {
        this.detach();
        parentElement.appendChild(this.canvas);
        this._wrapper = parentElement;
      };

      __proto.forceContextLoss = function () {
        if (this.hasRenderingContext()) {
          var loseContextExtension = this.context.getExtension("WEBGL_lose_context");

          if (loseContextExtension) {
            loseContextExtension.loseContext();
          }
        }
      }; // 부모 엘리먼트에서 canvas 를 제거


      __proto.detach = function () {
        if (this.canvas.parentElement) {
          this.canvas.parentElement.removeChild(this.canvas);
        }
      };

      __proto.destroy = function () {
        if (this._contentLoader) {
          this._contentLoader.destroy();
        }

        this._animator.stop();

        this.detach();
        this.forceContextLoss();
        this.off();
        this.canvas.removeEventListener("webglcontextlost", this._onWebglcontextlost);
        this.canvas.removeEventListener("webglcontextrestored", this._onWebglcontextrestored);
      };

      __proto.hasRenderingContext = function () {
        var ctx = this.context;

        if (!ctx || ctx.isContextLost() || !ctx.getProgramParameter(this.shaderProgram, ctx.LINK_STATUS)) {
          return false;
        }

        return true;
      };

      __proto.updateFieldOfView = function (fieldOfView) {
        this.fieldOfView = fieldOfView;

        this._updateViewport();
      };

      __proto.updateViewportDimensions = function (width, height) {
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

      __proto.keepUpdate = function (doUpdate) {
        if (doUpdate && this.isImageLoaded() === false) {
          // Force to draw a frame after image is loaded on render()
          this._shouldForceDraw = true;
        }

        this._keepUpdate = doUpdate;
      };

      __proto.startRender = function () {
        this._animator.setCallback(this._render.bind(this));

        this._animator.start();
      };

      __proto.stopRender = function () {
        this._animator.stop();
      };

      __proto.renderWithQuaternion = function (quaternion, fieldOfView) {
        if (!this.isImageLoaded()) {
          return;
        }

        if (this._keepUpdate === false && this._lastQuaternion && exactEquals$1(this._lastQuaternion, quaternion) && this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
          return;
        } // updatefieldOfView only if fieldOfView is changed.


        if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
          this.updateFieldOfView(fieldOfView);
        }

        this.mvMatrix = fromQuat(create$1(), quaternion);

        this._draw();

        this._lastQuaternion = clone$1(quaternion);

        if (this._shouldForceDraw) {
          this._shouldForceDraw = false;
        }
      };

      __proto.renderWithYawPitch = function (yaw, pitch, fieldOfView) {
        if (!this.isImageLoaded()) {
          return;
        }

        if (this._keepUpdate === false && this._lastYaw !== null && this._lastYaw === yaw && this._lastPitch !== null && this._lastPitch === pitch && this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
          return;
        } // fieldOfView 가 존재하면서 기존의 값과 다를 경우에만 업데이트 호출


        if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
          this.updateFieldOfView(fieldOfView);
        }

        identity(this.mvMatrix);
        rotateX(this.mvMatrix, this.mvMatrix, -toRadian(pitch));
        rotateY(this.mvMatrix, this.mvMatrix, -toRadian(yaw));

        this._draw();

        this._lastYaw = yaw;
        this._lastPitch = pitch;

        if (this._shouldForceDraw) {
          this._shouldForceDraw = false;
        }
      };
      /**
       * Returns projection renderer by each type
       */


      __proto.getProjectionRenderer = function () {
        return this._renderer;
      };
      /**
       * @return Promise
       */


      __proto.enterVR = function (options) {
        var vr = this._vr;

        if (!WEBXR_SUPPORTED && !navigator.getVRDisplays) {
          return Promise.reject("VR is not available on this browser.");
        }

        if (vr && vr.isPresenting()) {
          return Promise.resolve("VR already enabled.");
        }

        return this._requestPresent(options);
      };

      __proto._setImageType = function (imageType) {
        var _this = this;

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
            this._renderer = new SphereRenderer(this.sphericalConfig.stereoFormat);
            break;

          default:
            this._renderer = new SphereRenderer(STEREO_FORMAT.NONE);
            break;
        }

        this._renderer.on(Renderer.EVENTS.ERROR, function (e) {
          _this.trigger(EVENTS$2.ERROR, {
            type: ERROR_TYPE$1.RENDERER_ERROR,
            message: e.message
          });
        });

        this._initWebGL();
      };

      __proto._initCanvas = function (width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        this._onWebglcontextlost = this._onWebglcontextlost.bind(this);
        this._onWebglcontextrestored = this._onWebglcontextrestored.bind(this);
        canvas.addEventListener("webglcontextlost", this._onWebglcontextlost);
        canvas.addEventListener("webglcontextrestored", this._onWebglcontextrestored);
        return canvas;
      };

      __proto._setDefaultCanvasStyle = function () {
        var canvas = this.canvas;
        canvas.style.bottom = "0";
        canvas.style.left = "0";
        canvas.style.right = "0";
        canvas.style.top = "0";
        canvas.style.margin = "auto";
        canvas.style.maxHeight = "100%";
        canvas.style.maxWidth = "100%";
        canvas.style.outline = "none";
        canvas.style.position = "absolute";
      };

      __proto._onContentError = function (error) {
        this._imageIsReady = false;
        this._image = null;
        this.trigger(EVENTS$2.ERROR, {
          type: ERROR_TYPE$1.FAIL_IMAGE_LOAD,
          message: "failed to load image"
        });
        return false;
      };

      __proto._triggerContentLoad = function () {
        this.trigger(EVENTS$2.IMAGE_LOADED, {
          content: this._image,
          isVideo: this._isVideo,
          projectionType: this._imageType
        });
      };

      __proto._onContentLoad = function (e) {
        if (e.errorCount > 0) return;
        this._imageIsReady = true;

        this._triggerContentLoad();
      };

      __proto._initShaderProgram = function () {
        var gl = this.context;

        if (this.shaderProgram) {
          gl.deleteProgram(this.shaderProgram);
          this.shaderProgram = null;
        }

        var renderer = this._renderer;
        var vsSource = renderer.getVertexShaderSource();
        var fsSource = renderer.getFragmentShaderSource();
        var vertexShader = WebGLUtils.createShader(gl, gl.VERTEX_SHADER, vsSource);
        var fragmentShader = WebGLUtils.createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        var shaderProgram = WebGLUtils.createProgram(gl, vertexShader, fragmentShader);

        if (!shaderProgram) {
          throw new Error("Failed to initialize shaders: " + WebGLUtils.getErrorNameFromWebGLErrorCode(gl.getError()));
        }

        gl.useProgram(shaderProgram);
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        shaderProgram.uEye = gl.getUniformLocation(shaderProgram, "uEye");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute); // clear buffer

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT); // Use TEXTURE0

        gl.uniform1i(shaderProgram.samplerUniform, 0);
        this.shaderProgram = shaderProgram;
      };

      __proto._onWebglcontextlost = function (e) {
        e.preventDefault();
        this.trigger(EVENTS$2.RENDERING_CONTEXT_LOST);
      };

      __proto._onWebglcontextrestored = function (e) {
        this._initWebGL();

        this.trigger(EVENTS$2.RENDERING_CONTEXT_RESTORE);
      };

      __proto._updateViewport = function () {
        perspective(this.pMatrix, toRadian(this.fieldOfView), this.canvas.width / this.canvas.height, 0.1, 100);
        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
      };

      __proto._initWebGL = function () {
        var gl; // TODO: Following code does need to be executed only if width/height, cubicStrip property is changed.

        try {
          this._initRenderingContext();

          gl = this.context;
          this.updateViewportDimensions(this.width, this.height);

          this._initShaderProgram();
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

      __proto._initRenderingContext = function () {
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

      __proto._initBuffers = function () {
        var image = this._image;

        var vertexPositionData = this._renderer.getVertexPositionData();

        var indexData = this._renderer.getIndexData();

        var textureCoordData = this._renderer.getTextureCoordData({
          image: image,
          imageConfig: this._imageConfig
        });

        var gl = this.context;
        this.vertexBuffer = WebGLUtils.initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), 3, this.shaderProgram.vertexPositionAttribute);
        this.indexBuffer = WebGLUtils.initBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), 1);
        this.textureCoordBuffer = WebGLUtils.initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(textureCoordData), this._isCubeMap ? 3 : 2, this.shaderProgram.textureCoordAttribute);

        this._bindBuffers();
      };

      __proto._bindTexture = function () {
        // Detect if it is EAC Format while CUBESTRIP mode.
        // We assume it is EAC if image is not 3/2 ratio.
        if (this._imageType === ImageType.CUBESTRIP) {
          var _a = this._renderer.getDimension(this._image),
              width = _a.width,
              height = _a.height;

          var isEAC = width && height && width / height !== 1.5 ? 1 : 0;
          this.context.uniform1f(this.context.getUniformLocation(this.shaderProgram, "uIsEAC"), isEAC);
        } else if (this._imageType === ImageType.PANORAMA) {
          var _b = this._renderer.getDimension(this._image),
              width = _b.width,
              height = _b.height;

          var imageAspectRatio = width && height && width / height;

          this._renderer.updateShaderData({
            imageAspectRatio: imageAspectRatio
          });
        } // initialize shader buffers after image is loaded.(by updateShaderData)
        // because buffer may be differ by image size.(eg. CylinderRenderer)


        this._initBuffers();

        this._renderer.bindTexture(this.context, this.texture, this._image, this._imageConfig);

        this._shouldForceDraw = true;
        this.trigger(EVENTS$2.BIND_TEXTURE);
      };

      __proto._updateTexture = function () {
        this._renderer.updateTexture(this.context, this._image, this._imageConfig);
      };

      __proto._render = function () {
        var yawPitchControl = this._yawPitchControl;
        var fov = yawPitchControl.getFov();

        if (yawPitchControl.shouldRenderWithQuaternion()) {
          var quaternion = yawPitchControl.getQuaternion();
          this.renderWithQuaternion(quaternion, fov);
        } else {
          var yawPitch = yawPitchControl.getYawPitch();
          this.renderWithYawPitch(yawPitch.yaw, yawPitch.pitch, fov);
        }
      };

      __proto._bindBuffers = function () {
        var gl = this.context;
        var program = this.shaderProgram;
        var vertexBuffer = this.vertexBuffer;
        var textureCoordBuffer = this.textureCoordBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.enableVertexAttribArray(program.vertexPositionAttribute);
        gl.vertexAttribPointer(program.vertexPositionAttribute, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.enableVertexAttribArray(program.textureCoordAttribute);
        gl.vertexAttribPointer(program.textureCoordAttribute, textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
      };

      __proto._draw = function () {
        if (this._isVideo && this._keepUpdate) {
          this._updateTexture();
        }

        this._renderer.render({
          gl: this.context,
          shaderProgram: this.shaderProgram,
          indexBuffer: this.indexBuffer,
          mvMatrix: this.mvMatrix,
          pMatrix: this.pMatrix
        });
      };

      __proto._requestPresent = function (options) {
        var _this = this;

        var gl = this.context;
        var canvas = this.canvas;
        var animator = this._animator;
        this._vr = WEBXR_SUPPORTED ? new XRManager(options) : new VRManager();
        var vr = this._vr;
        animator.stop();
        return new Promise(function (resolve, reject) {
          vr.requestPresent(canvas, gl).then(function () {
            vr.addEndCallback(_this.exitVR);
            animator.setContext(vr.context);
            animator.setCallback(_this._onFirstVRFrame);

            if (IS_IOS) {
              _this._setWrapperFullscreen();
            }

            _this._shouldForceDraw = true;
            animator.start();
            resolve("success");
          }).catch(function (e) {
            vr.destroy();
            _this._vr = null;
            animator.start();
            reject(e);
          });
        });
      };

      __proto._setWrapperFullscreen = function () {
        var wrapper = this._wrapper;
        if (!wrapper) return;
        this._wrapperOrigStyle = wrapper.getAttribute("style");
        var wrapperStyle = wrapper.style;
        wrapperStyle.width = "100vw";
        wrapperStyle.height = "100vh";
        wrapperStyle.position = "fixed";
        wrapperStyle.left = "0";
        wrapperStyle.top = "0";
        wrapperStyle.zIndex = "9999";
      };

      __proto._restoreStyle = function () {
        var wrapper = this._wrapper;
        var canvas = this.canvas;
        if (!wrapper) return;

        if (this._wrapperOrigStyle) {
          wrapper.setAttribute("style", this._wrapperOrigStyle);
        } else {
          wrapper.removeAttribute("style");
        }

        this._wrapperOrigStyle = null; // Restore canvas style

        canvas.removeAttribute("style");

        this._setDefaultCanvasStyle();
      };

      PanoImageRenderer.EVENTS = EVENTS$2;
      PanoImageRenderer.ERROR_TYPE = ERROR_TYPE$1;
      return PanoImageRenderer;
    }(Component);

    /**
     * @memberof eg.view360
     * @extends eg.Component
     * PanoViewer
     */

    var PanoViewer =
    /*#__PURE__*/
    function (_super) {
      __extends(PanoViewer, _super);
      /**
       * @classdesc 360 media viewer
       * @ko 360 미디어 뷰어
       *
       * @param container The container element for the renderer. <ko>렌더러의 컨테이너 엘리먼트</ko>
       * @param options
       *
       * @param {String|HTMLImageElement} options.image Input image url or element (Use only image property or video property)<ko>입력 이미지 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정)</ko>
       * @param {String|HTMLVideoElement} options.video Input video url or element(Use only image property or video property)<ko>입력 비디오 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정)</ko>
       * @param {String} [options.projectionType=equirectangular] The type of projection: equirectangular, cubemap <br/>{@link eg.view360.PanoViewer.PROJECTION_TYPE}<ko>Projection 유형 : equirectangular, cubemap <br/>{@link eg.view360.PanoViewer.PROJECTION_TYPE}</ko>
       * @param {Object} options.cubemapConfig Config cubemap projection layout. It is applied when projectionType is {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP} or {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBESTRIP}<ko>cubemap projection type 의 레이아웃을 설정한다. 이 설정은 ProjectionType이 {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP} 혹은 {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBESTRIP} 인 경우에만 적용된다.</ko>
       * @param {Object} [options.cubemapConfig.order = "RLUDBF"(ProjectionType === CUBEMAP) | "RLUDFB" (ProjectionType === CUBESTRIP)] Order of cubemap faces <ko>Cubemap 형태의 이미지가 배치된 순서</ko>
       * @param {Object} [options.cubemapConfig.tileConfig = { flipHorizontal:false, rotation: 0 }] Setting about rotation angle(degree) and whether to flip horizontal for each cubemap faces, if you put this object as a array, you can set each faces with different setting. For example, [{flipHorizontal:false, rotation:90}, {flipHorizontal: true, rotation: 180}, ...]<ko>각 Cubemap 면에 대한 회전 각도/좌우반전 여부 설정, 객체를 배열 형태로 지정하여 각 면에 대한 설정을 다르게 지정할 수도 있다. 예를 들어 [{flipHorizontal:false, rotation:90}, {flipHorizontal: true, rotation: 180}, ...]과 같이 지정할 수 있다.</ko>
       * @param {Number} [options.cubemapConfig.trim=0] A px distance to discard from each tile side. You can use this value to avoid graphical glitch at where tiles are connected. This option is available when there's only one texture.<ko>각 타일의 끝으로부터 폐기할 px 거리. 이 옵션을 사용하여 타일의 접합부에서 나타나는 그래픽 결함을 완화할 수 있습니다. 이 옵션은 한 개의 텍스쳐만 사용할 때 적용 가능합니다.</ko>
       * @param {String} [options.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection.<br/>See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다.<br/>{@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
       * @param {Number} [options.width=width of container] the viewer's width. (in px) <ko>뷰어의 너비 (px 단위)</ko>
       * @param {Number} [options.height=height of container] the viewer's height.(in px) <ko>뷰어의 높이 (px 단위)</ko>
       * @param {Number} [options.yaw=0] Initial Yaw of camera (in degree) <ko>카메라의 초기 Yaw (degree 단위)</ko>
       * @param {Number} [options.pitch=0] Initial Pitch of camera (in degree) <ko>카메라의 초기 Pitch (degree 단위)</ko>
       * @param {Number} [options.fov=65] Initial vertical field of view of camera (in degree) <ko>카메라의 초기 수직 field of view (degree 단위)</ko>
       * @param {Boolean} [options.showPolePoint=false] If false, the pole is not displayed inside the viewport <ko>false 인 경우, 극점은 뷰포트 내부에 표시되지 않습니다</ko>
       * @param {Boolean} [options.useZoom=true] When true, enables zoom with the wheel and Pinch gesture <ko>true 일 때 휠 및 집기 제스춰로 확대 / 축소 할 수 있습니다.</ko>
       * @param {Boolean} [options.useKeyboard=true] When true, enables the keyboard move key control: awsd, arrow keys <ko>true 이면 키보드 이동 키 컨트롤을 활성화합니다: awsd, 화살표 키</ko>
       * @param {String} [options.gyroMode=yawPitch] Enables control through device motion. ("none", "yawPitch", "VR") <br/>{@link eg.view360.PanoViewer.GYRO_MODE} <ko>디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch", "VR") <br/>{@link eg.view360.PanoViewer.GYRO_MODE} </ko>
       * @param {Array} [options.yawRange=[-180, 180]] Range of controllable Yaw values <ko>제어 가능한 Yaw 값의 범위</ko>
       * @param {Array} [options.pitchRange=[-90, 90]] Range of controllable Pitch values <ko>제어 가능한 Pitch 값의 범위</ko>
       * @param {Array} [options.fovRange=[30, 110]] Range of controllable vertical field of view values <ko>제어 가능한 수직 field of view 값의 범위</ko>
       * @param {Number} [options.touchDirection= {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL}(6)] Direction of touch that can be controlled by user <br/>{@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>사용자가 터치로 조작 가능한 방향 <br/>{@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
       *
       * @example
       * ```
       * // PanoViewer Creation
       * // create PanoViewer with option
       * var PanoViewer = eg.view360.PanoViewer;
       * // Area where the image will be displayed(HTMLElement)
       * var container = document.getElementById("myPanoViewer");
       *
       * var panoViewer = new PanoViewer(container, {
       *   // If projectionType is not specified, the default is "equirectangular".
       *   // Specifies an image of the "equirectangular" type.
       *   image: "/path/to/image/image.jpg"
       * });
       * ```
       *
       * @example
       * ```
       * // Cubemap Config Setting Example
       * // For support Youtube EAC projection, You should set cubemapConfig as follows.
       * cubemapConfig: {
       *   order: "LFRDBU",
       *   tileConfig: [{rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: -90}, {rotation: 180}]
       * }
       * ```
       */


      function PanoViewer(container, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this; // Raises the error event if webgl is not supported.


        if (!WebGLUtils.isWebGLAvailable()) {
          setTimeout(function () {
            _this.trigger(EVENTS$1.ERROR, {
              type: ERROR_TYPE.NO_WEBGL,
              message: "no webgl support"
            });
          }, 0);
          return _this;
        }

        if (!WebGLUtils.isStableWebGL()) {
          setTimeout(function () {
            _this.trigger(EVENTS$1.ERROR, {
              type: ERROR_TYPE.INVALID_DEVICE,
              message: "blacklisted browser"
            });
          }, 0);
          return _this;
        }

        if (!!options.image && !!options.video) {
          setTimeout(function () {
            _this.trigger(EVENTS$1.ERROR, {
              type: ERROR_TYPE.INVALID_RESOURCE,
              message: "Specifying multi resouces(both image and video) is not valid."
            });
          }, 0);
          return _this;
        } // Check XR support at not when imported, but when created.
        // This is intended to make polyfills easier to use.


        checkXRSupport();
        _this._container = container;
        _this._image = options.image || options.video;
        _this._isVideo = !!options.video;
        _this._projectionType = options.projectionType || PROJECTION_TYPE.EQUIRECTANGULAR;
        _this._cubemapConfig = __assign({
          /* RLUDBF is abnormal, we use it on CUBEMAP only for backward compatibility*/
          order: _this._projectionType === PROJECTION_TYPE.CUBEMAP ? "RLUDBF" : "RLUDFB",
          tileConfig: {
            flipHorizontal: false,
            rotation: 0
          },
          trim: 0
        }, options.cubemapConfig);
        _this._stereoFormat = options.stereoFormat || STEREO_FORMAT.TOP_BOTTOM; // If the width and height are not provided, will use the size of the container.

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

        var yawPitchConfig = __assign(__assign({}, options), {
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
       * Check whether the current environment can execute PanoViewer
       * @ko 현재 브라우저 환경에서 PanoViewer 실행이 가능한지 여부를 반환합니다.
       * @return PanoViewer executable <ko>PanoViewer 실행가능 여부</ko>
       */


      var __proto = PanoViewer.prototype;

      PanoViewer.isSupported = function () {
        return WebGLUtils.isWebGLAvailable() && WebGLUtils.isStableWebGL();
      };
      /**
       * Check whether the current environment supports the WebGL
       * @ko 현재 브라우저 환경이 WebGL 을 지원하는지 여부를 확인합니다.
       * @return WebGL support <ko>WebGL 지원여부</ko>
       */


      PanoViewer.isWebGLAvailable = function () {
        return WebGLUtils.isWebGLAvailable();
      };
      /**
       * Check whether the current environment supports the gyro sensor.
       * @ko 현재 브라우저 환경이 자이로 센서를 지원하는지 여부를 확인합니다.
       * @param callback Function to take the gyro sensor availability as argument <ko>자이로 센서를 지원하는지 여부를 인자로 받는 함수</ko>
       */


      PanoViewer.isGyroSensorAvailable = function (callback) {
        if (!DeviceMotionEvent && callback) {
          callback(false);
          return;
        }

        var onDeviceMotionChange;

        function checkGyro() {
          return new Promise(function (res, rej) {
            onDeviceMotionChange = function (deviceMotion) {
              var isGyroSensorAvailable = !(deviceMotion.rotationRate.alpha == null);
              res(isGyroSensorAvailable);
            };

            window.addEventListener("devicemotion", onDeviceMotionChange);
          });
        }

        function timeout() {
          return new Promise(function (res, rej) {
            setTimeout(function () {
              return res(false);
            }, 1000);
          });
        }

        Promise.race([checkGyro(), timeout()]).then(function (isGyroSensorAvailable) {
          window.removeEventListener("devicemotion", onDeviceMotionChange);

          if (callback) {
            callback(isGyroSensorAvailable);
          }

          PanoViewer.isGyroSensorAvailable = function (fb) {
            if (fb) {
              fb(isGyroSensorAvailable);
            }

            return isGyroSensorAvailable;
          };
        });
      };

      PanoViewer._isValidTouchDirection = function (direction) {
        return direction === PanoViewer.TOUCH_DIRECTION.NONE || direction === PanoViewer.TOUCH_DIRECTION.YAW || direction === PanoViewer.TOUCH_DIRECTION.PITCH || direction === PanoViewer.TOUCH_DIRECTION.ALL;
      };
      /**
       * Get the video element that the viewer is currently playing. You can use this for playback.
       * @ko 뷰어가 현재 사용 중인 비디오 요소를 얻습니다. 이 요소를 이용해 비디오의 컨트롤을 할 수 있습니다.
       * @return HTMLVideoElement<ko>HTMLVideoElement</ko>
       * @example
       * ```
       * var videoTag = panoViewer.getVideo();
       * videoTag.play(); // play the video!
       * ```
       */


      __proto.getVideo = function () {
        if (!this._isVideo) {
          return null;
        }

        return this._photoSphereRenderer.getContent();
      };
      /**
       * Set the video information to be used by the viewer.
       * @ko 뷰어가 사용할 이미지 정보를 설정합니다.
       * @param {string|HTMLVideoElement|object} video Input video url or element or config object<ko>입력 비디오 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정)</ko>
       * @param {object} param
       * @param {string} [param.projectionType={@link eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR}("equirectangular")] Projection Type<ko>프로젝션 타입</ko>
       * @param {object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 의 레이아웃 설정</ko>
       * @param {string} [param.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection. See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다. {@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
       *
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * ```
       * panoViewer.setVideo("/path/to/video/video.mp4", {
       *     projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR
       * });
       * ```
       */


      __proto.setVideo = function (video, param) {
        if (param === void 0) {
          param = {};
        }

        if (video) {
          this.setImage(video, {
            projectionType: param.projectionType,
            isVideo: true,
            cubemapConfig: param.cubemapConfig,
            stereoFormat: param.stereoFormat
          });
        }

        return this;
      };
      /**
       * Get the image information that the viewer is currently using.
       * @ko 뷰어가 현재 사용하고있는 이미지 정보를 얻습니다.
       * @return Image Object<ko>이미지 객체</ko>
       * @example
       * var imageObj = panoViewer.getImage();
       */


      __proto.getImage = function () {
        if (this._isVideo) {
          return null;
        }

        return this._photoSphereRenderer.getContent();
      };
      /**
       * Set the image information to be used by the viewer.
       * @ko 뷰어가 사용할 이미지 정보를 설정합니다.
       * @param {string|HTMLElement|object} image Input image url or element or config object<ko>입력 이미지 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정한다.)</ko>
       * @param {object} param Additional information<ko>이미지 추가 정보</ko>
       * @param {string} [param.projectionType="equirectangular"] Projection Type<ko>프로젝션 타입</ko>
       * @param {object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 레이아웃</ko>
       * @param {string} [param.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection. See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다. {@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
       * @param {boolean} [param.isVideo=false] Whether the given `imaage` is video or not.<ko>이미지가 비디오인지 여부</ko>
       *
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * ```
       * panoViewer.setImage("/path/to/image/image.png", {
       *     projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP
       * });
       * ```
       */


      __proto.setImage = function (image, param) {
        if (param === void 0) {
          param = {};
        }

        var cubemapConfig = __assign({
          order: "RLUDBF",
          tileConfig: {
            flipHorizontal: false,
            rotation: 0
          },
          trim: 0
        }, param.cubemapConfig);

        var stereoFormat = param.stereoFormat || STEREO_FORMAT.TOP_BOTTOM;
        var isVideo = !!param.isVideo;

        if (this._image && this._isVideo !== isVideo) {
          /* eslint-disable no-console */
          console.warn("PanoViewer is not currently supporting content type changes. (Image <--> Video)");
          /* eslint-enable no-console */

          return this;
        }

        if (image) {
          this._image = image;
          this._isVideo = isVideo;
          this._projectionType = param.projectionType || PROJECTION_TYPE.EQUIRECTANGULAR;
          this._cubemapConfig = cubemapConfig;
          this._stereoFormat = stereoFormat;

          this._deactivate();

          this._initRenderer(this._yaw, this._pitch, this._fov, this._projectionType, this._cubemapConfig);
        }

        return this;
      };
      /**
       * Set whether the renderer always updates the texture and renders.
       * @ko 렌더러가 항상 텍스쳐를 갱신하고 화면을 렌더링 할지 여부를 설정할 수 있습니다.
       * @param doUpdate When true viewer will always update texture and render, when false viewer will not update texture and render only camera config is changed.<ko>true면 항상 텍스쳐를 갱신하고 화면을 그리는 반면, false면 텍스쳐 갱신은 하지 않으며, 카메라 요소에 변화가 있을 때에만 화면을 그립니다.</ko>
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      __proto.keepUpdate = function (doUpdate) {
        this._photoSphereRenderer.keepUpdate(doUpdate);

        return this;
      };
      /**
       * Get the current projection type (equirectangular/cube)
       * @ko 현재 프로젝션 타입(Equirectangular 혹은 Cube)을 반환합니다.
       * @return {@link eg.view360.PanoViewer.PROJECTION_TYPE}
       */


      __proto.getProjectionType = function () {
        return this._projectionType;
      };
      /**
       * Activate the device's motion sensor, and return the Promise whether the sensor is enabled
       * If it's iOS13+, this method must be used in the context of user interaction, like onclick callback on the button element.
       * @ko 디바이스의 모션 센서를 활성화하고, 활성화 여부를 담는 Promise를 리턴합니다.
       * iOS13+일 경우, 사용자 인터렉션에 의해서 호출되어야 합니다. 예로, 버튼의 onclick 콜백과 같은 콘텍스트에서 호출되어야 합니다.
       * @return Promise containing nothing when resolved, or string of the rejected reason when rejected.<ko>Promise. resolve되었을 경우 아무것도 반환하지 않고, reject되었을 경우 그 이유를 담고있는 string을 반환한다.</ko>
       */


      __proto.enableSensor = function () {
        return new Promise(function (resolve, reject) {
          if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceMotionEvent.requestPermission().then(function (permissionState) {
              if (permissionState === "granted") {
                resolve();
              } else {
                reject(new Error("permission denied"));
              }
            }).catch(function (e) {
              // This can happen when this method wasn't triggered by user interaction
              reject(e);
            });
          } else {
            resolve();
          }
        });
      };
      /**
       * Disable the device's motion sensor.
       * @ko 디바이스의 모션 센서를 비활성화합니다.
       * @deprecated
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      __proto.disableSensor = function () {
        return this;
      };
      /**
       * Switch to VR stereo rendering mode which uses WebXR / WebVR API (WebXR is preferred).
       * This method must be used in the context of user interaction, like onclick callback on the button element.
       * It can be rejected when an enabling device sensor fails or image/video is still loading("ready" event not triggered).
       * @ko WebXR / WebVR API를 사용하는 VR 스테레오 렌더링 모드로 전환합니다. (WebXR을 더 선호합니다)
       * 이 메소드는 사용자 인터렉션에 의해서 호출되어야 합니다. 예로, 버튼의 onclick 콜백과 같은 콘텍스트에서 호출되어야 합니다.
       * 디바이스 센서 활성화에 실패시 혹은 아직 이미지/비디오가 로딩중인 경우("ready"이벤트가 아직 트리거되지 않은 경우)에는 Promise가 reject됩니다.
       * @param {object} [options={}] Additional options for WebXR session, see {@link https://developer.mozilla.org/en-US/docs/Web/API/XRSessionInit XRSessionInit}.<ko>WebXR용 추가 옵션, {@link https://developer.mozilla.org/en-US/docs/Web/API/XRSessionInit XRSessionInit}을 참조해주세요.</ko>
       * @return Promise containing either a string of resolved reason or an Error instance of rejected reason.<ko>Promise가 resolve된 이유(string) 혹은 reject된 이유(Error)</ko>
       */


      __proto.enterVR = function (options) {
        var _this = this;

        if (options === void 0) {
          options = {};
        }

        if (!this._isReady) {
          return Promise.reject(new Error("PanoViewer is not ready to show image."));
        }

        return new Promise(function (resolve, reject) {
          _this.enableSensor().then(function () {
            return _this._photoSphereRenderer.enterVR(options);
          }).then(function (res) {
            return resolve(res);
          }).catch(function (e) {
            return reject(e);
          });
        });
      };
      /**
       * Exit VR stereo rendering mode.
       * @ko VR 스테레오 렌더링 모드에서 일반 렌더링 모드로 전환합니다.
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      __proto.exitVR = function () {
        this._photoSphereRenderer.exitVR();

        return this;
      };
      /**
       * When set true, enables zoom with the wheel or pinch gesture. However, in the case of touch, pinch works only when the touchDirection setting is {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL}.
       * @ko true 로 설정 시 휠 혹은 집기 동작으로 확대/축소 할 수 있습니다. false 설정 시 확대/축소 기능을 비활성화 합니다. 단, 터치인 경우 touchDirection 설정이 {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL} 인 경우에만 pinch 가 동작합니다.
       * @param useZoom
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      __proto.setUseZoom = function (useZoom) {
        if (typeof useZoom === "boolean") {
          this._yawPitchControl.option("useZoom", useZoom);
        }

        return this;
      };
      /**
       * When true, enables the keyboard move key control: awsd, arrow keys
       * @ko true이면 키보드 이동 키 컨트롤을 활성화합니다. (awsd, 화살표 키)
       * @param useKeyboard
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      __proto.setUseKeyboard = function (useKeyboard) {
        this._yawPitchControl.option("useKeyboard", useKeyboard);

        return this;
      };
      /**
       * Enables control through device motion. ("none", "yawPitch", "VR")
       * @ko 디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch", "VR")
       * @param gyroMode {@link eg.view360.PanoViewer.GYRO_MODE}
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * ```
       * panoViewer.setGyroMode("yawPitch");
       * //equivalent
       * panoViewer.setGyroMode(eg.view360.PanoViewer.GYRO_MODE.YAWPITCH);
       * ```
       */


      __proto.setGyroMode = function (gyroMode) {
        this._yawPitchControl.option("gyroMode", gyroMode);

        return this;
      };
      /**
       * Set the range of controllable FOV values
       * @ko 제어 가능한 FOV 구간을 설정합니다.
       * @param range
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setFovRange([50, 90]);
       */


      __proto.setFovRange = function (range) {
        this._yawPitchControl.option("fovRange", range);

        return this;
      };
      /**
       * Get the range of controllable FOV values
       * @ko 제어 가능한 FOV 구간을 반환합니다.
       * @return FOV range
       * @example
       * var range = panoViewer.getFovRange(); // [50, 90]
       */


      __proto.getFovRange = function () {
        return this._yawPitchControl.option("fovRange");
      };
      /**
       * Update size of canvas element by it's container element's or specified size. If size is not specified, the size of the container area is obtained and updated to that size.
       * @ko 캔버스 엘리먼트의 크기를 컨테이너 엘리먼트의 크기나 지정된 크기로 업데이트합니다. 만약 size 가 지정되지 않으면 컨테이너 영역의 크기를 얻어와 해당 크기로 갱신합니다.
       * @param {object} [size]
       * @param {number} [size.width=width of the container]
       * @param {number} [size.height=height of the container]
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      __proto.updateViewportDimensions = function (size) {
        if (size === void 0) {
          size = {};
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
       */


      __proto.getFov = function () {
        return this._fov;
      };
      /**
       * Get current yaw value
       * @ko 현재 yaw 값을 반환합니다.
       */


      __proto.getYaw = function () {
        return this._yaw;
      };
      /**
       * Get current pitch value
       * @ko 현재 pitch 값을 반환합니다.
       */


      __proto.getPitch = function () {
        return this._pitch;
      };
      /**
       * Get the range of controllable Yaw values
       * @ko 컨트롤 가능한 Yaw 구간을 반환합니다.
       */


      __proto.getYawRange = function () {
        return this._yawPitchControl.option("yawRange");
      };
      /**
       * Get the range of controllable Pitch values
       * @ko 컨트롤 가능한 Pitch 구간을 가져옵니다.
       */


      __proto.getPitchRange = function () {
        return this._yawPitchControl.option("pitchRange");
      };
      /**
       * Set the range of controllable yaw
       * @ko 컨트롤 가능한 Yaw 구간을 반환합니다.
       * @param {number[]} range
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setYawRange([-90, 90]);
       */


      __proto.setYawRange = function (yawRange) {
        this._yawPitchControl.option("yawRange", yawRange);

        return this;
      };
      /**
       * Set the range of controllable Pitch values
       * @ko 컨트롤 가능한 Pitch 구간을 설정합니다.
       * @param {number[]} range
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setPitchRange([-40, 40]);
       */


      __proto.setPitchRange = function (pitchRange) {
        this._yawPitchControl.option("pitchRange", pitchRange);

        return this;
      };
      /**
       * Specifies whether to display the pole by limiting the pitch range. If it is true, pole point can be displayed. If it is false, it is not displayed.
       * @ko pitch 범위를 제한하여 극점을 표시할지를 지정합니다. true 인 경우 극점까지 표현할 수 있으며 false 인 경우 극점까지 표시하지 않습니다.
       * @param showPolePoint
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      __proto.setShowPolePoint = function (showPolePoint) {
        this._yawPitchControl.option("showPolePoint", showPolePoint);

        return this;
      };
      /**
       * Set a new view by setting camera configuration. Any parameters not specified remain the same.
       * @ko 카메라 설정을 지정하여 화면을 갱신합니다. 지정되지 않은 매개 변수는 동일하게 유지됩니다.
       * @param {object} orientation
       * @param {number} orientation.yaw Target yaw in degree <ko>목표 yaw (degree 단위)</ko>
       * @param {number} orientation.pitch Target pitch in degree <ko>목표 pitch (degree 단위)</ko>
       * @param {number} orientation.fov Target vertical fov in degree <ko>목표 수직 fov (degree 단위)</ko>
       * @param {number} duration Animation duration in milliseconds <ko>애니메이션 시간 (밀리 초)</ko>
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * ```
       * // Change the yaw angle (absolute angle) to 30 degrees for one second.
       * panoViewer.lookAt({yaw: 30}, 1000);
       * ```
       */


      __proto.lookAt = function (orientation, duration) {
        if (duration === void 0) {
          duration = 0;
        }

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
          this._photoSphereRenderer.renderWithYawPitch(yaw, pitch, fov);
        }

        return this;
      };
      /**
       * Set touch direction by which user can control.
       * @ko 사용자가 조작가능한 터치 방향을 지정합니다.
       * @param direction of the touch. {@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
       * @return PanoViewer instance
       * @example
       * ```
       * panoViewer = new PanoViewer(el);
       * // Limit the touch direction to the yaw direction only.
       * panoViewer.setTouchDirection(eg.view360.PanoViewer.TOUCH_DIRECTION.YAW);
       * ```
       */


      __proto.setTouchDirection = function (direction) {
        if (PanoViewer._isValidTouchDirection(direction)) {
          this._yawPitchControl.option("touchDirection", direction);
        }

        return this;
      };
      /**
       * Returns touch direction by which user can control
       * @ko 사용자가 조작가능한 터치 방향을 반환한다.
       * @return direction of the touch. {@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
       * @example
       * ```
       * panoViewer = new PanoViewer(el);
       * // Returns the current touch direction.
       * var dir = panoViewer.getTouchDirection();
       * ```
       */


      __proto.getTouchDirection = function () {
        return this._yawPitchControl.option("touchDirection");
      };
      /**
       * Destroy viewer. Remove all registered event listeners and remove viewer canvas.
       * @ko 뷰어 인스턴스를 해제합니다. 모든 등록된 이벤트리스너를 제거하고 뷰어 캔버스를 삭제합니다.
       * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */


      __proto.destroy = function () {
        this._deactivate();

        if (this._yawPitchControl) {
          this._yawPitchControl.destroy();

          this._yawPitchControl = null;
        }

        return this;
      }; // TODO: Remove parameters as they're just using private values


      __proto._initRenderer = function (yaw, pitch, fov, projectionType, cubemapConfig) {
        var _this = this;

        this._photoSphereRenderer = new PanoImageRenderer(this._image, this._width, this._height, this._isVideo, {
          initialYaw: yaw,
          initialPitch: pitch,
          fieldOfView: fov,
          imageType: projectionType,
          cubemapConfig: cubemapConfig,
          stereoFormat: this._stereoFormat
        });

        this._photoSphereRenderer.setYawPitchControl(this._yawPitchControl);

        this._bindRendererHandler();

        this._photoSphereRenderer.bindTexture().then(function () {
          return _this._activate();
        }).catch(function () {
          _this.trigger(EVENTS$1.ERROR, {
            type: ERROR_TYPE.FAIL_BIND_TEXTURE,
            message: "failed to bind texture"
          });
        });
      };
      /**
       * @private
       * update values of YawPitchControl if needed.
       * For example, In Panorama mode, initial fov and pitchRange is changed by aspect ratio of image.
       *
       * This function should be called after isReady status is true.
       */


      __proto._updateYawPitchIfNeeded = function () {
        if (this._projectionType === PanoViewer.ProjectionType.PANORAMA) {
          // update fov by aspect ratio
          var image = this._photoSphereRenderer.getContent();

          var imageAspectRatio = image.naturalWidth / image.naturalHeight;
          var yawSize = void 0;
          var maxFov = void 0; // If height is larger than width, then we assume it's rotated by 90 degree.

          if (imageAspectRatio < 1) {
            // So inverse the aspect ratio.
            imageAspectRatio = 1 / imageAspectRatio;
          }

          if (imageAspectRatio < 6) {
            yawSize = util.toDegree(imageAspectRatio); // 0.5 means ratio of half height of cylinder(0.5) and radius of cylider(1). 0.5/1 = 0.5

            maxFov = util.toDegree(Math.atan(0.5)) * 2;
          } else {
            yawSize = 360;
            maxFov = 360 / imageAspectRatio; // Make it 5 fixed as axes does.
          } // console.log("_updateYawPitchIfNeeded", maxFov, "aspectRatio", image.naturalWidth, image.naturalHeight, "yawSize", yawSize);


          var minFov = this._yawPitchControl.option("fovRange")[0]; // this option should be called after fov is set.


          this._yawPitchControl.option({
            "fov": maxFov,
            "yawRange": [-yawSize / 2, yawSize / 2],
            "pitchRange": [-maxFov / 2, maxFov / 2],
            "fovRange": [minFov, maxFov]
          });

          this.lookAt({
            fov: maxFov
          });
        }
      };

      __proto._bindRendererHandler = function () {
        var _this = this;

        this._photoSphereRenderer.on(PanoImageRenderer.EVENTS.ERROR, function (e) {
          _this.trigger(EVENTS$1.ERROR, e);
        });

        this._photoSphereRenderer.on(PanoImageRenderer.EVENTS.RENDERING_CONTEXT_LOST, function (e) {
          _this._deactivate();

          _this.trigger(EVENTS$1.ERROR, {
            type: ERROR_TYPE.RENDERING_CONTEXT_LOST,
            message: "webgl rendering context lost"
          });
        });
      };

      __proto._initYawPitchControl = function (yawPitchConfig) {
        var _this = this;

        this._yawPitchControl = new YawPitchControl(yawPitchConfig);

        this._yawPitchControl.on(EVENTS$1.ANIMATION_END, function (e) {
          _this.trigger(EVENTS$1.ANIMATION_END, e);
        });

        this._yawPitchControl.on("change", function (e) {
          _this._yaw = e.yaw;
          _this._pitch = e.pitch;
          _this._fov = e.fov;
          _this._quaternion = e.quaternion;

          _this.trigger(EVENTS$1.VIEW_CHANGE, e);
        });
      };

      __proto._activate = function () {
        this._photoSphereRenderer.attachTo(this._container);

        this._yawPitchControl.enable();

        this.updateViewportDimensions();
        this._isReady = true; // update yawPitchControl after isReady status is true.

        this._updateYawPitchIfNeeded();

        this.trigger(EVENTS$1.READY);

        this._photoSphereRenderer.startRender();
      };
      /**
       * Destroy webgl context and block user interaction and stop rendering
       */


      __proto._deactivate = function () {
        if (this._isReady) {
          this._photoSphereRenderer.stopRender();

          this._yawPitchControl.disable();

          this._isReady = false;
        }

        if (this._photoSphereRenderer) {
          this._photoSphereRenderer.destroy();

          this._photoSphereRenderer = null;
        }
      };
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


      PanoViewer.VERSION = VERSION;
      PanoViewer.ERROR_TYPE = ERROR_TYPE;
      PanoViewer.EVENTS = EVENTS$1;
      PanoViewer.PROJECTION_TYPE = PROJECTION_TYPE;
      PanoViewer.GYRO_MODE = GYRO_MODE; // This should be deprecated!

      PanoViewer.ProjectionType = PROJECTION_TYPE;
      PanoViewer.STEREO_FORMAT = STEREO_FORMAT;
      /**
       * Constant value for touch directions
       * @ko 터치 방향에 대한 상수 값.
       * @namespace
       * @name TOUCH_DIRECTION
       */

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
    }(Component);

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

        if (!opt.imageUrl) {
          setTimeout(function () {
            _this.trigger("imageError", {
              imageUrl: opt.imageUrl
            });
          }, 0);
          return _this;
        }

        _this._image = new Image();
        /**
         * Event
         */

        _this._image.onload = function () {
          _this._bg = SpriteImage._createBgDiv(_this._image, _this._rowCount, _this._colCount, _this._autoHeight);

          _this._el.appendChild(_this._bg);

          _this.setColRow(_this._colRow[0], _this._colRow[1]);

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
          _this.trigger("imageError", {
            imageUrl: opt.imageUrl
          });
        };

        _this._image.src = opt.imageUrl;
        return _this;
      }

      var __proto = SpriteImage.prototype;

      SpriteImage._createBgDiv = function (img, rowCount, colCount, autoHeight) {
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


        if (SUPPORT_WILLCHANGE) {
          img.style.willChange = "transform";
        }

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
            _this.trigger("load", evt);
          },
          "imageError": function (evt) {
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
          "change": function (evt) {
            var curr = Math.floor(evt.pos.angle / (360 / _this._frameCount));
            var frameIndex = _this._frameCount - curr - 1;

            _this._sprites.setFrameIndex(frameIndex);

            _this.trigger("change", {
              frameIndex: frameIndex,
              colRow: _this._sprites.getColRow(),
              angle: evt.pos.angle
            });
          },
          "animationEnd": function (evt) {
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

    var index_umd = {
      PanoViewer: PanoViewer,
      SpinViewer: SpinViewer,
      SpriteImage: SpriteImage,
      VERSION: VERSION
    };

    return index_umd;

})));
//# sourceMappingURL=view360.pkgd.js.map
