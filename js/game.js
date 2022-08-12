const spr_fighter = 0;
const spr_rogue = 1;
const spr_archer = 2;

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

    player.move();

    companion.move();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw player
    player.draw();

    // draw companion
    companion.draw();
}

function drawSprite(spriteIndex, x, y){
    [sprshtX, sprshtY] = getLocationOnSpritesheet(spriteIndex);
    ctx.drawImage(spritesheet_creatures, sprshtX, sprshtY, 24, 24, x, y, 64, 64);
}

function getLocationOnSpritesheet(spriteIndex){
    let x_offset = 24;
    let y_offset = 24;
    let tile_width = 24;
    let x_loc = (spriteIndex % 18) * tile_width;
    let y_loc = Math.floor(spriteIndex / 18) * tile_width;

    return [x_loc + x_offset, y_loc + y_offset];
}