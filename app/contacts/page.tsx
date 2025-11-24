import React from "react";
import { Container } from "@/components/container";
import Link from "next/link";

export default function ContactsPage() {
  return (
    <Container className="min-h-screen py-16">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center">
        <p className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-body mb-4">
          Mandi · Support
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-heading mb-4">
          Get in touch with the Mandi team.
        </h1>
        <p className="text-body text-sm md:text-base leading-relaxed">
          Questions about an order, feedback on the experience, or want to
          collaborate? We&apos;d love to hear from you.
        </p>
      </section>

      {/* Main content */}
      <section className="mt-12 grid gap-10 lg:grid-cols-[1.1fr,1fr]">
        {/* Contact form */}
        <div className="rounded-2xl border border-default bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold text-heading mb-2">
            Send us a message
          </h2>
          <p className="text-sm text-body mb-6">
            Drop a note below and we&apos;ll get back to you as soon as
            possible. For order-specific questions, include your order ID.
          </p>

          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-heading mb-1.5"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ariyaman Debnath"
                  className="w-full rounded-lg border border-default bg-white px-3 py-2 text-sm text-heading outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-heading mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-default bg-white px-3 py-2 text-sm text-heading outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-medium text-heading mb-1.5"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Issue with my recent order"
                className="w-full rounded-lg border border-default bg-white px-3 py-2 text-sm text-heading outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-heading mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us what’s going on and how we can help…"
                className="w-full rounded-lg border border-default bg-white px-3 py-2 text-sm text-heading outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition"
            >
              Submit message
            </button>

            <p className="text-[11px] text-body mt-2">
              By submitting, you agree that we may contact you regarding your
              enquiry. This is a demo frontend, so no real messages are sent.
            </p>
          </form>
        </div>

        {/* Contact details / support info */}
        <aside className="space-y-8">
          <div className="rounded-2xl bg-neutral-100 p-5 md:p-6">
            <h3 className="text-base font-semibold text-heading mb-3">
              Contact details
            </h3>
            <ul className="space-y-3 text-sm text-body">
              <li>
                <span className="block text-[11px] uppercase tracking-wide text-neutral-500">
                  Support email
                </span>
                <a
                  href="mailto:support@mandi.shop"
                  className="text-heading hover:underline"
                >
                  support@mandi.shop
                </a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wide text-neutral-500">
                  Phone (10 AM – 7 PM IST)
                </span>
                <a
                  href="tel:+911234567890"
                  className="text-heading hover:underline"
                >
                  +91-12345-67890
                </a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wide text-neutral-500">
                  Address
                </span>
                <p className="text-body">
                  Mandi HQ, Near Central Market
                  <br />
                  Udaipur, Tripura, India
                </p>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-dashed border-default p-5 md:p-6">
            <h3 className="text-base font-semibold text-heading mb-3">
              Common topics
            </h3>
            <ul className="space-y-2 text-sm text-body">
              <li>• Order status, tracking, and delivery updates</li>
              <li>• Returns, refunds, and replacement requests</li>
              <li>• Seller onboarding and marketplace partnerships</li>
              <li>• Feedback about the Mandi shopping experience</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-neutral-primary-soft/60 p-5 md:p-6">
            <h3 className="text-base font-semibold text-heading mb-2">
              Prefer self-service?
            </h3>
            <p className="text-sm text-body mb-3">
              You can browse help articles and common questions anytime in our
              help center.
            </p>
            <Link
              href="/help"
              className="inline-flex items-center rounded-full border border-default px-4 py-1.5 text-xs font-medium text-heading hover:bg-white/60 transition"
            >
              Go to help center
            </Link>
          </div>
        </aside>
      </section>
    </Container>
  );
}
