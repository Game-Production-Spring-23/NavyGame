// Example GameScene -> read comments for details on implementation
import { GameScene } from "../GameScene.js";

// Creates a class called GameSceneTemplate that inherits from the GameScene class and exports it
export class GameSceneTemplate extends GameScene {
    constructor() {
        // call the parent constructor to initialize necessary values
        // DO NOT turn off 'this.shouldTick' -> Game Scenes need to tick!
        super();

        // Same Rules as SceneTemplate:

        // initialize class constants here, and any values that need to be accessed by all functions.
        // This will only be called once, when the Screen is first constructed in the SCREEN array that is
        // given to the StateMachine. If you need a value initialized more than once, set the value in
        // the Start function.
    } // end constructor


    // Called when the Scene is set to run. Starts the Scene.
    Start(app, data) {
        // call parent function
        super.Start(app, data);

        /* add my code here - create whatever I want */

        // set ratios & speed for the screen (if not default)
        // the character moves at the same speed as the foreground ratio
        this.setScrollSpeedAndRatios(
            1, // scrollSpeed -> play with this value to get different movement speeds
            // the rest of these depend on the size of the background artwork panels
            1.5, // background ratio -> '1.5' means that the panel is 150% the width of the screen
            2.0, // midground ratio -> '2.0' means that the panel is 200% the width of the screen
            3.0 // foreground ratio -> '3.0' means taht the panel is 300% the width of the screen
        ); // end this.setScrollSpeedAndRatios
        
        // set character position - how high should it be on the screen?
        this.character.y = app.screen.height*0.6;

        // make character visible!
        this.character.visible = true;

        // unlock the second half of the stage with a button press (for example)
        document.addEventListener('keydown', (event) => {
            // unlocks the second half if '1' button is pressed
            if(event.key === "1") {
                super.Unlock(app);
            } // end if
        }); // end addEventListener
    } // end Start

    
    // Called when the Scene has finished - clean up events, etc.
    OnEnd(app) {
        super.OnEnd(app);

        /* clean up goes here */
    } // end OnEnd


    // Called continuously while the Scene is running (always enabled for GameScene)
    Tick(app, data) {
        // calls parent class's Tick function -> necessary for GameScene to work!
        super.Tick(app, data);

        // wait 7 seconds, then go to next stage
        setTimeout(() => { 
            this.isFinished = true;
        }, 7000);
    } // end Tick

    /* add class functions that you need here */
} // end GameSceneTemplate class
