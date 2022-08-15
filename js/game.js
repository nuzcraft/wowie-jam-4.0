const spr_fighter = 0;
const spr_rogue = 1;
const spr_archer = 2;
const spr_red_wizard = 3;
const spr_white_priest = 4;
const spr_purple_wizard = 12;
const spr_red_priest = 13;
const spr_golem_skeleton = 194;
const spr_zombie = 288;
const spr_mummy = 295;
const spr_spectre = 297;

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

const spr_headstone = 28;
const spr_bones = 31;
const spr_bones_med = 35;
const spr_bones_big = 37;
const spr_bushes_1 = 45;
const spr_bushes_2 = 46;
const spr_bushes_3 = 47;
const spr_flowers_1 = 98;
const spr_flowers_2 = 99;
const spr_flowers_3 = 100;
const spr_grass = 688;
const spr_grass_dirt_1 = 699;
const spr_grass_dirt_2 = 700;
const spr_grass_dirt_3 = 701;

var projectiles = [];
var monsters = [];
var tiles = [];
var maxNumMonsters = 3;

var frameCount = 0;

function setupCanvas() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = 832;
  canvas.height = 576;
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
  ctx.imageSmoothingEnabled = false;
  genTiles();
}

function startGame() {
  player = new Player(100, 100);
  companion = new Companion(200, 200);
  projectiles = [];
  monsters = [];
  tiles = [];
  playerScore = 0;
  companionScore = 0;
  gameState = "running";
  shakeAmount = 0;
}

function tick() {
  draw();

  if (gameState == "running") {
    player.update();
    companion.update();

    monsters.forEach((monster) => monster.update());

    projectiles.forEach((projectile) => projectile.update());

    for (let i = projectiles.length - 1; i >= 0; i--) {
      if (projectiles[i].dead) {
        projectiles.splice(i, 1);
      }
    }

    for (let i = monsters.length - 1; i >= 0; i--) {
      if (monsters[i].dead) {
        let tile = getTile(monsters[i].x + 32, monsters[i].y + 32);
        if (tile) {
          tile.overlayIndex = monsters[i].corpseSprite;
        }
        monsters.splice(i, 1);
        shakeAmount = 10;
      }
    }

    if (player.dead || companion.dead) {
      gameState = "dead";
      addScore(playerScore + companionScore);
      shakeAmount = 20;
      if (player.dead) {
        let tile = getTile(player.x + 32, player.y + 32);
        if (tile) {
          tile.overlayIndex = player.corpseSprite;
        }
      } else if (companion.dead) {
        let tile = getTile(companion.x + 32, companion.y + 32);
        if (tile) {
          tile.overlayIndex = companion.corpseSprite;
        }
      }
    }

    spawnMonsters();
  }

  frameCount += 1;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  screenshake();

  tiles.forEach((tile) => tile.draw());

  monsters.forEach((monster) => monster.draw());

  projectiles.forEach((projectile) => projectile.draw());

  if (!companion.dead) {
    companion.draw();
  }
  if (!player.dead) {
    player.draw();
  }

  drawScores();

  if (gameState == "dead") {
    showLoseScreen();
  }
}

function drawSprite(spriteIndex, x, y) {
  let [sprshtX, sprshtY] = getLocationOnSpritesheet(spriteIndex);
  ctx.drawImage(
    spritesheet_creatures,
    sprshtX,
    sprshtY,
    24,
    24,
    x + shakeX,
    y + shakeY,
    64,
    64
  );
}

function drawSpriteFlipped(spriteIndex, x, y) {
  let [sprshtX, sprshtY] = getLocationOnSpritesheetFlipped(spriteIndex);
  ctx.drawImage(
    spritesheet_creatures_flipped,
    sprshtX,
    sprshtY,
    24,
    24,
    x + shakeX,
    y + shakeY,
    64,
    64
  );
}

function drawFXSpriteSmall(spriteIndex, x, y) {
  let [sprshtX, sprshtY] = getLocationOnFXSpritesheetSmall(spriteIndex);
  ctx.drawImage(
    spritesheet_fx,
    sprshtX,
    sprshtY,
    24,
    24,
    x + shakeX,
    y + shakeY,
    64,
    64
  );
}

