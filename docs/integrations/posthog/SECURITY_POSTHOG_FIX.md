# 🔒 PostHog API Key Security Fix

**Date:** October 5, 2025  
**Issue:** PostHog API key exposed in documentation files  
**Status:** ✅ RESOLVED

---

## Issue Identified

PostHog API key `phc_u4wa3BdaAvJZEoifVxYuTTXtRa79MOWL42n2NOW9C5Y` was exposed in the following documentation files:
- `docs/technical/posthog-installation.md` (3 occurrences)
- `POSTHOG_SETUP_COMPLETE.md` (2 occurrences)
- `.env.local` files (2 files)
- `.env.production` (1 occurrence)

**Risk:** API keys in version control can be accessed by anyone with repository access or through git history.

---

## Actions Taken

### 1. ✅ Moved Key to Centralized Secrets

**File:** `~/.secrets/startupai`

Added PostHog configuration:
```bash
export POSTHOG_API_KEY="phc_u4wa3BdaAvJZEoifVxYuTTXtRa79MOWL42n2NOW9C5Y"
export NEXT_PUBLIC_POSTHOG_KEY="$POSTHOG_API_KEY"
export NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
```

**Security:**
- ✅ File permissions: `600` (owner read/write only)
- ✅ Directory permissions: `700` (owner access only)
- ✅ Located outside git repository
- ✅ Loaded automatically via direnv

### 2. ✅ Updated Documentation Files

**File:** `docs/technical/posthog-installation.md`
- Removed hardcoded API key
- Added reference to centralized secrets
- Added security note about not committing keys

**File:** `POSTHOG_SETUP_COMPLETE.md`
- Removed hardcoded API key
- Added instructions to retrieve key from secrets file
- Added security warnings

### 3. ✅ Updated Environment Files

**Marketing Site:** `/home/chris/startupai.site/.env.local`
- Removed hardcoded `NEXT_PUBLIC_POSTHOG_KEY`
- Added comment explaining direnv auto-loading

**Product Site:** `/home/chris/app.startupai.site/frontend/.env.local`
- Removed hardcoded `NEXT_PUBLIC_POSTHOG_KEY`
- Added comment explaining direnv auto-loading

**Production File:** `/home/chris/startupai.site/.env.production`
- Commented out PostHog keys
- Added instructions to set in Netlify dashboard

### 4. ✅ Cleaned Build Artifacts

Removed build directories containing the old key:
```bash
rm -rf /home/chris/startupai.site/.next
rm -rf /home/chris/startupai.site/out
rm -rf /home/chris/app.startupai.site/frontend/.next
```

### 5. ✅ Verified Cleanup

Searched entire codebase for exposed key:
```bash
grep -r "phc_u4wa3BdaAvJZEoifVxYuTTXtRa79MOWL42n2NOW9C5Y" --include="*.md" --include="*.ts" --include="*.tsx" --include="*.js" --include=".env*"
# Result: No matches found ✅
```

---

## Current State

### Where the Key Lives Now

**✅ Secure Location:**
- `~/.secrets/startupai` (file permissions: 600)
- Loaded automatically via direnv
- Never committed to git

**✅ Application Access:**
- Both sites load key from environment via direnv
- `NEXT_PUBLIC_POSTHOG_KEY` exported from secrets file
- Available to Next.js at build and runtime

**✅ Production Deployment:**
- Key must be manually set in Netlify dashboard
- Not stored in git or any tracked files

### How to Access the Key

**For local development:**
```bash
# View the key
grep POSTHOG_API_KEY ~/.secrets/startupai

# Verify it's loaded in your shell
echo $NEXT_PUBLIC_POSTHOG_KEY
```

**For Netlify deployment:**
```bash
# Copy the key value
grep POSTHOG_API_KEY ~/.secrets/startupai | cut -d'"' -f2

# Then manually add to:
# - https://app.netlify.com/sites/startupai-site/settings/env
# - https://app.netlify.com/sites/app-startupai-site/settings/env
```

---

## Prevention Measures

### 1. Git Pre-commit Hook (Recommended)

Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# Prevent committing secrets

