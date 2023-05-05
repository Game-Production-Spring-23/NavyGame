import {
  loadNextLevel,
  addToEventListenerList,
  removeFromEventListenerList,
  getPageCounterInt,
} from "/lib.js";
import { startDialogue, isDialogueOccurring } from "/scenes/dialogue.js";
import { rKeyOnScreen, rKeyOffScreen } from "../../index.js";

export function loadScene2() {
  // Get Document Elements
  const player = document.getElementById("player");
  const bgContainer = document.getElementById("background");
  const mgContainer = document.getElementById("midground");
  const cgContainer = document.getElementById("charground");
  const fgContainer = document.getElementById("foreground");
  const captain = document.getElementById("captain");
  const parrot = document.getElementById("parrot");
  const qm = document.getElementById("quartermaster");
  const vet = document.getElementById("veteran");
  const chef = document.getElementById("chef");
  const officers = document.getElementById("officers");
  const tech = document.getElementById("tech");
  const nt = document.getElementById("nontech");
  //const characters = document.getElementsByClassName("character");
  const stationary = document.getElementById("stationary");
  const subtitles = document.getElementById("subtitles");
  const keyMark = document.getElementById("keyMark");
  const dialogueReady = document.getElementById("dialogueReady");

  let global_data = null;

  let playerAbs;
  let playerLBound;
  let playerRBound;

  let bgOffset = 0;
  let mgOffset = 0;
  let fgOffset = 0;

  let fgMaxOffset;
  let playerAbsLimit;

  let locked = true;
  let hasPlayerReachedMinigame = false;

  let speed;
  let fgSpeed;
  let mgSpeed;
  let bgSpeed;

  let key;
  let interaction = "";

  // Get JSON Data
  fetch("/scenes/02-deck-explore/scene2.json")
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

      tech.style.left = data.characters.tech.offset + "px";
      tech.style.backgroundImage =
        "url(" + data.characters.tech.sprite[0] + ")";
      tech.setAttribute("name", data.characters.tech.name);

      nt.style.left = data.characters.nontech.offset + "px";
      nt.style.backgroundImage =
        "url(" + data.characters.nontech.sprite[0] + ")";
      nt.setAttribute("name", data.characters.nontech.name);

      bgContainer.style.width = 1920 * data.params.bg_scale + "px";
      bgContainer.style.backgroundImage =
        "url(" + data.params.bg_images[0] + ")";
      mgContainer.style.width = 1920 * data.params.mg_scale + "px";
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
      startDialogue(0, "/scenes/02-deck-explore/dialogue.json");
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
    mgSpeed = global_data.params.mg_speed;
    bgSpeed = global_data.params.bg_speed;

    key = global_data.key;

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
        playerAbs > global_data.characters.nontech.offset - 24 &&
        playerAbs < global_data.characters.nontech.offset + 96
      ) {
        // nontech
        interaction = global_data.characters.nontech.name;
      } else if (
        playerAbs > global_data.characters.tech.offset - 24 &&
        playerAbs < global_data.characters.tech.offset + 96
      ) {
        // tech
        interaction = global_data.characters.tech.name;
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

      if (!locked && !isDialogueOccurring) {
        rKeyOnScreen();
      }

      if (!locked && playerAbs > playerAbsLimit - 200) {
        // transition to minigame
        if (!hasPlayerReachedMinigame) {
          hasPlayerReachedMinigame = true;
          rKeyOffScreen();

          //Removes all event listeners
          document.removeEventListener("keyup", handleKeyup);
          removeFromEventListenerList("handleKeyupExplore");

          document.removeEventListener("keydown", handleKeydown);
          removeFromEventListenerList("handleKeydownExplore");

          //Loads next level
          loadNextLevel();
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
    stationary.style.visibility = "visible";
  }

  function resetSubtitles() {
    subtitles.innerHTML = "";
    stationary.style.visibility = "hidden";
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
          mgOffset -= mgSpeed;
          mgContainer.style.left = mgOffset + "px";
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
          mgOffset += mgSpeed;
          mgContainer.style.left = mgOffset + "px";
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

    if (interaction == key && locked) {
      locked = false;
      startDialogue(1, "/scenes/02-deck-explore/dialogue.json");
      keyMark.style.visibility = "hidden";

      // wait 5 seconds and display arrow to right of screen
    } else if (interaction != "") {
      if (locked) {
        // sub-dialogue? Format: 'Name: "Text"'
        subtitles.innerHTML = interaction + ': "Go talk to the parrot."';
        document.globalTimeouts.push(setTimeout(resetSubtitles, 2500));
      } else {
        subtitles.innerHTML =
          interaction + ': "Head to the Boiler Room, Chief."';
        document.globalTimeouts.push(setTimeout(resetSubtitles, 2500));
      }
    }
  }
}
