# 调解仲裁服务平台完整重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按照PRD要求完整实现五类用户角色独立界面、七大功能模块、完整云庭审五分区、AI智能可视化功能

**Architecture:** 多页面独立角色门户架构。每个角色独立HTML页面，通过顶部角色切换下拉菜单关联。复用统一style.css样式系统。

**Tech Stack:** 纯HTML/CSS/JS，无框架依赖，复用现有style.css

---

## 文件清单

| 文件 | 说明 | 状态 |
|------|------|------|
| `原型设计/14-mediation-arbitration.html` | 五角色统一入口+平台概览 | 需重构 |
| `原型设计/role-laborer.html` | 劳动者端完整功能 | 新建 |
| `原型设计/role-employer.html` | 用人单位端完整功能 | 新建 |
| `原型设计/role-arbitration.html` | 仲裁机构端（含云庭审）| 新建 |
| `原型设计/role-supervisor.html` | 人社监管端（含AI预警）| 新建 |
| `原型设计/role-legal-aid.html` | 法律援助端完整功能 | 新建 |

---

## Task 1: 重构14-mediation-arbitration.html为五角色统一入口

**Files:**
- Modify: `原型设计/14-mediation-arbitration.html`
- Depend: `原型设计/style.css`

**目标：** 将现有页面重构为五角色统一入口，包含角色切换下拉菜单、平台概览仪表盘、快捷入口卡片区

- [ ] **Step 1: 读取现有style.css确认样式规范**

```bash
读取: 原型设计/style.css
确认: --primary, --success, --warning, --danger 颜色变量值
确认: 圆角、阴影、间距系统
```

- [ ] **Step 2: 重构顶部导航栏，添加角色切换下拉**

```html
<!-- 在现有nav.navbar内添加角色切换 -->
<div class="role-switch">
  <select id="role-select" onchange="switchRole(this.value)">
    <option value="">选择角色</option>
    <option value="14-mediation-arbitration.html">平台首页</option>
    <option value="role-laborer.html">劳动者端</option>
    <option value="role-employer.html">用人单位端</option>
    <option value="role-arbitration.html">仲裁机构端</option>
    <option value="role-supervisor.html">人社监管端</option>
    <option value="role-legal-aid.html">法律援助端</option>
  </select>
</div>
```

- [ ] **Step 3: 更新平台概览仪表盘**

添加五大角色共用的核心统计：
- 本月调解案件数、调解成功率
- 云庭审次数、平均响应时间
- 预警项目数、待处理案件数

- [ ] **Step 4: 添加角色快捷入口卡片区**

按角色类型高亮对应功能：
- 劳动者：案件申请、我的案件、文书查看
- 用人单位：合同管理、应诉处理
- 仲裁机构：案件管理、云庭审
- 人社监管：项目监管、欠薪预警
- 法律援助：援助申请

- [ ] **Step 5: 添加角色切换JS函数**

```javascript
const ROLE_PAGES = {
  '劳动者': 'role-laborer.html',
  '用人单位': 'role-employer.html',
  '仲裁机构': 'role-arbitration.html',
  '人社监管': 'role-supervisor.html',
  '法律援助': 'role-legal-aid.html'
};

function switchRole(role) {
  if (role && ROLE_PAGES[role]) {
    window.location.href = ROLE_PAGES[role];
  }
}
```

- [ ] **Step 6: 测试页面加载和角色切换**

在浏览器中打开14-mediation-arbitration.html
测试角色下拉切换功能

---

## Task 2: 创建劳动者端页面 (role-laborer.html)

**Files:**
- Create: `原型设计/role-laborer.html`
- Depend: `原型设计/style.css`

**目标：** 实现劳动者端完整功能，包含仪表盘、电子劳动合同、案件申请、我的案件、文书查看、法律援助

