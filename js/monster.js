class Monster{
    constructor(x, y, spriteIndex){
        this.x = x;
        this.y = y;
        this.spriteIndex = spriteIndex;
        this.dx = 0;
        this.dy = 0;
    }

    draw(){
        drawSprite(this.spriteIndex, this.x, this.y);
    }

    setMove(dx, dy){
        this.dx += dx;
        this.dy += dy;
    }

    move(){
        this.x += this.dx;
        this.y += this.dy;
        this.dx -= this.dx;
        this.dy -= this.dy;
    }
}