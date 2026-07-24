import { notFound } from "next/navigation";
import { blogs } from "@/content/site-content";
import { DetailPage } from "@/components/templates/detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, createMetadata, detailSchema } from "@/lib/seo";

export function generateStaticParams() {
  return blogs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = blogs.find((entry) => entry.slug === slug);
  return item ? createMetadata(item.seo, `/blogs/${slug}`) : {};
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = blogs.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <>
      <JsonLd data={detailSchema("Article", item)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blogs", path: "/blogs" }, { name: item.title, path: item.href ?? "/" }])} />
      <DetailPage item={item} parent="Blogs" parentHref="/blogs" actionLabel="Discuss this topic" />
    </>
  );
}
