// Imports
import { playSplashScreen, getCurrentLevelIndex } from "/lib.js";

export function damage() {
  playSplashScreen(
    getCurrentLevelIndex() + 1,
    4000 // miliseconds for the delay before transitioning
  );
} // end splashScreen
