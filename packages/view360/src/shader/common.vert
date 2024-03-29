attribute vec3 position;
attribute vec2 uv;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying highp vec2 vUV;

void main() {
  vUV = uv;
  gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
}
