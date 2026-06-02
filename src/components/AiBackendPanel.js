export class AiBackendPanel {
  constructor(el) { this.el = el; }

  reset() {
    this.el.querySelectorAll('.insight').forEach(c => c.classList.remove('active', 'highlight'));
    this.el.querySelectorAll('.progress-fill').forEach(p => p.style.width = '');
    this.el.querySelectorAll('.stage-chip').forEach(c => { c.className = 'stage-chip'; });
    this.el.querySelectorAll('.checks li').forEach(li => { li.classList.remove('done'); li.classList.add('todo'); });
  }

  activateCard(cardId, accent) {
    const card = this.el.querySelector('#' + cardId);
    if (!card) return;
    card.classList.add('active');
    if (accent) card.classList.add(accent);
  }

  highlight(cardId) {
    const card = this.el.querySelector('#' + cardId);
    if (!card) return;
    card.classList.remove('highlight'); void card.offsetWidth; card.classList.add('highlight');
  }

  updateField(elId, text) {
    const el = this.el.querySelector('#' + elId);
    if (el) el.textContent = text;
  }

  updateProgress(progressId, pct) {
    const el = this.el.querySelector('#' + progressId);
    if (el) el.style.width = pct + '%';
  }

  updateChip(stageName) {
    const chips = this.el.querySelectorAll('.stage-chip[data-stage]');
    const stages = ['P1','P2','P3','P4','P5','P6','P7'];
    const ti = stages.indexOf(stageName);
    chips.forEach(c => {
      const ds = c.dataset.stage;
      const idx = stages.indexOf(ds);
      c.className = 'stage-chip';
      if (idx < ti) c.classList.add('done');
      else if (idx === ti) c.classList.add('on');
    });
  }

  checkDone(listId, indices) {
    const list = this.el.querySelector('#' + listId);
    if (!list) return;
    const items = list.querySelectorAll('li');
    indices.forEach(i => { if (items[i]) { items[i].classList.remove('todo'); items[i].classList.add('done'); }});
  }

  updateKnowledge(cards) {
    const grid = this.el.querySelector('#card-knowledge-grid');
    if (!grid) return;
    grid.innerHTML = cards.map(c => `<div class="mini-card"><strong>${c.title}</strong>${c.body}</div>`).join('');
  }
}
