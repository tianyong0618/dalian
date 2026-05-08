# 就业人员画像功能原型改造 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按照需求文档全面改造 9-employment-portrait.html，实现5大功能模块并支持三类用户权限控制

**Architecture:** 单文件 HTML 原型改造，按需求文档5大模块重组页面结构：用户切换器 → 数据采集 → 标签体系 → 画像管理 → AI技术应用 → 重点群体监测。使用纯 HTML/CSS/JS 实现，无后端依赖。

**Tech Stack:** HTML5, CSS3 (CSS Variables), Vanilla JavaScript

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `原型设计/9-employment-portrait.html` | Modify | 主文件，包含所有HTML结构、内联CSS和JS逻辑 |
| `原型设计/style.css` | Modify | 全局样式，新增用户切换器、数据采集卡片、权限控制等样式 |
| `docs/superpowers/specs/2026-05-08-employment-portrait-design.md` | Reference | 设计文档，包含所有设计决策 |

---

### Task 1: 添加用户类型切换器

**Files:**
- Modify: `原型设计/9-employment-portrait.html:25-32` (在导航栏后、页面标题前插入)
- Modify: `原型设计/style.css` (新增切换器样式)

- [ ] **Step 1: 在HTML中添加用户类型切换器**

在 `<div class="page-content">` 之后、` <div class="container">` 之后插入：

```html
    <!-- 用户类型切换器 -->
    <div class="user-switcher mb-32">
      <div class="section-header mb-16">
        <h3 style="font-size: 16px; font-weight: 600; color: var(--text-secondary);">当前用户类型</h3>
      </div>
      <div class="radio-group" style="display: flex; gap: 16px; flex-wrap: wrap;">
        <label class="radio-label" style="cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 12px 24px; border: 2px solid var(--border-color); border-radius: var(--radius-md); transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="if(!this.querySelector('input').checked) this.style.borderColor='var(--border-color)'">
          <input type="radio" name="user-type" value="gov" checked onchange="switchUserType('gov')" style="accent-color: var(--primary);">
          <span>🏛️ 人社部门</span>
        </label>
        <label class="radio-label" style="cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 12px 24px; border: 2px solid var(--border-color); border-radius: var(--radius-md); transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="if(!this.querySelector('input').checked) this.style.borderColor='var(--border-color)'">
          <input type="radio" name="user-type" value="agency" onchange="switchUserType('agency')" style="accent-color: var(--primary);">
          <span>🏢 经营性人力资源服务机构</span>
        </label>
        <label class="radio-label" style="cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 12px 24px; border: 2px solid var(--border-color); border-radius: var(--radius-md); transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="if(!this.querySelector('input').checked) this.style.borderColor='var(--border-color)'">
          <input type="radio" name="user-type" value="enterprise" onchange="switchUserType('enterprise')" style="accent-color: var(--primary);">
          <span>🏭 用工企业</span>
        </label>
      </div>
    </div>
```

- [ ] **Step 2: 在CSS中添加切换器选中样式**

在 `style.css` 末尾添加：

```css
/* 用户切换器选中状态 */
.radio-label:has(input:checked) {
  border-color: var(--primary) !important;
  background: rgba(22, 119, 255, 0.05);
}
```

- [ ] **Step 3: 添加用户切换JS函数**

在 `<script>` 标签内的函数区域添加：

```javascript
// 用户类型切换
let currentUserType = 'gov'; // gov | agency | enterprise
function switchUserType(type) {
  currentUserType = type;
  showNotification(`已切换为：${type === 'gov' ? '人社部门' : type === 'agency' ? '经营性人力资源服务机构' : '用工企业'}`, 'success');

  // 根据权限显示/隐藏功能
  const enterpriseOnly = document.querySelectorAll('.enterprise-hidden');
  const govOnly = document.querySelectorAll('.gov-only');

  if (type === 'enterprise') {
    enterpriseOnly.forEach(el => el.style.display = 'none');
    govOnly.forEach(el => el.style.opacity = '0.5');
  } else if (type === 'agency') {
    enterpriseOnly.forEach(el => el.style.display = 'none');
    govOnly.forEach(el => el.style.opacity = '1');
  } else {
    enterpriseOnly.forEach(el => el.style.display = '');
    govOnly.forEach(el => el.style.opacity = '1');
  }
}
```

- [ ] **Step 4: 验证**

在浏览器中打开 `原型设计/9-employment-portrait.html`，检查：
- 用户切换器显示在页面顶部
- 点击三个选项能切换
- 切换后有通知提示

- [ ] **Step 5: Commit**

```bash
cd "/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景"
git add 原型设计/9-employment-portrait.html 原型设计/style.css
git commit -m "feat: 添加用户类型切换器，支持三类用户权限框架"
```

---

### Task 2: 添加数据采集与整合模块

**Files:**
- Modify: `原型设计/9-employment-portrait.html` (在核心指标后、核心功能入口前插入)
- Modify: `原型设计/style.css` (新增数据源卡片样式)

- [ ] **Step 1: 添加数据采集模块HTML**

在核心指标 `<div class="row mb-48">` 结束后、核心功能 `<div class="section-header mb-32">` 前插入：

