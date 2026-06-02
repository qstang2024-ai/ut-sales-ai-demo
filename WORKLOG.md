# WORKLOG · UT 销售AI助手 在线演示中心

> 最后更新：2026-05-28 D-020 修复

---

## D-020 修复记录

### 问题定位
工具条、Bottom Sheet、右侧 AI 后台工作台状态不同步。

**根因 1**: `_initPlayer()` 中 `if (!this.backend) this.backend = new AiBackendPanel(...)` 导致第一次创建后不再重建。`render()` 用 `innerHTML` 销毁旧 DOM后，backend 仍指向已销毁的 DOM 元素，所有 `updateField`/`updateProgress` 调用打到不存在/不可见的元素上。

**根因 2**: 工具条点击只打开 Bottom Sheet，不触发右侧后台卡片激活。

**根因 3**: 重播时调用 `this.backend.reset()` 操作已作废的 DOM。

### 修复

1. **`_initPlayer()`**: 移除 `if (!this.backend)` 守卫，每次 render 都 `this.backend = new AiBackendPanel(rightEl)` 重建实例。
2. **`ToolStrip`**: 每次都 `new ToolStrip(toolEl)` 重建而非复用旧实例。
3. **`_bindButtons()` tool strip handler**: 增加 `_syncBackendOnToolClick()` 在用户点击工具按钮时同步激活右侧对应卡片。
4. **`_bindButtons()` replay**: 移除 `this.backend.reset()` 旧调用（render 已重建 backend）。
5. **`AiBackendPanel.reset()`**: 修复 reset 中 className 操作改用 classList API。

### 联动机制

```
chatScript step.backend[]  ──→  ScenePlayer.exec()  ──→  AiBackendPanel.updateField/progress/check...
                                                              ↓
用户点击 tool-btn  ──→  _syncBackendOnToolClick()  ──→  AiBackendPanel.activateCard/highlight...
```

两者共用同一个 `AiBackendPanel` 实例，该实例在每次 `render()` 时重新绑定到新鲜 DOM。
