/*
    Screen 1 Template

    Tasks:
    - Creates a moving water effect
    - Creates a moving ship effect
    - Transitions to the Deck Screen, by zooming in (Screen2)
*/
// Call the testData function when the window loads
window.onload = (event) => {
  // Fetch data.json file
  fetch("../../data/screen3data.json")
    .then((response) => response.json())
    .then((data) => {
      //Gathers and stores html elements by id
      let leftPortrait = document.getElementById("leftCharacterPortrait");
      let rightPortrait = document.getElementById("rightCharacterPortrait");
      let backButton = document.getElementById("backButton");
      let frontButton = document.getElementById("frontButton");
      let dialogueText = document.getElementById("dialogueText");
      let dialogueContainer = document.getElementById("dialogueContainer");

      //Other variables necessary for dialogue functionality
      let index = 0;
      let scrollIndex = 0; //Character index of scroll
      let scrollTimer; //Time between characters in text scroll
      let scrollSpeed = 50;

      displayDialogue();

      backButton.onclick = function (event) {
        event.stopPropagation();
        if (index > 0) {
          index--;
          displayDialogue();
        }
      };

      // Waits for user to click on screen
      dialogueContainer.addEventListener("click", function onClick() {
        displayDialogue();
      });

      function displayDialogue() {
        //if index is less than dialogue array length
        if (index < data.dialogue.length) {
          //Sets portraits to dialogue portraits and clears dialogue box
          displayPortrait();
          dialogueText.innerHTML = "";

          if (index == data.dialogue.length - 1) {
            frontButton.src = "/assets/images/ui/closeBtn.png";
          } else {
            frontButton.src = "/assets/images/ui/ArrowIcon.png";
          }

          //if the does already exist
          if (scrollTimer != null) {
            skipDialogue();
          } else {
            //Sets scrollTimer to scrollingDialogue function for scrollSpeed
            scrollTimer = setTimeout(scrollingDialogue, scrollSpeed);
          }
        } else {
          location.reload();
        }
      }

      function displayPortrait() {
        //sets leftPortrait's portraits and offsets bottom
        leftPortrait.src = data.dialogue[index].leftPortrait;
        leftPortrait.style.bottom = data.dialogue[index].leftOffset + "px";
        //sets rightPortrait's portraits and offsets bottom
        rightPortrait.src = data.dialogue[index].rightPortrait;
        rightPortrait.style.bottom = data.dialogue[index].rightOffset + "px";

        //if isLeftTalking is true
        if (data.dialogue[index].isLeftTalking) {
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
      }

      function skipDialogue() {
        //Clears scrollTimer, set it null, and sets scrollIndex to 0
        clearTimeout(scrollTimer);
        scrollTimer = null;
        scrollIndex = 0;
        //Displays dialogue text without scrolling
        dialogueText.innerHTML = data.dialogue[index].text;
        index++;
      }

      function scrollingDialogue() {
        //if scrollIndex is less than the dialogue text's length
        if (scrollIndex < data.dialogue[index].text.length) {
          //Display scrolling text character in dialogue box at scrollIndex
          dialogueText.innerHTML +=
            data.dialogue[index].text.charAt(scrollIndex);
          scrollIndex++;
          scrollTimer = setTimeout(scrollingDialogue, scrollSpeed); //Reload scrollingDialogue function and stores it in scrollTimer
        } else {
          //Sets scrollIndex null, and sets scrollIndex to 0
          scrollTimer = null;
          scrollIndex = 0;
          index++;
        }
      }

      function killSwitch() {
        clearTimeout(scrollTimer);
        scrollTimer = null;
      }
    });
}; // end window.onload
