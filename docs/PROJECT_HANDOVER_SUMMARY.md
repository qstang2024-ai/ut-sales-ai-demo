# demo-sales-ai 工程交接总结

> 最后更新：2026-06-02  
> 撰写：OpenCode (DeepSeek)  
> 审阅：小鲁班  
> 状态：已交付，等待后续开发者接手

---

## 1. 项目用途

`demo-sales-ai` 是 **UT 销售 AI 助手 · 在线演示中心**，位于父项目 `UT-qa-assistant` 下的子目录：

```
/Users/qingshan/projects/UT-qa-assistant/demo-sales-ai/
```

**定位**：产品演示站点，展示销售 AI 助手在真实客户对话中的能力（需求识别、画像补全、话术推荐、流程推进）。  
**不是**正式后端问答系统（那不在这里），也不是 UT-zhichu 资料源（那是只读引用）。

父项目 `UT-qa-assistant` 当前处于「协作框架 + P0 技术验证」阶段，**正式代码目录未解锁**。但 `demo-sales-ai` 作为独立子项目，有自己完整的开发/构建/部署闭环。

---

## 2. 当前访问入口

| 环境 | URL | 说明 |
|------|-----|------|
| **生产** | `https://demo-sales-ai.vercel.app` | Vercel 部署，长期可用 |
| 本地 Dev | `http://127.0.0.1:5174/` | Vite dev server |
| Cloudflare 隧道 | `https://executed-important-accurately-price.trycloudflare.com/` | 临时链接，可能已失效 |

> 国内访问 Vercel 可能需要 VPN。国内免 VPN 方案暂缓处理，作为独立任务。

---

## 3. 技术栈

| 项目 | 值 |
|------|-----|
| 构建工具 | Vite 5 |
| 语言 | 原生 JavaScript（ES Modules），无 React/Vue 框架 |
| CSS | 原生 CSS（CSS Variables + Flexbox + Grid），按文件拆分 |
| 包管理 | npm |
| Node 版本 | 本地 v24.14.0（Vercel 构建环境用 Node 20） |

### 关键命令

```bash
npm install        # 安装依赖（仅 vite）
npm run dev        # 本地开发服务器 → http://127.0.0.1:5174/
npm run build      # 生产构建 → dist/
npm run preview    # 本地预览构建产物
```

---

## 4. 页面结构

### 4.1 7 个主 Tab

| # | Tab 名称 | tab ID | 内容来源 | 备注 |
|---|---------|--------|---------|------|
| 1 | 业务的价值 | `bizvalue` | `src/pages/BusinessValuePage.js` | 懒加载（8s 预加载） |
| 2 | 手机端效果1 | `scenario` | `src/pages/ScenarioDemoPage.js` | 核心演示引擎 |
| 3 | 手机端效果2 | `scene3` | `public/vendor/ai-sale/scene-12-workbench/` | iframe 嵌入 |
| 4 | 手机APP | `scene5` | `public/vendor/ai-sale/scene-11-sales-assistant/` | iframe 嵌入 |
| 5 | PC坐席 | `scene4` | `public/vendor/ai-sale/scene-2-chat/` | iframe 嵌入 |
| 6 | 产品技术架构 | `techarch` | `src/pages/TechArchitecturePage.js` | 懒加载（8s 预加载） |
| 7 | 销售调研 | `survey` | `src/pages/TopSalesSurveyPage.js` | 懒加载（12s 预加载） |

### 4.2 核心文件

| 文件 | 用途 |
|------|------|
| `src/main.js` | 入口：App 类、Tab 导航、内容切换、iframe 管理 |
| `src/data/tabs.js` | Tab 配置（id / label） |
| `src/pages/ScenarioDemoPage.js` | 手机端效果1 的完整演示页面（左侧说明 + 中间手机 + 右侧 AI 后台） |
| `src/components/ScenePlayer.js` | 演示播放引擎（按 chatScript 步骤逐条推进） |
| `src/components/ToolStrip.js` | 底部 AI 工具横条（5 个按钮） |
| `src/components/BottomSheet.js` | 底部弹层组件 |
| `src/components/AiBackendPanel.js` | 右侧 AI 后台状态面板 |

### 4.3 CSS 文件

| 文件 | 用途 |
|------|------|
| `src/styles/base.css` | 全局基础与变量 |
| `src/styles/layout.css` | 页面布局、Tab 导航、三栏场景布局 |
| `src/styles/theme.css` | 颜色主题 |
| `src/styles/scene-player.css` | 手机聊天框样式 |
| `src/styles/survey.css` | 调研页样式 |
| `src/styles/tech-arch.css` | 技术架构页样式 |
| `src/styles/business-value.css` | 业务价值页样式 |

