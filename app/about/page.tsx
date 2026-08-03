import { AboutPage as AboutPageContent } from "@/components/sections/about-page";
import { JsonLd } from "@/components/seo/json-ld";
import { aboutPageMetadata, aboutPageSchema } from "@/lib/seo";

export const metadata = aboutPageMetadata();

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema()} />
      <AboutPageContent />
    </>
  );
}
