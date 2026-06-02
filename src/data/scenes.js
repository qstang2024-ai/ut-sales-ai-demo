import { sheetTpl } from '../components/BottomSheet.js';

const DEMAND = { id:'tool-demand', icon:'📋', label:'需求摘要', sheetId:'demand' };
const PROFILE = { id:'tool-profile', icon:'👤', label:'客户画像', sheetId:'profile' };
const PRODUCT = { id:'tool-product', icon:'🎯', label:'产品推荐', sheetId:'product' };
const SCHEDULE = { id:'tool-verify', icon:'📅', label:'试菜日程', sheetId:'schedule' };
const NEXT = { id:'tool-next', icon:'➡️', label:'下一步', sheetId:'next' };
const VALUE = { id:'tool-verify', icon:'📊', label:'价值测算', sheetId:'roi' };
const QUOTE = { id:'tool-verify', icon:'📝', label:'报价信息', sheetId:'quote' };

export const defaultToolConfig = [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT];

// Shared backend update helpers
function B_ACTIVATE(cardId, accent) { return { type:'activate', cardId, accent }; }
function B_HIGHLIGHT(cardId) { return { type:'highlight', cardId }; }
function B_PROGRESS(progressId, pct) { return { type:'progress', progressId, pct }; }
function B_FIELD(elId, text) { return { type:'field', elId, text }; }
function B_BADGE(elId, text) { return { type:'badge', elId, text }; }
function B_CHIP(stage) { return { type:'chip', stage }; }
function B_CHECK(listId, indices) { return { type:'check', listId, indices }; }
function B_KNOWLEDGE(cards) { return { type:'knowledge', cards }; }

