// Import the useful function library
import { loadNewHTMLFile } from "/lib.js";
import { mainMenu } from "/scenes/00-main-menu/script.js";
import { loadScene } from "/scenes/03-pipe-minigame/pipe-minigame.js";

export function boatScene() {
  setTimeout(() => {
    loadNewHTMLFile(
      "/scenes/03-pipe-minigame/pipemini-game.html",
      "/scenes/03-pipe-minigame/minigame1styles.css",
      loadScene
    );
  }, 2000); //24 * 1000);
}
