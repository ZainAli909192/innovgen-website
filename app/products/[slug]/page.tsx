import { notFound } from "next/navigation";
import { products } from "@/content/site-content";
import { DetailPage } from "@/components/templates/detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, createMetadata, detailSchema } from "@/lib/seo";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = products.find((entry) => entry.slug === slug);
  return item ? createMetadata(item.seo, `/products/${slug}`) : {};
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = products.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <>
      <JsonLd data={detailSchema("Product", item)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: item.title, path: item.href ?? "/" }])} />
      <DetailPage item={item} parent="Products" parentHref="/products" actionLabel="Request a demonstration" />
    </>
  );
}
