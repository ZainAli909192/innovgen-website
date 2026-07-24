# 07 — Technical Architecture

## Phase 1 Frontend Stack
| Layer | Recommendation |
|---|---|
| Framework | Next.js App Router + TypeScript |
| Styling | Tailwind CSS |
| UI animation | Motion for React, free feature set only |
| 3D | Three.js + React Three Fiber + Drei |
| Smooth scroll | Lenis |
| State | Local state first; Zustand only for shared interactive state |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Content | Typed local data/MDX adapters that can later point to CMS |
| Testing | Vitest, React Testing Library, Playwright |
| Quality | ESLint, Prettier, TypeScript strict mode |
| Deployment | Vercel free tier for staging; production plan based on traffic |
| Analytics | Privacy-friendly solution selected before launch |

## Frontend Folder Structure
```text
src/
  app/
    (marketing)/
      page.tsx
      about/
      services/
      products/
      projects/
      partners/
      blogs/
      careers/
      consultation/
    api/                 # optional phase-two route handlers
    sitemap.ts
    robots.ts
  components/
    ui/
    layout/
    sections/
    cards/
    forms/
    three/
  content/
    services/
    products/
    projects/
    blogs/
  config/
    navigation.ts
    site.ts
    motion.ts
  lib/
    seo/
    analytics/
    validation/
    utils/
  hooks/
  stores/
  styles/
  types/
public/
  models/
  textures/
  images/
```

## Rendering Strategy
| Content | Strategy |
|---|---|
| Marketing pages | Server Components by default |
| 3D scenes | Client Components, dynamic import, no SSR |
| Blog/project details | Static generation where possible |
| Filters | Client-side enhancement over server-rendered content |
| Forms | Client interaction with phase-two server endpoint |
| Metadata | Generated on server |
| Images | Next Image |
| Fonts | Next font |

## Future Backend Recommendation
| Stage | Architecture |
|---|---|
| Early production | Supabase: Postgres, Auth, Storage, Edge Functions |
| Growing business logic | Add NestJS API with Fastify adapter |
| Multi-application platform | NestJS modular monolith backed by PostgreSQL |
| High-scale workloads | Extract bounded services only when justified |
| Background work | Queue/worker layer added when required |
| Search | PostgreSQL full-text first; dedicated search later |
| CMS | Headless CMS or custom admin over Supabase based on editorial needs |

## Why Supabase First
| Benefit | Reason |
|---|---|
| Fast integration | Database, auth, storage, realtime and functions in one platform |
| Scalable data model | Real PostgreSQL |
| Security | Row Level Security |
| Portability | Open-source ecosystem and standard database |
| Cost control | Suitable for gradual adoption |
| Future API | NestJS can connect to the same PostgreSQL database |

## API Contract Preparation in Phase 1
| Endpoint | Frontend Contract |
|---|---|
| `GET /services` | service list |
| `GET /products` | product list |
| `GET /projects` | filtered projects |
| `GET /blogs` | articles and pagination |
| `GET /careers` | open positions |
| `POST /consultations` | lead submission |
| `POST /newsletter` | subscription |
| `POST /applications` | career application |
| `POST /partners/inquiries` | partner inquiry |

## Security Preparation
| Area | Requirement |
|---|---|
| Secrets | Never expose server keys in client bundle |
| Forms | Server validation required in phase two |
| Rate limits | Required for public write endpoints |
| Uploads | Type, size, malware, and storage policies |
| CSP | Plan script, image, and WebGL asset sources |
| Dependencies | Automated audit and update policy |
| Privacy | Consent and retention requirements documented |
