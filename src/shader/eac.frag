#define PI 3.14159265359
precision mediump float;

uniform sampler2D uTexture;

varying highp vec2 vUV;

const vec2 OPERATE_COORDS_RANGE = vec2(-1.0, 1.0);
const vec2 TEXTURE_COORDS_RANGE = vec2(0.0, 1.0);
const float ONE_THIRD = 1.0 / 3.0;
const float EAC_CONST = 2.0 / PI;

float scale(vec2 domainRange, vec2 targetRange, float val) {
  float unit = 1.0 / (domainRange[1] - domainRange[0]);
  return targetRange[0] + (targetRange[1] - targetRange[0]) * (val - domainRange[0]) * unit;
}

void main(void) {
  float transformedCoordX;
  float transformedCoordY;

  float texRangeXStart = floor(vUV.s * 3.) * ONE_THIRD;
  float texRangeYStart = floor(vUV.t * 2.) * 0.5;

  vec2 orgTextureRangeX = vec2(texRangeXStart, texRangeXStart + ONE_THIRD);
  vec2 orgTextureRangeY = vec2(texRangeYStart, texRangeYStart + 0.5);

  // scaling coords by the coordinates following the range from -1.0 to 1.0.
  float px = scale(orgTextureRangeX, OPERATE_COORDS_RANGE, vUV.s);
  float py = scale(orgTextureRangeY, OPERATE_COORDS_RANGE, vUV.t);

  float qu = EAC_CONST * atan(px) + 0.5;
  float qv = EAC_CONST * atan(py) + 0.5;

  // re-scaling coords by original coordinates ranges
  transformedCoordX = scale(TEXTURE_COORDS_RANGE, orgTextureRangeX, qu);
  transformedCoordY = scale(TEXTURE_COORDS_RANGE, orgTextureRangeY, qv);

  gl_FragColor = texture2D(uTexture, vec2(transformedCoordX, transformedCoordY));
}
