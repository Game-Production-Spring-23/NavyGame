// Imports
import { playSplashScreen, devSkip } from "/lib.js";
import { splashScreen_B } from "/scenes/04.5-ship-wreck-splash/splash-screen.js";

export function splashScreen() {
  devSkip(
    "/scenes/04.5-ship-wreck-splash/splash-screen.html",
    "/scenes/04.5-ship-wreck-splash/style.css",
    splashScreen_B
  );

  playSplashScreen(
    "/scenes/04.5-ship-wreck-splash/splash-screen.html",
    "/scenes/04.5-ship-wreck-splash/style.css",
    splashScreen_B, // the next scene's init function (called when the html & css have loaded)
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
