"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section spacing="spacious">
      <Container>
        <Card className="mx-auto max-w-xl py-12 text-center" role="alert">
          <h1 className="text-2xl">Something went wrong</h1>
          <p className="mt-3 text-muted">The page could not be prepared. Try again or return to the homepage.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button onClick={reset}>Try again</Button>
            <Button href="/" variant="secondary">Return home</Button>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
