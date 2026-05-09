# 就业人员画像详情页全屏设计 - 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将就业人员画像的"详情"按钮弹窗改为全屏展示，合并求职者画像和人才画像为一个统一页面，所有内容在一页中按区块展示。

**Architecture:** 修改 `9-employment-portrait.html`，将现有的 `person-detail-modal` 模态框替换为新的全屏容器布局。移除Tab切换，采用Grid布局从上到下展示：顶部基本信息+指标、第2行服务推荐、中部就业信息+标签云、底部AI分析洞察。

**Tech Stack:** HTML, CSS, JavaScript（现有技术栈）

---

## 文件结构

**修改文件:**
- `/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景/原型设计/9-employment-portrait.html` (第845-928行的模态框 + 第1069-1135行的JS函数)

---

## Task 1: 创建全屏详情页容器和基础样式

**Files:**
- Modify: `9-employment-portrait.html` - 在 `</body>` 前添加全屏容器

- [ ] **Step 1: 添加全屏容器HTML**

在 `</body>` 前添加新的全屏详情页容器：

```html
<!-- 全屏详情页 -->
<div class="detail-fullscreen" id="person-detail-fullscreen" style="display: none;">
  <div class="detail-fullscreen-header">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn btn-secondary btn-sm" onclick="closeDetailFullscreen()">← 返回列表</button>
        <h2 id="detail-fullscreen-title" style="margin: 0;">张三 的画像详情</h2>
      </div>
      <div style="display: flex; gap: 12px;">
        <button class="btn btn-primary btn-sm" onclick="showModal('job-recommend-modal')">查看推荐岗位</button>
        <button class="btn btn-secondary btn-sm" onclick="closeDetailFullscreen()">关闭</button>
      </div>
    </div>
  </div>

  <div class="detail-fullscreen-body">
    <div class="container">
      <!-- 第1行：基本信息 + 核心指标 -->
      <div class="detail-row mb-32">
        <!-- 左侧：人员基本信息 -->
        <div class="detail-col-left">
          <div class="card" style="height: 100%;">
            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: var(--text-primary);">📋 人员基本信息</h3>
            <div class="detail-info-grid">
              <div class="detail-info-item">
                <span class="detail-info-label">姓名</span>
                <span class="detail-info-value" id="df-name">-</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-info-label">身份证</span>
                <span class="detail-info-value" id="df-idcard">-</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-info-label">学历</span>
                <span class="detail-info-value" id="df-education">-</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-info-label">群体类型</span>
                <span class="detail-info-value" id="df-group">-</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-info-label">联系方式</span>
                <span class="detail-info-value" id="df-phone">-</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-info-label">求职状态</span>
                <span class="detail-info-value" id="df-status">-</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：核心评估指标 -->
        <div class="detail-col-right">
          <div class="card" style="height: 100%;">
            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: var(--text-primary);">📊 核心评估指标</h3>
            <div class="detail-metrics-grid">
              <div class="detail-metric-item">
                <div class="detail-metric-number" id="df-metric-competitiveness">0%</div>
                <div class="detail-metric-label">教育竞争力</div>
              </div>
              <div class="detail-metric-item">
                <div class="detail-metric-number" id="df-metric-stability">0%</div>
                <div class="detail-metric-label">就业稳定性</div>
              </div>
              <div class="detail-metric-item">
                <div class="detail-metric-number" id="df-metric-skill">0%</div>
                <div class="detail-metric-label">职业技能</div>
              </div>
              <div class="detail-metric-item">
                <div class="detail-metric-number" id="df-metric-support">0%</div>
                <div class="detail-metric-label">帮扶指数</div>
              </div>
              <div class="detail-metric-item">
                <div class="detail-metric-number" id="df-metric-salary">0%</div>
                <div class="detail-metric-label">薪资趋势</div>
              </div>
              <div class="detail-metric-item">
                <div class="detail-metric-number" id="df-metric-match">0%</div>
                <div class="detail-metric-label">意向匹配度</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第2行：个性化服务推荐 -->
      <div class="detail-row mb-32">
        <div class="detail-col-full">
          <div class="card">
            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: var(--text-primary);">🎯 个性化服务推荐</h3>
            <div id="df-services" class="detail-services-grid">
              <!-- 动态生成 -->
            </div>
          </div>
        </div>
      </div>

      <!-- 第3行：中部区块 -->
      <div class="detail-row mb-32">
        <!-- 左侧：就业信息 -->
        <div class="detail-col-left">
          <div class="card" style="height: 100%;">
            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: var(--text-primary);">💼 就业信息</h3>
            <div class="detail-info-grid">
              <div class="detail-info-item">
                <span class="detail-info-label">当前公司</span>
                <span class="detail-info-value" id="df-company">-</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-info-label">职位</span>
                <span class="detail-info-value" id="df-position">-</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-info-label">薪资水平</span>
                <span class="detail-info-value" id="df-salary">-</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-info-label">合同类型</span>
                <span class="detail-info-value" id="df-contract">-</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-info-label">工作年限</span>
                <span class="detail-info-value" id="df-workyears">-</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-info-label">入离职记录</span>
                <span class="detail-info-value" id="df-workhistory">-</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：动态标签云 -->
        <div class="detail-col-right">
          <div class="card" style="height: 100%;">
            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--text-primary);">🏷️ 动态标签</h3>
            <div id="df-tags" class="detail-tags-container">
              <!-- 6个分类标签聚合展示 -->
              <div class="detail-tag-section" data-category="basic">
                <div class="detail-tag-category-title">📋 基础信息</div>
                <div class="detail-tag-list"></div>
              </div>
              <div class="detail-tag-section" data-category="education">
                <div class="detail-tag-category-title">🎓 教育特征</div>
                <div class="detail-tag-list"></div>
              </div>
              <div class="detail-tag-section" data-category="employment">
                <div class="detail-tag-category-title">💼 就业特征</div>
                <div class="detail-tag-list"></div>
              </div>
              <div class="detail-tag-section" data-category="skill">
                <div class="detail-tag-category-title">⚡ 技能标签</div>
                <div class="detail-tag-list"></div>
              </div>
              <div class="detail-tag-section" data-category="support">
                <div class="detail-tag-category-title">🆘 帮扶标签</div>
                <div class="detail-tag-list"></div>
              </div>
              <div class="detail-tag-section" data-category="intent">
                <div class="detail-tag-category-title">🎯 意向标签</div>
                <div class="detail-tag-list"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第4行：底部AI分析洞察 -->
      <div class="detail-row mb-32">
        <div class="detail-col-full">
          <div class="card" style="background: linear-gradient(135deg, rgba(22, 119, 255, 0.05) 0%, rgba(114, 46, 209, 0.05) 100%); border: 1px solid rgba(22, 119, 255, 0.2);">
            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: var(--primary);">🤖 AI分析洞察</h3>
            <div class="detail-ai-grid">
              <div class="detail-ai-item">
                <div class="detail-ai-icon">📝</div>
                <div class="detail-ai-content">
                  <div class="detail-ai-title">画像分析小结</div>
                  <div class="detail-ai-text" id="df-ai-summary">-</div>
                </div>
              </div>
              <div class="detail-ai-item">
                <div class="detail-ai-icon">📈</div>
                <div class="detail-ai-content">
                  <div class="detail-ai-title">AI预测</div>
                  <div class="detail-ai-text" id="df-ai-prediction">-</div>
                </div>
              </div>
              <div class="detail-ai-item">
                <div class="detail-ai-icon">💡</div>
                <div class="detail-ai-content">
                  <div class="detail-ai-title">就业建议</div>
                  <div class="detail-ai-text" id="df-ai-suggestion">-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 添加全屏样式**

在 `style.css` 中添加（检查现有样式文件位置）：

```css
/* 全屏详情页样式 */
.detail-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-primary);
  z-index: 1000;
  overflow-y: auto;
}

