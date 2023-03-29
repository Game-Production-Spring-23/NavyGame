// Imports
import { playSplashScreen } from "../../lib.js";
import { loadScene } from "/scenes/03-pipe-minigame/pipe-minigame.js";

export function splashScreen() {
  playSplashScreen(
    "/scenes/03-pipe-minigame/pipemini-game.html", // next scene's html
    "/scenes/03-pipe-minigame/minigame1styles.css", // next scene's css
    loadScene, // the next scene's init function (called when the html & css have loaded)
    3000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
