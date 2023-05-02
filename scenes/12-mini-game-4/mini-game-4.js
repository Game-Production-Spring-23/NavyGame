import {
  loadNewHTMLFile,
  devSkip,
  addToEventListenerList,
  removeFromEventListenerList,
} from "/lib.js";
import { shipMiniGame } from "/scenes/15-ship-loading-minigame/ship-loading-minigam.js";
import {
  startDialogue,
  isDialogueOccurring,
  startDialogueNext,
} from "/scenes/dialogue.js";

export function miniGame4() {
  devSkip(
    "/scenes/15-ship-loading-minigame/ship-loading-minigame.html",
    "/scenes/15-ship-loading-minigame/minigame5styles.css",
    shipMiniGame
  );

  // Start Dialogue
  startDialogue(0, "/scenes/12-mini-game-4/dialogue.json");

  // allow player to reset grid items (if stuff breaks)
  document.getElementById("resetBtn").onclick = () => {
    resetGridItems();
  } // end resetBtn onclick function

  // draggable element
  let draggableElement;
  let posX = 0;
  let posY = 0;

  // load audio assets
  let pickUpPaperAudio = new Audio("/assets/audio/pickupPaper.wav");
  let dropPaperAudio = new Audio("/assets/audio/dropPaper.mp3");

  fetch("/scenes/12-mini-game-4/data.json")
    .then((res) => res.json())
    .then((data) => {
      // Set event listeners
      let options = document.getElementsByClassName("option");
      let gridItems = document.getElementsByClassName("grid-item");
      let optionTexts = document.getElementsByClassName("option-text");

      // loop over options, set them to be draggable
      for (let i = 0; i < options.length; i++) {
        options[i].dataset.hasMoved = "false";
        options[i].onmousedown = (event) => {
          pickUpPaperAudio.play();
          posX = event.pageX;
          posY = event.pageY;
          dragMove(options[i].id);
          changeCharacterText(i);
        }; // end mousedown event listener

        optionTexts[i].textContent = data["options-text"][i];
      } // end for

      // loop over grid items, set default for option
      for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].dataset.probability = i % 5;
        gridItems[i].dataset.severity = 4 - Math.floor(i / 5);
        gridItems[i].dataset.option = "";
      } // end for
    }); // end load data.json

  // check if elements overlap
  function mouseIsOver(cursorX, cursorY, ele) {
    let rect = ele.getBoundingClientRect();
    if (rect.top <= cursorY && rect.bottom >= cursorY) {
      if (rect.left <= cursorX && rect.right >= cursorX) {
        return true;
      } // end if
    } // end if

    return false;
  } // end elementsOverlap

  // allows element to be dragged
  function dragMove(id) {
    let element = document.getElementById(id);
    draggableElement = element;
  } // end dragMove

  //Adds mouse up to doc
  document.addEventListener("mouseup", handleMouseUp);
  addToEventListenerList("mg4MouseUp", "mouseup", handleMouseUp);

  function handleMouseUp(event) {
    // loop over grid items, check if any are overlapping w/ dragged option
    let gridItems = document.getElementsByClassName("grid-item");
    for (let i = 0; i < gridItems.length; i++) {
      if (draggableElement) {
        if (mouseIsOver(event.clientX, event.clientY, gridItems[i])) {
          dropPaperAudio.play();
          // tell grid item that it has an option
          gridItems[i].dataset.option = draggableElement.id;
          draggableElement.dataset.hasMoved = "true";
          let rect = gridItems[i].getBoundingClientRect();
          draggableElement.style.top = rect.top - rect.height / 4 + "px";
          draggableElement.style.left = rect.left - rect.width / 2 + "px";
          swing(draggableElement.id);
        } // end if
      } // end if
    } // end for

    draggableElement = null;
    checkForGameFinished();
  } // end doc onmouseup

  //Adds mouse up to doc
  document.addEventListener("mousemove", handleMouseMove);
  addToEventListenerList("mg4MouseMove", "mousemove", handleMouseMove);

  function handleMouseMove(event) {
    if (draggableElement != null) {
      let mouseX = posX - event.pageX;
      let mouseY = posY - event.pageY;
      posX = event.pageX;
      posY = event.pageY;
      draggableElement.style.left = draggableElement.offsetLeft - mouseX + "px";
      draggableElement.style.top = draggableElement.offsetTop - mouseY + "px";
    } // end if
  } // end onmousemove

  // changes the text of the character when an option is selected
  function changeCharacterText(optionIndex) {
    fetch("/scenes/12-mini-game-4/data.json")
      .then((res) => res.json())
      .then((data) => {
        let characterTexts =
          document.getElementsByClassName("speech-bubble-text");

        // loop over every character text, setting to their respective text for the option.
        for (let i = 0; i < characterTexts.length; i++) {
          let text = data["character-texts"][optionIndex][i]["text"];
          let axis = data["character-texts"][optionIndex][i]["axis"];
          if (axis == 1) {
            let scaleText =
              data["probability-scale"][
                data["solutions"][optionIndex]["probability"]
              ];
            scaleText = ` Probability: ${scaleText}`;
            characterTexts[i].textContent = text + scaleText;
          } else if (axis == 2) {
            let scaleText =
              data["severity-scale"][
                data["solutions"][optionIndex]["severity"]
              ];
            scaleText = ` Severity: ${scaleText}`;
            characterTexts[i].textContent = text + scaleText;
          } else {
            characterTexts[i].textContent = text;
          } // end if
        } // end for
      }); // end load data.json

    // shake boxes
    shake("speech-bubble-1", 1, 300);
    shake("speech-bubble-2", 1, 300);
    shake("speech-bubble-3", 1, 300);
  } // end changeCharacterText

  // Checks for if the game is finished
  function checkForGameFinished() {
    fetch("/scenes/12-mini-game-4/data.json")
      .then((res) => res.json())
      .then((data) => {
        let gridItems = document.getElementsByClassName("grid-item");
        let solutions = data.solutions;
        let correctCounter = 0;

        // loop over the solutions
        for (let i = 0; i < solutions.length; i++) {
          for (let j = 0; j < gridItems.length; j++) {
            if (solutions[i].probability == gridItems[j].dataset.probability) {
              if (solutions[i].severity == gridItems[j].dataset.severity) {
                let currentOption = `option-${i + 1}`;
                if (gridItems[j].dataset.option == currentOption) {
                  correctCounter += 1;
                } // end if
              } // end if
            } // end if
          } // end for
        } // end for

        // check if win
        if (correctCounter >= 3) {
          console.log("HELLO");
          //Removes all event listeners from doc
          document.removeEventListener("mouseup", handleMouseUp);
          removeFromEventListenerList("mg4MouseUp");

          document.removeEventListener("mousemove", handleMouseMove);
          removeFromEventListenerList("mg4MouseMove");

          startDialogueNext(1, "/scenes/12-mini-game-4/dialogue.json", () => {
            loadNewHTMLFile(
              "/scenes/15-ship-loading-minigame/ship-loading-minigame.html",
              "/scenes/15-ship-loading-minigame/minigame5styles.css",
              shipMiniGame
            );
          });
        } // end if

        // find out how many options have been moved
        let options = document.getElementsByClassName("option");
        let movedOptionsCount = 0;
        for (let i = 0; i < options.length; i++) {
          if (options[i].dataset.hasMoved == "true") {
            movedOptionsCount += 1;
          } // end if
        } // end for

        // check if failed, then reset
        if (movedOptionsCount >= 3 && correctCounter < 3) {
          resetGridItems();
        } // end if
      }); // end load data.json
  } // end checkForGameFinished

  function resetGridItems() {
    draggableElement = null;
    let gridItems = document.getElementsByClassName("grid-item");
    let options = document.getElementsByClassName("option");
    // reset grid items
    for (let i = 0; i < gridItems.length; i++) {
      gridItems[i].dataset.option = "";
    } // end for

    // reset
    let x = 55;
    let initLoc = [
      {
        x: x,
        y: 50,
      },
      {
        x: x,
        y: 250,
      },
      {
        x: x,
        y: 450,
      },
    ]; // end initLoc
    for (let i = 0; i < options.length; i++) {
      options[i].dataset.hasMoved = "false";
      let destX =
        initLoc[i].x - parseInt(options[i].style.left.slice(0, -2));
      let destY =
        initLoc[i].y - parseInt(options[i].style.top.slice(0, -2));
      slide(options[i].id, destX, destY, initLoc[i].x, initLoc[i].y);
    } // end for
  } // end resetGridItems

  // shakes the screen
  function shake(elementID, iterations = 10, duration = 100) {
    let action = [
      { transform: "rotate(0)" },
      { transform: "rotate(10deg)" },
      { transform: "rotate(0deg)" },
      { transform: "rotate(-10deg)" },
      { transform: "rotate(0deg)" },
    ]; // end action

    let timing = {
      duration: duration,
      iterations: iterations,
    }; // end timing

    document.getElementById(elementID).animate(action, timing);
  } // end shake

  // swing the option back & forth when dropped onto the grid
  function swing(elementID, iterations = 1, duration = 1000) {
    let action = [
      { transform: "rotate(0)" },
      { transform: "rotate(15deg)" },
      { transform: "rotate(22deg)" },
      { transform: "rotate(25deg)" },
      { transform: "rotate(22deg)" },
      { transform: "rotate(15deg)" },
      { transform: "rotate(0)" },
      { transform: "rotate(-13deg)" },
      { transform: "rotate(-20deg)" },
      { transform: "rotate(-22deg)" },
      { transform: "rotate(-20deg)" },
      { transform: "rotate(-13deg)" },
      { transform: "rotate(-5deg)" },
      { transform: "rotate(-2deg)" },
      { transform: "rotate(0)" },
    ]; // end action

    let timing = {
      duration: duration,
      iterations: iterations,
    }; // end timing

    document.getElementById(elementID).animate(action, timing);
  } // end swing

  // swing the option back & forth when dropped onto the grid
  function slide(
    elementID,
    xSlide,
    ySlide,
    xLoc,
    yLoc,
    iterations = 1,
    duration = 1000
  ) {
    let ele = document.getElementById(elementID);
    let action = [{ transform: `translate(${xSlide}px, ${ySlide}px)` }]; // end action

    let timing = {
      duration: duration,
      iterations: iterations,
    }; // end timing

    let animation = ele.animate(action, timing);
    animation.onfinish = () => {
      ele.style.left = xLoc + "px";
      ele.style.top = yLoc + "px";
    }; // end animation.onfinish
  } // end slide
} // end miniGame4
