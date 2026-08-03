import { PartnerOrbitShowcase } from "@/components/sections/partners/partner-orbit-showcase";
import { PartnerAuthoritySection } from "@/components/sections/partners/partner-authority-section";
import { FinalCtaSection } from "@/components/sections/home/final-cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { partnersPageMetadata, partnersPageSchema } from "@/lib/seo";

export const metadata = partnersPageMetadata();

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={partnersPageSchema()} />
      <PartnerOrbitShowcase />
      <PartnerAuthoritySection />
      <FinalCtaSection />
    </>
  );
}
