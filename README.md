# 庄一帆的个人站

前端 · 后端 · 拍摄 · 剪辑 · AIGC

一个用 Markdown 写作、基于 VitePress + Teek 主题构建的个人博客与作品集。

## 栏目

- **技术文章**：前端工程化、后端接口与媒体处理实践
- **视频作品**：短片、产品影像的拍摄与剪辑笔记
- **AIGC 作品**：AI 影像工作流与实验记录
- **关于我**：技能矩阵、工作流与联系方式

## 本地开发

需要 Node.js 18+ 与 pnpm。

```bash
pnpm install
pnpm docs:dev      # 本地开发，默认 http://localhost:5173
pnpm docs:build    # 构建到 docs/.vitepress/dist
pnpm docs:preview  # 预览构建结果
```

## 目录结构

```text
.
├─ docs
│  ├─ index.md              # 首页
│  ├─ 01.技术文章           # 技术文章栏目
│  ├─ 02.视频作品           # 视频作品栏目
│  ├─ 03.AIGC作品           # AIGC 作品栏目
│  ├─ 04.关于               # 关于我
│  ├─ @pages                # 归档 / 分类 / 标签等功能页
│  ├─ public                # 静态资源（图片、视频、Logo）
│  └─ .vitepress
│     ├─ config.ts          # 站点配置（导航、标题、SEO）
│     ├─ teek-config.ts     # Teek 主题配置（Banner、卡片、页脚）
│     └─ theme              # 自定义主题入口与样式
├─ packages                 # Teek 主题源码（本地工作区依赖）
├─ plugins                  # VitePress 插件源码
└─ build                    # 主题构建脚本
```

## 写一篇文章

在对应栏目下新建 Markdown 文件，添加 frontmatter 即可：

```yaml
---
title: 文章标题
date: 2026-11-14 10:00:00
permalink: /tech/frontend/your-slug
categories:
  - 技术文章
  - 前端
tags:
  - VitePress
  - 工程化
coverImg: /blog/bg1.webp
top: false
---
```

- `permalink` 是固定访问地址，发布后不要随意修改
- `coverImg` 为列表与文章页封面
- `top: true` 会出现在首页「精选文章」卡片
- 正文中插入 `<!-- more -->` 可控制首页摘要

## 替换成你自己的信息

站点里预留了几个需要替换的位置：

1. `docs/.vitepress/config.ts` 中的站点域名、GitHub 地址
2. `docs/.vitepress/teek-config.ts` 中的社交账号、页脚链接
3. `docs/04.关于/01.关于我.md` 中的经历与联系方式
4. `docs/public/logo.svg`、`docs/public/avatar.svg` 换成自己的 Logo 与头像

## 部署

构建产物位于 `docs/.vitepress/dist`，可直接部署到 GitHub Pages、Vercel、Netlify 或任意静态托管服务。

## 致谢

主题基于 [Teek](https://github.com/teekhub/vitepress-theme-teek)（MIT License）构建，感谢原作者的出色工作。
