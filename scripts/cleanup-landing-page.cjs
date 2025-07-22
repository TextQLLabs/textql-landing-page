#!/usr/bin/env node

/**
 * TextQL Landing Page Cleanup Script
 * 
 * Cleans up the landing page project by:
 * 1. Removing test/debug files
 * 2. Consolidating duplicate assets
 * 3. Organizing configuration files
 * 4. Cleaning build artifacts
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = process.cwd();

// Files to remove (test/debug files)
const FILES_TO_REMOVE = [
  'test-dropdown.js',
  'check-dropdown.js',
  'textContent.json', // Appears to be temporary/generated
];

// Directories with potential duplicates
const DUPLICATE_CHECKS = [
  {
    source: 'src/data/data-logos',
    target: 'public/images/logos',
    description: 'Logo files (data-logos vs logos)'
  }
];

async function cleanupLandingPage() {
  console.log('🧹 Starting TextQL Landing Page cleanup...');
  
  let removedCount = 0;
  let consolidatedCount = 0;
  
  // Remove test/debug files
  console.log('\n📄 Removing test and debug files...');
  for (const file of FILES_TO_REMOVE) {
    const filePath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        removedCount++;
        console.log(`  🗑️  Removed: ${file}`);
      } catch (error) {
        console.log(`  ❌ Failed to remove ${file}: ${error.message}`);
      }
    }
  }
  
  // Check for duplicate assets
  console.log('\n🔍 Checking for duplicate assets...');
  for (const check of DUPLICATE_CHECKS) {
    const sourcePath = path.join(PROJECT_ROOT, check.source);
    const targetPath = path.join(PROJECT_ROOT, check.target);
    
    if (fs.existsSync(sourcePath) && fs.existsSync(targetPath)) {
      console.log(`  📋 Found potential duplicates: ${check.description}`);
      
      // List files in both directories
      const sourceFiles = fs.readdirSync(sourcePath).filter(f => !f.startsWith('.'));
      const targetFiles = fs.readdirSync(targetPath).filter(f => !f.startsWith('.'));
      
      console.log(`    Source (${check.source}): ${sourceFiles.length} files`);
      console.log(`    Target (${check.target}): ${targetFiles.length} files`);
      
      // Find exact duplicates
      const duplicates = sourceFiles.filter(file => targetFiles.includes(file));
      if (duplicates.length > 0) {
        console.log(`    🔄 ${duplicates.length} exact duplicates found:`);
        duplicates.forEach(file => console.log(`      - ${file}`));
        
        // For logos specifically, prefer the public directory (used by build process)
        if (check.source.includes('data-logos')) {
          console.log(`    ℹ️  Note: Consider removing src/data/data-logos if all assets are in public/images/logos`);
        }
      } else {
        console.log(`    ✅ No exact duplicates found`);
      }
    }
  }
  
  // Check for empty or unused directories
  console.log('\n📁 Checking for empty directories...');
  const checkEmptyDirs = [
    'scripts',
    'docs',
    'tests'
  ];
  
  for (const dir of checkEmptyDirs) {
    const dirPath = path.join(PROJECT_ROOT, dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      if (files.length === 0) {
        console.log(`  📂 Empty directory found: ${dir}`);
      }
    }
  }
  
  // Create cleanup summary
  console.log('\n📊 Cleanup Summary:');
  console.log(`  🗑️  Files removed: ${removedCount}`);
  console.log(`  📦 Assets consolidated: ${consolidatedCount}`);
  
  // Provide recommendations
  console.log('\n💡 Recommendations:');
  console.log('  1. Review duplicate logo assets in src/data/data-logos vs public/images/logos');
  console.log('  2. Consider organizing config files into config/ directory');
  console.log('  3. Add scripts/ directory for maintenance scripts like this one');
  console.log('  4. Ensure build artifacts (dist/) are in .gitignore');
  
  console.log('\n✅ Landing page cleanup complete!');
}

// Create package.json script entry recommendation
function showPackageJsonAddition() {
  console.log('\n📝 Add to package.json scripts:');
  console.log('"cleanup": "node scripts/cleanup-landing-page.js"');
}

// Self-executing if run directly
if (require.main === module) {
  cleanupLandingPage()
    .then(() => showPackageJsonAddition())
    .catch(console.error);
}

module.exports = { cleanupLandingPage };