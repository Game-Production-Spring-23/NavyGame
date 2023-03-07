// State Machine

export class StateMachine {
    constructor(app, data, screenArray) {
       // core data for screens
       this.app = app;
       this.data = data;

       // the array of Screens given to the StateMachine
       this.screenArray = screenArray;
       this.state = 0; // the intial state
       this.currentScreen = this.screenArray[this.state];
    } // end constructor


    // Checks if a screen is finished
    CheckIfFinished() {
        return this.currentScreen.isFinished;
    } // end CheckIfFinished
    

    // Removes current screen and loads next screen
    UpdateState(state) {
        state = state % this.screenArray.length;
        // set previous and current screens based on the given state
        // use the previous state to set the previous screen
        let previousScreen = this.screenArray[this.state];

        // use the new state to set the current screen
        this.currentScreen = this.screenArray[state];

        // update the state value
        this.state = state;

        // end previous screen
        previousScreen.OnEnd(this.app);
        
        // start next screen
        this.currentScreen.Start(this.app, this.data);
    } // end UpdateState


    // calls the next screen in the array
    NextScreen() {
        this.UpdateState(this.state + 1);
    } // end NextScreen


    // calls the previous screen
    PreviousScreen() {
        this.UpdateState(this.state - 1);
    } // end PreviousScreen
} // end StateMachine Class