/* main.js — interactions for the dark site
   - smooth nav highlight
   - modal details for events
   - simple hero particle animation (canvas)
   - scroll reveal
*/

// ---------- Smooth nav active state ----------
document.querySelectorAll('.nav-link').forEach(a=>{
  a.addEventListener('click', e=>{
    document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
  });
});

// ---------- Modal for event details ----------
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function openEventModal(key){
  // Prefer coordinator info from DOM (.coords) so names can be edited directly in HTML.
  let coordText = null;
  const btn = document.querySelector(`[data-event="${key}"]`);
  if(btn){
    const card = btn.closest('.event-card');
    if(card){
      const coordsEl = card.querySelector('.coords');
      if(coordsEl) coordText = coordsEl.textContent.replace(/^Coordinators:\s*/i, '');
    }
  }

  const ev = EVENTS[key];
  if(!ev && !coordText){
    modalContent.innerHTML = `<p>Event details not available.</p>`;
    modal.setAttribute('aria-hidden','false');
    return;
  }

  let html = `<h2>${ev ? ev.name : key}</h2>`;
  if(ev && ev.desc) html += `<p>${ev.desc}</p>`;
  if(coordText){
    html += `<p><strong>Coordinators:</strong> ${coordText}</p>`;
  } else if(ev && ev.coords && ev.coords.length){
    html += `<p><strong>Coordinators:</strong> ${ev.coords.join(', ')}</p>`;
  }
  if(ev && ev.rounds && ev.rounds.length){ html += '<h4>Rounds</h4><ul>' + ev.rounds.map(r=>`<li>${r}</li>`).join('') + '</ul>'; }
  if(ev && ev.rules && ev.rules.length){ html += '<h4>Rules</h4><ul>' + ev.rules.map(r=>`<li>${r}</li>`).join('') + '</ul>'; }
  modalContent.innerHTML = html;
  modal.setAttribute('aria-hidden','false');
}

document.querySelectorAll('.btn-outline').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const key = btn.getAttribute('data-event');
    openEventModal(key);
  });
});

if(modalClose){
  modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
}
modal.addEventListener('click', (e)=> { if(e.target === modal) modal.setAttribute('aria-hidden','true'); });

// ---------- EVENTS (only AI & DS events) ----------
const EVENTS = {
  idea_sphere: {
    id: 'idea_sphere',
    name: 'Idea Sphere (Paper Presentation)',
    date: '31 Oct 2025',
    desc: 'Paper presentation focused on AI & Data Science concepts and applications.',
    rounds: ['Abstract submission', 'Presentation', 'Q&A'],
    rules: ['Single author or team of up to 3', 'Time limit 8 minutes'],
  coords: ['B. Kalpana ', 'GoudShubam - 8121319817']
  },
  neuro_nexus: {
    id: 'neuro_nexus',
    name: 'Neuro Nexus (Technical Quiz)',
    date: '31 Oct 2025',
    desc: 'Technical quiz covering AI fundamentals and data science reasoning.',
    rounds: ['Prelims', 'Semi-finals', 'Final'],
    rules: ['No electronic devices', 'Teams up to 3'],
  coords: ['D. Revathi', 'Kishore R.P - 9629885918']
  },
  promptopia: {
    id: 'promptopia',
    name: 'Promptopia (Prompt Prototype)',
    date: '31 Oct 2025',
    desc: 'Prototype demonstration of prompt-engineering based applications.',
    rounds: ['Submission', 'Demo', 'Judging'],
    rules: ['Submissions must include demo and description', 'Use only public data'],
  coords: ['R. Poojitha', 'Rithik Raja.t - 6379772014']
  },
  dust2data: {
    id: 'dust2data',
    name: 'Dust2Data (Data Analysis)',
    date: '31 Oct 2025',
    desc: 'Data analysis challenge: derive insights from provided datasets.',
    rounds: ['Exploratory', 'Modeling', 'Presentation'],
    rules: ['Work offline on local machine', 'Cite libraries used'],
  coords: ['Subhashree.S.P', 'Dhanush.G - 8825829576']
  },
  aldea: {
    id: 'aldea',
    name: 'Aldea (Idea Pitching)',
    date: '31 Oct 2025',
    desc: 'Short idea pitching session for innovative AI & DS project ideas.',
    rounds: ['Pitch', 'Q&A'],
    rules: ['Time limit 5 minutes', 'Slides optional'],
  coords: ['M. Janani ', 'Darshan.S - 9498383367']
  }
};

