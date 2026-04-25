# Hongyu Shen — Personal Site

Static site. Deployed to GitHub Pages at `skyve2012.github.io`.

## Stack
- Plain HTML + React via inline Babel transforms (no build step)
- Single CSS file (`styles.css`)
- Component files: `app.jsx`, `shared.jsx`, `tweaks-panel.jsx`
- Assets in `assets/`

## Local preview
Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy (replacing the existing al-folio site)

From a clean clone of `skyve2012/skyve2012.github.io`:

```bash
# 1. back up the old site (optional but recommended)
git checkout -b al-folio-archive
git push origin al-folio-archive

# 2. wipe master and replace with this bundle
git checkout master
git rm -rf .
# copy the contents of this deploy/ folder into the repo root
cp -R /path/to/deploy/. .
git add .
git commit -m "Replace al-folio site with new personal site"
git push origin master
```

GitHub Pages will pick it up within ~1 minute. The `.nojekyll` file
disables Jekyll so paths like `assets/dr-shy.svg` are served as-is.

## Editing
- Bio, news, projects, publications, writing → `app.jsx`
- Header / nav / footer / shared bits → `shared.jsx`
- Colors, typography, layout → `styles.css`
- Bunny portrait → `assets/dr-shy.svg`
