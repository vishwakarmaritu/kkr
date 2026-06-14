const playersList = document.getElementById('players-list');
const filterBtns = document.querySelectorAll('.filters .btn');
const darkModeBtn = document.getElementById('dark-mode-btn');
const quizWrapper = document.getElementById('quiz-wrapper');
const searchInput = document.getElementById('player-search');
const hofGrid = document.getElementById('hof-grid');
const timelineBox = document.getElementById('timeline-box');

//squad
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
            <h3 style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--bg-color); margin-bottom: 1.5rem; text-transform: uppercase;">
              ${player.name}
            </h3>
            <div class="stats-container">
              ${statsStr}
            </div>
          </div>

        </div>
      </article>
    `;
    playersList.insertAdjacentHTML('beforeend', card);
  });

  observeCards();
}

if (typeof players !== 'undefined') {
  renderPlayers(players); 
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

//hall of fame
function renderHallOfFame() {
  if (!hofGrid || typeof hallOfFame === 'undefined') return;
  let html = '';
  hallOfFame.forEach(legend => {
    html += `
      <article class="card">
        <div class="card-header">
          <h3 class="player-name">${legend.name.toUpperCase()}</h3>
          <span class="player-role">${legend.role.toUpperCase()}</span>
        </div>
        <div class="card-image-box">
          <img src="${legend.image}" alt="${legend.name}" onerror="this.src='https://placehold.co/300x300/000000/B3A123?text=LEGEND&font=Impact'">
        </div>
        <div style="padding: 1.5rem; border-top: var(--border-size); flex-grow: 1;">
          <strong style="color: var(--primary);">ACHIEVEMENT:</strong><br/> 
          <span style="font-size: 1.1rem; display: block; margin-top: 0.5rem;">${legend.achievements.toUpperCase()}</span>
        </div>
      </article>
    `;
  });
  hofGrid.innerHTML = html;
}
renderHallOfFame();

//timeline
function renderTimeline() {
  if (!timelineBox || typeof milestones === 'undefined') return;
  let html = '';
  milestones.forEach(event => {
    html += `
      <div class="timeline-item">
        <h3 style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--primary);">${event.year} - ${event.title.toUpperCase()}</h3>
        <p style="font-size: 1.2rem; margin-top: 1rem; border-top: 2px dashed var(--text-color); padding-top: 1rem;">${event.details.toUpperCase()}</p>
      </div>
    `;
  });
  timelineBox.innerHTML = html;
}
renderTimeline();

//theme
darkModeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

//quiz
let currentQIndex = 0;
let score = 0;
document.getElementById('start-btn')?.addEventListener('click', loadNextQuestion);
function loadNextQuestion() {
  if (typeof quizQuestions === 'undefined') return;
  if (currentQIndex >= quizQuestions.length) {
    showFinalScore();
    return;
  }
  const q = quizQuestions[currentQIndex];
  let html = `<h3 class="quiz-question">${q.question.toUpperCase()}</h3><div class="quiz-options">`;
  q.options.forEach(opt => {
    html += `<button class="btn quiz-opt-btn" onclick="checkAnswer('${opt}', '${q.answer}')">${opt.toUpperCase()}</button>`;
  });
  html += `</div>`;
  quizWrapper.innerHTML = html;
}

window.checkAnswer = function(selected, correct) {
  if (selected.toUpperCase() === correct.toUpperCase()) score++;
  currentQIndex++;
  loadNextQuestion();
}

function showFinalScore() {
  quizWrapper.innerHTML = `
    <h3 style="font-family: var(--font-body); font-size: 2.5rem; margin-bottom: 2rem; color: var(--primary);">QUIZ COMPLETE</h3>
    
    <div style="display: inline-block; margin-bottom: 3rem;">
      <p style="font-family: var(--font-heading); font-size: 6rem; line-height: 1; color: var(--secondary); -webkit-text-stroke: 3px var(--text-color); text-shadow: 6px 6px 0px var(--text-color); margin-bottom: 0.5rem;">
        ${score} / ${quizQuestions.length}
      </p>
      <p style="font-family: var(--font-heading); font-size: 1.5rem; letter-spacing: 2px;">SCORE</p>
    </div>
    
    <br>
    <button class="btn alt-btn" onclick="location.reload()">PLAY AGAIN</button>
  `;
}

//csv
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