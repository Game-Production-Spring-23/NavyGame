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
      let portrait = document.getElementById("characterPortrait");
      let dialogueBox = document.getElementById("dialogueBox");
      let dialogueContainer = document.getElementById("dialogueContainer");
      //Other variables necessary for dialogue functionality
      let index = 0;
      let scrollIndex = 0; //Character index of scroll
      let scrollTimer; //Time between characters in text scroll
      let scrollSpeed = 50;

      // Waits for user to click on screen
      dialogueContainer.addEventListener("click", function onClick() {
        //if index is less than dialogue array length
        if (index < data.dialogue.length) {
          //Sets portrait to dialogue portrait and clears dialogue box
          portrait.src = data.dialogue[index].portrait;
          dialogueBox.innerHTML = "";

          //if the does already exist
          if (scrollTimer != null) {
            skipDialogue();
          } else {
            //Sets scrollTimer to displayDialogue function for scrollSpeed
            scrollTimer = setTimeout(displayDialogue, scrollSpeed);
          }
        }
      });

      function skipDialogue() {
        //Clears scrollTimer, set it null, and sets scrollIndex to 0
        clearTimeout(scrollTimer);
        scrollTimer = null;
        scrollIndex = 0;
        //Displays dialogue text without scrolling
        dialogueBox.innerHTML = data.dialogue[index].text;
        index++;
      }

      function displayDialogue() {
        //if scrollIndex is less than the dialogue text's length
        if (scrollIndex < data.dialogue[index].text.length) {
          //Display scrolling text character in dialogue box at scrollIndex
          dialogueBox.innerHTML +=
            data.dialogue[index].text.charAt(scrollIndex);
          scrollIndex++;
          scrollTimer = setTimeout(displayDialogue, scrollSpeed); //Reload displayDialogue function and stores it in scrollTimer
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