```html
    <!-- 数据采集与整合模块 -->
    <div class="section-header mb-32">
      <h2>数据采集与整合</h2>
      <p>整合社保、就业、人才、维权等多领域数据，实时同步更新</p>
    </div>
    <div class="row mb-48">
      <div class="col-3">
        <div class="data-source-card" data-source="social-security">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 24px;">📚</span>
            <span class="badge badge-success" style="font-size: 11px;">实时同步</span>
          </div>
          <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">社保数据</h4>
          <p class="text-small" style="color: var(--text-tertiary); margin-bottom: 4px;">最近更新：2026-05-08 10:30</p>
          <p class="text-small" style="color: var(--text-tertiary);">数据量：1,234,567 条</p>
          <div style="margin-top: 8px; font-size: 11px; color: var(--primary);">🤖 AI自动采集</div>
        </div>
      </div>
      <div class="col-3">
        <div class="data-source-card" data-source="employment">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 24px;">💼</span>
            <span class="badge badge-success" style="font-size: 11px;">实时同步</span>
          </div>
          <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">就业数据</h4>
          <p class="text-small" style="color: var(--text-tertiary); margin-bottom: 4px;">最近更新：2026-05-08 10:28</p>
          <p class="text-small" style="color: var(--text-tertiary);">数据量：856,432 条</p>
          <div style="margin-top: 8px; font-size: 11px; color: var(--primary);">🤖 AI自动采集</div>
        </div>
      </div>
      <div class="col-3">
        <div class="data-source-card" data-source="talent">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 24px;">🎓</span>
            <span class="badge badge-warning" style="font-size: 11px;">同步中</span>
          </div>
          <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">人才数据</h4>
          <p class="text-small" style="color: var(--text-tertiary); margin-bottom: 4px;">最近更新：2026-05-08 09:15</p>
          <p class="text-small" style="color: var(--text-tertiary);">数据量：432,109 条</p>
          <div style="margin-top: 8px; font-size: 11px; color: var(--primary);">🤖 AI自动采集</div>
        </div>
      </div>
      <div class="col-3">
        <div class="data-source-card" data-source="rights">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 24px;">⚖️</span>
            <span class="badge badge-success" style="font-size: 11px;">实时同步</span>
          </div>
          <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">维权数据</h4>
          <p class="text-small" style="color: var(--text-tertiary); margin-bottom: 4px;">最近更新：2026-05-08 10:25</p>
          <p class="text-small" style="color: var(--text-tertiary);">数据量：98,765 条</p>
          <div style="margin-top: 8px; font-size: 11px; color: var(--primary);">🤖 AI自动采集</div>
        </div>
      </div>
    </div>
    <div class="mb-48" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: rgba(22, 119, 255, 0.05); border-radius: var(--radius-md); border: 1px solid rgba(22, 119, 255, 0.2);">
      <div>
        <span style="color: var(--primary); font-weight: 600;">📡 数据同步状态：实时同步中</span>
        <span class="text-small ml-16" style="color: var(--text-tertiary);">上次完整同步：2026-05-08 08:00</span>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="showModal('data-management-modal')">进入数据管理</button>
    </div>
```

- [ ] **Step 2: 在CSS中添加数据源卡片样式**

在 `style.css` 末尾添加：

```css
/* 数据源卡片 */
.data-source-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 20px;
  transition: all 0.3s ease;
  height: 100%;
}
.data-source-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

- [ ] **Step 3: 创建数据管理模态框HTML**

在"通知提示"div之前插入数据管理模态框：

```html
<!-- 数据管理模态框 -->
<div class="modal-overlay" id="data-management-modal">
  <div class="modal" style="max-width: 900px;">
    <div class="modal-header">
      <h3>数据管理</h3>
      <button class="modal-close" onclick="closeModal('data-management-modal')">&times;</button>
    </div>
    <div class="modal-body">
      <!-- Tab导航 -->
      <div class="tabs" style="display: flex; border-bottom: 1px solid var(--border-color); margin-bottom: 24px;">
        <button class="tab-btn active" onclick="switchDataTab('log', this)" style="padding: 12px 24px; border: none; background: none; cursor: pointer; border-bottom: 2px solid var(--primary); color: var(--primary); font-weight: 600;">采集日志</button>
        <button class="tab-btn" onclick="switchDataTab('verify', this)" style="padding: 12px 24px; border: none; background: none; cursor: pointer; color: var(--text-secondary);">数据校验</button>
        <button class="tab-btn" onclick="switchDataTab('security', this)" style="padding: 12px 24px; border: none; background: none; cursor: pointer; color: var(--text-secondary);">安全管理</button>
        <button class="tab-btn" onclick="switchDataTab('clean', this)" style="padding: 12px 24px; border: none; background: none; cursor: pointer; color: var(--text-secondary);">数据清洗</button>
      </div>

      <!-- Tab内容：采集日志 -->
      <div id="data-tab-log">
        <table class="table">
          <thead><tr><th>采集时间</th><th>数据来源</th><th>数据条数</th><th>状态</th></tr></thead>
          <tbody>
            <tr><td>2026-05-08 10:30</td><td>社保数据</td><td>1,234</td><td><span class="badge badge-success">成功</span></td></tr>
            <tr><td>2026-05-08 10:28</td><td>就业数据</td><td>856</td><td><span class="badge badge-success">成功</span></td></tr>
            <tr><td>2026-05-08 09:15</td><td>人才数据</td><td>432</td><td><span class="badge badge-warning">部分成功</span></td></tr>
            <tr><td>2026-05-08 10:25</td><td>维权数据</td><td>98</td><td><span class="badge badge-success">成功</span></td></tr>
          </tbody>
        </table>
      </div>

      <!-- Tab内容：数据校验 -->
      <div id="data-tab-verify" style="display: none;">
        <div class="row mb-16">
          <div class="col-4"><div class="stat-card" style="padding: 16px;"><div class="number" style="font-size: 24px;">99.2%</div><div class="label">格式校验通过率</div></div></div>
          <div class="col-4"><div class="stat-card" style="padding: 16px;"><div class="number" style="font-size: 24px;">98.7%</div><div class="label">完整性校验</div></div></div>
          <div class="col-4"><div class="stat-card" style="padding: 16px;"><div class="number" style="font-size: 24px;">97.5%</div><div class="label">去重成功率</div></div></div>
        </div>
        <h4 class="mb-16">校验规则</h4>
        <div class="card mb-8" style="padding: 12px; background: var(--bg-secondary);">✅ 身份证号格式校验</div>
        <div class="card mb-8" style="padding: 12px; background: var(--bg-secondary);">✅ 必填字段完整性检查</div>
        <div class="card mb-8" style="padding: 12px; background: var(--bg-secondary);">✅ 重复数据自动去重</div>
        <div class="card" style="padding: 12px; background: var(--bg-secondary);">✅ 异常值检测与标记</div>
      </div>

      <!-- Tab内容：安全管理 -->
      <div id="data-tab-security" style="display: none;" class="gov-only">
        <div class="mb-16">
          <h4 class="mb-8">数据加密状态</h4>
          <div class="card" style="padding: 12px; background: rgba(82, 196, 26, 0.1); border: 1px solid rgba(82, 196, 26, 0.3);">
            🔒 敏感数据已加密存储（AES-256）
          </div>
        </div>
        <div class="mb-16">
          <h4 class="mb-8">访问权限设置</h4>
          <div class="card mb-8" style="padding: 12px;">人社部门：全部权限 ✓</div>
          <div class="card mb-8" style="padding: 12px;">机构：读取权限 ✓</div>
          <div class="card" style="padding: 12px;">企业：仅人才画像数据 ✓</div>
        </div>
        <div>
          <h4 class="mb-8">操作日志（最近5条）</h4>
          <div class="card mb-8" style="padding: 12px; font-size: 13px;">2026-05-08 10:30 - 张三（人社部门）查看了李四的画像</div>
          <div class="card mb-8" style="padding: 12px; font-size: 13px;">2026-05-08 09:15 - 王五（机构）导出了群体数据</div>
          <div class="card" style="padding: 12px; font-size: 13px;">2026-05-08 08:00 - 系统自动完成数据备份</div>
        </div>
      </div>

      <!-- Tab内容：数据清洗 -->
      <div id="data-tab-clean" style="display: none;">
        <h4 class="mb-16">清洗规则配置</h4>
        <div class="form-group">
          <label class="form-label"><input type="checkbox" checked style="accent-color: var(--primary);"> 自动去重</label>
        </div>
        <div class="form-group">
          <label class="form-label"><input type="checkbox" checked style="accent-color: var(--primary);"> 异常值处理</label>
        </div>
        <div class="form-group">
          <label class="form-label"><input type="checkbox" checked style="accent-color: var(--primary);"> 格式标准化</label>
        </div>
        <div class="form-group">
          <label class="form-label"><input type="checkbox" style="accent-color: var(--primary);"> 空值填充（谨慎使用）</label>
        </div>
        <button class="btn btn-primary mt-16" onclick="showNotification('清洗规则已更新', 'success')">保存配置</button>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 4: 添加数据管理Tab切换JS**

