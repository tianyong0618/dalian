# 政策计算器重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 重构政策计算器页面，按用户角色划分模块结构，精简标签体系（3大类），添加政策覆盖率分析权限控制

**Architecture:** 修改现有单文件HTML原型 `6-policy-calculator.html`，调整顶部Tab导航、简化标签管理模态框、添加权限控制类

**Tech Stack:** HTML, CSS (style.css), Vanilla JavaScript

---

## 文件变更清单

- **Modify:** `原型设计/6-policy-calculator.html`
  - 调整顶部Tab导航权限控制
  - 精简标签管理模态框为单列表格
  - 政策覆盖率分析添加权限控制（机构+可见）
  - 更新标签体系为3大类

---

### Task 1: 调整顶部Tab导航权限控制

**Files:**
- Modify: `原型设计/6-policy-calculator.html:165-173` (顶部Tab导航区域)

- [ ] **Step 1: 调整Tab权限类名**

当前状态：
```html
<div class="tab-item active" onclick="switchCalcTab(this, 'calc')">🧮 政策测算</div>
<div class="tab-item gov-only" onclick="switchCalcTab(this, 'data')">📊 数据采集</div>
<div class="tab-item" onclick="switchCalcTab(this, 'policy')">📚 政策库</div>
<div class="tab-item" onclick="switchCalcTab(this, 'service')">📋 服务事项</div>
<div class="tab-item" onclick="switchCalcTab(this, 'network')">🕸️ 关联网络</div>
<div class="tab-item gov-only" onclick="switchCalcTab(this, 'effect')">📈 效果追踪</div>
<div class="tab-item gov-only" onclick="switchCalcTab(this, 'report')">📝 评估报告</div>
```

需要调整为：
- 数据采集：gov-only → gov-org-only（机构+人社可见）
- 效果追踪：gov-only → gov-org-only（机构+人社可见）
- 评估报告保持 gov-only（仅人社可见）

```html
<div class="tab-item active" onclick="switchCalcTab(this, 'calc')">🧮 政策测算</div>
<div class="tab-item" onclick="switchCalcTab(this, 'policy')">📚 政策库</div>
<div class="tab-item" onclick="switchCalcTab(this, 'service')">📋 服务事项</div>
<div class="tab-item" onclick="switchCalcTab(this, 'network')">🕸️ 关联网络</div>
<div class="tab-item gov-org-only" onclick="switchCalcTab(this, 'data')">📊 数据采集</div>
<div class="tab-item gov-org-only" onclick="switchCalcTab(this, 'effect')">📈 效果追踪</div>
<div class="tab-item gov-only" onclick="switchCalcTab(this, 'report')">📝 评估报告</div>
```

- [ ] **Step 2: 添加 gov-org-only CSS类**

在 `<style>` 标签中添加：
```css
/* 机构+人社可见 */
.gov-org-only { display: none; }
```

Run: 验证Tab导航权限显示正确
Expected: 个人/企业可见4个Tab，机构可见6个Tab，人社可见7个Tab

- [ ] **Step 3: 更新JS权限控制函数**

在 `updateRoleUI()` 函数中添加：
```javascript
// 机构和人社可见
document.querySelectorAll('.gov-org-only').forEach(el => {
  el.style.display = (role === 'gov' || role === 'org') ? 'block' : 'none';
});
```

Run: 验证角色切换时Tab显示正确

- [ ] **Step 4: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 调整顶部Tab导航权限控制

- 数据采集和效果追踪改为机构+可见
- 评估报告保持仅人社可见
- 添加gov-org-only CSS类

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: 精简标签管理模态框

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (找到 tag-manage-modal 区域，约在1000-1200行)

- [ ] **Step 1: 简化标签管理模态框HTML**

将当前的左右布局改为单列表格展示，标签分类简化为3大类：

