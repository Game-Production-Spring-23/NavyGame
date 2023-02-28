import { StateMachine } from "./javascript/core/StateMachine.js";
import { Screen1 } from "./javascript/Screen1.js";
import { Screen2 } from "./javascript/Screen2.js";

// Initialize State Machine
const SCREENS = [
    new Screen1(),
    new Screen2(),
    new Screen2(),
];
const stateMachine = new StateMachine(SCREENS);


// Start when the window has loaded.
window.onload = (event) => {
    // Fetch data.json file
    fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        // Create a PIXI application
        const app = new PIXI.Application({
            resizeTo: window, // Auto fill the screen
            autoResize: true,
            autoDensity: true, // Handles high DPI screens
            backgroundColor: 0x000000
        }); // end app initialization

        // add app to viewport
        document.body.appendChild(app.view);

        // start State machine
        stateMachine.UpdateState(app, data);

        // Core game loop
        app.ticker.add(() => {
            // checks to see if currentScreen is finished.
            // if yes, cleans screen and loads the next one
            if(stateMachine.CheckIfFinished()) {
                stateMachine.UpdateState(app, data);
            } // end if
        }); // end app.ticker.add

        // start app
        window.
        app.ticker.start();
    }); // end fetch data
} // end window.onload