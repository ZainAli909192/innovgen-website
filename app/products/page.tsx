import { pages } from "@/content/site-content";
import { MarketingPage } from "@/components/templates/marketing-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.products.seo, "/products");

export default function ProductsPage() {
  return <MarketingPage page={pages.products} />;
}
