/*
    JSON Data example
    Demonstrates the data structure of the data.json
    Edwin Sanchez
*/


// Call the testData function when the window loads
window.onload = (event) => {
    //Fetches data from json file, can be used with api url
    fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        testData(data);
    });
}; // end window.onload


// Demonstrates the different ways to access data from the json object.
// Logs to console.
function testData(data) {
    // Read in image paths (strings)
    console.log(`Background Image Path: ${data.images.background_1}`);
    console.log(`Character Sprite 1 Image Path: ${data.images.character_sprite_1}`);

    // Read in audio paths
    console.log(`Main Audio Theme Path: ${data.audio.main_theme}`);
    console.log(`Attack Sound Path: ${data.audio.attack_sound}`);

    // Read in video paths
    console.log(`Video Sequence 1 Path: ${data.video.sequence_1}`);
    console.log(`Video Sequence 2 Path: ${data.video.sequence_2}`);

    // Loop over questions
    for(let i = 0; i < data.questions.length; i++) {
        question = data.questions[i];

        // Print the prompt of the question
        console.log(`Question 1 Prompt: ${question.prompt}`);
        
        // Loop over answers for question
        for(let j = 0; j < question.answers.length; j++) {
            console.log(`Question 1 Answer ${j}: ${question.answers[j]}`);
        } // end for

        // Loop over correct answers for question
        for(let j = 0; j < question.correct_answer_indices.length; j++) {
            correct_answer_index = question.correct_answer_indices[j];
            console.log(`Question 1 Correct Answer ${i}: ${question.answers[correct_answer_index]}`);
        } // end for
    } // end for

    // check if a certain input or inputs are correct
    if(checkForCorrectAnswers([0, 2], data.questions[4])) {
        console.log("The answers are correct!");
    } else {
        console.log("The answers are incorrect...");
    } // end if
}; // end testData()

// Checks a list of selected index values to see if they match an index from the
// list of valid anwers of a question. Can be one or many indexes.
// Works for questions with a single answer or multiple discrete answers.
function checkForCorrectAnswers(selectedAnswerIndices, question) {
    /*
    Input:
    - selectedAnswers (list of integers): the numbers selected by the player.
    - question (dictionary): the question we want to compare the player's answers to
                             to see if the player got the answers right.

    Output:
    - returns 'true' if ALL of the selected answers are correct.
    - returns 'false' if ANY of the selected answers are incorrect.
    */

    // check if selected Answers is empty...
    if(selectedAnswerIndices.length === 0) return false;

    console.log(`Selected Indices: ${selectedAnswerIndices}`);
    console.log(`Correct Answer List: ${question.correct_answer_indices}`);
    // loop over each of the correct answers
    for(let i = 0; i < question.correct_answer_indices.length; i++) {
        // check if the value does not exist in the list 
        if(existsInList(question.correct_answer_indices[i], selectedAnswerIndices) == false) {
            return false; // if the value does not exist in the list, we know the answers are incorrect.
        } // end if
    } // end for

    // if the function made it through every selected answer, then all of the answers are correct.
    return true;
} // end checkForCorrectAnswers


// checks if a value exists in a list of values; returns true if exists in list
function existsInList(value, list) {
    // loop over every item in the list
    for(let i = 0; i < list.length; i++) {
        // check if that value is equivalent to that item (strict comparison ===)
        if(value === list[i]) {
            return true;
        } // end if
    } // end for
    return false; // made it through whole list w/o finding corresponding value
} // end existsInList