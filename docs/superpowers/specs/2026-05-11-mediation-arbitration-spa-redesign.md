---
name: mediation-arbitration-spa-redesign
description: 调解仲裁服务平台重构为SPA架构 - 主页面角色选择+iframe内容区
type: spec
---

# 调解仲裁服务平台 SPA 重构设计

## 1. 目标

将调解仲裁模块重构为单页面应用（SPA）：
- 主页面 = 角色选择器 + iframe 内容区
- 点击角色 → iframe 加载对应子页面内容

## 2. 架构

```
┌─────────────────────────────────────────────────────┐
│  顶部导航栏：角色选择下拉菜单                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│                   iframe 内容区                      │
│    ┌─────────────────────────────────────────┐     │
│    │  根据 URL 参数 ?role=xxx 加载对应页面     │     │
│    │  - laborer   → 14c-laborer.html         │     │
│    │  - employer  → 14b-employer.html        │     │
│    │  - arbitration → 14a-arbitration.html   │     │
│    │  - supervisor → 14e-supervisor.html     │     │
│    │  - legal-aid → 14d-legal-aid.html       │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 3. 文件变更

| 文件 | 操作 | 说明 |
|------|------|------|
| `14-mediation-arbitration.html` | 重构 | 主页面：角色选择 + iframe 容器 |
| `14c-laborer.html` | 调整 | 移除独立导航栏，适配iframe |
| `14b-employer.html` | 调整 | 同上 |
| `14a-arbitration.html` | 调整 | 同上 |
| `14e-supervisor.html` | 调整 | 同上 |
| `14d-legal-aid.html` | 调整 | 同上 |

## 4. 交互逻辑

### 主页面 (`14-mediation-arbitration.html`)

**顶部导航栏：**
```html
<select id="role-select" onchange="loadRole(this.value)">
  <option value="">选择角色进入</option>
  <option value="laborer">劳动者端</option>
  <option value="employer">用人单位端</option>
  <option value="arbitration">仲裁机构端</option>
  <option value="supervisor">人社监管端</option>
  <option value="legal-aid">法律援助端</option>
</select>
```

**内容区：**
```html
<iframe id="content-frame" src="14c-laborer.html" frameborder="0"></iframe>
```

**JS 逻辑：**
```javascript
const ROLE_PAGES = {
  'laborer': '14c-laborer.html',
  'employer': '14b-employer.html',
  'arbitration': '14a-arbitration.html',
  'supervisor': '14e-supervisor.html',
  'legal-aid': '14d-legal-aid.html'
};

function loadRole(role) {
  if (role && ROLE_PAGES[role]) {
    document.getElementById('content-frame').src = ROLE_PAGES[role];
  }
}

// URL 参数自动加载对应角色
const params = new URLSearchParams(window.location.search);
const role = params.get('role');
if (role) {
  loadRole(role);
}
```

### 子页面调整

每个子页面需要：
1. **移除独立导航栏** - 不需要顶部 navbar
2. **保留左侧菜单** - 作为 iframe 内的导航
3. **内容区域适应** - 宽度 100%，无外部边距

## 5. 样式适配

**主页面样式：**
```css
.content-wrapper {
  height: calc(100vh - 60px); /* 减去导航栏高度 */
  overflow: hidden;
}

#content-frame {
  width: 100%;
  height: 100%;
  border: none;
}
```

**子页面样式调整：**
- 移除 `<nav class="navbar">`
- 内容区 padding-top 设为 0
- 左侧 sidebar 固定高度适配

## 6. 默认行为

- 默认加载：劳动者端 (`14c-laborer.html`)
- URL 参数：`?role=arbitration` 加载仲裁机构端
- 页面刷新：保持当前角色状态

## 7. 验收标准

- [ ] 主页面顶部显示角色选择下拉菜单
- [ ] 选择角色后 iframe 加载对应子页面
- [ ] URL 参数 ?role=xxx 可直接跳转到对应角色
- [ ] 子页面在 iframe 内正常显示功能
- [ ] 页面刷新后保持当前角色状态