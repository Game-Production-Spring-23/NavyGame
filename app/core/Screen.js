/*
    Screen Class
*/

export class Screen {
    constructor() {
        this.isFinished = false;
    } // end constructor


    // Called when the Screen is set to run . Starts the Screen.
    Start(app, data) {
        console.log("Start has not been Implemented...");
    } // end Start


    // Called when the Screen has terminated.
    OnEnd(app) {
        this.isFinished = false; // reset isFinished
    } // end OnEnd
} // end Screen Class
