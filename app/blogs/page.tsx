import { pages } from "@/content/site-content";
import { MarketingPage } from "@/components/templates/marketing-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.blogs.seo, "/blogs");

export default function BlogsPage() {
  return <MarketingPage page={pages.blogs} />;
}
