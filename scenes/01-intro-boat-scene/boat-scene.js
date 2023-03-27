
// Import the useful function library
import { loadNewHTMLFile } from '/lib.js';
import { mainMenu } from '/scenes/00-main-menu/script.js';

export function boatScene() {
    setTimeout(() => {
        loadNewHTMLFile("/scenes/00-main-menu/Main-Menu-Scene.html", 
                        "/scenes/00-main-menu/style.css",
                        mainMenu);
    }, 24*1000);
} // end boatScene
