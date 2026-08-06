import { CompanyOverviewSection } from "./company-overview-section";
import { ServicesPreviewSection } from "./services-preview-section";
import { TrustedClientsDirectory } from "../clients/trusted-clients-directory";
import ClientsFaqSection from "../clients/clients-faq";
import { TrustedBySection } from "./trusted-by-section";
import { LeadershipSection } from "./leadership-section";
import { FinalCtaSection } from "./final-cta-section";
import { EnterpriseCapabilitiesSection } from "../enterprise-capabilities-section";

export function HomePageSections() {
  return (
    <>
      <LeadershipSection />
      <TrustedBySection />
      <CompanyOverviewSection />
      <EnterpriseCapabilitiesSection />
      <ServicesPreviewSection />
      <TrustedClientsDirectory variant="home" />
      <ClientsFaqSection />
      <FinalCtaSection />
    </>
  );
}
