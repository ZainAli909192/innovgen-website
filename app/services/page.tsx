import { FinalCtaSection } from "@/components/sections/home/final-cta-section";
import { ServicesShowcase } from "@/components/sections/services/services-showcase";
import { pages } from "@/content/site-content";
import { JsonLd } from "@/components/seo/json-ld";
import { createMetadata, servicesPageSchema } from "@/lib/seo";

export const metadata = createMetadata(pages.services.seo, "/services");

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesPageSchema()} />
      <ServicesShowcase />
      <FinalCtaSection />
    </>
  );
}
