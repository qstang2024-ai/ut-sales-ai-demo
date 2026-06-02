# UT 销售 AI 助手 · 在线演示中心

> 版本：V0.1（核心框架 + 6 场景可运行）
> 状态：开发中

## 项目简介

UT 销售 AI 助手在线演示中心，用于向客户和内部团队系统展示 AI 如何在真实销售对话中自动识别需求、补全画像、推荐话术、创建流程。

## 本地运行

```bash
cd demo-sales-ai
npm install    # 首次
npm run dev    # 启动开发服务器 → http://localhost:5173
npm run build  # 生产构建 → dist/
npm run preview # 预览构建产物
```

## 目录结构

```
demo-sales-ai/
├── package.json / vite.config.js / index.html
├── WORKLOG.md                  # 开发状态黑板
├── docs/                       # 产品/技术文档
├── src/
│   ├── main.js                 # 应用入口
│   ├── styles/                 # CSS（base/layout/theme/scene-player）
│   ├── components/             # 组件（ScenePlayer/ToolStrip/Overlay/AiBackendPanel）
│   ├── data/                   # 数据（tabs/stages/scenes/knowledgeCards）
│   └── pages/                  # 页面（ScenarioDemo/Placeholder）
├── public/assets/
└── dist/                       # 构建产物
```

## 当前功能

- **4 大 Tab**：场景演示（完整）/ 基础方案（占位）/ 产品介绍（占位）/ 路线图（占位）
- **7 阶段导航**：P1 线索接入 ～ P7 交付复购
- **6 核心场景**：抖音开场 / 画像补全 / 智能选型 / ROI测算 / 试菜日程 / 报价确认
- **交互能力**：逐条对话播放 + 底部工具横条 + BottomSheet弹层 + 推荐回复→发送 + 右侧AI后台

## 场景清单

| ID | 阶段 | 场景名称 |
|---|---|---|
| P1-S1 | 线索接入 | 抖音线索智能开场 |
| P2-S1 | 需求洞察 | 社餐客户画像自动补全 |
| P3-S1 | 产品匹配 | 快餐门店智能选型推荐 |
| P4-S1 | 价值证明 | 价格异议 + ROI回本测算 |
| P5-S1 | 试菜推进 | 试菜邀约与日程创建 |
| P6-S1 | 报价成交 | 报价条件确认 |

## 约束

- 不修改主问答系统任何文件
- 不修改线上任何页面
- 不修改 00-demo-sales-ai/ 下的源文档
- 所有开发仅限于本目录

---

*2026-05-28，由小鲁班搭建。*
