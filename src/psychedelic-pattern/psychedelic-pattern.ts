import {
  DoubleSide,
  PerspectiveCamera,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  Clock,
} from "three";
import type { BufferGeometry, Material } from "three";
import SceneHandler from "../abstracts/scene-handler";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";

class PsychedelicPattern extends SceneHandler {
  #geometry!: BufferGeometry;
  #material!: Material;
  #mesh!: Mesh;
  #control!: OrbitControls;
  #clock!: Clock;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    this.control = new OrbitControls(this.camera, this.canvasAsHTMLElement);

    this.geometry = new PlaneGeometry(1.25, 1);
    this.material = new ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: DoubleSide,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.clock = new Clock();
  }

  initialize() {
    super.initialize();

    this.mesh.position.set(0, 0.125, 0);
    this.camera.position.set(0, 0, 1);

    this.addSceneObject(this.mesh);
    this.addSceneObject(this.camera);
  }

  tick(): void {
    (this.material as ShaderMaterial).uniforms.uTime.value =
      this.clock.getElapsedTime();

    this.control.update();

    super.tick();
  }

  updateCameraAspect(aspect: number) {
    (this.camera as PerspectiveCamera).aspect = aspect;
  }

  windowResizeListener() {
    super.windowResizeListener();

    this.updateCameraAspect(window.innerWidth / window.innerHeight);
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
  }

  updateCameraPosition(x: number, y: number, z: number) {
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z;
  }

  set geometry(geometry: BufferGeometry) {
    this.#geometry = geometry;
  }

  get geometry(): BufferGeometry {
    return this.#geometry;
  }

  set material(material: Material) {
    this.#material = material;
  }

  get material(): Material {
    return this.#material;
  }

  set mesh(mesh: Mesh) {
    this.#mesh = mesh;
  }

  get mesh(): Mesh {
    return this.#mesh;
  }

  set control(control: OrbitControls) {
    this.#control = control;
  }

  get control(): OrbitControls {
    return this.#control;
  }

  set clock(clock: Clock) {
    this.#clock = clock;
  }

  get clock(): Clock {
    return this.#clock;
  }
}

export default PsychedelicPattern;
