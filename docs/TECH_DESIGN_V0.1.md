# UT 销售 AI 助手 · 在线演示中心技术方案 V0.1

> 状态：技术基准稿（小鲁班整理输出）
> 来源：绿水 PRD V0.1 + D-014 任务卡 + V4 实现经验
> 使用对象：工程组 / 绿水 / 用户
> 核心约束：不改线上页面、不改主问答系统、不改知识库和后端

---

## 1. 推荐技术形态

### 1.1 技术栈建议

| 层面 | 选择 | 理由 |
|---|---|---|
| 构建工具 | **Vite** | 零配置启动、HMR 快、build 产物干净、支持原生 ES modules |
| 语言 | **原生 JavaScript（ES6+）** | 演示中心无复杂状态管理需求，不需要 React/Vue 框架，降低依赖 |
| CSS | **原生 CSS（CSS Variables + Grid + Flexbox）** | V4 已验证纯 CSS 足以实现所有视觉效果，按文件拆分即可 |
| 组件化 | **ES Modules + 自定义元素或纯函数组件** | 每个 `.js` 文件导出一个函数/类，负责渲染和更新对应 DOM |
| 部署 | **Vite build → 静态文件 → GitHub Pages** | 产物为纯静态 HTML/JS/CSS，可部署到任何静态托管 |

### 1.2 为什么不继续做单独 HTML 文件

| 问题 | 说明 |
|---|---|
| **可维护性** | 15 个场景若各复制一份 HTML，微调工作量巨大 |
| **样式耦合** | 所有 CSS 在一个 `<style>` 标签内，组件之间无边界 |
| **JS 膨胀** | ScenePlayer、ToolStrip、BottomSheet 逻辑耦合在一个 `<script>` 内 |
| **场景配置** | 场景数据硬编码在 JS 数组中，新增场景需修改核心代码 |
| **Tab 扩展** | 无法支持多 Tab（场景演示/基础方案/产品介绍） |
| **团队协作** | 单个 1200+ 行 HTML 难以多人并行开发 |

### 1.3 Vite 工程最低配置

```json
// package.json（建议）
{
  "name": "ut-sales-ai-demo-center",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>UT 销售AI助手 · 在线演示中心</title>
  <link rel="stylesheet" href="/src/styles/base.css"/>
  <link rel="stylesheet" href="/src/styles/layout.css"/>
  <link rel="stylesheet" href="/src/styles/theme.css"/>
  <link rel="stylesheet" href="/src/styles/scene-player.css"/>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

---

## 2. 目录结构

```
demo-sales-ai/
├── package.json              # Vite 工程配置（本轮可创建）
├── index.html                # 入口 HTML（本轮可创建）
├── vite.config.js            # Vite 配置（可选，默认即可）
├── README.md                 # 项目说明
├── docs/
│   ├── PRODUCT_SPEC_V0.1.md  # 产品规格（本轮创建）
│   ├── TECH_DESIGN_V0.1.md   # 本文件
│   └── SCENE_POLISH_PLAN_V0.1.md  # 场景打磨计划（本轮创建）
├── src/
│   ├── main.js               # 应用入口：初始化 AppShell 和路由
│   ├── styles/
│   │   ├── base.css          # 全局 reset、字体、CSS Variables
│   │   ├── layout.css        # 三栏布局、Tab 布局、响应式
│   │   ├── theme.css         # 颜色、圆角、阴影、动画 keyframes
│   │   └── scene-player.css  # 手机框、气泡、聊天、弹层、工具条样式
│   ├── components/
│   │   ├── AppShell.js       # 应用壳：管理大 Tab 和全局布局
│   │   ├── TopTabs.js        # 顶部大 Tab 导航
│   │   ├── StageNav.js       # 7 阶段横向导航
│   │   ├── ScenarioIntro.js  # 左侧场景说明区
│   │   ├── ScenePlayer.js    # 场景播放引擎：消息播放、卡片联动
│   │   ├── PhoneChat.js      # 手机聊天框：渲染消息列表
│   │   ├── ToolStrip.js      # 底部工具横条：5 个按钮 + 点亮逻辑
│   │   ├── BottomSheet.js    # 弹层组件：客户画像/日程/ROI 等
│   │   └── AiBackendPanel.js # 右侧 AI 后台工作台：4-5 张信息卡片
│   ├── data/
│   │   ├── tabs.js           # 大 Tab 配置
│   │   ├── stages.js         # 7 阶段定义（名称、作用、颜色）
│   │   ├── scenes.js         # 所有场景数据（或按阶段分文件）
│   │   └── knowledgeCards.js # 知识卡模板库
│   └── pages/
│       ├── ScenarioDemoPage.js   # 场景演示主页面
│       ├── BaseSolutionPage.js   # 基础方案页面（占位）
│       └── ProductIntroPage.js   # 产品介绍页面（占位）
└── public/
    └── assets/               # 静态资源（图标、图片等）
