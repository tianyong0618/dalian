# 人力资源服务旗舰店原型重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按照《人力资源服务旗舰店系统功能需求说明.md》重构"人力资源服务旗舰店"原型，使每个子页面按角色（监管端/机构端/企业端）显示对应内容，保持现有深色科技风样式。

**Architecture:** 保持现有 iframe SPA 架构（12-hr-flagship.html 为主框架），在每个子页面(12a-12f)内通过 `postMessage` 接收角色切换事件，使用 CSS 类控制 `display:none/block` 来切换不同角色的内容区块。父页面新增 `ROLE_CHANGE` 消息发送。

**Tech Stack:** 纯 HTML + CSS + Vanilla JavaScript，无框架，样式复现 `style.css`

---

### Task 0: 父页面增强 - 12-hr-flagship.html

**Files:**
- Modify: `原型设计/12-hr-flagship.html`

**Changes:**
1. 在 `switchRole()` 函数中：切换角色后向 iframe 发送 `{ type: 'ROLE_CHANGE', role: newRole }` 消息
2. Tab data-roles 调整：`credit` tab 改为 `gov org`（机构端也需要看到自己的信用）

- [ ] **Step 1: switchRole() 中添加向 iframe 发送角色变更消息**

在 `switchRole()` 函数最后，切换 iframe src 之后，添加:

```javascript
// 角色切换时通知子页面
setTimeout(() => {
  sendMessageToFrame({
    type: 'ROLE_CHANGE',
    role: role
  });
}, 200);
```

- [ ] **Step 2: 更新诚信评价Tab的角色可见性**

```diff
- <button class="tab-btn" data-tab="credit" data-roles="gov" onclick="switchTab('credit')">
+ <button class="tab-btn" data-tab="credit" data-roles="gov org" onclick="switchTab('credit')">
```

---

### Task 1: 12a-org-management.html - 机构管理（监管端 + 机构端）

**Files:**
- Modify: `原型设计/12a-org-management.html`

**Content design:**
- **Gov (监管端)**: 保留现有全部内容（看板+监测+列表+审核模态框）
- **Org (机构端)**: 机构信息管理（基本信息查看编辑、资质文件上传、店铺设置）
- **Enterprise**: 无（隐藏）

- [ ] **Step 1: 添加角色切换 JS 监听**

在文件末尾的 `<script>` 中，添加 `message` 事件监听和角色显示函数:

```html
<script>
// 角色切换监听
let currentPageRole = 'gov';

window.addEventListener('message', function(event) {
  if (event.data.type === 'ROLE_CHANGE') {
    currentPageRole = event.data.role;
    updateRoleDisplay();
  }
});

function updateRoleDisplay() {
  document.querySelectorAll('.role-gov').forEach(el => {
    el.style.display = currentPageRole === 'gov' ? '' : 'none';
  });
  document.querySelectorAll('.role-org').forEach(el => {
    el.style.display = currentPageRole === 'org' ? '' : 'none';
  });
  document.querySelectorAll('.role-enterprise').forEach(el => {
    el.style.display = currentPageRole === 'enterprise' ? '' : 'none';
  });
}
</script>
```

- [ ] **Step 2: 给现有 Gov 内容包裹 role-gov 类**

将当前页面内 `.page-content > .container` 下的第一个 `.card.mb-24.p-24`（机构管理卡片）及其所有子内容用 `<div class="role-gov">` 包裹。

具体位置：从 `<div class="card mb-24 p-24">`（第20行）到 `</div>`（173行，包含表格结束的 `</div>`）全部用 `role-gov` div 包裹。

**注意：** 保留所有模态框（机构注册、详情、备案管理、预警、资质审核）全局可用，不按角色隐藏。

- [ ] **Step 3: 添加机构端内容（Org view）**

在 `.container` 内，`.role-gov` 同级之后添加（第173行附近）:

```html
<!-- 机构端：机构信息管理 -->
<div class="role-org" style="display:none;">
  <!-- 机构信息卡片 -->
  <div class="card mb-24 p-24">
    <h3 class="mb-16">机构信息管理</h3>
    
    <!-- 基础信息 -->
    <div class="row mb-24">
      <div class="col-6">
        <div class="form-group">
          <label class="form-label">机构名称</label>
          <input type="text" class="form-input" value="XX人力资源有限公司" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">统一社会信用代码</label>
          <input type="text" class="form-input" value="91320000XXXXXXXXXX" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">许可证编号</label>
          <input type="text" class="form-input" value="HR-LIC-2026-0001" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">法定代表人</label>
          <input type="text" class="form-input" value="李四">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label class="form-label">机构地址</label>
          <input type="text" class="form-input" value="大连市中山区XX路XX号">
        </div>
        <div class="form-group">
          <label class="form-label">联系电话</label>
          <input type="text" class="form-input" value="0411-XXXXXXXX">
        </div>
        <div class="form-group">
          <label class="form-label">服务类型</label>
          <input type="text" class="form-input" value="劳务派遣 / 招聘外包" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">机构邮箱</label>
          <input type="text" class="form-input" value="contact@xxhr.com">
        </div>
      </div>
    </div>
    <div style="text-align: right;">
      <button class="btn btn-primary" onclick="showNotification('信息已更新', 'success')">保存修改</button>
    </div>
  </div>

  <!-- 资质文件 -->
  <div class="card mb-24 p-24">
    <h3 class="mb-16">资质文件</h3>
    <div class="row">
      <div class="col-6">
        <div class="card p-16" style="text-align: center;">
          <i class="fas fa-file-alt" style="font-size: 48px; color: var(--primary);"></i>
          <p class="mt-8"><strong>营业执照</strong></p>
          <p class="text-small">已上传 · 2026-01-15</p>
          <button class="btn btn-sm btn-secondary mt-8"><i class="fas fa-upload"></i> 重新上传</button>
        </div>
      </div>
      <div class="col-6">
        <div class="card p-16" style="text-align: center;">
          <i class="fas fa-id-card" style="font-size: 48px; color: var(--primary);"></i>
          <p class="mt-8"><strong>人力资源服务许可证</strong></p>
          <p class="text-small">已上传 · 2026-01-15</p>
          <button class="btn btn-sm btn-secondary mt-8"><i class="fas fa-upload"></i> 重新上传</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 店铺信息设置 -->
  <div class="card mb-24 p-24">
    <h3 class="mb-16">店铺信息设置</h3>
    <div class="row">
      <div class="col-4">
        <div class="form-group">
          <label class="form-label">店铺Logo</label>
          <div class="upload-area" style="padding: 20px;" onclick="document.getElementById('logo-upload').click()">
            <i class="fas fa-cloud-upload-alt" style="font-size: 32px; color: var(--primary);"></i>
            <p class="text-small mt-8">点击上传Logo</p>
            <input type="file" id="logo-upload" style="display:none;" accept="image/*">
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="form-group">
          <label class="form-label">店铺简介</label>
          <textarea class="form-textarea" rows="3">XX人力资源有限公司成立于2010年，是一家专业的人力资源服务机构，提供劳务派遣、招聘外包、培训服务等全方位人力资源解决方案。</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">店铺公告</label>
          <textarea class="form-textarea" rows="2">欢迎来到XX人力资源旗舰店，我们将为您提供优质的人力资源服务！</textarea>
        </div>
      </div>
    </div>
    <div style="text-align: right;" class="mt-16">
      <button class="btn btn-primary" onclick="showNotification('店铺信息已更新', 'success')">保存设置</button>
    </div>
  </div>
</div>
```

