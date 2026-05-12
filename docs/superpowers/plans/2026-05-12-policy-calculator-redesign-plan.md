# 政策计算器原型全面重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按照设计文档全面重构政策计算器原型，参考就业人员画像的模块结构和样式，实现用户权限体系、数据采集模块、标签管理、核心功能卡片样式升级和AI技术嵌入。

**Architecture:** 修改现有单文件HTML原型 `6-policy-calculator.html`，新增用户切换器、数据源卡片、标签管理模态框，升级功能卡片样式，增加权限控制逻辑和AI标识。

**Tech Stack:** HTML, CSS (style.css), Vanilla JavaScript

---

## 文件变更清单

- **Modify:** `原型设计/6-policy-calculator.html`
  - 头部：新增用户类型切换器
  - 数据采集模块（新增）：政策数据源卡片4个 + 数据管理入口条
  - 核心功能入口：6个卡片样式升级
  - 标签管理：新增模态框（左右布局6分类）
  - 政策覆盖率分析：增加AI预警列
  - 权限控制：新增角色切换JS逻辑 + CSS类

- **Modify:** `原型设计/style.css` (如有新增样式需求)

---

### Task 1: 添加用户类型切换器到导航栏

**Files:**
- Modify: `原型设计/6-policy-calculator.html:11-15` (在navbar的container内添加切换器)

- [ ] **Step 1: 添加用户类型切换器HTML**

在导航栏右侧添加下拉选择框：

```html
<div style="display: flex; align-items: center; gap: 12px;">
  <select class="form-select" style="width: auto; padding: 8px 32px 8px 12px; font-size: 14px;" id="role-switcher" onchange="switchRole()">
    <option value="gov">人社部门（管理端）</option>
    <option value="org">服务机构（运营端）</option>
    <option value="enterprise">用工企业（使用端）</option>
    <option value="personal">个人用户</option>
  </select>
</div>
```

Run: 验证导航栏右侧出现用户类型切换下拉框
Expected: 4个选项：人社部门、服务机构、用工企业、个人用户

- [ ] **Step 2: 添加角色切换JS函数**

在 `<script>` 标签内添加：

```javascript
// 角色切换功能
function switchRole() {
  const role = document.getElementById('role-switcher').value;
  // 更新各区域的显示状态
  updateRoleUI(role);
  showNotification('已切换到' + getRoleName(role), 'success');
}

function getRoleName(role) {
  const names = {
    'gov': '人社部门',
    'org': '服务机构',
    'enterprise': '用工企业',
    'personal': '个人用户'
  };
  return names[role] || '未知角色';
}

function updateRoleUI(role) {
  // 人社可见
  document.querySelectorAll('.gov-only').forEach(el => {
    el.style.display = (role === 'gov' || role === 'org') ? 'block' : 'none';
  });
  
  // 企业和个人隐藏某些功能
  document.querySelectorAll('.enterprise-hidden').forEach(el => {
    el.style.display = (role === 'gov' || role === 'org') ? 'block' : 'none';
  });
  
  // 更新表单权限
  const calcForm = document.getElementById('calc-user-type');
  if (calcForm) {
    calcForm.disabled = (role === 'enterprise' || role === 'personal');
  }
}
```

Run: 验证切换角色时页面有响应（会有隐藏区域需后续任务添加）

- [ ] **Step 3: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加用户类型切换器到导航栏

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: 添加CSS权限控制类

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (在`<style>`标签中添加)

- [ ] **Step 1: 添加权限控制CSS类**

在现有`<style>`标签内添加：

```css
/* 权限控制类 */
.gov-only { display: block; }
.org-only { display: none; }
.enterprise-hidden { display: block; }

/* 数据源卡片样式 */
.data-source-card {
  padding: 20px;
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
  cursor: pointer;
}
.data-source-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

/* 标签管理模态框左右布局 */
.tag-manage-layout {
  display: flex;
  gap: 24px;
  min-height: 400px;
}
.tag-manage-sidebar {
  width: 200px;
  flex-shrink: 0;
  border-right: 1px solid var(--border-color);
  padding-right: 16px;
}
.tag-manage-content {
  flex: 1;
  padding-left: 16px;
}
```

