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
//
// gui
//   .add(parameters, "count")
//   .min(100)
//   .max(1000000)
//   .step(100)
//   .onFinishChange(displayGalaxy.bind(null, geometry, material, scene));
// gui
//   .add(parameters, "radius")
//   .min(0.01)
//   .max(20)
//   .step(0.01)
//   .onFinishChange(displayGalaxy.bind(null, geometry, material, scene));
// gui
//   .add(parameters, "branches")
//   .min(2)
//   .max(20)
//   .step(1)
//   .onFinishChange(displayGalaxy.bind(null, geometry, material, scene));
// gui
//   .add(parameters, "randomness")
//   .min(0)
//   .max(2)
//   .step(0.001)
//   .onFinishChange(displayGalaxy.bind(null, geometry, material, scene));
// gui
//   .add(parameters, "randomnessPower")
//   .min(1)
//   .max(10)
//   .step(0.001)
//   .onFinishChange(displayGalaxy.bind(null, geometry, material, scene));
// // gui.addColor(parameters, "insideColor").onFinishChange(generateGeometry);
// // gui.addColor(parameters, "outsideColor").onFinishChange(generateGeometry);
//

