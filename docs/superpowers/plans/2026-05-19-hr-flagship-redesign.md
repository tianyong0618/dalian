# HR Flagship Redesign — PRD-Aligned Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Replace existing 原型设计/12-hr/index.html with a PRD-aligned redesign covering all 16 modules (Gov 6, Org 6, Enterprise 4)

**Architecture:** Single-file HTML (same as current), dark theme, no external CSS/JS dependencies except Font Awesome CDN. Uses existing modal system, toast, and state transition patterns.

**Tech Stack:** Pure HTML+CSS+Vanilla JS, Font Awesome 6.5.1 CDN

---

## File Structure

- **Modify:** `原型设计/12-hr/index.html` — single HTML file containing everything
- **Reference:** `docs/prd/人力资源服务旗舰店系统功能需求说明.md`

The file follows this structure:
1. HTML head (CSS variables, component styles, responsive)
2. HTML body (header, role switcher, tab bar, content area, modal overlay, toast)
3. JavaScript:
   a. ROLE_CONFIG with new module defs
   b. contentMap with HTML templates for each module
   c. Handler functions (detail views, modals, state transitions)
   d. Window exposure + init

## ROLE_CONFIG — New Module Definitions

### Gov (监管端) — accent: blue
1. `gov-agency` 机构管理
2. `gov-practitioner` 从业人员管理
3. `gov-shop` 线上服务网店监管
4. `gov-match` 供需撮合
5. `gov-mediation` 争议调解
6. `gov-evaluate` 诚信评价

### Org (机构端) — accent: purple
1. `org-profile` 机构信息管理
2. `org-practitioner` 从业人员管理
3. `org-shop` 线上服务网店
4. `org-match` 供需撮合
5. `org-mediation` 争议处理
6. `org-evaluate` 诚信评价

### Enterprise (企业端) — accent: green
1. `ent-mall` 服务商城
2. `ent-demand` 用工需求
3. `ent-order` 订单管理
4. `ent-evaluate` 评价与维权

## Per-Module Content Pattern

Each module template follows this structure:
```
stats grid (4 cards) → section title → toolbar (search + add button) → data table → action buttons
```

Non-table modules (dashboards) use `card-grid` with `info-card` components.

## Business Process Flow (State Transitions)

| Action | Current State | New State | Badge Class |
|--------|--------------|-----------|-------------|
| 审核通过(机构) | 审核中 | 营业中 | green |
| 审核驳回(机构) | 审核中 | 已驳回 | red |
| 注销机构 | 营业中 | 已注销 | gray |
| 审核通过(从业) | 待审核 | 已备案 | green |
| 审核通过(服务) | 待审核 | 已上线 | green |
| 强制下架 | 已上线 | 已下架 | gray |
| 受理争议 | 待受理 | 调解中 | orange |
| 达成协议 | 调解中 | 已完成 | green |
| 终止调解 | 调解中 | 调解失败 | red |
| 确认订单 | 待确认 | 进行中 | blue |
| 完成订单 | 进行中 | 已完成 | green |

---

### Task 1: Core Framework & Gov Modules

**Files:**
- Write: `原型设计/12-hr/index.html` (first 50%)

Build the HTML shell, CSS, ROLE_CONFIG, and all 6 Gov modules with their handler functions.

**Deliverables:**
- Complete HTML structure (header, navigation, tabs, modal, toast)
- CSS with form-field styles, modal styles, table styles
- ROLE_CONFIG with PRD-aligned definitions (all 3 roles)
- contentMap entries for all 6 Gov modules with realistic mock data
- Handler functions: viewAgency, viewPractitioner, viewShop, viewMediation, handleAudit etc.
- All handlers exposed to window

### Task 2: Org Modules

**Files:**
- Modify: `原型设计/12-hr/index.html` (add Org content to contentMap + handlers)

Add all 6 Org modules.

### Task 3: Enterprise Modules

**Files:**
- Modify: `原型设计/12-hr/index.html` (add Ent content to contentMap + handlers)

Add all 4 Enterprise modules.

### Task 4: Integration & Verification

**Files:**
- Modify: `原型设计/12-hr/index.html`

- Wire all handlers to window
- Verify JS syntax
- Verify all onclick function references exist
- Run final diagnostics

---

## Implementation Approach

Due to file size constraints, implement in 3 parallel streams:

1. **Agent A (Task 1)** — Writes the full file with core framework + all 6 Gov modules
2. **Agent B (Task 2)** — Adds Org module contentMap entries + handlers into the file from Agent A
3. **Agent C (Task 3)** — Adds Enterprise module contentMap entries + handlers
4. **Agent D (Task 4)** — Final assembly, syntax check, verification

Each agent must maintain:
- Consistent variable naming
- All handlers assigned to `window`
- Proper brace/paren balance
- No duplicate function names
- PRD-aligned table headers and data columns
