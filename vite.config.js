import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        "transform-objects": resolve(__dirname, 'transform-objects/index.html'),
        animations: resolve(__dirname, 'animations/index.html'),
        cameras: resolve(__dirname, 'cameras/index.html'),
        resizing: resolve(__dirname, 'resizing/index.html'),
        geometries: resolve(__dirname, 'geometries/index.html'),
        materials: resolve(__dirname, 'materials/index.html'),
        "3d-text": resolve(__dirname, '3d-text/index.html'),
        lights: resolve(__dirname, 'lights/index.html'),
        "scroll-based-animation": resolve(__dirname, 'scroll-based-animation/index.html'),
        "shader-plane": resolve(__dirname, 'shader-plane/index.html'),
        "shader-waves": resolve(__dirname, 'shader-waves/index.html'),
        "shader-basic-patterns": resolve(__dirname, 'shader-basic-patterns/index.html'),
        "psychedelic-patterns": resolve(__dirname, 'psychedelic-pattern/index.html'),
        "animated-galaxy": resolve(__dirname, 'animated-galaxy/index.html'),
      },
    },
  },
})
