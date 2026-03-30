---
title: "环境自检：Node + Astro（以及为什么我卸载了 Jupyter）"
pubDatetime: 2026-03-29T12:00:00+08:00
description: "一份简短清单，确保 Node/Astro 项目可复现；并记录在 macOS 上干净卸载 Jupyter 的思路。"
tags: ["node", "astro", "工具链", "macos"]
draft: false
timezone: "Asia/Shanghai"
---

## 我希望开发环境具备什么

- 一个项目对应一套可复现的工具链
- Node 版本明确且能被约束
- 包管理器版本尽量固定（锁文件是唯一真相）
- 在“干净安装”的情况下也能稳定通过构建与类型检查

当这些发生漂移时，很多问题会表现为“偶发”：命令找不到、构建结果不一致、依赖解析差异导致的报错等。

## Node：先把版本对齐

这个项目对 Node 有明确版本要求（例如通过 `engines` 和/或 `.nvmrc` 之类的版本文件）。这是必要的，因为现代前端工具链会依赖 Node 的细节行为，“最新版”并不等于“兼容”。

最低限度的检查：

- `node -v` 是否等于项目要求版本
- `pnpm -v` 是否与项目约束一致（或至少与锁文件兼容）

如果 Node 版本不对，优先把 Node 调整正确，再重装依赖。

## Astro：用最稳的方式重装

如果 Astro 出现诸如 `astro: command not found` 这类异常，我一般把它当作“环境漂移”的信号。最稳的重置方式是：

1. 删除 `node_modules`
2. 按锁文件重装依赖
3. 确认 Astro 来自 `node_modules/.bin`
4. 跑 `type-check` 和 `build`

“删掉重装”虽然朴素，但最可靠，也能更早暴露锁文件/依赖问题。

## 为什么我把 Jupyter 从这台机器卸掉

Jupyter 很好用，但如果这台机器主要用于 Node 项目，我不希望：

- Python 包直接装进系统/包管理器托管的解释器里
- 很少用的工具长期以全局方式存在
- 出现 “哪个 python / 哪个 jupyter” 的混乱

如果后续还需要 notebook，我更倾向于用隔离环境（virtualenv/conda/pipx）来装，而不是装进全局 Python。

## 一份日常自检清单

- `node -v` 与项目要求一致
- `pnpm install --frozen-lockfile` 在干净目录下能成功
- `pnpm run type-check` 通过
- `pnpm run build` 输出正常

这四项都稳定后，大部分“工具链问题”就会消失。
