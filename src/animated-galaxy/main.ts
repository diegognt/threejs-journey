import "../style.css";
import GalaxyGenerator from "./galaxy-generator";

const canvas = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("No canvas was found");
}

const galaxy = new GalaxyGenerator(canvas as HTMLElement);

galaxy.initialize();
galaxy.setListeners();
galaxy.draw();
galaxy.tick();