- [ ] **Step 1: 创建HTML基础结构**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>劳动者端 - 调解仲裁服务</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <div class="container">
      <a href="14-mediation-arbitration.html" class="navbar-logo">人社服务数字平台</a>
      <div class="role-switch">
        <select onchange="if(this.value) window.location.href=this.value">
          <option value="">切换角色</option>
          <option value="role-laborer.html" selected>劳动者</option>
          <option value="role-employer.html">用人单位</option>
          <option value="role-arbitration.html">仲裁机构</option>
          <option value="role-supervisor.html">人社监管</option>
          <option value="role-legal-aid.html">法律援助</option>
        </select>
      </div>
      <ul class="navbar-nav">
        <li><a href="#" class="active">我的工作台</a></li>
      </ul>
    </div>
  </nav>
  
  <div class="page-content">
    <div class="container">
      <!-- 左侧菜单 + 右侧工作区 -->
      <div class="layout">
        <aside class="sidebar">
          <!-- 左侧菜单 -->
        </aside>
        <main class="main-content">
          <!-- 右侧工作区 -->
        </main>
      </div>
    </div>
  </div>
</body>
</html>
```

- [ ] **Step 2: 实现左侧菜单**

```html
<aside class="sidebar">
  <ul class="menu">
    <li class="menu-item active">
      <a href="#">我的工作台</a>
    </li>
    <li class="menu-item">
      <a href="#">电子劳动合同</a>
    </li>
    <li class="menu-item">
      <a href="#">案件申请</a>
    </li>
    <li class="menu-item">
      <a href="#">我的案件</a>
    </li>
    <li class="menu-item">
      <a href="#">文书查看</a>
    </li>
    <li class="menu-item">
      <a href="#">法律援助</a>
    </li>
  </ul>
</aside>
```

- [ ] **Step 3: 实现仪表盘（我的工作台）**

```html
<!-- 仪表盘内容 -->
<div class="dashboard">
  <h2>我的工作台</h2>
  <div class="row mb-32">
    <div class="col-3">
      <div class="stat-card">
        <div class="number">5</div>
        <div class="label">我的案件</div>
      </div>
    </div>
    <div class="col-3">
      <div class="stat-card">
        <div class="number">2</div>
        <div class="label">待处理</div>
      </div>
    </div>
    <div class="col-3">
      <div class="stat-card">
        <div class="number">1</div>
        <div class="label">云庭审待参加</div>
      </div>
    </div>
    <div class="col-3">
      <div class="stat-card">
        <div class="number">3</div>
        <div class="label">待签收文书</div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 4: 实现电子劳动合同模块**

- 我的合同列表
- 合同签署入口（选择模板、填写信息、电子签章）
- 合同状态查看

- [ ] **Step 5: 实现案件申请模块（含AI材料校验）**

```html
<!-- 案件申请表单 -->
<div class="form-section">
  <h3>在线仲裁申请</h3>
  <div class="form-group">
    <label class="form-label">案件类型</label>
    <select class="form-select" id="case-type">
      <option value="">请选择案件类型</option>
      <option value="工资拖欠">工资拖欠纠纷</option>
      <option value="劳动合同">劳动合同争议</option>
      <option value="工伤赔偿">工伤赔偿纠纷</option>
    </select>
  </div>
  <!-- AI材料校验状态 -->
  <div class="ai-verify-status" id="material-verify">
    <span class="verify-icon">✓</span>
    <span class="verify-text">材料校验中...</span>
  </div>
</div>
```

- [ ] **Step 6: 实现我的案件模块**

- 案件列表（调解/仲裁状态）
- 案件进度时间线
- 云庭审参与入口

- [ ] **Step 7: 实现文书查看模块**

- 已送达文书列表
- 下载、打印功能
- 签收确认

- [ ] **Step 8: 实现法律援助入口**

- 援助申请按钮
- 援助条件说明

- [ ] **Step 9: 测试页面加载和菜单切换**

---

## Task 3: 创建用人单位端页面 (role-employer.html)

**Files:**
- Create: `原型设计/role-employer.html`
- Depend: `原型设计/style.css`

**目标：** 实现用人单位端完整功能，包含合同管理、应诉案件、考勤上报、工资确认、欠薪投诉处理

- [ ] **Step 1: 创建HTML基础结构（参考role-laborer）**

使用与role-laborer相同的布局结构，顶部导航+左侧菜单+右侧工作区

- [ ] **Step 2: 实现左侧菜单**

```html
<aside class="sidebar">
  <ul class="menu">
    <li class="menu-item active"><a href="#">我的工作台</a></li>
    <li class="menu-item"><a href="#">合同管理</a></li>
    <li class="menu-item"><a href="#">应诉案件</a></li>
    <li class="menu-item"><a href="#">考勤上报</a></li>
    <li class="menu-item"><a href="#">工资确认</a></li>
    <li class="menu-item"><a href="#">欠薪投诉处理</a></li>
  </ul>
</aside>
```

