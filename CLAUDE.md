# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

人社服务数字化平台原型项目，包含4个核心模块的静态HTML页面，无构建系统。

**项目路径**: `/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景/`

## 核心模块

| 模块 | 入口文件 | 说明 |
|------|----------|------|
| 政策计算器 | `原型设计/6-policy-calculator.html` | 多维度政策红利计算 |
| 就业人员画像 | `原型设计/9-employment-portrait.html` | 就业主体数字画像 |
| 人力资源旗舰店 | `原型设计/12-hr-flagship.html` | 线上服务网店 |
| 调解仲裁服务 | `原型设计/14-mediation-arbitration.html` | 在线调解仲裁 |

## 开发命令

### 预览原型
直接用浏览器打开 `原型设计/index.html`，或启动本地服务器：
```bash
cd 原型设计 && python3 -m http.server 8080
```

### 部署到生产环境
```bash
rm -rf /tmp/dalian && cp -r "原型设计" /tmp/dalian
echo "dalian.tianw.xyz" > /tmp/dalian/CNAME
surge /tmp/dalian dalian.tianw.xyz
```

## 架构说明

### 文件结构
- `原型设计/` — 所有HTML原型文件
- `原型设计/style.css` — 全局共享样式（CSS变量定义、组件样式、主题支持）
- `原型设计/assets/` — 共享资源（theme-switch.js等）
- `原型设计/theme-guide.html` — 主题配色参考
- `docs/superpowers/plans/` — 功能开发计划文档

### 技术栈
- 纯HTML + CSS + Vanilla JavaScript（无框架）
- CSS变量实现主题切换（`--primary`、`--bg-primary`等）
- 浅色/深色主题通过`[data-theme="dark"]`选择器覆盖变量

### 主题系统
主题由`localStorage`存储，默认`dark`。页面头部内联脚本在渲染前设置：
```html
<script>(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();</script>
```
切换函数在`原型设计/assets/theme-switch.js`

### 共享样式使用
各页面通过`<link rel="stylesheet" href="style.css">`引入全局样式，使用统一CSS类：
- 布局：`.container`、`.row`、`.col-3/4/6/12`
- 组件：`.card`、`.btn`、`.form-input`、`.modal`
- 数据：`.table`、`.stat-card`、`.badge`

## 设计规范

遵循`design-system-style-guide.md`：
- 栅格：12列，基础间距4/8/12/16/24/32/48px
- 圆角：控件6px、按钮8px、卡片12-16px、弹窗20px
- 配色：主色`#1677ff`（浅色）/`#6366f1`（深色），低饱和度

## 已知约束

- Surge不支持中文路径，部署需复制到`/tmp`临时目录
- 部分页面存在重复函数定义（如`switchTab`），需手动清理
- 某些"确定"按钮的JavaScript函数需验证存在性

## 项目偏好

- 用户要求简洁界面，移除不必要的标题和导航项
- 项目已配置`bypassPermissions`模式，操作无需二次确认