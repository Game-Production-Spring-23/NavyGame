// Start
var characterIndex = 0;
var dataPath = "";
var isDialogueOccurring = false;
var playerTone = 0;

//Starts dialogue screen
export function startDialogue(index, data) {
  //Sets global dialogue variables
  characterIndex = index;
  dataPath = data;
  isDialogueOccurring = true;

  document.getElementById("dialogueScreen").style.display = "block";
  //Get references from document
  const dialogueText = document.getElementById("dialogueText");
  const leftPortrait = document.getElementById("lCharaPortrait");
  const rightPortrait = document.getElementById("rCharaPortrait");
  const dialogueImage = document.getElementById("dialogueImage");

  //variables
  let dialogueIndex = 0;
  let scrollIndex = 0;
  let scrollTimer;
  let scrollSpeed = 50;

  fetch(dataPath)
    .then((response) => response.json())
    .then((data) => {
      //Sets dialogue Only called once
      //Sets names and offset of two characters
      leftPortrait.style.bottom = "-200px";
      rightPortrait.style.bottom = data[characterIndex].otherOffset + "px";
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
        //Displays dialogue from JSON
        if (dialogueIndex < data[characterIndex].dialogue.length) {
          //Sets portraits to dialogue portraits and clears dialogue box  //
          dialogueText.innerHTML = "";

          displayPortrait(data[characterIndex].dialogue);

          //  Changes the front button depending on if there is no more dialogue   //
          if (dialogueIndex == data[characterIndex].dialogue.length - 1)
            //Changes the front button to a close button
            document.getElementById("frontButton").src =
              "/assets/images/ui/xBtn.png";
          //Keeps the front button image
          else
            document.getElementById("frontButton").src =
              "/assets/images/ui/rightBtn.png";

          //  Starts scrolling text   //
          if (scrollTimer != null) {
            skipDialogue(data[characterIndex].dialogue);
          } else {
            //Starts scrolling dialogue at scroll speed
            scrollTimer = setTimeout(() => {
              scrollingDialogue(data[characterIndex].dialogue);
            }, scrollSpeed);
          }
        } else {
          //Ends dialogue
          dialogueImage.src = "/assets/images/NG_empty.png";
          dialogueText.innerHTML = "";
          document.getElementById("dialogueScreen").style.display = "none";
          isDialogueOccurring = false;
        }
      }
      //Displays the portraits of dialogue
      function displayPortrait(dialogue) {
        //Sets players's portrait
        if (playerTone == 0) {
          leftPortrait.src = dialogue[dialogueIndex].playerPortrait;
        } else if (playerTone == 1) {
          leftPortrait.src = dialogue[dialogueIndex].playerPortrait1;
        } else if (playerTone == 2) {
          leftPortrait.src = dialogue[dialogueIndex].playerPortrait2;
        } else if (playerTone == 3) {
          leftPortrait.src = dialogue[dialogueIndex].playerPortrait3;
        }
        //Sets right's portrait
        rightPortrait.src = dialogue[dialogueIndex].otherPortrait;

        //if the player is talking
        if (dialogue[dialogueIndex].isPlayerTalking) {
          //Enlarge and brighten left portrait, while shrink and darken right
          leftPortrait.style.maxWidth = "20%";
          leftPortrait.style.filter = "brightness(100%)";
          rightPortrait.style.maxWidth = "17.5%";
          rightPortrait.style.filter = "brightness(50%)";
        } else {
          //Enlarge and brighten right portrait, while shrink and darken left
          leftPortrait.style.maxWidth = "17.5%";
          leftPortrait.style.filter = "brightness(50%)";
          rightPortrait.style.maxWidth = "20%";
          rightPortrait.style.filter = "brightness(100%)";
        }

        //  Sets background image if it exists
        if (dialogue[dialogueIndex].image != null) {
          dialogueImage.src = dialogue[dialogueIndex].image;
        } else {
          dialogueImage.src = "/assets/images/NG_empty.png";
        }
      }
      //Skips dialogue
      function skipDialogue(dialogue) {
        //Clears scrollTimer, set it null, and sets scrollIndex to 0
        clearTimeout(scrollTimer);
        scrollTimer = null;
        scrollIndex = 0;
        //Displays dialogue text without scrolling
        dialogueText.innerHTML = dialogue[dialogueIndex].text;
        dialogueIndex++;
      }
      //Scrolls dialogue
      function scrollingDialogue(dialogue) {
        //if dialogue text isn't finished scrolling
        if (scrollIndex < dialogue[dialogueIndex].text.length) {
          //Display scrolling text character in dialogue box at scrollIndex
          dialogueText.innerHTML +=
            dialogue[dialogueIndex].text.charAt(scrollIndex);
          scrollIndex++;

          //Recalls scrollingDialogue at scrollSpeed
          scrollTimer = setTimeout(() => {
            scrollingDialogue(dialogue);
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

      document.addEventListener("keydown", skipDialogueAll);

      function skipDialogueAll(event) {
        if (event.key == "!") {
          //Fetches a dialogue from JSON
          clearTimeout(scrollTimer);
          scrollTimer = null;
          scrollIndex = 0;
          dialogueText.innerHTML = "";

          if (dialogueIndex < data[characterIndex].dialogue.length - 1) {
            //Clears scrollTimer, set it null, and sets scrollIndex to 0
            dialogueIndex = data[characterIndex].dialogue.length - 1;
          }
        }
      }
    });
}

//Starts dialogue screen with next
export function startDialogueNext(index, data, next) {
  //Sets global dialogue variables
  characterIndex = index;
  dataPath = data;
  isDialogueOccurring = true;

  document.getElementById("dialogueScreen").style.display = "block";
  //Get references from document
  const dialogueText = document.getElementById("dialogueText");
  const leftPortrait = document.getElementById("lCharaPortrait");
  const rightPortrait = document.getElementById("rCharaPortrait");
  const dialogueImage = document.getElementById("dialogueImage");

  //variables
  let dialogueIndex = 0;
  let scrollIndex = 0;
  let scrollTimer;
  let scrollSpeed = 50;

  fetch(dataPath)
    .then((response) => response.json())
    .then((data) => {
      //Sets dialogue Only called once
      //Sets names and offset of two characters
      leftPortrait.style.bottom = "-200px";
      rightPortrait.style.bottom = data[characterIndex].otherOffset + "px";
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
        //Displays dialogue from JSON
        if (dialogueIndex < data[characterIndex].dialogue.length) {
          //Sets portraits to dialogue portraits and clears dialogue box  //
          dialogueText.innerHTML = "";

          displayPortrait(data[characterIndex].dialogue);

          //  Changes the front button depending on if there is no more dialogue   //
          if (dialogueIndex == data[characterIndex].dialogue.length - 1)
            //Changes the front button to a close button
            document.getElementById("frontButton").src =
              "/assets/images/ui/xBtn.png";
          //Keeps the front button image
          else
            document.getElementById("frontButton").src =
              "/assets/images/ui/rightBtn.png";

          //  Starts scrolling text   //
          if (scrollTimer != null) {
            skipDialogue(data[characterIndex].dialogue);
          } else {
            //Starts scrolling dialogue at scroll speed
            scrollTimer = setTimeout(() => {
              scrollingDialogue(data[characterIndex].dialogue);
            }, scrollSpeed);
          }
        } else {
          //Ends dialogue
          dialogueImage.src = "/assets/images/NG_empty.png";
          dialogueText.innerHTML = "";
          document.getElementById("dialogueScreen").style.display = "none";
          isDialogueOccurring = false;
          endDialogue(next);
        }
      }
      //Displays the portraits of dialogue
      function displayPortrait(dialogue) {
        //Sets players's portrait
        if (playerTone == 0) {
          leftPortrait.src = dialogue[dialogueIndex].playerPortrait;
        } else if (playerTone == 1) {
          leftPortrait.src = dialogue[dialogueIndex].playerPortrait1;
        } else if (playerTone == 2) {
          leftPortrait.src = dialogue[dialogueIndex].playerPortrait2;
        } else if (playerTone == 3) {
          leftPortrait.src = dialogue[dialogueIndex].playerPortrait3;
        }
        //Sets right's portrait
        rightPortrait.src = dialogue[dialogueIndex].otherPortrait;

        //if the player is talking
        if (dialogue[dialogueIndex].isPlayerTalking) {
          //Enlarge and brighten left portrait, while shrink and darken right
          leftPortrait.style.maxWidth = "20%";
          leftPortrait.style.filter = "brightness(100%)";
          rightPortrait.style.maxWidth = "17.5%";
          rightPortrait.style.filter = "brightness(50%)";
        } else {
          //Enlarge and brighten right portrait, while shrink and darken left
          leftPortrait.style.maxWidth = "17.5%";
          leftPortrait.style.filter = "brightness(50%)";
          rightPortrait.style.maxWidth = "20%";
          rightPortrait.style.filter = "brightness(100%)";
        }

        //  Sets background image if it exists
        if (dialogue[dialogueIndex].image != null) {
          dialogueImage.src = dialogue[dialogueIndex].image;
        } else {
          dialogueImage.src = "/assets/images/NG_empty.png";
        }
      }
      //Skips dialogue
      function skipDialogue(dialogue) {
        //Clears scrollTimer, set it null, and sets scrollIndex to 0
        clearTimeout(scrollTimer);
        scrollTimer = null;
        scrollIndex = 0;
        //Displays dialogue text without scrolling
        dialogueText.innerHTML = dialogue[dialogueIndex].text;
        dialogueIndex++;
      }
      //Scrolls dialogue
      function scrollingDialogue(dialogue) {
        //if dialogue text isn't finished scrolling
        if (scrollIndex < dialogue[dialogueIndex].text.length) {
          //Display scrolling text character in dialogue box at scrollIndex
          dialogueText.innerHTML +=
            dialogue[dialogueIndex].text.charAt(scrollIndex);
          scrollIndex++;

          //Recalls scrollingDialogue at scrollSpeed
          scrollTimer = setTimeout(() => {
            scrollingDialogue(dialogue);
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

      document.addEventListener("keydown", skipDialogueAll);

      function skipDialogueAll(event) {
        if (event.key == "!") {
          //Fetches a dialogue from JSON
          clearTimeout(scrollTimer);
          scrollTimer = null;
          scrollIndex = 0;
          dialogueText.innerHTML = "";

          if (dialogueIndex < data[characterIndex].dialogue.length - 1) {
            //Clears scrollTimer, set it null, and sets scrollIndex to 0
            dialogueIndex = data[characterIndex].dialogue.length - 1;
          }
        }
      }
    });

  //Calls function after ending dialogue
  function endDialogue(next) {
    next();
  }
}

export { isDialogueOccurring };
