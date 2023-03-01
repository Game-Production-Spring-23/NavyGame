import { StateMachine } from "./core/StateMachine.js";
import { Screen1 } from "./screen1/Screen1.js";
import { MyParallaxScreen } from "./parallax-example/my-parallax-screen.js";

// the function to start the State Machine sequence
export function startGame() {
    // initialize the screens -> they get a reference to the state machine
    const SCREENS = [
        new Screen1(),
        new MyParallaxScreen()
    ];
    fetch("/data/data.json")
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

        // initialize state machine
        const stateMachine = new StateMachine(app, data, SCREENS);

        // start first screen
        stateMachine.UpdateState(0);

        // Core game loop
        app.ticker.add(() => {
            // checks to see if currentScreen is finished.
            // if yes, cleans screen and loads the next one
            if(stateMachine.CheckIfFinished()) {
                stateMachine.NextScreen(); // call the next screen on the state machine
            } // end if
        }); // end app.ticker.add

        // start app
        app.ticker.start();
    }); // end fetch data
} // end startGame
