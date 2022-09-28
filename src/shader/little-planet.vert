attribute vec3 position;
attribute vec2 uv;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying highp vec3 vPos;
varying highp vec2 vUV;

void main() {
  vec4 pos = uPMatrix * uMVMatrix * vec4(position, 1.0);

  vUV = uv;
  vPos = pos.xyz;
  gl_Position = vec4(position, 1.0);
}
