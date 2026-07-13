@AGENTS.md

# CLAUDE.md

This file defines the engineering standards, architecture, and design rules for **Lablebyrha** — the customer-facing website for a premium women's fashion e-commerce brand. Every Claude Code session working in this repository must follow these rules. When a request conflicts with this document, follow this document and flag the conflict to the user instead of silently deviating.

> Also read [AGENTS.md](AGENTS.md) before writing any Next.js code — the installed Next.js version may include breaking changes relative to training data.

---

## 0. This Is a Living Document

This file must stay accurate as the project evolves.

- **Consult this document before implementing any major feature or architectural change**, and follow its guidelines unless the user explicitly instructs otherwise.
- **Update this file whenever a significant architectural decision, new library, coding standard, folder structure change, or workflow change is made** — e.g. adopting a new dependency, changing the folder structure, introducing a new state-management pattern, changing form/validation conventions, or altering the Git workflow. The update should happen in the same session as the change, not deferred.
- If a decision meaningfully diverges from what's written here (e.g. the user directs a one-off exception), treat that as a signal to either update this document to reflect the new standard, or explicitly note it as a scoped exception — don't let the document silently go stale.
- Keep edits surgical: update the specific section affected rather than rewriting the whole file, and keep section numbering/structure intact unless the change genuinely warrants restructuring.

---

## 1. Project Overview

Lablebyrha is a **premium, luxury women's fashion e-commerce storefront**. The site is the primary sales and brand channel for the label: product discovery, collections, product detail, cart, checkout handoff, and brand/editorial content.

This repository (`lablebyrha-frontend`) is customer-facing only. It is one of three sibling projects:

- `lablebyrha-frontend` — this repo, the public storefront
- `lablebyrha-admin` — internal admin dashboard (separate Next.js app)
- `lablebyrha-backend` — API/backend services

The storefront must feel like a **luxury boutique**, not a generic template store. Every screen should read as intentional, uncluttered, and confident. When in doubt, favor **less** — remove an element before adding one.

**Non-negotiable qualities:**
- Fast, stable, production-grade code — this is a revenue-generating storefront, not a prototype.
- Accessible to all customers, including assistive-technology users.
- SEO-friendly — organic discovery is a primary acquisition channel.
- Mobile-first — the majority of fashion e-commerce traffic is mobile.

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router only — no Pages Router) |
| Language | TypeScript (strict mode, no implicit `any`) |
| Styling | Tailwind CSS v4 (CSS-first config, no `tailwind.config.ts`) |
| Component library | shadcn/ui (style: `base-nova`, base color: `neutral`) |
| Forms | React Hook Form |
| Validation | Zod (source of truth for all form/data shapes) |
| Server state | TanStack Query |
| Icons | lucide-react only |
| Theming | next-themes (`class` strategy, default **light**) |
| Package manager | npm (use the committed `package-lock.json`; do not switch package managers) |

