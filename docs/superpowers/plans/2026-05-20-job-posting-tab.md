# 发布岗位 Tab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add "发布岗位" tab to the 服务机构 role in the HR flagship store, with job posting, video interview, and policy consultation features.

**Architecture:** Single-file change to `12-hr-flagship.html` — add new tab definition in `ROLE_CONFIG`, add content HTML in `contentMap`, and add JS functions. Pure frontend, no backend, mock data patterns follow existing conventions.

**Tech Stack:** HTML + CSS + Vanilla JS (existing codebase pattern)

---

### Task 1: Add Tab Definition & Stats Overview Section

**Files:**
- Modify: `原型设计/12-hr-flagship.html` (ROLE_CONFIG and contentMap)

- [ ] **Step 1: Add org-job tab to ROLE_CONFIG**

Insert `org-job` as the 3rd tab (after org-staff, before org-shop) in `ROLE_CONFIG.org.tabs`:

```javascript
{ id: 'org-job', label: '发布岗位', icon: 'fa-briefcase' },
```

- [ ] **Step 2: Add org-job content function to contentMap**

Add the stats section and structure for the org-job content. Insert in `contentMap`:

```javascript
'org-job':function(){return['<div class="section-title">发布岗位</div>','<div class="stats-grid">','<div class="stat-card"><div class="stat-icon stat-icon-blue"><i class="fas fa-briefcase"></i></div><div class="stat-value">18</div><div class="stat-label">在招岗位</div></div>','<div class="stat-card"><div class="stat-icon stat-icon-green"><i class="fas fa-plus-circle"></i></div><div class="stat-value">8</div><div class="stat-label">本月发布</div></div>','<div class="stat-card"><div class="stat-icon stat-icon-orange"><i class="fas fa-video"></i></div><div class="stat-value">12</div><div class="stat-label">待面试</div></div>','<div class="stat-card"><div class="stat-icon stat-icon-purple"><i class="fas fa-file-lines"></i></div><div class="stat-value">36</div><div class="stat-label">政策资料</div></div>','</div>'].join('')},
```

- [ ] **Step 3: Verify tabs render**

Open `12-hr-flagship.html`, switch role to "服务机构", verify new "发布岗位" tab appears.

---

### Task 2: Job Posting Section (Table + Search)

**Files:**
- Modify: `原型设计/12-hr-flagship.html` (extend contentMap org-job)

- [ ] **Step 1: Add job posting table with search and filter**

Extend the `org-job` content function to include the job posting management section:

