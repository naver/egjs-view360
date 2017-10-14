/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/view360 project is licensed under the MIT license
 * 
 * @egjs/view360 JavaScript library
 * 
 * 
 * @version 2.0.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@egjs/component"), require("@egjs/axes"));
	else if(typeof define === 'function' && define.amd)
		define("view360", ["@egjs/component", "@egjs/axes"], factory);
	else if(typeof exports === 'object')
		exports["view360"] = factory(require("@egjs/component"), require("@egjs/axes"));
	else
		root["eg"] = root["eg"] || {}, root["eg"]["view360"] = factory(root["eg"]["Component"], root["eg"]["Axes"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ROTATE_CONSTANT = exports.vec3 = exports.vec2 = exports.quat = exports.mat4 = exports.glMatrix = exports.util = undefined;

var _common = __webpack_require__(2);

var _common2 = _interopRequireDefault(_common);

var _vec = __webpack_require__(34);

var _vec2 = _interopRequireDefault(_vec);

var _vec3 = __webpack_require__(33);

var _vec4 = _interopRequireDefault(_vec3);

var _quat = __webpack_require__(32);

var _quat2 = _interopRequireDefault(_quat);

var _mat = __webpack_require__(31);

var _mat2 = _interopRequireDefault(_mat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function quatToVec3(quaternion) {
	var baseV = _vec2["default"].fromValues(0, 0, 1);

	_vec2["default"].transformQuat(baseV, baseV, quaternion);
	return baseV;
} /**
   * Original Code
   * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix.js
   * Math Util
   * modified by egjs
   */
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.2
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

// Some minimal math functionality borrowed from gl-Matrix and stripped down
// for the purposes of this library.

var util = {};

util.isPowerOfTwo = function (n) {
	if (typeof n !== "number") {
		return "Not a number";
	}
	return n && (n & n - 1) === 0;
};

util.extractYawFromQuat = function (quaternion) {
	var baseV = quatToVec3(quaternion);

	return 1 * Math.atan2(baseV[0], baseV[2]);
};

util.extractPitchFromQuat = function (quaternion) {
	var baseV = quatToVec3(quaternion);

	return -1 * Math.atan2(baseV[1], Math.sqrt(Math.pow(baseV[0], 2) + Math.pow(baseV[2], 2)));
};

util.getQuaternionWithYawPitch = function (yaw, pitch) {
	var q = _quat2["default"].create();

	_quat2["default"].rotateY(q, q, _common2["default"].toRadian(yaw));
	_quat2["default"].rotateX(q, q, _common2["default"].toRadian(pitch));
	return q;
};

util.quatToYawPitch = function (quaternion) {
	return {
		yaw: _common2["default"].toDegree(util.extractYawFromQuat(quaternion)),
		pitch: _common2["default"].toDegree(util.extractPitchFromQuat(quaternion))
	};
};

util.yawPitchToPoint = function (yaw, pitch) {
	// rad, rad
	return [Math.tan(yaw) / Math.cos(pitch), Math.tan(pitch)];
};

// implement reference
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
	var targetAxis = _vec2["default"].fromValues(ROTATE_CONSTANT[rotateKind].targetAxis[0], ROTATE_CONSTANT[rotateKind].targetAxis[1], ROTATE_CONSTANT[rotateKind].targetAxis[2]);
	var meshPoint = ROTATE_CONSTANT[rotateKind].meshPoint;

	var prevQuaternion = _quat2["default"].clone(prevQ);
	var curQuaternion = _quat2["default"].clone(curQ);

	_quat2["default"].normalize(prevQuaternion, prevQuaternion);
	_quat2["default"].normalize(curQuaternion, curQuaternion);

	var prevPoint = _vec2["default"].fromValues(0, 0, 1);
	var curPoint = _vec2["default"].fromValues(0, 0, 1);

	_vec2["default"].transformQuat(prevPoint, prevPoint, prevQuaternion);
	_vec2["default"].transformQuat(curPoint, curPoint, curQuaternion);
	_vec2["default"].transformQuat(targetAxis, targetAxis, curQuaternion);

	var rotateDistance = _vec2["default"].dot(targetAxis, _vec2["default"].cross(_vec2["default"].create(), prevPoint, curPoint));
	var rotateDirection = rotateDistance > 0 ? 1 : -1;

	// when counter clock wise, use vec3.fromValues(0,1,0)
	// when clock wise, use vec3.fromValues(0,-1,0)
	// const meshPoint1 = vec3.fromValues(0, 0, 0);
	var meshPoint2 = _vec2["default"].fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);

	var meshPoint3 = void 0;

	if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
		meshPoint3 = _vec2["default"].fromValues(0, rotateDirection, 0);
	} else {
		meshPoint3 = _vec2["default"].fromValues(rotateDirection, 0, 0);
	}

	_vec2["default"].transformQuat(meshPoint2, meshPoint2, curQuaternion);
	_vec2["default"].transformQuat(meshPoint3, meshPoint3, curQuaternion);

	var vecU = meshPoint2;
	var vecV = meshPoint3;
	var vecN = _vec2["default"].create();

	_vec2["default"].cross(vecN, vecU, vecV);
	_vec2["default"].normalize(vecN, vecN);

	var coefficientA = vecN[0];
	var coefficientB = vecN[1];
	var coefficientC = vecN[2];
	//	const coefficientD = -1 * vec3.dot(vecN, meshPoint1);

	// a point on the plane
	curPoint = _vec2["default"].fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
	_vec2["default"].transformQuat(curPoint, curPoint, curQuaternion);

	// a point should project on the plane
	prevPoint = _vec2["default"].fromValues(meshPoint[0], meshPoint[1], meshPoint[2]);
	_vec2["default"].transformQuat(prevPoint, prevPoint, prevQuaternion);

	// distance between prevPoint and the plane
	var distance = Math.abs(prevPoint[0] * coefficientA + prevPoint[1] * coefficientB + prevPoint[2] * coefficientC);

	var projectedPrevPoint = _vec2["default"].create();

	_vec2["default"].subtract(projectedPrevPoint, prevPoint, _vec2["default"].scale(_vec2["default"].create(), vecN, distance));

	var trigonometricRatio = (projectedPrevPoint[0] * curPoint[0] + projectedPrevPoint[1] * curPoint[1] + projectedPrevPoint[2] * curPoint[2]) / (_vec2["default"].length(projectedPrevPoint) * _vec2["default"].length(curPoint));

	// defensive block
	if (trigonometricRatio > 1) {
		trigonometricRatio = 1;
	}

	var theta = Math.acos(trigonometricRatio);

	var crossVec = _vec2["default"].cross(_vec2["default"].create(), curPoint, projectedPrevPoint);

	distance = coefficientA * crossVec[0] + coefficientB * crossVec[1] + coefficientC * crossVec[2];

	var thetaDirection = void 0;

	if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
		thetaDirection = distance > 0 ? 1 : -1;
	} else {
		thetaDirection = distance < 0 ? 1 : -1;
	}

	var deltaRadian = theta * thetaDirection * rotateDirection;

	return _common2["default"].toDegree(deltaRadian);
}

util.getRotationDelta = getRotationDelta;

exports.util = util;
exports.glMatrix = _common2["default"];
exports.mat4 = _mat2["default"];
exports.quat = _quat2["default"];
exports.vec2 = _vec4["default"];
exports.vec3 = _vec2["default"];
exports.ROTATE_CONSTANT = ROTATE_CONSTANT;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
};

// glMatrix.EPSILON = 0.000001;
glMatrix.EPSILON = 0.0001;

module.exports = glMatrix;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
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

var MIN_FIELD_OF_VIEW = 20;
var MAX_FIELD_OF_VIEW = 110;
var PAN_SCALE = 320;

// TODO: Remove if below constant is not needed.
var YAW_DELTA_MAX = 45;
// const PITCH_DELTA_MAX = 45;

// const DELTA_THRESHOLD = 0.015;
// const DELTA_THRESHOLD = 0.09; // Note4
// const DELTA_THRESHOLD = 0.0825;
// const DELTA_THRESHOLD = 0.075;
// const DELTA_THRESHOLD = 0.06;
// const DELTA_THRESHOLD = 0.045;
var DELTA_THRESHOLD = 0.0375; // Note2

var YAW_RANGE_HALF = 180;
var PITCH_RANGE_HALF = 90;
var PINCH_EVENTS = "pinchstart pinchmove pinchend";

var KEYMAP = {
	LEFT_ARROW: 37,
	A: 65,
	UP_ARROW: 38,
	W: 87,
	RIGHT_ARROW: 39,
	D: 68,
	DOWN_ARROW: 40,
	S: 83
};

exports.CONTROL_MODE_VR = CONTROL_MODE_VR;
exports.CONTROL_MODE_YAWPITCH = CONTROL_MODE_YAWPITCH;
exports.TOUCH_DIRECTION_NONE = TOUCH_DIRECTION_NONE;
exports.TOUCH_DIRECTION_YAW = TOUCH_DIRECTION_YAW;
exports.TOUCH_DIRECTION_PITCH = TOUCH_DIRECTION_PITCH;
exports.TOUCH_DIRECTION_ALL = TOUCH_DIRECTION_ALL;
exports.MC_DECELERATION = MC_DECELERATION;
exports.MC_MAXIMUM_DURATION = MC_MAXIMUM_DURATION;
exports.MC_BIND_SCALE = MC_BIND_SCALE;
exports.MIN_FIELD_OF_VIEW = MIN_FIELD_OF_VIEW;
exports.MAX_FIELD_OF_VIEW = MAX_FIELD_OF_VIEW;
exports.PAN_SCALE = PAN_SCALE;
exports.YAW_DELTA_MAX = YAW_DELTA_MAX;
exports.DELTA_THRESHOLD = DELTA_THRESHOLD;
exports.YAW_RANGE_HALF = YAW_RANGE_HALF;
exports.PITCH_RANGE_HALF = PITCH_RANGE_HALF;
exports.PINCH_EVENTS = PINCH_EVENTS;
exports.KEYMAP = KEYMAP;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var util = {};

function toAxis(source, offset) {
	return offset.reduce(function (acc, v, i) {
		if (source[i]) {
			acc[source[i]] = v;
		}
		return acc;
	}, {});
}

util.toAxis = toAxis;

exports["default"] = util;
exports.toAxis = toAxis;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(40);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35), __webpack_require__(36)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

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
MathUtil.radToDeg = 180 / Math.PI;

// Some minimal math functionality borrowed from THREE.Math and stripped down
// for the purposes of this library.


MathUtil.Vector2 = function ( x, y ) {
  this.x = x || 0;
  this.y = y || 0;
};

MathUtil.Vector2.prototype = {
  constructor: MathUtil.Vector2,

  set: function ( x, y ) {
    this.x = x;
    this.y = y;

    return this;
  },

  copy: function ( v ) {
    this.x = v.x;
    this.y = v.y;

    return this;
  },

  subVectors: function ( a, b ) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;

    return this;
  },
};

MathUtil.Vector3 = function ( x, y, z ) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};

MathUtil.Vector3.prototype = {
  constructor: MathUtil.Vector3,

  set: function ( x, y, z ) {
    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  },

  copy: function ( v ) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;

    return this;
  },

  length: function () {
    return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
  },

  normalize: function () {
    var scalar = this.length();

    if ( scalar !== 0 ) {
      var invScalar = 1 / scalar;

      this.multiplyScalar(invScalar);
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }

    return this;
  },

  multiplyScalar: function ( scalar ) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
  },

  applyQuaternion: function ( q ) {
    var x = this.x;
    var y = this.y;
    var z = this.z;

    var qx = q.x;
    var qy = q.y;
    var qz = q.z;
    var qw = q.w;

    // calculate quat * vector
    var ix =  qw * x + qy * z - qz * y;
    var iy =  qw * y + qz * x - qx * z;
    var iz =  qw * z + qx * y - qy * x;
    var iw = - qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
    this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
    this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

    return this;
  },

  dot: function ( v ) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },

  crossVectors: function ( a, b ) {
    var ax = a.x, ay = a.y, az = a.z;
    var bx = b.x, by = b.y, bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;
  },
};

MathUtil.Quaternion = function ( x, y, z, w ) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.w = ( w !== undefined ) ? w : 1;
};

