import { Screen } from "../core/Screen.js";


// Screen1 Implementation
export class Screen1 extends Screen {
    constructor() {
        // call previous constructor
        super();
        this.screenContainer = new PIXI.Container();
        this.ticker = new PIXI.Ticker();
    } // end constructor

    
    // Called when the Screen is set to run . Starts the Screen.
    Start(app, data) {
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

        // create container to store scene dependencies.
        this.screenContainer = new PIXI.Container();
        this.ticker = new PIXI.Ticker();

        this.screenContainer.sortableChildren = true;
        this.screenContainer.alpha = 0;
        this.screenContainer.x = app.screen.width / 2;
        this.screenContainer.y = app.screen.height / 2;
        this.screenContainer.pivot.x = app.screen.width / 2;
        this.screenContainer.pivot.y = app.screen.height / 2;

        // initialize boat sprite
        let boatTexture = PIXI.Texture.from(data.images.boat[0]);
        let boat = new PIXI.Sprite(boatTexture);
        this.initSprite(boat, 0.5, 175, 100, (app.screen.width / 2), 525);

        // initialize water sprite & animations
        let waterTexture = this.loadTextures(data.images.water);
        let water = new PIXI.AnimatedSprite(waterTexture);
        this.initSprite(water, 0.5, app.screen.width, 500, (app.screen.width / 2), (app.screen.height * 0.75));
        
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

        // add sprites to container
        this.screenContainer.addChild(boat);
        this.screenContainer.addChild(water);
        this.screenContainer.addChild(sky);
        this.screenContainer.setChildIndex(sky, 0);
        this.screenContainer.setChildIndex(water, 1); // water is at base
        this.screenContainer.setChildIndex(boat, 2); // boat is on top of water

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

        // create a ticker
        boat.x = 1700;
        this.ticker.add((time) => {
            counter += time;
            // set fade in
            if (this.screenContainer.alpha <= 1) {
                this.screenContainer.alpha += 0.0025;
            } // end if

            // boat sails in
            if((counter >= 300) && (counter <= 695)) {
                boat.x -= 1;
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
                    this.screenContainer.alpha -= 0.005;
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
        this.ticker.stop(); // stop the ticker I made
        this.ticker.destroy(); // destroy ticker I made
        app.stage.removeChild(this.screenContainer); // remove the screen I made
        this.screenContainer.destroy(); // destroy the screenContainer I made
    } // end OnEnd


    // zooms into the screen
    zoomIn(app, container, scaleX, scaleY, offsetY) {
        container.scale.x = scaleX;
        container.scale.y = scaleY;
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
