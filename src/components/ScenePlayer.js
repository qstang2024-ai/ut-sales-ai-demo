export class ScenePlayer {
  constructor({ chatBody, typingRow, recArea, recBody, overlay, toolStrip, backend }) {
    this.chatBody = chatBody;
    this.typingRow = typingRow;
    this.recArea = recArea;
    this.recBody = recBody;
    this.overlay = overlay;
    this.toolStrip = toolStrip;
    this.backend = backend;
    this.steps = [];
    this.index = 0;
    this.timers = [];
    this.playing = false;
    this.pendingRec = null;
  }

  load(steps) { this.steps = steps; }

  play() {
    this.reset();
    this.playing = true;
    this.process();
  }

  reset() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.index = 0;
    this.playing = false;
    this.pendingRec = null;
    this.chatBody.innerHTML = '';
    this.typingRow.classList.remove('show');
    if (this.recArea) this.recArea.classList.remove('show');
    if (this.recBody) this.recBody.textContent = '';
    if (this.overlay) this.overlay.close();
    if (this.toolStrip) this.toolStrip.reset();
    if (this.backend) this.backend.reset();
  }

  process() {
    if (this.index >= this.steps.length) { this.playing = false; return; }
    const step = this.steps[this.index];
    if (step.wait) return;
    this.timers.push(setTimeout(() => {
      this.exec(step);
      this.index++;
      this.process();
    }, step.delay || 600));
  }

  exec(step) {
    switch (step.type) {
      case 'time': this._add('time-sep', `<span>${step.text}</span>`); break;
      case 'customer': this._addMsg('customer', step.text); break;
      case 'sales': this._addMsg('sales', step.text); break;
      case 'typing': this._typing(step.duration || 1000); break;
      case 'tool': if (this.toolStrip) this.toolStrip.activate(step.id, step.badge, step.pulse); break;
      case 'sheet': if (this.overlay) this.overlay.open(step.sheetId); break;
      case 'rec_show':
        if (this.recBody) this.recBody.textContent = step.text;
        if (this.recArea) this.recArea.classList.add('show');
        this.pendingRec = step.text;
        break;
      case 'rec_send':
        if (this.pendingRec) { this._addMsg('sales', this.pendingRec); this.pendingRec = null; }
        if (this.recArea) this.recArea.classList.remove('show');
        if (this.recBody) this.recBody.textContent = '';
        break;
      case 'close_sheet': if (this.overlay) this.overlay.close(); break;
    }
    if (step.updates) step.updates.forEach(fn => fn());
    if (step.backend && this.backend) {
      step.backend.forEach(u => {
        try {
          switch (u.type) {
            case 'activate': this.backend.activateCard(u.cardId, u.accent || ''); break;
            case 'highlight': this.backend.highlight(u.cardId); break;
            case 'progress': this.backend.updateProgress(u.progressId, u.pct); break;
            case 'field': this.backend.updateField(u.elId, u.text); break;
            case 'badge': this.backend.updateField(u.elId, u.text); break;
            case 'chip': this.backend.updateChip(u.stage); break;
            case 'check': this.backend.checkDone(u.listId, u.indices); break;
            case 'knowledge': this.backend.updateKnowledge(u.cards); break;
          }
        } catch(e) { /* ignore */ }
      });
    }
  }

  _add(className, html) {
    const el = document.createElement('div');
    el.className = className;
    el.innerHTML = html;
    this.chatBody.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    this._scroll();
  }

  _addMsg(role, text) {
    const el = document.createElement('div');
    el.className = 'msg ' + role;
    el.innerHTML = `<div class="bubble">${text}</div>`;
    this.chatBody.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    this._scroll();
  }

  _typing(dur) {
    this.typingRow.classList.add('show');
    this._scroll();
    this.timers.push(setTimeout(() => this.typingRow.classList.remove('show'), dur));
  }

  _scroll() { if (this.chatBody) this.chatBody.scrollTop = this.chatBody.scrollHeight; }
}
