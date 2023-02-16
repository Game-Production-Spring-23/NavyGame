/* START */
//Plays background music
var music = new Audio("SFXmusic.mp3");
music.volume = 0.4;
music.play();

//Sets up other sound effects
const rightSfx = "SFXright.mp3";
const wrongSfx = "SFXwrong.mp3";
var audio = new Audio(wrongSfx);

//On click function for start test
function startTest() {
  //Fetches data from json file, can be used with api url
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      //store changes to HTML in app and appends changes to app div
      let app = "";
      app += "<h1>" + data.questions.question_1.prompt + "</h1>";

      //Creates buttons for each answer, will also incorporate dials.
      for (let i = 0; i < data.questions.question_1.answers.length; i++) {
        app +=
          "<h2><input class='answer' type='button' onclick='answer(" +
          i +
          ")' value='" +
          data.questions.question_1.answers[i] +
          "'></h2>";
      }
      app += "<div id='response'></div>";

      document.getElementById("app").innerHTML = app;
    });
}

//On click function for clicking on a right or wrong answer
function answer(index) {
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      //if the user clicks the right button the app resets
      if (index == data.questions.question_1.correct_answer_index) {
        audio = new Audio(rightSfx);
        audio.volume = 0.4;
        audio.play();
        document.getElementById("app").innerHTML =
          "<h1>Correct</h1><input id='start' type='button' onclick='startTest()'' value='Redo Test'>";
      } else {
        audio = new Audio(wrongSfx);
        audio.volume = 0.4;
        audio.play();
        document.getElementById("response").innerHTML =
          "<h3>Wrong answer try again</h3>";
      }
    });
}
