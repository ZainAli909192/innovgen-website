import { pages } from "@/content/site-content";
import { MarketingPage } from "@/components/templates/marketing-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.careers.seo, "/careers");

export default function CareersPage() {
  return <MarketingPage page={pages.careers} />;
}
