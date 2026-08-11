window.EcoGame = window.EcoGame || {};
EcoGame.Enemy = class {
  constructor(x, y) { this.x = x; this.y = y; this.hp = 2; this.dead = false; }
  update(player, delta) {
    if (this.dead) return;
    const distance = Math.hypot(player.x - this.x, player.y - this.y);
    if (distance > 48 && distance < 420) { this.x += (player.x - this.x) / distance * 45 * delta; this.y += (player.y - this.y) / distance * 45 * delta; }
  }
};
