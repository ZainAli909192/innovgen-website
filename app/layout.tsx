import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { MotionProvider } from "@/components/providers/motion-provider";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollProgressIndicator } from "@/components/motion/scroll-progress";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "InnovGen",
    template: "%s | InnovGen",
  },
  description:
    "InnovGen delivers secure, scalable digital systems for ambitious organizations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>
          <ScrollProgressIndicator />
          <a
            href="#main-content"
            className="fixed start-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-3 font-semibold text-white transition-transform focus:translate-y-0"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <MobileNavigation />
        </MotionProvider>
      </body>
    </html>
  );
}