---

## 5. 关键历史问题与修复

### 5.1 PC坐席 iframe 资源 404（2026-06-02 修复）

**现象**：外网 Cloudflare 隧道访问时，Tab 3（手机端效果2）和 Tab 5（PC坐席）内容加载失败。

**根因**：Cloudflare Tunnel 对 `.html` URL 做两次 301 重定向：
```
/vendor/ai-sale/scene-2-chat/index.html
  → 301 → /vendor/ai-sale/scene-2-chat/index
  → 301 → /vendor/ai-sale/scene-2-chat
```
导致 iframe 基路径从 `/vendor/ai-sale/scene-2-chat/` 变为 `/vendor/ai-sale/`，所有 `./shared/js/app.js` 等相对资源路径全部解析到上一层，资源 404。

**修复方案（方案 C）**：在 3 个 vendor HTML 的 `<head>` 中添加 `<base>` 标签，强制锁定基准路径：

| 文件 | 添加内容 |
|------|---------|
| `public/vendor/ai-sale/scene-2-chat/index.html` | `<base href="./">` |
| `public/vendor/ai-sale/scene-12-workbench/index.html` | `<base href="./">` |
| `public/vendor/ai-sale/scene-11-sales-assistant/index.html` | `<base href="./">` |

> 最初使用绝对路径 `<base href="/vendor/ai-sale/scene-2-chat/">`（用于对抗 Cloudflare 重定向）。  
> 迁移到 Vercel 后改为 `<base href="./">`（相对路径），兼容所有部署环境。

**未选方案 D**（改 main.js iframe src 去 `/index.html` 加尾部斜杠）：Vite dev server 实测不自动把目录 fallback 到 `index.html`。

详细修复记录见 `docs/IFRAME_PATH_FIX_SUMMARY.md`。

### 5.2 PC坐席 header 信息被隐藏（2026-06-02 修复）

**现象**：PC坐席 Tab 内 vendor 页面自带的坐席信息（坐席名、今日任务量等）不显示。

**根因**：`src/main.js:84` 在 iframe 加载后用注入 CSS 隐藏了 `.ws-header`（与 `.scene-nav`、`.wb-nav` 一并隐藏，防止 vendor 自带的导航与主导航冲突）。

**修复**：从注入 CSS 选择器中移除 `.ws-header`，保留 `.scene-nav,.wb-nav{display:none!important;}`。坐席信息正常展示，vendor 内导航仍隐藏。

### 5.3 工具条、Bottom Sheet、右侧 AI 后台状态不同步（D-020 修复）

记录于 `WORKLOG.md`。根因是 `_initPlayer()` 中 backend 实例在 render() 用 innerHTML 重建 DOM 后仍指向已销毁的 DOM 元素。

### 5.4 其他已处理的部署问题

- GitHub Pages 因 Free 计划私人仓库不支持，改用 Vercel 部署。
- Vercel 部署时 GitHub auto-deploy 未绑定成功（缺少 Vercel 侧 GitHub Login Connection）。

---

## 6. 重要保护点

### 6.1 不可删除/修改

1. **vendor HTML 中的 `<base href="./">` 标签**（3 个文件，位置：`<head>` 后第一行）。这是 iframe 资源加载的关键修复，删除会导致 vendor 页面的 CSS/JS 全部 404。
2. **黄金版本备份**：`/Users/qingshan/projects/UT-qa-assistant/work/backups/frontend-golden-20260602-100532/`（只读保护）。
3. **本地备份**：`demo-sales-ai/.backup_20260602_100945/`（修改前的完整快照）。
4. **父项目治理文件**：`PROJECT.md`、`AGENTS.md`、`README.md`、`DOC_STATUS.md`、`DECISIONS.md`。
5. **UT-zhichu 资料源**：`~/projects/UT-zhichu/` 任何路径。

### 6.2 工程纪律

- **不要**为了小问题重构全局导航——改动范围大、回归风险高。
- **不要**同时混合「页面功能」和「部署链路」两个任务——一次修一个问题。
- **不要**在生产 URL 发给客户后频繁修改路径配置——先评估影响面。
- 涉及国内免 VPN 访问方案时，作为**独立任务**处理。

---

## 7. 本地验证方式

```bash
cd /Users/qingshan/projects/UT-qa-assistant/demo-sales-ai

# 1. 安装依赖（首次或 node_modules 缺失时）
npm install

# 2. 启动开发服务器
npm run dev
# → 浏览器打开 http://127.0.0.1:5174/

# 3. 生产构建
npm run build
# → 输出到 dist/

# 4. 预览构建产物
npm run preview
# → 默认 http://localhost:4173/
```

