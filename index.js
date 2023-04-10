// Start Script

import { loadNewHTMLFileIndex } from "./lib.js";
import * as mainMenuScene from "./scenes/00-main-menu/script.js";

const transition = document.getElementById("transition");

// loads next screen using an html file (given a path)
// and a function to call when the page is loaded
loadNewHTMLFileIndex(
  "/scenes/00-main-menu/Main-Menu-Scene.html",
  "/scenes/00-main-menu/style.css",
  mainMenuScene.mainMenu
);

export { transition };


let settingModal = document.getElementById("settingContainer");
let mainContainer = document.getElementById("app");
let journalScreen = document.getElementById("journalContainer");
let mapScreen = document.getElementById("mapContainer");
let music = document.getElementById("audio");
let settingsContainer = document.getElementById("settingsContainer");

let mapStatus = false;
let journalStatus = false;
let volume = true;

journalScreen.style.display = "none";
mapScreen.style.display = "none";
settingsContainer.style.display = "none";

function toggleVolume() {
    if (volume == true) {
      music.volume = 0;
      volume = false;
      let volumeIcon = document.getElementById("volumeIcon");
    } else {
      music.volume = 0.4;
      volume = true;
    }
  }

 function toggleMap(){
    if (mapStatus == false) {
      mapScreen.style.display="block";
      console.log("map on");
      mapStatus = true;
    } else {
      mapScreen.style.display="none";
      console.log("map off");
      mapStatus = false;
    }
  }

  //shows the player hournal when clicked
  function toggleJournal(){
    if (journalScreen.style.display == "none") {
      journalScreen.style.display="block";
      console.log("journal on");
    } else {
      journalScreen.style.display="none";
      console.log("journal off");
    }
  }


document.getElementById("mapOverlay").onclick = () => { toggleMap(); };
document.getElementById("journalOverlay").onclick = () => { toggleJournal(); };
document.getElementById("volumeIcon").onclick = () => { toggleVolume(); };
