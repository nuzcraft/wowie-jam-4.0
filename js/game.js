const spr_fighter = 0;
const spr_rogue = 1;
const spr_archer = 2;

const spr_yellow_ball_1 = 2;
const spr_yellow_ball_2 = 3;
const spr_yellow_ball_3 = 4;

var projectiles = [];
var monsters = [];
var maxNumMonsters = 3;

var frameCount = 0;

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
    player = new Player(100, 100);
    companion = new Companion(200, 200);
    projectiles = [];
    monsters = [];
    playerScore = 0;
    companionScore = 0;
}

function tick(){
    draw();

    player.update();
    companion.update();

    monsters.forEach((monster) => monster.update());

    projectiles.forEach((projectile) => projectile.update());

    for (let i = projectiles.length - 1; i>= 0; i--){
        if (projectiles[i].dead){
            projectiles.splice(i, 1);
        }
    }

    for (let i = monsters.length - 1; i>= 0; i--){
        if (monsters[i].dead){
            monsters.splice(i, 1);
        }
    }

    if (player.dead || companion.dead){
        showLoseScreen();
    }


    spawnMonsters();

    frameCount += 1;
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    monsters.forEach((monster) => monster.draw());

    projectiles.forEach((projectile) => projectile.draw());

    companion.draw();
    player.draw();

    drawScores();
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

function spawnMonsters(){
    if (monsters.length < maxNumMonsters){
        let x_loc = Math.random() * canvas.width;
        let y_loc = Math.random() * canvas.height;
        if (dist(player.x, player.y, x_loc, y_loc) > 200 && dist(companion.x, companion.y, x_loc, y_loc) > 200){
            monsters.push(new Monster(x_loc, y_loc, spr_archer));
        }
    }
}

function dist(x1, y1, x2, y2){
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function drawText(text, size, centered, textY, color, textX){
    ctx.fillStyle = color;
    ctx.font = size + "px monospace";
    if (!textX){
        if (centered){
            textX = (canvas.width - ctx.measureText(text).width) / 2;
        }
    }
    ctx.fillText(text, textX, textY);
}

function showLoseScreen(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawText("One of you has", 60, true, canvas.height / 2 - 150, "red");
    drawText("died to the horde.", 60, true, canvas.height / 2 - 90, "red");
    
    drawText("Player score: " + playerScore, 30, true, canvas.height / 2, "red");
    drawText("Companion score: " + companionScore, 30, true, canvas.height / 2 + 30, "red");
    let totalScore = playerScore + companionScore;
    drawText("Total score: " + totalScore, 30, true, canvas.height / 2 + 60, "red")

    drawText("press r to restart", 30, true, canvas.height / 2 + 150, "grey");
}

function drawScores(){
    drawText("Player score: " + playerScore, 20, false, 30, "red", 10);
    drawText("Companion score: " + companionScore, 20, false, 50, "red", 10);
}