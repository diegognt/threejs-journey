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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update the size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update Renderer
  renderer.setSize(sizes.width, sizes.height)
  /**
   * To avoid performance issue caused by the device pixel ratio is recommended
   * to use a maximum of 2 as the device pixel ratio.
   */
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

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

// Controls
const control = new OrbitControls(camera, canvas as HTMLElement)
control.enableDamping = true

/**
 * Renderer
 */
const renderer = new WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
  // Render the scene
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
