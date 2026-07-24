import { pages } from "@/content/site-content";
import { MarketingPage } from "@/components/templates/marketing-page";
import { JsonLd } from "@/components/seo/json-ld";
import { createMetadata, organizationSchema } from "@/lib/seo";

export const metadata = createMetadata(pages.home.seo, "/");

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <MarketingPage page={pages.home} />
    </>
  );
}
