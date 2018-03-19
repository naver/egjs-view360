/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/view360 project is licensed under the MIT license
 * 
 * @egjs/view360 JavaScript library
 * 
 * 
 * @version 3.0.0-rc
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
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
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

var _vec = __webpack_require__(40);

var _vec2 = _interopRequireDefault(_vec);

var _vec3 = __webpack_require__(39);

var _vec4 = _interopRequireDefault(_vec3);

var _quat = __webpack_require__(38);

var _quat2 = _interopRequireDefault(_quat);

var _mat = __webpack_require__(37);

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
	return n && (n & n - 1) === 0;
};

util.extractPitchFromQuat = function (quaternion) {
	var baseV = quatToVec3(quaternion);

	return -1 * Math.atan2(baseV[1], Math.sqrt(Math.pow(baseV[0], 2) + Math.pow(baseV[2], 2)));
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
/* eslint-disable no-new-func */
/* eslint-disable no-nested-ternary */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-nested-ternary */
/* eslint-enable no-new-func */

win.Float32Array = typeof win.Float32Array !== "undefined" ? win.Float32Array : win.Array;

exports.window = win;
var screen = exports.screen = win.screen;
var orientation = exports.orientation = win.orientation;
var document = exports.document = win.document;
var Float32Array = exports.Float32Array = win.Float32Array;
var getComputedStyle = exports.getComputedStyle = win.getComputedStyle;
var userAgent = exports.userAgent = win.navigator.userAgent;
var SUPPORT_TOUCH = exports.SUPPORT_TOUCH = "ontouchstart" in win;
var SUPPORT_DEVICEMOTION = exports.SUPPORT_DEVICEMOTION = "ondevicemotion" in win;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
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



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

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
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

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
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
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
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
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

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

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
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
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
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
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

  var child = void 0,
      callback = void 0,
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
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

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

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
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

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
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

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
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

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

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
function all(entries) {
  return new Enumerator(this, entries).promise;
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
function race(entries) {
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
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

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


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

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

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41), __webpack_require__(42)))

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

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _agent = __webpack_require__(4);

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

var webglAvailability = null;

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

	WebGLUtils.initBuffer = function initBuffer(gl, target /* bind point */, data, itemSize, attr) {
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

	WebGLUtils.bindBufferToAttribute = function bindBufferToAttribute(gl, buffer, attr) {
		if (buffer === null || attr === null) {
			return;
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.vertexAttribPointer(attr, buffer.itemSize, gl.FLOAT, false, 0, 0);
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

			webglAvailability = !!webglContext;

			// webglContext Resource forced collection
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
		var agentInfo = (0, _agent2["default"])();
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

	return WebGLUtils;
}();

exports["default"] = WebGLUtils;

/***/ }),
/* 9 */
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

// const DELTA_THRESHOLD = 0.015;
// const DELTA_THRESHOLD = 0.09; // Note4
// const DELTA_THRESHOLD = 0.0825;
// const DELTA_THRESHOLD = 0.075;
// const DELTA_THRESHOLD = 0.06;
// const DELTA_THRESHOLD = 0.045;
var DELTA_THRESHOLD = 0.0375; // Note2

var YAW_RANGE_HALF = 180;
var PITCH_RANGE_HALF = 90;
var CIRCULAR_PITCH_RANGE_HALF = 180;
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

var GYRO_MODE = {
	NONE: "none",
	YAWPITCH: "yawPitch",
	VR: "VR"
};

exports.GYRO_MODE = GYRO_MODE;
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
exports.DELTA_THRESHOLD = DELTA_THRESHOLD;
exports.YAW_RANGE_HALF = YAW_RANGE_HALF;
exports.PITCH_RANGE_HALF = PITCH_RANGE_HALF;
exports.CIRCULAR_PITCH_RANGE_HALF = CIRCULAR_PITCH_RANGE_HALF;
exports.PINCH_EVENTS = PINCH_EVENTS;
exports.KEYMAP = KEYMAP;

/***/ }),
/* 10 */
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

Util.isR7 = (function() {
  var isR7 = navigator.userAgent.indexOf('R7 Build') !== -1;
  return function() {
    return isR7;
  };
})();

Util.isLandscapeMode = function() {
  var rtn = (window.orientation == 90 || window.orientation == -90);
  return Util.isR7() ? !rtn : rtn;
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
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function Renderer() {
	_classCallCheck(this, Renderer);
};

exports["default"] = Renderer;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _consts = __webpack_require__(9);

var ERROR_TYPE = {
	INVALID_DEVICE: 10,
	NO_WEBGL: 11,
	FAIL_IMAGE_LOAD: 12,
	FAIL_BIND_TEXTURE: 13,
	INVALID_RESOURCE: 14,
	RENDERING_CONTEXT_LOST: 15
};

var EVENTS = {
	READY: "ready",
	VIEW_CHANGE: "viewChange",
	ANIMATION_END: "animationEnd",
	ERROR: "error"
};

var PROJECTION_TYPE = {
	EQUIRECTANGULAR: "equirectangular",
	CUBEMAP: "cubemap"
};

module.exports = {
	GYRO_MODE: _consts.GYRO_MODE,
	EVENTS: EVENTS,
	ERROR_TYPE: ERROR_TYPE,
	PROJECTION_TYPE: PROJECTION_TYPE
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _browser = __webpack_require__(3);

var _mathUtil = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Singleton
var screenRotationAngleInst = null;
var refCount = 0;

var ScreenRotationAngle = function () {
	function ScreenRotationAngle() {
		_classCallCheck(this, ScreenRotationAngle);

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
		_browser.window.addEventListener("deviceorientation", this._onDeviceOrientation);
		_browser.window.addEventListener("orientationchange", this._onOrientationChange);
	}

	ScreenRotationAngle.prototype._onDeviceOrientation = function _onDeviceOrientation(e) {
		if (e.beta === null || e.gamma === null) {
			// (Chrome) deviceorientation is fired with invalid information {alpha=null, beta=null, ...} despite of not dispatching it. We skip it.
			return;
		}

		// Radian
		var betaR = _mathUtil.glMatrix.toRadian(e.beta);
		var gammaR = _mathUtil.glMatrix.toRadian(e.gamma);

		/* spinR range = [-180, 180], left side: 0 ~ -180(deg), right side: 0 ~ 180(deg) */
		this._spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));
	};

	ScreenRotationAngle.prototype._onOrientationChange = function _onOrientationChange(e) {
		if (_browser.screen && _browser.screen.orientation && _browser.screen.orientation.angle !== undefined) {
			this._screenOrientationAngle = _browser.screen.orientation.angle;
		} else if (_browser.orientation !== undefined) {
			this._screenOrientationAngle = _browser.orientation >= 0 ? _browser.orientation : 360 + _browser.orientation;
		}
	};

	ScreenRotationAngle.prototype.getRadian = function getRadian() {
		// Join with screen orientation
		// this._testVal = this._spinR + ", " + this._screenOrientationAngle + ", " + window.orientation;
		return this._spinR + _mathUtil.glMatrix.toRadian(this._screenOrientationAngle);
	};

	ScreenRotationAngle.prototype.unref = function unref() {
		if (--refCount > 0) {
			return;
		}

		_browser.window.removeEventListener("deviceorientation", this._onDeviceOrientation);
		_browser.window.removeEventListener("orientationchange", this._onOrientationChange);

		this._spinR = 0;
		this._screenOrientationAngle = 0;
		/* eslint-disable */
		screenRotationAngleInst = null;
		/* eslint-enable */
		refCount = 0;
	};

	return ScreenRotationAngle;
}();

exports["default"] = ScreenRotationAngle;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _posePredictor = __webpack_require__(44);

var _posePredictor2 = _interopRequireDefault(_posePredictor);

var _mathUtil = __webpack_require__(6);

var _mathUtil2 = _interopRequireDefault(_mathUtil);

var _util = __webpack_require__(10);

var _util2 = _interopRequireDefault(_util);

var _browser = __webpack_require__(3);

var _mathUtil3 = __webpack_require__(1);

var _DeviceMotion = __webpack_require__(33);

var _DeviceMotion2 = _interopRequireDefault(_DeviceMotion);

var _ComplementaryFilter = __webpack_require__(32);

var _ComplementaryFilter2 = _interopRequireDefault(_ComplementaryFilter);

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

		_this.filter = new _ComplementaryFilter2["default"](K_FILTER);
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

		// if orientation is not prepared. don't trigger change event
		if (!orientation) {
			return;
		}

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

		if (!orientation) {
			return null;
		}

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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.YawPitchControl = undefined;

var _YawPitchControl = __webpack_require__(31);

var _YawPitchControl2 = _interopRequireDefault(_YawPitchControl);

var _consts = __webpack_require__(9);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _browser = __webpack_require__(29);

var _YawPitchControl = __webpack_require__(17);

var _PanoImageRenderer = __webpack_require__(26);

var _WebGLUtils = __webpack_require__(8);

