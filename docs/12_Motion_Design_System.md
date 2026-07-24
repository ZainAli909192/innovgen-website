# 12 — Motion Design System

Version: 1.0

## Purpose

This document defines the complete motion language for the InnovGen website.

## 1. Motion Philosophy

| Principle | Rule |
|---|---|
| Story First | Motion supports the narrative. |
| Purposeful | Every animation communicates something useful. |
| Elegant | Premium enterprise feeling. |
| Accessible | Respect reduced-motion preferences. |
| Performant | Smooth on desktop and mobile. |

## 2. Motion Hierarchy

| Level | Usage |
|---|---|
| 0 | Static pages |
| 1 | Hover interactions |
| 2 | Reveal animations |
| 3 | Scroll-linked DOM animation |
| 4 | 3D storytelling |
| 5 | Cinematic hero |

## 3. Duration Tokens

| Token | Duration |
|---|---:|
| instant | 80ms |
| fast | 150ms |
| normal | 300ms |
| medium | 500ms |
| slow | 700ms |
| cinematic | 1200ms |

## 4. Easing

- Standard: cubic-bezier(0.22,1,0.36,1)
- Smooth: cubic-bezier(0.25,0.1,0.25,1)
- Exit: cubic-bezier(0.4,0,1,1)

## 5. Motion Presets

- FadeIn
- FadeUp
- FadeDown
- SlideLeft
- SlideRight
- ScaleIn
- Stagger
- RevealMask
- CountUp
- Floating

## 6. Scroll Rules

- Keep native scrolling.
- Use Lenis only for smoothing.
- Never hijack scrolling.
- Maximum two pinned storytelling sections.

## 7. Page Transitions

- Fast fade out.
- Progressive reveal.
- Persistent header.

## 8. Text Animation

- Hero: word reveal
- Heading: fade + translate
- Paragraph: fade
- CTA: scale + fade
- Statistics: count up

## 9. Cards

- Elevation
- Soft shadow
- Border glow
- Scale 1.02 on hover

## 10. Buttons

- Background transition
- Glow
- Scale

## 11. Navigation

Desktop:
- Sticky transition
- Active underline

Mobile:
- Bottom tab animation
- More sheet

## 12. Footer

- Gentle reveal
- Link underline
- Newsletter success animation

## 13. Loading

- Skeletons
- Poster fallback
- Logo pulse

## 14. Cursor

Desktop enhancements only.
Never replace native cursor.

## 15. 3D Rules

- React Three Fiber
- One shared canvas
- HTML text outside canvas

## 16. Reduced Motion

- Disable parallax
- Disable particles
- Static poster
- Fade only

## 17. Mobile Motion

- Reduced particles
- Simpler reveals
- Short durations

## 18. Performance

- One canvas
- Adaptive DPR
- Pause offscreen animation
- Lazy-load models

## 19. QA Checklist

- Native scroll
- Reduced motion
- No layout shift
- Keyboard accessible
- Responsive
- No console errors

## 20. Codex Rules

1. Read AGENTS.md
2. Read this document
3. Reuse motion presets
4. Don't invent timing values
5. Run lint
6. Run type-check
7. Run production build

## Recommended Structure

```text
src/
  lib/motion/
    variants.ts
    transitions.ts
    easing.ts
    presets.ts

  components/motion/
    AnimatedSection.tsx
    FadeIn.tsx
    FadeUp.tsx
    Reveal.tsx
    Stagger.tsx
    CountUp.tsx
    PageTransition.tsx
```
