// Imports
import { playSplashScreen, devSkip } from "/lib.js";
import { loadScene5 } from "/scenes/05-beach-explore/scene5.js";

export function splashScreen_B() {
  devSkip(
    "/scenes/05-beach-explore/index.html",
    "/scenes/05-beach-explore/styles.css",
    loadScene5
  );

  playSplashScreen(
    "/scenes/05-beach-explore/index.html",
    "/scenes/05-beach-explore/styles.css",
    loadScene5, // the next scene's init function (called when the html & css have loaded)
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
