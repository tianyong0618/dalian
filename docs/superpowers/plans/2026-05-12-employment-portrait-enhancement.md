# 就业人员画像系统功能完善实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完善就业人员画像系统的权限控制、数据管理交互功能，实现业务逻辑闭环

**Architecture:** 在现有原型基础上，完善权限控制逻辑（企业/机构/人社部门三级权限）、数据管理模态框的四个Tab交互（采集日志、数据校验、安全管理、数据清洗）

**Tech Stack:** HTML5, CSS3, JavaScript (Vanilla), Python HTTP Server

---

### Task 1: 权限控制逻辑完善

**Files:**
- Modify: `原型设计/9-employment-portrait.html`

- [ ] **Step 1: 修改viewPersonDetail函数添加权限检查**

```javascript
function viewPersonDetail(index) {
  const person = personData[index];
  
  if (currentUserType === 'enterprise' && person.portraitType !== 'talent') {
    showNotification('企业用户仅能查看人才画像，请选择标注为"人才画像"的人员', 'warning');
    return;
  }
  
  if (currentUserType === 'org' && person.portraitType === 'talent') {
    showNotification('服务机构用户暂无法查看人才画像，请选择求职者画像或重点群体画像', 'warning');
    return;
  }
  
  document.getElementById('detail-name').textContent = person.name;
  updatePersonDetail(person);
  showModal('person-detail-modal');
}
```

- [ ] **Step 2: 添加updatePersonDetail函数实现动态详情展示**

