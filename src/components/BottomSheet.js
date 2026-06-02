export class OverlayManager {
  constructor(backdrop, sheet, content) {
    this.backdrop = backdrop;
    this.sheet = sheet;
    this.content = content;
    this.sheets = {};
    this._bind();
  }

  _bind() {
    this.backdrop.addEventListener('click', () => this.close());
    const closeBtn = this.sheet.querySelector('.sheet-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    this.sheet.addEventListener('click', (e) => {
      if (e.target.dataset.action) {
        this.sheet.dispatchEvent(new CustomEvent('sheet-action', { detail: { action: e.target.dataset.action }, bubbles: true }));
      }
    });
  }

  register(id, renderFn) { this.sheets[id] = renderFn; }

  open(id) {
    const render = this.sheets[id];
    if (!render) return;
    this.content.innerHTML = render();
    this.backdrop.classList.add('show');
    this.sheet.classList.add('show');
  }

  close() {
    this.backdrop.classList.remove('show');
    this.sheet.classList.remove('show');
  }
}

export function sheetTpl(title, subtitle, fields, actions, extras) {
  let html = `<h3>${title}</h3><p class="sheet-sub">${subtitle}</p>`;
  if (fields && fields.length) {
    html += '<div class="sheet-card"><div class="sheet-kv">';
    fields.forEach(f => html += `<span class="sk">${f.key}</span><span class="sv">${f.value}</span>`);
    html += '</div>';
    if (extras && extras.progress !== undefined) html += `<div class="progress-bar" style="margin-top:8px"><span class="progress-fill" style="width:${extras.progress}%"></span></div>`;
    html += '</div>';
  }
  if (extras && extras.checklist) {
    html += '<ul class="sheet-checklist">';
    extras.checklist.forEach(item => html += `<li>${item}</li>`);
    html += '</ul>';
  }
  if (actions && actions.length) {
    html += '<div class="sheet-actions">';
    actions.forEach(a => html += `<button class="${a.style || 'sheet-primary'}" data-action="${a.action}">${a.label}</button>`);
    html += '</div>';
  }
  return html;
}