- [ ] **Step 3: 实现合同管理模块**

- 发起签署（选择模板、填写信息、发送签署）
- 合同列表（待签署/已签署/已备案）
- 合同备案查询

- [ ] **Step 4: 实现应诉案件模块**

- 收到的仲裁通知列表
- 答辩材料提交表单
- 证据上传

- [ ] **Step 5: 实现考勤上报模块**

- 工程项目选择
- 考勤数据上传（支持Excel/CSV）
- 考勤记录查看

- [ ] **Step 6: 实现工资确认模块**

- 工资发放记录提交
- 农民工确认查询
- 工资发放汇总

- [ ] **Step 7: 实现欠薪投诉处理模块**

- 欠薪投诉列表
- 投诉响应处理
- 处理结果反馈

- [ ] **Step 8: 测试页面加载和功能**

---

## Task 4: 创建仲裁机构端页面 (role-arbitration.html) - 核心

**Files:**
- Create: `原型设计/role-arbitration.html`
- Depend: `原型设计/style.css`

**目标：** 实现仲裁机构端完整功能，包含案件管理、调解管理、云庭审五分区、文书管理、上下联动

- [ ] **Step 1: 创建HTML基础结构**

- [ ] **Step 2: 实现左侧菜单**

```html
<aside class="sidebar">
  <ul class="menu">
    <li class="menu-item active"><a href="#">我的工作台</a></li>
    <li class="menu-item"><a href="#">案件管理</a></li>
    <li class="menu-item"><a href="#">调解管理</a></li>
    <li class="menu-item"><a href="#">云庭审</a></li>
    <li class="menu-item"><a href="#">文书管理</a></li>
    <li class="menu-item"><a href="#">上下联动</a></li>
  </ul>
</aside>
```

- [ ] **Step 3: 实现案件管理模块（含AI功能）**

- 案件列表（含AI材料校验状态标识）
- 案件审核（通过/驳回）
- AI案件分流推荐（调解优先/仲裁处理）
- 案件详情查看

```html
<!-- AI材料校验状态展示 -->
<div class="ai-verify-result">
  <div class="verify-item success">
    <span class="icon">✓</span>
    <span>劳动合同 - 格式合规</span>
  </div>
  <div class="verify-item warning">
    <span class="icon">⚠</span>
    <span>考勤记录 - 建议补充</span>
  </div>
</div>

<!-- AI案件分流建议 -->
<div class="ai-division-suggest">
  <h4>📊 AI案件分流建议</h4>
  <p>建议分流至：<strong>仲裁程序</strong>（争议金额较大）</p>
  <p>备选方案：<strong>调解程序</strong>（若双方愿意协商）</p>
</div>
```

- [ ] **Step 4: 实现调解管理模块**

- 调解员列表（含工作量统计）
- 调解员分配（智能/手动）
- 调解进度跟踪

- [ ] **Step 5: 实现云庭审五分区（核心功能）**

