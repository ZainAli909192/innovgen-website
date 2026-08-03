import { ClientsPage } from "@/components/sections/clients/clients-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  {
    title: "Clients",
    description: "Explore the trusted organizations InnovGen supports.",
  },
  "/projects",
);

export default function ClientsRoutePage() {
  return <ClientsPage />;
}
