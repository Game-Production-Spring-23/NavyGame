
// Imports
import { playSplashScreen } from "../../lib.js";
import { mainMenu } from "../00-main-menu/script.js";

export function splashScreen() {
    playSplashScreen("/scenes/00-main-menu/Main-Menu-Scene.html",
                     "/scenes/00-main-menu/style.css",
                     mainMenu,
                     3000);
} // end splashScreen
