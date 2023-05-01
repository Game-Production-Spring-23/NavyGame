// Imports
import { playSplashScreen, devSkip } from "/lib.js";
import { loadScene2 } from "/scenes/02-deck-explore/scene2.js";

export function splashScreen() {
  devSkip(
    "/scenes/02-deck-explore/index.html",
    "/scenes/02-deck-explore/styles.css",
    loadScene2
  );

  playSplashScreen(
    "/scenes/02-deck-explore/index.html",
    "/scenes/02-deck-explore/styles.css",
    loadScene2, // the next scene's init function (called when the html & css have loaded)
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
