import { StateMachine } from "./core/classes/StateMachine.js";
import { StartScreen } from "./StartScreen/StartScreen.js";
import { Scene1 } from "./Scene1/Scene1.js"
import { GameDemoScene } from "./parallax-example/GameDemoScene.js";


// initialize the screens -> they get a reference to the state machine
const SCREENS = [
    new StartScreen(),
    new Scene1(),
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

//Changes display state of icons on hover
function settingsHover(img) {
    if (img.src.match("/assets/images/ui/settingsBtn.png")) {
      img.src = "/assets/images/ui/settingsBtnHover.png";
    } else {
      img.src = "assets/images/ui/startBtnHover.png";
    }
}
  
function settingOut(img) {
    if (img.src.match("/assets/images/ui/settingsBtnHover.png")) {
        img.src = "/assets/images/ui/settingsBtn.png";
    } else {
        img.src = "/assets/images/ui/startBtn.png";
    }
}

//changed volume
function changeVolume(val) {
    music.volume = val;
    console.log(val);
}

//hides map popup box when clicked
function toggleMapOff() {
    //Tested, works
    mapScreen.style.display = "none";
}

//shows main settings screen--TESTED. Works.
function showOptions() {
    //shows options, hides bottom links and replaces elements with settingsContainer
    bottomLinks.style.display = "none";
    gameContainer.style.display = "none";
    settingsContainer.style.display = "block";
    score.style.visibility = "hidden";
}

window.settingsHover = settingsHover;
window.settingOut = settingOut;
window.showOptions = showOptions;
window.changeVolume = changeVolume;
window.toggleMapOff = toggleMapOff;
