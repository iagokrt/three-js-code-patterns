// console.log('loading scripts!')
import { SceneManager } from './SceneManager'

// const canvas = document.getElementById("canvas"); // console.log(canvas)
const body = document.querySelector('body')
const canvas = document.createElement('canvas')
body.appendChild(canvas)
// console.log(canvas)

const sceneManager = new SceneManager(canvas);

bindEventListeners();
render();

function bindEventListeners() {
	window.onresize = resizeCanvas;
	resizeCanvas();	
}

function resizeCanvas() {
	canvas.style.width = '100%';
	canvas.style.height= '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    sceneManager.onWindowResize();
}

function render() {
    requestAnimationFrame(render);
    sceneManager.update();
}