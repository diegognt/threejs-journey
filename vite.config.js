// vite.config.js
import { resolve } from 'path'
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
      },
    },
  },
})