```html
<div class="cloud-trial-container">
  <!-- 庭审信息栏 -->
  <div class="trial-info-bar">
    <span>案件编号：<strong id="trial-case-id">ZC20260503005</strong></span>
    <span>案件类型：<span id="trial-case-type">工伤赔偿</span></span>
    <span>状态：<span class="badge badge-info" id="trial-status">庭审中</span></span>
    <span>开庭时间：<span id="trial-time">09:00</span></span>
    <span>倒计时：<span id="trial-countdown" class="countdown">01:23:45</span></span>
  </div>

  <!-- 三列主区域 -->
  <div class="trial-main">
    <!-- 视频会议区 -->
    <div class="trial-panel video-panel">
      <h4>📹 视频会议</h4>
      <div class="video-grid">
        <div class="video-item">
          <div class="video-placeholder">仲裁员</div>
          <div class="video-name">王仲裁员</div>
        </div>
        <div class="video-item">
          <div class="video-placeholder">申请人</div>
          <div class="video-name">张三</div>
        </div>
        <div class="video-item">
          <div class="video-placeholder">被申请人</div>
          <div class="video-name">XX公司</div>
        </div>
      </div>
      <div class="video-controls">
        <button class="btn btn-secondary" onclick="toggleMute()">🎤 静音</button>
        <button class="btn btn-secondary" onclick="toggleCamera()">📹 摄像头</button>
      </div>
    </div>

    <!-- 证据展示区 -->
    <div class="trial-panel evidence-panel">
      <h4>📁 证据展示</h4>
      <div class="evidence-list">
        <div class="evidence-item">
          <span class="evidence-icon">📄</span>
          <span class="evidence-name">劳动合同.pdf</span>
          <button class="btn btn-sm btn-secondary">展示</button>
        </div>
        <div class="evidence-item">
          <span class="evidence-icon">💳</span>
          <span class="evidence-name">工资流水.pdf</span>
          <button class="btn btn-sm btn-secondary">展示</button>
        </div>
        <div class="evidence-item">
          <span class="evidence-icon">📅</span>
          <span class="evidence-name">考勤记录.pdf</span>
          <button class="btn btn-sm btn-secondary">展示</button>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="uploadEvidence()">+ 上传证据</button>
    </div>

    <!-- 庭审笔录区 -->
    <div class="trial-panel transcript-panel">
      <h4>📝 庭审笔录</h4>
      <div class="transcript-content">
        <div class="transcript-line">
          <span class="transcript-time">09:00:05</span>
          <span class="transcript-speaker">仲裁员：</span>
          <span class="transcript-text">现在开庭，首先核实当事人身份...</span>
        </div>
        <div class="transcript-line">
          <span class="transcript-time">09:01:23</span>
          <span class="transcript-speaker">申请人：</span>
          <span class="transcript-text">我是张三，本案申请人...</span>
        </div>
      </div>
      <div class="transcript-actions">
        <button class="btn btn-primary btn-sm" onclick="confirmTranscript()">确认签字</button>
        <button class="btn btn-secondary btn-sm" onclick="exportTranscript()">导出</button>
      </div>
    </div>
  </div>

  <!-- 操作栏 -->
  <div class="trial-actions">
    <button class="btn btn-primary" onclick="uploadEvidence()">上传证据</button>
    <button class="btn btn-secondary" onclick="crossExamine()">举证质证</button>
    <button class="btn btn-secondary" onclick="makeStatement()">补充发言</button>
    <button class="btn btn-warning" onclick="adjourn()">休庭</button>
    <button class="btn btn-success" onclick="eSign()">电子签字</button>
  </div>
</div>
```

- [ ] **Step 6: 实现文书管理模块**

- 裁决书/调解书生成
- 云送达（站内信/短信/小程序）
- 文书送达记录查询

- [ ] **Step 7: 实现上下联动模块**

- 跨区域案件协同列表
- 数据同步状态
- 效能统计图表

- [ ] **Step 8: 测试云庭审五分区布局**

---

## Task 5: 创建人社监管端页面 (role-supervisor.html)

**Files:**
- Create: `原型设计/role-supervisor.html`
- Depend: `原型设计/style.css`

**目标：** 实现人社监管端完整功能，包含项目监管、欠薪预警（AI）、效能统计、报表中心

- [ ] **Step 1: 创建HTML基础结构**

- [ ] **Step 2: 实现左侧菜单**

```html
<aside class="sidebar">
  <ul class="menu">
    <li class="menu-item active"><a href="#">我的工作台</a></li>
    <li class="menu-item"><a href="#">项目监管</a></li>
    <li class="menu-item"><a href="#">欠薪预警</a></li>
    <li class="menu-item"><a href="#">效能统计</a></li>
    <li class="menu-item"><a href="#">报表中心</a></li>
  </ul>
</aside>
```

- [ ] **Step 3: 实现项目监管模块**

- 在建工程项目列表（全要素）
- 用工人数、合同签订率、工资发放状态
- 考勤联网状态

- [ ] **Step 4: 实现欠薪预警模块（AI可视化）**

