"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "~/components/ui/Button";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "~/components/animations/MotionPrimitives";

// Reusing the header from landing page for consistency
function Header() {
  return (
    <header className="border-eco-neutral-200/50 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-eco-primary-700 flex items-center gap-2 text-lg font-bold"
        >
          <span className="text-2xl">♻️</span>
          Eco Beauty Circular
        </Link>
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
  );
}

const STEPS = [
  {
    number: "01",
    title: "Prepare Your Package",
    description:
      "Make sure your beauty product container is empty. A quick rinse helps ensure high-quality recycling.",
    icon: "🧴",
    color: "bg-blue-50 text-blue-600",
  },
  {
    number: "02",
    title: "Scan with AI",
    description:
      "Point your camera at the item. Our advanced AI instantly identifies the material (glass, plastic, etc.) and brand.",
    icon: "📸",
    color: "bg-purple-50 text-purple-600",
  },
  {
    number: "03",
    title: "Get Instructions",
    description:
      "Receive specific disposal instructions based on your local recycling guidelines and the package type.",
    icon: "📋",
    color: "bg-amber-50 text-amber-600",
  },
  {
    number: "04",
    title: "Earn Rewards",
    description:
      "Collect points for every correct scan. Redeem them for discounts, eco-products, or charitable donations.",
    icon: "🎁",
    color: "bg-emerald-50 text-emerald-600",
  },
];

