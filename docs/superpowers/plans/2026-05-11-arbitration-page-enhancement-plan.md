# 仲裁机构端页面功能完善计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完善仲裁机构端页面(14a-arbitration.html)的未实现功能，包括角色切换、案件管理、AI校验、云送达等功能

**Architecture:** 基于现有HTML/CSS/JS原型，在当前文件基础上进行功能增强，保持现有样式和交互模式

**Tech Stack:** HTML, CSS, JavaScript (无框架依赖)

---

## 差距分析总结

| 功能模块 | 当前状态 | 需完善 |
|---------|---------|--------|
| 角色切换/主入口 | 无 | 添加顶部导航栏角色切换下拉 |
| 案件管理 | 仅列表展示 | 增加受理审核弹窗、AI分流弹窗 |
| AI材料校验 | 静态展示 | 增加校验详情弹窗 |
| 云送达 | 仅提示 | 增加送达流程弹窗 |
| 新建案件 | 仅按钮 | 增加完整表单弹窗 |

---

### Task 1: 添加顶部导航栏和角色切换功能

**Files:**
- Modify: `原型设计/14a-arbitration.html`

- [ ] **Step 1: 添加顶部导航栏HTML结构**

在 `<body>` 开始处添加顶部导航栏，包含：
- 左侧：Logo + 平台名称 + 角色切换下拉菜单
- 右侧：消息通知、用户头像

```html
<header class="top-header">
  <div class="header-left">
    <div class="logo">⚖️</div>
    <div class="platform-name">劳动人事争议"无接触"调解仲裁服务平台</div>
    <div class="role-switch">
      <select id="role-select" onchange="switchRole(this.value)">
        <option value="arbitration" selected>仲裁机构端</option>
        <option value="laborer">劳动者端</option>
        <option value="employer">用人单位端</option>
        <option value="supervisor">人社监管端</option>
        <option value="legal-aid">法律援助端</option>
        <option value="home">返回主入口</option>
      </select>
    </div>
  </div>
  <div class="header-right">
    <button class="header-btn" onclick="showNotification('消息中心开发中', 'info')">🔔 <span class="badge">3</span></button>
    <div class="user-avatar">仲</div>
  </div>
</header>
```

- [ ] **Step 2: 添加顶部导航栏CSS样式**

```css
.top-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  z-index: 1000;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  font-size: 28px;
}

.platform-name {
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding-left: 16px;
  border-left: 1px solid rgba(255,255,255,0.2);
}

.role-switch select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.1);
  color: white;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  position: relative;
  color: rgba(255,255,255,0.8);
}

.header-btn .badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff4d4f;
  color: white;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-gradient-end) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
}
```

- [ ] **Step 3: 添加角色切换JavaScript函数**

```javascript
function switchRole(role) {
  const rolePages = {
    'laborer': '14c-laborer.html',
    'employer': '14b-employer.html',
    'arbitration': '14a-arbitration.html',
    'supervisor': '14e-supervisor.html',
    'legal-aid': '14d-legal-aid.html',
    'home': '14-mediation-arbitration.html'
  };
  
  if (rolePages[role]) {
    window.location.href = rolePages[role];
  }
}
```

- [ ] **Step 4: 调整主内容区padding-top**

修改 `.app-layout` 添加 `padding-top: 80px` 预留顶部导航空间

---

### Task 2: 完善案件管理 - 增加受理审核和AI分流功能

**Files:**
- Modify: `原型设计/14a-arbitration.html`

- [ ] **Step 1: 添加案件审核弹窗HTML**

在文件末尾 `</body>` 前添加：

