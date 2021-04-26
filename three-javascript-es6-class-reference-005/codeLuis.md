

        import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
        import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';
        import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/loaders/GLTFLoader.js';

        // declara a cena principal
        var scene = new THREE.Scene();
        scene.background = new THREE.Color("rgb(140, 140, 140)");

        const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );
        camera.rotation.y = 45/180*Math.PI;
        camera.position.x = 800;
        camera.position.y = 100;
        camera.position.z = 1000;

        const renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const loader = new GLTFLoader();

        var modelMotocycle;
        loader.load("https://luislenosilva15.github.io/View3DThreeJs/modelMotocycle/scene.gltf", function(gltf){
            modelMotocycle = gltf.scene;
            modelMotocycle.scale.set(0.009,0.009,0.009);
            modelMotocycle.position.set(0,-0.6,0);
            modelMotocycle.rotation.set(0,6.2,0);

            scene.add(gltf.scene);
        });

        var modelPlaneFloor;
        loader.load("https://luislenosilva15.github.io/View3DThreeJs/garage/Floor.gltf", function(gltf){
            modelPlaneFloor = gltf.scene;
            modelPlaneFloor.scale.set(10,0,10);
            modelPlaneFloor.position.set(0,-0.6,0);
            
            scene.add(gltf.scene);
        });

        const hlight = new THREE.AmbientLight( 0x404040, 10);
        scene.add(hlight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff,10);
        directionalLight.position.set(0,1,0);
        directionalLight.castShadow = true;
       // scene.add(directionalLight);

        const light = new THREE.PointLight(0xc4c4c4, 3);
        light.position.set(0,300,500);
        scene.add(light);

        const light2 = new THREE.PointLight(0xc4c4c4,3);
        light2.position.set(500,100,0);
        scene.add(light2);

        const light3 = new THREE.PointLight(0xc4c4c4,3);
        light3.position.set(0,100,-500);
        scene.add(light3);

        const light4 = new THREE.PointLight(0xc4c4c4,3);
        light4.position.set(-500,300,500);
        scene.add(light4);

        camera.position.set(4,1,1);

        //Constrolls Camera
        const controls = new OrbitControls( camera, renderer.domElement );

        controls.enableDamping = true; // an anim
        controls.dampingFactor = 0.03;

        controls.minDistance = 3.5;
        controls.maxDistance = 8;

        controls.maxPolarAngle = Math.PI / 2;
       
       function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);    
            controls.update(); 
        }

        animate();

    