- [ ] **Step 4: 更新 JavaScript: 移除 `>` 后残留的 script 闭合，确保所有脚本正确**

当前页面最后已有 `</script>`（第649行）但文件持续到第652行。需要在 role-switch 脚本前确保没有语法错误。

- [ ] **Step 5: 确保角色切换函数 updateRoleDisplay() 在页面加载时初始化**

```javascript
// 在 doc ready 或 script 底部调用
document.addEventListener('DOMContentLoaded', function() {
  // 尝试从父窗口获取初始角色
  try {
    if (parent && parent.currentRole) {
      currentPageRole = parent.currentRole;
    }
  } catch(e) {}
  updateRoleDisplay();
});
```

---

### Task 2: 12b-employee-management.html - 从业人员管理

**Files:**
- Modify: `原型设计/12b-employee-management.html`

**Content design:**
- **Gov (监管端)**: 保留现有列表+筛选+详情
- **Org (机构端)**: 本机构从业人员管理（新增/编辑/提交备案）
- **Enterprise**: 无

- [ ] **Step 1: 添加角色监听 JS（同上模式）**

```javascript
let currentPageRole = 'gov';

window.addEventListener('message', function(event) {
  if (event.data.type === 'ROLE_CHANGE') {
    currentPageRole = event.data.role;
    updateRoleDisplay();
  }
});

function updateRoleDisplay() {
  document.querySelectorAll('.role-gov').forEach(el => {
    el.style.display = currentPageRole === 'gov' ? '' : 'none';
  });
  document.querySelectorAll('.role-org').forEach(el => {
    el.style.display = currentPageRole === 'org' ? '' : 'none';
  });
  document.querySelectorAll('.role-enterprise').forEach(el => {
    el.style.display = currentPageRole === 'enterprise' ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    if (parent && parent.currentRole) {
      currentPageRole = parent.currentRole;
    }
  } catch(e) {}
  updateRoleDisplay();
});
```

- [ ] **Step 2: 用 role-gov 和 role-org 包裹现有内容**

当前页面内容结构：从 `.page-content > .container` 下有搜索栏、表格等多个区块。将现有的全部从业人员内容用 `<div class="role-gov">` 包裹。保留现有模态框全局可访问。

- [ ] **Step 3: 添加机构端内容**

在 `.container` 内添加机构端从业人员管理：

```html
<div class="role-org" style="display:none;">
  <!-- 机构端数据看板 -->
  <div class="row mb-16">
    <div class="col-3">
      <div class="stat-card" style="padding: 20px 16px;">
        <div class="number" style="font-size: 32px;">32</div>
        <div class="label">本机构备案人员</div>
      </div>
    </div>
    <div class="col-3">
      <div class="stat-card" style="padding: 20px 16px;">
        <div class="number" style="font-size: 32px;">30</div>
        <div class="label">资质有效人员</div>
      </div>
    </div>
    <div class="col-3">
      <div class="stat-card" style="padding: 20px 16px;">
        <div class="number" style="font-size: 32px;">2</div>
        <div class="label">本月新增</div>
      </div>
    </div>
    <div class="col-3">
      <div class="stat-card stat-warning" style="padding: 20px 16px;">
        <div class="number" style="font-size: 32px;">1</div>
        <div class="label">资质到期提醒</div>
      </div>
    </div>
  </div>
  
  <!-- 机构端搜索与操作 -->
  <div class="card p-24">
    <div class="search-bar">
      <input type="text" class="form-input" placeholder="搜索本机构从业人员..." onkeyup="filterOrgEmpList()">
      <button class="btn btn-primary" onclick="showModal('org-emp-add-modal')"><i class="fas fa-plus"></i> 新增人员</button>
      <button class="btn btn-secondary" onclick="showNotification('备案已批量提交', 'success')"><i class="fas fa-check-double"></i> 批量提交备案</button>
    </div>
    <table class="table mt-16">
      <thead>
        <tr>
          <th>姓名</th>
          <th>身份证号</th>
          <th>职业资格证书</th>
          <th>证书有效期</th>
          <th>备案状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>林小华</strong></td>
          <td>430105********6789</td>
          <td><span class="tag">网络工程师</span></td>
          <td>2027-03-15</td>
          <td><span class="badge badge-info">待审核</span></td>
          <td>
            <button class="btn btn-secondary btn-sm mr-8"><i class="fas fa-eye"></i> 查看</button>
            <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> 删除</button>
          </td>
        </tr>
        <tr>
          <td><strong>王小芳</strong></td>
          <td>440305********2345</td>
          <td><span class="tag">人力资源管理师</span></td>
          <td>2028-06-20</td>
          <td><span class="badge badge-success">已备案</span></td>
          <td>
            <button class="btn btn-secondary btn-sm mr-8"><i class="fas fa-eye"></i> 查看</button>
            <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i> 编辑</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 4: 添加机构端新增人员模态框**

```html
<!-- 机构端新增从业人员 -->
<div id="org-emp-add-modal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h3>新增从业人员</h3>
      <button class="modal-close" onclick="closeModal('org-emp-add-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label class="form-label">姓名</label>
            <input type="text" class="form-input" placeholder="请输入姓名">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="form-label">性别</label>
            <select class="form-select">
              <option>男</option>
              <option>女</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">身份证号</label>
        <input type="text" class="form-input" placeholder="请输入身份证号">
      </div>
      <div class="form-group">
        <label class="form-label">联系方式</label>
        <input type="text" class="form-input" placeholder="请输入手机号码">
      </div>
      <div class="form-group">
        <label class="form-label">职业资格证书</label>
        <input type="text" class="form-input" placeholder="如：人力资源管理师、网络工程师">
      </div>
      <div class="form-group">
        <label class="form-label">证书图片上传</label>
        <div class="upload-area" onclick="this.querySelector('input').click()">
          <i class="fas fa-cloud-upload-alt" style="font-size: 32px; color: var(--primary);"></i>
          <p class="text-small mt-8">点击上传资质证书</p>
          <input type="file" style="display:none;" accept="image/*">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('org-emp-add-modal')">取消</button>
      <button class="btn btn-primary" onclick="closeModal('org-emp-add-modal'); showNotification('从业人员信息已提交备案', 'success')">提交备案</button>
    </div>
  </div>
