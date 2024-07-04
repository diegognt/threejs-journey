import type { Camera, Group, Line, Mesh, Points } from "three";
import { Scene, WebGLRenderer } from "three";

type SceneObject = Mesh | Line | Points | Group | Camera;

abstract class SceneHandler {
  #canvas!: HTMLElement;
  #scene!: Scene;
  #renderer!: WebGLRenderer;
  #camera!: Camera;
  #sceneObjects: Map<string, SceneObject>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({ canvas: this.canvasAsHTMLElement });
    this.#sceneObjects = new Map();
  }

  initialize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.startListeners();
  }

  startListeners() {
    window.addEventListener("resize", this.windowResizeListener.bind(this));
  }

  display() {
    for (const object of this.sceneObjects.values()) {
      this.scene.add(object);
    }
  }

  tick() {
    if (this.camera) {
      this.renderer.render(this.scene, this.camera);
    }

    window.requestAnimationFrame(this.tick.bind(this));
  }

  windowResizeListener() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  set canvas(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
  }

  get canvasAsHTMLElement(): HTMLElement {
    return this.#canvas as HTMLElement;
  }

  set scene(scene: Scene) {
    this.#scene = scene;
  }

  get scene(): Scene {
    return this.#scene;
  }

  get renderer(): WebGLRenderer {
    return this.#renderer;
  }

  set renderer(renderer: WebGLRenderer) {
    this.#renderer = renderer;
  }

  set camera(camera: Camera) {
    this.#camera = camera;
  }

  get camera(): Camera {
    return this.#camera;
  }

  addSceneObject(sceneObject: SceneObject) {
    if (!this.#sceneObjects) {
      this.#sceneObjects = new Map();
    }

    this.#sceneObjects.set(sceneObject.uuid, sceneObject);
  }

  get sceneObjects(): Map<string, SceneObject>{
    if (!this.#sceneObjects) {
      throw new Error("No scene objects found");
    }

    return this.#sceneObjects;
  }
}

export default SceneHandler;
