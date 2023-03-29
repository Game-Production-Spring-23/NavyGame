import { loadNewHTMLFile } from "/lib.js";
import { splashScreen } from "/scenes/01.5-splash-screen/splash-screen.js";

export function boatScene() {
  setTimeout(() => {
    loadNewHTMLFile(
      "/scenes/01.5-splash-screen/splash-screen.html",
      "/scenes/01.5-splash-screen/style.css",
      splashScreen
    );
  }, 1000); //24 * 1000);
}