</div>
```

---

### Task 3: 12c-online-store.html - 线上服务网店（最大修改）

**Files:**
- Modify: `原型设计/12c-online-store.html`

**Content design:**
- **Gov (监管端)**: 服务列表+审核（监管所有机构服务）
- **Org (机构端)**: 店铺装修 + 服务管理 + 订单管理
- **Enterprise (企业端)**: 服务商城（搜索+分类+机构卡片+服务详情+购买）

- [ ] **Step 1: 添加角色监听 JS（同上）**
- [ ] **Step 2: 用 role-gov 包裹现有监管端内容**

当前页面是监管视角的网店列表。用 `<div class="role-gov">` 包裹现有主内容。

- [ ] **Step 3: 添加 Gov 数据看板**

在现有网店列表上方添加：

```html
<div class="role-gov">
  <div class="row mb-16">
    <div class="col-3">
      <div class="stat-card" style="padding: 20px 16px;">
        <div class="number" style="font-size: 32px;">28</div>
        <div class="label">已开通网店机构</div>
      </div>
    </div>
    <div class="col-3">
      <div class="stat-card" style="padding: 20px 16px;">
        <div class="number" style="font-size: 32px;">356</div>
        <div class="label">上架服务产品总数</div>
      </div>
    </div>
    <div class="col-3">
      <div class="stat-card" style="padding: 20px 16px;">
        <div class="number" style="font-size: 32px;">18</div>
        <div class="label">本月新增服务</div>
      </div>
    </div>
    <div class="col-3">
      <div class="stat-card stat-warning" style="padding: 20px 16px;">
        <div class="number" style="font-size: 32px;">5</div>
        <div class="label">待审核服务</div>
      </div>
    </div>
  </div>
</div>
```

然后将现有表格（网店列表）改为监管视角的服务产品列表（服务名称、所属机构、服务类型、价格、销量、状态、操作），替换原有的网店列表表格。

- [ ] **Step 4: 添加机构端内容（店铺装修 + 服务管理 + 订单管理）**

在 `role-org` 内添加三标签结构：

```html
<div class="role-org" style="display:none;">
  <div class="card mb-24 p-24">
    <div style="display:flex; gap: 8px; margin-bottom: 16px; border-bottom: 2px solid var(--border-color); padding-bottom: 8px;">
      <button class="btn btn-primary btn-sm" onclick="switchOrgStoreTab('decoration')" id="org-store-tab-decoration">店铺装修</button>
      <button class="btn btn-secondary btn-sm" onclick="switchOrgStoreTab('services')" id="org-store-tab-services">服务管理</button>
      <button class="btn btn-secondary btn-sm" onclick="switchOrgStoreTab('orders')" id="org-store-tab-orders">订单管理</button>
    </div>

    <!-- 店铺装修 Tab -->
    <div id="org-store-decoration" class="org-store-tab">
      <h4 class="mb-16">店铺装修</h4>
      <div class="form-group">
        <label class="form-label">选择模板</label>
        <div class="row">
          <div class="col-4"><div class="card p-16" style="text-align:center; cursor:pointer; border: 2px solid var(--primary);"><i class="fas fa-store" style="font-size: 36px; color:var(--primary);"></i><p class="mt-8"><strong>简约模板</strong></p><p class="text-small">当前使用</p></div></div>
          <div class="col-4"><div class="card p-16" style="text-align:center; cursor:pointer;"><i class="fas fa-store-alt" style="font-size: 36px; color:var(--text-secondary);"></i><p class="mt-8"><strong>专业模板</strong></p><p class="text-small">预览</p></div></div>
          <div class="col-4"><div class="card p-16" style="text-align:center; cursor:pointer;"><i class="fas fa-store-slash" style="font-size: 36px; color:var(--text-secondary);"></i><p class="mt-8"><strong>简洁模板</strong></p><p class="text-small">预览</p></div></div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">轮播图设置</label>
        <div class="upload-area" onclick="this.querySelector('input').click()" style="padding:20px;">
          <i class="fas fa-images" style="font-size: 32px; color: var(--primary);"></i>
          <p class="text-small mt-8">点击上传轮播图（建议尺寸：1200×400px）</p>
          <input type="file" style="display:none;" accept="image/*" multiple>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">推荐服务（最多6个）</label>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <span class="tag" style="cursor:pointer;">劳务派遣服务 <span class="remove-tag" style="margin-left:4px; cursor:pointer;">×</span></span>
          <span class="tag" style="cursor:pointer;">招聘外包 <span class="remove-tag" style="margin-left:4px; cursor:pointer;">×</span></span>
          <button class="btn btn-sm btn-secondary" onclick="showNotification('请从服务管理中选择推荐服务', 'info')">+ 添加</button>
        </div>
      </div>
      <div style="text-align:right;">
        <button class="btn btn-secondary mr-8">预览</button>
        <button class="btn btn-primary" onclick="showNotification('店铺已发布', 'success')">发布</button>
      </div>
    </div>

    <!-- 服务管理 Tab -->
    <div id="org-store-services" class="org-store-tab" style="display:none;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h4 style="margin:0;">服务管理</h4>
        <button class="btn btn-primary btn-sm" onclick="showModal('org-service-add-modal')"><i class="fas fa-plus"></i> 新增服务</button>
      </div>
      <table class="table">
        <thead><tr><th>服务名称</th><th>服务类型</th><th>价格</th><th>销量</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>
          <tr><td><strong>劳务派遣服务</strong></td><td>劳务派遣</td><td>¥200/人/月</td><td>156</td><td><span class="badge badge-success">已上架</span></td><td><button class="btn btn-secondary btn-sm mr-8">编辑</button><button class="btn btn-warning btn-sm">下架</button></td></tr>
          <tr><td><strong>招聘外包服务</strong></td><td>招聘外包</td><td>¥5000/人</td><td>89</td><td><span class="badge badge-success">已上架</span></td><td><button class="btn btn-secondary btn-sm mr-8">编辑</button><button class="btn btn-warning btn-sm">下架</button></td></tr>
          <tr><td><strong>岗前培训课程</strong></td><td>培训服务</td><td>¥800/人</td><td>45</td><td><span class="badge badge-info">待审核</span></td><td><button class="btn btn-secondary btn-sm mr-8">编辑</button><button class="btn btn-danger btn-sm">删除</button></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 订单管理 Tab -->
    <div id="org-store-orders" class="org-store-tab" style="display:none;">
      <h4 class="mb-16">订单管理</h4>
      <table class="table">
        <thead><tr><th>订单编号</th><th>企业名称</th><th>服务项目</th><th>金额</th><th>状态</th><th>下单时间</th><th>操作</th></tr></thead>
        <tbody>
          <tr><td><span style="font-family:monospace;">ORD-20260501</span></td><td>XX科技有限公司</td><td>劳务派遣服务</td><td>¥20,000</td><td><span class="badge badge-success">进行中</span></td><td>2026-05-01</td><td><button class="btn btn-secondary btn-sm">查看</button></td></tr>
          <tr><td><span style="font-family:monospace;">ORD-20260503</span></td><td>XX制造有限公司</td><td>招聘外包服务</td><td>¥15,000</td><td><span class="badge badge-warning">待确认</span></td><td>2026-05-03</td><td><button class="btn btn-secondary btn-sm mr-8">查看</button><button class="btn btn-primary btn-sm">确认</button></td></tr>
          <tr><td><span style="font-family:monospace;">ORD-20260510</span></td><td>XX贸易公司</td><td>岗前培训课程</td><td>¥4,000</td><td><span class="badge badge-success">已完成</span></td><td>2026-05-10</td><td><button class="btn btn-secondary btn-sm">查看</button></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

