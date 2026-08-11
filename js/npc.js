window.EcoGame = window.EcoGame || {};
EcoGame.NPC = class {
  constructor(name, x, y, message) { this.name = name; this.x = x; this.y = y; this.message = message; this.helped = false; }
  interact() {
    EcoGame.Dialogue.open(this.message, this.name);
    if (!this.helped) { this.helped = true; EcoGame.Score.add(50, 'problem'); }
  }
};
