import { scenes, scenesByStage, defaultToolConfig } from '../data/scenes.js';
import { stages } from '../data/stages.js';
import { ScenePlayer } from '../components/ScenePlayer.js';
import { ToolStrip } from '../components/ToolStrip.js';
import { OverlayManager, sheetTpl } from '../components/BottomSheet.js';
import { AiBackendPanel } from '../components/AiBackendPanel.js';

const STAGE_CHIP_LABELS = { P1: '一', P2: '二', P3: '三', P4: '四', P5: '五', P6: '六', P7: '七' };

export class ScenarioDemoPage {
  constructor(container) {
    this.el = container;
    this.currentStage = 'P2';
    this.currentScene = scenes.find(s => s.stageId === 'P2') || scenes[0];
    this.player = null;
    this.toolStrip = null;
    this.overlay = null;
    this.backend = null;
    this.render();
  }

  render() {
    const s = this.currentScene;
    const filtered = scenesByStage(this.currentStage);
    const stageScenes = filtered.length ? filtered : [s];

    this.el.innerHTML = `
      <header class="topbar" style="margin-bottom:16px;">
        <div>
          <span class="badge">Demo V4 · 在线演示中心</span>
          <h1>UT 销售AI助手：前台对话 × 后台AI状态</h1>
          <p>覆盖销售全流程的 7 个阶段、15 个 AI 辅助场景 · 6 个核心场景已完成完整演示</p>
        </div>
      </header>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div class="stage-nav" id="stage-nav"></div>
        <button class="replay-btn" id="replay-btn" style="padding:6px 14px;border:1.5px solid var(--blue);border-radius:999px;background:#fff;color:var(--blue);font-size:12px;font-weight:800;cursor:pointer;">⟳ 重播</button>
      </div>
      <div class="scene-cards" id="scene-cards"></div>
      <div class="scene-layout">
        <div class="scene-left" id="scene-left"></div>
        <div class="scene-center">
          <div class="phone-wrap">
            <div class="phone">
              <div class="screen">
                <div class="chat-header" id="chat-header"></div>
                <div class="chat-body" id="chat-body"></div>
                <div class="typing-row" id="typing-row"><div class="typing-dots"><span></span><span></span><span></span></div></div>
                <div class="rec-area" id="rec-area">
                  <div class="rec-head">AI 推荐回复</div>
                  <div class="rec-body" id="rec-body"></div>
                  <div class="rec-actions">
                    <button class="rec-send" id="rec-send-btn">发送</button>
                    <button class="rec-edit">编辑</button>
                    <button class="rec-copy">复制</button>
                  </div>
                </div>
                <div class="tool-strip" id="tool-strip"></div>
                <div class="chat-input"><div class="placeholder">选择AI推荐动作或输入...</div><button class="send">发送</button></div>
                <div class="overlay-backdrop" id="overlay-backdrop"></div>
                <div class="overlay-sheet" id="overlay-sheet">
                  <div class="sheet-handle"></div>
                  <button class="sheet-close">✕</button>
                  <div id="sheet-content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="scene-right" id="scene-right"></div>
      </div>
    `;

    this._renderStages();
    this._renderSceneCards(stageScenes);
    this._renderLeft(s);
    this._renderChatHeader(s);
    this._renderRight();
    this._initPlayer(s);
    this._bindButtons();
  }

  _renderStages() {
    const nav = this.el.querySelector('#stage-nav');
    nav.innerHTML = stages.map(st => 
      `<span class="stage-item${st.id === this.currentStage ? ' active' : ''}" data-stage="${st.id}">${st.label}</span>`
    ).join('');
    nav.querySelectorAll('.stage-item').forEach(el => {
      el.addEventListener('click', () => {
        this.currentStage = el.dataset.stage;
        const filtered = scenesByStage(this.currentStage);
        if (filtered.length) { this.currentScene = filtered[0]; this.render(); }
      });
    });
  }

