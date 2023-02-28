// State Machine

export class StateMachine {
    constructor(screenArray) {
        this.screenArray = screenArray;
        this.state = -1;
        this.currentScreen = this.screenArray[0];
        this.previousScreen;
    } // end constructor

    // Checks if a screen is finished
    CheckIfFinished() {
        return this.currentScreen.isFinished;
    } // end CheckIfFinished
    
    // Removes current screen and loads next screen
    UpdateState(app, data) {
        // update the state for the next time it is called
        this.state = (this.state + 1) % this.screenArray.length;

        // set previous and current screens
        this.previousScreen = this.currentScreen;
        this.currentScreen = this.screenArray[this.state];

        // end previous screen
        this.previousScreen.OnEnd(app);
        
        // start next screen
        this.currentScreen.Start(app, data);
    } // end UpdateState
} // end StateMachine Class