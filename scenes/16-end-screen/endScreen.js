import { loadNewHTMLFile, devSkip } from "/lib.js";
import { mainMenu } from "/scenes/00-main-menu/script.js";

export function endScreen() {
    devSkip(
        "/scenes/00-main-menu/Main-Menu-Scene.html",
        "/scenes/00-main-menu/style.css",
        mainMenu
    );

    let restartBtn = document.getElementById("restartBtn");
    restartBtn.onclick = () => {
        loadNewHTMLFile(
            "/scenes/00-main-menu/Main-Menu-Scene.html",
            "/scenes/00-main-menu/style.css",
            mainMenu
        );
    } // end restartBtn.onclick
} // end endScreen