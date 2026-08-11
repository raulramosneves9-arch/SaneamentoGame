window.EcoGame = window.EcoGame || {};
EcoGame.Dialogue = {
  lines: [],
  index: 0,
  open(lines, name = 'Morador') {
    this.lines = Array.isArray(lines) ? lines : [lines];
    this.index = 0;
    this.name = name;
    this.render();
  },
  next() {
    if (this.index + 1 < this.lines.length) { this.index += 1; this.render(); return true; }
    this.close(); return false;
  },
  render() {
    const box = document.getElementById('dialogue-box');
    if (!box) return;
    document.getElementById('dialogue-name').textContent = this.name;
    document.getElementById('dialogue-text').textContent = this.lines[this.index] || '';
    box.classList.remove('hidden');
  },
  close() { const box = document.getElementById('dialogue-box'); if (box) box.classList.add('hidden'); }
};
