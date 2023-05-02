import { loadNewHTMLFile, devSkip } from "../../lib.js";
import { startDialogue, startDialogueNext } from "/scenes/dialogue.js";
import { splashScreen } from "/scenes/10-splash-screen/splash-screen.js";

//    START INIT    //
export function loadScene9() {
  const rightPortrait = document.getElementById("rCharaPortrait");
  rightPortrait.style.width = "600px";
  rightPortrait.style.height = "1000px";
  devSkip(
    "/scenes/10-splash-screen/splash-screen.html",
    "/scenes/10-splash-screen/style.css",
    splashScreen
  );

  // begin dialogue
  startDialogue(3, "/scenes/09-shopping-minigame/dialogue.json");

  //Get references from document
  const chosen = document.getElementById("mg3chosenItem");
  const items = document.getElementsByClassName("mg3item");
  const itemImages = document.getElementsByClassName("mg3itemImg");
  const itemTexts = document.getElementsByClassName("mg3itemText");
  const diagram = document.getElementById("mg3diagram");

  //variables
  let questionIndex = 0;
  let possibleAnswers = [0, 1, 2, 3];

  let hasPlayerChosenItem = false;

  //    END INIT    //
  fetch("/scenes/09-shopping-minigame/data.json")
    .then((response) => response.json())
    .then((data) => {
      //Add event listeners
      for (let i = 0; i < items.length; i++) {
        items[i].onclick = () => {
          if (!hasPlayerChosenItem) selectAnswer(itemImages[i]);
        };
      }

      newQuestion();

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
          itemImages[i].setAttribute("data-value", possibleAnswers[i]);
          itemImages[i].src = data[questionIndex].answers[possibleAnswers[i]];
          itemImages[i].style.filter = "brightness(0%)";
          itemTexts[i].innerHTML =
            data[questionIndex].keywords[possibleAnswers[i]];
        }
        diagram.src = data[questionIndex].question;
        resetChosenImage();
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

        if (selected.getAttribute("data-value") == data[questionIndex].answer) {
          setTimeout(() => {
            questionIndex++;
            hasPlayerChosenItem = false;

            if (questionIndex >= data.length) {
              startDialogueNext(
                2,
                "/scenes/09-shopping-minigame/dialogue.json",
                () => {
                  loadNewHTMLFile(
                    "/scenes/10-splash-screen/splash-screen.html",
                    "/scenes/10-splash-screen/style.css",
                    splashScreen
                  );
                }
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
