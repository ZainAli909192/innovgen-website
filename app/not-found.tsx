import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { StatusState } from "@/components/ui/status-state";

export default function NotFound() {
  return (
    <Section spacing="spacious">
      <Container>
        <StatusState
          state="empty"
          title="This page could not be found"
          description="The page may have moved, or the address may be incomplete."
          action={{ label: "Return home", href: "/" }}
        />
      </Container>
    </Section>
  );
}
