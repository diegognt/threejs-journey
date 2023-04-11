import '../style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  AmbientLight,
  BufferGeometry,
  Clock,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

// Textures
const textureLoader = new TextureLoader()
const textures = {
  matcap: textureLoader.load('/textures/matcaps/8.png'),
  gradient: textureLoader.load('/textures/gradients/5.jpg'),
}
// Geometries
const geometries: { [key: string]: undefined | BufferGeometry } = {
  text: undefined,
  tourus: new TorusGeometry(0.3, 0.2, 20, 45)
}


const canvas = document.querySelector('canvas.webgl') as HTMLElement

if (!canvas) {
  throw new Error('There is no canvas to be used.')
}

// Scene
const scene: Scene = new Scene()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)


// Materials
const materials: { [key: string]: Material } = {
  Wireframe: new MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  }),
  MatCap: new MeshMatcapMaterial({
    matcap: textures.matcap
  }),
}

// Objects
const objects: {[key: string]: Mesh | undefined} = {
  text: undefined,
}
// Text 
const fontLoader = new FontLoader()
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
    geometries.text = new TextGeometry(
      'Lucero Navarro',
      {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
      }
    )
    geometries.text.center()
    objects.text = new Mesh(geometries.text, materials.MatCap)

    // Adding several tourus
    for (let i = 0; i < 400; i++) {
      const dount = new Mesh(geometries.tourus, materials.MatCap)

      dount.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      )

      dount.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      )
      const scale = Math.random()
      dount.scale.set(
        scale,
        scale,
        scale
      )

      scene.add(dount)
    }


    scene.add(objects.text)
  }
)


// Lights
const ambienLight = new AmbientLight(0xffffff, 0.5)
const poinLight = new PointLight(0xffffff, 0.5)
poinLight.position.x = 2
poinLight.position.y = 3
poinLight.position.z = 4

scene.add(ambienLight, poinLight)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update Objects

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
