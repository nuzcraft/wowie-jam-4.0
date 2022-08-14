const spr_fighter = 0;
const spr_rogue = 1;
const spr_archer = 2;

const spr_yellow_ball_1 = 2;
const spr_yellow_ball_2 = 3;
const spr_yellow_ball_3 = 4;
const spr_fireball_1 = 110;
const spr_fireball_blue_1 = 120;
const spr_fireball_white_1 = 130;
const spr_fireball_purple_1 = 140;
const spr_fireball_black_1 = 150;
const spr_fireball_green_1 = 160;
const spr_fireball_sparkle_1 = 170;
const spr_fireball_meteor_1 = 180;

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
    gameState = "running";
    shakeAmount = 0;
}

function tick(){
    draw();

    if (gameState == "running"){
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
                shakeAmount = 12;
            }
        }
    
        if (player.dead || companion.dead){
            gameState = "dead";
            addScore(playerScore + companionScore);
            shakeAmount = 20;
        }
    
    
        spawnMonsters();
    }

    frameCount += 1;
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    screenshake();
    
    monsters.forEach((monster) => monster.draw());

    projectiles.forEach((projectile) => projectile.draw());

    companion.draw();
    player.draw();

    drawScores();

    if (gameState == "dead"){
        showLoseScreen();
    }
}

function drawSprite(spriteIndex, x, y){
    let [sprshtX, sprshtY] = getLocationOnSpritesheet(spriteIndex);
    ctx.drawImage(spritesheet_creatures, sprshtX, sprshtY, 24, 24, x + shakeX, y + shakeY, 64, 64);
}

function drawFXSpriteSmall(spriteIndex, x, y){
    let [sprshtX, sprshtY] = getLocationOnFXSpritesheetSmall(spriteIndex);
    ctx.drawImage(spritesheet_fx, sprshtX, sprshtY, 24, 24, x + shakeX, y + shakeY, 64, 64);
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
    
    drawText("Player score: " + playerScore, 30, true, canvas.height / 2 - 60, "red");
    drawText("Companion score: " + companionScore, 30, true, canvas.height / 2 - 30, "red");
    // let totalScore = playerScore + companionScore;
    // drawText("Total score: " + totalScore, 30, true, canvas.height / 2 + 60, "red")
    drawScoresTitle();

    drawText("press r to restart", 30, true, canvas.height - 50, "grey");
}

function drawScores(){
    drawText("Player score: " + playerScore, 20, false, 30, "red", 10);
    drawText("Companion score: " + companionScore, 20, false, 50, "red", 10);
}

function getScores() {
    if (localStorage["scores"]) {
      return JSON.parse(localStorage["scores"]);
    } else {
      return [];
    }
  }

function addScore(score){
    let scores = getScores();
    let scoreObject = {score: score};
    scores.push(scoreObject);
    localStorage["scores"] = JSON.stringify(scores);
}

function drawScoresTitle(){
    let scores = getScores();
    if (scores.length){
        drawText("TOTAL SCORE", 18, true, canvas.height / 2, "white")
    };
    
    let newestScore = scores.pop();
    scores.sort(function(a, b){
        return b.score - a.score
    });
    scores.unshift(newestScore);

    for (let i=0; i<Math.min(6, scores.length); i++){
        drawText(scores[i].score, 18, true, canvas.height / 2 + 24 + i*24,
        i==0? "yellow": "grey");
    }
}

function screenshake() {
    if (shakeAmount) {
      shakeAmount--;
    }
    let shakeAngle = Math.random() * Math.PI * 2;
    shakeX = Math.round(Math.cos(shakeAngle) * shakeAmount);
    shakeY = Math.round(Math.sin(shakeAngle) * shakeAmount);
  }