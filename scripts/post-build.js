import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const distDir = path.join(projectRoot, 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

// Copy index.html to 404.html in dist only
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('✅ Created 404.html in dist folder');

  // Remove index.html - we only need 404.html
  fs.unlinkSync(indexPath);
  console.log('🗑️  Removed index.html (keeping only 404.html)');
} else {
  console.error('❌ index.html not found in dist folder');
  process.exit(1);
}
