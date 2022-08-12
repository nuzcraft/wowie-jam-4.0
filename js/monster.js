class Monster{
    constructor(x, y, spriteIndex){
        this.x = x;
        this.y = y;
        this.spriteIndex = spriteIndex;
        this.vXRight = 0;
        this.vXLeft = 0;
        this.vYUp = 0;
        this.vYDown = 0;
        this.fireRate = 60;
    }

    draw(){
        drawSprite(this.spriteIndex, this.x, this.y);
    }

    update(){
        this.move();

        if (frameCount % this.fireRate == 0){
            this.shoot();
        }
    }

    move(){
        this.x += this.vXRight;
        this.x += this.vXLeft;
        this.y += this.vYUp;
        this.y += this.vYDown
    }

    shoot(){
        let dirs = [[0, -1], [0, 1], [-1, 0], [1, 0],
                    [1, -1], [1, 1], [-1, 1], [-1, -1]];

        for (let i=0; i<dirs.length; i++){
            projectiles.push(new Projectile(
                this.x + (dirs[i][0]*24),
                this.y + (dirs[i][1]* 24),
                spr_yellow_ball_1,
                dirs[i],
                7,
                200,
            ))
        }
    }

}