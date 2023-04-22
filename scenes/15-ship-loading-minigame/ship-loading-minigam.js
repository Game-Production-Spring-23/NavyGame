import { startDialogue } from "/scenes/dialogue.js";

//    START INIT    //
//Get references from document
const officers = document.getElementsByClassName("mg5officer");
const containers = document.getElementsByClassName("mg5containerBG");
const containerImages = document.getElementsByClassName("mg5container");

//Data
const possibleImages = [
  "/assets/images/minigame5/NG_Element_Navigation.png",
  "/assets/images/minigame5/NG_Element_Fight.png",
  "/assets/images/minigame5/NG_Element_LifeSupport.png",
  "/assets/images/minigame5/NG_Element_Intelligence.png",
];

//variables
let containerIndex = 0;
let isFirst = true; //Is this the first container or second container
let isContainerMoving = false;

//Add event listeners
for (let i = 0; i < officers.length; i++) {
  officers[i].onclick = () => {
    selectOfficer(officers[i]);
  };
}

//Calls starting functions
startDialogue(0, "/scenes/15-ship-loading-minigame/dialogue.json");
moveContainerIn(isFirst);

//    END INIT    //
//Calls when the player clicks on an officer
function selectOfficer(officer) {
  //If the container is moving, don't do anything
  if (!isContainerMoving) {
    //If the officer correlates to the container's theme
    if (parseInt(officer.getAttribute("data-value")) == containerIndex) {
      //Move the container and officer out
      moveContainerOut(isFirst, officer);
    } else {
      //Display wrong dialogue
      startDialogue(1, "/scenes/15-ship-loading-minigame/dialogue.json");
    }
  }
}

//Moves the container in
function moveContainerIn(first) {
  //converts the boolean into a 0 or 1
  let i = first ? 0 : 1;

  //Changes the container image and moves the container
  containerImages[i].src = possibleImages[containerIndex];
  containers[i].style.transition = "all 4s";
  containers[i].style.left = "50%";
}

//Moves the container out
function moveContainerOut(first, officer) {
  //converts the boolean into a 0 or 1
  let i = first ? 0 : 1;

  //prevent player from clicker further once the containers start moving
  isContainerMoving = true;

  //moves both the container and officer out
  officer.style.zIndex = "0";
  officer.style.transform = "translateX(-50vw)";
  containers[i].style.left = "-50%";

  setTimeout(() => {
    //Moves the next container forward
    containerIndex++;
    if (containerIndex < possibleImages.length) moveContainerIn(!first);
    else {
      //End mini game dialogue
      startDialogue(2, "/scenes/15-ship-loading-minigame/dialogue.json");
    }

    //Resets new container back to start
    setTimeout(() => {
      containers[i].style.transition = "none";
      containers[i].style.left = "100%";
      isContainerMoving = false;
      isFirst = !isFirst;
    }, 2000);
  }, 2000);
}
