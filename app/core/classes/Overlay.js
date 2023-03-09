// Overlay Class - Scene that is layered on another Scene
// Extremely Similar to Scene, but is supposed to be dependent on a Scene!
// Examples: Options, MiniGame, etc...


export class Overlay {
    constructor(shouldTick, isHTML, sceneObj, generateIcon) {
        // tells the Overlay whether or not to call the Tick function
        this.shouldTick = shouldTick;

        // tells the Overlay whether or not the overlay is made from pure HTML
        this.isHTML = isHTML;

        // the parent scene reference
        this.sceneObj = sceneObj;
        
        // tells whether or not this Overlay should generate an Icon
        this.generateIcon = generateIcon;

        // the PIXI ticker that runs the Tick function
        this.overlayTicker = new PIXI.Ticker();

        // the icon sprite
        this.icon = null;
    } // end constructor

    
    // Called when the Screen is set to run. Starts the Screen.
    Display(app, data, ticker) {
        // create the PIXI container containing everything
        this.mainContainer = new PIXI.Container();
        // set ticker object to run the Tick function
        if(ticker) {
            ticker.add(() => {
                this.Tick(this.app, this.data);
            }); // end this.ticker.add
    
            // tell the ticker whether it should tick or not
            if(this.shouldTick) {
                ticker.start();
            } // end if
        } // end if
        
        // check if the scene is pure html
        if(this.isHTML == true) {
            // load the style sheet
            this.LoadStyleSheet("/style.css");

            // hide pixi app
            app.view.style.display = "none";
        } else {
            this.sceneObj.overlayContainer.addChild(this.mainContainer);
        } // end if
    } // end Display


    // Called when the Overlay needs to be hidden.
    Hide(app, data) {
        // pause the ticker the ticker
        if(this.overlayTicker) {
            this.overlayTicker.stop(); // stop the screen's ticker
        } // end if

        // restart the Scene's ticker (if exists)
        if(this.sceneObj.ticker) {
            if(this.sceneObj.shouldTick) {
                this.sceneObj.ticker.start();
            } // end if
        } // end if

        // if the remove all of the children from the overlay container
        this.sceneObj.overlayContainer.removeChildren();


        // check if the scene is pure html -> if not, then need to prepare for pixi app
        if(this.sceneObj.isHTML == false) {
            // replace stylesheet with clean slate style sheet
            this.LoadStyleSheet("/removeStyle.css");

            // make pixi app viewable
            app.view.style.display = "block";
        } // end if
    } // end OnEnd


    // Ticks continuously while the screen is running if 'this.shouldTick' has been set to 'true'.
    Tick(app, data) {
        /* Implemented in Child Class */
    } // end Tick


    /* Class Functions */

    // Initializes an Icon that will appear on the Scene according to the parameters passed in here.
    // The Icon wil be clickable, enabling the scene.
    InitIcon(app, data, imagePathArray, xLoc, yLoc, width, height) {
        let textureArray = [];
        for(let i = 0; i < imagePathArray.length; i++) {
            let texture = PIXI.Texture.from(imagePathArray[i]);
            textureArray.push(texture);
        } // end for

        // create sprite for Icon
        this.icon = new PIXI.AnimatedSprite(textureArray);

        // set initial values for Icon
        this.ChangeIconParams(xLoc, yLoc, width, height);

        // Opt-in to interactivity
        this.icon.interactive = true;

        // Shows hand cursor
        this.icon.buttonMode = true;

        // when user clicks on icon
        this.icon.on('pointerdown', () => {
            // pause Scene's ticker
            if(this.sceneObj.ticker) { this.sceneObj.ticker.stop(); }
    
            // Call the Display function when this happens
            this.Display(app, data, this.overlayTicker);
        }); // end this.icon.on

        // Icon (sprite) is added to screen by Scene class
    } // end InitIcon


    // For changing the Icon (if it already exists)
    ChangeIconParams(xLoc, yLoc, width, height) {
        // check if icon exists
        if(this.icon != null) {
            this.icon.x = xLoc;
            this.icon.y = yLoc;
            this.icon.width = width;
            this.icon.height = height;
        } // end if
    } // end ChangeIconParams


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
} // end Overlay Class