var _WebGLUtils2 = _interopRequireDefault(_WebGLUtils);

var _consts = __webpack_require__(13);

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
  * @param {String|Image} config.image Input image url or element<ko>입력 이미지 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정한다.)</ko>
  * @param {String|HTMLVideoElement} config.video Input video url or element<ko>입력 비디오 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정한다.)</ko>
  * @param {String} [config.projectionType=equirectangular] The type of projection: equirectangular, cubemap <ko>Projection 유형 : equirectangular, cubemap</ko>
  * @param {Object} config.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 의 레이아웃을 설정한다.</ko>
  * @param {Number} [config.width=width of container] the viewer's width. (in px) <ko>뷰어의 너비 (px 단위)</ko>
  * @param {Number} [config.height=height of container] the viewer's height.(in px) <ko>뷰어의 높이 (px 단위)</ko>
  *
  * @param {Number} [config.yaw=0] Initial Yaw of camera (in degree) <ko>카메라의 초기 Yaw (degree 단위)</ko>
  * @param {Number} [config.pitch=0] Initial Pitch of camera (in degree) <ko>카메라의 초기 Pitch (degree 단위)</ko>
  * @param {Number} [config.fov=65] Initial vertical field of view of camera (in degree) <ko>카메라의 초기 수직 field of view (degree 단위)</ko>
  * @param {Boolean} [config.showPolePoint=false] If false, the pole is not displayed inside the viewport <ko>false 인 경우, 극점은 뷰포트 내부에 표시되지 않습니다</ko>
  * @param {Boolean} [config.useZoom=true] When true, enables zoom with the wheel and Pinch gesture <ko>true 일 때 휠 및 집기 제스춰로 확대 / 축소 할 수 있습니다.</ko>
  * @param {Boolean} [config.useKeyboard=true] When true, enables the keyboard move key control: awsd, arrow keys <ko>true 이면 키보드 이동 키 컨트롤을 활성화합니다: awsd, 화살표 키</ko>
  * @param {String} [config.gyroMode=yawPitch] Enables control through device motion. ("none", "yawPitch") <ko>디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch") </ko>
  * @param {Array} [config.yawRange=[-180, 180]] Range of controllable Yaw values <ko>제어 가능한 Yaw 값의 범위</ko>
  * @param {Array} [config.pitchRange=[-90, 90]] Range of controllable Pitch values <ko>제어 가능한 Pitch 값의 범위</ko>
  * @param {Array} [config.fovRange=[30, 110]] Range of controllable vertical field of view values <ko>제어 가능한 수직 field of view 값의 범위</ko>
  * @param {Number} [config.touchDirection= PanoViewer.TOUCH_DIRECTION.ALL(6)] Direction of touch that can be controlled by user {@link eg.PanoViewer.TOUCH_DIRECTION}<ko>사용자가 터치로 조작 가능한 방향 {@link eg.PanoViewer.TOUCH_DIRECTION}</ko>
  */
	function PanoViewer(container) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, PanoViewer);

		// Raises the error event if webgl is not supported.
		var _this = _possibleConstructorReturn(this, _Component.call(this));

		if (!_WebGLUtils2["default"].isWebGLAvailable()) {
			var _ret;

			setTimeout(function () {
				_this.trigger(_consts.EVENTS.ERROR, {
					type: _consts.ERROR_TYPE.NO_WEBGL,
					message: "no webgl support"
				});
			}, 0);
			return _ret = _this, _possibleConstructorReturn(_this, _ret);
		}

		if (!_WebGLUtils2["default"].isStableWebGL()) {
			var _ret2;

			setTimeout(function () {
				_this.trigger(_consts.EVENTS.ERROR, {
					type: _consts.ERROR_TYPE.INVALID_DEVICE,
					message: "blacklisted browser"
				});
			}, 0);

			return _ret2 = _this, _possibleConstructorReturn(_this, _ret2);
		}

		if (!!options.image && !!options.video) {
			var _ret3;

			setTimeout(function () {
				_this.trigger(_consts.EVENTS.ERROR, {
					type: _consts.ERROR_TYPE.INVALID_RESOURCE,
					message: "Specifying multi resouces(both image and video) is not valid."
				});
			}, 0);
			return _ret3 = _this, _possibleConstructorReturn(_this, _ret3);
		}

		_this._container = container;
		_this._image = options.image || options.video;
		_this._isVideo = !!options.video;
		_this._projectionType = options.projectionType || _consts.PROJECTION_TYPE.EQUIRECTANGULAR;
		_this._cubemapConfig = _extends({
			order: "RLUDBF",
			tileConfig: {
				flipHirozontal: false,
				rotation: 0
			}
		}, options.cubemapConfig);

		// If the width and height are not provided, will use the size of the container.
		_this._width = options.width || parseInt(window.getComputedStyle(container).width, 10);
		_this._height = options.height || parseInt(window.getComputedStyle(container).height, 10);

		_this._yaw = options.yaw || 0;
		_this._pitch = options.pitch || 0;
		_this._fov = options.fov || 65;

		_this._gyroMode = options.gyroMode || _consts.GYRO_MODE.YAWPITCH;
		_this._quaternion = null;

		_this._aspectRatio = _this._width / _this._height;
		var fovRange = options.fovRange || [30, 110];
		var touchDirection = PanoViewer._isValidTouchDirection(options.touchDirection) ? options.touchDirection : _YawPitchControl.YawPitchControl.TOUCH_DIRECTION_ALL;
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
 	* Getting the video element that the viewer is currently playing. You can use this for playback.
 	* @ko 뷰어가 현재 사용 중인 비디오 요소를 얻습니다. 이 요소를 이용해 비디오의 컨트롤을 할 수 있습니다.
 	* @method eg.view360.PanoViewer#getVideo
 	* @return {HTMLVideoElement} HTMLVideoElement<ko>HTMLVideoElement</ko>
 	*/


	PanoViewer.prototype.getVideo = function getVideo() {
		if (!this._isVideo) {
			return null;
		}

		return this._photoSphereRenderer.getContent();
	};

	/**
  * Setting the video information to be used by the viewer.
  * @ko 뷰어가 사용할 이미지 정보를 설정 합니다.
  * @method eg.view360.PanoViewer#setVideo
  * @param {String|HTMLVideoElement|Object} video Input video url or element or config object<ko>입력 비디오 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정한다.)</ko>
  * @param {Object} param
  * @param {String} [param.projectionType="equirectangular"] Projection Type<ko>프로젝션 타입</ko>
  * @param {Object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 의 레이아웃을 설정한다.</ko>
  *
  * @return {PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
  */


	PanoViewer.prototype.setVideo = function setVideo(video) {
		var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		if (!video) {
			return this;
		}

		this.setImage(video, {
			projectionType: param.projectionType,
			isVideo: true,
			cubemapConfig: param.cubemapConfig
		});
		return this;
	};

	/**
  * Getting the image information that the viewer is currently using.
  * @ko 뷰어가 현재 사용하고있는 이미지 정보를 얻습니다.
  * @method eg.view360.PanoViewer#getImage
  * @return {Image} Image Object<ko>이미지 객체</ko>
  */


	PanoViewer.prototype.getImage = function getImage() {
		if (this._isVideo) {
			return null;
		}

		return this._photoSphereRenderer.getContent();
	};

	/**
  * Setting the image information to be used by the viewer.
  * @ko 뷰어가 사용할 이미지 정보를 설정 합니다.
  * @method eg.view360.PanoViewer#setImage
  * @param {String|Image|Object} image Input image url or element or config object<ko>입력 이미지 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정한다.)</ko>
  * @param {Object} param Additional information<ko>이미지 추가 정보</ko>
  * @param {String} [param.projectionType="equirectangular"] Projection Type<ko>프로젝션 타입</ko>
  * @param {Object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 의 레이아웃을 설정한다.</ko>
  *
  * @return {PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
  */


	PanoViewer.prototype.setImage = function setImage(image) {
		var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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

		if (!image) {
			return this;
		}

		this._image = image;
		this._isVideo = isVideo;
		this._projectionType = param.projectionType || _consts.PROJECTION_TYPE.EQUIRECTANGULAR;
		this._cubemapConfig = cubemapConfig;

		this._deactivate();
		this._initRenderer(this._yaw, this._pitch, this._fov, this._projectionType, this._cubemapConfig);

		return this;
	};

	/**
  * Can set whether the renderer always updates the texture and renders.
  * @ko 렌더러가 항상 텍스쳐를 갱신하고 화면을 렌더링 할지 여부를 설정할 수 있다.
  *
  * @method eg.view360.PanoViewer#keepUpdate
  * @param {Boolean} doUpdate When true, viewer will always update texture and render, when false viewer will not update texture and render only camera config is changed.<ko>True면, 항상 텍스쳐를 갱신하고 화면을 그린다. False 면 텍스쳐 갱신은 하지 않으며, 카메라 요소에 변화가 있을 때에만 화면을 그린다.</ko>
  */


	PanoViewer.prototype.keepUpdate = function keepUpdate(doUpdate) {
		this._photoSphereRenderer.keepUpdate(doUpdate);
		return this;
	};

	/**
  * Get projection type (equirectangular/cube)
  * @ko 프로젝션 타입(Equirectangular 혹은 Cube)을 반환한다.
  *
  * @method eg.view360.PanoViewer#getProjectionType
  */


	PanoViewer.prototype.getProjectionType = function getProjectionType() {
		return this._projectionType;
	};

	PanoViewer.prototype._initRenderer = function _initRenderer(yaw, pitch, fov, projectionType, cubemapConfig) {
		var _this2 = this;

		this._photoSphereRenderer = new _PanoImageRenderer.PanoImageRenderer(this._image, this._width, this._height, this._isVideo, {
			initialYaw: yaw,
			initialPitch: pitch,
			fieldOfView: fov,
			imageType: projectionType,
			cubemapConfig: cubemapConfig
		});

		this._bindRendererHandler();

		this._photoSphereRenderer.bindTexture().then(function () {
			return _this2._activate();
		}, function () {
			_this2._triggerEvent(_consts.EVENTS.ERROR, {
				type: _consts.ERROR_TYPE.FAIL_BIND_TEXTURE,
				message: "failed to bind texture"
			});
		});
	};

	PanoViewer.prototype._bindRendererHandler = function _bindRendererHandler() {
		var _this3 = this;

		this._photoSphereRenderer.on(_PanoImageRenderer.PanoImageRenderer.EVENTS.ERROR, function (e) {
			_this3.trigger(_consts.EVENTS.ERROR, e);
		});

		this._photoSphereRenderer.on(_PanoImageRenderer.PanoImageRenderer.EVENTS.RENDERING_CONTEXT_LOST, function (e) {
			_this3._deactivate();
			_this3.trigger(_consts.EVENTS.ERROR, {
				type: _consts.ERROR_TYPE.RENDERING_CONTEXT_LOST,
				message: "webgl rendering context lost"
			});
		});
	};

	PanoViewer.prototype._initYawPitchControl = function _initYawPitchControl(yawPitchConfig) {
		var _this4 = this;

		this._yawPitchControl = new _YawPitchControl.YawPitchControl(yawPitchConfig);

		this._yawPitchControl.on(_consts.EVENTS.ANIMATION_END, function (e) {
			_this4._triggerEvent(_consts.EVENTS.ANIMATION_END, e);
		});

		this._yawPitchControl.on("change", function (e) {
			_this4._yaw = e.yaw;
			_this4._pitch = e.pitch;
			_this4._fov = e.fov;
			_this4._quaternion = e.quaternion;

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
  * Enables control through device motion. ("none", "yawPitch")
  * @ko 디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch")
  * @method eg.view360.PanoViewer#setGyroMode
  * @param {String} gyroMode
  */


	PanoViewer.prototype.setGyroMode = function setGyroMode(gyroMode) {
		this._yawPitchControl.option("gyroMode", gyroMode);
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
		if (!this._isReady) {
			return;
		}
		this._width = size && size.width || parseInt(window.getComputedStyle(this._container).width, 10);
		this._height = size && size.height || parseInt(window.getComputedStyle(this._container).height, 10);
		this._aspectRatio = this._width / this._height;
		this._photoSphereRenderer.updateViewportDimensions(this._width, this._height);
		this._yawPitchControl.option("aspectRatio", this._aspectRatio);

		this.lookAt({}, 0);
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


	PanoViewer.prototype.lookAt = function lookAt(orientation, duration) {
		if (!this._isReady) {
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

		this._yawPitchControl.lookAt({ yaw: yaw, pitch: pitch, fov: fov }, duration);

		if (duration === 0) {
			this._photoSphereRenderer.render(yaw, pitch, fov);
		}
	};

	PanoViewer.prototype._activate = function _activate() {
		this._photoSphereRenderer.attachTo(this._container);
		this._yawPitchControl.enable();

		this.updateViewportDimensions();

		this._isReady = true;
		this._triggerEvent(_consts.EVENTS.READY);
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
		if (this._photoSphereRenderer) {
			if (this._quaternion) {
				this._photoSphereRenderer.renderWithQuaternion(this._quaternion, this._fov);
			} else {
				this._photoSphereRenderer.render(this._yaw, this._pitch, this._fov);
			}
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
  */


	PanoViewer.prototype._deactivate = function _deactivate() {
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
  * @ko 사용자가 조작가능한 터치 방향을 지정한다.
  * @method eg.view360.PanoViewer#setTouchDirection
  * @param {Number} direction of the touch. {@link eg.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.PanoViewer.TOUCH_DIRECTION}</ko>
  * @return {eg.PanoViewer} PanoViewer instance
  * @example
  *
  * panoViewer = new PanoViewer(el);
  * // Limit the touch direction to the yaw direction only.
  * panoViewer.setTouchDirection(PanoViewer.TOUCH_DIRECTION.YAW);
  */


	PanoViewer.prototype.setTouchDirection = function setTouchDirection(direction) {
		if (PanoViewer._isValidTouchDirection(direction)) {
			this._yawPitchControl.option("touchDirection", direction);
		}

		return this;
	};

	/**
  * Returns touch direction by which user can control
  * @ko 사용자가 조작가능한 터치 방향을 반환한다.
  * @method eg.view360.PanoViewer#getTouchDirection
  * @return {Number} direction of the touch. {@link eg.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.PanoViewer.TOUCH_DIRECTION}</ko>
  * @example
  *
  * panoViewer = new PanoViewer(el);
  * // Returns the current touch direction.
  * var dir = panoViewer.getTouchDirection();
  */


	PanoViewer.prototype.getTouchDirection = function getTouchDirection() {
		return this._yawPitchControl.option("touchDirection");
	};

	/**
  * Destroy viewer. Remove all registered event listeners and remove viewer canvas.
  * @ko 뷰어 인스턴스를 해제합니다. 모든 등록된 이벤트리스너를 제거하고 뷰어 캔버스를 삭제한다.
  * @method eg.view360.PanoViewer#destroy
  */


	PanoViewer.prototype.destroy = function destroy() {
		this._deactivate();

		if (this._yawPitchControl) {
			this._yawPitchControl.destroy();
			this._yawPitchControl = null;
		}
	};

	PanoViewer.isWebGLAvailable = function isWebGLAvailable() {
		return _WebGLUtils2["default"].isWebGLAvailable();
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
		if (!_browser.DeviceMotionEvent) {
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
PanoViewer.ProjectionType = _consts.PROJECTION_TYPE;
/**
 * Constant value for touch directions
 * @ko 터치 방향에 대한 상수 값.
 * @namespace
 * @name TOUCH_DIRECTION
 * @memberof eg.PanoViewer
 */
PanoViewer.TOUCH_DIRECTION = {
	/**
  * Constant value for none direction.
  * @ko none 방향에 대한 상수 값.
  * @name NONE
  * @memberof eg.PanoViewer.TOUCH_DIRECTION
  * @constant
  * @type {Number}
  * @default 1
  */
	NONE: _YawPitchControl.YawPitchControl.TOUCH_DIRECTION_NONE,
	/**
  * Constant value for horizontal(yaw) direction.
  * @ko horizontal(yaw) 방향에 대한 상수 값.
  * @name YAW
  * @memberof eg.PanoViewer.TOUCH_DIRECTION
  * @constant
  * @type {Number}
  * @default 6
  */
	YAW: _YawPitchControl.YawPitchControl.TOUCH_DIRECTION_YAW,
	/**
  * Constant value for vertical direction.
  * @ko vertical(pitch) 방향에 대한 상수 값.
  * @name PITCH
  * @memberof eg.PanoViewer.TOUCH_DIRECTION
  * @constant
  * @type {Number}
  * @default 24
  */
	PITCH: _YawPitchControl.YawPitchControl.TOUCH_DIRECTION_PITCH,
	/**
  * Constant value for all direction.
  * @ko all 방향에 대한 상수 값.
  * @name ALL
  * @memberof eg.PanoViewer.TOUCH_DIRECTION
  * @constant
  * @type {Number}
  * @default 30
  */
	ALL: _YawPitchControl.YawPitchControl.TOUCH_DIRECTION_ALL
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.PanoViewer = undefined;

var _PanoViewer = __webpack_require__(18);

var _PanoViewer2 = _interopRequireDefault(_PanoViewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.PanoViewer = _PanoViewer2["default"];

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(5).Promise : Promise;

var STATUS = {
	"NONE": 0,
	"LOADING": 1,
	"LOADED": 2,
	"ERROR": 3
};

var EVENT = {
	"READYSTATECHANGE": "readystatechange"
};

var ImageLoader = function (_Component) {
	_inherits(ImageLoader, _Component);

	function ImageLoader(image) {
		_classCallCheck(this, ImageLoader);

		var _this = _possibleConstructorReturn(this, _Component.call(this));
		// Super constructor


		_this._image = null;
		_this._onceHandlers = [];
		_this._loadStatus = STATUS.NONE;

		image && _this.set(image);
		return _this;
	}

	ImageLoader.prototype.get = function get() {
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


	ImageLoader.prototype.set = function set(image) {
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

	ImageLoader.prototype.getElement = function getElement() {
		return this._image.length === 1 ? this._image[0] : this._image;
	};

	ImageLoader.isMaybeLoaded = function isMaybeLoaded(image) {
		return image instanceof Image ? image.complete && image.naturalWidth !== 0 : !image.some(function (img) {
			return !img.complete || img.naturalWidth === 0;
		});
	};

	ImageLoader.prototype.onceLoaded = function onceLoaded(target, onload, onerror) {
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

	ImageLoader.prototype._once = function _once(target, type, listener) {
		var fn = function fn(event) {
			target.removeEventListener(type, fn);
			listener(event);
		};

		target.addEventListener(type, fn);
		this._onceHandlers.push({ target: target, type: type, fn: fn });
	};

	ImageLoader.prototype.getStatus = function getStatus() {
		return this._loadStatus;
	};

	ImageLoader.prototype.destroy = function destroy() {
		this._onceHandlers.forEach(function (handler) {
			handler.target.removeEventListener(handler.type, handler.fn);
		});
		this._onceHandlers = [];
		this._image.src = "";
		this._image = null;
		this._loadStatus = STATUS.NONE;
	};

	return ImageLoader;
}(_component2["default"]);

exports["default"] = ImageLoader;


ImageLoader.STATUS = STATUS;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _ImageLoader = __webpack_require__(22);

var _ImageLoader2 = _interopRequireDefault(_ImageLoader);

var _VideoLoader = __webpack_require__(24);

var _VideoLoader2 = _interopRequireDefault(_VideoLoader);

var _WebGLUtils = __webpack_require__(8);

var _WebGLUtils2 = _interopRequireDefault(_WebGLUtils);

var _CubeRenderer = __webpack_require__(27);

var _CubeRenderer2 = _interopRequireDefault(_CubeRenderer);

var _SphereRenderer = __webpack_require__(28);

var _SphereRenderer2 = _interopRequireDefault(_SphereRenderer);

var _mathUtil = __webpack_require__(1);

var _browser = __webpack_require__(25);

var _consts = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(5).Promise : Promise;

var ImageType = _consts.PROJECTION_TYPE;

var DEVICE_PIXEL_RATIO = _browser.devicePixelRatio || 1;

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

	function PanoImageRenderer(image, width, height, isVideo, sphericalConfig, renderingContextAttributes) {
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
		_this._renderingContextAttributes = renderingContextAttributes;
		_this._image = null;
		_this._imageConfig = null;
		_this._imageIsReady = false;
		_this._shouldForceDraw = false;
		_this._keepUpdate = false; // Flag to specify 'continuous update' on video even when still.

		_this._onContentLoad = _this._onContentLoad.bind(_this);
		_this._onContentError = _this._onContentError.bind(_this);

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

	PanoImageRenderer.prototype.getContent = function getContent() {
		return this._image;
	};

	PanoImageRenderer.prototype.setImage = function setImage(_ref) {
		var image = _ref.image,
		    imageType = _ref.imageType,
		    _ref$isVideo = _ref.isVideo,
		    isVideo = _ref$isVideo === undefined ? false : _ref$isVideo,
		    cubemapConfig = _ref.cubemapConfig;

		this._imageIsReady = false;
		this._isVideo = isVideo;
		this._imageConfig = _extends({
			order: "RLUDBF",
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
			this._contentLoader = new _VideoLoader2["default"]();
			this._keepUpdate = true;
		} else {
			this._contentLoader = new _ImageLoader2["default"]();
			this._keepUpdate = false;
		}

		// img element or img url
		this._contentLoader.set(image);

		// 이미지의 사이즈를 캐시한다.
		// image is reference for content in contentLoader, so it may be not valid if contentLoader is destroyed.
		this._image = this._contentLoader.getElement();

		return this._contentLoader.get().then(this._onContentLoad, this._onContentError)["catch"](function (e) {
			return setTimeout(function () {
				throw e;
			});
		}); // Prevent exceptions from being isolated in promise chain.
	};

	PanoImageRenderer.prototype._setImageType = function _setImageType(imageType) {
		if (!imageType || this._imageType === imageType) {
			return;
		}

		this._imageType = imageType;
		this._isCubeMap = imageType === ImageType.CUBEMAP;
		this._renderer = this._isCubeMap ? _CubeRenderer2["default"] : _SphereRenderer2["default"];
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

		this._onWebglcontextlost = this._onWebglcontextlost.bind(this);
		this._onWebglcontextrestored = this._onWebglcontextrestored.bind(this);

		canvas.addEventListener("webglcontextlost", this._onWebglcontextlost);
		canvas.addEventListener("webglcontextrestored", this._onWebglcontextrestored);

		return canvas;
	};

	PanoImageRenderer.prototype._onContentError = function _onContentError(error) {
		this._imageIsReady = false;
		this._image = null;
		this.trigger(EVENTS.ERROR, {
			type: ERROR_TYPE.FAIL_IMAGE_LOAD,
			message: "failed to load image"
		});

		return false;
	};

	PanoImageRenderer.prototype._triggerContentLoad = function _triggerContentLoad() {
		this.trigger(EVENTS.IMAGE_LOADED, {
			content: this._image,
			isVideo: this._isVideo,
			projectionType: this._imageType
		});
	};

	PanoImageRenderer.prototype._onContentLoad = function _onContentLoad(image) {
		this._imageIsReady = true;

		this._triggerContentLoad();
		return true;
	};

	PanoImageRenderer.prototype.isImageLoaded = function isImageLoaded() {
		return !!this._image && this._imageIsReady && (!this._isVideo || this._image.readyState >= 2 /* HAVE_CURRENT_DATA */);
	};

	PanoImageRenderer.prototype.bindTexture = function bindTexture() {
		var _this2 = this;

		return new _Promise(function (res, rej) {
			if (!_this2._contentLoader) {
				rej("ImageLoader is not initialized");
				return;
			}

			_this2._contentLoader.get().then(function () {
				return _this2._bindTexture();
			}, rej).then(res);
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

	PanoImageRenderer.prototype.destroy = function destroy() {
		if (this._contentLoader) {
			this._contentLoader.destroy();
		}

		this.detach();
		this.forceContextLoss();

		this.off();

		this.canvas.removeEventListener("webglcontextlost", this._onWebglcontextlost);
		this.canvas.removeEventListener("webglcontextrestored", this._onWebglcontextrestored);
	};

	PanoImageRenderer.prototype.hasRenderingContext = function hasRenderingContext() {
		if (!(this.context && !this.context.isContextLost())) {
			return false;
		} else if (this.context && !this.context.getProgramParameter(this.shaderProgram, this.context.LINK_STATUS)) {
			return false;
		}
		return true;
	};

	PanoImageRenderer.prototype._onWebglcontextlost = function _onWebglcontextlost(e) {
		e.preventDefault();
		this.trigger(EVENTS.RENDERING_CONTEXT_LOST);
	};

	PanoImageRenderer.prototype._onWebglcontextrestored = function _onWebglcontextrestored(e) {
		this._initWebGL();
		this.trigger(EVENTS.RENDERING_CONTEXT_RESTORE);
	};

	PanoImageRenderer.prototype.updateFieldOfView = function updateFieldOfView(fieldOfView) {
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

			// Buffers for shader
			this._initBuffers();
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
		var textureTarget = this._isCubeMap ? this.context.TEXTURE_CUBE_MAP : this.context.TEXTURE_2D;

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

		this.context = _WebGLUtils2["default"].getWebglContext(this.canvas, this._renderingContextAttributes);

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
		shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
		gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

		// clear buffer
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
		// Use TEXTURE0
		gl.uniform1i(shaderProgram.samplerUniform, 0);

		return shaderProgram;
	};

	PanoImageRenderer.prototype._initBuffers = function _initBuffers() {
		var vertexPositionData = this._renderer.getVertexPositionData();
		var indexData = this._renderer.getIndexData();
		var textureCoordData = this._renderer.getTextureCoordData(this._imageConfig);
		var gl = this.context;

		this.vertexBuffer = _WebGLUtils2["default"].initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), 3, this.shaderProgram.vertexPositionAttribute);

		this.indexBuffer = _WebGLUtils2["default"].initBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), 1);

		this.textureCoordBuffer = _WebGLUtils2["default"].initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(textureCoordData), this._isCubeMap ? 3 : 2, this.shaderProgram.textureCoordAttribute);
	};

	PanoImageRenderer.prototype._bindTexture = function _bindTexture() {
		this._renderer.bindTexture(this.context, this.texture, this._image, this._imageConfig);
		this._shouldForceDraw = true;

		this.trigger(EVENTS.BIND_TEXTURE);
	};

	PanoImageRenderer.prototype._updateTexture = function _updateTexture() {
		this._renderer.updateTexture(this.context, this._image, this._imageConfig);
	};

	PanoImageRenderer.prototype.keepUpdate = function keepUpdate(doUpdate) {
		if (doUpdate && this.isImageLoaded() === false) {
			// Force to draw a frame after image is loaded on render()
			this._shouldForceDraw = true;
		}

		this._keepUpdate = doUpdate;
	};

	PanoImageRenderer.prototype.renderWithQuaternion = function renderWithQuaternion(quaternion, fieldOfView) {
		if (!this.isImageLoaded()) {
			return;
		}

		if (this._keepUpdate === false && this._lastQuaternion && _mathUtil.quat.exactEquals(this._lastQuaternion, quaternion) && this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
			return;
		}

		// updatefieldOfView only if fieldOfView is changed.
		if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
			this.updateFieldOfView(fieldOfView);
		}

		var outQ = void 0;

		if (!this._isCubeMap) {
			// TODO: Remove this yaw revision by correcting shader
			outQ = _mathUtil.quat.rotateY(_mathUtil.quat.create(), quaternion, _mathUtil.glMatrix.toRadian(90));
		} else {
			outQ = quaternion;
		}

		this.mvMatrix = _mathUtil.mat4.fromQuat(_mathUtil.mat4.create(), outQ);

		this._draw();

		this._lastQuaternion = _mathUtil.quat.clone(quaternion);
		if (this._shouldForceDraw) {
			this._shouldForceDraw = false;
		}
	};

	PanoImageRenderer.prototype.render = function render(yaw, pitch, fieldOfView) {
		if (!this.isImageLoaded()) {
			return;
		}

		if (this._keepUpdate === false && this._lastYaw !== null && this._lastYaw === yaw && this._lastPitch !== null && this._lastPitch === pitch && this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
			return;
		}

		// fieldOfView 가 존재하면서 기존의 값과 다를 경우에만 업데이트 호출
		if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
			this.updateFieldOfView(fieldOfView);
		}

		_mathUtil.mat4.identity(this.mvMatrix);
		_mathUtil.mat4.rotateX(this.mvMatrix, this.mvMatrix, -_mathUtil.glMatrix.toRadian(pitch));
		_mathUtil.mat4.rotateY(this.mvMatrix, this.mvMatrix, -_mathUtil.glMatrix.toRadian(yaw - (this._isCubeMap ? 0 : 90)));

		this._draw();

		this._lastYaw = yaw;
		this._lastPitch = pitch;
		if (this._shouldForceDraw) {
			this._shouldForceDraw = false;
		}
	};

	PanoImageRenderer.prototype._draw = function _draw() {
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

	return PanoImageRenderer;
}(_component2["default"]);

exports["default"] = PanoImageRenderer;


PanoImageRenderer.EVENTS = EVENTS;
PanoImageRenderer.ERROR_TYPE = ERROR_TYPE;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(5).Promise : Promise;

// import Agent from "@egjs/agent";

/* Ref https://www.w3schools.com/tags/av_prop_readystate.asp */
var READY_STATUS = {
	HAVE_NOTHING: 0, // no information whether or not the audio/video is ready
	HAVE_METADATA: 1, // HAVE_METADATA - metadata for the audio/video is ready
	HAVE_CURRENT_DATA: 2, // data for the current playback position is available, but not enough data to play next frame/millisecond
	HAVE_FUTURE_DATA: 3, // data for the current and at least the next frame is available
	HAVE_ENOUGH_DATA: 4, // enough data available to start playing
	// below is custom status for failed to load status
	LOADING_FAILED: -1
};

var READYSTATECHANGE_EVENT_NAME = {};

READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_METADATA] = "loadedmetadata";
READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_CURRENT_DATA] = "loadeddata";
READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_FUTURE_DATA] = "canplay";
READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_ENOUGH_DATA] = "canplaythrough";

var VideoLoader = function () {
	function VideoLoader(video) {
		_classCallCheck(this, VideoLoader);

		this._handlers = [];
		this._sourceCount = 0;

		// on iOS safari, 'loadeddata' will not triggered unless the user hits play,
		// so used 'loadedmetadata' instead.
		this._thresholdReadyState = READY_STATUS.HAVE_METADATA;
		this._thresholdEventName = READYSTATECHANGE_EVENT_NAME[this._thresholdReadyState];

		this._loadStatus = video && video.readyState || READY_STATUS.HAVE_NOTHING;

		this._onerror = this._onerror.bind(this);

		video && this.set(video);
	}

	VideoLoader.prototype._onerror = function _onerror() {
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


	VideoLoader.prototype._appendSourceElement = function _appendSourceElement(videoUrl) {
		var videoSrc = void 0;
		var videoType = void 0;

		if ((typeof videoUrl === "undefined" ? "undefined" : _typeof(videoUrl)) === "object") {
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

	VideoLoader.prototype.set = function set(video) {
		var _this = this;

		this._reset(); // reset resources.

		if (!video) {
			return;
		}

		if (video instanceof HTMLVideoElement) {
			// video tag
			this._video = video;
		} else if (typeof video === "string" || (typeof video === "undefined" ? "undefined" : _typeof(video)) === "object") {
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
					this._video.load();
					// attach loading error listener
					this._attachErrorHandler(this._onerror);
				}
			} else {
				this._video = null;
			}
		}
	};

	VideoLoader.prototype._attachErrorHandler = function _attachErrorHandler(handler) {
		this._video.addEventListener("error", handler);
		this._sources = this._video.querySelectorAll("source");
		[].forEach.call(this._sources, function (source) {
			source.addEventListener("error", handler);
		});
	};

	VideoLoader.prototype._detachErrorHandler = function _detachErrorHandler(handler) {
		this._video.removeEventListener("error", handler);
		[].forEach.call(this._sources, function (source) {
			source.removeEventListener("error", handler);
		});
	};

	VideoLoader.prototype.get = function get() {
		var _this2 = this;

		return new _Promise(function (res, rej) {
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

	VideoLoader.prototype.getElement = function getElement() {
		return this._video;
	};

	VideoLoader.prototype.destroy = function destroy() {
		this._reset();
	};

	VideoLoader.prototype._reset = function _reset() {
		var _this3 = this;

		this._handlers.forEach(function (handler) {
			_this3._video.removeEventListener(handler.type, handler.fn);
		});
		this._handlers = [];
		this._video = null;

		this._sourceCount = 0;
		this._errorCount = 0;
	};

	VideoLoader.prototype._once = function _once(type, listener) {
		var target = this._video;

		var fn = function fn(event) {
			target.removeEventListener(type, fn);
			listener(event);
		};

		/* By useCapture mode enabled, you can capture the error event being fired on source(child)*/
		target.addEventListener(type, fn, true);
		this._handlers.push({ type: type, fn: fn });
	};

	return VideoLoader;
}();

exports["default"] = VideoLoader;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var userAgent = exports.userAgent = window.navigator.userAgent;
var devicePixelRatio = exports.devicePixelRatio = window.devicePixelRatio;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.WebGLUtils = exports.PanoImageRenderer = undefined;

var _PanoImageRenderer = __webpack_require__(23);

var _PanoImageRenderer2 = _interopRequireDefault(_PanoImageRenderer);

var _WebGLUtils = __webpack_require__(8);

var _WebGLUtils2 = _interopRequireDefault(_WebGLUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.PanoImageRenderer = _PanoImageRenderer2["default"];
exports.WebGLUtils = _WebGLUtils2["default"];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _agent = __webpack_require__(4);

var _agent2 = _interopRequireDefault(_agent);

var _Renderer2 = __webpack_require__(12);

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
		-1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1,

		// bottom
		1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1,

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

	CubeRenderer.extractTileConfig = function extractTileConfig(imageConfig) {
		var tileConfig = Array.isArray(imageConfig.tileConfig) ? imageConfig.tileConfig : Array.apply(undefined, Array(6)).map(function () {
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

	CubeRenderer.extractOrder = function extractOrder(imageConfig) {
		return imageConfig.order || "RLUDBF";
	};

	CubeRenderer.getTextureCoordData = function getTextureCoordData(imageConfig) {
		var vertexOrder = "BFUDRL";
		var order = CubeRenderer.extractOrder(imageConfig);
		var base = CubeRenderer.getVertexPositionData();
		var tileConfig = CubeRenderer.extractTileConfig(imageConfig);
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

	CubeRenderer.getVertexShaderSource = function getVertexShaderSource() {
		return "\n\t\t\tattribute vec3 aVertexPosition;\n\t\t\tattribute vec3 aTextureCoord;\n\t\t\tuniform mat4 uMVMatrix;\n\t\t\tuniform mat4 uPMatrix;\n\t\t\tvarying highp vec3 vVertexDirectionVector;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\t\t\t\tvVertexDirectionVector = aTextureCoord;\n\t\t\t}";
	};

	CubeRenderer.getFragmentShaderSource = function getFragmentShaderSource() {
		return "\n\t\t\tvarying highp vec3 vVertexDirectionVector;\n\t\t\tuniform samplerCube uSampler;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_FragColor = textureCube(uSampler, vVertexDirectionVector);\n\t\t\t}";
	};

	CubeRenderer.updateTexture = function updateTexture(gl, image, imageConfig) {
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

					gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + surfaceIdx, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image[tileIdx]);
				}
			} else {
				var maxCubeMapTextureSize = CubeRenderer.getMaxCubeMapTextureSize(gl, image);

				for (var _surfaceIdx = 0; _surfaceIdx < 6; _surfaceIdx++) {
					var _tileIdx = orderMap[baseOrder[_surfaceIdx]];
					var tile = CubeRenderer.extractTileFromImage(image, _tileIdx, maxCubeMapTextureSize);

					gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + _surfaceIdx, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tile);
				}
			}
		} catch (e) {}
	};

	CubeRenderer.bindTexture = function bindTexture(gl, texture, image, imageConfig) {
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
		CubeRenderer.updateTexture(gl, image, imageConfig);
	};

	CubeRenderer._getDimension = function _getDimension(pixelSource) {
		var width = pixelSource.naturalWidth || pixelSource.videoWidth;
		var height = pixelSource.naturalHeight || pixelSource.videoHeight;

		return { width: width, height: height };
	};

	CubeRenderer.getSourceTileSize = function getSourceTileSize(image) {
		var _getDimension2 = this._getDimension(image),
		    width = _getDimension2.width,
		    height = _getDimension2.height;

		var aspectRatio = width / height;
		var inputTextureSize = void 0;

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

	CubeRenderer.extractTileFromImage = function extractTileFromImage(image, tileIdx, outputTextureSize) {
		var _getDimension3 = this._getDimension(image),
		    width = _getDimension3.width;

		var inputTextureSize = CubeRenderer.getSourceTileSize(image);

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

	CubeRenderer.getMaxCubeMapTextureSize = function getMaxCubeMapTextureSize(gl, image) {
		var agent = (0, _agent2["default"])();
		var maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
		var _imageWidth = CubeRenderer.getSourceTileSize(image);

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

	return CubeRenderer;
}(_Renderer3["default"]);

exports["default"] = CubeRenderer;


CubeRenderer._VERTEX_POSITION_DATA = null;
CubeRenderer._INDEX_DATA = null;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _agent = __webpack_require__(4);

var _agent2 = _interopRequireDefault(_agent);

var _Renderer2 = __webpack_require__(12);

var _Renderer3 = _interopRequireDefault(_Renderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var agent = (0, _agent2["default"])();
var isIE11 = agent.browser.name === "ie" && agent.browser.version === "11.0";
var pixelCanvas = void 0;
var pixelContext = void 0;

var SphereRenderer = function (_Renderer) {
	_inherits(SphereRenderer, _Renderer);

	function SphereRenderer() {
		_classCallCheck(this, SphereRenderer);

		return _possibleConstructorReturn(this, _Renderer.apply(this, arguments));
	}

	SphereRenderer.getVertexPositionData = function getVertexPositionData() {
		return SphereRenderer._VERTEX_POSITION_DATA;
	};

	SphereRenderer.getIndexData = function getIndexData() {
		return SphereRenderer._INDEX_DATA;
	};

	SphereRenderer.getTextureCoordData = function getTextureCoordData() {
		return SphereRenderer._TEXTURE_COORD_DATA;
	};

	SphereRenderer.getVertexShaderSource = function getVertexShaderSource() {
		return "\n\t\t\tattribute vec3 aVertexPosition;\n\t\t\tattribute vec2 aTextureCoord;\n\t\t\tuniform mat4 uMVMatrix;\n\t\t\tuniform mat4 uPMatrix;\n\t\t\tvarying highp vec2 vTextureCoord;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\t\t\t\tvTextureCoord = aTextureCoord;\n\t\t\t}";
	};

	SphereRenderer.getFragmentShaderSource = function getFragmentShaderSource() {
		return "\n\t\t\tvarying highp vec2 vTextureCoord;\n\t\t\tuniform sampler2D uSampler;\n\t\t\tvoid main(void) {\n\t\t\t\tgl_FragColor = texture2D(\n\t\t\t\t\tuSampler,\n\t\t\t\t\tvec2(vTextureCoord.s, vTextureCoord.t)\n\t\t\t\t);\n\t\t\t}";
	};

	SphereRenderer._getPixelSource = function _getPixelSource(image) {
		if (!pixelCanvas) {
			return image;
		}

		var _getDimension2 = this._getDimension(image),
		    width = _getDimension2.width,
		    height = _getDimension2.height;

		if (pixelCanvas.width !== width) {
			pixelCanvas.width = width;
		}

		if (pixelCanvas.height !== height) {
			pixelCanvas.height = height;
		}

		pixelContext.drawImage(image, 0, 0);

		return pixelCanvas;
	};

	SphereRenderer._getDimension = function _getDimension(pixelSource) {
		var width = pixelSource.naturalWidth || pixelSource.videoWidth;
		var height = pixelSource.naturalHeight || pixelSource.videoHeight;

		return { width: width, height: height };
	};

	SphereRenderer.updateTexture = function updateTexture(gl, image) {
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._getPixelSource(image));
	};

	SphereRenderer.bindTexture = function bindTexture(gl, texture, image) {
		// Make sure image isn't too big
		var _getDimension3 = this._getDimension(image),
		    width = _getDimension3.width,
		    height = _getDimension3.height;

		var size = Math.max(width, height);
		var maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

		if (size > maxSize) {
			/* eslint-disable no-console */
			console.warn("Image width(" + width + ") exceeds device limit(" + maxSize + "))");
			/* eslint-enable no-console */
			return;
		}

		if (isIE11 && image instanceof HTMLVideoElement) {
			pixelCanvas = document.createElement("canvas");
			pixelCanvas.width = width;
			pixelCanvas.height = height;
			pixelContext = pixelCanvas.getContext("2d");
		}

		gl.activeTexture(gl.TEXTURE0);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.bindTexture(gl.TEXTURE_2D, texture);

		SphereRenderer.updateTexture(gl, image);
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

SphereRenderer._initData();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var win = window;

exports.window = win;
var DeviceMotionEvent = exports.DeviceMotionEvent = win.DeviceMotionEvent;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _FusionPoseSensor = __webpack_require__(15);

var _FusionPoseSensor2 = _interopRequireDefault(_FusionPoseSensor);

var _ScreenRotationAngle = __webpack_require__(14);

var _ScreenRotationAngle2 = _interopRequireDefault(_ScreenRotationAngle);

var _mathUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ORIGIN_VECTOR = _mathUtil.vec3.fromValues(0, 0, 0);
var X_AXIS_VECTOR = _mathUtil.vec3.fromValues(1, 0, 0);
var Y_AXIS_VECTOR = _mathUtil.vec3.fromValues(0, 1, 0);

var DeviceQuaternion = function (_Component) {
	_inherits(DeviceQuaternion, _Component);

	function DeviceQuaternion() {
		_classCallCheck(this, DeviceQuaternion);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this._screenRotationAngle = new _ScreenRotationAngle2["default"]();
		_this._fusionPoseSensor = new _FusionPoseSensor2["default"]();
		_this._quaternion = _mathUtil.quat.create();

		_this._fusionPoseSensor.enable();
		_this._fusionPoseSensor.on("change", function (e) {
			_this._quaternion = e.quaternion;

			_this.trigger("change", { isTrusted: true });
		});
		return _this;
	}

	DeviceQuaternion.prototype.getCombinedQuaternion = function getCombinedQuaternion(yaw, pitch) {
		var deviceR = this._screenRotationAngle.getRadian();

		// rotate x-axis around z-axis about screen rotation angle.
		var pitchAxis = _mathUtil.vec3.rotateZ(_mathUtil.vec3.create(), X_AXIS_VECTOR, ORIGIN_VECTOR, deviceR);
		var yawQ = _mathUtil.quat.setAxisAngle(_mathUtil.quat.create(), Y_AXIS_VECTOR, _mathUtil.glMatrix.toRadian(-yaw));
		// rotate quaternion around new x-axis about pitch angle.
		var pitchQ = _mathUtil.quat.setAxisAngle(_mathUtil.quat.create(), pitchAxis, _mathUtil.glMatrix.toRadian(-pitch));
		var conj = _mathUtil.quat.conjugate(_mathUtil.quat.create(), this._quaternion);
		// Multiply pitch quaternion -> device quaternion -> yaw quaternion
		var outQ = _mathUtil.quat.multiply(_mathUtil.quat.create(), pitchQ, conj);

		_mathUtil.quat.multiply(outQ, outQ, yawQ);
		return outQ;
	};

	DeviceQuaternion.prototype.destroy = function destroy() {
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
}(_component2["default"]);

exports["default"] = DeviceQuaternion;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _axes = __webpack_require__(7);

var _axes2 = _interopRequireDefault(_axes);

var _browser = __webpack_require__(3);

var _WheelInput = __webpack_require__(36);

var _WheelInput2 = _interopRequireDefault(_WheelInput);

var _TiltMotionInput = __webpack_require__(35);

var _TiltMotionInput2 = _interopRequireDefault(_TiltMotionInput);

var _RotationPanInput = __webpack_require__(34);

var _RotationPanInput2 = _interopRequireDefault(_RotationPanInput);

var _DeviceQuaternion = __webpack_require__(30);

var _DeviceQuaternion2 = _interopRequireDefault(_DeviceQuaternion);

var _mathUtil = __webpack_require__(1);

var _consts = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_YAW_RANGE = [-_consts.YAW_RANGE_HALF, _consts.YAW_RANGE_HALF];
var DEFAULT_PITCH_RANGE = [-_consts.PITCH_RANGE_HALF, _consts.PITCH_RANGE_HALF];
var CIRCULAR_PITCH_RANGE = [-_consts.CIRCULAR_PITCH_RANGE_HALF, _consts.CIRCULAR_PITCH_RANGE_HALF];
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
  * @param {String} [config.gyroMode=yawPitch] Enables control through device motion.
  * @param {Number} [options.touchDirection=TOUCH_DIRECTION_ALL] Direction of the touch movement (TOUCH_DIRECTION_ALL: all,  TOUCH_DIRECTION_YAW: horizontal, TOUCH_DIRECTION_PITCH: vertical, TOUCH_DIRECTION_NONE: no move)
  * @param {Array} [options.yawRange=[-180, 180] Range of visible yaw
  * @param {Array} [options.pitchRange=[-90, 90] Range of visible pitch
  * @param {Array} [options.fovRange=[30, 110] Range of FOV
  * @param {Number} [options.aspectRatio=1] Aspect Ratio
  */
	function YawPitchControl(options) {
		_classCallCheck(this, YawPitchControl);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		var opt = _extends({
			element: null,
			yaw: 0,
			pitch: 0,
			fov: 65,
			showPolePoint: false,
			useZoom: true,
			useKeyboard: true,
			gyroMode: _consts.GYRO_MODE.YAWPITCH,
			touchDirection: _consts.TOUCH_DIRECTION_ALL,
			yawRange: DEFAULT_YAW_RANGE,
			pitchRange: DEFAULT_PITCH_RANGE,
			fovRange: [30, 110],
			aspectRatio: 1 /* TODO: Need Mandatory? */
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

	YawPitchControl.prototype._initAxes = function _initAxes(opt) {
		var _this2 = this;

		var yRange = this._updateYawRange(opt.yawRange, opt.fov, opt.aspectRatio);
		var pRange = this._updatePitchRange(opt.pitchRange, opt.fov, opt.showPolePoint);
		var useRotation = opt.gyroMode === _consts.GYRO_MODE.VR;

		this.axesPanInput = new _RotationPanInput2["default"](this._element, { useRotation: useRotation });
		this.axesWheelInput = new _WheelInput2["default"](this._element, { scale: 4 });
		// this.axesTiltMotionInput = SUPPORT_DEVICEMOTION ? new TiltMotionInput(this._element) : null;
		this.axesTiltMotionInput = null;
		this.axesPinchInput = _browser.SUPPORT_TOUCH ? new _axes.PinchInput(this._element, { scale: -1 }) : null;
		this.axesMoveKeyInput = new _axes.MoveKeyInput(this._element, { scale: [-6, 6] });

		this.axes = new _axes2["default"]({
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
			deceleration: _consts.MC_DECELERATION,
			maximumDuration: _consts.MC_MAXIMUM_DURATION
		}, {
			yaw: opt.yaw,
			pitch: opt.pitch,
			fov: opt.fov
		}).on({
			hold: function hold(evt) {
				_this2.trigger("hold", { isTrusted: evt.isTrusted });
			},
			change: function change(evt) {
				if (evt.delta.fov !== 0) {
					_this2._setPanScale(evt.pos.fov);
					_this2._updateControlScale(evt);
				}
				_this2._triggerChange(evt);
			},
			release: function release(evt) {
				_this2._triggerChange(evt);
			},
			animationStart: function animationStart(evt) {},
			animationEnd: function animationEnd(evt) {
				_this2.trigger("animationEnd", { isTrusted: evt.isTrusted });
			}
		});
	};

	YawPitchControl.prototype._setPanScale = function _setPanScale(fov) {
		var areaHeight = parseInt((0, _browser.getComputedStyle)(this._element).height, 10);
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
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var argLen = args.length;

		// Getter
		if (argLen === 0) {
			return this._getOptions();
		} else if (argLen === 1 && typeof args[0] === "string") {
			return this._getOptions(args[0]);
		}

		// Setter
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

	YawPitchControl.prototype._getValidatedOptions = function _getValidatedOptions(newOptions) {
		if (newOptions.yawRange) {
			newOptions.yawRange = this._getValidYawRange(newOptions.yawRange, newOptions.fov, newOptions.aspectRatio);
		}
		if (newOptions.pitchRange) {
			newOptions.pitchRange = this._getValidPitchRange(newOptions.pitchRange, newOptions.fov);
		}
		return newOptions;
	};

	YawPitchControl.prototype._getOptions = function _getOptions(key) {
		var value = void 0;

		if (typeof key === "string") {
			value = this.options[key];
		} else if (arguments.length === 0) {
			value = this.options;
		}
		return value;
	};

	YawPitchControl.prototype._setOptions = function _setOptions(options) {
		for (var key in options) {
			this.options[key] = options[key];
		}
	};

	YawPitchControl.prototype._applyOptions = function _applyOptions(keys, prevOptions) {
		// If one of below is changed, call updateControlScale()
		if (keys.some(function (key) {
			return key === "showPolePoint" || key === "fov" || key === "aspectRatio" || key === "yawRange" || key === "pitchRange";
		})) {
			this._updateControlScale();
		}

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
				}, 0);
				this._updateControlScale();
			}
		}

		if (keys.some(function (key) {
			return key === "gyroMode";
		}) && _browser.SUPPORT_DEVICEMOTION) {
			var gyroMode = this.options.gyroMode;

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

			if (gyroMode === _consts.GYRO_MODE.YAWPITCH) {
				this.axesTiltMotionInput = new _TiltMotionInput2["default"](this._element);
				this.axes.connect(["yaw", "pitch"], this.axesTiltMotionInput);
			} else if (gyroMode === _consts.GYRO_MODE.VR) {
				this._initDeviceQuaternion();
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

		if (keys.some(function (key) {
			return key === "touchDirection";
		})) {
			this._enabled && this._enableTouch(this.options.touchDirection);
		}
	};

	YawPitchControl.prototype._enableTouch = function _enableTouch(direction) {
		var yawEnabled = direction & _consts.TOUCH_DIRECTION_YAW ? "yaw" : null;
		var pitchEnabled = direction & _consts.TOUCH_DIRECTION_PITCH ? "pitch" : null;

		this.axes.connect([yawEnabled, pitchEnabled], this.axesPanInput);
	};

	YawPitchControl.prototype._initDeviceQuaternion = function _initDeviceQuaternion() {
		var _this3 = this;

		this._deviceQuaternion = new _DeviceQuaternion2["default"]();

		this._deviceQuaternion.on("change", function (e) {
			_this3._triggerChange(e);
		});
	};

	YawPitchControl.prototype._getValidYawRange = function _getValidYawRange(newYawRange, newFov, newAspectRatio) {
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

	YawPitchControl.prototype._getValidPitchRange = function _getValidPitchRange(newPitchRange, newFov) {
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


	YawPitchControl.prototype._updateControlScale = function _updateControlScale(changeEvt) {
		var opt = this.options;
		var fov = this.axes.get().fov;

		var pRange = this._updatePitchRange(opt.pitchRange, fov, opt.showPolePoint);
		var yRange = this._updateYawRange(opt.yawRange, fov, opt.aspectRatio);

		// TODO: If not changed!?
		var pos = this.axes.get();
		var y = pos.yaw;
		var p = pos.pitch;

		_mathUtil.vec2.copy(this.axes.axis.yaw.range, yRange);
		_mathUtil.vec2.copy(this.axes.axis.pitch.range, pRange);
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

	YawPitchControl.prototype._updatePitchRange = function _updatePitchRange(pitchRange, fov, showPolePoint) {
		if (this.options.gyroMode === _consts.GYRO_MODE.VR) {
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
		}

		// Round value as movableCood do.
		return [pitchRange[0] + halfFov, pitchRange[1] - halfFov].map(function (v) {
			return +v.toFixed(5);
		});
	};

	YawPitchControl.prototype._updateYawRange = function _updateYawRange(yawRange, fov, aspectRatio) {
		if (this.options.gyroMode === _consts.GYRO_MODE.VR) {
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

	YawPitchControl.prototype._triggerChange = function _triggerChange(evt) {
		var pos = this.axes.get();
		var opt = this.options;
		var event = {
			targetElement: opt.element,
			isTrusted: evt.isTrusted
		};

		event.yaw = pos.yaw;
		event.pitch = pos.pitch;
		event.fov = pos.fov;

		if (opt.gyroMode === _consts.GYRO_MODE.VR) {
			event.quaternion = this._deviceQuaternion.getCombinedQuaternion(pos.yaw, pos.pitch);
		}
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

		// touchDirection is decided by parameter is valid string (Ref. Axes.connect)
		this._enableTouch(this.options.touchDirection);

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
		}, 0);

		return this;
	};

	/**
  * Set one or more of yaw, pitch, fov
  *
  * @param {Object} coordinate yaw, pitch, fov
  * @param {Number} duration Animation duration. if it is above 0 then it's animated.
  */


	YawPitchControl.prototype.lookAt = function lookAt(_ref, duration) {
		var yaw = _ref.yaw,
		    pitch = _ref.pitch,
		    fov = _ref.fov;

		var pos = this.axes.get();

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
		this.axesDeviceOrientationInput && this.axesDeviceOrientationInput.destroy();
		this.axesPinchInput && this.axesPinchInput.destroy();
		this.axesMoveKeyInput && this.axesMoveKeyInput.destroy();
		this._deviceQuaternion && this._deviceQuaternion.destroy();
	};

	return YawPitchControl;
}(_component2["default"]);

YawPitchControl.VERSION = "3.0.0-rc";
exports["default"] = YawPitchControl;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _mathUtil = __webpack_require__(6);

var _mathUtil2 = _interopRequireDefault(_mathUtil);

var _complementaryFilter = __webpack_require__(43);

var _complementaryFilter2 = _interopRequireDefault(_complementaryFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_complementaryFilter2["default"].prototype.run_ = function () {
	if (!this.isOrientationInitialized) {
		this.accelQ = this.accelToQuaternion_(this.currentAccelMeasurement.sample);
		this.previousFilterQ.copy(this.accelQ);
		this.isOrientationInitialized = true;
		return;
	}

	var deltaT = this.currentGyroMeasurement.timestampS - this.previousGyroMeasurement.timestampS;

	// Convert gyro rotation vector to a quaternion delta.
	var gyroDeltaQ = this.gyroToQuaternionDelta_(this.currentGyroMeasurement.sample, deltaT);

	this.gyroIntegralQ.multiply(gyroDeltaQ);

	// filter_1 = K * (filter_0 + gyro * dT) + (1 - K) * accel.
	this.filterQ.copy(this.previousFilterQ);
	this.filterQ.multiply(gyroDeltaQ);

	// Calculate the delta between the current estimated gravity and the real
	// gravity vector from accelerometer.
	var invFilterQ = new _mathUtil2["default"].Quaternion();

	invFilterQ.copy(this.filterQ);
	invFilterQ.inverse();

	this.estimatedGravity.set(0, 0, -1);
	this.estimatedGravity.applyQuaternion(invFilterQ);
	this.estimatedGravity.normalize();

	this.measuredGravity.copy(this.currentAccelMeasurement.sample);
	this.measuredGravity.normalize();

	// Compare estimated gravity with measured gravity, get the delta quaternion
	// between the two.
	var deltaQ = new _mathUtil2["default"].Quaternion();

	deltaQ.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
	deltaQ.inverse();

	// Calculate the SLERP target: current orientation plus the measured-estimated
	// quaternion delta.
	var targetQ = new _mathUtil2["default"].Quaternion();

	targetQ.copy(this.filterQ);
	targetQ.multiply(deltaQ);

	// SLERP factor: 0 is pure gyro, 1 is pure accel.
	this.filterQ.slerp(targetQ, 1 - this.kFilter);

	this.previousFilterQ.copy(this.filterQ);

	if (!this.isFilterQuaternionInitialized) {
		this.isFilterQuaternionInitialized = true;
	}
};

_complementaryFilter2["default"].prototype.getOrientation = function () {
	if (this.isFilterQuaternionInitialized) {
		return this.filterQ;
	} else {
		return null;
	}
};

exports["default"] = _complementaryFilter2["default"];

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _agent = __webpack_require__(4);

var _agent2 = _interopRequireDefault(_agent);

var _mathUtil = __webpack_require__(1);

var _browser = __webpack_require__(3);

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

		_this.isAndroid = (0, _agent2["default"])().os.name === "android";

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
		// desktop chrome triggers devicemotion event with empthy sensor values.
		// Those events should ignored.
		if (e.interval === 0 || e.acceleration.x === null) {
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

	return DeviceMotion;
}(_component2["default"]);

exports["default"] = DeviceMotion;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _axes = __webpack_require__(7);

var _axes2 = _interopRequireDefault(_axes);

var _ScreenRotationAngle = __webpack_require__(14);

var _ScreenRotationAngle2 = _interopRequireDefault(_ScreenRotationAngle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RotationPanInput is extension of PanInput to compensate coordinates by screen rotation angle.
 *
 * The reason for using this function is that in VR mode,
 * the roll angle is adjusted in the direction opposite to the screen rotation angle.
 *
 * Therefore, the angle that the user touches and moves does not match the angle at which the actual object should move.
 * @extends PanInput
 */
var RotationPanInput = function (_PanInput) {
	_inherits(RotationPanInput, _PanInput);

	/**
  * Constructor
  *
  * @private
  * @param {HTMLElement} el target element
  * @param {Object} [options] The option object
  * @param {Boolean} [options.useRotation]  Whether to use rotation(or VR)
  */
	function RotationPanInput(el, options) {
		_classCallCheck(this, RotationPanInput);

		var _this = _possibleConstructorReturn(this, _PanInput.call(this, el, options));

		_this._useRotation = !!(options && options.useRotation);

		_this._screenRotationAngle = null;
		_this._useRotation && (_this._screenRotationAngle = new _ScreenRotationAngle2["default"]());
		_this._userDirection = _axes2["default"].DIRECTION_ALL;
		return _this;
	}

	RotationPanInput.prototype.connect = function connect(observer) {
		// User intetened direction
		this._userDirection = this._direction;

		// In VR Mode, Use ALL direction if direction is not none
		// Because horizontal and vertical is changed dynamically by screen rotation.
		// this._direction is used to initialize hammerjs
		if (this._useRotation && this._direction & _axes2["default"].DIRECTION_ALL) {
			this._direction = _axes2["default"].DIRECTION_ALL;
		}

		_PanInput.prototype.connect.call(this, observer);
	};

	RotationPanInput.prototype.getOffset = function getOffset(properties, useDirection) {
		if (this._useRotation === false) {
			return _PanInput.prototype.getOffset.call(this, properties, useDirection);
		}

		var offset = _PanInput.prototype.getOffset.call(this, properties, [true, true]);
		var newOffset = [0, 0];
		var theta = this._screenRotationAngle.getRadian();
		var cosTheta = Math.cos(theta);
		var sinTheta = Math.sin(theta);

		newOffset[0] = offset[0] * cosTheta - offset[1] * sinTheta;
		newOffset[1] = offset[1] * cosTheta + offset[0] * sinTheta;

		// Use only user allowed direction.
		if (!(this._userDirection & _axes2["default"].DIRECTION_HORIZONTAL)) {
			newOffset[0] = 0;
		} else if (!(this._userDirection & _axes2["default"].DIRECTION_VERTICAL)) {
			newOffset[1] = 0;
		}

		return newOffset;
	};

	RotationPanInput.prototype.destroy = function destroy() {
		if (this._useRotation) {
			this._screenRotationAngle && this._screenRotationAngle.unref();
		}

		_PanInput.prototype.destroy.call(this);
	};

	return RotationPanInput;
}(_axes.PanInput);

/**
 * Override getDirectionByAngle to return DIRECTION_ALL
 * Ref: https://github.com/naver/egjs-axes/issues/99
 *
 * But we obey axes's rule. If axes's rule is problem, let's apply following code.
 */
// PanInput.getDirectionByAngle = function (angle, thresholdAngle) {
// 	return DIRECTION_ALL;
// };


exports["default"] = RotationPanInput;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _utils = __webpack_require__(16);

var _FusionPoseSensor = __webpack_require__(15);

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

		_this.options = _extends({
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _utils = __webpack_require__(16);

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

		_this.options = _extends({
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
/* 37 */
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
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(2);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {}; /**
                * Original Code
                * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/vec2.js
                * 2 Dimensional Vector Util
                * modified by egjs
                */


vec2.copy = function (out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
};

module.exports = vec2;

/***/ }),
/* 40 */
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
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
    r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
    r[2] = p[2];

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

module.exports = vec3;

/***/ }),
/* 41 */
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
/* 42 */
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
/* 43 */
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

var SensorSample = __webpack_require__(45);
var MathUtil = __webpack_require__(6);
var Util = __webpack_require__(10);

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
/* 44 */
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
var Util = __webpack_require__(10);

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
/* 45 */
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
//# sourceMappingURL=view360.panoviewer.js.map