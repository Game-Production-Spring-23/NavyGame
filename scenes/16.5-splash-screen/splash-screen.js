// Imports
import { playSplashScreen, devSkip } from "/lib.js";
import { credits } from "/scenes/17-credits/credits.js";

export function splashScreen() {
  devSkip(
    "/scenes/17-credits/credits.html",
    "/scenes/17-credits/creditsStyle.css",
    credits
  );

  playSplashScreen(
    "/scenes/17-credits/credits.html",
    "/scenes/17-credits/creditsStyle.css",
    credits, // the next scene's init function (called when the html & css have loaded)
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
