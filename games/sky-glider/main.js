const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let glider = { x: 50, y: 200, w: 40, h: 20, vy: 0 };
let obstacles = [];
let score = 0;

function spawnObstacle() {
  const gapY = Math.random() * 250 + 50;
  obstacles.push({ x: 400, gapY, w: 50 });
}

function draw() {
  ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = 'red';
  ctx.fillRect(glider.x, glider.y, glider.w, glider.h);

  ctx.fillStyle = '#555';
  obstacles.forEach(o => {
    ctx.fillRect(o.x, 0, o.w, o.gapY - 80);
    ctx.fillRect(o.x, o.gapY + 80, o.w, 400 - o.gapY - 80);
  });

  document.getElementById('score').innerText = `Score: ${score}`;
}

function update() {
  glider.vy += 0.3;
  glider.y += glider.vy;
  obstacles.forEach(o => o.x -= 3);

  obstacles.forEach(o => {
    if (
      glider.x < o.x + o.w &&
      glider.x + glider.w > o.x &&
      (glider.y < o.gapY - 80 || glider.y + glider.h > o.gapY + 80)
    ) {
      alert('💥 You crashed! Score: ' + score);
      location.reload();
    }
  });

  if (obstacles.length && obstacles[0].x + obstacles[0].w < 0) {
    obstacles.shift();
    score++;
  }

  if (glider.y > 380 || glider.y < 0) {
    alert('💥 Out of bounds! Score: ' + score);
    location.reload();
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', e => {
  if (e.key === ' ') glider.vy = -6;
});

setInterval(spawnObstacle, 2000);
loop();
