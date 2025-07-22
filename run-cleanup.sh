#!/bin/bash

echo "🧹 TextQL Landing Page Dead Code Cleanup"
echo "========================================"

cd /Users/ethanding/projects/textql-landing-page

echo "Current directory: $(pwd)"
echo ""

echo "🔍 Files to remove:"
echo "- src/components/DebugTestSimple.tsx"
echo "- src/components/DebugTest.tsx"
echo "- src/components/DebugDemo.tsx"
echo "- src/pages/DeprecatedIntegrations.tsx"
echo "- src/components/BannerCarousel.tsx"
echo "- src/components/CommunicateFindings.tsx"
echo "- src/components/index.ts"
echo "- src/components/NoFlashDebug.tsx"
echo "- src/components/UltraSimpleDebug.tsx"
echo "- src/components/SimpleDebugFixed.tsx"
echo ""

echo "🗑️  Removing dead code files..."

# Remove files if they exist
[ -f "src/components/DebugTestSimple.tsx" ] && rm "src/components/DebugTestSimple.tsx" && echo "✅ Removed DebugTestSimple.tsx"
[ -f "src/components/DebugTest.tsx" ] && rm "src/components/DebugTest.tsx" && echo "✅ Removed DebugTest.tsx"
[ -f "src/components/DebugDemo.tsx" ] && rm "src/components/DebugDemo.tsx" && echo "✅ Removed DebugDemo.tsx"
[ -f "src/pages/DeprecatedIntegrations.tsx" ] && rm "src/pages/DeprecatedIntegrations.tsx" && echo "✅ Removed DeprecatedIntegrations.tsx"
[ -f "src/components/BannerCarousel.tsx" ] && rm "src/components/BannerCarousel.tsx" && echo "✅ Removed BannerCarousel.tsx"
[ -f "src/components/CommunicateFindings.tsx" ] && rm "src/components/CommunicateFindings.tsx" && echo "✅ Removed CommunicateFindings.tsx"
[ -f "src/components/index.ts" ] && rm "src/components/index.ts" && echo "✅ Removed index.ts"
[ -f "src/components/NoFlashDebug.tsx" ] && rm "src/components/NoFlashDebug.tsx" && echo "✅ Removed NoFlashDebug.tsx"
[ -f "src/components/UltraSimpleDebug.tsx" ] && rm "src/components/UltraSimpleDebug.tsx" && echo "✅ Removed UltraSimpleDebug.tsx"
[ -f "src/components/SimpleDebugFixed.tsx" ] && rm "src/components/SimpleDebugFixed.tsx" && echo "✅ Removed SimpleDebugFixed.tsx"

echo ""
echo "🔍 Verifying files are gone..."
ls -la src/components/DebugTestSimple.tsx 2>/dev/null || echo "✅ DebugTestSimple.tsx - DELETED"
ls -la src/components/DebugTest.tsx 2>/dev/null || echo "✅ DebugTest.tsx - DELETED"
ls -la src/components/DebugDemo.tsx 2>/dev/null || echo "✅ DebugDemo.tsx - DELETED"
ls -la src/pages/DeprecatedIntegrations.tsx 2>/dev/null || echo "✅ DeprecatedIntegrations.tsx - DELETED"
ls -la src/components/BannerCarousel.tsx 2>/dev/null || echo "✅ BannerCarousel.tsx - DELETED"
ls -la src/components/CommunicateFindings.tsx 2>/dev/null || echo "✅ CommunicateFindings.tsx - DELETED"
ls -la src/components/index.ts 2>/dev/null || echo "✅ index.ts - DELETED"
ls -la src/components/NoFlashDebug.tsx 2>/dev/null || echo "✅ NoFlashDebug.tsx - DELETED"
ls -la src/components/UltraSimpleDebug.tsx 2>/dev/null || echo "✅ UltraSimpleDebug.tsx - DELETED"
ls -la src/components/SimpleDebugFixed.tsx 2>/dev/null || echo "✅ SimpleDebugFixed.tsx - DELETED"

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🧪 Running linter..."
    npm run lint
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ LINT PASSED!"
        echo ""
        echo "🎉 DEAD CODE CLEANUP COMPLETED SUCCESSFULLY!"
        echo ""
        echo "📊 Summary:"
        echo "- Removed 10 dead code files"
        echo "- Build is working"
        echo "- Code passes linting"
        echo "- Landing page is now cleaner and more maintainable"
        echo ""
        echo "Files removed:"
        echo "• 7 unused debug/test components"
        echo "• 1 deprecated integrations page"
        echo "• 1 unused banner carousel component"
        echo "• 1 unused communicate findings component"
        echo ""
        echo "✨ All dead code has been successfully removed!"
    else
        echo ""
        echo "⚠️  LINT ISSUES FOUND - Please fix before committing"
    fi
else
    echo ""
    echo "❌ BUILD FAILED!"
    echo "Please check the error messages above."
    exit 1
fi

echo ""
echo "🧹 Cleanup complete!"