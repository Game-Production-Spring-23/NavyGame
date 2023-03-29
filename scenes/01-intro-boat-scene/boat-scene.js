//import { loadNewHTMLFile } from "/lib.js";
import { loadHTMLOnVideoEnd } from "/lib.js";
import { loadScene2 } from "/scenes/02-deck-explore/scene2.js";
//import { splashScreen } from "/scenes/01.5-splash-screen/splash-screen.js";

export function boatScene() {
  loadHTMLOnVideoEnd(
    "/scenes/02-deck-explore/index.html",
    "/scenes/02-deck-explore/styles.css",
    loadScene2,
    "screen_1_video"
  );
} // end boatScene
