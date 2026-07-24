import { LegalPage } from "@/components/templates/legal-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  { title: "Privacy Policy", description: "Provisional InnovGen privacy policy." },
  "/privacy-policy",
  { noIndex: true },
);

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      description="This is structural placeholder copy only. It is not legal advice and must not be published as an approved policy."
      sections={[
        { title: "Information collected", paragraphs: ["The final policy will identify the information collected through enquiry, newsletter and recruitment experiences.", "Collection purposes, legal bases and required fields are pending legal review."] },
        { title: "How information is used", paragraphs: ["The final policy will explain enquiry handling, service communication, recruitment and website improvement purposes."] },
        { title: "Sharing and retention", paragraphs: ["Approved service providers, international transfer safeguards and retention periods are pending confirmation."] },
        { title: "Your choices", paragraphs: ["The final policy will explain applicable access, correction, deletion and objection rights, plus the verified contact route."] },
      ]}
    />
  );
}
