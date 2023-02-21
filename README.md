Game Production Document
# Navy Game

## File Structure
* **Assets** - Contains project js scripts and other assets.
* **mediaTest** - Contains examples for different medias- Audio, Images, Sprites, Video, and data.
* **index.html** - The html file for the main project.
* **pixi.js** - The PIXI.js library script.
* **README.md** (this) - the guide to what is what in the project.
* **style.css** - The style sheet for main project.

## Data JSON File Structure
The data JSON file structure is integral to the project. It contains all of the outside data that needs to be accessed by the project, in a simple javascript object that can be quickly parsed for data. The structure is as follows:

```
{
    "questions": [ // array of dictionaries
        {
            "prompt": "What is the capital of New York?", // a question
            "answers": [ // array of strings
                "New York City",
                "Albany",           // the correct answer
                "Greenland",
                "West Glousheshire",
                "Alabama"
            ],
            "correct_answer_indices": [1] // array of correct answers
        },
        {
            "prompt": "Where are my pants?", // a question
            "answers": [ // array of strings
                "On my waist",        // a correct answer
                "On my head",
                "Somewhere in the forest"
                "In my closet",       // another correct answer
            ],
            "correct_answer_indices": [0, 3] // array of correct answers
        },
        ...
    ],
    "images": { // a dictionary containing images
    "background_1": "path/to/background_1.xxx", // image name is mapped to a file path
    "character_sprite_1": "path/to/character_sprite_1.xxx"
    },
    "audio": { // same as images
        "main_theme": "path/to/main_theme.xxx",
        "attack_sound": "path/to/attack_sound.xxx"
    },
    "video": { // same as images
        "sequence_1": "path/to/sequence_1.xxx",
        "sequence_2": "path/to/sequence_2.xxx"
    }
}
```

### JSON Helper Functions
To aid in parsing some of the json files, there are helper functions.

* **checkForCorrectAnswers(selectedAnswers(integer array), correctAnswerIndices(integer array)) -> bool:** This function goes through the list of correct answers for a question, comparing each correct answer to each value in the list of selectedAnswers. If it cannot find a match, then the function returns false. If it manages to match every selected Answer to a value in the list of Correct Answers, then it returns true.
  * This function depends on the *existInList* function, which checks to see if a certain value is in a list of values.