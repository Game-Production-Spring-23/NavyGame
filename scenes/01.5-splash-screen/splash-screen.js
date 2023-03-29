// Imports
import { playSplashScreen } from "../../lib.js";
import { loadScene } from "/scenes/03-pipe-minigame/pipe-minigame.js";

export function splashScreen() {
  playSplashScreen(
    "/scenes/03-pipe-minigame/pipemini-game.html",
    "/scenes/03-pipe-minigame/minigame1styles.css",
    loadScene,
    3000
  );
} // end splashScreen
