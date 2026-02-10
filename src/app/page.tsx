"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/Button";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "~/components/animations/MotionPrimitives";

const FEATURES = [
  {
    icon: "📷",
    title: "Scan & Classify",
    description:
      "Point your camera at any cosmetic package to instantly classify its material and recycling potential.",
  },
  {
    icon: "♻️",
    title: "Track Impact",
    description:
      "See exactly how much CO₂ you've saved and how many packages you've returned to the circular economy.",
  },
  {
    icon: "🎁",
    title: "Earn Rewards",
    description:
      "Collect points with every scan and redeem them for sustainable, eco-friendly rewards from our partners.",
  },
] as const;

const STATS = [
  { value: "0.5 kg", label: "CO₂ saved per PET bottle reused" },
  { value: "20 pts", label: "Earned per reusable package" },
  { value: "< 60s", label: "To complete the full flow" },
] as const;

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="border-eco-neutral-200/50 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-eco-primary-700 flex items-center gap-2 text-lg font-bold">
            <span className="text-2xl">♻️</span>
            Eco Beauty Circular
          </span>
          <div className="flex items-center gap-3">
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="primary" size="sm">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="from-eco-primary-50 to-eco-secondary-50 relative overflow-hidden bg-gradient-to-br via-white px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="bg-eco-primary-100 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl text-4xl"
            >
              ♻️
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-eco-neutral-900 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Turn Beauty Waste into
              <span className="from-eco-primary-600 to-eco-secondary-500 block bg-gradient-to-r bg-clip-text text-transparent">
                Positive Impact
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-eco-neutral-600 mx-auto mt-6 max-w-2xl text-lg">
              Scan cosmetic packaging, track your environmental impact, and earn
              rewards — all in under 60 seconds. Join the circular economy for
              beauty.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <SignedOut>
                <Link href="/sign-up">
                  <Button variant="primary" size="lg">
                    Start Recycling →
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg">
                    How It Works
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/scan">
                  <Button variant="primary" size="lg">
                    Scan a Package →
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    View Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </FadeIn>
        </div>

        {/* Decorative gradient orbs */}
        <div
          className="bg-eco-primary-200/30 absolute -top-24 left-1/4 h-96 w-96 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="bg-eco-secondary-200/30 absolute right-1/4 -bottom-24 h-96 w-96 rounded-full blur-3xl"
          aria-hidden="true"
        />
      </section>

      {/* Stats Bar */}
      <section className="border-eco-neutral-200 border-y bg-white py-8">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-8 px-4">
          {STATS.map((stat) => (
            <FadeIn key={stat.label} className="text-center">
              <p className="text-eco-primary-700 text-2xl font-bold">
                {stat.value}
              </p>
              <p className="text-eco-neutral-500 mt-1 text-sm">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="text-center">
            <h2 className="text-eco-neutral-900 text-3xl font-bold">
              How It Works
            </h2>
            <p className="text-eco-neutral-500 mx-auto mt-3 max-w-xl">
              Three simple steps to make a real difference
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <StaggerItem key={feature.title}>
                <div className="border-eco-neutral-200 bg-eco-neutral-50 rounded-2xl border p-8 text-center transition-shadow duration-200 hover:shadow-lg">
                  <div className="bg-eco-primary-100 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl">
                    {feature.icon}
                  </div>
                  <div className="text-eco-primary-600 mt-2 text-xs font-semibold">
                    STEP {i + 1}
                  </div>
                  <h3 className="text-eco-neutral-900 mt-3 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-eco-neutral-500 mt-2 text-sm">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="from-eco-primary-600 to-eco-secondary-600 bg-gradient-to-r px-4 py-16">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Make an Impact?
          </h2>
          <p className="text-eco-primary-100 mt-4 text-lg">
            Join thousands of eco-conscious beauty lovers already making a
            difference.
          </p>
          <div className="mt-8">
            <SignedOut>
              <Link href="/sign-up">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Create Free Account
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/scan">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Scan Your First Package
                </Button>
              </Link>
            </SignedIn>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="border-eco-neutral-200 border-t bg-white px-4 py-8">
        <div className="text-eco-neutral-500 mx-auto max-w-7xl text-center text-sm">
          <p>
            © {new Date().getFullYear()} Eco Beauty Circular. Built for a
            sustainable future.
          </p>
          <p className="text-eco-neutral-400 mt-2 text-xs">
            AI classification layer is rule-based for demo purposes — designed
            to be replaced by trained ML model.
          </p>
        </div>
      </footer>
    </div>
  );
}
