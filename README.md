# English Grammar Master - Hugo Static Website

A production-ready, SEO-optimized static website for learning English grammar built with Hugo. Features comprehensive lessons, interactive quizzes, and a blog system.

## Features

✅ **Fully Mobile Responsive** - Perfect display on all devices
✅ **SEO Optimized** - Automatic sitemap, meta tags, schema markup
✅ **Fast Loading** - Optimized CSS, lazy loading images, minimal JavaScript
✅ **Accessible** - WCAG AA compliant with proper ARIA labels
✅ **Clean URLs** - No .html extensions
✅ **Interactive Quizzes** - JavaScript-powered with localStorage
✅ **Blog System** - Pagination, tags, categories
✅ **GitHub Pages Compatible** - Ready for deployment

## Quick Start

### Prerequisites

- Hugo Extended (latest version)
- Git

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd grammar-site
```

2. Run the development server:
```bash
hugo server -D
```

3. Open your browser to `http://localhost:1313`

## Project Structure

```
grammar-site/
├── config.toml              # Hugo configuration
├── content/                 # All content files
│   ├── _index.md           # Homepage
│   ├── grammar/            # Grammar lessons
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── quizzes/            # Interactive quizzes
│   ├── blog/               # Blog posts
│   ├── about.md
│   └── contact.md
├── layouts/                # HTML templates
│   ├── _default/
│   ├── grammar/
│   ├── quiz/
│   ├── partials/
│   └── index.html
├── static/                 # Static assets
│   ├── css/
│   ├── js/
│   ├── images/
│   └── audio/
└── data/
    └── navigation.yaml     # Site navigation
```

## Configuration

### Update Base URL

Before deploying, update the `baseURL` in `config.toml`:

```toml
baseURL = "https://yourusername.github.io/repository-name/"
```

### Customize Site Information

Edit `config.toml` to update:
- Site title and description
- Contact email
- Social media links
- Google Analytics ID (optional)

## Content Management

### Adding Grammar Lessons

Create a new markdown file in the appropriate level folder:

```bash
hugo new grammar/beginner/your-lesson-title.md
```

Required front matter:
```yaml
---
title: "Your Lesson Title"
description: "Brief description"
date: 2025-02-14
tags: ["tag1", "tag2"]
category: "Beginner"
toc: true
draft: false
---
```

### Adding Quizzes

Create a quiz file:

```bash
hugo new quizzes/your-quiz-title.md
```

Add quiz questions in front matter:
```yaml
---
title: "Quiz Title"
difficulty: "beginner"
quiz:
  questions:
    - question: "Question text?"
      options:
        - "Option 1"
        - "Option 2"
        - "Option 3"
        - "Option 4"
      correctAnswer: 1
      explanation: "Why this is correct"
---
```

### Adding Blog Posts

```bash
hugo new blog/your-post-title.md
```

## Deployment to GitHub Pages

### Method 1: GitHub Actions (Recommended)

1. Create `.github/workflows/hugo.yml`:

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.138.0
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
      
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      
      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
        run: |
          hugo \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

3. Enable GitHub Pages in repository settings:
   - Go to Settings > Pages
   - Source: GitHub Actions

### Method 2: Manual Deployment

1. Build the site:
```bash
hugo --minify
```

2. Deploy the `public/` folder to your hosting provider

## SEO Features

### Automatic Sitemap
Generated at `/sitemap.xml`

### Robots.txt
Configured to allow all crawlers

### Meta Tags
- Title tags
- Meta descriptions
- Open Graph tags
- Twitter Cards
- Canonical URLs

### Structured Data
- Organization schema
- Article schema
- FAQ schema
- Breadcrumb schema

## Performance Optimization

- **Lazy loading** for images
- **Minified CSS**
- **Minimal JavaScript**
- **Optimized images** with srcset
- **No blocking scripts**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Screen reader compatible
- Color contrast (WCAG AA)

## Customization

### Changing Colors

Edit CSS variables in `static/css/main.css`:

```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #7c3aed;
  --color-accent: #f59e0b;
  /* ... */
}
```

### Adding New Sections

1. Create content folder
2. Create layout in `layouts/`
3. Add to navigation in `data/navigation.yaml`

## Troubleshooting

### Site not building?
- Check Hugo version: `hugo version`
- Ensure you're using Hugo Extended
- Verify all front matter is valid YAML

### Images not loading?
- Place images in `static/images/`
- Reference as `/images/filename.jpg`
- Check file paths are correct

### Quiz not working?
- Verify quiz data is valid JSON in front matter
- Check browser console for errors
- Ensure quiz.js is loading

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, contact: abid.raza99110@gmail.com

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Hugo
