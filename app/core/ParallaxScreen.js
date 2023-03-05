import { Screen } from "./Screen.js";

/*
Ratio for screens:
Background: 150%
Midground: 200%
Foreground: 300%
*/


export class ParallaxScreen extends Screen {
    constructor() {
        // call parent constructor
        super();

        // create a ticker for watching parallax values
        this.parallaxTicker = new PIXI.Ticker();
        
        // set scroll values
        this.setScrollSpeedAndRatios(1, 1.5, 2, 3);

        this.character = null;

        // lock booleans
        this.isLocked = false;
        this.internalLock = true;
    } // end constructor

    initScreen() {
        super.initScreen();
    } // end initScreen

    // inits parallax values
    initParallax(app) {
        // lock booleans
        this.isLocked = false;
        this.internalLock = true;

        // all screens are locked to a single screen length (until unlocked)
        this.leftMaxDistBack = 0;
        this.leftMaxDistMid = 0;
        this.leftMaxDistFore = 0;
    } // end initParallax

    // Called when the Screen is set to run . Starts the Screen.
    Start(app, data) {
        super.initScreen();
        this.initParallax(app);
        this.setHTML();
        this.parallaxTicker = new PIXI.Ticker();

        let goRight = false;
        let goLeft = false;

        // add checkers for button pressing
        this.parallaxTicker.add(() => {    
            // if the player is trying to scroll to the right...     
            if(goRight) {
                // check background limit
                if(this.character.x <= app.screen.width) {
                    this.character.x += this.foreGroundScrollSpeed;
                } else { // the character is at the limit
                    if(this.backgroundContainer.x > this.leftMaxDistBack) {
                        this.backgroundContainer.x -= this.backGroundScrollSpeed;
                    } else { // character movement
                        
                    }// end if
    
                    // check midground limit
                    if(this.midgroundContainer.x > this.leftMaxDistMid) {
                        this.midgroundContainer.x -= this.midGroundScrollSpeed;
                    } // end if
    
                    // check foreground limit
                    if(this.foregroundContainer.x > this.leftMaxDistFore) {
                        this.foregroundContainer.x -= this.foreGroundScrollSpeed;
                    } // end if
                } // end if
            } // end if

            // if the player is trying to scroll to the left...
            if(goLeft) {
                // check background limit
                if(this.character.x >= 0) {
                    this.character.x -= this.foreGroundScrollSpeed;
                } else { // the character is at the limit
                    if(this.backgroundContainer.x < 0) {
                        this.backgroundContainer.x += this.backGroundScrollSpeed;
                    } else { // character movement
                        
                    } // end if
    
                    // check midground limit
                    if(this.midgroundContainer.x < 0) {
                        this.midgroundContainer.x += this.midGroundScrollSpeed;
                    } // end if
    
                    // check foreground limit
                    if(this.foregroundContainer.x < 0) {
                        this.foregroundContainer.x += this.foreGroundScrollSpeed;
                    } // end if
                } // end if
            } // end if
        }); // end this.parallaxTicker.add
        this.parallaxTicker.start();

        // add window events
    
        // check if a move key was pressed down
        document.addEventListener('keydown', (event) => {
            // check the key
            if(event.key === "ArrowRight" || event.key === "d") {
                goRight = true;
            } // end if

            if(event.key === "ArrowLeft" || event.key === "a") {
                goLeft = true;
            } // end if
        }); // end addEventListener

        // check if a move key was released
        document.addEventListener('keyup', (event) => {
            // check the key
            if(event.key === "ArrowRight" || event.key === "d") {
                goRight = false;
            } // end if

            if(event.key === "ArrowLeft" || event.key === "a") {
                goLeft = false;
            } // end if
        }); // end addEventListener
    } // end Start


    // Called when the Screen has terminated.
    OnEnd(app) {
        super.OnEnd(app);
        this.parallaxTicker.stop(); // stop the ticker I made
        this.parallaxTicker.destroy(); // destroy ticker I made
        this.isLocked = false;
    } // end OnEnd


    // unlocks the second part of the stage
    Unlock(app) {
        if(this.internalLock) {
            this.internalLock = false;
            this.isLocked = true;
            console.log("Unlocked");
            this.leftMaxDistBack = (-(app.screen.width)*this.backGroundRatio) + app.screen.width;
            this.leftMaxDistMid = (-(app.screen.width)*this.midGroundRatio) + app.screen.width;
            this.leftMaxDistFore = (-(app.screen.width)*this.foreGroundRatio) + app.screen.width;
            console.log(`${this.leftMaxDistBack}`);
            console.log(`${this.leftMaxDistMid}`);
            console.log(`${this.leftMaxDistFore}`);
        } // end if
    } // end Unlock


    // creates the character sprite and mechanics
    createCharacter(app, data, groundLevel) {
        this.characterTexture = PIXI.Texture.from(data.images.boat[0]);
        this.character = new PIXI.Sprite(this.characterTexture);
        this.character.anchor.set(0.5);
        this.character.x = app.screen.width / 2;
        this.character.y = groundLevel;
        this.character.width = 175;
        this.character.height = 100;

        this.stationaryContainer.addChildAt(this.character, 0);
    } // end createCharacter


    // set the scroll speed and ratios of the screens
    setScrollSpeedAndRatios(scrollSpeed, backGroundRatio, midGroundRatio, foreGroundRatio) {
        // base element of scroll speed - change this variable to speed up/ slow down movement
        this.scrollSpeed = scrollSpeed;

        // the ratios for the different sceens
        this.backGroundRatio = backGroundRatio; // 150% distance
        this.midGroundRatio = midGroundRatio; // 200% distance
        this.foreGroundRatio = foreGroundRatio; // fastest/longest screen - 300% distance (100% being one full screen)

        // the scroll speeds of each screen, derived from the base scroll speed and the ratios given
        this.backGroundScrollSpeed = this.scrollSpeed * this.backGroundRatio;
        this.midGroundScrollSpeed = this.scrollSpeed * this.midGroundRatio * this.backGroundRatio;
        this.foreGroundScrollSpeed = this.scrollSpeed * this.foreGroundRatio * this.midGroundRatio;
    } // end setScrollSpeedAndRatios


    // set html settings so that pixi loads the canvas element correctly
    setHTML() {
        // Get HTML head element
        var head = document.getElementsByTagName('HEAD')[0];

        // Create new link Element
        var link = document.createElement('link');

        // set the attributes for link element
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '/app/screen1/style.css';

        // Append link element to HTML head
        head.appendChild(link);

        let splash = document.getElementById("splash");
        let bottomLinks = document.getElementById("bottomLinks"); //Links at bottom of start screen
        let gameContainer = document.getElementById("gameContainer"); //Container for game
        let settingsContainer = document.getElementById("settingsContainer"); //Container for settings
        let scoreContainer = document.getElementById("scoreContainer");
        let journalScreen = document.getElementById("journalContainer");
        let mapScreen = document.getElementById("mapContainer");
        let appContainer = document.getElementById("app");
        splash.style.display = "none";
        bottomLinks.style.display = "none";
        gameContainer.style.display = "none";
        settingsContainer.style.display = "none";
        scoreContainer.style.display = "none";
        journalScreen.style.display = "none";
        mapScreen.style.display = "none";
        appContainer.style.display = "none";
    } // end setHTML
} // end Screen Class
