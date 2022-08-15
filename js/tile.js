class Tile {
  constructor(x, y, spriteIndex, overlayIndex, text) {
    this.x = x;
    this.y = y;
    this.spriteIndex = spriteIndex;
    this.overlayIndex = overlayIndex;
    this.text = text;
  }

  draw() {
    drawWorldSprite(this.spriteIndex, this.x, this.y);
    if (this.overlayIndex) {
      drawWorldSprite(this.overlayIndex, this.x, this.y);
    }
    if (this.text) {
      drawText(this.text, 60, false, this.y, "black", this.x);
    }
  }
}
