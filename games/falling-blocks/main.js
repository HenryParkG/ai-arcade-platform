// games/falling-blocks/main.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let player = { x: 180, y: 550, w: 40, h: 20, speed: 7 };
let blocks = [];
let score = 0;
let running = true;

function spawnBlock() {
  const x = Math.random() * (canvas.width - 30);
  blocks.push({ x, y: -20, w: 30, h: 20 });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = '#0f0';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // Blocks
  ctx.fillStyle = '#f00';
  blocks.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

  document.getElementById('score').innerText = `Score: ${score}`;
}

function update() {
  if (!running) return;

  blocks.forEach(b => b.y += 3);
  blocks = blocks.filter(b => b.y < canvas.height);

  blocks.forEach(b => {
    if (player.x < b.x + b.w && player.x + player.w > b.x &&
        player.y < b.y + b.h && player.y + player.h > b.y) {
      score += 1;
      b.y = -20;
      b.x = Math.random() * (canvas.width - 30);
    } else if (b.y >= canvas.height) {
      running = false;
      alert('Game Over! Score: ' + score);
      window.location.reload();
    }
  });
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && player.x > 0) player.x -= player.speed;
  if (e.key === 'ArrowRight' && player.x + player.w < canvas.width) player.x += player.speed;
});

setInterval(spawnBlock, 1500);
gameLoop();