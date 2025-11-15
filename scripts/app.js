const data = window.oracleData;

function renderLeaderboard() {
  const table = document.getElementById('leaderboard-table');
  const header = document.createElement('div');
  header.className = 'table-row header';
  header.innerHTML = '<span>#</span><span>Player</span><span>Role</span><span>MMR</span><span>Win %</span>';
  table.appendChild(header);

  data.leaderboard.forEach((entry) => {
    const row = document.createElement('div');
    row.className = 'table-row';
    row.innerHTML = `
      <span class="rank-chip">${entry.rank}</span>
      <span>${entry.player}</span>
      <span>${entry.role}</span>
      <span>${entry.mmr}</span>
      <span>${entry.wr}</span>
    `;
    table.appendChild(row);
  });
}

function renderGods() {
  const grid = document.getElementById('god-grid');
  data.gods.forEach((god) => {
    const card = document.createElement('div');
    card.className = 'god-card';
    const buildList = god.build.map((item) => `<li>${item}</li>`).join('');
    card.innerHTML = `
      <p class="tag">${god.tier}</p>
      <h3>${god.name}</h3>
      <p>Win rate ${god.winRate} • Pick rate ${god.pickRate}</p>
      <h4>Popular Build</h4>
      <ul>${buildList}</ul>
    `;
    grid.appendChild(card);
  });
}

function renderMatches() {
  const feed = document.getElementById('match-feed');
  data.matches.forEach((match) => {
    const card = document.createElement('div');
    const isWin = match.result === 'Victory';
    card.className = `match-card ${isWin ? 'win' : 'loss'}`;
    card.innerHTML = `
      <div>
        <p class="result">${match.result}</p>
        <p>${match.mode}</p>
      </div>
      <div>
        <p class="teams">${match.teams}</p>
        <p>MVP: ${match.mvp}</p>
      </div>
      <div class="meta">
        <p>${match.duration}</p>
        <p>KDA ${match.kda}</p>
      </div>
    `;
    feed.appendChild(card);
  });
}

function renderNews() {
  const grid = document.getElementById('news-grid');
  data.news.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <p class="tag">${item.time}</p>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    `;
    grid.appendChild(card);
  });
}

function renderStatus() {
  const grid = document.getElementById('status-grid');
  data.status.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'status-card';
    const stateClass = item.state.toLowerCase().replace(/\s+/g, '-');
    card.innerHTML = `
      <div class="status-card-head">
        <h4>${item.name}</h4>
        <span class="status-pill ${stateClass}">${item.state}</span>
      </div>
      <p>${item.detail}</p>
      <p class="status-updated">${item.updated}</p>
    `;
    grid.appendChild(card);
  });
}

function renderRoadmap() {
  const grid = document.getElementById('roadmap-grid');
  data.roadmap.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'roadmap-card';
    card.innerHTML = `
      <div class="roadmap-phase">${item.phase}</div>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
      <p class="status">${item.status}</p>
    `;
    grid.appendChild(card);
  });
}

function renderToolkit() {
  const grid = document.getElementById('toolkit-grid');
  data.toolkit.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'toolkit-card';
    const taskList = item.tasks.map((task) => `<li>${task}</li>`).join('');
    const statusClass = item.status.toLowerCase();
    card.innerHTML = `
      <div class="toolkit-head">
        <h4>${item.title}</h4>
        <span class="status-pill ${statusClass}">${item.status}</span>
      </div>
      <p>${item.description}</p>
      <h5>Includes</h5>
      <ul>${taskList}</ul>
    `;
    grid.appendChild(card);
  });
}

function renderOnboarding() {
  const list = document.getElementById('onboarding-list');
  data.onboarding.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="step">${item.step}</span>
      <div>
        <h4>${item.title}</h4>
        <p>${item.detail}</p>
      </div>
    `;
    list.appendChild(li);
  });
}

function renderFaq() {
  const grid = document.getElementById('faq-grid');
  data.faqs.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'faq-card';
    card.innerHTML = `
      <h4>${item.question}</h4>
      <p>${item.answer}</p>
    `;
    grid.appendChild(card);
  });
}

function renderPlayerCard(player) {
  const container = document.getElementById('player-card');
  if (!player) {
    container.innerHTML = '<p class="hint">Try searching for NexusTitan, AuroraForge, or WardenPrime.</p>';
    return;
  }

  container.innerHTML = `
    <p class="tag">${player.title}</p>
    <h3>${player.name}</h3>
    <p>Featured God: ${player.favoriteGod}</p>
    <div class="stat-grid">
      <div class="stat-block"><strong>${player.mmr}</strong><span>MMR</span></div>
      <div class="stat-block"><strong>${player.winRate}%</strong><span>Win Rate</span></div>
      <div class="stat-block"><strong>${player.kda}</strong><span>KDA</span></div>
      <div class="stat-block"><strong>${player.damage.toLocaleString()}</strong><span>Avg Damage</span></div>
      <div class="stat-block"><strong>${player.goldPerMin}</strong><span>Gold / Min</span></div>
    </div>
  `;
}

function bindSearch() {
  const form = document.getElementById('player-search');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('player')?.trim().toLowerCase();
    const player = data.players.find((p) => p.name.toLowerCase() === name);
    renderPlayerCard(player);
  });
}

function bindSignup() {
  const form = document.getElementById('signup-form');
  const status = document.getElementById('community-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name') || 'friend';
    const focus = formData.get('focus') || 'your priorities';
    const focusLabel = focus.replace('-', ' ');
    status.textContent = `Welcome, ${name}! We will send toolkit drops tailored to ${focusLabel}.`;
    form.reset();
  });
}

function init() {
  renderLeaderboard();
  renderGods();
  renderMatches();
  renderNews();
  renderStatus();
  renderRoadmap();
  renderToolkit();
  renderOnboarding();
  renderFaq();
  renderPlayerCard();
  bindSearch();
  bindSignup();
}

document.addEventListener('DOMContentLoaded', init);
