/**
 * Original Code
 * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix/common.js
 * Common utilities
 * modified by egjs
 */
var glMatrix = {};

glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;

var degree = Math.PI / 180;

glMatrix.toRadian = function(a){
     return a * degree;
}

glMatrix.toDegree = function(a){
     return a / degree;
}

// glMatrix.EPSILON = 0.000001;
glMatrix.EPSILON = 0.0001;

export default glMatrix;
