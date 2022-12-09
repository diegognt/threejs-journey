import '../style.css';

import { Scene, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, AxesHelper, BufferAttribute, BufferGeometry } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Canvas
const canvas = document.querySelector('canvas.webgl')!

// Scene
const scene = new Scene()

// Object
const numberOfVertex = 3
const amountOfGeometries = 50 * numberOfVertex * numberOfVertex 
const geometry = new BufferGeometry()
const positionsArray = new Float32Array(amountOfGeometries)

for (let index = 0; index < amountOfGeometries; index++) {
  positionsArray[index] = (Math.random() - 0.5)
}

const positionsAttribute = new BufferAttribute(positionsArray, numberOfVertex)
geometry.setAttribute('position', positionsAttribute)

const cube = new Mesh(
  geometry,
  new MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
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

