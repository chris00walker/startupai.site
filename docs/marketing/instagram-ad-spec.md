# StartupAI Instagram Ad Specification

## Overview

**Campaign Goal**: Drive beta signups for StartupAI waitlist
**Target Audience**: Non-technical founders with startup ideas seeking validation
**Primary CTA**: Get Early Access
**Landing Page**: `startupai.site/beta`

---

## Instagram Ad Dimensions

### Recommended Formats

| Format | Dimensions | Aspect Ratio | Best For |
|--------|------------|--------------|----------|
| **Feed (Primary)** | 1080 x 1440 px | 3:4 | Maximum vertical impact in feed |
| Feed (Alternative) | 1080 x 1350 px | 4:5 | Traditional portrait format |
| Feed (Square) | 1080 x 1080 px | 1:1 | Grid consistency |
| **Stories/Reels** | 1080 x 1920 px | 9:16 | Full-screen vertical |

### Safe Zones (Stories/Reels)
- **Top**: Leave 250px (14%) free of text/logos
- **Bottom**: Leave 340px (20%) free for CTA overlay

### File Specs
- **Format**: PNG (for crisp text) or JPG (for photographs)
- **Max file size**: 30MB
- **Resolution**: Minimum 600px width, recommended 1080px

---

## Brand Guidelines

### Color Palette (From Landing Page Spec)

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#3B82F6` (Blue-500) | CTAs, links, accents |
| **Primary Dark** | `#2563EB` (Blue-600) | Hover states |
| **Background** | `#FFFFFF` | Page background |
| **Background Gradient** | `slate-50 → blue-50 → indigo-50` | Hero section |
| **Text Primary** | `#0F172A` (Slate-900) | Headlines |
| **Text Secondary** | `#64748B` (Slate-500) | Body text, descriptions |
| **Text Muted** | `#94A3B8` (Slate-400) | Helper text |

### Gradient Specifications
- **Hero Gradient**: `#F8FAFC` → `#EFF6FF` → `#EEF2FF` (slate-50 → blue-50 → indigo-50)
- **CTA Button**: Solid `#3B82F6` with hover `#2563EB`
- **Gradient Text**: Primary `#3B82F6` → Primary/70%

### Typography (Inter Font Family)

| Element | Size (Desktop) | Weight | Line Height |
|---------|----------------|--------|-------------|
| **Headline** | 48px | Bold (700) | 1.1 |
| **Subheadline** | 20px | Regular (400) | 1.5 |
| **Body** | 16px | Regular (400) | 1.75 |
| **Button Text** | 16px | Semibold (600) | 1 |

---

## Ad Creative Specification

### Headline Options (Aligned with Landing Page A/B Variants)

**Primary (Recommended)**:
> "Stop Guessing. Start Validating."

**Alternatives**:
> "Validate Your Startup Idea in 2 Weeks"
> "Your AI Co-Founder for Startup Validation"

### Supporting Copy Options

**Primary**:
> "Our AI co-founder validates your startup idea in 2 weeks—not 6 months."

**Alternatives**:
> "Get market research, competitor analysis, and a go/no-go recommendation backed by real evidence."
> "AI analyzes 1000+ data points to tell you if your idea works."
> "Clear go/no-go recommendation with evidence score."

### Value Props (From Landing Page Cards)

| Theme | Headline | Supporting |
|-------|----------|------------|
| **Speed** | "2 Weeks, Not 6 Months" | "Complete validation while competitors write surveys" |
| **Evidence** | "Real Data, Not Hunches" | "AI analyzes 1000+ data points from competitors, reviews, and trends" |
| **Clarity** | "Go/No-Go Confidence" | "Clear recommendation with evidence score" |

### Call-to-Action
- **Primary CTA**: "Get Early Access →"
- **Alternative CTAs**: "Start Free Trial →" or "Validate My Idea →"
- **Urgency Badge**: "Limited Beta - Only 200 Spots Left"

### Trust Indicators
> ✓ No credit card required · ✓ 14-day free trial · ✓ Cancel anytime

### Visual Elements

**Required**:
1. StartupAI wordmark (subtle, top-left or bottom)
2. Gradient background (slate-50 → blue-50 → indigo-50)
3. Clear headline hierarchy with gradient text accent
4. CTA button: Primary blue with white text

**Optional Enhancements**:
- Subtle geometric shapes at 5-10% opacity
- Icon accents (Zap, BarChart, Target) in primary blue on light circles
- Floating elements: circles, rounded rectangles

**Avoid**:
- Stock photos of people at laptops
- Generic "AI brain" or robot imagery
- Cluttered layouts
- More than 2 font weights
- Text covering more than 20% of image (Meta recommendation)

---

## Ad Variants to Create

