import { pages } from "@/content/site-content";
import { AboutPage as AboutPageContent } from "@/components/sections/about-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.about.seo, "/about");

export default function AboutPage() {
  return <AboutPageContent />;
}