```javascript
'org-job':function(){return['<div class="section-title">发布岗位</div>','<div class="stats-grid">','<div class="stat-card"><div class="stat-icon stat-icon-blue"><i class="fas fa-briefcase"></i></div><div class="stat-value">18</div><div class="stat-label">在招岗位</div></div>','<div class="stat-card"><div class="stat-icon stat-icon-green"><i class="fas fa-plus-circle"></i></div><div class="stat-value">8</div><div class="stat-label">本月发布</div></div>','<div class="stat-card"><div class="stat-icon stat-icon-orange"><i class="fas fa-video"></i></div><div class="stat-value">12</div><div class="stat-label">待面试</div></div>','<div class="stat-card"><div class="stat-icon stat-icon-purple"><i class="fas fa-file-lines"></i></div><div class="stat-value">36</div><div class="stat-label">政策资料</div></div>','</div>','<div style="font-size:18px;font-weight:600;margin-bottom:12px;color:var(--text-primary);"><i class="fas fa-bullhorn"></i> 岗位发布与管理</div>','<div class="search-bar"><input type="text" placeholder="搜索岗位名称、企业名称..." style="flex:1;" onkeypress="if(event.key===\'Enter\') searchTable();"><button class="action-btn" onclick="searchTable()"><i class="fas fa-search"></i> 搜索</button><button class="action-btn" onclick="publishJob()"><i class="fas fa-plus"></i> 发布新岗位</button></div>','<div class="filter-tabs"><button class="active" onclick="setFilter(this,\'全部\')">全部</button><button onclick="setFilter(this,\'在招\')">在招</button><button onclick="setFilter(this,\'已下线\')">已下线</button><button onclick="setFilter(this,\'待审核\')">待审核</button></div>','<div class="table-wrapper"><table><thead><tr><th>岗位名称</th><th>招聘类型</th><th>发布企业</th><th>招聘人数</th><th>发布时间</th><th>状态</th><th>操作</th></tr></thead><tbody><tr><td>高级Java开发工程师</td><td>高端人才招聘</td><td>大连华信计算机</td><td>10</td><td>2026-05-18</td><td><span class="badge badge-green">在招</span></td><td><button class="action-btn" onclick="viewJobDetail(this)">查看</button><button class="action-btn btn-secondary" onclick="editJob(this)">编辑</button><button class="action-btn btn-secondary" onclick="scheduleInterview(this)">面试</button><button class="action-btn btn-danger" onclick="deleteItem(this,\'offline\')">下线</button></td></tr><tr><td>产品经理</td><td>高端人才招聘</td><td>大连万达集团</td><td>5</td><td>2026-05-16</td><td><span class="badge badge-green">在招</span></td><td><button class="action-btn" onclick="viewJobDetail(this)">查看</button><button class="action-btn btn-secondary" onclick="editJob(this)">编辑</button><button class="action-btn btn-secondary" onclick="scheduleInterview(this)">面试</button><button class="action-btn btn-danger" onclick="deleteItem(this,\'offline\')">下线</button></td></tr><tr><td>生产车间操作工</td><td>劳务派遣</td><td>大连重工装备集团</td><td>50</td><td>2026-05-14</td><td><span class="badge badge-blue">待审核</span></td><td><button class="action-btn" onclick="viewJobDetail(this)">查看</button><button class="action-btn btn-secondary" onclick="editJob(this)">编辑</button><button class="action-btn btn-danger" onclick="deleteItem(this,\'offline\')">下线</button></td></tr><tr><td>临时客服人员</td><td>灵活用工</td><td>大连中山商贸</td><td>15</td><td>2026-05-12</td><td><span class="badge badge-green">在招</span></td><td><button class="action-btn" onclick="viewJobDetail(this)">查看</button><button class="action-btn btn-secondary" onclick="editJob(this)">编辑</button><button class="action-btn btn-secondary" onclick="scheduleInterview(this)">面试</button><button class="action-btn btn-danger" onclick="deleteItem(this,\'offline\')">下线</button></td></tr><tr><td>财务结算专员</td><td>灵活用工</td><td>大连金普集团</td><td>5</td><td>2026-05-10</td><td><span class="badge badge-danger">已下线</span></td><td><button class="action-btn" onclick="viewJobDetail(this)">查看</button><button class="action-btn btn-secondary" onclick="editJob(this)">编辑</button></td></tr></tbody></table></div>'].join('')},
```

- [ ] **Step 2: Add publishJob function**

Add to the `<script>` section:

```javascript
function publishJob() {
  var body = '<div class="form-group"><label>岗位名称 *</label><input type="text" id="jobName" placeholder="如：高级Java开发工程师"></div>';
  body += '<div class="form-group"><label>招聘类型</label><select id="jobType"><option>高端人才招聘</option><option>劳务派遣</option><option>灵活用工</option><option>人事外包</option></select></div>';
  body += '<div class="form-group"><label>发布企业 *</label><input type="text" id="jobCompany" placeholder="请输入企业名称"></div>';
  body += '<div class="form-row"><div class="form-group"><label>招聘人数</label><input type="number" id="jobCount" placeholder="请输入人数"></div>';
  body += '<div class="form-group"><label>薪资范围</label><input type="text" id="jobSalary" placeholder="如：¥10,000-20,000"></div></div>';
  body += '<div class="form-group"><label>学历要求</label><select id="jobEdu"><option>不限</option><option>大专</option><option>本科</option><option>硕士及以上</option></select></div>';
  body += '<div class="form-group"><label>工作经验</label><select id="jobExp"><option>不限</option><option>1-3年</option><option>3-5年</option><option>5-10年</option><option>10年以上</option></select></div>';
  body += '<div class="form-group"><label>岗位描述 *</label><textarea id="jobDesc" placeholder="请详细描述岗位职责和要求..."></textarea></div>';
  body += '<div class="form-group"><label>截止日期</label><input type="date" id="jobDeadline"></div>';
  openModal('发布新岗位', body, [
    { label: '取消', action: 'close', class: 'btn-secondary' },
    { label: '提交发布', action: 'submitJob', class: '' }
  ]);
}
```

