import '../style.css'

import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  Group,
} from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

if (!canvas) {
  throw new Error('There is no canvas to be used.')
}

// Scene
const scene = new Scene()

/**
 * Objects
 */
const group = new Group()
group.position.y = 0.5
group.scale.y = 2
group.rotation.y = 1
scene.add(group)

const cubeOne = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cubeOne)

const cubeTwo = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0x00ff00 })
)
cubeTwo.position.set(2, 0, 0)
group.add(cubeTwo)

const cubeThree = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0x0000ff })
)
cubeThree.position.set(-2, 0, 0)
group.add(cubeThree)
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
const renderer = new WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
