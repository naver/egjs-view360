attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uEye;
uniform vec4 uTexScaleOffset[2];

varying highp vec2 vTextureCoord;

void main() {
  vTextureCoord = aTextureCoord.xy;
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
