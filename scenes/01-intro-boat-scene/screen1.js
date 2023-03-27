/*
    Screen 1 - Plays a video of the boat on in the ocean for 24 seconds
*/

// Import the useful function library
import lib from '../../javascript/lib/lib.js';
import { screen2 } from '../scene2/screen2.js';

// put a message into local storage to be accessed by the next screen!
window.localStorage.setItem("myMsg", "This was loaded from local storage.");

// on button press, load next screen
document.getElementById("nextScreenBtn").onclick = () => {
    lib.loadNewHTMLFile('/scenes/scene2/screen2.html', screen2);
} // end onclick for nextScreenBtn

/*
// set new screen to appear when the video ends
let videoElementID = "screen_1_video";
let nextScreenPath = "/scenes/scene9/screen9.html";
lib.loadHTMLOnVideoFinished(videoElementID, nextScreenPath);
*/