window.EcoGame = window.EcoGame || {};
EcoGame.Save = {
  key: 'eco-missao-saneamento',
  load() {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; } catch (error) { return {}; }
  },
  write(data) {
    try { localStorage.setItem(this.key, JSON.stringify(data)); } catch (error) { /* armazenamento pode estar indisponivel */ }
  },
  clear() { try { localStorage.removeItem(this.key); } catch (error) {} }
};
