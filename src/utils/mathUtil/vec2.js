/**
 * Original Code
 * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/vec2.js
 * 2 Dimensional Vector Util
 * modified by egjs
 */
import glMatrix from "./common.js";

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

export default vec2;
