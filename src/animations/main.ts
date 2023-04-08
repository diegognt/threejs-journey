import '../style.css'

import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  Clock,
} from 'three'

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
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
}

/**
 * Axes helper
 */
const axesHelper = new AxesHelper()
scene.add(axesHelper)

/**
 * Camera
 */
const camera = new PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

// threeJS clock implementation
const clock = new Clock()

const tick = () => {
  const ellapsedTime = clock.getElapsedTime()

  // Trnsform the object
  cube.position.x = Math.sin(ellapsedTime)
  cube.position.y = Math.cos(ellapsedTime)

  // Render the scene
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
