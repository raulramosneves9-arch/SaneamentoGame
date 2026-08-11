window.EcoGame = window.EcoGame || {};
EcoGame.Score = {
  value: 0,
  trash: 0,
  problems: 0,
  reset() { this.value = 0; this.trash = 0; this.problems = 0; },
  add(points, type) {
    this.value += points;
    if (type === 'trash') this.trash += 1;
    if (type === 'problem') this.problems += 1;
    return this.value;
  }
};
