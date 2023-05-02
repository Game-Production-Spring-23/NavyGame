/*
    Edwin Sanchez - Navy Game - Function Library
    A library of useful functions.
*/
import { transition } from "./index.js";
import { setDialogueOccurring } from "./scenes/dialogue.js";

// the list of globalTimeouts. used to remove timeouts when devSkip is called.
document.globalTimeouts = [];

// Loads and transitions to a new HTML file given a file name and a style sheet
// the next parameter is a callback function.
export function loadNewHTMLFile(filePath, styleSheetPath, next) {
  // update page counter
  let pageCounter = localStorage.getItem("page");
  if(pageCounter) { // if page counter exists
    pageCounter = parseInt(pageCounter); // parse as an integer
    pageCounter += 1; // increment
    localStorage.setItem("page", `${pageCounter}`); // set back to page variable, as a string
  } // end if

  //Fade in
  transition.style.display = "block";
  transition.classList.add("fadeInAndOut");

  //Loads new html file in between fade in and out
  //document.globalTimeouts.push(
  setTimeout(() => {
    // load the new html file
    fetch(filePath)
      .then((response) => response.text())
      .then(
        (text) =>
          (document.getElementById("htmlMainContainer").innerHTML = text)
      )
      .then(() => {
        loadStyleSheet(styleSheetPath);
        next();

        //Fade Out
        setTimeout(() => {
          transition.classList.remove("fadeInAndOut");
          transition.style.display = "none";
        }, 2000); // end setTimeout
      });
  }, 1000); // end setTimeout
  //);
} // end loadNewHTMLFile

// Loads a new HTML file given a file name and a style sheet for the beginning
// the next parameter is a callback function.
export function loadNewHTMLFileIndex(filePath, styleSheetPath, next) {
  // load the new html file
  fetch(filePath)
    .then((response) => response.text())
    .then(
      (text) => (document.getElementById("htmlMainContainer").innerHTML = text)
    )
    .then(() => {
      loadStyleSheet(styleSheetPath);
      next();
    });
} // end loadNewHTMLFile

// loads the next screen once the given video ends.
// The video is given as the id of the element.
// the first 3 parameters are the same as loadNewHTMLFile
export function loadHTMLOnVideoEnd(
  levelIndex,
  videoElementID
) {
  let video = document.getElementById(videoElementID);
  video.onloadedmetadata = () => {
    video.play();
    document.globalTimeouts.push(
      setTimeout(() => {
        loadLevel(levelIndex);
      }, video.duration * 1000)
    ); // end append
  }; // end onloadedmetadata
} // end loadHTMLOnVideoEnd

// Loads a stylesheet into the current html file.
// Called by default in LoadNewHTMLFile and loadHTMLOnVideoEnd
export function loadStyleSheet(styleSheetPath) {
  // remove previous stylesheet
  let link = document.getElementById("style");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", styleSheetPath);
} // end

// plays a splash screen for a given amount of time.
// waitTime is in miliseconds.
export function playSplashScreen(levelIndex, waitTime) {
  document.globalTimeouts.push(
    setTimeout(() => {
      loadLevel(levelIndex);
    }, waitTime)
  ); // end append
} // end playSplashScreen

export function insertName(text, name) {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "*") {
      newText += name;
    } else {
      newText += text[i];
    } // end if
  } // end for
  return newText;
} // end insertText

//Lists all event listeners in document as a reference
var eventListenerList = [];

document.addEventListener("keydown", skipper);

// used to skip between levels
function skipper(event) {
  // load the next level (skip)
  if (event.key == "~") {
    resetWebpage();
    loadNextLevel();
  } // end if

  // load the previous level (skip)
  if(event.key == "#") {
    resetWebpage();
    loadPrevLevel();
  } // end if

  if (event.key == "@") {
    console.log(eventListenerList);
  }
} // end skipper

