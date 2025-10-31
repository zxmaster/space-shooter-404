import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

let isBuilding = false;
let buildQueued = false;

async function buildAndGenerate404() {
  if (isBuilding) {
    buildQueued = true;
    return;
  }

  isBuilding = true;
  console.log('\n🔨 Building project...');

  try {
    // Run Vite build
    await build({
      root: srcDir,
      build: {
        outDir: distDir,
        emptyOutDir: true,
      },
    });

    // Generate 404.html
    const indexPath = path.join(distDir, 'index.html');
    const notFoundPath = path.join(distDir, '404.html');

    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath);

      // Remove index.html - we only need 404.html
      fs.unlinkSync(indexPath);

      console.log('✅ Build complete! 404.html generated');
      console.log(`   📂 ${path.relative(process.cwd(), notFoundPath)}`);
    }
  } catch (error) {
    console.error('❌ Build failed:', error.message);
  } finally {
    isBuilding = false;
    if (buildQueued) {
      buildQueued = false;
      setTimeout(() => buildAndGenerate404(), 100);
    }
  }
}

// Initial build
console.log('🚀 Starting watch mode for 404.html generation...');
console.log('👀 Watching:', path.relative(process.cwd(), srcDir));
console.log('');
await buildAndGenerate404();

// Watch for changes
const watcher = chokidar.watch(srcDir, {
  ignored: /(^|[/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
});

watcher
  .on('change', (filePath) => {
    console.log(`\n📝 File changed: ${path.relative(process.cwd(), filePath)}`);
    buildAndGenerate404();
  })
  .on('add', (filePath) => {
    console.log(`\n➕ File added: ${path.relative(process.cwd(), filePath)}`);
    buildAndGenerate404();
  })
  .on('unlink', (filePath) => {
    console.log(`\n🗑️  File removed: ${path.relative(process.cwd(), filePath)}`);
    buildAndGenerate404();
  });

console.log('\n✨ Watch mode active. Press Ctrl+C to stop.\n');

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopping watch mode...');
  watcher.close();
  process.exit(0);
});
