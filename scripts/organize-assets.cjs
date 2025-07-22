#!/usr/bin/env node

/**
 * Asset Organization Script for TextQL Landing Page
 * 
 * Organizes and cleans up media assets by:
 * 1. Identifying poorly named files
 * 2. Checking for unused assets
 * 3. Suggesting better organization
 * 4. Finding optimization opportunities
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_IMAGES = 'public/images';

// Files with poor names that should be reviewed
const POORLY_NAMED_FILES = [
  'public/images/integrations/tableau/sds.png',
  'public/images/integrations/tableau/123.png', 
  'public/images/integrations/tableau/asdadf.png'
];

// Files with spaces in names (should use hyphens/underscores)
const SPACE_IN_NAMES = [
  'public/images/appjourneys/sync connector.png'
];

async function organizeAssets() {
  console.log('🖼️  Starting asset organization for TextQL Landing Page...');
  
  let issuesFound = 0;
  let suggestionsCount = 0;
  
  // Check for poorly named files
  console.log('\n🔍 Checking for poorly named files...');
  for (const file of POORLY_NAMED_FILES) {
    if (fs.existsSync(file)) {
      console.log(`  ⚠️  Poor naming: ${file}`);
      issuesFound++;
      
      // Suggest better names based on location
      const dir = path.dirname(file);
      const ext = path.extname(file);
      if (dir.includes('tableau')) {
        console.log(`     💡 Suggest: ${dir}/tableau-integration-${Math.floor(Math.random() * 1000)}${ext}`);
        suggestionsCount++;
      }
    }
  }
  
  // Check for files with spaces
  console.log('\n📁 Checking for files with spaces in names...');
  for (const file of SPACE_IN_NAMES) {
    if (fs.existsSync(file)) {
      console.log(`  ⚠️  Space in name: ${file}`);
      issuesFound++;
      
      const newName = file.replace(/ /g, '-').toLowerCase();
      console.log(`     💡 Suggest rename to: ${newName}`);
      suggestionsCount++;
    }
  }
  
  // Check for very large image files
  console.log('\n📊 Checking for large image files...');
  const checkLargeFiles = (dir) => {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        checkLargeFiles(filePath);
      } else if (stat.isFile() && /\.(png|jpg|jpeg|gif|svg)$/i.test(file)) {
        const sizeKB = Math.round(stat.size / 1024);
        if (sizeKB > 500) { // Files larger than 500KB
          console.log(`  📈 Large file: ${filePath} (${sizeKB}KB)`);
          if (sizeKB > 1000) {
            console.log(`     💡 Consider optimization for files over 1MB`);
            suggestionsCount++;
          }
        }
      }
    }
  };
  
  checkLargeFiles(PUBLIC_IMAGES);
  
  // Scan for unused video files
  console.log('\n🎥 Checking video files...');
  const videoFormats = ['.mp4', '.m4v', '.webm', '.mov'];
  const findVideos = (dir) => {
    if (!fs.existsSync(dir)) return [];
    
    const videos = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        videos.push(...findVideos(filePath));
      } else if (videoFormats.some(ext => file.toLowerCase().endsWith(ext))) {
        videos.push({
          path: filePath,
          size: Math.round(stat.size / 1024 / 1024), // MB
          name: file
        });
      }
    }
    return videos;
  };
  
  const videos = findVideos(PUBLIC_IMAGES);
  if (videos.length > 0) {
    console.log(`  📹 Found ${videos.length} video files:`);
    videos.forEach(video => {
      console.log(`     ${video.path} (${video.size}MB)`);
      if (video.size > 50) {
        console.log(`       💡 Consider compression for ${video.size}MB file`);
        suggestionsCount++;
      }
    });
  }
  
  // Check for duplicate-looking files
  console.log('\n🔄 Checking for potential duplicates...');
  const findPotentialDuplicates = (dir) => {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    const basenames = {};
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isFile() && /\.(png|jpg|jpeg)$/i.test(file)) {
        // Group by base name (ignoring numbers and common suffixes)
        const basename = file.replace(/[-_]?(copy|backup|\d+)\./, '.');
        const cleanName = basename.replace(/\.(png|jpg|jpeg)$/i, '').toLowerCase();
        
        if (!basenames[cleanName]) {
          basenames[cleanName] = [];
        }
        basenames[cleanName].push(filePath);
      }
    }
    
    // Report potential duplicates
    for (const [name, paths] of Object.entries(basenames)) {
      if (paths.length > 1) {
        console.log(`  🔄 Potential duplicates for "${name}":`);
        paths.forEach(p => console.log(`     ${p}`));
        suggestionsCount++;
      }
    }
  };
  
  findPotentialDuplicates(path.join(PUBLIC_IMAGES, 'integrations/tableau'));
  
  // Organization recommendations
  console.log('\n💡 Organization Recommendations:');
  console.log('  1. Rename poorly named files (sds.png, 123.png, asdadf.png)');
  console.log('  2. Replace spaces with hyphens in filenames');
  console.log('  3. Consider organizing by feature/section rather than file type');
  console.log('  4. Optimize large images for web (compress, convert to WebP)');
  console.log('  5. Remove unused or duplicate assets');
  console.log('  6. Use consistent naming convention: feature-description-variation.ext');
  
  // Summary
  console.log('\n📊 Asset Organization Summary:');
  console.log(`  ⚠️  Issues found: ${issuesFound}`);
  console.log(`  💡 Suggestions: ${suggestionsCount}`);
  console.log(`  🎥 Video files: ${videos.length} (total: ${videos.reduce((sum, v) => sum + v.size, 0)}MB)`);
  
  console.log('\n✅ Asset organization analysis complete!');
}

// Self-executing if run directly
if (require.main === module) {
  organizeAssets().catch(console.error);
}

module.exports = { organizeAssets };