/*
    Screen 1 Template

    Tasks:
    - Creates a moving water effect
    - Creates a moving ship effect
    - Transitions to the Deck Screen, by zooming in (Screen2)
*/


// Call the testData function when the window loads
window.onload = (event) => {
    // Fetch data.json file
    fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        // Create a PIXI application
        const app = new PIXI.Application({ background: '#FFFFFF' });
        document.body.appendChild(app.view);

        // load the boat
        let texture = PIXI.Texture.from(data.images.boat[0]);
        let boat = new PIXI.Sprite(texture);

        // center the sprite's anchor point
        boat.anchor.set(0.5);

        // move the sprite to the center of the screen
        boat.x = app.screen.width / 2;
        boat.y = app.screen.height / 2 + 100;
        boat.width = 200;
        boat.height = 200;

        // load the water
        const textureArray = [];
        for (let i = 0; i < 3; i++) {
            const waterTexture = PIXI.Texture.from(data.images.water[i]);
            textureArray.push(waterTexture);
        }
        
        const water = new PIXI.AnimatedSprite(textureArray);
    
        // center the sprite's anchor point
        water.anchor.set(0.5);
    
        // move the sprite to the center of the screen
        water.x = app.screen.width / 2;
        water.y = app.screen.height - 100;
    
        // set sprite size
        water.width = 1000;
        water.height = 100;
    
        // set animation details
        water.animationSpeed = 0.03;
        water.onFrameChange = (currentFrame) => {
            rotateShip(boat, currentFrame);
        } // end onFrameChange
        water.play();
        
        // start game loop
        //app.ticker.add(gameLoop);
        app.ticker.start();

        // show the sprites
        app.stage.addChild(water);
        app.stage.addChild(boat);
    });
}; // end window.onload

function rotateShip(boat, currentFrame) {
    let rotations = [0, -15, 15];
    let boatYPos = [400, 415, 415];
    let i = currentFrame % 3;
    boat.angle = rotations[i];
    boat.y = boatYPos[i];

} // end rotateShip
