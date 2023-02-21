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

        // load the animations using
        let texture = PIXI.Texture.from(data.images.boat[0]);
        let boat = new PIXI.Sprite(texture);

        // center the sprite's anchor point
        boat.anchor.set(0.5);

        // move the sprite to the center of the screen
        boat.x = app.screen.width / 2;
        boat.y = app.screen.height / 2;

        // show the shark
        app.stage.addChild(boat);
    });
}; // end window.onload