- [ ] **Step 5: 添加机构端服务发布模态框**

```html
<!-- 机构端新增服务 -->
<div id="org-service-add-modal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header"><h3>发布新服务</h3><button class="modal-close" onclick="closeModal('org-service-add-modal')">×</button></div>
    <div class="modal-body">
      <div class="form-group"><label class="form-label">服务名称</label><input type="text" class="form-input" placeholder="请输入服务名称"></div>
      <div class="form-group"><label class="form-label">服务类型</label><select class="form-select"><option>劳务派遣</option><option>招聘外包</option><option>培训服务</option><option>高端猎头</option><option>政策咨询</option></select></div>
      <div class="row">
        <div class="col-6"><div class="form-group"><label class="form-label">价格</label><input type="text" class="form-input" placeholder="请输入价格"></div></div>
        <div class="col-6"><div class="form-group"><label class="form-label">计价单位</label><select class="form-select"><option>元/人/月</option><option>元/次</option><option>元/人</option></select></div></div>
      </div>
      <div class="form-group"><label class="form-label">服务描述</label><textarea class="form-textarea" rows="4" placeholder="请描述服务内容、流程、适用对象等"></textarea></div>
      <div class="form-group"><label class="form-label">服务流程</label><textarea class="form-textarea" rows="3" placeholder="描述服务流程步骤..."></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('org-service-add-modal')">取消</button>
      <button class="btn btn-primary" onclick="closeModal('org-service-add-modal'); showNotification('服务已提交审核', 'success')">提交审核</button>
    </div>
  </div>
</div>
```

- [ ] **Step 6: 添加企业端内容（服务商城 + 机构列表 + 服务详情）**

