/*
    JSON Data example
    Demonstrates the data structure of the data.json
*/


// Define the data object...
let data = {
    "questions": {
        "question_1": {
            "prompt": "This is an example question...",
            "answers": [
                "This is answer 1 (The correct answer).",
                "This is answer 2.",
                "This is answer 3.",
                "This is answer 4."
            ],
            "correct_answer_index": [
                0
            ]
        },
        "question_2": {
            "prompt": "This is an another example question...",
            "answers": [
                "This is answer 1 (A correct answer).",
                "This is answer 2.",
                "This is answer 3. (Another correct answer).",
                "This is answer 4.",
                "This is answer 5.",
                "This is answer 6."
            ],
            "correct_answer_index": [
                0,
                2
            ]
        }
    },
    "images": {
        "background_1": "path/to/background_1.xxx",
        "character_sprite_1": "path/to/character_sprite_1.xxx"
    },
    "audio": {
        "main_theme": "path/to/main_theme.xxx",
        "attack_sound": "path/to/attack_sound.xxx"
    },
    "video": {
        "sequence_1": "path/to/sequence_1.xxx",
        "sequence_2": "path/to/sequence_2.xxx"
    }
};


// Call the testData function when the window loads
window.onload = (event) => {
    testData();
}; // end window.onload


// Demonstrates the different ways to access data from the json object.
// Logs to console.
function testData() {
    // Read in image paths (strings)
    console.log(`Background Image Path: ${data.images.background_1}`);
    console.log(`Character Sprite 1 Image Path: ${data.images.character_sprite_1}`);

    // Read in audio paths
    console.log(`Main Audio Theme Path: ${data.audio.main_theme}`);
    console.log(`Attack Sound Path: ${data.audio.attack_sound}`);

    // Read in video paths
    console.log(`Video Sequence 1 Path: ${data.video.sequence_1}`);
    console.log(`Video Sequence 2 Path: ${data.video.sequence_2}`);

    // Read in a question
    question_1 = data.questions.question_1;
    console.log(`Question 1 Prompt: ${question_1.prompt}`);

    // Loop over answers for question 1
    for(let i = 0; i < question_1.answers.length; i++) {
        console.log(`Question 1 Answer ${i}: ${question_1.answers[i]}`);
    } // end for

    // Loop over correct answers for question 1
    for(let i = 0; i < question_1.correct_answer_index.length; i++) {
        index = question_1.correct_answer_index[i];
        console.log(`Question 1 Correct Answer ${i}: ${question_1.answers[index]}`);
    } // end for

    // Read in a question - Same for different length of answers & correct answers
    question_2 = data.questions.question_2;
    console.log(`Question 2 Prompt: ${question_2.prompt}`);

    // Loop over answers for question 1
    for(let i = 0; i < question_1.answers.length; i++) {
        console.log(`Question 2 Answer ${i}: ${question_2.answers[i]}`);
    } // end for

    // Loop over correct answers for question 1
    for(let i = 0; i < question_2.correct_answer_index.length; i++) {
        index = question_2.correct_answer_index[i];
        console.log(`Question 2 Correct Answer ${i}: ${question_2.answers[index]}`);
    } // end for   
}; // end testData()
