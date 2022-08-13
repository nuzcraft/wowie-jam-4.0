class Projectile{
    constructor(x, y, spriteIndex, direction, speed, distance, owner){
        this.x = x;
        this.origX = x;
        this.y = y;
        this.origY = y;
        this.spriteIndex = spriteIndex;
        this.direction = direction;
        this.speed = speed;
        this.distance = distance;
        this.owner = owner;
    }

    draw(){
        drawFXSpriteSmall(this.spriteIndex, this.x, this.y)
    }

    update(){
        this.move();
        if (this.distFromOrig() >= this.distance){
            this.dead = true;
        }

        for (let i = monsters.length - 1; i>= 0; i--){
            if (monsters[i].dist(this) < 64 && !this.dead){
                monsters[i].hp -= 1;
                if (monsters[i].hp <= 0){
                    this.score();
                }
                this.dead = true;
            }
        }
    }

    score(){
        if(this.owner == "player"){
            playerScore += 100;
        } else if (this.owner == "companion"){
            companionScore += 100;
        }
    }

    move(){
        let dx = this.direction[0] * this.speed;
        let dy = this.direction[1] * this.speed;
        this.x += dx;
        this.y += dy;
    }

    distFromOrig(){
        return Math.abs(this.x - this.origX) + Math.abs(this.y - this.origY);
    }
}