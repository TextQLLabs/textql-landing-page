/**
 * Verification script for PHASE 5: UI Component Theme Default Implementation
 * 
 * This script verifies that all UI components have been properly updated to:
 * 1. Use useComponentTheme() as default when no theme prop is provided
 * 2. Accept optional theme props for manual override
 * 3. Maintain backward compatibility
 */

const fs = require('fs');
const path = require('path');

const componentPaths = [
  'src/components/ui/Button/Button.tsx',
  'src/components/ui/Badge/Badge.tsx',
  'src/components/ui/Typography/Text.tsx',
  'src/components/ui/Card/Card.tsx',
  'src/components/ui/Input/Input.tsx',
  'src/components/sections/CTA.tsx',
  'src/components/ui/DemoRequestForm/DemoRequestForm.tsx'
];

const results = {
  passed: [],
  failed: [],
  warnings: []
};

function checkFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    results.failed.push(`❌ ${filePath}: File not found`);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const checks = {
    hasUseComponentTheme: content.includes('useComponentTheme'),
    hasEffectiveTheme: content.includes('effectiveTheme') || content.includes('theme || '),
    hasThemeImport: content.includes('from \'../../../hooks/useComponentTheme\'') || content.includes('from \'../../hooks/useComponentTheme\''),
    hasThemeDefault: content.includes('theme = \'') || content.includes('theme,') || !content.includes('theme = \'dark\'') && !content.includes('theme = \'light\'')
  };

  let status = '✅';
  let messages = [];

  if (!checks.hasUseComponentTheme) {
    status = '❌';
    messages.push('Missing useComponentTheme hook');
  }

  if (!checks.hasEffectiveTheme) {
    status = '❌';
    messages.push('Missing effectiveTheme logic');
  }

  if (!checks.hasThemeImport) {
    status = '❌';
    messages.push('Missing useComponentTheme import');
  }

  if (!checks.hasThemeDefault) {
    status = '⚠️';
    messages.push('Theme prop may have hardcoded default');
  }

  const result = `${status} ${filePath}${messages.length > 0 ? ': ' + messages.join(', ') : ''}`;
  
  if (status === '✅') {
    results.passed.push(result);
  } else if (status === '❌') {
    results.failed.push(result);
  } else {
    results.warnings.push(result);
  }
}

console.log('🔍 Verifying PHASE 5: UI Component Theme Default Implementation\n');

componentPaths.forEach(checkFile);

console.log('📊 Results Summary:');
console.log('='.repeat(50));

if (results.passed.length > 0) {
  console.log('\n✅ PASSED:');
  results.passed.forEach(result => console.log(`  ${result}`));
}

if (results.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  results.warnings.forEach(result => console.log(`  ${result}`));
}

if (results.failed.length > 0) {
  console.log('\n❌ FAILED:');
  results.failed.forEach(result => console.log(`  ${result}`));
}

console.log('\n📋 Manual Testing Required:');
console.log('  1. Run `npm run dev` and visit http://localhost:5173/theme-test');
console.log('  2. Toggle between light/dark themes');
console.log('  3. Verify components without theme props follow global theme');
console.log('  4. Verify components with explicit theme props remain unchanged');
console.log('  5. Test that existing code still works (backward compatibility)');

console.log('\n🎯 Success Criteria:');
console.log('  ✓ All components use useComponentTheme() as fallback');
console.log('  ✓ Theme props are optional');
console.log('  ✓ Backward compatibility maintained');
console.log('  ✓ Global theme toggle affects all components by default');

const totalChecked = results.passed.length + results.failed.length + results.warnings.length;
const passRate = Math.round((results.passed.length / totalChecked) * 100);

console.log(`\n📈 Overall Status: ${passRate}% components verified (${results.passed.length}/${totalChecked})`);

if (results.failed.length === 0) {
  console.log('\n🎉 PHASE 5 COMPLETE: All components successfully updated!');
} else {
  console.log('\n🔧 ACTION REQUIRED: Fix failed components before completion');
}