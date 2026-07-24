import { notFound } from "next/navigation";
import { careers } from "@/content/site-content";
import { DetailPage } from "@/components/templates/detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, createMetadata, detailSchema } from "@/lib/seo";

export function generateStaticParams() {
  return careers.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = careers.find((entry) => entry.slug === slug);
  return item ? createMetadata(item.seo, `/careers/${slug}`) : {};
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = careers.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <>
      <JsonLd data={detailSchema("JobPosting", item)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }, { name: item.title, path: item.href ?? "/" }])} />
      <DetailPage item={item} parent="Careers" parentHref="/careers" actionLabel="Start application" />
    </>
  );
}
