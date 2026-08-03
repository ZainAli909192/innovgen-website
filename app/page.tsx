import type { Viewport } from "next";
import { pages } from "@/content/site-content";
import { MarketingPage } from "@/components/templates/marketing-page";
import { JsonLd } from "@/components/seo/json-ld";
import { homePageMetadata, homePageSchema } from "@/lib/seo";

export const metadata = homePageMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071423",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageSchema()} />
      <MarketingPage heroSceneId="home-hero" page={pages.home} />
    </>
  );
}