```html
<!-- AI欠薪预警卡片 -->
<div class="warning-card danger">
  <div class="warning-header">
    <span class="warning-level">红色预警</span>
    <span class="warning-time">2026-05-11 10:30</span>
  </div>
  <div class="warning-content">
    <p><strong>项目名称：</strong>XX住宅小区开发项目</p>
    <p><strong>预警原因：</strong></p>
    <ul>
      <li>工资发放已延迟15天，涉及员工412人</li>
      <li>近30天投诉量激增，共收到欠薪投诉23件</li>
      <li>考勤系统部分离线，数据上传不及时</li>
    </ul>
  </div>
  <div class="warning-actions">
    <button class="btn btn-primary btn-sm" onclick="pushToDept()">推送监管部门</button>
    <button class="btn btn-secondary btn-sm" onclick="viewDetail()">查看详情</button>
  </div>
</div>

<!-- 预警级别说明 -->
<div class="warning-legend">
  <span class="badge badge-danger">红色预警</span> 严重欠薪
  <span class="badge badge-warning">黄色预警</span> 存在隐患
  <span class="badge badge-info">蓝色预警</span> 轻微异常
</div>
```

- [ ] **Step 5: 实现效能统计模块**

- 各级仲裁机构办结率
- 云庭审使用率
- 调解成功率统计

- [ ] **Step 6: 实现报表中心**

- 监管报表导出（Excel/PDF）
- 自定义报表条件选择

- [ ] **Step 7: 测试页面加载和预警展示**

---

## Task 6: 创建法律援助端页面 (role-legal-aid.html)

**Files:**
- Create: `原型设计/role-legal-aid.html`
- Depend: `原型设计/style.css`

**目标：** 实现法律援助端完整功能，包含援助申请审核、案件管理、统计分析

- [ ] **Step 1: 创建HTML基础结构**

- [ ] **Step 2: 实现左侧菜单**

```html
<aside class="sidebar">
  <ul class="menu">
    <li class="menu-item active"><a href="#">我的工作台</a></li>
    <li class="menu-item"><a href="#">援助申请</a></li>
    <li class="menu-item"><a href="#">案件管理</a></li>
    <li class="menu-item"><a href="#">统计分析</a></li>
  </ul>
</aside>
```

- [ ] **Step 3: 实现仪表盘**

- 援助案件统计
- 待审核数量
- 本月结案数

- [ ] **Step 4: 实现援助申请审核模块**

- 申请列表（含资格核验状态）
- 审核操作（通过/驳回）
- 资格核验（经济困难情况）

- [ ] **Step 5: 实现案件管理模块**

- 指派律师功能
- 服务记录
- 案件进度跟踪

- [ ] **Step 6: 实现统计分析模块**

- 援助覆盖率统计图表
- 案件类型分布
- 律师工作量统计

- [ ] **Step 7: 测试页面加载**

---

## Task 7: 添加页面间交互和功能联动

**Files:**
- Modify: 所有角色页面
- Depend: style.css

**目标：** 确保页面间导航流畅，数据展示一致

- [ ] **Step 1: 统一角色切换逻辑**

确保所有页面角色切换下拉菜单功能一致

- [ ] **Step 2: 添加页面间数据传递模拟**

使用JS模拟跨页面数据展示

- [ ] **Step 3: 测试完整流程**

从首页→角色端→具体功能→返回首页的完整流程

---

## Task 8: 最终验证和调整

**Files:**
- All created files

- [ ] **Step 1: 验收标准检查**

- [ ] 五类用户角色可切换，各自功能模块完整
- [ ] 云庭审五分区完整呈现（视频会议/证据展示/笔录区/操作栏/信息栏）
- [ ] AI材料校验、案件分流、欠薪预警可视化展示
- [ ] 全流程闭环：申请→审核→调解/仲裁→云庭审→文书送达→归档
- [ ] 上下联动数据贯通可视化
- [ ] 复用现有style.css样式规范
- [ ] 七大功能模块完整呈现

- [ ] **Step 2: 浏览器兼容性测试**

- [ ] **Step 3: 调整和优化**

---

## 验收清单

- [ ] Task 1: 14-mediation-arbitration.html 五角色切换正常
- [ ] Task 2: role-laborer.html 劳动者功能完整
- [ ] Task 3: role-employer.html 用人单位功能完整
- [ ] Task 4: role-arbitration.html 含云庭审五分区
- [ ] Task 5: role-supervisor.html 含AI欠薪预警
- [ ] Task 6: role-legal-aid.html 法律援助功能完整
- [ ] Task 7: 页面间交互和功能联动正常
- [ ] Task 8: 验收标准全部通过