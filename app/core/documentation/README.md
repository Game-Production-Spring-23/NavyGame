N436 Game Production - Edwin Sanchez

# Core Classes
This document covers all of the details regarding the classes below:
* **StateMachine:** The class in charge of scheduling screens to play, as well as cleaning up screens. *You should not need to mess with or inherit from this class.*
* **Scene:** The base Scene class; Necessary to inherit from if your Scene needs to be played in the state machine.
* **GameScene:** The base class for screens requiring parallax controls; Necessary to inherit from if your Scene needs parallax controls.

## Class Diagram
![Class Diagram](/app/core/Class-Diagram.png)

## StateMachine
This class is in charge of scheduling the screens to play. You should not need to mess with this class or inherit from this class, but understanding how it works will help when creating screens.

This class is first instantiated in the main game javascript file. It is given a pixi application, the data.json object, and an array of all of the screens that can be played. Once it is initialized with the necessary objects, the main javascript file calls the *UpdateState* function once to start the state machine up. Then a pixi ticker is created and used to run a if-check on the state machine.

If *CheckIfFinished* returns true, then the state machine will call *NextScreen*, which handles closing the current Scene and starting the next Scene.

If the state machine is given an index that is equal to or greater than the length of the *screenArray*, then the state machine will wrap back around, starting back at the beginning of the array.

Below is an example of the state machine being initialized:

```
import { StateMachine } from "./core/classes/StateMachine.js";
import { StartScreen } from "./StartScreen/StartScreen.js";
import { Scene1 } from "./Scene1/Scene1.js"
import { GameDemoScene } from "./GameDemoScene/GameDemoScene.js";


// initialize the screens -> they get a reference to the state machine
// you can add scenes to the array to test them out! Comment out the scenes you don't want to run
const SCREENS = [
    new StartScreen(),
    //new Scene1(), -> commented out so that it does not run in the state machine
    new GameDemoScene()
]; // end screens array


// get the json data
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

    // start first scene
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
```
### Some Tips:
* The *SCREENS* array is the list of scenes added to the state machine. To add your own Scene, simply import your Scene class and add an instance of your Scene class to the list. If you just want to test your Scene, remove the rest of the screens and add only an instance of your Scene class.

## Scene Class
This is the base class for all scenes. It is necessary to inherit from it if your Scene needs to be played in the state machine! - you can also inherit from the GameScene class, which is a child class of the Scene class already.

The Scene class sets up a few things:
1. It initializes a variable to determine when the Scene has finished so that the state machine knows when to move on (**isFinished**). Set this to *true* when you want your Scene to end.
2. It has a *Start* function that is called when you want to start your Scene. Most of your code should go in here.
3. It has an *OnEnd* function that is called when the Scene has finished. If there's things that need to be destroyed (such as containers or other objects), you can destroy them here. This is also a good place to remove EventListeners you created specifically for your Scene.
4. It also has a *Tick* function that is ran in a loop. This can be enabled/disabled through the *this.shouldTick* boolean variable.
5. It has 6 pixi container instances for adding things to the Scene: *screenContainer*, *backGroundContainer*, *midGroundContainer*, *characterContainer*, *foreGroundContainer*, and *overlayContainer*. The *screenContainer* object is the parent for the remaining containers. The order of the containers inside of the *screenContainer* is the same as the order listed above, with the *backGroundContainer* being at the bottom of the layers, and the *overlayContainer* being at the top of the layers. If you don't need the extra complexity of different layers for grouping, then just add elements to the *screenContainer*. If it helps to group sprites at different layers, feel free to use the containers at your own discretion. These come more in handy when you are using a *GameScene* class, where the *backGroundContainer*, *midGroundContainer*, and *foreGroundContainer* are set to scroll across the screen at different speeds.

Below is an example implementation of the **Scene Class**; This template is available in the [Templates](/app/core/classes/Templates/) folder:
```
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
```

### Here are some useful tips: 
* The *Start*, *Tick*, and *OnEnd* functions are what you want to override in the class you create. There you can create all of the objects you want and destroy them when they are not needed. 
* Make sure to call **super.Start(app, data);** in your **Start** and **super.OnEnd(app);** in your **OnEnd** - the Scene won't work if you don't.
* Make sure to remove/destroy things like event listeners in *OnEnd* - they will either continue running (causing the application to slow down and eventually crash) or could overlap with someone else's screens (such as a keydown event that was not removed). Anything added to the containers are taken care of, don't worry about those.


## GameScene
This is the base class for Scenes requiring parallax controls; It is necessary to inherit from if your Scene if it needs parallax controls.

This class inherits from the **Scene Class**, so it has all of the same stuff as the Scene class, plus some new things (some of the inner workings are left out; the list below is everything you will need to mess with):
1. **isLocked:** You can use this to check if the parallax Scene is locked or not (you may not need to use this).
2. **Unlock():** You can call this when you want to unlock the Scene's game portion.
3. **backGround, foreGround, and midGround Containers:** You can add sprites to each of these containers depending on which ones are supposed to in the background, midground, or foreground.
4. **setScrollSpeedAndRatios(scrollSpeed, backGroundRatio, midGroundRatio, foreGroundRatio):** Sets the values for the screens and the character. the ratios are used with the scrollSpeed to determine the speed of each screen. Put in the ratios as they are in relation to the size of one monitor (see example below).
5. **this.character (PIXI.Sprite):** This is the character sprite needed for every GameScene. You will need to set the character's y value *this.character.y* to a value where the character sits correctly in the midground. Set *this.character.visible = true* to make the character visible. 
Below is an example of an extended **GameScene Class**:
```
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
```

### The tips are the same for the Scene Class, except for one more:
* Make sure to call the *Unlock* function at some point to unlock the second portion of the Scene!
* Again, you will need to make the character visible after setting where it should start in on the screen! (I would make sure that the position is based off the size of the screen to avoid position issues).
* Make sure that *Tick(app, data)* is set up or the GameScene won't work (it relies on the Tick function).
* Make sure to set the speed & ratios based on the size of the panels given by the art team!

> Message me (Edwin S.) if you are having issues. I'm sure we'll need to adjust some things as we go.
