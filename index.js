// Start Script

import * as lib from './lib.js';
import * as script from './scenes/00-main-menu/script.js';

// loads next screen using an html file (given a path) 
// and a function to call when the page is loaded
lib.loadNewHTMLFile('./scenes/00-main-menu/Main-Scene.html', script.mainMenu);