### Variant A: Feed Ad (1080x1440)
- Focus: Value proposition
- Hero: Main headline with gradient background
- Body: 1-2 line supporting copy
- Footer: CTA button + beta badge

### Variant B: Stories Ad (1080x1920)
- Focus: Urgency/scarcity
- Hero: "Only 200 Spots"
- Body: Quick value prop
- Swipe-up CTA

### Variant C: Carousel (1080x1440 x 3 slides)
1. **Problem**: "Still building without validation?"
2. **Solution**: "AI Co-Founder validates in 2 weeks"
3. **CTA**: "Apply for Beta Access"

---

## Figma Make Prompts

Use these prompts in Figma Make to generate ad creatives.

---

### PROMPT 1: FEED AD - PRIMARY (1080x1440)

```
Create a modern, premium Instagram feed ad (1080x1440px, 3:4 aspect ratio) for "StartupAI" - an AI co-founder platform for startup validation.

BRAND CONTEXT:
StartupAI helps non-technical founders validate their startup ideas in 2 weeks instead of 6 months. The brand is modern, trustworthy, and tech-forward but approachable—not cold or corporate.

VISUAL STYLE:
- Background: Soft gradient flowing diagonally from light slate (#F8FAFC) through light blue (#EFF6FF) to light indigo (#EEF2FF)
- Primary accent color: Blue (#3B82F6)
- Headline text: Dark navy (#0F172A)
- Body text: Slate gray (#64748B)
- Style: Clean, minimal, modern SaaS aesthetic
- Add subtle floating geometric shapes (circles, rounded rectangles) at 5-10% opacity
- No photos, illustrations only if minimal and abstract

LAYOUT:
- Top (10%): Small pill badge, centered
- Middle (55%): Large two-line headline, centered, with the word "Validating" in gradient blue text
- Below headline (20%): Supporting copy, regular weight, slate gray color
- Bottom (15%): Prominent CTA button, solid blue (#3B82F6), white text, with right arrow

COPY:
- Badge: "✨ Limited Beta - Only 200 Spots Left"
- Headline Line 1: "Stop Guessing."
- Headline Line 2: "Start Validating."
- Subheadline: "Our AI co-founder validates your startup idea in 2 weeks—not 6 months. Get market research and a go/no-go recommendation backed by real evidence."
- CTA Button: "Get Early Access →"

TYPOGRAPHY (Inter font):
- Headline: 52px, Bold (700), line-height 1.1
- Subheadline: 22px, Regular (400), line-height 1.5
- Button: 18px, Semibold (600)
- Badge: 14px, Medium (500)

BADGE STYLE:
- Background: #F1F5F9 (Slate-100)
- Text: #475569 (Slate-600)
- Padding: 8px 16px
- Border radius: 6px
- Small sparkle icon before text

BUTTON STYLE:
- Background: #3B82F6
- Text: White
- Padding: 14px 32px
- Border radius: 8px
- Subtle shadow: 0 4px 6px rgba(59, 130, 246, 0.25)

ADDITIONAL NOTES:
- Keep text under 20% of image area for Meta ad compliance
- The word "Validating" should have a blue gradient effect
- Ensure high contrast between text and background (WCAG AA)
- The overall feel: "premium tech startup" not "generic AI company"
- Include small "StartupAI" wordmark in bottom-left corner, subtle
- Max-width for text content: 900px centered
```

---

### PROMPT 2: FEED AD - VALUE PROP VARIANT (1080x1440)

```
Create an Instagram feed ad (1080x1440px, 3:4 aspect ratio) for "StartupAI" focusing on the core value proposition.

BRAND COLORS:
- Background gradient: #F8FAFC → #EFF6FF → #EEF2FF
- Primary blue: #3B82F6
- Headline: #0F172A
- Body: #64748B

LAYOUT:
- Top: Urgency badge
- Center: Bold headline + 3 icon feature cards
- Bottom: CTA button

COPY:
- Badge: "Limited Beta"
- Headline: "Validate Your Startup Idea in 2 Weeks"
- Three feature cards (horizontal row):
  1. Icon: Zap | "2 Weeks" | "Not 6 months"
  2. Icon: BarChart | "Real Data" | "1000+ data points"
  3. Icon: Target | "Go/No-Go" | "Clear decision"
- CTA: "Get Early Access →"

FEATURE CARD STYLE:
- White background with subtle shadow
- Icon in 40px blue circle (#EFF6FF background, #3B82F6 icon)
- Title: 18px Bold
- Subtitle: 14px Regular, muted

TYPOGRAPHY (Inter):
- Headline: 44px Bold
- Card title: 18px Semibold
- Card subtitle: 14px Regular

Keep text under 20% of image. Clean, minimal, modern SaaS aesthetic.
```

---

### PROMPT 3: STORIES AD (1080x1920)

