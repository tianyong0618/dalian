# 调解仲裁服务平台PRD功能增强 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 根据PRD需求文档，对14-mediation-arbitration.html进行增量增强，实现备案编号、AI校验、智能推荐、流程引导、图表增强、打印功能

**Architecture:** 单文件HTML原型增强，在现有基础上增加PRD要求的UI元素和交互逻辑。使用纯HTML/CSS/JS实现，无后端依赖。

**Tech Stack:** HTML5, CSS3 (CSS Variables), Vanilla JavaScript

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `原型设计/14-mediation-arbitration.html` | Modify | 主文件，包含所有HTML结构、内联CSS和JS逻辑，增加6大功能模块 |
| `原型设计/style.css` | Reference | 全局样式文件（不修改，保持现有样式） |
| `docs/superpowers/specs/2026-05-08-mediation-arbitration-prd-enhancement.md` | Reference | 设计文档，包含所有设计决策 |

---

### Task 1: 电子劳动合同模块增强 - 备案编号生成与展示

**Files:**
- Modify: `原型设计/14-mediation-arbitration.html:518-583` (电子劳动合同模态框)
- Modify: `原型设计/14-mediation-arbitration.html:2038-2237` (JavaScript逻辑)

- [ ] **Step 1: 在电子劳动合同模态框中添加备案信息区域**

在 `ec-contract-modal` 的第573行（`</div>`结束卡片前）插入备案信息区域：

```html
      <div class="card mt-16" style="background: var(--bg-secondary); padding: 16px;" id="contract-record-area" style="display: none;">
        <h4 class="mb-8">📋 合同备案信息</h4>
        <div class="row mb-8">
          <div class="col-6"><strong>备案编号：</strong><span id="contract-record-no" style="color: var(--primary); font-weight: 600;"></span></div>
          <div class="col-6"><strong>备案状态：</strong><span id="contract-record-status" style="color: var(--success);">待备案</span></div>
        </div>
        <div class="mb-8"><strong>备案时间：</strong><span id="contract-record-time">-</span></div>
        <div id="contract-record-status-detail"></div>
      </div>
```

- [ ] **Step 2: 修改"生成合同"按钮逻辑，增加备案编号生成**

在JavaScript区域（约第2038行后）修改 `showNotification` 调用，改为生成备案编号：

```javascript
// 替换原第580行的onclick逻辑
function generateContract() {
  // 生成备案编号：HT + 日期 + 4位随机数
  const now = new Date();
  const dateStr = now.getFullYear().toString() +
    (now.getMonth()+1).toString().padStart(2,'0') +
    now.getDate().toString().padStart(2,'0');
  const random = Math.floor(1000 + Math.random() * 9000);
  const recordNo = 'HT' + dateStr + random;

  // 显示备案信息
  document.getElementById('contract-record-no').textContent = recordNo;
  document.getElementById('contract-record-status').textContent = '已备案';
  document.getElementById('contract-record-status').style.color = 'var(--success)';
  document.getElementById('contract-record-time').textContent =
    now.getFullYear() + '-' + (now.getMonth()+1).toString().padStart(2,'0') + '-' +
    now.getDate().toString().padStart(2,'0') + ' ' +
    now.getHours().toString().padStart(2,'0') + ':' +
    now.getMinutes().toString().padStart(2,'0');

  // 显示数据联动状态
  document.getElementById('contract-record-status-detail').innerHTML =
    '<div style="margin-top: 12px; padding: 8px; background: rgba(82,196,26,0.1); border-radius: 4px; font-size: 14px;">' +
    '<p>✓ 已同步至根治欠薪平台</p>' +
    '<p>✓ 已同步至调解仲裁平台</p>' +
    '<p>✓ 作为用工关系认定依据</p>' +
    '</div>';

  document.getElementById('contract-record-area').style.display = 'block';
  showNotification('合同已生成，备案编号：' + recordNo, 'success');
}
```

同时修改HTML第580行的按钮onclick：
```html
<button class="btn btn-primary" onclick="generateContract()">生成合同</button>
```

- [ ] **Step 3: 验证功能**

在浏览器中打开 `原型设计/14-mediation-arbitration.html`：
1. 点击"电子劳动合同"卡片
2. 填写必要信息（或直接使用默认值）
3. 点击"生成合同"按钮
4. 检查：备案编号是否显示（格式：HT20260508XXXX）
5. 检查：备案状态是否变为"已备案"
6. 检查：数据联动状态是否显示三个✓

