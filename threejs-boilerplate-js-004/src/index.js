import * as THREE from 'three'
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import './styles/global.scss'
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})() // stats from https://github.com/mrdoob/stats.js/

// Canvas
const canvas = document.querySelector('canvas.webgl')

// define to screen size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// scene
const scene = new THREE.Scene()
// scene.fog = new THREE.Fog( 0, 1000, 10000 );

const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );

scene.add(ambientLight);
// scene.add(pointLight1)
// scene.add(pointLight2)
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const camera = new THREE.PerspectiveCamera( 45, window.width / window.height, 1, 10 );
scene.add( camera );

// Controls
const controls = new TrackballControls(camera, canvas)
controls.enableDamping = true

// controls.target.set(0,0,8);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0xf1f1f1, 0.5)

const clock = new THREE.Clock()

const frame = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update material
    // material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Rendering
    renderer.render(scene, camera)

    // Call frame again on the next frame
    window.requestAnimationFrame(frame)
}

frame()

// screen 
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
