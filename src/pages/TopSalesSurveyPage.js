import { SURVEY_SCENARIOS, PRIORITY_OPTIONS, SALES_ROLES, SALES_YEARS, CUSTOMER_TYPES, SALES_STAGES, NEW_SALES_DIFFICULTIES } from '../data/topSalesSurveyScenarios.js';
import { saveDraft, loadDraft, clearDraft, saveResult, loadResults, clearResults, downloadJSON, copyJSON } from '../utils/surveyStorage.js';
import { calcWeightedScore, calcSceneStats, getMustHaveTop5, getControversial } from '../utils/surveyScore.js';

const STEPS = ['调研说明','填写人信息','销售流程痛点','AI场景价值评估','开放反馈与优先级'];
const RATING_LABELS = { frequency:'出现频率', dealImpact:'成交影响', aiFit:'AI适合度', accuracy:'描述准确性' };
const RATING_HINTS = { frequency:'1很少→5每天', dealImpact:'1不影响→5非常影响', aiFit:'1不适合→5非常适合', accuracy:'1不符→5非常准确' };

class SurveyState {
  constructor() {
    this.step = 0; this.showResults = false; this.submitted = false;
    this.respondent = { name:'', department:'', role:'', salesYears:'', customerTypes:[], involvedInSolutionOrQuote:'' };
    this.painPoints = { importantStages:[], stuckStages:[], newSalesDifficulties:[], aiPriorityHelp:'' };
    this.scenarioScores = SURVEY_SCENARIOS.map(s => ({ id:s.id, name:s.name, stage:s.stage, frequency:0, dealImpact:0, aiFit:0, accuracy:0, phaseOnePriority:'', comment:'' }));
    this.feedback = { top3Problems:'', customerTopQuestions:'', newSalesMistakes:'', effectiveTalkTracks:'', mustHaveFive:[], notUsefulOrInaccurate:'', newScenarioSuggestions:'', oneSentenceAdvice:'' };
  }
  load(d) { if (d) Object.assign(this, d); }
  toDraft() { return JSON.parse(JSON.stringify(this)); }
  buildResult() {
    const now = new Date().toISOString();
    return { id:'survey_'+Date.now()+'_'+Math.random().toString(36).slice(2,7), submittedAt:now, respondent:{...this.respondent}, processPainPoints:{...this.painPoints},
      scenarioScores: this.scenarioScores.map(s => ({...s, weightedScore:calcWeightedScore(s.frequency,s.dealImpact,s.aiFit,s.accuracy)})),
      openFeedback:{...this.feedback} };
  }
}

// Shared helpers
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs) Object.entries(attrs).forEach(([k,v]) => { if (k==='className') el.className=v; else if (k==='textContent') el.textContent=v; else if (k.startsWith('on')) el.addEventListener(k.slice(2),v); else el.setAttribute(k,v); });
  children.forEach(c => { if (typeof c==='string'||typeof c==='number') el.appendChild(document.createTextNode(c)); else if (c) el.appendChild(c); });
  return el;
}

function makeQCard(title, desc, required, maxHint, bodyHTML) {
  return `<div class="q-card">
    <div class="q-header">
      <span class="q-title">${title}${required?' <span class="q-required">*</span>':''}</span>
      ${maxHint ? `<span class="q-hint">${maxHint}</span>` : ''}
    </div>
    ${desc ? `<p class="q-desc">${desc}</p>` : ''}
    ${bodyHTML}
  </div>`;
}

export class TopSalesSurveyPage {
  constructor(container) {
    this.el = container;
    this.state = new SurveyState();
    this.state.load(loadDraft());
    this.render();
  }

