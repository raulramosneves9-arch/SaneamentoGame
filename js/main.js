(() => {
  const game = EcoGame.Game;
  const screens = document.querySelectorAll('.screen');
  const show = id => screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  const bind = (id, event, handler) => document.getElementById(id)?.addEventListener(event, handler);
  const pause = () => { game.stop(); show('screen-pause'); };
  const start = () => { EcoGame.Score.reset(); game.init(); show('screen-game'); game.start(); };

  const keys = { w: false, a: false, s: false, d: false };
  const updateInput = () => { game.player.input.x = (keys.d ? 1 : 0) - (keys.a ? 1 : 0); game.player.input.y = (keys.s ? 1 : 0) - (keys.w ? 1 : 0); };
  document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    if (key === 'escape') { if (game.running) pause(); else if (document.getElementById('screen-pause')?.classList.contains('active')) { show('screen-game'); game.start(); } }
    if (key === ' ') { event.preventDefault(); if (game.running) game.attack(); }
    if (key === 'q' && game.running) game.special();
    if (key === 'e' && game.running) game.interact();
    if (key in keys) { keys[key] = true; updateInput(); }
  });
  document.addEventListener('keyup', event => { const key = event.key.toLowerCase(); if (key in keys) { keys[key] = false; updateInput(); } });
  bind('btn-jogar', 'click', start);
  bind('btn-continuar', 'click', start);
  bind('btn-como-jogar', 'click', () => show('screen-help'));
  bind('btn-help-back', 'click', () => show('screen-menu'));
  bind('btn-pause', 'click', pause);
  bind('btn-resume', 'click', () => { show('screen-game'); game.start(); });
  bind('btn-quit-menu', 'click', () => { game.stop(); show('screen-menu'); });
  bind('btn-options', 'click', () => show('screen-options'));
  bind('btn-options-back', 'click', () => show('screen-pause'));
  bind('btn-retry', 'click', start);
  bind('btn-gameover-menu', 'click', () => show('screen-menu'));
  bind('dialogue-box', 'click', () => EcoGame.Dialogue.next());
  document.addEventListener('DOMContentLoaded', () => { document.getElementById('hud-objective').textContent = game.objective; });
})();
