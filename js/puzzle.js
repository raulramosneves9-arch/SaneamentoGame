window.EcoGame = window.EcoGame || {};
EcoGame.Puzzle = {
  active: false,
  sequence: [2, 0, 1],
  position: 0,
  start() {
    this.active = true; this.position = 0;
    const overlay = document.getElementById('puzzle-overlay');
    const area = document.getElementById('puzzle-area');
    if (!overlay || !area) return;
    area.innerHTML = '';
    [0, 1, 2].forEach(value => {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = ['Lata', 'Folhas', 'Plastico'][value];
      button.addEventListener('click', () => this.choose(value));
      area.appendChild(button);
    });
    overlay.classList.remove('hidden');
  },
  choose(value) {
    const feedback = document.getElementById('puzzle-feedback');
    if (value !== this.sequence[this.position]) { this.position = 0; if (feedback) feedback.textContent = 'A ordem foi reiniciada.'; return; }
    this.position += 1;
    if (this.position === this.sequence.length) { this.active = false; EcoGame.Score.add(100, 'problem'); document.getElementById('puzzle-overlay').classList.add('hidden'); EcoGame.Game.setObjective('Caminho desobstruido!'); }
    else if (feedback) feedback.textContent = 'Certo! Continue.';
  }
};