function resetWebpage() {
   // remove all setTimeouts that have been set
   for (let i = 0; i < document.globalTimeouts.length; i++) {
    clearTimeout(document.globalTimeouts[i]);
  } // end for

  //Removes all event listeners from document by going through the eventListenerList manually
  for (let i = 0; i < eventListenerList.length; i++) {
    document.removeEventListener(
      eventListenerList[i].type,
      eventListenerList[i].listener
    );
  } // end for
  //Clears the eventListenerList
  eventListenerList = [];

  setDialogueOccurring(false);
} // end resetWebpage

//Adds event listener to the event listener list, needs a key (identifier), a type (onkeydown, onkeyup, etc) and the event listener callback function
export function addToEventListenerList(key, type, listener) {
  eventListenerList.push({ key, type, listener });
}

//Removes event listener from the event listener list, needs a key to remove it
export function removeFromEventListenerList(key) {
  eventListenerList = eventListenerList.filter((obj) => !key.includes(obj.key));
}


// get page counter as an int
export function getPageCounterInt() {
  return parseInt(localStorage.getItem("page"));
} // end getPageCounterInt


// get page counter as a string
export function getPageCounterStr() {
  return localStorage.getItem("page");
} // end getPageCounterStr


// reset the page counter when the game restarts
export function resetPageCounter() {
  localStorage.setItem("page", "0");
} // end resetPageCounter


/* setup new level navigation system */

// Import ALL Levels
import { mainMenu } from "/scenes/00-main-menu/script.js";
import { boatScene } from "/scenes/01-intro-boat-scene/boat-scene.js";
import { loadScene2 } from "/scenes/02-deck-explore/scene2.js";
import { loadScene3 } from "/scenes/03-pipe-minigame/pipe-minigame.js";
import { shipInStorm } from "/scenes/04-ship-in-storm/splash-screen.js";
import { shipWreck } from "/scenes/04.5-ship-wreck-splash/splash-screen.js";
import { loadScene5 } from "/scenes/05-beach-explore/scene5.js";
import { loadScene6 } from "/scenes/06-priority-minigame/priority-minigame-part-1.js";
import { fixMast } from "/scenes/06.5-fixing-mast-splash/splash-screen.js";
import { natives } from "/scenes/07-natives-splash/splash-screen.js";
import { loadScene8 } from "/scenes/08-jungle-explore/scene8.js";
import { loadScene9 } from "/scenes/09-shopping-minigame/shopping-minigame.js";
import { damage } from "/scenes/10-damage-splash/splash-screen.js";
import { loadScene11 } from "/scenes/11-explore/scene11.js";
import { miniGame4 } from "/scenes/12-mini-game-4/mini-game-4.js";
import { shipMiniGame } from "/scenes/15-ship-loading-minigame/ship-loading-minigam.js";
import { endScreen } from "/scenes/16-end-screen/endScreen.js";
import { sailAway } from "/scenes/16.5-sail-away-splash/splash-screen.js";
import { credits } from "/scenes/17-credits/credits.js";

// value of the current level index
let currentLevelIndex = 0; // set to 0 by default
// DO NOT CHANGE CURRENT LEVEL MANUALLY. TO BE HANDLED BY 'loadLevel' FUNCTION