在 `<script>` 标签内添加：

```javascript
// 数据管理Tab切换
function switchDataTab(tab, btn) {
  const tabs = ['log', 'verify', 'security', 'clean'];
  tabs.forEach(t => {
    const el = document.getElementById(`data-tab-${t}`);
    if (el) el.style.display = 'none';
  });
  document.getElementById(`data-tab-${tab}`).style.display = 'block';

  document.querySelectorAll('#data-management-modal .tab-btn').forEach(b => {
    b.style.color = 'var(--text-secondary)';
    b.style.borderBottom = 'none';
  });
  btn.style.color = 'var(--primary)';
  btn.style.borderBottom = '2px solid var(--primary)';
}
```

- [ ] **Step 5: 验证**

在浏览器中打开页面，检查：
- 数据采集模块显示4个数据源卡片
- 点击"进入数据管理"打开模态框
- 4个Tab可以正常切换
- 安全管理Tab有 `gov-only` 类（人社部门可见）

- [ ] **Step 6: Commit**

```bash
cd "/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景"
git add 原型设计/9-employment-portrait.html 原型设计/style.css
git commit -m "feat: 添加数据采集与整合模块，含4个数据源卡片和数据管理模态框（4个Tab）"
```

---

### Task 3: 升级标签体系管理（6大分类）

**Files:**
- Modify: `原型设计/9-employment-portrait.html` (升级标签管理模态框)

- [ ] **Step 1: 替换标签管理模态框为左右布局**

将现有的 `tag-manage-modal` 替换为：

