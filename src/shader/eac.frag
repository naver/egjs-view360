#define PI 3.14159265359
precision highp float;

uniform sampler2D uSampler;
uniform bool uIsEAC;

varying highp vec2 vTextureCoord;

const vec2 OPERATE_COORDS_RANGE = vec2(-1.0, 1.0);
const vec2 TEXTURE_COORDS_RANGE = vec2(0.0, 1.0);
// vector type is used for initializing values instead of array.
const vec4 TEXTURE_DIVISION_X = vec4(0.0, 1.0 / 3.0, 2.0 / 3.0, 1.0);
const vec3 TEXTURE_DIVISION_Y = vec3(0.0, 1.0 / 2.0, 1.0);
const float EAC_CONST = 2.0 / PI;

float scale(vec2 domainRange, vec2 targetRange, float val) {
  float unit = 1.0 / (domainRange[1] - domainRange[0]);
  return targetRange[0] + (targetRange[1] - targetRange[0]) * (val - domainRange[0]) * unit;
}

void main(void) {
  float transformedCoordX;
  float transformedCoordY;

  if (uIsEAC) {
    vec2 orgTextureRangeX;
    vec2 orgTextureRangeY;

    // Apply EAC transform
    if (vTextureCoord.s >= TEXTURE_DIVISION_X[2]) {
      orgTextureRangeX = vec2(TEXTURE_DIVISION_X[2], TEXTURE_DIVISION_X[3]);
    } else if (vTextureCoord.s >= TEXTURE_DIVISION_X[1]) {
      orgTextureRangeX = vec2(TEXTURE_DIVISION_X[1], TEXTURE_DIVISION_X[2]);
    } else {
      orgTextureRangeX = vec2(TEXTURE_DIVISION_X[0], TEXTURE_DIVISION_X[1]);
    }

    if (vTextureCoord.t >= TEXTURE_DIVISION_Y[1]) {
      orgTextureRangeY = vec2(TEXTURE_DIVISION_Y[1], TEXTURE_DIVISION_Y[2]);
    } else {
      orgTextureRangeY = vec2(TEXTURE_DIVISION_Y[0], TEXTURE_DIVISION_Y[1]);
    }

    // scaling coors by the coordinates following the range from -1.0 to 1.0.
    float px = scale(orgTextureRangeX, OPERATE_COORDS_RANGE, vTextureCoord.s);
    float py = scale(orgTextureRangeY, OPERATE_COORDS_RANGE, vTextureCoord.t);

    float qu = EAC_CONST * atan(px) + 0.5;
    float qv = EAC_CONST * atan(py) + 0.5;

    // re-scaling coors by original coordinates ranges
    transformedCoordX = scale(TEXTURE_COORDS_RANGE, orgTextureRangeX, qu);
    transformedCoordY = scale(TEXTURE_COORDS_RANGE, orgTextureRangeY, qv);
  } else {
    // normal cubemap
    transformedCoordX = vTextureCoord.s;
    transformedCoordY = vTextureCoord.t;
  }

  gl_FragColor = texture2D(uSampler, vec2(transformedCoordX, transformedCoordY));
}