MathUtil.Quaternion.prototype = {
  constructor: MathUtil.Quaternion,

  set: function ( x, y, z, w ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    return this;
  },

  copy: function ( quaternion ) {
    this.x = quaternion.x;
    this.y = quaternion.y;
    this.z = quaternion.z;
    this.w = quaternion.w;

    return this;
  },

  setFromEulerXYZ: function( x, y, z ) {
    var c1 = Math.cos( x / 2 );
    var c2 = Math.cos( y / 2 );
    var c3 = Math.cos( z / 2 );
    var s1 = Math.sin( x / 2 );
    var s2 = Math.sin( y / 2 );
    var s3 = Math.sin( z / 2 );

    this.x = s1 * c2 * c3 + c1 * s2 * s3;
    this.y = c1 * s2 * c3 - s1 * c2 * s3;
    this.z = c1 * c2 * s3 + s1 * s2 * c3;
    this.w = c1 * c2 * c3 - s1 * s2 * s3;

    return this;
  },

  setFromEulerYXZ: function( x, y, z ) {
    var c1 = Math.cos( x / 2 );
    var c2 = Math.cos( y / 2 );
    var c3 = Math.cos( z / 2 );
    var s1 = Math.sin( x / 2 );
    var s2 = Math.sin( y / 2 );
    var s3 = Math.sin( z / 2 );

    this.x = s1 * c2 * c3 + c1 * s2 * s3;
    this.y = c1 * s2 * c3 - s1 * c2 * s3;
    this.z = c1 * c2 * s3 - s1 * s2 * c3;
    this.w = c1 * c2 * c3 + s1 * s2 * s3;

    return this;
  },

  setFromAxisAngle: function ( axis, angle ) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
    // assumes axis is normalized

    var halfAngle = angle / 2, s = Math.sin( halfAngle );

    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = Math.cos( halfAngle );

    return this;
  },

  multiply: function ( q ) {
    return this.multiplyQuaternions( this, q );
  },

  multiplyQuaternions: function ( a, b ) {
    // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

    var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
    var qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

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
    var l = Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

    if ( l === 0 ) {
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

  slerp: function ( qb, t ) {
    if ( t === 0 ) return this;
    if ( t === 1 ) return this.copy( qb );

    var x = this.x, y = this.y, z = this.z, w = this.w;

    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

    var cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;

    if ( cosHalfTheta < 0 ) {
      this.w = - qb.w;
      this.x = - qb.x;
      this.y = - qb.y;
      this.z = - qb.z;

      cosHalfTheta = - cosHalfTheta;
    } else {
      this.copy( qb );
    }

    if ( cosHalfTheta >= 1.0 ) {
      this.w = w;
      this.x = x;
      this.y = y;
      this.z = z;

      return this;
    }

    var halfTheta = Math.acos( cosHalfTheta );
    var sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

    if ( Math.abs( sinHalfTheta ) < 0.001 ) {
      this.w = 0.5 * ( w + this.w );
      this.x = 0.5 * ( x + this.x );
      this.y = 0.5 * ( y + this.y );
      this.z = 0.5 * ( z + this.z );

      return this;
    }

    var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
    ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

    this.w = ( w * ratioA + this.w * ratioB );
    this.x = ( x * ratioA + this.x * ratioB );
    this.y = ( y * ratioA + this.y * ratioB );
    this.z = ( z * ratioA + this.z * ratioB );

    return this;
  },

  setFromUnitVectors: function () {
    // http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final
    // assumes direction vectors vFrom and vTo are normalized

    var v1, r;
    var EPS = 0.000001;

    return function ( vFrom, vTo ) {
      if ( v1 === undefined ) v1 = new MathUtil.Vector3();

      r = vFrom.dot( vTo ) + 1;

      if ( r < EPS ) {
        r = 0;

        if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {
          v1.set( - vFrom.y, vFrom.x, 0 );
        } else {
          v1.set( 0, - vFrom.z, vFrom.y );
        }
      } else {
        v1.crossVectors( vFrom, vTo );
      }

      this.x = v1.x;
      this.y = v1.y;
      this.z = v1.z;
      this.w = r;

      this.normalize();

      return this;
    }
  }(),
};

module.exports = MathUtil;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

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

Util.base64 = function(mimeType, base64) {
  return 'data:' + mimeType + ';base64,' + base64;
};

Util.clamp = function(value, min, max) {
  return Math.min(Math.max(min, value), max);
};

Util.lerp = function(a, b, t) {
  return a + ((b - a) * t);
};

/**
 * Light polyfill for `Promise.race`. Returns
 * a promise that resolves when the first promise
 * provided resolves.
 *
 * @param {Array<Promise>} promises
 */
Util.race = function(promises) {
  if (Promise.race) {
    return Promise.race(promises);
  }

  return new Promise(function (resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};

Util.isIOS = (function() {
  var isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
  return function() {
    return isIOS;
  };
})();

Util.isWebViewAndroid = (function() {
  var isWebViewAndroid = navigator.userAgent.indexOf('Version') !== -1 &&
      navigator.userAgent.indexOf('Android') !== -1 &&
      navigator.userAgent.indexOf('Chrome') !== -1;
  return function() {
    return isWebViewAndroid;
  };
})();

Util.isSafari = (function() {
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  return function() {
    return isSafari;
  };
})();

Util.isFirefoxAndroid = (function() {
  var isFirefoxAndroid = navigator.userAgent.indexOf('Firefox') !== -1 &&
      navigator.userAgent.indexOf('Android') !== -1;
  return function() {
    return isFirefoxAndroid;
  };
})();

Util.isLandscapeMode = function() {
  return (window.orientation == 90 || window.orientation == -90);
};

// Helper method to validate the time steps of sensor timestamps.
Util.isTimestampDeltaValid = function(timestampDeltaS) {
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

Util.getScreenWidth = function() {
  return Math.max(window.screen.width, window.screen.height) *
      window.devicePixelRatio;
};

Util.getScreenHeight = function() {
  return Math.min(window.screen.width, window.screen.height) *
      window.devicePixelRatio;
};

Util.requestFullscreen = function(element) {
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

Util.exitFullscreen = function() {
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

Util.getFullscreenElement = function() {
  return document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
};

Util.linkProgram = function(gl, vertexSource, fragmentSource, attribLocationMap) {
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

  for (var attribName in attribLocationMap)
    gl.bindAttribLocation(program, attribLocationMap[attribName], attribName);

  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
};

Util.getProgramUniforms = function(gl, program) {
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

Util.isMobile = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

Util.extend = function(dest, src) {
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      dest[key] = src[key];
    }
  }

  return dest;
}

Util.safariCssSizeWorkaround = function(canvas) {
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
    canvas.style.width = (parseInt(width) + 1) + 'px';
    canvas.style.height = (parseInt(height)) + 'px';
    setTimeout(function() {
      canvas.style.width = width;
      canvas.style.height = height;
    }, 100);
  }

  // Debug only.
  window.Util = Util;
  window.canvas = canvas;
};

Util.isDebug = function() {
  return Util.getQueryParameter('debug');
};

Util.getQueryParameter = function(name) {
  var name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

Util.frameDataFromPose = (function() {
  var piOver180 = Math.PI / 180.0;
  var rad45 = Math.PI * 0.25;

  // Borrowed from glMatrix.
  function mat4_perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov ? (fov.upDegrees * piOver180) : rad45),
    downTan = Math.tan(fov ? (fov.downDegrees * piOver180) : rad45),
    leftTan = Math.tan(fov ? (fov.leftDegrees * piOver180) : rad45),
    rightTan = Math.tan(fov ? (fov.rightDegrees * piOver180) : rad45),
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
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
  }

  function mat4_fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
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
  };

  function mat4_translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
      a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
      a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

      out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
      out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
      out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  };

  function mat4_invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

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
  };

  var defaultOrientation = new Float32Array([0, 0, 0, 1]);
  var defaultPosition = new Float32Array([0, 0, 0]);

  function updateEyeMatrices(projection, view, pose, parameters, vrDisplay) {
    mat4_perspectiveFromFieldOfView(projection, parameters ? parameters.fieldOfView : null, vrDisplay.depthNear, vrDisplay.depthFar);

    var orientation = pose.orientation || defaultOrientation;
    var position = pose.position || defaultPosition;

    mat4_fromRotationTranslation(view, orientation, position);
    if (parameters)
      mat4_translate(view, view, parameters.offset);
    mat4_invert(view, view);
  }

  return function(frameData, pose, vrDisplay) {
    if (!frameData || !pose)
      return false;

    frameData.pose = pose;
    frameData.timestamp = pose.timestamp;

    updateEyeMatrices(
        frameData.leftProjectionMatrix, frameData.leftViewMatrix,
        pose, vrDisplay.getEyeParameters("left"), vrDisplay);
    updateEyeMatrices(
        frameData.rightProjectionMatrix, frameData.rightViewMatrix,
        pose, vrDisplay.getEyeParameters("right"), vrDisplay);

    return true;
  };
})();

Util.isInsideCrossDomainIFrame = function() {
  var isFramed = (window.self !== window.top);
  var refDomain = Util.getDomainFromUrl(document.referrer);
  var thisDomain = Util.getDomainFromUrl(window.location.href);

  return isFramed && (refDomain !== thisDomain);
};

// From http://stackoverflow.com/a/23945027.
Util.getDomainFromUrl = function(url) {
  var domain;
  // Find & remove protocol (http, ftp, etc.) and get domain.
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  }
  else {
    domain = url.split('/')[0];
  }

  //find & remove port number
  domain = domain.split(':')[0];

  return domain;
}

module.exports = Util;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _agent = __webpack_require__(13);

