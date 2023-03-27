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
    let file = document.createElement("link");
    file.setAttribute("rel", "stylesheet");
    file.setAttribute("type", "text/css");
    file.setAttribute("href", styleSheetPath);
    document.getElementsByTagName("head")[0].appendChild(file);
} // end