```html
<!-- 案件审核弹窗 -->
<div class="case-review-modal" id="case-review-modal">
  <div class="review-modal-content">
    <div class="review-modal-header">
      <h3>📋 案件受理审核 - <span id="review-case-id">LA2024-0889</span></h3>
      <button class="modal-close" onclick="closeCaseReview()">×</button>
    </div>
    <div class="review-modal-body">
      <div class="review-section">
        <h4>案件基本信息</h4>
        <div class="review-info">
          <div class="info-row"><span class="label">申请人：</span><span class="value" id="review-applicant">-</span></div>
          <div class="info-row"><span class="label">被申请人：</span><span class="value" id="review-respondent">-</span></div>
          <div class="info-row"><span class="label">案由：</span><span class="value" id="review-case-type">-</span></div>
          <div class="info-row"><span class="label">请求金额：</span><span class="value" id="review-amount">-</span></div>
        </div>
      </div>
      <div class="review-section">
        <h4>🤖 AI材料校验结果</h4>
        <div class="ai-review-result">
          <div class="ai-score">92%</div>
          <div class="ai-items">
            <div class="ai-item pass">✓ 仲裁申请书 - 完整</div>
            <div class="ai-item pass">✓ 证据材料 - 齐全</div>
            <div class="ai-item warning">⚠ 身份证明 - 模糊</div>
          </div>
        </div>
      </div>
      <div class="review-section">
        <h4>📊 AI案件分流建议</h4>
        <div class="ai-flow-suggestion">
          <div class="suggestion-card selected">
            <div class="suggestion-icon">🤝</div>
            <div class="suggestion-title">调解优先</div>
            <div class="suggestion-reason">涉案金额较小，双方有调解意向，建议先行调解</div>
            <div class="confidence">AI置信度: 85%</div>
          </div>
          <div class="suggestion-card">
            <div class="suggestion-icon">⚖️</div>
            <div class="suggestion-title">仲裁审理</div>
            <div class="suggestion-reason">案情复杂，需仲裁审理</div>
            <div class="confidence">AI置信度: 60%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="review-modal-footer">
      <button class="btn btn-secondary" onclick="closeCaseReview()">退回补充</button>
      <button class="btn btn-warning" onclick="confirmCaseFlow('mediation')">同意调解建议</button>
      <button class="btn btn-primary" onclick="confirmCaseFlow('arbitration')">转为仲裁审理</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加案件审核弹窗CSS样式**

```css
.case-review-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  z-index: 10000;
  align-items: center;
  justify-content: center;
}

.case-review-modal.active {
  display: flex;
}

