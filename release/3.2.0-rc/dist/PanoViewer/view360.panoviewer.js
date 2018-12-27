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

  function toAxis(source, offset) {
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
  var win$1 = typeof window !== "undefined" && window || {};
  var RegExp$1 = win$1.RegExp;
  var navigator$1 = win$1.navigator;
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
      this.observer.change(this, event, toAxis(this.axes, [getDeltaYaw(this._prevQuaternion, this._quaternion), getDeltaPitch(this._prevQuaternion, this._quaternion)]));
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
  }(Axes.PanInput);

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
        this.axesWheelInput = new Axes.WheelInput(this._element, {
          scale: -4
        });
        this.axesTiltMotionInput = null;
        this.axesPinchInput = SUPPORT_TOUCH ? new Axes.PinchInput(this._element, {
          scale: -1
        }) : null;
        this.axesMoveKeyInput = new Axes.MoveKeyInput(this._element, {
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
     * @name STEREOSCOPIC_EQUI
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

  exports.PanoViewer = PanoViewer;
  exports.VERSION = VERSION;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=view360.panoviewer.js.map
