# 🎨 StartupAI UI Specifications

**Product:** Evidence-Led Strategy Platform  
**Version:** MVP 1.0  
**Date:** September 2025  

**📋 Related Documentation:**
- **Accessibility Standards:** [WCAG 2.0/2.1/2.2 Compliance](accessibility-standards.md)
- **User Experience:** [Cross-Site UX Design](user-experience.md)
- **Design System:** [Component Implementation](design-system.md)

---

## Design System Overview

StartupAI's design system emphasizes **trust, clarity, and evidence-based decision making**. The visual language should feel professional yet approachable, with clear information hierarchy and intuitive interactions.

**Accessibility First:** All UI components follow [WCAG 2.0/2.1/2.2 AA standards](accessibility-standards.md) with special attention to AI accessibility integration.

---

## Visual Identity

### Brand Colors

**Primary Palette**
```css
:root {
  /* Primary - Trust & Reliability */
  --blue-50: #eff6ff;
  --blue-100: #dbeafe;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  
  /* Secondary - Innovation & AI */
  --purple-50: #faf5ff;
  --purple-100: #f3e8ff;
  --purple-500: #8b5cf6;
  --purple-600: #7c3aed;
  --purple-700: #6d28d9;
}
```

**Semantic Colors**
```css
:root {
  /* Success - Validation & Progress */
  --green-50: #ecfdf5;
  --green-100: #d1fae5;
  --green-500: #10b981;
  --green-600: #059669;
  --green-700: #047857;
  
  /* Warning - Assumptions & Caution */
  --amber-50: #fffbeb;
  --amber-100: #fef3c7;
  --amber-500: #f59e0b;
  --amber-600: #d97706;
  --amber-700: #b45309;
  
  /* Error - Risk & Failure */
  --red-50: #fef2f2;
  --red-100: #fee2e2;
  --red-500: #ef4444;
  --red-600: #dc2626;
  --red-700: #b91c1c;
  
  /* Neutral - Text & Backgrounds */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
}
```

### Typography

**Font Stack**
```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
}
```

**Type Scale**
```css
.text-xs { font-size: 0.75rem; line-height: 1rem; }      /* 12px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }  /* 14px */
.text-base { font-size: 1rem; line-height: 1.5rem; }     /* 16px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }  /* 18px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }   /* 20px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }      /* 24px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* 30px */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }   /* 36px */
```

**Font Weights**
```css
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
```

---

## Component Specifications

### Buttons

**Primary Button**
```css
.btn-primary {
  background: var(--blue-600);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--blue-700);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Secondary Button**
```css
.btn-secondary {
  background: white;
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}
```

**Button Sizes**
```css
.btn-sm { padding: 0.5rem 1rem; font-size: 0.75rem; }
.btn-md { padding: 0.75rem 1.5rem; font-size: 0.875rem; }
.btn-lg { padding: 1rem 2rem; font-size: 1rem; }
```

### Cards

**Base Card**
```css
.card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: var(--gray-300);
}
```

**Project Card**
```css
.project-card {
  @apply card;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--blue-500);
}

.project-card.status-active::before { background: var(--green-500); }
.project-card.status-warning::before { background: var(--amber-500); }
.project-card.status-error::before { background: var(--red-500); }
```

### Badges

**Status Badges**
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge-success {
  background: var(--green-100);
  color: var(--green-800);
}

.badge-warning {
  background: var(--amber-100);
  color: var(--amber-800);
}

.badge-error {
  background: var(--red-100);
  color: var(--red-800);
}

.badge-info {
  background: var(--blue-100);
  color: var(--blue-800);
}
```

**Risk Level Badges**
```css
.risk-high {
  background: var(--red-100);
  color: var(--red-800);
  border: 1px solid var(--red-200);
}

.risk-medium {
  background: var(--amber-100);
  color: var(--amber-800);
  border: 1px solid var(--amber-200);
}

.risk-low {
  background: var(--green-100);
  color: var(--green-800);
  border: 1px solid var(--green-200);
}
```

### Progress Indicators

**Progress Ring**
```css
.progress-ring {
  width: 120px;
  height: 120px;
  position: relative;
}

.progress-ring-circle {
  fill: none;
  stroke: var(--gray-200);
  stroke-width: 8;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.progress-ring-progress {
  stroke: var(--blue-500);
  stroke-dasharray: 283; /* 2 * π * 45 */
  stroke-dashoffset: calc(283 - (283 * var(--progress)) / 100);
  transition: stroke-dashoffset 0.5s ease;
}
```

