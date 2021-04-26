import * as THREE from 'three'
import anime from 'animejs'
import './style.css'
import * as dat from 'dat.gui';

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})() // stats from https://github.com/mrdoob/stats.js/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera();
var renderer = new THREE.WebGLRenderer();

var cube = null

var settings = null
var gui = new dat.GUI()

var canvas = document.querySelector('.webgl');
var startTime	= Date.now();
var scrollY = 0;
var _event = {
  y: 0,
  deltaY: 0
};
var timeline = null
var percentage = 0

var divContainer = document.querySelector('.container')
var maxHeight = (divContainer.clientHeight || divContainer.offsetHeight) - window.innerHeight

settings = {
  scale: 1,
  size: 2,
  camera: {
    speed: 0.0001,
  }
}

function initSettings() {
  var cam = gui.addFolder('Camera');
  // cam.add(settings.camera, 'speed', 0, 0.0010).listen()
  cam.add(camera.position, 'y', 0, 100).listen();
  cam.add(camera.position, 'x', 0, 100).listen();
  cam.add(camera.position, 'z', 0, 100).listen();
  cam.open()

  var mesh = gui.addFolder('Mesh')
  mesh.add(cube.material, 'wireframe').listen()
  mesh.open()

  var lights = gui.addFolder('Lights')
  // lights.add()
  var post = gui.addFolder('Post-processing')
  var scenes = gui.addFolder('Scenes')
}

function initThree () {
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setClearColor(0x161216)
  camera.position.y = 10; // defaults to 10
  camera.position.z = 100; // defaults to 100
  resize()
  canvas.appendChild(renderer.domElement);
  addCube()
  initSettings()
}

function addCube () {
    console.log('init cube')
    var material = new THREE.MeshNormalMaterial()
    var geometry = new THREE.BoxBufferGeometry(50, 50, 50, 100, 5)
    cube = new THREE.Mesh( geometry, material);
    cube.position.y = 5
    cube.position.z = -100
    scene.add(cube);
    console.log(cube);
}

function initTimeline() {
  console.log('initiate timeline')
  timeline = anime.timeline({
    autoplay: false,
    duration: 4500,
    easing: 'easeOutSine'
  });
  timeline.add({
    targets: cube.position,
    x: 100,
    y: 25,
    z: -50,
    duration: 2250,
    update: camera.updateProjectionMatrix()
  })
  timeline.add({
    targets: cube.position,
    x: 0,
    y: 0,
    z: 50,
    duration: 2250,
    update: camera.updateProjectionMatrix()
  })
  var value = new THREE.Color(0xFFFCFC)
  var initial = new THREE.Color(0x161216)
  timeline.add({
    targets: initial,
    r: [initial.r, value.r],
    g: [initial.g, value.g],
    b: [initial.b, value.b],
    duration: 4500,
    update: () => {
      renderer.setClearColor(initial);
    }
  }, 0);
}
function animate() {
  // render the 3D scene
  // var timer =+ 0.05
  // var timer = Date.now() * settings.camera.speed;
  // var timer = 1
  // camera.position.x = Math.cos(timer) * 100;
  // camera.position.z = Math.sin(timer) * 100;
  render();
  // relaunch the 'timer' 
  requestAnimationFrame( animate );
}

function render() {
  var dtime	= Date.now() - startTime;
  // easing with treshold on 0.08 (should be between .14 & .2 for smooth animations)
  percentage = lerp(percentage, scrollY, .08);
  timeline.seek(percentage * (4500 / maxHeight))
  // animate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.0125;
  cube.rotation.z += 0.012;
  renderer.render( scene, camera );
}
// linear interpolation function
function lerp(a, b, t) {
  return ((1 - t) * a + t * b);
}

function init () {
  initThree()
  initTimeline()
  window.addEventListener('resize', resize, { passive: true
  })
  divContainer.addEventListener('wheel', onWheel, { passive: false });
  animate()
}

function resize () {
  // cointainer height - window height to limit the scroll at the top of the screen when we are at the bottom of the container
  maxHeight = (divContainer.clientHeight || divContainer.offsetHeight) - window.innerHeight
  renderer.width = canvas.clientWidth;
  renderer.height = canvas.clientHeight;
  renderer.setSize(renderer.width, renderer.height);
  camera.aspect = renderer.width / renderer.height;
  camera.updateProjectionMatrix();
}

function onWheel (e) {
    // for embedded demo
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();

    var evt = _event;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
    // reduce by half the delta amount otherwise it scroll too fast
    evt.deltaY *= 0.5;

    scroll(e);
};

function scroll (e) {
  var evt = _event;
  // limit scroll top
  if ((evt.y + evt.deltaY) > 0 ) {
    evt.y = 0;
  // limit scroll bottom
  } else if ((-(evt.y + evt.deltaY)) >= maxHeight) {
    evt.y = -maxHeight;
  } else {
      evt.y += evt.deltaY;
  }
  scrollY = -evt.y
}

init()