function drawWorldSprite(spriteIndex, x, y) {
  let [sprshtX, sprshtY] = getLocationOnWorldSpritesheet(spriteIndex);
  ctx.drawImage(
    spritesheet_world,
    sprshtX,
    sprshtY,
    24,
    24,
    x + shakeX,
    y + shakeY,
    64,
    64
  );
}

function getLocationOnSpritesheet(spriteIndex) {
  let x_offset = 24;
  let y_offset = 24;
  let tile_width = 24;
  let x_loc = (spriteIndex % 18) * tile_width;
  let y_loc = Math.floor(spriteIndex / 18) * tile_width;

  return [x_loc + x_offset, y_loc + y_offset];
}

function getLocationOnSpritesheetFlipped(spriteIndex) {
  let x_offset = 24;
  let y_offset = 24;
  let tile_width = 24;

  let x_loc = 17 * tile_width - (spriteIndex % 18) * tile_width;
  let y_loc = Math.floor(spriteIndex / 18) * tile_width;

  return [x_loc + x_offset, y_loc + y_offset];
}

function getLocationOnFXSpritesheetSmall(spriteIndex) {
  let x_offset = 24;
  let y_offset = 24;
  let tile_width = 24;
  let x_loc = (spriteIndex % 10) * tile_width;
  let y_loc = Math.floor(spriteIndex / 10) * tile_width;

  return [x_loc + x_offset, y_loc + y_offset];
}

function getLocationOnWorldSpritesheet(spriteIndex) {
  let x_offset = 24;
  let y_offset = 24;
  let tile_width = 24;
  let x_loc = (spriteIndex % 55) * tile_width;
  let y_loc = Math.floor(spriteIndex / 55) * tile_width;

  return [x_loc + x_offset, y_loc + y_offset];
}

function spawnMonsters() {
  maxNumMonsters = Math.max(
    3,
    Math.floor((playerScore + companionScore) / 100 / 6)
  );

  if (monsters.length < maxNumMonsters) {
    let x_loc = Math.random() * canvas.width;
    let y_loc = Math.random() * canvas.height;
    if (
      dist(player.x, player.y, x_loc, y_loc) > 200 &&
      dist(companion.x, companion.y, x_loc, y_loc) > 200
    ) {
      let combinedScore = playerScore + companionScore;
      let randomNum = Math.random();
      if (combinedScore < 2000) {
        monsters.push(new Zombie(x_loc, y_loc));
      } else if (combinedScore < 4000) {
        if (randomNum < 0.9) {
          monsters.push(new Zombie(x_loc, y_loc));
        } else {
          monsters.push(new Mummy(x_loc, y_loc));
        }
      } else if (combinedScore < 6000) {
        if (randomNum < 0.85) {
          monsters.push(new Zombie(x_loc, y_loc));
        } else {
          monsters.push(new Mummy(x_loc, y_loc));
        }
      } else if (combinedScore < 10000) {
        if (randomNum < 0.85) {
          monsters.push(new Zombie(x_loc, y_loc));
        } else if (randomNum < 0.95) {
          monsters.push(new Mummy(x_loc, y_loc));
        } else {
          monsters.push(new GolemSkeleton(x_loc, y_loc));
        }
      } else if (combinedScore < 14000) {
        if (randomNum < 0.8) {
          monsters.push(new Zombie(x_loc, y_loc));
        } else if (randomNum < 0.95) {
          monsters.push(new Mummy(x_loc, y_loc));
        } else {
          monsters.push(new GolemSkeleton(x_loc, y_loc));
        }
      } else if (combinedScore < 20000) {
        if (randomNum < 0.8) {
          monsters.push(new Zombie(x_loc, y_loc));
        } else if (randomNum < 0.9) {
          monsters.push(new Mummy(x_loc, y_loc));
        } else {
          monsters.push(new GolemSkeleton(x_loc, y_loc));
        }
      } else if (combinedScore < 30000) {
        if (randomNum < 0.7) {
          monsters.push(new Zombie(x_loc, y_loc));
        } else if (randomNum < 0.9) {
          monsters.push(new Mummy(x_loc, y_loc));
        } else {
          monsters.push(new GolemSkeleton(x_loc, y_loc));
        }
      } else if (combinedScore < 50000) {
        if (randomNum < 0.6) {
          monsters.push(new Zombie(x_loc, y_loc));
        } else if (randomNum < 0.8) {
          monsters.push(new Mummy(x_loc, y_loc));
        } else {
          monsters.push(new GolemSkeleton(x_loc, y_loc));
        }
      } else {
        if (randomNum < 0.3) {
          monsters.push(new Zombie(x_loc, y_loc));
        } else if (randomNum < 0.65) {
          monsters.push(new Mummy(x_loc, y_loc));
        } else {
          monsters.push(new GolemSkeleton(x_loc, y_loc));
        }
      }
    }
  }
}

