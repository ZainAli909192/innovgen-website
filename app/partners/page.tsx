import { pages } from "@/content/site-content";
import { MarketingPage } from "@/components/templates/marketing-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.partners.seo, "/partners");

export default function PartnersPage() {
  return <MarketingPage page={pages.partners} />;
}