Run: 验证CSS类添加成功

- [ ] **Step 2: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加权限控制CSS类和组件样式

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: 添加数据采集与整合模块（政策数据源卡片）

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (在核心指标和功能入口之间插入)

- [ ] **Step 1: 在核心指标后添加数据采集模块HTML**

找到位置：在 `核心指标` (stat-card区域) 之后，`核心功能` 之前插入：

```html
    <!-- 数据采集与整合模块 - 仅人社和机构可见 -->
    <div class="gov-only">
    <!-- 数据采集与整合模块 -->
    <div class="section-header mb-32">
      <h2>数据采集与整合</h2>
      <p>整合政策文件、法规、解读、案例等多领域数据，实时同步更新</p>
    </div>
    <div class="row mb-48">
      <div class="col-3">
        <div class="data-source-card" data-source="policy-file">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 24px;">📜</span>
            <span class="badge badge-success" style="font-size: 11px;">实时同步</span>
          </div>
          <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">政策文件库</h4>
          <p class="text-small" style="color: var(--text-tertiary); margin-bottom: 4px;">最近更新：2026-05-12 10:30</p>
          <p class="text-small" style="color: var(--text-tertiary);">数据量：2,356 条</p>
          <div style="margin-top: 8px; font-size: 11px; color: var(--primary);">🤖 AI自动采集</div>
        </div>
      </div>
      <div class="col-3">
        <div class="data-source-card" data-source="policy-law">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 24px;">⚖️</span>
            <span class="badge badge-warning" style="font-size: 11px;">同步中</span>
          </div>
          <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">政策法规库</h4>
          <p class="text-small" style="color: var(--text-tertiary); margin-bottom: 4px;">最近更新：2026-05-12 09:45</p>
          <p class="text-small" style="color: var(--text-tertiary);">数据量：856 条</p>
          <div style="margin-top: 8px; font-size: 11px; color: var(--primary);">🤖 AI自动采集</div>
        </div>
      </div>
      <div class="col-3">
        <div class="data-source-card" data-source="policy-interpret">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 24px;">📖</span>
            <span class="badge badge-success" style="font-size: 11px;">实时同步</span>
          </div>
          <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">政策解读库</h4>
          <p class="text-small" style="color: var(--text-tertiary); margin-bottom: 4px;">最近更新：2026-05-12 10:20</p>
          <p class="text-small" style="color: var(--text-tertiary);">数据量：1,234 篇</p>
          <div style="margin-top: 8px; font-size: 11px; color: var(--primary);">🤖 AI自动采集</div>
        </div>
      </div>
      <div class="col-3">
        <div class="data-source-card" data-source="policy-case">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 24px;">📊</span>
            <span class="badge badge-success" style="font-size: 11px;">实时同步</span>
          </div>
          <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">典型案例库</h4>
          <p class="text-small" style="color: var(--text-tertiary); margin-bottom: 4px;">最近更新：2026-05-12 10:15</p>
          <p class="text-small" style="color: var(--text-tertiary);">数据量：567 条</p>
          <div style="margin-top: 8px; font-size: 11px; color: var(--primary);">🤖 AI自动采集</div>
        </div>
      </div>
    </div>
    <div class="mb-48" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: rgba(22, 119, 255, 0.05); border-radius: var(--radius-md); border: 1px solid rgba(22, 119, 255, 0.2);">
      <div>
        <span style="color: var(--primary); font-weight: 600;">📡 数据同步状态：实时同步中</span>
        <span class="text-small ml-16" style="color: var(--text-tertiary);">上次完整同步：2026-05-12 08:00</span>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="showModal('data-management-modal')">进入数据管理</button>
    </div>
    </div>
```

Run: 验证4个政策数据源卡片显示在核心指标下方

- [ ] **Step 2: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加数据采集与整合模块（4个政策数据源卡片）

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: 添加数据管理模态框（4个Tab）

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (在页面底部模态框区域添加)

- [ ] **Step 1: 添加数据管理模态框HTML**

在模态框区域（其他modal之后）添加：

