/*
    Edwin Sanchez - Navy Game - Function Library
    A library of useful functions.
*/


// Loads a new HTML file given a file name.
function loadNewHTMLFile(fileName) {
    fetch(fileName)
    .then((response) => response.text())
    .then((file) => {
        document.write(file);
    }); // end json file loading.
} // end loadNewHTMLFile


// Loads a new screen when the video is finished
function loadHTMLOnVideoFinished(videoElementID, nextScreenPath) {
    let video = document.getElementById(videoElementID);
    if(video.paused) video.play();
    
    setTimeout(() => {
        loadNewHTMLFile(nextScreenPath);
    }, (video.duration - video.currentTime) * 1000);
} // end loadScreenOnFinished


// Export Functions & Classes
export default { loadNewHTMLFile, loadHTMLOnVideoFinished }
