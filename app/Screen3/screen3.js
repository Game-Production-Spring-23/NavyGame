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
      let portrait = document.getElementById("characterPortrait");
      let dialogueBox = document.getElementById("dialogueBox");
      let dialogueContainer = document.getElementById("dialogueContainer");
      let index = 0;
      displayDialouge(index);

      dialogueContainer.addEventListener("click", function onClick() {
        if (index < data.dialogue.length - 1) {
          index++;
          displayDialouge(index);
        }
      });

      function displayDialouge(i) {
        portrait.src = data.dialogue[i].portrait;
        dialogueBox.innerHTML = "<p>" + data.dialogue[i].text + "</p>";
      }
    });
}; // end window.onload
