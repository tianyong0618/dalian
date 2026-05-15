# 调解仲裁服务原型修复 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Fix all identified UX/technical issues in the 调解仲裁服务 prototype across 5 sub-pages

**Architecture:** Each sub-page is an independent HTML file loaded via iframe; fixes are per-file with shared pattern alignment

**Tech Stack:** Plain HTML + CSS + JavaScript, no frameworks

---

### Task 1: Fix 14a-arbitration.html (仲裁机构端)

**Files:**
- Modify: `原型设计/14a-arbitration.html`

- [ ] **Remove duplicate CSS blocks** — Merge `.video-main`, `.video-placeholder`, `.video-controls`, `.video-btn`, `.video-sub` blocks (L559-L630 and L631-L695 are duplicates)
- [ ] **Remove commented-out code** in the 调解管理 section (L1374-L1377)
- [ ] **Sync tab highlight on showModule** — When `showModule()` is called, also update the active class on `.tab-item` elements to match the shown module
- [ ] **Fix cloud trial height** — Change `height: calc(100vh - 180px)` to use a percentage-based or min-height approach that works inside iframe

### Task 2: Fix 14b-employer.html (用人单位端)

**Files:**
- Modify: `原型设计/14b-employer.html`

- [ ] **Remove duplicate CSS** — Merge `.notification` and `.modal-overlay` duplicate blocks (L860-L885 and L887-L900+)
- [ ] **Fix switchRole** — Change from `window.location.href` to `window.parent.postMessage({type: 'SWITCH_ROLE', role: role}, '*')`
- [ ] **Fix layout conflict** — Keep main dashboard content as default view, ensure tab switching properly hides/shows sections

### Task 3: Fix 14c-laborer.html (劳动者端)

**Files:**
- Modify: `原型设计/14c-laborer.html`

- [ ] **Simplify cloud trial modal** — The full "五分区" cloud trial layout (L1188+) is too large for a modal. Keep it as a reference design but reduce to essential elements
- [ ] **Add switchRole support** — If missing, add `window.parent.postMessage` for role switching

### Task 4: Fix 14d-legal-aid.html (法律援助端)

**Files:**
- Modify: `原型设计/14d-legal-aid.html`

- [ ] **Implement tab switching** — The 4 tabs (我的工作台/援助申请/案件管理/统计分析) exist in HTML but have no JS switching logic. Add tab click handlers that show/hide content sections
- [ ] **Fix switchRole** — Change from `window.location.href` to `window.parent.postMessage({type: 'SWITCH_ROLE', role: role}, '*')`

### Task 5: Fix 14e-supervisor.html (人社监管端)

**Files:**
- Modify: `原型设计/14e-supervisor.html`

- [ ] **Remove duplicate theme toggle** — Remove the standalone theme toggle button in the dashboard (around line 807) since the parent frame handles theme switching
- [ ] **Fix switchRole** — Change from `window.location.href` to `window.parent.postMessage({type: 'SWITCH_ROLE', role: role}, '*')`
