N436 Game Production - Edwin Sanchez

# Core Classes
This document covers all of the details regarding the classes below:
* **StateMachine:** The class in charge of scheduling screens to play, as well as cleaning up screens. *You should not need to mess with or inherit from this class.*
* **Screen:** The base screen class; Necessary to inherit from if your screen needs to be played in the state machine.
* **ParallaxScreen:** The base class for screens requiring parallax controls; Necessary to inherit from if your screen needs parallax controls and a screen lock.

## Class Diagram
![Class Diagram](/app/core/Class-Diagram.png)

## StateMachine
This class is in charge of scheduling the screens to play. You should not need to mess with this class or inherit from this class, but understanding how it works will help when creating screens.

This class is first instantiated in the main game javascript file. It is given a pixi application, the data.json object, and an array of all of the screens that can be played. Once it is initialized with the necessary objects, the main javascript file calls the *UpdateState* function once to start the state machine up. Then a pixi ticker is created and used to run a if-check on the state machine.

If *CheckIfFinished* returns true, then the state machine will call *NextScreen*, which handles closing the current screen and starting the next screen.

If the state machine is given an index that is equal to or greater than the length of the *screenArray*, then the state machine will wrap back around, starting back at the beginning of the array.

Below is an example of the state machine being initialized:

```
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
```

The *SCREENS* array is the list of screens added to the state machine. To add your own screen, simply import your screen class and add an instance of your screen class to the list. If you just want to test your screen, remove the rest of the screens and add only an instance of your screen class.

## Screen Class
This is the base class for all screens. It is necessary to inherit from it if your screen needs to be played in the state machine! - this class or the ParallaxScreen class, which is a child class of the Screen class already.

The Screen class sets up a few things:
1. It initializes a variable to determine when the screen has finished so that the state machine knows when to move on (isFinished). Set this to *true* when you want your screen to end.
2. It has a *Start* function that is called when you want to start your screen. Most of your code should go in here.
3. It has an *OnEnd* function that is called when the screen has finished. If there's things that need to be destroyed (such as containers or other objects), you can destroy them here.
4. It has 4 pixi container instances for adding things to the screen: *screenContainer*, *backgroundContainer*, *midGroundContainer*, and *foregroundContainer*. The *screenContainer* object is the parent for the remaining three, which are added so that the *backgroundContainer* is behind the *midgroundContainer*, and so that the *midgroundContainer* is behind the *foregroundContainer*. These come more in handy when you are using a *ParallaxScreen* class, where the different containers move at different speeds.

Below is an example of an extended **Screen Class**:
```
import { Screen } from "./Screen.js";

export class MyScreen extends Screen {
    constructor() {
       // call this to make sure the Screen is constructed correctly!
       super();
       super.initScreen(); // call this if your class is the first screen in the array...
    } // end constructor

    // Called when the Screen is set to run. Starts the Screen.
    Start(app, data) {
        super.Start(app, data);
        
        /* add my code here - create whatever I want */

        // add on events as needed -> calls a function when a key is pressed
        document.addEventListener('keydown', this.mySillyFunction);

        this.ticker = new PIXI.Ticker();
        this.ticker.add(() => {
            console.log("This runs continuously...");
        }); // end this.ticker.add
        this.ticker.start(); // starts ticker

        /* add components to containers */

        let backgroundTexture = PIXI.Texture.from(data.images.myBackgroundImage[0]);
        let backgroundSprite = new PIXI.Sprite(backgroundTexture);
        this.backgroundContainer.addChildAt(backgroundImage, 0);

        let mySpriteTexture = PIXI.Texture.from(data.images.mySpriteImage[0]);
        let mySprite = new PIXI.Sprite(mySpriteTexture);
        this.foregroundContainer.addChildAt(mySprite, 0);

        /* set my screen to end */

        // end the screen after 5 seconds of waiting
        setTimeout(() => {
            this.isFinished = true;
        }, 5000); // end setTimeout
    } // end Start


    // Called when the Screen has terminated.
    OnEnd(app) {
        // call this to make sure the screen is destroyed correctly!
        super.OnEnd(app);

        // destroy any objects you don't want anymore (the PIXI containers is already removed for you)
        this.ticker.stop();
        this.ticker.destroy();

        // remove my EventListeners so they don't get in the way for other people's screens
        document.removeEventListener('keydown', this.mySillyFunction);
    } // end OnEnd


    /* add functions as needed... */

    // this function is added to an Event Listener in Start
    mySillyFunction(event) {
        // do something when a key is pressed...
        console.log(event.key);
    } // end mySillyFunction
} // end MyScreen Class
```

Here are some useful tips: 
* The *Start* and *OnEnd* functions are what you want to override in the class you create. There you can create all of the objects you want and destroy them when they are not needed. 
* Make sure to call **super.Start(app, data);** in your **Start** and **super.OnEnd(app);** in your **OnEnd** - the screen won't work if you don't.
* Make sure to remove/destroy things like tickers and event listeners in *OnEnd* - they will either continue running (causing the application to slow down and eventually crash) or could overlap with someone else's screens (such as a keydown event that was not removed).
* If you need anything to continuously check and an *EventListener* won't work for it, then create a pixi ticker object to check values repeatedly until they change.


## Parallax Screen
This is the base class for screens requiring parallax controls; It is necessary to inherit from if your screen if it needs parallax controls and a screen lock.

This class inherits from the **Screen Class**, so it has all of the same stuff as the screen class, plus some new things (some of the inner workings are left out; the list below is everything you will need to mess with):
1. **isLocked:** You can use this to check if the parallax screen is locked or not (you may not need to use this).
2. **Unlock():** You can call this when you want to unlock the screen's game portion.

Below is an example of an extended **ParallaxScreen Class**:
```
import { ParallaxScreen } from "./ParallaxScreen.js";

export class MyScreen extends ParallaxScreen {
    constructor() {
       // call this to make sure the Screen is constructed correctly!
       super();
       super.initScreen(); // call this if your screen is the first screen in the array...
    } // end constructor

    // Called when the Screen is set to run. Starts the Screen.
    Start(app, data) {
        super.Start(app, data);
        
        /* same as Screen Class Example... */

       // unlock the second half of the stage with a button press (for example)
       document.addEventListener('keydown', (event) => {
            // example unlocks the screen
            if(event.key === "1") {
                super.Unlock();
            } // end if
       }); // end addEventListener
    } // end Start


    // Called when the Screen has terminated.
    OnEnd(app) {
        /* same as Screen Class Example... */
    } // end OnEnd


    /* add functions as needed... */


} // end Screen Class
```

The tips are the same for the Screen Class, except for one more:
* Make sure to call the *Unlock* function at some point to unlock the second portion of the screen!

> Message me (Edwin S.) if you are having issues. I'm sure we'll need to adjust some things as we go.
