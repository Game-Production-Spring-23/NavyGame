// Get Document Elements
const app = document.getElementById("app");
const player = document.getElementById("player");
const bgContainer = document.getElementById("background");
const mgContainer = document.getElementById("midground");
const cgContainer = document.getElementById("charground");
const fgContainer = document.getElementById("foreground");
const captain = document.getElementById("captain");
const parrot = document.getElementById("parrot");
const qm = document.getElementById("quartermaster");
const vet = document.getElementById("veteran");
const chef = document.getElementById("chef");
const officers = document.getElementById("officers");
const tech = document.getElementById("tech");
const nt = document.getElementById("nontech");
const minigame = document.getElementById("minigame");

// Get JSON Data
fetch("scene2.json")
.then((response) => response.json())
.then((data) => {

    // Apply Styles to Document Elements
    player.style.left = data.characters.player.offset + "px";
    //player.style.backgroundImage = data.characters.player.sprite[0];
    captain.style.left = data.characters.captain.offset + "px";
    //captain.style.backgroundImage = data.characters.captain.sprite[0];
    parrot.style.left = data.characters.parrot.offset + "px";
    //parrot.style.backgroundImage = data.characters.parrot.sprite[0];
    qm.style.left = data.characters.quartermaster.offset + "px";
    //qm.style.backgroundImage = data.characters.quartermaster.sprite[0];
    vet.style.left = data.characters.veteran.offset + "px";
    //vet.style.backgroundImage = data.characters.veteran.sprite[0];
    chef.style.left = data.characters.chef.offset + "px";
    //chef.style.backgroundImage = data.characters.chef.sprite[0];
    officers.style.left = data.characters.officers.offset + "px";
    //officers.style.backgroundImage = data.characters.officers.sprite[0];
    tech.style.left = data.characters.tech.offset + "px";
    //tech.style.backgroundImage = data.characters.tech.sprite[0];
    nt.style.left = data.characters.nontech.offset + "px";
    //nt.style.backgroundImage = data.characters.nontech.sprite[0];
    minigame.style.left = data.characters.minigame.offset + "px";
    //minigame.style.backgroundImage = data.characters.minigame.sprite[0];

    bgContainer.style.width = (1920 * data.params.bg_scale) + "px";
    mgContainer.style.width = (1920 * data.params.mg_scale) + "px";
    cgContainer.style.width = (1920 * data.params.fg_scale) + "px";
    fgContainer.style.width = (1920 * data.params.fg_scale) + "px";
});

// numbers based off left edge of player
let playerX = 884; // data.characters.player.offset   
let playerAbs = playerX;
let playerLBound = 544;     
let playerRBound = 1184;    

let bgOffset = 0;
let mgOffset = 0;
let fgOffset = 0;

let fgMaxOffset = -9600; // -1920 * (data.params.fg_scale - 1)
let playerAbsLimit = 11328; // data.params.fg_scale - 192

let locked = true;
let playerLockedLimit = 9600; // 1920 * data.params.lockPos

let speed = 20; // data.params.fg_speed
let fgSpeed = 20; // data.params.fg_speed
let mgSpeed = 12; // data.params.mg_speed
let bgSpeed = 8; // data.params.bg_speed

let interaction = "";