// list of all levels
const levelList = [
  {
    "html_file": "/scenes/00-main-menu/Main-Menu-Scene.html",
    "css_file": "/scenes/00-main-menu/style.css",
    "callback": mainMenu
  },
  {
    "html_file": "/scenes/01-intro-boat-scene/boat-scene.html",
    "css_file": "/scenes/01-intro-boat-scene/style.css",
    "callback": boatScene
  },
  {
    "html_file": "/scenes/02-deck-explore/index.html",
    "css_file": "/scenes/02-deck-explore/styles.css",
    "callback": loadScene2
  },
  {
    "html_file": "/scenes/03-pipe-minigame/pipemini-game.html",
    "css_file": "/scenes/03-pipe-minigame/minigame1styles.css",
    "callback": loadScene3
  },
  {
    "html_file": "/scenes/04-ship-in-storm/splash-screen.html",
    "css_file": "/scenes/04-ship-in-storm/style.css",
    "callback": shipInStorm
  },
  {
    "html_file": "/scenes/04.5-ship-wreck-splash/splash-screen.html",
    "css_file": "/scenes/04.5-ship-wreck-splash/style.css",
    "callback": shipWreck
  },
  {
    "html_file": "/scenes/05-beach-explore/index.html",
    "css_file": "/scenes/05-beach-explore/styles.css",
    "callback": loadScene5
  },
  {
    "html_file": "/scenes/06-priority-minigame/priority-minigame.html",
    "css_file": "/scenes/06-priority-minigame/minigame2styles.css",
    "callback": loadScene6
  },
  {
    "html_file": "/scenes/06.5-fixing-mast-splash/splash-screen.html",
    "css_file": "/scenes/06.5-fixing-mast-splash/style.css",
    "callback": fixMast
  },
  {
    "html_file": "/scenes/07-natives-splash/splash-screen.html",
    "css_file": "/scenes/07-natives-splash/style.css",
    "callback": natives
  },
  {
    "html_file": "/scenes/08-jungle-explore/index.html",
    "css_file": "/scenes/08-jungle-explore/styles.css",
    "callback": loadScene8
  },
  {
    "html_file": "/scenes/09-shopping-minigame/shopping_minigame.html",
    "css_file": "/scenes/09-shopping-minigame/minigame3styles.css",
    "callback": loadScene9
  },
  {
    "html_file": "/scenes/10-damage-splash/splash-screen.html",
    "css_file": "/scenes/10-damage-splash/style.css",
    "callback": damage
  },
  {
    "html_file": "/scenes/11-explore/index.html",
    "css_file": "/scenes/11-explore/styles.css",
    "callback": loadScene11
  },
  {
    "html_file": "/scenes/12-mini-game-4/index.html",
    "css_file": "/scenes/12-mini-game-4/style.css",
    "callback": miniGame4
  },
  {
    "html_file": "/scenes/15-ship-loading-minigame/ship-loading-minigame.html",
    "css_file": "/scenes/15-ship-loading-minigame/minigame5styles.css",
    "callback": shipMiniGame
  },
  {
    "html_file": "/scenes/16-end-screen/endScreen.html",
    "css_file": "/scenes/16-end-screen/style.css",
    "callback": endScreen
  },
  {
    "html_file": "/scenes/16.5-sail-away-splash/splash-screen.html",
    "css_file": "/scenes/16.5-sail-away-splash/style.css",
    "callback": sailAway
  },
  {
    "html_file": "/scenes/17-credits/credits.html",
    "css_file": "/scenes/17-credits/creditsStyle.css",
    "callback": credits
  }
]; // end levelList


// loads a level based on a given index
export function loadLevel(levelIndex) {
  // make sure index is in range
  levelIndex = levelIndex % levelList.length;
  
  // make sure its not less than 0
  if(levelIndex < 0) {
    levelIndex = 0;
  } // end if

  // set currentLevel value to current level
  currentLevelIndex = levelIndex;

  // get the level
  let levelInfo = levelList[levelIndex];

  // check if the page counter needs to be reset
  if (levelIndex == 0) { resetPageCounter(); }

  // load the file
  loadNewHTMLFile(
    levelInfo["html_file"],
    levelInfo["css_file"],
    levelInfo["callback"]
  ); // end loadNewHTMLFile
} // end loadLevel

// loads the next level
export function loadNextLevel() {
  loadLevel(currentLevelIndex + 1);
} // end loadNextLevel

// loads the previous level
export function loadPrevLevel() {
  loadLevel(currentLevelIndex - 1);
} // end loadPrevLevel

// returns the value of the current level index
export function getCurrentLevelIndex() {
  return currentLevelIndex;
} // end getCurrentLevel