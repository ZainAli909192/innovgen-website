# 09 — Product Requirements Document

## 1. Product Summary
| Item | Definition |
|---|---|
| Product | InnovGen corporate 3D website |
| Phase | Phase 1 frontend-first |
| Primary objective | Present InnovGen as a premium, scalable technology partner and generate qualified consultation leads |
| Primary users | Business owners, enterprise decision-makers, procurement teams, partners, job applicants |
| Platform | Responsive web |
| Core technology | Next.js, TypeScript, Tailwind, Motion, React Three Fiber |
| Backend plan | Supabase initially; NestJS when complexity warrants |

## 2. Business Goals
| Goal | Measurement |
|---|---|
| Strengthen brand perception | Qualitative stakeholder/user testing |
| Increase consultation leads | CTA clicks and completed submissions after backend launch |
| Explain services clearly | Service engagement and navigation paths |
| Prove credibility | Project, partner and testimonial engagement |
| Improve discoverability | Organic impressions and indexed pages |
| Support growth | New content types added without redesigning architecture |

## 3. Functional Requirements
| ID | Requirement | Priority |
|---|---|---|
| FR-001 | Sticky responsive navbar with finalized items | Must |
| FR-002 | Animated 3D homepage hero | Must |
| FR-003 | Page-level sections defined in structure document | Must |
| FR-004 | Dynamic service/product/project/blog/job templates | Must |
| FR-005 | Project and blog filtering | Must |
| FR-006 | Multi-step consultation form frontend | Must |
| FR-007 | Reduced-motion alternative | Must |
| FR-008 | Static fallback when WebGL fails | Must |
| FR-009 | Responsive mobile menu | Must |
| FR-010 | SEO metadata and structured data | Must |
| FR-011 | CMS-ready content adapters | Must |
| FR-012 | Arabic-ready architecture | Should |
| FR-013 | Search | Could |
| FR-014 | Newsletter UI | Should |
| FR-015 | Job application UI | Should |

## 4. Non-Functional Requirements
| ID | Requirement |
|---|---|
| NFR-001 | TypeScript strict mode |
| NFR-002 | WCAG 2.2 AA target |
| NFR-003 | Core content usable without WebGL |
| NFR-004 | 3D assets dynamically loaded |
| NFR-005 | No paid animation dependency required |
| NFR-006 | Components reusable and documented |
| NFR-007 | Automated tests for critical flows |
| NFR-008 | Production errors captured by monitoring solution |
| NFR-009 | Secure environment variable practices |
| NFR-010 | Scalable content model and route design |

## 5. User Stories
| Persona | Story | Acceptance |
|---|---|---|
| Decision-maker | I want to understand services quickly | Service categories visible within two meaningful interactions |
| Prospect | I want evidence of results | Projects show challenge, solution, technology and result |
| Product buyer | I want to evaluate products | Product features, deployment, integrations and demo CTA available |
| Partner | I want to understand partnership opportunities | Partner types and inquiry CTA available |
| Applicant | I want to find relevant roles | Roles filterable and details readable on mobile |
| Accessibility user | I need reduced motion | Site remains complete with animations reduced |
| Low-end device user | I need fast access | Poster fallback and reduced scene quality load automatically |

## 6. Analytics Events
| Event | Trigger |
|---|---|
| `consultation_cta_click` | Main CTA clicked |
| `consultation_step_complete` | Form step completed |
| `service_view` | Service detail viewed |
| `product_demo_click` | Demo CTA clicked |
| `project_view` | Case study opened |
| `partner_inquiry_click` | Partner CTA clicked |
| `career_view` | Job opened |
| `blog_read_depth` | Article depth milestones |
| `webgl_fallback` | Static fallback activated |
| `reduced_motion_active` | Reduced motion detected |

## 7. Performance Acceptance
| Metric / Area | Requirement |
|---|---|
| LCP | Target good Core Web Vitals on representative devices |
| CLS | Minimal layout shift; reserve canvas and media space |
| INP | Interactions remain responsive while 3D is active |
| Canvas | Pauses when hidden/offscreen |
| Assets | Models and textures compressed |
| Mobile | Lower-quality scene mode |
| Loading | HTML and CTA visible independently of 3D |

## 8. Content Dependencies
| Dependency | Owner Needed |
|---|---|
| Approved company profile | Client |
| Exact service list | Client |
| Product names/features | Client |
| Projects and verified results | Client |
| Partner permissions/logos | Client |
| Certifications | Client |
| Team/career content | Client |
| Contact/legal details | Client |
| Brand assets | Design team |

## 9. Risks and Mitigation
| Risk | Mitigation |
|---|---|
| 3D reduces performance | One canvas, adaptive DPR, lazy scenes, fallback |
| Excess motion harms usability | Motion governance and reduced-motion |
| Missing client content | Structured placeholder plan and content deadline |
| Scope expansion | Route and component change-control process |
| Backend delayed | Mock adapters and stable API contracts |
| Future Arabic layout | Logical CSS properties and localization-ready data |
| SEO hidden behind canvas | Keep all meaningful content in HTML |

## 10. Launch Acceptance
| Area | Pass Condition |
|---|---|
| Navigation | All links and active states correct |
| Pages | All approved sections present |
| Forms | Validation and mock success/error states |
| Accessibility | Keyboard, contrast, semantics, reduced motion |
| Browsers | Current Chrome, Edge, Firefox, Safari; mobile Safari/Chrome |
| Performance | Meets agreed budget on test devices |
| SEO | Metadata, schema, sitemap, canonical |
| Handover | Source, setup guide, asset list, architecture docs |
