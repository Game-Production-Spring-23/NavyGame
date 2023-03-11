import { Overlay } from "../core/classes/Overlay.js";

export class Screen3 extends Overlay {
  constructor(sceneObj) {
    let shouldTick = false;
    let isHTML = true;
    let generateIcon = true;
    super(shouldTick, isHTML, sceneObj, generateIcon);

    console.log(this.overlayTicker);
  } // end constructor

  InitIcon(app, data) {
    // set settings for Icon
    super.InitIcon(
      app,
      data,
      ["/assets/images/journal.png"], // the image array to load to animated sprite
      app.screen.width * 0.9, // x loc of the icon
      app.screen.height * 0.1, // the y loc of the icon
      app.screen.height * 0.1, // the width of the icon
      app.screen.height * 0.1 // the height of the icon
    ); // end super.InitIcon
  } // end InitIcon

  Display(app, data, ticker) {
    super.Display(app, data, ticker);
    console.log("Display Called");

    this.DisplayHTML(["dialogueContainer"], null);
    //Gathers and stores html elements by id
    //Class References
    this.dialogueText = document.getElementById("dialogueText");
    let dialogueContainer = document.getElementById("dialogueContainer");
    let backButton = document.getElementById("backButton");

    //Class variables
    this.index = 0;
    this.scrollIndex = 0; //Character index of scroll
    this.scrollTimer; //Time between characters in text scroll
    this.scrollSpeed = 50;

    this.displayDialogue(data, app);

    backButton.onclick = () => {
      event.stopPropagation();
      if (this.index > 0) {
        this.index--;
        this.displayDialogue(data, app);
      }
    };

    // Waits for user to click on screen
    dialogueContainer.addEventListener("click", () => {
      this.displayDialogue(data, app);
    });
  } // end Display

  Hide(app) {
    super.Hide(app);
    this.HideHTML(["dialogueContainer"], null);
  } // end Hide

  Tick() {
    super.Tick();
    console.log("Tick Called");
  } // end Tick

  displayDialogue(data, app) {
    let frontButton = document.getElementById("frontButton");

    //if index is less than dialogue array length
    if (this.index < data.dialogue.length) {
      //Sets portraits to dialogue portraits and clears dialogue box
      this.displayPortrait(data);
      this.dialogueText.innerHTML = "";

      if (this.index == data.dialogue.length - 1) {
        frontButton.src = "/assets/images/ui/closeBtn.png";
      } else {
        frontButton.src = "/assets/images/ui/ArrowIcon.png";
      }

      //if the does already exist
      if (this.scrollTimer != null) {
        this.skipDialogue(data);
      } else {
        //Sets scrollTimer to scrollingDialogue function for scrollSpeed
        this.scrollTimer = setTimeout(() => {
          this.scrollingDialogue(data);
        }, this.scrollSpeed);
      }
    } else {
      this.Hide(app);
    }
  }

  displayPortrait(data) {
    //Gets left and right portraits from document
    let leftPortrait = document.getElementById("leftCharacterPortrait");
    let rightPortrait = document.getElementById("rightCharacterPortrait");

    //sets leftPortrait's portraits and offsets bottom
    leftPortrait.src = data.dialogue[this.index].leftPortrait;
    leftPortrait.style.bottom = data.dialogue[this.index].leftOffset + "px";
    //sets rightPortrait's portraits and offsets bottom
    rightPortrait.src = data.dialogue[this.index].rightPortrait;
    rightPortrait.style.bottom = data.dialogue[this.index].rightOffset + "px";

    //if isLeftTalking is true
    if (data.dialogue[this.index].isLeftTalking) {
      //Enlarge and brighten left portrait, while shrink and darken right
      leftPortrait.style.maxWidth = "20%";
      leftPortrait.style.filter = "brightness(100%)";
      rightPortrait.style.maxWidth = "17.5%";
      rightPortrait.style.filter = "brightness(50%)";
    } else {
      //Enlarge and brighten right portrait, while shrink and darken left
      leftPortrait.style.maxWidth = "17.5%";
      leftPortrait.style.filter = "brightness(50%)";
      rightPortrait.style.maxWidth = "20%";
      rightPortrait.style.filter = "brightness(100%)";
    }
  }

  skipDialogue(data) {
    //Clears scrollTimer, set it null, and sets scrollIndex to 0
    clearTimeout(this.scrollTimer);
    this.scrollTimer = null;
    this.scrollIndex = 0;
    //Displays dialogue text without scrolling
    this.dialogueText.innerHTML = data.dialogue[this.index].text;
    this.index++;
  }

  scrollingDialogue(data) {
    //if scrollIndex is less than the dialogue text's length
    if (this.scrollIndex < data.dialogue[this.index].text.length) {
      //Display scrolling text character in dialogue box at scrollIndex
      this.dialogueText.innerHTML += data.dialogue[this.index].text.charAt(
        this.scrollIndex
      );
      this.scrollIndex++;
      this.scrollTimer = setTimeout(() => {
        this.scrollingDialogue(data);
      }, this.scrollSpeed); //Reload scrollingDialogue function and stores it in scrollTimer
    } else {
      //Sets scrollIndex null, and sets scrollIndex to 0
      this.scrollTimer = null;
      this.scrollIndex = 0;
      this.index++;
    }
  }
} // end DemoOverlay Class