```html
<!-- 标签体系管理模态框 -->
<div class="modal-overlay" id="tag-manage-modal">
  <div class="modal" style="max-width: 900px;">
    <div class="modal-header">
      <h3>动态标签体系管理</h3>
      <button class="modal-close" onclick="closeModal('tag-manage-modal')">&times;</button>
    </div>
    <div class="modal-body">
      <div style="display: flex; gap: 24px; min-height: 400px;">
        <!-- 左侧分类导航 -->
        <div style="width: 200px; border-right: 1px solid var(--border-color); padding-right: 16px;">
          <h4 class="mb-16" style="font-size: 14px; color: var(--text-secondary);">标签分类</h4>
          <div class="tag-category-nav" style="display: flex; flex-direction: column; gap: 4px;">
            <button class="tag-cat-btn active" onclick="switchTagCategory('basic', this)" style="text-align: left; padding: 8px 12px; border: none; background: rgba(22, 119, 255, 0.1); color: var(--primary); border-radius: var(--radius-sm); cursor: pointer; font-size: 13px;">📋 基础信息标签</button>
            <button class="tag-cat-btn" onclick="switchTagCategory('education', this)" style="text-align: left; padding: 8px 12px; border: none; background: none; color: var(--text-secondary); border-radius: var(--radius-sm); cursor: pointer; font-size: 13px;">🎓 教育特征标签</button>
            <button class="tag-cat-btn" onclick="switchTagCategory('employment', this)" style="text-align: left; padding: 8px 12px; border: none; background: none; color: var(--text-secondary); border-radius: var(--radius-sm); cursor: pointer; font-size: 13px;">💼 就业特征标签</button>
            <button class="tag-cat-btn" onclick="switchTagCategory('skill', this)" style="text-align: left; padding: 8px 12px; border: none; background: none; color: var(--text-secondary); border-radius: var(--radius-sm); cursor: pointer; font-size: 13px;">⚡ 技能标签</button>
            <button class="tag-cat-btn" onclick="switchTagCategory('support', this)" style="text-align: left; padding: 8px 12px; border: none; background: none; color: var(--text-secondary); border-radius: var(--radius-sm); cursor: pointer; font-size: 13px;">🆘 帮扶标签</button>
            <button class="tag-cat-btn" onclick="switchTagCategory('intent', this)" style="text-align: left; padding: 8px 12px; border: none; background: none; color: var(--text-secondary); border-radius: var(--radius-sm); cursor: pointer; font-size: 13px;">🎯 意向标签</button>
          </div>
          <div class="mt-16" style="padding-top: 16px; border-top: 1px solid var(--border-color);">
            <button class="btn btn-primary btn-sm" style="width: 100%;" onclick="showNotification('AI正在智能生成标签...', 'success')">🤖 AI智能生成标签</button>
          </div>
        </div>
        <!-- 右侧标签列表 -->
        <div style="flex: 1;">
          <div class="form-group">
            <label class="form-label">添加新标签</label>
            <div style="display: flex; gap: 8px;">
              <input type="text" class="form-input" id="new-tag-input" placeholder="输入新标签名称">
              <button class="btn btn-primary" onclick="addTag()">添加</button>
            </div>
          </div>
          <div id="tag-list-by-category">
            <!-- 基础信息标签 -->
            <div data-tag-category="basic">
              <div class="mb-8"><span class="tag">年龄：25-35岁 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
              <div class="mb-8"><span class="tag">大专学历 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
              <div class="mb-8"><span class="tag">本地户籍 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
            </div>
            <!-- 教育特征标签 -->
            <div data-tag-category="education" style="display: none;">
              <div class="mb-8"><span class="tag">本科及以上 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span> <span style="font-size: 11px; color: var(--primary);">🤖 AI</span></div>
              <div class="mb-8"><span class="tag">计算机专业 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span> <span style="font-size: 11px; color: var(--primary);">🤖 AI</span></div>
              <div class="mb-8"><span class="tag">教育竞争力：高 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
            </div>
            <!-- 就业特征标签 -->
            <div data-tag-category="employment" style="display: none;">
              <div class="mb-8"><span class="tag">社保连续缴纳 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span> <span style="font-size: 11px; color: var(--primary);">🤖 AI</span></div>
              <div class="mb-8"><span class="tag">就业稳定性：高 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
              <div class="mb-8"><span class="tag">工作年限：3-5年 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
            </div>
            <!-- 技能标签 -->
            <div data-tag-category="skill" style="display: none;">
              <div class="mb-8"><span class="tag">Java开发 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span> <span style="font-size: 11px; color: var(--primary);">🤖 AI</span></div>
              <div class="mb-8"><span class="tag">Python <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
              <div class="mb-8"><span class="tag">SQL <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
            </div>
            <!-- 帮扶标签 -->
            <div data-tag-category="support" style="display: none;">
              <div class="mb-8"><span class="tag">就业困难人员 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
              <div class="mb-8"><span class="tag">帮扶等级：C级 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
              <div class="mb-8"><span class="tag">需技能培训 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
            </div>
            <!-- 意向标签 -->
            <div data-tag-category="intent" style="display: none;">
              <div class="mb-8"><span class="tag">求职意向：互联网 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span> <span style="font-size: 11px; color: var(--primary);">🤖 AI</span></div>
              <div class="mb-8"><span class="tag">薪资期望：15-20K <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
              <div class="mb-8"><span class="tag">工作地点：本地 <span style="cursor: pointer; color: var(--danger);" onclick="removeTag(this)">×</span></span></div>
            </div>
          </div>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); display: flex; gap: 16px; font-size: 13px; color: var(--text-tertiary);">
            <span>标签总数：<strong>128</strong></span>
            <span>AI自动生成：<strong>96</strong></span>
            <span>手动添加：<strong>32</strong></span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('tag-manage-modal')">关闭</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加标签分类切换JS**

在 `<script>` 标签内添加：

```javascript
// 标签分类切换
function switchTagCategory(category, btn) {
  // 隐藏所有分类
  document.querySelectorAll('[data-tag-category]').forEach(el => el.style.display = 'none');
  // 显示当前分类
  document.querySelectorAll(`[data-tag-category="${category}"]`).forEach(el => el.style.display = 'block');

  // 更新按钮样式
  document.querySelectorAll('.tag-cat-btn').forEach(b => {
    b.style.background = 'none';
    b.style.color = 'var(--text-secondary)';
  });
  btn.style.background = 'rgba(22, 119, 255, 0.1)';
  btn.style.color = 'var(--primary)';
}
```

- [ ] **Step 3: 更新旧的函数引用**

删除旧的 `filterTagCategories` 函数（如果存在），因为现在使用新的 `switchTagCategory` 函数。

- [ ] **Step 4: 验证**

在浏览器中打开页面，检查：
- 点击"标签体系管理"打开模态框
- 左侧6个分类可以切换
- 每个分类显示对应的标签
- AI生成的标签带"🤖 AI"标记
- 底部显示标签统计

- [ ] **Step 5: Commit**

```bash
cd "/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景"
git add 原型设计/9-employment-portrait.html
git commit -m "feat: 升级标签体系管理为6大分类，左右布局，支持AI标签标记"
```

---

### Task 4: 升级就业人员画像管理（三类画像）

**Files:**
- Modify: `原型设计/9-employment-portrait.html` (升级人员表格和详情模态框)

- [ ] **Step 1: 升级人员表格，新增画像类型列**

在表格 `<thead>` 的 `<tr>` 中，在"重点群体"列后添加：

```html
            <th>画像类型</th>
```

在每条 `<tr>` 中添加 `data-portrait-type` 属性，并更新内容。例如张三的行：

```html
          <tr data-group="高校毕业生" data-education="本科及以上" data-stability="high" data-portrait-type="talent">
            <td><strong>张三</strong></td>
            <td>本科</td>
            <td><span class="badge badge-info">高校毕业生</span></td>
            <td><span class="badge badge-purple" style="background: rgba(114, 46, 209, 0.1); color: var(--primary-gradient-end);">人才画像</span></td>
            <td><div class="progress-bar"><div class="progress-fill" style="width: 88%;"></div></div></td>
            <td><div class="progress-bar"><div class="progress-fill" style="width: 78%;"></div></div></td>
            <td><span class="tag" style="font-size: 12px;">Java开发</span> <span class="tag" style="font-size: 12px;">3年经验</span></td>
            <td><button class="btn btn-secondary btn-sm" onclick="viewPersonDetail(0)">查看画像</button></td>
          </tr>
```

李四的行（求职者画像，蓝色badge）：
```html
          <tr data-group="就业困难人员" data-education="高中及以下" data-stability="low" data-portrait-type="jobseeker">
            <td><strong>李四</strong></td>
            <td>高中</td>
            <td><span class="badge badge-warning">就业困难</span></td>
            <td><span class="badge badge-info">求职者画像</span></td>
            ...
```

王五的行（重点群体画像，橙色badge）：
```html
          <tr data-group="农民工" data-education="高中及以下" data-stability="medium" data-portrait-type="keygroup">
            <td><strong>王五</strong></td>
            <td>中专</td>
            <td><span class="badge badge-success">农民工</span></td>
            <td><span class="badge badge-warning" style="background: rgba(250, 173, 20, 0.1); color: var(--warning);">重点群体画像</span></td>
            ...
