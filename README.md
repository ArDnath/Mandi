# Mandi - Application Directory Structure
```
mandi/
│
├─ app/                                    # Next.js App Router
│  ├─ layout.tsx                           # Root layout: <html>, providers, Navbar, Footer
│  ├─ page.tsx                             # Landing page (hero + featured products)
│  │
│  ├─ (marketing)/                         # Public/marketing pages
│  │  ├─ layout.tsx                        # Marketing-specific layout
│  │  ├─ features/
│  │  │  └─ page.tsx                       # /features
│  │  ├─ blogs/
│  │  │  └─ page.tsx                       # /blogs
│  │  └─ contacts/
│  │     └─ page.tsx                       # /contacts
│  │
│  ├─ (auth)/                              # Authentication flows
│  │  ├─ layout.tsx                        # Simpler auth layout
│  │  ├─ signin/
│  │  │  └─ page.tsx                       # /signin
│  │  └─ signup/
│  │     └─ page.tsx                       # /signup
│  │
│  ├─ (shop)/                              # Main e-commerce flows
│  │  ├─ layout.tsx                        # Shop layout: breadcrumbs, cart icon
│  │  ├─ products/
│  │  │  ├─ page.tsx                       # /products (listing, filters, sort, pagination)
│  │  │  └─ [id]/
│  │  │     └─ page.tsx                    # /products/[id] (detail, reviews, wishlist)
│  │  ├─ cart/
│  │  │  └─ page.tsx                       # /cart (line items, totals, update quantities)
│  │  ├─ checkout/
│  │  │  └─ page.tsx                       # /checkout (address, payment)
│  │  └─ account/
│  │     ├─ layout.tsx                     # Account sidebar (profile, orders, wishlist)
│  │     ├─ page.tsx                       # /account (profile/settings)
│  │     ├─ orders/
│  │     │  └─ page.tsx                    # /account/orders
│  │     └─ wishlist/
│  │        └─ page.tsx                    # /account/wishlist
│  │
│  ├─ (admin)/                             # Admin dashboard
│  │  ├─ layout.tsx                        # Admin layout (sidebar with links)
│  │  ├─ page.tsx                          # /admin (dashboard, stats, charts)
│  │  ├─ products/
│  │  │  └─ page.tsx                       # /admin/products (CRUD UI)
│  │  ├─ orders/
│  │  │  └─ page.tsx                       # /admin/orders (manage order status)
│  │  └─ users/
│  │     └─ page.tsx                       # /admin/users
│  │
│  └─ api/                                 # Backend API routes
│     ├─ auth/
│     │  └─ [...nextauth]/
│     │     └─ route.ts                    # Auth.js/NextAuth handler
│     ├─ products/
│     │  ├─ route.ts                       # GET: list, POST: create
│     │  └─ [id]/
│     │     └─ route.ts                    # GET, PATCH, DELETE product
│     ├─ cart/
│     │  └─ route.ts                       # POST: add, PATCH: update, DELETE: clear
│     ├─ orders/
│     │  └─ route.ts                       # POST: new order, GET: user orders
│     ├─ reviews/
│     │  ├─ route.ts                       # POST: add review
│     │  └─ [productId]/
│     │     └─ route.ts                    # GET: reviews for product
│     ├─ wishlist/
│     │  └─ route.ts                       # GET/POST: user wishlist
│     ├─ search/
│     │  └─ route.ts                       # GET: search with filters
│     └─ notifications/
│        └─ route.ts                       # POST: send order email
│
├─ components/                             # Reusable UI components
│  ├─ layout/
│  │  ├─ Navbar.tsx
│  │  ├─ Footer.tsx
│  │  └─ AppShell.tsx                      # Main container, toasts
│  │
│  ├─ ui/                                  # Generic atoms/molecules
│  │  ├─ Button.tsx
│  │  ├─ Input.tsx
│  │  ├─ Select.tsx
│  │  ├─ Modal.tsx
│  │  └─ Skeleton.tsx
│  │
│  ├─ home/
│  │  ├─ HeroSection.tsx
│  │  └─ CategoryGrid.tsx
│  │
│  ├─ products/
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductGrid.tsx
│  │  ├─ ProductPrice.tsx
│  │  └─ ProductFiltersBar.tsx
│  │
│  ├─ cart/
│  │  ├─ CartLineItem.tsx
│  │  └─ CartSummary.tsx
│  │
│  ├─ account/
│  │  ├─ OrdersTable.tsx
│  │  └─ WishlistGrid.tsx
│  │
│  └─ admin/
│     ├─ AdminSidebar.tsx
│     ├─ AdminTable.tsx
│     └─ AdminStatCard.tsx
│
├─ features/                               # Domain logic (feature-first architecture)
│  ├─ products/
│  │  ├─ products.service.ts               # Business logic (sorting, mapping)
│  │  ├─ products.repository.ts            # DB access via Prisma
│  │  ├─ products.types.ts
│  │  └─ products.validators.ts            # Zod schemas
│  │
│  ├─ cart/
│  │  ├─ cart.store.ts                     # Zustand store (client-side)
│  │  ├─ cart.selectors.ts                 # Derived totals, counts
│  │  └─ cart.types.ts
│  │
│  ├─ orders/
│  │  ├─ orders.service.ts
│  │  ├─ orders.repository.ts
│  │  └─ orders.types.ts
│  │
│  ├─ auth/
│  │  ├─ auth.service.ts                   # Auth.js helpers
│  │  └─ auth.types.ts
│  │
│  ├─ reviews/
│  │  ├─ reviews.service.ts
│  │  └─ reviews.types.ts
│  │
│  ├─ wishlist/
│  │  ├─ wishlist.service.ts
│  │  └─ wishlist.types.ts
│  │
│  └─ search/
│     ├─ search.service.ts
│     └─ search.types.ts
│
├─ hooks/                                  # Generic reusable hooks
│  ├─ usePagination.ts
│  ├─ useDebounce.ts
│  └─ useMediaQuery.ts
│
├─ lib/                                    # Core utilities & configurations
│  ├─ db.ts                                # Prisma client singleton
│  ├─ auth.ts                              # NextAuth/Auth.js config
│  ├─ env.ts                               # Zod-validated environment variables
│  ├─ logger.ts                            # Optional logger
│  ├─ email.ts                             # Email/notification integration
│  └─ utils/
│     ├─ currency.ts
│     ├─ dates.ts
│     └─ formatting.ts
│
├─ store/                                  # Zustand client state (alternative to features/)
│  ├─ useCartStore.ts                      # Global cart store
│  ├─ useFilterStore.ts                    # Filters/sorting state
│  └─ useUIStore.ts                        # Modals, drawers, theme
│
├─ types/                                  # Shared TypeScript types
│  ├─ product.ts
│  ├─ cart.ts
│  ├─ order.ts
│  └─ user.ts
│
├─ prisma/  (or ORM/)                      # Database schema & migrations
│  ├─ schema.prisma
│  └─ migrations/                          # Auto-managed by Prisma
│
├─ public/                                 # Static assets
│  ├─ images/
│  ├─ icons/
│  └─ favicon.ico
│
├─ tests/                                  # Test suites
│  ├─ unit/
│  │  └─ cart.store.test.ts
│  └─ e2e/
│     └─ checkout-flow.spec.ts
│
├─ .env.example                            # Environment variables template
├─ .gitignore
├─ package.json
├─ next.config.ts                          # Next.js configuration
├─ tailwind.config.ts                      # Tailwind CSS configuration
├─ tsconfig.json                           # TypeScript configuration
├─ postcss.config.js
└─ README.md

```
## Data Flow

```markdown
1. **User Interaction** - Entry point
   - ↓
2. **UI Component** (`/components`) - Renders UI & handles events
   - ↓
3. **Feature Logic** (`/features/*/service.ts`) - Business logic & rules
   - ↓
4. **Repository** (`/features/*/repository.ts`) - Data access layer
   - ↓
5. **Prisma Client** (`/lib/db.ts`) - ORM & database queries
   - ↓
6. **Database** - Data persistence
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
