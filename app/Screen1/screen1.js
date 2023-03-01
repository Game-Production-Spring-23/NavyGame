import { Screen } from "../core/Screen.js";


// Screen1 Implementation
export class Screen1 extends Screen {
    constructor() {
        // call previous constructor
        super();
        this.ticker = new PIXI.Ticker();
    } // end constructor

    
    // Called when the Screen is set to run . Starts the Screen.
    Start(app, data) {
        // call parent function
        super.Start(app, data);
        this.setHTML();

        // set screen alpha to 0
        this.screenContainer.alpha = 0;     

        // initialize boat sprite
        let boatTexture = PIXI.Texture.from(data.images.boat[0]);
        let boat = new PIXI.Sprite(boatTexture);
        this.initSprite(boat, 0.5, 175, 100, (app.screen.width / 2), 525);

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
                (app.screen.height * 0.75) + 5, 
                (app.screen.height * 0.75) + -5, 
                (app.screen.height * 0.75) + 5];
            this.rockBoat(boat, rotations, boatYPos, currentFrame);
        } // end onFrameChange
        water.play();

        // after x seconds, rock boat every time a frame of the water changes
        setTimeout(() => {
            water.stop();
            water.onFrameChange = (currentFrame) => {
                let rotations = [-10, -10, 5];
                let boatYPos = [
                    (app.screen.height * 0.75) + 5, 
                    (app.screen.height * 0.75) - 30, 
                    (app.screen.height * 0.75) + 5];
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
        this.backgroundContainer.addChildAt(backdrop, 0);
        this.backgroundContainer.addChildAt(sky, 1);

        this.midgroundContainer.addChildAt(water, 0);

        this.foregroundContainer.addChildAt(boat, 0);

        // add container to stage 
        app.stage.addChild(this.screenContainer);

        // set app to be responsive to screen size
        window.addEventListener("resize", () => {
            app.view.style.width = window.innerWidth;
            app.view.style.height = window.innerHeight;
        }); // end resize event listener

        // game loop stuff
        let counter = 0.0;
        let scaleX = 1.0;
        let scaleY = 1.0;
        let offsetY = 0;

        // create the ticker
        this.ticker = new PIXI.Ticker();

        let boatTravelTime = 695 - 300;
        let boatTravelDistance = (app.screen.width / 2) + (boat.width / 2);
        boat.x = app.screen.width + boat.width*0.5;
        this.ticker.add(() => {
            counter += this.ticker.deltaTime;
            // set fade in
            if (this.screenContainer.alpha <= 1) {
                this.screenContainer.alpha += 0.005*this.ticker.deltaTime;
            } // end if

            // boat sails in
            if((counter >= 300) && (counter <= 695)) {
                boat.x -= boatTravelDistance/boatTravelTime * this.ticker.deltaTime;
            } // end if

            // set zoom in
            if(counter >= 700) {
                if(scaleX <= 1.50) {
                    scaleX += 0.001;
                } // end if
                if(scaleY <= 1.50) {
                    scaleY += 0.001;
                } // end if
                if(offsetY <= 250) {
                    offsetY += 0.5;
                } // end if
                this.zoomIn(app, this.screenContainer, scaleX, scaleY, offsetY);
            } // end if
        }); // end this.ticker.add
        this.ticker.start();

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


    // set html settings so that pixi loads the canvas element correctly
    setHTML() {
        // Get HTML head element
        var head = document.getElementsByTagName('HEAD')[0];

        // Create new link Element
        var link = document.createElement('link');

        // set the attributes for link element
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '/app/screen1/style.css';

        // Append link element to HTML head
        head.appendChild(link);

        let splash = document.getElementById("splash");
        let bottomLinks = document.getElementById("bottomLinks"); //Links at bottom of start screen
        let gameContainer = document.getElementById("gameContainer"); //Container for game
        let settingsContainer = document.getElementById("settingsContainer"); //Container for settings
        let scoreContainer = document.getElementById("scoreContainer");
        let journalScreen = document.getElementById("journalContainer");
        let mapScreen = document.getElementById("mapContainer");
        let appContainer = document.getElementById("app");
        splash.style.display = "none";
        bottomLinks.style.display = "none";
        gameContainer.style.display = "none";
        settingsContainer.style.display = "none";
        scoreContainer.style.display = "none";
        journalScreen.style.display = "none";
        mapScreen.style.display = "none";
        appContainer.style.display = "none";
    } // end setHTML


    // Called when the Screen has terminated.
    OnEnd(app) {
        super.OnEnd(app);
        this.ticker.stop(); // stop the ticker I made
        this.ticker.destroy(); // destroy ticker I made
    } // end OnEnd


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
