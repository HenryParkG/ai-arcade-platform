const wires = document.getElementById('wires');
const timerDisplay = document.getElementById('timer');
let timeLeft = 5;
let correctWire = Math.floor(Math.random() * 4);

const colors = ['red', 'blue', 'green', 'yellow'];
colors.forEach((color, i) => {
  const wire = document.createElement('div');
  wire.className = 'wire';
  wire.style.background = color;
  wire.onclick = () => checkWire(i);
  wires.appendChild(wire);
});

function checkWire(i) {
  if (i === correctWire) {
    alert('💥 You defused the bomb!');
  } else {
    alert('💣 Wrong wire! Boom!');
  }
  location.reload();
}

const timer = setInterval(() => {
  timeLeft--;
  timerDisplay.innerText = `Time Left: ${timeLeft}`;
  if (timeLeft <= 0) {
    clearInterval(timer);
    alert('💥 Time’s up!');
    location.reload();
  }
}, 1000);
