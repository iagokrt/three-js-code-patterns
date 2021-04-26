import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

let scene;
let camera;
let renderer;
let container;

class SafiraWebGL {
  constructor(options) {
    // this.scene = createScene()
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();

    container = options.dom; // document.querySelector('.webgl')

    container.append(renderer.domElement);

    const cube = createCube();
    const light = createLights();

    scene.add(cube, light);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }
}

export { SafiraWebGL };
