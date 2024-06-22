uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom;

varying float vElevation;
varying float vRandom;
varying vec2 vUV;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = cos(modelPosition.x * uFrequency.x) * 0.10;

    modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.10;
    modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.10;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vElevation = elevation;
    vRandom = aRandom;
    vUV = uv;
}

