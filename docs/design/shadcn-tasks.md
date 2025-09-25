# ShadCN UI Implementation Plan: Chris Walker Consulting

## Overview

This document outlines the ShadCN UI components and blocks to be used in the Next.js migration of the Chris Walker Consulting website. The plan prioritizes reusable components and complete UI blocks where available.

## Component Mapping by Page/Section

### Global Layout Components

#### Navigation (Header)

- **navigation-menu** - Main desktop navigation with dropdown support
- **sheet** - Mobile navigation drawer/sidebar
- **button** - Navigation CTA buttons (Contact, Access Platform)
- **separator** - Visual dividers in navigation dropdowns

#### Footer

- **separator** - Section dividers
- **button** - Social media icon buttons

### Homepage (`src/app/page.tsx`)

#### Hero Section

- **button** - Primary and secondary CTA buttons
- **badge** - Service highlights or status indicators

#### Services Preview Section

- **card** - Service overview cards with icons and descriptions
- **button** - "Learn More" buttons for each service
- **hover-card** - Additional service details on hover

#### Call-to-Action Section

- **button** - Primary action buttons
- **dialog** - Modal for platform access or consultation booking

### About Page (`src/app/about/page.tsx`)

#### Content Sections

- **card** - Experience highlights and credentials
- **separator** - Section dividers
- **badge** - Skills and expertise tags
- **avatar** - Profile image component

### Services Pages

#### Services Overview (`src/app/services/page.tsx`)

- **card** - Individual service cards with pricing and features
- **button** - Service selection and booking buttons
- **tabs** - Service category organization
- **badge** - Service type indicators

#### Individual Service Pages

- **card** - Feature lists and process steps
- **accordion** - FAQ sections and detailed breakdowns
- **button** - Booking and contact buttons
- **progress** - Process timeline visualization
- **separator** - Content section dividers

### Portfolio Page (`src/app/portfolio/page.tsx`)

#### Project Showcase

- **card** - Project case study cards
- **badge** - Technology stack tags
- **carousel** - Project image galleries
- **dialog** - Detailed project modals
- **button** - View project buttons

### Contact Page (`src/app/contact/page.tsx`)

#### Contact Form

- **form** - Main contact form wrapper
- **input** - Text input fields (name, email, company)
- **textarea** - Message input field
- **select** - Service type dropdown
- **checkbox** - Agreement and newsletter checkboxes
- **button** - Form submission button
- **alert** - Success/error messages

#### Contact Information

- **card** - Contact details and office information
- **separator** - Section dividers

### Blog Page (`src/app/blog/page.tsx`)

#### Blog Layout

- **card** - Blog post preview cards
- **badge** - Category and tag indicators
- **pagination** - Blog post navigation
- **input** - Search functionality
- **button** - Read more buttons

### Process Page (`src/app/process/page.tsx`)

#### Process Visualization

- **card** - Process step cards
- **progress** - Process timeline
- **separator** - Step dividers
- **accordion** - Detailed step breakdowns

### Preview Page (`src/app/preview/page.tsx`)

#### Platform Integration

- **card** - Platform feature previews
- **button** - Access platform buttons
- **dialog** - Authentication/signup modals
- **badge** - Feature status indicators

## Recommended ShadCN Blocks

### Calendar Integration (Future Phase)

- **calendar-01** - Simple calendar for consultation booking
- **calendar-16** - Advanced scheduling with time slots

### Authentication (Platform Integration)

- **login-01** - Clean login form for platform access
- **login-02** - Alternative login layout with social options

### Dashboard (Platform Preview)

- **dashboard-01** - Platform capabilities preview

## Component Priority Implementation

### Phase 1: Core Components (Week 2)

1. **button** - Universal button component
2. **card** - Primary content container
3. **navigation-menu** - Desktop navigation
4. **sheet** - Mobile navigation
5. **separator** - Layout dividers

### Phase 2: Form Components (Week 3)

1. **form** - Contact form wrapper
2. **input** - Text inputs
3. **textarea** - Message fields
4. **select** - Dropdown selections
5. **checkbox** - Form checkboxes
6. **alert** - Form feedback

### Phase 3: Interactive Components (Week 3-4)

1. **dialog** - Modals and overlays
2. **hover-card** - Enhanced interactions
3. **accordion** - Expandable content
4. **tabs** - Content organization
5. **carousel** - Image galleries

### Phase 4: Advanced Components (Week 4-5)

1. **badge** - Status and category indicators
2. **progress** - Process visualization
3. **avatar** - Profile images
4. **pagination** - Content navigation
5. **calendar-01** - Booking integration

## Integration Strategy

### Component Library Structure

```text
src/components/ui/
├── button.tsx          # ShadCN button component
├── card.tsx            # ShadCN card component
├── navigation-menu.tsx # ShadCN navigation-menu
├── sheet.tsx           # ShadCN sheet component
├── form.tsx            # ShadCN form components
├── input.tsx           # ShadCN input component
├── dialog.tsx          # ShadCN dialog component
└── ...                 # Additional ShadCN components
```

### Custom Wrapper Components

```text
src/components/sections/
├── Hero.tsx            # Uses: button, badge
├── ServiceCard.tsx     # Uses: card, button, hover-card
├── ContactForm.tsx     # Uses: form, input, textarea, select, button, alert
├── ProcessStep.tsx     # Uses: card, progress, separator
└── ProjectCard.tsx     # Uses: card, badge, button, dialog
```

### Block Integration

```text
src/components/blocks/
├── CalendarBooking.tsx # calendar-01 block
├── LoginModal.tsx      # login-01 block
└── PlatformPreview.tsx # dashboard-01 block
```

## Design System Alignment

### Theme Configuration

- Maintain existing color palette (primary, secondary, accent colors)
- Preserve Inter font family
- Keep current spacing and sizing conventions
- Ensure responsive breakpoints match existing design

### Component Customization

- Override ShadCN default styles to match current design
- Maintain hover states and transitions
- Preserve accessibility features
- Keep consistent border radius and shadow styles

## Implementation Notes

### Component Installation Order

1. Install ShadCN CLI and initialize
2. Add core components (button, card, navigation-menu, sheet)
3. Add form components (form, input, textarea, select, checkbox, alert)
4. Add interactive components (dialog, hover-card, accordion, tabs)
5. Add specialized components (badge, progress, avatar, pagination)
6. Integrate calendar block for booking functionality

### Testing Strategy

- Test each component in isolation
- Verify responsive behavior across breakpoints
- Ensure accessibility compliance
- Validate form functionality and validation
- Test mobile navigation and interactions

## Success Criteria

### Visual Consistency

- Pixel-perfect match with current design
- Smooth animations and transitions
- Consistent spacing and typography
- Proper responsive behavior

### Functionality

- All interactive elements working correctly
- Form validation and submission
- Mobile navigation functionality
- Accessibility compliance (WCAG 2.1 AA)

### Performance

- Fast loading times
- Smooth animations
- Optimized bundle size
- Good Core Web Vitals scores

---

*This plan provides a comprehensive roadmap for implementing ShadCN UI components in the Chris Walker Consulting Next.js application, ensuring consistency, functionality, and maintainability.*
