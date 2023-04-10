// Imports
import { playSplashScreen, devSkip } from "../../lib.js";
import { loadScene8 } from "/scenes/08-explore/scene8.js";

export function splashScreen() {
  devSkip(
    "/scenes/08-explore/index.html",
    "/scenes/08-explore/styles.css",
    loadScene8
  )

  playSplashScreen(
    "/scenes/08-explore/index.html", // next scene's html
    "/scenes/08-explore/styles.css", // next scene's css
    loadScene8, // the next scene's init function (called when the html & css have loaded)
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
