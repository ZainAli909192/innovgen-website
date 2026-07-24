# 01 — Sitemap and Route Architecture

## Final Navbar
| Position | Item | Route | Navigation Type |
|---|---|---|---|
| Left | InnovGen Logo | `/` | Home link |
| Center | Home | `/` | Direct |
| Center | About | `/about` | Direct |
| Center | Services | `/services` | Mega menu |
| Center | Products | `/products` | Mega menu |
| Center | Projects | `/projects` | Direct |
| Center | Partners | `/partners` | Direct |
| Center | Blogs | `/blogs` | Direct |
| Center | Careers | `/careers` | Direct |
| Right | Get Free Consultation | `/consultation` | Primary CTA |

## Route Tree
| Level | Route | Purpose |
|---|---|---|
| 1 | `/` | Homepage |
| 1 | `/about` | Company overview |
| 1 | `/services` | Services listing |
| 2 | `/services/[slug]` | Scalable service detail template |
| 1 | `/products` | Product ecosystem |
| 2 | `/products/[slug]` | Product detail template |
| 1 | `/projects` | Projects and case studies |
| 2 | `/projects/[slug]` | Project case-study template |
| 1 | `/partners` | Technology and strategic partners |
| 1 | `/blogs` | Blog index |
| 2 | `/blogs/[slug]` | Blog detail |
| 2 | `/blogs/category/[slug]` | Category archive |
| 1 | `/careers` | Employer brand and vacancies |
| 2 | `/careers/[slug]` | Job detail |
| 1 | `/consultation` | Consultation conversion page |
| 1 | `/privacy-policy` | Privacy policy |
| 1 | `/terms` | Terms and conditions |
| 1 | `/sitemap` | Human-readable sitemap |
| 1 | `/404` | Branded error experience |

## Scalability Rules
| Rule | Requirement |
|---|---|
| Dynamic content | Service, product, project, blog, and career details use dynamic routes |
| Localization readiness | All routes and content models must support future `/en` and `/ar` prefixes |
| CMS readiness | Page data must be separated from presentation components |
| Navigation | Generated from typed configuration rather than hard-coded repeatedly |
| Breadcrumbs | Automatically generated from route metadata |
| SEO | Every route exposes title, description, canonical URL, OG data, and schema |
| Future portals | Architecture must allow `/client`, `/partner`, or `/admin` without restructuring public routes |
