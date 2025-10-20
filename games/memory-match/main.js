// games/memory-match/main.js
const board = document.getElementById('game-board');
const status = document.getElementById('status');

const icons = ['🍎', '🍌', '🍇', '🍒', '🍉', '🍋', '🥝', '🍑'];
let cards = [...icons, ...icons];
let flipped = [];
let matched = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = '';
  cards = shuffle(cards);
  cards.forEach((icon, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.icon = icon;
    card.onclick = () => flipCard(card);
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (flipped.length === 2 || card.classList.contains('flipped')) return;
  card.classList.add('flipped');
  card.textContent = card.dataset.icon;
  flipped.push(card);

  if (flipped.length === 2) {
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [c1, c2] = flipped;
  if (c1.dataset.icon === c2.dataset.icon) {
    matched++;
    c1.onclick = c2.onclick = null;
  } else {
    c1.classList.remove('flipped');
    c2.classList.remove('flipped');
    c1.textContent = c2.textContent = '';
  }
  flipped = [];
  status.textContent = `Matches: ${matched}`;

  if (matched === icons.length) {
    setTimeout(() => alert('🎉 You matched all cards!'), 300);
  }
}

createBoard();