Do not introduce a second library that overlaps an existing one (e.g. no Formik, no Redux, no styled-components, no Material UI, no Axios) without an explicit user decision — see [Section 32](#32-things-claude-should-never-do-in-this-repository).

**shadcn/ui in this project is built on Base UI, not Radix.** `Button`, `Badge`, `Sheet`, etc. take a `render` prop for polymorphic rendering (e.g. rendering `Button` as a `next/link`), not `asChild`. `components/ui/button.tsx` already defaults `nativeButton` to `false` automatically whenever a `render` target is supplied, so call sites don't need to think about it — just use `render={<Link href="..." />}` with the button's visible content as children.

**This `lucide-react` version has no brand/logo icons** (no `Instagram`, `Twitter`, `Facebook`, etc. — verify with `node -e "console.log('IconName' in require('lucide-react'))"` before using any icon you haven't confirmed exists). For social links, use plain text labels (see `components/footer/footer.tsx`) rather than guessing at an icon name.

**Placeholder imagery convention** (until real product/media assets exist): `https://picsum.photos/seed/<slug>/<w>/<h>` for content images, `https://i.pravatar.cc/150?img=<n>` for avatars. Both hostnames are whitelisted in `next.config.ts` `images.remotePatterns` — add new placeholder hosts there the same way, don't disable image optimization to work around it.

---

## 3. Folder Structure

All application source lives under `src/`. Path alias `@/*` resolves to `src/*` (see `tsconfig.json`).

```
src/
  app/                    # App Router routes ONLY — pages, layouts, route handlers
    layout.tsx            # Root layout: fonts, metadata, <Providers>
    page.tsx
    robots.ts
    sitemap.ts
    (marketing)/          # Route groups for logical sections, e.g. (shop), (account)
    globals.css           # Tailwind entry + design tokens (CSS variables)

  components/
    ui/                   # shadcn/ui generated primitives ONLY — do not hand-edit business logic in here
    common/               # Cross-cutting reusable components (not tied to one feature): buttons, badges, containers, typography
    navbar/                # Site header / navigation
    footer/                # Site footer
    home/                  # Homepage-specific sections
    product/                # Product listing/detail/card components

  hooks/                  # Reusable custom hooks (use-*.ts)
  lib/                     # Framework-agnostic utilities (cn(), formatters, helpers) — no side effects, no fetch
  services/                # Data-access layer: API clients, TanStack Query hooks per domain
  types/                   # Shared TypeScript types/interfaces
  constants/               # Static config: site metadata, nav links, enums
  providers/               # App-wide React context providers (theme, query client)
```

Rules:
- A new top-level feature (e.g. `checkout`, `wishlist`, `account`) gets its own folder under `components/` mirroring the pattern of `product/`, `home/`, etc. Do not dump unrelated feature components into `common/`.
- `components/common/` is for components with **zero feature-specific knowledge** (e.g. `PriceTag`, `SectionHeading`, `Container`). If a component imports feature-specific types, it doesn't belong there.
- `components/ui/` is shadcn territory. Extend via composition in `common/` or feature folders, don't fork shadcn primitives' internals.
- Route-only files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`) live in `app/`. Anything reusable or non-routable moves to `components/`, `hooks/`, `lib/`, or `services/`. Use private folders (`_components`, `_lib`) inside `app/` only for content genuinely specific to one route and not reused elsewhere.

---

## 4. Component Architecture

- **Server Components by default.** Only add `"use client"` when a component needs interactivity, browser APIs, hooks like `useState`/`useEffect`, or a client-only library (React Hook Form, TanStack Query hooks, next-themes).
- Push `"use client"` as far down the tree as possible ("leaf" client components). A page/layout should stay a Server Component that renders small interactive client islands, not the other way around.
- One component per file. File name matches the component name (see [Section 14](#14-file-naming-conventions)).
- Components should be small and composable. If a component file exceeds ~150–200 lines or handles more than one concern (data fetching + layout + interaction), split it.
- Presentational vs. container separation:
  - **Presentational** components (in `common/`, `ui/`) receive data via props only — no fetching, no business logic.
  - **Container** components (in feature folders, or `page.tsx`) own data fetching (via `services/` hooks) and pass data down.
- Co-locate a component's tightly-scoped sub-parts in the same folder (e.g. `product/product-card/product-card.tsx` + `product-card-skeleton.tsx`) rather than spreading them across the tree.
- Every exported component must have an explicit `Props` interface — no inline anonymous prop types for anything beyond a single trivial primitive.

---

## 5. Design Principles

The brand aesthetic is **luxury, elegant, minimal, modern, fashion-forward** — think a boutique atelier, not a discount marketplace.

- **Whitespace is a design element.** Generous padding/margins around product imagery and typography. Never cram sections together.
- **Soft pastel pink is the brand palette, not just an accent.** The finalized palette (defined as CSS variables in `src/app/globals.css`, light mode) is:

  | Token | Hex | Usage |
  |---|---|---|
  | `--primary` | `#F8DCE6` | Primary buttons/CTAs, key highlights |
  | `--secondary` | `#FCEFF4` | Secondary surfaces, secondary buttons, muted backgrounds |
  | `--accent` | `#E9A8C6` | Hover states, active states, wishlist/heart icon, focus ring |
  | `--background` | `#FFF9FB` | Page background |
  | `--card` | `#FFFFFF` | Card/surface background |
  | `--foreground` (text) | `#2B2B2B` | Body text, headings |
  | `--muted-foreground` | `#7A7A7A` | Secondary/muted text |
  | `--border` / `--input` | `#F2DDE6` | Borders, dividers, input borders |
  | `--success` | `#62A87C` | In-stock/success badges and states |

  Avoid bright, saturated colors entirely — every color in the system is soft/desaturated. Dark mode (`.dark` in `globals.css`) keeps the same pink identity against a warm near-black base rather than switching to a generic gray dark theme.
- **Typography-led hierarchy.** The whole site uses a single font family, **Montserrat**, wired via `next/font/google` in the root layout as `--font-sans`; `--font-heading` (used by `SectionTitle`, `CardTitle`, `h1`–`h4`) maps to the same variable rather than a separate typeface — don't reintroduce a second display font without a specific reason. Let type size, weight, and spacing establish hierarchy before reaching for color or borders.
- **Imagery is the hero.** Product photography and editorial imagery take visual priority; UI chrome (buttons, labels, borders) should recede.
- **Rounded, soft, tactile UI.** Base radius is intentionally generous (`--radius: 1rem`) — cards, inputs, and badges are gently rounded, and buttons (`components/ui/button.tsx`) are fully pill-shaped (`rounded-full`). Surfaces carry soft shadows (`shadow-sm`, deepening to `shadow-md` on hover) rather than hard borders wherever elevation helps separate content.
- **Calm motion, not decoration.** Animations reinforce elegance (soft fades, gentle scale on hover, ~200–500ms `ease-out` transitions) — see [Section 30](#30-animation-guidelines). No bouncy, playful, or attention-grabbing effects.
- **Consistency over novelty.** Reuse the same spacing scale, radii, and shadow depth everywhere. A luxury site feels calm because it is visually consistent, not because any one screen is flashy.
- **Every screen must work with zero content shift.** Skeletons and reserved dimensions everywhere media loads.

---

## 6. Tailwind CSS Conventions

This project uses **Tailwind CSS v4** (CSS-first). There is no `tailwind.config.ts`; all design tokens live as CSS custom properties in `src/app/globals.css`, exposed through `@theme inline`.

- **Never hardcode raw colors** (`text-[#f4c2c2]`, `bg-pink-300`) in components. Use the semantic tokens defined in `globals.css` (`bg-primary`, `bg-accent`, `text-muted-foreground`, `border-border`, `bg-success`, etc. — see the palette table in [Section 5](#5-design-principles)) so light/dark themes and future rebrands stay centralized.
- If a new semantic need arises (e.g. a new status color), add a CSS variable in both the `:root` and `.dark` blocks of `globals.css` plus its `--color-*` mapping in `@theme inline`, then consume it as a normal utility (`bg-<name>`, `text-<name>`). Do not introduce ad-hoc hex values inline.
- Compose utility classes with `cn()` from `@/lib/utils` whenever a class list is conditional or merges a `className` prop — never string-concatenate Tailwind classes.
- Class order inside JSX: layout → box model → typography → color/visual → state variants → responsive variants. Example:
  ```
  className={cn(
    "flex items-center gap-4",     // layout
    "px-6 py-3",                   // box model
    "text-sm font-medium",         // typography
    "bg-background text-foreground border border-border", // color/visual
    "hover:bg-muted focus-visible:ring-2",                 // state
    "md:px-8",                                             // responsive
    className,
  )}
  ```
- Avoid `@apply` for one-off cases; it's acceptable only for genuinely shared base styles in `globals.css` (e.g. the `@layer base` block).
- Do not use arbitrary values (`w-[137px]`) unless there is a genuine design-mandated pixel value that has no scale equivalent — prefer the spacing/sizing scale.
- Mobile-first: write unprefixed (mobile) styles first, then layer `sm:`, `md:`, `lg:`, `xl:` up. Never design desktop-first and retrofit mobile.

---

## 7. shadcn/ui Usage Rules

- Add new primitives via the CLI: `npx shadcn@latest add <component>`. Do not hand-author a component that shadcn already provides.
- Generated files land in `src/components/ui/` per `components.json`. **Do not add business logic, data fetching, or feature-specific copy inside `ui/` components.** Wrap/compose them instead in `common/` or a feature folder.
- If a shadcn primitive needs project-specific behavior (e.g. a `ProductCard` built from `Card`), create a new component in the relevant feature folder that *composes* the primitive — don't edit the primitive to special-case one use.
- Respect the configured style (`base-nova`) and base color (`neutral`) in `components.json`. Don't mix in components copied from a different shadcn style/theme.
- Icons inside shadcn components come from `lucide-react` (already configured as the icon library) — never mix in another icon set.
- When shadcn regenerates/updates a primitive, re-apply any intentional customization by re-composing rather than diffing internals by hand where possible.
- `Select` needs an `items={...}` prop (`Record<value, label>` or the same array passed to `.map()` for `SelectItem`s) whenever the trigger must show the correct label before the popup has ever opened — without it, `SelectValue` displays the raw value on first render (e.g. `newest` instead of `Newest`) since it can't resolve a label from unmounted popup content. See `components/shop/shop-toolbar.tsx` for the pattern.
- `Button`, `SheetTrigger`, etc. take a `render` prop for polymorphism (Base UI), not `asChild`. When keying a `render`-swapped element that also has its own visible children (icon/text), put those children on the *outer* component (the one with `render`), not inside the `render` element itself — see `components/navbar/navbar.tsx`.

---

## 8. TypeScript Best Practices

- `strict` mode is on — keep it on. Never add `// @ts-ignore` or `any` to silence an error; fix the type.
- Prefer `interface` for object shapes/props, `type` for unions, intersections, and utility compositions.
- No `any`. Use `unknown` at boundaries (API responses, `catch` blocks) and narrow with Zod or type guards.
- Derive types from Zod schemas with `z.infer<typeof schema>` rather than hand-duplicating a matching `interface` — one source of truth per data shape.
- Use discriminated unions for state that has mutually exclusive shapes (e.g. `{ status: "idle" } | { status: "error"; error: string } | { status: "success"; data: T }`), not multiple optional/nullable fields on one type.
- Export shared types from `src/types/`; keep component-local prop types colocated with the component.
- Avoid non-null assertions (`!`). If a value can theoretically be `undefined`, handle it.
- Function return types are inferred by default; add an explicit return type only for exported functions where inference is ambiguous or the public API contract matters.

---

## 9. React Best Practices

- Function components only. No class components.
- Keep components pure — no side effects during render. Side effects belong in `useEffect`, event handlers, or Server Components' async data fetching.
- Don't overuse `useEffect`. If you're syncing state that can be derived, derive it during render instead.
- Prefer composition (children, render props via components) over prop-drilling deeply nested configuration.
- Memoize (`useMemo`/`useCallback`/`memo`) only when there's a measured or clearly predictable performance need (e.g. expensive derived lists, stable callbacks passed to memoized children) — don't reflexively wrap everything.
- Keys in lists must be a stable, unique id from data — never array index for lists that can reorder, filter, or be paginated.
- Custom hooks belong in `src/hooks/`, named `use-*.ts`, and must follow the Rules of Hooks (no conditional calls).

---

## 10. Next.js App Router Conventions

- App Router only. Never introduce a `pages/` directory.
- Root layout (`src/app/layout.tsx`) owns global fonts, `<html>`/`<body>`, metadata, and mounts `<Providers>`. It also renders the persistent site chrome — `<Navbar links={mainNav} />` and `<Footer linkColumns={footerLinkColumns} socialLinks={socialLinks} />` — around `{children}`, since these are shared across every route, not page-specific content. Route-specific layouts nest under it.
- Content specific to a single route (e.g. mock/placeholder data backing the Home page sections) lives in a private, non-routable folder colocated with that route (e.g. `src/app/_data/home-content.ts`), not in `constants/` — reserve `constants/` for genuinely global config (nav, footer links, site metadata).
- Use route groups (`(group)`) to organize sections (e.g. `(shop)`, `(account)`) without affecting the URL, and to scope distinct layouts.
- Use `loading.tsx` for route-level Suspense boundaries and `error.tsx` for route-level error boundaries on every route that fetches data — a blank white screen during load or on failure is not acceptable.
- Prefer Server Components fetching data directly (via `services/`) for initial page data; use TanStack Query on the client for interactive/re-fetchable/mutation-driven data (filters, cart, wishlist, infinite scroll).
- Use the Metadata API (`export const metadata` / `generateMetadata`) per route — never manipulate `<head>` manually.
- Use file-based conventions for SEO assets: `robots.ts`, `sitemap.ts`, `opengraph-image`, favicons — extend the existing ones in `src/app/`, don't build a manual alternative.
- Dynamic route params are async (`params: Promise<{...}>`) — always `await` them. Confirm current API shape against `node_modules/next/dist/docs` for the installed version before assuming behavior from training data.
- Server Actions (if used for mutations) belong close to the feature that owns them and must validate input with Zod before touching any backend call.

---

## 11. API Calling Conventions

- All HTTP calls go through `src/services/api-client.ts` (`apiClient.get/post/put/delete`). Never call `fetch` directly from a component.
- Group domain-specific calls into their own service modules under `src/services/` (e.g. `services/products.ts`, `services/cart.ts`), each exposing typed functions that call `apiClient` and return data validated/shaped by a Zod schema.
- **Until a real backend exists**, a service module may export a mock dataset plus a pure, synchronous query function shaped like the future endpoint (see `services/products.ts`'s `mockProducts` + `queryProducts(query): { items, total, totalPages, page }`) — same input/output contract a real paginated/filtered API would have, so swapping in a real `apiClient` call later only touches that one file. Don't reach for TanStack Query around a synchronous in-memory mock; that's only needed once there's an actual network round trip.
- Client-side data fetching and mutations go through **TanStack Query**: colocate `useQuery`/`useMutation` hooks in the relevant service module (e.g. `services/products.ts` exports `useProducts()`), not ad hoc inside components.
- Query keys must be structured and centralized (e.g. a `queryKeys.products.list(filters)` factory) — no magic string keys scattered across the codebase.
- Server Components fetching initial data may call service functions directly (no TanStack Query needed server-side); hydrate into TanStack Query only when the client needs to re-fetch/mutate that same data.
- Never expose backend secrets or unrestricted internal endpoints to the client — only call through the public API surface via `NEXT_PUBLIC_API_URL`.
- Handle non-2xx responses via `ApiClientError` (already defined in `api-client.ts`) — don't swallow errors or return `null` silently.
- **All prices are in Indian Rupees.** Format every price through `formatPrice()` (`src/lib/format.ts`), which defaults to `currency: "INR"` and locale `"en-IN"` (correct ₹ symbol and lakh/crore-style digit grouping, e.g. `₹12,999`). Component-level defaults (e.g. `ProductCard`'s `currency` prop) must match this default — never hardcode `"USD"`/`"$"` or a different locale for a new price display.

---

## 12. Environment Variable Conventions

- Every env var consumed in browser-executed code **must** be prefixed `NEXT_PUBLIC_` (Next.js requirement) — anything without that prefix is server-only and must never be referenced in a Client Component.
- All env vars must be declared in `.env.example` with a safe placeholder/default — this is the source of truth for what variables the app needs. Update it whenever a new var is introduced.
- Never commit `.env`, `.env.local`, or any file containing real secrets/keys. These are already gitignored — do not remove them from `.gitignore`.
- Access env vars only through a single point per concern (e.g. `siteConfig.url` in `constants/site.ts` reads `NEXT_PUBLIC_SITE_URL`, `api-client.ts` reads `NEXT_PUBLIC_API_URL`) rather than calling `process.env.X` scattered across many files.
- Never ask the user to paste real secret values into chat; if a new secret is needed, tell the user which `.env.local` key to set and let them fill it in themselves.

---

## 13. File Naming Conventions

- **Files and folders:** `kebab-case` — `product-card.tsx`, `use-cart.ts`, `site-config.ts`.
- **Components:** file is kebab-case, exported component name is `PascalCase` and matches the file's purpose (`product-card.tsx` exports `ProductCard`).
- **Hooks:** `use-<name>.ts`, exporting `use<Name>`.
- **Types/interfaces:** `PascalCase` (`ProductSummary`, `ApiError`).
- **Constants:** `SCREAMING_SNAKE_CASE` for primitive constant values, `camelCase` for config objects (`siteConfig`, `navLinks`).
- **Route segment folders:** lowercase, hyphenated if multi-word (`app/product-care`), route groups in parentheses (`(shop)`), private/non-routable folders prefixed with underscore (`_components`).
- Barrel files (`index.ts`) are allowed for a folder's public surface (e.g. `providers/index.tsx`, `types/index.ts`) but should not become dumping grounds — re-export deliberately, not `export *` from everything blindly if it causes ambiguity.

---

## 14. Import Order

Group and order imports as follows, with a blank line between groups (enforced by ESLint/import ordering — don't fight the linter):

1. External packages (`react`, `next/*`, third-party libraries)
2. Internal absolute imports via `@/*` (`@/components/...`, `@/lib/...`, `@/services/...`)
3. Relative imports (`./`, `../`)
4. Type-only imports last within their group, or inlined with `import type { X }` where it's a type-only import
5. Styles (e.g. `./globals.css`) last, only in the file that owns them (root layout)

```ts
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { apiClient } from "@/services/api-client";
import type { Product } from "@/types";

import { ProductCardSkeleton } from "./product-card-skeleton";
```

---

## 15. State Management Guidelines

- **Server/remote data:** TanStack Query. Never mirror server data into `useState`/global state "just in case" — let Query own caching, refetching, and invalidation.
- **Local UI state** (open/closed, active tab, hover): `useState`/`useReducer` in the component that owns it.
- **Cross-cutting client state** (theme, cart drawer open state, etc.): a dedicated provider in `src/providers/`, following the pattern of `theme-provider.tsx` — small, focused context providers, not one giant "app state" context.
- **URL as state:** for shareable/bookmarkable UI (filters, sort, pagination, selected variant), prefer Next.js search params over client state so state survives refresh and is shareable. The established pattern (see `/shop`): the route's `page.tsx` is a Server Component that awaits the `searchParams` prop, parses it, and does the actual data query server-side (so SSR/first paint already reflects the URL) — no client fetch is needed even for mock/in-memory data, since the whole route segment is dynamic once it reads `searchParams`. A small `use-*-filters` hook (e.g. `src/hooks/use-shop-filters.ts`) wraps `useSearchParams`/`usePathname`/`useRouter` for the interactive Client Components (filters, sort, search, pagination) to read current values and push URL updates (`router.push(..., { scroll: false })`); any filter/sort change resets `page`, and `setPage` is the one setter that must not. Don't sync a prop into local state via `useEffect` (this repo's stricter React Compiler lint rules reject both `setState`-in-effect and reading/writing refs during render) — either remount via a scoped `key` when it's safe to lose the child's internal state (e.g. a price slider's drag position), or track the "last external value" in state (not a ref) and compare during render when the component must not remount (e.g. a text input the user may be actively typing in).
- Do not introduce a global state library (Redux, Zustand, Jotai, Recoil) unless a concrete cross-cutting client-state need emerges that context/URL state can't reasonably handle — raise it with the user first.

---

## 16. Form Handling

- All forms use **React Hook Form** with `zodResolver` from `@hookform/resolvers/zod`.
- Every form has a corresponding Zod schema (in the component's folder or `src/types/` if shared) that is the single source of truth for both validation and the inferred TypeScript type.
- Use controlled inputs via RHF's `register`/`Controller` — don't hand-roll `useState` per field.
- Submit handlers are `async`, show a pending/disabled state on the submit control, and surface both field-level errors (`formState.errors`) and top-level submission errors distinctly.
- Never submit a form without client-side validation passing first, and never trust client validation alone — the backend must re-validate (that's a backend concern, but don't design the frontend as if client validation were sufficient security).
- Reset or redirect appropriately on success; never leave a submitted form in an ambiguous state.

---

## 17. Validation Standards

- **Zod is the single source of truth** for all shape validation: forms, API responses consumed by the client, environment variable shapes if validated at runtime, and search-param parsing.
- Define schemas close to what they validate (form schemas near the form; API response schemas in the relevant `services/` module) and export inferred types via `z.infer`.
- Validate external data (API responses, URL params, `localStorage`) at the boundary — don't trust `unknown` data past the point where it enters the app.
- Reuse/compose schemas (`.extend()`, `.pick()`, `.merge()`) instead of duplicating overlapping shapes (e.g. a `createProductSchema` extending a shared base rather than being rewritten).
- Error messages surfaced to users must be human-readable and on-brand (calm, clear tone) — not raw Zod issue codes.

---

## 18. Error Handling

- Every route that fetches data gets an `error.tsx` boundary — no unhandled route crashes reaching a blank screen.
- TanStack Query errors are handled explicitly at the call site (or a shared error UI component) — never ignore the `isError`/`error` state.
- Use the `ApiClientError` type from `services/api-client.ts` to distinguish expected HTTP failures (404 product not found, 401 unauthorized) from unexpected exceptions, and render appropriate, specific UI for each (not a generic "Something went wrong" for everything).
- Never swallow errors silently (`catch {}` with no handling). At minimum log meaningfully; for user-facing flows, show a clear recovery path (retry button, link back to shop).
- Never expose raw stack traces, internal error messages, or backend response bodies directly to end users.
- Form and mutation errors are shown inline, next to the relevant control/action — not only as a generic toast with no context.

---

## 19. Loading and Skeleton States

- Any content that fetches asynchronously must have a corresponding skeleton or loading state — no layout shift when data arrives.
- Use route-level `loading.tsx` for full-page/segment loads, and local skeleton components (named `*-skeleton.tsx`, colocated with the component they mirror, e.g. `product-card-skeleton.tsx`) for in-page async sections.
- Skeletons should match the real component's dimensions and layout closely enough that no reflow occurs when real content swaps in.
- For TanStack Query, use `isPending`/`isFetching` deliberately: `isPending` for "no data yet" (show skeleton), `isFetching` for "refreshing existing data" (show a subtle indicator, keep existing content visible — don't blank the screen on refetch).
- Avoid spinners as the default loading pattern for content-shaped UI (product grids, cards) — skeletons that mirror the final layout are the standard for this brand's polish level. Spinners are acceptable for short, non-layout actions (button submit state).

---

## 20. Accessibility Requirements

- All interactive elements must be reachable and operable via keyboard (tab order, `Enter`/`Space` activation, visible focus states using the `ring`/`focus-visible` tokens already in the design system).
- Use semantic HTML first (`button`, `nav`, `header`, `footer`, `main`, `section`, heading levels in order) before reaching for ARIA — ARIA supplements semantics, it doesn't replace them.
- Every image (`next/image`) has meaningful `alt` text; purely decorative images use `alt=""`.
- Form fields have associated `<label>`s (via shadcn's `Label`/RHF integration) — never rely on placeholder text as the only label.
- Color is never the sole means of conveying information (e.g. sale/out-of-stock indicated by text/icon, not just a red dot).
- Maintain WCAG AA contrast ratios for text against background, including the pastel pink accent — verify pink-on-white/white-on-pink combinations meet contrast before shipping, and use a darker pink shade for text if the pastel itself fails contrast.
- Respect `prefers-reduced-motion` for any non-essential animation.
- Modals/drawers (cart, filters, mobile nav) must trap focus, be dismissible via `Escape`, and restore focus to the trigger on close — use shadcn's `Dialog`/`Sheet` primitives, which handle this, rather than hand-rolling.

---

## 21. Responsive Design Requirements

- **Mobile-first** always: build and verify the smallest breakpoint first, then progressively enhance for `sm`/`md`/`lg`/`xl`.
- Design/verify at minimum: mobile (~375px), tablet (~768px), desktop (~1280px+).
- Navigation collapses to a mobile pattern (sheet/drawer menu) below `md`; no desktop nav squeezed into mobile.
- Product grids reflow responsively (e.g. 1 column mobile → 2 tablet → 3–4 desktop) — never fixed pixel-width grids.
- Touch targets on mobile must be at least 44×44px.
- Test both light and dark themes at each breakpoint when a UI change is made.

---

## 22. SEO Guidelines

- Every route defines relevant metadata via the Metadata API — title (using the site's title template), description, canonical URL, Open Graph and Twitter card data. Extend `siteConfig` in `constants/site.ts` rather than hardcoding brand strings per page.
- Product and collection pages need accurate, keyword-relevant, human-quality titles/descriptions — never leave default/boilerplate metadata on a real page.
- Use `generateMetadata` for dynamic routes (product/collection detail) so metadata reflects the actual entity, including a real product image for Open Graph.
- Keep `sitemap.ts` accurate and current as real routes are added — dynamic routes (products, collections) should be included via data-driven entries, not just the static homepage.
- Use semantic heading structure (`h1` once per page) and descriptive link text — never "click here."
- Prefer Server Components/SSR for anything that must be crawlable; don't hide primary content behind client-only fetches with no SSR fallback.
- Structured data (JSON-LD for `Product`, `BreadcrumbList`, `Organization`) should be added for key commerce pages once they exist — plan for it in page architecture.

---

## 23. Performance Optimization

- Default to Server Components; only ship JS to the client for genuinely interactive pieces.
- Use `next/dynamic` for heavy, below-the-fold, or rarely-used client components (e.g. a size-guide modal, a large filter panel) to keep initial bundles lean.
- Avoid unnecessary re-renders: don't lift state higher than needed, don't pass new object/array literals as props on every render to memoized children.
- Paginate or virtualize long lists (large product grids, order history) rather than rendering everything at once.
- Keep TanStack Query cache tuned (`staleTime`, `gcTime`) per data type — static-ish data (site config, categories) can have long stale times; volatile data (cart, stock) should refetch more aggressively.
- Audit bundle impact before adding a new dependency — prefer a small, tree-shakeable option, and never add a whole library for one utility function you could write in `lib/`.

---

## 24. Image Optimization

- All images go through `next/image` — never a raw `<img>` tag for content images.
- Always provide accurate `width`/`height` (or use `fill` with a sized, `relative`-positioned parent) to prevent layout shift.
- Use `priority` only for the actual largest above-the-fold hero/LCP image on a page — not indiscriminately.
- Provide `sizes` for responsive images that render at different widths across breakpoints so the browser doesn't over-fetch.
- Product photography should use a consistent aspect ratio per context (e.g. product grid cards) for visual rhythm — don't let inconsistent image ratios break grid alignment.
- Serve modern formats (AVIF/WebP) via Next's built-in image optimization (default behavior) — don't bypass it with unoptimized `<img>` for "simplicity."
- Decorative/background imagery still needs deliberate sizing and lazy-loading (default `loading="lazy"` for non-priority images).

---

## 25. Code Quality Rules

- No dead code, no commented-out blocks left in the codebase, no `console.log` left in committed code.
- No unused imports/variables — ESLint must pass clean (`npm run lint`) before considering work done.
- `tsc --noEmit` must pass with zero errors before considering work done.
- Don't add speculative abstractions, config flags, or "just in case" flexibility for requirements that don't exist yet (YAGNI). Three similar lines beat a premature abstraction.
- Don't add comments that restate what the code does; add a comment only when the *why* isn't obvious from the code itself (a workaround, a non-obvious constraint).
- Keep functions and components focused on one responsibility; extract when a function is doing two distinct things.
- Run `npm run build` for any change with meaningful runtime surface before calling it done — passing types/lint isn't the same as a working build.

---

## 26. Git Commit Conventions

- Use **Conventional Commits**: `type(scope): summary`, imperative mood, no trailing period.
  - Types: `feat`, `fix`, `refactor`, `style`, `perf`, `test`, `docs`, `chore`, `build`.
  - Scope is optional but encouraged for clarity (e.g. `feat(product): add size selector`).
- Keep commits focused — one logical change per commit. Don't bundle an unrelated refactor with a feature commit.
- Write the "why" in the body when it isn't obvious from the diff/summary line.
- Never commit `.env*` files, credentials, or generated build output (`.next/`, `node_modules/`).
- Only commit when explicitly asked to; don't commit proactively as a side effect of other work.
- Never force-push, rewrite shared history, or skip hooks (`--no-verify`) without explicit user instruction.

---

## 27. Reusable Component Philosophy

The base design-system component library is established and lives in `components/ui/` (shadcn primitives: `Button`, `Input`, `Card`, `Badge`, `Skeleton`) and `components/common/` (`Container`, `SectionTitle`). `components/product/` has the first feature-level pattern (`ProductCard` + colocated `ProductCardSkeleton` + a small client-only `WishlistButton` island). New feature UI should compose these rather than reinvent them — e.g. a new listing section uses `Container` + `SectionTitle` + `ProductCard`, not bespoke layout/heading markup.

- Build the specific version first; extract a reusable abstraction only once a second real use case appears (rule of three is a reasonable ceiling before abstracting further).
- A "reusable" component takes its variability through **props**, not through consumers reaching in and overriding internals.
- Prefer composition (`children`, slot-like props) over an ever-growing list of boolean/variant props trying to cover every case.
- Shared visual primitives (buttons, badges, price display, section headings) belong in `components/common/`; keep them free of any single feature's business logic.
- If a shadcn primitive already solves the need, compose it rather than rebuilding it from scratch.
- Document non-obvious prop contracts via the TypeScript `Props` interface itself (types are the documentation) rather than prose comments.

---

## 28. Animation Guidelines

Animation should read as **restrained and premium**, never playful or attention-seeking.

- Prefer subtle transitions: opacity fades, gentle `translate-y`/scale on hover or entrance, soft easing (`ease-out`, ~150–300ms for micro-interactions, up to ~500ms for larger reveals).
- Hover states on product imagery/cards: soft scale (e.g. `scale-[1.02]`) or a cross-fade, not aggressive zoom or bounce.
- Page/section transitions should be minimal — a fade or slight slide, not sliding panels with heavy motion.
- Respect `prefers-reduced-motion: reduce` — disable/shorten non-essential animation for users who request it.
- Avoid animation libraries unless a genuine need outgrows Tailwind's transition utilities/CSS transitions (e.g. complex orchestrated sequences); don't add a heavy animation dependency for a simple hover fade.
- Loading and skeleton animations (shimmer/pulse) should be slow and subtle, never distracting.

---

## 29. Testing Recommendations

There is no test suite scaffolded yet. When tests are introduced:

- **Unit/component tests:** Vitest + React Testing Library — test behavior and accessible output (roles, text), not implementation details or class names.
- **Validation logic:** unit test Zod schemas directly (valid/invalid cases) since they're pure and high-value to cover.
- **E2E:** Playwright for critical commerce flows (browse → product detail → add to cart → checkout handoff) once those flows exist.
- Prioritize coverage on business-critical paths (cart, checkout, forms, price/stock logic) over trivial presentational components.
- New utility functions in `lib/` and `services/` should include tests when introduced, given they're pure and cheap to cover.
- Don't hand-wave "should add tests later" as a substitute for actually adding them when a testing framework is in place and the task is non-trivial.

---

## 30. Things Claude Should Never Do In This Repository

- Never introduce the Pages Router (`pages/`) — App Router only.
- Never hand-write a component that shadcn/ui already provides — use the CLI.
- Never hardcode raw color hex/RGB values in components — use design tokens/CSS variables.
- Never call `fetch` directly from a component — always go through `services/api-client.ts` and a domain service module.
- Never introduce a second forms library, validation library, server-state library, or global-state library alongside the ones already chosen, without explicit user approval.
- Never use `any`, `@ts-ignore`, or non-null assertions to bypass a type error.
- Never use a raw `<img>` tag for content imagery — always `next/image`.
- Never build pages/UI beyond what was explicitly requested in a given task — architecture and UI work are separate asks unless the user combines them.
- Never commit secrets, `.env` files, or paste real credential values into code or chat.
- Never commit or push code unless explicitly asked to in that session.
- Never remove or weaken accessibility semantics (removing labels, focus outlines, semantic tags) for the sake of visual tweaks.
- Never let the pastel pink accent become the dominant color of a screen — it is an accent on a neutral, minimal base.
- Never add animation that is playful, bouncy, or attention-grabbing — this is a luxury brand, not a consumer app.
- Never ship a data-fetching UI without a loading (skeleton) state and an error state.
- Never bypass `npm run lint` / `tsc --noEmit` / `npm run build` failures by disabling the check — fix the underlying issue.
- Never add dependencies, refactors, or abstractions beyond what the current task requires.
