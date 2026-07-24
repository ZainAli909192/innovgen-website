import { notFound } from "next/navigation";
import { services } from "@/content/site-content";
import { DetailPage } from "@/components/templates/detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, createMetadata, detailSchema } from "@/lib/seo";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = services.find((entry) => entry.slug === slug);
  return item ? createMetadata(item.seo, `/services/${slug}`) : {};
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = services.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <>
      <JsonLd data={detailSchema("Service", item)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: item.title, path: item.href ?? "/" }])} />
      <DetailPage item={item} parent="Services" parentHref="/services" actionLabel="Request an assessment" />
    </>
  );
}
