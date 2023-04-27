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
  filePath,
  styleSheetPath,
  next,
  videoElementID
) {
  let video = document.getElementById(videoElementID);
  video.onloadedmetadata = () => {
    video.play();
    document.globalTimeouts.push(
      setTimeout(() => {
        loadNewHTMLFile(filePath, styleSheetPath, next);
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
export function playSplashScreen(filePath, styleSheetPath, next, waitTime) {
  document.globalTimeouts.push(
    setTimeout(() => {
      loadNewHTMLFile(filePath, styleSheetPath, next);
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

// dirty the document object with a global parameter
document.devSkipObj = {
  filePath: null,
  styleSheetPath: null,
  next: null,
};

export function devSkip(filePath, styleSheetPath, next) {
  document.devSkipObj.filePath = filePath;
  document.devSkipObj.styleSheetPath = styleSheetPath;
  document.devSkipObj.next = next;
} // end devSkip

var eventListenerList = [];

function skipper(event) {
  // check if the ~ key was pressed
  if (event.key == "~") {
    // remove all setTimeouts that have been set
    for (let i = 0; i < document.globalTimeouts.length; i++) {
      clearTimeout(document.globalTimeouts[i]);
    } // end for

    for (let i = 0; i < eventListenerList.length; i++) {
      document.removeEventListener(
        eventListenerList[i].type,
        eventListenerList[i].listener
      );
    }
    eventListenerList = [];

    setDialogueOccurring(false);
    loadNewHTMLFile(
      document.devSkipObj.filePath,
      document.devSkipObj.styleSheetPath,
      document.devSkipObj.next
    );
  } // end if
  if (event.key == "@") {
    console.log(eventListenerList);
  }
} // end skipper

document.addEventListener("keydown", skipper);

export function addToEventListenerList(key, type, listener) {
  eventListenerList.push({ key, type, listener });
}

export function removeFromEventListenerList(key) {
  eventListenerList = eventListenerList.filter((obj) => !key.includes(obj.key));
}
