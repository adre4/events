
(function(){
  const tz = 'America/Denver';
  const now = new Date();
  const updatedEl = document.getElementById('updated');
  const weekendEl = document.getElementById('weekendRange');
  const weekendOnly = document.getElementById('weekendOnly');
  const eventsEl = document.getElementById('events');
  const emptyEl = document.getElementById('empty');
  const searchInput = document.getElementById('search');
  const chips = Array.from(document.querySelectorAll('.chip'));
  let filter = 'all';
  let allEvents = [];

  function getWeekendRange(d=new Date()){
    // Friday 00:00 to Sunday 23:59:59 of current week per America/Denver
    const day = d.getDay(); // 0 Sun ... 6 Sat
    // Friday index = 5; compute diff from today to Friday
    const diffToFriday = (5 - day + 7) % 7;
    const friday = new Date(d);
    friday.setDate(d.getDate() + diffToFriday);
    friday.setHours(0,0,0,0);
    const sunday = new Date(friday);
    sunday.setDate(friday.getDate() + 2);
    sunday.setHours(23,59,59,999);
    return {friday, sunday};
  }

  const {friday, sunday} = getWeekendRange(now);
  weekendEl.textContent = `Showing events for this weekend: ${friday.toLocaleDateString()}–${sunday.toLocaleDateString()} (Montrose time)`;

  function tagify(tags){
    return (tags||[]).map(t => `<span class="tag">#${t}</span>`).join('');
  }

  function render(list){
    eventsEl.innerHTML = '';
    if(!list.length){
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;
    list.forEach(ev => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <h4>${ev.title}</h4>
        <div class="meta">${fmtDate(ev.start)}${ev.end ? ' – ' + fmtTime(ev.end) : ''} • ${ev.venue}</div>
        <p>${ev.description || ''}</p>
        <div class="tags">${tagify(ev.tags)}</div>
        ${ev.link ? `<a class="cta secondary" href="${ev.link}" target="_blank" rel="noopener">Details</a>` : ''}
        ${ev.map ? `<a class="cta secondary" href="${ev.map}" target="_blank" rel="noopener">Map</a>` : ''}
      `;
      eventsEl.appendChild(el);
    });
  }

  function fmtDate(iso){
    const d = new Date(iso);
    return d.toLocaleString('en-US',{month:'short', day:'numeric', weekday:'short', hour:'numeric', minute:'2-digit'});
  }
  function fmtTime(iso){
    const d = new Date(iso);
    return d.toLocaleString('en-US',{hour:'numeric', minute:'2-digit'});
  }

  function withinWeekend(ev){
    const s = new Date(ev.start).getTime();
    const e = new Date(ev.end || ev.start).getTime();
    return !(e < friday.getTime() || s > sunday.getTime());
  }

  function matchesFilter(ev){
    if(filter==='all') return true;
    return (ev.tags||[]).includes(filter);
  }

  function matchesSearch(ev, q){
    if(!q) return true;
    const hay = (ev.title+' '+(ev.description||'')+' '+ev.venue+' '+(ev.tags||[]).join(' ')).toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  function apply(){
    const q = searchInput.value.trim();
    const list = allEvents
      .filter(ev => (!weekendOnly.checked || withinWeekend(ev)))
      .filter(matchesFilter)
      .filter(ev => matchesSearch(ev, q));
    render(list);
  }

  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    filter = chip.dataset.filter;
    apply();
  }));
  weekendOnly.addEventListener('change', apply);
  searchInput.addEventListener('input', apply);

  fetch('events.json')
    .then(r => r.json())
    .then(data => {
      allEvents = data.events || [];
      apply();
    })
    .catch(() => {
      allEvents = [];
      apply();
    });

  updatedEl.textContent = new Date().toLocaleString();

})();
