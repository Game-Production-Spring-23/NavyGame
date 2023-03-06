/*
    Screen Class
*/

export class Screen {
    constructor() {
        // tells the state machine whether or not the screen has finished
        this.isFinished = false;
    } // end constructor

    // initialize screen variables
    initScreen() {
        this.screenContainer = new PIXI.Container();
        this.backgroundContainer = new PIXI.Container();
        this.midgroundContainer = new PIXI.Container();
        this.foregroundContainer = new PIXI.Container();
        this.stationaryContainer = new PIXI.Container();

        this.screenContainer.addChildAt(this.backgroundContainer, 0);
        this.screenContainer.addChildAt(this.midgroundContainer, 1);
        this.screenContainer.addChildAt(this.foregroundContainer, 2);
        this.screenContainer.addChildAt(this.stationaryContainer, 3);
    } // end initScreenContainers

    // Called when the Screen is set to run. Starts the Screen.
    Start(app, data) {
        this.initScreen();
    } // end Start


    // Called when the Screen has terminated.
    OnEnd(app) {
        this.isFinished = false; // reset isFinished for next time
        app.stage.removeChild(this.screenContainer); // remove the screen I made
        this.screenContainer.destroy(); // destroy the screenContainer I made
    } // end OnEnd

    // load all of the items necessary for an html screen to work correctly (styling, etc.)
    LoadHTMLDependencies(styleSheet) {

    } // end LoadHTMLDependencies


    // resets all html items (styling, etc.)
    RemoveHTMLDependencies() {

    } // end RemoveHTMLDependencies
} // end Screen Class
