class Tile {
  constructor(x, y, spriteIndex, overlayIndex) {
    this.x = x;
    this.y = y;
    this.spriteIndex = spriteIndex;
    this.overlayIndex = overlayIndex;
  }

  draw() {
    drawWorldSprite(this.spriteIndex, this.x, this.y);
    if (this.overlayIndex) {
      drawWorldSprite(this.overlayIndex, this.x, this.y);
    }
  }
}