- [ ] **Step 3: Add submitJob function**

```javascript
function submitJob() {
  var name = document.getElementById('jobName').value;
  if (!name) { alert('请填写岗位名称'); return; }
  closeModal();
  openModal('成功', '<div style="text-align:center;padding:20px;"><i class="fas fa-check-circle" style="font-size:48px;color:#22c55e;margin-bottom:16px;"></i><div style="font-size:16px;">岗位 "' + name + '" 发布成功，等待审核</div></div>');
}
```

- [ ] **Step 4: Add viewJobDetail function**

```javascript
function viewJobDetail(btn) {
  var row = btn;
  while (row && row.tagName !== 'TR') row = row.parentElement;
  if (!row) return;
  var cells = row.querySelectorAll('td');
  var body = '<div class="detail-item"><div class="detail-label">岗位名称</div><div class="detail-value">' + cells[0].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">招聘类型</div><div class="detail-value">' + cells[1].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">发布企业</div><div class="detail-value">' + cells[2].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">招聘人数</div><div class="detail-value">' + cells[3].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">发布时间</div><div class="detail-value">' + cells[4].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">状态</div><div class="detail-value">' + cells[5].innerHTML + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">岗位描述</div><div class="detail-value">负责相关系统的设计、开发和维护工作，参与技术方案评审，编写技术文档。</div></div>';
  openModal('岗位详情', body);
}
```

- [ ] **Step 5: Add scheduleInterview function (from job table)**

```javascript
function scheduleInterview(btn) {
  var row = btn;
  while (row && row.tagName !== 'TR') row = row.parentElement;
  var jobName = row ? row.cells[0].textContent : '';
  var body = '<div class="modal-alert"><i class="fas fa-video"></i> 为岗位安排面试：' + jobName + '</div>';
  body += '<div class="form-group"><label>候选人姓名 *</label><input type="text" id="interviewName" placeholder="请输入候选人姓名"></div>';
  body += '<div class="form-group"><label>候选人电话</label><input type="tel" id="interviewPhone" placeholder="请输入联系电话"></div>';
  body += '<div class="form-row"><div class="form-group"><label>面试日期 *</label><input type="date" id="interviewDate"></div>';
  body += '<div class="form-group"><label>面试时间 *</label><input type="time" id="interviewTime"></div></div>';
  body += '<div class="form-group"><label>面试方式</label><select id="interviewMethod"><option>视频面试</option><option>电话面试</option><option>线下面试</option></select></div>';
  body += '<div class="form-group"><label>备注</label><textarea id="interviewNote" placeholder="请输入备注信息..."></textarea></div>';
  openModal('安排面试', body, [
    { label: '取消', action: 'close', class: 'btn-secondary' },
    { label: '创建', action: 'createInterviewSubmit', class: '' }
  ]);
}
```

- [ ] **Step 6: Add editJob function**

```javascript
function editJob(btn) {
  var row = btn;
  while (row && row.tagName !== 'TR') row = row.parentElement;
  var name = row ? row.cells[0].textContent : '';
  var body = '<div class="modal-alert"><i class="fas fa-edit"></i> 编辑岗位：' + name + '</div>';
  body += '<div class="form-group"><label>岗位名称</label><input type="text" value="' + name + '"></div>';
  body += '<div class="form-group"><label>薪资范围</label><input type="text" value="¥10,000-20,000"></div>';
  body += '<div class="form-group"><label>岗位描述</label><textarea>负责相关系统的设计、开发和维护工作。</textarea></div>';
  body += '<div class="form-group"><label>截止日期</label><input type="date"></div>';
  openModal('编辑岗位', body, [
    { label: '取消', action: 'close', class: 'btn-secondary' },
    { label: '保存', action: 'close', class: '' }
  ]);
}
```

