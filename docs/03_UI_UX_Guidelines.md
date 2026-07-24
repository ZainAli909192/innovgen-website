# 03 — UI/UX Guidelines

## Design Direction
| Area | Guideline |
|---|---|
| Brand mood | Premium, intelligent, futuristic, trustworthy |
| Visual language | Dark navy surfaces, controlled gold accents, electric-blue illumination |
| 3D style | Clean abstract technology forms rather than gaming aesthetics |
| Glass effects | Use sparingly; maintain contrast and readability |
| Motion | Smooth, purposeful, responsive, never decorative overload |
| Layout | Spacious enterprise layout with modular sections |
| Typography | Outfit for display; Inter or Geist for body/interface |
| Iconography | Lucide icons plus custom SVG symbols |
| Imagery | Real team/project imagery combined with abstract 3D visuals |

## Responsive Breakpoints
| Name | Width | Strategy |
|---|---:|---|
| Mobile S | 320–374px | Simplified 3D or static poster |
| Mobile | 375–767px | Single-column, touch-first |
| Tablet | 768–1023px | Reduced scene complexity |
| Desktop | 1024–1439px | Full interactions |
| Wide | 1440px+ | Controlled max-width; scenes may expand |

## Accessibility
| Requirement | Acceptance |
|---|---|
| Reduced motion | Respect `prefers-reduced-motion`; disable scroll scrubbing and heavy camera movement |
| Keyboard | Every interactive item reachable and visibly focused |
| Contrast | WCAG AA minimum for text and controls |
| Semantics | Correct headings, landmarks, buttons, links, labels |
| 3D alternatives | Equivalent text and static image fallback |
| Screen readers | Decorative canvas hidden; meaningful content remains in DOM |
| Touch targets | Minimum 44×44 CSS pixels |
| Forms | Clear labels, error summary, inline validation |
| Audio | No autoplay audio |

## Motion Design Tokens
| Token | Value |
|---|---|
| Fast | 120–180ms |
| Standard | 240–360ms |
| Emphasis | 500–800ms |
| Page reveal | 700–1100ms |
| Default easing | `[0.22, 1, 0.36, 1]` |
| Spring | Moderate damping, no excessive bounce |
| Scroll smoothing | Low-to-medium; preserve user control |

## Mobile 3D Rules
| Rule | Requirement |
|---|---|
| Geometry | Reduce polygon counts and particle density |
| DPR | Cap device pixel ratio |
| Shadows | Disable or simplify |
| Post-processing | Disable by default |
| Interaction | Replace pointer parallax with subtle device-independent motion |
| Loading | Poster image visible before canvas |
| Battery | Pause offscreen scenes and animation when tab is hidden |