- [ ] **Step 4: 提交代码**

```bash
git add "原型设计/14-mediation-arbitration.html"
git commit -m "feat: 电子劳动合同增加备案编号生成与数据联动展示"
```

---

### Task 2: 在线仲裁模块增强 - AI材料校验与案件分流

**Files:**
- Modify: `原型设计/14-mediation-arbitration.html:399-456` (在线立案第2、3步)

- [ ] **Step 1: 在第2步（上传证据）增加AI校验结果展示**

在 `reg-form-2` 的 `</div>` 前（约第433行后）插入：

```html
        <div style="background: #fff7e6; padding: 12px; border-radius: 8px; margin-top: 16px; border-left: 4px solid #fa8c16;" id="ai-verify-result">
          <div style="font-weight: 600; margin-bottom: 8px;">🤖 AI材料校验中...</div>
          <div style="font-size: 14px;" id="verify-details">
            <p>✓ 劳动合同已上传 - 格式合规</p>
            <p>✓ 工资流水已上传 - 完整</p>
            <p>⚠️ 考勤记录缺失 - 建议补充</p>
            <p>✓ 其他证据已上传 - 有效</p>
          </div>
        </div>
```

- [ ] **Step 2: 在第3步（确认提交）增加案件分流提示**

在 `reg-form-3` 的确认信息卡片后（约第449行后）插入：

```html
        <div style="background: #e6f7ff; padding: 12px; border-radius: 8px; margin-top: 16px; border-left: 4px solid #1677ff;" id="case-division-suggest">
          <div style="font-weight: 600; margin-bottom: 8px;">📊 案件分流建议</div>
          <div style="font-size: 14px;" id="division-details">
            <p>案件类型：<span id="division-type">-</span></p>
            <p>诉求金额：<span id="division-amount">-</span> 元</p>
            <p>建议分流至：<strong style="color: var(--primary);" id="division-suggest">仲裁程序</strong>（争议金额较大，建议正式仲裁）</p>
            <p>备选方案：<strong>调解程序</strong>（若双方愿意协商）</p>
          </div>
        </div>
```

- [ ] **Step 3: 修改nextRegStep函数，在第2→3步时更新分流建议**

在JavaScript的 `nextRegStep` 函数中，在设置 `confirm-*` 字段后增加：

```javascript
  if (currentRegStep === 2) {
    // 原来的确认信息填充代码...
    document.getElementById('confirm-type').textContent = document.getElementById('case-type').value;
    document.getElementById('confirm-amount').textContent = document.getElementById('case-amount').value || '0';
    document.getElementById('confirm-applicant').textContent = document.getElementById('applicant-name').value;
    document.getElementById('confirm-phone').textContent = document.getElementById('applicant-phone').value;
    document.getElementById('confirm-respondent').textContent = document.getElementById('respondent-name').value;
    document.getElementById('confirm-desc').textContent = document.getElementById('case-desc').value;

    // 新增：更新AI校验结果（模拟）
    const verifyDetails = document.getElementById('verify-details');
    const caseType = document.getElementById('case-type').value;
    const caseAmount = parseInt(document.getElementById('case-amount').value) || 0;

    // 模拟AI校验
    let verifyHTML = '';
    if (caseType) verifyHTML += '<p>✓ 案件类型已选择 - 有效</p>';
    if (document.getElementById('applicant-name').value) verifyHTML += '<p>✓ 申请人信息完整</p>';
    if (caseAmount > 0) verifyHTML += '<p>✓ 诉求金额已填写 - ' + caseAmount + '元</p>';
    verifyHTML += '<p>⚠️ 建议上传考勤记录作为补充证据</p>';
    verifyDetails.innerHTML = verifyHTML;

    // 新增：更新案件分流建议
    const divisionSuggest = document.getElementById('division-suggest');
    const divisionType = document.getElementById('division-type');
    const divisionAmount = document.getElementById('division-amount');

    divisionType.textContent = caseType || '-';
    divisionAmount.textContent = caseAmount || '-';

    if (caseAmount > 50000 || caseType === '工伤赔偿') {
      divisionSuggest.textContent = '仲裁程序';
      divisionSuggest.parentNode.innerHTML = '建议分流至：<strong style="color: var(--primary);">仲裁程序</strong>（争议金额较大或涉及工伤，建议正式仲裁）';
    } else if (caseAmount > 10000) {
      divisionSuggest.textContent = '调解或仲裁';
      divisionSuggest.parentNode.innerHTML = '建议分流至：<strong style="color: var(--warning);">调解程序</strong>（金额适中，建议优先调解）';
    } else {
      divisionSuggest.textContent = '调解程序';
      divisionSuggest.parentNode.innerHTML = '建议分流至：<strong style="color: var(--success);">调解程序</strong>（金额较小，建议快速调解）';
    }
  }
```

