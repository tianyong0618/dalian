# 调解仲裁服务平台重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按照PRD要求重新设计调解仲裁服务原型，实现五类用户角色独立界面、完整云庭审、AI智能可视化功能

**Architecture:** 多页面独立角色门户架构。每个角色独立HTML页面，通过顶部角色切换下拉菜单关联。复用统一style.css样式系统。

**Tech Stack:** 纯HTML/CSS/JS，无框架依赖

---

## 文件清单

| 文件 | 相依文件 |
|------|----------|
| `原型设计/14-mediation-arbitration.html` | style.css |
| `原型设计/role-laborer.html` | style.css |
| `原型设计/role-employer.html` | style.css |
| `原型设计/role-arbitration.html` | style.css |
| `原型设计/role-supervisor.html` | style.css |
| `原型设计/role-legal-aid.html` | style.css |

---

## Phase 1: 重构主入口页面

### Task 1: 重构14-mediation-arbitration.html为五角色统一入口

**文件：** Create: `原型设计/14-mediation-arbitration.html`

**内容：** 五角色统一入口，包含：
- 顶部导航 + 角色切换下拉菜单（劳动者/用人单位/仲裁机构/人社监管/法律援助）
- 平台概览仪表盘（展示五角色共用核心统计）
- 快捷入口卡片区（按角色类型高亮对应功能）
- 完整模态框（复用现有模态框简化版）

- [ ] **Step 1: 创建HTML基础结构**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>调解仲裁服务 - 人社服务数字化平台</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<!-- 导航栏 + 角色切换下拉 -->
<!-- 概览仪表盘（核心统计卡片） -->
<!-- 角色专属功能快捷入口 -->
<!-- 模态框（简化版复用） -->
<!-- 通知提示 -->
<script>
const ROLE_PAGES = {
  '劳动者': 'role-laborer.html',
  '用人单位': 'role-employer.html',
  '仲裁机构': 'role-arbitration.html',
  '人社监管': 'role-supervisor.html',
  '法律援助': 'role-legal-aid.html'
};
function switchRole(role) { window.location.href = ROLE_PAGES[role]; }
// ... 现有JS逻辑简化保留
</script>
</body>
</html>
```

- [ ] **Step 2: 在浏览器测试页面加载正常**

---

### Task 2: 更新角色切换逻辑

**文件：** Modify: `原型设计/14-mediation-arbitration.html` (导航栏部分)

**内容：** 添加角色切换下拉菜单到顶部导航栏

---

## Phase 2: 劳动者端

### Task 3: 创建劳动者端页面

**文件：** Create: `原型设计/role-laborer.html`

**功能模块：**
- 顶部导航 + 角色切换（返回主入口）
- 左侧菜单：我的合同、案件申请、我的案件、文书查看、法律援助
- 右侧工作区：仪表盘 + 各功能面板

**核心组件：**
- 案件申请表单（含AI材料校验实时反馈）
- 案件进度查看列表
- 云庭审参与入口（视频+证据+笔录）
- 电子合同列表

- [ ] **Step 1: 创建完整HTML结构**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>劳动者端 - 调解仲裁服务</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="navbar">
  <div class="container">
    <a href="14-mediation-arbitration.html" class="navbar-logo">人社服务数字平台</a>
    <!-- 角色切换下拉 -->
    <select onchange="if(this.value) window.location.href=this.value">
      <option value="">切换角色</option>
      <option value="role-laborer.html" selected>劳动者</option>
      <option value="role-employer.html">用人单位</option>
      <option value="role-arbitration.html">仲裁机构</option>
      <option value="role-supervisor.html">人社监管</option>
      <option value="role-legal-aid.html">法律援助</option>
    </select>
    <ul class="navbar-nav">
      <li><a href="#" class="active">我的工作台</a></li>
    </ul>
  </div>
</nav>
<!-- 左侧菜单 + 右侧工作区 -->
<!-- AI材料校验可视化 -->
<!-- 云庭审参与入口 -->
<script>
// 角色专属JS逻辑
</script>
</body>
</html>
```

---

## Phase 3: 用人单位端

### Task 4: 创建用人单位端页面

**文件：** Create: `原型设计/role-employer.html`

**功能模块：**
- 合同管理（发起签署、合同列表）
- 应诉案件（仲裁通知、答辩提交）
- 考勤上报
- 工资确认

---

## Phase 4: 仲裁机构端（核心-含云庭审）

### Task 5: 创建仲裁机构端页面

**文件：** Create: `原型设计/role-arbitration.html`

**功能模块：**
- 案件管理（AI材料校验、案件分流）
- 调解管理（调解员分配）
- 云庭审（完整五分区）
- 文书管理（云送达）
- 上下联动

