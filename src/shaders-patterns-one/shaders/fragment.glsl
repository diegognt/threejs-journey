uniform  int uPatternIndex;
varying vec2 vUV;

vec3 patternOne(vec2 uv) {
    return vec3(mod(uv.x * 10.0, 1.0));
}

vec3 patternTwo(vec2 uv) {
    return vec3(step(0.5, mod(uv.y * 10.0, 1.0)));
}

vec3 patternThree(vec2 uv) {
    float verticalStripes = step(0.9, mod(uv.x * 10.0, 1.0));
    float horizontalStripes = step(0.9, mod(uv.y * 10.0, 1.0));

    return vec3(verticalStripes + horizontalStripes);
}

vec3 patternFour(vec2 uv) {
    float barY = step(0.8, mod(uv.x * 10.0, 1.0)) * step(0.4, mod(uv.y * 10.0, 1.0));
    float barX = step(0.4, mod(uv.x * 10.0, 1.0)) * step(0.8, mod(uv.y * 10.0, 1.0));

    return vec3(barY + barX);
}

vec3 patternFive(vec2 uv) {
    float barX = step(0.4, mod(vUV.x * 10.0, 1.0)) * step(0.8, mod(vUV.y * 10.0 + 0.2, 1.0));
    float barY = step(0.8, mod(vUV.x * 10.0 + 0.2, 1.0)) * step(0.4, mod(vUV.y * 10.0, 1.0));

    return vec3(barY + barX);
}

vec3 patternSix(vec2 uv) {
  uv = uv - 0.5;

  float circle = step(0.1, length(uv));

  return vec3(circle);
}

vec3 patternTen(vec2 uv) {
    float strength = max(abs(uv.x - 0.5), abs(uv.y - 0.5));
    return vec3(strength);
}

vec3 callPattern(int index, vec2 uv) {
    switch (index) {
        case 1:
        return patternOne(uv);
        case 2:
        return patternTwo(uv);
        case 3:
        return patternThree(uv);
        case 4:
        return patternFour(uv);
        case 5:
        return patternFive(uv);
        case 6:
        return patternSix(uv);
        case 10:
        return patternTen(uv);
        default:
        return vec3(1.0, 1.0, 1.0);
    }
}

void main() {
    vec2 uv = vUV;
    vec3 pattern = callPattern(uPatternIndex, uv);

    gl_FragColor = vec4(pattern, 1.0);
}
