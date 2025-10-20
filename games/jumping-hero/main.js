// games/jumping-hero/main.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

let player = { x: 50, y: 250, w: 30, h: 30, vy: 0, jumpPower: -8, gravity: 0.4 };
let obstacles = [];
let score = 0;
let running = true;

function spawnObstacle() {
  const height = 20 + Math.random() * 30;
  obstacles.push({ x: canvas.width, y: canvas.height - height, w: 20, h: height });
}

function update() {
  if (!running) return;

  // 플레이어 물리
  player.vy += player.gravity;
  player.y += player.vy;
  if (player.y > canvas.height - player.h) {
    player.y = canvas.height - player.h;
    player.vy = 0;
  }

  // 장애물 이동
  obstacles.forEach(o => o.x -= 4);
  obstacles = obstacles.filter(o => o.x + o.w > 0);

  // 충돌 체크
  obstacles.forEach(o => {
    if (player.x < o.x + o.w &&
        player.x + player.w > o.x &&
        player.y < o.y + o.h &&
        player.y + player.h > o.y) {
      running = false;
      alert('Game Over! Score: ' + score);
      window.location.reload();
    }
  });

  score += 1;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 플레이어
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // 장애물
  ctx.fillStyle = '#8B0000';
  obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h));

  // 점수
  document.getElementById('score').innerText = `Score: ${score}`;
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// 점프
window.addEventListener('keydown', e => {
  if ((e.key === ' ' || e.key === 'ArrowUp') && player.y === canvas.height - player.h) {
    player.vy = player.jumpPower;
  }
});

// 장애물 주기적 생성
setInterval(spawnObstacle, 2000);

gameLoop();
