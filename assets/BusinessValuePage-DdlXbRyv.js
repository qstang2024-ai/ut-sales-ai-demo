class u{constructor(a){this.el=a,this.render()}render(){const a=[{no:"01",label:"销售漏水",id:"bv-s0",title:"销售部门正在悄悄漏水",desc:"线索、信息、客户、经验，都可能在每天的销售过程中悄悄流失。",todo:"后续补充：线索之漏、信息之漏、客户之漏、经验之漏，以及典型客户首次咨询场景。"},{no:"02",label:"人机协同",id:"bv-s1",title:"AI 不替人接待客户，而是在背后帮人把客户接得更好",desc:'普通 Chatbot 解决"怎么回答一句话"，UT 销售 AI 助手解决"怎么帮助真人销售更专业地推进客户"。',todo:"后续补充：AI 不直接报价、不直接承诺、不替销售做关键决策；客户看到的是人，销售背后站着 AI。"},{no:"03",label:"牛马助理",id:"bv-s2",title:'给每个销售配一个"牛马助理"和"销冠教练"',desc:"先替销售干重复活，再把高手经验带到每一次沟通里。",todo:"后续补充：牛马助理负责自动摘要、补档、提醒、记录；销冠教练负责追问建议、异议处理、案例推荐和下一步动作。"},{no:"04",label:"客户资产",id:"bv-s3",title:"客户资产跟着系统走，不跟着人走",desc:"从聊天记录到客户档案，让销售、经销商、售后都带着完整上下文接手。",todo:"后续补充：客户画像、信息状态、需求痛点、菜品设备、业务流程、交接服务等客户档案卡。"},{no:"05",label:"销售武器库",id:"bv-s4",title:"从死话术本，到动态进化的销售武器库",desc:"把高频问题、有效话术、成交案例和失败原因，沉淀为团队可复用的销售动作。",todo:"后续补充：客户问题归类、有效话术沉淀、丢单原因库、竞品异议趋势、人工审核和知识淘汰机制。"},{no:"06",label:"经营数字",id:"bv-s5",title:"老板月度经营会上，多看到 5 个关键数字",desc:"不画增长中枢的大饼，用真实过程数据帮助管理层复盘销售、识别风险、判断投入产出。",todo:"后续补充：线索承接率、有效客户转化率、高风险客户数、客户异议与丢单原因 Top 5、销售跟进质量，以及 30–60 天 POC 验证指标。"}];this.el.innerHTML=`<div class="bv-wrap">
      <div class="bv-hero">
        <h1>业务价值：把销售过程里的隐形损失，变成可管理的增长机会</h1>
        <p>UT 销售 AI 助手不是替代销售，也不是让客户面对机器人，而是在销售与坐席背后，帮助团队接住线索、补全信息、沉淀客户、复用经验，并让管理层看见真实销售过程。</p>
        <nav class="bv-stepper" id="toc-nav">${a.map((p,e)=>`<a class="bv-step${e===0?" active":""}" data-idx="${e}"><span class="bv-step-num">${p.no}</span>${p.label}</a>`).join('<span class="bv-step-sep"></span>')}</nav>
      </div>
      <div class="bv-viewport" id="bv-vp">
        ${a.map((p,e)=>`<section class="bv-slide" id="${p.id}" data-idx="${e}">${this._slide(p)}</section>`).join("")}
      </div>
    </div>`,this.vp=this.el.querySelector("#bv-vp"),this.links=[...this.el.querySelectorAll(".bv-step")],this.slides=[...this.el.querySelectorAll(".bv-slide")],this._bind()}_slide(a){switch(a.id){case"bv-s0":return this._p1(a);case"bv-s1":return this._p2(a);case"bv-s2":return this._p3(a);case"bv-s3":return this._p4(a);case"bv-s4":return this._p5(a);case"bv-s5":return this._p6(a);default:return`<span class="bv-slide-num">${a.no}｜${a.title}</span>
        <h2 class="bv-slide-title">${a.title}</h2>
        <p class="bv-slide-desc">${a.desc}</p>`}}_p1(a){const p=[{tag:"线索之漏",icon:"📥",text:"抖音、官网、展会、转介绍线索没被及时响应、没被正确初筛，很多机会在第一次沟通前后就已经流失。"},{tag:"信息之漏",icon:"🧩",text:"客户聊过什么、关心什么、预算如何、谁是决策人、下一步该做什么，散落在聊天记录和销售记忆里。"},{tag:"客户之漏",icon:"🔗",text:"销售换人、经销商接手、售后介入时，客户上下文断层，新接手的人又要重新问客户一遍。"},{tag:"经验之漏",icon:"💡",text:"老销售的有效话术、成交案例、失败原因和异议处理经验，很少真正进入系统。人走了，经验也走了。"}];return`<span class="bv-slide-num bv-num-danger">${a.no}｜${a.title}</span>
      <h2 class="bv-slide-title bv-p1-title">销售部门正在悄悄<span class="bv-p1-bleed">漏水</span></h2>
      <p class="bv-slide-desc">${a.desc}</p>

      <div class="bv-p1-stage">
        <!-- 3D funnel SVG -->
        <div class="bv-p1-funnel-wrap" aria-label="销售漏斗：60 接住 / 30 有效沟通 / 50% 蒸发">
          <svg class="bv-p1-funnel-svg" viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="bvP1FunnelTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stop-color="#3b82f6"/>
                <stop offset="100%" stop-color="#6366f1"/>
              </linearGradient>
              <linearGradient id="bvP1FunnelBottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stop-color="#6366f1"/>
                <stop offset="100%" stop-color="#7c3aed"/>
              </linearGradient>
              <linearGradient id="bvP1FunnelEdge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stop-color="#fb923c" stop-opacity=".0"/>
                <stop offset="60%"  stop-color="#fb923c" stop-opacity=".55"/>
                <stop offset="100%" stop-color="#ef4444" stop-opacity=".85"/>
              </linearGradient>
              <filter id="bvP1Glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <!-- top wide trapezoid -->
            <path d="M40 30 L480 30 L360 180 L160 180 Z" fill="url(#bvP1FunnelTop)" opacity=".95"/>
            <!-- highlight edge top -->
            <path d="M40 30 L480 30 L470 50 L50 50 Z" fill="rgba(255,255,255,.18)"/>
            <!-- bottleneck -->
            <path d="M160 180 L360 180 L320 290 L200 290 Z" fill="url(#bvP1FunnelBottom)" opacity=".95"/>
            <!-- danger edge glow on the inner V where leaks happen -->
            <path d="M160 180 L200 290 L320 290 L360 180" fill="none" stroke="url(#bvP1FunnelEdge)" stroke-width="3"/>
            <!-- numeric labels on the funnel itself -->
            <text x="260" y="115" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800"
                  font-size="56" fill="#fff" filter="url(#bvP1Glow)">60</text>
            <text x="260" y="145" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700"
                  font-size="13" fill="rgba(255,255,255,.85)" letter-spacing="2">被及时接住</text>
            <text x="260" y="245" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800"
                  font-size="38" fill="#fff">30</text>
            <text x="260" y="270" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700"
                  font-size="11" fill="rgba(255,255,255,.85)" letter-spacing="2">有效沟通</text>

            <!-- droplets falling from the bottleneck edges -->
            <g class="bv-p1-drops">
              <circle class="bv-p1-drop bv-p1-drop-1" cx="190" cy="200" r="6" fill="#fb923c"/>
              <circle class="bv-p1-drop bv-p1-drop-2" cx="330" cy="200" r="5" fill="#ef4444"/>
              <circle class="bv-p1-drop bv-p1-drop-3" cx="210" cy="220" r="4" fill="#fb923c"/>
              <circle class="bv-p1-drop bv-p1-drop-4" cx="310" cy="220" r="6" fill="#ef4444"/>
              <circle class="bv-p1-drop bv-p1-drop-5" cx="180" cy="240" r="5" fill="#fb923c"/>
              <circle class="bv-p1-drop bv-p1-drop-6" cx="340" cy="240" r="4" fill="#ef4444"/>
            </g>
          </svg>

          <!-- right-side floating loss callout -->
          <div class="bv-p1-loss-callout">
            <span class="bv-p1-loss-arrow">↳</span>
            <div>
              <strong class="bv-p1-loss-num">50%</strong>
              <span class="bv-p1-loss-text">资产在不知不觉中蒸发</span>
            </div>
          </div>

          <!-- top numeric chip -->
          <div class="bv-p1-top-chip"><em>100</em><span>线索进来</span></div>
          <div class="bv-p1-bot-chip"><em>3</em><span>真正成交</span></div>
        </div>
      </div>

      <div class="bv-p1-grid">
        ${p.map(e=>`<div class="bv-p1-card">
          <div class="bv-p1-card-bar"></div>
          <div class="bv-p1-h">
            <span class="bv-p1-icon">${e.icon}</span>
            <strong>${e.tag}</strong>
            <span class="bv-p1-alarm">●</span>
          </div>
          <p>${e.text}</p>
        </div>`).join("")}
      </div>

      <!-- WeChat-like crash scene -->
      <div class="bv-p1-chat">
        <div class="bv-p1-chat-head">
          <span class="bv-p1-chat-avatar">客</span>
          <strong>客户咨询 · 抖音线索</strong>
          <span class="bv-p1-chat-warn">⚠️ 典型早期线索浪费</span>
        </div>
        <div class="bv-p1-chat-body">
          <div class="bv-p1-bubble bv-p1-b-customer">你们炒菜机多少钱？</div>
          <div class="bv-p1-bubble bv-p1-b-sales">
            <span class="bv-p1-b-x">❌</span>
            "标准款大概几万到十几万吧" — 只回价格 · 没有追问
          </div>
          <div class="bv-p1-bubble bv-p1-b-customer bv-p1-b-fade">…（客户已退出对话）</div>
        </div>
      </div>

      <div class="bv-quote bv-quote-dark">
        <span class="bv-quote-icon">💧</span>
        销售增长的第一步，不是让销售更努力，而是先<em>堵住每天看不见的流失</em>。
      </div>`}_p2(a){const p=["客户问什么，系统答什么","机械、套话、容易冒犯客户","难以处理复杂 B2B 销售","客户感觉自己在跟机器人沟通"],e=["识别客户来源与潜在意向","整理客户信息、提醒销售追问","推荐合适话术与同类客户案例","判断风险客户、沉淀客户档案"],i=[{i:"💰",t:"AI 不直接报价"},{i:"⏱️",t:"AI 不直接承诺交付时间"},{i:"🚦",t:"AI 不替销售做关键决策"},{i:"👤",t:"不在高价值客户面前假装真人"}];return`<span class="bv-slide-num">${a.no}｜${a.title}</span>
      <h2 class="bv-slide-title">${a.title}</h2>
      <p class="bv-slide-desc">${a.desc}</p>

      <div class="bv-p2-positioner">
        <span class="bv-p2-positioner-dot"></span>
        客户看到的是<em>人</em>，销售背后站着 <em>AI</em>
      </div>

      <!-- arena: split + radar VS badge -->
      <div class="bv-p2-arena">
        <div class="bv-p2-col bv-p2-bot">
          <div class="bv-p2-col-tag">PAST</div>
          <div class="bv-p2-col-h">
            <span class="bv-p2-col-icon bv-p2-col-icon-bot">
              <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
                <rect x="6" y="10" width="20" height="16" rx="3" fill="#94a3b8"/>
                <rect x="13" y="4" width="6" height="6" rx="1.5" fill="#94a3b8"/>
                <circle cx="11" cy="17" r="2" fill="#fff"/>
                <circle cx="21" cy="17" r="2" fill="#fff"/>
                <rect x="11" y="22" width="10" height="1.6" fill="#fff"/>
              </svg>
            </span>
            <div>
              <strong>普通 Chatbot</strong>
              <em>解决"怎么回答一句话"</em>
            </div>
          </div>
          <ul class="bv-p2-list bv-p2-list-bot">${p.map(s=>`<li><span class="bv-p2-dot-bot"></span>${s}</li>`).join("")}</ul>
          <div class="bv-p2-col-foot">客户像在被机器应付</div>
        </div>

        <div class="bv-p2-vs" aria-hidden="true">
          <div class="bv-p2-vs-radar">
            <span class="bv-p2-vs-ring bv-p2-vs-ring-1"></span>
            <span class="bv-p2-vs-ring bv-p2-vs-ring-2"></span>
            <span class="bv-p2-vs-ring bv-p2-vs-ring-3"></span>
            <span class="bv-p2-vs-core">VS</span>
          </div>
          <div class="bv-p2-vs-label">进 化 线</div>
        </div>

        <div class="bv-p2-col bv-p2-ut">
          <div class="bv-p2-col-tag bv-p2-col-tag-now">NOW</div>
          <div class="bv-p2-col-h">
            <span class="bv-p2-col-icon bv-p2-col-icon-ut">
              <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
                <defs>
                  <linearGradient id="bvP2Compass" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#60a5fa"/>
                    <stop offset="100%" stop-color="#a78bfa"/>
                  </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="13" fill="url(#bvP2Compass)"/>
                <path d="M16 6 L19 16 L16 26 L13 16 Z" fill="#fff"/>
                <circle cx="16" cy="16" r="2.4" fill="#fff"/>
              </svg>
            </span>
            <div>
              <strong>UT 销售 AI 助手</strong>
              <em>解决"怎么帮真人销售推进客户"</em>
            </div>
          </div>
          <ul class="bv-p2-list bv-p2-list-ut">${e.map(s=>`<li><span class="bv-p2-check">✓</span>${s}</li>`).join("")}</ul>
          <div class="bv-p2-col-foot bv-p2-col-foot-ut">销售像被武装的专业团队</div>
        </div>
      </div>

      <!-- shields -->
      <div class="bv-p2-shields">
        <div class="bv-p2-shields-title">
          <span class="bv-p2-shields-icon">🛡</span>
          <span>人机协同边界 · 管理层放心</span>
        </div>
        <div class="bv-p2-shields-grid">
          ${i.map(s=>`<div class="bv-p2-shield" aria-label="${s.t}">
            <svg class="bv-p2-shield-bg" viewBox="0 0 80 90" aria-hidden="true">
              <defs>
                <linearGradient id="bvP2ShieldG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#1e293b"/>
                  <stop offset="100%" stop-color="#0f172a"/>
                </linearGradient>
              </defs>
              <path d="M40 4 L74 14 L74 46 C74 68 58 82 40 86 C22 82 6 68 6 46 L6 14 Z"
                    fill="url(#bvP2ShieldG)" stroke="#fcd34d" stroke-width="1.2" opacity=".96"/>
            </svg>
            <span class="bv-p2-shield-icon">${s.i}</span>
            <strong class="bv-p2-shield-text">${s.t}</strong>
          </div>`).join("")}
        </div>
      </div>

      <!-- side-by-side scene with AI floating panel -->
      <div class="bv-p2-scene">
        <div class="bv-p2-scene-head">
          <span class="bv-p2-scene-tag">场景</span>
          <span class="bv-p2-scene-q">客户问"为什么比某品牌贵？"</span>
        </div>
        <div class="bv-p2-scene-row">
          <div class="bv-p2-scene-bot">
            <div class="bv-p2-scene-bot-h">
              <span class="bv-p2-scene-x">✕</span>
              <strong>被动回复</strong>
            </div>
            <p>套用标准价格说明，可能引发新的异议、把客户推到犹豫期</p>
          </div>
          <div class="bv-p2-scene-ut">
            <div class="bv-p2-scene-ut-h">
              <div class="bv-p2-scene-chat-mock">
                <div class="bv-p2-scene-bubble">客户：为什么比某品牌贵？</div>
                <div class="bv-p2-scene-bubble bv-p2-scene-bubble-self">销售：…正在思考</div>
              </div>
              <div class="bv-p2-scene-ai">
                <div class="bv-p2-scene-ai-h">
                  <span class="bv-p2-scene-ai-spark">✨</span>
                  <strong>AI 提示</strong>
                  <span class="bv-p2-scene-ai-live"></span>
                </div>
                <p>先识别客户关心点（价格 / 回本 / 出品稳定 / 人工替代），再建议引用<u>同类客户案例</u>和<u>试菜结果</u>，最后由销售改写发送</p>
                <button class="bv-p2-scene-ai-btn" type="button">一键应用 →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bv-quote bv-quote-dark">
        <span class="bv-quote-icon">🤝</span>
        AI 不替人建立信任，AI 帮人<em>更快</em>建立信任。
      </div>`}_p3(a){const p=[{i:"⚙️",t:"自动整理客户聊天摘要"},{i:"⚡",t:"自动提取来源 / 需求 / 预算"},{i:"📋",t:"自动生成跟进记录"},{i:"⏰",t:"自动提醒超时未跟、报价沉默"}],e=[{i:"🎯",t:"关键时刻的追问建议"},{i:"📡",t:"高频异议的处理思路"},{i:"👑",t:"同类客户的成交案例"},{i:"🧭",t:"清晰的下一步动作"}];return`<span class="bv-slide-num">${a.no}｜${a.title}</span>
      <h2 class="bv-slide-title">${a.title}</h2>
      <p class="bv-slide-desc">${a.desc}</p>

      <!-- center-hub cockpit -->
      <div class="bv-p3-cockpit">
        <!-- left panel: niu ma (executor) -->
        <div class="bv-p3-panel bv-p3-niu">
          <div class="bv-p3-panel-tag">EXECUTOR · 执行层</div>
          <div class="bv-p3-h">
            <span class="bv-p3-emoji">🐂</span>
            <div>
              <strong>牛马助理</strong>
              <em>替销售干重复活</em>
            </div>
          </div>
          <ul>${p.map(i=>`<li><span class="bv-p3-li-i">${i.i}</span>${i.t}</li>`).join("")}</ul>
          <div class="bv-p3-note">不是让销售多录入，<br/>而是从已有沟通中自动提取</div>
        </div>

        <!-- center hub -->
        <div class="bv-p3-hub">
          <!-- pulse rings -->
          <span class="bv-p3-pulse bv-p3-pulse-1"></span>
          <span class="bv-p3-pulse bv-p3-pulse-2"></span>
          <span class="bv-p3-pulse bv-p3-pulse-3"></span>

          <!-- energy lines (svg paths with flowing particles) -->
          <svg class="bv-p3-lines" viewBox="0 0 600 280" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="bvP3LineL" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stop-color="#f59e0b" stop-opacity=".0"/>
                <stop offset="50%"  stop-color="#f59e0b" stop-opacity=".55"/>
                <stop offset="100%" stop-color="#f59e0b" stop-opacity=".0"/>
              </linearGradient>
              <linearGradient id="bvP3LineR" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stop-color="#3b82f6" stop-opacity=".0"/>
                <stop offset="50%"  stop-color="#3b82f6" stop-opacity=".55"/>
                <stop offset="100%" stop-color="#3b82f6" stop-opacity=".0"/>
              </linearGradient>
            </defs>
            <!-- left → center curves -->
            <path d="M0 80 C 200 80, 220 140, 300 140" stroke="url(#bvP3LineL)" stroke-width="2" fill="none"/>
            <path d="M0 200 C 200 200, 220 140, 300 140" stroke="url(#bvP3LineL)" stroke-width="2" fill="none"/>
            <!-- center → right curves -->
            <path d="M300 140 C 380 140, 400 80, 600 80"  stroke="url(#bvP3LineR)" stroke-width="2" fill="none"/>
            <path d="M300 140 C 380 140, 400 200, 600 200" stroke="url(#bvP3LineR)" stroke-width="2" fill="none"/>
          </svg>

          <!-- particles flowing in -->
          <span class="bv-p3-particle bv-p3-particle-l1"></span>
          <span class="bv-p3-particle bv-p3-particle-l2"></span>
          <span class="bv-p3-particle bv-p3-particle-r1"></span>
          <span class="bv-p3-particle bv-p3-particle-r2"></span>

          <!-- center avatar -->
          <div class="bv-p3-avatar-wrap">
            <div class="bv-p3-avatar">
              <svg viewBox="0 0 48 48" width="42" height="42" aria-hidden="true">
                <circle cx="24" cy="18" r="9" fill="#fff"/>
                <path d="M8 42 C 8 32, 40 32, 40 42 Z" fill="#fff"/>
              </svg>
            </div>
            <strong>销售 · 你</strong>
            <span>背后站着两个角色</span>
          </div>
        </div>

        <!-- right panel: coach (strategy) -->
        <div class="bv-p3-panel bv-p3-coach">
          <div class="bv-p3-panel-tag bv-p3-panel-tag-coach">STRATEGY · 策略层</div>
          <div class="bv-p3-h">
            <span class="bv-p3-emoji">🏆</span>
            <div>
              <strong>销冠教练</strong>
              <em>把高手经验带到每次沟通</em>
            </div>
          </div>
          <ul>${e.map(i=>`<li><span class="bv-p3-li-i">${i.i}</span>${i.t}</li>`).join("")}</ul>
          <div class="bv-p3-note">不是复制 Top Sales 全部能力，<br/>而是把关键动作复用到每个销售身边</div>
        </div>
      </div>

      <!-- side-by-side scene -->
      <div class="bv-p3-scene">
        <div class="bv-p3-scene-head">
          <span class="bv-p3-scene-tag">场景</span>
          <span class="bv-p3-scene-q">客户问"你们炒菜机多少钱一台？"</span>
        </div>
        <div class="bv-p3-scene-row">
          <div class="bv-p3-scene-old">
            <div class="bv-p3-scene-old-card">
              <span class="bv-p3-scene-avatar">销</span>
              <span class="bv-p3-scene-msg">"不同型号价格不一样，大概几万到十几万。"</span>
            </div>
            <div class="bv-p3-scene-redcard">
              <span class="bv-p3-scene-redcard-icon">⛔</span>
              <div>
                <strong>Direct Quote Danger</strong>
                <em>容易当成普通询价流失</em>
              </div>
            </div>
          </div>

          <!-- right: dark SaaS sidebar mockup -->
          <div class="bv-p3-scene-saas">
            <div class="bv-p3-saas-titlebar">
              <span class="bv-p3-saas-dot bv-p3-saas-dot-r"></span>
              <span class="bv-p3-saas-dot bv-p3-saas-dot-y"></span>
              <span class="bv-p3-saas-dot bv-p3-saas-dot-g"></span>
              <span class="bv-p3-saas-title">UT Sales · 客户对话工作台</span>
              <span class="bv-p3-saas-live">● Live</span>
            </div>
            <div class="bv-p3-saas-body">
              <div class="bv-p3-saas-conv">
                <div class="bv-p3-saas-bubble">客户：你们炒菜机多少钱一台？</div>
                <div class="bv-p3-saas-bubble bv-p3-saas-bubble-self">销售：…</div>
              </div>
              <aside class="bv-p3-saas-side">
                <div class="bv-p3-saas-side-h">
                  <span class="bv-p3-saas-side-spark">✨</span>
                  <strong>AI 销冠教练 · 提示</strong>
                </div>
                <p class="bv-p3-saas-side-text">
                  <em>不要急着报价！</em>先确认<u>门店类型</u>、<u>日出餐量</u>、<u>菜品结构</u>、是否连锁、人工成本痛点，再推荐合适型号和案例。
                </p>
                <div class="bv-p3-saas-side-tags">
                  <span>追问</span><span>客户分级</span><span>同类案例</span>
                </div>
                <button class="bv-p3-saas-apply" type="button">
                  <span>一键应用该话术</span>
                  <em>→</em>
                </button>
              </aside>
            </div>
          </div>
        </div>
      </div>

      <div class="bv-quote bv-quote-night">
        <span class="bv-quote-icon">🤖</span>
        先做销售的<em>牛马助理</em>，再做销售的<em>销冠教练</em>。
      </div>`}_p4(a){const p=[{i:"👤",t:"客户画像",d:"快餐 · 120㎡ · 主理人决策",tag:"已确认",tone:"ok"},{i:"📋",t:"信息状态",d:"画像 86% 完整 · 待补预算",tag:"待补充",tone:"warn"},{i:"🎯",t:"需求痛点",d:"午高峰人手不够 · 想稳口味",tag:"极高意向",tone:"hot"},{i:"📦",t:"菜品设备",d:"G3 标准版 · 匹配度 92%",tag:"已推荐",tone:"ok"},{i:"📍",t:"业务流程",d:"阶段 04 · 待邀约试菜",tag:"阶段 04",tone:"info"},{i:"🔄",t:"交接服务",d:"销售 / 经销商 / 售后",tag:"同步中",tone:"sync"}],e=[{r:"销售",d:"接手不从零开始，几分钟看到客户卡点和下一步建议",t:"09:24",avatar:"SA"},{r:"经销商",d:"本地拜访带着完整背景，不需要客户重复讲一遍",t:"10:08",avatar:"DL"},{r:"售后",d:"清楚客户为什么买、最关心什么、曾经卡在哪里",t:"14:42",avatar:"CS"}];return`<span class="bv-slide-num">${a.no}｜${a.title}</span>
      <h2 class="bv-slide-title">${a.title}</h2>
      <p class="bv-slide-desc">${a.desc}</p>

      <div class="bv-p4-stage">
        <!-- LEFT · Chaos: scattered chat bubbles + Excel ghost background -->
        <div class="bv-p4-chaos">
          <div class="bv-p4-chaos-head">
            <span class="bv-p4-chaos-tag">PAST · 散落状态</span>
            <span class="bv-p4-chaos-meta">易丢失 · 不可追溯</span>
          </div>
          <div class="bv-p4-chaos-stage" aria-hidden="true">
            <!-- blurred Excel ghost background -->
            <div class="bv-p4-excel-ghost">
              <div class="bv-p4-excel-row bv-p4-excel-head"><span>客户</span><span>需求</span><span>状态</span><span>跟进</span></div>
              ${[1,2,3,4,5,6].map(()=>'<div class="bv-p4-excel-row"><span></span><span></span><span></span><span></span></div>').join("")}
            </div>

            <div class="bv-p4-bubble bv-p4-b-1">
              <div class="bv-p4-b-meta">客户 · 14:32</div>
              "我们做快餐，店面 120 平左右"
            </div>
            <div class="bv-p4-bubble bv-p4-b-2">
              <div class="bv-p4-b-meta">客户 · 15:08</div>
              "主要午高峰人手不够"
            </div>
            <div class="bv-p4-bubble bv-p4-b-3">
              <div class="bv-p4-b-meta">客户 · 次日 09:14</div>
              "上次说的方案能再发一下吗？"
            </div>
            <div class="bv-p4-sticky">
              <span class="bv-p4-sticky-pin">📌</span>
              <em>销售个人备注</em>
              "记得先打电话…"
            </div>

            <div class="bv-p4-chaos-warn">
              <span>⚠</span> 散落在企微 · 销售记忆 · Excel
            </div>
          </div>
        </div>

        <!-- AI Refinery funnel between LEFT and CENTER -->
        <div class="bv-p4-refinery" aria-hidden="true">
          <svg class="bv-p4-refinery-svg" viewBox="0 0 80 320" preserveAspectRatio="none">
            <defs>
              <linearGradient id="bvP4FunnelG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stop-color="#60a5fa" stop-opacity=".0"/>
                <stop offset="40%"  stop-color="#3b82f6" stop-opacity=".7"/>
                <stop offset="100%" stop-color="#7c3aed" stop-opacity=".95"/>
              </linearGradient>
            </defs>
            <path d="M0 20 L80 20 L52 300 L28 300 Z" fill="url(#bvP4FunnelG)" opacity=".88"/>
            <path d="M0 20 L80 20 L52 300 L28 300 Z" fill="none" stroke="#60a5fa" stroke-width="1" stroke-opacity=".5"/>
          </svg>
          <div class="bv-p4-refinery-core">
            <span class="bv-p4-refinery-spin">⚙</span>
            <em>AI 提炼</em>
          </div>
          <span class="bv-p4-refinery-particle bv-p4-refinery-p1"></span>
          <span class="bv-p4-refinery-particle bv-p4-refinery-p2"></span>
          <span class="bv-p4-refinery-particle bv-p4-refinery-p3"></span>
        </div>

        <!-- CENTER · Order: CRM sidebar bento grid -->
        <div class="bv-p4-crm">
          <div class="bv-p4-crm-frame">
            <!-- macOS-like titlebar -->
            <div class="bv-p4-crm-bar">
              <span class="bv-p4-crm-dot bv-p4-crm-dot-r"></span>
              <span class="bv-p4-crm-dot bv-p4-crm-dot-y"></span>
              <span class="bv-p4-crm-dot bv-p4-crm-dot-g"></span>
              <span class="bv-p4-crm-bar-title">UT Sales · 客户档案</span>
              <span class="bv-p4-crm-bar-sync">● 已同步</span>
            </div>

            <!-- profile head -->
            <div class="bv-p4-crm-head">
              <div class="bv-p4-crm-avatar">
                <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
                  <defs>
                    <linearGradient id="bvP4Av" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#3b82f6"/>
                      <stop offset="100%" stop-color="#7c3aed"/>
                    </linearGradient>
                  </defs>
                  <circle cx="20" cy="20" r="20" fill="url(#bvP4Av)"/>
                  <circle cx="20" cy="16" r="6" fill="#fff"/>
                  <path d="M8 36 C 8 28, 32 28, 32 36 Z" fill="#fff"/>
                </svg>
              </div>
              <div class="bv-p4-crm-meta">
                <strong>张老板 · 快餐门店主理人</strong>
                <span>抖音线索 · 2026-05-12 接入 · 当前阶段 04</span>
              </div>
              <span class="bv-p4-crm-pill bv-p4-crm-pill-hot">A · 高意向</span>
            </div>

            <!-- bento grid -->
            <div class="bv-p4-bento">
              ${p.map(i=>`<div class="bv-p4-bento-card">
                <div class="bv-p4-bento-h">
                  <span class="bv-p4-bento-icon">${i.i}</span>
                  <strong>${i.t}</strong>
                  <span class="bv-p4-bento-tag bv-p4-bento-tag-${i.tone}">${i.tag}</span>
                </div>
                <p>${i.d}</p>
              </div>`).join("")}
            </div>
          </div>
        </div>

        <!-- RIGHT · Sync: vertical green timeline -->
        <div class="bv-p4-sync">
          <div class="bv-p4-sync-head">
            <span class="bv-p4-sync-tag">SYNC · 多角色接手</span>
            <span class="bv-p4-sync-pulse"></span>
          </div>
          <div class="bv-p4-timeline">
            ${e.map((i,s)=>`<div class="bv-p4-tl-row">
              <div class="bv-p4-tl-rail">
                <div class="bv-p4-tl-node"></div>
                ${s<e.length-1?'<div class="bv-p4-tl-line"></div>':""}
              </div>
              <div class="bv-p4-tl-card">
                <div class="bv-p4-tl-card-h">
                  <span class="bv-p4-tl-avatar">${i.avatar}</span>
                  <strong>${i.r}</strong>
                  <span class="bv-p4-tl-time">${i.t}</span>
                </div>
                <p>${i.d}</p>
                <span class="bv-p4-tl-status">✓ 上下文已同步</span>
              </div>
            </div>`).join("")}
          </div>
        </div>
      </div>

      <!-- past vs now split scene -->
      <div class="bv-p4-split">
        <div class="bv-p4-split-head">
          <span class="bv-p4-split-tag">场景</span>
          <span class="bv-p4-split-q">A 类客户聊了 2 周，销售临时离职</span>
        </div>
        <div class="bv-p4-split-body">
          <div class="bv-p4-split-old">
            <div class="bv-p4-split-old-h">
              <span class="bv-p4-split-old-icon">💀</span>
              <strong>过去</strong>
            </div>
            <p>新销售翻聊天记录、甚至要客户重新讲一遍 — 客户耐心被消耗</p>
          </div>
          <div class="bv-p4-split-divider"></div>
          <div class="bv-p4-split-new">
            <div class="bv-p4-split-new-h">
              <span class="bv-p4-split-new-icon">✓</span>
              <strong>现在</strong>
              <span class="bv-p4-split-new-time">≤ 5 min</span>
            </div>
            <p>新销售打开档案，几分钟看到画像、卡点、推荐和下一步动作</p>
          </div>
        </div>
      </div>

      <div class="bv-quote bv-quote-dark bv-quote-anchor">
        <span class="bv-quote-icon">🗂️</span>
        真正的客户资产，不是<em>好友列表</em>，而是<em>完整上下文</em>。
      </div>`}_p5(a){return`<span class="bv-slide-num">${a.no}｜${a.title}</span>
      <h2 class="bv-slide-title">${a.title}</h2>
      <p class="bv-slide-desc">${a.desc}</p>

      <!-- security banner -->
      <div class="bv-p5-banner">
        <div class="bv-p5-banner-icon">
          <span class="bv-p5-banner-shield">🛡</span>
          <span class="bv-p5-banner-pulse"></span>
        </div>
        <div class="bv-p5-banner-text">
          <strong>不是所有聊天都直接进入知识库</strong>
          <span>高频问题、有效话术、成交案例和失败原因 → 经过<u>系统筛选</u>与<u>人工确认</u>；过期内容、错误话术、低质量记录会被标记、修订或淘汰。</span>
        </div>
        <span class="bv-p5-banner-tag">人工防线</span>
      </div>

      <!-- refining engine: input · core · output -->
      <div class="bv-p5-engine">
        <!-- LEFT · raw material pool -->
        <div class="bv-p5-input">
          <div class="bv-p5-input-h">
            <span>📥</span>
            <strong>原始素材池</strong>
            <em>每天持续涌入</em>
          </div>
          <div class="bv-p5-input-stack">
            <div class="bv-p5-raw bv-p5-raw-q">
              <span class="bv-p5-raw-tag">客户问什么</span>
              <p>"为什么比某品牌贵？"</p>
              <p class="bv-p5-raw-dim">"能用我们门店现有食材吗？"</p>
              <p class="bv-p5-raw-dim">"你们能上门安装吗？"</p>
            </div>
            <div class="bv-p5-raw bv-p5-raw-a">
              <span class="bv-p5-raw-tag">销售怎么答</span>
              <p>"按场景给您算 ROI…"</p>
              <p class="bv-p5-raw-dim">"先约一次试菜验证…"</p>
              <p class="bv-p5-raw-dim">"标准款主要差在…"</p>
            </div>
          </div>
          <div class="bv-p5-input-meta">
            <span class="bv-p5-input-bar"></span>
            <em>每日 ~ 800 条</em>
          </div>
        </div>

        <!-- CENTER · refining core -->
        <div class="bv-p5-core">
          <div class="bv-p5-core-rings" aria-hidden="true">
            <span class="bv-p5-core-ring bv-p5-core-ring-1"></span>
            <span class="bv-p5-core-ring bv-p5-core-ring-2"></span>
            <span class="bv-p5-core-ring bv-p5-core-ring-3"></span>
          </div>
          <div class="bv-p5-core-engine">
            <svg viewBox="0 0 80 80" width="60" height="60" aria-hidden="true">
              <defs>
                <linearGradient id="bvP5Gear" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#60a5fa"/>
                  <stop offset="100%" stop-color="#a78bfa"/>
                </linearGradient>
              </defs>
              <g class="bv-p5-gear-rotate" transform-origin="40 40">
                <path d="M40 6 L46 6 L48 16 C 52 17 56 19 59 22 L68 19 L73 24 L70 33 C 73 36 75 40 76 44 L86 46 L86 52 L76 54 C 75 58 73 62 70 65 L73 74 L68 79 L59 76 C 56 79 52 81 48 82 L46 92 L40 92 L34 92 L32 82 C 28 81 24 79 21 76 L12 79 L7 74 L10 65 C 7 62 5 58 4 54 L-6 52 L-6 46 L4 44 C 5 40 7 36 10 33 L7 24 L12 19 L21 22 C 24 19 28 17 32 16 Z"
                      fill="url(#bvP5Gear)" opacity=".95" transform="translate(0 -6)"/>
                <circle cx="40" cy="34" r="11" fill="#0f172a"/>
                <circle cx="40" cy="34" r="6"  fill="url(#bvP5Gear)"/>
              </g>
            </svg>
            <strong>AI + 人工 · 双重审核</strong>
            <em>归类 → 验证 → 沉淀 → 修订</em>
          </div>
          <div class="bv-p5-core-flow">
            <span class="bv-p5-core-arrow bv-p5-core-arrow-in">←</span>
            <span class="bv-p5-core-label">提炼</span>
            <span class="bv-p5-core-arrow bv-p5-core-arrow-out">→</span>
          </div>
        </div>

        <!-- RIGHT · output (gold + trash) -->
        <div class="bv-p5-output">
          <div class="bv-p5-gold">
            <div class="bv-p5-gold-h">
              <span class="bv-p5-gold-icon">🏆</span>
              <strong>有效话术 / 案例</strong>
              <em>金块入库</em>
            </div>
            <ul>
              <li><span class="bv-p5-gold-dot"></span>价格异议 · ROI 引导版（v2.1）</li>
              <li><span class="bv-p5-gold-dot"></span>同类快餐门店成交案例 · 12 例</li>
              <li><span class="bv-p5-gold-dot"></span>试菜邀约话术 · 转化 +18%</li>
            </ul>
          </div>
          <div class="bv-p5-trash">
            <div class="bv-p5-trash-h">
              <span class="bv-p5-trash-icon">🗑</span>
              <strong>淘汰话术</strong>
              <em>下架修订</em>
            </div>
            <ul>
              <li><span class="bv-p5-trash-strike">直接报价 · 标准模板</span></li>
              <li><span class="bv-p5-trash-strike">竞品对比 · 旧版本（错误数据）</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- premium weapon-grade case card -->
      <div class="bv-p5-weapon" tabindex="0">
        <div class="bv-p5-weapon-head">
          <div class="bv-p5-weapon-tagrow">
            <span class="bv-p5-weapon-tag">高频价格异议 V2.1</span>
            <span class="bv-p5-weapon-version">最近 30 天 · 已审核</span>
          </div>
          <div class="bv-p5-weapon-stats">
            <div class="bv-p5-weapon-stat">
              <em>使用次数</em>
              <strong>1.2k</strong>
            </div>
            <div class="bv-p5-weapon-stat bv-p5-weapon-stat-up">
              <em>转化率提升</em>
              <strong>+15%</strong>
              <span class="bv-p5-weapon-up">📈</span>
            </div>
          </div>
        </div>
        <div class="bv-p5-weapon-body">
          <div class="bv-p5-weapon-q">
            <span class="bv-p5-weapon-q-pre">客户问</span>
            <strong>"你们为什么比某竞品贵？"</strong>
          </div>
          <div class="bv-p5-weapon-flow">
            <div class="bv-p5-weapon-step">
              <span class="bv-p5-weapon-step-n">01</span>
              <strong>归为高频价格异议</strong>
              <em>归类 · 自动</em>
            </div>
            <span class="bv-p5-weapon-arrow">→</span>
            <div class="bv-p5-weapon-step">
              <span class="bv-p5-weapon-step-n">02</span>
              <strong>收集销售有效回答</strong>
              <em>真实对话 · 12 条</em>
            </div>
            <span class="bv-p5-weapon-arrow">→</span>
            <div class="bv-p5-weapon-step">
              <span class="bv-p5-weapon-step-n">03</span>
              <strong>同类客户案例 + 试菜结果</strong>
              <em>知识链接 · 4 篇</em>
            </div>
            <span class="bv-p5-weapon-arrow">→</span>
            <div class="bv-p5-weapon-step bv-p5-weapon-step-final">
              <span class="bv-p5-weapon-step-n">04</span>
              <strong>沉淀为新版异议处理建议</strong>
              <em>已上架 · 团队可复用</em>
            </div>
          </div>
        </div>
      </div>

      <div class="bv-quote bv-quote-dark bv-quote-gold">
        <span class="bv-quote-icon">⚔️</span>
        真正有价值的知识库，不是存了多少文档，而是沉淀了多少<em>被实战验证过的赢单动作</em>。
      </div>`}_p6(a){const p=[{n:"01",i:"📈",t:"渠道线索承接率",v:"92",unit:"%",delta:"+15%",deltaTone:"up",d:"多少线索被及时响应、进入有效客户池",m:"判断营销预算是否被浪费",size:"lg",tone:"ok",spark:[35,42,40,48,52,58,62,68,72,78,82,88,90,92]},{n:"02",i:"🎯",t:"有效客户转化率",v:"38",unit:"%",delta:"+9pt",deltaTone:"up",d:"线索 → 有效客户 → 商机 → 试菜/报价/成交",m:"看清漏斗到底卡在哪",size:"lg",tone:"ctx",spark:[24,26,25,28,30,29,32,33,35,34,36,37,38,38]},{n:"03",i:"⚠",t:"高风险客户数",v:"14",unit:"位",delta:"报价后沉默",deltaTone:"warn",d:"报价后沉默 / 长时间未跟 / 即将流失",m:"提前干预关键客户",size:"sm",tone:"hot",spark:[6,8,7,9,10,11,12,13,12,13,13,14,14,14]},{n:"04",i:"🗣",t:"丢单原因 Top 3",v:"价格 · 交付 · 决策链",unit:"",delta:"本月聚焦",deltaTone:"ctx",d:"反馈产品、价格、市场策略",m:"",size:"sm",tone:"ctx",spark:null},{n:"05",i:"⏱",t:"销售跟进质量",v:"8.6",unit:"/10",delta:"+0.8",deltaTone:"up",d:"响应速度 / 信息完整度 / 下一步明确度",m:"从看结果，到看过程",size:"sm",tone:"ok",spark:[6.4,6.8,7.1,7,7.4,7.6,7.8,8,8.1,8.3,8.4,8.5,8.6,8.6]}],e=s=>{if(!s||!s.length)return"";const v=120,t=32,n=2,o=Math.max(...s),l=Math.min(...s),d=o-l||1;return s.map((b,c)=>{const r=n+c*(v-n*2)/(s.length-1),g=t-n-(b-l)/d*(t-n*2);return`${c===0?"M":"L"}${r.toFixed(1)} ${g.toFixed(1)}`}).join(" ")},i=s=>{if(!s||!s.length)return"";const v=120,t=32,n=2,o=Math.max(...s),l=Math.min(...s),d=o-l||1,b=s.map((c,r)=>{const g=n+r*(v-n*2)/(s.length-1),f=t-n-(c-l)/d*(t-n*2);return`${g.toFixed(1)},${f.toFixed(1)}`});return`M${n},${t-n} L${b.join(" L")} L${v-n},${t-n} Z`};return`<span class="bv-slide-num">${a.no}｜${a.title}</span>
      <h2 class="bv-slide-title">${a.title}</h2>
      <p class="bv-slide-desc">${a.desc}</p>

      <div class="bv-p6-grid">
        <!-- LEFT · Executive Dashboard -->
        <section class="bv-p6-dash" aria-label="经营看板">
          <header class="bv-p6-dash-head">
            <div>
              <span class="bv-p6-dash-tag">EXECUTIVE DASHBOARD</span>
              <strong>老板战情大屏</strong>
            </div>
            <div class="bv-p6-dash-meta">
              <span class="bv-p6-dash-live"></span>
              <em>实时更新 · 2026-05 月度视图</em>
            </div>
          </header>

          <div class="bv-p6-bento">
            ${p.map(s=>`<article class="bv-p6-cell bv-p6-cell-${s.size} bv-p6-cell-${s.tone}">
              <div class="bv-p6-cell-h">
                <span class="bv-p6-cell-num">${s.n}</span>
                <span class="bv-p6-cell-icon">${s.i}</span>
                <strong>${s.t}</strong>
                ${s.tone==="hot"?'<span class="bv-p6-cell-warn-light"></span>':""}
              </div>
              <div class="bv-p6-cell-value">
                <span class="bv-p6-cell-num-big">${s.v}</span>
                ${s.unit?`<em class="bv-p6-cell-unit">${s.unit}</em>`:""}
                ${s.delta?`<span class="bv-p6-cell-delta bv-p6-cell-delta-${s.deltaTone}">
                  ${s.deltaTone==="up"?"↑":s.deltaTone==="warn"?"●":""} ${s.delta}
                </span>`:""}
              </div>
              ${s.spark?`<svg class="bv-p6-spark" viewBox="0 0 120 32" aria-hidden="true" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bvP6Spark${s.n}" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stop-color="${s.tone==="hot"?"#ef4444":s.tone==="ok"?"#10b981":"#3b82f6"}" stop-opacity=".35"/>
                    <stop offset="100%" stop-color="${s.tone==="hot"?"#ef4444":s.tone==="ok"?"#10b981":"#3b82f6"}" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path d="${i(s.spark)}" fill="url(#bvP6Spark${s.n})"/>
                <path d="${e(s.spark)}" fill="none" stroke="${s.tone==="hot"?"#ef4444":s.tone==="ok"?"#10b981":"#3b82f6"}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`:""}
              <p class="bv-p6-cell-desc">${s.d}</p>
              ${s.m?`<div class="bv-p6-cell-mean"><span>管理意义</span>${s.m}</div>`:""}
            </article>`).join("")}
          </div>
        </section>

        <!-- RIGHT · Receipt + CTA -->
        <aside class="bv-p6-side">
          <!-- ROI receipt -->
          <div class="bv-p6-receipt">
            <div class="bv-p6-receipt-head">
              <span class="bv-p6-receipt-tag">RECEIPT · 保守 ROI 估算</span>
              <span class="bv-p6-receipt-cal">🧮</span>
            </div>
            <div class="bv-p6-receipt-line">
              <span class="bv-p6-receipt-label">先算确定节省</span>
              <strong class="bv-p6-receipt-num">100–200 <em>小时/月</em></strong>
              <p class="bv-p6-receipt-note">10 名销售 × 每人每天 30–60 分钟<br/>整理记录 / 补信息</p>
            </div>
            <div class="bv-p6-receipt-divider" aria-hidden="true"></div>
            <div class="bv-p6-receipt-line">
              <span class="bv-p6-receipt-label">再算保守增量</span>
              <strong class="bv-p6-receipt-num bv-p6-receipt-num-pop">2–3 <em>个/月</em></strong>
              <p class="bv-p6-receipt-note">每月 1000 条线索中，多识别<br/>原本会流失的高意向客户</p>
            </div>
            <div class="bv-p6-receipt-divider" aria-hidden="true"></div>
            <div class="bv-p6-receipt-foot">
              <span>=</span>
              <p>系统价值即可覆盖成本<br/><em>最终按客户实际线索量、客单价、转化率与销售人效校准</em></p>
            </div>
          </div>

          <!-- POC stepper + CTA -->
          <div class="bv-p6-poc">
            <div class="bv-p6-poc-head">
              <span class="bv-p6-poc-tag">CALL TO ACTION</span>
              <strong>30–60 天 POC 共创</strong>
              <em>不全员铺开 · 真实数据判断</em>
            </div>

            <div class="bv-p6-stepper">
              <div class="bv-p6-step bv-p6-step-active">
                <span class="bv-p6-step-num">1</span>
                <strong>选定 1 个</strong>
                <em>线索渠道</em>
              </div>
              <div class="bv-p6-step-line"></div>
              <div class="bv-p6-step bv-p6-step-active">
                <span class="bv-p6-step-num">2</span>
                <strong>选定 1 个</strong>
                <em>销售小组</em>
              </div>
              <div class="bv-p6-step-line"></div>
              <div class="bv-p6-step bv-p6-step-active">
                <span class="bv-p6-step-num">3</span>
                <strong>选定 1 个</strong>
                <em>客户场景</em>
              </div>
            </div>

            <ul class="bv-p6-verify">
              <li><span>✓</span>线索承接率是否提升</li>
              <li><span>✓</span>客户信息完整度是否提升</li>
              <li><span>✓</span>销售跟进及时率是否提升</li>
            </ul>

            <button type="button" class="bv-p6-cta">
              <span class="bv-p6-cta-pulse" aria-hidden="true"></span>
              <span class="bv-p6-cta-text">立即开启 POC 共创项目</span>
              <span class="bv-p6-cta-arrow">→</span>
            </button>
            <p class="bv-p6-cta-foot">先用 30 天，看真实数据 · 再决定是否继续</p>
          </div>
        </aside>
      </div>

      <div class="bv-quote bv-quote-dark bv-quote-anchor">
        <span class="bv-quote-icon">🧭</span>
        老板真正需要的不是更多<em>销售汇报</em>，而是更真实的<em>销售过程数据</em>。
      </div>`}_bind(){let a=0;if(this.links.forEach(e=>e.addEventListener("click",i=>{i.preventDefault();const s=+e.dataset.idx;if(this.links.forEach((v,t)=>v.classList.toggle("active",t===s)),a=Date.now()+600,this.vp){const v=this.slides[s].getBoundingClientRect(),t=this.vp.getBoundingClientRect();this.vp.scrollTo({top:this.vp.scrollTop+v.top-t.top-16,behavior:"smooth"})}})),!this.vp)return;const p=new IntersectionObserver(e=>{Date.now()<a||e.forEach(i=>{if(i.isIntersecting){const s=+i.target.dataset.idx;this.links.forEach((v,t)=>v.classList.toggle("active",t===s))}})},{root:this.vp,threshold:.45,rootMargin:"-10% 0px -10% 0px"});this.slides.forEach(e=>p.observe(e))}_s0(){const a=[{strong:"自动理解客户上下文",text:"不用反复翻聊天记录，AI 自动总结客户背景、历史沟通和当前需求。"},{strong:"自动提醒风险客户",text:"识别报价后沉默、长时间未跟进、关键问题未回复等信号，减少漏跟、慢跟。"},{strong:"自动推荐话术与案例",text:"根据客户行业、需求阶段和异议类型，把高手经验带到每次沟通。"}],p=[{cls:"bv-orb-top",strong:"沟通效率提升",text:"AI 自动总结客户背景、历史沟通和当前需求，让销售快速进入状态。",tags:["客户摘要","历史回顾","重点提醒"]},{cls:"bv-orb-bl",strong:"客户流失减少",text:"识别报价后沉默、未跟进、关键问题未回复等风险信号，自动提醒。",tags:["风险预警","跟进提醒","阶段停滞"]},{cls:"bv-orb-br",strong:"销售转化提高",text:"根据客户行业、需求和异议类型，推荐最佳话术、案例和下一步动作。",tags:["话术推荐","案例匹配","下一步"]}];return`<span class="bv-slide-num">01｜Top Sales 能力复制</span>
    <div class="bv-s1-layout">
      <div class="bv-s1-left">
        <h2 class="bv-slide-title" style="font-size:26px;">让每个人都拥有 Top Sales 的能力</h2>
        <p class="bv-slide-desc" style="margin-bottom:20px;">把优秀销售的判断、话术、节奏和方法沉淀到系统里，让新人和普通销售也能高质量接待和推进客户。</p>
        ${a.map(e=>`<div class="bv-bullet"><span class="bv-bullet-dot"></span><div><strong>${e.strong}</strong>${e.text}</div></div>`).join("")}
        <div style="font-size:12px;color:var(--blue);font-weight:700;margin-top:8px;">从"靠个人经验" → 到"靠系统能力"</div>
      </div>
      <div class="bv-s1-right">
        <div class="bv-center-orb"><span>⭐</span><strong>Top Sales<br>能力模型</strong></div>
        ${p.map(e=>`<div class="bv-orbit-card ${e.cls}"><strong>${e.strong}</strong><p>${e.text}</p><div class="bv-orbit-tags">${e.tags.map(i=>`<span class="bv-orbit-tag">${i}</span>`).join("")}</div></div>`).join("")}
      </div>
    </div>
    <div class="bv-quote"><span class="bv-quote-icon">💡</span>AI 不是替销售聊天，而是让每个销售都带着"优秀销售教练"去沟通。</div>`}_s1(){const a=["线索接入","客户画像","需求识别","方案推荐","试菜报价","成交交付","售后复购"],p=[{icon:"👤",bg:"#eff6ff",title:"客户画像卡",desc:"客户是谁、来自哪里、属于什么行业、门店规模和决策角色。",tags:["来源","角色","规模"]},{icon:"📋",bg:"#fef3c7",title:"信息状态卡",desc:"哪些信息已确认、哪些待补充、客户画像完整度是多少。",tags:["已确认","待补充","完整度"]},{icon:"🎯",bg:"#ede9fe",title:"需求与痛点卡",desc:"客户真正关心降人工、提效率、稳口味还是扩店复制。",tags:["痛点","目标","异议"]},{icon:"📦",bg:"#dcfce7",title:"菜品设备匹配卡",desc:"客户做什么菜、适合什么设备组合、推荐理由是什么。",tags:["菜品","设备","理由"]},{icon:"📍",bg:"#fff7ed",title:"业务流程卡",desc:"客户处于哪个阶段、下一步该推进试菜、报价还是拜访。",tags:["阶段","动作","风险"]},{icon:"🔄",bg:"#e0f2fe",title:"交接与服务卡",desc:"销售、经销商、售后接手时可快速看到客户背景和注意事项。",tags:["销售","经销商","售后"]}],e=[{strong:"销售",desc:"推进试菜、报价和合同，带着完整客户上下文上场。"},{strong:"经销商",desc:"本地拜访、方案沟通和客户维护，不需要重新了解客户。"},{strong:"售后",desc:"安装培训、使用指导和复购提醒，清楚客户历史和服务重点。"}];return`<span class="bv-slide-num">02｜客户全生命周期管理</span>
    <h2 class="bv-slide-title">客户全生命周期管理，客户资产不再跟着人流失</h2>
    <p class="bv-slide-desc">从线索接入到成交、交付、售后和复购，所有关键信息沉淀成结构化知识卡。销售换人、经销商接手、售后服务，都能带着完整上下文继续推进。</p>
    <div class="bv-lifecycle-bar">${a.map((i,s)=>`<div class="bv-lc-node${s<3?" active":""}"><div class="bv-lc-dot">P${s+1}</div><span class="bv-lc-label">${i}</span></div>`).join("")}</div>
    <div class="bv-card-grid">${p.map(i=>`<div class="bv-know-card">
      <div class="bv-know-head"><div class="bv-know-icon" style="background:${i.bg}">${i.icon}</div><strong>${i.title}</strong></div>
      <p>${i.desc}</p><div class="bv-know-tags">${i.tags.map(s=>`<span class="bv-know-tag">${s}</span>`).join("")}</div>
    </div>`).join("")}</div>
    <div style="font-size:12px;font-weight:800;color:#475569;margin-bottom:6px;">带着完整上下文转交 ↓</div>
    <div class="bv-handoff-row">${e.map(i=>`<div class="bv-handoff-card"><strong>${i.strong}</strong><p>${i.desc}</p></div>`).join("")}</div>
    <div class="bv-quote"><span class="bv-quote-icon">🔄</span>换销售、换经销商、换售后都不怕，因为客户上下文已经沉淀在系统里。</div>`}_s2(){const a=["客户问题","销售话术","成交案例","失败原因","竞品反馈","价格异议","售后问题","菜品需求"],p=[{strong:"销售增长",text:"更准确的话术、更合适的案例、更清晰的下一步动作。"},{strong:"产品研发",text:"从高频需求和失败原因中发现产品改进方向。"},{strong:"售后服务",text:"沉淀安装、培训、维修经验，提前识别使用风险。"},{strong:"经营管理",text:"形成真实一线客户洞察，支撑市场和产品策略。"}];return`<span class="bv-slide-num">03｜企业 AI 大脑持续进化</span>
    <h2 class="bv-slide-title">不断进化的知识库和 Skills，沉淀成企业 AI 大脑</h2>
    <p class="bv-slide-desc">客户问题、销售话术、成交案例、异议反馈、售后问题和竞品信息持续沉淀到知识库和 Skills，最终反哺销售、研发、售后和经营管理。</p>
    <div class="bv-brain-layout">
      <div class="bv-side-col">
        <div class="bv-side-title">📥 一线信息持续进入</div>
        <div class="bv-chip-cloud">${a.map((e,i)=>`<span class="bv-chip bv-chip-input" style="animation:bvFadeUp .35s ease ${i*.07}s both">${e}</span>`).join("")}</div>
      </div>
      <div class="bv-brain-core">
        <h3>🧠 企业 AI 大脑</h3>
        <p class="bv-brain-sub">知识库负责"知道什么"，Skills 负责"怎么做"</p>
        <div class="bv-brain-layer kb"><h4>📚 知识库</h4>${["产品知识库","案例知识库","客户知识库","竞品知识库","售后知识库","场景知识库"].map(e=>`<span class="bv-brain-item">${e}</span>`).join("")}</div>
        <div class="bv-brain-layer sk"><h4>⚡ Skills</h4>${["客户识别","话术推荐","产品匹配","异议处理","试菜推进","售后复盘"].map(e=>`<span class="bv-brain-item">${e}</span>`).join("")}</div>
      </div>
      <div class="bv-side-col">
        <div class="bv-side-title">📤 反哺业务部门</div>
        ${p.map(e=>`<div class="bv-dept-card"><strong><span class="bv-dept-dot" style="background:var(--blue)"></span>${e.strong}</strong><p>${e.text}</p></div>`).join("")}
      </div>
    </div>
    <div class="bv-quote"><span class="bv-quote-icon">🧬</span>从每一次客户沟通开始，沉淀企业自己的 AI 大脑。</div>`}}export{u as BusinessValuePage};
