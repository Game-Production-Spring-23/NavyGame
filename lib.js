/*
    Edwin Sanchez - Navy Game - Function Library
    A library of useful functions.
*/


// Loads a new HTML file given a file name.
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


export function loadStyleSheet(styleSheetPath) {
    // remove previous stylesheet
    let link = document.getElementById("style");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", styleSheetPath);
} // end


export function playSplashScreen(htmlFile, cssFile, next, waitTime) {
    setTimeout(() => {
        loadNewHTMLFile(htmlFile, 
                        cssFile,
                        next);
    }, waitTime);
} // end playSplashScreen
