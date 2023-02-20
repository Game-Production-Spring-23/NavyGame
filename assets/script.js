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
    document.getElementById("gameContainer").innerHTML =
      "<h1>Correct</h1><input id='start' class='button-8' type='button' onclick='getQuestion()'' value='Redo Test'>";
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

function updateScore(){
  //updates score in score div

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