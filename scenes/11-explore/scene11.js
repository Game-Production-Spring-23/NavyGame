import {
  loadNewHTMLFile,
  devSkip,
  addToEventListenerList,
  removeFromEventListenerList,
} from "/lib.js";
import { miniGame4 } from "/scenes/12-mini-game-4/mini-game-4.js";
import { startDialogue, isDialogueOccurring } from "/scenes/dialogue.js";

export function loadScene11() {
  console.log("Scene11 - Beach");
  devSkip(
    "/scenes/12-mini-game-4/index.html",
    "/scenes/12-mini-game-4/style.css",
    miniGame4
  );

  // Get Document Elements
  const player = document.getElementById("player");
  const bgContainer = document.getElementById("background");
  //const mgContainer = document.getElementById("midground");
  const cgContainer = document.getElementById("charground");
  const fgContainer = document.getElementById("foreground");
  const captain = document.getElementById("captain");
  const parrot = document.getElementById("parrot");
  const qm = document.getElementById("quartermaster");
  const vet = document.getElementById("veteran");
  const chef = document.getElementById("chef");
  const officers = document.getElementById("officers");
  //const tech = document.getElementById("tech");
  //const nt = document.getElementById("nontech");
  //const characters = document.getElementsByClassName("character");
  const subtitles = document.getElementById("subtitles");
  //const keyMark0 = document.getElementById("keyMark0");
  //const keyMark1 = document.getElementById("keyMark1");
  //const keyMark2 = document.getElementById("keyMark2");
  //const keyMark3 = document.getElementById("keyMark3");
  const keyMark4 = document.getElementById("keyMark4");
  //const keyMark5 = document.getElementById("keyMark5");
  //const keyMark6 = document.getElementById("keyMark6");
  //const keyMark7 = document.getElementById("keyMark7");
  const dialogueReady = document.getElementById("dialogueReady");

  let global_data = null;

  let playerAbs;
  let playerLBound;
  let playerRBound;

  let bgOffset = 0;
  //let mgOffset = 0;
  let fgOffset = 0;

  let fgMaxOffset;
  let playerAbsLimit;

  let locked = [true];
  let hasPlayerReachedMinigame = false;

  let speed;
  let fgSpeed;
  //let mgSpeed;
  let bgSpeed;

  let totalKeys = 0;
  let keysFound = 0;
  let interaction = "";

  // Get JSON Data
  fetch("/scenes/11-explore/scene11.json")
    .then((response) => response.json())
    .then((data) => {
      global_data = JSON.parse(JSON.stringify(data));

      // Apply Styles to Document Elements
      player.style.left = data.characters.player.offset + "px";
      player.style.backgroundImage =
        "url(" + data.characters.player.sprite[0] + ")";
      player.setAttribute("name", data.characters.player.name);

      captain.style.left = data.characters.captain.offset + "px";
      captain.style.backgroundImage =
        "url(" + data.characters.captain.sprite[0] + ")";
      captain.setAttribute("name", data.characters.captain.name);

      parrot.style.left = data.characters.parrot.offset + "px";
      parrot.style.backgroundImage =
        "url(" + data.characters.parrot.sprite[0] + ")";
      parrot.setAttribute("name", data.characters.parrot.name);

      qm.style.left = data.characters.quartermaster.offset + "px";
      qm.style.backgroundImage =
        "url(" + data.characters.quartermaster.sprite[0] + ")";
      qm.setAttribute("name", data.characters.quartermaster.name);

      vet.style.left = data.characters.veteran.offset + "px";
      vet.style.backgroundImage =
        "url(" + data.characters.veteran.sprite[0] + ")";
      vet.setAttribute("name", data.characters.veteran.name);

      chef.style.left = data.characters.chef.offset + "px";
      chef.style.backgroundImage =
        "url(" + data.characters.chef.sprite[0] + ")";
      chef.setAttribute("name", data.characters.chef.name);

      officers.style.left = data.characters.officers.offset + "px";
      officers.style.backgroundImage =
        "url(" + data.characters.officers.sprite[0] + ")";
      officers.setAttribute("name", data.characters.officers.name);

      bgContainer.style.width = 1920 * data.params.bg_scale + "px";
      bgContainer.style.backgroundImage =
        "url(" + data.params.bg_images[0] + ")";
      //mgContainer.style.width = 1920 * data.params.mg_scale + "px";
      //mgContainer.style.backgroundImage =
      //  "url(" + data.params.mg_images[0] + ")";
      cgContainer.style.width = 1920 * data.params.fg_scale + "px";
      cgContainer.style.backgroundImage =
        "url(" + data.params.cg_images[0] + ")";
      fgContainer.style.width = 1920 * data.params.fg_scale + "px";
      //fgContainer.style.backgroundImage =
      //  "url(" + data.params.fg_images[0] + ")";

      //console.log(global_data);
      init(global_data);
      // startDialogue(0, "/scenes/02-deck-explore/dialogue.json");
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
    bgSpeed = global_data.params.bg_speed;

    if (playerAbs > playerRBound) {
      if (playerAbs > playerAbsLimit) {
        playerAbs = playerAbsLimit;
        fgOffset = fgMaxOffset;
        //mgOffset = -1920 * (global_data.params.mg_scale - 1);
        bgOffset = -1920 * (global_data.params.bg_scale - 1);

        fgContainer.style.left = fgOffset + "px";
        cgContainer.style.left = fgOffset + "px";
        //mgContainer.style.left = mgOffset + "px";
        bgContainer.style.left = bgOffset + "px";
        player.style.left = playerAbs + "px";

        playerRBound = playerAbsLimit - 576;
        playerLBound = playerAbsLimit - 1216;
      } else if (playerAbs > playerAbsLimit - 576) {
        fgOffset = fgMaxOffset;
        //mgOffset = -1920 * (global_data.params.mg_scale - 1);
        bgOffset = -1920 * (global_data.params.bg_scale - 1);

        fgContainer.style.left = fgOffset + "px";
        cgContainer.style.left = fgOffset + "px";
        //mgContainer.style.left = mgOffset + "px";
        bgContainer.style.left = bgOffset + "px";

        playerRBound = playerAbsLimit - 576;
        playerLBound = playerAbsLimit - 1216;
      } else {
        let distance = playerAbs - playerRBound;
        let steps = distance / speed;

        fgOffset = -1 * fgSpeed * steps;
        //mgOffset = -1 * mgSpeed * steps;
        bgOffset = -1 * bgSpeed * steps;

        fgContainer.style.left = fgOffset + "px";
        cgContainer.style.left = fgOffset + "px";
        //mgContainer.style.left = mgOffset + "px";
        bgContainer.style.left = bgOffset + "px";

        playerRBound = playerAbs - 1;
        playerLBound = playerAbs - 640;
      }
    }

    totalKeys = global_data.keys.num_keys;

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
        playerAbs > global_data.characters.captain.offset - 24 &&
        playerAbs < global_data.characters.captain.offset + 96
      ) {
        // captain
        interaction = global_data.characters.captain.name;
      } else if (
        playerAbs > global_data.characters.parrot.offset - 24 &&
        playerAbs < global_data.characters.parrot.offset + 96
      ) {
        // parrot
        interaction = global_data.characters.parrot.name;
      } else if (
        playerAbs > global_data.characters.quartermaster.offset - 24 &&
        playerAbs < global_data.characters.quartermaster.offset + 96
      ) {
        // quartermaster
        interaction = global_data.characters.quartermaster.name;
      } else if (
        playerAbs > global_data.characters.chef.offset - 24 &&
        playerAbs < global_data.characters.chef.offset + 96
      ) {
        // chef
        interaction = global_data.characters.chef.name;
      } else if (
        playerAbs > global_data.characters.officers.offset - 24 &&
        playerAbs < global_data.characters.officers.offset + 96
      ) {
        // officers
        interaction = global_data.characters.officers.name;
      } else if (
        playerAbs > global_data.characters.veteran.offset - 24 &&
        playerAbs < global_data.characters.veteran.offset + 96
      ) {
        // vet
        interaction = global_data.characters.veteran.name;
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
            "/scenes/12-mini-game-4/index.html",
            "/scenes/12-mini-game-4/style.css",
            miniGame4
          );
        }
      }

      if (event.key === "e") {
        interact(global_data);
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
          bgOffset -= bgSpeed;
          bgContainer.style.left = bgOffset + "px";
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
          bgOffset += bgSpeed;
          bgContainer.style.left = bgOffset + "px";
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

  function interact(global_data) {
    console.log(interaction);

    if (interaction == global_data.keys.keys[0] && locked[0]) {
      keyMark4.style.visibility = "hidden";
      keysFound++;
      locked[0] = false;
    } else if (interaction != "") {
      // sub-dialogue? Format: 'Name: "Text"'
      subtitles.innerHTML =
        interaction + ': "Go sort out those scallywags, Chief!"';
      document.globalTimeouts.push(setTimeout(resetSubtitles, 2500));
    }

    if (keysFound == global_data.keys.num_keys) {
      console.log("All Pieces Found");
      // Transition to Minigame after Delay
      if (!hasPlayerReachedMinigame) {
        hasPlayerReachedMinigame = true;
        loadNewHTMLFile(
          "/scenes/12-mini-game-4/index.html",
          "/scenes/12-mini-game-4/style.css",
          miniGame4
        );
      }
    }
  }
}
