
import '../style.css';

import { Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, AxesHelper } from 'three'

/**
 * Canvas Sizes
 */
const sizes = {
  width: 800,
  height: 600
}

const cursorPoint = {
  x: 0,
  y: 0,
}
window.addEventListener('mousemove', (event: MouseEvent) => {
  cursorPoint.x = - ((event.clientX / sizes.width) - 0.5)
  cursorPoint.y = (event.clientY / sizes.height) - 0.5
})

// Canvas
const canvas = document.querySelector('canvas.webgl')!

// Scene
const scene = new Scene()

// Object
const cube = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(cube)


/**
 * Axes helper
 */
const axesHelper = new AxesHelper()
scene.add(axesHelper)

/**
 * Camera
 */
// The first parameter is the vertical field of view in degrees
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 3
camera.lookAt(cube.position)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
  // Trnsform the object
  camera.position.x = Math.sin(cursorPoint.x * Math.PI * 2) * 3
  camera.position.z = Math.cos(cursorPoint.x * Math.PI * 2) * 3
  camera.position.y = cursorPoint.y * 5
  camera.lookAt(cube.position)

  // Render the scene
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