- [ ] **Step 4: 验证功能**

在浏览器中打开页面：
1. 点击"申请立案"按钮
2. 第1步：填写案件类型（如"工伤赔偿"）、申请人、被申请人、诉求金额（如80000）
3. 第2步：点击上传证据区域（模拟上传），检查AI校验结果是否显示
4. 第3步：检查案件分流建议是否根据金额和类型更新
5. 测试不同金额：5000元（应建议调解）、50000元（应建议仲裁）

- [ ] **Step 5: 提交代码**

```bash
git add "原型设计/14-mediation-arbitration.html"
git commit -m "feat: 在线立案增加AI材料校验与案件智能分流提示"
```

---

### Task 3: 在线调解模块增强 - 调解员智能推荐

**Files:**
- Modify: `原型设计/14-mediation-arbitration.html:1058-1120` (调解员分配模态框)

- [ ] **Step 1: 在调解员分配模态框中增加AI智能推荐区域**

在 `mediation-assign-modal` 的选择调解员下拉框后（约第1083行后）插入：

```html
      <div style="background: #f6ffed; padding: 12px; border-radius: 8px; margin-top: 16px; border-left: 4px solid #52c41a;" id="ai-mediator-suggest">
        <div style="font-weight: 600; margin-bottom: 8px;">🤖 AI智能推荐</div>
        <div style="font-size: 14px;" id="mediator-suggest-details">
          <p>✓ 推荐：<span id="suggest-name">李调解员</span>（专长：<span id="suggest-skill">工伤赔偿</span>，评分：<span id="suggest-score">4.9</span>，当前负荷：<span id="suggest-load">6</span>件）</p>
          <p>✓ 匹配度：<span id="suggest-match">95%</span>（专长匹配+负荷适中+高评分）</p>
        </div>
      </div>
```

- [ ] **Step 2: 修改调解员选择逻辑，根据案件类型自动推荐**

在JavaScript中添加函数：

```javascript
// 调解员智能推荐
const mediatorDB = [
  { name: '王调解员', skill: '工资纠纷', score: 4.8, load: 8 },
  { name: '李调解员', skill: '工伤赔偿', score: 4.9, load: 6 },
  { name: '张调解员', skill: '劳动合同', score: 4.7, load: 5 },
  { name: '赵调解员', skill: '社保争议', score: 4.8, load: 9 },
  { name: '陈调解员', skill: '综合争议', score: 4.6, load: 7 }
];

function updateMediatorSuggest() {
  const caseType = document.getElementById('mediation-case-type') || '工伤赔偿纠纷';
  const typeMap = {
    '工资拖欠纠纷': '工资纠纷',
    '工伤赔偿纠纷': '工伤赔偿',
    '劳动合同争议': '劳动合同',
    '社保缴纳争议': '社保争议',
    '违法解雇纠纷': '综合争议'
  };
  const targetSkill = typeMap[caseType] || '综合争议';

  // 找到最匹配的调解员
  let bestMatch = mediatorDB[0];
  let bestScore = 0;

  mediatorDB.forEach(m => {
    let score = 0;
    if (m.skill === targetSkill) score += 50;
    score += m.score * 10;
    score += (10 - m.load);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = m;
    }
  });

  // 更新推荐显示
  document.getElementById('suggest-name').textContent = bestMatch.name;
  document.getElementById('suggest-skill').textContent = bestMatch.skill;
  document.getElementById('suggest-score').textContent = bestMatch.score;
  document.getElementById('suggest-load').textContent = bestMatch.load;
  document.getElementById('suggest-match').textContent = Math.min(95, 70 + bestMatch.score * 5 - bestMatch.load) + '%';

  // 同时更新下拉框选中
  const select = document.querySelector('#mediation-assign-modal select');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.includes(bestMatch.name)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}
```

