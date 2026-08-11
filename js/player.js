window.EcoGame = window.EcoGame || {};
EcoGame.Player = class {
  constructor() { this.x = 150; this.y = 450; this.speed = 230; this.hp = 3; this.input = { x: 0, y: 0 }; }
  update(delta) {
    const nextX = Math.max(20, Math.min(EcoGame.Map.width - 20, this.x + this.input.x * this.speed * delta));
    const nextY = Math.max(20, Math.min(EcoGame.Map.height - 20, this.y + this.input.y * this.speed * delta));
    if (!EcoGame.Map.isBlocked(nextX, this.y)) this.x = nextX;
    if (!EcoGame.Map.isBlocked(this.x, nextY)) this.y = nextY;
  }
};
