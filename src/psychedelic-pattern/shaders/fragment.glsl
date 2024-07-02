varying vec2 vUV;
uniform float uTime;

// cosine based palette, 4 vec3 params
vec3 palette(float t) {
    vec3 a = vec3(0.500, 0.500, 0.500);
    vec3 b = vec3(0.500, 0.500, 0.500);
    vec3 c = vec3(1.000, 1.000, 1.000);
    vec3 d = vec3(0.558, 0.738, -0.182);

    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = vUV;
    float time = uTime;
    vec3 finalColor = vec3(0.0);

    uv = (uv * 2.0) - 1.0;
    vec2 uv0 = uv;

    for (float i = 0.0; i < 2.0; i++) {
        uv = fract(uv * 2.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));
        vec3 color = palette(length(uv0) + i * 0.02 + uTime * 0.8);

        d = sin(d * 10.0 + uTime) / 8.0;
        d = abs(d);

        d = pow(0.01 / d, 1.2);

        finalColor += color * d;
    }

    gl_FragColor = vec4(finalColor, 1.0);
}
