# UT 销售 AI 助手 · iframe 路径修复总结

**修复日期**: 2026-06-02  
**修复者**: Claude Opus 4.7（OpenCode）  
**状态**: 已完成，dev 与外链均验证正常

---

## 1. 问题

外链 `https://executed-important-accurately-price.trycloudflare.com/` 上 Tab 3（手机端效果2）和 Tab 5（PC坐席）加载异常；dev `http://127.0.0.1:5174/` 正常。

---

## 2. 根因

Cloudflare Tunnel 对 `.html` URL 自动做两次 301 重定向：

```
/vendor/ai-sale/scene-2-chat/index.html
  → 301 → /vendor/ai-sale/scene-2-chat/index
  → 301 → /vendor/ai-sale/scene-2-chat   （无尾斜杠）
```

iframe 基路径变为 `/vendor/ai-sale/`，HTML 内的相对路径（如 `./shared/js/app.js`、`workbench-engine.js`）全部上移一层，资源 404。Tab 4（scene-11）因主要依赖 CDN 资源，受影响小。

---

## 3. 修复方案

**方案 C：在 vendor HTML 加 `<base>` 标签**（强制基准路径，不受 URL 重定向影响）。

### 改动文件（共 3 个，每个加 1 行）

| 文件 | 新增内容 |
|---|---|
| `public/vendor/ai-sale/scene-2-chat/index.html` | `<base href="/vendor/ai-sale/scene-2-chat/">` |
| `public/vendor/ai-sale/scene-12-workbench/index.html` | `<base href="/vendor/ai-sale/scene-12-workbench/">` |
| `public/vendor/ai-sale/scene-11-sales-assistant/index.html` | `<base href="/vendor/ai-sale/scene-11-sales-assistant/">` |

均插入在 `<head>` 之后第一行，确保在所有 `<link>` / `<script>` 之前生效。

`src/main.js`、`vite.config.js`、`package.json` **未修改**。

---

## 4. 验证结果

| 环境 | URL | 状态 |
|---|---|---|
| Dev (Vite) | http://127.0.0.1:5174/ | 7 个 Tab 全部正常 |
| 外链 (Cloudflare) | https://executed-important-accurately-price.trycloudflare.com/ | 7 个 Tab 全部正常 |

dist 已重新构建（`npm run build`），3 个 vendor HTML 中 `<base>` 标签同步到 dist。

---

## 5. 备份

| 备份路径 | 用途 |
|---|---|
| `work/backups/frontend-golden-20260602-100532/` | 黄金版本快照（已 chmod 只读保护） |
| `demo-sales-ai/.backup_20260602_100945/` | 修改前的本地备份 |

---

## 6. 后续维护建议

### 新增 vendor scene 时

如果未来在 `public/vendor/ai-sale/` 下新增 scene 目录，且通过 iframe 嵌入，**必须**在该 scene 的 `index.html` 头部加：

```html
<base href="/vendor/ai-sale/{scene-name}/">
```

### 修改 vendor HTML 时

`<base>` 标签必须保留，且必须在所有 `<link>` / `<script>` 之前。

### 重新部署外链

```bash
cd demo-sales-ai
npm run build
# 旧 Tunnel 复用即可（指向 5174 dev server，public/ 已含 <base>）
# 或停掉旧的，启动新 Tunnel 指向 dist 静态服务器
```

---

## 7. 关键决策记录

- **未选方案 D**（改 main.js 把 `index.html` 改成尾斜杠）：实测 Vite dev server 不会把目录路径自动 fallback 到 `index.html`，会破坏 5174。
- **未选方案 B**（dist + Python static + 新 Tunnel）：Cloudflare Tunnel 重定向是云端行为，换后端不解决。
- **选方案 C 的优势**：dev 与外链同时修复；改动 3 行；备份完整可秒级回滚。

---

*文档落盘: `demo-sales-ai/docs/IFRAME_PATH_FIX_SUMMARY.md`*