```html
<div class="role-enterprise" style="display:none;">
  <!-- 服务商城搜索 -->
  <div class="card p-24 mb-24">
    <div class="search-bar">
      <input type="text" class="form-input" placeholder="搜索服务名称、机构名称..." onkeyup="filterEnterpriseStoreList()">
      <button class="btn btn-primary"><i class="fas fa-search"></i> 搜索</button>
    </div>
    <div class="filter-bar">
      <select class="form-select" style="width:auto;min-width:130px;"><option>全部服务类型</option><option>劳务派遣</option><option>职业中介</option><option>人力资源外包</option><option>猎头服务</option><option>政策咨询</option></select>
      <select class="form-select" style="width:auto;min-width:130px;"><option>全部地区</option><option>大连市</option><option>沈阳市</option></select>
      <select class="form-select" style="width:auto;min-width:130px;"><option>综合排序</option><option>销量优先</option><option>评分优先</option><option>价格升序</option><option>价格降序</option></select>
    </div>
  </div>

  <!-- 星级推荐 -->
  <div class="card p-24 mb-24">
    <h4 class="mb-16">⭐ 星级推荐</h4>
    <div class="row">
      <div class="col-4">
        <div class="card p-16" style="cursor:pointer;" onclick="showEnterpriseStore('XX人力资源有限公司')">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
            <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;color:white;font-size:20px;"><i class="fas fa-building"></i></div>
            <div><strong>XX人力资源有限公司</strong><br><span class="star-rating">★★★★★</span> <span class="text-small">4.9</span></div>
          </div>
          <p class="text-small">劳务派遣 / 招聘外包</p>
          <div style="display:flex;justify-content:space-between;" class="mt-8"><span class="text-small">已服务 286 家企业</span><span class="badge badge-success">五星机构</span></div>
        </div>
      </div>
      <div class="col-4">
        <div class="card p-16" style="cursor:pointer;" onclick="showEnterpriseStore('XX人才服务集团')">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
            <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#8b5cf6,#ec4899);display:flex;align-items:center;justify-content:center;color:white;font-size:20px;"><i class="fas fa-crown"></i></div>
            <div><strong>XX人才服务集团</strong><br><span class="star-rating">★★★★★</span> <span class="text-small">4.8</span></div>
          </div>
          <p class="text-small">高端猎头 / 培训服务</p>
          <div style="display:flex;justify-content:space-between;" class="mt-8"><span class="text-small">已服务 198 家企业</span><span class="badge badge-success">五星机构</span></div>
        </div>
      </div>
      <div class="col-4">
        <div class="card p-16" style="cursor:pointer;" onclick="showEnterpriseStore('XX科技服务公司')">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
            <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#3b82f6,#6366f1);display:flex;align-items:center;justify-content:center;color:white;font-size:20px;"><i class="fas fa-star"></i></div>
            <div><strong>XX科技服务公司</strong><br><span class="star-rating">★★★★☆</span> <span class="text-small">4.5</span></div>
          </div>
          <p class="text-small">人力资源外包 / 政策咨询</p>
          <div style="display:flex;justify-content:space-between;" class="mt-8"><span class="text-small">已服务 127 家企业</span><span class="badge badge-warning">四星机构</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- 热门服务 -->
  <div class="card p-24">
    <h4 class="mb-16">🔥 热门服务</h4>
    <table class="table">
      <thead><tr><th>服务名称</th><th>机构</th><th>类型</th><th>价格</th><th>评分</th><th>操作</th></tr></thead>
      <tbody>
        <tr><td><strong>劳务派遣服务</strong></td><td>XX人力资源有限公司</td><td><span class="tag">劳务派遣</span></td><td>¥200/人/月</td><td><span class="star-rating">★★★★★</span> 4.9</td><td><button class="btn btn-primary btn-sm" onclick="showModal('enterprise-service-detail-modal')">立即购买</button></td></tr>
        <tr><td><strong>招聘外包服务</strong></td><td>XX人力资源有限公司</td><td><span class="tag">招聘外包</span></td><td>¥5,000/人</td><td><span class="star-rating">★★★★★</span> 4.8</td><td><button class="btn btn-primary btn-sm" onclick="showModal('enterprise-service-detail-modal')">立即购买</button></td></tr>
        <tr><td><strong>高端猎头服务</strong></td><td>XX人才服务集团</td><td><span class="tag">猎头服务</span></td><td>¥30,000/人</td><td><span class="star-rating">★★★★★</span> 4.9</td><td><button class="btn btn-primary btn-sm" onclick="showModal('enterprise-service-detail-modal')">立即购买</button></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 7: 添加企业端服务详情模态框 + 机构店铺模态框**

```html
<!-- 企业端：服务详情 -->
<div id="enterprise-service-detail-modal" class="modal-overlay">
  <div class="modal" style="max-width: 700px;">
    <div class="modal-header"><h3>劳务派遣服务 - 详情</h3><button class="modal-close" onclick="closeModal('enterprise-service-detail-modal')">×</button></div>
    <div class="modal-body">
      <div class="row mb-24">
        <div class="col-8">
          <p><strong>提供机构：</strong>XX人力资源有限公司</p>
          <p><strong>服务类型：</strong>劳务派遣</p>
          <p><strong>价格：</strong><span style="font-size:24px;font-weight:700;color:var(--primary);">¥200</span> <span class="text-small">/人/月</span></p>
          <p><strong>服务周期：</strong>最低6个月起签</p>
        </div>
        <div class="col-4" style="text-align:center;">
          <div class="card p-16">
            <div class="number" style="font-size:28px;">4.9</div>
            <div class="star-rating">★★★★★</div>
            <p class="text-small">156 人已购买</p>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">服务描述</label>
        <div class="card p-16" style="background:var(--bg-secondary);">
          <p class="text-small">提供全面的劳务派遣服务，包括：员工招聘、劳动合同管理、社保缴纳、工资发放、劳动关系管理等一站式劳务派遣解决方案。适用于各类企业用工需求，有效降低用工风险和管理成本。</p>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">服务流程</label>
        <div class="card p-16" style="background:var(--bg-secondary);">
          <p class="text-small">1. 在线下单 → 2. 需求沟通 → 3. 签订合同 → 4. 人员派遣 → 5. 日常管理 → 6. 服务完成</p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('enterprise-service-detail-modal')">关闭</button>
      <button class="btn btn-primary" onclick="closeModal('enterprise-service-detail-modal'); showNotification('订单已提交，等待机构确认', 'success')">立即购买</button>
    </div>
  </div>
</div>
```

- [ ] **Step 8: 添加机构端 Tab 切换函数**

```javascript
function switchOrgStoreTab(tab) {
  document.querySelectorAll('.org-store-tab').forEach(el => el.style.display = 'none');
  document.querySelectorAll('[id^="org-store-tab-"]').forEach(el => {
    el.className = 'btn btn-secondary btn-sm';
  });
  document.getElementById('org-store-' + tab).style.display = 'block';
  document.getElementById('org-store-tab-' + tab).className = 'btn btn-primary btn-sm';
}
```

---

### Task 4: 12d-demand-matching.html - 供需撮合

**Files:**
- Modify: `原型设计/12d-demand-matching.html`

**Content design:**
- **Gov (监管端)**: 企业需求列表 + 对接活动管理（修改现有内容）
- **Org (机构端)**: 商机推荐 + 供需对接活动 + 对接记录
- **Enterprise (企业端)**: 需求发布 + 我的需求 + 匹配结果

- [ ] **Step 1: 添加角色监听 JS**
- [ ] **Step 2: 用 role-gov 包裹现有监管端内容并添加数据看板**

在 Gov 区域顶部添加数据看板：
```html
<div class="role-gov">
  <div class="row mb-16">
    <div class="col-3"><div class="stat-card" style="padding:20px 16px;"><div class="number" style="font-size:32px;">86</div><div class="label">企业需求总数</div></div></div>
    <div class="col-3"><div class="stat-card" style="padding:20px 16px;"><div class="number" style="font-size:32px;">72</div><div class="label">成功匹配数</div></div></div>
    <div class="col-3"><div class="stat-card" style="padding:20px 16px;"><div class="number" style="font-size:32px;">83.7%</div><div class="label">匹配成功率</div></div></div>
    <div class="col-3"><div class="stat-card" style="padding:20px 16px;"><div class="number" style="font-size:32px;">6</div><div class="label">本月举办活动</div></div></div>
  </div>