function dist(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function drawText(text, size, centered, textY, color, textX) {
  ctx.fillStyle = color;
  ctx.font = size + "px monospace";
  if (!textX) {
    if (centered) {
      textX = (canvas.width - ctx.measureText(text).width) / 2;
    }
  }
  ctx.fillText(text, textX, textY);
}

function showLoseScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawText("One of you has", 60, true, canvas.height / 2 - 150, "red");
  drawText("died to the horde.", 60, true, canvas.height / 2 - 90, "red");

  drawText(
    "Player score: " + playerScore,
    30,
    true,
    canvas.height / 2 - 60,
    "red"
  );
  drawText(
    "Companion score: " + companionScore,
    30,
    true,
    canvas.height / 2 - 30,
    "red"
  );
  // let totalScore = playerScore + companionScore;
  // drawText("Total score: " + totalScore, 30, true, canvas.height / 2 + 60, "red")
  drawScoresTitle();

  drawText("press r to restart", 30, true, canvas.height - 50, "grey");
}

function drawScores() {
  drawText("Player score: " + playerScore, 20, false, 30, "black", 10);
  drawText("Companion score: " + companionScore, 20, false, 50, "black", 10);
}

function getScores() {
  if (localStorage["scores"]) {
    return JSON.parse(localStorage["scores"]);
  } else {
    return [];
  }
}

function addScore(score) {
  let scores = getScores();
  let scoreObject = { score: score };
  scores.push(scoreObject);
  localStorage["scores"] = JSON.stringify(scores);
}

function drawScoresTitle() {
  let scores = getScores();
  if (scores.length) {
    drawText("TOTAL SCORE", 18, true, canvas.height / 2, "white");
  }

  let newestScore = scores.pop();
  scores.sort(function (a, b) {
    return b.score - a.score;
  });
  scores.unshift(newestScore);

  for (let i = 0; i < Math.min(6, scores.length); i++) {
    drawText(
      scores[i].score,
      18,
      true,
      canvas.height / 2 + 24 + i * 24,
      i == 0 ? "yellow" : "grey"
    );
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

function genTiles() {
  for (i = 0; i < canvas.width; i += 64) {
    for (j = 0; j < canvas.height; j += 64) {
      let rando = Math.random();
      let rando2 = Math.random();
      let spr = spr_grass;
      let spr_overlay = spr_bushes_1;
      if (rando < 0.7) {
        spr = spr_grass;
      } else if (rando < 0.8) {
        spr = spr_grass_dirt_1;
      } else if (rando < 0.9) {
        spr = spr_grass_dirt_2;
      } else {
        spr = spr_grass_dirt_3;
      }
      if (rando2 < 0.82) {
        tiles.push(new Tile(i, j, spr));
      } else {
        if (rando2 < 0.85) {
          spr_overlay = spr_bushes_1;
        } else if (rando2 < 0.88) {
          spr_overlay = spr_bushes_2;
        } else if (rando2 < 0.91) {
          spr_overlay = spr_bushes_3;
        } else if (rando2 < 0.94) {
          spr_overlay = spr_flowers_1;
        } else if (rando2 < 0.97) {
          spr_overlay = spr_flowers_2;
        } else {
          spr_overlay = spr_flowers_3;
        }
        tiles.push(new Tile(i, j, spr, spr_overlay));
      }
    }
  }
}

function getTile(x, y) {
  for (i = 0; i < tiles.length; i++) {
    if (tiles[i].x <= x && tiles[i].x + 64 > x) {
      if (tiles[i].y <= y && tiles[i].y + 64 > y) {
        return tiles[i];
      }
    }
  }
  return null;
}
