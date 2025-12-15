#!/usr/bin/env node
/**
 * iOS App Icon Generator
 *
 * This script generates iOS app icons from a source image.
 *
 * Prerequisites:
 *   brew install imagemagick
 *
 * Usage:
 *   node scripts/generate-ios-icons.js <source-image>
 *
 * Example:
 *   node scripts/generate-ios-icons.js assets/icon-1024.png
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ICON_SIZES = [
  { size: 20, scale: 2, filename: 'Icon-20@2x.png' },
  { size: 20, scale: 3, filename: 'Icon-20@3x.png' },
  { size: 29, scale: 2, filename: 'Icon-29@2x.png' },
  { size: 29, scale: 3, filename: 'Icon-29@3x.png' },
  { size: 40, scale: 2, filename: 'Icon-40@2x.png' },
  { size: 40, scale: 3, filename: 'Icon-40@3x.png' },
  { size: 60, scale: 2, filename: 'Icon-60@2x.png' },
  { size: 60, scale: 3, filename: 'Icon-60@3x.png' },
  { size: 1024, scale: 1, filename: 'Icon-1024.png' },
];

const OUTPUT_DIR = path.join(__dirname, '../ios/ChatApp/Images.xcassets/AppIcon.appiconset');

function generateIcons(sourceImage) {
  if (!fs.existsSync(sourceImage)) {
    console.error(`Source image not found: ${sourceImage}`);
    process.exit(1);
  }

  console.log(`Generating iOS icons from: ${sourceImage}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  for (const icon of ICON_SIZES) {
    const pixels = icon.size * icon.scale;
    const outputPath = path.join(OUTPUT_DIR, icon.filename);

    try {
      execSync(`convert "${sourceImage}" -resize ${pixels}x${pixels} "${outputPath}"`, {
        stdio: 'inherit',
      });
      console.log(`✓ Generated ${icon.filename} (${pixels}x${pixels})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${icon.filename}`);
    }
  }

  // Update Contents.json
  const contentsJson = {
    images: ICON_SIZES.map(icon => ({
      filename: icon.filename,
      idiom: icon.size === 1024 ? 'ios-marketing' : 'iphone',
      scale: `${icon.scale}x`,
      size: `${icon.size}x${icon.size}`,
    })),
    info: {
      author: 'xcode',
      version: 1,
    },
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'Contents.json'), JSON.stringify(contentsJson, null, 2));
  console.log('\n✓ Updated Contents.json');
}

// Main
const sourceImage = process.argv[2];
if (!sourceImage) {
  console.log('Usage: node scripts/generate-ios-icons.js <source-image>');
  console.log('\nTo create a source icon:');
  console.log('1. Create a 1024x1024 PNG with your chat icon');
  console.log('2. Or use an online tool like https://www.appicon.co/');
  process.exit(1);
}

generateIcons(sourceImage);
