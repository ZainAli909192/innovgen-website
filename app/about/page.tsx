import { pages } from "@/content/site-content";
import { MarketingPage } from "@/components/templates/marketing-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.about.seo, "/about");

export default function AboutPage() {
  return <MarketingPage page={pages.about} />;
}
