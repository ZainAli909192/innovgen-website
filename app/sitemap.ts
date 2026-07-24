import type { MetadataRoute } from "next";
import { allDetails } from "@/content/site-content";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/products",
    "/projects",
    "/partners",
    "/blogs",
    "/careers",
    "/consultation",
    "/privacy-policy",
    "/terms",
    "/sitemap",
  ];
  const detailRoutes = Object.values(allDetails).flatMap((items) =>
    items.map((item) => item.href ?? "/"),
  );

  return [...staticRoutes, ...detailRoutes].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date("2026-07-24"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
