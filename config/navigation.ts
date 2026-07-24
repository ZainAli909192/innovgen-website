export type NavigationItem = {
  label: string;
  href: `/${string}` | "/";
  featured?: boolean;
};

export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Partners", href: "/partners" },
  { label: "Blogs", href: "/blogs" },
  { label: "Careers", href: "/careers" },
] satisfies readonly NavigationItem[];

export const consultationNavigation = {
  label: "Get Free Consultation",
  href: "/consultation",
  featured: true,
} satisfies NavigationItem;

export const legalNavigation = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
] satisfies readonly NavigationItem[];