.detail-fullscreen-header {
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid var(--border-color);
  padding: 16px 0;
  z-index: 10;
}

.detail-fullscreen-body {
  padding: 32px 0;
}

.detail-row {
  display: grid;
  gap: 24px;
}

.detail-col-left {
  /* 基本信息/就业信息列 */
}

.detail-col-right {
  /* 指标/标签列 */
}

.detail-col-full {
  /* 全宽 */
}

/* 2列布局：左侧1/3 右侧2/3 */
.detail-row:first-of-type .detail-row {
  grid-template-columns: 1fr 2fr;
}

/* 服务推荐/AI分析全宽 */
.detail-row .detail-col-full {
  grid-template-columns: 1fr;
}

/* 信息网格 */
.detail-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.detail-info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-info-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.detail-info-value {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
}

/* 指标网格 */
.detail-metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.detail-metric-item {
  text-align: center;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
}

.detail-metric-number {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.detail-metric-label {
  font-size: 12px;
  color: var(--text-secondary);
}

/* 服务推荐网格 */
.detail-services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.detail-service-card {
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.detail-service-card:hover {
  background: rgba(22, 119, 255, 0.1);
}

/* 标签容器 */
.detail-tags-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
}

.detail-tag-section {
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
}

.detail-tag-category-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.detail-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* AI分析网格 */
.detail-ai-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.detail-ai-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: var(--radius-sm);
}

