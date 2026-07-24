import { pages } from "@/content/site-content";
import { MarketingPage } from "@/components/templates/marketing-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.services.seo, "/services");

export default function ServicesPage() {
  return <MarketingPage page={pages.services} />;
}
