uniform samplerCube uTexture;

varying highp vec3 vPos;

void main() {
  // As textureCube uses (+Z as front), we flip that
  gl_FragColor = textureCube(uTexture, vec3(vPos.xy, -vPos.z));
}
