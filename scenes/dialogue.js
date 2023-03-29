// Start
//Starts dialogue screen
export function startDialogue() {
  document.getElementById("dialogueScreen").style.display = "block";
  //Get references from document
  const dialogueText = document.getElementById("dialogueText");
  const leftPortrait = document.getElementById("lCharaPortrait");
  const rightPortrait = document.getElementById("rCharaPortrait");

  //variables
  let dialogueIndex = 0;
  let scrollIndex = 0;
  let scrollTimer;
  let scrollSpeed = 50;

  //Starts first dialogue
  displayDialogue();

  //Assigns onclick to progress dialogue
  document.getElementById("dialogueScreen").onclick = () => {
    displayDialogue();
  };
  document.getElementById("backBtn").onclick = () => {
    backDialogue();
  };

  //Displays dialogue
  function displayDialogue() {
    //Fetches a dialogue from JSON
    fetch("/scenes/03-pipe-minigame/dialogue.json")
      .then((response) => response.json())
      .then((data) => {
        //Displays dialogue from JSON
        if (dialogueIndex < data.dialogue.length) {
          //  Sets portraits to dialogue portraits and clears dialogue box   //
          displayPortrait(data);
          dialogueText.innerHTML = "";

          //  Changes the front button depending on if there is no more dialogue   //
          if (dialogueIndex == data.dialogue.length - 1)
            //Changes the front button to a close button
            document.getElementById("frontButton").src =
              "/assets/images/ui/exitBtn.png";
          //Keeps the front button image
          else
            document.getElementById("frontButton").src =
              "/assets/images/ui/rightBtn.png";

          //  Starts scrolling text   //
          if (scrollTimer != null) {
            skipDialogue(data);
          } else {
            //Starts scrolling dialogue at scroll speed
            scrollTimer = setTimeout(() => {
              scrollingDialogue(data);
            }, scrollSpeed);
          }
        } else {
          //Ends dialogue
          document.getElementById("dialogueScreen").style.display = "none";
        }
      });
  }
  //Displays the portraits of dialogue
  function displayPortrait(data) {
    //sets left portrait and right portraits and offsets bottom of both
    leftPortrait.src = data.dialogue[dialogueIndex].leftPortrait;
    leftPortrait.style.bottom = data.dialogue[dialogueIndex].leftOffset + "px";
    rightPortrait.src = data.dialogue[dialogueIndex].rightPortrait;
    rightPortrait.style.bottom =
      data.dialogue[dialogueIndex].rightOffset + "px";

    //if the left portrait is talking
    if (data.dialogue[dialogueIndex].isLeftTalking) {
      //Enlarge and brighten left portrait, while shrink and darken right
      leftPortrait.style.maxWidth = "20%";
      leftPortrait.style.filter = "brightness(100%)";
      // leftPortrait.setAttribute(
      //   "style",
      //   "max-width: 20%; filter: brightness(100%);"
      // );
      rightPortrait.style.maxWidth = "17.5%";
      rightPortrait.style.filter = "brightness(50%)";
    } else {
      //Enlarge and brighten right portrait, while shrink and darken left
      leftPortrait.style.maxWidth = "17.5%";
      leftPortrait.style.filter = "brightness(50%)";
      rightPortrait.style.maxWidth = "20%";
      rightPortrait.style.filter = "brightness(100%)";
    }
  }
  //Skips dialogue
  function skipDialogue(data) {
    //Clears scrollTimer, set it null, and sets scrollIndex to 0
    clearTimeout(scrollTimer);
    scrollTimer = null;
    scrollIndex = 0;
    //Displays dialogue text without scrolling
    dialogueText.innerHTML = data.dialogue[dialogueIndex].text;
    dialogueIndex++;
  }
  //Scrolls dialogue
  function scrollingDialogue(data) {
    //if dialogue text isn't finished scrolling
    if (scrollIndex < data.dialogue[dialogueIndex].text.length) {
      //Display scrolling text character in dialogue box at scrollIndex
      dialogueText.innerHTML +=
        data.dialogue[dialogueIndex].text.charAt(scrollIndex);
      scrollIndex++;

      //Recalls scrollingDialogue at scrollSpeed
      scrollTimer = setTimeout(() => {
        scrollingDialogue(data);
      }, scrollSpeed);
    } else {
      //Sets scrollIndex null, and sets scrollIndex to 0
      scrollTimer = null;
      scrollIndex = 0;
      dialogueIndex++;
    }
  }
  //Goes back a dialogue
  function backDialogue() {
    event.stopPropagation();
    if (dialogueIndex > 0) {
      dialogueIndex--;
      displayDialogue();
    }
  }
}
