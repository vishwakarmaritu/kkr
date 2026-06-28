//dom

const playersList = document.getElementById('players-list');
const filterBtns = document.querySelectorAll('.filters .btn');
const darkModeBtn = document.getElementById('dark-mode-btn');
const quizWrapper = document.getElementById('quiz-wrapper');
const searchInput = document.getElementById('player-search');
const hofGrid = document.getElementById('hof-grid');
const timelineBox = document.getElementById('timeline-box');

//theme

darkModeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  setTimeout(renderCharts, 50);
});

//roster 2026

function renderPlayers(data) {
  if (!playersList) return;

  playersList.innerHTML = ''; 
  
  if (data.length === 0) {
    playersList.innerHTML = '<article class="loading-msg massive-text" style="grid-column: 1 / -1; text-align: center;">NO RECORDS FOUND.</article>';
    return;
  }

  data.forEach(player => {
    let statsStr = '';
    if (player.stats) {
      for (const [key, value] of Object.entries(player.stats)) {
        statsStr += `<div class="stat-row"><span>${key.toUpperCase()}</span><span>${value}</span></div>`;
      }
    }
    const card = `
      <article class="card" onclick="this.classList.toggle('flipped')">
        <div class="card-inner">
          
          <div class="card-front">
            <div class="card-header">
              <h3 class="player-name">${player.name.toUpperCase()}</h3>
              <span class="player-role">${player.role.toUpperCase()}</span>
            </div>
            <div class="card-image-box">
              <img src="${player.image}" alt="${player.name}" onerror="this.src='https://placehold.co/300x300/000000/B3A123?text=NO+IMAGE&font=Impact'">
            </div>
          </div>

          <div class="card-back">
            <div class="attax-header">
              <div class="attax-name">${player.name}</div>
              <div class="attax-role-nat">${player.role} // ${player.nationality}</div>
            </div>
      
            <div class="attax-bio">
              ${player.bio}
            </div>

            <div class="attax-stats-grid">
              ${Object.entries(player.stats).map(([label, value]) => `
                <div class="attax-stat-row">
                  <div class="attax-label">${label.toUpperCase()}</div>
                  <div class="attax-value">${value}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </article>
    `;
    playersList.insertAdjacentHTML('beforeend', card);
  });

  observeCards();
}

function loadDynamicRoster() {
  fetch('/api/players')
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(serverPlayers => {
      window.players = serverPlayers; 
      renderPlayers(serverPlayers);
    })
    .catch(err => {
      console.error("Could not fetch the squad registry from backend server:", err);
      if (playersList) {
        playersList.innerHTML = '<article class="loading-msg massive-text" style="grid-column: 1 / -1; text-align: center;">SERVER ERROR: DISCONNECTED.</article>';
      }
    });
}

document.addEventListener('DOMContentLoaded', loadDynamicRoster);

//scroll

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.1 });

function observeCards() {
  setTimeout(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => scrollObserver.observe(card));
  }, 100);
}

//search

searchInput?.addEventListener('input', (e) => {
  const term = e.target.value.toUpperCase();
  filterBtns.forEach(b => b.classList.remove('active'));
  document.querySelector('[data-filter="ALL"]')?.classList.add('active');
  const filtered = players.filter(p => p.name.toUpperCase().includes(term));
  renderPlayers(filtered);
});

//filter

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (searchInput) searchInput.value = '';
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.getAttribute('data-filter');
    if (filter === 'ALL') {
      renderPlayers(players); 
    } else if (filter === 'BATTER_WK') {
      const filtered = players.filter(p => 
        p.role.toUpperCase().includes('BATTER') || 
        p.role.toUpperCase().includes('WICKET-KEEPER')
      );
      renderPlayers(filtered);
    } else {
      const filtered = players.filter(p => p.role.toUpperCase().includes(filter));
      renderPlayers(filtered); 
    }
  });
});

// export data (.csv)

document.getElementById('download-csv')?.addEventListener('click', () => {
  if (typeof players === 'undefined') return;
  let csv = "data:text/csv;charset=utf-8,NAME,ROLE\n";
  
  players.forEach(p => {
    csv += `"${p.name}","${p.role}"\n`;
  });
  
  const encodedUri = encodeURI(csv);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "kkr_roster_2026.csv");
  document.body.appendChild(link); 
  link.click();
  link.remove();
});

//all time leaders

let runsChart, wicketsChart, sixesChart;

function renderCharts() {
  const rootStyles = getComputedStyle(document.body);
  const textColor = rootStyles.getPropertyValue('--text-color').trim() || '#000000';
  const bgColor = rootStyles.getPropertyValue('--bg-color').trim() || '#f4f4f0';
  const primaryColor = rootStyles.getPropertyValue('--primary').trim() || '#3A225D';
  const secondaryColor = rootStyles.getPropertyValue('--secondary').trim() || '#B3A123';

  Chart.defaults.font.family = "'Courier New', monospace";
  Chart.defaults.color = textColor;
  Chart.defaults.scale.grid.color = textColor + '20'; 

  if (runsChart) runsChart.destroy();
  if (wicketsChart) wicketsChart.destroy();
  if (sixesChart) sixesChart.destroy();

  const runsCtx = document.getElementById('runsChart');
  if (runsCtx) {
    runsChart = new Chart(runsCtx, {
      type: 'bar',
      data: {
        labels: ['GAMBHIR', 'UTHAPPA', 'RUSSELL', 'RANA', 'NARINE'],
        datasets: [{
          label: 'ALL-TIME RUNS',
          data: [3035, 2439, 2326, 2019, 1534],
          backgroundColor: primaryColor, 
          borderColor: textColor, 
          borderWidth: 4, 
          borderRadius: 0
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'MOST RUNS', font: { family: "'Impact', sans-serif", size: 24 } },
          legend: { display: false }
        }
      }
    });
  }

  const wicketsCtx = document.getElementById('wicketsChart');
  if (wicketsCtx) {
    wicketsChart = new Chart(wicketsCtx, {
      type: 'doughnut',
      data: {
        labels: ['NARINE', 'RUSSELL', 'CHAKARAVARTHY', 'CHAWLA', 'YADAV'],
        datasets: [{
          data: [180, 105, 84, 66, 48],
          backgroundColor: [primaryColor, secondaryColor, textColor, '#555555', '#999999'],
          borderColor: bgColor, 
          borderWidth: 4
        }]
      },
      options: {
        maintainAspectRatio: false,
        cutout: '60%', 
        plugins: {
          title: { display: true, text: 'MOST WICKETS', font: { family: "'Impact', sans-serif", size: 24 } }
        }
      }
    });
  }

  const sixesCtx = document.getElementById('sixesChart');
  if (sixesCtx) {
    sixesChart = new Chart(sixesCtx, {
      type: 'bar',
      data: {
        labels: ['RUSSELL', 'RANA', 'NARINE', 'UTHAPPA', 'Y. PATHAN'],
        datasets: [{
          label: 'ALL-TIME SIXES',
          data: [203, 106, 94, 85, 85],
          backgroundColor: secondaryColor,
          borderColor: textColor,
          borderWidth: 4,
          borderRadius: 0
        }]
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: 'y', 
        plugins: {
          title: { display: true, text: 'MOST SIXES', font: { family: "'Impact', sans-serif", size: 24 } },
          legend: { display: false }
        }
      }
    });
  }
}
document.addEventListener('DOMContentLoaded', renderCharts);

//hall of fame

function renderHallOfFame() {
  if (!hofGrid || typeof hallOfFame === 'undefined') return;
  
  const hofHTML = hallOfFame.map(legend => `
    <article class="hof-card">
      <div class="card-header">
        <h3 class="player-name">${legend.name.toUpperCase()}</h3>
        <span class="player-role">${legend.role.toUpperCase()}</span>
      </div>
      
      <div class="card-image-box">
        <img src="${legend.image}" alt="${legend.name}" onerror="this.src='https://placehold.co/300x300/000000/B3A123?text=LEGEND&font=Impact'">
      </div>

      <div class="hof-content">
        <p class="hof-desc">${legend.description}</p>
        
        <div class="hof-achievement">
          <span class="highlight-label">ACHIEVEMENT:</span>
          <p>${legend.achievements}</p>
        </div>

        <div class="hof-stats-grid">
          ${Object.entries(legend.stats || {}).map(([label, value]) => `
            <div class="hof-stat-box">
              <div class="hof-stat-label">${label.toUpperCase()}</div>
              <div class="hof-stat-value">${value}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </article>
  `).join('');

  hofGrid.innerHTML = hofHTML;
}
renderHallOfFame();

//greatest victories

function renderTimeline() {
  const box = document.getElementById('timeline-box');
  
  if (!box) {
    console.error("Timeline Box missing! Check your HTML ID.");
    return;
  }
  if (typeof milestones === 'undefined') {
    console.error("Milestones data missing! Check your data.js file.");
    return;
  }

  let html = '';
  
  milestones.forEach(event => {
    html += `
      <div class="timeline-wrapper">
        <div class="timeline-node"></div>
        <article class="timeline-card" onclick="this.classList.toggle('expanded')">
          
          <div class="timeline-always-visible">
            <div class="timeline-year-title">
              <span class="timeline-year">${event.year}</span>
              <h3 class="timeline-title">${event.title.toUpperCase()}</h3>
            </div>
            <div class="timeline-opponent">VS ${event.opponent.toUpperCase()}</div>
            <div class="expand-icon">+</div>
          </div>

          <div class="timeline-expandable">
            <p class="timeline-summary">${event.summary.toUpperCase()}</p>
            
            <div class="timeline-data-grid">
              <div class="timeline-data-box">
                <div class="timeline-label">KEY PERFOARMERS</div>
                <div class="timeline-value">${event.performers.toUpperCase()}</div>
              </div>
              <div class="timeline-data-box">
                <div class="timeline-label">MATCH STATS</div>
                <div class="timeline-value">${event.stats.toUpperCase()}</div>
              </div>
            </div>

            <a href="${event.link}" target="_blank" class="btn alt-btn timeline-btn" onclick="event.stopPropagation()">WATCH HIGHLIGHTS</a>
          </div>

        </article>
      </div>
    `;
  });
  
  box.innerHTML = html;
}
document.addEventListener('DOMContentLoaded', renderTimeline);

//franchise records

function renderRecords() {
  const grid = document.getElementById('records-grid');
  if (!grid || typeof teamRecords === 'undefined') return;

  const html = teamRecords.map(record => `
    <article class="record-card">
      <div class="record-label">${record.label}</div>
      <div class="record-value">${record.value}</div>
      <div class="record-player">${record.player}</div>
      <div class="record-detail">${record.detail}</div>
    </article>
  `).join('');

  grid.innerHTML = html;
}
document.addEventListener('DOMContentLoaded', renderRecords);


//quiz

let quizData = [];
let currentQIndex = 0;
let userScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/quiz')
    .then(res => res.json())
    .then(data => {
      quizData = data;
    });
    
  fetchLeaderboard();
});

window.startQuiz = function() {
  currentQIndex = 0;
  userScore = 0;
  renderQuiz();
}

function renderQuiz() {
  const quizBox = document.getElementById('quiz-wrapper');
  
  if (currentQIndex >= quizData.length) {
    quizBox.innerHTML = `
      <div class="quiz-question">QUIZ COMPLETE! SCORE: ${userScore}/${quizData.length}</div>
      <div style="max-width: 400px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" id="fan-name" placeholder="ENTER YOUR NAME" style="padding: 1rem; font-family: var(--font-heading); font-size: 1.2rem; border: 4px solid var(--text-color); text-align: center; text-transform: uppercase;">
        <button class="btn alt-btn" onclick="submitScore()" style="width: 100%; font-size: 1.5rem;">SUBMIT SCORE</button>
      </div>
    `;
    return;
  }

  const q = quizData[currentQIndex];
  
  let optionsHtml = q.options.map(opt => `
    <button class="quiz-opt-btn" onclick="checkAnswer('${opt}', '${q.correctAnswer}')">${opt}</button>
  `).join('');

  quizBox.innerHTML = `
    <div class="quiz-question">${q.question.toUpperCase()}</div>
    <div class="quiz-options">
      ${optionsHtml}
    </div>
  `;
}

window.checkAnswer = function(selected, correct) {
  if (selected === correct) {
    userScore++;
  }
  currentQIndex++;
  renderQuiz();
};

window.submitScore = function() {
  const nameInput = document.getElementById('fan-name').value.trim() || 'ANONYMOUS FAN';
  
  fetch('/api/leaderboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: nameInput, score: userScore })
  })
  .then(res => res.json())
  .then(updatedLeaderboard => {
    document.getElementById('quiz-wrapper').innerHTML = `<div class="quiz-question">SCORE SECURED ON THE SERVER.</div>`;
    renderLeaderboard(updatedLeaderboard); 
  });
};

function fetchLeaderboard() {
  fetch('/api/leaderboard')
    .then(res => res.json())
    .then(data => renderLeaderboard(data));
}

function renderLeaderboard(boardData) {
  const list = document.getElementById('leaderboard-list');
  
  if (boardData.length === 0) {
    list.innerHTML = '<div style="text-align: center; padding: 2rem; font-family: var(--font-heading);">NO SCORES LOGGED YET.</div>';
    return;
  }

  list.innerHTML = boardData.map((entry, index) => `
    <div class="leaderboard-row">
      <span class="rank">#${index + 1}</span>
      <span class="name">${entry.username}</span>
      <span class="score">${entry.score} PTS</span>
    </div>
  `).join('');
}