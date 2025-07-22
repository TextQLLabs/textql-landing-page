# Technical Debt Assessment Methodology

This document provides a comprehensive methodology for evaluating technical debt in the TextQL landing page codebase. Use this guide to systematically assess code quality, maintainability, and areas requiring improvement.

## Overview

Technical debt assessment should be performed regularly to:
- Identify areas of code that need refactoring
- Prioritize maintenance efforts
- Track debt accumulation over time
- Ensure long-term maintainability

## Assessment Categories

### 1. Dependency Health Check

**Commands to run:**
```bash
# Check for outdated dependencies
npm outdated

# Check for security vulnerabilities
npm audit

# Find unused dependencies
npx depcheck
```

**What to look for:**
- Major version gaps (e.g., React 17 when 18 is available)
- High or critical security vulnerabilities
- Unused dependencies increasing bundle size
- Deprecated packages without migration paths

**Evaluation criteria:**
- ✅ Good: All dependencies within 1 major version, no security issues
- ⚠️ Warning: 2+ major versions behind, low security vulnerabilities
- ❌ Critical: 3+ major versions behind, high/critical vulnerabilities

### 2. Code Smell Scanner

**Commands to run:**
```bash
# Find TODO/FIXME/HACK comments
grep -r "TODO\|FIXME\|HACK\|XXX\|BUG\|DEPRECATED" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"

# Find console statements
grep -r "console\.\(log\|warn\|error\|debug\)" src/ --include="*.ts" --include="*.tsx"

# Find ESLint/TypeScript suppressions
grep -r "eslint-disable\|@ts-ignore\|@ts-nocheck\|@ts-expect-error" src/ --include="*.ts" --include="*.tsx"
```

**What to look for:**
- Accumulation of TODO comments without resolution
- Console statements in production code
- Excessive use of lint/type suppressions
- FIXME comments indicating broken functionality

**Evaluation criteria:**
- ✅ Good: < 10 TODOs, no console statements, < 5 suppressions
- ⚠️ Warning: 10-30 TODOs, few console statements, 5-15 suppressions
- ❌ Critical: > 30 TODOs, many console statements, > 15 suppressions

### 3. Component Complexity Analysis

**Commands to run:**
```bash
# Find large files
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l | sort -n | tail -20

# Find files with many imports
grep -c "^import" src/**/*.tsx src/**/*.ts | sort -t: -k2 -n | tail -20
```

**What to look for:**
- Components exceeding 300 lines
- Files with more than 15 imports
- Components mixing presentation and business logic
- God components doing too many things

**Evaluation criteria:**
- ✅ Good: Most components < 200 lines, clear separation of concerns
- ⚠️ Warning: Several components 200-400 lines, some mixed concerns
- ❌ Critical: Many components > 400 lines, widespread mixed concerns

### 4. Type Safety Assessment

**Commands to run:**
```bash
# Check TypeScript configuration
cat tsconfig.json | grep -A10 "compilerOptions"

# Find 'any' types
grep -r "\bany\b" src/ --include="*.ts" --include="*.tsx" | grep -v "// eslint-disable"

# Find missing return types
grep -r "=> {" src/ --include="*.ts" --include="*.tsx" | grep -v ": .* => {"
```

**What to look for:**
- TypeScript strict mode disabled
- Excessive use of 'any' type
- Missing return type annotations
- Implicit any parameters

**Evaluation criteria:**
- ✅ Good: Strict mode enabled, < 10 any types, explicit types everywhere
- ⚠️ Warning: Partial strict mode, 10-30 any types, some missing types
- ❌ Critical: No strict mode, > 30 any types, many missing types

### 5. Dead Code Detection

**Commands to run:**
```bash
# Find unused exports (requires ts-prune)
npx ts-prune

# Find commented code blocks
grep -r "^[[:space:]]*//.*{" src/ --include="*.ts" --include="*.tsx"
grep -r "/\*" src/ --include="*.ts" --include="*.tsx" | grep -v "/\*\*"

# Find unused CSS classes
grep -r "className=" src/ | grep -o '"[^"]*"' | sort | uniq > used-classes.txt
grep -r "\." src/styles/ | grep -o "\.[a-zA-Z0-9-]*" | sort | uniq > defined-classes.txt
```

