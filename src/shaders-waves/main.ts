import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import waterVertexShader from "./shaders/vertex.glsl?raw";
import waterFragmentShader from "./shaders/fragment.glsl?raw";
import {
  Clock,
  Color,
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import "../style.css";
import { hasDebugMode } from "../utilities/url";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("No canvas found");
}

// Scene
const scene = new Scene();

/**
 * Water
 */
// Geometry
const waterGeometry = new PlaneGeometry(2, 2, 512, 512);

// Colors
const colors: Record<string, string> = {
  depthColor: "#186691",
  surfaceColor: "#9bd8ff",
};

// Material
const waterMaterial = new ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  side: DoubleSide,
  uniforms: {
    uTime: { value: 0 },

    uBigWavesElevation: { value: 0.2 },
    uBigWavesFrequency: { value: new Vector2(4, 1.5) },
    uBigWavesSpeed: { value: 0.75 },

    uSmallWavesElevation: { value: 0.15 },
    uSmallWavesFrequency: { value: 3 },
    uSmallWavesSpeed: { value: 0.2 },
    uSmallIterations: { value: 4 },

    uDepthColor: { value: new Color(colors.depthColor) },
    uSurfaceColor: { value: new Color(colors.surfaceColor) },
    uColorOffset: { value: 0.08 },
    uColorMultiplier: { value: 5 },
  },
});

// Mesh
const water = new Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set( sizes.width < 1024 ? 4 : 1, 1, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas as HTMLElement);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Water
  waterMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  if (sizes.width < 1024) {
    camera.position.set(4, 1, 1);
  } else {
    camera.position.set(1, 1, 1);
  }

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Debug
if (hasDebugMode()) {
  const gui = new GUI({ width: 340 });

  gui.addColor(colors, "depthColor").onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(colors.depthColor);
  });

  gui.addColor(colors, "surfaceColor").onChange(() => {
    waterMaterial.uniforms.uSurfaceColor.value.set(colors.surfaceColor);
  });

  gui
    .add(waterMaterial.uniforms.uBigWavesElevation, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("uBigWavesElevation");
  gui
    .add(waterMaterial.uniforms.uBigWavesFrequency.value, "x")
    .min(0)
    .max(10)
    .step(0.001)
    .name("uBigWavesFrequencyX");
  gui
    .add(waterMaterial.uniforms.uBigWavesFrequency.value, "y")
    .min(0)
    .max(10)
    .step(0.001)
    .name("uBigWavesFrequencyY");
  gui
    .add(waterMaterial.uniforms.uBigWavesSpeed, "value")
    .min(0)
    .max(4)
    .step(0.001)
    .name("uBigWavesSpeed");

  gui
    .add(waterMaterial.uniforms.uSmallWavesElevation, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("uSmallWavesElevation");
  gui
    .add(waterMaterial.uniforms.uSmallWavesFrequency, "value")
    .min(0)
    .max(30)
    .step(0.001)
    .name("uSmallWavesFrequency");
  gui
    .add(waterMaterial.uniforms.uSmallWavesSpeed, "value")
    .min(0)
    .max(4)
    .step(0.001)
    .name("uSmallWavesSpeed");
  gui
    .add(waterMaterial.uniforms.uSmallIterations, "value")
    .min(0)
    .max(5)
    .step(1)
    .name("uSmallIterations");

  gui
    .add(waterMaterial.uniforms.uColorOffset, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("uColorOffset");
  gui
    .add(waterMaterial.uniforms.uColorMultiplier, "value")
    .min(0)
    .max(10)
    .step(0.001)
    .name("uColorMultiplier");
}

tick();
