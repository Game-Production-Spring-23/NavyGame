import { startDialogue } from "/scenes/dialogue.js";

// Start
export function loadScene3() {
  //Get references from document
  const valves = [
    document.getElementById("mg1Valve1"),
    document.getElementById("mg1Valve2"),
    document.getElementById("mg1Valve3"),
    document.getElementById("mg1Valve4"),
    document.getElementById("mg1Valve5"),
    document.getElementById("mg1Valve6"),
  ];
  const answerDisplay = document.getElementById("mg1TextImg");
  const answerNumber = document.getElementById("mg1numberImg");

  //possible answers
  const possibleDisplay = [
    "/assets/images/NG_BoilerRoom_ValveItem1.png",
    "/assets/images/NG_BoilerRoom_ValveItem2.png",
    "/assets/images/NG_BoilerRoom_ValveItem3.png",
    "/assets/images/NG_BoilerRoom_ValveItem4.png",
    "/assets/images/NG_BoilerRoom_ValveItem5.png",
    "/assets/images/NG_BoilerRoom_ValveItem6.png",
  ];
  const possibleNumbers = [
    "/assets/images/NG_PipeGame_ValveNumberDisplay_1.png",
    "/assets/images/NG_PipeGame_ValveNumberDisplay_2.png",
    "/assets/images/NG_PipeGame_ValveNumberDisplay_3.png",
    "/assets/images/NG_PipeGame_ValveNumberDisplay_4.png",
    "/assets/images/NG_PipeGame_ValveNumberDisplay_5.png",
    "/assets/images/NG_PipeGame_ValveNumberDisplay_6.png",
  ];

  //variables
  let chosenIndices = [0, 0, 0, 0, 0, 0];
  let isMinigameOver = false;
  let valveTimer;
  let wrongTimer;

  for (let i = 0; i < 6; i++) {
    //Randomly assigns a value to each valve
    let random = Math.floor(Math.random() * 6);
    chosenIndices[i] = random;

    //Assigns onclick to valve
    valves[i].onclick = () => {
      turnValve(i);
    };

    //Assigns mouse enter to valve
    valves[i].onmouseenter = () => {
      showValve(i);
    };

    //Assigns mouse leave to valve
    valves[i].onmouseleave = () => {
      hideValve();
    };
  }

  //Assigns onclick to submit button
  document.getElementById("mg1Submit").onclick = () => {
    submitAnswer();
  };
  //End Start

  //OnClick, turns a valve and changes its value
  function turnValve(index) {
    //Increments the valve's index and reset it if it is past 5
    chosenIndices[index]++;
    if (chosenIndices[index] > 5) {
      chosenIndices[index] = 0;
    }

    //Sets that valves turn animation to play
    valves[index].src = "/assets/images/NG_PipeGame_Valve_Turn.gif";
    answerDisplay.src = "/assets/images/NG_empty.png";

    //Clears timer if timer is already active
    if (valveTimer) clearTimeout(valveTimer);

    //After 1 seconds change valve back to original animation and set chosen answer to new answer
    valveTimer = setTimeout(() => {
      clearTimeout(valveTimer);
      valves[index].src = "/assets/images/NG_PipeGame_Valve.png";
      answerDisplay.src = possibleDisplay[chosenIndices[index]];
    }, 1000);
  }
  //onMouseEnter, shows the valve's value
  function showValve(index) {
    answerDisplay.src = possibleDisplay[chosenIndices[index]];
    answerNumber.src = possibleNumbers[index];
  }
  //onMouseLeave, hides the valve's value
  function hideValve() {
    answerDisplay.src = "/assets/images/NG_empty.png";
    answerNumber.src = "/assets/images/NG_empty.png";
  }
  //OnClick, a button that is pressed to submit the answer
  function submitAnswer() {
    //if the mini game is over hide this app
    if (isMinigameOver) {
      //Add mini game complete dialogue
      startDialogue(0, "/scenes/03-pipe-minigame/dialogue.json");
    } else if (
      JSON.stringify(chosenIndices) === JSON.stringify([0, 1, 2, 3, 4, 5])
    ) {
      //Shows that answer is correct
      document.getElementById("mg1Gauge").style.transform = "rotate(-75deg)";
      document.getElementById("mg1Submit").src = "/assets/images/ui/xBtn.png";
      isMinigameOver = true;
    } else {
      //Show that answer is wrong
      document.getElementById("mg1Gauge").style.transform = "rotate(75deg)";

      //Changes background
      document
        .getElementById("redScreen")
        .setAttribute(
          "style",
          "background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0.5))"
        );
      document.getElementById("miniGame1").classList.add("screenShake");

      //Clears timer if timer is already active
      if (wrongTimer) clearTimeout(wrongTimer);

      //Reset everything back to normal
      wrongTimer = setTimeout(() => {
        clearTimeout(wrongTimer);
        document.getElementById("mg1Gauge").style.transform = "rotate(0deg)";
        document.getElementById("redScreen").style.backgroundImage = "none";
        document.getElementById("miniGame1").classList.remove("screenShake");
      }, 2000);
    }
  }
}
