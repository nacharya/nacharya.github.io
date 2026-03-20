# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Hugo-based static blog deployed to GitHub Pages at `nacharya.github.io`. Uses the **Blowfish** theme (`terminal` color scheme, dark mode) managed as a Git submodule.

## Common Commands

```bash
# Local development with drafts
./review.sh          # runs: hugo server -D

# Build and deploy to GitHub Pages
./deploy.sh

# Create a new blog post
hugo new posts/filename.md

# Initialize theme submodule (after fresh clone)
git submodule init && git submodule update
```

## Architecture

### Config
Split config in `config/_default/`:
- `hugo.toml` — base Hugo settings, taxonomies (tags, categories, series)
- `params.toml` — Blowfish theme params (colorScheme, homepage layout, article display)
- `languages.en.toml` — points `contentDir` to `content/en/`
- `menus.en.toml` — site navigation

### Content Structure
- `content/en/posts/` — Blog posts (Markdown with YAML or TOML front matter)
- `content/en/articles/` — Long-form articles, each in its own subdirectory with `index.md`
- `content/en/about/` — About page (page bundle with images)
- `content/en/projects.md` — Projects page

### Front Matter
Posts use YAML (`---`) or TOML (`+++`) front matter. Set `draft: false` to publish.

```toml
+++
title = "My Post"
date = 2026-01-23T10:00:00-08:00
draft = false
+++
```

---

## Content Extensions

### Mermaid Diagrams

**Always use the `{{< mermaid >}}` shortcode** — Blowfish detects it via `HasShortcode` and loads the JS bundle automatically. No front matter flag needed.

```
{{</* mermaid */>}}
flowchart LR
  A[Start] --> B[End]
{{</* /mermaid */>}}
```

Do **not** use code fences (` ```mermaid `). Blowfish's JS does not process code fences — only the shortcode form works reliably.

Supported diagram types: `flowchart`, `sequenceDiagram`, `stateDiagram-v2`, `classDiagram`, `gitGraph`, `pie`, `erDiagram`.

Avoid emojis in node labels, `%%{init:...}%%` directives, and `font-size`/`font-weight` in `classDef` — these cause parse errors in Mermaid v11.

### Math (KaTeX)

**Always include `{{< katex >}}`** once anywhere on the page to load the KaTeX library. Blowfish loads KaTeX via `HasShortcode "katex"` — the `math = true` front matter flag does nothing.

```
{{</* katex */>}}
```

Then use standard KaTeX notation in the content:

| Type | Syntax | Example |
|---|---|---|
| Inline | `\\( ... \\)` | `\\( e^{i\pi} + 1 = 0 \\)` |
| Block | `$$ ... $$` | `$$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$` |

### Emoji

Emoji shortcodes work globally (`enableEmoji = true` in `hugo.toml`). Use directly in Markdown:

```
:rocket:  :computer:  :gear:  :white_check_mark:  :fire:  :brain:
```

Full reference: https://www.webfx.com/tools/emoji-cheat-sheet/

---

## CI/CD
GitHub Actions (`.github/workflows/hugo.yml`) builds with Hugo 0.157.0 extended and deploys to GitHub Pages on push to `master`. Uses `submodules: recursive` to fetch Blowfish.
