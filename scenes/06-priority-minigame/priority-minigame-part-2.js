import { startDialogue, startDialogueNext } from "/scenes/dialogue.js";
import { loadNewHTMLFile } from "/lib.js";
import { splashScreen } from "/scenes/06.5-fixing-mast-splash/splash-screen.js";

export function loadScene6_2() {
  // Start
  //Get references from document
  const items = document.querySelectorAll("#mg2ItemBox .mg2Item");
  let answerImages = document.getElementsByClassName("mg2ItemImg");
  const quill = document.getElementById("mg2Quill");

  //possible answers
  const possibleImages = [
    "/assets/images/minigame2/NG_PriorityGame_Choice_Rudder.png",
    "/assets/images/minigame2/NG_PriorityGame_Choice_MainMast.png",
    "/assets/images/minigame2/NG_PriorityGame_Choice_ForeMast.png",
  ];

  //variables
  let quillTimer;
  let isMinigameOver = false;
  let dragSrcEl;

  //Add event listeners to draggable items
  items.forEach(function (item) {
    item.addEventListener("dragstart", drag);
    item.addEventListener("dragover", allowDrop);
    item.addEventListener("dragend", dragEnd);
    item.addEventListener("drop", drop);
  });
  //Assigns onclick to submit button
  document.getElementById("mg2Submit").onclick = () => {
    submitAnswer();
  };

  startDialogue(4, "/scenes/06-priority-minigame/dialogue.json");
  randomizeAnswers();
  //End Start

  //Randomizes the possible answers
  function randomizeAnswers() {
    //declares index number, random number, and an array of unique numbers
    let i = 0,
      random = 1,
      unique = [];

    while (i < 3) {
      //If the array of unique numbers doesn't have random number
      if (!unique.includes(random)) {
        unique.push(random); //Push random
        //Sets answer's image and index to random
        answerImages[i].src = possibleImages[random];
        answerImages[i].setAttribute("data-index", random);
        i++;
      }
      random = Math.floor(Math.random() * 3);
    }
  }
  //Called when an draggable element has been dragged
  function drag(e) {
    if (!isMinigameOver) {
      this.style.opacity = "0.4";

      dragSrcEl = this;

      //Gets draggable elements html data
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", this.innerHTML);
    }
  }
  //Called when an draggable element has stopped
  function dragEnd(e) {
    this.style.opacity = "1";
  }
  //Called when an draggable element is hovering over a draggable element
  function allowDrop(e) {
    e.preventDefault();
    return false;
  }
  //Called when an draggable element is dropped
  function drop(e) {
    if (!isMinigameOver) {
      e.stopPropagation();
      //Sets draggable elements to another draggable elements spot
      if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
        dragSrcEl.style.opacity = "1";
      }
    }
    return false;
  }
  //OnClick, a button that is pressed to submit the answer
  function submitAnswer() {
    //Gets answers and stores in an array
    let answer = [];
    for (let i = 0; i < answerImages.length; i++) {
      answer[i] = parseInt(answerImages[i].getAttribute("data-index"));
    }

    //Moves quill down
    quill.style.transition = "0.5s";
    quill.style.bottom = "15%";

    //Clears timer if timer is already active
    if (quillTimer) clearTimeout(quillTimer);

    if (
      JSON.stringify(answer) === JSON.stringify([0, 1, 2]) &&
      !isMinigameOver
    ) {
      //If the answer is correct

      //Sets isMinigameOver to true and all elements sets draggable to false
      isMinigameOver = true;

      quillTimer = setTimeout(() => {
        //Waits a bit to display the right answer dialogue
        clearTimeout(quillTimer);

        for (let i = 0; i < items.length; i++) {
          items[i].setAttribute("style", "cursor: auto");
        }
        quillTimer = setTimeout(() => {
          startDialogueNext(
            5,
            "/scenes/06-priority-minigame/dialogue.json",
            () => {
              loadNewHTMLFile(
                "/scenes/06.5-fixing-mast-splash/splash-screen.html",
                "/scenes/06.5-fixing-mast-splash/style.css",
                splashScreen
              );
            }
          );
        }, 500);
      }, 2000);
    } else {
      //If the answer isn't correct
      quillTimer = setTimeout(() => {
        //Resets quill and display wrong answer dialogue
        clearTimeout(quillTimer);
        quill.style.transition = "0.1s";
        quill.style.bottom = "35%";
        quillTimer = setTimeout(() => {
          startDialogue(4, "/scenes/06-priority-minigame/dialogue.json");
        }, 500);
      }, 1000);
    }
  }
}
