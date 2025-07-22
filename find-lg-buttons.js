#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function findLgButtons(dir) {
  const results = [];
  
  function searchDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Skip node_modules, dist, and other build directories
        if (!['node_modules', 'dist', '.git', '.next', 'build'].includes(file)) {
          searchDirectory(filePath);
        }
      } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const lines = content.split('\n');
          
          lines.forEach((line, index) => {
            if (line.includes('size="lg"') || line.includes("size='lg'")) {
              results.push({
                file: filePath,
                line: index + 1,
                content: line.trim()
              });
            }
          });
        } catch (err) {
          console.error(`Error reading ${filePath}:`, err.message);
        }
      }
    }
  }
  
  searchDirectory(dir);
  return results;
}

const projectRoot = process.cwd();
const results = findLgButtons(projectRoot);

console.log('🔍 Searching for size="lg" buttons...\n');

if (results.length === 0) {
  console.log('✅ No size="lg" buttons found!');
} else {
  console.log(`❌ Found ${results.length} instances of size="lg":\n`);
  
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.file}:${result.line}`);
    console.log(`   ${result.content}`);
    console.log('');
  });
}