---

### Task 3: Video Interview Section

**Files:**
- Modify: `原型设计/12-hr-flagship.html` (extend contentMap org-job and add functions)

- [ ] **Step 1: Add video interview subsections to contentMap**

Insert after the job posting table, before the closing `'].join('')}`:

```javascript
'<div style="font-size:18px;font-weight:600;margin:24px 0 12px;color:var(--text-primary);"><i class="fas fa-video"></i> 视频面试</div>','<div class="search-bar"><button class="action-btn" onclick="createInterview()"><i class="fas fa-plus"></i> 创建面试</button></div>','<div class="table-wrapper"><table><thead><tr><th>岗位名称</th><th>候选人</th><th>面试时间</th><th>面试方式</th><th>状态</th><th>操作</th></tr></thead><tbody><tr><td>高级Java开发工程师</td><td>张三</td><td>2026-05-22 14:00</td><td>视频面试</td><td><span class="badge badge-blue">待面试</span></td><td><button class="action-btn" onclick="enterInterview(this)">进入面试</button><button class="action-btn btn-danger" onclick="deleteItem(this,\'cancel\')">取消</button></td></tr><tr><td>产品经理</td><td>李四</td><td>2026-05-23 10:00</td><td>视频面试</td><td><span class="badge badge-blue">待面试</span></td><td><button class="action-btn" onclick="enterInterview(this)">进入面试</button><button class="action-btn btn-danger" onclick="deleteItem(this,\'cancel\')">取消</button></td></tr><tr><td>高级Java开发工程师</td><td>王五</td><td>2026-05-20 15:30</td><td>线下面试</td><td><span class="badge badge-green">已完成</span></td><td><button class="action-btn btn-secondary" onclick="viewInterviewDetail(this)">详情</button></td></tr></tbody></table></div>',
```

- [ ] **Step 2: Add createInterview function**

```javascript
function createInterview() {
  var body = '<div class="form-group"><label>选择岗位 *</label><select id="interviewJob"><option>高级Java开发工程师</option><option>产品经理</option><option>生产车间操作工</option><option>临时客服人员</option></select></div>';
  body += '<div class="form-group"><label>候选人姓名 *</label><input type="text" id="interviewName" placeholder="请输入候选人姓名"></div>';
  body += '<div class="form-group"><label>候选人电话</label><input type="tel" id="interviewPhone" placeholder="请输入联系电话"></div>';
  body += '<div class="form-row"><div class="form-group"><label>面试日期 *</label><input type="date" id="interviewDate"></div>';
  body += '<div class="form-group"><label>面试时间 *</label><input type="time" id="interviewTime"></div></div>';
  body += '<div class="form-group"><label>面试方式</label><select id="interviewMethod"><option>视频面试</option><option>电话面试</option><option>线下面试</option></select></div>';
  body += '<div class="form-group"><label>备注</label><textarea id="interviewNote" placeholder="请输入备注信息..."></textarea></div>';
  openModal('创建面试', body, [
    { label: '取消', action: 'close', class: 'btn-secondary' },
    { label: '创建', action: 'createInterviewSubmit', class: '' }
  ]);
}

function createInterviewSubmit() {
  var name = document.getElementById('interviewName').value;
  var job = document.getElementById('interviewJob').value;
  if (!name) { alert('请填写候选人姓名'); return; }
  closeModal();
  openModal('成功', '<div style="text-align:center;padding:20px;"><i class="fas fa-check-circle" style="font-size:48px;color:#22c55e;margin-bottom:16px;"></i><div style="font-size:16px;">已为岗位 "' + job + '" 创建面试</div><div style="color:var(--text-secondary);margin-top:8px;">候选人：' + name + '</div></div>');
}
```

- [ ] **Step 3: Add enterInterview and viewInterviewDetail functions**

