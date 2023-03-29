
// Import the useful function library
import { loadHTMLOnVideoEnd } from '/lib.js';
import { splashScreen } from '/scenes/01.5-splash-screen/splash-screen.js';

export function boatScene() {
    loadHTMLOnVideoEnd("/scenes/01.5-splash-screen/splash-screen.html",
                       "/scenes/01.5-splash-screen/style.css",
                       splashScreen,
                       "screen_1_video");
} // end boatScene