document.addEventListener('keydown', (event) => {
    if(event.key === "ArrowRight" || event.key === "d") {
        moveRight();
    } 

    if(event.key === "ArrowLeft" || event.key === "a") {
        moveLeft();
    }

    if (playerAbs > 1344 && playerAbs < 1632) {
        // captain
        /*
        if (data.characters.captain.key) {
            interaction = "key";
        } else if (data.characters.captain.minigame) {
            interaction = "minigame";
        } else {
            interaction = "other";
        }
        */
        interaction = "other";
    } else if (playerAbs > 1558 && playerAbs < 1846) {
        // parrot
        /*
        if (data.characters.parrot.key) {
            interaction = "key";
        } else if (data.characters.parrot.minigame) {
            interaction = "minigame";
        } else {
            interaction = "other";
        }
        */
        interaction = "other";
    } else if (playerAbs > 2688 && playerAbs < 2976) {
        // quartermaster
        /*
        if (data.characters.quartermaster.key) {
            interaction = "key";
        } else if (data.characters.quartermaster.minigame) {
            interaction = "minigame";
        } else {
            interaction = "other";
        }
        */
        interaction = "other";
    } else if (playerAbs > 5184 && playerAbs < 5472) {
        // chef
        /*
        if (data.characters.chef.key) {
            interaction = "key";
        } else if (data.characters.chef.minigame) {
            interaction = "minigame";
        } else {
            interaction = "other";
        }
        */
        interaction = "other";
    } else if (playerAbs > 5568 && playerAbs < 5856) {
        // officers
        /*
        if (data.characters.officers.key) {
            interaction = "key";
        } else if (data.characters.officers.minigame) {
            interaction = "minigame";
        } else {
            interaction = "other";
        }
        */
        interaction = "other";
    } else if (playerAbs > 5988 && playerAbs < 6276) {
        // nontech
        /*
        if (data.characters.nontech.key) {
            interaction = "key";
        } else if (data.characters.nontech.minigame) {
            interaction = "minigame";
        } else {
            interaction = "other";
        }
        */
        interaction = "other";
    } else if (playerAbs > 7488 && playerAbs < 7776) {
        // tech
        /*
        if (data.characters.tech.key) {
            interaction = "key";
        } else if (data.characters.tech.minigame) {
            interaction = "minigame";
        } else {
            interaction = "other";
        }
        */
        interaction = "other";
    } else if (playerAbs > 9024 && playerAbs < 9312) {
        // vet
        /*
        if (data.characters.veteran.key) {
            interaction = "key";
        } else if (data.characters.veteran.minigame) {
            interaction = "minigame";
        } else {
            interaction = "other";
        }
        */
        interaction = "key";
    } else if (playerAbs > 10144 && playerAbs < 10880) {
        // minigame
        /*
        if (data.characters.minigame.key) {
            interaction = "key";
        } else if (data.characters.minigame.minigame) {
            interaction = "minigame";
        } else {
            interaction = "other";
        }
        */
        interaction = "minigame";
    } else {
        interaction = "";
    }
});

document.addEventListener('keydown', (event) => {
    if(event.key === "e") {
        interact();
    }
})


function moveRight() {
    console.log("moving right");
    if ((locked && playerAbs < playerLockedLimit) || 
        (!locked && playerAbs < playerAbsLimit)) {
        playerAbs += speed;
        if (playerX < playerRBound) {
            // move player element right by speed
            playerLBound = 544;
            playerX += speed;            
            player.style.left = playerX + "px";
        } else {
            // player at bound, move containers left by speed * ratio
            if (fgOffset > fgMaxOffset) {
                // containers have space to move
                fgOffset -=  fgSpeed;
                fgContainer.style.left = fgOffset + "px";
                cgContainer.style.left = fgOffset + "px";
                mgOffset -=  mgSpeed;
                mgContainer.style.left = mgOffset + "px";
                bgOffset -=  bgSpeed;
                bgContainer.style.left = bgOffset + "px";
            } else {
                // containers reached limit, disable player bound to reach edge of screen
                playerRBound = 1824;
            }
        }
    }
}

function moveLeft() {
    console.log("moving left");
    if (playerAbs > 0) {
        playerAbs -= speed;
        if (playerX > playerLBound) {
            // move player element right by speed
            playerRBound = 1184;
            playerX -= speed;            
            player.style.left = playerX + "px";
        } else {
            // player at bound, move containers left by speed * ratio
            if (fgOffset < 0) {
                // containers have space to move
                fgOffset +=  fgSpeed;
                fgContainer.style.left = fgOffset + "px";
                cgContainer.style.left = fgOffset + "px";
                mgOffset +=  mgSpeed;
                mgContainer.style.left = mgOffset + "px";
                bgOffset +=  bgSpeed;
                bgContainer.style.left = bgOffset + "px";
            } else {
                // containers reached limit, disable player bound to reach edge of screen
                playerLBound = 0;
            }
        }
    }
}

function interact() {
    console.log(interaction);

    if (interaction == "key") {
        unlock();
        // load dialogue overlay
    } else if (interaction == "minigame") {
        // load minigame scene
    } else {
        // sub-dialogue? Format: 'Name: "Text"'
    }
}

function unlock() {
    locked = false;
}