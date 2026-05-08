# Policy Calculator PRD Feature Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the policy calculator prototype HTML to include 4 new policy documents with clause data and 2 new service items, fulfilling PRD 2.9.1 and 2.9.2 requirements.

**Architecture:** Single-file HTML prototype modification. Each new policy gets an HTML entry in the modal and a corresponding JS object in the `policyData` array with full clause details. Each new service item gets an HTML entry with process steps and required materials.

**Tech Stack:** HTML, CSS (existing style.css), Vanilla JavaScript

---

## File Structure

- **Modify:** `原型设计/6-policy-calculator.html`
  - Add 4 new policy HTML entries in `#policy-library-modal .modal-body` (after line 585)
  - Add 4 new policy objects to `policyData` JS array (after line 1388)
  - Add 2 new service item HTML entries in `#service-item-modal .modal-body` (after line 689)

---

### Task 1: Add Policy #4 — 《失业保险稳岗返还实施办法》HTML Entry

**Files:**
- Modify: `原型设计/6-policy-calculator.html:585-586` (insert after existing 3rd policy card)

- [ ] **Step 1: Insert HTML entry for Policy #4**

```html
      <div class="card mb-16" style="border-left: 4px solid var(--success);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h4 style="margin: 0 0 8px 0;">《失业保险稳岗返还实施办法》</h4>
            <p class="text-small">文件编号：RS-2026-035 | 发布日期：2026-04-01</p>
            <div class="mt-8">
              <span class="tag">稳岗返还</span>
              <span class="tag">失业保险</span>
              <span class="tag">企业优惠</span>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showPolicyDetail(3)">查看拆解</button>
        </div>
      </div>
```

Run: Verify the HTML was inserted correctly by reading lines 585-610 of the file.
Expected: The new policy card appears after the 3rd policy, with `onclick="showPolicyDetail(3)"`.

- [ ] **Step 2: Commit**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加第4条政策《失业保险稳岗返还实施办法》HTML条目

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Add Policy #4 JS Data — 《失业保险稳岗返还实施办法》

**Files:**
- Modify: `原型设计/6-policy-calculator.html:1388-1389` (insert after last `}` of existing `policyData` array)

- [ ] **Step 1: Insert JS object for Policy #4**

```javascript
  ,
  {
    title: '《失业保险稳岗返还实施办法》',
    summary: '对不裁员或少裁员的参保企业实施稳岗返还政策，困难企业享受更高返还比例，支持企业稳定就业岗位。',
    clauses: [
      { title: '一般企业稳岗返还', content: '对不裁员或少裁员的参保企业，返还其上年度实际缴纳失业保险费的60%', condition: '参保企业，不裁员或少裁员', amount: '失业保险费的60%' },
      { title: '困难企业稳岗返还', content: '对面临暂时性生产经营困难且恢复有望的企业，返还上年度失业保险费的70%', condition: '参保企业，困难企业认定', amount: '失业保险费的70%' }
    ]
  }
```

Run: Verify the JS object was inserted by reading lines 1388-1410 of the file.
Expected: New object with `title`, `summary`, and `clauses` array is at index 3 in `policyData`.

