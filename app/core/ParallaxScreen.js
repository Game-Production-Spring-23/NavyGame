import { Screen } from "./Screen.js";

export class ParallaxScreen extends Screen {
    constructor() {
       super();
       this.ticker = new PIXI.Ticker();
       this.scrollSpeed = 6;
    } // end constructor


    // Called when the Screen is set to run . Starts the Screen.
    Start(app, data) {
        super.Start(app, data);
        this.setHTML();
        this.ticker = new PIXI.Ticker();

        

        let goRight = false;
        let goLeft = false;
        let leftMaxDistBack = -(app.screen.width*3) / 2;
        let leftMaxDistMid = -(app.screen.width) / 2;
        // add checkers for button pressing
        this.ticker.add(() => {         
            if(goRight) {
                if(this.backgroundContainer.x > leftMaxDistBack) {
                    this.backgroundContainer.x -= this.scrollSpeed;
                } // end if

                if(this.midgroundContainer.x > leftMaxDistMid) {
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
        }); // end this.ticker.add
        this.ticker.start();

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

            // example unlocks exploreLock
            if(event.key === "1") {
                leftMaxDistBack *= 2;
                leftMaxDistMid *= 2;
            } // end if
        });

        // check if a move key was released
        document.addEventListener('keyup', (event) => {
            // check the key
            console.log(event.key);
            if(event.key === "ArrowRight" || event.key === "d") {
                goRight = false;
            } // end if

            if(event.key === "ArrowLeft" || event.key === "a") {
                goLeft = false;
            } // end if
        });
    } // end Start


    // Called when the Screen has terminated.
    OnEnd(app) {
        super.OnEnd(app);
        this.ticker.stop(); // stop the ticker I made
        this.ticker.destroy(); // destroy ticker I made
    } // end OnEnd


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
