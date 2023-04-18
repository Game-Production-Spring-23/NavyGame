import { loadNewHTMLFile, devSkip } from "../../lib.js";
import { startDialogueNext } from "/scenes/dialogue.js";
import { loadScene11 } from "/scenes/11-explore/scene11.js";

//    START INIT    //
export function loadScene9() {
  devSkip(
    "/scenes/11-explore/index.html",
    "/scenes/11-explore/styles.css",
    loadScene11
  );

  //Get references from document
  const chosen = document.getElementById("mg3chosenItem");
  const itemImages = document.getElementsByClassName("mg3itemImg");
  const itemTexts = document.getElementsByClassName("mg3itemText");
  const textBox = document.getElementById("mg3questionText");

  //Data
  const possibleImages = [
    "/assets/images/minigame3/Minigame3_placeholder_item1.png",
    "/assets/images/minigame3/Minigame3_placeholder_item2.png",
    "/assets/images/minigame3/Minigame3_placeholder_item3.png",
    "/assets/images/minigame3/Minigame3_placeholder_item4.png",
  ];
  const possibleTexts = [
    "Keyword: Item 1",
    "Keyword: Item 2",
    "Keyword: Item 3",
    "Keyword: Item 4",
  ];

  //variables
  let questionIndex = 0;
  let correctIndex = 0;
  let possibleAnswers = [0, 1, 2, 3];

  let scrollIndex = 0;
  let scrollTimer;
  let scrollSpeed = 50;

  let hasPlayerChosenItem = false;

  fetch("/scenes/09-shopping-minigame/minigame3.json")
    .then((response) => response.json())
    .then((data) => {
      //Add event listeners
      for (let i = 0; i < itemImages.length; i++) {
        itemImages[i].onclick = () => {
          if (!hasPlayerChosenItem) selectAnswer(itemImages[i]);
        };
      }
      newQuestion();
      //    END INIT    //

      //Resets screen after answering correct
      function newQuestion() {
        //Shuffles possible answers
        for (let i = possibleAnswers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [possibleAnswers[i], possibleAnswers[j]] = [
            possibleAnswers[j],
            possibleAnswers[i],
          ];
        }
        //sets items to possible answers
        for (let i = 0; i < 4; i++) {
          itemImages[i].style.display = "block";
          itemImages[i].value = possibleAnswers[i];
          itemImages[i].src = possibleImages[possibleAnswers[i]];
          itemImages[i].style.filter = "brightness(0%)";
          itemTexts[i].innerHTML = possibleTexts[possibleAnswers[i]];
        }
        resetChosenImage();

        //Display question in scrolling format
        textBox.innerHTML = "";

        //Starts scrolling text at scroll speed
        scrollTimer = setTimeout(() => {
          scrollingText(data[questionIndex].question);
        }, scrollSpeed);

        //If the player clicks the text box they can skip the scroll
        textBox.onclick = () => {
          event.stopPropagation();
          skipText(data[questionIndex].question);
        };

        //Scrolls question text
        function scrollingText(text) {
          //if text isn't finished scrolling
          if (scrollIndex < text.length) {
            //Display scrolling text character in text box at scrollIndex
            textBox.innerHTML += text.charAt(scrollIndex);
            scrollIndex++;

            //Recalls scrollingText at scrollSpeed
            scrollTimer = setTimeout(() => {
              scrollingText(text);
            }, scrollSpeed);
          } else {
            //Sets scrollIndex null, and sets scrollIndex to 0
            scrollTimer = null;
            scrollIndex = 0;
          }
        }

        //Skips question text
        function skipText(text) {
          //Clears scrollTimer, set it null, and sets scrollIndex to 0
          clearTimeout(scrollTimer);
          scrollTimer = null;
          scrollIndex = 0;
          //Displays text without scrolling
          textBox.innerHTML = text;
        }
      }

      function resetChosenImage() {
        //Reset Chosen image
        chosen.style.visibility = "hidden";
        chosen.style.transition = "none";
        chosen.style.width = "15%";
        chosen.style.filter = "brightness(0%)";
      }

      function selectAnswer(selected) {
        hasPlayerChosenItem = true;
        selected.style.display = "none";
        chosen.src = selected.src;
        chosen.style.transition = "all 3s";
        chosen.style.visibility = "visible";
        chosen.style.width = "55%";
        chosen.style.filter = "brightness(100%)";

        if (selected.value == data[questionIndex].answer) {
          setTimeout(() => {
            questionIndex++;
            correctIndex++;
            hasPlayerChosenItem = false;

            if (correctIndex >= data.length) {
              startDialogueNext(
                2,
                "/scenes/09-shopping-minigame/dialogue.json",
                loadNewHTMLFile(
                  "/scenes/11-explore/index.html",
                  "/scenes/11-explore/styles.css",
                  loadScene11
                )
              );
            } else {
              startDialogueNext(
                1,
                "/scenes/09-shopping-minigame/dialogue.json",
                newQuestion
              );
            }
          }, 2500);
        } else {
          setTimeout(() => {
            hasPlayerChosenItem = false;
            startDialogueNext(
              0,
              "/scenes/09-shopping-minigame/dialogue.json",
              resetChosenImage
            );
          }, 2500);
        }
      }
    });
}
