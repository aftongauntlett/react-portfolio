#!/usr/bin/env node
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function optimizeImage(inputPath, outputPath, options) {
  try {
    const info = await sharp(inputPath)
      .resize(options.width, options.height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: options.quality || 85 })
      .toFile(outputPath);

    console.log(`✅ Optimized: ${outputPath}`);
    console.log(`   Dimensions: ${info.width}x${info.height}`);
    console.log(`   Size: ${(info.size / 1024).toFixed(2)} KB\n`);
    return info;
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function optimizePNG(inputPath, outputPath, options) {
  try {
    const info = await sharp(inputPath)
      .resize(options.width, options.height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .png({ quality: options.quality || 85, compressionLevel: 9 })
      .toFile(outputPath);

    console.log(`✅ Optimized: ${outputPath}`);
    console.log(`   Dimensions: ${info.width}x${info.height}`);
    console.log(`   Size: ${(info.size / 1024).toFixed(2)} KB\n`);
    return info;
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Optimizing images...\n');

  // Create backup directory if it doesn't exist
  const backupDir = join(rootDir, 'backup-images');
  if (!existsSync(backupDir)) {
    mkdirSync(backupDir, { recursive: true });
  }

  // 1. Optimize headshot (currently 132KB @ 1536x1248)
  // Target: 800px wide, high quality for professional photo
  await optimizeImage(
    join(rootDir, 'src/assets/afton-headshot.webp'),
    join(rootDir, 'src/assets/afton-headshot-optimized.webp'),
    { width: 800, quality: 90 },
  );

  // 2. Optimize OG image (currently 204KB @ 1200x583)
  // Keep at 1200px for social media, but compress more
  await optimizePNG(
    join(rootDir, 'public/og-image.png'),
    join(rootDir, 'public/og-image-optimized.png'),
    { width: 1200, quality: 80 },
  );

  // 3. Game images are already small, but let's optimize them too
  await optimizePNG(
    join(rootDir, 'public/games/nyx-felis.png'),
    join(rootDir, 'public/games/nyx-felis-optimized.png'),
    { width: 600, quality: 85 },
  );

  await optimizePNG(
    join(rootDir, 'public/games/orbital-order.png'),
    join(rootDir, 'public/games/orbital-order-optimized.png'),
    { width: 600, quality: 85 },
  );

  console.log('✨ Image optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Review the optimized images');
  console.log('2. If satisfied, rename them to replace originals');
  console.log('3. Run npm run build to see the bundle size difference\n');
}

main();