- [ ] **Step 2: Commit**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加第4条政策《失业保险稳岗返还实施办法》JS数据

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Add Policy #5 — 《职业技能提升行动计划》HTML + JS

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (HTML after Policy #4, JS after Policy #4 data)

- [ ] **Step 1: Insert HTML entry for Policy #5**

```html
      <div class="card mb-16" style="border-left: 4px solid var(--warning);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h4 style="margin: 0 0 8px 0;">《职业技能提升行动计划》</h4>
            <p class="text-small">文件编号：RS-2026-042 | 发布日期：2026-04-15</p>
            <div class="mt-8">
              <span class="tag">培训资助</span>
              <span class="tag">技能提升</span>
              <span class="tag">职业培训</span>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showPolicyDetail(4)">查看拆解</button>
        </div>
      </div>
```

- [ ] **Step 2: Insert JS object for Policy #5**

```javascript
  ,
  {
    title: '《职业技能提升行动计划》',
    summary: '全面推进职业技能提升行动，对参加职业技能培训并取得证书的人员给予补贴，支持企业开展新型学徒制培训，加快培养高技能人才。',
    clauses: [
      { title: '技能培训补贴', content: '参加职业技能培训并取得职业资格证书的，给予最高3000元培训补贴', condition: '个人参加培训并取得证书', amount: '最高3000元' },
      { title: '新型学徒制培训', content: '企业开展新型学徒制培训的，按每人每年4000元标准给予补贴', condition: '企业开展学徒制培训', amount: '4000元/人/年' },
      { title: '高技能人才培养', content: '对培养高技能人才的企业给予一次性奖励，每培养一名高级工奖励1000元', condition: '企业培养高技能人才', amount: '1000元/人' }
    ]
  }
```

Run: Verify both HTML and JS were inserted correctly.
Expected: Policy #5 HTML appears after Policy #4, JS object at index 4 in `policyData`.

- [ ] **Step 3: Commit**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加第5条政策《职业技能提升行动计划》HTML条目和JS数据

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: Add Policy #6 — 《创业担保贷款实施细则》HTML + JS

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (HTML after Policy #5, JS after Policy #5 data)

- [ ] **Step 1: Insert HTML entry for Policy #6**

```html
      <div class="card mb-16" style="border-left: 4px solid var(--primary-gradient-end);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h4 style="margin: 0 0 8px 0;">《创业担保贷款实施细则》</h4>
            <p class="text-small">文件编号：RS-2026-048 | 发布日期：2026-05-01</p>
            <div class="mt-8">
              <span class="tag">创业扶持</span>
              <span class="tag">担保贷款</span>
              <span class="tag">创业服务</span>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showPolicyDetail(5)">查看拆解</button>
        </div>
      </div>
```

- [ ] **Step 2: Insert JS object for Policy #6**

```javascript
  ,
  {
    title: '《创业担保贷款实施细则》',
    summary: '为符合条件的个人和小微企业提供创业担保贷款支持，降低创业融资成本，简化贷款审批流程，支持创业者成功创业。',
    clauses: [
      { title: '个人创业贷款', content: '符合条件的个人可申请最高30万元的创业担保贷款，财政给予贴息', condition: '个人创业，信用良好', amount: '最高30万元' },
      { title: '小微企业贷款', content: '小微企业可申请最高300万元的创业担保贷款，财政给予部分贴息', condition: '小微企业，带动就业5人以上', amount: '最高300万元' }
    ]
  }
```

Run: Verify both HTML and JS were inserted correctly.
Expected: Policy #6 HTML appears after Policy #5, JS object at index 5 in `policyData`.

- [ ] **Step 3: Commit**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加第6条政策《创业担保贷款实施细则》HTML条目和JS数据

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: Add Policy #7 — 《重点群体就业帮扶政策》HTML + JS

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (HTML after Policy #6, JS after Policy #6 data)

- [ ] **Step 1: Insert HTML entry for Policy #7**

```html
      <div class="card" style="border-left: 4px solid var(--warning);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h4 style="margin: 0 0 8px 0;">《重点群体就业帮扶政策》</h4>
            <p class="text-small">文件编号：RS-2026-055 | 发布日期：2026-05-05</p>
            <div class="mt-8">
              <span class="tag">就业帮扶</span>
              <span class="tag">重点群体</span>
              <span class="tag">社保补贴</span>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showPolicyDetail(6)">查看拆解</button>
        </div>
      </div>
```

- [ ] **Step 2: Insert JS object for Policy #7**

```javascript
  ,
  {
    title: '《重点群体就业帮扶政策》',
    summary: '针对高校毕业生、就业困难人员、退役军人、农民工等重点群体，提供专项就业帮扶和社保补贴，促进重点群体稳定就业。',
    clauses: [
      { title: '重点群体社保补贴', content: '企业招用重点群体人员的，按实际缴纳社保费的50%给予补贴', condition: '企业招用重点群体，签订1年以上劳动合同', amount: '社保缴费的50%' },
      { title: '公益性岗位补贴', content: '对通过公益性岗位安置重点群体的单位，给予岗位补贴和社会保险补贴', condition: '公益性岗位安置重点群体', amount: '当地最低工资标准的50%-100%' }
    ]
  }
```

Run: Verify both HTML and JS were inserted correctly.
Expected: Policy #7 HTML is the last card in the modal, JS object at index 6 in `policyData` (last item).

- [ ] **Step 3: Commit**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加第7条政策《重点群体就业帮扶政策》HTML条目和JS数据

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: Add Service Item #4 — 稳岗返还办理

**Files:**
- Modify: `原型设计/6-policy-calculator.html:689-690` (insert after existing 3rd service item card)

- [ ] **Step 1: Insert HTML entry for Service Item #4**

```html
      <div class="card mb-16" style="border-left: 4px solid var(--success);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="flex: 1;">
            <h4 style="margin: 0 0 8px 0;">稳岗返还办理</h4>
            <p class="text-small" style="color: var(--text-secondary); margin-bottom: 12px;">事项编码：RS-SER-004 | 事项类型：补贴申领 | 承诺时限：10个工作日</p>
            <div class="row">
              <div class="col-6">
                <h5 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">办理流程</h5>
                <ol style="font-size: 13px; color: var(--text-secondary); padding-left: 20px; line-height: 1.8;">
                  <li>企业在线申请</li>
                  <li>人社部门初审</li>
                  <li>参保数据核实</li>
                  <li>公示（3个工作日）</li>
                  <li>资金拨付</li>
                </ol>
              </div>
              <div class="col-6">
                <h5 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">所需材料</h5>
                <ul style="font-size: 13px; color: var(--text-secondary); padding-left: 20px; line-height: 1.8;">
                  <li>企业营业执照副本</li>
                  <li>参保缴费证明</li>
                  <li>不裁员少裁员承诺书</li>
                  <li>银行账户信息</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
```

Run: Verify the HTML was inserted correctly by reading lines 689-730 of the file.
Expected: New service item card appears after the 3rd item, with correct encoding RS-SER-004.

- [ ] **Step 2: Commit**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加第4项服务事项「稳岗返还办理」HTML条目

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 7: Add Service Item #5 — 社保减免办理

**Files:**
- Modify: `原型设计/6-policy-calculator.html` (insert after Service Item #4)

- [ ] **Step 1: Insert HTML entry for Service Item #5**

```html
      <div class="card" style="border-left: 4px solid var(--primary);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="flex: 1;">
            <h4 style="margin: 0 0 8px 0;">社保减免办理</h4>
            <p class="text-small" style="color: var(--text-secondary); margin-bottom: 12px;">事项编码：RS-SER-005 | 事项类型：减免申请 | 承诺时限：7个工作日</p>
            <div class="row">
              <div class="col-6">
                <h5 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">办理流程</h5>
                <ol style="font-size: 13px; color: var(--text-secondary); padding-left: 20px; line-height: 1.8;">
                  <li>企业在线申请</li>
                  <li>资格审核</li>
                  <li>社保系统调整</li>
                  <li>减免实施</li>
                  <li>结果反馈</li>
                </ol>
              </div>
              <div class="col-6">
                <h5 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">所需材料</h5>
                <ul style="font-size: 13px; color: var(--text-secondary); padding-left: 20px; line-height: 1.8;">
                  <li>企业营业执照</li>
                  <li>社保登记证</li>
                  <li>社保减免申请表</li>
                  <li>上年度财务报表</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
```

Run: Verify the HTML was inserted correctly.
Expected: New service item card is the last item in the service item modal.

- [ ] **Step 2: Commit**

```bash
git add "原型设计/6-policy-calculator.html"
git commit -m "feat: 添加第5项服务事项「社保减免办理」HTML条目

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - [x] Design 1 (政策文件库扩充) → Tasks 1-5 implement adding 4 new policies with full HTML + JS data
   - [x] Design 2 (服务事项库扩充) → Tasks 6-7 implement adding 2 new service items with full HTML
   - [x] Design 3 (AI技术标签) → Already completed in earlier session
   - [x] Design 4 (测算功能增强) → Already completed in earlier session
   - [x] Design 5 (动态监测) → Already completed in earlier session

2. **Placeholder scan:** No TBD/TODO/placeholder text found. All code blocks contain actual HTML and JS.

3. **Type consistency:** All `showPolicyDetail()` calls use correct sequential indices (3, 4, 5, 6). The `policyData` array entries match these indices.

4. **Scope check:** All tasks are independent edits to a single file, each producing a verifiable change. Suitable for subagent-driven development.
