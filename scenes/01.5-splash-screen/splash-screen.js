// Imports
import { playSplashScreen } from "../../lib.js";
import { loadScene2 } from "/scenes/02-deck-explore/scene2.js";

export function splashScreen() {
  playSplashScreen(
    "/scenes/02-deck-explore/index.html", // next scene's html
    "/scenes/02-deck-explore/styles.css", // next scene's css
    loadScene2, // the next scene's init function (called when the html & css have loaded)
    3000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