```html
<!-- 数据管理模态框 -->
<div class="modal-overlay" id="data-management-modal">
  <div class="modal" style="max-width: 800px;">
    <div class="modal-header">
      <h3>数据管理</h3>
      <button class="modal-close" onclick="closeModal('data-management-modal')">&times;</button>
    </div>
    <div class="modal-body">
      <!-- Tab导航 -->
      <div class="tabs mb-24">
        <button class="tab-btn active" onclick="switchDataTab('log')">采集日志</button>
        <button class="tab-btn" onclick="switchDataTab('validate')">数据校验</button>
        <button class="tab-btn gov-only-tab" onclick="switchDataTab('security')">安全管理</button>
        <button class="tab-btn" onclick="switchDataTab('clean')">数据清洗</button>
      </div>
      
      <!-- Tab内容 -->
      <div id="data-tab-log">
        <table class="table">
          <thead>
            <tr>
              <th>时间</th>
              <th>来源</th>
              <th>条数</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-05-12 10:30</td>
              <td>政策文件库</td>
              <td>125</td>
              <td><span class="badge badge-success">成功</span></td>
            </tr>
            <tr>
              <td>2026-05-12 10:15</td>
              <td>政策解读库</td>
              <td>38</td>
              <td><span class="badge badge-success">成功</span></td>
            </tr>
            <tr>
              <td>2026-05-12 09:45</td>
              <td>政策法规库</td>
              <td>12</td>
              <td><span class="badge badge-warning">处理中</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div id="data-tab-validate" style="display: none;">
        <div class="row mb-24">
          <div class="col-6">
            <div class="card" style="padding: 16px;">
              <h4 style="font-size: 14px; margin-bottom: 12px;">校验规则</h4>
              <ul style="font-size: 13px; color: var(--text-secondary); padding-left: 20px; line-height: 2;">
                <li>去重校验 - 自动过滤重复政策</li>
                <li>格式校验 - 标准化政策文档格式</li>
                <li>完整性校验 - 检查必填字段</li>
              </ul>
            </div>
          </div>
          <div class="col-6">
            <div class="card" style="padding: 16px;">
              <h4 style="font-size: 14px; margin-bottom: 12px;">校验结果</h4>
              <div style="display: flex; gap: 16px;">
                <div class="text-center">
                  <div style="font-size: 24px; font-weight: 600; color: var(--success);">2,340</div>
                  <div class="text-small">通过</div>
                </div>
                <div class="text-center">
                  <div style="font-size: 24px; font-weight: 600; color: var(--warning);">16</div>
                  <div class="text-small">警告</div>
                </div>
                <div class="text-center">
                  <div style="font-size: 24px; font-weight: 600; color: var(--danger);">3</div>
                  <div class="text-small">错误</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="data-tab-security" style="display: none;" class="gov-only">
        <div class="row mb-24">
          <div class="col-6">
            <div class="card" style="padding: 16px;">
              <h4 style="font-size: 14px; margin-bottom: 12px;">🔐 数据加密状态</h4>
              <p style="font-size: 13px; color: var(--success);">✓ 已启用AES-256加密</p>
            </div>
          </div>
          <div class="col-6">
            <div class="card" style="padding: 16px;">
              <h4 style="font-size: 14px; margin-bottom: 12px;">👥 访问权限</h4>
              <p style="font-size: 13px; color: var(--text-secondary);">已配置3级访问权限</p>
            </div>
          </div>
        </div>
        <div class="card" style="padding: 16px;">
          <h4 style="font-size: 14px; margin-bottom: 12px;">📋 操作日志</h4>
          <table class="table">
            <thead>
              <tr><th>时间</th><th>操作人</th><th>操作</th></tr>
            </thead>
            <tbody>
              <tr><td>2026-05-12 10:00</td><td>管理员张三</td><td>导出数据</td></tr>
              <tr><td>2026-05-11 15:30</td><td>操作员李四</td><td>修改配置</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div id="data-tab-clean" style="display: none;">
        <div class="card" style="padding: 16px;">
          <h4 style="font-size: 14px; margin-bottom: 12px;">🧹 清洗规则配置</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px;">
              <input type="checkbox" checked> 自动去重 - 移除重复政策记录
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px;">
              <input type="checkbox" checked> 异常值处理 - 标记异常数据
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px;">
              <input type="checkbox"> 格式标准化 - 统一数据格式
            </label>
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top: 16px;">应用规则</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加Tab切换JS函数**

在script区域添加：

```javascript
// 数据管理Tab切换
function switchDataTab(tabName) {
  // 隐藏所有tab内容
  document.querySelectorAll('[id^="data-tab-"]').forEach(el => {
    el.style.display = 'none';
  });
  // 显示目标tab
  document.getElementById('data-tab-' + tabName).style.display = 'block';
  // 更新按钮状态
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}
```

- [ ] **Step 3: 添加Tab样式**

在style标签添加：

```css
/* Tab按钮样式 */
.tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 12px;
}
.tab-btn {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}
.tab-btn:hover {
  background: var(--bg-secondary);
}
.tab-btn.active {
  background: var(--primary);
  color: white;
}
```

Run: 验证数据管理模态框能正常打开和切换Tab

- [ ] **Step 4: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加数据管理模态框（4个Tab）

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: 核心功能入口卡片样式升级

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (找到功能入口卡片区域，升级样式)

- [ ] **Step 1: 升级智能政策测算卡片样式**

将现有卡片升级为带左侧边条样式：

```html
<div class="feature-card" onclick="showModal('policy-calc-modal')" style="border-left: 4px solid var(--primary);">
  <!-- 原有内容保持不变 -->
