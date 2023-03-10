import { Scene } from "../core/classes/Scene.js";

export class StartScreen extends Scene {
    constructor() {
        let shouldTick = false;
        let isHMTL = true;
        super(shouldTick, isHMTL);

        // init class variables
        this.splash = document.getElementById("splash");
        this.htmlApp = document.getElementById("app");
        this.gameContainer = document.getElementById("gameContainer");
        this.bottomLinks = document.getElementById("bottomLinks");
        this.music = new Audio("/assets/audio/SFXmusic.mp3");

        // Hide Elements - using the HTML ids
        this.elementIds = [
            "settingsContainer",
            "mapContainer",
            "scoreContainer",
            "journalContainer"
        ]; // end elementIds
        super.HideHTML(this.elementIds, null);
    } // end constructor


    // Called when the Scene is set to run. Starts the Scene.
    Start(app, data) {
        // call parent class's Start function -> performs important actions!
        super.Start(app, data);

        // set what is displayed
        super.HideHTML(this.elementIds, null);
        this.htmlApp.style.display = "block";
        this.splash.style.display = "block";
        this.gameContainer.style.display = "block";
        this.bottomLinks.style.display = "block";

        this.splash.style.opacity = 1;

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

        // hide all elements
        this.splash.style.display = "none";
        this.htmlApp.style.display = "none";
        this.gameContainer.style.display = "none";
        this.bottomLinks.style.display = "none";
        super.HideHTML(this.elementIds, null);
    } // end OnEnd


    // Ticks continuously while the screen is running if 'this.shouldTick' has been set to 'true'.
    Tick(app, data) {
        // call parent class's Tick function -> performs important actions... (if active)
        super.Tick(app, data);
    } // end Tick
} // end Game Scene Class