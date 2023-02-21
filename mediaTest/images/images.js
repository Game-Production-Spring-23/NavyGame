// An example of loading an image in pixi
// Edwin Sanchez

// Notes from: https://www.bookstack.cn/read/learningPixi-en/spilt.5.pixi.md

window.onload = (event) => {
    // Create a PIXI application
    const app = new PIXI.Application({ background: '#1099bb' });
    document.body.appendChild(app.view);

    // load the animations using
    let texture = PIXI.Texture.from('shark.png');
    let shark = new PIXI.Sprite(texture);

    // center the sprite's anchor point
    shark.anchor.set(0.5);

    // move the sprite to the center of the screen
    shark.x = app.screen.width / 2;
    shark.y = app.screen.height / 2;

    // show the shark
    app.stage.addChild(shark);
};

// Setup the animated sprite
function setup() {
    
} // end setup