  render() {
    const s = this.state;
    if (s.submitted && !s.showResults) { this._renderSuccess(); return; }
    if (s.showResults) { this._renderResults(); return; }
    this.el.innerHTML = `<div class="survey-page">
      <div class="survey-header">
        <h1>UT 销售 AI 助手 · Top Sales 场景调研</h1>
        <p class="subtitle">邀请一线优秀销售共同参与产品设计，基于真实销售经验评估 AI 场景优先级。</p>
        <div class="header-meta"><span>⏱ 预计 10–15 分钟</span><span>📋 结果将用于优化销售 AI 助手产品设计</span></div>
        <div class="survey-stepper">${STEPS.map((t,i)=>{
          let icon = `<span class="num">${i+1}</span>`, cls='';
          if (i<s.step) { icon='✓'; cls='done'; }
          else if (i===s.step) cls='active';
          return `<span class="survey-step-dot ${cls}"><span class="num">${icon}</span>${t}</span>`;
        }).join('')}</div>
      </div>
      <div class="survey-body" id="survey-body"></div>
      <div class="survey-footer" id="survey-footer"></div>
    </div>`;
    this._renderStep(s.step);
    this._renderFooter(s.step);
  }

  _renderStep(step) {
    const body = this.el.querySelector('#survey-body');
    switch (step) {
      case 0: body.innerHTML = this._step0(); break;
      case 1: body.innerHTML = this._step1(); this._bindStep1(); break;
      case 2: body.innerHTML = this._step2(); this._bindStep2(); break;
      case 3: body.innerHTML = this._step3(); this._bindStep3(); break;
      case 4: body.innerHTML = this._step4(); this._bindStep4(); break;
    }
  }

  _step0() {
    return `<div class="step-intro">
      <span class="step-icon">📋</span>
      <h2>调研说明</h2>
      <p>本次调研希望邀请一线优秀销售共同参与 UT 销售 AI 助手的产品设计。</p>
      <p>我们已经整理了一组围绕客户沟通过程的 AI 辅助场景，请大家结合真实销售经验判断：这些场景是否高频、是否有价值、描述是否准确，以及你最希望 AI 帮忙解决什么问题。</p>
      <div class="step-principles">
        <div class="principle"><strong>1.</strong> 请基于真实销售经验填写</div>
        <div class="principle"><strong>2.</strong> 没有标准答案</div>
        <div class="principle"><strong>3.</strong> 如场景描述不符实际，请直接指出</div>
        <div class="principle"><strong>4.</strong> 你的反馈直接影响第一期产品优先级</div>
      </div>
    </div>`;
  }

  _step1() {
    const r = this.state.respondent;
    const radioGroup = (name, options, selected) => `<div class="radio-group">${options.map(o => `<button class="radio-btn${selected===o?' active':''}" data-name="${name}" data-val="${o}">${o}</button>`).join('')}</div>`;
    return `<h2 class="section-title">👤 填写人基本信息</h2>
      <p class="section-desc">请填写你的基本信息，帮助我们了解反馈来源。</p>
      <div class="form-group"><label>姓名 <span class="required">*</span></label><input type="text" id="f-name" value="${r.name||''}" placeholder="请输入姓名"></div>
      <div class="form-group"><label>所属区域 / 部门</label><input type="text" id="f-dept" value="${r.department||''}" placeholder="选填"></div>
      ${makeQCard('当前角色','一线销售 / 销售主管 / 大客户销售 等',true,null,radioGroup('role',SALES_ROLES,r.role))}
      ${makeQCard('销售年限','',true,null,radioGroup('salesYears',SALES_YEARS,r.salesYears))}
      ${makeQCard('主要客户类型','可多选',true,null,this._checkGroup('customerTypes',CUSTOMER_TYPES,r.customerTypes))}
      ${makeQCard('是否参与过设备选型、方案推荐或报价推进？','',true,null,radioGroup('involved',['经常参与','偶尔参与','很少参与','基本不参与'],r.involvedInSolutionOrQuote))}`;
  }

