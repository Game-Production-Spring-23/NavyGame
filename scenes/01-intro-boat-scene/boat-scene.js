import { loadHTMLOnVideoEnd, devSkip } from "/lib.js";
import { loadScene2 } from "/scenes/02-deck-explore/scene2.js";


export function boatScene() {
  devSkip(
    "/scenes/02-deck-explore/index.html",
    "/scenes/02-deck-explore/styles.css",
    loadScene2,
  )
  
  loadHTMLOnVideoEnd(
    "/scenes/02-deck-explore/index.html",
    "/scenes/02-deck-explore/styles.css",
    loadScene2,
    "screen_1_video"
  );
} // end boatScene
