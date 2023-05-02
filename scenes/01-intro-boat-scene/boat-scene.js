import { loadHTMLOnVideoEnd, getCurrentLevelIndex } from "/lib.js";

export function boatScene() {
  loadHTMLOnVideoEnd(
    getCurrentLevelIndex() + 1,
    "screen_1_video"
  );
} // end boatScene
