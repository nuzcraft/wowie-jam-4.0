const spr_fighter = 0;
const spr_rogue = 1;
const spr_archer = 2;

const spr_yellow_ball_1 = 2;
const spr_yellow_ball_2 = 3;
const spr_yellow_ball_3 = 4;

let projectiles = [];

let frameCount = 0;

function setupCanvas(){
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = 832;
    canvas.height = 576;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    ctx.imageSmoothingEnabled = false;
}

function startGame() {
    player = new Monster(100, 100, spr_fighter);
    companion = new Monster(200, 200, spr_rogue);
}

function tick(){
    draw();

    player.update();
    companion.update();

    projectiles.forEach((projectile) => projectile.update());

    for (let i = projectiles.length - 1; i>= 0; i--){
        if (projectiles[i].dead){
            projectiles.splice(i, 1);
        }
    }

    frameCount += 1;
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw player
    player.draw();

    // draw companion
    companion.draw();

    projectiles.forEach((projectile) => projectile.draw());
}

function drawSprite(spriteIndex, x, y){
    let [sprshtX, sprshtY] = getLocationOnSpritesheet(spriteIndex);
    ctx.drawImage(spritesheet_creatures, sprshtX, sprshtY, 24, 24, x, y, 64, 64);
}

function drawFXSpriteSmall(spriteIndex, x, y){
    let [sprshtX, sprshtY] = getLocationOnFXSpritesheetSmall(spriteIndex);
    ctx.drawImage(spritesheet_fx, sprshtX, sprshtY, 24, 24, x, y, 64, 64);
}

function getLocationOnSpritesheet(spriteIndex){
    let x_offset = 24;
    let y_offset = 24;
    let tile_width = 24;
    let x_loc = (spriteIndex % 18) * tile_width;
    let y_loc = Math.floor(spriteIndex / 18) * tile_width;

    return [x_loc + x_offset, y_loc + y_offset];
}

function getLocationOnFXSpritesheetSmall(spriteIndex){
    let x_offset = 24;
    let y_offset = 24;
    let tile_width = 24;
    let x_loc = (spriteIndex % 10) * tile_width;
    let y_loc = Math.floor(spriteIndex / 10) * tile_width;

    return [x_loc + x_offset, y_loc + y_offset];
}