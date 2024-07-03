uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float angle = atan(modelPosition.x, modelPosition.z);
    float ditanceToCenter = length(modelPosition.xz);
    float angleOffset = (2.0 / ditanceToCenter) * uTime * 0.275;
    angle += angleOffset;

    modelPosition.x = cos(angle) * ditanceToCenter;
    modelPosition.z = sin(angle) * ditanceToCenter;

    modelPosition.xyz += aRandomness + 0.5;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / -viewPosition.z);

    vColor = color;
}
