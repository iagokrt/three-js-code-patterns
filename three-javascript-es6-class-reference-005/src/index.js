import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'stats.js'
// javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})() // stats from https://github.com/mrdoob/stats.js/

// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

// post-processing
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import * as dat from 'dat.gui';
import gsap from 'gsap';

import './styles/global.scss';
import { TetrahedronBufferGeometry } from 'three';

// import vertex from './shader/vertexParticles.glsl';
// import fragment from './shader/fragment.glsl';

export default class Scenario {
  // setup objects inside constructor function
  constructor(options) {
    this.container = options.dom; // document.getElementById('webgl')

    // Scene
    this.scene = new THREE.Scene();
    this.stats = new Stats();

    // sizes
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
  
    // renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.physicallyCorrectLights = true;

    // set renderer to container element
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      5000
    );

    this.camera.position.set(0, 0, 1500);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.clock = 0;

    this.isPlaying = true;
    
    //
    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
    this.settings();
    this.initStats();

    // starts the webgl animations!
      
    // animate with interactity
   
  }

  initStats() {
    document.body.appendChild(this.stats.dom); // console.log('init stats', this.stats)
  }

  settings() {
    let that = this;
    this.settings = {
      distortion: 0.09,
      bloomStrength: 0.69,
    };

    this.gui = new dat.GUI();
    
    this.gui.add(this.settings, 'distortion', 0, 3, 0.01);
    
    this.gui.add(this.settings, 'bloomStrength', 0, 5, 0.01);

    // this.gui.add(this);
  
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.camera.updateProjectionMatrix();
    // this.composer.setSize(this.width, this.height);
  }

  // [] load model
  /**
   *  const loader = new GLTFLoader();

        var modelMotocycle;
        loader.load("https://luislenosilva15.github.io/View3DThreeJs/modelMotocycle/scene.gltf", function(gltf){
            modelMotocycle = gltf.scene;
            modelMotocycle.scale.set(0.009,0.009,0.009);
            modelMotocycle.position.set(0,-0.6,0);
            modelMotocycle.rotation.set(0,6.2,0);

            scene.add(gltf.scene);
        });
         // [] add model    // let loader = new THREE.GLTFLoader()

    // var modelMotocycle;
    //     loader.load("https://luislenosilva15.github.io/View3DThreeJs/modelMotocycle/scene.gltf", function(gltf){
    //         modelMotocycle = gltf.scene;
    //         modelMotocycle.scale.set(0.009,0.009,0.009);
    //         modelMotocycle.position.set(0,-0.6,0);
    //         modelMotocycle.rotation.set(0,6.2,0);

    //         scene.add(gltf.scene);
    //     });
   */
     
  
  addModel() {
    let that = this;

    // this.path =;
  }

  addObjects() {
    let that = this;

    // this.material = new THREE.PointsMaterial( { color: 0x888888 } )

    this.material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide})

    this.geometry = new THREE.PlaneBufferGeometry(
      480 * 1.25,
      820 * 1.25,
      480,
      820
    );

    this.plane = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.plane);

    this.light = new THREE.AmbientLight('0x888888', 1)

    this.scene.add(this.light)
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.render();
      this.isPlaying = true;
    }
  }

  render() {
    if (!this.isPlaying) return; // breaks the animation rendering frame loop 

    this.clock += 0.05;
  
    this.stats.update();
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera); 
  }
}

// instantiate the scenario class
new Scenario({
  dom: document.getElementById('webgl'),
});
