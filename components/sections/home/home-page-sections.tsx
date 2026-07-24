import { CompanyOverviewSection } from "./company-overview-section";
import { ServicesPreviewSection } from "./services-preview-section";
import { TrustedBySection } from "./trusted-by-section";
import { LeadershipSection } from "./leadership-section";

export function HomePageSections() {
  return (
    <>
      <LeadershipSection />
      <TrustedBySection />
      <CompanyOverviewSection />
      <ServicesPreviewSection />
    </>
  );
}
