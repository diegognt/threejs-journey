import {
  AmbientLight,
  BufferGeometry,
  CameraHelper,
  Clock,
  DirectionalLight,
  Material,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  SpotLight,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "../style.css";

import GUI from "lil-gui";

type LightName = "ambient" | "directional" | "spotlight" | "point";
type LightType = AmbientLight | DirectionalLight | SpotLight | PointLight;

const debugUI = new GUI();

// Geometries
const geometries: { [key: string]: undefined | BufferGeometry } = {
  sphere: new SphereGeometry(0.5, 16, 16),
  plane: new PlaneGeometry(5, 5),
};

const canvas = document.querySelector("canvas.webgl") as HTMLElement;

if (!canvas) {
  throw new Error("There is no canvas to be used.");
}

// Scene
const scene: Scene = new Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
scene.add(camera);

// Materials
const materials: { [key: string]: Material } = {
  standard: new MeshStandardMaterial({ roughness: 0.5 }),
};

// Objects
const meshes: { [key: string]: Mesh } = {
  sphere: new Mesh(geometries.sphere, materials.standard),
  plane: new Mesh(geometries.plane, materials.standard),
};
meshes.sphere.position.x = -1.5;
meshes.sphere.castShadow = true;
meshes.plane.rotation.x = -Math.PI * 0.5;
meshes.plane.position.y = -0.65;
meshes.plane.receiveShadow = true;

for (const mesh in meshes) {
  scene.add(meshes[mesh]);
}

// Lights
const lights: { ambient: AmbientLight, directional: DirectionalLight, spotlight: SpotLight, point: PointLight } = {
  ambient: new AmbientLight(0xffffff, 0.5),
  directional: new DirectionalLight(0xffffff, 0.5),
  spotlight: new SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3),
  point: new PointLight(0xff9000, 0.5, 10, 2),
};

// DirectionalLight
lights.directional.position.set(-1, 1, 2);
lights.directional.castShadow = true;
lights.directional.shadow.mapSize.width = 1024;
lights.directional.shadow.mapSize.height = 1024;
lights.directional.shadow.camera.top = 2;
lights.directional.shadow.camera.right = 2;
lights.directional.shadow.camera.bottom = -2;
lights.directional.shadow.camera.left = -2;
lights.directional.shadow.camera.near = 0.5;
lights.directional.shadow.camera.far = 5.8;

// SpotLight
lights.spotlight.position.set(0, 2, 2);
lights.spotlight.castShadow = true;
lights.spotlight.shadow.mapSize.width = 1024;
lights.spotlight.shadow.mapSize.height = 1024;
lights.spotlight.shadow.camera.fov = 30;
lights.spotlight.shadow.camera.near = 1;
lights.spotlight.shadow.camera.far = 6;

// PointLight
lights.point.position.set(1, -0.5, 1);
lights.point.castShadow = true;
lights.point.shadow.mapSize.width = 1024;
lights.point.shadow.mapSize.height = 1024;
lights.point.shadow.camera.near = 0.5;
lights.point.shadow.camera.far = 5;

for (const name in lights) {
  const light: LightType = lights[name as LightName];
  scene.add(light);

  if ("target" in light) {
    scene.add(light.target);
  }
}

const helpers: { [key: string]: CameraHelper } = {
  directionalLight: new CameraHelper(lights.directional.shadow.camera),
  spotlight: new CameraHelper(lights.spotlight.shadow.camera),
};

for (const name in helpers) {
  scene.add(helpers[name]);
}

debugUI
  .addFolder("DirectionalLight")
  .add(helpers.directionalLight, "visible")
  .setValue(false);
debugUI
  .addFolder("SpotLight")
  .add(helpers.spotlight, "visible")
  .setValue(false);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;

/**
 * Animate
 */
const clock = new Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Objects
  meshes.sphere.position.x = Math.cos(elapsedTime) * 1.5;
  meshes.sphere.position.z = Math.sin(elapsedTime) * 1.5;
  meshes.sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
