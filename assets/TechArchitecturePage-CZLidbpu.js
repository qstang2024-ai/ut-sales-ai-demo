class c{constructor(s){this.el=s,this.render()}render(){const s=["产品定调","系统定义","数据接入与画像","知识工程","推理与风控","多模型调度与 IT 管控","落地路径与资源共建","终端展现形态","核心业务收益"],i=["产品定调","系统定义","数据画像","知识工程","推理风控","模型管控","落地共建","终端形态","业务收益"];this.el.innerHTML=`<div class="tech-arch-tab" id="tech-architecture-tab">
      <div class="deck-sticky-wrap">
        <div class="deck-sticky-header ta-header-v2">
          <div class="ta-header-glow" aria-hidden="true"></div>
          <h1 class="ta-h1-gradient">产品技术架构</h1>
          <p class="ta-sub-v2">把顶级销售经验沉淀成系统能力，让每一次客户沟通都有依据、有策略、有下一步。</p>
          <nav class="deck-toc ta-pills" id="toc-nav" role="tablist" aria-label="技术架构章节">
            ${s.map((t,a)=>`<a class="deck-toc-link ta-pill${a===0?" active":""}" data-idx="${a}" role="tab"><span class="ta-pill-num">${String(a+1).padStart(2,"0")}</span><span class="ta-pill-text">${i[a]}</span></a>`).join("")}
          </nav>
        </div>
        <div class="deck-sticky-viewport" id="deck-viewport">
          ${[0,1,2,3,4,5,6,7,8].map(t=>`<section class="deck-slide-card ta-slide-v2" id="tech-arch-${String(t+1).padStart(2,"0")}" data-idx="${t}">${this._slide(t)}</section>`).join("")}
        </div>
      </div>
    </div>`,this.viewport=this.el.querySelector("#deck-viewport"),this.links=[...this.el.querySelectorAll(".deck-toc-link")],this.sections=[...this.el.querySelectorAll(".deck-slide-card")],this._bindToc(),this._scrollSpy(),this._bindInteractions()}_bindToc(){this.links.forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();const t=+s.dataset.idx;this.links.forEach((e,p)=>e.classList.toggle("active",p===t));const a=this.sections[t];if(a&&this.viewport){const p=Math.max(0,a.offsetTop-24);this.viewport.scrollTo({top:p,behavior:"smooth"})}})})}_scrollSpy(){if(!this.viewport)return;const s=new IntersectionObserver(i=>{i.forEach(t=>{if(t.isIntersecting){const a=+t.target.dataset.idx;this.links.forEach((e,p)=>e.classList.toggle("active",p===a))}})},{root:this.viewport,threshold:.3});this.sections.forEach(i=>s.observe(i))}_bindInteractions(){if(!this.el)return;const s=this.el.querySelector(".ta-pipeline-stage");if(s){const e=()=>{s.classList.remove("ta-p1-running"),s.offsetWidth,s.classList.add("ta-p1-running")};if(s.addEventListener("mouseenter",e),"IntersectionObserver"in window){const p=new IntersectionObserver(l=>{l.forEach(o=>{o.isIntersecting&&(e(),p.disconnect())})},{threshold:.5});p.observe(s)}else e()}const i=this.el.querySelector("#ta-p2-toggle"),t=this.el.querySelector(".ta-p2-engine");i&&t&&i.addEventListener("change",e=>{const p=!!e.target.checked;t.classList.toggle("ta-p2-mode-api",p),t.classList.toggle("ta-p2-mode-poc",!p)});const a={"source-a":this.el.querySelector(".ta-p4-source-a"),"source-b":this.el.querySelector(".ta-p4-source-b"),"source-c":this.el.querySelector(".ta-p4-source-c")};this.el.querySelectorAll(".trace-trigger").forEach(e=>{e.addEventListener("mouseenter",()=>{const p=e.dataset.source,l=a[p];l&&l.classList.add("ta-traced"),e.classList.add("ta-trace-active")}),e.addEventListener("mouseleave",()=>{const p=e.dataset.source,l=a[p];l&&l.classList.remove("ta-traced"),e.classList.remove("ta-trace-active")})})}_slide(s){switch(s){case 0:return this._sHero();case 1:return this._s0();case 2:return this._s1();case 3:return this._s2();case 4:return this._s3();case 5:return this._s4();case 6:return this._s5();case 7:return this._s6();case 8:return this._s7();default:return""}}_s0(){return`<div class="ta-slide ta-v2" style="display:block">
      <div class="ta-slide-head-v2">
        <span class="ta-eyebrow">02 ｜ 系统定义</span>
        <h2 class="ta-title-v2">从"AI 问答"到<span class="ta-title-grad">端到端销售推进链路</span></h2>
        <p class="ta-desc-v2">UT 销售 AI 不替销售开口，而是在每次沟通前，把<strong>客户上下文</strong>、<strong>企业知识库</strong>和<strong>下一步动作</strong>快速串联，生成可确认、可追踪的销售建议。</p>
      </div>

      <div class="ta-pipeline-stage">
        <!-- WeChat-style customer prompt (drives the demo) -->
        <div class="ta-p1-chat" aria-label="客户消息触发流水线">
          <div class="ta-p1-chat-head">
            <span class="ta-p1-chat-avatar">客</span>
            <span class="ta-p1-chat-meta">企微客户 · 14:32</span>
            <span class="ta-p1-chat-live"><span></span>实时</span>
          </div>
          <div class="ta-p1-chat-bubble">"你们这机器能便宜点吗？"</div>
        </div>

        <div class="ta-pipeline" aria-label="6 节点端到端销售智能链路">
          <!-- flowing connector behind the nodes -->
          <svg class="ta-pipeline-flow" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="taPipeFlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stop-color="#3b82f6" stop-opacity=".0"/>
                <stop offset="50%"  stop-color="#6366f1" stop-opacity=".75"/>
                <stop offset="100%" stop-color="#7c3aed" stop-opacity=".0"/>
              </linearGradient>
              <linearGradient id="taPipeLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stop-color="#bfdbfe"/>
                <stop offset="50%"  stop-color="#a5b4fc"/>
                <stop offset="100%" stop-color="#c4b5fd"/>
              </linearGradient>
            </defs>
            <line x1="40" y1="30" x2="960" y2="30" stroke="url(#taPipeLine)" stroke-width="2" stroke-dasharray="6 6"/>
            <rect class="ta-pipeline-flow-rect" x="0" y="26" width="200" height="8" fill="url(#taPipeFlow)" rx="4"/>
          </svg>

          ${[{i:"💬",t:"客户触点",d:"企微 / 表单 / CRM"},{i:"👤",t:"沉淀画像",d:"类型 · 阶段 · 痛点"},{i:"📚",t:"检索知识",d:"卡片化业务知识库"},{i:"🧠",t:"AI 推理",d:"组装上下文与建议"},{i:"🚀",t:"销售发送",d:"人工确认后发出"},{i:"♻️",t:"反馈优化",d:"真实采纳率回流"}].map((i,t)=>`<div class="ta-pipe-node node-card" style="--ti:${t}">
            <div class="ta-pipe-cell">
              <div class="ta-pipe-icon">${i.i}</div>
              <strong>${i.t}</strong>
              <em>${i.d}</em>
            </div>
            <span class="ta-pipe-step">${String(t+1).padStart(2,"0")}</span>
          </div>`).join("")}
        </div>

        <div class="ta-pipeline-meta">
          <span class="ta-meta-dot"></span>
          <span class="ta-meta-text">每一句客户的话，都触发完整决策流水线 · 全链路可观测、可干预、可回滚</span>
          <span class="ta-meta-time">P95 ≤ 2s</span>
        </div>

        <!-- final reply slot, slides up after pipeline lights up -->
        <div class="ta-p1-reply" aria-label="销冠级回复建议">
          <div class="ta-p1-reply-tag">
            <span class="ta-p1-reply-spark">✨</span>
            销冠级回复建议
            <span class="ta-p1-reply-meta">为销售生成 · 可一键采纳</span>
          </div>
          <p>价格我们一定不让您吃亏，但<u>能省多少</u>得看您门店的<u>日单量</u>和<u>主打菜品</u>。要不下周三给您安排一次试机，按您实际场景算 ROI？</p>
        </div>
      </div>

      <div class="ta-quote-v2">
        <span class="ta-quote-ico">✨</span>
        <p>UT 销售 AI 不替销售做决定，而是让每一次跟进都<strong class="ta-quote-hl">有上下文、有依据、有下一步</strong>。</p>
      </div>
    </div>`}_s1(){const s=[{i:"💬",t:"企微沟通",r:"-3deg",tone:"a"},{i:"📊",t:"CRM 商机",r:"2deg",tone:"b"},{i:"📝",t:"销售备注",r:"-2deg",tone:"c"},{i:"🍳",t:"试菜反馈",r:"3deg",tone:"d"}],i=["API / Webhook","SCRM 中间件","文件批量导入"],t=[{k:"类型",v:"快餐连锁"},{k:"规模",v:"120 ㎡"},{k:"当前阶段",v:"需试菜"},{k:"核心痛点",v:"出餐慢"}];return`<div class="ta-slide ta-v2" style="display:block">
      <div class="ta-slide-head-v2">
        <span class="ta-eyebrow">03 ｜ 数据接入与画像</span>
        <h2 class="ta-title-v2">先看懂客户，<span class="ta-title-grad">再给出销售打法</span></h2>
        <p class="ta-desc-v2">优先从<strong>企微、CRM 和历史资料</strong>低侵入接入，POC 阶段不大改核心系统，也能先跑通客户理解能力。</p>
      </div>

      <div class="ta-p2-stage">
        <!-- LEFT · Chaos · scattered pill cards -->
        <div class="ta-p2-col ta-p2-chaos">
          <div class="ta-p2-col-tag">SOURCE · 数据源</div>
          <div class="ta-p2-chaos-stack">
            ${s.map((a,e)=>`<div class="ta-p2-pill ta-p2-pill-${a.tone}" style="transform:rotate(${a.r});--pi:${e}">
              <span>${a.i}</span>${a.t}
            </div>`).join("")}
          </div>
          <div class="ta-p2-chaos-foot">原始 · 零散 · 沉睡在不同系统里</div>
        </div>

        <!-- ARROW · LEFT → MID -->
        <svg class="ta-p2-arrow" viewBox="0 0 56 60" aria-hidden="true">
          <defs>
            <linearGradient id="taP2Arr1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stop-color="#94a3b8" stop-opacity=".0"/>
              <stop offset="100%" stop-color="#3b82f6" stop-opacity=".7"/>
            </linearGradient>
          </defs>
          <line x1="2" y1="30" x2="46" y2="30" stroke="url(#taP2Arr1)" stroke-width="2" stroke-dasharray="4 4"/>
          <path d="M44 24 L52 30 L44 36 Z" fill="#3b82f6" opacity=".7"/>
        </svg>

        <!-- MID · Engine -->
        <div class="ta-p2-col ta-p2-engine ta-p2-mode-poc">
          <!-- mode toggle: POC vs API -->
          <div class="ta-p2-toggle-wrap" role="group" aria-label="数据接入模式切换">
            <span class="ta-p2-toggle-opt ta-p2-toggle-opt-poc">POC 极速外挂</span>
            <label class="ta-p2-toggle-switch">
              <input type="checkbox" id="ta-p2-toggle" />
              <span class="ta-p2-toggle-track" aria-hidden="true">
                <span class="ta-p2-toggle-knob"></span>
              </span>
            </label>
            <span class="ta-p2-toggle-opt ta-p2-toggle-opt-api">API 全面接管</span>
          </div>

          <div class="ta-p2-poc-badge">
            <span class="ta-p2-poc-dot"></span>
            <span class="ta-p2-mode-poc-label">POC 阶段低侵入接入</span>
            <span class="ta-p2-mode-api-label">API 全面接管 · 深度融合</span>
          </div>

          <div class="ta-p2-engine-core">
            <span class="ta-p2-engine-ring ta-p2-engine-ring-1"></span>
            <span class="ta-p2-engine-ring ta-p2-engine-ring-2"></span>
            <span class="ta-p2-engine-ring ta-p2-engine-ring-3"></span>

            <!-- POC mode: funnel + gear (low-touch ingestion) -->
            <svg class="ta-p2-engine-funnel ta-p2-mode-poc-svg" viewBox="0 0 120 140" aria-hidden="true">
              <defs>
                <linearGradient id="taP2Funnel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stop-color="#60a5fa"/>
                  <stop offset="50%"  stop-color="#6366f1"/>
                  <stop offset="100%" stop-color="#7c3aed"/>
                </linearGradient>
              </defs>
              <path d="M10 15 L110 15 L78 90 L42 90 Z" fill="url(#taP2Funnel)" opacity=".95"/>
              <rect x="42" y="90" width="36" height="34" fill="url(#taP2Funnel)" opacity=".88"/>
            </svg>
            <div class="ta-p2-engine-gear ta-p2-mode-poc-svg">
              <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
                <g class="ta-p2-gear-spin" transform-origin="16 16">
                  <path d="M16 4 L18 4 L18.6 7.5 C 20 7.8 21.4 8.4 22.5 9.3 L25.7 7.6 L27.1 9 L25.4 12.2 C 26.3 13.3 26.9 14.7 27.2 16.1 L30.7 16.7 L30.7 18.7 L27.2 19.3 C 26.9 20.7 26.3 22.1 25.4 23.2 L27.1 26.4 L25.7 27.8 L22.5 26.1 C 21.4 27 20 27.6 18.6 27.9 L18 31.4 L16 31.4 L14 31.4 L13.4 27.9 C 12 27.6 10.6 27 9.5 26.1 L6.3 27.8 L4.9 26.4 L6.6 23.2 C 5.7 22.1 5.1 20.7 4.8 19.3 L1.3 18.7 L1.3 16.7 L4.8 16.1 C 5.1 14.7 5.7 13.3 6.6 12.2 L4.9 9 L6.3 7.6 L9.5 9.3 C 10.6 8.4 12 7.8 13.4 7.5 Z"
                        fill="#fff" opacity=".95"/>
                  <circle cx="16" cy="17" r="4.5" fill="#1e293b"/>
                </g>
              </svg>
            </div>

            <!-- API mode: glowing mesh node graph (deep integration) -->
            <svg class="ta-p2-engine-mesh ta-p2-mode-api-svg" viewBox="0 0 120 140" aria-hidden="true">
              <defs>
                <linearGradient id="taP2Mesh" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stop-color="#3b82f6"/>
                  <stop offset="100%" stop-color="#7c3aed"/>
                </linearGradient>
                <radialGradient id="taP2MeshNode" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stop-color="#a78bfa"/>
                  <stop offset="100%" stop-color="#4f46e5"/>
                </radialGradient>
              </defs>
              <!-- mesh edges -->
              <g stroke="url(#taP2Mesh)" stroke-width="1.4" fill="none" opacity=".55">
                <line x1="60" y1="20" x2="20" y2="55"/>
                <line x1="60" y1="20" x2="100" y2="55"/>
                <line x1="60" y1="20" x2="60" y2="70"/>
                <line x1="20" y1="55" x2="60" y2="70"/>
                <line x1="100" y1="55" x2="60" y2="70"/>
                <line x1="60" y1="70" x2="35" y2="115"/>
                <line x1="60" y1="70" x2="85" y2="115"/>
                <line x1="35" y1="115" x2="85" y2="115"/>
              </g>
              <!-- mesh nodes -->
              <circle cx="60"  cy="20"  r="8"  fill="url(#taP2MeshNode)"/>
              <circle cx="20"  cy="55"  r="6"  fill="url(#taP2MeshNode)"/>
              <circle cx="100" cy="55"  r="6"  fill="url(#taP2MeshNode)"/>
              <circle cx="60"  cy="70"  r="9"  fill="url(#taP2MeshNode)"/>
              <circle cx="35"  cy="115" r="6"  fill="url(#taP2MeshNode)"/>
              <circle cx="85"  cy="115" r="6"  fill="url(#taP2MeshNode)"/>
            </svg>
          </div>

          <div class="ta-p2-engine-label">
            <span class="ta-p2-mode-poc-label">数据接入引擎</span>
            <span class="ta-p2-mode-api-label">API 实时接管引擎</span>
          </div>
          <div class="ta-p2-engine-alt ta-p2-mode-poc-svg">
            ${i.map(a=>`<span class="ta-p2-engine-alt-chip">${a}</span>`).join("")}
          </div>
          <div class="ta-p2-engine-alt ta-p2-mode-api-svg">
            <span class="ta-p2-engine-alt-chip">REST / GraphQL</span>
            <span class="ta-p2-engine-alt-chip">Webhook 双向同步</span>
            <span class="ta-p2-engine-alt-chip">实时事件流</span>
          </div>
          <div class="ta-p2-engine-period">
            <span class="ta-p2-mode-poc-label"><strong>实施周期：3 天</strong> · 无代码侵入</span>
            <span class="ta-p2-mode-api-label"><strong>实施周期：30 天</strong> · 深度融合</span>
          </div>
          <div class="ta-p2-engine-foot">客户 90% 不改 CRM 一行代码</div>
        </div>

        <!-- ARROW · MID → RIGHT -->
        <svg class="ta-p2-arrow" viewBox="0 0 56 60" aria-hidden="true">
          <defs>
            <linearGradient id="taP2Arr2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stop-color="#7c3aed" stop-opacity=".7"/>
              <stop offset="100%" stop-color="#10b981" stop-opacity=".8"/>
            </linearGradient>
          </defs>
          <line x1="2" y1="30" x2="46" y2="30" stroke="url(#taP2Arr2)" stroke-width="2" stroke-dasharray="4 4"/>
          <path d="M44 24 L52 30 L44 36 Z" fill="#10b981" opacity=".85"/>
        </svg>

        <!-- RIGHT · Order · CRM bento -->
        <div class="ta-p2-col ta-p2-order">
          <div class="ta-p2-col-tag ta-p2-col-tag-ok">PROFILE · 客户画像</div>
          <div class="ta-p2-card">
            <div class="ta-p2-card-bar">
              <span class="ta-p2-card-dot ta-p2-card-dot-r"></span>
              <span class="ta-p2-card-dot ta-p2-card-dot-y"></span>
              <span class="ta-p2-card-dot ta-p2-card-dot-g"></span>
              <span class="ta-p2-card-title">客户档案 · v2.4</span>
            </div>
            <div class="ta-p2-card-head">
              <div class="ta-p2-card-avatar">
                <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
                  <defs>
                    <linearGradient id="taP2Av" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#3b82f6"/>
                      <stop offset="100%" stop-color="#7c3aed"/>
                    </linearGradient>
                  </defs>
                  <circle cx="18" cy="18" r="18" fill="url(#taP2Av)"/>
                  <circle cx="18" cy="14" r="5.5" fill="#fff"/>
                  <path d="M7 33 C 7 25, 29 25, 29 33 Z" fill="#fff"/>
                </svg>
              </div>
              <div class="ta-p2-card-meta">
                <strong>某快餐连锁老板</strong>
                <span>抖音线索 · 已沉淀 12 项关键字段</span>
              </div>
              <span class="ta-p2-card-pill">A · 高意向</span>
            </div>
            <div class="ta-p2-card-grid">
              ${t.map(a=>`<div class="ta-p2-card-item">
                <span class="ta-p2-card-k">${a.k}</span>
                <strong class="ta-p2-card-v">${a.v}</strong>
              </div>`).join("")}
            </div>
            <div class="ta-p2-card-foot">
              <span class="ta-p2-card-ok">✓</span>
              结构化 · 可检索 · 可流转
            </div>
          </div>
        </div>
      </div>

      <div class="ta-quote-v2">
        <span class="ta-quote-ico">🎯</span>
        <p>普通 AI 只看当前一句话；UT 销售 AI 先看<strong class="ta-quote-hl">客户是谁、聊到哪一步、下一步怎么推进</strong>。</p>
      </div>
    </div>`}_s2(){return`<div class="ta-slide ta-v2 ta-dark" style="display:block">
      <div class="ta-slide-head-v2 ta-dark-head">
        <span class="ta-eyebrow ta-eyebrow-dark">04 ｜ 知识工程</span>
        <h2 class="ta-title-v2 ta-title-dark">专有知识工程：把分散销售资料，<span class="ta-title-grad-d">沉淀成高价值数字资产</span></h2>
        <p class="ta-desc-v2 ta-desc-dark">清洗分散的销售资料与历史记录，构建企业专属销售知识资产。</p>
      </div>

      <div class="ta-p3-stage">
        <!-- LEFT · chaos raw materials -->
        <div class="ta-p3-col ta-p3-chaos">
          <div class="ta-p3-col-tag">RAW · 分散原始资料</div>
          <div class="ta-p3-chaos-stack">
            <div class="ta-p3-chaos-card ta-p3-chaos-c1">
              <span class="ta-p3-chaos-icon">💬</span>
              <strong>群聊截图</strong>
              <em>"明天能出方案吗""价格再优惠点"…</em>
            </div>
            <div class="ta-p3-chaos-card ta-p3-chaos-c2">
              <span class="ta-p3-chaos-icon">🎙</span>
              <strong>错别字语音</strong>
              <em>转写带口误、重复、寒暄</em>
            </div>
            <div class="ta-p3-chaos-card ta-p3-chaos-c3">
              <span class="ta-p3-chaos-icon">📄</span>
              <strong>过期报价单</strong>
              <em>2022 年版 · 价格已变动</em>
            </div>
            <div class="ta-p3-chaos-card ta-p3-chaos-c4">
              <span class="ta-p3-chaos-icon">📋</span>
              <strong>残缺记录</strong>
              <em>"客户姓张" "意向 ?"</em>
            </div>
          </div>
          <div class="ta-p3-chaos-warn">
            <span>⚠</span> 直接喂给 AI = 答案不可控
          </div>
        </div>

        <!-- MID · pipeline (clip-path funnel) -->
        <div class="ta-p3-col ta-p3-pipe">
          <div class="ta-p3-col-tag ta-p3-col-tag-mid">PIPELINE · 知识加工管线</div>

          <div class="ta-p3-pipe-tube">
            <div class="ta-p3-pipe-flow" aria-hidden="true">
              <span class="ta-p3-pipe-particle ta-p3-pipe-p1"></span>
              <span class="ta-p3-pipe-particle ta-p3-pipe-p2"></span>
              <span class="ta-p3-pipe-particle ta-p3-pipe-p3"></span>
              <span class="ta-p3-pipe-particle ta-p3-pipe-p4"></span>
            </div>
            <div class="ta-p3-pipe-step">
              <span class="ta-p3-pipe-num">01</span>
              <strong>关键信息提取</strong>
              <em>抽取痛点、抗拒点、成交动机</em>
            </div>
            <div class="ta-p3-pipe-step">
              <span class="ta-p3-pipe-num">02</span>
              <strong>业务标签清洗</strong>
              <em>专家校验 · 剔除无效噪音</em>
            </div>
            <div class="ta-p3-pipe-step">
              <span class="ta-p3-pipe-num">03</span>
              <strong>知识化入库</strong>
              <em>切片重组 · 建立检索索引</em>
            </div>
          </div>

          <!-- Human-in-the-loop · expert review -->
          <div class="ta-p3-review" aria-label="专家质检">
            <div class="ta-p3-review-h">
              <span class="ta-p3-review-icon">👁</span>
              <strong>专家质检 · Human-in-the-Loop</strong>
              <span class="ta-p3-review-meta">资深销售 + 产品 双盲复核</span>
            </div>
            <div class="ta-p3-review-diff">
              <div class="ta-p3-review-old"><span>—</span> "客户嫌贵，先判断价值感不足"</div>
              <div class="ta-p3-review-new"><span>+</span> 异议归类：价格敏感 · 价值证明</div>
            </div>
            <div class="ta-p3-review-actions">
              <button type="button" class="ta-p3-review-btn ta-p3-review-approve" tabindex="-1" aria-disabled="true">
                <span>✓</span> Approve · 专家审核通过
              </button>
              <button type="button" class="ta-p3-review-btn ta-p3-review-reject" tabindex="-1" aria-disabled="true">
                <span>×</span> Reject · 打回重打标签
              </button>
            </div>
          </div>

          <div class="ta-p3-pipe-meta">
            <span class="ta-p3-pipe-dot"></span>
            业务专家共建 · 持续迭代
          </div>
        </div>

        <!-- RIGHT · digital assets -->
        <div class="ta-p3-col ta-p3-assets">
          <div class="ta-p3-col-tag ta-p3-col-tag-ok">ASSETS · 销售知识资产库</div>
          <div class="ta-p3-assets-grid">
            <div class="ta-p3-asset-card">
              <span class="ta-p3-asset-icon">🗂</span>
              <strong>企业专属知识卡片</strong>
              <em>产品参数、场景方案、报价规则</em>
              <span class="ta-p3-asset-meta">维护人: 张总监 · v2.4</span>
            </div>
            <div class="ta-p3-asset-card">
              <span class="ta-p3-asset-icon">🏆</span>
              <strong>黄金语料库</strong>
              <em>优秀话术与高转化表达沉淀</em>
              <span class="ta-p3-asset-meta">维护人: 李销冠 · v3.1</span>
            </div>
            <div class="ta-p3-asset-card">
              <span class="ta-p3-asset-icon">🔮</span>
              <strong>高维向量库</strong>
              <em>相似客户、相似问题快速匹配</em>
              <span class="ta-p3-asset-meta">维护人: AI 工程组 · v1.8</span>
            </div>
            <div class="ta-p3-asset-card">
              <span class="ta-p3-asset-icon">📊</span>
              <strong>销售知识图谱</strong>
              <em>客户、场景、产品、案例联动</em>
              <span class="ta-p3-asset-meta">维护人: 数据团队 · v2.0</span>
            </div>
          </div>
        </div>
      </div>

      <div class="ta-quote-v2 ta-quote-dark">
        <span class="ta-quote-ico">💎</span>
        <p>真正值钱的不是大模型本身，而是<strong class="ta-quote-hl-d">喂给大模型的"高质量行业语料"</strong>。</p>
      </div>
    </div>`}_s3(){return`<div class="ta-slide ta-v2 ta-dark" style="display:block">
      <div class="ta-slide-head-v2 ta-dark-head">
        <span class="ta-eyebrow ta-eyebrow-dark">05 ｜ 推理与风控</span>
        <h2 class="ta-title-v2 ta-title-dark">业务级 RAG：带着客户上下文，<span class="ta-title-grad-d">生成可追踪销售建议</span></h2>
        <p class="ta-desc-v2 ta-desc-dark">不是简单搬运知识，而是结合客户阶段和业务规则生成回复草稿。</p>
      </div>

      <div class="ta-p4-stage">
        <!-- LEFT · trigger -->
        <div class="ta-p4-trigger">
          <div class="ta-p4-trigger-tag">TRIGGER · 客户提问</div>
          <div class="ta-p4-bubble">
            <span class="ta-p4-bubble-avatar">客</span>
            <span class="ta-p4-bubble-text">"这个设备适合我们快餐店吗？"</span>
          </div>
          <div class="ta-p4-trigger-arrow" aria-hidden="true">
            <svg viewBox="0 0 60 8" preserveAspectRatio="none">
              <defs>
                <linearGradient id="taP4ArrL" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#3b82f6" stop-opacity="0"/>
                  <stop offset="100%" stop-color="#8b5cf6" stop-opacity=".9"/>
                </linearGradient>
              </defs>
              <line x1="0" y1="4" x2="60" y2="4" stroke="url(#taP4ArrL)" stroke-width="1.5" stroke-dasharray="4 3"/>
            </svg>
          </div>
        </div>

        <!-- MID · 4-module assembly -->
        <div class="ta-p4-assembly">
          <!-- top row: 3 source modules feeding in -->
          <div class="ta-p4-source ta-p4-source-a">
            <span class="ta-p4-source-tag">A · 客户上下文</span>
            <p>识别客户背景：<u>80 平门店</u>、<u>午高峰缺人</u></p>
          </div>
          <div class="ta-p4-source ta-p4-source-b">
            <span class="ta-p4-source-tag">B · CRM 状态对齐</span>
            <p>判断阶段：<u>需求探索期</u>、关注<u>投入产出</u></p>
          </div>
          <div class="ta-p4-source ta-p4-source-c">
            <span class="ta-p4-source-tag">C · 精准知识抽取</span>
            <p>调用<u>小型门店方案与同类案例</u></p>
          </div>

          <!-- center D: dynamic prompt assembly slot -->
          <div class="ta-p4-core">
            <div class="ta-p4-core-rings" aria-hidden="true">
              <span class="ta-p4-core-ring ta-p4-core-ring-1"></span>
              <span class="ta-p4-core-ring ta-p4-core-ring-2"></span>
              <span class="ta-p4-core-ring ta-p4-core-ring-3"></span>
            </div>
            <div class="ta-p4-core-card">
              <span class="ta-p4-core-letter">D</span>
              <strong>智能推理槽</strong>
              <em>上下文动态组装</em>
              <div class="ta-p4-core-meter" aria-hidden="true">
                <span class="ta-p4-core-bar"></span>
              </div>
              <span class="ta-p4-core-tag">ACTIVE</span>
            </div>
          </div>

          <!-- SVG connector lines: A→D, B→D, C→D -->
          <svg class="ta-p4-lines" viewBox="0 0 600 320" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="taP4Line" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stop-color="#8b5cf6" stop-opacity=".0"/>
                <stop offset="100%" stop-color="#8b5cf6" stop-opacity=".7"/>
              </linearGradient>
            </defs>
            <path d="M100 60 Q 100 180, 300 200" stroke="url(#taP4Line)" stroke-width="1.5" stroke-dasharray="3 4" fill="none"/>
            <path d="M300 60 L 300 200" stroke="url(#taP4Line)" stroke-width="1.5" stroke-dasharray="3 4" fill="none"/>
            <path d="M500 60 Q 500 180, 300 200" stroke="url(#taP4Line)" stroke-width="1.5" stroke-dasharray="3 4" fill="none"/>
          </svg>
        </div>

        <!-- RIGHT · output -->
        <div class="ta-p4-output">
          <div class="ta-p4-trigger-arrow ta-p4-arrow-out" aria-hidden="true">
            <svg viewBox="0 0 60 8" preserveAspectRatio="none">
              <defs>
                <linearGradient id="taP4ArrR" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stop-color="#8b5cf6" stop-opacity=".9"/>
                  <stop offset="100%" stop-color="#10b981" stop-opacity=".9"/>
                </linearGradient>
              </defs>
              <line x1="0" y1="4" x2="60" y2="4" stroke="url(#taP4ArrR)" stroke-width="1.5" stroke-dasharray="4 3"/>
            </svg>
          </div>
          <div class="ta-p4-output-tag">OUTPUT · 销售级回复</div>
          <div class="ta-p4-output-card">
            <strong>不是说明书式回答，而是带依据的销售跟进建议</strong>
            <p class="ta-p4-output-sample">"您 <span class="trace-trigger" data-source="source-a">80 平的快餐店</span>，<span class="trace-trigger" data-source="source-a">午高峰</span>出餐压力集中，也关注<span class="trace-trigger" data-source="source-b">投入产出</span>。G3 标准款适合<span class="trace-trigger" data-source="source-c">小型门店</span>，可先看同类案例，再安排试机评估。"</p>
            <p class="ta-p4-output-hint">关键词可追溯 → 对应客户状态与知识依据</p>
            <div class="ta-p4-output-tags">
              <span>带画像</span><span>对阶段</span><span>引案例</span><span>有动作</span>
            </div>
          </div>
        </div>
      </div>

      <div class="ta-p4-foot">
        <span class="ta-p4-foot-icon">⚡</span>
        每一次建议背后，都会经过<strong>客户状态、知识依据和业务规则</strong>校验
      </div>

      <div class="ta-quote-v2 ta-quote-dark">
        <span class="ta-quote-ico">🧬</span>
        <p>AI 不直接对客户开口，而是给销售<strong class="ta-quote-hl-d">有依据、有边界、有下一步</strong>的建议。</p>
      </div>
    </div>`}_s4(){return`<div class="ta-slide ta-v2 ta-dark" style="display:block">
      <div class="ta-slide-head-v2 ta-dark-head">
        <span class="ta-eyebrow ta-eyebrow-dark">06 ｜ 多模型调度与 IT 管控</span>
        <h2 class="ta-title-v2 ta-title-dark">大小模型混合路由：在<span class="ta-title-grad-d">安全、效果与成本</span>之间取得最优解</h2>
        <p class="ta-desc-v2 ta-desc-dark">敏感数据优先本地处理，复杂任务按需调用高质量模型。</p>
      </div>

      <div class="ta-p5-console">
        <div class="ta-p5-console-bar">
          <span class="ta-p5-bar-dot ta-p5-bar-r"></span>
          <span class="ta-p5-bar-dot ta-p5-bar-y"></span>
          <span class="ta-p5-bar-dot ta-p5-bar-g"></span>
          <span class="ta-p5-bar-title">UT Sales · 调度控制台</span>
          <span class="ta-p5-bar-live"><span class="ta-p5-bar-live-dot"></span>Online</span>
        </div>

        <div class="ta-p5-rack">
          <!-- LEFT · local small model (green/safe) -->
          <div class="ta-p5-card ta-p5-local">
            <div class="ta-p5-card-h">
              <span class="ta-p5-card-shield">
                <svg viewBox="0 0 32 36" width="22" height="24" aria-hidden="true">
                  <defs>
                    <linearGradient id="taP5ShG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#34d399"/>
                      <stop offset="100%" stop-color="#059669"/>
                    </linearGradient>
                  </defs>
                  <path d="M16 2 L30 7 L30 18 C30 27 23 33 16 35 C9 33 2 27 2 18 L2 7 Z" fill="url(#taP5ShG)" opacity=".95"/>
                  <path d="M11 17 L15 21 L22 13" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <div>
                <strong>本地安全底座</strong>
                <em>本地轻量模型 · 脱敏处理</em>
              </div>
            </div>
            <ul class="ta-p5-tasks">
              <li><span class="ta-p5-task-tick ta-p5-task-tick-g">✓</span>意图识别</li>
              <li><span class="ta-p5-task-tick ta-p5-task-tick-g">✓</span>客户隐私脱敏</li>
              <li><span class="ta-p5-task-tick ta-p5-task-tick-g">✓</span>聊天摘要提取</li>
            </ul>
            <div class="ta-p5-meta ta-p5-meta-g">
              <span>● 敏感数据不出域</span>
              <span>● 低成本高频处理</span>
            </div>
          </div>

          <!-- CENTER · router gateway -->
          <div class="ta-p5-router">
            <div class="ta-p5-router-flow ta-p5-router-flow-l" aria-hidden="true"></div>
            <div class="ta-p5-router-flow ta-p5-router-flow-r" aria-hidden="true"></div>

            <div class="ta-p5-router-core">
              <span class="ta-p5-router-ring ta-p5-router-ring-1"></span>
              <span class="ta-p5-router-ring ta-p5-router-ring-2"></span>
              <span class="ta-p5-router-ring ta-p5-router-ring-3"></span>
              <div class="ta-p5-router-hub">
                <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
                  <g class="ta-p5-router-spin" transform-origin="16 16">
                    <circle cx="16" cy="16" r="3" fill="#fff"/>
                    <circle cx="16" cy="6"  r="2.5" fill="#34d399"/>
                    <circle cx="26" cy="16" r="2.5" fill="#a78bfa"/>
                    <circle cx="16" cy="26" r="2.5" fill="#60a5fa"/>
                    <circle cx="6"  cy="16" r="2.5" fill="#fbbf24"/>
                  </g>
                </svg>
              </div>
            </div>
            <strong class="ta-p5-router-name">智能调度网关</strong>
            <em class="ta-p5-router-sub">按任务动态路由</em>
            <div class="ta-p5-router-tags">
              <span>隐私</span><span>效果</span><span>成本</span>
            </div>
          </div>

          <!-- RIGHT · cloud big model (purple/power) -->
          <div class="ta-p5-card ta-p5-cloud">
            <div class="ta-p5-card-h">
              <span class="ta-p5-card-brain">
                <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
                  <defs>
                    <linearGradient id="taP5Bg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#a78bfa"/>
                      <stop offset="100%" stop-color="#7c3aed"/>
                    </linearGradient>
                  </defs>
                  <path d="M16 4 C 11 4 8 7 8 11 C 6 12 5 14 5 16 C 5 19 7 21 9 22 C 9 25 12 28 16 28 C 20 28 23 25 23 22 C 25 21 27 19 27 16 C 27 14 26 12 24 11 C 24 7 21 4 16 4 Z" fill="url(#taP5Bg)"/>
                  <path d="M16 9 L16 23 M11 14 L21 14 M12 18 L20 18" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
                </svg>
              </span>
              <div>
                <strong>云端高阶推理</strong>
                <em>高质量模型接口 · 复杂任务增强</em>
              </div>
            </div>
            <ul class="ta-p5-tasks">
              <li><span class="ta-p5-task-tick ta-p5-task-tick-p">✓</span>复杂客户异议处理</li>
              <li><span class="ta-p5-task-tick ta-p5-task-tick-p">✓</span>多轮沟通复盘</li>
              <li><span class="ta-p5-task-tick ta-p5-task-tick-p">✓</span>高质量话术润色</li>
            </ul>
            <div class="ta-p5-meta ta-p5-meta-p">
              <span>● 仅传脱敏后的必要上下文</span>
              <span>● 月度 Token 预算可监控</span>
            </div>
          </div>
        </div>

        <!-- CISO cockpit · cost meter + ROI bars -->
        <div class="ta-p5-ciso">
          <div class="ta-p5-ciso-card ta-p5-meter">
            <div class="ta-p5-ciso-h">
              <span class="ta-p5-ciso-tag">COST · 成本控制器</span>
              <span class="ta-p5-ciso-meta">预算监控 · 自动预警</span>
            </div>
            <div class="ta-p5-meter-row">
              <span class="ta-p5-meter-label">当前 Token 消耗</span>
              <strong class="ta-p5-meter-num">87<em>%</em></strong>
            </div>
            <div class="ta-p5-meter-bar" aria-hidden="true">
              <span class="ta-p5-meter-fill"></span>
              <span class="ta-p5-meter-tick" style="left:80%"></span>
            </div>
            <div class="ta-p5-meter-foot">
              <span><span class="ta-p5-meter-dot ta-p5-meter-dot-g"></span>正常</span>
              <span><span class="ta-p5-meter-dot ta-p5-meter-dot-y"></span>预警 80%</span>
              <span><span class="ta-p5-meter-dot ta-p5-meter-dot-r"></span>限额 100%</span>
            </div>
          </div>

          <div class="ta-p5-ciso-card ta-p5-roi">
            <div class="ta-p5-ciso-h">
              <span class="ta-p5-ciso-tag ta-p5-ciso-tag-g">ROI · 转化漏斗</span>
              <span class="ta-p5-ciso-meta">采用 AI 建议 vs 未采用</span>
            </div>
            <div class="ta-p5-roi-chart" aria-label="ROI 对比柱状图">
              <div class="ta-p5-roi-col ta-p5-roi-col-old">
                <span class="ta-p5-roi-num">15<em>%</em></span>
                <span class="ta-p5-roi-bar" style="--h:54%"></span>
                <span class="ta-p5-roi-label">未采用</span>
              </div>
              <div class="ta-p5-roi-col ta-p5-roi-col-new">
                <span class="ta-p5-roi-num">28<em>%</em></span>
                <span class="ta-p5-roi-bar" style="--h:100%"></span>
                <span class="ta-p5-roi-label">采用 AI 建议</span>
                <span class="ta-p5-roi-delta">↑ +13pt</span>
              </div>
            </div>
          </div>
        </div>

        <div class="ta-p5-stats">
          <div class="ta-p5-stat">
            <em>本地处理占比</em>
            <strong><span class="ta-p5-stat-num">~70%</span></strong>
          </div>
          <div class="ta-p5-stat">
            <em>云端增强占比</em>
            <strong><span class="ta-p5-stat-num ta-p5-stat-num-p">~30%</span></strong>
          </div>
          <div class="ta-p5-stat">
            <em>敏感数据出域</em>
            <strong><span class="ta-p5-stat-num ta-p5-stat-num-g">0</span></strong>
          </div>
          <div class="ta-p5-stat">
            <em>调度响应延迟</em>
            <strong><span class="ta-p5-stat-num">&lt;50ms</span></strong>
          </div>
        </div>
      </div>

      <div class="ta-quote-v2 ta-quote-dark">
        <span class="ta-quote-ico">🧭</span>
        <p>AI 系统的可信度，不只来自模型有多聪明，更来自它在工程上<strong class="ta-quote-hl-d">可管、可控、可追踪</strong>。</p>
      </div>
    </div>`}_s5(){return`<div class="ta-slide ta-v2 ta-dark" style="display:block">
      <div class="ta-slide-head-v2 ta-dark-head">
        <span class="ta-eyebrow ta-eyebrow-dark">07 ｜ 落地路径与资源共建</span>
        <h2 class="ta-title-v2 ta-title-dark">落地共建矩阵：联合打造<span class="ta-title-grad-d">持续进化的销售智能系统</span></h2>
        <p class="ta-desc-v2 ta-desc-dark">这不是买一套现成软件，而是共建一套可持续运营的销售智能能力。</p>
      </div>

      <div class="ta-p6-matrix">
        <!-- LEFT · client side -->
        <div class="ta-p6-side ta-p6-client">
          <div class="ta-p6-side-h">
            <span class="ta-p6-side-icon">🏢</span>
            <div>
              <strong>客户侧投入</strong>
              <em>业务资源与系统环境</em>
            </div>
            <span class="ta-p6-side-tag">CLIENT</span>
          </div>
          <ul class="ta-p6-list">
            <li class="ta-p6-item">
              <div class="ta-p6-item-h">
                <span class="ta-p6-item-num">01</span>
                <strong>业务数据协同</strong>
              </div>
              <p>开放企微、CRM 等数据入口，提供历史优质语料</p>
            </li>
            <li class="ta-p6-item">
              <div class="ta-p6-item-h">
                <span class="ta-p6-item-num">02</span>
                <strong>算力与云资源</strong>
              </div>
              <p>提供本地部署资源，并配置云端模型 API 额度</p>
            </li>
            <li class="ta-p6-item">
              <div class="ta-p6-item-h">
                <span class="ta-p6-item-num">03</span>
                <strong>一线业务反馈</strong>
              </div>
              <p>销售团队真实使用反馈，协助持续迭代</p>
            </li>
          </ul>
        </div>

        <!-- center divider with "co-build" badge -->
        <div class="ta-p6-divider" aria-hidden="true">
          <div class="ta-p6-divider-line"></div>
          <div class="ta-p6-divider-badge">
            <span class="ta-p6-divider-icon">⚡</span>
            <strong>共创</strong>
            <em>CO-BUILD</em>
          </div>
          <div class="ta-p6-divider-line"></div>
        </div>

        <!-- RIGHT · vendor side -->
        <div class="ta-p6-side ta-p6-vendor">
          <div class="ta-p6-side-h">
            <span class="ta-p6-side-icon">🛠</span>
            <div>
              <strong>我们侧交付</strong>
              <em>产品、算法与工程交付</em>
            </div>
            <span class="ta-p6-side-tag ta-p6-side-tag-v">VENDOR</span>
          </div>
          <ul class="ta-p6-list">
            <li class="ta-p6-item">
              <div class="ta-p6-item-h">
                <span class="ta-p6-item-num">01</span>
                <strong>销售 AI 系统构建</strong>
              </div>
              <p>搭建销售 AI 底座，支持内外网部署策略</p>
            </li>
            <li class="ta-p6-item">
              <div class="ta-p6-item-h">
                <span class="ta-p6-item-num">02</span>
                <strong>知识工程</strong>
              </div>
              <p>参与资料清洗，构建 RAG 知识库与检索策略</p>
            </li>
            <li class="ta-p6-item">
              <div class="ta-p6-item-h">
                <span class="ta-p6-item-num">03</span>
                <strong>持续演进</strong>
              </div>
              <p>定期复盘高价值对话，推动知识库与模型策略升级</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="ta-quote-v2 ta-quote-dark">
        <span class="ta-quote-ico">🛡</span>
        <p>用一次系统共建投入，<strong class="ta-quote-hl-d">沉淀一套持续陪跑销售团队的"智能增长底座"</strong>。</p>
      </div>
    </div>`}_s6(){return`<div class="ta-slide ta-v2" style="display:block">
      <div class="ta-slide-head-v2">
        <span class="ta-eyebrow">08 ｜ 终端展现形态</span>
        <h2 class="ta-title-v2">销售侧 Copilot：<span class="ta-title-grad">嵌入真实工作流</span>，不增加销售负担</h2>
        <p class="ta-desc-v2">不新建复杂入口、不打断销售流程，让 AI 建议自然出现在企微与 CRM 场景中。</p>
      </div>

      <div class="ta-p7-stage">
        <!-- LEFT · WeCom-style sidebar surface -->
        <div class="ta-p7-card">
          <div class="ta-p7-card-tag">WECOM · 企微侧边栏</div>

          <div class="ta-p7-wecom">
            <!-- left: chat thread -->
            <div class="ta-p7-wecom-chat">
              <div class="ta-p7-wecom-chat-h">
                <span class="ta-p7-wecom-avatar">客</span>
                <div>
                  <strong>张老板 · 快餐连锁</strong>
                  <em>企微客户 · 14:32</em>
                </div>
              </div>
              <div class="ta-p7-wecom-bubble ta-p7-wecom-bubble-them">
                "你们这价格有点高，<u>能不能再优惠点</u>？"
              </div>
              <div class="ta-p7-wecom-bubble-meta">·  ·  ·</div>
            </div>

            <!-- right: AI sidebar pops in -->
            <aside class="ta-p7-wecom-side">
              <div class="ta-p7-wecom-side-h">
                <span class="ta-p7-wecom-spark">✨</span>
                <strong>AI 跟进建议</strong>
                <span class="ta-p7-wecom-fresh">刚生成</span>
              </div>
              <p class="ta-p7-wecom-side-text">
                价格是否划算，关键要看您门店<u>日单量</u>和<u>高峰出餐压力</u>。可以先看同类案例，再按实际场景测算 ROI。
              </p>
              <div class="ta-p7-wecom-side-actions">
                <button type="button" class="ta-p7-wecom-btn ta-p7-wecom-btn-primary" tabindex="-1">采纳并发送</button>
                <button type="button" class="ta-p7-wecom-btn" tabindex="-1">编辑</button>
              </div>
            </aside>
          </div>

          <div class="ta-p7-card-foot">
            <span class="ta-p7-card-dot"></span>
            自动嵌入企微侧边栏 · 销售无需跳转
          </div>
        </div>

        <!-- RIGHT · CRM detail page with floating AI assistant -->
        <div class="ta-p7-card">
          <div class="ta-p7-card-tag">CRM · 客户详情页</div>

          <div class="ta-p7-crm">
            <!-- mock CRM page skeleton -->
            <div class="ta-p7-crm-bar">
              <span class="ta-p7-crm-back">‹</span>
              <span class="ta-p7-crm-title">CRM · 客户详情</span>
              <span class="ta-p7-crm-tabs">
                <span class="ta-p7-crm-tab ta-p7-crm-tab-active">概览</span>
                <span class="ta-p7-crm-tab">商机</span>
                <span class="ta-p7-crm-tab">沟通</span>
              </span>
            </div>
            <div class="ta-p7-crm-body">
              <div class="ta-p7-crm-summary">
                <div class="ta-p7-crm-line"><span>客户类型</span>快餐连锁</div>
                <div class="ta-p7-crm-line"><span>当前阶段</span>价格异议 / 试机前</div>
                <div class="ta-p7-crm-line"><span>核心关注</span>投入产出、出餐效率</div>
                <div class="ta-p7-crm-line"><span>建议动作</span>发送同类案例，预约试机评估</div>
              </div>
              <div class="ta-p7-crm-row ta-p7-crm-row-lg"></div>
              <div class="ta-p7-crm-row ta-p7-crm-row-sm"></div>
            </div>

            <!-- floating AI assistant button with ripples -->
            <div class="ta-p7-crm-fab" aria-label="AI 助手悬浮按钮">
              <span class="ta-p7-fab-ripple"></span>
              <span class="ta-p7-fab-ripple ta-p7-fab-ripple-2"></span>
              <span class="ta-p7-fab-ripple ta-p7-fab-ripple-3"></span>
              <span class="ta-p7-fab-core">
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <defs>
                    <linearGradient id="taP7Fab" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#60a5fa"/>
                      <stop offset="100%" stop-color="#7c3aed"/>
                    </linearGradient>
                  </defs>
                  <path d="M12 3 L14 9 L20 11 L14 13 L12 19 L10 13 L4 11 L10 9 Z" fill="url(#taP7Fab)"/>
                </svg>
              </span>
            </div>
          </div>

          <div class="ta-p7-card-foot">
            <span class="ta-p7-card-dot ta-p7-card-dot-p"></span>
            悬浮于 CRM 页面 · 监听客户上下文 · 实时沉淀商机
          </div>
        </div>
      </div>

      <div class="ta-quote-v2">
        <span class="ta-quote-ico">✨</span>
        <p>最好的 AI 工具，<strong class="ta-quote-hl">不打断销售工作流，只在关键时刻给出下一步建议</strong>。</p>
      </div>
    </div>`}_s7(){return`<div class="ta-slide ta-v2" style="display:block">
      <div class="ta-slide-head-v2">
        <span class="ta-eyebrow">09 ｜ 核心业务收益</span>
        <h2 class="ta-title-v2">从"个人销冠"到<span class="ta-title-grad">"组织级智能"</span>的增长飞轮</h2>
        <p class="ta-desc-v2">不止降本增效，更把顶级销售经验沉淀为企业可复用的增长资产。</p>
      </div>

      <div class="ta-p8-grid">
        <!-- Card 1 · talent enablement -->
        <article class="ta-p8-card ta-p8-card-1">
          <div class="ta-p8-card-h">
            <span class="ta-p8-card-icon">🎓</span>
            <span class="ta-p8-card-tag">人才赋能</span>
          </div>
          <h3 class="ta-p8-card-title">新人破冰期缩短</h3>
          <div class="ta-p8-card-stat">
            <span class="ta-p8-stat-from">3 个月</span>
            <span class="ta-p8-stat-arrow">→</span>
            <strong class="ta-p8-stat-to">3 周</strong>
          </div>
          <div class="ta-p8-line-chart" aria-label="新人成长曲线" aria-hidden="true">
            <svg viewBox="0 0 200 70" preserveAspectRatio="none">
              <defs>
                <linearGradient id="taP8L1Area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stop-color="#3b82f6" stop-opacity=".25"/>
                  <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
                </linearGradient>
                <linearGradient id="taP8L1Line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stop-color="#3b82f6"/>
                  <stop offset="100%" stop-color="#7c3aed"/>
                </linearGradient>
              </defs>
              <!-- subtle grid -->
              <g stroke="#e2e8f0" stroke-width=".5">
                <line x1="0" y1="20" x2="200" y2="20"/>
                <line x1="0" y1="40" x2="200" y2="40"/>
                <line x1="0" y1="60" x2="200" y2="60"/>
              </g>
              <path d="M0 65 L25 60 L50 56 L75 50 L100 40 L125 28 L150 18 L175 10 L200 6 L200 70 L0 70 Z" fill="url(#taP8L1Area)"/>
              <path d="M0 65 L25 60 L50 56 L75 50 L100 40 L125 28 L150 18 L175 10 L200 6"
                    fill="none" stroke="url(#taP8L1Line)" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round"
                    pathLength="100"
                    class="ta-p8-line-path"/>
              <!-- moving dot follows the path via offset-path-like animation -->
              <circle r="4" fill="#fff" stroke="#3b82f6" stroke-width="2" class="ta-p8-line-dot">
                <animateMotion dur="4s" repeatCount="indefinite"
                               path="M0 65 L25 60 L50 56 L75 50 L100 40 L125 28 L150 18 L175 10 L200 6"/>
              </circle>
            </svg>
          </div>
          <p class="ta-p8-card-desc">复用高手判断逻辑、追问节奏和异议处理，新人更快达到稳定销售状态。</p>
        </article>

        <!-- Card 2 · risk control -->
        <article class="ta-p8-card ta-p8-card-2">
          <div class="ta-p8-card-h">
            <span class="ta-p8-card-icon">🛡</span>
            <span class="ta-p8-card-tag ta-p8-card-tag-g">风控合规</span>
          </div>
          <h3 class="ta-p8-card-title">话术违规风险</h3>
          <div class="ta-p8-card-stat">
            <strong class="ta-p8-stat-to ta-p8-stat-to-g">接近 0%</strong>
          </div>
          <div class="ta-p8-shield" aria-hidden="true">
            <svg viewBox="0 0 100 110" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="taP8ShieldG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stop-color="#34d399"/>
                  <stop offset="100%" stop-color="#059669"/>
                </linearGradient>
                <linearGradient id="taP8Sweep" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stop-color="#ffffff" stop-opacity="0"/>
                  <stop offset="50%"  stop-color="#ffffff" stop-opacity=".55"/>
                  <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
                </linearGradient>
                <clipPath id="taP8ShieldClip">
                  <path d="M50 6 L88 18 L88 52 C 88 78 72 95 50 102 C 28 95 12 78 12 52 L12 18 Z"/>
                </clipPath>
              </defs>
              <path d="M50 6 L88 18 L88 52 C 88 78 72 95 50 102 C 28 95 12 78 12 52 L12 18 Z"
                    fill="url(#taP8ShieldG)" opacity=".95"/>
              <path d="M32 52 L46 66 L70 38" stroke="#fff" stroke-width="5"
                    fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <!-- glossy sweep highlight -->
              <g clip-path="url(#taP8ShieldClip)">
                <rect x="-100" y="0" width="80" height="110" fill="url(#taP8Sweep)"
                      class="ta-p8-shield-sweep"/>
              </g>
            </svg>
          </div>
          <p class="ta-p8-card-desc">减少过度承诺与随意报价，关键动作保留 AI 草稿、销售确认与全链路追踪。</p>
        </article>

        <!-- Card 3 · revenue -->
        <article class="ta-p8-card ta-p8-card-3">
          <div class="ta-p8-card-h">
            <span class="ta-p8-card-icon">📈</span>
            <span class="ta-p8-card-tag ta-p8-card-tag-p">业绩增长</span>
          </div>
          <h3 class="ta-p8-card-title">核心线索转化率</h3>
          <div class="ta-p8-card-stat">
            <strong class="ta-p8-stat-to ta-p8-stat-to-p">提升 20%–35%</strong>
          </div>
          <div class="ta-p8-bars" aria-label="转化率对比柱状图">
            <div class="ta-p8-bar-col">
              <span class="ta-p8-bar ta-p8-bar-old" style="--h:42%"></span>
              <span class="ta-p8-bar-label">未上 AI</span>
              <span class="ta-p8-bar-num">15%</span>
            </div>
            <div class="ta-p8-bar-col">
              <span class="ta-p8-bar ta-p8-bar-new" style="--h:62%"></span>
              <span class="ta-p8-bar-label">+20%</span>
              <span class="ta-p8-bar-num">22%</span>
            </div>
            <div class="ta-p8-bar-col">
              <span class="ta-p8-bar ta-p8-bar-new ta-p8-bar-best" style="--h:96%"></span>
              <span class="ta-p8-bar-label">+35%</span>
              <span class="ta-p8-bar-num">28%</span>
            </div>
          </div>
          <p class="ta-p8-card-desc">画像、追问、案例和下一步动作协同，让高意向客户更快进入试机和报价阶段。</p>
        </article>
      </div>

      <div class="ta-quote-v2">
        <span class="ta-quote-ico">💎</span>
        <p>购买的不是一套软件，而是<strong class="ta-quote-hl">为销售组织沉淀一套持续进化的"智能增长大脑"</strong>。</p>
      </div>
    </div>`}_sHero(){return`<div class="ta-slide ta-v2 ta-hero" style="display:block">
      <div class="ta-hero-head">
        <span class="ta-eyebrow ta-hero-eyebrow">01 ｜ 产品定调</span>
        <h2 class="ta-hero-title">把 5 年的<span class="ta-hero-grad">顶级销售经验</span>，写进每一行代码</h2>
        <p class="ta-hero-sub">告别"只会背资料"的通用客服。UT 销售 AI 把<strong>优秀销售的判断逻辑</strong>和<strong>成交经验</strong>，沉淀成可复用的系统能力。</p>
      </div>

      <div class="ta-hero-vs">
        <!-- LEFT · The Bad · generic chatbot -->
        <div class="ta-hero-col ta-hero-bad">
          <div class="ta-hero-col-tag ta-hero-col-tag-bad">通用大模型 · The Bad</div>

          <div class="ta-hero-bad-mock" aria-label="平庸聊天框示意">
            <div class="ta-hero-bad-bar">
              <span class="ta-hero-bad-dot"></span>
              <span class="ta-hero-bad-dot"></span>
              <span class="ta-hero-bad-dot"></span>
              <span class="ta-hero-bad-title">通用 Chatbot</span>
            </div>
            <div class="ta-hero-bad-body">
              <div class="ta-hero-bad-bubble ta-hero-bad-bubble-them">"你们这机器多少钱？"</div>
              <div class="ta-hero-bad-bubble ta-hero-bad-bubble-self">"标准款大约 X 万元 / Y 万元 / Z 万元，请问您选哪款？"</div>
              <div class="ta-hero-bad-bubble ta-hero-bad-bubble-them">"太贵了。"</div>
              <div class="ta-hero-bad-bubble ta-hero-bad-bubble-self">"好的，请问您的预算是？"</div>
              <div class="ta-hero-bad-meta">— 客户离开 —</div>
            </div>
          </div>

          <div class="ta-hero-bad-tags">
            <span class="ta-hero-tag-bad">一问一答</span>
            <span class="ta-hero-tag-bad">背诵参数</span>
            <span class="ta-hero-tag-bad">被客户牵着走</span>
          </div>
        </div>

        <!-- VS divider -->
        <div class="ta-hero-divider" aria-hidden="true">
          <span class="ta-hero-divider-line"></span>
          <span class="ta-hero-divider-badge">VS</span>
          <span class="ta-hero-divider-line"></span>
        </div>

        <!-- RIGHT · The Good · decision tree + business code -->
        <div class="ta-hero-col ta-hero-good">
          <div class="ta-hero-col-tag ta-hero-col-tag-good">业务代码化 · The Good</div>

          <div class="ta-hero-tree" aria-label="多轮博弈策略树">
            <svg class="ta-hero-tree-svg" viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="taHeroLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stop-color="#3b82f6" stop-opacity=".25"/>
                  <stop offset="50%"  stop-color="#6366f1" stop-opacity=".75"/>
                  <stop offset="100%" stop-color="#7c3aed" stop-opacity=".25"/>
                </linearGradient>
              </defs>
              <!-- bezier links: root → split, split → 2 children, child → leaf -->
              <path d="M180 30 C 180 60, 90  60, 90  90"  stroke="url(#taHeroLine)" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>
              <path d="M180 30 C 180 60, 270 60, 270 90"  stroke="url(#taHeroLine)" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>
              <path d="M90  120 C 90  150, 130 150, 130 180" stroke="url(#taHeroLine)" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>
              <path d="M270 120 C 270 150, 230 150, 230 180" stroke="url(#taHeroLine)" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>
              <path d="M130 210 C 130 220, 180 220, 180 230" stroke="url(#taHeroLine)" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>
              <path d="M230 210 C 230 220, 180 220, 180 230" stroke="url(#taHeroLine)" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>

              <!-- flowing photons along the bezier paths -->
              <circle r="3.5" fill="#3b82f6" class="ta-hero-photon">
                <animateMotion dur="3.6s" repeatCount="indefinite"
                               path="M180 30 C 180 60, 90 60, 90 90 L 90 120 C 90 150, 130 150, 130 180 L 130 210 C 130 220, 180 220, 180 230"/>
              </circle>
              <circle r="3.5" fill="#6366f1" class="ta-hero-photon">
                <animateMotion dur="3.6s" begin="1.2s" repeatCount="indefinite"
                               path="M180 30 C 180 60, 270 60, 270 90 L 270 120 C 270 150, 230 150, 230 180 L 230 210 C 230 220, 180 220, 180 230"/>
              </circle>
              <circle r="2.6" fill="#7c3aed" class="ta-hero-photon">
                <animateMotion dur="3.6s" begin="2.4s" repeatCount="indefinite"
                               path="M180 30 C 180 60, 90 60, 90 90 L 90 120 C 90 150, 130 150, 130 180"/>
              </circle>
            </svg>

            <!-- decision tree nodes (overlay HTML on SVG via absolute positioning) -->
            <div class="ta-hero-node ta-hero-node-root" style="--x:50%;--y:0">
              <span class="ta-hero-node-label">意图识别</span>
              <strong>嫌贵</strong>
            </div>
            <div class="ta-hero-node ta-hero-node-l" style="--x:25%;--y:38%">
              <span class="ta-hero-node-label">策略分发</span>
              <strong>痛点挖掘</strong>
            </div>
            <div class="ta-hero-node ta-hero-node-r" style="--x:75%;--y:38%">
              <span class="ta-hero-node-label">策略分发</span>
              <strong>价值锚定</strong>
            </div>
            <div class="ta-hero-node ta-hero-node-l2" style="--x:36%;--y:75%">
              <span class="ta-hero-node-label">动作</span>
              <strong>抛出竞品劣势</strong>
            </div>
            <div class="ta-hero-node ta-hero-node-r2" style="--x:64%;--y:75%">
              <span class="ta-hero-node-label">动作</span>
              <strong>同行 ROI 案例</strong>
            </div>
            <div class="ta-hero-node ta-hero-node-leaf" style="--x:50%;--y:100%">
              <span class="ta-hero-node-label">转化</span>
              <strong>促单试用</strong>
              <span class="ta-hero-node-fire">✓</span>
            </div>
          </div>

          <!-- code fade-out at the bottom of the tree -->
          <div class="ta-hero-code" aria-hidden="true">
            <div class="ta-hero-code-line"><span class="ta-hero-code-kw">if</span> (intent === <span class="ta-hero-code-str">'price_objection'</span>) {</div>
            <div class="ta-hero-code-line ta-hero-code-indent">strategy = <span class="ta-hero-code-fn">probePainPoint</span>();</div>
            <div class="ta-hero-code-line ta-hero-code-indent"><span class="ta-hero-code-fn">triggerStrategy</span>(strategy, <span class="ta-hero-code-str">'抛出竞品劣势'</span>);</div>
            <div class="ta-hero-code-line">} <span class="ta-hero-code-kw">else if</span> (stage === <span class="ta-hero-code-str">'high_intent'</span>) {</div>
            <div class="ta-hero-code-line ta-hero-code-indent"><span class="ta-hero-code-fn">pushTrial</span>();  <span class="ta-hero-code-cmt">// 促单试用</span></div>
            <div class="ta-hero-code-line">}</div>
          </div>

          <div class="ta-hero-good-tags">
            <span class="ta-hero-tag-good">多轮博弈</span>
            <span class="ta-hero-tag-good">阶段探测</span>
            <span class="ta-hero-tag-good">主动逼单</span>
          </div>
        </div>
      </div>

      <div class="ta-quote-v2 ta-hero-quote">
        <span class="ta-quote-ico">⚡</span>
        <p>通用模型回答客户问题；UT 销售 AI 帮销售<strong class="ta-quote-hl">推进下一步</strong>。</p>
      </div>
    </div>`}}export{c as TechArchitecturePage};