function initDetailsPage(){
  const select = document.getElementById('event-select');
  const card = document.getElementById('event-card');
  if(!select || !card) return; // not on details page

  // populate select options
  Object.values(EVENTS).forEach(ev=>{
    const opt = document.createElement('option');
    opt.value = ev.id;
    opt.textContent = ev.name;
    select.appendChild(opt);
  });

  select.addEventListener('change', ()=>{
    const key = select.value;
    if(!key || !EVENTS[key]){ card.classList.add('hidden'); return; }
    const ev = EVENTS[key];
    document.getElementById('ev-name').textContent = ev.name;
    document.getElementById('ev-date').textContent = ev.date;
    document.getElementById('ev-desc').textContent = ev.desc;

    const roundsEl = document.getElementById('ev-rounds');
    roundsEl.innerHTML = '';
    ev.rounds.forEach(r=>{ const d = document.createElement('div'); d.textContent = '• ' + r; roundsEl.appendChild(d); });

    const rulesEl = document.getElementById('ev-rules');
    rulesEl.innerHTML = '';
    ev.rules.forEach(r=>{ const li = document.createElement('li'); li.textContent = r; rulesEl.appendChild(li); });

    const coordsEl = document.getElementById('ev-coords');
    coordsEl.innerHTML = ev.coords.join(', ');

    const actions = document.getElementById('ev-actions');
    actions.innerHTML = `<a class="btn cyan" href="https://forms.gle/kSPt7uKMTYJ7cwN88" target="_blank">Register</a> <button class="btn-outline" data-event="${ev.id}">Quick Details</button>`;

    // attach detail-modal handler for the quick button
    const quickBtn = actions.querySelector('.btn-outline');
    if(quickBtn) quickBtn.addEventListener('click', ()=> openEventModal(ev.id));
    
    // Update register button to Google Form
    const registerBtn = actions.querySelector('.btn.cyan');
    if(registerBtn) {
      registerBtn.href = 'https://forms.gle/kSPt7uKMTYJ7cwN88';
      registerBtn.target = '_blank';
    }

    card.classList.remove('hidden');
  });
}

// initialize details page on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initDetailsPage);

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.glass, .event-card, .card');
const obs = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'opacity .7s ease, transform .7s ease';
    } else {
      entry.target.style.opacity = 0;
      entry.target.style.transform = 'translateY(20px)';
    }
  });
}, {threshold: 0.15});

revealEls.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  obs.observe(el);
});

// ---------- Small hero canvas particle wave ----------
(function heroCanvas(){
  const canvas = document.getElementById('heroCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = Math.max(500, window.innerHeight * 0.6);
  const particles = [];
  const count = Math.floor(w/60);

  function rand(min,max){ return Math.random()*(max-min)+min; }
  for(let i=0;i<count;i++){
    particles.push({
      x: rand(0,w),
      y: rand(0,h),
      r: rand(0.6,2.2),
      vx: rand(-0.25,0.25),
      vy: rand(-0.3,0.3),
      hue: rand(180,260)
    });
  }

  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = Math.max(500, window.innerHeight * 0.6); }

  window.addEventListener('resize', resize);

  let t=0;
  function draw(){
    t+=0.01;
    ctx.clearRect(0,0,w,h);
    // subtle gradient background effect (already via CSS overlay)
    particles.forEach(p=>{
      p.x += p.vx + Math.sin(t+p.x*0.001)*0.2;
      p.y += Math.sin(t+p.y*0.001)*0.2 + p.vy;
      if(p.x < -10) p.x = w+10;
      if(p.x > w+10) p.x = -10;
      if(p.y < -10) p.y = h+10;
      if(p.y > h+10) p.y = -10;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, 0.08)`;
      ctx.arc(p.x, p.y, p.r*6, 0, Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// Mobile sliding navigation
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.mobile-nav-overlay');
let touchStartX = 0;
let touchEndX = 0;

function toggleMenu(show) {
  mobileMenuBtn?.classList.toggle('active', show);
  nav?.classList.toggle('active', show);
  overlay?.setAttribute('aria-hidden', show ? 'false' : 'true');
  document.body.style.overflow = show ? 'hidden' : '';
}

// Click handlers
mobileMenuBtn?.addEventListener('click', () => {
  const isOpen = nav?.classList.contains('active');
  toggleMenu(!isOpen);
});

overlay?.addEventListener('click', () => toggleMenu(false));

// Touch gesture handlers
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const swipeDistance = touchEndX - touchStartX;
  const isOpen = nav?.classList.contains('active');
  
  // Open on right swipe, close on left swipe
  if (Math.abs(swipeDistance) > 50) { // minimum swipe distance
    if (swipeDistance > 0 && !isOpen) { // right swipe when closed
      toggleMenu(true);
    } else if (swipeDistance < 0 && isOpen) { // left swipe when open
      toggleMenu(false);
    }
  }
}

// Close menu when clicking a nav link
nav?.addEventListener('click', e => {
  if (e.target.classList.contains('nav-link')) {
    toggleMenu(false);
  }
});

console.log("INFINITE TECHFEST'25 — scripts loaded");

// ---------- Image / poster modal helper ----------
function openImageModal(src, alt){
  if(!modal || !modalContent) return;
  const safeAlt = alt || 'Image';
  modalContent.innerHTML = `<div style="text-align:center"><img src="${src}" alt="${safeAlt}" class="modal-img" style="max-width:100%;height:auto;border-radius:8px;" /></div>`;
  modal.setAttribute('aria-hidden','false');
}

// Attach handlers for elements that declare data-image="path"
document.querySelectorAll('[data-image]').forEach(el=>{
  el.addEventListener('click', ()=>{
    const src = el.getAttribute('data-image');
    const alt = el.getAttribute('data-alt') || '';
    if(src) openImageModal(src, alt);
  });
});
