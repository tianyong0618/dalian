# 调解仲裁服务模块修复计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development or executing-plans.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复调解仲裁服务模块中缺失的 case filter 函数，清理重复函数定义，确保所有"确定"按钮可用且业务逻辑合理

**Architecture:** 在 14a-arbitration.html 中添加 `filterCases` 和 `filterCaseType` 函数（基于案件列表表格的列筛选）；在 14b-employer.html 中删除重复/死代码的 `switchTab` 函数。

**Tech Stack:** Vanilla HTML/CSS/JavaScript

---

### Task 1: 添加 filterCases 和 filterCaseType 函数到 14a-arbitration.html

**Files:** Modify: `原型设计/14a-arbitration.html`

- [ ] **Step 1: 在 JavaScript 区域添加 filterCases 函数**

在 14a-arbitration.html 的 `<script>` 标签内（靠近已有函数如 `showModule` 附近），添加：

```javascript
// 案件筛选功能
function filterCases(status) {
  const table = document.querySelector('#module-case-management .data-table');
  if (!table) return;
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    if (status === 'all') {
      row.style.display = '';
      return;
    }
    const statusCell = row.querySelector('td:nth-child(6)');
    if (!statusCell) return;
    const statusText = statusCell.textContent.trim();
    const statusMap = {
      'pending': '待分配',
      'mediation': '调解中',
      'arbitration': '仲裁审理'
    };
    row.style.display = statusText.includes(statusMap[status]) ? '' : 'none';
  });
  showNotification(status === 'all' ? '显示全部案件' : '已筛选: ' + (document.querySelector('#module-case-management .form-select:first-child option:checked')?.textContent || ''), 'info');
}
```

- [ ] **Step 2: 添加 filterCaseType 函数**

在同一区域添加：

```javascript
function filterCaseType(type) {
  const table = document.querySelector('#module-case-management .data-table');
  if (!table) return;
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    if (type === 'all') {
      row.style.display = '';
      return;
    }
    const typeCell = row.querySelector('td:nth-child(4)');
    if (!typeCell) return;
    const typeText = typeCell.textContent.trim();
    const typeMap = {
      'labor': '劳动争议',
      'injury': '工伤待遇',
      'social': '社会保险'
    };
    row.style.display = typeText.includes(typeMap[type]) ? '' : 'none';
  });
  showNotification(type === 'all' ? '显示全部类型' : '已筛选案由: ' + (document.querySelector('#module-case-management .form-select:nth-child(2) option:checked')?.textContent || ''), 'info');
}
```

### Task 2: 清理 14b-employer.html 中的重复 switchTab 函数

**Files:** Modify: `原型设计/14b-employer.html`

- [ ] **Step 1: 删除第一个 switchTab 函数（死代码）**

删除 lines 1835-1853 的第一个 `switchTab` 定义（该函数按 `textContent` 匹配，但事件监听器使用 `data-tab` 属性，导致其永远不会被调用，被第二个 `switchTab` 完全覆盖）。

### Task 3: 验证修复

- [ ] **Step 1: 验证所有"确定"按钮的 JavaScript 函数存在且正确**

检查以下函数在各自的文件中都已定义：
- 14a-arbitration.html: `confirmSchedule()`, `confirmServe()`, `confirmAssign()`, `confirmSign()`, `filterCases()`, `filterCaseType()`
- 14b-employer.html: `confirmWage()`, `sendForSigning()`, `resolveComplaint()`
- 14c-laborer.html: `submitCase()`, `confirmReceive()`
- 14d-legal-aid.html: `submitAssign()`, `submitReview()`, `submitNewApplication()`

- [ ] **Step 2: 验证 filter 函数逻辑合理**

确认：
- `filterCases` 按状态列（第6列）筛选：待分配/调解中/仲裁审理
- `filterCaseType` 按案由列（第4列）筛选：劳动争议/工伤待遇/社会保险
- 选择 "全部状态/全部类型" 时显示所有行

- [ ] **Step 3: LSP diagnostics 检查**

```bash
# 检查 HTML 文件无语法问题
```

---
