# Dead Code Files to Delete

Run these commands to remove dead code:

```bash
cd /Users/ethanding/projects/textql-landing-page

# Remove dead code files
rm src/components/DebugTestSimple.tsx
rm src/components/DebugTest.tsx  
rm src/components/DebugDemo.tsx
rm src/pages/DeprecatedIntegrations.tsx
rm src/components/BannerCarousel.tsx
rm src/components/CommunicateFindings.tsx
rm src/components/index.ts

# Verify everything still works
npm run build
npm run lint
```

## Files Analysis:
- DebugTestSimple.tsx: Test component, never imported
- DebugTest.tsx: Test component, never imported  
- DebugDemo.tsx: Demo component, never imported
- DeprecatedIntegrations.tsx: Deprecated page, never routed
- BannerCarousel.tsx: Exported but never used
- CommunicateFindings.tsx: Component never imported
- index.ts: Only exports unused BannerCarousel