// games/space-dodger/main.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let player = { x: 180, y: 520, w: 40, h: 20, speed: 5 };
let obstacles = [];
let score = 0;
let running = true;

function spawnObstacle() {
const x = Math.random() * (canvas.width - 30);
obstacles.push({ x, y: -20, w: 30, h: 20 });
}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Player
ctx.fillStyle = '#0f0';
ctx.fillRect(player.x, player.y, player.w, player.h);

// Obstacles
ctx.fillStyle = '#f00';
obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h));

// Score
document.getElementById('score').innerText = `Score: ${score}`;
}

function update() {
if (!running) return;

obstacles.forEach(o => o.y += 2);
obstacles = obstacles.filter(o => o.y < canvas.height);

obstacles.forEach(o => {
if (player.x < o.x + o.w && player.x + player.w > o.x &&
player.y < o.y + o.h && player.y + player.h > o.y) {
running = false;
alert('Game Over! Score: ' + score);
window.location.reload();
}
});

score += 1;
}

function gameLoop() {
update();
draw();
requestAnimationFrame(gameLoop);
}

// Controls
window.addEventListener('keydown', e => {
if (e.key === 'ArrowLeft' && player.x > 0) player.x -= player.speed;
if (e.key === 'ArrowRight' && player.x + player.w < canvas.width) player.x += player.speed;
});

// Spawn obstacles periodically
setInterval(spawnObstacle, 1500);

// Start game loop
gameLoop();
