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
        this.hp = 1;
        this.level = 0;
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
                this.vXLeft = dir[0] * this.speed;
                this.vYDown = dir[1] * this.speed;
            } else {
                let dir = this.direction(player);
                this.vXLeft = dir[0] * this.speed;
                this.vYDown = dir[1] * this.speed;
            }
        }

        this.move();

        if (this.hp <= 0){
            this.dead = true;
        }

        if(!this.isCompanion && !this.isPlayer){
            this.killPlayerAndCompanion();
        }

        if (frameCount % this.fireRate == 0){
            this.shoot();
        }

        this.levelUp();
    }

    move(){
        this.x += this.vXRight;
        this.x += this.vXLeft;
        this.y += this.vYUp;
        this.y += this.vYDown
    }

    killPlayerAndCompanion(){
        if (this.dist(player) < 32 || this.dist(companion) < 32){
            player.dead = true;
            player.fireRate = 0;
            companion.dead = true;
            companion.fireRate = 0;
        }
    }

    shoot(){
        if(this.level==1){
            this.shootLevel1();
        }
    }

    shootLevel1(){
        let dirs = [[0, -1], [0, 1], [-1, 0], [1, 0],
        [1, -1], [1, 1], [-1, 1], [-1, -1]];

        let owner = "monster";
        if (this.isPlayer){
        owner = "player";
        } else if (this.isCompanion){
        owner = "companion";
        }

        for (let i=0; i<dirs.length; i++){
        projectiles.push(new Projectile(
            this.x + (dirs[i][0]*24),
            this.y + (dirs[i][1]* 24),
            spr_yellow_ball_1,
            dirs[i],
            7,
            200,
            owner,
        ))
        }
    }

    levelUp(){
        if(this.isPlayer){
            if(this.level==1 && playerScore >= 1000){
                this.level = 2;
            } else if (this.level == 2 && playerScore >= 2500){
                this.level = 3;
            } else if (this.level == 3 && playerScore >= 5000){
                this.level = 4;
            } else if (this.level == 4 && playerScore >= 10000){
                this.level = 5;
            }
        }
        if (this.isCompanion){
                if(this.level==1 && companionScore >= 1000){
                    this.level = 2;
                } else if (this.level == 2 && companionScore >= 2500){
                    this.level = 3;
                } else if (this.level == 3 && companionScore >= 5000){
                    this.level = 4;
                } else if (this.level == 4 && playerScore >= 10000){
                    this.level = 5;
            }
        }
    }

}

class Player extends Monster{
    constructor(x, y){
        super(x, y, spr_fighter);
        this.isPlayer = true;
        this.fireRate = 120;
        this.speed = 5;
        this.level = 1;
    }
}

class Companion extends Monster{
    constructor(x, y){
        super(x, y, spr_rogue);
        this.isCompanion = true;
        this.fireRate = 120;
        this.speed = 5;
        this.level = 1;
    }

    update(){

    //     // if(!this.isCompanion && !this.isPlayer){
    //     //     if (this.dist(companion) < this.dist(player)){
    //     //         let dir = this.direction(companion);
    //     //         this.vXLeft = dir[0] * this.speed;
    //     //         this.vYDown = dir[1] * this.speed;
    //     //     } else {
    //     //         let dir = this.direction(player);
    //     //         this.vXLeft = dir[0] * this.speed;
    //     //         this.vYDown = dir[1] * this.speed;
    //     //     }
    //     // }
        
        let dirs = [];
        for (let i = monsters.length - 1; i>= 0; i--){
            if (this.dist(monsters[i]) < 250){
                dirs.push(monsters[i].direction(this));
                dirs.push(monsters[i].direction(this));
            }
        }

        if (this.dist(player) > 300){
            dirs.push(this.direction(player))
        }
        
        
        let dirX = 0;
        let dirY = 0;
        for (let i=0; i<dirs.length; i++){
            dirX += dirs[i][0];
            dirY += dirs[i][1]
        }
        if(dirs.length > 0) {
            dirX = dirX/dirs.length;
            dirY = dirY/dirs.length;
        }
        
        this.vXLeft = dirX * this.speed;
        this.vYDown = dirY * this.speed;

        this.move();

        if (this.hp <= 0){
            this.dead = true;
        }

        if (frameCount % this.fireRate == 0){
            this.shoot();
        }

        this.levelUp();
    }
}