</div>
```

- [ ] **Step 3: 添加机构端内容（商机推荐 + 对接活动 + 对接记录）**

```html
<div class="role-org" style="display:none;">
  <!-- 商机推荐 -->
  <div class="card mb-24 p-24">
    <h4 class="mb-16">💡 商机推荐</h4>
    <p class="text-small mb-16">系统根据您的服务能力为您推荐以下企业需求</p>
    <div class="row">
      <div class="col-6">
        <div class="card p-16" style="border-left: 4px solid var(--primary);">
          <div style="display:flex;justify-content:space-between;">
            <div><strong>急需50名生产线工人</strong><br><span class="text-small">XX制造有限公司 · 2026-05-15</span></div>
            <span class="badge badge-success">匹配度 92%</span>
          </div>
          <p class="text-small mt-8">需求类型：劳务派遣 | 人数：50人 | 到岗时间：2026-06-01</p>
          <div class="mt-8"><button class="btn btn-primary btn-sm mr-8"><i class="fas fa-eye"></i> 查看详情</button><button class="btn btn-secondary btn-sm"><i class="fas fa-phone"></i> 立即联系</button></div>
        </div>
      </div>
      <div class="col-6">
        <div class="card p-16" style="border-left: 4px solid var(--warning);">
          <div style="display:flex;justify-content:space-between;">
            <div><strong>招聘Java高级工程师5名</strong><br><span class="text-small">XX科技有限公司 · 2026-05-14</span></div>
            <span class="badge badge-warning">匹配度 78%</span>
          </div>
          <p class="text-small mt-8">需求类型：招聘外包 | 人数：5人 | 到岗时间：2026-07-01</p>
          <div class="mt-8"><button class="btn btn-primary btn-sm mr-8"><i class="fas fa-eye"></i> 查看详情</button><button class="btn btn-secondary btn-sm"><i class="fas fa-phone"></i> 立即联系</button></div>
        </div>
      </div>
    </div>
  </div>

  <!-- 对接活动 + 对接记录 -->
  <div class="card p-24">
    <h4 class="mb-16">📅 供需对接活动</h4>
    <table class="table">
      <thead><tr><th>活动名称</th><th>活动时间</th><th>活动地点</th><th>报名状态</th><th>操作</th></tr></thead>
      <tbody>
        <tr><td><strong>2026年6月人力资源供需对接会</strong></td><td>2026-06-15 14:00</td><td>大连市人力资源产业园</td><td><span class="badge badge-success">已报名</span></td><td><button class="btn btn-secondary btn-sm">取消报名</button></td></tr>
        <tr><td><strong>制造业专场招聘对接会</strong></td><td>2026-07-01 09:00</td><td>大连国际会议中心</td><td><span class="badge badge-info">可报名</span></td><td><button class="btn btn-primary btn-sm">立即报名</button></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 4: 添加企业端内容（需求发布 + 我的需求 + 匹配结果）**

```html
<div class="role-enterprise" style="display:none;">
  <div class="card mb-24 p-24">
    <h4 class="mb-16">发布用工需求</h4>
    <div class="row">
      <div class="col-6">
        <div class="form-group"><label class="form-label">需求标题</label><input type="text" class="form-input" placeholder="如：急需50名生产线工人"></div>
      </div>
      <div class="col-6">
        <div class="form-group"><label class="form-label">需求类型</label><select class="form-select"><option>劳务派遣</option><option>招聘外包</option><option>人力资源外包</option><option>猎头服务</option><option>政策咨询</option></select></div>
      </div>
    </div>
    <div class="form-group"><label class="form-label">需求描述</label><textarea class="form-textarea" rows="3" placeholder="请详细描述您的用工需求..."></textarea></div>
    <div class="row">
      <div class="col-4"><div class="form-group"><label class="form-label">招聘人数</label><input type="number" class="form-input" placeholder="0"></div></div>
      <div class="col-4"><div class="form-group"><label class="form-label">薪资范围</label><select class="form-select"><option>面议</option><option>3K-5K</option><option>5K-8K</option><option>8K-15K</option><option>15K以上</option></select></div></div>
      <div class="col-4"><div class="form-group"><label class="form-label">到岗时间</label><input type="date" class="form-input"></div></div>
    </div>
    <div class="form-group"><label class="form-label">联系方式</label><input type="text" class="form-input" placeholder="联系人姓名+电话"></div>
    <div style="text-align:right;"><button class="btn btn-primary" onclick="showNotification('需求已发布，系统正在匹配机构', 'success')">发布需求</button></div>
  </div>

  <!-- 我的需求列表 -->
  <div class="card p-24">
    <h4 class="mb-16">我的需求</h4>
    <table class="table">
      <thead><tr><th>需求标题</th><th>发布时间</th><th>匹配机构</th><th>状态</th><th>操作</th></tr></thead>
      <tbody>
        <tr><td><strong>急需50名生产线工人</strong></td><td>2026-05-15</td><td>3家</td><td><span class="badge badge-success">匹配中</span></td><td><button class="btn btn-primary btn-sm mr-8">查看匹配</button><button class="btn btn-secondary btn-sm">编辑</button></td></tr>
        <tr><td><strong>招聘Java高级工程师</strong></td><td>2026-05-10</td><td>2家</td><td><span class="badge badge-info">待发布</span></td><td><button class="btn btn-primary btn-sm mr-8">编辑</button><button class="btn btn-danger btn-sm">删除</button></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

---

### Task 5: 12e-dispute-mediation.html - 争议调解

**Files:**
- Modify: `原型设计/12e-dispute-mediation.html`

**Content design:**
- **Gov (监管端)**: 争议案件列表 + 详情 + 调解（保留现有并增强）
- **Org (机构端)**: 争议列表 + 证据提交
- **Enterprise (企业端)**: 服务评价 + 争议申请 + 进度查询

- [ ] **Step 1: 添加角色监听 JS**
- [ ] **Step 2: 用 role-gov 包裹现有监管端内容并添加数据看板**

Gov 区域顶部添加：
```html
<div class="role-gov">
  <div class="row mb-16">
    <div class="col-3"><div class="stat-card" style="padding:20px 16px;"><div class="number" style="font-size:32px;">45</div><div class="label">累计争议数</div></div></div>
    <div class="col-3"><div class="stat-card" style="padding:20px 16px;"><div class="number" style="font-size:32px;">38</div><div class="label">已调解完成</div></div></div>
    <div class="col-3"><div class="stat-card" style="padding:20px 16px;"><div class="number" style="font-size:32px;">84.4%</div><div class="label">调解成功率</div></div></div>
    <div class="col-3"><div class="stat-card stat-warning" style="padding:20px 16px;"><div class="number" style="font-size:32px;">3</div><div class="label">待处理争议</div></div></div>
  </div>
