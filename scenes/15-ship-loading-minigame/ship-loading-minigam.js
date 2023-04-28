import { loadNewHTMLFile, devSkip } from "/lib.js";
import { startDialogue, startDialogueNext } from "/scenes/dialogue.js";
import { endScreen } from "/scenes/16-end-screen/endScreen.js";

export function shipMiniGame() {
  devSkip(
    "/scenes/16-end-screen/endScreen.html",
    "/scenes/16-end-screen/style.css",
    endScreen
  );

  //    START INIT    //
  //Get references from document
  const officers = document.getElementsByClassName("mg5officer");
  const containers = document.getElementsByClassName("mg5containerBG");
  const containerImages = document.getElementsByClassName("mg5container");
  const crewFront = document.getElementsByClassName("mg5crewFront");
  const crewBack = document.getElementsByClassName("mg5crewBack");

  //Data
  const possibleImages = [
    "/assets/images/minigame5/NG_Element_Navigation.png",
    "/assets/images/minigame5/NG_Element_Fight.png",
    "/assets/images/minigame5/NG_Element_LifeSupport.png",
    "/assets/images/minigame5/NG_Element_Intelligence.png",
  ];

  //variables
  let containerIndex = 0;
  let isFirstContainer = true; //Is this the first container or second container
  let isContainerMoving = true;

  //Add event listeners
  for (let i = 0; i < officers.length; i++) {
    officers[i].onclick = () => {
      selectOfficer(officers[i]);
    };
  }

  //Calls starting functions
  startDialogue(0, "/scenes/15-ship-loading-minigame/dialogue.json");
  moveContainerIn(isFirstContainer);

  //    END INIT    //
  //Calls when the player clicks on an officer
  function selectOfficer(officer) {
    //If the container is moving, don't do anything
    if (!isContainerMoving) {
      //If the officer correlates to the container's theme
      if (parseInt(officer.getAttribute("data-value")) == containerIndex) {
        //Move the container and officer out
        moveContainerOut(isFirstContainer, officer);
      } else {
        //Display wrong dialogue
        startDialogue(1, "/scenes/15-ship-loading-minigame/dialogue.json");
      }
    }
  }

  //Moves the container in
  function moveContainerIn(isFirst) {
    //converts the boolean into a 0 or 1
    let i = isFirst ? 0 : 1;

    //Changes crew to moving animation
    crewFront[i].src = "/assets/images/minigame5/NG_Crew_Pull_Move.gif";
    crewBack[i].src = "/assets/images/minigame5/NG_Crew_Push_Move.gif";

    //Changes the container image and moves the container
    containerImages[i].src = possibleImages[containerIndex];
    containers[i].style.transition = "all 4s";
    containers[i].style.left = "57.5%";

    //Ends movement
    setTimeout(() => {
      isContainerMoving = false;
      crewFront[i].src = "/assets/images/minigame5/NG_Crew_Pull_Idle.png";
      crewBack[i].src = "/assets/images/minigame5/NG_Crew_Push_Idle.png";
    }, 4000);
  }

  function moveContainerOut(isFirst, officer) {
    //Allows the user to click
    isContainerMoving = true;

    //converts the boolean into a 0 or 1
    let i = isFirst ? 0 : 1;

    //Changes crew to moving animation
    crewFront[i].src = "/assets/images/minigame5/NG_Crew_Pull_Move.gif";
    crewBack[i].src = "/assets/images/minigame5/NG_Crew_Push_Move.gif";

    //moves both the container and officer out
    officer.style.zIndex = "0";
    officer.style.transform = "translateX(-75vw)";
    containers[i].style.left = "-50%";

    //Moves the next container forward
    containerIndex++;
    if (containerIndex < possibleImages.length) moveContainerIn(!isFirst);
    else {
      //End mini game dialogue
      startDialogueNext(
        2,
        "/scenes/15-ship-loading-minigame/dialogue.json",
        () => {
          loadNewHTMLFile(
            "/scenes/16-end-screen/endScreen.html",
            "/scenes/16-end-screen/style.css",
            endScreen
          );
        }
      );
    }

    //Moves the next container out
    setTimeout(() => {
      containers[i].style.transition = "none";
      containers[i].style.left = "200%";
      isFirstContainer = !isFirstContainer;
    }, 4000);
  }
} // end shipMiniGame
