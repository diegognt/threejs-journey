uniform int uShapeIndex;
varying vec2 vUV;

// A circle.
vec3 shapeOne(vec2 uv) {
    uv = uv - 0.5;

    float circle = 1.0 - step(0.25, length(uv));

    return vec3(circle);
}

// A square.
vec3 shapeTwo(vec2 uv) {
    uv = uv - 0.5;

    float verticalSide = abs(uv.x - uv.y);
    float horizontalSide = abs(uv.x + uv.y);

    float color = 1.0 - step(0.5, verticalSide + horizontalSide);

    return vec3(color);
}

vec3 shapeThree(vec2 uv) {
    uv = uv - 0.5;
    float distance = length(uv) + 0.25;

    distance -= 0.5;
    distance = 1.0 - step(0.02, abs(distance));

    return vec3(distance);
}

vec3 shapeFour(vec2 uv) {
    uv = uv - 0.5;

    float verticalSide = abs(uv.x - uv.y);
    float horizontalSide = abs(uv.x + uv.y);

    float outterSquare = 1.0 - step(0.5, (verticalSide + horizontalSide));
    float innerSquare = step(0.4, verticalSide + horizontalSide);

    return vec3(outterSquare * innerSquare);
}

vec3 callShape(int index, vec2 uv) {
    switch (index) {
        case 1:
        return shapeOne(uv);
        case 2:
        return shapeTwo(uv);
        case 3:
        return shapeThree(uv);
        case 4:
        return shapeFour(uv);
        default:
        return vec3(1.0, 1.0, 1.0);
    }
}

void main() {
    vec2 uv = vUV;
    vec3 shape = callShape(uShapeIndex, uv);

    gl_FragColor = vec4(shape, 1.0);
}
