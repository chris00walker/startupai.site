#!/bin/bash
# Netlify CLI Setup Script for PostHog Environment Variables
# Run this after updating NETLIFY_AUTH_TOKEN in ~/.secrets/startupai

set -e

echo "========================================"
echo "PostHog Environment Variables Setup"
echo "========================================"
echo ""

# Check if NETLIFY_AUTH_TOKEN is set
if [[ -z "$NETLIFY_AUTH_TOKEN" ]] || [[ "$NETLIFY_AUTH_TOKEN" == *"your-netlify-token"* ]]; then
    echo "❌ ERROR: NETLIFY_AUTH_TOKEN not set or is placeholder"
    echo ""
    echo "To fix this:"
    echo "1. Go to: https://app.netlify.com/user/applications"
    echo "2. Click: 'New access token'"
    echo "3. Name it: 'PostHog Setup CLI'"
    echo "4. Copy the token (starts with 'nfp_')"
    echo "5. Edit ~/.secrets/startupai and replace:"
    echo "   export NETLIFY_AUTH_TOKEN=\"nfp_your_actual_token\""
    echo "6. Run: direnv allow"
    echo "7. Re-run this script"
    echo ""
    exit 1
fi

echo "✅ NETLIFY_AUTH_TOKEN is set"
echo ""

# Get PostHog key from secrets
source ~/.secrets/startupai
POSTHOG_KEY="$POSTHOG_API_KEY"
POSTHOG_HOST="https://us.i.posthog.com"

echo "PostHog Configuration:"
echo "  Key: ${POSTHOG_KEY:0:20}..."
echo "  Host: $POSTHOG_HOST"
echo ""

# Function to set env vars for a site
set_env_vars() {
    local site_dir=$1
    local site_name=$2
    
    echo "========================================"
    echo "Setting up: $site_name"
    echo "========================================"
    
    cd "$site_dir"
    
    # Check if linked to Netlify
    if [[ ! -f ".netlify/state.json" ]]; then
        echo "⚠️  Site not linked to Netlify. Linking..."
        netlify link
    fi
    
    echo ""
    echo "Adding NEXT_PUBLIC_POSTHOG_KEY..."
    netlify env:set NEXT_PUBLIC_POSTHOG_KEY "$POSTHOG_KEY" --context production
    
    echo ""
    echo "Adding NEXT_PUBLIC_POSTHOG_HOST..."
    netlify env:set NEXT_PUBLIC_POSTHOG_HOST "$POSTHOG_HOST" --context production
    
    echo ""
    echo "✅ Environment variables set for $site_name"
    echo ""
}

# Marketing Site
echo ""
read -p "Set up startupai-site (marketing)? [Y/n] " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
    set_env_vars "/home/chris/startupai.site" "startupai-site"
fi

# Product Site
echo ""
read -p "Set up app-startupai-site (product)? [Y/n] " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
    set_env_vars "/home/chris/app.startupai.site" "app-startupai-site"
fi

echo ""
echo "========================================"
echo "✅ Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Trigger new deployments on both sites"
echo "2. Verify tracking in PostHog dashboard: https://us.i.posthog.com"
echo "3. Check browser console for PostHog initialization"
echo ""
echo "To trigger deployments:"
echo "  cd /home/chris/startupai.site && git commit --allow-empty -m 'chore: trigger deploy' && git push"
echo "  cd /home/chris/app.startupai.site && git commit --allow-empty -m 'chore: trigger deploy' && git push"
echo ""
