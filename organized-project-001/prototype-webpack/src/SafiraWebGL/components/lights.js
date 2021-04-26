// import * as THREE from 'three'
import { DirectionalLight } from 'three';

function createLights() {
  // Create a directional light
  const light = new DirectionalLight('red', 8);

  // move the light right, up, and towards us
  light.position.set(10, 10, 15);


  return light;
}

function createEnvironment() {
  // set a mesh to environment
  // const sphereGeo = 
}

export { createLights };
