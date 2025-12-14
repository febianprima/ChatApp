#!/usr/bin/env node

/**
 * Sync version from package.json to iOS and Android native files
 *
 * Usage: node scripts/sync-version.js
 *
 * This script reads the version from package.json and updates:
 * - iOS: MARKETING_VERSION in project.pbxproj
 * - Android: versionName in build.gradle
 */

const fs = require('fs');
const path = require('path');

// Read version from package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

console.log(`📦 Syncing version: ${version}`);

// Update iOS project.pbxproj
const iosProjectPath = path.join(__dirname, '..', 'ios', 'ChatApp.xcodeproj', 'project.pbxproj');

if (fs.existsSync(iosProjectPath)) {
  let iosContent = fs.readFileSync(iosProjectPath, 'utf8');
  const iosVersionRegex = /MARKETING_VERSION = [\d.]+;/g;
  const newIosVersion = `MARKETING_VERSION = ${version};`;

  if (iosVersionRegex.test(iosContent)) {
    iosContent = iosContent.replace(iosVersionRegex, newIosVersion);
    fs.writeFileSync(iosProjectPath, iosContent);
    console.log(`✅ iOS: Updated MARKETING_VERSION to ${version}`);
  } else {
    console.log('⚠️  iOS: MARKETING_VERSION not found in project.pbxproj');
  }
} else {
  console.log('⚠️  iOS: project.pbxproj not found');
}

// Update Android build.gradle
const androidBuildGradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');

if (fs.existsSync(androidBuildGradlePath)) {
  let androidContent = fs.readFileSync(androidBuildGradlePath, 'utf8');
  const androidVersionRegex = /versionName "[\d.]+"/;
  const newAndroidVersion = `versionName "${version}"`;

  if (androidVersionRegex.test(androidContent)) {
    androidContent = androidContent.replace(androidVersionRegex, newAndroidVersion);
    fs.writeFileSync(androidBuildGradlePath, androidContent);
    console.log(`✅ Android: Updated versionName to ${version}`);
  } else {
    console.log('⚠️  Android: versionName not found in build.gradle');
  }
} else {
  console.log('⚠️  Android: build.gradle not found');
}

console.log('🎉 Version sync complete!');
