import { pages } from "@/content/site-content";
import { MarketingPage } from "@/components/templates/marketing-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(pages.projects.seo, "/projects");

export default function ProjectsPage() {
  return <MarketingPage page={pages.projects} />;
}