**What to look for:**
- Unused exports and imports
- Large blocks of commented-out code
- Orphaned files with no imports
- Feature flags that are always on/off

**Evaluation criteria:**
- ✅ Good: < 5% unused code, no large commented blocks
- ⚠️ Warning: 5-15% unused code, some commented blocks
- ❌ Critical: > 15% unused code, many commented blocks

### 6. Duplication Analysis

**Commands to run:**
```bash
# Find duplicate code (requires jscpd)
npx jscpd src --min-lines 10 --min-tokens 50 --format "json" --output jscpd-report.json

# Find similar component patterns
find src/components -name "*.tsx" -exec basename {} \; | sort | uniq -d
```

**What to look for:**
- Copy-pasted code blocks
- Similar component implementations
- Repeated business logic
- Duplicate utility functions

**Evaluation criteria:**
- ✅ Good: < 5% code duplication
- ⚠️ Warning: 5-10% code duplication
- ❌ Critical: > 10% code duplication

### 7. Documentation Coverage

**Commands to run:**
```bash
# Check for JSDoc comments
grep -r "/\*\*" src/ --include="*.ts" --include="*.tsx" | wc -l

# Find exported functions without documentation
grep -B3 "export.*function\|export.*const.*=.*(" src/**/*.ts src/**/*.tsx | grep -v "/\*\*"

# Check README files
find . -name "README.md" -o -name "readme.md" | xargs wc -l
```

**What to look for:**
- Missing JSDoc for public APIs
- Outdated documentation
- Complex functions without explanations
- Missing architectural documentation

**Evaluation criteria:**
- ✅ Good: > 80% documented exports, up-to-date READMEs
- ⚠️ Warning: 50-80% documented, some outdated docs
- ❌ Critical: < 50% documented, mostly outdated docs

### 8. Test Coverage

**Commands to run:**
```bash
# Find test files
find src -name "*.test.*" -o -name "*.spec.*" | wc -l

# Check test coverage (if configured)
npm run test:coverage

# Find untested components
find src/components -name "*.tsx" | while read f; do
  testfile="${f%.tsx}.test.tsx"
  [ ! -f "$testfile" ] && echo "Missing test: $f"
done
```

**What to look for:**
- Missing test files
- Low test coverage percentages
- Untested critical paths
- Outdated or broken tests

**Evaluation criteria:**
- ✅ Good: > 80% coverage, all critical paths tested
- ⚠️ Warning: 50-80% coverage, some critical paths untested
- ❌ Critical: < 50% coverage, many untested components

### 9. Build Performance Metrics

**Commands to run:**
```bash
# Analyze bundle size
npm run build
ls -lh dist/assets/*.js | awk '{print $5, $9}'

# Visualize bundle (requires vite-bundle-visualizer)
npx vite-bundle-visualizer

# Check build time
time npm run build
```

**What to look for:**
- JavaScript bundle > 500KB
- CSS bundle > 100KB
- Build time > 30 seconds
- Large dependencies in bundle

**Evaluation criteria:**
- ✅ Good: JS < 250KB, CSS < 50KB, build < 15s
- ⚠️ Warning: JS 250-500KB, CSS 50-100KB, build 15-30s
- ❌ Critical: JS > 500KB, CSS > 100KB, build > 30s

### 10. CSS/Style Debt

**Commands to run:**
```bash
# Find inline styles
grep -r "style={{" src/ --include="*.tsx" --include="*.jsx"

# Find !important usage
grep -r "!important" src/ --include="*.css" --include="*.scss" --include="*.tsx"

# Find hardcoded colors/dimensions
grep -r "#[0-9a-fA-F]\{3,6\}\|[0-9]\+px" src/ --include="*.tsx" --include="*.css"
```

**What to look for:**
- Excessive inline styles
- Overuse of !important
- Hardcoded values instead of theme variables
- Non-responsive patterns