  _step2() {
    const p = this.state.painPoints;
    return `<h2 class="section-title">🔍 销售流程痛点确认</h2>
      <p class="section-desc">请根据真实的一线销售经验，选择最常遇到、最影响成交推进的问题。</p>
      ${makeQCard('你认为销售过程中最关键的阶段有哪些？','可多选，请选择你认为最影响成交结果的环节。',true,null,this._checkGroup('importantStages',SALES_STAGES,p.importantStages))}
      ${makeQCard('你在实际销售过程中最容易卡住的阶段是哪些？','',true,'最多选择 5 项',this._checkGroup('stuckStages',SALES_STAGES,p.stuckStages,5))}
      ${makeQCard('你认为新销售最难掌握的能力有哪些？','',true,'最多选择 5 项',this._checkGroup('newSalesDifficulties',NEW_SALES_DIFFICULTIES,p.newSalesDifficulties,5))}
      ${makeQCard('如果有一个销售 AI 助手，你最希望它优先帮你解决什么问题？','请结合真实销售场景填写，例如：客户判断、需求总结、产品推荐、异议处理、跟进提醒等。',true,null,`<textarea id="f-aihelp" class="survey-textarea" placeholder="例如：帮我判断客户真实意向、自动总结客户需求、推荐合适产品、生成跟进话术……">${p.aiPriorityHelp||''}</textarea>`)}`;
  }

  _step3() {
    const scores = this.state.scenarioScores;
    const doneCount = scores.filter(s=>s.frequency>0&&s.dealImpact>0&&s.aiFit>0&&s.accuracy>0&&s.phaseOnePriority).length;
    let html = `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
      <h2 class="section-title" style="margin-bottom:0;">📊 AI 场景价值评估 <span class="done-count">${doneCount}/20 已完成</span></h2>
      <div style="display:flex;gap:6px;">
        <button class="survey-btn ghost" id="btn-expand-all" style="font-size:11px;padding:5px 12px;">展开全部</button>
        <button class="survey-btn ghost" id="btn-collapse-all" style="font-size:11px;padding:5px 12px;">收起全部</button>
      </div>
    </div>
    <p class="section-desc">前两个场景已为你展开。请点击卡片展开评分——每个场景需从出现频率、成交影响、AI适合度、描述准确性和一期优先级进行评估。</p>`;
    scores.forEach((sc,i) => {
      const done = sc.frequency>0&&sc.dealImpact>0&&sc.aiFit>0&&sc.accuracy>0&&sc.phaseOnePriority;
      const orig = SURVEY_SCENARIOS.find(s=>s.id===sc.id)||{};
      const expanded = i < 2; // first 2 expanded by default
      const starRow = (field) => {
        let r = `<div class="rating-box"><div class="r-label">${RATING_LABELS[field]}</div><div class="r-stars" data-sid="${sc.id}" data-field="${field}">`;
        for (let v=1; v<=5; v++) r += `<span class="r-star${sc[field]>=v?' active':''}" data-v="${v}">★</span>`;
        r += `</div><div class="r-score">${RATING_HINTS[field]}</div></div>`; return r;
      };
      html += `<div class="scenario-card${done?' completed':''}${expanded?' expanded':''}" id="sc-${sc.id}">
        <div class="sc-header">
          <div class="sc-title"><span class="sc-stage">${orig.stage||''}</span><span class="sc-name">${i+1}. ${sc.name}</span></div>
          <div class="sc-right">
            ${done?'<span class="sc-done">✓ 已完成</span>':`<span class="sc-pending">待评分</span><span class="sc-hint">点击展开评分 <span class="sc-chevron">▾</span></span>`}
          </div>
        </div>
        <div class="sc-body">
          <div class="sc-desc"><strong>${orig.desc||''}</strong></div>
          <div class="sc-aihelp">🤖 ${orig.aiHelp||''}</div>
          <div class="rating-row">${starRow('frequency')}${starRow('dealImpact')}${starRow('aiFit')}${starRow('accuracy')}</div>
          <div class="form-group" style="margin-top:6px"><label>一期优先级 <span class="required">*</span></label><div class="priority-row" data-sid="${sc.id}">${PRIORITY_OPTIONS.map(p => `<button class="priority-btn${sc.phaseOnePriority===p?' active':''}" data-priority="${p}">${p}</button>`).join('')}</div></div>
          <div class="form-group"><label>修改建议</label><textarea class="survey-textarea sc-comment" data-sid="${sc.id}" placeholder="如果这个场景描述不符合真实销售过程，请写出真实情况，或说明你希望 AI 怎么帮。">${sc.comment||''}</textarea></div>
        </div>
      </div>`;
    });
    return html;
  }

