// Imports
import { playSplashScreen, getCurrentLevelIndex } from "/lib.js";
import { credits } from "/scenes/17-credits/credits.js";

export function sailAway() {
  playSplashScreen(
    getCurrentLevelIndex() + 1,
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
