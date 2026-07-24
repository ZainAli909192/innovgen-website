import Link from "next/link";
import { careers, products, projects, services, blogs } from "@/content/site-content";
import { mainNavigation, legalNavigation, consultationNavigation } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  { title: "Sitemap", description: "Browse all public InnovGen routes." },
  "/sitemap",
);

const groups = [
  { title: "Main pages", items: [...mainNavigation, consultationNavigation] },
  { title: "Services", items: services.map(({ title: label, href }) => ({ label, href: href! })) },
  { title: "Products", items: products.map(({ title: label, href }) => ({ label, href: href! })) },
  { title: "Projects", items: projects.map(({ title: label, href }) => ({ label, href: href! })) },
  { title: "Insights", items: blogs.map(({ title: label, href }) => ({ label, href: href! })) },
  { title: "Careers", items: careers.map(({ title: label, href }) => ({ label, href: href! })) },
  { title: "Legal", items: legalNavigation },
];

export default function SitemapPage() {
  return (
    <Section spacing="spacious">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Navigation</p>
        <h1 className="mt-4 text-[length:var(--text-h1)]">Sitemap</h1>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <nav key={group.title} aria-labelledby={`map-${group.title.toLowerCase().replaceAll(" ", "-")}`}>
              <h2 id={`map-${group.title.toLowerCase().replaceAll(" ", "-")}`} className="text-xl">{group.title}</h2>
              <ul className="mt-4 space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link className="inline-flex min-h-11 items-center text-muted hover:text-foreground" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
    </Section>
  );
}