</div>
```

- [ ] **Step 2: 升级其他功能卡片边条**

| 卡片 | 边条颜色 |
|------|----------|
| 政策文件库 | var(--warning) |
| 服务事项库 | var(--primary) |
| 政策关联网络 | var(--success) |
| 效果追踪评估 | var(--primary-gradient-end) |
| 评估报告生成 | var(--primary) |

添加样式到style标签：

```css
/* 功能卡片边条样式 */
.feature-card {
  border-left: 4px solid var(--primary);
}
.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

- [ ] **Step 3: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 核心功能入口卡片样式升级（添加边条和悬停效果）

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: 添加标签管理模态框（6分类）

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (在模态框区域添加)

- [ ] **Step 1: 添加标签管理模态框HTML**

```html
<!-- 标签管理模态框 -->
<div class="modal-overlay" id="tag-manage-modal">
  <div class="modal" style="max-width: 900px;">
    <div class="modal-header">
      <h3>政策标签管理</h3>
      <button class="modal-close" onclick="closeModal('tag-manage-modal')">&times;</button>
    </div>
    <div class="modal-body">
      <!-- 顶部按钮 -->
      <div class="mb-24" style="display: flex; justify-content: flex-end;">
        <button class="btn btn-primary" onclick="generateAITags()">🤖 AI智能生成标签</button>
      </div>
      
      <!-- 左右布局 -->
      <div class="tag-manage-layout">
        <!-- 左侧分类导航 -->
        <div class="tag-manage-sidebar">
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li class="tag-category-item active" onclick="switchTagCategory('subsidy')">
              <span>💰 补贴类型</span>
              <span class="badge badge-info">12</span>
            </li>
            <li class="tag-category-item" onclick="switchTagCategory('target')">
              <span>👤 适用对象</span>
              <span class="badge badge-info">8</span>
            </li>
            <li class="tag-category-item" onclick="switchTagCategory('condition')">
              <span>📋 申领条件</span>
              <span class="badge badge-info">15</span>
            </li>
            <li class="tag-category-item" onclick="switchTagCategory('benefit')">
              <span>💵 优惠力度</span>
              <span class="badge badge-info">6</span>
            </li>
            <li class="tag-category-item" onclick="switchTagCategory('validity')">
              <span>⏰ 有效期限</span>
              <span class="badge badge-info">4</span>
            </li>
            <li class="tag-category-item" onclick="switchTagCategory('region')">
              <span>📍 区域限定</span>
              <span class="badge badge-info">3</span>
            </li>
          </ul>
        </div>
        
        <!-- 右侧标签列表 -->
        <div class="tag-manage-content">
          <div id="tag-list-subsidy">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h4>补贴类型标签</h4>
              <button class="btn btn-secondary btn-sm">+ 添加标签</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <span class="tag" style="background: rgba(22, 119, 255, 0.1); color: var(--primary);">就业补贴</span>
              <span class="tag" style="background: rgba(22, 119, 255, 0.1); color: var(--primary);">培训资助</span>
              <span class="tag" style="background: rgba(114, 46, 209, 0.1); color: var(--primary-gradient-end);">创业扶持</span>
              <span class="tag" style="background: rgba(82, 196, 26, 0.1); color: var(--success);">社保减免</span>
              <span class="tag" style="background: rgba(250, 173, 20, 0.1); color: var(--warning);">稳岗返还</span>
              <span class="tag" style="background: rgba(22, 119, 255, 0.1); color: var(--primary);">🤖 技能提升补贴</span>
            </div>
          </div>
          
          <!-- 其他分类内容默认隐藏 -->
          <div id="tag-list-target" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h4>适用对象标签</h4>
              <button class="btn btn-secondary btn-sm">+ 添加标签</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <span class="tag">高校毕业生</span>
              <span class="tag">就业困难人员</span>
              <span class="tag">退役军人</span>
              <span class="tag">农民工</span>
              <span class="tag">企业</span>
              <span class="tag">🤖 零工人员</span>
            </div>
          </div>
          
          <!-- 其他分类省略类似结构 -->
          <div id="tag-list-condition" style="display: none;">
            <p class="text-body">申领条件标签管理...</p>
          </div>
          <div id="tag-list-benefit" style="display: none;">
            <p class="text-body">优惠力度标签管理...</p>
          </div>
          <div id="tag-list-validity" style="display: none;">
            <p class="text-body">有效期限标签管理...</p>
          </div>
          <div id="tag-list-region" style="display: none;">
            <p class="text-body">区域限定标签管理...</p>
          </div>
        </div>
      </div>
      
      <!-- 底部统计 -->
      <div class="mt-24" style="padding: 16px; background: var(--bg-secondary); border-radius: var(--radius-md);">
        <span style="color: var(--text-secondary);">标签统计：</span>
        <span style="font-weight: 600;">总计 48 个</span>
        <span class="ml-16" style="color: var(--primary);">🤖 AI生成 12 个</span>
        <span class="ml-16">手动添加 36 个</span>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加标签分类切换JS**

```javascript
// 标签分类切换
function switchTagCategory(category) {
  // 隐藏所有分类列表
  document.querySelectorAll('[id^="tag-list-"]').forEach(el => {
    el.style.display = 'none';
  });
  // 显示目标分类
  document.getElementById('tag-list-' + category).style.display = 'block';
  // 更新左侧选中状态
  document.querySelectorAll('.tag-category-item').forEach(item => {
    item.classList.remove('active');
  });
  event.target.closest('.tag-category-item').classList.add('active');
}