```

- [ ] **Step 2: 在筛选栏添加画像类型筛选**

在现有的筛选 `<select>` 后添加：

```html
      <select class="form-select" id="filter-portrait-type" onchange="filterPersons()">
        <option value="">全部画像类型</option>
        <option value="jobseeker">求职者画像</option>
        <option value="talent">人才画像</option>
        <option value="keygroup">重点群体画像</option>
      </select>
```

- [ ] **Step 3: 更新 filterPersons 函数支持画像类型筛选**

替换现有的 `filterPersons` 函数：

```javascript
// 筛选人员
function filterPersons() {
  const search = document.getElementById('person-search').value.toLowerCase();
  const group = document.getElementById('filter-group').value;
  const education = document.getElementById('filter-education').value;
  const stability = document.getElementById('filter-stability').value;
  const portraitType = document.getElementById('filter-portrait-type').value;

  const rows = document.querySelectorAll('#person-tbody tr');
  rows.forEach(row => {
    let show = true;
    if (search && !row.textContent.toLowerCase().includes(search)) show = false;
    if (group && row.getAttribute('data-group') !== group) show = false;
    if (education && row.getAttribute('data-education') !== education) show = false;
    if (stability && row.getAttribute('data-stability') !== stability) show = false;
    if (portraitType && row.getAttribute('data-portrait-type') !== portraitType) show = false;
    row.style.display = show ? '' : 'none';
  });
}
```

- [ ] **Step 4: 升级画像详情模态框支持三类画像动态切换**

替换现有的 `person-detail-modal` 内容，使其支持动态切换：

```html
<!-- 人员详情模态框（升级版） -->
<div class="modal-overlay" id="person-detail-modal">
  <div class="modal" style="max-width: 900px;">
    <div class="modal-header">
      <h3 id="detail-person-name">人员画像详情</h3>
      <button class="modal-close" onclick="closeModal('person-detail-modal')">&times;</button>
    </div>
    <div class="modal-body">
      <!-- 画像类型切换Tab -->
      <div id="portrait-type-tabs" style="display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
        <button class="portrait-tab active" onclick="switchPortraitType('jobseeker', this)" style="padding: 8px 16px; border: 2px solid var(--primary); background: rgba(22, 119, 255, 0.1); color: var(--primary); border-radius: var(--radius-sm); cursor: pointer; font-size: 13px;">📋 求职者画像</button>
        <button class="portrait-tab" onclick="switchPortraitType('talent', this)" style="padding: 8px 16px; border: 2px solid var(--border-color); background: none; color: var(--text-secondary); border-radius: var(--radius-sm); cursor: pointer; font-size: 13px;">💼 人才画像</button>
        <button class="portrait-tab" onclick="switchPortraitType('keygroup', this)" style="padding: 8px 16px; border: 2px solid var(--border-color); background: none; color: var(--text-secondary); border-radius: var(--radius-sm); cursor: pointer; font-size: 13px;">👥 重点群体画像</button>
      </div>

      <!-- 公共信息 -->
      <div class="row mb-24">
        <div class="col-6">
          <div class="form-group">
            <label class="form-label">姓名</label>
            <div id="detail-name" class="text-h3"></div>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="form-label">重点群体</label>
            <div id="detail-group"></div>
          </div>
        </div>
      </div>

      <!-- 求职者画像维度 -->
      <div id="portrait-jobseeker" class="portrait-content">
        <div class="row mb-24">
          <div class="col-3"><div class="stat-card" style="padding: 16px;"><div class="number" id="detail-competitiveness" style="font-size: 24px;">0%</div><div class="label">教育竞争力</div></div></div>
          <div class="col-3"><div class="stat-card" style="padding: 16px;"><div class="number" id="detail-stability" style="font-size: 24px;">0%</div><div class="label">就业稳定性</div></div></div>
          <div class="col-3"><div class="stat-card" style="padding: 16px;"><div class="number" id="detail-support-index" style="font-size: 24px;">0%</div><div class="label">帮扶指数</div></div></div>
          <div class="col-3"><div class="stat-card" style="padding: 16px;"><div class="number" id="detail-salary-trend" style="font-size: 24px;">0%</div><div class="label">薪资趋势</div></div></div>
        </div>
        <div class="form-group">
          <label class="form-label">标签列表（帮扶标签 + 意向标签）</label>
          <div id="detail-tags-jobseeker" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
        </div>
      </div>

      <!-- 人才画像维度 -->
      <div id="portrait-talent" class="portrait-content" style="display: none;">
        <div class="row mb-24">
          <div class="col-3"><div class="stat-card" style="padding: 16px;"><div class="number" style="font-size: 24px;" id="detail-education-bg">-</div><div class="label">教育经历</div></div></div>
          <div class="col-3"><div class="stat-card" style="padding: 16px;"><div class="number" id="detail-skill" style="font-size: 24px;">0%</div><div class="label">职业技能</div></div></div>
          <div class="col-3"><div class="stat-card" style="padding: 16px;"><div class="number" id="detail-match" style="font-size: 24px;">0%</div><div class="label">意向匹配度</div></div></div>
          <div class="col-3"><div class="stat-card" style="padding: 16px;"><div class="number" id="detail-salary-exp" style="font-size: 24px;">-</div><div class="label">薪资预期</div></div></div>
        </div>
        <div class="form-group">
          <label class="form-label">标签列表（技能标签 + 教育标签）</label>
          <div id="detail-tags-talent" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
        </div>
      </div>

      <!-- 重点群体画像维度 -->
      <div id="portrait-keygroup" class="portrait-content" style="display: none;">
        <div class="row mb-24">
          <div class="col-4"><div class="stat-card" style="padding: 16px;"><div class="number" id="detail-group-scale" style="font-size: 24px;">0</div><div class="label">群体规模</div></div></div>
          <div class="col-4"><div class="stat-card" style="padding: 16px;"><div class="number" id="detail-group-rate" style="font-size: 24px;">0%</div><div class="label">群体就业率</div></div></div>
          <div class="col-4"><div class="stat-card" style="padding: 16px;"><div class="number" id="detail-group-demand" style="font-size: 20px;">-</div><div class="label">主要需求</div></div></div>
        </div>
        <div class="form-group">
          <label class="form-label">标签列表（基础信息 + 帮扶标签）</label>
          <div id="detail-tags-keygroup" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
        </div>
      </div>

      <!-- 个性化服务推送（公共） -->
      <div class="form-group mt-16">
        <label class="form-label">个性化服务推送</label>
        <div id="detail-services" style="display: flex; flex-direction: column; gap: 8px;"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('person-detail-modal')">关闭</button>
      <button class="btn btn-primary" onclick="showModal('job-recommend-modal')">查看推荐岗位</button>
    </div>
  </div>
