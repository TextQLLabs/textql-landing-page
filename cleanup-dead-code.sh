#!/bin/bash

# Dead Code Cleanup Script for TextQL Landing Page
# This script removes confirmed dead code files

echo "🧹 Starting dead code cleanup..."

# Change to project directory
cd /Users/ethanding/projects/textql-landing-page

# Remove dead code files
echo "🗑️  Removing dead code files..."

if [ -f "src/components/DebugTestSimple.tsx" ]; then
    rm src/components/DebugTestSimple.tsx
    echo "✅ Removed DebugTestSimple.tsx"
else
    echo "⚠️  DebugTestSimple.tsx not found"
fi

if [ -f "src/components/DebugTest.tsx" ]; then
    rm src/components/DebugTest.tsx
    echo "✅ Removed DebugTest.tsx"
else
    echo "⚠️  DebugTest.tsx not found"
fi

if [ -f "src/components/DebugDemo.tsx" ]; then
    rm src/components/DebugDemo.tsx
    echo "✅ Removed DebugDemo.tsx"
else
    echo "⚠️  DebugDemo.tsx not found"
fi

if [ -f "src/pages/DeprecatedIntegrations.tsx" ]; then
    rm src/pages/DeprecatedIntegrations.tsx
    echo "✅ Removed DeprecatedIntegrations.tsx"
else
    echo "⚠️  DeprecatedIntegrations.tsx not found"
fi

if [ -f "src/components/BannerCarousel.tsx" ]; then
    rm src/components/BannerCarousel.tsx
    echo "✅ Removed BannerCarousel.tsx"
else
    echo "⚠️  BannerCarousel.tsx not found"
fi

if [ -f "src/components/CommunicateFindings.tsx" ]; then
    rm src/components/CommunicateFindings.tsx
    echo "✅ Removed CommunicateFindings.tsx"
else
    echo "⚠️  CommunicateFindings.tsx not found"
fi

if [ -f "src/components/index.ts" ]; then
    rm src/components/index.ts
    echo "✅ Removed index.ts"
else
    echo "⚠️  index.ts not found"
fi

echo ""
echo "🔍 Running build to verify everything still works..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Dead code cleanup completed."
    echo ""
    echo "🧪 Running linter..."
    npm run lint
else
    echo "❌ Build failed! Please check for issues."
    exit 1
fi

echo ""
echo "🎉 Dead code cleanup complete!"