```
Create a vertical Instagram Stories ad (1080x1920px, 9:16 aspect ratio) for "StartupAI".

CRITICAL SAFE ZONES:
- TOP 250px: Keep clear of important content (profile icon area)
- BOTTOM 340px: Keep clear of text (Instagram's CTA area)

VISUAL STYLE:
- Background: Light gradient (#F8FAFC → #EFF6FF → #EEF2FF)
- Primary blue: #3B82F6
- Text: Dark navy (#0F172A) on light areas
- Modern, clean SaaS aesthetic
- Subtle floating geometric shapes at 5% opacity

LAYOUT (top to bottom):
- Safe zone (0-250px): Gradient only, maybe subtle shapes
- Logo area (250-350px): "StartupAI" wordmark, small, dark
- Main zone (350-1200px):
  - Urgency badge: pill shape
  - Large headline: two lines, centered
  - Supporting text: single line
- Icon zone (1200-1400px): Three small icons with labels (Zap, BarChart, Target)
- Transition (1400-1580px): Gradient continues
- Safe zone (1580-1920px): Clear for Instagram's native CTA

COPY:
- Badge: "Only 200 Spots Left" (dark pill, white text)
- Headline: "Stop Guessing.\nStart Validating."
- Body: "AI validates your startup idea in 2 weeks"
- Icon labels: "Fast" | "Data-Driven" | "Clear Answer"

TYPOGRAPHY (Inter):
- Headline: 56px Bold, #0F172A
- Body: 24px Regular, #64748B
- Badge: 16px Medium, white on semi-transparent dark
- Icon labels: 14px Medium

MOOD:
- Urgent but not desperate
- Premium and exclusive
- Tech-forward but human
- Light and airy, not dark and dramatic
```

---

### PROMPT 4: CAROUSEL AD - SLIDE 1 OF 3 (1080x1440)

```
Create Instagram carousel slide 1 of 3 (1080x1440px) for "StartupAI" - the problem slide.

VISUAL: Dark gradient background (#1E293B → #0F172A) for contrast

COPY:
- Small text top: "Sound familiar?"
- Large headline: "Still building without validation?"
- Body: "90% of startups fail because they build something nobody wants."

TYPOGRAPHY:
- Small text: 16px Regular, #94A3B8
- Headline: 48px Bold, White
- Body: 22px Regular, #94A3B8

Include "1/3" indicator, subtle, bottom-right. Swipe arrow hint.
```

---

### PROMPT 5: CAROUSEL AD - SLIDE 2 OF 3 (1080x1440)

```
Create Instagram carousel slide 2 of 3 (1080x1440px) for "StartupAI" - the solution slide.

VISUAL: Light gradient background (#F8FAFC → #EFF6FF → #EEF2FF)

COPY:
- Small text top: "There's a better way"
- Large headline: "AI Co-Founder Validates in 2 Weeks"
- Three bullet points with checkmarks:
  ✓ Market research & competitor analysis
  ✓ Real data from 1000+ sources
  ✓ Clear go/no-go recommendation

TYPOGRAPHY:
- Small text: 16px Regular, #64748B
- Headline: 44px Bold, #0F172A
- Bullets: 20px Regular, #475569
- Checkmarks: #3B82F6

Include "2/3" indicator and swipe arrows.
```

---

### PROMPT 6: CAROUSEL AD - SLIDE 3 OF 3 (1080x1440)

```
Create Instagram carousel slide 3 of 3 (1080x1440px) for "StartupAI" - the CTA slide.

VISUAL: Gradient background with centered white card

COPY:
- Card headline: "Ready to validate your idea?"
- Card body: "Join 500+ founders who stopped guessing."
- CTA button: "Get Early Access →"
- Trust line: "✓ No credit card · ✓ 14-day trial · ✓ Cancel anytime"

CARD STYLE:
- White background
- Large shadow (shadow-2xl)
- Border radius: 16px
- Padding: 48px

BUTTON:
- Blue (#3B82F6), white text, arrow icon
- Full width inside card

Include "3/3" indicator. Final slide, no swipe arrow.
```

---

## Checklist Before Publishing

- [ ] Text covers less than 20% of image
- [ ] CTA is clearly visible and legible
- [ ] Brand colors are consistent
- [ ] Safe zones respected (Stories)
- [ ] File exported at correct dimensions
- [ ] File size under 30MB
- [ ] Landing page URL ready: `startupai.site/beta`
- [ ] UTM parameters added for tracking

---

## Tracking

**UTM Parameters**:
```
?utm_source=instagram&utm_medium=paid&utm_campaign=beta_launch&utm_content=feed_v1
```

**Landing Page**: `https://startupai.site/beta`

---

*Last Updated: 2026-01-21*
