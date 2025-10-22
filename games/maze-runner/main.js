const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let player = { x: 20, y: 20, size: 20 };
let goal = { x: 360, y: 360, size: 20 };

const walls = [
  [0, 100, 300, 20],
  [100, 200, 300, 20],
  [0, 300, 300, 20],
];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'lime';
  ctx.fillRect(goal.x, goal.y, goal.size, goal.size);
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, player.size, player.size);
  ctx.fillStyle = '#555';
  walls.forEach(([x, y, w, h]) => ctx.fillRect(x, y, w, h));
}

function move(dx, dy) {
  const nx = player.x + dx, ny = player.y + dy;
  const rect = { x: nx, y: ny, w: player.size, h: player.size };
  for (const [x, y, w, h] of walls) {
    if (rect.x < x + w && rect.x + rect.w > x && rect.y < y + h && rect.y + rect.h > y)
      return;
  }
  player.x = nx;
  player.y = ny;
  if (player.x > goal.x - 10 && player.y > goal.y - 10) {
    alert('You escaped the maze!');
    location.reload();
  }
  draw();
}

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') move(0, -20);
  if (e.key === 'ArrowDown') move(0, 20);
  if (e.key === 'ArrowLeft') move(-20, 0);
  if (e.key === 'ArrowRight') move(20, 0);
});

draw();