export const scenes = [
  // ==================== P1-S1 (完整) ====================
  {
    id:'P1-S1', stageId:'P1', title:'抖音线索智能开场', subtitle:'从抖音线索到有效对话的智能破冰', fullDemo:true,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜抖音线索'},
    leftPanel:{oneLine:'客户刚从抖音留资进入，AI帮销售承接客户兴趣，用轻量自然的方式开启第一次对话。',painPoints:['抖音线索兴趣快、流失快','销售直接发资料容易聊死','新销售不知道第一句话怎么说'],aiActions:['识别线索来源为抖音','生成轻量开场话术','引导客户先说门店状态，不直接报价'],capabilities:['线索来源识别','智能开场话术','初始客户画像创建','下一步提问建议'],businessValue:'把抖音兴趣线索转化为可继续沟通的客户，提高承接率。'},
    chatScript:[
      {delay:300,type:'time',text:'09:42'},
      {delay:700,type:'customer',text:'你好，我在抖音看到你们那个炒菜机，想了解一下。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-next',badge:'开场',pulse:true,backend:[B_ACTIVATE('card-process'),B_CHECK('card-stage-checks',[0])]},
      {delay:1200,type:'sheet',sheetId:'next'},
      {delay:2500,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'王总您好，我是优特智厨的小陈。看到您刚才在抖音上关注了智能炒菜设备，我先不发太多资料，想简单了解一下，您现在是已有门店想升级后厨，还是正在筹备新店？'},
      {delay:1800,type:'rec_send'},
      {delay:1000,type:'customer',text:'我们现在有个快餐店，就是想看看这种设备到底适不适合。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-profile',badge:'30%',pulse:true,backend:[B_ACTIVATE('card-profile'),B_PROGRESS('card-profile-progress',30),B_FIELD('rp-type','社餐'),B_FIELD('rp-subtype','快餐'),B_BADGE('card-profile-badge','30%'),B_HIGHLIGHT('card-profile'),B_CHECK('card-process-list',[0])]},
      {delay:800,type:'sales',text:'明白，快餐店是比较适合先做判断的。我再了解两个信息，您现在一天大概多少单？后厨有几个炒锅师傅？'},
      {delay:10,type:'tool',id:'tool-demand',badge:'待补充'},
    ],
    sheets:{next:()=>sheetTpl('智能开场建议','根据"抖音线索+初次咨询"生成',null,[{label:'使用轻量破冰型',style:'sheet-primary',action:'use'},{label:'换一种说法',style:'sheet-secondary',action:'switch'},{label:'关闭',style:'sheet-secondary',action:'close'}],{checklist:['轻量破冰型：适合客户刚咨询不宜强推','需求确认型：适合客户已有明确门店','视频承接型：适合客户刚看过视频内容']}),profile:()=>sheetTpl('客户画像收集卡','已从对话中自动补全3项信息',[{key:'客户来源',value:'抖音'},{key:'关注产品',value:'炒菜设备'},{key:'客户大类',value:'社餐'},{key:'门店状态',value:'已有门店'}],[{label:'写入客户档案',style:'sheet-primary',action:'save'},{label:'继续追问',style:'sheet-secondary',action:'ask'}],{progress:30})},
  },
  // ==================== P1-S2 (轻量) ====================
  {
    id:'P1-S2', stageId:'P1', title:'沉默客户智能唤醒', subtitle:'48小时未回复客户的低压唤醒', fullDemo:false,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜官网线索'},
    leftPanel:{oneLine:'客户加微信后48小时未回复，AI帮销售选择合适的时机和低压内容唤醒。',painPoints:['客户不回复很常见','销售不知道什么时候再跟','催太急容易打扰'],aiActions:['识别沉默时长','推荐唤醒方式','生成低压跟进话术'],capabilities:['沉默识别','唤醒话术','跟进节奏建议'],businessValue:'从盲目催客户变成有策略的跟进。'},
    chatScript:[
      {delay:300,type:'time',text:'16:20'},
      {delay:700,type:'customer',text:'我是做快餐的，主要想知道大概多少钱。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-profile',badge:'30%',pulse:true,backend:[B_ACTIVATE('card-profile'),B_PROGRESS('card-profile-progress',30),B_HIGHLIGHT('card-profile')]},
      {delay:700,type:'sales',text:'明白，快餐店适配度比较高。价格主要和型号、配置、菜品需求有关。我先了解一下您一天大概多少单、后厨现在几个人？'},
      {delay:10,type:'tool',id:'tool-demand',badge:'价格关注'},
    ],
    sheets:{profile:()=>sheetTpl('客户画像收集卡','已从对话中补全信息',[{key:'客户大类',value:'社餐'},{key:'细分类别',value:'快餐'},{key:'关注点',value:'价格'}],[{label:'写入档案',style:'sheet-primary',action:'save'},{label:'继续追问',style:'sheet-secondary',action:'ask'}],{progress:30})},
  },
  // ==================== P2-S1 (完整) - 快餐门店客户画像 ====================
  {
    id:'P2-S1', stageId:'P2', title:'快餐门店客户画像自动补全', subtitle:'从企微对话中自动抽取门店信息和痛点，沉淀为可用客户画像', fullDemo:true,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜抖音线索｜阶段二 需求确认'},
    leftPanel:{oneLine:'销售正常和客户聊天，AI从企微对话中自动抽取门店类型、面积、单量、人员和痛点，沉淀成可用客户画像。',painPoints:['客户说了很多信息但没有沉淀成标准客户画像','新销售不知道追问哪些关键字段，容易漏掉面积、单量、后厨人数','画像不完整导致后续产品推荐、试菜推进和报价判断失准'],aiActions:['自动抽取业态、面积、日单量、后厨人数等关键信息','自动判断核心痛点：缺人、出餐慢、成本高','实时计算画像完整度并提示下一步该问什么','画像完整度达到70%后，推荐进入产品匹配阶段'],capabilities:['对话信息抽取','客户画像补全','画像完整度计算','缺失字段提醒','阶段推进判断'],businessValue:'销售不用离开企微聊天界面，就能边沟通、边沉淀客户画像、边获得下一步推进建议。'},
    chatScript:[
      {delay:300,type:'time',text:'10:32'},
      {delay:700,type:'customer',text:'我们是做快餐的，店不大，差不多一百多平。一天两三百单吧，主要中午忙的时候有点顶不住。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-profile',badge:'50%',pulse:true,backend:[B_ACTIVATE('card-profile'),B_PROGRESS('card-profile-progress',50),B_FIELD('rp-type','社餐'),B_FIELD('rp-subtype','快餐简餐'),B_FIELD('rp-area','约120平'),B_FIELD('rp-orders','200-300单'),B_BADGE('card-profile-badge','50%'),B_HIGHLIGHT('card-profile'),B_ACTIVATE('card-stage','purple'),B_CHECK('card-process-list',[0])]},
      {delay:700,type:'sales',text:'明白，您这种一般是午高峰出餐压力比较明显。我再了解下，后厨现在几个炒锅师傅？'},
      {delay:1000,type:'customer',text:'两个。现在主要是师傅不好招，工资也高。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-profile',badge:'70%',pulse:true,backend:[B_PROGRESS('card-profile-progress',70),B_FIELD('rp-staff','2名炒锅师傅'),B_FIELD('rp-pain','厨师难招、午高峰压力'),B_BADGE('card-profile-badge','70%'),B_HIGHLIGHT('card-profile'),B_BADGE('card-stage-badge','阶段二'),B_CHECK('card-stage-checks',[0,1])]},
      {delay:900,type:'sales',text:'那您现在更想解决的是少依赖师傅，还是先把高峰期出餐稳住？'},
      {delay:1100,type:'customer',text:'两个都想吧，主要是不想后面一直靠师傅撑着。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-demand',badge:'已生成',backend:[B_ACTIVATE('card-process','orange'),B_CHECK('card-process-list',[1]),B_ACTIVATE('card-knowledge'),{type:'knowledge',cards:[{title:'G3适配卡',body:'快餐简餐场景推荐逻辑'},{title:'200-300单配置',body:'日单量对应设备建议'},{title:'人效提升卡',body:'厨师替代与效率测算'},{title:'快餐案例卡',body:'同类门店落地案例'}]}]},
      {delay:10,type:'tool',id:'tool-product',badge:'可推荐'},
      {delay:700,type:'sales',text:'明白。按您这个单量和菜品结构，后面可以先按G3标准版给您看一版思路，不一定马上报价，我先判断适不适合您店。'},
    ],
    sheets:{profile:()=>sheetTpl('客户画像收集卡','已从对话中自动补全7项信息',[{key:'客户大类',value:'社餐'},{key:'细分类别',value:'快餐简餐'},{key:'门店面积',value:'约120平'},{key:'日单量',value:'200–300单'},{key:'后厨人员',value:'2名炒锅师傅'},{key:'核心痛点',value:'厨师难招/午高峰出餐压力'},{key:'画像完整度',value:'70%'}],[{label:'写入客户档案',style:'sheet-primary',action:'save'},{label:'继续追问',style:'sheet-secondary',action:'ask'},{label:'进入产品推荐',style:'sheet-green',action:'product'}],{progress:70}),demand:()=>sheetTpl('需求摘要','AI已整理当前客户核心需求',null,[{label:'写入跟进记录',style:'sheet-primary',action:'save'},{label:'生成推荐话术',style:'sheet-secondary',action:'generate'}],{checklist:['客户经营场景：快餐简餐门店','主要压力：午高峰出餐跟不上','人员问题：炒锅师傅难招/工资高','真实诉求：降低对厨师依赖同时稳定高峰出餐','下一步建议：进入G3标准版适配判断']})},
  },
  // ==================== P2-S2 (轻量) 团餐客户画像 ====================
  {
    id:'P2-S2', stageId:'P2', title:'团餐客户画像识别', subtitle:'自动切换团餐需求判断逻辑', fullDemo:false,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'刘总 · 园区食堂',desc:'企微客户｜团餐线索'},
    leftPanel:{oneLine:'客户不是普通餐饮门店而是团餐/食堂场景，AI自动切换需求判断逻辑。',painPoints:['团餐和社餐关注点完全不同','社餐讲翻台团餐讲批量出餐/标准化','新销售容易用社餐话术聊团餐'],aiActions:['识别园区食堂/团餐','切换团餐专属字段','整理单餐人数/出餐窗口'],capabilities:['客户大类识别','团餐字段抽取','场景化需求探针'],businessValue:'避免销售把团餐客户当普通门店聊，提高大项目早期判断质量。'},
    chatScript:[
      {delay:300,type:'time',text:'11:05'},
      {delay:700,type:'customer',text:'我们是给园区食堂做供餐的，一餐大概一千五百人，中午一个小时内要出完。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-profile',badge:'团餐',pulse:true,backend:[B_ACTIVATE('card-profile'),B_PROGRESS('card-profile-progress',40),B_FIELD('rp-type','团餐'),B_FIELD('rp-subtype','园区食堂'),B_HIGHLIGHT('card-profile')]},
      {delay:700,type:'sales',text:'您这个是典型团餐场景，重点不是单店翻台，而是集中时间内稳定批量出餐。一餐通常几个热菜？'},
      {delay:1000,type:'customer',text:'一般8到10个热菜，炒菜和分批出餐比较卡。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-demand',badge:'批量出餐',backend:[B_CHECK('card-process-list',[1])]},
      {delay:700,type:'sales',text:'明白，这种体量不建议只看一台设备，要结合炒菜、蒸煮、保温、出餐节奏一起看。'},
      {delay:10,type:'tool',id:'tool-product',badge:'组合方案'},
    ],
    sheets:{profile:()=>sheetTpl('团餐客户画像卡','已识别为团餐/园区食堂场景',[{key:'客户大类',value:'团餐'},{key:'细分类别',value:'园区食堂'},{key:'单餐人数',value:'约1500人'},{key:'出餐窗口',value:'约1小时'},{key:'热菜数量',value:'8-10个'}],[{label:'写入客户档案',style:'sheet-primary',action:'save'},{label:'创建现场调研',style:'sheet-secondary',action:'task'}],{progress:40})},
  },
  // ==================== P2-S3 (轻量) 价格追问 ====================
  {
    id:'P2-S3', stageId:'P2', title:'价格问题背后的隐性需求追问', subtitle:'把价格问题转化为需求沟通', fullDemo:false,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'赵总 · 快餐门店',desc:'企微客户｜新线索'},
    leftPanel:{oneLine:'客户一上来问"多少钱"，AI帮销售把价格问题转为需求沟通，避免直接报价。',painPoints:['客户一上来问价销售容易直接报','只看价格不看价值后续很难展开','优秀销售会先判断场景再给区间'],aiActions:['识别价格意图','推荐需求澄清话术','引导客户补充门店信息'],capabilities:['价格意图识别','需求澄清话术','画像字段抽取'],businessValue:'帮助销售把价格问题转化为需求沟通，避免单维价格比较。'},
    chatScript:[
      {delay:300,type:'time',text:'15:10'},
      {delay:700,type:'customer',text:'你们炒菜机多少钱一台？'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-next',badge:'先问场景',pulse:true},
      {delay:700,type:'sales',text:'价格和型号、配置、使用场景关系比较大。我先简单了解一下您的门店情况，避免给您报一个不适合的价格。'},
      {delay:1000,type:'customer',text:'我是开快餐店的，想看看能不能替一个炒锅师傅。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-profile',badge:'40%',pulse:true,backend:[B_ACTIVATE('card-profile'),B_PROGRESS('card-profile-progress',40),B_FIELD('rp-type','社餐'),B_FIELD('rp-subtype','快餐'),B_HIGHLIGHT('card-profile')]},
      {delay:700,type:'sales',text:'明白，如果您主要想减少炒锅师傅，那就需要看您现在一天单量和师傅工资。您现在一天大概多少单？炒锅师傅一个月大概多少钱？'},
      {delay:10,type:'tool',id:'tool-demand',badge:'价格关注'},
    ],
    sheets:{profile:()=>sheetTpl('客户画像收集卡','已识别初始需求',[{key:'客户大类',value:'社餐'},{key:'细分类别',value:'快餐'},{key:'核心诉求',value:'替代炒锅师傅'},{key:'价格敏感度',value:'中高'}],[{label:'追问日单量',style:'sheet-primary',action:'ask'},{label:'关闭',style:'sheet-secondary',action:'close'}],{progress:40})},
  },
  // ==================== P3-S1 (完整) ====================
  {
    id:'P3-S1', stageId:'P3', title:'快餐门店智能选型推荐', subtitle:'基于客户画像自动推荐最适合的设备型号', fullDemo:true,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜阶段三 产品匹配'},
    leftPanel:{oneLine:'客户画像已较完整，AI根据业态、单量、菜品和痛点，自动推荐适合的设备型号和推荐理由。',painPoints:['销售不一定能快速判断推荐哪款','新销售只按产品熟悉度而非场景推荐','客户会问为什么适合需要讲出匹配逻辑'],aiActions:['根据客户画像判断产品适配度','点亮产品推荐按钮','弹出产品推荐卡展示主推/备选方案','右侧更新项目阶段'],capabilities:['产品适配判断','推荐理由生成','主推/备选方案区分','阶段推进'],businessValue:'让销售推荐产品不再完全依赖个人经验，基于客户画像自动匹配。'},
    chatScript:[
      {delay:300,type:'time',text:'10:48'},
      {delay:700,type:'customer',text:'按我这个情况，你觉得哪款比较适合？我们快餐店，120平左右，一天两三百单，主要盖饭和小炒。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-product',badge:'可生成',pulse:true,backend:[B_ACTIVATE('card-stage','purple'),B_CHIP('P3'),B_BADGE('card-stage-badge','阶段三'),B_CHECK('card-stage-checks',[1]),B_ACTIVATE('card-knowledge'),{type:'knowledge',cards:[{title:'G3标准版',body:'匹配度86%'},{title:'G3升级套装',body:'含投菜+调料模块'},{title:'双机配置',body:'2台G3组合'},{title:'组合方案',body:'G3+M1+保温台'}]}]},
      {delay:1200,type:'sheet',sheetId:'product'},
      {delay:2500,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'王总，按您现在这个情况，我建议先看G3标准版。您是快餐简餐门店，日单量两三百，主力是盖饭和小炒，这类菜品比较适合用标准炒菜设备来做高峰期分担。'},
      {delay:1800,type:'rec_send'},
      {delay:1000,type:'customer',text:'它主要能解决什么？我不想买回来用不上。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-demand',badge:'推荐理由'},
      {delay:700,type:'sales',text:'您这类门店最关键不是买一台机器，而是解决三个问题：第一，高峰期出餐更稳；第二，减少对炒锅师傅的依赖；第三，标准菜品口味更容易统一。'},
    ],
    sheets:{product:()=>sheetTpl('智能选型推荐','基于当前客户画像自动匹配',[{key:'推荐产品',value:'G3 标准版'},{key:'匹配度',value:'86%'},{key:'备选',value:'G3 升级套装'},{key:'不适配',value:'大型团餐组合方案'}],[{label:'生成推荐话术',style:'sheet-primary',action:'use'},{label:'生成轻方案',style:'sheet-green',action:'plan'},{label:'关闭',style:'sheet-secondary',action:'close'}],{checklist:['客户类型：社餐/快餐简餐','门店面积：约120平','日单量：200–300单','主营菜品：盖饭+小炒','核心痛点：厨师难招/高峰期出餐','目标：减少炒锅依赖/稳定出餐']})},
  },
  // ==================== P3-S2 (轻量) 一键轻方案 ====================
  {
    id:'P3-S2', stageId:'P3', title:'一键轻方案生成', subtitle:'快速生成客户专属轻量方案', fullDemo:false,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜阶段三 方案推荐'},
    leftPanel:{oneLine:'客户说"先发个方案看看"，AI根据前面对话快速生成一份轻量、可读、可发送的方案。',painPoints:['正式方案制作成本高','临时整理容易漏信息','发产品册太泛不够定制'],aiActions:['识别索要方案','基于画像生成轻方案','提供客户版和老板版'],capabilities:['对话内容复用','轻方案生成','客户化表达'],businessValue:'让客户能快速收到一份有针对性的方案思路。'},
    chatScript:[
      {delay:300,type:'time',text:'14:10'},
      {delay:700,type:'customer',text:'那你先给我发个简单方案吧，我看看。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-product',badge:'可生成',pulse:true,backend:[B_ACTIVATE('card-knowledge')]},
      {delay:1200,type:'sheet',sheetId:'plan'},
      {delay:2500,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'可以，我先给您整理一个简版建议，不会太复杂，主要按您刚才说的门店情况来配。您可以先看整体方向。'},
      {delay:1800,type:'rec_send'},
    ],
    sheets:{plan:()=>sheetTpl('一键轻方案','基于当前客户画像生成',[{key:'客户现状',value:'快餐简餐/120平/200-300单'},{key:'推荐设备',value:'G3标准版'},{key:'解决方向',value:'高峰出餐/减少厨师依赖'},{key:'下一步',value:'观看实操视频或预约试菜'}],[{label:'生成轻方案',style:'sheet-primary',action:'gen'},{label:'生成老板版',style:'sheet-secondary',action:'boss'},{label:'关闭',style:'sheet-secondary',action:'close'}],{progress:80})},
  },
  // ==================== P4-S1 (完整) ====================
  {
    id:'P4-S1', stageId:'P4', title:'价格异议 + ROI回本测算', subtitle:'从价格防守转为价值测算，用人工成本讲清投入产出', fullDemo:true,
    toolConfig: [PROFILE, DEMAND, PRODUCT, VALUE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜阶段四 价值证明'},
    leftPanel:{oneLine:'客户说"太贵了"，AI帮销售从价格防守转为价值测算，用人工成本和回本周期讲清楚投入产出。',painPoints:['客户说贵时销售容易直接解释成本或降价','不算账客户只看一次性投入','销售临时算ROI容易不专业'],aiActions:['识别价格异议','点亮价值测算提示收集人工成本','生成保守/中性/理想三档ROI','推荐先认可再算账再验证话术'],capabilities:['价格异议识别','ROI参数抽取','回本周期测算','三档测算模型'],businessValue:'让销售不靠降价处理异议，而是用客户自己的经营数据证明设备价值。'},
    chatScript:[
      {delay:300,type:'time',text:'16:10'},
      {delay:700,type:'customer',text:'你们这个价格有点贵啊，我看别家好像便宜不少。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'价格异议',pulse:true,backend:[B_ACTIVATE('card-process','orange'),B_BADGE('card-stage-badge','阶段四'),B_CHIP('P4'),B_CHECK('card-stage-checks',[1,2])]},
      {delay:1200,type:'sheet',sheetId:'roi'},
      {delay:2500,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'王总，您觉得贵是正常的，设备采购确实不能只看一次性价格。更关键的是它能不能帮您减少人工、稳定出餐、提升效率。我们可以按您现在的人工成本算一下，这样会更客观。'},
      {delay:1800,type:'rec_send'},
      {delay:1000,type:'customer',text:'那你怎么算？我们一个炒锅师傅差不多9000一个月。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'可测算',pulse:true},
      {delay:700,type:'sales',text:'如果按一个炒锅师傅9000元/月算，一年就是10.8万人工成本。如果设备能帮您减少一个岗位依赖，回本周期就可以按这个基础来算。我们也可以分保守、中性、理想三档来算。'},
      {delay:1200,type:'customer',text:'那如果不能完全少一个人呢？'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'三档测算'},
      {delay:10,type:'tool',id:'tool-next',badge:'试菜验证',backend:[B_ACTIVATE('card-knowledge'),{type:'knowledge',cards:[{title:'保守测算',body:'不直接减人提效率'},{title:'中性测算',body:'减少0.5人月省4500'},{title:'理想测算',body:'减少1人月省9000'},{title:'试菜验证',body:'确认设备适配后精算'}]}]},
      {delay:700,type:'sales',text:'这个问题很实际。所以我建议不要只按理想情况算。保守看效率提升，中性按减少半个人压力，理想按减少一个炒锅岗位。最后还要通过试菜确认设备是不是适合您门店菜品。'},
    ],
    sheets:{roi:()=>sheetTpl('ROI回本测算','基于客户提供的人工成本进行估算',[{key:'炒锅月薪',value:'9000元'},{key:'年人工成本',value:'约10.8万/人'},{key:'当前炒锅',value:'2人'},{key:'替代目标',value:'0.5–1人'}],[{label:'生成老板版测算',style:'sheet-primary',action:'boss'},{label:'发送ROI说明',style:'sheet-green',action:'send'},{label:'关闭',style:'sheet-secondary',action:'close'}],{checklist:['保守：不直接减人提升高峰效率','中性：减少0.5人压力月节省约4500元','理想：减少1人岗位依赖月节省约9000元']})},
  },
  // ==================== P4-S2 (轻量) 竞品对比 ====================
  {
    id:'P4-S2', stageId:'P4', title:'竞品对比助手', subtitle:'客户拿竞品比较时AI帮销售定位差异化优势', fullDemo:false,
    toolConfig: [PROFILE, DEMAND, PRODUCT, VALUE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜阶段四 异议化解'},
    leftPanel:{oneLine:'客户说"别家更便宜"，AI帮销售不否定竞品，而是定位差异化和客户场景验证。',painPoints:['客户比较价格销售容易贬低竞品','只讲自己优势不讲差异对比不够有力','忽略竞品比较背后的真实顾虑'],aiActions:['识别竞品比较','定位差异化优势','引导客户关注场景验证而非纸面对比'],capabilities:['竞品识别','差异化定位','场景验证引导'],businessValue:'帮销售从价格战转为场景验证，用客户自己的需求来证明适配性。'},
    chatScript:[
      {delay:300,type:'time',text:'15:30'},
      {delay:700,type:'customer',text:'我看美膳狮也有类似产品，价格好像比你们便宜一些。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'竞品对比',pulse:true,backend:[B_ACTIVATE('card-process','orange')]},
      {delay:1200,type:'sheet',sheetId:'competitor'},
      {delay:2500,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'美膳狮的定位是互联网打法，我们是做实业出身。具体到您这类快餐门店，最关键的差别不在价格，而在于设备能不能稳定出餐、菜谱参数能不能按您门店口味调、售后响应快不快。'},
      {delay:2000,type:'rec_send'},
      {delay:1000,type:'customer',text:'那我们约个时间试下菜吧，实际体验一下。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-next',badge:'试菜邀约'},
      {delay:700,type:'sales',text:'可以，试菜最直观。我帮您约下周三下午，您带一两道常做菜过来，我们现场做给您看。'},
    ],
    sheets:{competitor:()=>sheetTpl('竞品对比分析','不否定竞品、不直接比价',[{key:'竞品定位',value:'互联网打法/定速巡航'},{key:'我方定位',value:'实业出身/自带巡航'},{key:'差异化',value:'立体加热/锅气/1300+专利'},{key:'建议策略',value:'引导试菜验证而非纸面对比'}],[{label:'使用推荐话术',style:'sheet-primary',action:'use'},{label:'创建试菜邀约',style:'sheet-green',action:'schedule'}])},
  },
  // ==================== P5-S1 (完整) ====================
  {
    id:'P5-S1', stageId:'P5', title:'试菜邀约与日程创建', subtitle:'客户说想试菜，AI自动生成内部日程、任务和确认话术', fullDemo:true,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜阶段五 试菜验证'},
    leftPanel:{oneLine:'客户说"想试菜"，AI自动把这句话变成内部试菜日程、准备任务和客户确认话术。',painPoints:['客户说想试菜不立刻锁时间容易拖','试菜需协调客户/销售/厨师/食材/场地','聊天信息没自动进内部流程','准备不充分影响体验'],aiActions:['识别试菜意向','点亮试菜日程按钮','引导确认时间/参与人/菜品/口味','弹出试菜日程草稿','自动拆解内部准备任务','生成客户确认话术'],capabilities:['行动意图识别','时间/参与人/菜品抽取','内部日程草稿','准备任务拆解','客户确认话术生成'],businessValue:'让客户口头承诺不再停留在聊天里，而是自动转化为可执行、可跟踪的销售动作。'},
    chatScript:[
      {delay:300,type:'time',text:'10:20'},
      {delay:700,type:'customer',text:'资料我看了，还是想实际看看效果。你们那边能试菜吗？'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'意向',pulse:true,backend:[B_ACTIVATE('card-stage','purple'),B_BADGE('card-stage-badge','阶段五'),B_CHIP('P5'),B_CHECK('card-stage-checks',[2]),B_ACTIVATE('card-process','orange'),B_CHECK('card-process-list',[2])]},
      {delay:700,type:'sales',text:'可以，试菜反而最直观。您可以带一两道店里常做的菜，我们现场做给您看。您这边大概什么时候方便？'},
      {delay:1100,type:'customer',text:'下周三下午吧，我和厨师长一起过去。'},
      {delay:800,type:'typing',duration:1100},
      {delay:1100,type:'tool',id:'tool-verify',badge:'待补全'},
      {delay:700,type:'sales',text:'可以，我先给您预留下周三下午。下午2点方便吗？菜品您也可以提前发我，我们好准备食材。'},
      {delay:1100,type:'customer',text:'2点可以。试鱼香肉丝和青椒肉丝吧，我们口味偏重一点。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'待创建',pulse:true,backend:[B_HIGHLIGHT('card-process'),B_ACTIVATE('card-knowledge'),{type:'knowledge',cards:[{title:'试菜确认话术',body:'面向客户的邀约模板'},{title:'准备清单',body:'食材/设备/反馈表'},{title:'鱼香肉丝参数',body:'偏重口味菜谱'},{title:'青椒肉丝参数',body:'偏重口味菜谱'}]}]},
      {delay:10,type:'tool',id:'tool-demand',badge:'已生成'},
      {delay:1200,type:'sheet',sheetId:'schedule'},
      {delay:3000,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'好的，我这边先按下周三下午2点给您预留试菜时间。试菜菜品是鱼香肉丝和青椒肉丝，口味按偏重准备。稍后我把展厅地址和到访指引发您。'},
      {delay:2000,type:'rec_send',backend:[B_CHECK('card-process-list',[3])]},
    ],
    sheets:{schedule:()=>sheetTpl('试菜日程草稿','已从对话中识别可创建内部任务',[{key:'试菜时间',value:'下周三 14:00'},{key:'客户参与',value:'客户 + 厨师长'},{key:'地点',value:'优特智厨展厅'},{key:'试菜菜品',value:'鱼香肉丝、青椒肉丝'},{key:'口味要求',value:'偏重'}],[{label:'创建内部日程',style:'sheet-primary',action:'create'},{label:'生成客户确认话术',style:'sheet-green',action:'generate'}],{checklist:['协调演示厨师时间','准备鱼香肉丝、青椒肉丝食材','预设偏重口味菜谱参数','准备设备与演示台位','生成试菜反馈记录表'],progress:90})},
  },
  // ==================== P5-S2 (轻量) 门店拜访 ====================
  {
    id:'P5-S2', stageId:'P5', title:'客户门店拜访预约', subtitle:'自动创建拜访任务并生成现场勘察清单', fullDemo:false,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'张总 · 连锁门店',desc:'企微客户｜阶段五 拜访推进'},
    leftPanel:{oneLine:'客户说"来我店里看看"，AI自动创建拜访任务，生成现场勘察清单。',painPoints:['设备适配很多时候必须看现场','到现场易漏看空间/水电/动线','拜访后需生成调研记录'],aiActions:['识别门店拜访意向','抽取拜访时间/地点','生成现场勘察清单','创建拜访日程和后续方案任务'],capabilities:['拜访意图识别','地址/时间抽取','勘察清单生成','拜访任务创建'],businessValue:'让销售拜访从"去看看"变成有准备、有记录、有后续的标准流程。'},
    chatScript:[
      {delay:300,type:'time',text:'11:35'},
      {delay:700,type:'customer',text:'你们要不来我们店里看看吧，我们后厨空间不大，不知道能不能放。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'意向',pulse:true,backend:[B_ACTIVATE('card-process','orange')]},
      {delay:700,type:'sales',text:'可以，现场看会更准确。我们可以重点看一下后厨空间、设备摆放位置、出餐动线和水电条件。您这周哪天方便？'},
      {delay:1000,type:'customer',text:'周五上午吧，地址我发你。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'待创建'},
      {delay:1200,type:'sheet',sheetId:'visit'},
      {delay:2000,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'好的，我这边先按周五上午到您门店现场看一下，重点确认设备摆放、出餐动线和水电条件。到时候我会提前和您再确认具体到店时间。'},
      {delay:1800,type:'rec_send'},
    ],
    sheets:{visit:()=>sheetTpl('客户拜访任务','已从对话中识别现场拜访安排',[{key:'拜访时间',value:'周五上午'},{key:'拜访目的',value:'确认后厨空间与设备适配'},{key:'关注重点',value:'空间/动线/水电'}],[{label:'创建拜访日程',style:'sheet-primary',action:'create'},{label:'生成勘察清单',style:'sheet-green',action:'checklist'}],{checklist:['后厨实际可用面积','设备摆放位置','水/电/排烟条件','出餐动线','现有设备','高峰期操作路径']})},
  },
  // ==================== P6-S1 (完整) ====================
  {
    id:'P6-S1', stageId:'P6', title:'报价条件确认', subtitle:'检查报价所需字段，避免仓促报价后反复修改', fullDemo:true,
    toolConfig: [PROFILE, DEMAND, PRODUCT, QUOTE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜阶段六 报价推进'},
    leftPanel:{oneLine:'客户说"给我报个正式价格"，AI检查报价所需字段，避免销售仓促报价后反复修改。',painPoints:['客户要报价时很多字段不完整','型号/数量/服务范围不清楚导致报价反复','临时口述报价不专业影响信任'],aiActions:['识别报价请求','点亮报价信息检查缺失字段','生成报价前确认话术','字段补齐后创建报价申请'],capabilities:['报价意图识别','报价字段检查','缺失信息提醒','报价确认话术','报价申请创建'],businessValue:'让报价从临时口头响应变成标准流程，减少后续返工。'},
    chatScript:[
      {delay:300,type:'time',text:'09:50'},
      {delay:700,type:'customer',text:'那你给我报个正式价格吧。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'待补充',pulse:true,backend:[B_ACTIVATE('card-stage','purple'),B_BADGE('card-stage-badge','阶段六'),B_CHIP('P6'),B_ACTIVATE('card-process','orange'),B_CHECK('card-process-list',[2])]},
      {delay:1200,type:'sheet',sheetId:'quote'},
      {delay:2500,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'可以的王总。我给您出正式报价前，先确认几个信息，避免报价后反复调整：第一，您目前先按一台G3标准版考虑对吗？第二，收货地址是在杭州这家门店？第三，报价需要包含安装培训和发票吗？'},
      {delay:2200,type:'rec_send'},
      {delay:1200,type:'customer',text:'对，先按一台。地址杭州，安装培训要包含，发票也要。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'可创建',pulse:true},
      {delay:10,type:'tool',id:'tool-next',badge:'内部申请',backend:[B_CHECK('card-process-list',[3])]},
      {delay:700,type:'sales',text:'好的，我这边先按一台G3标准版、杭州收货、包含安装培训和发票来准备正式报价。报价整理好后我发您确认。'},
    ],
    sheets:{quote:()=>sheetTpl('报价字段检查','正式报价前仍需确认以下信息',[{key:'产品型号',value:'G3 标准版'},{key:'数量',value:'1台'},{key:'收货城市',value:'待确认'},{key:'安装培训',value:'待确认'},{key:'发票',value:'待确认'}],[{label:'生成确认话术',style:'sheet-primary',action:'generate'},{label:'创建报价待办',style:'sheet-green',action:'create'},{label:'关闭',style:'sheet-secondary',action:'close'}],{checklist:['确认产品型号/数量','收货城市/是否含安装培训','是否含发票与运费','报价有效期','是否有特殊配置需求']})},
  },
  // ==================== P6-S2 (轻量) 合同信息收集 ====================
  {
    id:'P6-S2', stageId:'P6', title:'合同信息收集', subtitle:'客户确认采购后AI辅助收集合同关键字段', fullDemo:false,
    toolConfig: [PROFILE, DEMAND, PRODUCT, QUOTE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜阶段六 合同推进'},
    leftPanel:{oneLine:'客户确认采购意向后，AI辅助收集合同主体、开票信息和付款节点。',painPoints:['合同信息收集不完整导致反复确认','开票/付款节点漏写影响签约','合同信息散落在聊天里没沉淀'],aiActions:['识别进入合同阶段','检查合同关键字段','生成合同信息收集话术'],capabilities:['合同阶段识别','关键字段检查','收集话术生成'],businessValue:'让合同流程从口头推进变成标准化信息收集。'},
    chatScript:[
      {delay:300,type:'time',text:'10:30'},
      {delay:700,type:'customer',text:'报价没问题，你发合同过来吧。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'待补充',pulse:true,backend:[B_ACTIVATE('card-process','orange')]},
      {delay:1200,type:'sheet',sheetId:'contract'},
      {delay:2500,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'好的王总。我这边准备合同前先确认几个信息：第一，合同主体用您个人还是公司？第二，开票信息麻烦发我一下；第三，付款方式和节点您有什么偏好吗？'},
      {delay:2000,type:'rec_send'},
      {delay:1000,type:'customer',text:'用公司签，开票信息我让财务发你。付款先付40%，发货前付剩下的。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'可创建'},
      {delay:700,type:'sales',text:'好的，按公司签约、首付40%、发货前结清来准备合同。我整理好后发您确认。'},
    ],
    sheets:{contract:()=>sheetTpl('合同信息收集','请确认以下关键合同字段',[{key:'合同主体',value:'待确认'},{key:'开票信息',value:'待确认'},{key:'付款方式',value:'待确认'},{key:'设备清单',value:'G3标准版×1'}],[{label:'生成确认话术',style:'sheet-primary',action:'generate'},{label:'创建合同待办',style:'sheet-green',action:'create'}],{checklist:['确认合同主体','收集开票信息','确认付款节点','确认设备清单和服务范围']})},
  },
  // ==================== P7-S1 (轻量) 安装培训安排 ====================
  {
    id:'P7-S1', stageId:'P7', title:'安装培训安排', subtitle:'设备发货后AI辅助安排安装和培训任务', fullDemo:false,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜阶段七 交付'},
    leftPanel:{oneLine:'设备到货后，AI辅助销售安排安装时间、培训计划和交付确认。',painPoints:['安装培训安排不及时影响客户体验','交叉部门协调沟通成本高','疏漏培训导致设备闲置'],aiActions:['识别交付阶段','创建安装任务','生成培训计划','发送确认话术'],capabilities:['交付阶段识别','安装任务创建','培训计划生成'],businessValue:'让交付流程从被动通知变成主动安排，提升客户首月满意度。'},
    chatScript:[
      {delay:300,type:'time',text:'09:15'},
      {delay:700,type:'customer',text:'设备到了，什么时候来安装培训？'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-verify',badge:'待安排',pulse:true,backend:[B_ACTIVATE('card-process','orange'),B_BADGE('card-stage-badge','阶段七'),B_CHIP('P7')]},
      {delay:1200,type:'sheet',sheetId:'training'},
      {delay:2500,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'好的，我这边帮您安排安装和培训。安装一般需要半天时间，培训可以安排在安装当天下午或第二天，主要教后厨人员操作和基础维护。您那边周几方便？'},
      {delay:2000,type:'rec_send'},
      {delay:1000,type:'customer',text:'下周一吧，我们周一休息比较好安排。'},
      {delay:800,type:'typing',duration:1000},
      {delay:700,type:'sales',text:'好的，下周一上午安装、下午培训。我提前一天再和您确认。培训主要是操作、菜谱选用、日常清洁这几个模块，一般2-3小时就够了。'},
    ],
    sheets:{training:()=>sheetTpl('安装培训安排','设备已到货请安排安装和培训',[{key:'安装时间',value:'待确认'},{key:'培训时间',value:'待确认'},{key:'参与人员',value:'后厨人员'},{key:'培训内容',value:'操作/菜谱/清洁'}],[{label:'创建安装任务',style:'sheet-primary',action:'create'},{label:'生成培训计划',style:'sheet-green',action:'plan'}],{checklist:['协调安装工程师时间','确认门店电源/排烟条件','准备培训资料','确认后厨参与人员','培训后跟踪首月使用情况']})},
  },
  // ==================== P7-S2 (轻量) 复购机会识别 ====================
  {
    id:'P7-S2', stageId:'P7', title:'复购机会识别', subtitle:'从对话中识别客户的增购信号', fullDemo:false,
    toolConfig: [PROFILE, DEMAND, PRODUCT, SCHEDULE, NEXT],
    chatHeader:{name:'王总 · 快餐门店',desc:'企微客户｜阶段七 复购'},
    leftPanel:{oneLine:'客户提到扩店、新店筹备或追加设备时，AI自动识别复购机会。',painPoints:['客户满意后的扩店信号容易被忽略','销售跟进不及时错过追加机会','复购机会缺乏系统性识别'],aiActions:['识别复购/扩店信号','标记为复购意向客户','推荐追加方案'],capabilities:['复购信号识别','追加方案推荐','跟进任务创建'],businessValue:'从被动等客户再找变成主动识别复购窗口。'},
    chatScript:[
      {delay:300,type:'time',text:'14:30'},
      {delay:700,type:'customer',text:'试用这一个月感觉还不错，我们另外一家店也想配一台。'},
      {delay:900,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-profile',badge:'复购信号',pulse:true,backend:[B_ACTIVATE('card-process','orange'),B_HIGHLIGHT('card-profile')]},
      {delay:700,type:'sales',text:'太好了，看来设备在您这边跑得比较顺。另外那家店规模跟现在这家差不多吗？菜品结构有区别吗？'},
      {delay:1000,type:'customer',text:'差不多，也是快餐，面积略大一点，150平左右。'},
      {delay:800,type:'typing',duration:1000},
      {delay:1000,type:'tool',id:'tool-product',badge:'追加推荐'},
      {delay:1200,type:'sheet',sheetId:'repurchase'},
      {delay:2000,type:'close_sheet'},
      {delay:400,type:'rec_show',text:'那建议也按G3标准版配置，可以和这家店的菜谱参数同步过去，减少调试时间。我帮您出一版针对150平门店的配置建议。'},
      {delay:1800,type:'rec_send'},
    ],
    sheets:{repurchase:()=>sheetTpl('复购机会识别','客户当前门店使用满意表达扩店意向',[{key:'复购类型',value:'同品牌扩店'},{key:'新店面积',value:'约150平'},{key:'推荐型号',value:'G3标准版'},{key:'优势',value:'菜谱参数同步/减少调试'}],[{label:'创建复购跟进',style:'sheet-primary',action:'create'},{label:'生成追加方案',style:'sheet-green',action:'plan'}],{checklist:['确认新店开业时间','确认菜品结构差异','同步已有菜谱参数','创建复购客户跟进任务','更新客户档案标记复购意向']})},
  },
];

export const scenesByStage = (stageId) => scenes.filter(s => s.stageId === stageId);
export const findScene = (id) => scenes.find(s => s.id === id);