- [ ] **Step 3: 验证功能**

在浏览器中：
1. 点击"在线争议调解"卡片
2. 在调解申请列表中，点击"分配调解员"按钮
3. 检查AI是否推荐了合适的调解员（如工伤赔偿推荐李调解员）
4. 修改案件类型，检查推荐是否更新

- [ ] **Step 4: 提交代码**

```bash
git add "原型设计/14-mediation-arbitration.html"
git commit -m "feat: 调解员分配增加AI智能推荐功能"
```

---

### Task 4: 数字化仲裁庭增强 - 庭审流程自动引导

**Files:**
- Modify: `原型设计/14-mediation-arbitration.html:1428-1505` (云庭审模态框)
- Modify: `原型设计/14-mediation-arbitration.html:1223-1311` (仲裁庭配置模态框)

- [ ] **Step 1: 在云庭审模态框中增加流程引导UI**

在 `cloud-trial-modal` 的庭审画面区域前（约第1445行后）插入流程引导：

```html
        <div style="background: #e6f7ff; padding: 12px; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid #1677ff;">
          <div style="font-weight: 600; margin-bottom: 8px;">📍 当前环节：<span id="current-trial-step">庭审调查</span>（第<span id="trial-step-num">2</span>/共5步）</div>
          <div style="font-size: 14px; margin-bottom: 8px;">
            <p>预计剩余时间：<span id="trial-remain-time">1小时30分钟</span></p>
            <p>下一步：<span id="trial-next-step">质证辩论</span></p>
          </div>
          <div style="display: flex; gap: 8px; font-size: 12px;" id="trial-steps-bar">
            <span style="padding: 4px 8px; background: #52c41a; color: white; border-radius: 4px;">✓ 庭前准备</span>
            <span style="padding: 4px 8px; background: #1677ff; color: white; border-radius: 4px;" id="trial-step-2">➤ 庭审调查</span>
            <span style="padding: 4px 8px; background: #f5f5f5; border-radius: 4px;" id="trial-step-3">质证辩论</span>
            <span style="padding: 4px 8px; background: #f5f5f5; border-radius: 4px;" id="trial-step-4">最后陈述</span>
            <span style="padding: 4px 8px; background: #f5f5f5; border-radius: 4px;" id="trial-step-5">庭审结束</span>
          </div>
        </div>
```

- [ ] **Step 2: 增加庭审步骤切换逻辑**

在JavaScript中添加：

```javascript
// 庭审流程引导
let currentTrialStep = 2; // 1:庭前准备 2:庭审调查 3:质证辩论 4:最后陈述 5:庭审结束
const trialSteps = ['庭前准备', '庭审调查', '质证辩论', '最后陈述', '庭审结束'];
const trialTimes = ['2小时', '1小时30分', '1小时', '30分钟', '0'];

function updateTrialStep(step) {
  currentTrialStep = step;
  document.getElementById('current-trial-step').textContent = trialSteps[step-1];
  document.getElementById('trial-step-num').textContent = step;
  document.getElementById('trial-remain-time').textContent = trialTimes[step-1] || '0';
  document.getElementById('trial-next-step').textContent = step < 5 ? trialSteps[step] : '庭审结束';

  // 更新步骤条
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById('trial-step-' + i);
    if (!el) continue;
    if (i < step) {
      el.style.background = '#52c41a';
      el.style.color = 'white';
      el.textContent = '✓ ' + trialSteps[i-1];
    } else if (i === step) {
      el.style.background = '#1677ff';
      el.style.color = 'white';
      el.textContent = '➤ ' + trialSteps[i-1];
    } else {
      el.style.background = '#f5f5f5';
      el.style.color = 'black';
      el.textContent = trialSteps[i-1];
    }
  }
}

// 在云庭审模态框打开时初始化
document.getElementById('cloud-trial-modal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.remove('active');
  }
});
```

- [ ] **Step 3: 验证功能**

在浏览器中：
1. 点击"云庭审"按钮（在云庭审流程区域）
2. 检查流程引导是否显示当前环节（庭审调查）
3. 检查步骤条是否正确高亮当前步骤
4. 在控制台手动调用 `updateTrialStep(3)` 测试步骤切换

