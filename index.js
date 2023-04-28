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
//--------------Variables-----------------//
let settingModal = document.getElementById("settingContainer");
let mainContainer = document.getElementById("app");
let journalScreen = document.getElementById("journalContainer");
let mapScreen = document.getElementById("mapContainer");
let music = document.getElementById("audio");
let settingsContainer = document.getElementById("settingsContainer");
let charOneSelect = document.getElementById("charOneAv");
let charTwoSelect = document.getElementById("charTwoAv");
let charThreeSelect = document.getElementById("charThreeAv");
let uiTab = document.getElementById("uiTab");
let ui = document.getElementById("uiOverlayLeft");
let uiKeyRt = document.getElementById("rArrowUI");
let uiKeyLt = document.getElementById("lArrowUI");

let uiOpen = true;
let charSprite; //sprite of the character selected
let splashSprite; //sprite of the splash screen
let mapStatus = false;
let journalStatus = false;
let volume = true;
let uiKeyR=false;
let uiKeyL=false;

uiKeyRt.style.display = "none";
uiKeyLt.style.display = "none";


function closeUI(){
  //hide ui and slide uiTab to left of screen
  ui.style.display = "none";
  uiTab.style.left = "0px";
  uiOpen=false;
}






//sprite selection [need to import assets]
// let charSelect(){
//   if (charOneSelect == true){
//     charSprite = "/playerwalk.gif";
//     splashSprite = "/charOne.png";}
//   else if (charTwoSelect == true){
//     charSprite = "/playerwalk2.gif";
//     splashSprite = "/charTwo.png";}
//   else if (charThreeSelect == true){
//     charSprite = "/playerwalk3.gif";
//     splashSprite = "/charThree.png";
//   }}


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
  if (mapStatus == false) {
    mapScreen.style.display = "block";
    console.log("map on");
    mapStatus = true;
  } else {
    mapScreen.style.display = "none";
    console.log("map off");
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

function rKeyOnScreen(){
  uiKeyRt.style.display = "block";
  uiKeyR=true;
}

function lKeyOnScreen(){
  uiKeyLt.style.display = "block";
  uiKeyL=true;
}

function lKeyOffScreen(){
  uiKeyLt.style.display = "none";
  uiKeyL=false;
}

function rKeyOffScreen(){
  uiKeyRt.style.display = "none";
  uiKeyR=false;
}







//--------------Event Listeners-----------------//
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
  if(uiOpen){
    closeUI();
  }else{
    ui.style.display = "block";
    uiTab.style.left = "172px";
    uiOpen=true;
  }
};

closeUI();