import { Overlay } from "../core/classes/Overlay.js";

export class DemoOverlay extends Overlay {
    constructor(sceneObj) {
        let shouldTick = false;
        let isHTML = false;
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
            app.screen.width*0.90, // x loc of the icon
            app.screen.height*0.10, // the y loc of the icon
            app.screen.height*0.10, // the width of the icon
            app.screen.height*0.10  // the height of the icon
        ); // end super.InitIcon
    } // end InitIcon


    Display(app, data, ticker) {
        super.Display(app, data, ticker);
        console.log("Display Called");

        // create rectangle to be backdrop of the Overlay to screen
        let backdrop = new PIXI.Graphics();
        backdrop.beginFill(0x000000);
        backdrop.drawRect(0, 0, app.screen.width, app.screen.height);

        // add rectangle to container
        this.mainContainer.addChildAt(backdrop);

        // wait 3 seconds, then return to game screen
        setTimeout(() => {
            this.Hide(app);
        }, 3000);
    } // end Display


    Hide(app) {
        super.Hide(app);
        console.log("Hide Called");
    } // end Hide


    Tick() {
        super.Tick();
        console.log("Tick Called");
    } // end Tick
} // end DemoOverlay Class