**验收标准**：7 个 Tab 全部可正常切换和展示。PC坐席 Tab 顶部可见坐席信息（"AI 企微坐席工作台" + "当前坐席：陈雪" + 任务量数据胶囊）。

---

## 8. 部署说明

### 8.1 当前部署

| 项目 | 值 |
|------|-----|
| 生产 URL | `https://demo-sales-ai.vercel.app` |
| 代码源 | `https://github.com/qstang2024-ai/ut-sales-ai-demo`（private） |
| 部署平台 | Vercel（项目名 `demo-sales-ai`） |
| 部署方式 | **当前手动**：`npm run build && npx vercel --prod --yes` |

### 8.2 GitHub 自动部署绑定

当前 Vercel 未绑定 GitHub auto-deploy（首次部署时报 400: 缺少 Login Connection）。

**如需绑定**（推荐）：去 [Vercel Dashboard](https://vercel.com/qs-l-s-projects/demo-sales-ai)→ Settings → Git → Connect GitHub，选择 `qstang2024-ai/ut-sales-ai-demo`。绑定后每次 `git push main` 自动触发部署。

### 8.3 本地重新部署到 Vercel

```bash
cd /Users/qingshan/projects/UT-qa-assistant/demo-sales-ai
npm run build
npx vercel --prod --yes
```

> 需要先执行过 `npx vercel login` 登录 Vercel 账号。

### 8.4 需要用户确认的事项

- 是否绑定 GitHub 自动部署
- 是否更换项目名 / 生产域名
- 国内免 VPN 访问方案选型（CDN / 国内部署 / Cloudflare Pages 等）

---

## 9. 后续开发入口

### 9.1 页面小修（文案/样式/布局）

直接修改对应文件，本地 `npm run dev` 验证后 `npm run build && npx vercel --prod --yes` 部署。

### 9.2 Tab 调整（增/删/改名）

修改 `src/data/tabs.js`（配置）和 `src/main.js`（内容加载逻辑）。新增 iframe Tab 时参考 `scene3`/`scene4`/`scene5` 的处理方式。

### 9.3 新增 vendor 场景页面

1. 在 `public/vendor/ai-sale/` 下创建新目录
2. 在 `index.html` 头部添加 `<base href="./">` 标签
3. 在 `src/main.js` `_showTab()` 中添加新的 case 分支
4. 在 `src/data/tabs.js` 中添加新的 tab 配置

### 9.4 国内免 VPN 访问

作为独立任务评估，可选方案：
- Vercel 绑定自定义域名 + 国内 CDN 加速
- 迁移到国内部署平台（阿里云 OSS + CDN、腾讯云静态托管）
- 使用 Cloudflare Pages（需要仓库 public）

### 9.5 正式销售演示入口

后续可能需要：
- 自定义域名（如 `demo.ut-zhichu.com`）
- 在 Vercel 或国内平台配置域名绑定
- 添加统计/监控

### 9.6 产品内容优化

参考 `docs/PRODUCT_SPEC_V0.1.md`（产品规格）和 `docs/SCENE_POLISH_PLAN_V0.1.md`（场景打磨计划）。当前仅有 7 个 Tab 的框架，后续需按产品规格扩展。

---

## 10. 给后续 AI 工程组的接手提示

**接手前必须先读以下文件（按顺序）**：

1. 本文件（`docs/PROJECT_HANDOVER_SUMMARY.md`）
2. `README.md` — 项目说明
3. `docs/IFRAME_PATH_FIX_SUMMARY.md` — iframe 路径修复记录（理解为什么有 `<base>` 标签）
4. `docs/PRODUCT_SPEC_V0.1.md` — 产品规格（理解页面设计意图）
5. `docs/TECH_DESIGN_V0.1.md` — 技术方案（理解架构选型）

**动手前必须确认**：

- 当前部署入口 URL 是否仍然有效（`https://demo-sales-ai.vercel.app`）
- GitHub 仓库是否为 `qstang2024-ai/ut-sales-ai-demo`
- Vercel 项目是否为 `demo-sales-ai`
- `<base href="./">` 标签是否仍在 3 个 vendor HTML 中

**红线**：

- 不删除 vendor HTML 中的 `<base>` 标签
- 不修改 `work/backups/frontend-golden-*` 黄金备份
- 不同时混合改页面功能和部署链路
- 不改 GitHub 仓库 public/private 可见性
- 凭证、token、密钥一律不读取/不输出

---

*本文档由 OpenCode (DeepSeek) 于 2026-06-02 撰写，基于 demo-sales-ai 工程实际代码状态。*
