// Scene Class

export class Scene {
    constructor(shouldTick, isHTML) {
        // tells the state machine whether or not the screen has finished
        this.isFinished = false;

        // tells the Scene whether or not to call the Tick function
        this.shouldTick = shouldTick;

        // tells the Scene if the scene is set up through pure HTML
        this.isHTML = isHTML;

        // the PIXI ticker that runs the Tick function
        this.ticker = null;

        // the PIXI Container containing all screens
        this.screenContainer = null;

        // the list of overlay classes for the Scene
        this.overlayClasses = null;

        // the list of overlays - managed by the Scene
        this.overlays = null;
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
        this.iconContainer = new PIXI.Container(); // for holding icons for overlays
        this.overlayContainer = new PIXI.Container(); // for overlays
        
        // sets the depths for each container in the screenContainer
        this.screenContainer.addChildAt(this.backGroundContainer, 0);
        this.screenContainer.addChildAt(this.midGroundContainer, 1);
        this.screenContainer.addChildAt(this.characterContainer, 2);
        this.screenContainer.addChildAt(this.foreGroundContainer, 3);
        this.screenContainer.addChildAt(this.iconContainer, 4);
        this.screenContainer.addChildAt(this.overlayContainer, 5);

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

        // check if the scene is pure html
        if(this.isHTML == true) {
            // load the style sheet
            this.LoadStyleSheet("/style.css");
            // hide pixi app
            app.view.style.display = "none";
        } else {
            this.LoadStyleSheet("/removeStyle.css");
            app.view.style.display = "block";
        } // end if


        // add Overlays to the screen
        // icons supported only if using a pixi app
        if(this.isHTML == false) {
            // check if there are any classes set
            if(this.overlayClasses != null) {
                this.overlays = [];
                for(let i = 0; i < this.overlayClasses.length; i++) {
                    // create the overlay
                    this.overlays.push(new this.overlayClasses[i](this));
    
                    // if the overlay has an icon, display it
                    if(this.overlays[i].generateIcon == true) { 
                        this.overlays[i].InitIcon(app, data, this);   
                        this.iconContainer.addChildAt(this.overlays[i].icon, i);
                    } // end if
                } // end for
            } // end if
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
    
        // de allocate overlays - will be rebuilt on Start
        this.overlays = null;
    } // end OnEnd


    // Ticks continuously while the screen is running if 'this.shouldTick' has been set to 'true'.
    Tick(app, data) {
        /* Implemented in Child Class */
    } // end Tick


    /* Class Functions */


    // Sets up what classes to use for Overlays
    InitOverlays(listOfOverlayClasses) {
        this.overlayClasses = listOfOverlayClasses;
    } // end InitOverlays


    // loads a style sheet for the html page
    LoadStyleSheet(styleSheetPath) {
        document.getElementById("styleSheet").setAttribute("href", styleSheetPath);
    } // end loadStyleSheet


    // tells what html elements to display
    DisplayHTML(idList, classList) {
        // for every id in the list, set to block
        if(idList != null) {
            for(let i = 0; i < idList.length; i++) {
                document.getElementById(idList[i]).style.display = "block";
            } // end for
        } // end if

        // for every class in the list, set every item in that class to block
        if(classList != null) {
            for(let i = 0; i < classList.length; i++) {
                // get all of the elements in a class
                let classItems = document.getElementsByClassName(classList[i]);

                // set those elements to block
                for(let j = 0; j < classItems.length; j++) {
                    classItems[j].style.display = "block";
                } // end for
            } // end for
        } // end if
    } // end DisplayHTML


    // tells what html elements to remove
    HideHTML(idList, classList) {
        // for every id in the list, set to block
        if(idList != null) {
            for(let i = 0; i < idList.length; i++) {
                document.getElementById(idList[i]).style.display = "none";
            } // end for
        } // end if

        // for every class in the list, set every item in that class to block
        if(classList != null) {
            for(let i = 0; i < classList.length; i++) {
                // get all of the elements in a class
                let classItems = document.getElementsByClassName(classList[i]);

                // set those elements to block
                for(let j = 0; j < classItems.length; j++) {
                    classItems[j].style.display = "none";
                } // end for
            } // end for
        } // end if
    } // end HideHTML
} // end Screen Class
