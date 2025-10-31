# Build Scripts

## 📦 post-build.js

Generates the final `404.html` file from the Vite build output.

### What it does

1. Reads the built `index.html` from `dist/`
2. Copies it to `404.html` in `dist/`
3. Removes `index.html` (keeping only `404.html`)
4. Perfect for deployment as a 404 error page

### Usage

Automatically runs after `npm run build`:

```bash
npm run build
# Runs: vite build && node scripts/post-build.js
```

**Result:** Clean `dist/` folder with only `404.html` and `assets/`

## � watch-404.js

Automatically rebuilds `404.html` whenever source files change.

### What it does

1. Watches all files in `src/` directory
2. When a file changes, triggers a Vite build
3. Automatically runs `post-build.js` to generate `404.html`
4. Provides real-time feedback on build status
5. Debounces rapid changes to avoid excessive builds

### Usage

```bash
# Run watcher only
npm run watch:404

# Run dev server + watcher together (recommended)
npm run dev:all
```

### When to use

- ✅ You need the production `404.html` file constantly updated
- ✅ Testing the actual 404.html that will be deployed
- ✅ CI/CD pipelines that need artifacts on every change
- ✅ Working on build-specific features or optimizations

### Features

- 🔄 Automatic rebuild on file changes
- 🎯 Debouncing to prevent build spam
- 📊 Clear console feedback with emojis
- ⚡ Fast incremental builds via Vite
- 🛑 Graceful shutdown with Ctrl+C

## 🔄 Development Workflows

## 🔄 Development Workflows

### Workflow 1: Standard Development (HMR Only)

```bash
# Best for rapid iteration
npm run dev

# Changes appear instantly in browser
# No 404.html generation
```

### Workflow 2: Development + 404.html Generation

```bash
# Best when you need both
npm run dev:all

# Terminal shows:
# - Vite dev server on port 3000
# - Watch mode status and rebuild notifications
```

### Workflow 3: Only 404.html Generation

```bash
# 1. Open in devcontainer (VS Code)
# F1 → "Dev Containers: Reopen in Container"

# 2. Inside container - start dev server
npm run dev

# 3. Make changes and test at http://localhost:3000
```

### Building & Deployment

```bash
# 1. Inside container - build for production
npm run build

# 2. Artifacts immediately available in ./dist on host machine!
ls dist/
# dist/404.html - Ready to deploy (only file you need!)
# dist/assets/ - Bundled JS and CSS

# 3. Deploy the 404.html file
cp dist/404.html /path/to/your/webroot/
```

### With Docker Compose

The `dist` directory is mounted as a bind mount to the host, so:

```bash
# Inside container
npm run build

# On host machine - no extraction needed!
ls dist/
cat dist/404.html
```

## 🎯 Build Output

After running `npm run build`, you'll have:

```
dist/
├── 404.html          # Production-ready 404 page (deploy this!)
└── assets/
    ├── main-[hash].js
    └── main-[hash].css
```

**Note:** Only `404.html` is kept in `dist/`. The `index.html` is automatically removed after conversion.

## 📚 Related Documentation404.html # Copy in project root for convenience

```

## 📚 Related Documentation

- [DevContainer README](../.devcontainer/README.md)
- [Main Project README](../README.md)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)
```
