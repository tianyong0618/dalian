# 项目部署文档

## 概述

本项目使用 [Surge](https://surge.sh) 进行静态网站部署，域名使用 `dalian.tianw.xyz`。

## 前置条件

1. **安装 Surge**

```bash
npm install -g surge
```

2. **登录 Surge**

```bash
surge login
```

当前登录账号：`tianyong0618@sohu.com`

## 部署步骤

### 1. 配置 DNS（首次部署需操作）

在域名服务商（tianw.xyz）的 DNS 管理中添加 CNAME 记录：

| 主机名 | 类型 | 指向 |
|--------|------|------|
| dalian | CNAME | surge.sh |

> DNS 生效时间通常为几分钟到几小时，可用以下命令验证：
> ```bash
> dig @8.8.8.8 dalian.tianw.xyz +short
> ```

### 2. 准备部署文件

由于 Surge 对中文路径支持有问题，需将文件复制到简单路径下：

```bash
rm -rf /tmp/dalian
cp -r "/Users/tianyong/Documents/works/workspace/hp/汪总/N个主要应用场景/原型设计" /tmp/dalian
```

### 3. 创建 CNAME 文件

```bash
echo "dalian.tianw.xyz" > /tmp/dalian/CNAME
```

### 4. 执行部署

```bash
surge /tmp/dalian dalian.tianw.xyz
```

成功输出示例：

```
Success! - Published to dalian.tianw.xyz
```

## 验证部署

**HTTP 验证：**

```bash
curl -s -o /dev/null -w "%{http_code}" http://dalian.tianw.xyz
```

**HTTPS 验证（证书首次生成需几分钟）：**

```bash
curl -sk -o /dev/null -w "%{http_code}" https://dalian.tianw.xyz
```

**直接通过 IP 验证（绕过本地 DNS 缓存）：**

```bash
curl -s -o /dev/null -w "%{http_code}" --resolve dalian.tianw.xyz:443:138.197.235.123 https://dalian.tianw.xyz
```

## 访问地址

- **生产地址：https://dalian.tianw.xyz**
- 备用地址（surge.sh 子域名）：http://dalian-rsz.surge.sh

## 页面结构

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 | index.html | 原型入口导航页 |
| 人社旗舰店 | 12-hr-flagship.html | 人社旗舰店原型 |
| 调解仲裁 | 14-mediation-arbitration.html | 调解仲裁原型 |
| 政策计算器 | 6-policy-calculator.html | 政策计算器原型 |
| 就业画像 | 9-employment-portrait.html | 就业画像原型 |

## 常见问题

### 部署失败 "Deployment did not succeed"

- 检查 DNS 是否已正确配置 CNAME 指向 `surge.sh`
- 确保没有中文路径（使用 `/tmp` 作为临时部署目录）
- 确认 Surge 已登录：`surge whoami`

### HTTPS 证书错误

Surge 首次部署自定义域名后，SSL 证书需要几分钟生成。可先用 HTTP 访问，或等待后重试 HTTPS。

### 本地 DNS 缓存导致无法访问

可尝试刷新 DNS 缓存，或直接使用公共 DNS（8.8.8.8）验证。
