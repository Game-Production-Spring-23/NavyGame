// Imports
import { playSplashScreen, devSkip } from "/lib.js";
import { splashScreen_B } from "/scenes/07-natives-splash/splash-screen.js";

export function splashScreen() {
  devSkip(
    "/scenes/07-natives-splash/splash-screen.html",
    "/scenes/07-natives-splash/style.css",
    splashScreen_B
  );

  playSplashScreen(
    "/scenes/07-natives-splash/splash-screen.html",
    "/scenes/07-natives-splash/style.css",
    splashScreen_B, // the next scene's init function (called when the html & css have loaded)
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
