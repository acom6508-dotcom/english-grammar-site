# Grammar Master - Complete Setup Guide

## 🎉 What You've Got

A complete, production-ready Hugo static website for teaching English grammar with:

✅ Mobile-responsive design
✅ SEO-optimized (sitemap, meta tags, schema markup)
✅ Interactive quizzes with localStorage
✅ Blog system with pagination
✅ Clean, semantic HTML5
✅ Fast loading performance
✅ Accessible (WCAG AA)
✅ GitHub Pages ready

## 📁 Complete File Structure

```
grammar-site/
├── .github/
│   └── workflows/
│       └── hugo.yml              # Automatic deployment
├── archetypes/                   # Content templates
├── content/                      # All your content
│   ├── _index.md                # Homepage content
│   ├── about.md                 # About page
│   ├── contact.md               # Contact page
│   ├── blog/
│   │   ├── _index.md
│   │   └── common-grammar-mistakes.md
│   ├── grammar/
│   │   ├── _index.md
│   │   ├── beginner/
│   │   │   ├── _index.md
│   │   │   └── present-simple-tense.md
│   │   ├── intermediate/
│   │   │   ├── _index.md
│   │   │   └── conditional-sentences.md
│   │   └── advanced/
│   │       ├── _index.md
│   │       └── subjunctive-mood.md
│   └── quizzes/
│       ├── _index.md
│       └── present-simple-quiz.md
├── data/
│   └── navigation.yaml          # Site navigation menu
├── layouts/
│   ├── _default/
│   │   ├── baseof.html         # Base template
│   │   ├── list.html           # List pages
│   │   └── single.html         # Single pages
│   ├── blog/
│   │   ├── list.html           # Blog listing
│   │   └── single.html         # Blog post
│   ├── grammar/
│   │   ├── list.html           # Lessons listing
│   │   └── single.html         # Single lesson
│   ├── quiz/
│   │   ├── list.html           # Quiz listing
│   │   └── single.html         # Quiz page
│   ├── partials/
│   │   ├── head.html           # SEO meta tags
│   │   ├── header.html         # Navigation
│   │   ├── footer.html         # Footer
│   │   ├── breadcrumb.html     # Breadcrumbs
│   │   ├── pagination.html     # Pagination
│   │   ├── related.html        # Related posts
│   │   ├── schema.html         # JSON-LD schema
│   │   └── toc.html            # Table of contents
│   ├── index.html              # Homepage template
│   ├── 404.html                # Error page
│   └── robots.txt              # Search engine rules
├── static/
│   ├── css/
│   │   └── main.css            # All styles
│   ├── js/
│   │   ├── main.js             # Main functionality
│   │   └── quiz.js             # Quiz system
│   ├── images/                 # Your images
│   └── audio/                  # Audio files
├── config.toml                 # Hugo configuration
├── .gitignore                  # Git ignore rules
├── README.md                   # Documentation
└── DEPLOYMENT.md               # Deployment guide
```

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Hugo

**Windows:**
```bash
choco install hugo-extended
```

**macOS:**
```bash
brew install hugo
```

**Linux (Ubuntu/Debian):**
```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.138.0/hugo_extended_0.138.0_linux-amd64.deb
sudo dpkg -i hugo_extended_0.138.0_linux-amd64.deb
```

### Step 2: Run the Site

```bash
cd grammar-site
hugo server -D
```

Open your browser to: http://localhost:1313

That's it! Your site is running locally.

## 🌐 Deploy to GitHub Pages (10 Minutes)

### Step 1: Create GitHub Repository

1. Go to github.com
2. Click "New repository"
3. Name it: `grammar-master` (or any name you like)
4. Keep it **Public**
5. Click "Create repository"

### Step 2: Update Configuration

Edit `config.toml` and change line 1:
```toml
baseURL = "https://YOUR-USERNAME.github.io/grammar-master/"
```
Replace YOUR-USERNAME with your GitHub username.

### Step 3: Push to GitHub

```bash
cd grammar-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/grammar-master.git
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Source", select: **GitHub Actions**

Wait 2-3 minutes, then visit:
`https://YOUR-USERNAME.github.io/grammar-master/`

🎉 Your site is live!

## ✏️ Adding Content

### Create a New Grammar Lesson

```bash
hugo new grammar/beginner/your-topic.md
```

Edit the file and add your content. Example:

```markdown
---
title: "Past Simple Tense"
description: "Learn about the past simple tense"
date: 2025-02-14
tags: ["past simple", "verb tenses"]
category: "Beginner"
toc: true
draft: false
---

## Introduction

Your lesson content here...
```

