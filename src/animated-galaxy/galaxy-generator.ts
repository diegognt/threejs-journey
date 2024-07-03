import type { Mesh, Camera, Material } from "three";
import {
  BufferGeometry,
  AdditiveBlending,
  BufferAttribute,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
  Clock,
  AxesHelper,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";

class GalaxyGenerator {
  startCount: number;
  size: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  insideColor: string;
  outsideColor: string;
  helper: AxesHelper;
  #canvas!: HTMLElement;
  #scene!: Scene;
  #renderer!: WebGLRenderer;
  #camera!: Camera;
  #control!: OrbitControls;
  #geometry!: BufferGeometry;
  #material!: Material;
  #mesh!: Mesh;
  #points!: Points;
  #clock!: Clock;

  constructor(canvas: HTMLElement) {
    this.startCount = 100000;
    this.size = 0.005;
    this.radius = 3; // length of a galaxy branch
    this.branches = 3; // number of branches
    this.spin = 30;
    this.randomness = 0.5;
    this.randomnessPower = 5; // constrols how many starts are close to the center
    this.insideColor = "#ff6030";
    this.outsideColor = "#1b3984";
    this.canvas = canvas;
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    this.control = new OrbitControls(this.camera, this.canvas);
    this.geometry = this.#generateGeometry();
    this.material = this.#generateMaterial();
    this.points = new Points(this.geometry, this.material);
    this.helper = new AxesHelper(3);
    this.clock = new Clock();
  }

  initialize() {
    this.scene.add(this.camera);
    this.scene.add(this.helper);

    this.control.enableDamping = true;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setListeners() {
    window.addEventListener("resize", this.windowResizeListener.bind(this));
  }

  tick() {
    const elapsedTime = this.clock.getElapsedTime();
    (this.material as ShaderMaterial).uniforms.uTime.value = elapsedTime;

    this.control.update();
    this.renderer.render(this.scene, this.camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(this.tick.bind(this));
  }

  draw() {
    this.updateCameraPosition(3, 3, 3);

    this.scene.add(this.points);
  }

  windowResizeListener() {
    this.updateCameraAspect(window.innerWidth / window.innerHeight);
    (this.camera as PerspectiveCamera).updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  updateCameraAspect(aspect: number) {
    (this.camera as PerspectiveCamera).aspect = aspect;
  }

  updateCameraPosition(x: number, y: number, z: number) {
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z;
  }

  #generateGeometry() {
    const geometry = new BufferGeometry();

    const positions = new Float32Array(this.startCount * 3);
    const colors = new Float32Array(this.startCount * 3);
    const scales = new Float32Array(this.startCount * 1);
    const randomness = new Float32Array(this.startCount * 3);

    const insideColor = new Color(this.insideColor);
    const outsideColor = new Color(this.outsideColor);

    for (let i = 0; i < this.startCount; i++) {
      const i3 = i * 3;

      // Position
      const radius = Math.random() * this.radius;

      const branchAngle = ((i % this.branches) / this.branches) * Math.PI * 2;

      const randomX =
        Math.random() ** this.randomnessPower *
        (Math.random() < 0.5 ? 1 : -1) *
        this.randomness *
        radius;
      const randomY =
        Math.random() ** this.randomnessPower *
        (Math.random() < 0.5 ? 0.2 : -0.2) *
        this.randomness *
        radius;
      const randomZ =
        Math.random() ** this.randomnessPower *
        (Math.random() < 0.5 ? 1 : -1) *
        this.randomness *
        radius;

      randomness[i3] = randomX;
      randomness[i3 + 1] = randomY;
      randomness[i3 + 2] = randomZ;

      positions[i3] = Math.cos(branchAngle) * radius; // Position the stars in a circle
      positions[i3 + 1] = 0;
      positions[i3 + 2] = Math.sin(branchAngle) * radius; // Position the stars in a circle

      // Color
      const mixedColor: Color = insideColor.clone();
      mixedColor.lerp(outsideColor, radius / this.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random();
    }

    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    geometry.setAttribute("aRandomness", new BufferAttribute(randomness, 3));
    geometry.setAttribute("aScale", new BufferAttribute(scales, 1));

    return geometry;
  }

  #generateMaterial() {
    return new ShaderMaterial({
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uSize: { value: 50 * this.renderer.getPixelRatio() },
        uTime: { value: 0 },
      },
    });
  }

  set clock(clock: Clock) {
    this.#clock = clock;
  }

  get clock() {
    return this.#clock;
  }

  set points(points: Points) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }

  set control(control: OrbitControls) {
    this.#control = control;
  }

  get control() {
    return this.#control;
  }

  set camera(camera: Camera) {
    this.#camera = camera;
  }

  get camera() {
    return this.#camera;
  }
  set scene(scene: Scene) {
    this.#scene = scene;
  }

  get scene() {
    return this.#scene;
  }

  set canvas(canvas: HTMLElement) {
    this.#canvas = canvas;
  }

  get canvas() {
    return this.#canvas;
  }

  get renderer() {
    return this.#renderer;
  }

  set renderer(renderer: WebGLRenderer) {
    this.#renderer = renderer;
  }

  get geometry() {
    return this.#geometry;
  }

  set geometry(geometry: BufferGeometry) {
    this.#geometry = geometry;
  }

  get material() {
    return this.#material;
  }

  set material(material: Material) {
    this.#material = material;
  }

  set mesh(mesh: Mesh) {
    this.#mesh = mesh;
  }

  get mesh() {
    return this.#mesh;
  }
}

export default GalaxyGenerator;
