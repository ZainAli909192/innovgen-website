import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { StatusState } from "@/components/ui/status-state";

export default function Loading() {
  return (
    <Section spacing="spacious">
      <Container>
        <StatusState state="loading" title="Loading page" description="Preparing the requested content." />
      </Container>
    </Section>
  );
}
