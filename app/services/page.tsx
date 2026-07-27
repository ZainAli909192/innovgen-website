import { CtaSection } from "@/components/sections/cta-section";
import { ServicesShowcase } from "@/components/sections/services/services-showcase";
import { pages } from "@/content/site-content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.services.seo, "/services");

export default function ServicesPage() {
  return (
    <>
      <ServicesShowcase />
      <CtaSection
        title="Ready to discuss your next technology challenge?"
        description="Tell us where you want to go, and we will help shape a secure, scalable route forward."
        label="Let’s discuss"
        href="/consultation"
      />
    </>
  );
}
