/*
    The next level of the game! (screen 3)
*/

// the code to be ran when the new screen is loaded
function screen3() {
    // get the message stored in localStorage (from the previous screen)
    let myMsg = window.localStorage.getItem("anotherMsg");
    console.log(myMsg);
    // set the myText HTML header element to the message retrieved from localStorage
    if(myMsg !== null) {
        console.log(myMsg);
        document.getElementById("myText").innerText = myMsg;
    } // end if
} // end screen10


export { screen3 }