  _step4() {
    const f = this.state.feedback;
    return `<h2 class="section-title">💬 开放反馈与最终优先级投票</h2>
      ${makeQCard('你在实际销售中，最希望 AI 帮你解决的 3 个问题是什么？','请根据真实情况填写。',true,null,`<textarea class="survey-textarea" id="f-top3" placeholder="请列出 3 个你最希望 AI 优先解决的问题">${f.top3Problems||''}</textarea>`)}
      ${makeQCard('客户最常问你的 10 个问题是什么？','可包括价格、功能、售后、稳定性、竞品、安装、培训、回本、案例等。',false,null,`<textarea class="survey-textarea" id="f-questions" rows="3">${f.customerTopQuestions||''}</textarea>`)}
      ${makeQCard('你认为新销售最容易犯的 5 个错误是什么？','',false,null,`<textarea class="survey-textarea" id="f-mistakes" rows="3">${f.newSalesMistakes||''}</textarea>`)}
      ${makeQCard('你最常用、最有效的销售话术有哪些？','可以写开场、需求挖掘、价格应答、竞品应答、试菜邀约、成交跟进等。',false,null,`<textarea class="survey-textarea" id="f-talktracks" rows="3">${f.effectiveTalkTracks||''}</textarea>`)}
      ${makeQCard('如果销售 AI 助手第一期只能做 5 个功能，你认为是哪 5 个？','',true,'最多选择 5 项',this._checkGroup('mustHaveFive',SURVEY_SCENARIOS.map(s=>s.name),f.mustHaveFive,5))}
      ${makeQCard('哪些场景你认为不实用或不符合真实销售？','',false,null,`<textarea class="survey-textarea" id="f-notuseful" rows="2">${f.notUsefulOrInaccurate||''}</textarea>`)}
      ${makeQCard('你建议新增哪些 AI 场景？','',false,null,`<textarea class="survey-textarea" id="f-newsuggest" rows="2">${f.newScenarioSuggestions||''}</textarea>`)}
      ${makeQCard('如果让你给这个销售 AI 助手提一句建议，你会说什么？','',false,null,`<textarea class="survey-textarea" id="f-advice" rows="2">${f.oneSentenceAdvice||''}</textarea>`)}`;
  }

  _checkGroup(name, options, selected, max) {
    const sel = selected||[];
    const count = sel.length;
    return `<div class="check-group" data-name="${name}" data-max="${max||0}">
      <div class="check-count" style="display:${max?'flex':'none'}">已选 ${count} / ${max}</div>
      ${options.map(o => `<div class="option-card${sel.includes(o)?' checked':''}" data-name="${name}" data-val="${o}"><span class="option-check">${sel.includes(o)?'✓':''}</span><span class="option-label">${o}</span></div>`).join('')}
    </div>`;
  }