.review-modal-content {
  width: 700px;
  max-height: 90vh;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.review-modal-header {
  padding: 16px 24px;
  background: var(--primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-modal-header h3 {
  margin: 0;
  font-size: 16px;
}

.review-modal-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.review-section {
  margin-bottom: 24px;
}

.review-section h4 {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 12px 0;
}

.review-info {
  background: var(--bg-secondary);
  padding: 16px;
  border-radius: 8px;
}

.info-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  width: 100px;
  color: var(--text-secondary);
}

.info-row .value {
  flex: 1;
  font-weight: 500;
}

.ai-review-result {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, rgba(22, 119, 255, 0.05) 0%, rgba(114, 46, 209, 0.05) 100%);
  padding: 16px;
  border-radius: 8px;
}

.ai-score {
  font-size: 36px;
  font-weight: 700;
  color: var(--success);
}

.ai-items {
  flex: 1;
}

.ai-item {
  padding: 6px 0;
  font-size: 13px;
}

.ai-item.pass {
  color: var(--success);
}

.ai-item.warning {
  color: var(--warning);
}

.ai-flow-suggestion {
  display: flex;
  gap: 16px;
}

.suggestion-card {
  flex: 1;
  padding: 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.suggestion-card:hover {
  border-color: var(--primary);
}

.suggestion-card.selected {
  border-color: var(--primary);
  background: rgba(22, 119, 255, 0.05);
}

.suggestion-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.suggestion-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.suggestion-reason {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.confidence {
  font-size: 11px;
  color: var(--primary);
}

.review-modal-footer {
  padding: 16px 24px;
  background: var(--bg-secondary);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```

- [ ] **Step 3: 添加案件审核JavaScript函数**

```javascript
// 案件审核相关
function openCaseReview(caseId) {
  document.getElementById('review-case-id').textContent = caseId;
  
  // 模拟加载案件数据
  const caseData = {
    'LA2024-0889': { applicant: '赵某', respondent: '某物流公司', type: '劳动争议', amount: '¥28,000' },
    'LA2024-0892': { applicant: '张某', respondent: '某科技公司', type: '劳动争议', amount: '¥45,000' },
    'LA2024-0891': { applicant: '李某', respondent: '某制造公司', type: '工伤待遇', amount: '¥120,000' }
  };
  
  const data = caseData[caseId] || { applicant: '未知', respondent: '未知', type: '未知', amount: '¥0' };
  document.getElementById('review-applicant').textContent = data.applicant;
  document.getElementById('review-respondent').textContent = data.respondent;
  document.getElementById('review-case-type').textContent = data.type;
  document.getElementById('review-amount').textContent = data.amount;
  
  document.getElementById('case-review-modal').classList.add('active');
}

function closeCaseReview() {
  document.getElementById('case-review-modal').classList.remove('active');
}

function confirmCaseFlow(flowType) {
  const caseId = document.getElementById('review-case-id').textContent;
  if (flowType === 'mediation') {
    showNotification(`案件 ${caseId} 已同意调解建议，分配调解员中...`, 'success');
  } else {
    showNotification(`案件 ${caseId} 已转为仲裁审理`, 'success');
  }
  closeCaseReview();
}
```

- [ ] **Step 4: 修改案件列表中的"查看"按钮**

将现有案件的"查看"按钮改为调用 `openCaseReview()`:

```html
<button class="btn btn-secondary btn-sm" onclick="openCaseReview('LA2024-0892')">审核</button>
```

---

### Task 3: 完善AI材料校验功能

**Files:**
- Modify: `原型设计/14a-arbitration.html`

- [ ] **Step 1: 添加AI校验详情弹窗HTML**

```html
<!-- AI材料校验详情弹窗 -->
<div class="ai-check-modal" id="ai-check-modal">
  <div class="ai-check-modal-content">
    <div class="ai-check-modal-header">
      <h3>🤖 AI材料校验详情</h3>
      <button class="modal-close" onclick="closeAICheck()">×</button>
    </div>
    <div class="ai-check-modal-body">
      <div class="check-summary">
        <div class="summary-score">
          <div class="score-value">98%</div>
          <div class="score-label">综合得分</div>
        </div>
        <div class="summary-status">✓ 材料齐全，可受理</div>
      </div>
      
      <div class="check-items">
        <div class="check-item">
          <div class="check-icon pass">✓</div>
          <div class="check-info">
            <div class="check-name">仲裁申请书</div>
            <div class="check-detail">格式正确，要素完整，包含必要的仲裁请求和事实理由</div>
          </div>
          <div class="check-status pass">通过</div>
        </div>
        
        <div class="check-item">
          <div class="check-icon pass">✓</div>
          <div class="check-info">
            <div class="check-name">证据材料</div>
            <div class="check-detail">共5份，证据清单完整，复印件与原件核对一致</div>
          </div>
          <div class="check-status pass">通过</div>
        </div>
        
        <div class="check-item">
          <div class="check-icon pass">✓</div>
          <div class="check-info">
            <div class="check-name">身份证明</div>
            <div class="check-detail">身份证复印件清晰，与申请书签名一致</div>
          </div>
          <div class="check-status pass">通过</div>
        </div>
        
        <div class="check-item">
          <div class="check-icon warning">⚠</div>
          <div class="check-info">
            <div class="check-name">证据完整性</div>
            <div class="check-detail">缺少社保缴费记录原件，建议补充</div>
          </div>
          <div class="check-status warning">建议补充</div>
        </div>
      </div>
      
      <div class="ai-suggestion">
        <h4>💡 AI建议</h4>
        <p>该案件事实清楚，证据基本齐全，建议直接受理并安排调解。根据类似案件数据分析，调解成功概率为78%。</p>
      </div>
    </div>
    <div class="ai-check-modal-footer">
      <button class="btn btn-secondary" onclick="closeAICheck()">关闭</button>
      <button class="btn btn-primary" onclick="closeAICheck(); showNotification('已生成案件受理建议', 'success')">采纳建议</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加AI校验弹窗CSS样式**

```css
.ai-check-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  z-index: 10000;
  align-items: center;
  justify-content: center;
}

.ai-check-modal.active {
  display: flex;
}

.ai-check-modal-content {
  width: 600px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.ai-check-modal-header {
  padding: 16px 24px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-gradient-end) 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ai-check-modal-body {
  padding: 24px;
}

.check-summary {
  text-align: center;
  padding: 24px;
  background: linear-gradient(135deg, rgba(22, 119, 255, 0.05) 0%, rgba(114, 46, 209, 0.05) 100%);
  border-radius: 12px;
  margin-bottom: 24px;
}

.summary-score {
  margin-bottom: 12px;
}

.score-value {
  font-size: 48px;
  font-weight: 700;
  color: var(--success);
}

.score-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.summary-status {
  font-size: 16px;
  color: var(--success);
  font-weight: 500;
}

.check-items {
  margin-bottom: 24px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 12px;
}

.check-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.check-icon.pass {
  background: rgba(82, 196, 26, 0.1);
  color: var(--success);
}

.check-icon.warning {
  background: rgba(250, 173, 20, 0.1);
  color: var(--warning);
}

.check-info {
  flex: 1;
}

.check-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.check-detail {
  font-size: 12px;
  color: var(--text-secondary);
}

.check-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.check-status.pass {
  background: rgba(82, 196, 26, 0.1);
  color: var(--success);
}

.check-status.warning {
  background: rgba(250, 173, 20, 0.1);
  color: var(--warning);
}

.ai-suggestion {
  background: var(--bg-secondary);
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid var(--primary);
}

.ai-suggestion h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
}

.ai-suggestion p {
  margin: 0;
  font-size: 13px;
  color: var(--text-secondary);
}

.ai-check-modal-footer {
  padding: 16px 24px;
  background: var(--bg-secondary);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```

- [ ] **Step 3: 添加AI校验弹窗JavaScript函数**

```javascript
function openAICheck() {
  document.getElementById('ai-check-modal').classList.add('active');
}

function closeAICheck() {
  document.getElementById('ai-check-modal').classList.remove('active');
}
```

- [ ] **Step 4: 修改AI材料校验卡片按钮**

将"查看详情"按钮绑定到 `openAICheck()` 函数

---

### Task 4: 完善云送达功能

**Files:**
- Modify: `原型设计/14a-arbitration.html`

- [ ] **Step 1: 添加云送达弹窗HTML**

```html
<!-- 云送达弹窗 -->
<div class="cloud-delivery-modal" id="cloud-delivery-modal">
  <div class="delivery-modal-content">
    <div class="delivery-modal-header">
      <h3>📨 文书云送达 - <span id="delivery-doc-id">WS2024-0892</span></h3>
      <button class="modal-close" onclick="closeCloudDelivery()">×</button>
    </div>
    <div class="delivery-modal-body">
      <div class="delivery-info">
        <div class="info-card">
          <div class="info-label">案件编号</div>
          <div class="info-value" id="delivery-case-id">LA2024-0892</div>
        </div>
        <div class="info-card">
          <div class="info-label">文书类型</div>
          <div class="info-value">裁决书</div>
        </div>
        <div class="info-card">
          <div class="info-label">送达方</div>
          <div class="info-value" id="delivery-party">张某（申请人）</div>
        </div>
      </div>
      
      <div class="delivery-steps">
        <h4>送达流程</h4>
        <div class="step-list">
          <div class="step-item completed">
            <div class="step-icon">✓</div>
            <div class="step-content">
              <div class="step-title">文书生成</div>
              <div class="step-time">2024-03-05 10:30</div>
            </div>
          </div>
          <div class="step-item active">
            <div class="step-icon">📤</div>
            <div class="step-content">
              <div class="step-title">发送送达通知</div>
              <div class="step-time">等待确认...</div>
            </div>
          </div>
          <div class="step-item">
            <div class="step-icon">📬</div>
            <div class="step-content">
              <div class="step-title">当事人签收</div>
              <div class="step-time">-</div>
            </div>
          </div>
          <div class="step-item">
            <div class="step-icon">✅</div>
            <div class="step-content">
              <div class="step-title">送达完成</div>
              <div class="step-time">-</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="delivery-notice">
        <div class="notice-icon">💡</div>
        <div class="notice-content">
          <div class="notice-title">送达说明</div>
          <div class="notice-text">系统将发送短信和站内通知提醒当事人查看文书。当事人需在7日内登录系统确认签收，逾期视为送达。</div>
        </div>
      </div>
    </div>
    <div class="delivery-modal-footer">
      <button class="btn btn-secondary" onclick="closeCloudDelivery()">取消</button>
      <button class="btn btn-primary" onclick="startDelivery()">发送送达通知</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加云送达弹窗CSS样式**

```css
.cloud-delivery-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  z-index: 10000;
  align-items: center;
  justify-content: center;
}

.cloud-delivery-modal.active {
  display: flex;
}

.delivery-modal-content {
  width: 550px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.delivery-modal-header {
  padding: 16px 24px;
  background: var(--primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delivery-modal-body {
  padding: 24px;
}

.delivery-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.info-card {
  background: var(--bg-secondary);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}

.info-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.info-value {
  font-weight: 600;
}

.delivery-steps h4 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 8px;
  background: var(--bg-secondary);
}

.step-item.completed {
  background: rgba(82, 196, 26, 0.1);
}

.step-item.active {
  background: rgba(22, 119, 255, 0.1);
  border: 1px solid var(--primary);
}

.step-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: white;
  flex-shrink: 0;
}

.step-item.completed .step-icon {
  background: var(--success);
  color: white;
}

.step-item.active .step-icon {
  background: var(--primary);
  color: white;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 500;
}

.step-time {
  font-size: 12px;
  color: var(--text-secondary);
}

.delivery-notice {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(22, 119, 255, 0.05);
  border-radius: 8px;
  margin-top: 24px;
}

.notice-icon {
  font-size: 20px;
}

.notice-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.notice-text {
  font-size: 12px;
  color: var(--text-secondary);
}

.delivery-modal-footer {
  padding: 16px 24px;
  background: var(--bg-secondary);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```

- [ ] **Step 3: 添加云送达JavaScript函数**

```javascript
function openCloudDelivery(docId, caseId, party) {
  document.getElementById('delivery-doc-id').textContent = docId;
  document.getElementById('delivery-case-id').textContent = caseId;
  document.getElementById('delivery-party').textContent = party;
  document.getElementById('cloud-delivery-modal').classList.add('active');
}

function closeCloudDelivery() {
  document.getElementById('cloud-delivery-modal').classList.remove('active');
}

function startDelivery() {
  showNotification('正在发送送达通知...', 'info');
  
  setTimeout(() => {
    showNotification('送达通知已发送，当事人将收到短信提醒', 'success');
    closeCloudDelivery();
  }, 1500);
}
```

- [ ] **Step 4: 修改文书管理中的云送达按钮**

将云送达按钮改为调用 `openCloudDelivery()` 函数

---

### Task 5: 完善新建案件功能

**Files:**
- Modify: `原型设计/14a-arbitration.html`

- [ ] **Step 1: 添加新建案件表单弹窗HTML**

```html
<!-- 新建案件弹窗 -->
<div class="new-case-modal" id="new-case-modal">
  <div class="new-case-content">
    <div class="new-case-header">
      <h3>➕ 新建仲裁案件</h3>
      <button class="modal-close" onclick="closeNewCase()">×</button>
    </div>
    <div class="new-case-body">
      <form id="new-case-form">
        <div class="form-section">
          <h4>申请人信息</h4>
          <div class="form-row">
            <div class="form-group">
              <label>姓名/名称 <span class="required">*</span></label>
              <input type="text" class="form-input" id="applicant-name" required>
            </div>
            <div class="form-group">
              <label>身份类型 <span class="required">*</span></label>
              <select class="form-select" id="applicant-type">
                <option value="">请选择</option>
                <option value="individual">劳动者</option>
                <option value="company">用人单位</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>联系电话</label>
              <input type="tel" class="form-input" id="applicant-phone">
            </div>
            <div class="form-group">
              <label>身份证号</label>
              <input type="text" class="form-input" id="applicant-idcard">
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h4>被申请人信息</h4>
          <div class="form-row">
            <div class="form-group">
              <label>单位名称 <span class="required">*</span></label>
              <input type="text" class="form-input" id="respondent-name" required>
            </div>
            <div class="form-group">
              <label>统一社会信用代码</label>
              <input type="text" class="form-input" id="respondent-code">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>地址</label>
              <input type="text" class="form-input" id="respondent-address">
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h4>案件信息</h4>
          <div class="form-row">
            <div class="form-group">
              <label>案由 <span class="required">*</span></label>
              <select class="form-select" id="case-type" required>
                <option value="">请选择案由</option>
                <option value="labor-dispute">劳动争议</option>
                <option value="work-injury">工伤待遇</option>
                <option value="salary-owe">工资拖欠</option>
                <option value="social-insurance">社会保险</option>
                <option name="economic-compensation">经济补偿</option>
              </select>
            </div>
            <div class="form-group">
              <label>请求金额 <span class="required">*</span></label>
              <input type="number" class="form-input" id="case-amount" placeholder="¥" required>
            </div>
          </div>
          <div class="form-group">
            <label>事实与理由 <span class="required">*</span></label>
            <textarea class="form-textarea" id="case-reason" rows="4" required></textarea>
          </div>
        </div>
        
        <div class="form-section">
          <h4>📎 证据材料</h4>
          <div class="evidence-upload">
            <div class="upload-zone" onclick="document.getElementById('new-evidence-input').click()">
              <div class="upload-icon">📁</div>
              <div class="upload-text">点击或拖拽上传证据材料</div>
              <div class="upload-hint">支持 PDF、Word、图片格式</div>
              <input type="file" id="new-evidence-input" style="display:none" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">
            </div>
            <div class="evidence-list" id="new-evidence-list"></div>
          </div>
        </div>
      </form>
    </div>
    <div class="new-case-footer">
      <button class="btn btn-secondary" onclick="closeNewCase()">取消</button>
      <button class="btn btn-primary" onclick="submitNewCase()">提交申请</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加新建案件弹窗CSS样式**

```css
.new-case-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  z-index: 10000;
  align-items: center;
  justify-content: center;
}

.new-case-modal.active {
  display: flex;
}

.new-case-content {
  width: 800px;
  max-height: 90vh;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.new-case-header {
  padding: 16px 24px;
  background: var(--primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-case-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.form-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

.form-section:last-child {
  border-bottom: none;
}

.form-section h4 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--primary);
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.form-group .required {
  color: var(--danger);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.evidence-upload {
  margin-top: 12px;
}

.upload-zone {
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-zone:hover {
  border-color: var(--primary);
  background: rgba(22, 119, 255, 0.05);
}

.upload-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 14px;
  color: var(--text-primary);
}

.upload-hint {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.evidence-list {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.evidence-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 13px;
}

.evidence-tag .remove {
  cursor: pointer;
  color: var(--danger);
}

.new-case-footer {
  padding: 16px 24px;
  background: var(--bg-secondary);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```

- [ ] **Step 3: 添加新建案件JavaScript函数**

```javascript
function openNewCase() {
  document.getElementById('new-case-modal').classList.add('active');
}

function closeNewCase() {
  document.getElementById('new-case-modal').classList.remove('active');
}

function submitNewCase() {
  const form = document.getElementById('new-case-form');
  if (!form.checkValidity()) {
    showNotification('请填写必填字段', 'warning');
    form.reportValidity();
    return;
  }
  
  showNotification('正在AI校验材料...', 'info');
  
  setTimeout(() => {
    showNotification('案件提交成功！AI校验得分92%，建议受理', 'success');
    closeNewCase();
  }, 2000);
}

// 证据上传处理
document.getElementById('new-evidence-input').addEventListener('change', function(e) {
  const files = e.target.files;
  const list = document.getElementById('new-evidence-list');
  
  Array.from(files).forEach(file => {
    const tag = document.createElement('div');
    tag.className = 'evidence-tag';
    tag.innerHTML = `<span>📄 ${file.name}</span><span class="remove" onclick="this.parentElement.remove()">×</span>`;
    list.appendChild(tag);
  });
  
  showNotification(`已选择 ${files.length} 个文件`, 'success');
});
```

- [ ] **Step 4: 修改"新建案件"按钮**

将"新建案件"按钮绑定到 `openNewCase()` 函数

---

## 执行选项

**Plan complete and saved to `docs/superpowers/plans/2026-05-11-arbitration-page-enhancement-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - 我为每个Task分配一个子代理执行，任务间进行审查，快速迭代

**2. Inline Execution** - 在当前会话中使用 executing-plans 执行，批量执行并设置审查检查点

**请选择您偏好的执行方式？**