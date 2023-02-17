attribute vec3 position;
attribute vec2 uv;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying highp vec3 vPos;

void main() {
  vPos = position;
  gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
}
