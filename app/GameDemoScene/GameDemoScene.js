import { GameScene } from "../core/classes/GameScene.js";
import { DemoOverlay } from "../DemoOverlay/DemoOverlay.js";


export class GameDemoScene extends GameScene {
    constructor() {
        let isHTML = false;
        super(isHTML);

        // add Overlays -> just the classes themselves, not an object
        super.InitOverlays([
            DemoOverlay
        ]); // end InitOverlays
    } // end constructor


    Start(app, data) {
        // call parent function
        super.Start(app, data);

        let backRatio = 1.5;
        let midRatio = 2;
        let foreRatio = 3;
        
        // set backdrops - for visual clarity of scrolling & lock/unlock
        let backdrop = new PIXI.Graphics();
        backdrop.beginFill(0x000000);
        backdrop.drawRect(0, 0, app.screen.width*backRatio, app.screen.height);
        
        let backMidBar = new PIXI.Graphics();
        backMidBar.beginFill(0x777777);
        backMidBar.drawRect(((app.screen.width*backRatio)*0.5)-50, 0, 100, app.screen.height);

        let backLeftBar = new PIXI.Graphics();
        backLeftBar.beginFill(0xFFFFFF);
        backLeftBar.drawRect(((app.screen.width*backRatio)-50), 0, 100, app.screen.height);

        // set middrops
        let middrop = new PIXI.Graphics();
        middrop.beginFill(0xFF0000);
        middrop.drawRect(0, app.screen.height*0.5, app.screen.width*midRatio, app.screen.height);

        let midMidBar = new PIXI.Graphics();
        midMidBar.beginFill(0x777777);
        midMidBar.drawRect(((app.screen.width*midRatio)*0.5)-50, app.screen.height*0.5, 100, app.screen.height);

        let midLeftBar = new PIXI.Graphics();
        midLeftBar.beginFill(0x00FFFF);
        midLeftBar.drawRect(((app.screen.width*midRatio)-50), app.screen.height*0.5, 100, app.screen.height);

        // set foredrops
        let foredrop = new PIXI.Graphics();
        foredrop.beginFill(0x0000FF);
        foredrop.drawRect(0, app.screen.height*0.75, app.screen.width*foreRatio, app.screen.height);

        let foreMidBar = new PIXI.Graphics();
        foreMidBar.beginFill(0x777777);
        foreMidBar.drawRect(((app.screen.width*foreRatio)*0.5)-50, app.screen.height*0.75, 100, app.screen.height);

        let foreLeftBar = new PIXI.Graphics();
        foreLeftBar.beginFill(0xFFFF00);
        foreLeftBar.drawRect(((app.screen.width*foreRatio)-50), app.screen.height*0.75, 100, app.screen.height);


        // put objects into containers
        this.backGroundContainer.addChildAt(backdrop, 0);
        this.backGroundContainer.addChildAt(backMidBar, 1);
        this.backGroundContainer.addChildAt(backLeftBar, 1);

        this.midGroundContainer.addChildAt(middrop, 0);
        this.midGroundContainer.addChildAt(midMidBar, 1);
        this.midGroundContainer.addChildAt(midLeftBar, 1);

        this.foreGroundContainer.addChildAt(foredrop, 0);
        this.foreGroundContainer.addChildAt(foreMidBar, 1);
        this.foreGroundContainer.addChildAt(foreLeftBar, 1);

        // set character position
        this.character.y = app.screen.height*0.6;
        
        // make character visible
        this.character.visible = true;

        // unlock the second half of the stage with a button press (for example)
        document.addEventListener('keydown', (event) => {
            // example unlocks exploreLock
            if(event.key === "1") {
                super.Unlock(app);
            } // end if
        }); // end addEventListener

        // check for end state (for example, has unlocked the next part)
        this.onlyOnce = true;
    } // end Start


    OnEnd(app) {
        super.OnEnd(app);
    } // end OnEnd


    Tick(app, data) {
        super.Tick(app, data);

        if(this.backGroundContainer.x <= (-(app.screen.width)*this.backGroundRatio + app.screen.width + 100)) {
            if(this.onlyOnce) {
                console.log("Finished Level");
                this.onlyOnce = false;
                setTimeout(() => { // wait 7 seconds, then go to next stage
                    this.isFinished = true;
                }, 7000);
            } // end if
        } // end if
    } // end Tick
} // end MyParallaxScreen class
