// Example Scene -> read comments for details on implementation

import { Scene } from "../Scene.js";

// Creates a class called SceneTemplate that inherits from the Scene class and exports it
export class SceneTemplate extends Scene {
    // The constructor for the class -> gets called when an instance of the class is created
    constructor() {
        // make sure to call the parent class's constructor -> it performs important tasks!!!
        // pass in the 'shouldTick' variable into the parent constructor to tell whether to tick or not
        let shouldTick = false;
        super(shouldTick);

        // initialize class constants here, and any values that need to be accessed by all functions.
        // This will only be called once, when the Screen is first constructed in the SCREEN array that is
        // given to the StateMachine. If you need a value initialized more than once, set the value in
        // the Start function.
    } // end constructor


    // Called when the Scene is set to run. Starts the Scene.
    Start(app, data) {
        // call parent class's Start function -> it performs important actions!
        super.Start(app, data);

        /* add my code here - create whatever I want */

        // add on events as needed -> calls a function when a key is pressed
        document.addEventListener('keydown', this.mySillyFunction);

        /* add components to containers */

        let backgroundTexture = PIXI.Texture.from(data.images.myBackgroundImage[0]);
        let backgroundSprite = new PIXI.Sprite(backgroundTexture);
        this.backGroundContainer.addChildAt(backgroundSprite, 0);

        let mySpriteTexture = PIXI.Texture.from(data.images.mySpriteImage[0]);
        let mySprite = new PIXI.Sprite(mySpriteTexture);
        this.foreGroundContainer.addChildAt(mySprite, 0);

        /* set my Scene to end */

        // end the Scene after 5 seconds of waiting
        setTimeout(() => {
            this.isFinished = true;
        }, 5000); // end setTimeout
    } // end Start


    // Called when the Scene has been set to terminate.
    OnEnd(app) {
        // call parent class's OnEnd function -> performs important actions!
        super.OnEnd(app);

       // destroy any objects you don't want anymore 
       // (the PIXI containers are already removed for you)

       // remove my EventListeners so they don't get in the way for other people's screens
       document.removeEventListener('keydown', this.mySillyFunction);
    } // end OnEnd


    // Ticks continuously while the screen is running if 'this.shouldTick' has been set to 'true'.
    Tick(app, data) {
        // call parent class's Tick function -> performs important actions... (if active)
        super.Tick(app, data);

        /* do something repeatedly */
    } // end Tick


    /* add functions as needed... */

    
    // this function is added to an Event Listener in Start
    mySillyFunction(event) {
        // do something when a key is pressed...
        console.log(event.key);
    } // end mySillyFunction
} // end SceneTemplate Class
