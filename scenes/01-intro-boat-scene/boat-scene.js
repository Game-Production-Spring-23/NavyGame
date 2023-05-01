import { loadHTMLOnVideoEnd, devSkip } from "/lib.js";
import { splashScreen } from "/scenes/01.5-splash-screen/splash-screen.js";

export function boatScene() {
  devSkip(
    "/scenes/01.5-splash-screen/splash-screen.html",
    "/scenes/01.5-splash-screen/style.css",
    splashScreen,
  )
  
  loadHTMLOnVideoEnd(
    "/scenes/01.5-splash-screen/splash-screen.html",
    "/scenes/01.5-splash-screen/style.css",
    splashScreen,
    "screen_1_video"
  );
} // end boatScene
