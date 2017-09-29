/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/view360 project is licensed under the MIT license
 * 
 * @egjs/view360 JavaScript library
 * 
 * 
 * @version 2.0.0-rc
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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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

var _vec = __webpack_require__(23);

var _vec2 = _interopRequireDefault(_vec);

var _vec3 = __webpack_require__(22);

var _vec4 = _interopRequireDefault(_vec3);

var _quat = __webpack_require__(21);

var _quat2 = _interopRequireDefault(_quat);

var _mat = __webpack_require__(20);

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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.YawPitchControl = undefined;

var _YawPitchControl = __webpack_require__(12);

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
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _axes = __webpack_require__(8);

var _axes2 = _interopRequireDefault(_axes);

var _MoveKeyInput = __webpack_require__(17);

var _MoveKeyInput2 = _interopRequireDefault(_MoveKeyInput);

var _WheelInput = __webpack_require__(19);

var _WheelInput2 = _interopRequireDefault(_WheelInput);

var _TiltMotionInput = __webpack_require__(18);

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

YawPitchControl.VERSION = "2.0.0-rc";
exports["default"] = YawPitchControl;

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _mathUtil = __webpack_require__(1);

var _browser = __webpack_require__(7);

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

		this.trigger("devicemotion", e);
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _complementaryFilter = __webpack_require__(25);

var _complementaryFilter2 = _interopRequireDefault(_complementaryFilter);

var _posePredictor = __webpack_require__(26);

var _posePredictor2 = _interopRequireDefault(_posePredictor);

var _mathUtil = __webpack_require__(5);

var _mathUtil2 = _interopRequireDefault(_mathUtil);

var _util = __webpack_require__(6);

var _util2 = _interopRequireDefault(_util);

var _browser = __webpack_require__(7);

var _mathUtil3 = __webpack_require__(1);

var _DeviceMotion = __webpack_require__(15);

var _DeviceMotion2 = _interopRequireDefault(_DeviceMotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Original Code
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://github.com/googlevr/webvr-polyfill/blob/v1.0.0/src/sensor-fusion/fusion-pose-sensor.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The pose sensor, implemented using DeviceMotion APIs.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * modified by egjs
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


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

	FusionPoseSensor.prototype._onDeviceMotionChange = function _onDeviceMotionChange(deviceMotion) {
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _utils = __webpack_require__(4);

var _FusionPoseSensor = __webpack_require__(16);

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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */,
/* 25 */
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

var SensorSample = __webpack_require__(27);
var MathUtil = __webpack_require__(5);
var Util = __webpack_require__(6);

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
/* 26 */
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
var MathUtil = __webpack_require__(5);
var Util = __webpack_require__(6);

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
/* 27 */
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=view360.yawpitchcontrol.js.map