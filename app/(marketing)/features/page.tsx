import { Container } from "@/components/layout/container";
import Link from "next/link";

const coreFeatures = [
  {
    title: "Smart product grid",
    description:
      "Responsive, card-based layout that adapts from single-column mobile to three-column desktop, keeping your catalogue clean and scannable.",
    tag: "UI / UX",
  },
  {
    title: "Client-side pagination",
    description:
      "Custom pagination powered by a reusable usePagination hook, swapping products in place without jarring page reloads.",
    tag: "State management",
  },
  {
    title: "Category-aware layout",
    description:
      "Dedicated FilterBar ready to plug in category, price, and sort controls so shoppers can quickly narrow down what they want.",
    tag: "Filtering",
  },
  {
    title: "API-backed storefront",
    description:
      "Products are fetched from the FakeStore API at build or request time, simulating a real-world headless ecommerce setup.",
    tag: "Data fetching",
  },
];

const techHighlights = [
  "Next.js App Router with server + client components",
  "Typed product models with TypeScript (IProduct)",
  "Reusable ProductGrid and ProductCard components",
  "Tailwind CSS utility-first styling",
  "Layout primitives via a shared Container component",
];

const experiencePoints = [
  "Instant product browsing with no full page reloads.",
  "Consistent card design for every product tile.",
  "Clean separation between data fetching and UI rendering.",
  "A layout that’s ready for search, filters, and sorting.",
  "Mobile-first structure that scales up gracefully to desktop.",
];

export default function FeaturesPage() {
  return (
    <Container className="min-h-screen py-16">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center">
        <p className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-body mb-4">
          Mandi · Feature Overview
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-heading mb-4">
          A modern ecommerce frontend, built the right way.
        </h1>
        <p className="text-body text-sm md:text-base leading-relaxed">
          Mandi&apos;s frontend is designed as a real-world storefront:
          reusable components, clean architecture, and a UI that&apos;s ready
          for production APIs, filters, and future expansion.
        </p>
      </section>

      {/* Core Features Grid */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-heading mb-4">
          Core shopping experience
        </h2>
        <p className="text-body text-sm mb-6 max-w-2xl">
          Everything from the home page to the product listing is structured for
          clarity, performance, and reusability.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {coreFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-default bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-body mb-3">
                {feature.tag}
              </span>
              <h3 className="text-base font-semibold text-heading mb-2">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-body leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Tech Stack & Architecture */}
      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-heading mb-4">
            Under the hood
          </h2>
          <p className="text-body text-sm mb-4">
            The frontend is architected as a teaching-quality codebase: clear
            separation of concerns and patterns you can extend in real projects.
          </p>

          <ul className="space-y-2 text-sm text-body">
            {techHighlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-neutral-100 p-6 md:p-7 flex flex-col justify-between">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-heading mb-3">
              Shopper-focused experience
            </h3>
            <p className="text-xs md:text-sm text-body mb-5">
              Every interaction on the storefront is tuned for clarity and
              ease-of-use, from the product grid layout to how pagination keeps
              users in context.
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-body">
              {experiencePoints.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-1 h-1 w-4 rounded bg-emerald-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-xs md:text-sm font-medium text-white hover:bg-emerald-700 transition"
            >
              View live storefront
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center rounded-full border border-default px-4 py-2 text-xs md:text-sm font-medium text-heading hover:bg-white/60 transition"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 border border-dashed border-default rounded-2xl p-6 md:p-8 text-center">
        <h2 className="text-lg md:text-xl font-semibold text-heading mb-3">
          Ready for the next layer.
        </h2>
        <p className="text-sm text-body max-w-2xl mx-auto mb-5">
          From here, you can plug in real categories, add search and filters to
          the FilterBar, wire up server-side sorting, or connect Mandi to a
          production-ready headless commerce backend.
        </p>
        <Link
          href="/features"
          className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-2 text-xs md:text-sm font-medium text-white hover:bg-black transition"
        >
          Continue building on this foundation
        </Link>
      </section>
    </Container>
  );
}
