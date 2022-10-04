precision mediump float;

uniform sampler2D uTexture;
uniform float uYaw;
uniform float uPitch;
uniform float uZoom;

varying highp vec3 vPos;
varying highp vec2 vUV;

const float PI = 3.1415926536;
const float PI_2 = PI * 0.5;
const float PI2 = PI * 2.0;
const bool stereographic = true;
const float localRadius = 0.15;

// https://mathworld.wolfram.com/GnomonicProjection.html
vec2 gnomonicToWorld(in vec2 uv) {
  // Convert screen coord in gnomonic mapping to spherical coord in [PI, PI/2]
  vec2 convertedScreenCoord = (uv * 2.0 - 1.0) * 0.5 * vec2(PI, PI_2);
  float x = convertedScreenCoord.x, y = convertedScreenCoord.y;

  float rou = sqrt(x * x + y * y), c = stereographic ? 2.0 * atan(rou / (localRadius * 8. * uZoom) * 0.5) : atan(rou);
	float sin_c = sin( c ), cos_c = cos( c );

  float lat = asin(cos_c * sin(uPitch) + (y * sin_c * cos(uPitch)) / rou);
	float lon = uYaw + atan(x * sin_c, rou * cos(uPitch) * cos_c - y * sin(uPitch) * sin_c);

	lat = (lat / PI_2 + 1.0) * 0.5; lon = (lon / PI + 1.0) * 0.5; // [0, 1]

  return vec2(lon, lat);
}

void main() {
  vec2 uv = gnomonicToWorld(vUV);

  gl_FragColor = texture2D(uTexture, uv);
}
