class Effect {
  constructor(parent, spriteIndex, duration) {
    this.parent = parent;
    this.spriteIndex = spriteIndex;
    this.duration = duration;
    this.origDuration = duration;
  }

  draw() {
    let half = this.origDuration / 2;
    let animationFrame = 0;
    if (this.duration < half) animationFrame = 1;
    drawFXSpriteLarge(
      this.spriteIndex + animationFrame,
      this.parent.x,
      this.parent.y
    );
    this.duration--;
  }

  update() {
    if (this.duration <= 0) {
      this.dead = true;
    }
  }
}

class ExplosionEffect extends Effect {
  constructor(parent) {
    super(parent, spr_explosion, 30);
  }
}

class BlueFireEffect extends Effect {
  constructor(parent) {
    super(parent, spr_blue_fire, 30);
  }
}

class BlueExplosionEffect extends Effect {
  constructor(parent) {
    super(parent, spr_explosion_blue, 30);
  }
}

class PinkFireEffect extends Effect {
  constructor(parent) {
    super(parent, spr_pink_fire, 30);
  }
}

class RedSwipeEffect extends Effect {
  constructor(parent) {
    super(parent, spr_red_swipe, 30);
  }
}
