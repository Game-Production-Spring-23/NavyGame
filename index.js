// Start Script

import { getPageCounterInt, loadNewHTMLFile } from "./lib.js";
import * as mainMenuScene from "./scenes/00-main-menu/script.js";

const transition = document.getElementById("transition");

// initialize page counter
localStorage.setItem("page", "0");

// loads next screen using an html file (given a path)
// and a function to call when the page is loaded
loadNewHTMLFile(
  "/scenes/00-main-menu/Main-Menu-Scene.html",
  "/scenes/00-main-menu/style.css",
  mainMenuScene.mainMenu
);

export { transition };
//--------------Variables-----------------//
let settingModal = document.getElementById("settingContainer");
let mainContainer = document.getElementById("app");
let journalScreen = document.getElementById("journalContainer");
let mapScreen = document.getElementById("mapContainer");
let music = document.getElementById("audio");
let settingsContainer = document.getElementById("settingsContainer");
let uiTab = document.getElementById("uiTab");
let ui = document.getElementById("uiOverlayLeft");
let uiKeyRt = document.getElementById("rArrowUI");
let uiKeyLt = document.getElementById("lArrowUI");
let bottomLinks = document.getElementById("bottomLinks"); //Links at bottom of start screen
let gameContainer = document.getElementById("gameContainer"); //Container for game
let mapImage = document.getElementById("mapModal");
journalScreen.style.display = "none";
mapScreen.style.display = "none";
settingsContainer.style.display = "none";
let charRank = document.getElementById("charRank");

let uiOverlay = document.getElementById("uiOverlay");

let uiOpen = true;
let mapStatus = false;
let journalStatus = false;
let volume = true;
let uiKeyR = false;
let uiKeyL = false;

uiKeyRt.style.display = "none";
uiKeyLt.style.display = "none";

function getMap(){
  //get page from local storage
  let page=localStorage.getItem("page");

  //switch statement to get map image, journal content and rank
  switch (page) {
    case "0":
     
      charRank.classList.add("rank1");
      mapImage.classList.add("mapBlank");
      console.log("screen 0 starting screen");
      break;
    case "1":
      charRank.classList.add("rank1");
      mapImage.classList.add("mapBlank");
      console.log("screen 1 starting screen");
      break;
    case "2":
      charRank.classList.add("rank1");
      mapImage.classList.add("mapBlank");
      console.log("screen2 = boatscreen");
      break;
    case "3":
      charRank.classList.add("rank1");
      mapImage.classList.add("mapBlank");
      console.log("screen 3 = boat Explore 1");
      break;

    case "4":
    charRank.classList.add("rank1");
    mapImage.classList.add("map1");
    console.log("screen 4 = boiler room");  
    break;

    case "5":
    charRank.classList.add("rank2");
    mapImage.classList.add("map1");
    console.log("screen 5 = ship splash");
    break;

    case "6":
    charRank.classList.add("rank2");
    mapImage.classList.add("map1");
    console.log("screen 6 = ship crash splash ");
    break;

    case "7":
    charRank.classList.add("rank2");
    mapImage.classList.add("map2");
    console.log("screen 7 = beach explore1 ");
    break;

    case "8":
    charRank.classList.add("rank2");
    mapImage.classList.add("map2");
    console.log("screen 8 = minigame2");
    break;

    case "9":
    charRank.classList.add("rank3");
    mapImage.classList.add("map2");
    console.log("screen 9 = fixing splash");
    break;

    case "10":
    charRank.classList.add("rank3");
    mapImage.classList.remove("map2");
    mapImage.classList.add("map3");
    console.log("screen 10 = island splash ");
    break;

    case "11":
    charRank.classList.add("rank3");
    mapImage.classList.add("map3");
    console.log("screen 11 = jungle explore1");
    break;

    case "12":
    charRank.classList.add("rank3");
    mapImage.classList.add("map4");
    console.log("screen 12 = blacksmith minigame ");
    break;

    case "13":
    charRank.classList.add("rank4");
    mapImage.classList.add("map4");
    console.log("screen 13 = splash");

    case "14":
    charRank.classList.add("rank4");
    mapImage.classList.add("map6");
    console.log("screen 14 = beach explore 2");
    break;

    case "15":
    charRank.classList.add("rank4");
    mapImage.classList.add("map6");
    console.log("screen 15 = probability game ");
    break;

    case "16":
    charRank.classList.add("rank5");
    mapImage.classList.add("map2");
    console.log("screen 16 = resources minigame ");
    break;

    case "17":
    charRank.classList.add("rank6");
    mapImage.classList.add("map2");
    console.log("screen 17 = ending boat explore");
    break;


      default:
        mapImageImage.classList.add("mapBlank");
        console.log("map 0 starting screen");
        break;

  }
}

function closeUI() {
  //hide ui and slide uiTab to left of screen
  ui.style.display = "none";
  uiTab.style.left = "0px";
  uiOpen = false;
}

//-----------UI Controls--------------//
journalScreen.style.display = "none";
mapScreen.style.display = "none";
settingsContainer.style.display = "none";
uiKeyRt.style.display = "none";
uiKeyLt.style.display = "none";

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

function toggleMap() {
  getMap();
  console.log(mapStatus);
  if (mapStatus == false) {
    mapScreen.style.display = "block";
    // console.log("map on");
    mapStatus = true;
  } else {
    mapScreen.style.display = "none";
    // console.log("map off");
    mapStatus = false;
  }
}

//shows the player journal when clicked
function toggleJournal() {
  if (journalScreen.style.display == "none") {
    journalScreen.style.display = "block";
    console.log("journal on");
  } else {
    journalScreen.style.display = "none";
    console.log("journal off");
  }
}

export function rKeyOnScreen() {
  uiKeyRt.style.display = "block";
  uiKeyR = true;
}

export function lKeyOnScreen() {
  uiKeyLt.style.display = "block";
  uiKeyL = true;
}

export function lKeyOffScreen() {
  uiKeyLt.style.display = "none";
  uiKeyL = false;
}

export function rKeyOffScreen() {
  uiKeyRt.style.display = "none";
  uiKeyR = false;
}

//--------------Event Listeners-----------------//

//on page load
document.getElementById("mapOverlay").onclick = () => {
  toggleMap();
};
document.getElementById("journalOverlay").onclick = () => {
  toggleJournal();
};
document.getElementById("volumeIcon").onclick = () => {
  toggleVolume();
};
document.getElementById("uiTab").onclick = () => {
  getMap();
  if (uiOpen) {
    closeUI();
  } else {
    // setMapAndJournal();
    ui.style.display = "block";
    uiTab.style.left = "172px";
    uiOpen = true;
  }
};

closeUI();
