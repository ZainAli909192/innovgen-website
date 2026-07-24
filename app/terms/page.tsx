import { LegalPage } from "@/components/templates/legal-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  { title: "Terms and Conditions", description: "Provisional InnovGen website terms." },
  "/terms",
  { noIndex: true },
);

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      description="This is structural placeholder copy only. It is not legal advice and requires formal legal and client approval."
      sections={[
        { title: "Website use", paragraphs: ["The final terms will define acceptable use, availability and jurisdiction."] },
        { title: "Content and intellectual property", paragraphs: ["Ownership, permitted use and third-party rights require legal confirmation."] },
        { title: "Information and warranties", paragraphs: ["The website will avoid unverified claims. Final limitation and reliance wording requires legal review."] },
        { title: "External links and changes", paragraphs: ["The final terms will address third-party resources, updates and the effective date."] },
      ]}
    />
  );
}