  _renderSceneCards(scenesList) {
    const cards = this.el.querySelector('#scene-cards');
    cards.innerHTML = scenesList.map(sc => {
      const badge = sc.fullDemo ? '' : ' <span style="font-size:9px;color:var(--orange);font-weight:700;">轻量</span>';
      return `<span class="scene-card${sc.id === this.currentScene.id ? ' active' : ''}" data-sid="${sc.id}">${sc.title}${badge}</span>`;
    }).join('');
    cards.querySelectorAll('.scene-card').forEach(el => {
      el.addEventListener('click', () => {
        const sid = el.dataset.sid;
        const found = scenes.find(s => s.id === sid);
        if (found) { this.currentScene = found; this.render(); }
      });
    });
  }

  _renderLeft(s) {
    const el = this.el.querySelector('#scene-left');
    el.innerHTML = `
      <h2>${s.title}</h2>
      <div class="tagline">${s.leftPanel.oneLine}</div>
      <div class="block"><h3>销售痛点</h3><ul style="list-style:none;padding:0;display:grid;gap:4px;">${(s.leftPanel.painPoints||[]).map(p => `<li style="font-size:12px;color:var(--muted);">• ${p}</li>`).join('')}</ul></div>
      <div class="block"><h3>AI 如何介入</h3><ol style="padding-left:18px;font-size:12px;color:var(--muted);line-height:1.6;">${(s.leftPanel.aiActions||[]).map(a => `<li>${a}</li>`).join('')}</ol></div>
      <div class="block"><h3>展示能力</h3><div style="display:flex;flex-wrap:wrap;gap:4px;">${(s.leftPanel.capabilities||[]).map(c => `<span class="badge">${c}</span>`).join('')}</div></div>
      <div class="block"><h4 style="color:#059669;">业务价值</h4><p style="font-size:12px;color:var(--muted);margin-top:4px;">${s.leftPanel.businessValue||''}</p></div>
    `;
  }

  _renderChatHeader(s) {
    this.el.querySelector('#chat-header').innerHTML = `
      <div class="chat-avatar">${(s.chatHeader?.name||'客')[0]}</div>
      <div><div class="chat-name">${s.chatHeader?.name||'客户'}</div><div class="chat-desc">${s.chatHeader?.desc||'企微客户'}</div></div>`;
  }

