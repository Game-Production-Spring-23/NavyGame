import { startDialogue } from "/scenes/dialogue.js";
import { devSkip } from "/lib.js";
import { loadScene6_2 } from "/scenes/06-priority-minigame/priority-minigame-part-2.js";
import { loadScene8 } from "/scenes/08-jungle-explore/scene8.js";

export function loadScene6() {
  // allow developer to skip to next level
  devSkip(
    "/scenes/08-jungle-explore/index.html",
    "/scenes/08-jungle-explore/styles.css",
    loadScene8
  );
  // Start
  //Get references from document
  const tabButtons = [
    document.getElementById("mg2ForeMastTabBtn"),
    document.getElementById("mg2TabRudderBtn"),
    document.getElementById("mg2TabMainMastBtn"),
  ];
  const tabs = document.getElementsByClassName("mg2Tab");
  const answers = document.querySelectorAll(".mg2answerImg");
  const blocks = document.querySelectorAll(".mg2block");
  const texts = document.getElementsByClassName("mg2Text");

  //Assets
  const tabComplete = [
    "/assets/images/minigame2/mm22-foremastbutton-complete.png",
    "/assets/images/minigame2/m22-rudderbutton-complete.png",
    "/assets/images/minigame2/mm22-mainmastbutton-complete.png",
  ];
  const complete = [
    [
      "/assets/images/minigame2/NG_P1_ForeMastComplete_0.png",
      "/assets/images/minigame2/NG_P1_ForeMastComplete_1.png",
      "/assets/images/minigame2/NG_P1_ForeMastComplete_2.png",
      "/assets/images/minigame2/NG_P1_ForeMastComplete_3.png",
      "/assets/images/minigame2/NG_P1_ForeMastComplete_4.png",
    ],
    [
      "/assets/images/minigame2/NG_P1_RudderComplete_0.png",
      "/assets/images/minigame2/NG_P1_RudderComplete_1.png",
      "/assets/images/minigame2/NG_P1_RudderComplete_2.png",
      "/assets/images/minigame2/NG_P1_RudderComplete_3.png",
    ],
    [
      "/assets/images/minigame2/NG_P1_MainMastComplete_0.png",
      "/assets/images/minigame2/NG_P1_MainMastComplete_1.png",
      "/assets/images/minigame2/NG_P1_MainMastComplete_2.png",
      "/assets/images/minigame2/NG_P1_MainMastComplete_3.png",
      "/assets/images/minigame2/NG_P1_MainMastComplete_4.png",
    ],
  ];

  //variables
  let blockIndices = [1, 1, 1];
  let tabIndex,
    completeCount = 0;
  let dragSrcEl;

  //Add event listeners to elements
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].onclick = () => {
      updateTab(i);
    };
  }
  answers.forEach(function (answer) {
    answer.addEventListener("drop", drop);
    answer.addEventListener("dragover", allowDrop);
  });
  blocks.forEach(function (block) {
    block.addEventListener("dragstart", drag);
  });

  //Init
  updateTab(1);
  startDialogue(0, "/scenes/06-priority-minigame/dialogue.json");
  //Ends

  //Updates the tabs
  function updateTab(index) {
    tabIndex = index;
    for (let i = 0; i < 3; i++) {
      tabButtons[i].style.filter = "brightness(1)";
      tabs[i].style.display = "none";
    }
    tabButtons[index].style.filter = "brightness(1.1)";
    tabs[index].style.display = "block";
  }
  //Called when an draggable element has been dragged
  function drag(e) {
    dragSrcEl = this;
    //Gets draggable elements html data
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  }
  //Called when an draggable element is hovering over a draggable element
  function allowDrop(e) {
    e.preventDefault();
  }
  //Called when an draggable element is dropped
  function drop(e) {
    e.preventDefault();
    //if the block is the right block for the tab
    if (
      parseInt(dragSrcEl.getAttribute("data-size")) == blockIndices[tabIndex]
    ) {
      //Update answer
      answers[tabIndex].src = complete[tabIndex][blockIndices[tabIndex]];
      blockIndices[tabIndex]++;
      e.target.appendChild(dragSrcEl);

      //if the answer is finished
      if (blockIndices[tabIndex] == complete[tabIndex].length) {
        texts[tabIndex].style.display = "block";
        tabButtons[tabIndex].src = tabComplete[tabIndex];
        completeCount++;

        // Dialogue
        startDialogue(tabIndex+1, "/scenes/06-priority-minigame/dialogue.json");

        //if all 3 answers are finished
        if (completeCount >= 3) {
          document.getElementById("mg2p1Submit").style.display = "block";
          document.getElementById("mg2Part2").style.display = "block";
        }
      }
    }
  }

  mg2p1Submit.onclick = () => {
    document.getElementById("mg2Part1").style.display = "none";
    loadScene6_2();
  };
}