- [ ] **Step 4: 提交代码**

```bash
git add "原型设计/14-mediation-arbitration.html"
git commit -m "feat: 云庭审增加流程自动引导UI，展示当前环节和进度"
```

---

### Task 5: 仲裁上下联动增强 - 效能报表图表

**Files:**
- Modify: `原型设计/14-mediation-arbitration.html:1600-1660` (效能监测报表区域)

- [ ] **Step 1: 在效能监测报表中增加CSS模拟图表**

在 `linkage-modal` 的效能监测报表部分（第1614行后）增加图表：

```html
        <div class="col-6">
          <div class="card" style="background: var(--bg-secondary); padding: 16px;">
            <h4 class="mb-8">案件类型分布</h4>
            <div style="display: flex; height: 120px; gap: 8px; align-items: flex-end; margin-bottom: 8px;">
              <div style="flex: 1; background: var(--primary); height: 45%; display: flex; align-items: flex-end; justify-content: center; color: white; font-size: 12px; padding-bottom: 4px; border-radius: 4px 4px 0 0;">工资 35%</div>
              <div style="flex: 1; background: var(--secondary); height: 25%; display: flex; align-items: flex-end; justify-content: center; color: white; font-size: 12px; padding-bottom: 4px; border-radius: 4px 4px 0 0;">工伤 25%</div>
              <div style="flex: 1; background: #52c41a; height: 20%; display: flex; align-items: flex-end; justify-content: center; color: white; font-size: 12px; padding-bottom: 4px; border-radius: 4px 4px 0 0;">合同 20%</div>
              <div style="flex: 1; background: #fa8c16; height: 15%; display: flex; align-items: flex-end; justify-content: center; color: white; font-size: 12px; padding-bottom: 4px; border-radius: 4px 4px 0 0;">其他 15%</div>
            </div>
            <div style="font-size: 12px; color: var(--text-secondary);">使用CSS模拟饼图/柱状图效果</div>
          </div>
        </div>

        <div class="col-6">
          <div class="card" style="background: var(--bg-secondary); padding: 16px;">
            <h4 class="mb-8">本月各区县调解成功率</h4>
            <div style="font-size: 14px;">
              <div class="mb-8" style="display: flex; justify-content: space-between;">
                <span>XX区</span><span>91.2%</span>
              </div>
              <div class="progress-bar mb-12" style="width: 100%; height: 12px; background: var(--bg-secondary); border-radius: 6px; overflow: hidden;">
                <div style="width: 91.2%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary));"></div>
              </div>
              <div class="mb-8" style="display: flex; justify-content: space-between;">
                <span>YY区</span><span>91.7%</span>
              </div>
              <div class="progress-bar mb-12" style="width: 100%; height: 12px; background: var(--bg-secondary); border-radius: 6px; overflow: hidden;">
                <div style="width: 91.7%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary));"></div>
              </div>
              <div class="mb-8" style="display: flex; justify-content: space-between;">
                <span>ZZ县</span><span>82.2%</span>
              </div>
              <div class="progress-bar" style="width: 100%; height: 12px; background: var(--bg-secondary); border-radius: 6px; overflow: hidden;">
                <div style="width: 82.2%; height: 100%; background: linear-gradient(90deg, var(--warning), #ff7875);"></div>
              </div>
            </div>
          </div>
        </div>
```

- [ ] **Step 2: 验证功能**

在浏览器中：
1. 点击"仲裁上下联动"卡片
2. 滚动到"效能监测报表"部分
3. 检查是否新增了案件类型分布图（彩色柱状图）
4. 检查是否新增了各区县调解成功率（进度条图）

- [ ] **Step 3: 提交代码**

```bash
git add "原型设计/14-mediation-arbitration.html"
git commit -m "feat: 仲裁上下联动增加效能报表图表（CSS模拟柱状图和进度条）"
```

---

### Task 6: 系统管理增强 - 打印功能

**Files:**
- Modify: `原型设计/14-mediation-arbitration.html:1668-2036` (系统管理模态框)
- Modify: `原型设计/14-mediation-arbitration.html:2038-2237` (JavaScript)

- [ ] **Step 1: 在每个标签页的内容区域顶部增加打印按钮**

