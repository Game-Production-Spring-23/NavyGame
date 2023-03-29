
// Import the useful function library
import { loadHTMLOnVideoEnd } from '/lib.js';
import { mainMenu } from '/scenes/00-main-menu/script.js';

export function boatScene() {
    loadHTMLOnVideoEnd("/scenes/00-main-menu/Main-Menu-Scene.html",
                       "/scenes/00-main-menu/style.css",
                       mainMenu,
                       "screen_1_video");
} // end boatScene