const FAQS = [
  {
    question: "What items can I recycle?",
    answer:
      "We accept most cosmetic packaging, including shampoo bottles, cream jars, lipstick tubes, and compacts. Check the app for a full list.",
  },
  {
    question: "Do I need to clean the containers?",
    answer:
      "Yes, a light rinse ensures the material isn't contaminated, making the recycling process much more efficient.",
  },
  {
    question: "How do the rewards work?",
    answer:
      "Every verified scan earns you points. 100 points = $1 towards our partner brands or environmental charities.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-green-50/50 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <FadeIn>
            <span className="mb-6 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700 shadow-sm transition-transform hover:scale-105">
              <span className="mr-2 text-lg">🌿</span> Simple. Smart.
              Sustainable.
            </span>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
              How Beauty Recycle{" "}
              <span className="bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
                Works
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-medium text-slate-600 md:text-xl">
              Join the revolution in cosmetic waste. We&apos;ve made it incredibly
              easy to responsibly dispose of your beauty products and get
              rewarded for it.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/sign-up">
                <Button
                  variant="primary"
                  size="lg"
                  className="shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-green-200"
                >
                  Start Recycling Now
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Abstract Background Shapes with better styling */}
        <div className="pointer-events-none absolute top-0 left-0 -z-0 h-full w-full overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-green-200/40 to-teal-100/40 blur-[100px]" />
          <div className="absolute top-[30%] -right-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-blue-200/40 to-purple-100/40 blur-[100px]" />
          <div className="absolute bottom-[0%] left-[20%] h-[300px] w-[300px] rounded-full bg-yellow-100/40 blur-[80px]" />
        </div>
      </section>

      {/* Steps Section */}
      <section className="relative bg-white py-24 md:py-32">
        {/* Subtle grid pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="mb-20 text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                The Journey of a Package
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600">
                From your shelf to a new life, in four easy steps.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <StaggerItem key={index}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-slate-900/10">
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner ${step.color.replace("text", "bg-opacity-20 bg")}`}
                  >
                    <span className="text-4xl drop-shadow-sm filter">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="mb-3 flex items-center text-xl font-bold text-slate-900">
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                      {step.number}
                    </span>
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                  <div
                    className={`absolute bottom-0 left-0 h-1.5 w-0 transition-all duration-500 group-hover:w-full ${step.color.replace("bg-", "bg-").replace("text-", "-500").split(" ")[0]?.replace("-50", "-500") ?? ""}`}
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Technology Highlight */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white md:py-32">
        {/* Tech background elements */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-green-500 blur-[120px]" />
          <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-blue-600 blur-[140px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="lg:w-1/2">
              <FadeIn>
                <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 shadow-2xl transition-shadow duration-500 hover:shadow-green-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative z-10 text-8xl transition-transform duration-700 group-hover:scale-110">
                      🤖
                    </div>
                    {/* Scanning Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                  </div>

                  {/* Scanning Beam */}
                  <div className="absolute top-0 z-20 h-1.5 w-full animate-[scan_3s_ease-in-out_infinite] bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8),0_0_10px_rgba(74,222,128,0.4)]" />

                  {/* Analysis Frame Corners */}
                  <div className="absolute top-8 left-8 h-16 w-16 rounded-tl-lg border-t-4 border-l-4 border-green-500/70" />
                  <div className="absolute top-8 right-8 h-16 w-16 rounded-tr-lg border-t-4 border-r-4 border-green-500/70" />
                  <div className="absolute bottom-8 left-8 h-16 w-16 rounded-bl-lg border-b-4 border-l-4 border-green-500/70" />
                  <div className="absolute right-8 bottom-8 h-16 w-16 rounded-br-lg border-r-4 border-b-4 border-green-500/70" />

                  {/* Data overlay */}
                  <div className="absolute right-6 bottom-6 left-6 translate-y-2 transform rounded-lg border border-slate-700 bg-slate-900/80 p-4 font-mono text-xs text-green-400 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="mb-1 flex justify-between">
                      <span>DETECTING OBJECT...</span>
                      <span>100%</span>
                    </div>
                    <div className="mb-1 flex justify-between">
                      <span>MATERIAL_TYPE:</span>
                      <span>PET_PLASTIC_RECYCLABLE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CONFIDENCE:</span>
                      <span>0.9842</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className="lg:w-1/2">
              <FadeIn delay={0.2}>
                <div className="mb-4 inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                  AI-POWERED RECYCLING
                </div>
                <h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">
                  Precision Identification <br />
                  <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                    Powered by Vision AI
                  </span>
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-slate-300">
                  <p>
                    Unsure if that bottle is PET or HDPE? Our proprietary
                    machine learning model analyzes the packaging shape,
                    transparency, and labeling to determine exactly what it is
                    with industrial-grade accuracy.
                  </p>
                  <p>
                    We cross-reference every scan against a database of
                    thousands of beauty products to provide verified recycling
                    instructions specific to your municipality&apos;s capabilities.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-6">
                    {[
                      { label: "Instant Analysis", desc: "< 200ms processing" },
                      { label: "95% Accuracy", desc: "Industrial grade model" },
                      { label: "Brand Detection", desc: "Auto-cataloging" },
                      { label: "Local Guidelines", desc: "Geo-specific rules" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 transition-colors hover:border-green-500/50"
                      >
                        <div className="mb-1 flex items-center gap-2 font-bold text-white">
                          <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                          {item.label}
                        </div>
                        <div className="ml-4 text-sm text-slate-400">
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Common Questions
                </h2>
                <p className="text-slate-600">
                  Got questions? We&apos;ve got answers.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-6">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:border-green-100 hover:shadow-md"
                >
                  <h3 className="mb-3 flex items-center justify-between text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700">
                    {faq.question}
                    <span className="text-2xl text-slate-300 transition-colors group-hover:text-green-500">
                      ?
                    </span>
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative overflow-hidden py-24 text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green-50 to-white" />
        {/* Decorative circle */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-200/20 to-teal-200/20 blur-3xl" />

        <FadeIn>
          <h2 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900">
            Ready to make an impact?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-600">
            Join thousands of others in the eco-beauty movement and start
            earning rewards for your sustainable choices.
          </p>
          <Link href="/sign-up">
            <Button
              variant="primary"
              size="lg"
              className="transform rounded-full px-10 py-5 text-xl font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-green-300"
            >
              Create Free Account
            </Button>
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
