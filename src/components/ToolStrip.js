export class ToolStrip {
  constructor(el) { this.el = el; this.buttons = new Map(); this._bind(el); }

  _bind(el) {
    el.addEventListener('click', (e) => {
      const btn = e.target.closest('.tool-btn');
      if (btn && btn.dataset.sheet) {
        el.dispatchEvent(new CustomEvent('tool-click', { detail: { sheetId: btn.dataset.sheet }, bubbles: true }));
      }
    });
  }

  init(config) {
    this.el.innerHTML = '';
    config.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'tool-btn';
      btn.dataset.id = c.id;
      if (c.sheetId) btn.dataset.sheet = c.sheetId;
      btn.innerHTML = `<span class="tool-icon">${c.icon}</span><span class="tool-label">${c.label}</span><span class="tool-badge"></span>`;
      this.buttons.set(c.id, btn);
      this.el.appendChild(btn);
    });
  }

  activate(id, badge, pulse) {
    const btn = this.buttons.get(id);
    if (!btn) return;
    btn.classList.add('active');
    if (pulse) btn.classList.add('pulse');
    const b = btn.querySelector('.tool-badge');
    if (b && badge) b.textContent = badge;
  }

  reset() {
    this.buttons.forEach(btn => {
      btn.classList.remove('active', 'pulse');
      const b = btn.querySelector('.tool-badge');
      if (b) b.textContent = '';
    });
  }
}
