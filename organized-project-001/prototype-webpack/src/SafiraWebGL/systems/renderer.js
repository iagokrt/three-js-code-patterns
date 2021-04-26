import { WebGLRenderer } from 'three'

function createRenderer() {
  const renderer = new WebGLRenderer();

  renderer.physicallyCorrectLights = true;
  // this.renderer.setPixelRatio(window.devicePixelRatio);
  // this.renderer.setSize(this.width, this.height);
  // this.renderer.setClearColor(0x000000, 1);
  // this.renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };
