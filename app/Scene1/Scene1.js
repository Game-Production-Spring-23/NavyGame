import { Scene } from "../core/classes/Scene.js";


// Screen1 Implementation
export class Scene1 extends Scene {
    constructor() {
        let shouldTick = true;
        super(shouldTick);
    } // end constructor

    
    // Called when the Screen is set to run . Starts the Screen.
    Start(app, data) {
        // call parent function
        super.Start(app, data);

        // set screen alpha to 0
        this.screenContainer.alpha = 0;     

        // initialize boat sprite
        let boatTexture = PIXI.Texture.from(data.images.boat[0]);
        let boat = new PIXI.Sprite(boatTexture);
        this.boat = boat;
        this.initSprite(boat, // the sprite object
                        0.5, // the anchor
                        app.screen.width*0.10, // width of boat
                        app.screen.height*0.10, // height of boat
                        (app.screen.width * 0.75) + 5, // x location of boat
                        app.screen.height*0.77 // y location of boat
        ); // end initSprite

        // initialize water sprite & animations
        let waterTexture = this.loadTextures(data.images.water);
        let water = new PIXI.AnimatedSprite(waterTexture);
        this.initSprite(water, 0.5, app.screen.width, app.screen.height*0.75, (app.screen.width / 2), (app.screen.height * 0.75));
        
        // set water animation details
        water.animationSpeed = 0.03;
        water.onFrameChange = (currentFrame) => {
            let rotationA = -7 + Math.floor(Math.random() * 5);
            let rotationB = Math.floor(Math.random() * 5);
            let rotationC = 7 - Math.floor(Math.random() * 5)
            let rotations = [rotationC, rotationB, rotationA];
            let boatYPos = [
                (app.screen.height * 0.77) + 5, 
                (app.screen.height * 0.77) + -5, 
                (app.screen.height * 0.77) + 5];
            this.rockBoat(boat, rotations, boatYPos, currentFrame);
        } // end onFrameChange
        water.play();

        // after x seconds, rock boat every time a frame of the water changes
        setTimeout(() => {
            water.stop();
            water.onFrameChange = (currentFrame) => {
                let rotations = [-10, -10, 5];
                let boatYPos = [
                    (app.screen.height * 0.77) + 5, 
                    (app.screen.height * 0.77) - 30, 
                    (app.screen.height * 0.77) + 5];
                this.rockBoat(boat, rotations, boatYPos, currentFrame);
            } // end onFrameChange
            water.play();
        }, 12000); // end setTimeout
        
        
        // create background
        let sky = new PIXI.Graphics();
        sky.beginFill(0x7ed3f7); // blue ish sky color
        sky.drawRect(0, 0, app.screen.width, app.screen.height*1.5); // draw a rectangle
        let backdrop = new PIXI.Graphics();
        backdrop.beginFill(0x000000); // blue ish sky color
        backdrop.drawRect(0, 0, app.screen.width, app.screen.height*1.5); // draw a rectangle

        // add sprites to containers
        this.backGroundContainer.addChildAt(backdrop, 0);
        this.backGroundContainer.addChildAt(sky, 1);

        this.midGroundContainer.addChildAt(water, 0);

        this.foreGroundContainer.addChildAt(boat, 0);

        // add container to stage 
        app.stage.addChild(this.screenContainer);

        // set app to be responsive to screen size
        window.addEventListener("resize", () => {
            app.view.style.width = window.innerWidth;
            app.view.style.height = window.innerHeight;
        }); // end resize event listener


        // set game loop variables
        this.counter = 0.0;
        this.scaleX = 1.0;
        this.scaleY = 1.0;
        this.offsetY = 0;

        this.boatTravelTime = 695 - 300;
        this.boatTravelDistance = (app.screen.width / 2) + (boat.width / 2);
        boat.x = app.screen.width + boat.width*0.5;


        // set when to end Screen - after 20 seconds
        setTimeout(() => {
            this.ticker.stop();
            this.ticker.add(() => {
                // set fade out
                if (this.screenContainer.alpha >= 0) {
                    this.screenContainer.alpha -= 0.01*this.ticker.deltaTime;
                } // end if
            }); // end ticker.add
            this.ticker.start();
        }, 20000);

        // after 25 seconds, end the screen
        setTimeout(() => {
            this.isFinished = true;
        }, 25000);
    } // end Start


    // Called when the Screen has terminated.
    OnEnd(app) {
        super.OnEnd(app);
    } // end OnEnd


    // Ticks continuously while the screen is running if 'this.shouldTick' has been set to 'true'.
    Tick(app, data) {
        super.Tick(app, data);
        
        this.counter += this.ticker.deltaTime;
        // set fade in
        if (this.screenContainer.alpha <= 1) {
            this.screenContainer.alpha += 0.005*this.ticker.deltaTime;
        } // end if

        // boat sails in
        if((this.counter >= 300) && (this.counter <= 695)) {
            this.boat.x -= this.boatTravelDistance/this.boatTravelTime * this.ticker.deltaTime;
        } // end if

        // set zoom in
        if(this.counter >= 700) {
            if(this.scaleX <= 1.50) {
                this.scaleX += 0.001;
            } // end if
            if(this.scaleY <= 1.50) {
                this.scaleY += 0.001;
            } // end if
            if(this.offsetY <= 250) {
                this.offsetY += 0.5;
            } // end if
            this.zoomIn(app, this.screenContainer, this.scaleX, this.scaleY, this.offsetY);
        } // end if
    } // end Tick


    // zooms into the screen
    zoomIn(app, container, scaleX, scaleY, offsetY) {
        container.scale.x = scaleX;
        container.scale.y = scaleY;
        container.pivot.x = app.screen.width / 2;
        container.pivot.y = app.screen.height / 2;
        container.x = app.screen.width / 2;
        container.y = (app.screen.height / 2) - offsetY;
    } // end zoomIn


    // sets transparency values to create a fade-in type scenario, with the amount of time to run
    fadeIn(container, alpha, waitTime) {
        setTimeout(()=> {container.alpha = alpha;}, waitTime);
    } // end fadeIn


    // Sets default values of a sprite
    initSprite(sprite, anchor, width, height, x, y) {
        // center the sprite's anchor point
        sprite.anchor.set(anchor); 
        
        // move the sprite to the center of the screen
        sprite.x = x;
        sprite.y = y;
        sprite.width = width;
        sprite.height = height;
    } // end initSprite


    // loads a set of textures using an array of file locations
    loadTextures(imagesArray) {
        let textureArray = [];
        for (let i = 0; i < 3; i++) {
            let waterTexture = PIXI.Texture.from(imagesArray[i]);
            textureArray.push(waterTexture);
        } // end for
        return textureArray;
    } // end loadTextures


    // rocks the boat according to Y positions and rotations
    rockBoat(boat, rotations, boatYPos, currentFrame) {
        let i = currentFrame % 3;
        boat.angle = rotations[i];
        boat.y = boatYPos[i];
    } // end rockBoat
} // end Screen1 Class
