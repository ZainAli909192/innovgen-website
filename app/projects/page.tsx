import { ClientsPage } from "@/components/sections/clients/clients-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  {
    title: "Clients",
    description: "Explore the sectors and environments InnovGen supports.",
  },
  "/projects",
);

export default function ClientsRoutePage() {
  return <ClientsPage />;
}