</div>
```

- [ ] **Step 3: 添加机构端内容**

```html
<div class="role-org" style="display:none;">
  <div class="card p-24">
    <h4 class="mb-16">争议处理</h4>
    <table class="table">
      <thead><tr><th>争议编号</th><th>对方名称</th><th>争议类型</th><th>申请时间</th><th>处理状态</th><th>操作</th></tr></thead>
      <tbody>
        <tr><td><span style="font-family:monospace;">TJ-20260514002</span></td><td>XX科技有限公司</td><td>服务质量争议</td><td>2026-05-14</td><td><span class="badge badge-warning">调解中</span></td><td><button class="btn btn-secondary btn-sm mr-8">查看</button><button class="btn btn-primary btn-sm">提交证据</button></td></tr>
        <tr><td><span style="font-family:monospace;">TJ-20260420001</span></td><td>XX贸易公司</td><td>费用纠纷</td><td>2026-04-20</td><td><span class="badge badge-info">待受理</span></td><td><button class="btn btn-secondary btn-sm mr-8">查看</button><button class="btn btn-primary btn-sm">提交证据</button></td></tr>
      </tbody>
    </table>
  </div>
  
  <!-- 证据提交模态框 -->
  <div id="org-evidence-modal" class="modal-overlay">
    <div class="modal" style="max-width: 500px;">
      <div class="modal-header"><h3>提交证据材料</h3><button class="modal-close" onclick="closeModal('org-evidence-modal')">×</button></div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">证据说明</label><textarea class="form-textarea" rows="3" placeholder="请描述证据内容..."></textarea></div>
        <div class="form-group"><label class="form-label">上传文件</label><div class="upload-area" onclick="this.querySelector('input').click()" style="padding:20px;"><i class="fas fa-cloud-upload-alt" style="font-size:32px;color:var(--primary);"></i><p class="text-small mt-8">点击上传证据文件（图片/PDF）</p><input type="file" style="display:none;" accept="image/*,.pdf" multiple></div></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal('org-evidence-modal')">取消</button>
        <button class="btn btn-primary" onclick="closeModal('org-evidence-modal'); showNotification('证据已提交', 'success')">提交</button>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 4: 添加企业端内容（评价 + 争议申请 + 进度查询）**

```html
<div class="role-enterprise" style="display:none;">
  <!-- 服务评价 -->
  <div class="card mb-24 p-24">
    <h4 class="mb-16">服务评价</h4>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label class="form-label">相关订单</label>
          <select class="form-select"><option>ORD-20260501 - 劳务派遣服务</option><option>ORD-20260503 - 招聘外包服务</option></select>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label class="form-label">综合评分</label>
          <div class="star-selector" style="display:flex;gap:4px;">
            <span class="star" onclick="setRating(this,1)">☆</span>
            <span class="star" onclick="setRating(this,2)">☆</span>
            <span class="star" onclick="setRating(this,3)">☆</span>
            <span class="star" onclick="setRating(this,4)">☆</span>
            <span class="star" onclick="setRating(this,5)">☆</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-4"><div class="form-group"><label class="form-label">服务态度</label><div class="star-selector" style="display:flex;gap:4px;"><span class="star" onclick="setSubRating(this,'attitude',1)">☆</span><span class="star" onclick="setSubRating(this,'attitude',2)">☆</span><span class="star" onclick="setSubRating(this,'attitude',3)">☆</span><span class="star" onclick="setSubRating(this,'attitude',4)">☆</span><span class="star" onclick="setSubRating(this,'attitude',5)">☆</span></div></div></div>
      <div class="col-4"><div class="form-group"><label class="form-label">服务质量</label><div class="star-selector" style="display:flex;gap:4px;"><span class="star" onclick="setSubRating(this,'quality',1)">☆</span><span class="star" onclick="setSubRating(this,'quality',2)">☆</span><span class="star" onclick="setSubRating(this,'quality',3)">☆</span><span class="star" onclick="setSubRating(this,'quality',4)">☆</span><span class="star" onclick="setSubRating(this,'quality',5)">☆</span></div></div></div>
      <div class="col-4"><div class="form-group"><label class="form-label">专业能力</label><div class="star-selector" style="display:flex;gap:4px;"><span class="star" onclick="setSubRating(this,'ability',1)">☆</span><span class="star" onclick="setSubRating(this,'ability',2)">☆</span><span class="star" onclick="setSubRating(this,'ability',3)">☆</span><span class="star" onclick="setSubRating(this,'ability',4)">☆</span><span class="star" onclick="setSubRating(this,'ability',5)">☆</span></div></div></div>
    </div>
    <div class="form-group"><label class="form-label">评价内容</label><textarea class="form-textarea" rows="3" placeholder="请分享您的服务体验..."></textarea></div>
    <div style="text-align:right;"><button class="btn btn-primary" onclick="showNotification('评价已提交', 'success')">提交评价</button></div>
  </div>

  <!-- 争议申请 -->
  <div class="card mb-24 p-24">
    <h4 class="mb-16">争议申请</h4>
    <div class="row">
      <div class="col-6"><div class="form-group"><label class="form-label">相关订单</label><select class="form-select"><option>ORD-20260501 - 劳务派遣服务</option><option>ORD-20260503 - 招聘外包服务</option></select></div></div>
      <div class="col-6"><div class="form-group"><label class="form-label">争议类型</label><select class="form-select"><option>费用纠纷</option><option>服务质量争议</option><option>合同违约</option><option>其他</option></select></div></div>
    </div>
    <div class="form-group"><label class="form-label">争议描述</label><textarea class="form-textarea" rows="3" placeholder="请详细描述争议情况..."></textarea></div>
    <div class="form-group"><label class="form-label">证据上传</label><div class="upload-area" onclick="this.querySelector('input').click()" style="padding:20px;"><i class="fas fa-cloud-upload-alt" style="font-size:32px;color:var(--primary);"></i><p class="text-small mt-8">点击上传证据材料</p><input type="file" style="display:none;" accept="image/*,.pdf" multiple></div></div>
    <div style="text-align:right;"><button class="btn btn-primary" onclick="showNotification('争议申请已提交，等待受理', 'success')">提交申请</button></div>
  </div>

  <!-- 争议进度查询 -->
  <div class="card p-24">
    <h4 class="mb-16">争议进度查询</h4>
    <table class="table">
      <thead><tr><th>争议编号</th><th>被申请方</th><th>争议类型</th><th>申请时间</th><th>处理状态</th><th>操作</th></tr></thead>
      <tbody>
        <tr><td><span style="font-family:monospace;">TJ-20260514002</span></td><td>XX人力资源有限公司</td><td>服务质量争议</td><td>2026-05-14</td><td><span class="badge badge-warning">调解中</span></td><td><button class="btn btn-secondary btn-sm">查看进度</button></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 5: 添加评价星级的 JS 函数**

```javascript
let enterpriseRating = { overall: 0, attitude: 0, quality: 0, ability: 0 };

function setRating(el, value) {
  enterpriseRating.overall = value;
  const stars = el.parentElement.querySelectorAll('.star');
  stars.forEach((s, i) => {
    s.textContent = i < value ? '★' : '☆';
    s.classList.toggle('active', i < value);
  });
}

