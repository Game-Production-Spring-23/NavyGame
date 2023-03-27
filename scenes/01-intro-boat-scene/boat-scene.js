
// Import the useful function library
import { loadNewHTMLFile } from '/lib.js';
import { mainMenu } from '/scenes/00-main-menu/script.js';

export function boatScene() {
    setTimeout(() => {
        loadNewHTMLFile("/scenes/00-main-menu/Main-Menu-Scene.html", mainMenu);
    }, 1000);
} // end boatScene
