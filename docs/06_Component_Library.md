# 06 — Component Library

## Global Components
| Component | Variants / Features |
|---|---|
| Header | transparent, solid-on-scroll, mobile drawer, active route |
| MegaMenu | services/products columns, featured link |
| Footer | navigation, contact, social, newsletter, legal |
| Button | primary, secondary, ghost, icon, loading |
| Container | standard, wide, full-bleed |
| SectionHeader | eyebrow, title, description, alignment |
| Breadcrumbs | schema-enabled |
| LanguagePlaceholder | future EN/AR architecture |
| ThemeProvider | dark-first; optional future light mode |
| MotionProvider | reduced-motion and global transitions |

## 3D Components
| Component | Responsibility |
|---|---|
| GlobalCanvas | Single persistent canvas |
| SceneRouter | Activates scene by route/section |
| AdaptiveDPR | Controls resolution |
| PerformanceMonitor | Reduces effects when frame rate drops |
| Model | Standard GLB loader and fallback |
| ParticleField | Reusable optimized particles |
| BrandCore | Main IG emblem scene |
| CameraRig | Scroll and pointer camera controls |
| SceneLighting | Shared light presets |
| PosterFallback | Static alternative |
| CanvasErrorBoundary | Graceful failure state |

## Content Components
| Component | Usage |
|---|---|
| ServiceCard | Service indexes and related content |
| ProductCard | Products |
| ProjectCard | Portfolio |
| BlogCard | Blog grids |
| PartnerLogo | Partner display |
| TestimonialCard | Social proof |
| Metric | Counters and proof values |
| Timeline | Company/process milestones |
| TechnologyBadge | Stack |
| FAQAccordion | FAQs |
| CTASection | Conversion section |
| ContactBlock | Contact information |
| FilterBar | Projects/blogs/products |
| Pagination | Index pages |

## Forms
| Component | Requirement |
|---|---|
| TextField | Label, hint, errors |
| SelectField | Native-accessible select |
| TextArea | Character guidance |
| Checkbox | Consent and options |
| FileUpload | Careers only; phase-two backend ready |
| Stepper | Consultation form |
| FormStatus | Success/error/loading |
| Honeypot | Basic spam mitigation in phase two |
| Validation | Shared schema using Zod |

## Component API Rules
| Rule | Requirement |
|---|---|
| TypeScript | Strict props |
| Composition | Prefer slots/children over page-specific duplication |
| Styling | Tailwind tokens and class composition |
| Animation | Optional `motionPreset`; never mandatory |
| Data | Components receive typed data and do not fetch unless designated |
| Testing | Critical components have unit and accessibility tests |
| Storybook | Recommended for isolated documentation |