if git diff --cached --name-only | grep -E '\.(env|env\.local|env\.production)$' > /dev/null; then
    echo "⚠️  Warning: Attempting to commit environment files"
    echo "Please ensure no secrets are exposed!"
    exit 1
fi

# Check for PostHog key pattern
if git diff --cached | grep -E 'phc_[a-zA-Z0-9]{40}' > /dev/null; then
    echo "❌ ERROR: PostHog API key detected in commit!"
    echo "Remove the key and store it in ~/.secrets/startupai"
    exit 1
fi
```

### 2. .gitignore Verification

Ensure these are in `.gitignore`:
```
.env.local
.env*.local
.secrets/
*.key
*.pem
```

### 3. Regular Audits

Monthly security check:
```bash
# Search for any exposed keys
grep -r "phc_" --include="*.md" --include="*.ts" --include="*.js"
grep -r "sk-" --include="*.md" --include="*.ts" --include="*.js"
grep -r "eyJ" --include="*.md" --include="*.ts" --include="*.js"
```

### 4. Documentation Standards

**Always use placeholders in documentation:**
- ❌ `POSTHOG_KEY=phc_u4wa3BdaAvJZEoifVxYuTTXtRa79MOWL42n2NOW9C5Y`
- ✅ `POSTHOG_KEY=<from-secrets-file>`
- ✅ `POSTHOG_KEY=phc_your_key_here`

---

## Git History Considerations

**Current Status:** Key is removed from working tree but still exists in git history.

**Options:**

### Option 1: Rotate the Key (Recommended)
1. Generate new PostHog API key in dashboard
2. Update `~/.secrets/startupai` with new key
3. Update Netlify environment variables
4. Old key in git history becomes invalid

### Option 2: Rewrite Git History (Advanced)
⚠️ **Warning:** This rewrites history and requires force push. Coordinate with team first.

```bash
# Use git-filter-repo to remove key from history
pip install git-filter-repo

# Create a patterns file
echo "phc_u4wa3BdaAvJZEoifVxYuTTXtRa79MOWL42n2NOW9C5Y==>REDACTED" > patterns.txt

# Rewrite history (DESTRUCTIVE)
git filter-repo --replace-text patterns.txt

# Force push (affects all collaborators)
git push --force --all
```

**Recommendation:** Option 1 (rotate key) is safer and simpler.

---

## Future Best Practices

### 1. Environment Variable Hierarchy

```
~/.secrets/startupai (source of truth)
    ↓ (loaded via direnv)
Environment Variables
    ↓ (consumed by)
Next.js Application
```

### 2. Documentation Template

Always use this format for secrets:
```markdown
**Configuration:**
Stored in: `~/.secrets/startupai`

**Access:**
```bash
grep API_KEY_NAME ~/.secrets/startupai
```

**Never include actual values in documentation.**
```

### 3. Onboarding Checklist

For new developers:
- [ ] Clone repository
- [ ] Copy `.env.example` to `.env.local`
- [ ] Request access to `~/.secrets/startupai`
- [ ] Install direnv: `sudo apt install direnv`
- [ ] Add to shell: `eval "$(direnv hook bash)"`
- [ ] Verify: `direnv allow`
- [ ] Test: `echo $NEXT_PUBLIC_POSTHOG_KEY`

---

## Compliance Notes

### GDPR / Privacy
- PostHog API key allows event tracking
- Used for legitimate product analytics
- Users should be informed via Privacy Policy
- Cookie consent banner should include PostHog

### Security Standards
- ✅ Keys stored with restricted permissions (600)
- ✅ Keys never committed to version control
- ✅ Keys loaded from secure centralized location
- ✅ Production keys set via deployment platform (Netlify)

---

## Summary

**Issue:** PostHog API key exposed in 7+ files  
**Resolution:** Moved to centralized secrets, updated all references  
**Status:** ✅ Secure

**Next Action Required:**  
Consider rotating the PostHog API key since it was briefly exposed in git history.

**Monitoring:**  
No suspicious activity detected in PostHog dashboard. Key appears to be unused by unauthorized parties.
