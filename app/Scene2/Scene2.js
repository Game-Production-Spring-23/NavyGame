import { GameScene } from "../core/classes/GameScene.js";

export class Scene2 extends GameScene {
  constructor() {
    super();
  } // end constructor

  Start(app, data) {
    // call parent function
    super.Start(app, data);

    let backRatio = 3;
    let midRatio = 4;
    let foreRatio = 6;

    this.setScrollSpeedAndRatios(0.5, backRatio, midRatio, foreRatio);

    //this.characterRightBound = app.screen.width * foreRatio;

    this.lockPoint = app.screen.width * (foreRatio - 1);

    // set backdrops - for visual clarity of scrolling & lock/unlock
    // replace with art once generated
    let backdrop = new PIXI.Graphics();
    backdrop.beginFill(0x00ccff);
    backdrop.drawRect(0, 0, app.screen.width * backRatio, app.screen.height);

    // set middrops
    let middrop = new PIXI.Graphics();
    middrop.beginFill(0x0066dd);
    middrop.drawRect(
      0,
      app.screen.height * 0.5,
      app.screen.width * midRatio,
      app.screen.height
    );

    let midRoom = new PIXI.Graphics();
    midRoom.beginFill(0x884400);
    midRoom.drawRect(
      app.screen.width * (midRatio - 1),
      app.screen.height,
      app.screen.width,
      app.screen.height
    );

    // set foredrops
    let foredrop = new PIXI.Graphics();
    foredrop.beginFill(0xaa6600);
    foredrop.drawRect(
      0,
      app.screen.height * 0.6,
      app.screen.width * foreRatio,
      app.screen.height
    );

    // create characters
    let captainTexture = PIXI.Texture.from(data.characters.captain.images[1]);
    this.captain = new PIXI.Sprite(captainTexture);
    this.captain.anchor.set(0.5);
    this.captain.x = app.screen.width * 0.2;
    this.captain.y = app.screen.height * 0.55;
    this.captain.width = 100;
    this.captain.height = 100;
    /*
    let parrotTexture = PIXI.Texture.from(data.characters.parrot.images[0]);
    let parrot = new PIXI.Sprite(parrotTexture);
    parrot.anchor.set(0.5);
    parrot.x = app.screen.width * 1.35;
    parrot.y = app.screen.height * 0.55;
    parrot.width = 100;
    parrot.height = 100;

    let qmTexture = PIXI.Texture.from(data.characters.quartermaster.images[0]);
    let qm = new PIXI.Sprite(qmTexture);
    qm.anchor.set(0.5);
    qm.x = app.screen.width * 2;
    qm.y = app.screen.height * 0.55;
    qm.width = 100;
    qm.height = 100;

    let chefTexture = PIXI.Texture.from(data.characters.nontech_1.images[0]);
    let chef = new PIXI.Sprite(chefTexture);
    chef.anchor.set(0.5);
    chef.x = app.screen.width * 2.8;
    chef.y = app.screen.height * 0.55;
    chef.width = 100;
    chef.height = 100;

    let nonTech2Texture = PIXI.Texture.from(
      data.characters.nontech_2.images[0]
    );
    let nt2 = new PIXI.Sprite(nonTech2Texture);
    nt2.anchor.set(0.5);
    nt2.x = app.screen.width * 3;
    nt2.y = app.screen.height * 0.55;
    nt2.width = 100;
    nt2.height = 100;

    let nonTech3Texture = PIXI.Texture.from(
      data.characters.nontech_3.images[0]
    );
    let nt3 = new PIXI.Sprite(nonTech3Texture);
    nt3.anchor.set(0.5);
    nt3.x = app.screen.width * 3.2;
    nt3.y = app.screen.height * 0.55;
    nt3.width = 100;
    nt3.height = 100;

    let tech1Texture = PIXI.Texture.from(data.characters.tech_1.images[0]);
    let tech1 = new PIXI.Sprite(tech1Texture);
    tech1.anchor.set(0.5);
    tech1.x = app.screen.width * 4.0;
    tech1.y = app.screen.height * 0.55;
    tech1.width = 100;
    tech1.height = 100;

    let tech2Texture = PIXI.Texture.from(data.characters.tech_2.images[0]);
    let tech2 = new PIXI.Sprite(tech2Texture);
    tech2.anchor.set(0.5);
    tech2.x = app.screen.width * 4.4;
    tech2.y = app.screen.height * 0.55;
    tech2.width = 100;
    tech2.height = 100;

    let tech3Texture = PIXI.Texture.from(data.characters.tech_3.images[0]);
    let tech3 = new PIXI.Sprite(tech3Texture);
    tech3.anchor.set(0.5);
    tech3.x = app.screen.width * 4.8;
    tech3.y = app.screen.height * 0.55;
    tech3.width = 100;
    tech3.height = 100;
    */

    this.text = new PIXI.Text("Test", {
      fontFamily: "Arial",
      fontSize: 64,
      fill: 0xeeeeee,
      align: "center",
    });
    this.text.visible = false;
    this.text.x = app.screen.width / 2;
    this.text.y = (app.screen.height * 3) / 4;
    //this.text.width = 300;
    //this.text.height = 100;

    this.overlapping = false;

    // put objects into containers
    this.backGroundContainer.addChildAt(backdrop, 0);

    this.midGroundContainer.addChildAt(middrop, 0);
    this.midGroundContainer.addChildAt(midRoom, 1);

    this.characterContainer.addChildAt(this.captain, 0);
    /*
    this.characterContainer.addChildAt(parrot, 0);
    this.characterContainer.addChildAt(qm, 0);
    this.characterContainer.addChildAt(chef, 0);
    this.characterContainer.addChildAt(nt2, 0);
    this.characterContainer.addChildAt(nt3, 0);
    this.characterContainer.addChildAt(tech1, 0);
    this.characterContainer.addChildAt(tech2, 0);
    this.characterContainer.addChildAt(tech3, 0);
    */
    this.foreGroundContainer.addChildAt(foredrop, 0);
    this.foreGroundContainer.addChildAt(this.text, 1);

    // set character position
    this.character.y = app.screen.height * 0.55;

    // make character visible
    this.character.visible = true;

    // unlock the second half of the stage with a button press (for example)
    document.addEventListener("keydown", (event) => {
      // example unlocks exploreLock
      if (event.key === "1") {
        super.Unlock(app);
      } // end if
    }); // end addEventListener

    document.addEventListener("keydown", (event) => {
      // interact
      if (event.key === "e" && this.overlapping) {
        console.log("Interact");
      }
    });

    // check for end state (for example, has unlocked the next part)
    this.onlyOnce = true;
  } // end Start

  OnEnd(app) {
    super.OnEnd(app);
  } // end OnEnd

  Tick(app, data) {
    super.Tick(app, data);

    if (
      this.character.x > this.captain.x - this.captain.width / 2 &&
      this.character.x < this.captain.x + this.captain.width / 2
    ) {
      this.overlapping = true;
      this.text.text = "The Captain";
      this.text.updateText();
      this.text.visible = true;
    } else {
      this.overlapping = false;
      this.text.visible = false;
    }

    if (
      this.backGroundContainer.x <=
      -app.screen.width * this.backGroundRatio + app.screen.width + 100
    ) {
      if (this.onlyOnce) {
        console.log("Finished Level");
        this.onlyOnce = false;
        setTimeout(() => {
          // wait 7 seconds, then go to next stage
          this.isFinished = true;
        }, 7000);
      } // end if
    } // end if
  } // end Tick
} // end MyParallaxScreen class
