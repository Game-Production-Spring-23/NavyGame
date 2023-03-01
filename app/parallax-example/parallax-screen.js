import { ParallaxScreen } from "../core/ParallaxScreen.js";


export class MyParallaxScreen extends ParallaxScreen {
    constructor() {
        super();
    } // end constructor


    Start(app, data) {
        // call parent function
        super.Start(app, data);
        
        // set backdrop
        let backdrop = new PIXI.Graphics();
        backdrop.beginFill(0x0000FF); // blue
        backdrop.drawRect(0, 0, app.screen.width*4, app.screen.height*1.5); // draw a rectangle
        
        let backBorderRight = new PIXI.Graphics();
        backBorderRight.beginFill(0x000000);
        backBorderRight.drawRect(app.screen.width*4-100, 0, 100, app.screen.height*1.5);

        let backBorderMid = new PIXI.Graphics();
        backBorderMid.beginFill(0x000000);
        backBorderMid.drawRect(app.screen.width*2.5-100, 0, 100, app.screen.height*1.5);

        let backBorderLeft = new PIXI.Graphics();
        backBorderLeft.beginFill(0x000000);
        backBorderLeft.drawRect(0, 0, 100, app.screen.height*1.5);

        // set midground
        let midground = new PIXI.Graphics();
        midground.beginFill(0xFF0000); // red
        midground.drawRect(0, app.screen.height/2, app.screen.width*2, app.screen.height/2);

        let midBorderRight = new PIXI.Graphics();
        midBorderRight.beginFill(0x000044);
        midBorderRight.drawRect(app.screen.width*2-100, app.screen.height/2, 100, app.screen.height/2);

        let midBorderMid = new PIXI.Graphics();
        midBorderMid.beginFill(0x000044);
        midBorderMid.drawRect(app.screen.width*1.5-100, app.screen.height/2, 100, app.screen.height/2);

        let midBorderLeft = new PIXI.Graphics();
        midBorderLeft.beginFill(0x000044);
        midBorderLeft.drawRect(0, app.screen.height/2, 100, app.screen.height/2);

        let boatTexture = PIXI.Texture.from(data.images.boat[0]);
        let boat = new PIXI.Sprite(boatTexture);
        boat.anchor.set(0.5);
        boat.x = app.screen.width / 2;
        boat.y = app.screen.height / 2;
        boat.width = 175;
        boat.height = 100;

        // assemble pieces
        this.backgroundContainer.addChildAt(backdrop, 0);
        this.backgroundContainer.addChildAt(backBorderRight, 1);
        this.backgroundContainer.addChildAt(backBorderMid, 1);
        this.backgroundContainer.addChildAt(backBorderLeft, 1);
        this.midgroundContainer.addChildAt(midground, 0);
        this.midgroundContainer.addChildAt(midBorderRight, 1);
        this.midgroundContainer.addChildAt(midBorderMid, 1);
        this.midgroundContainer.addChildAt(midBorderLeft, 1);
        this.foregroundContainer.addChildAt(boat, 0);
        app.stage.addChild(this.screenContainer);
    } // end Start

    OnEnd(app) {
        super.OnEnd(app);
    } // end OnEnd
} // end MyParallaxScreen class