import { pages } from "@/content/site-content";
import { MarketingPage } from "@/components/templates/marketing-page";
import { JsonLd } from "@/components/seo/json-ld";
import { createMetadata, organizationSchema } from "@/lib/seo";

export const metadata = createMetadata(pages.home.seo, "/");

export default function HomePage() {
  return (
    <>
    <main style={{ padding: "40px", color: "white" }}>
      <h1>Website is working</h1>
    </main>
 
      {/* <JsonLd data={organizationSchema()} />
      <MarketingPage heroSceneId="home-hero" page={pages.home} /> */}
    </>
  );
}