  _bindStep1() {
    this._bindRadioGroup(); this._bindCheckGroup();
  }
  _bindStep2() {
    this._bindCheckGroup();
  }
  _bindStep3() {
    this.el.querySelectorAll('.sc-header').forEach(header => {
      header.addEventListener('click', () => { header.parentElement.classList.toggle('expanded'); });
    });
    const btnExpand = this.el.querySelector('#btn-expand-all');
    const btnCollapse = this.el.querySelector('#btn-collapse-all');
    if (btnExpand) btnExpand.addEventListener('click', () => this.el.querySelectorAll('.scenario-card').forEach(c => c.classList.add('expanded')));
    if (btnCollapse) btnCollapse.addEventListener('click', () => this.el.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('expanded')));
    this.el.querySelectorAll('.r-stars').forEach(stars => {
      stars.addEventListener('click', (e) => {
        const star = e.target.closest('.r-star'); if (!star) return;
        const v = +star.dataset.v; const sid = stars.dataset.sid; const field = stars.dataset.field;
        const sc = this.state.scenarioScores.find(s => s.id === sid); if (!sc) return;
        sc[field] = v;
        stars.querySelectorAll('.r-star').forEach((s,i) => s.classList.toggle('active', i<v));
        this._updateCardStatus(sid); this._autoSave();
      });
    });
    this.el.querySelectorAll('.priority-row').forEach(row => {
      row.addEventListener('click', (e) => {
        const btn = e.target.closest('.priority-btn'); if (!btn) return;
        const sc = this.state.scenarioScores.find(s => s.id === row.dataset.sid); if (!sc) return;
        sc.phaseOnePriority = btn.dataset.priority;
        row.querySelectorAll('.priority-btn').forEach(b => b.classList.toggle('active', b.dataset.priority===btn.dataset.priority));
        this._updateCardStatus(row.dataset.sid); this._autoSave();
      });
    });
    this.el.querySelectorAll('.sc-comment').forEach(el => {
      el.addEventListener('change', () => {
        const sc = this.state.scenarioScores.find(s => s.id === el.dataset.sid);
        if (sc) { sc.comment = el.value; this._autoSave(); }
      });
    });
  }
  _bindStep4() { this._bindCheckGroup(); }

  _updateCardStatus(sid) {
    const sc = this.state.scenarioScores.find(s => s.id === sid);
    const done = sc && sc.frequency>0 && sc.dealImpact>0 && sc.aiFit>0 && sc.accuracy>0 && sc.phaseOnePriority;
    const card = this.el.querySelector('#sc-'+sid); if (!card) return;
    card.classList.toggle('completed', !!done);
    const hdr = card.querySelector('.sc-header');
    if (hdr) {
      const existing = hdr.querySelector('.sc-done, .sc-pending');
      if (existing) existing.remove();
      const status = document.createElement('span');
      status.className = done ? 'sc-done' : 'sc-pending';
      status.textContent = done ? '已完成' : '待评分';
      hdr.appendChild(status);
    }
    const h2 = this.el.querySelector('.done-count');
    if (h2) {
      const count = this.state.scenarioScores.filter(s=>s.frequency>0&&s.dealImpact>0&&s.aiFit>0&&s.accuracy>0&&s.phaseOnePriority).length;
      h2.textContent = count+'/20 已完成';
    }
  }

  _bindRadioGroup() {
    this.el.querySelectorAll('.radio-group').forEach(group => {
      group.addEventListener('click', (e) => {
        const btn = e.target.closest('.radio-btn'); if (!btn) return;
        group.querySelectorAll('.radio-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const name = btn.dataset.name;
        const val = btn.dataset.val;
        if (name === 'involved') this.state.respondent.involvedInSolutionOrQuote = val;
        else this.state.respondent[name] = val;
        this._autoSave();
      });
    });
  }

  _bindCheckGroup() {
    this.el.querySelectorAll('.check-group').forEach(group => {
      group.addEventListener('click', (e) => {
        const card = e.target.closest('.option-card'); if (!card) return;
        const name = card.dataset.name; const val = card.dataset.val;
        const max = parseInt(group.dataset.max) || 0;
        let arr;
        if (name==='importantStages'||name==='stuckStages'||name==='newSalesDifficulties') arr = this.state.painPoints[name];
        else if (name==='mustHaveFive') arr = this.state.feedback.mustHaveFive;
        else arr = this.state.respondent[name];
        if (!Array.isArray(arr)) arr = [];
        const idx = arr.indexOf(val);
        if (idx >= 0) { arr.splice(idx,1); card.classList.remove('checked'); card.querySelector('.option-check').textContent = ''; }
        else {
          if (max && arr.length >= max) { this._showToast('最多选择 '+max+' 项'); return; }
          arr.push(val); card.classList.add('checked'); card.querySelector('.option-check').textContent = '✓';
        }
        if (name==='importantStages'||name==='stuckStages'||name==='newSalesDifficulties') this.state.painPoints[name] = arr;
        else if (name==='mustHaveFive') this.state.feedback.mustHaveFive = arr;
        else this.state.respondent[name] = arr;
        // Update count display
        const cntEl = group.querySelector('.check-count');
        if (cntEl && max) cntEl.textContent = `已选 ${arr.length} / ${max}`;
        this._autoSave();
      });
    });
  }

  _showToast(msg) {
    const existing = this.el.querySelector('.survey-toast');
    if (existing) { existing.textContent = msg; return; }
    const toast = document.createElement('div');
    toast.className = 'survey-toast'; toast.textContent = msg;
    this.el.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  _renderFooter(step) {
    const ft = this.el.querySelector('#survey-footer');
    ft.innerHTML = `
      <div class="footer-left">
        ${step>0 ? '<button class="survey-btn secondary" id="btn-prev">← 上一步</button>' : '<span></span>'}
      </div>
      <div class="footer-center">
        <button class="survey-btn ghost" id="btn-save">💾 保存草稿</button>
        ${step<4 ? '<button class="survey-btn primary" id="btn-next">下一步 →</button>' : '<button class="survey-btn primary" id="btn-submit">✓ 提交调研</button>'}
      </div>
      <div class="footer-right">
        <button class="survey-btn ghost" id="btn-results" style="font-size:11px">查看本机结果</button>
        <button class="survey-btn ghost danger" id="btn-clear" style="font-size:11px">清空本机</button>
      </div>`;
    const prevBtn = ft.querySelector('#btn-prev'); if (prevBtn) prevBtn.addEventListener('click', ()=>this._goStep(Math.max(0, step-1)));
    ft.querySelector('#btn-next')?.addEventListener('click', ()=>this._goStep(Math.min(4, step+1)));
    ft.querySelector('#btn-submit')?.addEventListener('click', ()=>this._submit());
    ft.querySelector('#btn-save').addEventListener('click', ()=>{ saveDraft(this.state.toDraft()); this._showToast('草稿已保存到本机'); });
    ft.querySelector('#btn-results').addEventListener('click', ()=>{ this.state.showResults=true; this.state.submitted=false; this.render(); });
    ft.querySelector('#btn-clear').addEventListener('click', ()=>{ if(confirm('确认清除本机调研草稿和提交记录？该操作不可恢复。')){ clearDraft(); clearResults(); this.state=new SurveyState(); this.render(); }});
  }

  _goStep(s) {
    const target = Math.max(0, Math.min(4, s));
    if (target === this.state.step) return;
    this._collectInputs(this.state.step);
    this.state.step = target;
    this.render();
    this._autoSave();
  }

  _collectInputs(step) {
    if (step===1) {
      ['name','department'].forEach(k => { const el=this.el.querySelector('#f-'+k); if(el) this.state.respondent[k]=el.value; });
    }
    if (step===2) {
      const el=this.el.querySelector('#f-aihelp'); if(el) this.state.painPoints.aiPriorityHelp=el.value;
    }
    if (step===3) {
      this.el.querySelectorAll('.sc-comment').forEach(el=>{ const sc=this.state.scenarioScores.find(s=>s.id===el.dataset.sid); if(sc) sc.comment=el.value; });
    }
    if (step===4) {
      const map = { top3Problems:'f-top3', customerTopQuestions:'f-questions', newSalesMistakes:'f-mistakes', effectiveTalkTracks:'f-talktracks', notUsefulOrInaccurate:'f-notuseful', newScenarioSuggestions:'f-newsuggest', oneSentenceAdvice:'f-advice' };
      Object.entries(map).forEach(([k,id]) => { const el=this.el.querySelector('#'+id); if(el) this.state.feedback[k]=el.value; });
    }
  }

  _validate() {
    const r=this.state.respondent, p=this.state.painPoints, ss=this.state.scenarioScores, f=this.state.feedback;
    const errs = [];
    if (!r.name) errs.push('姓名');
    if (!r.role) errs.push('当前角色');
    if (!r.salesYears) errs.push('销售年限');
    if (!r.customerTypes.length) errs.push('主要客户类型');
    if (!r.involvedInSolutionOrQuote) errs.push('参与设备选型/方案/报价');
    if (!p.importantStages.length) errs.push('销售过程中最关键的阶段');
    if (!p.stuckStages.length) errs.push('最容易卡住的阶段');
    if (!p.newSalesDifficulties.length) errs.push('新销售最难掌握的能力');
    if (!p.aiPriorityHelp.trim()) errs.push('AI优先解决的问题');
    ss.forEach((s,i)=>{ if(!s.frequency||!s.dealImpact||!s.aiFit||!s.accuracy||!s.phaseOnePriority) errs.push(`第${i+1}个场景「${s.name}」未完成评分`); });
    if (!f.top3Problems.trim()) errs.push('最希望AI解决的3个问题');
    if (!f.mustHaveFive.length) errs.push('第一期必须做的5个功能');
    return errs;
  }

  _submit() {
    this._collectInputs(4);
    const errs = this._validate();
    if (errs.length) { alert('还有未完成项：\n'+errs.map(e=>'• '+e).join('\n')); return; }
    saveResult(this.state.buildResult()); clearDraft();
    this.state.submitted = true; this.render();
  }

  _renderSuccess() {
    this.el.innerHTML = `<div class="survey-page"><div class="survey-body"><div class="success-page">
      <div class="icon">✅</div><h2>提交成功！</h2><p>感谢你的宝贵反馈！你的意见将直接影响第一期产品功能优先级。</p>
      <p style="color:var(--muted);font-size:12px;">调研数据已保存在本机 localStorage 中。</p>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">
        <button class="survey-btn primary" onclick="location.reload()">重新填写</button>
        <button class="survey-btn secondary" id="btn-view-results">查看本机调研结果</button>
      </div>
    </div></div></div>`;
    this.el.querySelector('#btn-view-results').addEventListener('click', ()=>{ this.state.showResults=true; this.state.submitted=false; this.render(); });
  }

  _renderResults() {
    const results = loadResults(); const stats = calcSceneStats(results);
    const top5 = getMustHaveTop5(stats); const controversial = getControversial(stats);
    this.el.innerHTML = `<div class="survey-page">
      <div class="results-panel">
        <h3>📊 本机调研结果</h3>
        <div class="stats-cards">
          <div class="stats-card"><div class="big">${results.length}</div><div class="label">已提交调研</div></div>
          <div class="stats-card"><div class="big">${stats.length}</div><div class="label">覆盖场景数</div></div>
          <div class="stats-card"><div class="big">${top5.length}</div><div class="label">一期 Top 5</div></div>
          <div class="stats-card"><div class="big">${controversial.length}</div><div class="label">争议场景</div></div>
        </div>
        <h4>场景综合得分排行</h4>
        <div style="overflow-x:auto;"><table class="results-table">
          <tr><th>#</th><th>场景</th><th>综合分</th><th>频率</th><th>成交影响</th><th>AI适合</th><th>描述准确</th><th>一期票数</th></tr>
          ${stats.map((s,i)=>`<tr><td class="rank">${i+1}</td><td>${s.name}</td><td class="score">${s.avgScore}</td><td>${s.avgFrequency}</td><td>${s.avgDealImpact}</td><td>${s.avgAiFit}</td><td class="${s.avgAccuracy<3.5&&s.avgScore>=4?'controversial':''}">${s.avgAccuracy}</td><td>${s.mustHaveCount}</td></tr>`).join('')}
        </table></div>
        ${top5.length?`<h4 style="margin:16px 0 8px">🏆 一期必须做 Top 5</h4><ol>${top5.map(s=>`<li><strong>${s.name}</strong> — ${s.mustHaveCount}票</li>`).join('')}</ol>`:''}
        ${controversial.length?`<h4 style="margin:16px 0 8px">⚠️ 高价值但描述需校准</h4><ul>${controversial.map(s=>`<li><strong>${s.name}</strong> — 综合分${s.avgScore}，描述准确性${s.avgAccuracy}</li>`).join('')}</ul>`:''}
        <div class="results-actions">
          <button class="survey-btn primary" id="btn-copy-json">📋 复制全部 JSON</button>
          <button class="survey-btn secondary" id="btn-download-json">📥 下载 survey-results.json</button>
          <button class="survey-btn ghost" id="btn-back-survey">← 返回调研</button>
        </div>
      </div>
    </div>`;
    this.el.querySelector('#btn-copy-json').addEventListener('click', ()=>{ copyJSON(results); this._showToast('已复制到剪贴板'); });
    this.el.querySelector('#btn-download-json').addEventListener('click', ()=>downloadJSON(results,'survey-results.json'));
    this.el.querySelector('#btn-back-survey').addEventListener('click', ()=>{ this.state.showResults=false; this.render(); });
  }

  _autoSave() { saveDraft(this.state.toDraft()); }
}
