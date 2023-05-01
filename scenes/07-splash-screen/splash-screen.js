// Imports
import { playSplashScreen, devSkip } from "/lib.js";
import { loadScene8 } from "/scenes/08-jungle-explore/scene8.js";

export function splashScreen() {
  devSkip(
    "/scenes/08-jungle-explore/index.html",
    "/scenes/08-jungle-explore/styles.css",
    loadScene8
  );

  playSplashScreen(
    "/scenes/08-jungle-explore/index.html",
    "/scenes/08-jungle-explore/styles.css",
    loadScene8,
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
