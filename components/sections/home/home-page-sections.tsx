import { CompanyOverviewSection } from "./company-overview-section";
import { ServicesPreviewSection } from "./services-preview-section";
import { TrustedClientsDirectory } from "../clients/trusted-clients-directory";
import { TrustedBySection } from "./trusted-by-section";
import { LeadershipSection } from "./leadership-section";
import { FinalCtaSection } from "./final-cta-section";

export function HomePageSections() {
  return (
    <>
      <LeadershipSection />
      <TrustedBySection />
      <CompanyOverviewSection />
      <ServicesPreviewSection />
      <TrustedClientsDirectory variant="home" />
      <FinalCtaSection />
    </>
  );
}
