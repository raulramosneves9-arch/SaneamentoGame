window.EcoGame = window.EcoGame || {};
EcoGame.MobileControls = {
  init(player) {
    const zone = document.getElementById('joystick-zone');
    if (!zone) return;
    const update = event => {
      const touch = event.touches[0]; if (!touch) return;
      const rect = zone.getBoundingClientRect();
      player.input.x = Math.max(-1, Math.min(1, (touch.clientX - (rect.left + rect.width / 2)) / 55));
      player.input.y = Math.max(-1, Math.min(1, (touch.clientY - (rect.top + rect.height / 2)) / 55));
    };
    zone.addEventListener('touchmove', update, { passive: false });
    zone.addEventListener('touchend', () => { player.input.x = 0; player.input.y = 0; });
    document.getElementById('btn-attack')?.addEventListener('click', () => EcoGame.Game.attack());
    document.getElementById('btn-special')?.addEventListener('click', () => EcoGame.Game.special());
    document.getElementById('btn-interact')?.addEventListener('click', () => EcoGame.Game.interact());
    document.getElementById('btn-dash')?.addEventListener('click', () => { player.speed = 460; setTimeout(() => { player.speed = 230; }, 180); });
  }
};
