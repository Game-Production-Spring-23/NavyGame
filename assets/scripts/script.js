//global variables
let bottomLinks = document.getElementById("bottomLinks"); //Links at bottom of start screen
let gameContainer = document.getElementById("gameContainer"); //Container for game
let settingsContainer = document.getElementById("settingsContainer"); //Container for settings
let scoreContainer = document.getElementById("scoreContainer");
scoreContainer.style.display="none";//Container for score
settingsContainer.style.display="none";
 





//On click function for start test
function startTest() {
  getQuestion();
  
}
function getQuestion() {
  //Fetches data from json file, can be used with api url
  fetch("/data-example/data.json")
    .then((response) => response.json())
    .then((data) => {
      //store changes to HTML in app and appends changes to app div
      let app = "";
      app += "<h1>" + data.questions.question_1.prompt + "</h1>";

      //Creates buttons for each answer, will also incorporate dials.
      for (let i = 0; i < data.questions.question_1.answers.length; i++) {
        app +=
          "<h2><input class='answer' type='button' onclick='getAnswer(" +
          i +
          "," +
          data.questions.question_1.correct_answer_index +
          ")' value='" +
          data.questions.question_1.answers[i] +
          "'></h2>";
      }
      app += "<div id='response'></div>";

      document.getElementById("gameContainer").innerHTML = app;
    });
}
//On click function for clicking on a right or wrong answer
function getAnswer(guess, correct) {
  //if the user clicks the right button the app resets
  if (guess == correct) {
    //Currently cycles back to start of test, but will eventually load future questions.
    document.getElementById("gameContainer").innerHTML =
      "<h1>Correct</h1><input id='start' class='button-8' type='button' onclick='location.reload()' value='Redo Test'>";
      updateScore();
  } else {
    //if the user clicks the wrong answer, the user is told that it is wrong
    document.getElementById("response").innerHTML =
      "<h3>Wrong answer try again</h3>";

  }
}

//Future Functions -------------------------------------------------//

//grabs a video from the queue and plays it in the gameContainer div
function playVideo(){
  //grabs video from queue
  //plays video in gameContainer div

}

function updateScore(){ //convert innerhtml to int and add 1
  var score = document.getElementById("score");
  score.innerHTML = parseInt(score.innerHTML) + 1;
  console.log(score);
}

function clearScore(){
  var score = document.getElementById("score");
  score.innerHTML = 0;
  console.log(score);
}

function startDialogue(){
  //grabs dialogue from queue
  //plays dialogue in gameContainer div

}

function endDialogue(){
  //ends dialogue
  //updates queue number
}

function endVideo(){
  //ends video
  //updates queue number
}

function showOptions(){
  //shows options, hides bottom links and replaces elements with settingsContainer
  bottomLinks.style.display="none";
  gameContainer.style.display="none";
  settingsContainer.style.display="block";
  score.style.visibility="hidden";

  
  
}

function hideOptions(){
  //hides options
  bottomLinks.style.visibility="visible";

}

function introduction(){
  //shows introduction
}