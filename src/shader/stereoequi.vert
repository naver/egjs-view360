attribute vec3 position;
attribute vec2 uv;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform vec4 uTexScaleOffset[2];
uniform float uEye;

varying highp vec2 vUV;

void main() {
  vec4 scaleOffset = uTexScaleOffset[int(uEye)];
  vUV = uv.xy * scaleOffset.xy + scaleOffset.zw;
  gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
}
