# Next.js 15 Client/Server Component Patterns

## The Problem

You **cannot** mix server and client patterns in the same file.

```tsx
// page.tsx - THIS WILL FAIL
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'My Page' };  // Server pattern

'use client';  // ERROR: must be first line

import { useForm } from 'react-hook-form';  // Client pattern
```

**Why it fails:**
1. `export const metadata` only works in Server Components
2. `'use client'` must be the first line (before imports)
3. `useForm` and other hooks only work in Client Components

---

## Option 1: Separate Files (Recommended for SEO)

Use when you need both metadata AND client-side interactivity.

```tsx
// src/app/my-page/page.tsx (Server Component)
import { Metadata } from 'next';
import MyPageClient from './MyPageClient';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description for SEO',
  openGraph: { title: 'My Page', description: 'OG description' },
};

export default function MyPage() {
  return <MyPageClient />;
}
```

```tsx
// src/app/my-page/MyPageClient.tsx (Client Component)
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export default function MyPageClient() {
  const form = useForm({ resolver: zodResolver(schema) });
  return <div>{/* Your JSX */}</div>;
}
```

---

## Option 2: Client-Only (No Metadata)

Use for internal pages, dashboards, tools where SEO doesn't matter.

```tsx
// src/app/my-page/page.tsx (Client Component)
'use client';

import { useForm } from 'react-hook-form';

export default function MyPage() {
  const form = useForm();
  return <div>{/* Your JSX */}</div>;
}
```

---

## Option 3: Server-Only (No Hooks)

Use for pure content pages: blog posts, documentation, landing pages.

```tsx
// src/app/my-page/page.tsx (Server Component)
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
};

export default function MyPage() {
  // No useState, useEffect, useForm, etc.
  return <div>{/* Pure HTML/JSX */}</div>;
}
```

---

## Decision Table

| Pattern | SEO | Interactivity | Use When |
|---------|-----|---------------|----------|
| **Separate Files** | Yes | Yes | Public pages with forms/hooks |
| **Client-Only** | No | Yes | Internal dashboards, tools |
| **Server-Only** | Yes | No | Blog posts, static content |

**For StartupAI marketing site:** Use **Option 1** for all public-facing pages.

---

## Quick Checklist

Before creating any page in `src/app/`:

- [ ] Does this page need SEO metadata?
- [ ] Does this page need client hooks?
- [ ] If YES to both → Separate files
- [ ] If only metadata → Server component
- [ ] If only hooks → Client component (consider SEO impact)

---

## Files That Need Client Hooks

- Forms (React Hook Form)
- Interactive components (onClick with state)
- API calls (useEffect, fetch)
- Browser APIs (localStorage, window, document)

## Files That Need Metadata

- All public marketing pages
- Landing pages
- Product pages
- Blog posts
- Any page shared on social media