```html
<!-- 标签管理模态框 -->
<div class="modal-overlay" id="tag-manage-modal">
  <div class="modal" style="max-width: 800px;">
    <div class="modal-header">
      <h3>政策标签管理</h3>
      <button class="modal-close" onclick="closeModal('tag-manage-modal')">&times;</button>
    </div>
    <div class="modal-body">
      <!-- 顶部按钮 -->
      <div class="mb-24" style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; gap: 8px;">
          <select class="form-select" style="width: 150px;" id="tag-filter-category" onchange="filterTagList()">
            <option value="">全部分类</option>
            <option value="policy-type">政策类型</option>
            <option value="target">适用对象</option>
            <option value="subsidy-form">补贴形式</option>
          </select>
          <input type="text" class="form-input" placeholder="搜索标签..." style="width: 200px;" id="tag-search" onkeyup="filterTagList()">
        </div>
        <button class="btn btn-primary" onclick="generateAITags()">🤖 AI智能生成标签</button>
      </div>
      
      <!-- 标签表格 -->
      <table class="table">
        <thead>
          <tr>
            <th>分类</th>
            <th>标签名称</th>
            <th>使用次数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="tag-table-body">
          <!-- 政策类型 -->
          <tr>
            <td><span class="badge badge-primary">政策类型</span></td>
            <td>就业补贴</td>
            <td>156</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-primary">政策类型</span></td>
            <td>创业扶持</td>
            <td>89</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-primary">政策类型</span></td>
            <td>培训资助</td>
            <td>124</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-primary">政策类型</span></td>
            <td>社保减免</td>
            <td>98</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-primary">政策类型</span></td>
            <td>稳岗返还</td>
            <td>67</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <!-- 适用对象 -->
          <tr>
            <td><span class="badge badge-info">适用对象</span></td>
            <td>个人求职者</td>
            <td>234</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-info">适用对象</span></td>
            <td>高校毕业生</td>
            <td>312</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-info">适用对象</span></td>
            <td>就业困难人员</td>
            <td>187</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-info">适用对象</span></td>
            <td>退役军人</td>
            <td>95</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-info">适用对象</span></td>
            <td>农民工</td>
            <td>78</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-info">适用对象</span></td>
            <td>企业</td>
            <td>156</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <!-- 补贴形式 -->
          <tr>
            <td><span class="badge badge-success">补贴形式</span></td>
            <td>资金补贴</td>
            <td>245</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-success">补贴形式</span></td>
            <td>税费减免</td>
            <td>112</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-success">补贴形式</span></td>
            <td>贷款贴息</td>
            <td>67</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-success">补贴形式</span></td>
            <td>社保补贴</td>
            <td>134</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
          <tr>
            <td><span class="badge badge-success">补贴形式</span></td>
            <td>岗位补贴</td>
            <td>89</td>
            <td><button class="btn btn-link btn-sm" onclick="editTag(this)">编辑</button> <button class="btn btn-link btn-sm text-danger" onclick="deleteTag(this)">删除</button></td>
          </tr>
        </tbody>
      </table>
      
      <!-- 底部统计 -->
      <div class="mt-24" style="padding: 16px; background: var(--bg-secondary); border-radius: var(--radius-md);">
        <span style="color: var(--text-secondary);">标签统计：</span>
        <span style="font-weight: 600;">总计 16 个</span>
        <span class="ml-16" style="color: var(--primary);">🤖 AI生成 3 个</span>
        <span class="ml-16">手动添加 13 个</span>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加标签搜索和筛选JS函数**

```javascript
// 标签搜索和筛选
function filterTagList() {
  const category = document.getElementById('tag-filter-category').value;
  const searchText = document.getElementById('tag-search').value.toLowerCase();
  const rows = document.querySelectorAll('#tag-table-body tr');
  
  rows.forEach(row => {
    const categoryCell = row.cells[0].textContent;
    const nameCell = row.cells[1].textContent.toLowerCase();
    
    const categoryMatch = !category || categoryCell.includes(getCategoryName(category));
    const searchMatch = !searchText || nameCell.includes(searchText);
    
    row.style.display = (categoryMatch && searchMatch) ? '' : 'none';
  });
}

function getCategoryName(category) {
  const names = {
    'policy-type': '政策类型',
    'target': '适用对象',
    'subsidy-form': '补贴形式'
  };
  return names[category] || '';
}

// 编辑标签（模拟）
function editTag(btn) {
  showNotification('标签编辑功能开发中...', 'info');
}

