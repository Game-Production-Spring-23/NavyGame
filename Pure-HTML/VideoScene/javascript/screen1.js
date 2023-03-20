/*
    Screen 1 - Plays a video of the boat on in the ocean for 24 seconds
*/

// Import the useful function library
import lib from './lib/lib.js';

// set new screen to appear when the video ends
let videoElementID = "screen_1_video";
let nextScreenPath = "/html/screen2.html";
lib.loadHTMLOnVideoFinished(videoElementID, nextScreenPath);
