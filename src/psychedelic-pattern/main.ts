import "../style.css";
import PsychedelicPattern from "./psychedelic-pattern";

// Canvas
const canvas = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("No canvas found");
}

const scene = new PsychedelicPattern(canvas as HTMLCanvasElement);

scene.initialize();
scene.display();
scene.tick();
