import { CompanyOverviewSection } from "./company-overview-section";
import { ServicesPreviewSection } from "./services-preview-section";
import { TrustedBySection } from "./trusted-by-section";

export function HomePageSections() {
  return (
    <>
      <TrustedBySection />
      <CompanyOverviewSection />
      <ServicesPreviewSection />
    </>
  );
}
