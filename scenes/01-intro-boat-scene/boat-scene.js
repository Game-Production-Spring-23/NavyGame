//import { loadNewHTMLFile } from "/lib.js";
import { loadHTMLOnVideoEnd } from "/lib.js";
import { loadScene } from "../03-pipe-minigame/pipe-minigame.js";
//import { splashScreen } from "/scenes/01.5-splash-screen/splash-screen.js";

export function boatScene() {
  loadHTMLOnVideoEnd(
    "/scenes/03-pipe-minigame/pipemini-game.html",
    "/scenes/03-pipe-minigame/minigame1styles.css",
    loadScene,
    "screen_1_video"
  );
} // end boatScene