.detail-ai-icon {
  font-size: 24px;
}

.detail-ai-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.detail-ai-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .detail-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .detail-services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .detail-ai-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Task 2: 更新JavaScript逻辑

**Files:**
- Modify: `9-employment-portrait.html` - 更新JS函数

- [ ] **Step 1: 添加全屏开关函数**

在 `<script>` 标签末尾添加：

```javascript
// 全屏详情页控制
function openDetailFullscreen(index) {
  const person = personData[index];
  if (!person) return;

  // 更新标题
  document.getElementById('detail-fullscreen-title').textContent = person.name + ' 的画像详情';

  // 更新基本信息
  document.getElementById('df-name').textContent = person.name;
  document.getElementById('df-idcard').textContent = person.idCard;
  document.getElementById('df-education').textContent = person.education;
  document.getElementById('df-group').innerHTML = `<span class="badge badge-info">${person.group}</span>`;
  document.getElementById('df-phone').textContent = person.phone || '138****5678';
  document.getElementById('df-status').textContent = person.status || '求职中';

  // 更新核心指标
  document.getElementById('df-metric-competitiveness').textContent = person.competitiveness + '%';
  document.getElementById('df-metric-stability').textContent = person.stability + '%';
  document.getElementById('df-metric-skill').textContent = person.skill + '%';
  document.getElementById('df-metric-support').textContent = (person.supportIndex || 65) + '%';
  document.getElementById('df-metric-salary').textContent = (person.salaryTrend || 71) + '%';
  document.getElementById('df-metric-match').textContent = (person.match || 88) + '%';

  // 更新就业信息
  document.getElementById('df-company').textContent = person.company || 'XX科技有限公司';
  document.getElementById('df-position').textContent = person.position || '软件工程师';
  document.getElementById('df-salary').textContent = person.salary || person.salaryExp + '/月' || '12K-18K/月';
  document.getElementById('df-contract').textContent = person.contract || '正式合同';
  document.getElementById('df-workyears').textContent = person.workYears || '3年';
  document.getElementById('df-workhistory').textContent = person.workHistory || '2021-至今：XX科技';

  // 更新服务推荐
  const servicesHtml = (person.services || []).map(s => `
    <div class="detail-service-card">${s}</div>
  `).join('');
  document.getElementById('df-services').innerHTML = servicesHtml || '<div class="text-small">暂无推荐服务</div>';

  // 更新标签（按分类聚合）
  updateDetailTags(person.tags);

  // 更新AI分析
  document.getElementById('df-ai-summary').textContent = person.aiSummary || `该人员为${person.group}，教育竞争力${person.competitiveness}%，就业稳定性${person.stability}%，建议重点关注技能培训和岗位匹配。`;
  document.getElementById('df-ai-prediction').textContent = person.aiPrediction || `基于历史数据分析，预计就业率将${person.stability > 70 ? '上升' : '保持稳定'}趋势，建议持续跟踪服务。`;
  document.getElementById('df-ai-suggestion').textContent = person.aiSuggestion || `建议参加Java进阶培训课程，提升职业技能评分至85%以上，可获得更高匹配度岗位。`;

  // 显示全屏详情页
  document.getElementById('person-detail-fullscreen').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeDetailFullscreen() {
  document.getElementById('person-detail-fullscreen').style.display = 'none';
  document.body.style.overflow = '';
}

function updateDetailTags(tags) {
  // 标签分类映射
  const categoryMap = {
    'basic': ['本地户籍', '年龄：25-35岁'],
    'education': ['本科及以上', '计算机专业', '教育竞争力：高'],
    'employment': ['社保连续缴纳', '就业稳定性：高', '工作年限：3-5年'],
    'skill': ['Java开发', 'Python', 'SQL'],
    'support': ['就业困难人员', '帮扶等级：C级', '需技能培训'],
    'intent': ['求职意向：互联网', '薪资期望：15-20K', '工作地点：本地']
  };

  // 清空所有标签
  document.querySelectorAll('.detail-tag-section').forEach(section => {
    section.querySelector('.detail-tag-list').innerHTML = '';
  });

  // 填充标签
  if (tags && tags.length > 0) {
    // 简单分配：将标签分布到各分类
    tags.forEach((tag, index) => {
      const categories = ['basic', 'education', 'employment', 'skill', 'support', 'intent'];
      const cat = categories[index % categories.length];
      const section = document.querySelector(`.detail-tag-section[data-category="${cat}"]`);
      if (section) {
        const tagHtml = `<span class="tag" style="font-size: 12px;">${tag}</span>`;
        section.querySelector('.detail-tag-list').insertAdjacentHTML('beforeend', tagHtml);
      }
    });
  } else {
    // 无标签时显示默认
    Object.keys(categoryMap).forEach(cat => {
      const section = document.querySelector(`.detail-tag-section[data-category="${cat}"]`);
      if (section && categoryMap[cat]) {
        categoryMap[cat].forEach(tag => {
          const tagHtml = `<span class="tag" style="font-size: 12px;">${tag}</span>`;
          section.querySelector('.detail-tag-list').insertAdjacentHTML('beforeend', tagHtml);
        });
      }
    });
  }
}
```