```

---

## 3. 组件职责与边界

### 3.1 AppShell.js

- **职责**：顶层应用壳
- **输入**：当前激活的 Tab ID
- **输出**：完整页面 DOM
- **管理**：TopTabs + 对应页面组件
- **状态**：`currentTab: "scenario" | "solution" | "product" | "roadmap"`

```js
// 伪接口
export function AppShell(container) {
  let currentTab = "scenario";
  function render() {
    container.innerHTML = `
      ${TopTabs(currentTab)}
      ${renderPage(currentTab)}
    `;
  }
  function switchTab(tabId) { currentTab = tabId; render(); }
  return { render, switchTab };
}
```

### 3.2 TopTabs.js

- **职责**：渲染顶部 4 个大 Tab
- **输入**：`activeTab: string`
- **输出**：Tab 导航 HTML
- **事件**：`onTabChange(tabId)`

### 3.3 StageNav.js

- **职责**：渲染 P1-P7 阶段导航条
- **输入**：`activeStage: string`, `stages: Array`
- **输出**：横向阶段导航 HTML
- **事件**：`onStageChange(stageId)`

### 3.4 ScenarioDemoPage.js

- **职责**：场景演示主页面，组装三栏布局
- **输入**：`currentStage`, `currentScene`
- **输出**：左侧 + 中间 + 右侧完整布局
- **子组件**：ScenarioIntro + PhoneChat + ToolStrip + BottomSheet + AiBackendPanel

### 3.5 ScenarioIntro.js

- **职责**：渲染左侧场景说明
- **输入**：`sceneData.leftPanel`
- **输出**：左侧面板 HTML

### 3.6 ScenePlayer.js

- **职责**：场景播放引擎（核心组件）
- **输入**：`sceneData.chatScript`
- **输出**：逐步执行步骤，驱动 PhoneChat、ToolStrip、BottomSheet、AiBackendPanel 更新
- **方法**：`play()`, `pause()`, `reset()`, `next()`
- **不负责**：DOM 渲染（通过事件/回调通知子组件）

```js
// 伪接口
export class ScenePlayer {
  constructor(config) {
    this.steps = config.steps;
    this.onMessage = config.onMessage;        // (type, data) => void
    this.onToolUpdate = config.onToolUpdate;   // (toolId, state) => void
    this.onCardUpdate = config.onCardUpdate;   // (cardId, data) => void
    this.onOverlay = config.onOverlay;         // (type, data) => void
    this.onRecShow = config.onRecShow;         // (text) => void
  }
  play() { /* 逐步骤执行，触发回调 */ }
  reset() { /* 清空状态 */ }
}
```

### 3.7 PhoneChat.js

- **职责**：渲染手机聊天框
- **输入**：消息列表 `messages: Array<{type, text}>`
- **约束**：只渲染 `customer` 和 `sales` 类型消息，不渲染 AI 卡片
- **暴露**：`addMessage(type, text)`, `showTyping()`, `hideTyping()`, `clear()`

### 3.8 ToolStrip.js

- **职责**：渲染和管理底部 5 个工具按钮
- **输入**：`buttons: Array<{id, label, icon, state, badge}>`
- **状态**：`dim | active`
- **暴露**：`updateButton(id, state, badge)`, `reset()`
- **事件**：`onButtonClick(buttonId)`

### 3.9 BottomSheet.js

- **职责**：弹层容器
- **输入**：`overlayType: string`, `content: Object`
- **方法**：`open(type, content)`, `close()`
- **内容**：根据 `overlayType` 渲染对应的卡片内容（画像卡/日程卡/ROI 等）
- **事件**：`onAction(actionId)` — 弹层内按钮被点击

### 3.10 AiBackendPanel.js

- **职责**：渲染右侧 AI 后台工作台
- **输入**：`cards: Array<{id, title, fields, progress, state}>`
- **状态**：`dim | active`
- **暴露**：`updateCard(cardId, data)`, `highlightCard(cardId)`, `reset()`

---

## 4. 场景数据结构

每个场景是一个 JS 对象，由 `scenes.js` 导出：

```js
// data/scenes.js
export const scenes = [
  {
    // === 元信息 ===
    id: "p2-profile-auto-complete",
    stageId: "P2",
    stageName: "客户画像与需求洞察",
    title: "社餐客户画像自动补全",
    subtitle: "从一句聊天，自动长出客户画像和销售动作",

    // === 左侧面板 ===
    leftPanel: {
      painPoints: [
        "客户信息都藏在聊天里，销售听过但容易忘",
        "口语信息无法自动变成结构化画像"
      ],
      aiInterventions: [
        "从对话中自动抽取业态、面积、单量、人员和痛点",
        "工具横条自动点亮'客户画像'按钮",
        "点击可查看完整的客户信息收集卡"
      ],
      capabilities: ["对话信息抽取", "客户画像补全", "行动意图识别"],
      businessValue: "让销售不用离开聊天界面，就能把客户信息沉淀为可跟进、可执行的销售过程"
    },

    // === 聊天脚本（时间线步骤） ===
    chatScript: [
      { type: "time", text: "10:32", delay: 300 },
      { type: "customer", text: "我们是做快餐的...", delay: 700 },
      { type: "typing", duration: 1100, delay: 900 },
      { type: "sales", text: "明白，您这种一般是...", delay: 1100 },
      // ...更多步骤
    ],

    // === 右侧面板 ===
    rightPanel: {
      cards: [
        {
          id: "card-profile",
          title: "客户信息收集状态",
          accentColor: "blue",
          fields: [
            { key: "客户大类", value: "--", valueId: "rp-type" },
            { key: "细分类别", value: "--", valueId: "rp-subtype" },
            // ...
          ],
          progressId: "card-profile-progress",
          initialProgress: 10,
        },
        // ...另外 3 张卡
      ]
    },

    // === 弹层内容 ===
    overlays: {
      profile: {
        title: "客户画像收集卡",
        subtitle: "已从当前对话中自动补全 7 项信息",
        fields: [
          { key: "客户大类", value: "社餐" },
          { key: "细分类别", value: "快餐简餐" },
          // ...
        ],
        progress: 70,
        actions: [
          { id: "save", label: "写入客户档案", style: "primary" },
          { id: "close", label: "关闭", style: "secondary" }
        ]
      },
      schedule: {
        title: "试菜日程草稿",
        subtitle: "已从对话中识别可创建内部任务",
        fields: [...],
        checklist: ["协调演示厨师", "准备食材", "预设菜谱参数", ...],
        actions: [
          { id: "create_task", label: "创建内部日程", style: "primary" },
          { id: "generate_text", label: "生成客户确认话术", style: "green" }
        ]
      }
    },

    // === 步骤与卡片联动（可选，简化方案中步骤内嵌 right_card 属性） ===
    // 步骤可通过 right_card 属性直接触发卡片更新
  },
  // ...更多场景
];
```

---

## 5. V4 单场景迁移计划

### 5.1 拆解映射

| V4 中的实现 | 迁移到 | 说明 |
|---|---|---|
| CSS 变量和全局样式 | `src/styles/base.css` + `theme.css` | 直接抽取 |
| 三栏布局 CSS | `src/styles/layout.css` | 直接抽取 |
| 手机/聊天/弹层 CSS | `src/styles/scene-player.css` | 直接抽取 |
| HTML 结构 | `ScenarioDemoPage.js` + 子组件 | 拆分为组件渲染函数 |
| `<div class="scene-left">` | `ScenarioIntro.js` | 接收 leftPanel 数据渲染 |
| `<div class="phone">` | `PhoneChat.js` | 管理消息列表和渲染 |
| `<div class="tool-strip">` | `ToolStrip.js` | 管理按钮状态和事件 |
| `<div class="overlay-sheet">` | `BottomSheet.js` | 管理弹层打开/关闭/内容 |
| `<aside class="scene-right">` | `AiBackendPanel.js` | 管理卡片状态和更新 |
| `class ScenePlayer` | `ScenePlayer.js` | 核心引擎，解耦 DOM 操作 |
| `const steps = [...]` | `scenes.js` | 场景数据独立存储 |
| `function updateEl/sprog/schip...` | 内置于各组件或共享工具函数 | 不再全局散落 |

### 5.2 迁移步骤

1. 创建 Vite 工程骨架（package.json + index.html + vite.config.js）
2. 从 V4 HTML 中提取 CSS → 分拆到 4 个 CSS 文件
3. 实现 ScenePlayer 引擎（先不绑定 DOM，纯状态机）
4. 实现 PhoneChat 组件（消息 add/clear 接口）
5. 实现 ToolStrip 组件（按钮状态管理）
6. 实现 BottomSheet 组件（开/关/内容切换）
7. 实现 AiBackendPanel 组件（卡片激活/高亮/更新）
8. 实现 ScenarioIntro 组件（渲染 leftPanel 数据）
9. 实现 ScenarioDemoPage 组装三栏
10. 迁移 V4 场景数据 → `scenes.js` 中第一条记录
11. 端到端验证：默认场景效果与 V4 一致
12. 添加 TopTabs + StageNav + 其他 Tab 占位

---

## 6. 后续扩展 7 阶段 15 场景

### 6.1 接入流程

1. 在 `scenes.js` 中新增一条场景配置
2. 如需新弹层类型，在 `BottomSheet.js` 中添加对应渲染逻辑
3. 如需新工具按钮（如"报价"、"合同"），在 `ToolStrip.js` 中扩展配置
4. 如需新右侧卡片字段，在 `AiBackendPanel.js` 中添加渲染模板
5. 在 `stages.js` 中将场景挂到对应阶段

### 6.2 避免的坑

- 不要每个场景复制一份 PhoneChat 组件
- 不要为每个弹层类型写独立组件（应在 BottomSheet 内按 type 分发渲染）
- 统一使用 chatScript 步骤格式，不要混用 CSS animation-delay 和 JS setTimeout
- 右侧卡片更新逻辑统一通过 AiBackendPanel.updateCard() 接口

---

## 7. 本地预览方式

```bash
# 进入演示中心目录
cd /Users/qingshan/projects/UT-qa-assistant/demo-sales-ai

