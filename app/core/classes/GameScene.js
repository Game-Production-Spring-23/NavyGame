import { Scene } from "./Scene.js";

export class GameScene extends Scene {
    constructor(isHTML) {
        let shouldTick = true;
        super(shouldTick, isHTML);

        // set scroll values
        this.setScrollSpeedAndRatios(1, 1.5, 2, 3);

        // initialize character sprite variable
        this.character = null;

        // lock booleans
        this.isLocked = false; // can check (in case you need to check if the screen is locked)
        this.internalLock = true; // don't set!
    } // end constructor


    // Called when the Scene is set to run. Starts the Scene.
    Start(app, data) {
        // call parent class's Start function -> performs important actions!
        super.Start(app, data);

        // lock booleans
        this.isLocked = false;
        this.internalLock = true;

        // all screens are locked to a single screen length (until unlocked)
        this.leftMaxDistBack = 0;
        this.leftMaxDistMid = 0;
        this.leftMaxDistFore = 0;
        
        // character boundaries
        this.characterLeftBound = (app.screen.width/3);
        this.characterRightBound = (app.screen.width*2/3);

        // create character
        this.createCharacter(app, data, app.screen.height*0.75);

        // variables controlling when the character can move
        this.goRight = false;
        this.goLeft = false;

        // check if a move key was pressed down
        document.addEventListener('keydown', (event) => {
            // check the key
            if(event.key === "ArrowRight" || event.key === "d") {
                this.goRight = true;
            } // end if

            if(event.key === "ArrowLeft" || event.key === "a") {
                this.goLeft = true;
            } // end if
        }); // end addEventListener

        // check if a move key was released
        document.addEventListener('keyup', (event) => {
            // check the key
            if(event.key === "ArrowRight" || event.key === "d") {
                this.goRight = false;
            } // end if

            if(event.key === "ArrowLeft" || event.key === "a") {
                this.goLeft = false;
            } // end if
        }); // end addEventListener
    } // end Start


    // Called when the Scene has been set to terminate.
    OnEnd(app) {
        // call parent class's OnEnd function -> performs important actions!
        super.OnEnd(app);

        // reset the locks
        this.isLocked = false; 
        this.internalLock = true;
    } // end OnEnd


    // Ticks continuously while the screen is running if 'this.shouldTick' has been set to 'true'.
    Tick(app, data) {
        // if the player is trying to scroll to the right...
        if(this.goRight) {
            // check character limit
            if(this.character.x <= this.characterRightBound) {
                this.character.x += this.foreGroundScrollSpeed;
            } else { // the character is at the limit
                if(this.backGroundContainer.x > this.leftMaxDistBack) {
                    this.characterLeftBound = (app.screen.width/3);
                    this.backGroundContainer.x -= this.backGroundScrollSpeed;
                } else { // character movement -> allow to reach end of screen
                    if(this.isLocked == true) {
                        this.characterRightBound = app.screen.width - (this.character.width*2/3);
                    } // end if
                }// end if

                // check midground limit
                if(this.midGroundContainer.x > this.leftMaxDistMid) {
                    this.midGroundContainer.x -= this.midGroundScrollSpeed;
                } // end if

                // check foreground limit
                if(this.foreGroundContainer.x > this.leftMaxDistFore) {
                    this.foreGroundContainer.x -= this.foreGroundScrollSpeed;
                } // end if
            } // end if
        } // end if

        // if the player is trying to scroll to the left...
        if(this.goLeft) {
            // check character limit
            if(this.character.x >= this.characterLeftBound) {
                this.character.x -= this.foreGroundScrollSpeed;
            } else { // the character is at the limit
                if(this.backGroundContainer.x < 0) {
                    this.characterRightBound = (app.screen.width*2/3);
                    this.backGroundContainer.x += this.backGroundScrollSpeed;
                } else { // character movement
                    this.characterLeftBound = (this.character.width*2/3);
                } // end if

                // check midground limit
                if(this.midGroundContainer.x < 0) {
                    this.midGroundContainer.x += this.midGroundScrollSpeed;
                } // end if

                // check foreground limit
                if(this.foreGroundContainer.x < 0) {
                    this.foreGroundContainer.x += this.foreGroundScrollSpeed;
                } // end if
            } // end if
        } // end if
    } // end Tick


    // unlocks the second part of the stage
    Unlock(app) {
        if(this.internalLock) {
            this.internalLock = false;
            this.isLocked = true;
            this.leftMaxDistBack = (-(app.screen.width)*this.backGroundRatio) + app.screen.width;
            this.leftMaxDistMid = (-(app.screen.width)*this.midGroundRatio) + app.screen.width;
            this.leftMaxDistFore = (-(app.screen.width)*this.foreGroundRatio) + app.screen.width;
        } // end if
    } // end Unlock


    // creates the character sprite and mechanics
    createCharacter(app, data, groundLevel) {
        this.characterTexture = PIXI.Texture.from(data.images.boat[0]);
        this.character = new PIXI.Sprite(this.characterTexture);
        this.character.anchor.set(0.5);
        this.character.x = app.screen.width / 2;
        this.character.y = groundLevel;
        this.character.width = 175;
        this.character.height = 100;

        this.character.visible = false;
        this.characterContainer.addChildAt(this.character, 0);
    } // end createCharacter


    // set the scroll speed and ratios of the screens
    setScrollSpeedAndRatios(scrollSpeed, backGroundRatio, midGroundRatio, foreGroundRatio) {
        // base element of scroll speed - change this variable to speed up/ slow down movement
        this.scrollSpeed = scrollSpeed;

        // the ratios for the different sceens
        this.backGroundRatio = backGroundRatio; // 150% distance
        this.midGroundRatio = midGroundRatio; // 200% distance
        this.foreGroundRatio = foreGroundRatio; // fastest/longest screen - 300% distance (100% being one full screen)

        // the scroll speeds of each screen, derived from the base scroll speed and the ratios given
        this.backGroundScrollSpeed = this.scrollSpeed * this.backGroundRatio;
        this.midGroundScrollSpeed = this.scrollSpeed * this.midGroundRatio * this.backGroundRatio;
        this.foreGroundScrollSpeed = this.scrollSpeed * this.foreGroundRatio * this.midGroundRatio;
    } // end setScrollSpeedAndRatios
} // end Game Scene Class