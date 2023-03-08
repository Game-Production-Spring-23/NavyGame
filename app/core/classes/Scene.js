// Scene Class

export class Scene {
    constructor(shouldTick) {
        // tells the state machine whether or not the screen has finished
        this.isFinished = false;

        // tells the Scene whether or not to call the Tick function
        this.shouldTick = shouldTick;

        // the PIXI ticker that runs the Tick function
        this.ticker = null;

        // the PIXI Container containing all screens
        this.screenContainer = null;
    } // end constructor

    
    // Called when the Screen is set to run. Starts the Screen.
    Start(app, data) {
        // the PIXI ticker that runs the Tick function
        this.ticker = new PIXI.Ticker();

        // main container - contains all of the other containers
        this.screenContainer = new PIXI.Container(); 
    
        // sub containers - exist at different layers of the screenContainer
        this.backGroundContainer = new PIXI.Container(); // for background objects
        this.midGroundContainer = new PIXI.Container(); // for midground objects
        this.characterContainer = new PIXI.Container(); // character container
        this.foreGroundContainer = new PIXI.Container(); // for foreground object & character
        this.overlayContainer = new PIXI.Container(); // for overlays
        
        // sets the depths for each container in the screenContainer
        this.screenContainer.addChildAt(this.backGroundContainer, 0);
        this.screenContainer.addChildAt(this.midGroundContainer, 1);
        this.screenContainer.addChildAt(this.characterContainer, 2);
        this.screenContainer.addChildAt(this.foreGroundContainer, 3);
        this.screenContainer.addChildAt(this.overlayContainer, 4);

        // add containers to the screen
        app.stage.addChild(this.screenContainer);

        // set ticker object to run the Tick function
        this.ticker.add(() => {
            this.Tick(app, data);
        }); // end this.ticker.add

        // tell the ticker whether it should tick or not
        if(this.shouldTick) {
            this.ticker.start();
        } // end if
    } // end Start


    // Called when the Screen has terminate.
    OnEnd(app) {
        // reset isFinished for next time
        this.isFinished = false;

        // remove the ticker
        if(this.ticker) {
            this.ticker.stop(); // stop the screen's ticker
            this.ticker.destroy(); // destroy the screen's ticker
        } // end if
        
        // remove the screen container
        if(this.screenContainer) {
            app.stage.removeChild(this.screenContainer); // remove the screenContainer from the PIXI app
            this.screenContainer.destroy(); // destroy the screenContainer (and all child containers)
        } // end if
    } // end OnEnd


    // Ticks continuously while the screen is running if 'this.shouldTick' has been set to 'true'.
    Tick(app, data) {
        /* Implemented in Child Class */
    } // end Tick
} // end Screen Class