### Task 6: 实现云庭审五分区布局

**文件：** Modify: `原型设计/role-arbitration.html` (云庭审部分)

**五分区布局：**
```
┌──────────────────────────────────────────────────────────────┐
│  庭审信息栏（案件编号/类型/状态/倒计时）                       │
├──────────────────┬──────────────────┬──────────────────────┤
│                  │                  │                      │
│   视频会议区      │   证据展示区      │   庭审笔录区           │
│   - 仲裁员画面    │   - 证据列表      │   - 实时语音转文字    │
│   - 当事人画面    │   - 质证标记      │   - 历史记录          │
│   - 控制按钮      │   - 上传证据     │   - 笔录确认          │
│                  │                  │                      │
├──────────────────┴──────────────────┴──────────────────────┤
│  操作栏：[上传证据] [举证质证] [补充发言] [休庭] [电子签字]    │
└──────────────────────────────────────────────────────────────┘
```

- [ ] **Step 1: 实现五分区HTML结构**

```html
<div class="cloud-trial-container">
  <!-- 庭审信息栏 -->
  <div class="trial-info-bar">
    <span>案件编号：<strong id="trial-case-id"></strong></span>
    <span>状态：<span class="badge badge-info" id="trial-status"></span></span>
    <span>开庭时间：<span id="trial-time"></span></span>
    <span>倒计时：<span id="trial-countdown" class="countdown"></span></span>
  </div>

  <!-- 三列主区域 -->
  <div class="trial-main">
    <!-- 视频会议区 -->
    <div class="trial-panel video-panel">
      <h4>视频会议</h4>
      <div class="video-grid">
        <div class="video-item"><div class="video-placeholder">仲裁员</div></div>
        <div class="video-item"><div class="video-placeholder">申请人</div></div>
        <div class="video-item"><div class="video-placeholder">被申请人</div></div>
      </div>
      <div class="video-controls">
        <button onclick="toggleMute()">🎤 静音</button>
        <button onclick="toggleCamera()">📹 摄像头</button>
      </div>
    </div>

    <!-- 证据展示区 -->
    <div class="trial-panel evidence-panel">
      <h4>证据展示</h4>
      <div class="evidence-list" id="evidence-list"></div>
      <button onclick="uploadEvidence()" class="btn btn-primary btn-sm">上传证据</button>
    </div>

    <!-- 庭审笔录区 -->
    <div class="trial-panel transcript-panel">
      <h4>庭审笔录</h4>
      <div class="transcript-content" id="transcript-content"></div>
      <button onclick="confirmTranscript()" class="btn btn-primary btn-sm">确认笔录</button>
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

---

## Phase 5: 人社监管端

### Task 7: 创建人社监管端页面

**文件：** Create: `原型设计/role-supervisor.html`

**功能模块：**
- 项目监管（在建工程全要素）
- 欠薪预警（AI预警可视化+预警级别标识）
- 效能统计（各级仲裁机构办结率）
- 报表中心

**AI预警可视化：**
```html
<!-- 预警卡片 -->
<div class="warning-card danger">
  <div class="warning-header">
    <span class="warning-level">红色预警</span>
    <span class="warning-time">2026-05-09 10:30</span>
  </div>
  <div class="warning-content">
    <p><strong>项目：</strong>XX住宅小区开发项目</p>
    <p><strong>预警原因：</strong></p>
    <ul>
      <li>工资发放已延迟15天，涉及员工412人</li>
      <li>近30天投诉量激增，共收到欠薪投诉23件</li>
    </ul>
  </div>
  <div class="warning-actions">
    <button class="btn btn-primary btn-sm">推送监管部门</button>
    <button class="btn btn-secondary btn-sm">查看详情</button>
  </div>
</div>
```

---

## Phase 6: 法律援助端

### Task 8: 创建法律援助端页面

**文件：** Create: `原型设计/role-legal-aid.html`

**功能模块：**
- 援助申请审核
- 案件管理（律师指派）
- 统计分析

---

## 验收清单

- [ ] 14-mediation-arbitration.html 五角色切换正常
- [ ] role-laborer.html 劳动者功能完整
- [ ] role-employer.html 用人单位功能完整
- [ ] role-arbitration.html 含云庭审五分区
- [ ] role-supervisor.html 含欠薪预警
- [ ] role-legal-aid.html 法律援助功能完整
- [ ] AI材料校验可视化呈现
- [ ] AI案件分流可视化呈现
- [ ] AI欠薪预警可视化呈现
- [ ] 全流程闭环：申请→审核→调解/仲裁→云庭审→文书送达→归档