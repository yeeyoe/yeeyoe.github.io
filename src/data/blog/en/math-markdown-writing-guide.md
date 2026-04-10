---
title: "How to write Blog (Markdown + MathJax)"
pubDatetime: 2026-04-09T10:00:00+08:00
description: "How to write blog posts like a math paper: headings, emphasis, images, LaTeX formulas with equation references, and theorem-like environments."
tags: ["writing", "markdown", "mathjax", "math"]
draft: false
timezone: "Asia/Shanghai"
---

## 1. Where to put files, how to name them

Blog posts are Markdown files under:

- English: `src/data/blog/en/`
- Chinese: `src/data/blog/zh/`

The filename becomes the URL slug (e.g. `math-markdown-writing-guide.md` → `/blog/math-markdown-writing-guide/`).

Note: files or folders starting with `_` are ignored and won’t appear in the blog.

## 2. Frontmatter (metadata)

Each post starts with YAML frontmatter. The common fields are:

```yaml
---
title: "Your Title"
pubDatetime: 2026-04-09T10:00:00+08:00
description: "One-line summary"
tags: ["tag1", "tag2"]
draft: false
timezone: "Asia/Shanghai"
---
```

Notes:

- `title`, `pubDatetime`, `description` are required
- `tags` drive the tags pages
- `draft: true` hides the post in production
- `timezone` is optional

## 3. Headings and structure

Markdown headings use `#` levels:

```md
# H1 (usually avoid: the page already has a main title)

## H2

### H3

#### H4
```

Paragraphs are just text separated by blank lines.

## 4. Emphasis: bold, italic, inline code

```md
This is **bold**, this is _italic_, and this is `inline code`.
```

## 5. Lists and blockquotes

Unordered lists:

```md
- Item one
- Item two
  - Sub-item
```

Ordered lists:

```md
1. Step one
2. Step two
```

Blockquotes:

```md
> This is a blockquote.
```

## 6. Math: inline, display, numbering, and references

MathJax is enabled site-wide, so you can write LaTeX directly.

### 6.1 Inline math

```tex
Inline: $E = mc^2$.
```

### 6.2 Display math (unnumbered)

```tex
$$
\int_0^1 x^2\,dx=\frac{1}{3}.
$$
```

### 6.3 Numbered equations + `\label` + `\eqref`

Use an `equation` environment for equations you want to reference:

```tex
\begin{equation}
\label{eq:kahler}
\omega = \sqrt{-1}\, g_{i\bar{j}}\, dz^i \wedge d\bar{z}^j.
\end{equation}

Recall \eqref{eq:kahler}.
```

Avoid nesting `$$ ... $$` around `\begin{equation}...\end{equation}`. It may break numbering and references.

### 6.4 Multi-line equations (`align`)

```tex
\begin{align}
\label{eq:two-lines}
a^2 - b^2 &= (a-b)(a+b), \\
\nabla \cdot (\nabla u) &= \Delta u.
\end{align}
```

Then reference with `\eqref{eq:two-lines}` (or `\ref{...}`).

## 7. Theorem-like environments (theorem / lemma / definition)

MathJax supports `\newtheorem`. Define environments once, then use them:

```tex
\newtheorem{theorem}{Theorem}
\newtheorem{lemma}{Lemma}
\newtheorem{definition}{Definition}

\begin{theorem}[Compactness]
\label{thm:compact}
Every sequence has a convergent subsequence under suitable assumptions.
\end{theorem}

See Theorem~\ref{thm:compact}.
```

Recommendation: keep `\label{...}` unique within a page; and avoid overly generic labels across posts.

## 8. Images (Markdown and figure)

Put images under `public/` and reference them with absolute paths.

### 8.1 Simple Markdown image

```md
![An image](/xuanxuan.jpeg)
```

### 8.2 Figure with caption

```html
<figure>
  <img src="/xuanxuan.jpeg" alt="Example image" />
  <figcaption>Figure 1: An example image.</figcaption>
</figure>
```

## 9. Code blocks (syntax highlighting)

```ts
export function add(a: number, b: number) {
  return a + b;
}
```

## 10. Common pitfalls

- Equation references don’t work: use `equation/align` + `\label`, then `\eqref{...}` or `\ref{...}`
- Labels reported as “multiply defined” after language switching: avoid defining the same `\label` twice in one page
- Images not showing: confirm the file is in `public/`, the URL starts with `/`, and the filename matches exactly
