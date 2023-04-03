//import { loadNewHTMLFile } from "/lib.js";
import { loadHTMLOnVideoEnd } from "/lib.js";
//import { loadScene2 } from "/scenes/02-deck-explore/scene2.js";
import { splashScreen } from "/scenes/01.5-splash-screen/splash-screen.js";

export function boatScene() {
  loadHTMLOnVideoEnd(
    "/scenes/01.5-splash-screen/splash-screen.html",
    "/scenes/01.5-splash-screen/style.css",
    splashScreen,
    "screen_1_video"
  );
} // end boatScene
