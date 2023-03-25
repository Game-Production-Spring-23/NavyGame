/*
    The next level of the game! (screen 2)
*/

import lib from '../../javascript/lib/lib.js';
import { screen3 } from '../scene3/screen3.js';

// the code to be ran when the new screen is loaded
function screen2() {
    // get the message stored in localStorage (from the previous screen)
    let myMsg = window.localStorage.getItem("myMsg");
    console.log(myMsg);
    // set the myText HTML header element to the message retrieved from localStorage
    if(myMsg !== null) {
        console.log(myMsg);
        document.getElementById("myText").innerText = myMsg;
    } // end if

    // set a message for the next screen to use...
    window.localStorage.setItem("anotherMsg", "This is another message loaded from local storage.");
    
    // on button press, load next screen
    document.getElementById("nextScreenBtn").onclick = () => {
        lib.loadNewHTMLFile('/scenes/scene10/screen10.html', screen3);
    } // end onclick for nextScreenBtn
} // end screen9


export { screen2 }