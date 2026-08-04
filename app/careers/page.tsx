import { pages } from "@/content/site-content";
import { CareersExperience } from "@/components/sections/careers/careers-experience";
import { createMetadata, careersPageSchema } from "@/lib/seo";

export async function generateMetadata() {
  return createMetadata(pages.careers.seo, "/careers");
}

export default function CareersPage() {
  const ld = JSON.stringify(careersPageSchema());

  return (
    <>
      <script key="ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <main>
        <CareersExperience />
      </main>
    </>
  );
}
