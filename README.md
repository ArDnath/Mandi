# Mandi - Application Directory Structure
```
mandi/
├─ ORM/
│  ├─ ormSchema
│  └─ migrations/                 # auto-managed by Prisma
│
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx               # root layout
│  │  ├─ page.tsx                 # homepage (shop landing)
│  │  ├─ (marketing)/             # public/marketing pages
│  │  │  ├─ features/
│  │  │  │  └─ page.tsx
│  │  │  ├─ contacts/
│  │  │  │  └─ page.tsx
│  │  │  └─ blogs/
│  │  │     └─ page.tsx
│  │  │
│  │  ├─ (auth)/                  # auth route group
│  │  │  ├─ layout.tsx
│  │  │  ├─ signin/
│  │  │  │  └─ page.tsx
│  │  │  └─ signup/
│  │  │     └─ page.tsx
│  │  │
│  │  ├─ (shop)/                  # main ecommerce flows
│  │  │  ├─ products/
│  │  │  │  ├─ page.tsx           # /products listing
│  │  │  │  └─ [id]/
│  │  │  │     └─ page.tsx        # product detail
│  │  │  ├─ cart/
│  │  │  │  └─ page.tsx
│  │  │  ├─ checkout/
│  │  │  │  └─ page.tsx
│  │  │  └─ account/
│  │  │     ├─ layout.tsx
│  │  │     └─ orders/
│  │  │        └─ page.tsx
│  │  │
│  │  └─ api/                     # fullstack: backend in Next.js
│  │     ├─ auth/
│  │     │  └─ [...nextauth]/
│  │     │     └─ route.ts        # or /route.ts if using Auth.js pattern
│  │     ├─ products/
│  │     │  ├─ route.ts           # GET / POST products
│  │     │  └─ [id]/
│  │     │     └─ route.ts
│  │     ├─ cart/
│  │     │  └─ route.ts
│  │     └─ orders/
│  │        └─ route.ts
│  │
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Navbar.tsx
│  │  │  ├─ Footer.tsx
│  │  │  └─ Container.tsx
│  │  ├─ ui/                      # generic UI atoms/molecules
│  │  │  ├─ Button.tsx
│  │  │  ├─ Input.tsx
│  │  │  ├─ Select.tsx
│  │  │  └─ Skeleton.tsx
│  │  ├─ products/
│  │  │  ├─ ProductCard.tsx
│  │  │  ├─ ProductGrid.tsx
│  │  │  ├─ ProductPrice.tsx
│  │  │  └─ PaginationBar.tsx
│  │  ├─ cart/
│  │  │  ├─ CartSummary.tsx
│  │  │  └─ CartLineItem.tsx
│  │  ├─ auth/
│  │  │  ├─ SignInForm.tsx
│  │  │  └─ SignUpForm.tsx
│  │  └─ home/
│  │     ├─ HeroSection.tsx
│  │     └─ FilterBar.tsx
│  │
│  ├─ features/                   # feature-specific logic (optional but very clean)
│  │  ├─ cart/
│  │  │  ├─ cart.store.ts         # zustand store for cart
│  │  │  ├─ cart.selectors.ts     # derived selectors, totals, etc
│  │  │  └─ cart.types.ts
│  │  ├─ auth/
│  │  │  ├─ auth.store.ts         # client-side auth state (if needed)
│  │  │  └─ auth.types.ts
│  │  ├─ products/
│  │  │  ├─ products.api.ts       # client-side API functions (fetchers)
│  │  │  ├─ products.queries.ts   # TanStack Query hooks
│  │  │  ├─ products.types.ts
│  │  │  └─ products.helpers.ts
│  │  └─ filters/
│  │     ├─ filters.store.ts      # zustand for filters/sorting
│  │     └─ filters.types.ts
│  │
│  ├─ hooks/
│  │  ├─ usePagination.ts
│  │  ├─ useIsClient.ts
│  │  └─ useMediaQuery.ts
│  │
│  ├─ lib/
│  │  ├─ db.ts                    # Prisma client
│  │  ├─ auth.ts                  # Auth.js / NextAuth config
│  │  ├─ api-client.ts            # generic fetch wrapper if needed
│  │  ├─ validation/
│  │  │  ├─ auth.schema.ts        # Zod schemas
│  │  │  └─ orders.schema.ts
│  │  ├─ utils/
│  │  │  ├─ currency.ts
│  │  │  ├─ strings.ts
│  │  │  └─ pagination.ts
│  │  └─ config/
│  │     └─ env.ts                # env handling, runtime checks
│  │
│  ├─ store/                      # or keep everything in /features/* if you prefer
│  │  ├─ useThemeStore.ts         # if you ever move theme to zustand
│  │  └─ useUIStore.ts            # modals, drawers, toasts
│  │
│  ├─ styles/
│  │  ├─ globals.css
│  │  └─ tailwind.css
│  │
│  └─ types/
│     └─ index.ts                 # shared general-purpose types
│
├─ tests/
│  ├─ unit/
│  │  └─ cart.store.test.ts
│  └─ e2e/
│     └─ cart-flow.spec.ts
│
├─ .env.example
├─ package.json
├─ next.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json
```

## Key Features

### Route Groups
- **(marketing)** - Public pages like features, contacts, blogs
- **(auth)** - Authentication flows (signin/signup)
- **(shop)** - Main e-commerce features (products, cart, checkout, account)

### Architecture Patterns
- **Feature-based organization** - `/features` directory for domain logic
- **Component categorization** - Organized by feature/domain (products, cart, auth, etc.)
- **API Routes** - Fullstack Next.js with backend routes in `/api`
- **State Management** - Zustand stores in `/features` and `/store`
- **Type Safety** - Shared types in `/types` and feature-specific types

### Tech Stack
- **Next.js** (App Router)
- **Prisma** (Database ORM)
- **TypeScript** (Type safety)
- **Tailwind CSS** (Styling)
- **Zustand** (State management)
- **Zod** (Schema validation)