function setSubRating(el, dimension, value) {
  enterpriseRating[dimension] = value;
  const stars = el.parentElement.querySelectorAll('.star');
  stars.forEach((s, i) => {
    s.textContent = i < value ? '★' : '☆';
    s.classList.toggle('active', i < value);
  });
}
```

---

### Task 6: 12f-credit-evaluation.html - 诚信评价

**Files:**
- Modify: `原型设计/12f-credit-evaluation.html`

**Content design:**
- **Gov (监管端)**: 评价体系 + 信用列表 + 评分规则（保留现有并增强）
- **Org (机构端)**: 本机构信用评分查看 + 评价明细 + 变更历史
- **Enterprise**: 无（企业通过网店查看机构信用）

- [ ] **Step 1: 添加角色监听 JS**
- [ ] **Step 2: 用 role-gov 包裹现有监管端内容并添加数据看板**

在 Gov 区域顶部添加：
```html
<div class="role-gov">
  <div class="row mb-16">
    <div class="col-3"><div class="stat-card" style="padding:20px 16px;"><div class="number" style="font-size:32px;">8</div><div class="label">五星机构</div></div></div>
    <div class="col-3"><div class="stat-card" style="padding:20px 16px;"><div class="number" style="font-size:32px;">12</div><div class="label">四星机构</div></div></div>
    <div class="col-3"><div class="stat-card stat-warning" style="padding:20px 16px;"><div class="number" style="font-size:32px;">6</div><div class="label">三星及以下</div></div></div>
    <div class="col-3"><div class="stat-card" style="padding:20px 16px;"><div class="number" style="font-size:32px;">5</div><div class="label">本月信用变更</div></div></div>
  </div>
</div>
```

- [ ] **Step 3: 添加 Gov 信用列表表格**

在现有评价体系内容后添加：
```html
<div class="role-gov">
  <div class="card p-24 mt-24">
    <h4 class="mb-16">机构信用列表</h4>
    <div class="search-bar">
      <input type="text" class="form-input" placeholder="搜索机构名称...">
      <select class="form-select" style="width:auto;min-width:130px;"><option>全部星级</option><option>五星</option><option>四星</option><option>三星</option><option>二星</option><option>一星</option></select>
    </div>
    <table class="table">
      <thead><tr><th>机构名称</th><th>信用评分</th><th>星级</th><th>上次评定时间</th><th>操作</th></tr></thead>
      <tbody>
        <tr><td><strong>XX人力资源有限公司</strong></td><td><span style="color:var(--success);font-weight:600;">268</span></td><td><span class="star-rating">★★★★★</span></td><td>2026-04-01</td><td><button class="btn btn-secondary btn-sm mr-8">查看详情</button><button class="btn btn-primary btn-sm">调整星级</button></td></tr>
        <tr><td><strong>XX人才服务集团</strong></td><td><span style="color:var(--success);font-weight:600;">245</span></td><td><span class="star-rating">★★★★★</span></td><td>2026-04-01</td><td><button class="btn btn-secondary btn-sm mr-8">查看详情</button><button class="btn btn-primary btn-sm">调整星级</button></td></tr>
        <tr><td><strong>XX科技服务公司</strong></td><td><span style="color:var(--warning);font-weight:600;">195</span></td><td><span class="star-rating">★★★★☆</span></td><td>2026-04-01</td><td><button class="btn btn-secondary btn-sm mr-8">查看详情</button><button class="btn btn-primary btn-sm">调整星级</button></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 4: 添加机构端内容（本机构信用评分）**

```html
<div class="role-org" style="display:none;">
  <!-- 本机构信用概览 -->
  <div class="row mb-16">
    <div class="col-6">
      <div class="card p-24" style="text-align:center;">
        <div class="number" style="font-size:52px;">268</div>
        <div class="star-rating" style="font-size:28px;">★★★★★</div>
        <p class="mt-8"><strong>五星级机构</strong></p>
        <p class="text-small">较上次评定 ↑2分</p>
      </div>
    </div>
    <div class="col-6">
      <div class="card p-24" style="height:100%;">
        <h4 class="mb-16">评分明细</h4>
        <div class="mb-8" style="display:flex;justify-content:space-between;"><span>合规运营</span><span><strong>90</strong>/100</span></div>
        <div class="progress-bar mb-8"><div class="progress-fill" style="width:90%;"></div></div>
        <div class="mb-8" style="display:flex;justify-content:space-between;"><span>服务质量</span><span><strong>85</strong>/100</span></div>
        <div class="progress-bar mb-8"><div class="progress-fill" style="width:85%;"></div></div>
        <div class="mb-8" style="display:flex;justify-content:space-between;"><span>争议处理</span><span><strong>92</strong>/100</span></div>
        <div class="progress-bar mb-8"><div class="progress-fill" style="width:92%;"></div></div>
        <div style="display:flex;justify-content:space-between;"><span>稳就业贡献</span><span><strong>1</strong>/100（+1加分项）</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:1%;"></div></div>
      </div>
    </div>
  </div>

  <!-- 客户评价 -->
  <div class="card p-24">
    <h4 class="mb-16">客户评价</h4>
    <div class="card p-16 mb-8" style="background:var(--bg-secondary);">
      <div style="display:flex;justify-content:space-between;">
        <div><strong>XX科技有限公司</strong> <span class="star-rating">★★★★★</span></div>
        <span class="text-small">2026-05-10</span>
      </div>
      <p class="text-small mt-8">服务态度很好，响应迅速，推荐的专业人员非常符合我们的需求。</p>
    </div>
    <div class="card p-16" style="background:var(--bg-secondary);">
      <div style="display:flex;justify-content:space-between;">
        <div><strong>XX制造有限公司</strong> <span class="star-rating">★★★★☆</span></div>
        <span class="text-small">2026-04-28</span>
      </div>
      <p class="text-small mt-8">整体服务不错，人员在岗稳定性高，建议增加更多培训支持。</p>
    </div>
  </div>
</div>
```

---

### Task 7: 验证与修复

**Files:** All modified files

- [ ] **Step 1: HTML 语法校验**

检查所有编辑过的 HTML 文件是否有未闭合的标签、重复的 ID、语法错误。

```bash
# 检查是否有基本的 HTML 结构问题
grep -n "未闭合标签\|重复ID" 原型设计/12*.html
```

- [ ] **Step 2: 功能验证清单**

打开 `原型设计/index.html` 在浏览器中测试：

1. 角色切换到"服务机构" → 机构管理应显示机构信息管理内容
2. 角色切换到"用工企业" → 线上服务网店应显示服务商城
3. 角色切换到"人社部门" → 所有功能应保持原样
4. Tab 切换正常
5. 模态框打开关闭正常
6. 通知消息正常显示

- [ ] **Step 3: 样式一致性检查**

确保新添加的内容使用了 style.css 中已有的 CSS 类（`.card`, `.btn`, `.btn-primary`, `.form-input`, `.table`, `.badge` 等），没有使用内联样式破坏主题一致性。

