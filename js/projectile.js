class Projectile{
    constructor(x, y, spriteIndex, direction, speed, distance){
        this.x = x;
        this.origX = x;
        this.y = y;
        this.origY = y;
        this.spriteIndex = spriteIndex;
        this.direction = direction;
        this.speed = speed;
        this.distance = distance;
    }

    draw(){
        drawFXSpriteSmall(this.spriteIndex, this.x, this.y)
    }

    move(){
        let dx = this.direction[0] * this.speed;
        let dy = this.direction[1] * this.speed;
        this.x += dx;
        this.y += dy;

        if (this.distFromOrig() >= this.distance){
            this.dead = true;
        }
    }

    distFromOrig(){
        return Math.abs(this.x - this.origX) + Math.abs(this.y - this.origY);
    }
}