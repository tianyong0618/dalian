# 列表操作优化 Implementation Plan

**Goal:** Add missing operation buttons and dynamic status-based actions across 5 prototype pages

**Architecture:** Each page is independent HTML; changes are per-file button additions and conditional rendering logic

**Tech Stack:** Plain HTML + CSS + JavaScript

---

### Task 1: 14e-supervisor.html - Add operation column to dashboard project table

**Files:**
- Modify: `原型设计/14e-supervisor.html` (~L876-942)

Add `<th>操作</th>` to the dashboard project table header and a `详情/预警处置` button to each row. Match the existing pattern from the project tab (L986, L1006).

### Task 2: 14a-arbitration.html - Dynamic status-based actions in case management

**Files:**
- Modify: `原型设计/14a-arbitration.html` (~L1235-1295)

Replace hardcoded action buttons with status-dependent rendering:
- 待分配 → 「分配调解员」「分配仲裁员」
- 调解中 → 「查看调解进度」「转仲裁」
- 仲裁审理 → 「进入庭审」「生成裁决书」
- 已结案 → 「归档」「送达文书」

Each button calls `showNotification()` or existing modal functions. No new modals needed - prototype-level notifications suffice.

### Task 3: 14c-laborer.html - Add more actions to "我的案件" list

**Files:**
- Modify: `原型设计/14c-laborer.html` (~L804-837)

Add per-status actions to the case list:
- 审理中 → 「提交证据」「查看进度」
- 调解中 → 「申请调解」「补充材料」
- 已结案 → 「查看文书」

### Task 4: 14b-employer.html - Add missing operations

**Files:**
- Modify: `原型设计/14b-employer.html`

- Contract list (L1170-1206): Add 「下载PDF」「预览」buttons
- 应诉案件 (L1233-1252): Add 「提交答辩状」「上传证据」buttons

### Task 5: 14e-supervisor.html - Add disposal actions to warning detail list

**Files:**
- Modify: `原型设计/14e-supervisor.html` (~L1154-1207)

Add buttons to warning detail cards: 「处置记录」「降级/解除预警」「导出报告」