```javascript
function enterInterview(btn) {
  var row = btn;
  while (row && row.tagName !== 'TR') row = row.parentElement;
  var candidate = row ? row.cells[1].textContent : '';
  var body = '<div style="text-align:center;padding:20px;">';
  body += '<i class="fas fa-video" style="font-size:64px;color:var(--primary);margin-bottom:16px;"></i>';
  body += '<div style="font-size:18px;font-weight:600;margin-bottom:8px;">视频面试间</div>';
  body += '<div style="color:var(--text-secondary);margin-bottom:20px;">与 ' + candidate + ' 的面试</div>';
  body += '<div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px;padding:40px;margin-bottom:16px;">';
  body += '<i class="fas fa-user-circle" style="font-size:48px;color:var(--text-tertiary);"></i>';
  body += '<div style="margin-top:12px;color:var(--text-tertiary);">视频画面区域</div></div>';
  body += '<div style="display:flex;gap:12px;justify-content:center;">';
  body += '<button class="action-btn" style="background:#ef4444;border-color:#ef4444;" onclick="closeModal()"><i class="fas fa-phone-slash"></i> 结束</button>';
  body += '<button class="action-btn" onclick="closeModal()"><i class="fas fa-microphone-slash"></i> 静音</button></div></div>';
  openModal('视频面试', body);
}

function viewInterviewDetail(btn) {
  var row = btn;
  while (row && row.tagName !== 'TR') row = row.parentElement;
  if (!row) return;
  var cells = row.querySelectorAll('td');
  var body = '<div class="detail-item"><div class="detail-label">岗位名称</div><div class="detail-value">' + cells[0].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">候选人</div><div class="detail-value">' + cells[1].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">面试时间</div><div class="detail-value">' + cells[2].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">面试方式</div><div class="detail-value">' + cells[3].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">状态</div><div class="detail-value">' + cells[4].innerHTML + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">面试评价</div><div class="detail-value">候选人表现良好，技术能力符合要求。</div></div>';
  openModal('面试详情', body);
}
```

---

### Task 4: Policy Consultation Section

**Files:**
- Modify: `原型设计/12-hr-flagship.html` (extend contentMap org-job and add functions)

- [ ] **Step 1: Add policy consultation subsections to contentMap**

Insert after the video interview table, before the closing `'].join('')}`:

```javascript
'<div style="font-size:18px;font-weight:600;margin:24px 0 12px;color:var(--text-primary);"><i class="fas fa-file-lines"></i> 政策咨询</div>','<div class="search-bar"><input type="text" placeholder="搜索相关政策关键词..." style="flex:1;" onkeypress="if(event.key===\'Enter\') searchTable();"><button class="action-btn" onclick="searchTable()"><i class="fas fa-search"></i> 搜索</button></div>','<div class="filter-tabs"><button class="active" onclick="setFilter(this,\'全部\')">全部</button><button onclick="setFilter(this,\'劳动合同\')">劳动合同</button><button onclick="setFilter(this,\'社保公积金\')">社保公积金</button><button onclick="setFilter(this,\'劳动仲裁\')">劳动仲裁</button><button onclick="setFilter(this,\'灵活用工\')">灵活用工</button></div>','<div class="table-wrapper"><table><thead><tr><th>政策标题</th><th>分类</th><th>更新时间</th><th>操作</th></tr></thead><tbody><tr><td>大连市劳动合同签订指引（2026版）</td><td><span class="badge badge-blue">劳动合同</span></td><td>2026-05-15</td><td><button class="action-btn" onclick="viewPolicy(this)">查看详情</button><button class="action-btn btn-secondary" onclick="consultPolicy(this)">在线咨询</button></td></tr><tr><td>社保基数调整政策解读</td><td><span class="badge badge-green">社保公积金</span></td><td>2026-05-10</td><td><button class="action-btn" onclick="viewPolicy(this)">查看详情</button><button class="action-btn btn-secondary" onclick="consultPolicy(this)">在线咨询</button></td></tr><tr><td>辽宁省劳动人事争议调解办法</td><td><span class="badge badge-orange">劳动仲裁</span></td><td>2026-05-08</td><td><button class="action-btn" onclick="viewPolicy(this)">查看详情</button><button class="action-btn btn-secondary" onclick="consultPolicy(this)">在线咨询</button></td></tr><tr><td>灵活用工人员工伤保险暂行办法</td><td><span class="badge badge-purple">灵活用工</span></td><td>2026-05-05</td><td><button class="action-btn" onclick="viewPolicy(this)">查看详情</button><button class="action-btn btn-secondary" onclick="consultPolicy(this)">在线咨询</button></td></tr><tr><td>高校毕业生就业补贴政策汇总</td><td><span class="badge badge-green">社保公积金</span></td><td>2026-04-28</td><td><button class="action-btn" onclick="viewPolicy(this)">查看详情</button><button class="action-btn btn-secondary" onclick="consultPolicy(this)">在线咨询</button></td></tr></tbody></table></div>',
```

