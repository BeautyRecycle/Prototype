import { Navbar } from "~/components/layout/Navbar";
import { MobileNav } from "~/components/layout/MobileNav";
import { GSAPProvider } from "~/components/animations/GSAPProvider";
import { PageTransition } from "~/components/animations/PageTransition";

/**
 * Platform layout — wraps all authenticated app pages.
 *
 * Provides: Navbar, MobileNav, GSAP context, page transitions.
 */
export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GSAPProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pb-24 md:pb-0">
          <PageTransition>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </PageTransition>
        </main>
        <MobileNav />
      </div>
    </GSAPProvider>
  );
}
