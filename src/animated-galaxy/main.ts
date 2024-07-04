import "../style.css";
import GalaxyGenerator from "./galaxy-generator";

const canvas = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("No canvas was found");
}

const galaxy = new GalaxyGenerator(canvas as HTMLCanvasElement);

galaxy.initialize();
galaxy.display();
galaxy.tick();
