// An example of loading an image in pixi

// Notes from: https://www.bookstack.cn/read/learningPixi-en/spilt.5.pixi.md

let shouldMoveLeft = false;
let shouldMoveRight = false;
let shouldMoveUp = false;
let shouldMoveDown = false;

window.onload = (event) => {
    // Create a PIXI application
    const app = new PIXI.Application({ background: '#1099bb' });
    document.body.appendChild(app.view);
    
    const sharkImages = [
        'shark_0.png',
        'shark_1.png',
        'shark_2.png',
        'shark_3.png',
    ];
    const textureArray = [];
    
    for (let i = 0; i < 4; i++)
    {
        const texture = PIXI.Texture.from(sharkImages[i]);
        textureArray.push(texture);
    }
    
    const shark = new PIXI.AnimatedSprite(textureArray);

    // center the sprite's anchor point
    shark.anchor.set(0.5);

    // move the sprite to the center of the screen
    shark.x = app.screen.width / 2;
    shark.y = app.screen.height / 2;

    // set sprite size
    shark.width = 100;
    shark.height = 100;

    // show the shark
    shark.animationSpeed = 0.1;
    shark.play();
    app.stage.addChild(shark);

    app.ticker.add(gameLoop);
    app.ticker.start();
    // Up: 38, W: 87
    // Down: 40 S: 83
    // Left: 37 A: 65
    // Right: 39 D: 68
    // keyboard event listener


    window.addEventListener("keydown", (event) => {
        // there's a more efficient way to do this, but for an example this works
        if(event.key == "w"  || event.key == "ArrowUp") {
            shark.animationSpeed = 0.3;
            shouldMoveUp = true;
        } // end if

        if(event.key == "s" || event.key == "ArrowDown") {
            shark.animationSpeed = 0.3;
            shouldMoveDown = true;
        } // end if

        if(event.key == "d" || event.key == "ArrowRight") {
            shark.animationSpeed = 0.3;
            shouldMoveRight = true;
        } // end if

        if(event.key == "a" || event.key == "ArrowLeft") {
            shark.animationSpeed = 0.3;
            shouldMoveLeft = true;
        } // end if
    });


    window.addEventListener("keyup", (event) => {
        shark.animationSpeed = 0.1;
        stopAllMovement();
    });

    function gameLoop() {
        if(shouldMoveUp == true) {
            if(safeUp(shark.y)) {
                shark.y -= 5;
            }
        }

        if(shouldMoveDown == true) {
            if(safeDown(shark.y)) {
                shark.y += 5;
            }
        }

        if(shouldMoveLeft == true) {
            if(safeLeft(shark.x)) {
                shark.x -= 5;
            }
        }

        if(shouldMoveRight == true) {
            if(safeRight(shark.x)) {
                shark.x += 5;
            }
        }
    }
};

function stopAllMovement() {
    shouldMoveUp = false;
    shouldMoveDown = false;
    shouldMoveLeft = false;
    shouldMoveRight = false;
} // end stopAllMovement

function safeRight(x) {
    if(x <= 700) {
        return true;
    } else {
        return false;
    }
}

function safeLeft(x) {
    if(x >= 100) {
        return true;
    } else {
        return false;
    }
}

function safeUp(y) {
    console.log(y);
    if(y >= 100) {
        return true;
    } else {
        return false;
    }
}

function safeDown(y) {
    if(y <= 500) {
        return true;
    } else {
        return false;
    }
}
