/*
    Edwin Sanchez - Navy Game - Function Library
    A library of useful functions.
*/


// Loads a new HTML file given a file name.
export function loadNewHTMLFile(fileName, next) {
    // load the new html file
    fetch(fileName)
    .then(response=> response.text())
    .then(text=> document.getElementById('htmlPage').innerHTML = text)
    .then(()=> next());
} // end loadNewHTMLFile


// Loads a new screen when the video is finished
export function loadHTMLOnVideoFinished(videoElementID, nextScreenPath) {
    let video = document.getElementById(videoElementID);
    if(video.paused) video.play();
    
    setTimeout(() => {
        loadNewHTMLFile(nextScreenPath);
    }, (video.duration - video.currentTime) * 1000);
} // end loadScreenOnFinished

