import { pages } from "@/content/site-content";
import { PartnerOrbitShowcase } from "@/components/sections/partners/partner-orbit-showcase";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.partners.seo, "/partners");

export default function PartnersPage() {
  return <PartnerOrbitShowcase />;
}