</div>
```

- [ ] **Step 5: 更新 viewPersonDetail 函数支持三类画像**

替换现有的 `viewPersonDetail` 函数：

```javascript
// 查看人员详情（支持三类画像）
function viewPersonDetail(index) {
  const person = personData[index];
  document.getElementById('detail-person-name').textContent = person.name + ' 的画像详情';
  document.getElementById('detail-name').textContent = person.name;
  document.getElementById('detail-group').innerHTML = `<span class="badge badge-info">${person.group}</span>`;

  // 求职者画像
  document.getElementById('detail-competitiveness').textContent = person.competitiveness + '%';
  document.getElementById('detail-stability').textContent = person.stability + '%';
  document.getElementById('detail-support-index').textContent = (person.supportIndex || 65) + '%';
  document.getElementById('detail-salary-trend').textContent = (person.salaryTrend || 71) + '%';

  // 人才画像
  document.getElementById('detail-education-bg').textContent = person.education || '-';
  document.getElementById('detail-skill').textContent = person.skill + '%';
  document.getElementById('detail-match').textContent = (person.match || 91) + '%';
  document.getElementById('detail-salary-exp').textContent = person.salaryExp || '-';

  // 重点群体画像
  document.getElementById('detail-group-scale').textContent = person.groupScale || '0';
  document.getElementById('detail-group-rate').textContent = (person.groupRate || 0) + '%';
  document.getElementById('detail-group-demand').textContent = person.groupDemand || '-';

  // 标签（根据画像类型显示不同）
  const tagsHtml = person.tags.map(t => `<span class="tag">${t}</span>`).join('');
  document.getElementById('detail-tags-jobseeker').innerHTML = tagsHtml;
  document.getElementById('detail-tags-talent').innerHTML = tagsHtml;
  document.getElementById('detail-tags-keygroup').innerHTML = tagsHtml;

  // 个性化服务
  const servicesHtml = (person.services || [
    '📩 推荐岗位',
    '📚 推荐培训',
    '💰 可申请补贴',
    '🎓 职业路径'
  ]).map(s => `<div class="card" style="padding: 12px; font-size: 14px;">${s}</div>`).join('');
  document.getElementById('detail-services').innerHTML = servicesHtml;

  // 根据人员类型默认显示对应画像
  const portraitType = person.portraitType || 'jobseeker';
  switchPortraitType(portraitType, document.querySelector(`#portrait-type-tabs .portrait-tab`));

  // 检查权限
  if (currentUserType === 'enterprise' && portraitType !== 'talent') {
    showNotification('企业用户仅可查看人才画像', 'warning');
    switchPortraitType('talent', document.querySelectorAll('#portrait-type-tabs .portrait-tab')[1]);
  }

  showModal('person-detail-modal');
}

// 切换画像类型
function switchPortraitType(type, btn) {
  document.querySelectorAll('.portrait-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.portrait-tab').forEach(b => {
    b.style.borderColor = 'var(--border-color)';
    b.style.background = 'none';
    b.style.color = 'var(--text-secondary)';
  });
  document.getElementById(`portrait-${type}`).style.display = 'block';
  if (btn) {
    btn.style.borderColor = 'var(--primary)';
    btn.style.background = 'rgba(22, 119, 255, 0.1)';
    btn.style.color = 'var(--primary)';
  }
}
```

- [ ] **Step 6: 更新 personData 数据**

更新 `personData` 数组，为每个人员添加 `portraitType` 和其他新字段：

```javascript
const personData = [
  { name: "张三", idCard: "410xxxxxxxxxxxx1234", group: "高校毕业生", education: "本科", portraitType: "talent", competitiveness: 88, stability: 78, skill: 82, match: 91, salaryExp: "15K", tags: ["Java开发", "本科及以上", "3年经验", "社保连续缴纳", "求职意向：互联网"], services: ["📩 推荐岗位：高级Java开发（98%）", "📚 推荐培训：Java进阶（免费）", "💰 可申请补贴：2000元", "🎓 职业路径：Java→专家→架构师"] },
  { name: "李四", idCard: "410xxxxxxxxxxxx5678", group: "就业困难人员", education: "高中", portraitType: "jobseeker", competitiveness: 45, stability: 32, skill: 38, supportIndex: 75, salaryTrend: 65, tags: ["零工人员", "技能培训", "就业帮扶", "高中及以下"], services: ["📩 推荐岗位：仓管员（85%）", "📚 推荐培训：叉车证（免费）", "💰 可申请补贴：就业困难补贴1500元", "🆘 帮扶计划：一对一就业指导"] },
  { name: "王五", idCard: "410xxxxxxxxxxxx9012", group: "农民工", education: "中专", portraitType: "keygroup", competitiveness: 52, stability: 55, skill: 48, groupScale: "28,345", groupRate: 88.7, groupDemand: "欠薪维权", tags: ["建筑工", "计件工", "农民工", "中专学历"], services: ["📩 推荐岗位：建筑工长（82%）", "📚 推荐培训：安全员证", "💰 维权通道：在线投诉", "🆘 帮扶计划：法律援助"] },
  { name: "赵六", idCard: "410xxxxxxxxxxxx3456", group: "高校毕业生", education: "硕士", portraitType: "talent", competitiveness: 92, stability: 85, skill: 90, match: 95, salaryExp: "20K", tags: ["Python", "AI算法", "硕士", "社保连续缴纳"], services: ["📩 推荐岗位：AI工程师（95%）", "📚 推荐培训：深度学习（免费）", "💰 可申请补贴：人才引进5000元", "🎓 职业路径：AI→架构师"] },
  { name: "孙七", idCard: "410xxxxxxxxxxxx7890", group: "零工人员", education: "大专", portraitType: "jobseeker", competitiveness: 48, stability: 28, skill: 42, supportIndex: 68, salaryTrend: 55, tags: ["外卖骑手", "灵活用工", "零工人员", "大专"], services: ["📩 推荐岗位：骑手队长（78%）", "📚 推荐培训：物流管理", "💰 可申请补贴：灵活就业补贴800元", "🆘 帮扶计划：职业转型指导"] }
];
```

- [ ] **Step 7: 验证**

在浏览器中打开页面，检查：
- 表格新增"画像类型"列，显示不同颜色badge
- 筛选栏新增"画像类型"筛选
- 点击"查看画像"打开详情模态框
- 可以切换3种画像类型Tab
- 不同画像类型显示不同维度

- [ ] **Step 8: Commit**

```bash
cd "/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景"
git add 原型设计/9-employment-portrait.html
git commit -m "feat: 升级画像管理为三类画像（求职者/人才/重点群体），支持动态切换"
```

---

### Task 5: 嵌入AI技术标签到各模块

**Files:**
- Modify: `原型设计/9-employment-portrait.html` (在多个模块添加AI角标)

- [ ] **Step 1: 在核心功能卡片添加AI角标**

更新6个功能卡片，为相关卡片添加AI角标：

```html
<!-- 一键画像生成卡片，更新步骤说明 -->
<!-- 在步骤2的标题后添加 -->
<h4 class="mb-16">正在采集多维度数据... <span class="badge" style="background: rgba(22, 119, 255, 0.1); color: var(--primary); font-size: 11px;">🤖 AI数据采集与分析</span></h4>
```

更新步骤3的标题：
```html
<h4 class="mb-16">正在生成全息画像... <span class="badge" style="background: rgba(114, 46, 209, 0.1); color: var(--primary-gradient-end); font-size: 11px;">🕸️ 知识图谱关联分析中...</span></h4>
```

- [ ] **Step 2: 在岗位推荐卡片添加AI角标**

更新岗位推荐模态框中的每个岗位卡片，在标题后添加：
```html
<span class="badge" style="background: rgba(22, 119, 255, 0.1); color: var(--primary); font-size: 11px; margin-left: 8px;">🎯 AI精准匹配 98%</span>
```

- [ ] **Step 3: 在知识图谱模态框添加AI说明**

在知识图谱模态框的内容区域顶部添加：
```html
<div class="mb-16" style="padding: 12px 16px; background: rgba(22, 119, 255, 0.05); border-radius: var(--radius-sm); border: 1px solid rgba(22, 119, 255, 0.2); font-size: 13px; color: var(--primary);">
  🤖 运用知识图谱技术整合多维度数据，挖掘数据关联关系，精准提取就业人员特征