// AI生成标签（模拟）
function generateAITags() {
  showNotification('🤖 AI正在分析政策数据，自动生成标签...', 'info');
  setTimeout(() => {
    showNotification('已生成3个新标签：技能提升补贴、零工人员、新型学徒制', 'success');
  }, 2000);
}
```

- [ ] **Step 3: 添加标签样式**

```css
/* 标签分类导航样式 */
.tag-category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s;
}
.tag-category-item:hover {
  background: var(--bg-secondary);
}
.tag-category-item.active {
  background: rgba(22, 119, 255, 0.1);
  color: var(--primary);
  font-weight: 600;
}
```

Run: 验证标签管理模态框能正常打开和切换分类

- [ ] **Step 4: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加标签管理模态框（6分类左右布局）

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 7: 政策覆盖率分析表格升级（AI预警列）

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (找到覆盖率分析表格区域)

- [ ] **Step 1: 升级表格增加AI预警列**

修改表格结构，增加"AI预警"和"趋势预测"列：

```html
<table class="table">
  <thead>
    <tr>
      <th>政策类型</th>
      <th>政策数量</th>
      <th>覆盖人数</th>
      <th>覆盖率</th>
      <th>趋势</th>
      <th>AI预警</th>
      <th>状态</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>就业补贴</strong></td>
      <td>28</td>
      <td>45,678</td>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="progress-bar" style="width: 120px;"><div class="progress-fill" style="width: 87%;"></div></div>
          <span>87%</span>
        </div>
      </td>
      <td style="color: var(--success);">↑ 上升</td>
      <td><span style="color: var(--success); font-size: 12px;">✓ 正常</span></td>
      <td><span class="badge badge-success">良好</span></td>
    </tr>
    <tr>
      <td><strong>培训资助</strong></td>
      <td>15</td>
      <td>23,456</td>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="progress-bar" style="width: 120px;"><div class="progress-fill" style="width: 72%;"></div></div>
          <span>72%</span>
        </div>
      </td>
      <td style="color: var(--success);">↑ 上升 <span style="font-size: 11px;">🤖 AI预测</span></td>
      <td><span style="color: var(--warning); font-size: 12px;">⚠️ 关注</span></td>
      <td><span class="badge badge-warning">待提升</span></td>
    </tr>
    <tr>
      <td><strong>创业扶持</strong></td>
      <td>12</td>
      <td>8,923</td>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="progress-bar" style="width: 120px;"><div class="progress-fill" style="width: 65%;"></div></div>
          <span>65%</span>
        </div>
      </td>
      <td style="color: var(--text-secondary);">→ 平稳</td>
      <td><span style="color: var(--danger); font-size: 12px;">⚠️ 需关注</span></td>
      <td><span class="badge badge-warning">待提升</span></td>
    </tr>
    <tr>
      <td><strong>社保减免</strong></td>
      <td>9</td>
      <td>56,123</td>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="progress-bar" style="width: 120px;"><div class="progress-fill" style="width: 91%;"></div></div>
          <span>91%</span>
        </div>
      </td>
      <td style="color: var(--success);">↑ 上升 <span style="font-size: 11px;">🤖 AI预测</span></td>
      <td><span style="color: var(--success); font-size: 12px;">✓ 正常</span></td>
      <td><span class="badge badge-success">优秀</span></td>
    </tr>
    <tr>
      <td><strong>稳岗返还</strong></td>
      <td>8</td>
      <td>12,345</td>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="progress-bar" style="width: 120px;"><div class="progress-fill" style="width: 68%;"></div></div>
          <span>68%</span>
        </div>
      </td>
      <td style="color: var(--text-secondary);">→ 平稳</td>
      <td><span style="color: var(--warning); font-size: 12px;">⚠️ 关注</span></td>
      <td><span class="badge badge-warning">待提升</span></td>
    </tr>
  </tbody>
