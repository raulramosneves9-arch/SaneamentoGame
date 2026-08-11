window.EcoGame = window.EcoGame || {};
EcoGame.Level = {
  trash: [{ x: 300, y: 350 }, { x: 720, y: 250 }, { x: 1080, y: 700 }],
  npcs: [],
  create() {
    this.npcs = [new EcoGame.NPC('Dona Lúcia', 560, 470, ['A água da rua está suja.', 'Remova os resíduos e desentupa o bueiro.'])];
    return this;
  },
  collect(player) {
    this.trash = this.trash.filter(item => {
      if (Math.hypot(item.x - player.x, item.y - player.y) < 42) { EcoGame.Score.add(20, 'trash'); return false; }
      return true;
    });
  }
};
