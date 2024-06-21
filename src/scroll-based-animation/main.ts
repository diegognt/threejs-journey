import { Clock, ConeGeometry, DirectionalLight, Group, Mesh, MeshToonMaterial, NearestFilter, PerspectiveCamera, Scene, TextureLoader, TorusGeometry, TorusKnotGeometry, WebGLRenderer } from "three";
import "../style.css";
import GUI from "lil-gui";

const gui = new GUI();
const config = {
	materialColor: '#ffff00',
};

gui
  .addColor( config, 'materialColor' )
  .onChange((value) => {
    material.color.set(value);
  });


// Canvas
const canvas = document.querySelector("canvas.webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

if (!canvas) {
  throw new Error("There is no canvas to be used.");
}

const textureLoader = new TextureLoader();
const textures = {
  gradient: textureLoader.load("/textures/gradients/5.jpg"),
};
textures.gradient.magFilter = NearestFilter;

const scene = new Scene();

const cameraGroup = new Group();
scene.add(cameraGroup);

const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
camera.position.z = 6;
cameraGroup.add(camera);

const material = new MeshToonMaterial({ color: config.materialColor, gradientMap: textures.gradient });

const meshDistance = 5;
const meshOne = new Mesh(
  new TorusGeometry(1, 0.4, 16, 60),
  material,
);
const meshTwo = new Mesh(
  new ConeGeometry(1, 2, 32),
  material,
);
const meshTrhee = new Mesh(
  new TorusKnotGeometry(0.8, 0.35, 100, 16),
  material,
);

meshOne.position.y = -meshDistance * 0;
meshTwo.position.y = -meshDistance * 1;
meshTrhee.position.y = -meshDistance * 2;

meshOne.position.x = 2;
meshTwo.position.x = -2;
meshTrhee.position.x = 2;

scene.add(meshOne, meshTwo, meshTrhee);
const sectionMeshes = [meshOne, meshTwo, meshTrhee];

const light = new DirectionalLight(0xffffff, 3);
light.position.set(1, 1, 0);
scene.add(light);

const renderer = new WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new Clock();
let scrollY = 0;
let previousTime = 0;
const cursor = {
  x: 0,
  y: 0,
};
let currentSection = 0;

const tick = () => {
  // Render the scene
  renderer.render(scene, camera);
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  camera.position.y = (- scrollY / sizes.height) * meshDistance;

  cameraGroup.position.x += (cursor.x - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y += (-cursor.y - cameraGroup.position.y) * 5 * deltaTime;

  sectionMeshes[currentSection].rotation.y += deltaTime * 0.1;
  sectionMeshes[currentSection].rotation.x += deltaTime * 0.12;

  window.requestAnimationFrame(tick);
};

tick();
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  const newSection = Math.round(scrollY / sizes.height);
  if (newSection !== currentSection) {
    currentSection = newSection;
  }
});

window.addEventListener("mousemove", (event: MouseEvent) => {
  cursor.x = (event.clientX / sizes.width) - 0.5;
  cursor.y = (event.clientY / sizes.height) - 0.5;
});

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

