precision mediump float;

uniform sampler2D uTexture;
uniform float uYaw;
uniform float uPitch;
uniform float uZoom;

varying highp vec2 vUV;

const float PI = 3.1415926536;
const float PI_2 = PI * 0.5;

// https://mathworld.wolfram.com/StereographicProjection.html
vec2 toStereographicUV(in vec2 uv, in vec2 center) {
  float R = 1. * uZoom;

  // lat & lon from texture UV (x: -PI~PI, y: -PI/2 ~ PI/2)
  vec2 texLatLon = (uv * 2. - 1.) * vec2(PI, PI_2);
  // Central point (x: 0 ~ 2*PI, y: -PI/2 ~ PI/2)
  vec2 central = (center * 2. - 1.) * vec2(PI, PI_2) + vec2(PI, 0);

  float x = texLatLon.x;
  float y = texLatLon.y;

  float rou = sqrt(x * x + y * y);
  float c = 2.0 * atan(rou, R * 0.5);
	float sin_c = sin(c);
  float cos_c = cos(c);
  // center
  float sin_cy = sin(central.y);
  float cos_cy = cos(central.y);

  float lat = asin(cos_c * sin_cy + (y * sin_c * cos_cy) / rou);
	float lon = central.x + atan(x * sin_c, rou * cos_cy * cos_c - y * sin_cy * sin_c);

  float u = (lon / PI + 1.0) * 0.5;
	float v = (lat / PI_2 + 1.0) * 0.5;

  return vec2(u, v);
}

void main() {
  vec2 central = vec2(uYaw, uPitch);
  vec2 uv = toStereographicUV(vUV, central);

  gl_FragColor = texture2D(uTexture, uv);
}
