uniform samplerCube uTexture;

varying highp vec3 vPos;

void main() {
  gl_FragColor = textureCube(uTexture, vPos);
}
