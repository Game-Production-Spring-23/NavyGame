// Start
export function loadScene9() {
  //Get references from document
  const items = document.querySelectorAll(".mg3item");
  const textBox = document.getElementById("mg3text");

  //variables
  let isMinigameOver = false;
  let answer;
  let questionIndex = 0;

  let scrollIndex = 0;
  let scrollTimer;
  let scrollSpeed = 50;
  let wrongTimer;

  //Add event listeners
  //If the player clicks the background reset selection
  document.getElementById("miniGame3").onclick = () => {
    if (!isMinigameOver) deselectItem();
  };
  //if the player clicks on an item, select item, while deselects others
  items.forEach(function (item) {
    item.addEventListener("click", () => {
      if (!isMinigameOver) {
        event.stopPropagation();
        deselectItem();
        selectItem(item);
      }
    });
  });
  //If the player clicks the submit button
  document.getElementById("mg3Submit").onclick = () => {
    if (!isMinigameOver) {
      event.stopPropagation();
      submitAnswer();
    }
  };

  newQuestion();
  //End Start

  //Gets a new question from json
  function newQuestion() {
    fetch("/scenes/09-shopping-minigame/minigame3.json")
      .then((response) => response.json())
      .then((data) => {
        //clears text box
        textBox.innerHTML = "";

        //Starts scrolling text at scroll speed
        scrollTimer = setTimeout(() => {
          scrollingText(data[questionIndex].question);
        }, scrollSpeed);

        //If the player clicks the text box they can skip the scroll
        textBox.onclick = () => {
          if (!isMinigameOver) {
            event.stopPropagation();
            skipText(data[questionIndex].question);
          }
        };
      });

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

  //Selects item
  function selectItem(index) {
    index.style.filter = "brightness(75%)";
    answer = index.value;
  }

  //Deselects all items
  function deselectItem() {
    items.forEach(function (item) {
      item.style.filter = "brightness(100%)";
    });
    answer = null;
  }

  //OnClick, a button that is pressed to submit the answer
  function submitAnswer() {
    fetch("/scenes/09-shopping-minigame/minigame3.json")
      .then((response) => response.json())
      .then((data) => {
        //Clears scrollTimer, set it null, and sets scrollIndex to 0
        clearTimeout(scrollTimer);
        scrollTimer = null;
        scrollIndex = 0;

        //If the player gets the answer correct
        if (answer == data[questionIndex].answer && !isMinigameOver) {
          questionIndex++;
          deselectItem();

          //Selects a new question if there are still more
          if (questionIndex < data.length) {
            newQuestion();
          } else {
            //Displays finished minigame
            textBox.innerHTML = "You did it!";
            isMinigameOver = true;
          }
        } else {
          //If the player is wrong
          textBox.innerHTML = "Hmm that's not quite right...";

          //Clears timer if timer is already active
          if (wrongTimer) clearTimeout(wrongTimer);

          //Reset everything back to normal
          wrongTimer = setTimeout(() => {
            clearTimeout(wrongTimer);
            newQuestion();
          }, 1000);
        }
      });
  }
}