```javascript
function updatePersonDetail(person) {
  const detailContent = document.querySelector('#person-detail-modal .modal-body > div:first-child');
  const isEnterprise = currentUserType === 'enterprise';
  
  let html = `
    <div style="background: linear-gradient(135deg, #0d1f3a 0%, #1a3a5c 100%); border: 2px solid #3a7aaa; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 20px;">
        <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #2a5a8a 0%, #5ae8ff 100%); display: flex; align-items: center; justify-content: center; font-size: 44px; flex-shrink: 0;">👤</div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <h3 id="detail-name" style="color: #5ae8ff; margin: 0; font-size: 24px; font-weight: 700;">${person.name}</h3>
            <span style="background: rgba(82, 196, 26, 0.15); border: 1px solid rgba(82, 196, 26, 0.4); padding: 4px 12px; border-radius: 4px; font-size: 12px; color: #52c41a;">✅ 身份已验证</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 16px; color: #8ab4d4; font-size: 13px;">
            <span>📅 ${getAgeFromGroup(person.group)}岁</span>
            <span>🎓 ${person.education}</span>
            <span>🏷️ ${person.group}</span>
          </div>
        </div>
        <div style="display: flex; gap: 24px;">
          <div style="text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #5ae8ff;">${person.match || person.competitiveness || 85}</div>
            <div style="font-size: 12px; color: #8ab4d4;">匹配度</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #52c41a;">${person.stability}%</div>
            <div style="font-size: 12px; color: #8ab4d4;">稳定性</div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(42,90,138,0.5);">
        ${person.tags.map(tag => `<span class="tag" style="background: rgba(42,90,138,0.5); border: 1px solid #3a7aaa; color: #8ab4d4; font-size: 12px;">${tag}</span>`).join('')}
      </div>
    </div>
  `;

  html += `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
      <div style="background: linear-gradient(135deg, #0d1f3a 0%, #1a3a5c 100%); border: 1px solid #2a5a8a; border-radius: 12px; padding: 16px;">
        <h4 style="color: #5ae8ff; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">🔷 基础信息</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div style="background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px;">
            <div style="font-size: 11px; color: #8ab4d4; margin-bottom: 4px;">户籍所在地</div>
            <div style="font-size: 13px; color: #a0c8e8;">江苏省南京市</div>
          </div>
          <div style="background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px;">
            <div style="font-size: 11px; color: #8ab4d4; margin-bottom: 4px;">现居住地</div>
            <div style="font-size: 13px; color: #a0c8e8;">江苏省苏州市</div>
          </div>
          <div style="background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px;">
            <div style="font-size: 11px; color: #8ab4d4; margin-bottom: 4px;">可工作城市</div>
            <div style="font-size: 13px; color: #a0c8e8;">苏州、无锡、上海</div>
          </div>
          <div style="background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px;">
            <div style="font-size: 11px; color: #8ab4d4; margin-bottom: 4px;">身份标签</div>
            <div style="font-size: 13px; color: #52c41a;">${person.group}</div>
          </div>
        </div>
      </div>
      
      <div style="background: linear-gradient(135deg, #0d1f3a 0%, #1a3a5c 100%); border: 1px solid #2a5a8a; border-radius: 12px; padding: 16px;">
        <h4 style="color: #5ae8ff; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">🔷 教育背景</h4>
        <div style="background: rgba(42,90,138,0.3); padding: 14px; border-radius: 8px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-size: 13px; color: #a0c8e8;">最高学历</span>
            <span style="font-size: 13px; color: #5ae8ff; font-weight: 600;">${person.education}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #a0c8e8;">专业方向</span>
            <span style="font-size: 13px; color: #a0c8e8;">${getMajorFromTags(person.tags)}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  html += `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
      <div style="background: linear-gradient(135deg, #0d1f3a 0%, #1a3a5c 100%); border: 1px solid #2a5a8a; border-radius: 12px; padding: 16px;">
        <h4 style="color: #5ae8ff; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">🔷 就业状态与竞争力</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div style="text-align: center; background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px;">
            <div style="font-size: 24px; font-weight: 700; color: #5ae8ff;">${person.competitiveness}%</div>
            <div style="font-size: 11px; color: #8ab4d4; margin-top: 4px;">竞争力</div>
          </div>
          <div style="text-align: center; background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px;">
            <div style="font-size: 24px; font-weight: 700; color: #52c41a;">${person.stability}%</div>
            <div style="font-size: 11px; color: #8ab4d4; margin-top: 4px;">稳定性</div>
          </div>
        </div>
        <div style="background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px;">
          <div style="font-size: 11px; color: #8ab4d4; margin-bottom: 8px;">工作经历</div>
          <div style="font-size: 12px; color: #a0c8e8;">${getWorkExperience(person)}</div>
        </div>
      </div>
      
      <div style="background: linear-gradient(135deg, #0d1f3a 0%, #1a3a5c 100%); border: 1px solid #2a5a8a; border-radius: 12px; padding: 16px;">
        <h4 style="color: #5ae8ff; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">🔷 技能评估</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div>
            <div style="font-size: 11px; color: #8ab4d4; margin-bottom: 6px;">专业技能</div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              ${getSkillItems(person)}
            </div>
          </div>
          <div>
            <div style="font-size: 11px; color: #8ab4d4; margin-bottom: 6px;">核心能力</div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="font-size: 12px; color: #a0c8e8;">学习能力</span>
                <span style="font-size: 12px; color: #52c41a;">优秀</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="font-size: 12px; color: #a0c8e8;">团队协作</span>
                <span style="font-size: 12px; color: #52c41a;">良好</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="font-size: 12px; color: #a0c8e8;">沟通表达</span>
                <span style="font-size: 12px; color: #52c41a;">良好</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (!isEnterprise) {
    html += `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
        <div style="background: linear-gradient(135deg, #0d1f3a 0%, #1a3a5c 100%); border: 1px solid #2a5a8a; border-radius: 12px; padding: 16px;">
          <h4 style="color: #5ae8ff; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">🔷 帮扶信息</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
            <div style="background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px;">
              <div style="font-size: 11px; color: #8ab4d4; margin-bottom: 4px;">帮扶指数</div>
              <div style="font-size: 13px; color: ${person.supportIndex >= 70 ? '#faad14' : '#52c41a'};">${person.supportIndex || '-'}%</div>
            </div>
            <div style="background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px;">
              <div style="font-size: 11px; color: #8ab4d4; margin-bottom: 4px;">困难等级</div>
              <div style="font-size: 13px; color: #a0c8e8;">${getDifficultyLevel(person)}</div>
            </div>
          </div>
          <div style="background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px;">
            <div style="font-size: 11px; color: #8ab4d4; margin-bottom: 8px;">帮扶需求</div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${getSupportNeeds(person).map(need => `<span class="tag" style="background: rgba(42,90,138,0.6); border: 1px solid #3a7aaa; color: #8ab4d4; font-size: 11px;">${need}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  html += `
    <div style="background: linear-gradient(135deg, #0d1f3a 0%, #1a3a5c 100%); border: 1px solid #2a5a8a; border-radius: 12px; padding: 16px;">
      <h4 style="color: #5ae8ff; margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">🔷 个性化服务推荐</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        ${person.services.map(service => `<div style="background: rgba(42,90,138,0.3); padding: 12px; border-radius: 8px; font-size: 12px; color: #a0c8e8;">${service}</div>`).join('')}
      </div>
    </div>
  `;

  detailContent.innerHTML = html;
}
```

- [ ] **Step 3: 添加辅助函数**

```javascript
function getAgeFromGroup(group) {
  const ages = { '高校毕业生': 24, '就业困难人员': 45, '农民工': 38, '零工人员': 32, '退役军人': 30 };
  return ages[group] || 30;
}

function getMajorFromTags(tags) {
  const majors = { 'Java开发': '计算机科学', 'Python': '人工智能', '建筑工': '土木工程', '外卖骑手': '物流管理' };
  for (const tag of tags) {
    if (majors[tag]) return majors[tag];
  }
  return '相关专业';
}

function getWorkExperience(person) {
  const experiences = {
    '张三': 'XX科技有限公司 - Java开发工程师（3年）',
    '李四': '零工就业 - 仓库管理员（灵活就业）',
    '王五': 'XX建筑公司 - 建筑工人（10年）',
    '赵六': 'XX互联网公司 - AI算法工程师（2年）',
    '孙七': '外卖平台 - 骑手（2年）'
  };
  return experiences[person.name] || '相关工作经验';
}

function getSkillItems(person) {
  const skills = {
    '张三': [['Java', '精通'], ['Spring Boot', '熟练'], ['MySQL', '熟练']],
    '李四': [['仓储管理', '熟练'], ['物流操作', '良好'], ['沟通协调', '良好']],
    '王五': [['建筑施工', '精通'], ['安全管理', '熟练'], ['团队管理', '良好']],
    '赵六': [['Python', '精通'], ['机器学习', '熟练'], ['深度学习', '熟练']],
    '孙七': [['物流配送', '熟练'], ['客户服务', '良好'], ['时间管理', '良好']]
  };
  return (skills[person.name] || [['专业技能', '良好']]).map(([skill, level]) => `
    <div style="display: flex; justify-content: space-between;">
      <span style="font-size: 12px; color: #a0c8e8;">${skill}</span>
      <span style="font-size: 12px; color: #5ae8ff;">${level}</span>
    </div>
  `).join('');
}

function getDifficultyLevel(person) {
  if (person.group === '就业困难人员') return '重点困难';
  if (person.group === '零工人员') return '一般困难';
  if (person.supportIndex && person.supportIndex >= 70) return '需关注';
  return '正常';
}

function getSupportNeeds(person) {
  const needs = {
    '张三': ['岗位推荐', '职业发展指导'],
    '李四': ['技能培训', '就业帮扶', '岗位推荐'],
    '王五': ['维权服务', '技能提升', '岗位推荐'],
    '赵六': ['人才引进政策', '岗位推荐'],
    '孙七': ['灵活就业保障', '职业转型指导']
  };
  return needs[person.name] || ['岗位推荐'];
}
```

- [ ] **Step 4: 测试权限控制功能**

切换不同用户类型（人社部门/服务机构/用工企业），验证权限提示是否正确显示

---

### Task 2: 数据校验Tab交互完善

**Files:**
- Modify: `原型设计/9-employment-portrait.html`

- [ ] **Step 1: 更新数据校验Tab的HTML结构**

```html
<div id="data-tab-verify" style="display: none;">
  <div class="row mb-16">
    <div class="col-4"><div class="stat-card" style="padding: 16px;"><div class="number" style="font-size: 24px;">99.2%</div><div class="label">格式校验通过率</div></div></div>
    <div class="col-4"><div class="stat-card" style="padding: 16px;"><div class="number" style="font-size: 24px;">98.7%</div><div class="label">完整性校验</div></div></div>
    <div class="col-4"><div class="stat-card" style="padding: 16px;"><div class="number" style="font-size: 24px;">97.5%</div><div class="label">去重成功率</div></div></div>
  </div>
  
  <div style="display: flex; gap: 12px; margin-bottom: 24px;">
    <button class="btn btn-primary" onclick="runDataVerification()">🔄 执行校验</button>
    <button class="btn btn-secondary" onclick="viewVerificationHistory()">📋 校验历史</button>
  </div>

  <h4 class="mb-16">校验规则配置</h4>
  <div class="card mb-8" style="padding: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">✅ 身份证号格式校验</div>
        <div style="font-size: 13px; color: var(--text-secondary);">自动校验18位身份证号格式</div>
      </div>
      <label class="form-label" style="margin-bottom: 0;">
        <input type="checkbox" checked style="accent-color: var(--primary);">
      </label>
    </div>
  </div>
  <div class="card mb-8" style="padding: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">✅ 必填字段完整性检查</div>
        <div style="font-size: 13px; color: var(--text-secondary);">检查姓名、身份证号等必填字段</div>
      </div>
      <label class="form-label" style="margin-bottom: 0;">
        <input type="checkbox" checked style="accent-color: var(--primary);">
      </label>
    </div>
  </div>
  <div class="card mb-8" style="padding: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">✅ 重复数据自动去重</div>
        <div style="font-size: 13px; color: var(--text-secondary);">基于身份证号自动识别重复记录</div>
      </div>
      <label class="form-label" style="margin-bottom: 0;">
        <input type="checkbox" checked style="accent-color: var(--primary);">
      </label>
    </div>
  </div>
  <div class="card mb-16" style="padding: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">✅ 异常值检测与标记</div>
        <div style="font-size: 13px; color: var(--text-secondary);">识别年龄、薪资等字段异常值</div>
      </div>
      <label class="form-label" style="margin-bottom: 0;">
        <input type="checkbox" checked style="accent-color: var(--primary);">
      </label>
    </div>
  </div>

  <div id="verify-result" style="display: none;" class="card" style="padding: 16px; border-left: 4px solid var(--success);">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <span style="font-size: 24px;">✅</span>
      <div>
        <div style="font-weight: 600;">校验完成</div>
        <div style="font-size: 13px; color: var(--text-secondary);" id="verify-time"></div>
      </div>
    </div>
    <table class="table" style="font-size: 13px;">
      <thead><tr><th>校验项</th><th>总数</th><th>通过</th><th>失败</th><th>通过率</th></tr></thead>
      <tbody>
        <tr><td>格式校验</td><td>1,234</td><td>1,224</td><td>10</td><td><span style="color: var(--success);">99.2%</span></td></tr>
        <tr><td>完整性校验</td><td>1,234</td><td>1,218</td><td>16</td><td><span style="color: var(--success);">98.7%</span></td></tr>
        <tr><td>去重校验</td><td>1,234</td><td>1,203</td><td>31</td><td><span style="color: var(--success);">97.5%</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 2: 添加runDataVerification函数**

```javascript
function runDataVerification() {
  const result = document.getElementById('verify-result');
  const time = document.getElementById('verify-time');
  time.textContent = `校验时间：${new Date().toLocaleString('zh-CN')}`;
  result.style.display = 'block';
  showNotification('数据校验完成', 'success');
}

function viewVerificationHistory() {
  showNotification('正在加载校验历史...', 'success');
}
```

- [ ] **Step 3: 测试数据校验功能**

点击"执行校验"按钮，验证校验结果是否正确显示

---

### Task 3: 安全管理Tab交互完善

**Files:**
- Modify: `原型设计/9-employment-portrait.html`

- [ ] **Step 1: 更新安全管理Tab的HTML结构**

```html
<div id="data-tab-security" style="display: none;" class="gov-only">
  <div class="mb-16">
    <h4 class="mb-8">数据加密状态</h4>
    <div class="card" style="padding: 16px; background: rgba(82, 196, 26, 0.1); border: 1px solid rgba(82, 196, 26, 0.3);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 600; display: flex; align-items: center; gap: 8px;">🔒 敏感数据已加密存储</div>
          <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">加密方式：AES-256 | 最后更新：2026-05-08 08:00</div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="showNotification('加密状态已验证', 'success')">验证加密</button>
      </div>
    </div>
  </div>
  
  <div class="mb-16">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <h4>访问权限设置</h4>
      <button class="btn btn-primary btn-sm" onclick="showNotification('权限配置已保存', 'success')">保存配置</button>
    </div>
    <div class="card mb-8" style="padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 600;">人社部门</div>
          <div style="font-size: 13px; color: var(--text-secondary);">全部权限（查看/修改/删除/导出）</div>
        </div>
        <span class="badge badge-success">全部权限</span>
      </div>
    </div>
    <div class="card mb-8" style="padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 600;">服务机构</div>
          <div style="font-size: 13px; color: var(--text-secondary);">读取权限（仅查看数据）</div>
        </div>
        <select class="form-select" style="width: auto; padding: 6px 12px; font-size: 13px;" onchange="updateOrgPermission(this)">
          <option value="read">仅读取</option>
          <option value="read-export">读取+导出</option>
        </select>
      </div>
    </div>
    <div class="card" style="padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 600;">用工企业</div>
          <div style="font-size: 13px; color: var(--text-secondary);">仅人才画像数据（脱敏处理）</div>
        </div>
        <select class="form-select" style="width: auto; padding: 6px 12px; font-size: 13px;" onchange="updateEnterprisePermission(this)">
          <option value="talent-only">仅人才画像</option>
          <option value="none">无权限</option>
        </select>
      </div>
    </div>
  </div>
  
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <h4>操作日志（最近5条）</h4>
      <button class="btn btn-secondary btn-sm" onclick="showNotification('日志已导出', 'success')">导出日志</button>
    </div>
    <div class="card mb-8" style="padding: 16px; font-size: 13px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="color: var(--primary);">张三</span>（人社部门）查看了李四的画像
        </div>
        <span style="color: var(--text-tertiary);">2026-05-08 10:30</span>
      </div>
    </div>
    <div class="card mb-8" style="padding: 16px; font-size: 13px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="color: var(--primary);">王五</span>（机构）导出了群体数据
        </div>
        <span style="color: var(--text-tertiary);">2026-05-08 09:15</span>
      </div>
    </div>
    <div class="card mb-8" style="padding: 16px; font-size: 13px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="color: var(--primary);">系统</span> 自动完成数据备份
        </div>
        <span style="color: var(--text-tertiary);">2026-05-08 08:00</span>
      </div>
    </div>
    <div class="card mb-8" style="padding: 16px; font-size: 13px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="color: var(--primary);">赵六</span>（人社部门）修改了标签配置
        </div>
        <span style="color: var(--text-tertiary);">2026-05-08 07:30</span>
      </div>
    </div>
    <div class="card" style="padding: 16px; font-size: 13px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="color: var(--primary);">孙七</span>（企业）查看了张三的人才画像
        </div>
        <span style="color: var(--text-tertiary);">2026-05-08 09:45</span>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加权限更新函数**

```javascript
function updateOrgPermission(select) {
  const value = select.value;
  showNotification(`服务机构权限已更新为：${value === 'read' ? '仅读取' : '读取+导出'}`, 'success');
}

function updateEnterprisePermission(select) {
  const value = select.value;
  showNotification(`用工企业权限已更新为：${value === 'talent-only' ? '仅人才画像' : '无权限'}`, 'success');
}
```

- [ ] **Step 3: 测试安全管理功能**

切换权限配置下拉选择器，验证通知是否正确显示

---

### Task 4: 数据清洗Tab交互完善

**Files:**
- Modify: `原型设计/9-employment-portrait.html`

- [ ] **Step 1: 更新数据清洗Tab的HTML结构**

```html
<div id="data-tab-clean" style="display: none;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <h4>清洗规则配置</h4>
    <div style="display: flex; gap: 12px;">
      <button class="btn btn-secondary" onclick="resetCleanConfig()">🔄 重置默认</button>
      <button class="btn btn-primary" onclick="saveCleanConfig()">💾 保存配置</button>
    </div>
  </div>
  
  <div class="card mb-16" style="padding: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">✅ 自动去重</div>
        <div style="font-size: 13px; color: var(--text-secondary);">基于身份证号和姓名自动识别并合并重复记录</div>
      </div>
      <label class="form-label" style="margin-bottom: 0;">
        <input type="checkbox" checked style="accent-color: var(--primary);" id="clean-dedup">
      </label>
    </div>
  </div>
  
  <div class="card mb-16" style="padding: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">✅ 异常值处理</div>
        <div style="font-size: 13px; color: var(--text-secondary);">识别并标记年龄、薪资等字段的异常值</div>
      </div>
      <label class="form-label" style="margin-bottom: 0;">
        <input type="checkbox" checked style="accent-color: var(--primary);" id="clean-anomaly">
      </label>
    </div>
  </div>
  
  <div class="card mb-16" style="padding: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">✅ 格式标准化</div>
        <div style="font-size: 13px; color: var(--text-secondary);">统一日期格式、学历名称等数据格式</div>
      </div>
      <label class="form-label" style="margin-bottom: 0;">
        <input type="checkbox" checked style="accent-color: var(--primary);" id="clean-format">
      </label>
    </div>
  </div>
  
  <div class="card mb-16" style="padding: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">⚠️ 空值填充（谨慎使用）</div>
        <div style="font-size: 13px; color: var(--text-secondary);">使用默认值填充空字段，可能影响数据准确性</div>
      </div>
      <label class="form-label" style="margin-bottom: 0;">
        <input type="checkbox" style="accent-color: var(--primary);" id="clean-fill">
      </label>
    </div>
  </div>

  <div class="mb-16">
    <h4 class="mb-12">执行数据清洗</h4>
    <div style="background: rgba(22, 119, 255, 0.05); border: 1px solid rgba(22, 119, 255, 0.2); border-radius: var(--radius-md); padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <div style="font-weight: 600; color: var(--primary);">上次清洗：2026-05-08 08:00</div>
          <div style="font-size: 13px; color: var(--text-secondary);">处理记录数：1,234 条 | 清洗成功率：99.1%</div>
        </div>
        <div id="clean-progress" style="display: none;">
          <div style="width: 200px; height: 8px; background: rgba(22, 119, 255, 0.2); border-radius: 4px; overflow: hidden;">
            <div id="clean-progress-bar" style="height: 100%; background: var(--primary); width: 0%; transition: width 0.3s ease;"></div>
          </div>
          <div style="font-size: 12px; color: var(--text-secondary); text-align: center; margin-top: 4px;" id="clean-progress-text"></div>
        </div>
      </div>
      <button class="btn btn-primary" onclick="executeClean()" style="width: 100%;">🚀 立即执行清洗</button>
    </div>
  </div>

  <div id="clean-result" style="display: none;" class="card">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <span style="font-size: 24px;">✅</span>
      <div>
        <div style="font-weight: 600;">清洗完成</div>
        <div style="font-size: 13px; color: var(--text-secondary);">共处理 1,234 条记录</div>
      </div>
    </div>
    <div class="row">
      <div class="col-4"><div class="stat-card" style="padding: 12px;"><div class="number" style="font-size: 20px;">99.1%</div><div class="label">成功率</div></div></div>
      <div class="col-4"><div class="stat-card" style="padding: 12px;"><div class="number" style="font-size: 20px;">12</div><div class="label">去重数量</div></div></div>
      <div class="col-4"><div class="stat-card" style="padding: 12px;"><div class="number" style="font-size: 20px;">8</div><div class="label">异常值标记</div></div></div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加数据清洗函数**

```javascript
function saveCleanConfig() {
  const dedup = document.getElementById('clean-dedup').checked;
  const anomaly = document.getElementById('clean-anomaly').checked;
  const format = document.getElementById('clean-format').checked;
  const fill = document.getElementById('clean-fill').checked;
  
  showNotification(`清洗配置已保存：去重(${dedup}) 异常值(${anomaly}) 格式(${format}) 空值(${fill})`, 'success');
}

function resetCleanConfig() {
  document.getElementById('clean-dedup').checked = true;
  document.getElementById('clean-anomaly').checked = true;
  document.getElementById('clean-format').checked = true;
  document.getElementById('clean-fill').checked = false;
  showNotification('清洗配置已重置为默认值', 'success');
}

function executeClean() {
  const progress = document.getElementById('clean-progress');
  const progressBar = document.getElementById('clean-progress-bar');
  const progressText = document.getElementById('clean-progress-text');
  const result = document.getElementById('clean-result');
  
  result.style.display = 'none';
  progress.style.display = 'block';
  
  let percent = 0;
  const interval = setInterval(() => {
    percent += 10;
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `清洗中... ${percent}%`;
    
    if (percent >= 100) {
      clearInterval(interval);
      progress.style.display = 'none';
      result.style.display = 'block';
      showNotification('数据清洗完成', 'success');
    }
  }, 200);
}
```

- [ ] **Step 3: 测试数据清洗功能**

点击"立即执行清洗"按钮，验证进度条动画和清洗结果是否正确显示

---

### Task 5: 验证所有功能

**Files:**
- Run: Python HTTP Server

- [ ] **Step 1: 启动开发服务器**

```bash
cd /Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景/原型设计
python3 -m http.server 8081
```

- [ ] **Step 2: 验证功能**

1. 用户角色切换器正常工作
2. 权限控制提示正确显示
3. 数据管理模态框四个Tab交互正常
4. 人员详情展示正确

---

## 执行选项

**Plan complete and saved to `docs/superpowers/plans/2026-05-12-employment-portrait-enhancement.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**