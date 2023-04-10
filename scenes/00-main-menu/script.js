import { loadNewHTMLFile, devSkip } from "../../lib.js";
import { boatScene } from "../01-intro-boat-scene/boat-scene.js";

export function mainMenu() {
  //global variables
  let splash = document.getElementById("splash");
  let bottomLinks = document.getElementById("bottomLinks"); //Links at bottom of start screen
  let gameContainer = document.getElementById("gameContainer"); //Container for game
  let settingsContainer = document.getElementById("settingsContainer"); //Container for settings
  let scoreContainer = document.getElementById("scoreContainer");
  let journalScreen = document.getElementById("journalContainer");
  let mapScreen = document.getElementById("mapContainer");
  let music = document.getElementById("audio");
  journalScreen.style.display = "none";
  mapScreen.style.display = "none";
  settingsContainer.style.display = "none";
  let settingModal = document.getElementById("settingContainer");
  let mainContainer = document.getElementById("app");
  let mapStatus = false;
  let uiOverlay = document.getElementById("uiOverlay");


  splashScreen();

  //shows map in a pop up box when clicked
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


  //Future Functions -------------------------------------------------//

  //grabs a video from the queue and plays it in the gameContainer div
  function playVideo() {
    //grabs video from queue
    //plays video in gameContainer div
  }

  function updateScore() {
    //convert innerhtml to int and add 1
    var score = document.getElementById("score");
    score.innerHTML = parseInt(score.innerHTML) + 1;
    console.log(score);
  }

  //Resets score to zero
  function clearScore() {
    var score = document.getElementById("score");
    score.innerHTML = 0;
    console.log(score);
  }

  //grabs a dialogue from the queue and plays it in the gameContainer div
  function startDialogue() {
    //grabs dialogue from queue
    //plays dialogue in gameContainer div
  }

  //closes the dialogue and resumes the game
  function endDialogue() {
    //ends dialogue
    //updates queue number
  }

  //closes the video and resumes the game
  function endVideo() {
    //ends video
    //updates queue number
  }

  //shows main settings screen--TESTED. Works.
  function showOptions() {
    //shows options, hides bottom links and replaces elements with settingsContainer
    bottomLinks.style.display = "none";
    gameContainer.style.display = "none";
    settingsContainer.style.display = "block";
    score.style.visibility = "hidden";
  }

  //Tested, Works.
  function hideOptions() {
    //hides options
    bottomLinks.style.visibility = "visible";
  }

  //plays or shows the introduction
  function introduction() {
    //shows introduction
  }


 

  function toggleSettingsOn() {
    //shows settings in a pop up box when clicked
    settingModal.style.visibility = "visible";
  }

  function toggleSettingsOff() {
    //hides settings popup box when clicked
  }

  function toggleJournalOn() {
    //tested, works
    //shows journal in a pop up box when clicked
    journalScreen.style.display = "block";
  }

  //hides journal popup box when clicked
  function toggleJournalOff() {
    //tested, works
    journalScreen.style.display = "none";
  }

  //changed volume
  function changeVolume(val) {
    music.volume = val;
    console.log(val);
  }

  function splashScreen() {
    splash.addEventListener("click", () => {
      //Plays background music
      music.volume = 0.4;
      //music.play();

      splash.classList.add("fadeOut");

      splash.style.opacity = 0;
      setTimeout(() => {
        splash.classList.remove("fadeOut");
        splash.style.display = "none";
      }, 1000);
    });
  }

  function introVideo() {
    //plays intro video
  }

  function pause() {
    //pauses game
  }

  function resume() {
    //resumes game
  }

  function continueDialogue() {
    //continues dialogue
  }

  //Changes display state of icons on hover
  function settingsHover(img) {
    if (img.src.match("/assets/images/ui/introBtn.png")) {
      img.src = "/assets/images/ui/introBtnHover.png";
    } else {
      img.src = "assets/images/ui/startBtnHover.png";
    }
  }

  function settingOut(img) {
    if (img.src.match("/assets/images/ui/introBtnHover.png")) {
      img.src = "/assets/images/ui/introBtn.png";
    } else {
      img.src = "/assets/images/ui/startBtn.png";
    }
  }

  //Changes display state of icons on hover
  function settingsHover(img) {
    if (img.src.match("/assets/images/ui/introBtn.png")) {
      img.src = "/assets/images/ui/introBtnHover.png";
    } else {
      img.src = "assets/images/ui/startBtnHover.png";
    }
  }

  function settingOut(img) {
    if (img.src.match("/assets/images/ui/introBtnHover.png")) {
      img.src = "/assets/images/ui/introsBtn.png";
    } else {
      img.src = "/assets/images/ui/startBtn.png";
    }
  }


  //shows main settings screen--TESTED. Works.
  function showOptions() {
    //shows options, hides bottom links and replaces elements with settingsContainer
    bottomLinks.style.display = "none";
    gameContainer.style.display = "none";
    settingsContainer.style.display = "block";
    score.style.visibility = "hidden";
  }

  window.settingsHover = settingsHover;
  window.settingOut = settingOut;
  window.showOptions = showOptions;
  window.changeVolume = changeVolume;
  window.toggleMap = toggleMap;

  // what to skip to
  devSkip(
    "/scenes/01-intro-boat-scene/boat-scene.html",
    "/scenes/01-intro-boat-scene/style.css",
    boatScene
  );

  document.getElementById("mapOverlay").onclick = () => { toggleMap(); };
  document.getElementById("start").onclick = () => {
    loadNewHTMLFile(
      "/scenes/01-intro-boat-scene/boat-scene.html",
      "/scenes/01-intro-boat-scene/style.css",
      boatScene
    );
  }; // end setOnclick for start
} // end mainMenu
