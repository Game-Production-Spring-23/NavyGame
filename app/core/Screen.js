/*
    Screen Class
*/

export class Screen {
    constructor() {
        // tells the state machine whether or not the screen has finished
        this.isFinished = false;

        // init the screen
        this.initScreen();
    } // end constructor

    // initialize screen variables
    initScreen() {
        this.screenContainer = new PIXI.Container();
        this.backgroundContainer = new PIXI.Container();
        this.midgroundContainer = new PIXI.Container();
        this.foregroundContainer = new PIXI.Container();

        this.screenContainer.addChildAt(this.backgroundContainer, 0);
        this.screenContainer.addChildAt(this.midgroundContainer, 1);
        this.screenContainer.addChildAt(this.foregroundContainer, 2);
    } // end initScreenContainers

    // Called when the Screen is set to run . Starts the Screen.
    Start(app, data) {
        this.initScreen();
    } // end Start


    // Called when the Screen has terminated.
    OnEnd(app) {
        this.isFinished = false; // reset isFinished for next time
    } // end OnEnd
} // end Screen Class
