window.EcoGame = window.EcoGame || {};
EcoGame.Game = {
  canvas: null,
  context: null,
  player: null,
  enemies: [],
  level: null,
  running: false,
  lastTime: 0,
  objective: 'Recolha os resíduos e ajude os moradores.',
  init() {
    this.canvas = document.getElementById('game-canvas');
    this.context = this.canvas?.getContext('2d');
    this.player = new EcoGame.Player();
    this.enemies = [new EcoGame.Enemy(820, 340), new EcoGame.Enemy(1250, 650)];
    this.level = EcoGame.Level.create();
    EcoGame.MobileControls.init(this.player);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.setObjective(this.objective);
  },
  start() { this.running = true; this.lastTime = performance.now(); requestAnimationFrame(time => this.loop(time)); },
  stop() { this.running = false; },
  loop(time) {
    if (!this.running) return;
    const delta = Math.min((time - this.lastTime) / 1000, 0.05); this.lastTime = time;
    this.update(delta); this.draw(); requestAnimationFrame(next => this.loop(next));
  },
  update(delta) {
    this.player.update(delta);
    this.enemies.forEach(enemy => enemy.update(this.player, delta));
    this.enemies = this.enemies.filter(enemy => !enemy.dead);
    this.level.collect(this.player);
    this.updateHud();
  },
  draw() {
    if (!this.context) return;
    const scaleX = this.canvas.width / EcoGame.Map.width, scaleY = this.canvas.height / EcoGame.Map.height;
    const ctx = this.context; ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); ctx.save(); ctx.scale(scaleX, scaleY);
    ctx.fillStyle = '#163d39'; ctx.fillRect(0, 0, EcoGame.Map.width, EcoGame.Map.height);
    ctx.fillStyle = '#236b57'; ctx.fillRect(0, 0, EcoGame.Map.width, EcoGame.Map.height / 2);
    ctx.fillStyle = '#704c35'; EcoGame.Map.obstacles.forEach(item => ctx.fillRect(item.x, item.y, item.width, item.height));
    ctx.fillStyle = '#f4d35e'; this.level.trash.forEach(item => { ctx.beginPath(); ctx.arc(item.x, item.y, 14, 0, Math.PI * 2); ctx.fill(); });
    ctx.fillStyle = '#d94841'; this.enemies.forEach(enemy => { ctx.beginPath(); ctx.arc(enemy.x, enemy.y, 22, 0, Math.PI * 2); ctx.fill(); });
    ctx.fillStyle = '#41ead4'; ctx.beginPath(); ctx.arc(this.player.x, this.player.y, 20, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  },
  resize() { if (this.canvas) { this.canvas.width = this.canvas.clientWidth || window.innerWidth; this.canvas.height = this.canvas.clientHeight || window.innerHeight; } },
  attack() { EcoGame.Combat.attack(this.player, this.enemies); },
  special() { EcoGame.Combat.special(this.player, this.enemies); },
  interact() {
    const npc = this.level.npcs.find(item => Math.hypot(item.x - this.player.x, item.y - this.player.y) < 90);
    if (npc) return npc.interact();
    if (Math.hypot(950 - this.player.x, 450 - this.player.y) < 100) EcoGame.Puzzle.start();
  },
  setObjective(text) { this.objective = text; const element = document.getElementById('hud-objective'); if (element) element.textContent = text; },
  updateHud() {
    const points = document.getElementById('hud-points-value'); if (points) points.textContent = EcoGame.Score.value;
    const hearts = document.getElementById('hud-hearts'); if (hearts) hearts.textContent = '♥'.repeat(this.player.hp);
  }
};
