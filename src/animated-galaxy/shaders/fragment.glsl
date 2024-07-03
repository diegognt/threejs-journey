varying vec3 vColor;

void main() {
  #include <colorspace_fragment>

  float d = distance(gl_PointCoord, vec2(0.5));
  d = pow(1.0 - d, 10.5);

  vec3 finalColor = mix(vec3(0.0), vColor, d);

  gl_FragColor = vec4(finalColor, 1.0);
}
