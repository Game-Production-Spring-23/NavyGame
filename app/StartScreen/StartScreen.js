import { Scene } from "../core/classes/Scene.js";

export class StartScreen extends Scene {
    constructor() {
        let shouldTick = false;
        super(shouldTick);

        // init class variables
        this.styleSheet = document.getElementById("styleSheet");
        this.splash = document.getElementById("splash");
        this.bottomLinks = document.getElementById("bottomLinks"); //Links at bottom of start screen
        this.gameContainer = document.getElementById("gameContainer"); //Container for game
        this.settingsContainer = document.getElementById("settingsContainer"); //Container for settings
        this.scoreContainer = document.getElementById("scoreContainer");
        this.journalScreen = document.getElementById("journalContainer");
        this.mapScreen = document.getElementById("mapContainer");
        this.music = new Audio("/assets/audio/SFXmusic.mp3");
        this.appContainer = document.getElementById("app");
        this.journalScreen.style.display = "none";
        this.mapScreen.style.display = "none";
        this.settingsContainer.style.display = "none";
    } // end constructor


    // Called when the Scene is set to run. Starts the Scene.
    Start(app, data) {
        // call parent class's Start function -> performs important actions!
        super.Start(app, data);

        // set style sheet
        this.styleSheet.setAttribute("href", "/style.css");

        // set what is displayed
        this.splash.style.display = "block";
        this.splash.style.opacity = 1;
        this.bottomLinks.style.display = "block";
        this.gameContainer.style.display = "block";
        this.appContainer.style.display = "block";

        // hide pixi app
        app.view.style.display = "none";

        // set splash to disappear
        this.splash.addEventListener("click", () => {
            //Plays background music
            this.music.volume = 0.4;
            //music.play();
            this.splash.style.opacity = 0;
            setTimeout(() => {
              this.splash.style.display = "none";
            }, 610);
        });

        // set start button to end screen
        document.getElementById("start").onclick = () => {
            this.isFinished = true;
            console.log("Finished Start Screen");
        } // end getElementById
    } // end Start


    // Called when the Scene has been set to terminate.
    OnEnd(app) {
        // call parent class's OnEnd function -> performs important actions!
        super.OnEnd(app);

        this.styleSheet.setAttribute("href", "/app/StartScreen/removeStyle.css");

        // hide all elements
        this.splash.style.display = "none";
        this.bottomLinks.style.display = "none";
        this.gameContainer.style.display = "none";
        this.settingsContainer.style.display = "none";
        this.scoreContainer.style.display = "none";
        this.journalScreen.style.display = "none";
        this.mapScreen.style.display = "none";
        this.appContainer.style.display = "none";

        // make pixi app viewable
        app.view.style.display = "block";
    } // end OnEnd


    // Ticks continuously while the screen is running if 'this.shouldTick' has been set to 'true'.
    Tick(app, data) {
        // call parent class's Tick function -> performs important actions... (if active)
        super.Tick(app, data);
    } // end Tick
} // end Game Scene Class