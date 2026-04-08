# yeeyoe.github.io 项目 Code Wiki

## 1. 项目概述 (Project Overview)
本项目是基于 [AstroPaper I18n](https://github.com/yousef8/astro-paper-i18n) 主题定制的个人静态博客网站（yeeyoe.github.io）。
项目利用 Astro 框架生成静态网页，支持中英双语（i18n）、内容集合（Content Collections）管理，并具备搜索、SEO优化、RSS 订阅及自动生成 Open Graph (OG) 图像等核心特性。

## 2. 项目整体架构 (Architecture)
- **核心框架**: [Astro](https://astro.build/) (v5) - 用于构建极速的静态内容网站（SSG）。
- **样式方案**: [Tailwind CSS](https://tailwindcss.com/) (v4) - 采用 `@tailwindcss/vite` 进行原子化样式管理，内置亮/暗色模式切换功能。
- **国际化 (i18n)**: 利用 Astro 的动态路由 `[...locale]` 配合自定义的 i18n 配置文件，实现全站多语言（默认英文 `en`，支持中文 `zh`）的无缝路由和渲染切换。
- **内容管理**: 基于 Astro Content Collections (`src/content.config.ts`) 组织 Markdown 内容，包含 `blog`、`me`、`research`、`teach`、`code` 五大集合。
- **全文搜索**: 集成 [Pagefind](https://pagefind.app/)，在构建后阶段（build）对生成的静态资源构建离线索引，实现快速全文搜索功能。
- **自动化部署**: 依靠 GitHub Actions (`.github/workflows/deploy.yml`) 工作流，自动完成代码校验、构建并将页面产物部署到 GitHub Pages。

## 3. 目录结构与主要模块职责 (Directory Structure)

```text
yeeyoe.github.io/
├── .github/workflows/  # CI/CD 工作流（包含代码检查、测试、GitHub Pages 部署脚本）
├── public/             # 静态公共资源（如图标、主题切换脚本 toggle-theme.js 等）
├── src/                # 源代码核心目录
│   ├── assets/         # 静态资源（主要是用作组件渲染的 SVG 图标）
│   ├── components/     # Astro 通用 UI 组件（Header, Footer, Card, 分页组件、语言切换器等）
│   ├── data/           # Markdown 数据源，划分为 blog, code, me, research, teach 目录
│   ├── i18n/           # 国际化逻辑与配置模块（各语言字典、类型定义、翻译工具函数）
│   ├── layouts/        # 页面布局模板（如主页、文章详情页、基础骨架等）
│   ├── pages/          # Astro 页面路由，基于 [...locale] 动态参数进行多语言页面生成
│   ├── styles/         # 全局样式配置 (global.css, typography.css)
│   ├── utils/          # 核心业务与工具函数（数据获取、过滤、OG 图片生成等）
│   ├── config.ts       # 网站级全局基础配置（网站名称、作者信息、分页设置等）
│   ├── constants.ts    # 全局常量定义（社交媒体链接）
│   └── content.config.ts # Astro Content Collections 数据集合的 Zod 校验规则配置
├── astro.config.ts     # Astro 框架核心配置文件（集成插件、Markdown 插件、Vite 优化等）
├── package.json        # 项目依赖项及运行脚本
└── tsconfig.json       # TypeScript 编译配置文件
```

## 4. 关键模块与类/函数说明 (Key Modules & Functions)

### 4.1 数据层 (`src/content.config.ts`)
通过 Astro 的 `defineCollection` 和 `glob` loader 定义了站点的多组内容集合，使用 Zod 严格校验 Markdown 的 Frontmatter 元数据：
- **`blog` 集合**: 核心文章集合，包含标题 (title)、日期 (pubDatetime)、作者、草稿状态 (draft)、标签 (tags) 和可选的 OG 图片等。

### 4.2 国际化核心 (`src/i18n/`)
- **`config.ts` (`localeToProfile`)**: 定义了项目支持的语言字典对象。每个语言（zh, en）都包含其显示名称、语言包资源 (`messages`)、语言标签 (`langTag`)、文本排列方向 (`direction`) 以及生成 OG 图像使用的字体。
- **`utils.ts`**:
  - `translateFor(locale)`: 返回用于特定语言环境的翻译函数 `t`，能够在组件中安全地获取带变量替换的本地化文本。
  - `getRelativeLocalePath(locale, path)`: 将通用路径转换并格式化为带有正确语言前缀的相对路径。

### 4.3 博客内容处理 (`src/utils/posts.ts`)
负责对 Markdown 集合数据进行读取、过滤和分类：
- `getPosts()`: 获取所有的文章，并支持根据 `draft` 状态和传入的语言环境进行过滤。
- `getPostsByLocale(locale, options)`: 封装了底层方法，专门获取指定语言环境下的所有文章。
- `groupPostsByLocale(posts, options)`: 将文章数组按其所属语言环境（通过文件路径解析）进行分组归类。

### 4.4 图像生成 (`src/utils/generateOgImages.ts`)
动态生成用于社交媒体分享的 Open Graph 预览图：
- 依靠 `satori` 库将预先定义好的 HTML 模板（位于 `src/utils/og-templates`）配合指定字体渲染为 SVG。
- 调用 `@resvg/resvg-js` 的能力（如 `svgBufferToPngBuffer` 函数）将生成的 SVG 转换为 PNG 图片输出。

## 5. 依赖关系 (Dependencies)

- **框架核心**: `astro` (v5), `typescript`
- **UI 及样式**: `tailwindcss` (v4), `@tailwindcss/vite`, `@tailwindcss/typography`
- **构建及搜索**:
  - 搜索能力: `pagefind`, `@pagefind/default-ui`
- **Markdown 扩展**: `remark-toc`, `remark-collapse`
- **SEO 与 RSS 集成**: `@astrojs/sitemap`, `@astrojs/rss`
- **图片处理**: `satori`, `@resvg/resvg-js`, `sharp`
- **开发及代码质量**: `vitest` (测试), `eslint`, `prettier`, `husky` (Git Hooks), `lint-staged`

## 6. 项目运行与部署方式 (Running & Deployment)

### 6.1 环境要求
- **Node.js**: `v20.19.0`
- **包管理器**: `pnpm` `v10.6.5`（项目配置了 `volta` 字段以统一工具链版本）

### 6.2 本地运行
1. **安装依赖**:
   ```bash
   pnpm install
   ```
2. **启动本地开发服务器**:
   ```bash
   pnpm run dev
   ```
   启动后，访问 `http://localhost:4321` 即可预览站点。

### 6.3 生产构建与本地预览
1. **执行构建**:
   ```bash
   pnpm run build
   ```
   > 构建命令会自动运行 `astro build` 输出静态页面，接着通过 `pagefind --site dist` 基于产物建立搜索索引，最后将索引文件复制回可公开访问的目录中。
2. **本地预览**:
   ```bash
   pnpm run preview
   ```

### 6.4 代码规范与测试
- **格式化**: `pnpm run format` (基于 Prettier 修复代码格式)
- **代码检查**: `pnpm run lint` (运行 ESLint)
- **类型检查**: `pnpm run type-check` (执行 Astro 类型检测)
- **单元测试**: `pnpm run test` (基于 Vitest 运行所有单元测试)

### 6.5 自动化部署 (CI/CD)
项目的 `.github/workflows/deploy.yml` 定义了自动化部署工作流。当代码被推送 (push) 到 `main` 分支时：
1. **检查阶段**: 并发运行 `code-standards-checks.yml` 与 `tests.yml` 验证代码规范和单元测试。
2. **构建阶段**: 检出代码、设置 Node.js 和 pnpm 环境，然后执行 `pnpm run build`。
3. **发布阶段**: 将 `dist` 目录打包作为 Artifact，并利用官方动作 `actions/deploy-pages@v4` 部署到 GitHub Pages。
