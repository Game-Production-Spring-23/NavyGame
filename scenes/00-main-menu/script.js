import { loadNextLevel, getPageCounterInt } from "/lib.js";

export function mainMenu() {
  //global variables
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

  //sets the music volume to half
  music.volume = 0.05;

  //shows map in a pop up box when clicked
  // function toggleMap() {
  //   if (mapStatus == false) {
  //     mapScreen.style.display = "block";
  //     console.log("map on");
  //     mapStatus = true;
  //   } else {
  //     mapScreen.style.display = "none";
  //     console.log("map off");
  //     mapStatus = false;
  //   }
  // }

  //Future Functions -------------------------------------------------//

  // //shows main settings screen--TESTED. Works.
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

  function toggleSettingsOn() {
    //shows settings in a pop up box when clicked
    settingModal.style.visibility = "visible";
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
      splash.classList.add("fadeOut");

      splash.style.opacity = 0;
      setTimeout(() => {
        splash.classList.remove("fadeOut");
        splash.style.display = "none";
      }, 1000);
    });
  }

  //Changes display state of icons on hover
  function settingsHover(img) {
    if (img.src.match("/assets/images/ui/controlBtn.png")) {
      img.src = "/assets/images/ui/controlBtnHover.png";
    } else {
      img.src = "assets/images/ui/startBtnHover.png";
    }
  }

  function settingOut(img) {
    if (img.src.match("/assets/images/ui/controlBtnHover.png")) {
      img.src = "/assets/images/ui/controlBtn.png";
    } else {
      img.src = "/assets/images/ui/startBtn.png";
    }
  }

  //Changes display state of icons on hover
  function settingsHover(img) {
    if (img.src.match("/assets/images/ui/controlBtn.png")) {
      img.src = "/assets/images/ui/controlBtnHover.png";
    } else {
      img.src = "assets/images/ui/startBtnHover.png";
    }
  }

  function settingOut(img) {
    if (img.src.match("/assets/images/ui/controlBtnHover.png")) {
      img.src = "/assets/images/ui/controlBtn.png";
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
    document.getElementById("app").style.backgroundImage = "none";
    document.getElementById("titleLogo").style.display = "none";
  }

  window.settingsHover = settingsHover;
  window.settingOut = settingOut;
  window.showOptions = showOptions;
  window.changeVolume = changeVolume;
  // window.toggleMap = toggleMap;

  //Event Listeners
  document.getElementById("start").onclick = () => {
    loadNextLevel();
  };
  document.getElementById("startControlScreen").onclick = () => {
    loadNextLevel();
  };
} // end mainMenu
