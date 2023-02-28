/*
    Screen Class
*/

export class Screen {
    constructor() {
        // tells the state machine whether or not the screen has finished
        this.isFinished = false;
    } // end constructor


    // Called when the Screen is set to run . Starts the Screen.
    Start(app, data) {
        console.log("Start has not been Implemented...");
    } // end Start


    // Called when the Screen has terminated.
    OnEnd(app) {
        this.isFinished = false; // reset isFinished for next time
    } // end OnEnd
} // end Screen Class