### Create a New Quiz

```bash
hugo new quizzes/past-simple-quiz.md
```

Add quiz questions in the front matter:

```yaml
---
title: "Past Simple Quiz"
difficulty: "beginner"
quiz:
  questions:
    - question: "He ___ to the store yesterday."
      options:
        - "go"
        - "goes"
        - "went"
        - "gone"
      correctAnswer: 2
      explanation: "We use 'went' for past simple."
---
```

### Create a New Blog Post

```bash
hugo new blog/grammar-tips.md
```

Write your post:

```markdown
---
title: "5 Grammar Tips for Beginners"
description: "Essential grammar tips"
date: 2025-02-14
tags: ["tips", "beginners"]
category: "Tips"
---

Your blog content here...
```

## 🎨 Customization

### Change Colors

Edit `static/css/main.css` (lines 9-17):

```css
:root {
  --color-primary: #2563eb;      /* Main blue */
  --color-secondary: #7c3aed;    /* Purple */
  --color-accent: #f59e0b;       /* Orange */
  /* Change these to your preferred colors */
}
```

### Update Navigation

Edit `data/navigation.yaml`:

```yaml
main:
  - name: "Home"
    url: "/"
  - name: "Lessons"
    url: "/grammar/"
    children:
      - name: "Beginner"
        url: "/grammar/beginner/"
```

### Change Site Title and Description

Edit `config.toml`:

```toml
title = "Your Site Name"

[params]
  description = "Your site description"
  email = "your-email@example.com"
```

## 📊 SEO Setup

### Google Search Console

1. Go to: https://search.google.com/search-console
2. Add your site
3. Submit sitemap: `https://yoursite.com/sitemap.xml`

### Google Analytics (Optional)

1. Create Google Analytics account
2. Get tracking ID
3. Add to `config.toml`:
```toml
googleAnalytics = "G-XXXXXXXXXX"
```

## 🔧 Common Tasks

### Add Images

1. Place images in `static/images/`
2. Reference in markdown: `![Alt text](/images/photo.jpg)`

### Update Contact Email

Edit `config.toml`:
```toml
[params]
  email = "your-new-email@example.com"
```

Also update `content/contact.md`

### Change Homepage

Edit `layouts/index.html` to customize the homepage design.

## 📱 Mobile Responsiveness

The site is already fully mobile-responsive! Test on:
- https://search.google.com/test/mobile-friendly

## ⚡ Performance

Check your site performance:
- https://pagespeed.web.dev/

Target: 90+ score (already optimized!)

## 🆘 Troubleshooting

### Hugo server won't start

**Error: command not found**
- Solution: Install Hugo Extended

**Error: template errors**
- Solution: Check front matter in .md files

### Site looks broken after deployment

**Images not showing**
- Solution: Check paths start with `/`
- Example: `/images/photo.jpg` not `images/photo.jpg`

**CSS not loading**
- Solution: Update baseURL in config.toml

### Quiz not working

**Questions don't appear**
- Solution: Check quiz data is valid YAML
- Ensure `correctAnswer` is a number (0-indexed)

### GitHub Pages shows 404

**Wrong URL**
- Solution: Update baseURL in config.toml
- Must match: `https://USERNAME.github.io/REPO-NAME/`

## 📚 Resources

**Hugo Documentation:**
- https://gohugo.io/documentation/

**Markdown Guide:**
- https://www.markdownguide.org/

**GitHub Pages:**
- https://pages.github.com/

## 💡 Tips for Success

1. **Test Locally First**
   - Always run `hugo server` before deploying
   - Check all pages work correctly

2. **Write Good Content**
   - Clear explanations
   - Plenty of examples
   - Practice exercises

3. **Regular Updates**
   - Add new lessons weekly
   - Update old content
   - Fix broken links

4. **Engage Users**
   - Respond to feedback
   - Add requested topics
   - Improve based on analytics

5. **SEO Best Practices**
   - Use descriptive titles
   - Write meta descriptions
   - Use proper headings (H1, H2, H3)
   - Add alt text to images

## 🎯 Next Steps

1. ✅ Deploy to GitHub Pages
2. ✅ Add 5-10 more lessons
3. ✅ Create 5-10 more quizzes
4. ✅ Write 3-5 blog posts
5. ✅ Submit to search engines
6. ✅ Share on social media
7. ✅ Get feedback and improve

## 📧 Support

Questions? Contact: abid.raza99110@gmail.com

## 📄 License

This project is open source. Feel free to use and modify.

---

**Built with Hugo** | **Optimized for Performance** | **SEO Ready**

Good luck with your English grammar website! 🚀
