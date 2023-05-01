// Imports
import { playSplashScreen, devSkip } from "../../lib.js";
import { shipMiniGame } from "/scenes/15-ship-loading-minigame/ship-loading-minigam.js";

export function splashScreen() {
  devSkip(
    "/scenes/15-ship-loading-minigame/ship-loading-minigame.html",
    "/scenes/15-ship-loading-minigame/minigame5styles.css",
    shipMiniGame
  );

  playSplashScreen(
    "/scenes/15-ship-loading-minigame/ship-loading-minigame.html",
    "/scenes/15-ship-loading-minigame/minigame5styles.css",
    shipMiniGame, // the next scene's init function (called when the html & css have loaded)
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
