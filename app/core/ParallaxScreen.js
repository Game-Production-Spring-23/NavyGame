import { Screen } from "./Screen.js";

export class ParallaxScreen extends Screen {
    constructor() {
       super();
       this.parallaxTicker = new PIXI.Ticker();
       this.scrollSpeed = 6;
       this.isLocked = false;
       this.lockForParallax = true;
    } // end constructor

    initScreen() {
        super.initScreen();
    } // end initScreen

    // inits parallax values
    initParallax(app) {
        this.isLocked = false;
        this.lockForParallax = true;
        this.leftMaxDistBack = -(app.screen.width*3) / 2;
        this.leftMaxDistMid = -(app.screen.width) / 2;
    } // end initParallax

    // Called when the Screen is set to run . Starts the Screen.
    Start(app, data) {
        super.initScreen();
        this.initParallax(app);
        this.setHTML();
        this.parallaxTicker = new PIXI.Ticker();

        console.log(this.leftMaxDistBack);

        let goRight = false;
        let goLeft = false;
        // add checkers for button pressing
        this.parallaxTicker.add(() => {         
            if(goRight) {
                if(this.backgroundContainer.x > this.leftMaxDistBack) {
                    this.backgroundContainer.x -= this.scrollSpeed;
                } // end if

                if(this.midgroundContainer.x > this.leftMaxDistMid) {
                    this.midgroundContainer.x -= this.scrollSpeed / 3;
                } // end if
            } // end

            if(goLeft) {
                if(this.backgroundContainer.x < 0) {
                    this.backgroundContainer.x += this.scrollSpeed;
                } // end if

                if(this.midgroundContainer.x < 0) {
                    this.midgroundContainer.x += this.scrollSpeed / 3;
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
        this.leftMaxDistBack = -(app.screen.width*3) / 2;
        this.leftMaxDistMid = -(app.screen.width) / 2;
    } // end OnEnd


    // unlocks the second part of the stage
    Unlock() {
        if(this.lockForParallax) {
            this.lockForParallax = false;
            this.isLocked = true;
            this.leftMaxDistBack *= 2;
            this.leftMaxDistMid *= 2;
            console.log(this.leftMaxDistBack);
        } // end if
    } // end Unlock


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