- [ ] **Step 2: 更新viewPersonDetail函数**

修改 `viewPersonDetail` 函数，改为调用全屏版本：

```javascript
// 查看人员详情（改为调用全屏版本）
function viewPersonDetail(index) {
  openDetailFullscreen(index);
}
```

- [ ] **Step 3: 添加模拟数据扩展**

在 `personData` 数组中添加新字段：

```javascript
const personData = [
  { 
    name: "张三", 
    idCard: "410xxxxxxxxxxxx1234", 
    group: "高校毕业生", 
    education: "本科", 
    portraitType: "talent", 
    competitiveness: 88, 
    stability: 78, 
    skill: 82, 
    match: 91, 
    salaryExp: "15K", 
    phone: "138****1234",
    status: "在职",
    company: "XX科技有限公司",
    position: "高级Java开发",
    salary: "15K-20K/月",
    contract: "正式合同",
    workYears: "3年",
    workHistory: "2021-至今：XX科技 | 2018-2021：YY软件",
    tags: ["Java开发", "本科及以上", "3年经验", "社保连续缴纳", "求职意向：互联网", "高技能人才"],
    services: ["📩 推荐岗位：高级Java开发（98%）", "📚 推荐培训：Java进阶（免费）", "💰 可申请补贴：2000元", "🎓 职业路径：Java→专家→架构师"],
    aiSummary: "该人员为高校毕业生就业群体中的优秀人才，教育竞争力达88%，职业技能评分82%，具有较强的学习能力和技术积累。",
    aiPrediction: "基于近3年就业数据分析，该人员薪资水平预计年增长10-15%，晋升至技术专家概率较高。",
    aiSuggestion: "建议参加技术项目管理培训，拓展技术视野；可申请参加行业技术峰会，提升行业影响力。"
  },
  // ... 其他人员数据类似扩展
];
```

---

## Task 3: 清理旧模态框（可选）

**Files:**
- Modify: `9-employment-portrait.html` - 删除旧模态框HTML

- [ ] **Step 1: 删除旧模态框HTML**

删除第845-928行的旧模态框：

```html
<!-- 删除以下内容 -->
<!-- 人员详情模态框（升级版） -->
<div class="modal-overlay" id="person-detail-modal">
  ...
</div>
```

- [ ] **Step 2: 移除Tab切换相关代码**

删除以下不再需要的函数：
- `switchPortraitType` 函数
- `#portrait-type-tabs` 元素

---

## Task 4: 验证和测试

**Files:**
- Modify: `9-employment-portrait.html`

- [ ] **Step 1: 打开页面测试**

1. 在浏览器中打开 `9-employment-portrait.html`
2. 找到任意一行人员数据，点击"详情"按钮
3. 验证：页面是否全屏显示
4. 验证：所有内容是否在一页中展示（无Tab切换）
5. 验证：6个标签分类是否全部可见
6. 验证：AI分析洞察区域是否显示

---

## 验收标准

- [ ] 点击"详情"按钮后，全屏显示详情内容
- [ ] 页面布局为：顶部基本信息+指标 → 第2行服务推荐 → 中部就业信息+标签云 → 底部AI分析洞察
- [ ] 不使用Tab切换，所有内容在一页可见
- [ ] 标签按6个分类聚合展示（基础信息、教育特征、就业特征、技能、帮扶、意向）
- [ ] 包含AI分析洞察区域
- [ ] 个性化服务推荐在顶部第2行展示
