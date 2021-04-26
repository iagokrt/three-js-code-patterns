// import {  } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createControls() {
  // const camera = new PerspectiveCamera(
  //   35, // fov = Field Of View
  //   1, // aspect ratio (dummy value)
  //   0.1, // near clipping plane
  //   100, // far clipping plane
  // );

  // control logics and bounds
  camera.position.set(0, 0, 10);

  return defaultcontrols;
}

export { createControls };
