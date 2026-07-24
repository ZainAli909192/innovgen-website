export type RoutePath = `/${string}` | "/";

export type NavigationKey =
  | "home"
  | "about"
  | "services"
  | "products"
  | "projects"
  | "partners"
  | "blogs"
  | "careers"
  | "consultation"
  | "privacy"
  | "terms"
  | "sitemap";

export type NavigationItem = {
  key: NavigationKey;
  label: string;
  href: RoutePath;
  featured?: boolean;
};

export type MobileNavigationItem = NavigationItem & {
  icon: "home" | "services" | "products" | "projects";
};

export const routeNavigation = {
  home: { key: "home", label: "Home", href: "/" },
  about: { key: "about", label: "About", href: "/about" },
  services: { key: "services", label: "Services", href: "/services" },
  products: { key: "products", label: "Products", href: "/products" },
  projects: { key: "projects", label: "Projects", href: "/projects" },
  partners: { key: "partners", label: "Partners", href: "/partners" },
  blogs: { key: "blogs", label: "Blogs", href: "/blogs" },
  careers: { key: "careers", label: "Careers", href: "/careers" },
  consultation: {
    key: "consultation",
    label: "Get Free Consultation",
    href: "/consultation",
    featured: true,
  },
  privacy: {
    key: "privacy",
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  terms: { key: "terms", label: "Terms", href: "/terms" },
  sitemap: { key: "sitemap", label: "Sitemap", href: "/sitemap" },
} as const satisfies Record<NavigationKey, NavigationItem>;

export const mainNavigation = [
  routeNavigation.home,
  routeNavigation.about,
  routeNavigation.services,
  routeNavigation.products,
  routeNavigation.projects,
  routeNavigation.partners,
  routeNavigation.blogs,
  routeNavigation.careers,
] as const;

export const consultationNavigation = routeNavigation.consultation;

export const legalNavigation = [
  routeNavigation.privacy,
  routeNavigation.terms,
  routeNavigation.sitemap,
] as const;

export const mobilePrimaryNavigation = [
  { ...routeNavigation.home, icon: "home" },
  { ...routeNavigation.services, icon: "services" },
  { ...routeNavigation.products, icon: "products" },
  { ...routeNavigation.projects, icon: "projects" },
] as const satisfies readonly MobileNavigationItem[];

export const mobileMoreNavigation = [
  routeNavigation.about,
  routeNavigation.partners,
  routeNavigation.blogs,
  routeNavigation.careers,
] as const;

export const companyNavigation = [
  routeNavigation.about,
  routeNavigation.projects,
  routeNavigation.partners,
  routeNavigation.careers,
  routeNavigation.blogs,
] as const;
