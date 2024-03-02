import * as dat from "lil-gui";
import {
  AmbientLight,
  Clock,
  Color,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  NearestFilter,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "../style.css";

// Debug UI
const gui = new dat.GUI();

const adjustGradientOnToonMaterial = (newValue: string) => {
  if (newValue !== "Toon") return;

  textures.gradient.minFilter = NearestFilter;
  textures.gradient.magFilter = NearestFilter;
  textures.gradient.generateMipmaps = false;
};

// Textures
const textureLoader = new TextureLoader();
const textures = {
  matcap: textureLoader.load("/textures/matcaps/8.png"),
  gradient: textureLoader.load("/textures/gradients/5.jpg"),
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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Geometries
const geometries = {
  sphere: new SphereGeometry(0.5, 16, 16),
  plane: new PlaneGeometry(1, 1),
  tourus: new TorusGeometry(0.3, 0.2, 16, 32),
};

// Materials
const materials: { [key: string]: Material } = {
  Wireframe: new MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  }),
  Normal: new MeshNormalMaterial({
    flatShading: true,
  }),
  MatCap: new MeshMatcapMaterial({
    matcap: textures.matcap,
  }),
  Lambert: new MeshLambertMaterial(),
  Phonge: new MeshPhongMaterial({
    shininess: 90,
    specular: new Color(0x1188ff),
  }),
  Standard: new MeshStandardMaterial({
    metalness: 0.45,
    roughness: 0.65,
  }),
  Toon: new MeshToonMaterial({
    gradientMap: textures.gradient,
  }),
};

// Objects
const objects = {
  sphere: new Mesh(geometries.sphere, materials.meshBasicWithWireframe),
  plane: new Mesh(geometries.plane, materials.meshBasicWithWireframe),
  tourus: new Mesh(geometries.tourus, materials.meshBasicWithWireframe),
};

objects.sphere.position.x = -1.5;
objects.tourus.position.x = 1.5;

scene.add(objects.sphere, objects.plane, objects.tourus);

gui
  .addFolder("Sphere")
  .add(objects.sphere, "material", materials)
  .setValue(materials.Wireframe)
  .onChange(adjustGradientOnToonMaterial);

gui
  .addFolder("Plane")
  .add(objects.plane, "material", materials)
  .setValue(materials.Wireframe)
  .onChange(adjustGradientOnToonMaterial);

gui
  .addFolder("Tourus")
  .add(objects.tourus, "material", materials)
  .setValue(materials.Wireframe)
  .onChange(adjustGradientOnToonMaterial);

// Lights
const ambienLight = new AmbientLight(0xffffff, 0.5);
const poinLight = new PointLight(0xffffff, 0.5);
poinLight.position.x = 2;
poinLight.position.y = 3;
poinLight.position.z = 4;

scene.add(ambienLight, poinLight);

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

/**
 * Animate
 */
const clock = new Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Objects
  objects.sphere.rotation.y = 0.1 * elapsedTime;
  objects.plane.rotation.y = 0.1 * elapsedTime;
  objects.tourus.rotation.y = 0.1 * elapsedTime;

  objects.sphere.rotation.x = 0.15 * elapsedTime;
  objects.plane.rotation.x = 0.15 * elapsedTime;
  objects.tourus.rotation.x = 0.15 * elapsedTime;

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