// 删除标签（模拟）
function deleteTag(btn) {
  if (confirm('确定要删除这个标签吗？')) {
    btn.closest('tr').remove();
    showNotification('标签已删除', 'success');
  }
}
```

- [ ] **Step 3: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 精简标签管理模态框为单列表格

- 标签分类简化为3大类：政策类型、适用对象、补贴形式
- 添加搜索和筛选功能
- 保留AI智能生成标签功能

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: 政策覆盖率分析添加权限控制

**Files:**
- Modify: `原型设计/6-policy-calculator.html:395-486` (政策覆盖率分析区域)

- [ ] **Step 1: 添加外层容器和权限类**

将政策覆盖率分析模块包裹在 gov-org-only 类中：

```html
<!-- 政策覆盖率分析 - 仅机构和人社可见 -->
<div class="gov-org-only">
  <div class="section-header mb-32">
    <h2>政策覆盖率分析</h2>
    <p>实时监测各类政策的覆盖情况与实施效果</p>
  </div>
  <div class="card">
    <!-- 原有表格内容保持不变 -->
    ...
  </div>
</div>
```

- [ ] **Step 2: 验证权限控制**

Run: 测试各角色下的显示状态
Expected:
- 个人用户：隐藏政策覆盖率分析
- 企业用户：隐藏政策覆盖率分析
- 机构用户：显示政策覆盖率分析
- 人社用户：显示政策覆盖率分析

- [ ] **Step 3: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 政策覆盖率分析添加权限控制

- 仅机构和人社可见
- 个人和企业用户隐藏此模块

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: 更新测算表单中的标签选择

**Files:**
- Modify: `原型设计/6-policy-calculator.html:344-356` (重点群体标签选择区域)

- [ ] **Step 1: 更新标签选择为精简分类**

将重点群体checkbox更新为适用对象标签：

```html
<div class="form-group">
  <label class="form-label">适用对象标签</label>
  <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px;">
    <label style="font-size: 14px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" value="graduate" id="tag-graduate"> 高校毕业生
    </label>
    <label style="font-size: 14px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" value="difficult" id="tag-difficult"> 就业困难人员
    </label>
    <label style="font-size: 14px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" value="veteran" id="tag-veteran"> 退役军人
    </label>
    <label style="font-size: 14px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" value="farmer" id="tag-farmer"> 农民工
    </label>
    <label style="font-size: 14px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" value="enterprise" id="tag-enterprise"> 企业
    </label>
  </div>
</div>
```

- [ ] **Step 2: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 更新测算表单标签为精简分类

- 重点群体改为适用对象标签
- 统一使用3大类标签体系

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: 整合测试和最终验证

**Files:**
- Verify: `原型设计/6-policy-calculator.html`

- [ ] **Step 1: 完整功能测试**

1. 刷新页面，验证默认角色为"人社部门"
2. 切换到"个人用户"：
   - 顶部Tab应显示4个（政策测算、政策库、服务事项、关联网络）
   - 政策覆盖率分析应隐藏
3. 切换到"用工企业"：
   - 顶部Tab应显示4个
   - 政策覆盖率分析应隐藏
4. 切换到"服务机构"：
   - 顶部Tab应显示6个（+数据采集、效果追踪）
   - 政策覆盖率分析应显示
5. 切换回"人社部门"：
   - 顶部Tab应显示7个（+评估报告）
   - 政策覆盖率分析应显示

- [ ] **Step 2: 标签管理模态框测试**

1. 找到"标签管理"按钮（人员画像页面）
2. 点击打开标签管理模态框
3. 验证显示为单列表格（分类、标签名称、使用次数、操作）
4. 测试搜索和筛选功能
5. 验证显示3大类标签：政策类型、适用对象、补贴形式

- [ ] **Step 3: 最终提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 政策计算器重构完成

- 模块按用户角色划分权限
- 标签体系精简为3大类
- 政策覆盖率分析添加权限控制

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## 自审检查清单

1. **Spec覆盖检查**：
   - [x] 模块按用户角色划分 → Task 1
   - [x] 精简标签体系（3大类） → Task 2
   - [x] 政策覆盖率分析权限控制 → Task 3
   - [x] 表单标签更新 → Task 4

2. **Placeholder扫描**：无TBD/TODO/placeholder

3. **类型一致性**：
   - switchRole() 函数已存在
   - updateRoleUI() 已存在
   - gov-org-only 类在Task 1添加
   - filterTagList() 在Task 2定义

4. **范围检查**：适合单一实施计划，5个独立任务

---

## 执行方式选择

**Plan complete and saved to `docs/superpowers/plans/2026-05-12-policy-calculator-refactor-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**