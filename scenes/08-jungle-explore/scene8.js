import {
  loadNewHTMLFile,
  devSkip,
  addToEventListenerList,
  removeFromEventListenerList,
} from "/lib.js";
import { loadScene9 } from "/scenes/09-shopping-minigame/shopping-minigame.js";
import { startDialogue, isDialogueOccurring } from "/scenes/dialogue.js";

export function loadScene8() {
  console.log("Scene8 - Beach");
  devSkip(
    "/scenes/09-shopping-minigame/shopping_minigame.html",
    "/scenes/09-shopping-minigame/minigame3styles.css",
    loadScene9
  );

  // Get Document Elements
  const player = document.getElementById("player");
  const cgContainer = document.getElementById("charground");
  const fgContainer = document.getElementById("foreground");
  const parrot = document.getElementById("parrot");
  const shopkeep = document.getElementById("shopkeep");
  const merchant = document.getElementById("shopkeep2");
  const chief = document.getElementById("chief");
  const native1 = document.getElementById("native1");
  const native2 = document.getElementById("native2");
  const native3 = document.getElementById("native3");
  const native4 = document.getElementById("native4");
  const subtitles = document.getElementById("subtitles");
  const keyMark0 = document.getElementById("keyMark0");
  const dialogueReady = document.getElementById("dialogueReady");

  let global_data = null;

  let playerAbs;
  let playerLBound;
  let playerRBound;

  //let bgOffset = 0;
  //let mgOffset = 0;
  let fgOffset = 0;

  let fgMaxOffset;
  let playerAbsLimit;

  let locked = [true];
  let hasPlayerReachedMinigame = false;

  let speed;
  let fgSpeed;
  //let mgSpeed;
  //let bgSpeed;

  let keysFound = 0;
  let interaction = "";

  // Get JSON Data
  fetch("/scenes/08-jungle-explore/scene8.json")
    .then((response) => response.json())
    .then((data) => {
      global_data = JSON.parse(JSON.stringify(data));

      // Apply Styles to Document Elements
      player.style.left = data.characters.player.offset + "px";
      player.style.transform = "scaleX(-1)";
      player.style.backgroundImage =
        "url(" + data.characters.player.sprite[0] + ")";
      player.setAttribute("name", data.characters.player.name);

      parrot.style.left = data.characters.parrot.offset + "px";
      parrot.style.backgroundImage =
        "url(" + data.characters.parrot.sprite[0] + ")";
      parrot.setAttribute("name", data.characters.parrot.name);

      shopkeep.style.left = data.characters.shopkeep.offset + "px";
      shopkeep.style.backgroundImage =
        "url(" + data.characters.shopkeep.sprite[0] + ")";
      shopkeep.setAttribute("name", data.characters.shopkeep.name);

      merchant.style.left = data.characters.shopkeep2.offset + "px";
      merchant.style.backgroundImage =
        "url(" + data.characters.shopkeep2.sprite[0] + ")";
      merchant.setAttribute("name", data.characters.shopkeep2.name);

      chief.style.left = data.characters.chief.offset + "px";
      chief.style.backgroundImage =
        "url(" + data.characters.chief.sprite[0] + ")";
      chief.setAttribute("name", data.characters.chief.name);

      native1.style.left = data.characters.native1.offset + "px";
      native1.style.backgroundImage =
        "url(" + data.characters.native1.sprite[0] + ")";
      native1.setAttribute("name", data.characters.native1.name);

      native2.style.left = data.characters.native2.offset + "px";
      native2.style.backgroundImage =
        "url(" + data.characters.native2.sprite[0] + ")";
      native2.setAttribute("name", data.characters.native2.name);

      native3.style.left = data.characters.native3.offset + "px";
      native3.style.backgroundImage =
        "url(" + data.characters.native3.sprite[0] + ")";
      native3.setAttribute("name", data.characters.native3.name);

      native4.style.left = data.characters.native4.offset + "px";
      native4.style.backgroundImage =
        "url(" + data.characters.native4.sprite[0] + ")";
      native4.setAttribute("name", data.characters.native4.name);

      //bgContainer.style.width = 1920 * data.params.bg_scale + "px";
      //bgContainer.style.backgroundImage =
      //  "url(" + data.params.bg_images[0] + ")";
      //mgContainer.style.width = 1920 * data.params.mg_scale + "px";
      //mgContainer.style.backgroundImage =
      //  "url(" + data.params.mg_images[0] + ")";
      cgContainer.style.width = 1920 * data.params.fg_scale + "px";
      cgContainer.style.backgroundImage =
        "url(" + data.params.cg_images[0] + ")";
      fgContainer.style.width = 1920 * data.params.fg_scale + "px";
      fgContainer.style.backgroundImage =
        "url(" + data.params.fg_images[0] + ")";

      //console.log(global_data);
      init(global_data);
      startDialogue(0, "/scenes/08-jungle-explore/dialogue.json");
      console.log(isDialogueOccurring);
      //isDialogueOccurring = false;
    });

  //console.log(global_data);

  function init(global_data) {
    // numbers based off left edge of player
    playerAbs = global_data.characters.player.offset;
    playerLBound = 576;
    playerRBound = 1216;

    fgMaxOffset = -1920 * (global_data.params.fg_scale - 1);
    playerAbsLimit = 1920 * global_data.params.fg_scale - 128;

    speed = global_data.params.fg_speed;
    fgSpeed = global_data.params.fg_speed;
    //mgSpeed = global_data.params.mg_speed;
    //bgSpeed = global_data.params.bg_speed;

    if (playerAbs > playerRBound) {
      if (playerAbs > playerAbsLimit) {
        playerAbs = playerAbsLimit;
        fgOffset = fgMaxOffset;
        //mgOffset = -1920 * (global_data.params.mg_scale - 1);
        //bgOffset = -1920 * (global_data.params.bg_scale - 1);

        fgContainer.style.left = fgOffset + "px";
        cgContainer.style.left = fgOffset + "px";
        //mgContainer.style.left = mgOffset + "px";
        //bgContainer.style.left = bgOffset + "px";
        player.style.left = playerAbs + "px";

        playerRBound = playerAbsLimit - 576;
        playerLBound = playerAbsLimit - 1216;
      } else if (playerAbs > playerAbsLimit - 576) {
        fgOffset = fgMaxOffset;
        //mgOffset = -1920 * (global_data.params.mg_scale - 1);
        //bgOffset = -1920 * (global_data.params.bg_scale - 1);

        fgContainer.style.left = fgOffset + "px";
        cgContainer.style.left = fgOffset + "px";
        //mgContainer.style.left = mgOffset + "px";
        //bgContainer.style.left = bgOffset + "px";

        playerRBound = playerAbsLimit - 576;
        playerLBound = playerAbsLimit - 1216;
      } else {
        let distance = playerAbs - playerRBound;
        let steps = distance / speed;

        fgOffset = -1 * fgSpeed * steps;
        //mgOffset = -1 * mgSpeed * steps;
        //bgOffset = -1 * bgSpeed * steps;

        fgContainer.style.left = fgOffset + "px";
        cgContainer.style.left = fgOffset + "px";
        //mgContainer.style.left = mgOffset + "px";
        //bgContainer.style.left = bgOffset + "px";

        playerRBound = playerAbs - 1;
        playerLBound = playerAbs - 640;
      }
    }
    //Adds event listeners to event listeners list
    document.addEventListener("keyup", handleKeyup);
    addToEventListenerList("handleKeyupExplore", "keyup", handleKeyup);

    function handleKeyup(event) {
      if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "ArrowLeft" ||
        event.key === "a"
      ) {
        player.style.backgroundImage =
          "url(" + global_data.characters.player.sprite[0] + ")";
      }
    }

    document.addEventListener("keydown", handleKeydown);
    addToEventListenerList("handleKeydownExplore", "keydown", handleKeydown);

    function handleKeydown(event) {
      if (
        (event.key === "ArrowRight" || event.key === "d") &&
        !isDialogueOccurring
      ) {
        player.style.backgroundImage =
          "url(" + global_data.characters.player.sprite[1] + ")";
        moveRight();
      }

      if (
        (event.key === "ArrowLeft" || event.key === "a") &&
        !isDialogueOccurring
      ) {
        player.style.backgroundImage =
          "url(" + global_data.characters.player.sprite[1] + ")";
        moveLeft();
      }

      if (
        playerAbs > global_data.characters.parrot.offset - 24 &&
        playerAbs < global_data.characters.parrot.offset + 96
      ) {
        // parrot
        interaction = global_data.characters.parrot.name;
      } else if (
        playerAbs > global_data.characters.shopkeep.offset - 24 &&
        playerAbs < global_data.characters.shopkeep.offset + 96
      ) {
        // shopkeep
        interaction = global_data.characters.shopkeep.name;
      } else if (
        playerAbs > global_data.characters.shopkeep2.offset - 24 &&
        playerAbs < global_data.characters.shopkeep2.offset + 96
      ) {
        // shopkeep2
        interaction = global_data.characters.shopkeep2.name;
      } else if (
        playerAbs > global_data.characters.chief.offset - 24 &&
        playerAbs < global_data.characters.chief.offset + 96
      ) {
        // chief
        interaction = global_data.characters.chief.name;
      } else if (
        playerAbs > global_data.characters.native1.offset - 24 &&
        playerAbs < global_data.characters.native1.offset + 96
      ) {
        // native1
        interaction = global_data.characters.native1.name;
      } else if (
        playerAbs > global_data.characters.native2.offset - 24 &&
        playerAbs < global_data.characters.native2.offset + 96
      ) {
        // native2
        interaction = global_data.characters.native2.name;
      } else if (
        playerAbs > global_data.characters.native3.offset - 24 &&
        playerAbs < global_data.characters.native3.offset + 96
      ) {
        // native3
        interaction = global_data.characters.native3.name;
      } else if (
        playerAbs > global_data.characters.native4.offset - 24 &&
        playerAbs < global_data.characters.native4.offset + 96
      ) {
        // native4
        interaction = global_data.characters.native4.name;
      } else {
        interaction = "";
      }

      if (interaction != "") {
        dialogueReady.style.visibility = "visible";
        let text = "Press [E] to Talk to " + interaction;
        setSubtitle(text);
      } else {
        dialogueReady.style.visibility = "hidden";
        resetSubtitles();
      }

      // Adjust for Proper To Minigame Transition
      if (!locked && playerAbs > playerAbsLimit - 200) {
        // transition to minigame
        if (!hasPlayerReachedMinigame) {
          hasPlayerReachedMinigame = true;

          //Removes all event listeners
          document.removeEventListener("keyup", handleKeyup);
          removeFromEventListenerList("handleKeyupExplore");

          document.removeEventListener("keydown", handleKeydown);
          removeFromEventListenerList("handleKeydownExplore");

          //Loads new file
          loadNewHTMLFile(
            "/scenes/09-shopping-minigame/shopping_minigame.html",
            "/scenes/09-shopping-minigame/minigame3styles.css",
            loadScene9
          );
        }
      }

      if (event.key === "e") {
        interact(global_data, handleKeyup, handleKeydown);
      }
    }

    /*
    // This Does Not Seem To Work
    for (var i = 0; i < characters.length; i++) {
      characters[i].addEventListener("onmouseover", (event) => {
        let name = event.target.getAttribute("name");
        console.log(name);
        setSubtitle(name);
      });

      characters[i].addEventListener("onmouseout", resetSubtitles());
    }
    */
  }

  function setSubtitle(text) {
    subtitles.innerHTML = text;
  }

  function resetSubtitles() {
    subtitles.innerHTML = "";
  }

  function moveRight() {
    if (playerAbs < playerAbsLimit) {
      // Left Segment
      player.style.transform = "scaleX(1)";
      if (playerAbs < playerRBound) {
        // Player Right
        playerAbs += speed;
        player.style.left = playerAbs + "px";
      } else {
        // Middle Segment
        if (fgOffset > fgMaxOffset) {
          // Containers Left
          fgOffset -= fgSpeed;
          fgContainer.style.left = fgOffset + "px";
          cgContainer.style.left = fgOffset + "px";
          //mgOffset -= mgSpeed;
          //mgContainer.style.left = mgOffset + "px";
          //bgOffset -= bgSpeed;
          //bgContainer.style.left = bgOffset + "px";
          // Player Right
          playerAbs += speed;
          player.style.left = playerAbs + "px";
          // Player Element stays at 2/3 of screen
          playerRBound = playerAbs - 1;
          playerLBound = playerAbs - 640;
        }
        // Right Segment
        else {
          // Player Right
          playerAbs += speed;
          player.style.left = playerAbs + "px";

          playerRBound = playerAbsLimit - 576;
          playerLBound = playerAbsLimit - 1216;
        }
      }
    }
  }

  function moveLeft() {
    if (playerAbs > 0) {
      // Right Segment
      player.style.transform = "scaleX(-1)";
      if (playerAbs > playerLBound) {
        // Player Left
        playerAbs -= speed;
        player.style.left = playerAbs + "px";
      } else {
        // Middle Segment
        if (fgOffset < 0) {
          // Containers Right
          fgOffset += fgSpeed;
          fgContainer.style.left = fgOffset + "px";
          cgContainer.style.left = fgOffset + "px";
          //mgOffset += mgSpeed;
          //mgContainer.style.left = mgOffset + "px";
          //bgOffset += bgSpeed;
          //bgContainer.style.left = bgOffset + "px";
          // Player Left
          playerAbs -= speed;
          player.style.left = playerAbs + "px";
          // Player Element stays at 1/3 of screen
          playerRBound = playerAbs + 640;
          playerLBound = playerAbs + 1;
        }
        // Left Segment
        else {
          // Player Left
          playerAbs -= speed;
          player.style.left = playerAbs + "px";

          playerRBound = 1216;
          playerLBound = 576;
        }
      }
    }
  }

  function interact(global_data, keyUpFunction, keyDownFunction) {
    console.log(interaction);

    if (interaction == global_data.keys.keys[0] && locked[0]) {
      // Play Shopkeep Dialogue
      //startDialogue(1, "/scenes/02-deck-explore/dialogue.json");
      keyMark0.style.visibility = "hidden";
      keysFound++;
      locked[0] = false;
    } else if (interaction == "Parrot") {
      // Play Parrot Dialogue
      subtitles.innerHTML = interaction + ": *Squawk* Go find that shopkeep!";
    } else if (interaction != "") {
      // sub-dialogue? Format: 'Name: "Text"'
      let nativeTexts = [
        ": Looks like you need a Discharge Nozzle with SYSML <water expulsion>",
        ": An Impeller with SYSML <power generation> would help you lots!",
        ": If I were to fix this pump I would use a Casing with SYSML <mechanical housing>",
      ]; // end nativeTexts

      let selectedText = nativeTexts[Math.floor(Math.random() * 2.9)];
      subtitles.innerHTML = interaction + selectedText;
      document.globalTimeouts.push(setTimeout(resetSubtitles, 2500));
    }

    if (keysFound == global_data.keys.num_keys) {
      //console.log("All Pieces Found");
      // Transition to Minigame after Delay
      if (!hasPlayerReachedMinigame) {
        hasPlayerReachedMinigame = true;

        document.removeEventListener("keyup", keyUpFunction);
        removeFromEventListenerList("handleKeyupExplore");

        document.removeEventListener("keydown", keyDownFunction);
        removeFromEventListenerList("handleKeydownExplore");

        //Loads new file
        loadNewHTMLFile(
          "/scenes/09-shopping-minigame/shopping_minigame.html",
          "/scenes/09-shopping-minigame/minigame3styles.css",
          loadScene9
        );
      }
    }
  }
}
