import { SafiraWebGL } from './SafiraWebGL/SafiraWebGL';
import './styles/global.scss';

// import * as dat from 'dat.gui';
// import gsap from 'gsap';

function index() {
  // create a new world
  const portal = new SafiraWebGL({ dom: document.querySelector('.webgl') });

  // draw the scene
  portal.render();
}

index();
    