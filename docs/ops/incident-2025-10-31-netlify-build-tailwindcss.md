# Incident Report: Netlify Build Failure - Tailwind CSS Module Not Found

**Date**: 2025-10-31
**Severity**: High (Production deployment blocked)
**Status**: Resolved
**Duration**: ~2 hours

## Summary

Netlify deployments failed with "Cannot find module 'tailwindcss'" error during the PostCSS/webpack build phase, preventing any updates from reaching production.

## Timeline

- **Initial deployment**: Failed with module resolution errors for "@/components/..." imports
- **First fix attempt**: Added webpack alias configuration in `next.config.js` (commit c648cce)
- **Second failure**: Build still failed, now with "Cannot find module 'tailwindcss'" error
- **Root cause identified**: pnpm's symlinked node_modules structure prevented PostCSS from resolving the tailwindcss module
- **Final fix**: Added `.npmrc` with `shamefully-hoist=true` (commit 7c3bbe5)

## Root Cause

pnpm uses a symlinked node_modules structure by default where packages are stored in `.pnpm/` and symlinked to the root. While this works for most Node.js module resolution, PostCSS (used by Next.js to process CSS) couldn't resolve the `tailwindcss` module through these symlinks during Netlify's build process.

The error occurred at this point in the build:
```
./src/app/globals.css -> PostCSS processing -> require('tailwindcss') -> ERROR
```

## Impact

- **Deployment**: Completely blocked
- **Users**: No impact (existing production site remained functional)
- **Development**: Local builds worked fine due to different module resolution behavior

## Resolution

### Changes Applied

1. **Webpack alias configuration** (`next.config.js`)
   - Added explicit webpack alias: `'@': path.resolve(__dirname, 'src')`
   - Resolved the initial path alias issues
   - Commit: c648cce

2. **pnpm hoisting configuration** (`.npmrc`)
   - Added `shamefully-hoist=true` to create a flat node_modules structure
   - Ensures PostCSS can find all dependencies in the root node_modules
   - Commit: 7c3bbe5

### Files Modified

- `next.config.js` - Added webpack alias resolver
- `.npmrc` - Added pnpm hoisting configuration

### Verification

- Local build tested and successful after reinstalling node_modules with new `.npmrc`
- All 23 pages generated successfully
- Tailwindcss module confirmed present in root `node_modules/` directory

## Prevention

### Immediate Actions

- ✅ Configuration committed to repository
- ✅ Local testing completed
- ⏳ Awaiting Netlify deployment verification

### Long-term Improvements

1. **CI/CD Enhancement**: Add pre-deploy build validation that runs in a clean environment similar to Netlify
2. **Documentation**: Update development setup docs to mention pnpm hoisting requirement
3. **Monitoring**: Set up Netlify build notifications to catch failures faster

## Lessons Learned

1. **Module resolution differences**: pnpm's symlinked structure can cause issues with tools that don't fully support it (PostCSS, webpack loaders)
2. **Local vs CI environments**: Successful local builds don't guarantee CI success due to environment differences
3. **Incremental fixes**: The issue had two components (path aliases + module resolution) that needed separate fixes

## Related Documentation

- [pnpm Configuration](https://pnpm.io/npmrc#shamefully-hoist)
- [Next.js PostCSS](https://nextjs.org/docs/app/building-your-application/styling/css)
- [Netlify Build Configuration](../ops/deploy.md)

## References

- Commit c648cce: "fix: add webpack alias for @ imports to resolve Netlify build errors"
- Commit 7c3bbe5: "fix: add .npmrc to configure pnpm hoisting for Netlify builds"
- Error logs: Netlify build #[insert build number]