# 安装依赖（首次）
npm install

# 启动开发服务器
npm run dev
# Vite 默认在 http://localhost:5173 启动

# 生产构建
npm run build
# 产物在 dist/ 目录

# 预览生产构建
npm run preview
```

---

## 8. 在线部署方案

### 8.1 推荐方案：GitHub Pages

1. `npm run build` 生成 `dist/` 目录
2. 将 `dist/` 部署到 GitHub Pages
3. 可选：通过 GitHub Actions 自动化部署

### 8.2 备选方案

- **Vercel / Netlify**：连接 GitHub 仓库，自动构建部署
- **Nginx 静态托管**：将 `dist/` 放到服务器的静态目录
- **现有路径集成**：如果部署到 `ttmouse.github.io/AI-Sale/` 下，需调整 Vite 的 `base` 配置

### 8.3 Vite base 配置

```js
// vite.config.js
export default {
  base: '/AI-Sale/demo-center/', // 按实际部署路径调整
}
```

---

## 9. 禁止修改的文件和目录

| 路径 | 原因 |
|---|---|
| `/Users/qingshan/projects/UT-qa-assistant/*.html`（根目录 HTML） | 主工程页面，包括 V4 Demo |
| `/Users/qingshan/projects/UT-qa-assistant/backend/` | 主问答系统后端 |
| `/Users/qingshan/projects/UT-qa-assistant/frontend/` | 主问答系统前端 |
| `/Users/qingshan/projects/UT-qa-assistant/ingest/` | 知识库入库管线 |
| `/Users/qingshan/projects/UT-qa-assistant/nightly/` | 复盘进程 |
| `/Users/qingshan/projects/UT-qa-assistant/var/` | 运行期数据 |
| `/Users/qingshan/projects/UT-qa-assistant/00_collaboration/` | 协作治理文档 |
| `/Users/qingshan/projects/UT-qa-assistant/01_product/` | 产品文档 |
| `/Users/qingshan/projects/UT-qa-assistant/02_technical/` | 技术文档 |
| `/Users/qingshan/projects/UT-qa-assistant/03_delivery/` | 交付文档 |
| `/Users/qingshan/projects/UT-qa-assistant/04_reviews/` | 评审报告 |
| `/Users/qingshan/projects/UT-qa-assistant/05_materials/` | 素材 |
| `/Users/qingshan/projects/UT-qa-assistant/99_archive/` | 归档 |
| `/Users/qingshan/projects/UT-qa-assistant/00-demo-sales-ai/` | 绿水的输入文档（只读引用源） |
| `/Users/qingshan/projects/UT-qa-assistant/work/` | 工作草稿区 |
| `https://ttmouse.github.io/AI-Sale/...` | 线上旧页面 |
| `~/.hermes/`, `~/.openclaw/`, `~/.local/share/opencode/` | 系统配置 |

**允许写入的唯一新区域**：`/Users/qingshan/projects/UT-qa-assistant/demo-sales-ai/`（本次新建的演示中心目录）。

---

## 10. 待确认技术决策

1. **Vite vs 零构建**：如果不需要构建步骤，也可用 ES modules 直接在浏览器运行。Vite 的 HMR 和 build 对后续部署有帮助，建议采用。
2. **组件化方式**：纯函数 vs Web Components vs 轻量框架（如 lit-html）。建议先用纯函数 + innerHTML，简单够用。
3. **状态管理**：当前 ScenePlayer 用回调模式，无需引入 Redux/MobX 等库。
4. **TypeScript**：建议保持原生 JS，降低门槛。如果工程组偏好 TS，可在后续引入。
5. **测试**：暂不引入测试框架，以手动验收为主。
6. **package.json 创建时机**：本轮创建文件和目录，package.json 可等到实际开发阶段再创建，避免依赖未安装时的混乱。

---

*本文档由小鲁班根据绿水 PRD V0.1、D-014 任务卡和 V4 实现经验整理，于 2026-05-27 输出。*
