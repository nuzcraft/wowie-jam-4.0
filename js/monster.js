class Monster{
    constructor(x, y, spriteIndex){
        this.x = x;
        this.y = y;
        this.spriteIndex = spriteIndex;
        this.vXRight = 0;
        this.vXLeft = 0;
        this.vYUp = 0;
        this.vYDown = 0;
        this.fireRate = 0;
        this.speed = .5;
    }

    draw(){
        drawSprite(this.spriteIndex, this.x, this.y);
    }

    dist(other){
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }

    direction(other){
        let x_dist = other.x - this.x;
        let y_dist = other.y - this.y;
        let rads_to_add = 0;
        if (x_dist < 0){
            rads_to_add = Math.PI;
        } else if (y_dist < 0){
            rads_to_add = 2*Math.PI;
        }
        let angle = Math.atan(y_dist / x_dist) + rads_to_add;
        
        let unit_x = Math.cos(angle);
        let unit_y = Math.sin(angle);
        return [unit_x, unit_y];
    }

    update(){

        if(!this.isCompanion && !this.isPlayer){
            if (this.dist(companion) < this.dist(player)){
                let dir = this.direction(companion);
                // console.log(dir);
                this.vXLeft = dir[0] * this.speed;
                this.vYDown = dir[1] * this.speed;
            } else {
                let dir = this.direction(player);
                // console.log(dir);
                this.vXLeft = dir[0] * this.speed;
                this.vYDown = dir[1] * this.speed;
            }
            // console.log(this.vXLeft, this.vYDown)
        }

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

class Player extends Monster{
    constructor(x, y){
        super(x, y, spr_fighter);
        this.isPlayer = true;
        this.fireRate = 60;
        this.speed = 5;
    }
}

class Companion extends Monster{
    constructor(x, y){
        super(x, y, spr_rogue);
        this.isCompanion = true;
        this.fireRate = 60;
        this.speed = 5;
    }
}