  _renderRight() {
    const right = this.el.querySelector('#scene-right');
    right.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:800;color:#334155;margin-bottom:2px;">
        <span>AI 后台工作台</span><span class="live-dot">随对话更新</span>
      </div>
      <div class="insight" id="card-profile">
        <h4>客户信息收集状态 <span class="pill green" id="card-profile-badge">逐渐补全</span></h4>
        <div class="kv">
          <span class="k">客户大类</span><span class="v" id="rp-type">--</span>
          <span class="k">细分类别</span><span class="v" id="rp-subtype">--</span>
          <span class="k">门店面积</span><span class="v" id="rp-area">--</span>
          <span class="k">日单量</span><span class="v" id="rp-orders">--</span>
          <span class="k">后厨人员</span><span class="v" id="rp-staff">--</span>
          <span class="k">核心痛点</span><span class="v" id="rp-pain">--</span>
        </div>
        <div class="progress-bar"><span class="progress-fill" id="card-profile-progress" style="width:10%"></span></div>
      </div>
      <div class="insight purple" id="card-stage">
        <h4>项目推进状态 <span class="pill purple" id="card-stage-badge">阶段二</span></h4>
        <div class="stage-chips">
          ${['P1','P2','P3','P4','P5','P6','P7'].map(sid => `<span class="stage-chip${sid==='P2'?' on':''}${sid==='P1'?' done':''}" data-stage="${sid}">${STAGE_CHIP_LABELS[sid]}</span>`).join('')}
        </div>
        <ul class="checks" style="margin-top:6px" id="card-stage-checks">
          <li class="done">已识别客户业态</li>
          <li class="todo">待确认产品适配</li>
          <li class="todo">待推进试菜验证</li>
        </ul>
      </div>
      <div class="insight orange" id="card-process">
        <h4>内部流程状态 <span class="pill orange">实时</span></h4>
        <ul class="checks" id="card-process-list">
          <li class="todo">客户画像补全</li>
          <li class="todo">需求摘要生成</li>
          <li class="todo">内部任务创建</li>
          <li class="todo">客户话术发送</li>
        </ul>
      </div>
      <div class="insight" id="card-knowledge">
        <h4>推荐知识 / 动作 <span class="pill blue">待触发</span></h4>
        <div class="mini-grid" id="card-knowledge-grid">
          <div class="mini-card"><strong>G3 适配卡</strong>快餐场景</div>
          <div class="mini-card"><strong>案例卡</strong>同类门店</div>
          <div class="mini-card"><strong>准备清单</strong>试菜物资</div>
          <div class="mini-card"><strong>确认话术</strong>面向客户</div>
        </div>
      </div>
    `;
  }

  _initPlayer(s) {
    const chatBody = this.el.querySelector('#chat-body');
    const typingRow = this.el.querySelector('#typing-row');
    const recArea = this.el.querySelector('#rec-area');
    const recBody = this.el.querySelector('#rec-body');
    const toolEl = this.el.querySelector('#tool-strip');
    const rightEl = this.el.querySelector('#scene-right');

    // Dispose old player before creating new one
    if (this.player) {
      this.player.reset();
      this.player = null;
    }
    this.backend = new AiBackendPanel(rightEl);

    this.player = new ScenePlayer({ chatBody, typingRow, recArea, recBody, overlay: this.overlay, toolStrip: this.toolStrip, backend: this.backend });
    this.player.load(s.chatScript);

    // Per-scene tool config
    const tcfg = s.toolConfig || defaultToolConfig;
    this.toolStrip = new ToolStrip(toolEl);
    this.toolStrip.init(tcfg);

    const backdrop = this.el.querySelector('#overlay-backdrop');
    const sheet = this.el.querySelector('#overlay-sheet');
    const scontent = this.el.querySelector('#sheet-content');
    this.overlay = new OverlayManager(backdrop, sheet, scontent);
    if (s.sheets) Object.entries(s.sheets).forEach(([id, fn]) => this.overlay.register(id, fn));
    this.player.overlay = this.overlay;
    this.player.toolStrip = this.toolStrip;
    this.player.backend = this.backend;

    this.player.play();
  }

  _bindButtons() {
    this.el.querySelector('#replay-btn').addEventListener('click', () => {
      this.render();
    });

    this.el.querySelector('#rec-send-btn').addEventListener('click', () => {
      if (this.player.pendingRec) {
        this.player._addMsg('sales', this.player.pendingRec);
        this.player.pendingRec = null;
      }
      this.el.querySelector('#rec-area').classList.remove('show');
      this.el.querySelector('#rec-body').textContent = '';
    });

    this.el.querySelector('#overlay-sheet').addEventListener('click', (e) => {
      if (e.target.dataset.action === 'generate') {
        this.overlay.close();
        setTimeout(() => {
          const recBody = this.el.querySelector('#rec-body');
          recBody.textContent = '好的，我这边先按下周三下午2点给您预留试菜时间。试菜菜品是鱼香肉丝和青椒肉丝，口味按偏重准备。稍后我把展厅地址和到访指引发您。';
          this.el.querySelector('#rec-area').classList.add('show');
        }, 300);
      }
      if (e.target.dataset.action === 'close') this.overlay.close();
    });

    // Tool strip click: open sheet + sync backend cards
    this.el.querySelector('#tool-strip').addEventListener('click', (e) => {
      const btn = e.target.closest('.tool-btn');
      if (!btn) return;
      const sheetId = btn.dataset.sheet;
      if (sheetId && this.overlay?.sheets?.[sheetId]) this.overlay.open(sheetId);
      this._syncBackendOnToolClick(btn.dataset.id);
    });
  }

  _syncBackendOnToolClick(toolId) {
    const b = this.backend;
    if (!b) return;
    switch (toolId) {
      case 'tool-profile':
        b.activateCard('card-profile');
        b.highlight('card-profile');
        break;
      case 'tool-demand':
        b.activateCard('card-process', 'orange');
        b.checkDone('card-process-list', [0, 1]);
        break;
      case 'tool-product':
        b.activateCard('card-stage', 'purple');
        b.activateCard('card-knowledge');
        b.highlight('card-knowledge');
        break;
      case 'tool-verify':
        b.activateCard('card-process', 'orange');
        b.highlight('card-process');
        break;
      case 'tool-next':
        b.activateCard('card-process', 'orange');
        break;
    }
  }
}
