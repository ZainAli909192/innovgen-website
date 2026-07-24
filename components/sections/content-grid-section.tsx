import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ContentItem } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function ContentGridSection({
  eyebrow,
  title,
  description,
  items,
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  items: ContentItem[];
  tone?: "default" | "surface";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>
        {items.length ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={`${item.title}-${index}`} delay={Math.min(index * 0.04, 0.12)}>
                <Card className="h-full" interactive={Boolean(item.href)}>
                  {item.meta ? (
                    <p className="text-sm font-medium text-accent">{item.meta}</p>
                  ) : null}
                  {item.status === "placeholder" ? (
                    <Badge variant="gold" className="mt-3">
                      Client approval required
                    </Badge>
                  ) : null}
                  <h3 className="mt-4 text-[length:var(--text-h3)]">{item.title}</h3>
                  <p className="mt-3 text-muted">{item.description}</p>
                  {item.href ? (
                    <Link
                      className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-blue-300 hover:text-foreground"
                      href={item.href}
                    >
                      Explore
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                  ) : null}
                </Card>
              </Reveal>
            ))}
          </div>
        ) : (
          <Card className="mt-10 text-center">
            <h3 className="text-xl">Nothing published yet</h3>
           
          </Card>
        )}
      </Container>
    </Section>
  );
}
