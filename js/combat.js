window.EcoGame = window.EcoGame || {};
EcoGame.Combat = {
  attack(player, enemies) {
    enemies.forEach(enemy => {
      if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < 90) { enemy.hp -= 1; if (enemy.hp <= 0) { enemy.dead = true; EcoGame.Score.add(25); } }
    });
  },
  special(player, enemies) {
    enemies.forEach(enemy => { if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < 180) enemy.hp -= 2; });
    EcoGame.Score.add(10);
  }
};
