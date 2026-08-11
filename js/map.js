window.EcoGame = window.EcoGame || {};
EcoGame.Map = {
  width: 1600,
  height: 900,
  obstacles: [
    { x: 420, y: 220, width: 210, height: 70 },
    { x: 900, y: 520, width: 260, height: 70 },
    { x: 1160, y: 190, width: 90, height: 180 }
  ],
  isBlocked(x, y, radius = 18) {
    return this.obstacles.some(item => x + radius > item.x && x - radius < item.x + item.width && y + radius > item.y && y - radius < item.y + item.height);
  }
};
