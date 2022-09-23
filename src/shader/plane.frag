precision mediump float;

uniform sampler2D uTexture;

varying highp vec3 vPos;
varying highp vec2 vUV;

void main() {
  float x = vUV.x + 0.5;
  float y = vUV.y - 0.5;

  float lon = (x - floor(x)) * 360.;
  float lat = y * 180.;

  gl_FragColor = texture2D(uTexture, vUV.st * vec2(1, -1));
}
