# 04 — 3D and Scroll Animation Plan

## Free Tooling
| Tool | Role |
|---|---|
| Three.js | WebGL rendering foundation |
| React Three Fiber | React renderer for Three.js |
| Drei | Reusable R3F helpers |
| Motion for React | UI, layout, gesture, and scroll animations |
| Lenis | Smooth-scroll behavior |
| GSAP core + ScrollTrigger | Optional complex timelines; use only after confirming current licensing requirements |
| Theatre.js | Optional visual timeline authoring |
| Blender | Free 3D modeling and optimization |
| glTF / GLB | Standard optimized web 3D format |
| Spline free tier | Optional prototyping only; export/hosting constraints must be checked |

## Animation Architecture
| Layer | Responsibility |
|---|---|
| CSS | Simple hover, focus, color, and micro-transitions |
| Motion | Component entrance, exit, layout, counters, SVG, UI scroll effects |
| R3F/Three.js | 3D scenes, materials, camera, particles |
| Lenis | Scroll interpolation |
| Scroll orchestration | Central hook maps scroll progress to MotionValues and scene state |
| Reduced motion | Static states and short fades only |

## Scene Plan
| Page | Scene | Behavior |
|---|---|---|
| Home Hero | InnovGen Core | Rotating ring/network with IG identity; pointer depth; scroll camera pullback |
| Home Services | Service Constellation | Nodes reveal as services enter viewport |
| Home Industries | Industry Orbit | Pinned section; orbit changes with scroll |
| Home Products | Product Stage | Device and dashboard planes rotate gently |
| Home Projects | Case-study Corridor | Horizontal scroll with controlled depth |
| About | Timeline Tunnel | Camera advances across milestones |
| Services | Capability Grid | 3D tile field with selected-service focus |
| Products | Product Lab | Each product activates a distinct scene state |
| Projects | Portfolio Wall | Cards sit in a virtual gallery with DOM-based content |
| Partners | Partner Network | Logos connected through subtle lines |
| Careers | People and Ideas | Abstract particles form team-oriented shapes |
| Consultation | Portal CTA | Calm ring/portal converges toward form |

## Scroll Choreography
| Step | Rule |
|---|---|
| Entry | Fade/translate content before 3D camera movement |
| Pinned scenes | Use only for major storytelling sections |
| Duration | One concept per viewport; avoid excessively long pinning |
| Text | Remains selectable and DOM-based |
| Camera | Use gentle movement; no rapid rotation |
| Exit | Settle scene before next section |
| Navigation | Anchor jumps must work with smooth scrolling disabled |
| Restoration | Browser back/forward must restore sensible scroll position |

## Performance Budgets
| Item | Target |
|---|---:|
| Initial 3D JS loaded on homepage | As low as practical; dynamically imported |
| Hero GLB | Prefer under 1.5 MB compressed |
| Secondary scene GLB | Prefer under 800 KB each |
| Textures | WebP/AVIF or KTX2; typically 1K maximum |
| Draw calls | Prefer under 100 per active scene |
| Mobile particles | Typically under 500 |
| Desktop particles | Typically under 2,000 unless benchmarked |
| Active canvases | Prefer one global canvas |
| DPR | Adaptive, usually capped at 1.5–2 |
| Offscreen animation | Paused |

## 3D Asset Pipeline
| Stage | Requirement |
|---|---|
| Model | Create low-poly base in Blender |
| Materials | Prefer baked or simple PBR materials |
| UV | Atlas where possible |
| Textures | Compress and resize |
| Export | GLB with clean naming |
| Compression | Draco or Meshopt |
| Runtime | Preload only critical hero assets |
| Fallback | Export matching poster image |
| QA | Test low-end Android, iPhone Safari, integrated GPUs |

## Forbidden Patterns
| Pattern | Reason |
|---|---|
| Multiple uncontrolled canvases | Memory and performance cost |
| 3D text for body copy | Accessibility and sharpness |
| Scroll hijacking | Poor usability |
| Heavy bloom everywhere | Reduces premium quality and readability |
| Continuous animation offscreen | Battery and CPU waste |
| Loading screen longer than necessary | Conversion risk |
