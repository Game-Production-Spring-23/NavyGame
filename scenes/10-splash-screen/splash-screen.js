// Imports
import { playSplashScreen, devSkip } from "../../lib.js";
import { loadScene11 } from "../11-explore/scene11.js";

export function splashScreen() {
  devSkip(
    "/scenes/11-explore/index.html",
    "/scenes/11-explore/styles.css",
    loadScene11
  )

  playSplashScreen(
    "/scenes/02-deck-explore/index.html", // next scene's html
    "/scenes/02-deck-explore/styles.css", // next scene's css
    loadScene11, // the next scene's init function (called when the html & css have loaded)
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
