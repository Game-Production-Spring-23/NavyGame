import { loadNewHTMLFile, devSkip } from "../../lib.js";
import { startDialogue, isDialogueOccurring } from "/scenes/dialogue.js";
import { loadScene14 } from "../14-beach-explore/scene14.js";

export function miniGame4() {
    devSkip(
        "/scenes/14-beach-explore/index.html",
        "/scenes/14-beach-explore/styles.css",
        loadScene14
    );
    // Wait for the page to load (the element don't exist until the page is fully loaded).
    fetch('/scenes/12-mini-game-4/data.json')
    .then((res) => res.json())
    .then((data) => {
        // Set event listeners
        let options = document.getElementsByClassName("option");
        let gridItems = document.getElementsByClassName("grid-item");

        // loop over options, set them to be draggable
        for(let i = 0; i < options.length; i++) {
            options[i].addEventListener("dragstart", drag);
            options[i].addEventListener("mousedown", () => {
                changeCharacterText(i);
            }); // end mousedown event listener

            options[i].textContent = data["options-text"][i];
        } // end for

        // loop over grid spaces, set them to allow for dropping items into them
        for(let i = 0; i < gridItems.length; i++) {
            gridItems[i].dataset.probability = i % 5;
            gridItems[i].dataset.severity = 4 - Math.floor(i / 5);
            gridItems[i].addEventListener("drop", drop);
            gridItems[i].addEventListener("dragover", allowDrop);
            gridItems[i].addEventListener("mousedown", () => {
                resetSelection(i);
            }); // end mousedown event listener
        } // end for

        // set initial values for severity
        let severityIDs = ["box-51", "box-41", "box-31", "box-21", "box-11"];
        for(let i = 0; i < severityIDs.length; i++) {
            document.getElementById(severityIDs[i]).textContent = data["severity-scale"][i];
        } // end for
        
        
        // set initial values for severity
        let probabilityIDs = ["box-62", "box-63", "box-64", "box-65", "box-66"];
        for(let i = 0; i < probabilityIDs.length; i++) {
            document.getElementById(probabilityIDs[i]).textContent = data["probability-scale"][i];
        } // end for
    }); // end load data.json


    // Allows an item to receive an option when an option is dropped on.
    function allowDrop(ev) {
        ev.preventDefault();
    } // end allowDrop

    
    // Tells what to do when an option is dragged.
    function drag(ev) {
        ev.dataTransfer.setData("text", document.getElementById(ev.target.id).textContent);
        ev.dataTransfer.setData("optionID", ev.target.id);
    } // end drag


    // Transfers the data from the option to the item when dropped.
    function drop(ev) {
        // Set the grid item to recieve the text from the selected option
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        let gridElement = document.getElementById(ev.target.id);

        // ensure that element is empty
        if(gridElement.textContent == "") {
            gridElement.textContent = data;
            gridElement.style.backgroundColor = "blue";
            gridElement.dataset.optionID = ev.dataTransfer.getData("optionID");

            // Remove the option from the options list
            let optionElement = document.getElementById(ev.dataTransfer.getData("optionID"));
            optionElement.remove();

            // check if the game has been finished
            checkForGameFinished();
        } // end if
    } // end drop


    // changes the text of the character when an option is selected
    function changeCharacterText(optionIndex) {
        fetch('/scenes/12-mini-game-4/data.json')
        .then((res) => res.json())
        .then((data) => {
            let characterTexts = document.getElementsByClassName("character-text");

            // loop over every character text, setting to their respective text for the option.
            for(let i = 0; i < characterTexts.length; i++) {
                let text = data["character-texts"][optionIndex][i]["text"];
                let axis = data["character-texts"][optionIndex][i]["axis"];
                if(axis == 1) {
                    let scaleText = data["probability-scale"][data["solutions"][optionIndex]["probability"]];
                    scaleText = ` Probability: ${scaleText}`;
                    characterTexts[i].textContent = text + scaleText;
                } else if(axis == 2) {
                    let scaleText = data["severity-scale"][data["solutions"][optionIndex]["severity"]];
                    scaleText = ` Severity: ${scaleText}`;
                    characterTexts[i].textContent = text + scaleText;
                } else {
                    characterTexts[i].textContent = text;
                } // end if
            } // end for
        }); // end load data.json

        // shake boxes
        shake("text-1", 1, 300);
        shake("text-2", 1, 300);
        shake("text-3", 1, 300);
    } // end changeCharacterText


    // allows player to click on box and put option back into options list.
    function resetSelection(gridElementIndex) {
        fetch('/scenes/12-mini-game-4/data.json')
        .then((res) => res.json())
        .then((data) => {
            let gridItems = document.getElementsByClassName("grid-item");

            // reset grid item
            let gridItem = gridItems[gridElementIndex];
            let optionText = gridItem.textContent;
            
            if(optionText != "") {
                gridItem.textContent = "";
                gridItem.style.backgroundColor = "goldenrod";

                // add option back to options panel
                let optionsPanel = document.getElementById("options-panel");
                let reinstatedOption = document.createElement("p");
                optionsPanel.appendChild(reinstatedOption);

                // set option element parameters
                reinstatedOption.className = "option";
                reinstatedOption.id = gridItem.dataset.optionID;
                reinstatedOption.textContent = optionText;
                reinstatedOption.draggable = true;

                // Add events to option element
                reinstatedOption.addEventListener("dragstart", drag);
                reinstatedOption.addEventListener("mousedown", () => {
                    for(let i = 0; i < data["options-text"].length; i++) {
                        if(data["options-text"][i] == optionText) {
                            changeCharacterText(i);
                        } // end if
                    } // end for
                }); // end mousedown event listener
            } // end if
        }); // end load data.json
    } // end resetSelection


    // Checks for if the game is finished
    function checkForGameFinished() {
        fetch('/scenes/12-mini-game-4/data.json')
        .then((res) => res.json())
        .then((data) => {
            // check if all options have left the options panel
            let optionsPanel = document.getElementById("options-panel");
            if(optionsPanel.children.length == 0) {
                let correctAnswerCount = 0;
                
                // check if the selections are correct
                let gridItems = document.getElementsByClassName("grid-item");
                // loop over every item in the grid
                for(let i = 0; i < gridItems.length; i++) {
                    // loop over the correct answers
                    for(let j = 0; j < data["solutions"].length; j++) {
                        // check if the text matches any of the options
                        if(gridItems[i].textContent == data["options-text"][j]) {
                            // if it does, check if that grid item's row and column
                            // match the correct row and column for the option based on the solutions
                            if(
                                (gridItems[i].dataset.probability == data["solutions"][j]["probability"]) &&
                                (gridItems[i].dataset.severity == data["solutions"][j]["severity"])
                            ) {
                                correctAnswerCount++;
                            } // end if
                        } // end if
                    } // end for
                } // end for

                // check how many correct answers there are
                if(correctAnswerCount < data["solutions"].length) { 
                    // not enough correct answers - reset grid
                    for(let i = 0; i < gridItems.length; i++) {
                        resetSelection(i);
                        shake("flexbox-grid-outer");
                    } // end for
                } else {
                    // end the game
                    console.log("Congrats! You solved the game.");
                    loadNewHTMLFile(
                        "/scenes/14-beach-explore/index.html",
                        "/scenes/14-beach-explore/styles.css",
                        loadScene14
                    );
                } // end if
            } // end if
        }); // end load data.json
    } // end checkForGameFinished


    // shakes the screen
    function shake(elementID, iterations=10, duration=100) {
        let action = [
            { transform: "rotate(0)" },
            { transform: "rotate(10deg)" },
            { transform: "rotate(0deg)" },
            { transform: "rotate(-10deg)" },
            { transform: "rotate(0deg)" },
        ]; // end action

        let timing = {
            duration: duration,
            iterations: iterations
        }; // end timing

        document.getElementById(elementID).animate(action, timing);
    } // end shake
} // end miniGame4