**Linear Progress Bar**
```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--blue-500), var(--purple-500));
  border-radius: 4px;
  transition: width 0.5s ease;
  width: var(--progress);
}
```

### Forms

**Input Fields**
```css
.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: white;
}

.input:focus {
  outline: none;
  border-color: var(--blue-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input:invalid {
  border-color: var(--red-500);
}

.input:invalid:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

**Select Dropdown**
```css
.select {
  @apply input;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
```

**Textarea**
```css
.textarea {
  @apply input;
  min-height: 6rem;
  resize: vertical;
  font-family: var(--font-sans);
}
```

### Tables

**Data Table**
```css
.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table th {
  background: var(--gray-50);
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--gray-700);
  border-bottom: 1px solid var(--gray-200);
}

.table td {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-100);
  font-size: 0.875rem;
}

.table tr:hover {
  background: var(--gray-50);
}

.table tr:last-child td {
  border-bottom: none;
}
```

---

## Layout Components

### Navigation

**Top Navigation**
```css
.navbar {
  background: white;
  border-bottom: 1px solid var(--gray-200);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--gray-900);
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-link {
  color: var(--gray-600);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.navbar-link:hover,
.navbar-link.active {
  color: var(--blue-600);
}
```

**Sidebar Navigation**
```css
.sidebar {
  width: 16rem;
  background: white;
  border-right: 1px solid var(--gray-200);
  padding: 2rem 0;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
}

.sidebar-nav {
  padding: 0 1rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: var(--gray-700);
  text-decoration: none;
  border-radius: 0.5rem;
  margin-bottom: 0.25rem;
  transition: all 0.2s ease;
}

.sidebar-link:hover {
  background: var(--gray-100);
  color: var(--gray-900);
}

.sidebar-link.active {
  background: var(--blue-50);
  color: var(--blue-700);
  font-weight: 600;
}

.sidebar-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
}
```

### Grid System

**Container**
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}
```

**Grid Layout**
```css
.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
```

---

## Interactive Elements

### Modals

**Modal Overlay**
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 2rem;
}

.modal {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 32rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 0 1.5rem 1.5rem 1.5rem;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}
```

### Tooltips

**Tooltip**
```css
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gray-900);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 10;
}

.tooltip:hover .tooltip-content {
  opacity: 1;
  visibility: visible;
}

.tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--gray-900);
}
```

### Dropdowns

**Dropdown Menu**
```css
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  min-width: 12rem;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.5rem);
  transition: all 0.2s ease;
}

.dropdown.open .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--gray-700);
  text-decoration: none;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background: var(--gray-50);
  color: var(--gray-900);
}

.dropdown-divider {
  height: 1px;
  background: var(--gray-200);
  margin: 0.5rem 0;
}
```

---

## Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Mobile Adaptations

**Navigation**
```css
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .mobile-menu-button {
    display: block;
  }
  
  .navbar-nav {
    display: none;
  }
}
```

**Tables to Cards**
```css
@media (max-width: 768px) {
  .table,
  .table thead,
  .table tbody,
  .table th,
  .table td,
  .table tr {
    display: block;
  }
  
  .table thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  
  .table tr {
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    padding: 1rem;
  }
  
  .table td {
    border: none;
    position: relative;
    padding-left: 50%;
  }
  
  .table td:before {
    content: attr(data-label) ": ";
    position: absolute;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: 600;
  }
}
```

---

## Animation & Transitions

### Micro-interactions
```css
/* Button Press Animation */
.btn:active {
  transform: scale(0.98);
}

/* Card Hover Animation */
.card {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-2px);
}

/* Loading Spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}

/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

### Page Transitions
```css
.page-enter {
  opacity: 0;
  transform: translateX(1rem);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s ease;
}

.page-exit {
  opacity: 1;
  transform: translateX(0);
}

.page-exit-active {
  opacity: 0;
  transform: translateX(-1rem);
  transition: all 0.3s ease;
}
```

---

This UI specification provides a comprehensive foundation for building a consistent, accessible, and visually appealing interface for the StartupAI platform.
