fetch('data/games.json') .then(response => response.json()) .then(games => { const gameList = document.getElementById('game-list');

    games.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';
      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}">
        <div class="info">
          <div class="title">${game.title}</div>
          <div class="description">${game.description}</div>
        </div>
      `;
    
    
      card.addEventListener('click', () => {
        window.location.href = `games/${game.id}/index.html`;
      });
    
    
      gameList.appendChild(card);
    });
    
    }) .catch(err => console.error('Failed to load games.json:', err));