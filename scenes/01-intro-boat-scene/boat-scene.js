
// Import the useful function library
import { loadNewHTMLFile } from '/lib.js';
import { mainMenu } from '/scenes/00-main-menu/script.js';

export function boatScene() {
    let video = document.getElementById("screen_1_video");
    video.onloadedmetadata = () => {
        setTimeout(() => {
            loadNewHTMLFile("/scenes/00-main-menu/Main-Menu-Scene.html", 
                            "/scenes/00-main-menu/style.css",
                            mainMenu);
        }, video.duration * 1000); // end setTimeout
    } // end onloadedmetatdata
} // end boatScene
