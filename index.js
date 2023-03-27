// Start Script

import { loadNewHTMLFile } from './lib.js';
import * as mainMenuScene from './scenes/00-main-menu/script.js';

// loads next screen using an html file (given a path) 
// and a function to call when the page is loaded
loadNewHTMLFile('./scenes/00-main-menu/Main-Menu-Scene.html', mainMenuScene.mainMenu);