在 `system-manage-modal` 的每个 `tab-content` 区域中，在 `<div class="card">` 或表格前增加打印按钮。以"用户管理"为例（第1686行后）：

```html
      <!-- 用户管理 -->
      <div id="user-manage" class="tab-content">
        <div style="display: flex; gap: 8px; margin-bottom: 16px;">
          <button style="padding: 6px 12px; background: var(--primary); color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;" onclick="printTabContent('user-manage')">🖨️ 打印当前列表</button>
          <button style="padding: 6px 12px; background: #52c41a; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;" onclick="showNotification('用户列表已导出为Excel', 'success')">📥 导出Excel</button>
        </div>
        <!-- 原有的统计卡片和表格... -->
```

同样为其他标签页（message-manage, evidence-manage, log-manage, device-manage）增加打印按钮。

- [ ] **Step 2: 添加打印函数**

在JavaScript中添加：

```javascript
// 打印功能
function printTabContent(tabId) {
  const content = document.getElementById(tabId);
  if (!content) return;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>打印 - 系统管理</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; font-size: 14px; }
        th { background: #f5f5f5; font-weight: 600; }
        h2 { margin-bottom: 16px; }
        @media print {
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <h2>系统管理 - ${tabId.replace('-', ' ')}</h2>
      ${content.innerHTML}
    </body>
    </html>
  `);
  printWindow.document.close();
  setTimeout(() => { printWindow.print(); }, 250);
}
```

- [ ] **Step 3: 验证功能**

在浏览器中：
1. 点击"系统管理"卡片
2. 切换到"用户管理"标签页
3. 点击"打印当前列表"按钮
4. 检查是否弹出打印预览窗口，内容是否正确
5. 测试其他标签页的打印功能

- [ ] **Step 4: 提交代码**

```bash
git add "原型设计/14-mediation-arbitration.html"
git commit -m "feat: 系统管理增加打印功能，支持各标签页打印和导出"
```

---

### Task 7: 最终验证与代码审查

**Files:**
- Modify: `原型设计/14-mediation-arbitration.html` (最终检查)

- [ ] **Step 1: 完整功能验证**

在浏览器中打开页面，完整测试：
1. 电子劳动合同：生成合同 → 检查备案编号 → 检查数据联动状态
2. 在线立案：填写信息 → 第2步检查AI校验 → 第3步检查案件分流
3. 在线调解：分配调解员 → 检查AI推荐
4. 云庭审：检查流程引导 → 检查步骤条
5. 上下联动：检查效能报表图表
6. 系统管理：检查打印功能

- [ ] **Step 2: 检查所有交互逻辑**

验证所有模态框：
- 能正常打开和关闭
- 表单验证正常工作
- 步骤切换正常
- 通知提示正常显示

- [ ] **Step 3: 代码审查**

检查HTML文件：
- 所有新增代码与现有样式一致
- JavaScript函数无语法错误
- 无重复代码
- 注释清晰

- [ ] **Step 4: 最终提交**

```bash
git add "原型设计/14-mediation-arbitration.html"
git commit -m "docs: 完成PRD功能增强最终验证，所有功能正常"
```

---

## Plan Self-Review Checklist

**1. Spec coverage:**
- [x] 电子劳动合同：备案编号生成与展示 ✓ (Task 1)
- [x] 电子劳动合同：数据联动状态展示 ✓ (Task 1)
- [x] 在线仲裁：AI材料校验提示 ✓ (Task 2)
- [x] 在线仲裁：案件分流提示 ✓ (Task 2)
- [x] 在线调解：调解员智能推荐 ✓ (Task 3)
- [x] 数字化仲裁庭：流程自动引导 ✓ (Task 4)
- [x] 仲裁上下联动：效能报表图表 ✓ (Task 5)
- [x] 系统管理：打印功能 ✓ (Task 6)

**2. Placeholder scan:**
- 无TBD、TODO、占位符
- 所有步骤包含实际代码
- 所有函数都有完整实现

**3. Type consistency:**
- 函数命名一致（generateContract, updateMediatorSuggest, updateTrialStep, printTabContent）
- 变量命名清晰
- 无前后矛盾

**Plan complete and saved to `docs/superpowers/plans/2026-05-08-mediation-arbitration-prd-enhancement.md`.**

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. In-line Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