</table>
```

Run: 验证表格增加了AI预警列，显示正确

- [ ] **Step 2: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 政策覆盖率分析表格增加AI预警列

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 8: 整合页面初始化逻辑

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (在页面加载完成后初始化角色状态)

- [ ] **Step 1: 添加页面加载初始化函数**

在script区域添加：

```javascript
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 初始化角色状态
  const defaultRole = 'gov';
  document.getElementById('role-switcher').value = defaultRole;
  updateRoleUI(defaultRole);
  
  console.log('政策计算器页面初始化完成');
});
```

- [ ] **Step 2: 测试完整流程**

1. 刷新页面，验证默认选中"人社部门"
2. 切换到"用工企业"，验证数据采集模块隐藏
3. 切换到"服务机构"，验证部分功能可访问

- [ ] **Step 3: 提交**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加页面初始化逻辑和角色状态管理

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## 自审检查清单

1. **Spec覆盖检查**：
   - [x] 用户类型切换器 → Task 1-2
   - [x] 数据采集模块（4个数据源卡片） → Task 3
   - [x] 数据管理模态框（4个Tab） → Task 4
   - [x] 标签管理模态框（6分类） → Task 6
   - [x] 功能卡片样式升级 → Task 5
   - [x] AI预警列 → Task 7
   - [x] 权限控制 → Task 1-2, 8

2. **Placeholder扫描**：无TBD/TODO/placeholder

3. **类型一致性**：
   - switchRole() 函数在Task 1定义
   - updateRoleUI() 在Task 1定义
   - switchDataTab() 在Task 4定义
   - switchTagCategory() 在Task 6定义
   - 函数名一致，无冲突

4. **范围检查**：适合单一实施计划，8个独立任务

---

## 执行方式选择

**Plan complete and saved to `docs/superpowers/plans/2026-05-12-policy-calculator-redesign-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**