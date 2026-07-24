import { notFound } from "next/navigation";
import { projects } from "@/content/site-content";
import { DetailPage } from "@/components/templates/detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = projects.find((entry) => entry.slug === slug);
  return item ? createMetadata(item.seo, `/projects/${slug}`) : {};
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = projects.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: item.title, path: item.href ?? "/" }])} />
      <DetailPage item={item} parent="Projects" parentHref="/projects" actionLabel="Discuss a similar project" />
    </>
  );
}
