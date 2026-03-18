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
For posts with Mermaid diagrams, add `mermaid = true` to front matter — this triggers Blowfish's Mermaid.js loader via `layouts/partials/extend-head-uncached.html`.

```toml
+++
title = "My Post"
date = 2026-01-23T10:00:00-08:00
draft = false
mermaid = true   # add when post contains ```mermaid code fences
+++
```

### Mermaid Diagrams
Use standard code fences:
````
```mermaid
graph TD
  A --> B
```
````
Blowfish's `{{< mermaid >}}` shortcode also works (auto-loads JS without front matter flag).

### CI/CD
GitHub Actions (`.github/workflows/hugo.yml`) builds with Hugo 0.157.0 extended and deploys to GitHub Pages on push to `master`. Uses `submodules: recursive` to fetch Blowfish.
