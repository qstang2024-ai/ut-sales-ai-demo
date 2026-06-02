// main.js - UT 销售AI助手 · 在线演示中心
import './styles/base.css';
import './styles/layout.css';
import './styles/theme.css';
import './styles/scene-player.css';
import './styles/survey.css';
import './styles/tech-arch.css';
import './styles/business-value.css';

import { tabs as tabConfig } from './data/tabs.js';
import { ScenarioDemoPage } from './pages/ScenarioDemoPage.js';

const pageLoaders = {
  bizvalue: () => import('./pages/BusinessValuePage.js'),
  techarch: () => import('./pages/TechArchitecturePage.js'),
  survey: () => import('./pages/TopSalesSurveyPage.js'),
};
const pageCache = {};

function loadPage(key) {
  if (!pageCache[key]) {
    pageCache[key] = pageLoaders[key]().catch(err => {
      console.warn('[preload] failed:', key, err);
      delete pageCache[key];
      throw err;
    });
  }
  return pageCache[key];
}

setTimeout(() => { loadPage('bizvalue').catch(()=>{}); loadPage('techarch').catch(()=>{}); }, 8000);
setTimeout(() => { loadPage('survey').catch(()=>{}); }, 12000);

function iframePage(url, title) {
  const id = 'iframe-zone';
  return `<div class="iframe-wrap" id="${id}"><iframe src="${url}" class="iframe-main" allow="clipboard-write" sandbox="allow-scripts allow-same-origin allow-popups"></iframe></div>
    <script>(function check(){var el=document.getElementById('${id}');var ifr=el&&el.querySelector('iframe');setTimeout(function(){try{var doc=ifr&&ifr.contentDocument;if(!doc||!doc.body||doc.body.innerHTML.trim().length<20){el.innerHTML='<div class="iframe-fallback"><div style="font-size:48px;margin-bottom:14px;">🔗</div><h3>当前页面无法直接嵌入展示</h3><p>请点击下方按钮打开${title}</p><a href="${url}" target="_blank" class="survey-btn primary" style="display:inline-block;margin-top:12px;text-decoration:none;">打开${title} ↗</a></div>';}}catch(e){}},4000);})();</script>`;
}

const tabIds = ['bizvalue','scenario','scene3','scene5','scene4','techarch','survey'];

class App {
  constructor() {
    this.container = document.getElementById('app');
    this.currentTab = 'bizvalue';
  }

  render() {
    this.container.innerHTML = `<div class="page"><nav class="tab-nav" id="tab-nav"></nav><div id="page-content"></div></div>`;
    this._renderTabs();
    this._renderPanes();
  }

  _renderTabs() {
    const nav = this.container.querySelector('#tab-nav');
    nav.innerHTML = tabConfig.map(t => `<button class="${t.id===this.currentTab?'active':''}" data-tab="${t.id}">${t.label}</button>`).join('');
    nav.querySelectorAll('button').forEach(btn => { btn.addEventListener('click', () => { this.currentTab=btn.dataset.tab; this._renderTabs(); this._showTab(); }); });
  }

  _renderPanes() {
    const content = this.container.querySelector('#page-content');
    content.innerHTML = tabIds.map(id => `<div class="tab-pane" id="pane-${id}" style="display:${id===this.currentTab?'block':'none'}"></div>`).join('');
    this._showTab();
  }

  _showTab() {
    const content = this.container.querySelector('#page-content');
    content.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    const pane = content.querySelector('#pane-' + this.currentTab);
    if (pane) pane.style.display = 'block';

    switch (this.currentTab) {
      case 'scenario':
        if (!this._scenarioPage) this._scenarioPage = new ScenarioDemoPage(pane);
        else { this._scenarioPage.el = pane; this._scenarioPage.render(); }
        break;
      case 'scene3':
        if (!this._scene3Loaded) { pane.innerHTML = `<iframe src="./vendor/ai-sale/scene-12-workbench/index.html" class="iframe-main" allow="clipboard-write" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" style="border:0;width:100%;height:calc(100vh - 120px);display:block;"></iframe>`; this._scene3Loaded = true; }
        break;
      case 'scene4':
        if (!this._scene4Loaded) {
          pane.innerHTML = `<iframe src="./vendor/ai-sale/scene-2-chat/index.html" class="iframe-main" allow="clipboard-write" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" style="border:0;width:100%;height:calc(100vh - 120px);display:block;"></iframe>`;
          const ifr4 = pane.querySelector('iframe');
          ifr4?.addEventListener('load', () => { try { const d=ifr4.contentDocument; if(d&&!d.getElementById('ut-hide')){const s=d.createElement('style');s.id='ut-hide';s.textContent='.scene-nav,.wb-nav{display:none!important;}';d.head.appendChild(s);}}catch(e){} });
          this._scene4Loaded = true;
        }
        break;
      case 'scene5':
        if (!this._scene5Loaded) { pane.innerHTML = `<iframe src="./vendor/ai-sale/scene-11-sales-assistant/index.html" class="iframe-main" allow="clipboard-write" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" style="border:0;width:100%;min-height:calc(100vh - 120px);display:block;"></iframe>`; this._scene5Loaded = true; }
        break;
      case 'bizvalue':
        if (!this._bizvalueLoaded) { loadPage('bizvalue').then(m => { new m.BusinessValuePage(pane); this._bizvalueLoaded = true; }).catch(() => { pane.innerHTML = '<div class="placeholder-page"><h2>加载失败</h2></div>'; }); }
        break;
      case 'techarch':
        if (!this._techarchLoaded) { loadPage('techarch').then(m => { new m.TechArchitecturePage(pane); this._techarchLoaded = true; }).catch(() => { pane.innerHTML = '<div class="placeholder-page"><h2>加载失败</h2></div>'; }); }
        break;
      case 'survey':
        if (!this._surveyLoaded) { loadPage('survey').then(m => { new m.TopSalesSurveyPage(pane); this._surveyLoaded = true; }).catch(() => { pane.innerHTML = '<div class="placeholder-page"><h2>加载失败</h2></div>'; }); }
        break;
    }
  }
}

const app = new App();
app.render();