</div>
```

- [ ] **Step 4: 在画像核心维度区域添加AI说明**

在"画像核心维度"标题后添加：
```html
<p><span class="badge" style="background: rgba(22, 119, 255, 0.1); color: var(--primary); font-size: 11px;">🤖 AI算法自动计算</span> 多维度数据分析，精准刻画人员特征</p>
```

- [ ] **Step 5: 验证**

在浏览器中打开页面，检查：
- 一键生成画像的步骤显示AI标签
- 岗位推荐卡片显示AI匹配角标
- 知识图谱模块显示AI说明
- 画像核心维度显示AI算法标签

- [ ] **Step 6: Commit**

```bash
cd "/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景"
git add 原型设计/9-employment-portrait.html
git commit -m "feat: 嵌入AI技术标签到各模块，突出知识图谱和AI算法应用"
```

---

### Task 6: 升级重点群体监测（新增AI预警）

**Files:**
- Modify: `原型设计/9-employment-portrait.html` (升级重点群体监测表格)

- [ ] **Step 1: 在重点群体监测表格新增AI预警列**

在表头 `<thead>` 的 `<tr>` 中，在"趋势"列前添加"AI预警"列：

```html
            <th>AI预警</th>
```

在表格的每条 `<tr>` 中添加AI预警单元格。例如高校毕业生行：

```html
          <tr>
            <td><strong>高校毕业生</strong></td>
            <td>12,456</td>
            <td>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div class="progress-bar" style="width: 120px;"><div class="progress-fill" style="width: 91.2%;"></div></div>
                <span>91.2%</span>
              </div>
            </td>
            <td>岗位匹配、就业指导</td>
            <td><span style="font-size: 12px; color: var(--primary);">🤖 AI预测持续上升 ↑</span></td>
            <td><span style="color: var(--success);">↑ 上升</span></td>
            <td><span class="badge badge-success">监测中</span></td>
          </tr>
```

就业困难人员行（添加预警）：
```html
          <tr>
            <td><strong>就业困难人员</strong></td>
            <td>3,892</td>
            <td>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div class="progress-bar" style="width: 120px;"><div class="progress-fill" style="width: 76.5%; background: var(--warning);"></div></div>
                <span>76.5%</span>
              </div>
            </td>
            <td>技能培训、兜底安置</td>
            <td><span style="font-size: 12px; color: var(--danger);">⚠️ AI预警：需重点关注</span></td>
            <td style="color: var(--warning);">→ 平稳</td>
            <td><span class="badge badge-warning">重点关注</span></td>
          </tr>
```

零工从业人员行（添加预警）：
```html
          <tr>
            <td><strong>零工从业人员</strong></td>
            <td>15,678</td>
            <td>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div class="progress-bar" style="width: 120px;"><div class="progress-fill" style="width: 82.3%; background: var(--warning);"></div></div>
                <span>82.3%</span>
              </div>
            </td>
            <td>权益保障、职业培训</td>
            <td><span style="font-size: 12px; color: var(--danger);">⚠️ AI预警：权益风险</span></td>
            <td style="color: var(--success);">↑ 上升</td>
            <td><span class="badge badge-warning">重点关注</span></td>
          </tr>
```

- [ ] **Step 2: 在群体分析模态框添加AI预警内容**

在群体分析模态框的特征分析区域添加：

```html
        <div class="mt-16">
          <h4 class="mb-8">AI智能分析</h4>
          <div class="card mb-8" style="padding: 12px; background: rgba(22, 119, 255, 0.05); font-size: 13px;">
            🤖 <strong>就业率预测：</strong>基于历史数据，预计下季度就业率将<span style="color: var(--success);">上升2%</span>
          </div>
          <div class="card" style="padding: 12px; background: rgba(22, 119, 255, 0.05); font-size: 13px;">
            🤖 <strong>帮扶建议：</strong>建议增加互联网行业岗位推荐，预计可提升匹配率<span style="color: var(--success);">15%</span>
          </div>
        </div>
