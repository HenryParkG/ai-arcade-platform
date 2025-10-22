const area = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
let score = 0;

function spawnCircle() {
  const circle = document.createElement('div');
  circle.className = 'circle';
  circle.style.left = Math.random() * (area.clientWidth - 50) + 'px';
  circle.style.top = Math.random() * (area.clientHeight - 50) + 'px';
  circle.onclick = () => {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
    circle.remove();
    spawnCircle();
  };
  area.innerHTML = '';
  area.appendChild(circle);
}

spawnCircle();
