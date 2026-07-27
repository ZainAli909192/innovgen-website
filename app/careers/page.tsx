import { pages } from "@/content/site-content";
import { CareersExperience } from "@/components/sections/careers/careers-experience";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.careers.seo, "/careers");

export default function CareersPage() {
  return <CareersExperience />;
}
