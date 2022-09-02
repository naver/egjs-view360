uniform sampler2D uTexture;

varying highp vec2 vUV;

void main() {
  gl_FragColor = texture2D(uTexture, vUV.st * vec2(1, -1));
}