- [ ] **Step 2: Add viewPolicy function**

```javascript
function viewPolicy(btn) {
  var row = btn;
  while (row && row.tagName !== 'TR') row = row.parentElement;
  if (!row) return;
  var cells = row.querySelectorAll('td');
  var body = '<div class="detail-item"><div class="detail-label">政策标题</div><div class="detail-value" style="font-weight:600;">' + cells[0].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">分类</div><div class="detail-value">' + cells[1].innerHTML + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">更新时间</div><div class="detail-value">' + cells[2].textContent + '</div></div>';
  body += '<div class="detail-item"><div class="detail-label">政策摘要</div><div class="detail-value">根据《中华人民共和国劳动合同法》及相关规定，为规范劳动合同管理，保障劳动者和用人单位的合法权益，结合本市实际情况，制定本指引。本指引适用于本市行政区域内企业、个体经济组织、民办非企业单位等组织与劳动者建立劳动关系，订立、履行、变更、解除和终止劳动合同。</div></div>';
  openModal('政策详情', body);
}
```

- [ ] **Step 3: Add consultPolicy function**

```javascript
function consultPolicy(btn) {
  var row = btn;
  while (row && row.tagName !== 'TR') row = row.parentElement;
  var policy = row ? row.cells[0].textContent : '';
  var body = '<div class="modal-alert"><i class="fas fa-file-lines"></i> 咨询政策：' + policy + '</div>';
  body += '<div class="form-group"><label>咨询内容 *</label><textarea id="consultContent" placeholder="请输入您想咨询的问题..." style="min-height:120px;"></textarea></div>';
  body += '<div class="form-group"><label>联系电话</label><input type="tel" id="consultPhone" placeholder="请输入您的联系电话"></div>';
  openModal('在线咨询', body, [
    { label: '取消', action: 'close', class: 'btn-secondary' },
    { label: '提交咨询', action: 'submitConsult', class: '' }
  ]);
}

function submitConsult() {
  var content = document.getElementById('consultContent').value;
  if (!content) { alert('请填写咨询内容'); return; }
  closeModal();
  openModal('成功', '<div style="text-align:center;padding:20px;"><i class="fas fa-check-circle" style="font-size:48px;color:#22c55e;margin-bottom:16px;"></i><div style="font-size:16px;">咨询已提交</div><div style="color:var(--text-secondary);margin-top:8px;">我们将尽快与您联系，请保持电话畅通</div></div>');
}
```

---

### Task 5: Verification

**Files:**
- Check: `原型设计/12-hr-flagship.html`

- [ ] **Step 1: Verify LSP diagnostics**

Run LSP diagnostics on the modified file to check for syntax errors:

Run: `lsp_diagnostics("原型设计/12-hr-flagship.html" )`

- [ ] **Step 2: Verify tab renders correctly**

Open `12-hr-flagship.html` in browser, switch role to "服务机构", click "发布岗位" tab. Verify:
- Stats cards display correctly
- Job posting table renders with data
- Video interview section renders with data
- Policy consultation section renders with data

- [ ] **Step 3: Verify modal dialogs work**

Test all action buttons:
- "发布新岗位" opens modal with form
- "查看" opens detail modal
- "编辑" opens edit modal
- "面试" opens create interview modal
- "进入面试" opens video interview room
- "查看详情" (policy) opens policy detail
- "在线咨询" opens consultation modal
- "下线" shows confirmation dialog