**Evaluation criteria:**
- ✅ Good: < 10 inline styles, < 5 !important, theme variables used
- ⚠️ Warning: 10-30 inline styles, 5-20 !important, some hardcoded values
- ❌ Critical: > 30 inline styles, > 20 !important, many hardcoded values

## Running a Complete Assessment

### Step 1: Automated Analysis
Run this script to gather all metrics:

```bash
#!/bin/bash
# Save as assess-debt.sh

echo "=== Technical Debt Assessment ==="
echo "Date: $(date)"
echo ""

echo "1. Dependency Health:"
npm outdated
echo ""
npm audit
echo ""

echo "2. Code Smells:"
echo "TODOs/FIXMEs:"
grep -r "TODO\|FIXME\|HACK" src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Console statements:"
grep -r "console\." src/ --include="*.ts" --include="*.tsx" | wc -l
echo "Suppressions:"
grep -r "eslint-disable\|@ts-ignore" src/ --include="*.ts" --include="*.tsx" | wc -l
echo ""

echo "3. Largest files:"
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l | sort -n | tail -10
echo ""

echo "4. Type safety:"
echo "Any types:"
grep -r "\bany\b" src/ --include="*.ts" --include="*.tsx" | wc -l
echo ""

echo "5. Build metrics:"
npm run build 2>&1 | grep -E "built in|chunk"
ls -lh dist/assets/*.js | awk '{sum += $5} END {print "Total JS:", sum/1024/1024 "MB"}'
```

### Step 2: Manual Review
After running automated checks, manually review:

1. **Architecture coherence**: Is the folder structure logical?
2. **Code readability**: Can a new developer understand the code?
3. **Performance bottlenecks**: Any obvious render issues?
4. **Security concerns**: Exposed keys, unsafe operations?

### Step 3: Generate Report

Create a debt report with this template:

```markdown
# Technical Debt Assessment Report

**Date**: [Date]
**Assessed by**: [Name]
**Codebase**: textql-landing-page

## Executive Summary
Overall debt level: [Low/Medium/High/Critical]

## Critical Issues (Immediate Action Required)
1. [Issue description] - [Estimated effort]
2. ...

## Medium Priority (Next Sprint)
1. [Issue description] - [Estimated effort]
2. ...

## Low Priority (Backlog)
1. [Issue description] - [Estimated effort]
2. ...

## Metrics Summary
- Dependencies: [X outdated, Y vulnerabilities]
- Code smells: [X TODOs, Y console.logs]
- Type safety: [X% typed, Y any occurrences]
- Test coverage: [X%]
- Bundle size: [X KB]
- Documentation: [X% covered]

## Recommendations
1. [Specific action with expected outcome]
2. ...

## Debt Trend
[Improving/Stable/Worsening] compared to last assessment
```

## Debt Scoring System

Calculate an overall debt score (0-100, where 100 is debt-free):

| Category | Weight | Score Calculation |
|----------|--------|-------------------|
| Dependencies | 15% | 100 - (outdated × 2) - (vulnerabilities × 5) |
| Code Smells | 15% | 100 - (TODOs + console.logs + suppressions) |
| Complexity | 20% | 100 - (files > 300 lines × 5) |
| Type Safety | 15% | 100 - (any types × 2) |
| Duplication | 10% | 100 - (duplication % × 2) |
| Documentation | 10% | Documentation coverage % |
| Tests | 10% | Test coverage % |
| Performance | 5% | 100 - (bundle MB × 20) |

**Score interpretation:**
- 90-100: Excellent (minimal debt)
- 70-89: Good (manageable debt)
- 50-69: Fair (needs attention)
- 30-49: Poor (significant debt)
- 0-29: Critical (major refactoring needed)

## Continuous Monitoring

Set up regular debt assessments:
- **Weekly**: Quick automated checks
- **Monthly**: Full assessment with manual review
- **Quarterly**: Trend analysis and strategic planning

Track metrics over time to ensure debt is being managed, not just measured.