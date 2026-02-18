# Deployment Guide for Grammar Master

## GitHub Pages Deployment (Recommended)

### Step 1: Prepare Your Repository

1. **Create a GitHub repository**
   - Go to github.com and create a new repository
   - Name it something like `grammar-master` or `english-grammar-site`
   - Keep it public (required for free GitHub Pages)

2. **Update configuration**
   - Edit `config.toml`
   - Change `baseURL` to: `https://YOUR-USERNAME.github.io/REPO-NAME/`
   - Replace YOUR-USERNAME and REPO-NAME with your actual values

### Step 2: Push to GitHub

```bash
cd grammar-site
git init
git add .
git commit -m "Initial commit: Grammar Master website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. The workflow will automatically run and deploy your site

### Step 4: Access Your Site

After deployment completes (2-3 minutes):
- Your site will be live at: `https://YOUR-USERNAME.github.io/REPO-NAME/`

## Custom Domain (Optional)

### Step 1: Configure DNS

Add these DNS records at your domain provider:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: YOUR-USERNAME.github.io
```

### Step 2: Configure GitHub

1. Go to Settings > Pages
2. Under "Custom domain", enter your domain
3. Check "Enforce HTTPS"

### Step 3: Update config.toml

```toml
baseURL = "https://yourdomain.com/"
```

## Netlify Deployment (Alternative)

### Step 1: Sign up for Netlify

1. Go to netlify.com
2. Sign up with GitHub

### Step 2: Deploy

1. Click "New site from Git"
2. Choose GitHub
3. Select your repository
4. Build settings:
   - Build command: `hugo --gc --minify`
   - Publish directory: `public`
   - Add environment variable: `HUGO_VERSION` = `0.138.0`

### Step 3: Deploy

Click "Deploy site" - your site will be live in minutes!

## Vercel Deployment (Alternative)

### Step 1: Sign up for Vercel

1. Go to vercel.com
2. Sign up with GitHub

### Step 2: Import Project

1. Click "Add New Project"
2. Import your GitHub repository
3. Framework Preset: Hugo
4. No build settings needed

### Step 3: Deploy

Click "Deploy" - your site will be live!

## Local Testing Before Deployment

Always test locally first:

```bash
# Development server with drafts
hugo server -D

# Production build test
hugo --gc --minify
```

Check:
- ✅ All pages load correctly
- ✅ Navigation works
- ✅ Quizzes function properly
- ✅ Images display
- ✅ Mobile responsiveness
- ✅ No console errors

## Post-Deployment Checklist

### SEO Setup

1. **Google Search Console**
   - Add your site
   - Submit sitemap: `https://yoursite.com/sitemap.xml`

2. **Bing Webmaster Tools**
   - Add your site
   - Submit sitemap

3. **Google Analytics** (Optional)
   - Create property
   - Add tracking ID to `config.toml`

### Performance Check

1. **Google PageSpeed Insights**
   - Test: https://pagespeed.web.dev/
   - Target: 90+ score

2. **Mobile-Friendly Test**
   - Test: https://search.google.com/test/mobile-friendly
   - Ensure all pages pass

### Accessibility Check

1. **WAVE**
   - Test: https://wave.webaim.org/
   - Fix any errors

## Updating Your Site

### Add New Content

1. Create new markdown file
2. Commit and push:
```bash
git add .
git commit -m "Add new lesson: [topic]"
git push
```

3. GitHub Actions will automatically rebuild and deploy

### Update Existing Content

1. Edit markdown file
2. Commit and push
3. Automatic deployment

## Troubleshooting

### Build Fails

**Error: Hugo version mismatch**
- Solution: Update HUGO_VERSION in `.github/workflows/hugo.yml`

**Error: Template errors**
- Solution: Check front matter in content files
- Ensure all required fields are present

### Site Not Updating

1. Check GitHub Actions tab for build status
2. Clear browser cache
3. Wait 2-3 minutes for CDN propagation

### 404 Errors

**Cause:** Wrong baseURL
- Solution: Update `baseURL` in `config.toml`
- Ensure it matches your actual URL

### Images Not Loading

**Cause:** Wrong path
- Solution: Use `/images/filename.jpg` (leading slash)
- Place files in `static/images/`

## Performance Optimization Tips

### Images

1. Compress before uploading (TinyPNG, Squoosh)
2. Use appropriate sizes
3. WebP format when possible

### Content

1. Keep pages focused and concise
2. Use headings properly (H1 > H2 > H3)
3. Add alt text to all images

### Code

1. Minify CSS (Hugo does this automatically)
2. Minimize custom JavaScript
3. Use Hugo's built-in asset pipeline

## Maintenance

### Regular Tasks

**Weekly:**
- Check for broken links
- Review analytics
- Respond to feedback

**Monthly:**
- Update Hugo version if needed
- Add new content
- Review and update old lessons

**Quarterly:**
- SEO audit
- Performance review
- Accessibility check

## Getting Help

**Hugo Documentation:**
- https://gohugo.io/documentation/

**Hugo Forum:**
- https://discourse.gohugo.io/

**GitHub Issues:**
- Create an issue in your repository

## Backup Strategy

### Automatic

- GitHub repository serves as backup
- All content is version controlled

### Manual

Periodically download:
```bash
git clone https://github.com/YOUR-USERNAME/REPO-NAME.git grammar-backup
```

---

## Quick Reference

### Common Commands

```bash
# Start development server
hugo server -D

# Build for production
hugo --gc --minify

# Create new content
hugo new blog/post-title.md
hugo new grammar/beginner/lesson-title.md
hugo new quizzes/quiz-title.md

# Check Hugo version
hugo version

# Update Hugo (on Ubuntu)
wget https://github.com/gohugoio/hugo/releases/download/v0.138.0/hugo_extended_0.138.0_linux-amd64.deb
sudo dpkg -i hugo_extended_0.138.0_linux-amd64.deb
```

### File Locations

- Configuration: `config.toml`
- Navigation: `data/navigation.yaml`
- Styles: `static/css/main.css`
- Scripts: `static/js/main.js`, `static/js/quiz.js`
- Templates: `layouts/`
- Content: `content/`

---

**Need help?** Contact: abid.raza99110@gmail.com

Good luck with your deployment! 🚀
