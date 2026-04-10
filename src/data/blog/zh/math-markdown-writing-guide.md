---
title: "博客写作指南"
pubDatetime: 2026-04-09T10:00:00+08:00
description: "介绍如何用 Markdown + MathJax 写出接近数学论文排版的博客：多级标题、加粗、插图、公式与公式引用、定理环境等。"
tags: ["写作", "markdown", "mathjax", "数学"]
draft: false
timezone: "Asia/Shanghai"
---

## 1. 文件放哪里、怎么命名

本博客的文章是 Markdown 文件，放在：

- 中文：`src/data/blog/zh/`
- 英文：`src/data/blog/en/`

文件名会成为文章的 URL slug（例如 `math-markdown-writing-guide.md` 对应 `/zh/blog/math-markdown-writing-guide/`）。

注意：以下划线 `_` 开头的文件或目录会被忽略，不会出现在博客列表里。

## 2. 文章头部信息（frontmatter）

每篇文章顶部需要一段 YAML frontmatter，最常用的是：

```yaml
---
title: "标题"
pubDatetime: 2026-04-09T10:00:00+08:00
description: "一句话摘要"
tags: ["tag1", "tag2"]
draft: false
timezone: "Asia/Shanghai"
---
```

其中：

- `title`、`pubDatetime`、`description` 是必须项
- `tags` 用于标签页与筛选
- `draft: true` 会在生产环境隐藏（本地开发可见）
- `timezone` 可选，用于展示时间时的时区

## 3. 多级标题与段落

Markdown 标题用 `#` 表示层级：

```md
# 一级标题（通常不要用，页面已有主标题）

## 二级标题

### 三级标题

#### 四级标题
```

段落就是普通文字，段落之间空一行即可。

## 4. 强调：粗体、斜体、行内代码

```md
这是 **粗体**，这是 _斜体_，这是 `行内代码`。
```

## 5. 列表与引用块

无序列表：

```md
- 第一条
- 第二条
  - 子项
```

有序列表：

```md
1. 第一步
2. 第二步
```

引用块（适合写注记、备注）：

```md
> 这是一个引用块。
```

## 6. 公式：行内、块公式、编号与引用

本博客已启用 MathJax，你可以直接写 LaTeX。

### 6.1 行内公式

```tex
行内：$E = mc^2$。
```

### 6.2 块公式（不编号）

```tex
$$
\int_0^1 x^2\,dx=\frac{1}{3}.
$$
```

### 6.3 块公式（带编号）+ `\label` + `\eqref`

推荐使用 `equation` 环境来做“可引用”的编号公式：

```tex
\begin{equation}
\label{eq:kahler}
\omega = \sqrt{-1}\, g_{i\bar{j}}\, dz^i \wedge d\bar{z}^j.
\end{equation}

由 \eqref{eq:kahler} 可知……
```

不要把 `$$ ... $$` 和 `\begin{equation}...\end{equation}` 套在一起，否则编号/引用可能异常。

### 6.4 多行公式（`align`）

```tex
\begin{align}
\label{eq:two-lines}
a^2 - b^2 &= (a-b)(a+b), \\
\nabla \cdot (\nabla u) &= \Delta u.
\end{align}
```

同样可以用 `\eqref{eq:two-lines}` 来引用。

## 7. 定理环境（theorem / lemma / definition）

MathJax 支持使用 `\newtheorem` 定义定理类环境。你可以在文章里声明一次，然后使用它：

```tex
\newtheorem{theorem}{Theorem}
\newtheorem{lemma}{Lemma}
\newtheorem{definition}{Definition}

\begin{theorem}[Compactness]
\label{thm:compact}
Every sequence has a convergent subsequence under suitable assumptions.
\end{theorem}

见 Theorem~\ref{thm:compact}。
```

如果你希望显示中文标题，也可以这样写（显示效果取决于字体与浏览器）：

```tex
\newtheorem{theorem}{定理}
```

建议：同一篇文章内 `\label{...}` 唯一；不同文章之间也尽量避免使用过于通用的 label 名称（例如都叫 `eq:1`）。

## 8. 插入图片（Markdown 与 figure）

把图片放在 `public/` 下，然后用绝对路径引用即可。

### 8.1 最简单的 Markdown 图片

```md
![一张图片](/xuanxuan.jpeg)
```

### 8.2 带标题的 figure

```html
<figure>
  <img src="/xuanxuan.jpeg" alt="示例图片" />
  <figcaption>图 1：示例图片。</figcaption>
</figure>
```

## 9. 代码块（带语法高亮）

```ts
export function add(a: number, b: number) {
  return a + b;
}
```

## 10. 常见问题

- 公式引用不生效：确认使用了 `equation/align` + `\label`，并用 `\eqref{...}` 或 `\ref{...}` 引用
- 切换语言时报 label 重复：确保每次页面切换都会重新 typeset（站点已处理）；同时尽量避免同一页面重复定义同一个 label
- 图片不显示：确认文件在 `public/` 下，引用路径以 `/` 开头，大小写与扩展名一致
