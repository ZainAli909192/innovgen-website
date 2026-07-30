import { FinalCtaSection } from "@/components/sections/home/final-cta-section";
import { ServicesShowcase } from "@/components/sections/services/services-showcase";
import { pages } from "@/content/site-content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.services.seo, "/services");

export default function ServicesPage() {
  return (
    <>
      <ServicesShowcase />
            <FinalCtaSection /> 
      
    </>
  );
}
