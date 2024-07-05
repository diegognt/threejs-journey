import GUI from "lil-gui";
import "../style.css";
import PatternScene from "./pattern-scene";
import type { ShaderMaterial } from "three";

const canvas = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("No canvas found");
}

const scene = new PatternScene(canvas as HTMLCanvasElement);
const gui = new GUI();
const options = {
  "Pattern 1": 1,
  "Pattern 2": 2,
  "Pattern 3": 3,
  "Pattern 4": 4,
  "Pattern 5": 5,
};

scene.initialize();
scene.display();
scene.tick();

gui
  .add(
    (scene.material as ShaderMaterial).uniforms.uPatternIndex,
    "value",
    options,
  )
  .name("Pattern Number");