var _agent2 = _interopRequireDefault(_agent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WEBGL_ERROR_CODE = {
	"0": "NO_ERROR",
	"1280": "INVALID_ENUM",
	"1281": "INVALID_VALUE",
	"1282": "INVALID_OPERATION",
	"1285": "OUT_OF_MEMORY",
	"1286": "INVALID_FRAMEBUFFER_OPERATION",
	"37442": "CONTEXT_LOST_WEBGL"
};

var WebGLUtils = function () {
	function WebGLUtils() {
		_classCallCheck(this, WebGLUtils);
	}

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

	WebGLUtils.initBuffer = function initBuffer(gl, target /* bind point */, data, itemSize) {
		var buffer = gl.createBuffer();

		gl.bindBuffer(target, buffer);
		gl.bufferData(target, data, gl.STATIC_DRAW);

		if (buffer) {
			buffer.itemSize = itemSize;
			buffer.numItems = data.length / itemSize;
		}

		return buffer;
	};

	WebGLUtils.bindBufferToAttribute = function bindBufferToAttribute(gl, buffer, attr) {
		if (buffer === null || attr === null) {
			return;
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.vertexAttribPointer(attr, buffer.itemSize, gl.FLOAT, false, 0, 0);
	};

	WebGLUtils.getWebglContext = function getWebglContext(canvas) {
		var webglIdentifiers = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
		var context = null;

		function onWebglcontextcreationerror(e) {
			return e.statusMessage;
		}

		canvas.addEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

		for (var i = 0; i < webglIdentifiers.length; i++) {
			try {
				// preserveDrawingBuffer: true 면 갤럭시 s6 네이버앱에서 떨림현상 발생
				context = canvas.getContext(webglIdentifiers[i], { preserveDrawingBuffer: false });
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
 	 * 현재 환경의 webgl 지원여부를 확인한다
 	 * @method Photo360Viewer#isWebGLAvailable
 	 * @retuen {Boolean} isWebGLAvailable
 	 */


	WebGLUtils.isWebGLAvailable = function isWebGLAvailable() {
		var canvas = document.createElement("canvas");
		var webglContext = WebGLUtils.getWebglContext(canvas);
		var webglAvailability = !!webglContext;

		// webglContext 자원 강제 회수
		if (webglContext) {
			var loseContextExtension = webglContext.getExtension("WEBGL_lose_context");

			loseContextExtension && loseContextExtension.loseContext();
		}

		return webglAvailability;
	};

	/**
  * 현재 환경의 webgl 이 안정화 된 수준인지 확인한다.
  * @method Photo360Viewer#isStableWebGL
  * @retuen {Boolean} isStableWebGL
  */


	WebGLUtils.isStableWebGL = function isStableWebGL() {
		var isStableWebgl = true;
		var agentInfo = (0, _agent2["default"])();

		if (agentInfo.os.name === "android" && parseFloat(agentInfo.os.version) <= 4.3) {
			isStableWebgl = false;
		} else if (agentInfo.os.name === "android" && parseFloat(agentInfo.os.version) === 4.4) {
			if (agentInfo.browser.name !== "chrome") {
				isStableWebgl = false;
			}
		} else if (agentInfo.os.name === "ios" && parseInt(agentInfo.os.version, 10) <= 7) {
			isStableWebgl = false;
		}

		return isStableWebgl;
	};

	WebGLUtils.getErrorNameFromWebGLErrorCode = function getErrorNameFromWebGLErrorCode(code) {
		if (!(code in WEBGL_ERROR_CODE)) {
			return "UNKNOWN_ERROR";
		}

		return WEBGL_ERROR_CODE[code];
	};

	return WebGLUtils;
}();

exports["default"] = WebGLUtils;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function Renderer() {
	_classCallCheck(this, Renderer);
};

exports["default"] = Renderer;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/* eslint-disable no-new-func */
/* eslint-disable no-nested-ternary */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-nested-ternary */
/* eslint-enable no-new-func */

win.Float32Array = typeof win.Float32Array !== "undefined" ? win.Float32Array : win.Array;

exports.window = win;
var document = exports.document = win.document;
var Float32Array = exports.Float32Array = win.Float32Array;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/agent project is licensed under the MIT license
 * 
 * @egjs/agent JavaScript library
 * 
 * 
 * @version 2.1.2
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["agent"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["agent"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _agent = __webpack_require__(1);

var _agent2 = _interopRequireDefault(_agent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = _agent2["default"]; /**
                                      * Copyright (c) NAVER Corp.
                                      * egjs-agent projects are licensed under the MIT license
                                      */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _browser = __webpack_require__(2);

var _Parser = __webpack_require__(3);

var _Parser2 = _interopRequireDefault(_Parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @namespace eg
 */

/**
 * Extracts browser and operating system information from the user agent string.
 * @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
 * @function eg#agent
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
 */
/**
 * Copyright (c) NAVER Corp.
 * egjs-agent projects are licensed under the MIT license
 */
function agent() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _browser.navigator.userAgent;

  _Parser2["default"].setUa(ua);

  var agentInfo = {
    os: _Parser2["default"].getOs(),
    browser: _Parser2["default"].getBrowser(),
    isMobile: _Parser2["default"].getIsMobile()
  };

  agentInfo.browser.name = agentInfo.browser.name.toLowerCase();
  agentInfo.os.name = agentInfo.os.name.toLowerCase();
  agentInfo.os.version = agentInfo.os.version.toLowerCase();

  if (agentInfo.os.name === "ios" && agentInfo.browser.webview) {
    agentInfo.browser.version = "-1";
  }

  return agentInfo;
}
agent.VERSION = "2.1.2";
exports["default"] = agent;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var win = typeof window !== "undefined" && window || {};

var RegExp = exports.RegExp = win.RegExp;
var navigator = exports.navigator = win.navigator;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _parseRules = __webpack_require__(4);

var _parseRules2 = _interopRequireDefault(_parseRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UA = void 0;

function setUa(ua) {
	UA = ua;
}

function isMatched(base, target) {
	return target && target.test ? !!target.test(base) : base.indexOf(target) > -1;
}

function getIdentityStringFromArray(rules, defaultStrings) {
	var matchedRule = rules.filter(function (rule) {
		return isMatched(UA, rule.criteria);
	})[0];

	return matchedRule && matchedRule.identity || defaultStrings.name;
}

function getRule(rules, targetIdentity) {
	return rules.filter(function (rule) {
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
	return getIdentityStringFromArray(_parseRules2["default"].browser, _parseRules2["default"].defaultString.browser);
}

function getBrowserRule(browserName) {
	var rule = getRule(_parseRules2["default"].browser, browserName);

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
	var browserVersion = _parseRules2["default"].defaultString.browser.version;
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
	}

	// console.log(browserRule);
	// const versionToken = browserRule ? browserRule.versionSearch : browserName;
	var browserRule = getBrowserRule(browserName);
	var versionToken = browserRule.versionSearch || browserName;
	var browserVersion = extractBrowserVersion(versionToken, UA);

	return browserVersion;
}

function isWebview() {
	var webviewRules = _parseRules2["default"].webview;
	var browserVersion = void 0;

	return webviewRules.filter(function (rule) {
		return isMatched(UA, rule.criteria);
	}).some(function (rule) {
		browserVersion = extractBrowserVersion(rule.browserVersionSearch, UA);
		if (isMatched(UA, rule.webviewToken) || isMatched(browserVersion, rule.webviewBrowserVersion)) {
			return true;
		} else {
			return false;
		}
	});
}

function getOSRule(osName) {
	return getRule(_parseRules2["default"].os, osName);
}

function getOsName() {
	return getIdentityStringFromArray(_parseRules2["default"].os, _parseRules2["default"].defaultString.os);
}

function getOsVersion(osName) {
	var osRule = getOSRule(osName) || {};
	var defaultOSVersion = _parseRules2["default"].defaultString.os.version;
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

	return { name: name, version: version };
}

function getBrowser() {
	var name = getBrowserName();
	var version = getBrowserVersion(name);

	return { name: name, version: version, webview: isWebview() };
}

function getIsMobile() {
	return UA.indexOf("Mobi") !== -1;
}

exports["default"] = {
	getOs: getOs,
	getBrowser: getBrowser,
	getIsMobile: getIsMobile,
	setUa: setUa
};
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
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

exports["default"] = parseRules;
module.exports = exports["default"];

/***/ })
/******/ ]);
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.YawPitchControl = undefined;

var _YawPitchControl = __webpack_require__(25);

var _YawPitchControl2 = _interopRequireDefault(_YawPitchControl);

var _consts = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Expose DeviceOrientationControls sub module for test purpose
_YawPitchControl2["default"].CONTROL_MODE_VR = _consts.CONTROL_MODE_VR;
_YawPitchControl2["default"].CONTROL_MODE_YAWPITCH = _consts.CONTROL_MODE_YAWPITCH;
_YawPitchControl2["default"].TOUCH_DIRECTION_ALL = _consts.TOUCH_DIRECTION_ALL;
_YawPitchControl2["default"].TOUCH_DIRECTION_YAW = _consts.TOUCH_DIRECTION_YAW;
_YawPitchControl2["default"].TOUCH_DIRECTION_PITCH = _consts.TOUCH_DIRECTION_PITCH;
_YawPitchControl2["default"].TOUCH_DIRECTION_NONE = _consts.TOUCH_DIRECTION_NONE;

// module.exports = YawPitch;
exports.YawPitchControl = _YawPitchControl2["default"];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _YawPitchControl = __webpack_require__(14);

var _PanoImageRenderer = __webpack_require__(21);

var _consts = __webpack_require__(24);

var _mathUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(5).Promise : Promise;

var PanoViewer = function (_Component) {
	_inherits(PanoViewer, _Component);

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
  * @param {String|Image} config.image Input image <ko>입력 이미지</ko>
  * @param {String} [config.imageType=equirectangular] The type of the image: equirectangular, vertival_cubestrip <ko>이미지 유형 : equirectangular, vertival_cubestrip</ko>
  * @param {Number} [config.width=width of container] the viewer's width. (in px) <ko>뷰어의 너비 (px 단위)</ko>
  * @param {Number} [config.height=height of container] the viewer's height.(in px) <ko>뷰어의 높이 (px 단위)</ko>
  *
  * @param {Number} [config.yaw=0] Initial Yaw of camera (in degree) <ko>카메라의 초기 Yaw (degree 단위)</ko>
  * @param {Number} [config.pitch=0] Initial Pitch of camera (in degree) <ko>카메라의 초기 Pitch (degree 단위)</ko>
  * @param {Number} [config.fov=65] Initial vertical field of view of camera (in degree) <ko>카메라의 초기 수직 field of view (degree 단위)</ko>
  * @param {Boolean} [config.showPolePoint=false] If false, the pole is not displayed inside the viewport <ko>false 인 경우, 극점은 뷰포트 내부에 표시되지 않습니다</ko>
  * @param {Boolean} [config.useZoom=true] When true, enables zoom with the wheel and Pinch gesture <ko>true 일 때 휠 및 집기 제스춰로 확대 / 축소 할 수 있습니다.</ko>
  * @param {Boolean} [config.useKeyboard=true] When true, enables the keyboard move key control: awsd, arrow keys <ko>true 이면 키보드 이동 키 컨트롤을 활성화합니다: awsd, 화살표 키</ko>
  * @param {Array} [config.yawRange=[-180, 180]] Range of controllable Yaw values <ko>제어 가능한 Yaw 값의 범위</ko>
  * @param {Array} [config.pitchRange=[-90, 90]] Range of controllable Pitch values <ko>제어 가능한 Pitch 값의 범위</ko>
  * @param {Array} [config.fovRange=[30, 110]] Range of controllable vertical field of view values <ko>제어 가능한 수직 field of view 값의 범위</ko>
  * @param {Function} [config.checkSupport] A function that returns a boolean value that determines whether the component is working. <ko>뷰어가 작동할 지 여부를 결정하는 부울 값을 반환하는 함수입니다.</ko>
  */
	function PanoViewer(container, options) {
		_classCallCheck(this, PanoViewer);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		if (options.checkSupport && !options.checkSupport()) {
			var _ret;

			setTimeout(function () {
				_this.trigger(_consts.EVENTS.ERROR, {
					type: _consts.ERROR_TYPE.INVALID_DEVICE,
					message: "invalid device"
				});
			}, 0);

			return _ret = _this, _possibleConstructorReturn(_this, _ret);
		}

		// Raises the error event if webgl is not supported.
		if (!_PanoImageRenderer.WebGLUtils.isWebGLAvailable()) {
			var _ret2;

			setTimeout(function () {
				_this.trigger(_consts.EVENTS.ERROR, {
					type: _consts.ERROR_TYPE.NO_WEBGL,
					message: "no webgl support"
				});
			}, 0);
			return _ret2 = _this, _possibleConstructorReturn(_this, _ret2);
		}

		_this._container = container;
		_this._image = options.image;
		_this._imageType = options.imageType || _PanoImageRenderer.PanoImageRenderer.ImageType.EQUIRECTANGULAR;

		// If the width and height are not provided, will use the size of the container.
		_this._width = options.width || parseInt(window.getComputedStyle(container).width, 10);
		_this._height = options.height || parseInt(window.getComputedStyle(container).height, 10);

		_this._yaw = options.yaw || 0;
		_this._pitch = options.pitch || 0;
		_this._fov = options.fov || 65;
		_this._aspectRatio = _this._width / _this._height;
		var fovRange = options.fovRange || [30, 110];
		var fovAngle = fovRange[1] - fovRange[0];

		if (fovAngle < _this._fov) {
			_this._fov = fovAngle;
		}

		var yawPitchConfig = Object.assign(options, {
			element: container,
			yaw: _this._yaw,
			pitch: _this._pitch,
			fov: _this._fov,
			fovRange: fovRange,
			aspectRatio: _this._aspectRatio
		});

		_this._isResumed = false;

		try {
			_this._initRenderer(_this._yaw, _this._pitch, _this._fov, _this._imageType);
		} catch (e) {
			var _ret3;

			setTimeout(function () {
				_this._photoSphereRenderer && _this._photoSphereRenderer.destroy();
				_this.trigger(_consts.EVENTS.ERROR, {
					type: _consts.ERROR_TYPE.NO_WEBGL,
					message: "no webgl support"
				});
			}, 0);
			return _ret3 = _this, _possibleConstructorReturn(_this, _ret3);
		}

		_this._yawPitchControl = new _YawPitchControl.YawPitchControl(yawPitchConfig);

		_this._initYawPitchControl();
		return _this;
	}

	/**
  * @typedef {Object} ImageInfo
  * @property {String|Image} image Input image url or Image object or Image element <ko>입력 이미지 URL 이나 이미지 객체 나 엘리먼트</ko>
  * @property {String} imageType The type of the image: equirectangular, vertival_cubestrip <ko>이미지 유형 : equirectangular, vertival_cubestrip</ko>
  */

	/**
  * Getting the image information that the viewer is currently using.
  * @ko 뷰어가 현재 사용하고있는 이미지 정보를 얻습니다.
  * @method eg.view360.PanoViewer#getImage
  * @return {ImageInfo}
  */


	PanoViewer.prototype.getImage = function getImage() {
		return {
			image: this._image,
			imageType: this._imageType
		};
	};

	/**
  * Setting the image information to be used by the viewer.
  * @ko 뷰어가 사용할 이미지 정보를 설정 합니다.
  * @method eg.view360.PanoViewer#setImage
  * @param {ImageInfo} imageInfo Input image information  <ko>입력 이미지 정보</ko>
  */


	PanoViewer.prototype.setImage = function setImage(_ref) {
		var _this2 = this;

		var image = _ref.image,
		    imageType = _ref.imageType;

		if (image) {
			this._image = image;
		}

		if (imageType && this._imageType !== imageType) {
			this._imageType = imageType;

			if (this._isResumed) {
				this._stopRender();
			}
		}

		if (!this._photoSphereRenderer) {
			return;
		}

		this._photoSphereRenderer.setImage({ image: this._image, imageType: this._imageType }).then(function (isSuccess) {
			if (!isSuccess || !_this2._isResumed) {
				return;
			}

			// if it was resume status, render new image.
			_this2._photoSphereRenderer.bindTexture().then(function () {
				_this2._startRender();
			});
		});
	};

	PanoViewer.prototype._initRenderer = function _initRenderer(yaw, pitch, fov, imageType) {
		if (this._photoSphereRenderer) {
			this._photoSphereRenderer.destroy();
		}

		this._photoSphereRenderer = new _PanoImageRenderer.PanoImageRenderer(this._image, this._width, this._height, {
			initialYaw: yaw,
			initialPitch: pitch,
			fieldOfView: fov,
			imageType: imageType
		});
		this._bindRendererHandler();
	};

	PanoViewer.prototype._bindRendererHandler = function _bindRendererHandler() {
		var _this3 = this;

		this._photoSphereRenderer.on(_PanoImageRenderer.PanoImageRenderer.EVENTS.ERROR, function (e) {
			_this3.trigger(_consts.EVENTS.ERROR, e);
		});

		this._photoSphereRenderer.on(_PanoImageRenderer.PanoImageRenderer.EVENTS.RENDERING_CONTEXT_LOST, function (e) {
			_this3.suspend();
		});

		this._photoSphereRenderer.on(_PanoImageRenderer.PanoImageRenderer.EVENTS.RENDERING_CONTEXT_RESTORE, function (e) {
			_this3.resume();
		});
	};

	PanoViewer.prototype._initYawPitchControl = function _initYawPitchControl() {
		var _this4 = this;

		this._yawPitchControl.on(_consts.EVENTS.ANIMATION_END, function (e) {
			_this4._triggerEvent(_consts.EVENTS.ANIMATION_END, e);
		});

		this._yawPitchControl.on("change", function (e) {
			_this4._yaw = e.yaw;
			_this4._pitch = e.pitch;
			_this4._fov = e.fov;

			_this4._triggerEvent(_consts.EVENTS.VIEW_CHANGE, e);
		});
	};

	PanoViewer.prototype._triggerEvent = function _triggerEvent(name, param) {
		var evt = param || {};

		/**
   * Events that is fired when error occurs
   * @ko 에러 발생 시 발생하는 이벤트
   * @name eg.view360.PanoViewer#error
   * @event
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {Number} param.type Error type (10: INVALID_DEVICE, 11: NO_WEBGL, 12, FAIL_IMAGE_LOAD, 13: FAIL_BIND_TEXTURE)<ko>에러 종류(10: INVALID_DEVICE, 11: NO_WEBGL, 12, FAIL_IMAGE_LOAD, 13: FAIL_BIND_TEXTURE)</ko>
   * @param {String} param.message Error message <ko>에러 메시지</ko>
   *
   * @example
   *
   * viwer.on({
   *	"error" : function(evt) {
   *		// evt.type === 13
   *		// evt.messaeg === "failed to bind texture"
   * });
   */

		/**
   * Events that is fired when PanoViewer is ready to go.
   * @ko PanoViewer 가 준비된 상태에 발생하는 이벤트
   * @name eg.view360.PanoViewer#resume
   * @event
   *
   * @example
   *
   * viwer.on({
   *	"resume" : function(evt) {
   *		// PanoViewer is ready to show image and handle user interaction.
   * });
   */

		/**
   * Events that is fired when PanoViewer is suspended
   * @ko PanoViewer 를 중지했을때 발생하는 이벤트
   * @name eg.view360.PanoViewer#suspend
   * @event
   *
   * @example
   *
   * viwer.on({
   *	"suspend" : function(evt) {
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
  * When set true, enables zoom with the wheel and Pinch gesture
  * @ko true 로 설정 시 휠 및 집기 동작으로 확대 / 축소 할 수 있습니다.
  * @method eg.view360.PanoViewer#setUseZoom
  * @param {Boolean} useZoom
  */


	PanoViewer.prototype.setUseZoom = function setUseZoom(useZoom) {
		if (typeof useZoom !== "boolean") {
			return;
		}

		this._yawPitchControl.option("useZoom", useZoom);
	};

	/**
  * When true, enables the keyboard move key control: awsd, arrow keys
  * @ko true이면 키보드 이동 키 컨트롤을 활성화합니다. (awsd, 화살표 키)
  * @method eg.view360.PanoViewer#setUseKeyboard
  * @param {Boolean} useKeyboard
  */


	PanoViewer.prototype.setUseKeyboard = function setUseKeyboard(useKeyboard) {
		this._yawPitchControl.option("useKeyboard", useKeyboard);
	};

	/**
  * Setting the range of controllable FOV values
  * @ko 제어 가능한 FOV 값의 범위 설정
  * @method eg.view360.PanoViewer#setFovRange
  * @param {Array} range
  */


	PanoViewer.prototype.setFovRange = function setFovRange(range) {
		this._yawPitchControl.option("fovRange", range);
	};

	/**
  * Getting the range of controllable FOV values
  * @ko 제어 가능한 FOV 값의 범위 가져 오기
  * @method eg.view360.PanoViewer#getFovRange
  * @return {Array}
  */


	PanoViewer.prototype.getFovRange = function getFovRange() {
		return this._yawPitchControl.option("fovRange");
	};

	/**
  * Update size of canvas element by it's container element's or specified size.
  * @ko 캔버스 엘리먼트의 크기를 컨테이너 엘리먼트의 크기나 지정된 크기로 업데이트합니다.
  * @method eg.view360.PanoViewer#updateViewportDimensions
  * @param {Object} [size]
  * @param {Number} [size.width=width of container]
  * @param {Number} [size.height=height of container]
  */


	PanoViewer.prototype.updateViewportDimensions = function updateViewportDimensions(size) {
		if (!this._isResumed) {
			return;
		}
		this._width = size && size.width || parseInt(window.getComputedStyle(this._container).width, 10);
		this._height = size && size.height || parseInt(window.getComputedStyle(this._container).height, 10);
		this._aspectRatio = this._width / this._height;
		this._photoSphereRenderer.updateViewportDimensions(this._width, this._height);
		this._yawPitchControl.option("aspectRatio", this._aspectRatio);

		var skip = false;

		this.lookAt({}, 0, skip);
	};

	/**
  * Get the vertical field of view
  * @ko 뷰어의 수직 field of view 값을 가져옵니다.
  * @method eg.view360.PanoViewer#getFov
  * @return {Number}
  */


	PanoViewer.prototype.getFov = function getFov() {
		return this._fov;
	};

	/**
  * Get the horizontal field of view in degree
  */


	PanoViewer.prototype._getHFov = function _getHFov() {
		return _mathUtil.glMatrix.toDegree(2 * Math.atan(this._aspectRatio * Math.tan(_mathUtil.glMatrix.toRadian(this._fov) / 2)));
	};

	/**
  * Get current yaw value
  * @ko 뷰어의 yaw 값을 가져옵니다.
  * @method eg.view360.PanoViewer#getYaw
  * @return {Number}
  */


	PanoViewer.prototype.getYaw = function getYaw() {
		return this._yaw;
	};

	/**
  * Get current pitch value
  * @ko 뷰어의 pitch 값을 가져옵니다.
  * @method eg.view360.PanoViewer#getPitch
  * @return {Number}
  */


	PanoViewer.prototype.getPitch = function getPitch() {
		return this._pitch;
	};

	/**
  * Get the range of controllable Yaw values
  * @ko 컨트롤 가능한 Yaw 구간을 가져옵니다.
  * @method eg.view360.PanoViewer#getYawRange
  * @return {Array}
  */


	PanoViewer.prototype.getYawRange = function getYawRange() {
		return this._yawPitchControl.option("yawRange");
	};

	/**
  * Get the range of controllable Pitch values
  * @ko 컨트롤 가능한 Pitch 구간을 가져옵니다.
  * @method eg.view360.PanoViewer#getPitchRange
  * @return {Array}
  */


	PanoViewer.prototype.getPitchRange = function getPitchRange() {
		return this._yawPitchControl.option("pitchRange");
	};

	/**
  * Set the range of controllable Yaw values
  * @ko 컨트롤 가능한 Yaw 구간을 설정합니다.
  * @method eg.view360.PanoViewer#setYawRange
  * @param {Array} range
  */


	PanoViewer.prototype.setYawRange = function setYawRange(yawRange) {
		return this._yawPitchControl.option("yawRange", yawRange);
	};

	/**
  * Set the range of controllable Pitch values
  * @ko 컨트롤 가능한 Pitch 구간을 설정합니다.
  * @method eg.view360.PanoViewer#setPitchRange
  * @param {Array} range
  */


	PanoViewer.prototype.setPitchRange = function setPitchRange(pitchRange) {
		return this._yawPitchControl.option("pitchRange", pitchRange);
	};

	/**
  * If false, the pole is not displayed inside the viewport
  * @ko false 인 경우, 폴은 뷰포트 내부에 표시되지 않습니다.
  * @method eg.view360.PanoViewer#setPitchRange
  * @param {Boolean} showPolePoint
  */


	PanoViewer.prototype.setShowPolePoint = function setShowPolePoint(showPolePoint) {
		return this._yawPitchControl.option("showPolePoint", showPolePoint);
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
  */


	PanoViewer.prototype.lookAt = function lookAt(orientation, duration, skip) {
		if (!this._isResumed) {
			return;
		}

		var yaw = orientation.yaw !== undefined ? orientation.yaw : this._yaw;
		var pitch = orientation.pitch !== undefined ? orientation.pitch : this._pitch;
		var pitchRange = this._yawPitchControl.option("pitchRange");
		var verticalAngleOfImage = pitchRange[1] - pitchRange[0];
		var fov = orientation.fov !== undefined ? orientation.fov : this._fov;

		if (verticalAngleOfImage < fov) {
			fov = verticalAngleOfImage;
		}

		this._yawPitchControl.lookAt({ yaw: yaw, pitch: pitch, fov: fov }, duration, skip);

		if (duration === 0) {
			this._photoSphereRenderer.render(yaw, pitch, fov);
		}
	};

	/**
  * Create webgl context and initiate user interaction and rendering
  * @ko WebGl 컨텍스트 생성 및 사용자 상호 작용과 렌더링 시작
  * @method eg.view360.PanoViewer#resume
  */


	PanoViewer.prototype.resume = function resume() {
		var _this5 = this;

		if (this._isResumed || !this._yawPitchControl) {
			return;
		}

		if (!this._photoSphereRenderer) {
			this._initRenderer(this._yaw, this._pitch, this._fov, this._imageType);
		}

		// do setTimeout for not blocking UI when resume is called in syncrounos code.
		setTimeout(function () {
			if (_this5._isResumed || !_this5._photoSphereRenderer) {
				return;
			}

			_this5._photoSphereRenderer.bindTexture().then(function () {
				return _this5._resume();
			})["catch"](function () {
				_this5._triggerEvent(_consts.EVENTS.ERROR, {
					type: _consts.ERROR_TYPE.FAIL_BIND_TEXTURE,
					message: "failed to bind texture"
				});
			});
		}, 0);
	};

	PanoViewer.prototype._resume = function _resume() {
		this._photoSphereRenderer.attachTo(this._container);
		this._yawPitchControl.enable();

		// Even if the size of the container changes after the suspend, it is detected at the time of resume and is adjusted again.
		this.updateViewportDimensions();

		this._isResumed = true;
		this._triggerEvent(_consts.EVENTS.RESUME);
		this._startRender();
	};

	/**
  * Register the callback on the raf to call _renderLoop every frame.
  */


	PanoViewer.prototype._startRender = function _startRender() {
		this._renderLoop = this._renderLoop.bind(this);
		this._rafId = window.requestAnimationFrame(this._renderLoop);
	};

	PanoViewer.prototype._renderLoop = function _renderLoop() {
		if (this._photoSphereRenderer && this._photoSphereRenderer.isImageLoaded()) {
			this._photoSphereRenderer.render(this._yaw, this._pitch, this._fov);
		}
		this._rafId = window.requestAnimationFrame(this._renderLoop);
	};

	PanoViewer.prototype._stopRender = function _stopRender() {
		if (this._rafId) {
			window.cancelAnimationFrame(this._rafId);
			delete this._rafId;
		}
	};

	/**
  * Destroy webgl context and block user interaction and stop rendering
  * @ko Webgl 컨텍스트를 삭제하고 사용자 상호 작용을 차단하고 렌더링을 중지합니다.
  * @method eg.view360.PanoViewer#suspend
  * @param {Boolean} persistOrientation When true, it persist last yaw, pitch, fov on next resume <ko>true 지정 시, 다음 resume 때 기존의 카메라 설정을 유지합니다.</ko>
  */


	PanoViewer.prototype.suspend = function suspend() {
		if (this._photoSphereRenderer) {
			this._photoSphereRenderer.cancelLoadImage();
			this._photoSphereRenderer.destroy();
			this._photoSphereRenderer = null;
		}

		if (this._isResumed) {
			this._yawPitchControl.disable();
			this._stopRender();
			this._isResumed = false;
		}

		this._triggerEvent(_consts.EVENTS.SUSPEND);
	};

	/**
  * Returns whether the viewer is in resumed state.
  * @ko 뷰어가 resume 된 상태인지 여부를 반환합니다.
  * @method eg.view360.PanoViewer#isResumed
  * @return {Boolean}
  */


	PanoViewer.prototype.isResumed = function isResumed() {
		return this._isResumed;
	};

	/**
  * Destroy viewer. Remove all registered event listeners and remove viewer canvas.
  * @ko 뷰어 인스턴스를 해제합니다. 모든 등록된 이벤트리스너를 제거하고 뷰어 캔버스를 삭제한다.
  * @method eg.view360.PanoViewer#destroy
  */


	PanoViewer.prototype.destroy = function destroy() {
		this.suspend();

		if (this._yawPitchControl) {
			this._yawPitchControl.destroy();
			this._yawPitchControl = null;
		}

		if (this._photoSphereRenderer) {
			this._photoSphereRenderer.destroy();
			this._photoSphereRenderer = null;
		}

		this._isResumed = false;
	};

	PanoViewer.isWebGLAvailable = function isWebGLAvailable() {
		return _PanoImageRenderer.WebGLUtils.isWebGLAvailable();
	};

	PanoViewer.isStableWebGL = function isStableWebGL() {
		return _PanoImageRenderer.WebGLUtils.isStableWebGL();
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
		if ("DeviceMotionEvent" in window === false || !window.DeviceMotionEvent) {
			callback && callback(false);
			return;
		}

		var onDeviceMotionChange = void 0;

		function checkGyro() {
			return new _Promise(function (res, rej) {
				onDeviceMotionChange = function onDeviceMotionChange(deviceMotion) {
					var isGyroSensorAvailable = deviceMotion.rotationRate.alpha !== null;

					res(isGyroSensorAvailable);
				};

				window.addEventListener("devicemotion", onDeviceMotionChange);
			});
		}

		function timeout() {
			return new _Promise(function (res, rej) {
				setTimeout(function () {
					return res(false);
				}, 1000);
			});
		}

		_Promise.race([checkGyro(), timeout()]).then(function (isGyroSensorAvailable) {
			window.removeEventListener("devicemotion", onDeviceMotionChange);

			callback && callback(isGyroSensorAvailable);

			PanoViewer.isGyroSensorAvailable = function (fb) {
				fb && fb(isGyroSensorAvailable);
				return isGyroSensorAvailable;
			};
		});
	};

	return PanoViewer;
}(_component2["default"]);

exports["default"] = PanoViewer;


PanoViewer.ERROR_TYPE = _consts.ERROR_TYPE;
PanoViewer.EVENTS = _consts.EVENTS;
PanoViewer.ImageType = _PanoImageRenderer.PanoImageRenderer.ImageType;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.PanoViewer = undefined;

var _PanoViewer = __webpack_require__(15);

var _PanoViewer2 = _interopRequireDefault(_PanoViewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.PanoViewer = _PanoViewer2["default"];

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(5).Promise : Promise;

var ImageLoader = function () {
	function ImageLoader(image) {
		_classCallCheck(this, ImageLoader);

		this.image = null;

		image && this.setImage(image);
	}

	ImageLoader.prototype.get = function get() {
		var _this = this;

		return new _Promise(function (res, rej) {
			if (!_this.image) {
				rej("image is not defiend");
			} else if (_this.image.complete) {
				res(_this.image);
			} else {
				ImageLoader._once(_this.image, "load", function () {
					res(_this.image);
				});
				ImageLoader._once(_this.image, "error", function () {
					rej("failed to load images.");
				});
			}
		});
	};

	ImageLoader.prototype.setImage = function setImage(image) {
		// img element or img url
		if (typeof image === "string") {
			this.image = new Image();
			this.image.src = image;
		} else if ((typeof image === "undefined" ? "undefined" : _typeof(image)) === "object") {
			// img element 나 image object 이어야 함
			this.image = image;
		}

		// promise for image
		return this.get();
	};

	ImageLoader._once = function _once(target, type, listener) {
		target.addEventListener(type, function fn(event) {
			target.removeEventListener(type, fn);
			listener(event);
		});
		// target.addEventListener(type, listener);
	};

	ImageLoader.prototype.isImageLoaded = function isImageLoaded() {
		if (!this.image) {
			return false;
		}

		return !!this.image.src && !!this.image.complete;
	};

	/**
  * TODO: 이 기능이 정말로 필요한가?
  */


	ImageLoader.prototype.cancelLoadImage = function cancelLoadImage() {
		if (!!this.image && !this.isImageLoaded()) {
			this.image.src = "";
		}
	};

	ImageLoader.prototype.loadImage = function loadImage() {
		if (this._imageURL && !this.isImageLoaded()) {
			this.image.setAttribute("crossorigin", "anonymous");
			this.image.src = this._imageURL;
		}
	};

	ImageLoader.prototype.destroy = function destroy() {
		this.image = null;
	};

	return ImageLoader;
}();

exports["default"] = ImageLoader;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _ImageLoader = __webpack_require__(19);

var _ImageLoader2 = _interopRequireDefault(_ImageLoader);

var _WebGLUtils = __webpack_require__(10);

var _WebGLUtils2 = _interopRequireDefault(_WebGLUtils);

var _CubeRenderer = __webpack_require__(22);

var _CubeRenderer2 = _interopRequireDefault(_CubeRenderer);

var _SphereRenderer = __webpack_require__(23);

var _SphereRenderer2 = _interopRequireDefault(_SphereRenderer);

var _mathUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(5).Promise : Promise;

var ImageType = {
	EQUIRECTANGULAR: "equirectangular",
	VERTICAL_CUBESTRIP: "vertical_cubestrip"
};

var DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;

// DEVICE_PIXEL_RATIO 가 2를 초과하는 경우는 리소스 낭비이므로 2로 맞춘다.
if (DEVICE_PIXEL_RATIO > 2) {
	DEVICE_PIXEL_RATIO = 2;
}

// define custom events name
/**
 * TODO: how to manage events/errortype with PanoViewer
 *
 * I think renderer events should be seperated from viewer events although it has same name.
 */
var EVENTS = {
	BIND_TEXTURE: "bindTexture",
	IMAGE_LOADED: "imageLoaded",
	ERROR: "error",
	RENDERING_CONTEXT_LOST: "renderingContextLost",
	RENDERING_CONTEXT_RESTORE: "renderingContextRestore"
};

var ERROR_TYPE = {
	INVALID_DEVICE: 10,
	NO_WEBGL: 11,
	FAIL_IMAGE_LOAD: 12
};

var PanoImageRenderer = function (_Component) {
	_inherits(PanoImageRenderer, _Component);

	function PanoImageRenderer(image, width, height, sphericalConfig) {
		_classCallCheck(this, PanoImageRenderer);

		var _this = _possibleConstructorReturn(this, _Component.call(this));
		// Super constructor


		_this.sphericalConfig = sphericalConfig;
		_this.fieldOfView = sphericalConfig.fieldOfView;

		_this.width = width;
		_this.height = height;

		_this._lastQuaternion = null;
		_this._lastYaw = null;
		_this._lastPitch = null;
		_this._lastFieldOfView = null;

		_this.pMatrix = _mathUtil.mat4.create();
		_this.mvMatrix = _mathUtil.mat4.create();

		// initialzie pMatrix
		_mathUtil.mat4.perspective(_this.pMatrix, _mathUtil.glMatrix.toRadian(_this.fieldOfView), width / height, 0.1, 100);

		_this.textureCoordBuffer = null;
		_this.vertexBuffer = null;
		_this.indexBuffer = null;
		_this.canvas = _this._initCanvas(width, height);

		_this._image = null;
		_this._imageLoader = new _ImageLoader2["default"]();

		_this._onImageLoad = _this._onImageLoad.bind(_this);
		_this._onImageError = _this._onImageError.bind(_this);

		_this.setImage({ image: image, imageType: sphericalConfig.imageType });
		return _this;
	}

	PanoImageRenderer.prototype.setImage = function setImage(_ref) {
		var image = _ref.image,
		    imageType = _ref.imageType;

		this._setImageType(imageType);

		// img element or img url
		return this._imageLoader.setImage(image).then(this._onImageLoad)["catch"](this._onImageError);
	};

	PanoImageRenderer.prototype._setImageType = function _setImageType(imageType) {
		if (!imageType || this._imageType === imageType) {
			return;
		}

		this._imageType = imageType;
		this._isCubeStrip = imageType === ImageType.VERTICAL_CUBESTRIP || imageType === ImageType.CUBEMAP;
		this._renderer = this._isCubeStrip ? _CubeRenderer2["default"] : _SphereRenderer2["default"];

		this._initWebGL();
	};

	PanoImageRenderer.prototype._initCanvas = function _initCanvas(width, height) {
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

		// webgl context lost & restore 관련 이벤트 핸들링
		// TODO : 어떤 상황에서 발생하는 지 더 알아보자
		this._onWebglcontextlost = this._onWebglcontextlost.bind(this);
		this._onWebglcontextrestored = this._onWebglcontextrestored.bind(this);

		canvas.addEventListener("webglcontextlost", this._onWebglcontextlost);
		canvas.addEventListener("webglcontextrestored", this._onWebglcontextrestored);

		return canvas;
	};

	PanoImageRenderer.prototype._onImageError = function _onImageError(error) {
		this._image = null;

		this.trigger(EVENTS.ERROR, {
			type: ERROR_TYPE.FAIL_IMAGE_LOAD,
			message: "failed to load image"
		});

		return false;
	};

	PanoImageRenderer.prototype._onImageLoad = function _onImageLoad(image) {
		// 이미지의 사이즈를 캐시한다.
		this._image = image;

		// 이벤트 발생. 여기에 핸들러로 render 하는 걸 넣어준다.
		this.trigger(EVENTS.IMAGE_LOADED);
		return true;
	};

	PanoImageRenderer.prototype.isImageLoaded = function isImageLoaded() {
		return !!this._image;
	};

	PanoImageRenderer.prototype.cancelLoadImage = function cancelLoadImage() {
		this._imageLoader.cancelLoadImage();
	};

	PanoImageRenderer.prototype.bindTexture = function bindTexture() {
		var _this2 = this;

		return new _Promise(function (res, rej) {
			if (!_this2._imageLoader) {
				rej("ImageLoader is not initialized");
				return;
			}

			_this2._imageLoader.get().then(function () {
				return _this2._bindTexture();
			}, function () {
				return rej("ImageLoader has failed to get image.");
			}).then(res);
		});
	};

	// 부모 엘리먼트에 canvas 를 붙임


	PanoImageRenderer.prototype.attachTo = function attachTo(parentElement) {
		this.detach();
		parentElement.appendChild(this.canvas);
	};

	PanoImageRenderer.prototype.forceContextLoss = function forceContextLoss() {
		if (this.hasRenderingContext()) {
			var loseContextExtension = this.context.getExtension("WEBGL_lose_context");

			if (loseContextExtension) {
				loseContextExtension.loseContext();
			}
		}
	};

	// 부모 엘리먼트에서 canvas 를 제거


	PanoImageRenderer.prototype.detach = function detach() {
		if (this.canvas.parentElement) {
			this.canvas.parentElement.removeChild(this.canvas);
		}
	};

	PanoImageRenderer.prototype.isAttached = function isAttached() {
		return this._image && this.canvas && this.canvas.parentNode;
	};

	PanoImageRenderer.prototype.destroy = function destroy() {
		this._imageLoader.destroy();

		this.detach();
		this.forceContextLoss();

		this.off();

		this.canvas.removeEventListener("webglcontextlost", this._onWebglcontextlost);
		this.canvas.removeEventListener("webglcontextrestored", this._onWebglcontextrestored);
	};

	PanoImageRenderer.prototype.hasRenderingContext = function hasRenderingContext() {
		if (!this.context) {
			return false;
		} else if (!this.context.getProgramParameter(this.shaderProgram, this.context.LINK_STATUS) && !this.context.isContextLost()) {
			return false;
		}
		return true;
	};

	PanoImageRenderer.prototype._onWebglcontextlost = function _onWebglcontextlost(e) {
		e.preventDefault();
		this.trigger("renderingContextLost");
	};

	PanoImageRenderer.prototype._onWebglcontextrestored = function _onWebglcontextrestored(e) {
		this._initWebGL();
		this.trigger("renderingContextRestore");
	};

	PanoImageRenderer.prototype.updateFieldOfView = function updateFieldOfView(fieldOfView) {
		if (this.fieldOfView === fieldOfView) {
			return;
		}

		this.fieldOfView = fieldOfView;
		this._updateViewport();
	};

	PanoImageRenderer.prototype.updateViewportDimensions = function updateViewportDimensions(width, height) {
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

	PanoImageRenderer.prototype._updateViewport = function _updateViewport() {
		_mathUtil.mat4.perspective(this.pMatrix, _mathUtil.glMatrix.toRadian(this.fieldOfView), this.canvas.width / this.canvas.height, 0.1, 100);

		this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
	};

	PanoImageRenderer.prototype._initWebGL = function _initWebGL() {
		// TODO: Following code does need to be executed only if width/height, cubicStrip property is changed.
		try {
			this._initRenderingContext();
			this.updateViewportDimensions(this.width, this.height);

			if (this.shaderProgram) {
				this.context.deleteProgram(this.shaderProgram);
			}

			this.shaderProgram = this._initShaderProgram(this.context);
			if (!this.shaderProgram) {
				throw new Error("Failed to intialize shaders: " + _WebGLUtils2["default"].getErrorNameFromWebGLErrorCode(this.context.getError()));
			}
		} catch (e) {
			this.trigger(EVENTS.ERROR, {
				type: ERROR_TYPE.NO_WEBGL,
				message: "no webgl support"
			});
			this.destroy();
			return;
		}
		// 캔버스를 투명으로 채운다.
		this.context.clearColor(0, 0, 0, 0);
		var textureTarget = this._isCubeStrip ? this.context.TEXTURE_CUBE_MAP : this.context.TEXTURE_2D;

		if (this.texture) {
			this.context.deleteTexture(this.texture);
		}

		this.texture = _WebGLUtils2["default"].createTexture(this.context, textureTarget);
	};

	PanoImageRenderer.prototype._initRenderingContext = function _initRenderingContext() {
		if (this.hasRenderingContext()) {
			return;
		}

		if (!window.WebGLRenderingContext) {
			throw new Error("WebGLRenderingContext not available.");
		}

		this.context = _WebGLUtils2["default"].getWebglContext(this.canvas);

		if (!this.context) {
			throw new Error("Failed to acquire 3D rendering context");
		}
	};

	PanoImageRenderer.prototype._initShaderProgram = function _initShaderProgram(gl) {
		var vertexShaderSource = this._renderer.getVertexShaderSource();
		var vertexShader = _WebGLUtils2["default"].createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

		if (!vertexShader) {
			return false;
		}

		var fragmentShaderSource = this._renderer.getFragmentShaderSource();
		var fragmentShader = _WebGLUtils2["default"].createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

		if (!fragmentShader) {
			return false;
		}

		var shaderProgram = _WebGLUtils2["default"].createProgram(gl, vertexShader, fragmentShader);

		if (!shaderProgram) {
			return null;
		}

		gl.useProgram(shaderProgram);
		shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
		gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
		shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
		shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
		shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
		if (!this._isCubeStrip) {
			shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
			gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
		}

		return shaderProgram;
	};

	PanoImageRenderer.prototype._initBuffers = function _initBuffers() {
		var vertexPositionData = this._renderer.getVertexPositionData();
		var indexData = this._renderer.getIndexData();
		var textureCoordData = this._renderer.getTextureCoordData();
		var gl = this.context;

		this.vertexBuffer = _WebGLUtils2["default"].initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), 3);

		this.indexBuffer = _WebGLUtils2["default"].initBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), 1);

		if (textureCoordData !== null) {
			this.textureCoordBuffer = _WebGLUtils2["default"].initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(textureCoordData), 2);
		}
	};

	PanoImageRenderer.prototype._bindTexture = function _bindTexture() {
		this._renderer.bindTexture(this.context, this.texture, this._image);
		this._shouldForceDraw = true;

		this.trigger(EVENTS.BIND_TEXTURE);
	};

	PanoImageRenderer.prototype.renderWithQuaternion = function renderWithQuaternion(quaternion, fieldOfView) {
		if (!this.hasRenderingContext()) {
			return;
		}

		// 항상 그려줄려고 강제로 플래그 올림... 원래 이러면 안됨
		this._shouldForceDraw = true;

		if (this._lastQuaternion && _mathUtil.quat.exactEquals(this._lastQuaternion, quaternion) && this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
			return;
		}

		// fieldOfView 가 존재하면서 기존의 값과 다를 경우에만 업데이트 호출
		if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
			this.updateFieldOfView(fieldOfView);
		}

		var adgustedQ = void 0;

		// equirectangular 의 경우 이미지의 중심을 0,0 으로 맞추기 위해 렌더링 시 yaw 축을 조정한다.
		if (!this._isCubeStrip) {
			var adjustYaw = _mathUtil.quat.rotateY(_mathUtil.quat.create(), _mathUtil.quat.create(), _mathUtil.glMatrix.toRadian(-90));

			adgustedQ = _mathUtil.quat.multiply(_mathUtil.quat.create(), adjustYaw, quaternion);
		} else {
			adgustedQ = quaternion;
		}

		this.mvMatrix = _mathUtil.mat4.fromQuat(_mathUtil.mat4.create(), _mathUtil.quat.conjugate(_mathUtil.quat.create(), adgustedQ));

		this._draw();

		this._lastQuaternion = _mathUtil.quat.clone(quaternion);

		if (this._shouldForceDraw) {
			this._shouldForceDraw = false;
		}
	};

	PanoImageRenderer.prototype.render = function render(yaw, pitch, fieldOfView) {
		if (!this.hasRenderingContext()) {
			return;
		}

		if (this._lastYaw !== null && this._lastYaw === yaw && this._lastPitch !== null && this._lastPitch === pitch && this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
			return;
		}

		// fieldOfView 가 존재하면서 기존의 값과 다를 경우에만 업데이트 호출
		if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
			this.updateFieldOfView(fieldOfView);
		}

		_mathUtil.mat4.identity(this.mvMatrix);
		_mathUtil.mat4.rotateX(this.mvMatrix, this.mvMatrix, -_mathUtil.glMatrix.toRadian(pitch));
		_mathUtil.mat4.rotateY(this.mvMatrix, this.mvMatrix, -_mathUtil.glMatrix.toRadian(yaw - (this._isCubeStrip ? 0 : 90)));

		this._draw();

		this._lastYaw = yaw;
		this._lastPitch = pitch;
		if (this._shouldForceDraw) {
			this._shouldForceDraw = false;
		}
	};

	PanoImageRenderer.prototype._draw = function _draw() {
		var gl = this.context;

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.activeTexture(gl.TEXTURE0);
		if (this._isCubeStrip) {
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
		} else {
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
		}

		if (this.vertexBuffer === null || this.indexBuffer === null) {
			this._initBuffers();
		}

		// gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.uniform1i(this.shaderProgram.samplerUniform, 0);
		gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);

		// textureCoordBuffer is used in sphere
		if (this.textureCoordBuffer) {
			_WebGLUtils2["default"].bindBufferToAttribute(gl, this.textureCoordBuffer, this.shaderProgram.textureCoordAttribute);
		}

		if (this.vertexBuffer) {
			_WebGLUtils2["default"].bindBufferToAttribute(gl, this.vertexBuffer, this.shaderProgram.vertexPositionAttribute);
		}

		if (this.indexBuffer) {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
			gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		}

		if (this._isCubeStrip) {
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		} else {
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	};

	return PanoImageRenderer;
}(_component2["default"]);

exports["default"] = PanoImageRenderer;


PanoImageRenderer.EVENTS = EVENTS;
PanoImageRenderer.ERROR_TYPE = ERROR_TYPE;
PanoImageRenderer.ImageType = ImageType;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.WebGLUtils = exports.PanoImageRenderer = undefined;

var _PanoImageRenderer = __webpack_require__(20);

var _PanoImageRenderer2 = _interopRequireDefault(_PanoImageRenderer);

var _WebGLUtils = __webpack_require__(10);

var _WebGLUtils2 = _interopRequireDefault(_WebGLUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.PanoImageRenderer = _PanoImageRenderer2["default"];
exports.WebGLUtils = _WebGLUtils2["default"];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _agent = __webpack_require__(13);

var _agent2 = _interopRequireDefault(_agent);

var _Renderer2 = __webpack_require__(11);

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _mathUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CubeRenderer = function (_Renderer) {
	_inherits(CubeRenderer, _Renderer);

	function CubeRenderer() {
		_classCallCheck(this, CubeRenderer);

		return _possibleConstructorReturn(this, _Renderer.apply(this, arguments));
	}

	CubeRenderer.getVertexPositionData = function getVertexPositionData() {
		CubeRenderer._VERTEX_POSITION_DATA = CubeRenderer._VERTEX_POSITION_DATA !== null ? CubeRenderer._VERTEX_POSITION_DATA : [
		// back
		1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1,

		// front
		-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,

		// top
		1, 1, -1, 1, 1, 1, -1, 1, 1, -1, 1, -1,

		// bottom
		-1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,

		// right
		1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, -1,

		// left
		-1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1];

		return CubeRenderer._VERTEX_POSITION_DATA;
	};

	CubeRenderer.getIndexData = function getIndexData() {
		if (CubeRenderer._INDEX_DATA) {
			return CubeRenderer._INDEX_DATA;
		}

		var indexData = [];
		var vertexPositionData = CubeRenderer.getVertexPositionData();

		for (var i = 0; i < vertexPositionData.length / 3; i += 4) {
			indexData.push(i, i + 2, i + 1, i, i + 3, i + 2);
		}

		CubeRenderer._INDEX_DATA = indexData;
		return indexData;
	};

	CubeRenderer.getTextureCoordData = function getTextureCoordData() {
		return null;
	};

	CubeRenderer.getVertexShaderSource = function getVertexShaderSource() {
		return "\n\t\t\tattribute vec3 aVertexPosition;\n\t\t\tuniform mat4 uMVMatrix;\n\t\t\tuniform mat4 uPMatrix;\n\t\t\tvarying highp vec3 vVertexDirectionVector;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\t\t\t\tvVertexDirectionVector = aVertexPosition;\n\t\t\t}";
	};

	CubeRenderer.getFragmentShaderSource = function getFragmentShaderSource() {
		return "\n\t\t\tvarying highp vec3 vVertexDirectionVector;\n\t\t\tuniform samplerCube uSampler;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_FragColor = textureCube(uSampler, vVertexDirectionVector);\n\t\t\t}";
	};

	CubeRenderer.bindTexture = function bindTexture(gl, texture, image) {
		if (!image) {
			return;
		}

		var agent = (0, _agent2["default"])();
		var width = image.width;
		var hasDrawImageBug = CubeRenderer.hasDrawImageBug(agent);
		var maxCubeMapTextureSize = CubeRenderer.getMaxCubeMapTextureSize(gl, image, agent);
		var heightScale = CubeRenderer.getHightScale(width, agent);

		try {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

			if (!hasDrawImageBug) {
				var canvas = document.createElement("canvas");

				canvas.width = maxCubeMapTextureSize;
				canvas.height = maxCubeMapTextureSize;
				var context = canvas.getContext("2d");

				for (var surfaceIdx = 0; surfaceIdx < 6; surfaceIdx++) {
					context.drawImage(image, 0, surfaceIdx * (width * heightScale), width, width * heightScale, 0, 0, maxCubeMapTextureSize, maxCubeMapTextureSize);

					var texImageData = new Uint8Array(context.getImageData(0, 0, maxCubeMapTextureSize, maxCubeMapTextureSize).data);

					gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + surfaceIdx, 0, gl.RGBA, maxCubeMapTextureSize, maxCubeMapTextureSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, texImageData);
				}
			} else {
				// #288, drawImage bug
				var halfCanvas = document.createElement("canvas");
				var _context = halfCanvas.getContext("2d");

				halfCanvas.width = maxCubeMapTextureSize * 3;
				halfCanvas.height = maxCubeMapTextureSize;

				var tileCanvas = document.createElement("canvas");
				var tileContext = tileCanvas.getContext("2d");

				tileCanvas.width = maxCubeMapTextureSize;
				tileCanvas.height = maxCubeMapTextureSize;

				for (var i = 0; i < 2; i++) {
					_context.save();
					_context.translate(0, maxCubeMapTextureSize);
					_context.rotate(-Math.PI / 2);
					_context.scale(1 / 3, 3);
					_context.drawImage(image, 0, width * 3 * i * heightScale, image.width, image.height / 2 * heightScale, 0, 0, halfCanvas.width, halfCanvas.height);
					_context.restore();
					for (var j = 0; j < 3; j++) {
						tileContext.save();
						tileContext.translate(maxCubeMapTextureSize, 0);
						tileContext.rotate(Math.PI / 2);
						tileContext.drawImage(halfCanvas, j * width, 0, width, width, 0, 0, maxCubeMapTextureSize, maxCubeMapTextureSize);
						tileContext.restore();
						var _texImageData = new Uint8Array(tileContext.getImageData(0, 0, maxCubeMapTextureSize, maxCubeMapTextureSize).data);

						gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i * 3 + j, 0, gl.RGBA, maxCubeMapTextureSize, maxCubeMapTextureSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, _texImageData);
					}
				}
			}
		} catch (e) {}

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	};

	CubeRenderer.getMaxCubeMapTextureSize = function getMaxCubeMapTextureSize(gl, image, agent) {
		var maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
		var _imageWidth = image.width;

		if (agent.browser.name === "ie" && parseInt(agent.browser.version, 10) === 11) {
			if (!_mathUtil.util.isPowerOfTwo(_imageWidth)) {
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
		// ios 9 의 경우 텍스쳐 최대사이즈는 1024 이다.
		if (agent.os.name === "ios" && parseInt(agent.os.version, 10) === 9) {
			_imageWidth = 1024;
		}
		// ios 8 의 경우 텍스쳐 최대사이즈는 512 이다.
		if (agent.os.name === "ios" && parseInt(agent.os.version, 10) === 8) {
			_imageWidth = 512;
		}
		// maxCubeMapTextureSize 보다는 작고, imageWidth 보다 큰 2의 승수 중 가장 작은 수
		return Math.min(maxCubeMapTextureSize, _imageWidth);
	};

	CubeRenderer.getHightScale = function getHightScale(width, agent) {
		// 안드로이드 4.3 이하 크롬과 안드로이드 5.0.2 삼성브라우저 버그해결을 위해 세로크기에 스케일값 적용
		// 참고 : https://code.google.com/p/android/issues/detail?id=5141
		var heightScale = 1;

		// TODO : 갤럭시 S브라우저에서 drawImage 메서드의 이미지, height 값이 일정 비율로 뻥튀기 되는 버그가 있다.
		// 추후 drawImage 메서드를 사용하지 않는 방식으로 개선하여 해당 버그를 접할 일이 없도록 해야 함.
		if (agent.os.name === "android") {
			if (parseFloat(agent.os.version) <= 4.3 && agent.browser.name === "chrome" || agent.os.version === "5.0.2" && agent.browser.name === "sbrowser" || agent.os.version === "5.1.1" && agent.browser.name === "sbrowser" && window.navigator.userAgent.indexOf("SM-N920") !== -1 &&
			// 삼성인터넷 버전 4 미만
			parseFloat(window.navigator.userAgent.split("SamsungBrowser/")[1].split(" ")[0]) < 4) {
				heightScale = 768 / width;
			} else if (agent.os.version === "5.0" && agent.browser.name === "sbrowser" && window.navigator.userAgent.indexOf("SM-G900") !== -1) {
				heightScale = 1344 / width;
			}
		}

		return heightScale;
	};

	CubeRenderer.hasDrawImageBug = function hasDrawImageBug(agent) {
		var hasBug = false;

		if (agent.browser.name === "sbrowser" &&
		// 삼성인터넷 버전 5 미만
		parseFloat(window.navigator.userAgent.split("SamsungBrowser/")[1].split(" ")[0]) < 5 || agent.os.name === "ios" && parseInt(agent.os.version, 10) <= 9) {
			hasBug = true;
		}

		return hasBug;
	};

	return CubeRenderer;
}(_Renderer3["default"]);

exports["default"] = CubeRenderer;


CubeRenderer._VERTEX_POSITION_DATA = null;
CubeRenderer._INDEX_DATA = null;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Renderer2 = __webpack_require__(11);

var _Renderer3 = _interopRequireDefault(_Renderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SphereRenderer = function (_Renderer) {
	_inherits(SphereRenderer, _Renderer);

	function SphereRenderer() {
		_classCallCheck(this, SphereRenderer);

		return _possibleConstructorReturn(this, _Renderer.apply(this, arguments));
	}

	SphereRenderer.getVertexPositionData = function getVertexPositionData() {
		if (SphereRenderer._VERTEX_POSITION_DATA === null) {
			SphereRenderer._initData();
		}

		return SphereRenderer._VERTEX_POSITION_DATA;
	};

	SphereRenderer.getIndexData = function getIndexData() {
		if (SphereRenderer._INDEX_DATA === null) {
			SphereRenderer._initData();
		}

		return SphereRenderer._INDEX_DATA;
	};

	SphereRenderer.getTextureCoordData = function getTextureCoordData() {
		if (SphereRenderer._TEXTURE_COORD_DATA === null) {
			SphereRenderer._initData();
		}

		return SphereRenderer._TEXTURE_COORD_DATA;
	};

	SphereRenderer.getVertexShaderSource = function getVertexShaderSource() {
		return "\n\t\t\tattribute vec3 aVertexPosition;\n\t\t\tattribute vec2 aTextureCoord;\n\t\t\tuniform mat4 uMVMatrix;\n\t\t\tuniform mat4 uPMatrix;\n\t\t\tvarying highp vec2 vTextureCoord;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\t\t\t\tvTextureCoord = aTextureCoord;\n\t\t\t}";
	};

	SphereRenderer.getFragmentShaderSource = function getFragmentShaderSource() {
		return "\n\t\t\tvarying highp vec2 vTextureCoord;\n\t\t\tuniform sampler2D uSampler;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_FragColor = texture2D(\n\t\t\t\t\tuSampler,\n\t\t\t\t\tvec2(vTextureCoord.s, vTextureCoord.t)\n\t\t\t\t);\n\t\t\t}";
	};

	SphereRenderer.bindTexture = function bindTexture(gl, texture, image) {
		if (!image) {
			return;
		}

		var maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
		var width = image.width; // imageWidth;
		var height = image.height; // imageHeight;
		var aspectRatio = height / width;
		var canvas = document.createElement("canvas");

		if (aspectRatio <= 1) {
			canvas.width = Math.min(width, maxTextureSize);
			canvas.height = canvas.width * aspectRatio;
		} else {
			canvas.height = Math.min(height, maxTextureSize);
			canvas.width = canvas.height / aspectRatio;
		}
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

		var context = canvas.getContext("2d");

		context.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
		var data = new Uint8Array(context.getImageData(0, 0, canvas.width, canvas.height).data);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
		// this.trigger(EVENTS.BIND_TEXTURE);
		gl.bindTexture(gl.TEXTURE_2D, null);
	};

	SphereRenderer._initData = function _initData() {
		var latitudeBands = 60;
		var longitudeBands = 60;
		var radius = 2;

		var textureCoordData = [];
		var vertexPositionData = [];
		var indexData = [];
		var latIdx = void 0;
		var lngIdx = void 0;

		for (latIdx = 0; latIdx <= latitudeBands; latIdx++) {
			var theta = (latIdx / latitudeBands - 0.5) * Math.PI;
			var sinTheta = Math.sin(theta);
			var cosTheta = Math.cos(theta);

			for (lngIdx = 0; lngIdx <= longitudeBands; lngIdx++) {
				var phi = (lngIdx / longitudeBands - 0.5) * 2 * Math.PI;
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

		SphereRenderer._VERTEX_POSITION_DATA = vertexPositionData;
		SphereRenderer._TEXTURE_COORD_DATA = textureCoordData;
		SphereRenderer._INDEX_DATA = indexData;
	};

	return SphereRenderer;
}(_Renderer3["default"]);

exports["default"] = SphereRenderer;


SphereRenderer._VERTEX_POSITION_DATA = null;
SphereRenderer._TEXTURE_COORD_DATA = null;
SphereRenderer._INDEX_DATA = null;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ERROR_TYPE = {
	INVALID_DEVICE: 10,
	NO_WEBGL: 11,
	FAIL_IMAGE_LOAD: 12,
	FAIL_BIND_TEXTURE: 13
};

var EVENTS = {
	RESUME: "resume",
	SUSPEND: "suspend",
	VIEW_CHANGE: "viewChange",
	ANIMATION_END: "animationEnd",
	ERROR: "error",
	INIT: "init"
};

module.exports = {
	EVENTS: EVENTS,
	ERROR_TYPE: ERROR_TYPE
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _axes = __webpack_require__(8);

var _axes2 = _interopRequireDefault(_axes);

var _MoveKeyInput = __webpack_require__(28);

var _MoveKeyInput2 = _interopRequireDefault(_MoveKeyInput);

var _WheelInput = __webpack_require__(30);

var _WheelInput2 = _interopRequireDefault(_WheelInput);

var _TiltMotionInput = __webpack_require__(29);

var _TiltMotionInput2 = _interopRequireDefault(_TiltMotionInput);

var _mathUtil = __webpack_require__(1);

var _consts = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORT_TOUCH = "ontouchstart" in window;
var SUPPORT_DEVICEMOTION = "ondevicemotion" in window;
/**
 * A module used to provide coordinate based on yaw/pitch orientation. This module receives user touch action, keyboard, mouse and device orientation(if it exists) as input, then combines them and converts it to yaw/pitch coordinates.
 *
 * @alias eg.YawPitchControl
 * @extends eg.Component
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
var YawPitchControl = function (_Component) {
	_inherits(YawPitchControl, _Component);

	/**
  * @param {Object} options The option object of the eg.YawPitch module
  * @param {Element}[options.element=null] element A base element for the eg.YawPitch module
  * @param {Number} [options.yaw=0] initial yaw (degree)
  * @param {Number} [options.pitch=0] initial pitch (degree)
  * @param {Number} [options.fov=65] initial field of view (degree)
  * @param {Boolean} [optiosn.showPolePoint=true] Indicates whether pole is shown
  * @param {Boolean} [options.useZoom=true] Indicates whether zoom is available
  * @param {Boolean} [options.useKeyboard=true] Indicates whether keyboard is enabled
  * @param {Number} [options.touchDirection=TOUCH_DIRECTION_ALL] Direction of the touch movement (TOUCH_DIRECTION_ALL: all,  TOUCH_DIRECTION_YAW: horizontal, TOUCH_DIRECTION_PITCH: vertical, TOUCH_DIRECTION_NONE: no move)
  * @param {Array} [options.yawRange=[-180, 180] Range of visible yaw
  * @param {Array} [options.pitchRange=[-90, 90] Range of visible pitch
  * @param {Array} [options.fovRange=[30, 110] Range of FOV
  * @param {Number} [options.aspectRatio=1] Aspect Ratio
  */
	function YawPitchControl(options) {
		_classCallCheck(this, YawPitchControl);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		var opt = Object.assign({
			element: null,
			yaw: 0,
			pitch: 0,
			fov: 65,
			showPolePoint: false,
			useZoom: true,
			useKeyboard: true,
			touchDirection: _consts.TOUCH_DIRECTION_ALL,
			yawRange: [-_consts.YAW_RANGE_HALF, _consts.YAW_RANGE_HALF],
			pitchRange: [-_consts.PITCH_RANGE_HALF, _consts.PITCH_RANGE_HALF],
			fovRange: [30, 110],
			aspectRatio: 1 /* TODO: Need Mandatory? */
		}, options);

		_this._element = opt.element;
		_this._initialFov = opt.fov;
		_this._enabled = false;
		_this._isAnimating = false;

		_this._initAxes(opt);
		_this.option(opt);
		return _this;
	}

	YawPitchControl.prototype._initAxes = function _initAxes(opt) {
		var _this2 = this;

		var yRange = YawPitchControl._updateYawRange(opt.yawRange, opt.fov, opt.aspectRatio);
		var pRange = YawPitchControl._updatePitchRange(opt.pitchRange, opt.fov, opt.showPolePoint);
		var circular = yRange[1] - yRange[0] < 360 ? [false, false] : [true, true];

		this.axesPanInput = new _axes2["default"].PanInput(this._element);
		this.axesWheelInput = new _WheelInput2["default"](this._element, { scale: 4 });
		this.axesTiltMotionInput = SUPPORT_DEVICEMOTION ? new _TiltMotionInput2["default"](this._element) : null;
		this.axesPinchInput = SUPPORT_TOUCH ? new _axes2["default"].PinchInput(this._element, { scale: -1 }) : null;
		this.axesMoveKeyInput = new _MoveKeyInput2["default"](this._element, { scale: [-6, 6] });

		this.axes = new _axes2["default"]({
			yaw: {
				range: yRange,
				circular: circular,
				bounce: [0, 0]
			},
			pitch: {
				range: pRange,
				circular: [false, false],
				bounce: [0, 0]
			},
			fov: {
				range: opt.fovRange,
				circular: [false, false],
				bounce: [0, 0]
			}
		}, {
			deceleration: _consts.MC_DECELERATION,
			maximumDuration: _consts.MC_MAXIMUM_DURATION
		}, {
			yaw: opt.yaw,
			pitch: opt.pitch,
			fov: opt.fov
		}).on({
			hold: function hold(evt) {
				_this2.trigger("hold");
			},
			change: function change(evt) {
				if (evt.delta.fov !== 0) {
					_this2._setPanScale(evt.pos.fov);
					_this2._updateControlScale();
				}
				_this2._triggerChange();
			},
			release: function release(evt) {
				if (evt.delta.fov !== 0) {
					_this2._setPanScale(evt.pos.fov);
					_this2._updateControlScale();
				}
				_this2._triggerChange();
			},
			animationStart: function animationStart(evt) {},
			animationEnd: function animationEnd(evt) {
				_this2.trigger("animationEnd");
			}
		});
	};

	YawPitchControl.prototype._setPanScale = function _setPanScale(fov) {
		if (!this._element) {
			return;
		}

		var areaHeight = parseInt(window.getComputedStyle(this._element).height, 10);
		var scale = _consts.MC_BIND_SCALE[0] * fov / this._initialFov * _consts.PAN_SCALE / areaHeight;

		this.axesPanInput.options.scale = [scale, scale];
		this.axes.options.deceleration = _consts.MC_DECELERATION * fov / _consts.MAX_FIELD_OF_VIEW;
	};

	/*
  * Override component's option method
  * to call method for updating values which is affected by option change.
  *
  * @param {*} args
  */


	YawPitchControl.prototype.option = function option() {
		var argLen = arguments.length;

		if (argLen === 0) {
			return this._option();
		}

		if (argLen === 1 && typeof (arguments.length <= 0 ? undefined : arguments[0]) === "string") {
			return this._option(arguments.length <= 0 ? undefined : arguments[0]);
		}

		// Setter
		var beforeOptions = Object.assign({}, this.options); // TODO: Need to deep?
		var changedKeyList = []; // TODO: if value is not changed, then do not push on changedKeyList.

		if (argLen === 1) {
			changedKeyList = Object.keys(arguments.length <= 0 ? undefined : arguments[0]);
		} else if (argLen >= 2) {
			changedKeyList.push(arguments.length <= 0 ? undefined : arguments[0]);
		}

		this._option.apply(this, arguments);
		this._applyOptions(changedKeyList, beforeOptions);
		return this;
	};

	YawPitchControl.prototype._option = function _option(key, value) {
		if (arguments.length >= 2) {
			this.options[key] = value;
			return this;
		}
		if (typeof key === "string") {
			return this.options[key];
		}
		if (arguments.length === 0) {
			return this.options;
		}
		for (var i in key) {
			this.options[i] = key[i];
		}
		return this;
	};

	YawPitchControl.prototype._applyOptions = function _applyOptions(keys, prevOptions) {
		// If one of below is changed, call updateControlScale()
		if (keys.some(function (key) {
			return key === "showPolePoint" || key === "fov" || key === "aspectRatio";
		})) {
			this._setYawPitchRange(prevOptions);
			this._updateControlScale();
		}

		if (keys.some(function (key) {
			return key === "yawRange" || key === "pitchRange";
		})) {
			this._updateControlScale();
		}

		// TEST: if fovRanges are updated, then fov may be changed.
		if (keys.some(function (key) {
			return key === "fovRange";
		})) {
			if (!this.axes) {
				return;
			}
			var fovRange = this.options.fovRange;
			var prevFov = this.axes.get().fov;
			var nextFov = this.axes.get().fov;

			_mathUtil.vec2.copy(this.axes.axis.fov.range, fovRange);

			if (nextFov < fovRange[0]) {
				nextFov = fovRange[0];
			} else if (prevFov > fovRange[1]) {
				nextFov = fovRange[1];
			}

			if (prevFov !== nextFov) {
				this.axes.setTo({
					fov: nextFov
				});
				this._updateControlScale();
			}
		}

		if (keys.some(function (key) {
			return key === "useKeyboard";
		})) {
			var useKeyboard = this.options.useKeyboard;

			if (!this.axes) {
				return;
			}
			if (useKeyboard) {
				this.axes.connect(["yaw", "pitch"], this.axesMoveKeyInput);
			} else {
				this.axes.disconnect(this.axesMoveKeyInput);
			}
		}

		if (keys.some(function (key) {
			return key === "useZoom";
		})) {
			var useZoom = this.options.useZoom;

			if (!this.axes) {
				return;
			}
			if (useZoom) {
				this.axes.connect(["fov"], this.axesWheelInput);
				this.axesPinchInput && this.axes.connect(["fov"], this.axesPinchInput);
			} else {
				this.axes.disconnect(this.axesWheelInput);
				this.axesPinchInput && this.axes.disconnect(this.axesPinchInput);
			}
		}
	};

	// If new yaw or pitch range is narrow than viewport, it will not apply new ranges.


	YawPitchControl.prototype._setYawPitchRange = function _setYawPitchRange(prevOptions) {
		var prevYawRange = prevOptions.yawRange;
		var prevPitchRange = prevOptions.pitchRange;
		var currYawRange = [];
		var currPitchRange = [];

		// Restore if it is invalid value
		var fov = this.axes.get().fov;
		var ratio = YawPitchControl.adjustAspectRatio(this.options.aspectRatio);
		var horizontalFov = fov * ratio;

		currYawRange = this.option("yawRange");
		if (currYawRange[1] - currYawRange[0] < horizontalFov) {
			this.option("yawRange", prevYawRange);
		}

		currPitchRange = this.option("pitchRange");
		if (currPitchRange[1] - currPitchRange[0] < fov) {
			this.option("pitchRange", prevPitchRange);
		}
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


	YawPitchControl.prototype._updateControlScale = function _updateControlScale() {
		var opt = this.options;
		var fov = this.axes.get().fov;

		var pRange = YawPitchControl._updatePitchRange(opt.pitchRange, fov, opt.showPolePoint);
		var yRange = YawPitchControl._updateYawRange(opt.yawRange, fov, opt.aspectRatio);

		// TODO: If not changed!?
		var pos = this.axes.get();
		var y = pos.yaw;
		var p = pos.pitch;

		_mathUtil.vec2.copy(this.axes.axis.yaw.range, yRange);
		_mathUtil.vec2.copy(this.axes.axis.pitch.range, pRange);
		this.axes.axis.yaw.circular = yRange[1] - yRange[0] < 360 ? [false, false] : [true, true];

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

		this.axes.setTo({
			yaw: y,
			pitch: p
		});

		return this;
	};

	YawPitchControl._updatePitchRange = function _updatePitchRange(pitchRange, fov, showPolePoint) {
		var verticalAngle = pitchRange[1] - pitchRange[0];
		var halfFov = fov / 2;
		var isPanorama = verticalAngle < 180;

		if (showPolePoint && !isPanorama) {
			// Use full pinch range
			return pitchRange.map(function (v) {
				return +v.toFixed(5);
			});
		}

		// Round value as movableCood do.
		return [pitchRange[0] + halfFov, pitchRange[1] - halfFov].map(function (v) {
			return +v.toFixed(5);
		});
	};

	YawPitchControl._updateYawRange = function _updateYawRange(yawRange, fov, aspectRatio) {
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
		var halfHorizontalFov = fov / 2 * ratio;

		// TODO: Magic Number Fix!
		if (horizontalAngle > 290) {
			MAGIC_NUMBER = 0.794; // horizontalAngle = 286;
		} else if (horizontalAngle > 125) {
			MAGIC_NUMBER = 0.98; // horizontalAngle *= 0.98;
		}

		// Round value as movableCood do.
		return [yawRange[0] * MAGIC_NUMBER + halfHorizontalFov, yawRange[1] * MAGIC_NUMBER - halfHorizontalFov].map(function (v) {
			return +v.toFixed(5);
		});
	};

	YawPitchControl.prototype._triggerChange = function _triggerChange() {
		var pos = this.axes.get();
		var opt = this.options;
		var event = {
			targetElement: opt.element
		};

		event.yaw = pos.yaw;
		event.pitch = pos.pitch;
		event.fov = pos.fov;

		this.trigger("change", event);
	};

	// TODO: makes constant to be logic


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


	YawPitchControl.prototype.enable = function enable() {
		if (this._enabled) {
			return this;
		}
		this.axes.connect(["yaw", "pitch"], this.axesPanInput);
		this.axesTiltMotionInput && this.axes.connect(["yaw", "pitch"], this.axesTiltMotionInput);
		this._applyOptions(Object.keys(this.options), this.options);
		this._setPanScale(this.getFov());

		this._enabled = true;
		return this;
	};

	/**
  * Disable YawPitch functionality
  *
  * @method eg.YawPitch#disable
  */


	YawPitchControl.prototype.disable = function disable(persistOrientation) {
		if (!this._enabled) {
			return this;
		}

		// TODO: Check peristOrientation is needed!
		if (!persistOrientation) {
			this._resetOrientation();
		}
		this.axes.disconnect();
		this._enabled = false;
		return this;
	};

	YawPitchControl.prototype._resetOrientation = function _resetOrientation() {
		var opt = this.options;

		this.axes.setTo({
			yaw: opt.yaw,
			pitch: opt.pitch,
			fov: opt.fov
		});

		return this;
	};

	/**
  * Set one or more of yaw, pitch, fov
  *
  * @param {Object} coordinate yaw, pitch, fov
  * @param {Number} duration Animation duration. if it is above 0 then it's animated.
  * @param {Boolean} skip Indicates whether it skip if yaw/pitch/fov is not changed.
  */


	YawPitchControl.prototype.lookAt = function lookAt(_ref, duration, skip) {
		var yaw = _ref.yaw,
		    pitch = _ref.pitch,
		    fov = _ref.fov;

		var pos = this.axes.get();

		// Skip if target direction is same with current direction.
		if (skip && yaw === pos.yaw && pitch === pos.pitch && fov === pos.fov) {
			return;
		}

		var y = yaw === undefined ? 0 : yaw - pos.yaw;
		var p = pitch === undefined ? 0 : pitch - pos.pitch;
		var f = fov === undefined ? 0 : fov - pos.fov;

		this.axes.setBy({
			yaw: y,
			pitch: p,
			fov: f
		}, duration);
	};

	YawPitchControl.prototype.get = function get() {
		return this.axes.get();
	};

	YawPitchControl.prototype.getYaw = function getYaw() {
		return this.axes.get().yaw;
	};

	YawPitchControl.prototype.getPitch = function getPitch() {
		return this.axes.get().pitch;
	};

	YawPitchControl.prototype.getFov = function getFov() {
		return this.axes.get().fov;
	};

	/**
  * Destroys objects
  */


	YawPitchControl.prototype.destroy = function destroy() {
		this.axes && this.axes.destroy();
		this.axisPanInput && this.axisPanInput.destroy();
		this.axesWheelInput && this.axesWheelInput.destroy();
		this.axesTiltMotionInput && this.axesTiltMotionInput.destroy();
		this.axesPinchInput && this.axesPinchInput.destroy();
		this.axesMoveKeyInput && this.axesMoveKeyInput.destroy();
	};

	_createClass(YawPitchControl, null, [{
		key: "YAW_DELTA_MAX",
		get: function get() {
			return _consts.YAW_DELTA_MAX;
		}
	}]);

	return YawPitchControl;
}(_component2["default"]);

YawPitchControl.VERSION = "2.0.0";
exports["default"] = YawPitchControl;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _mathUtil = __webpack_require__(1);

var _browser = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STILLNESS_THRESHOLD = 200; // millisecond

var DeviceMotion = function (_Component) {
	_inherits(DeviceMotion, _Component);

	function DeviceMotion() {
		_classCallCheck(this, DeviceMotion);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this._onDeviceMotion = _this._onDeviceMotion.bind(_this);
		_this._onDeviceOrientation = _this._onDeviceOrientation.bind(_this);

		_this.isAndroid = _browser.window.navigator.userAgent.indexOf("Android") !== -1;

		_this.stillGyroVec = _mathUtil.vec3.create();
		_this.rawGyroVec = _mathUtil.vec3.create();
		_this.adjustedGyroVec = _mathUtil.vec3.create();

		_this._timer = null;

		_this.lastDevicemotionTimestamp = 0;
		_this._isEnabled = false;
		_this.enable();
		return _this;
	}

	DeviceMotion.prototype._onDeviceOrientation = function _onDeviceOrientation() {
		var _this2 = this;

		this._timer && clearTimeout(this._timer);
		this._timer = setTimeout(function () {
			if (new Date().getTime() - _this2.lastDevicemotionTimestamp < STILLNESS_THRESHOLD) {
				_mathUtil.vec3.copy(_this2.stillGyroVec, _this2.rawGyroVec);
			}
		}, STILLNESS_THRESHOLD);
	};

	DeviceMotion.prototype._onDeviceMotion = function _onDeviceMotion(e) {
		// TODO: 브라우저에서는 이벤트 등록 시점에도 이벤트가 발생한다. 이렇게 체크하는 게 맞나??? @happyhj
		if (e.interval === 0) {
			return;
		}

		if (this.isAndroid) {
			_mathUtil.vec3.set(this.rawGyroVec, e.rotationRate.alpha || 0, e.rotationRate.beta || 0, e.rotationRate.gamma || 0);
			_mathUtil.vec3.subtract(this.adjustedGyroVec, this.rawGyroVec, this.stillGyroVec);
			this.lastDevicemotionTimestamp = new Date().getTime();

			e.adjustedRotationRate = {
				alpha: this.adjustedGyroVec[0],
				beta: this.adjustedGyroVec[1],
				gamma: this.adjustedGyroVec[2] };
		}

		this.trigger("devicemotion", {
			inputEvent: e
		});
	};

	DeviceMotion.prototype.enable = function enable() {
		if (this.isAndroid) {
			_browser.window.addEventListener("deviceorientation", this._onDeviceOrientation);
		}
		_browser.window.addEventListener("devicemotion", this._onDeviceMotion);
		this._isEnabled = true;
	};

	DeviceMotion.prototype.disable = function disable() {
		if (this.isAndroid) {
			_browser.window.removeEventListener("deviceorientation", this._onDeviceOrientation);
		}
		_browser.window.removeEventListener("devicemotion", this._onDeviceMotion);
		this._isEnabled = false;
	};

	DeviceMotion.prototype.isEnabled = function isEnabled() {
		return this._isEnabled;
	};

	return DeviceMotion;
}(_component2["default"]);

exports["default"] = DeviceMotion;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _complementaryFilter = __webpack_require__(37);

var _complementaryFilter2 = _interopRequireDefault(_complementaryFilter);

var _posePredictor = __webpack_require__(38);

var _posePredictor2 = _interopRequireDefault(_posePredictor);

var _mathUtil = __webpack_require__(6);

var _mathUtil2 = _interopRequireDefault(_mathUtil);

var _util = __webpack_require__(7);

var _util2 = _interopRequireDefault(_util);

var _browser = __webpack_require__(12);

var _mathUtil3 = __webpack_require__(1);

var _DeviceMotion = __webpack_require__(26);

var _DeviceMotion2 = _interopRequireDefault(_DeviceMotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var K_FILTER = 0.98;
var PREDICTION_TIME_S = 0.040;

var FusionPoseSensor = function (_Component) {
	_inherits(FusionPoseSensor, _Component);

	function FusionPoseSensor() {
		_classCallCheck(this, FusionPoseSensor);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.deviceMotion = new _DeviceMotion2["default"]();

		_this.accelerometer = new _mathUtil2["default"].Vector3();
		_this.gyroscope = new _mathUtil2["default"].Vector3();

		_this._onDeviceMotionChange = _this._onDeviceMotionChange.bind(_this);
		_this._onScreenOrientationChange = _this._onScreenOrientationChange.bind(_this);

		_this.filter = new _complementaryFilter2["default"](K_FILTER);
		_this.posePredictor = new _posePredictor2["default"](PREDICTION_TIME_S);

		_this.filterToWorldQ = new _mathUtil2["default"].Quaternion();

		_this.isFirefoxAndroid = _util2["default"].isFirefoxAndroid();
		_this.isIOS = _util2["default"].isIOS();
		_this._isEnabled = false;

		// Set the filter to world transform, depending on OS.
		if (_this.isIOS) {
			_this.filterToWorldQ.setFromAxisAngle(new _mathUtil2["default"].Vector3(1, 0, 0), Math.PI / 2);
		} else {
			_this.filterToWorldQ.setFromAxisAngle(new _mathUtil2["default"].Vector3(1, 0, 0), -Math.PI / 2);
		}

		_this.inverseWorldToScreenQ = new _mathUtil2["default"].Quaternion();
		_this.worldToScreenQ = new _mathUtil2["default"].Quaternion();
		_this.originalPoseAdjustQ = new _mathUtil2["default"].Quaternion();
		_this.originalPoseAdjustQ.setFromAxisAngle(new _mathUtil2["default"].Vector3(0, 0, 1), -_browser.window.orientation * Math.PI / 180);

		_this._setScreenTransform();
		// Adjust this filter for being in landscape mode.
		if (_util2["default"].isLandscapeMode()) {
			_this.filterToWorldQ.multiply(_this.inverseWorldToScreenQ);
		}

		// Keep track of a reset transform for resetSensor.
		_this.resetQ = new _mathUtil2["default"].Quaternion();

		_this.deviceMotion.on("devicemotion", _this._onDeviceMotionChange);
		_this.enable();
		return _this;
	}

	FusionPoseSensor.prototype.enable = function enable() {
		if (this.isEnabled()) {
			return;
		}
		this.deviceMotion.enable();
		this._isEnabled = true;
		_browser.window.addEventListener("orientationchange", this._onScreenOrientationChange);
	};

	FusionPoseSensor.prototype.disable = function disable() {
		if (!this.isEnabled()) {
			return;
		}
		this.deviceMotion.disable();
		this._isEnabled = false;
		_browser.window.removeEventListener("orientationchange", this._onScreenOrientationChange);
	};

	FusionPoseSensor.prototype.isEnabled = function isEnabled() {
		return this._isEnabled;
	};

	FusionPoseSensor.prototype.destroy = function destroy() {
		this.disable();
		this.deviceMotion = null;
	};

	FusionPoseSensor.prototype._triggerChange = function _triggerChange() {
		var orientation = this.getOrientation();

		if (!this._prevOrientation) {
			this._prevOrientation = orientation;
			return;
		}

		if (_mathUtil3.quat.equals(this._prevOrientation, orientation)) {
			return;
		}

		this.trigger("change", { quaternion: orientation });
	};

	FusionPoseSensor.prototype.getOrientation = function getOrientation() {
		// Convert from filter space to the the same system used by the
		// deviceorientation event.
		var orientation = this.filter.getOrientation();

		// Predict orientation.
		var out = this._convertFusionToPredicted(orientation);

		// return quaternion as glmatrix quaternion object
		out = _mathUtil3.quat.fromValues(out.x, out.y, out.z, out.w);

		return _mathUtil3.quat.normalize(out, out);
	};

	FusionPoseSensor.prototype._convertFusionToPredicted = function _convertFusionToPredicted(orientation) {
		// Predict orientation.
		this.predictedQ = this.posePredictor.getPrediction(orientation, this.gyroscope, this.previousTimestampS);

		// Convert to THREE coordinate system: -Z forward, Y up, X right.
		var out = new _mathUtil2["default"].Quaternion();

		out.copy(this.filterToWorldQ);
		out.multiply(this.resetQ);
		out.multiply(this.predictedQ);
		out.multiply(this.worldToScreenQ);

		return out;
	};

	FusionPoseSensor.prototype.resetPose = function resetPose() {
		// Reduce to inverted yaw-only.
		this.resetQ.copy(this.filter.getOrientation());
		this.resetQ.x = 0;
		this.resetQ.y = 0;
		this.resetQ.z *= -1;
		this.resetQ.normalize();

		// Take into account extra transformations in landscape mode.
		if (_util2["default"].isLandscapeMode()) {
			this.resetQ.multiply(this.inverseWorldToScreenQ);
		}

		// Take into account original pose.
		this.resetQ.multiply(this.originalPoseAdjustQ);
	};

	FusionPoseSensor.prototype._onDeviceMotionChange = function _onDeviceMotionChange(_ref) {
		var inputEvent = _ref.inputEvent;

		var deviceMotion = inputEvent;
		var accGravity = deviceMotion.accelerationIncludingGravity;
		var rotRate = deviceMotion.adjustedRotationRate || deviceMotion.rotationRate;
		var timestampS = deviceMotion.timeStamp / 1000;

		// Firefox Android timeStamp returns one thousandth of a millisecond.
		if (this.isFirefoxAndroid) {
			timestampS /= 1000;
		}

		this.accelerometer.set(-accGravity.x, -accGravity.y, -accGravity.z);
		this.gyroscope.set(rotRate.alpha, rotRate.beta, rotRate.gamma);

		// With iOS and Firefox Android, rotationRate is reported in degrees,
		// so we first convert to radians.
		if (this.isIOS || this.isFirefoxAndroid) {
			this.gyroscope.multiplyScalar(Math.PI / 180);
		}

		this.filter.addAccelMeasurement(this.accelerometer, timestampS);
		this.filter.addGyroMeasurement(this.gyroscope, timestampS);

		this._triggerChange();

		this.previousTimestampS = timestampS;
	};

	FusionPoseSensor.prototype._onScreenOrientationChange = function _onScreenOrientationChange(screenOrientation) {
		this._setScreenTransform(_browser.window.orientation);
	};

	FusionPoseSensor.prototype._setScreenTransform = function _setScreenTransform() {
		this.worldToScreenQ.set(0, 0, 0, 1);
		switch (_browser.window.orientation) {
			case 0:
				break;
			case 90:
				this.worldToScreenQ.setFromAxisAngle(new _mathUtil2["default"].Vector3(0, 0, 1), 90 / -180 * Math.PI);
				break;
			case -90:
				this.worldToScreenQ.setFromAxisAngle(new _mathUtil2["default"].Vector3(0, 0, 1), -90 / -180 * Math.PI);
				break;
			case 180:
				this.worldToScreenQ.setFromAxisAngle(new _mathUtil2["default"].Vector3(0, 0, 1), 180 / -180 * Math.PI);
				break;
			default:
				break;
		}
		this.inverseWorldToScreenQ.copy(this.worldToScreenQ);
		this.inverseWorldToScreenQ.inverse();
	};

	return FusionPoseSensor;
}(_component2["default"]);

exports["default"] = FusionPoseSensor;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _consts = __webpack_require__(3);

var _utils = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MoveKeyInput = function (_Component) {
	_inherits(MoveKeyInput, _Component);

	function MoveKeyInput(el, options) {
		_classCallCheck(this, MoveKeyInput);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.element = el;

		_this.options = Object.assign({
			scale: [1, 1],
			threshold: 0
		}, options);

		_this._onKeydown = _this._onKeydown.bind(_this);
		return _this;
	}

	MoveKeyInput.prototype.mapAxes = function mapAxes(axes) {
		this.axes = axes;
	};

	MoveKeyInput.prototype.connect = function connect(observer) {
		if (this.observer) {
			return this;
		}
		this.observer = observer;

		// add tabindex="0" to the container for making it focusable
		if (this.element.getAttribute("tabindex") !== "0") {
			this.element.setAttribute("tabindex", "0");
		}

		this._attachEvent();
		return this;
	};

	MoveKeyInput.prototype.disconnect = function disconnect() {
		if (!this.observer) {
			return this;
		}
		this.observer = null;
		this._dettachEvent();
		return this;
	};

	MoveKeyInput.prototype.destroy = function destroy() {
		this.disconnect();
		this.element = null;
		this.options = null;
		this.axes = null;
	};

	MoveKeyInput.prototype._onKeydown = function _onKeydown(event) {
		var handled = true;
		var offsets = void 0;
		var e = event;

		switch (e.keyCode) {
			case _consts.KEYMAP.LEFT_ARROW:
			case _consts.KEYMAP.A:
				offsets = [-this.options.scale[0], 0];
				break;
			case _consts.KEYMAP.RIGHT_ARROW:
			case _consts.KEYMAP.D:
				offsets = [this.options.scale[0], 0];
				break;
			case _consts.KEYMAP.UP_ARROW:
			case _consts.KEYMAP.W:
				offsets = [0, this.options.scale[1]];
				break;
			case _consts.KEYMAP.DOWN_ARROW:
			case _consts.KEYMAP.S:
				offsets = [0, -this.options.scale[1]];
				break;
			default:
				handled = false;
		}

		if (handled) {
			this.observer.change(this, event, (0, _utils.toAxis)(this.axes, offsets));
			// Suppress "double action" if event handled
			e.preventDefault();
		}
	};

	MoveKeyInput.prototype._attachEvent = function _attachEvent() {
		this.element.addEventListener("keydown", this._onKeydown, false);
	};

	MoveKeyInput.prototype._dettachEvent = function _dettachEvent() {
		this.element.removeEventListener("keydown", this._onKeydown, false);
	};

	return MoveKeyInput;
}(_component2["default"]);

exports["default"] = MoveKeyInput;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _utils = __webpack_require__(4);

var _FusionPoseSensor = __webpack_require__(27);

var _FusionPoseSensor2 = _interopRequireDefault(_FusionPoseSensor);

var _mathUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getDeltaYaw(prvQ, curQ) {
	var yawDeltaByYaw = _mathUtil.util.getRotationDelta(prvQ, curQ, _mathUtil.ROTATE_CONSTANT.YAW_DELTA_BY_YAW);
	var yawDeltaByRoll = _mathUtil.util.getRotationDelta(prvQ, curQ, _mathUtil.ROTATE_CONSTANT.YAW_DELTA_BY_ROLL) * Math.sin(_mathUtil.util.extractPitchFromQuat(curQ));

	return yawDeltaByRoll + yawDeltaByYaw;
}

function getDeltaPitch(prvQ, curQ) {
	var pitchDelta = _mathUtil.util.getRotationDelta(prvQ, curQ, _mathUtil.ROTATE_CONSTANT.PITCH_DELTA);

	return pitchDelta;
}

var TiltMotionInput = function (_Component) {
	_inherits(TiltMotionInput, _Component);

	function TiltMotionInput(el, options) {
		_classCallCheck(this, TiltMotionInput);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.element = el;

		_this._prevQuaternion = null;
		_this._quaternion = null;

		_this.fusionPoseSensor = null;

		_this.options = Object.assign({
			scale: 1,
			threshold: 0
		}, options);

		_this._onPoseChange = _this._onPoseChange.bind(_this);
		return _this;
	}

	TiltMotionInput.prototype.mapAxes = function mapAxes(axes) {
		this.axes = axes;
	};

	TiltMotionInput.prototype.connect = function connect(observer) {
		if (this.observer) {
			return this;
		}
		this.observer = observer;
		this.fusionPoseSensor = new _FusionPoseSensor2["default"]();
		this.fusionPoseSensor.enable();
		this._attachEvent();
		return this;
	};

	TiltMotionInput.prototype.disconnect = function disconnect() {
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

	TiltMotionInput.prototype.destroy = function destroy() {
		this.disconnect();
		this.element = null;
		this.options = null;
		this.axes = null;
		this._prevQuaternion = null;
		this._quaternion = null;
	};

	TiltMotionInput.prototype._onPoseChange = function _onPoseChange(event) {
		if (!this._prevQuaternion) {
			this._prevQuaternion = _mathUtil.quat.clone(event.quaternion);
			this._quaternion = _mathUtil.quat.clone(event.quaternion);
			return;
		}

		_mathUtil.quat.copy(this._prevQuaternion, this._quaternion);
		_mathUtil.quat.copy(this._quaternion, event.quaternion);

		this.observer.change(this, event, (0, _utils.toAxis)(this.axes, [getDeltaYaw(this._prevQuaternion, this._quaternion), getDeltaPitch(this._prevQuaternion, this._quaternion)]));
	};

	TiltMotionInput.prototype._attachEvent = function _attachEvent() {
		this.fusionPoseSensor.on("change", this._onPoseChange);
	};

	TiltMotionInput.prototype._dettachEvent = function _dettachEvent() {
		this.fusionPoseSensor.off("change", this._onPoseChange);
	};

	return TiltMotionInput;
}(_component2["default"]);

exports["default"] = TiltMotionInput;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _utils = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WheelInput = function (_Component) {
	_inherits(WheelInput, _Component);

	function WheelInput(el, options) {
		_classCallCheck(this, WheelInput);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.element = el;

		_this.options = Object.assign({
			scale: 1,
			threshold: 0
		}, options);

		_this._onWheel = _this._onWheel.bind(_this);
		return _this;
	}

	WheelInput.prototype.mapAxes = function mapAxes(axes) {
		this.axes = axes;
	};

	WheelInput.prototype.connect = function connect(observer) {
		if (this.observer) {
			return this;
		}
		this.observer = observer;
		this._attachEvent();
		return this;
	};

	WheelInput.prototype.disconnect = function disconnect() {
		if (!this.observer) {
			return this;
		}
		this.observer = null;
		this._dettachEvent();
		return this;
	};

	WheelInput.prototype.destroy = function destroy() {
		this.disconnect();
		this.element = null;
		this.options = null;
		this.axes = null;
	};

	WheelInput.prototype._onWheel = function _onWheel(event) {
		event.preventDefault();

		if (event.deltaY === 0) {
			return;
		}

		this.observer.change(this, event, (0, _utils.toAxis)(this.axes, [(event.deltaY < 0 ? -1 : 1) * this.options.scale]));
	};

	WheelInput.prototype._attachEvent = function _attachEvent() {
		this.element.addEventListener("wheel", this._onWheel, false);
	};

	WheelInput.prototype._dettachEvent = function _dettachEvent() {
		this.element.removeEventListener("wheel", this._onWheel, false);
	};

	return WheelInput;
}(_component2["default"]);

exports["default"] = WheelInput;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(2);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
/**
 * Original Code
 * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/mat4.js
 * 4x4 Matrix util
 * modified by egjs
 */
mat4.create = function () {
    var out = new _common2["default"].ARRAY_TYPE(16);
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
    }

    // Perform axis-specific matrix multiplication
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
    }

    // Perform axis-specific matrix multiplication
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

module.exports = mat4;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(2);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
/**
 * Original Code
 * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/quat.js
 * Quaternion util
 * modified by egjs
 */
quat.create = function () {
    var out = new _common2["default"].ARRAY_TYPE(4);
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
    var out = new _common2["default"].ARRAY_TYPE(4);
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
    var out = new _common2["default"].ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};;

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
    return Math.abs(a0 - b0) <= _common2["default"].EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common2["default"].EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common2["default"].EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common2["default"].EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
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

module.exports = quat;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(2);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
/**
 * Original Code
 * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/vec2.js
 * 2 Dimensional Vector Util
 * modified by egjs
 */
vec2.create = function () {
  var out = new _common2["default"].ARRAY_TYPE(2);
  out[0] = 0;
  out[1] = 0;
  return out;
};

vec2.copy = function (out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
};

module.exports = vec2;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(2);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
/**
 * Original Code
 * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/vec3.js
 * 3 Dimensional Vector Util
 * modified by egjs
 */
vec3.create = function () {
    var out = new _common2["default"].ARRAY_TYPE(3);
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
    var out = new _common2["default"].ARRAY_TYPE(3);
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
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

module.exports = vec3;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 36 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

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

var SensorSample = __webpack_require__(39);
var MathUtil = __webpack_require__(6);
var Util = __webpack_require__(7);

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
  this.kFilter = kFilter;

  // Raw sensor measurements.
  this.currentAccelMeasurement = new SensorSample();
  this.currentGyroMeasurement = new SensorSample();
  this.previousGyroMeasurement = new SensorSample();

  // Set default look direction to be in the correct direction.
  if (Util.isIOS()) {
    this.filterQ = new MathUtil.Quaternion(-1, 0, 0, 1);
  } else {
    this.filterQ = new MathUtil.Quaternion(1, 0, 0, 1);
  }
  this.previousFilterQ = new MathUtil.Quaternion();
  this.previousFilterQ.copy(this.filterQ);

  // Orientation based on the accelerometer.
  this.accelQ = new MathUtil.Quaternion();
  // Whether or not the orientation has been initialized.
  this.isOrientationInitialized = false;
  // Running estimate of gravity based on the current orientation.
  this.estimatedGravity = new MathUtil.Vector3();
  // Measured gravity based on accelerometer.
  this.measuredGravity = new MathUtil.Vector3();

  // Debug only quaternion of gyro-based orientation.
  this.gyroIntegralQ = new MathUtil.Quaternion();
}

ComplementaryFilter.prototype.addAccelMeasurement = function(vector, timestampS) {
  this.currentAccelMeasurement.set(vector, timestampS);
};

ComplementaryFilter.prototype.addGyroMeasurement = function(vector, timestampS) {
  this.currentGyroMeasurement.set(vector, timestampS);

  var deltaT = timestampS - this.previousGyroMeasurement.timestampS;
  if (Util.isTimestampDeltaValid(deltaT)) {
    this.run_();
  }

  this.previousGyroMeasurement.copy(this.currentGyroMeasurement);
};

ComplementaryFilter.prototype.run_ = function() {

  if (!this.isOrientationInitialized) {
    this.accelQ = this.accelToQuaternion_(this.currentAccelMeasurement.sample);
    this.previousFilterQ.copy(this.accelQ);
    this.isOrientationInitialized = true;
    return;
  }

  var deltaT = this.currentGyroMeasurement.timestampS -
      this.previousGyroMeasurement.timestampS;

  // Convert gyro rotation vector to a quaternion delta.
  var gyroDeltaQ = this.gyroToQuaternionDelta_(this.currentGyroMeasurement.sample, deltaT);
  this.gyroIntegralQ.multiply(gyroDeltaQ);

  // filter_1 = K * (filter_0 + gyro * dT) + (1 - K) * accel.
  this.filterQ.copy(this.previousFilterQ);
  this.filterQ.multiply(gyroDeltaQ);

  // Calculate the delta between the current estimated gravity and the real
  // gravity vector from accelerometer.
  var invFilterQ = new MathUtil.Quaternion();
  invFilterQ.copy(this.filterQ);
  invFilterQ.inverse();

  this.estimatedGravity.set(0, 0, -1);
  this.estimatedGravity.applyQuaternion(invFilterQ);
  this.estimatedGravity.normalize();

  this.measuredGravity.copy(this.currentAccelMeasurement.sample);
  this.measuredGravity.normalize();

  // Compare estimated gravity with measured gravity, get the delta quaternion
  // between the two.
  var deltaQ = new MathUtil.Quaternion();
  deltaQ.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
  deltaQ.inverse();

  if (Util.isDebug()) {
    console.log('Delta: %d deg, G_est: (%s, %s, %s), G_meas: (%s, %s, %s)',
                MathUtil.radToDeg * Util.getQuaternionAngle(deltaQ),
                (this.estimatedGravity.x).toFixed(1),
                (this.estimatedGravity.y).toFixed(1),
                (this.estimatedGravity.z).toFixed(1),
                (this.measuredGravity.x).toFixed(1),
                (this.measuredGravity.y).toFixed(1),
                (this.measuredGravity.z).toFixed(1));
  }

  // Calculate the SLERP target: current orientation plus the measured-estimated
  // quaternion delta.
  var targetQ = new MathUtil.Quaternion();
  targetQ.copy(this.filterQ);
  targetQ.multiply(deltaQ);

  // SLERP factor: 0 is pure gyro, 1 is pure accel.
  this.filterQ.slerp(targetQ, 1 - this.kFilter);

  this.previousFilterQ.copy(this.filterQ);
};

ComplementaryFilter.prototype.getOrientation = function() {
  return this.filterQ;
};

ComplementaryFilter.prototype.accelToQuaternion_ = function(accel) {
  var normAccel = new MathUtil.Vector3();
  normAccel.copy(accel);
  normAccel.normalize();
  var quat = new MathUtil.Quaternion();
  quat.setFromUnitVectors(new MathUtil.Vector3(0, 0, -1), normAccel);
  quat.inverse();
  return quat;
};

ComplementaryFilter.prototype.gyroToQuaternionDelta_ = function(gyro, dt) {
  // Extract axis and angle from the gyroscope data.
  var quat = new MathUtil.Quaternion();
  var axis = new MathUtil.Vector3();
  axis.copy(gyro);
  axis.normalize();
  quat.setFromAxisAngle(axis, gyro.length() * dt);
  return quat;
};


module.exports = ComplementaryFilter;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

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
var MathUtil = __webpack_require__(6);
var Util = __webpack_require__(7);

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
  this.predictionTimeS = predictionTimeS;

  // The quaternion corresponding to the previous state.
  this.previousQ = new MathUtil.Quaternion();
  // Previous time a prediction occurred.
  this.previousTimestampS = null;

  // The delta quaternion that adjusts the current pose.
  this.deltaQ = new MathUtil.Quaternion();
  // The output quaternion.
  this.outQ = new MathUtil.Quaternion();
}

PosePredictor.prototype.getPrediction = function(currentQ, gyro, timestampS) {
  if (!this.previousTimestampS) {
    this.previousQ.copy(currentQ);
    this.previousTimestampS = timestampS;
    return currentQ;
  }

  // Calculate axis and angle based on gyroscope rotation rate data.
  var axis = new MathUtil.Vector3();
  axis.copy(gyro);
  axis.normalize();

  var angularSpeed = gyro.length();

  // If we're rotating slowly, don't do prediction.
  if (angularSpeed < MathUtil.degToRad * 20) {
    if (Util.isDebug()) {
      console.log('Moving slowly, at %s deg/s: no prediction',
                  (MathUtil.radToDeg * angularSpeed).toFixed(1));
    }
    this.outQ.copy(currentQ);
    this.previousQ.copy(currentQ);
    return this.outQ;
  }

  // Get the predicted angle based on the time delta and latency.
  var deltaT = timestampS - this.previousTimestampS;
  var predictAngle = angularSpeed * this.predictionTimeS;

  this.deltaQ.setFromAxisAngle(axis, predictAngle);
  this.outQ.copy(this.previousQ);
  this.outQ.multiply(this.deltaQ);

  this.previousQ.copy(currentQ);
  this.previousTimestampS = timestampS;

  return this.outQ;
};


module.exports = PosePredictor;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

function SensorSample(sample, timestampS) {
  this.set(sample, timestampS);
};

SensorSample.prototype.set = function(sample, timestampS) {
  this.sample = sample;
  this.timestampS = timestampS;
};

SensorSample.prototype.copy = function(sensorSample) {
  this.set(sensorSample.sample, sensorSample.timestampS);
};

module.exports = SensorSample;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=view360.panoviewer.js.map