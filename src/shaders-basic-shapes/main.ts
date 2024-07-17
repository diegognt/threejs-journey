import GUI from "lil-gui";
import type { ShaderMaterial } from "three";
import "../style.css";
import ShapesScene from "./shapes-scene";

const canvas = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("No canvas found");
}

const scene = new ShapesScene(canvas as HTMLCanvasElement);
const gui = new GUI();
const options = {
  "Circle": 1,
  "Square": 2,
  "Ring": 3,
  "Frame": 4,
};

scene.initialize();
scene.display();
scene.tick();

gui
  .add(
    (scene.material as ShaderMaterial).uniforms.uShapeIndex,
    "value",
    options,
  )
  .setValue(1)
  .name("Pattern Number");
