import { products, services } from "@/content/site-content";
import type { RoutePath } from "./navigation";

export type FooterLink = {
  label: string;
  href: RoutePath;
  approval: "approved" | "client-approval-required";
};

const configuredServices = services.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}` as const,
  approval:
    service.status === "placeholder"
      ? ("client-approval-required" as const)
      : ("approved" as const),
}));

export const footerServiceLinks = [
  ...configuredServices,
  {
    label: "IT Infrastructure",
    href: "/services" as const,
    approval: "client-approval-required",
  },
  {
    label: "Digital Transformation",
    href: "/services" as const,
    approval: "client-approval-required",
  },
] satisfies readonly FooterLink[];

export const footerProductLinks = [
  ...products.map((product) => ({
    label: product.title,
    href: `/products/${product.slug}` as const,
    approval:
      product.status === "placeholder"
        ? ("client-approval-required" as const)
        : ("approved" as const),
  })),
  {
    label: "View All Products",
    href: "/products" as const,
    approval: "approved",
  },
  {
    label: "Product Demo",
    href: "/consultation" as const,
    approval: "client-approval-required",
  },
  {
    label: "Enterprise Solutions",
    href: "/products" as const,
    approval: "client-approval-required",
  },
] satisfies readonly FooterLink[];
