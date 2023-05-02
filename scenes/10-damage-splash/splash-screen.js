// Imports
import { playSplashScreen, devSkip } from "/lib.js";
import { loadScene11 } from "/scenes/11-explore/scene11.js";

export function splashScreen() {
  devSkip(
    "/scenes/11-explore/index.html",
    "/scenes/11-explore/styles.css",
    loadScene11
  )

  playSplashScreen(
    "/scenes/11-explore/index.html",
    "/scenes/11-explore/styles.css",
    loadScene11,
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
