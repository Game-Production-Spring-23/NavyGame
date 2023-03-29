/*
    Edwin Sanchez - Navy Game - Function Library
    A library of useful functions.
*/


// Loads a new HTML file given a file name and a style sheet
// the next parameter is a callback function.
export function loadNewHTMLFile(filePath, styleSheetPath, next) {
    // load the new html file
    fetch(filePath)
    .then(response=> response.text())
    .then(text=> document.getElementById('htmlMainContainer').innerHTML = text)
    .then(()=> {
        loadStyleSheet(styleSheetPath);   
        next();
    });
} // end loadNewHTMLFile


// loads the next screen once the given video ends. 
// The video is given as the id of the element.
// the first 3 parameters are the same as loadNewHTMLFile
export function loadHTMLOnVideoEnd(filePath, styleSheetPath, next, videoElementID) {
    let video = document.getElementById(videoElementID);
    video.onloadedmetadata = () => {
        video.play();
        setTimeout(() => {
            loadNewHTMLFile(filePath, styleSheetPath, next);
        }, video.duration * 1000);
    } // end onloadedmetadata
} // end loadHTMLOnVideoEnd


// Loads a stylesheet into the current html file.
// Called by default in LoadNewHTMLFile and loadHTMLOnVideoEnd
export function loadStyleSheet(styleSheetPath) {
    // remove previous stylesheet
    let link = document.getElementById("style");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", styleSheetPath);
} // end


// plays a splash screen for a given amount of time.
// waitTime is in miliseconds.
export function playSplashScreen(filePath, styleSheetPath, next, waitTime) {
    setTimeout(() => {
        loadNewHTMLFile(filePath, 
            styleSheetPath,
                        next);
    }, waitTime); // end setTimeout
} // end playSplashScreen
