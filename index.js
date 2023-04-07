// Start Script

import { loadNewHTMLFileIndex } from "./lib.js";
import * as mainMenuScene from "./scenes/00-main-menu/script.js";
//import { loadScene6 } from "../06-priority-minigame/priority-minigame.js";

const transition = document.getElementById("transition");

// loads next screen using an html file (given a path)
// and a function to call when the page is loaded
loadNewHTMLFileIndex(
  "/scenes/00-main-menu/Main-Menu-Scene.html",
  "/scenes/00-main-menu/style.css",
  mainMenuScene.mainMenu
);

export { transition };