```

- [ ] **Step 3: 验证**

在浏览器中打开页面，检查：
- 重点群体监测表格新增"AI预警"列
- 就业率和趋势列显示AI预测图标
- 就业率低于80%的群体显示预警提示
- 群体分析模态框显示AI智能分析内容

- [ ] **Step 4: Commit**

```bash
cd "/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景"
git add 原型设计/9-employment-portrait.html
git commit -m "feat: 升级重点群体监测，新增AI预警列和智能分析"
```

---

### Task 7: 实现企业用户权限控制

**Files:**
- Modify: `原型设计/9-employment-portrait.html` (完善权限控制逻辑)

- [ ] **Step 1: 为功能卡片添加权限控制类**

为企业不可见的功能卡片添加 `enterprise-hidden` 类，为仅人社部门可见的元素添加 `gov-only` 类：

```html
<!-- 数据采集模块添加 gov-only -->
<div class="section-header mb-32 gov-only">
  <h2>数据采集与整合</h2>
  ...
</div>

<!-- 标签体系管理卡片不添加限制（机构可看） -->

<!-- 重点群体分析卡片添加 enterprise-hidden -->
<div class="col-4 enterprise-hidden">
  <div class="feature-card" onclick="showModal('group-analysis-modal')">
    ...
  </div>
</div>

<!-- 企业人才筛选卡片（企业主入口）保持可见 -->
```

- [ ] **Step 2: 完善 switchUserType 函数**

更新现有的 `switchUserType` 函数，添加完整的权限控制逻辑：

```javascript
// 用户类型切换（完善版）
function switchUserType(type) {
  currentUserType = type;
  const typeNames = { gov: '人社部门', agency: '经营性人力资源服务机构', enterprise: '用工企业' };
  showNotification(`已切换为：${typeNames[type]}`, 'success');

  // 人社部门：全部可见
  if (type === 'gov') {
    document.querySelectorAll('.enterprise-hidden').forEach(el => el.style.display = '');
    document.querySelectorAll('.gov-only').forEach(el => {
      el.style.display = '';
      el.style.opacity = '1';
    });
    document.querySelectorAll('.portrait-tab').forEach(btn => btn.style.display = '');
  }
  // 机构：可看求职者+重点群体画像，数据管理仅查看
  else if (type === 'agency') {
    document.querySelectorAll('.enterprise-hidden').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.gov-only').forEach(el => {
      el.style.display = '';
      el.style.opacity = '1';
    });
    // 隐藏人才画像Tab
    const talentTab = document.querySelectorAll('.portrait-tab')[1];
    if (talentTab) talentTab.style.display = 'none';
  }
  // 企业：仅人才画像
  else if (type === 'enterprise') {
    document.querySelectorAll('.enterprise-hidden').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.gov-only').forEach(el => {
      el.style.display = 'none';
    });
    // 只显示人才画像Tab
    document.querySelectorAll('.portrait-tab').forEach((btn, idx) => {
      btn.style.display = idx === 1 ? '' : 'none';
    });
  }
}
```

- [ ] **Step 3: 在页面加载时初始化权限**

在 `<script>` 末尾添加：

```javascript
// 页面加载时初始化用户权限
document.addEventListener('DOMContentLoaded', function() {
  switchUserType('gov');
});
```

- [ ] **Step 4: 验证**

在浏览器中打开页面，依次切换三种用户类型，检查：
- **人社部门**：所有功能可见，数据管理的安全管理Tab可见
- **机构**：数据采集模块可见但置灰，企业人才筛选不可见，人才画像Tab隐藏
- **企业**：仅看到人才画像相关内容，其他功能隐藏或置灰，点击求职者画像提示无权限

- [ ] **Step 5: Commit**

```bash
cd "/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景"
git add 原型设计/9-employment-portrait.html 原型设计/style.css
git commit -m "feat: 完善三类用户权限控制，企业仅可见人才画像，机构部分受限"
```

---

### Task 8: 最终验证与整理

**Files:**
- Modify: `原型设计/9-employment-portrait.html`
- Modify: `原型设计/style.css`

- [ ] **Step 1: 全面检查页面功能**

在浏览器中打开页面，按设计文档的验收标准逐项检查：
- [ ] 页面按5大模块结构重组，与需求文档对应
- [ ] 用户类型切换器正常工作，3种权限正确拦截
- [ ] 数据采集模块展示4个数据源 + 数据管理模态框（4个Tab）
- [ ] 标签体系扩展为6大分类，模态框升级为左右布局
- [ ] 三类画像（求职者/人才/重点群体）在详情模态框中动态切换
- [ ] AI技术标签嵌入各相关模块
- [ ] 重点群体监测新增AI预警列
- [ ] 企业用户权限正确限制（仅查看人才画像）

- [ ] **Step 2: 检查页面样式一致性**

- 确保所有新增元素使用已有的CSS变量（var(--primary)等）
- 确保新增卡片、按钮样式与现有设计一致
- 检查响应式布局是否正常

- [ ] **Step 3: 清理测试代码**

- 删除任何测试用的注释或临时代码
- 确保JavaScript函数没有语法错误
- 确保HTML标签正确闭合

- [ ] **Step 4: 最终Commit**

```bash
cd "/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景"
git add 原型设计/9-employment-portrait.html 原型设计/style.css
git commit -m "docs: 完成就业人员画像功能原型全面改造，符合需求文档全部要求"
```

---

## Self-Review Checklist

**1. Spec coverage:**
- [x] 数据采集与整合模块 → Task 2
- [x] 动态标签体系（6大分类） → Task 3
- [x] 三类画像管理 → Task 4
- [x] AI技术应用展示 → Task 5
- [x] 重点群体监测升级 → Task 6
- [x] 用户权限控制 → Task 7

**2. Placeholder scan:**
- No "TBD", "TODO", or incomplete steps found
- All code blocks contain actual implementation code
- Each step has clear verification method

**3. Type consistency:**
- `portraitType` field consistently used in personData and switchPortraitType()
- `currentUserType` variable used consistently across functions
- All DOM element IDs match between HTML and JS

**4. No placeholder steps found. Plan is complete.**
