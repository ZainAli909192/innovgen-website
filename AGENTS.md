# AGENTS.md — InnovGen Website

## Project Objective

Build a premium, scalable and highly interactive 3D corporate website for
InnovGen IT Software Solutions.

The website must use storytelling, smooth scroll-linked animation and
high-performance 3D experiences while remaining accessible, responsive,
SEO-friendly and usable on lower-powered devices.

## Required Stack

- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- Motion for React
- Three.js
- React Three Fiber
- Drei
- Lenis
- React Hook Form
- Zod
- Zustand only when shared client state is necessary
- Lucide React

Do not introduce paid libraries or services.

## Architecture Rules

- Use Server Components by default.
- Use Client Components only where interaction requires them.
- Dynamically import all WebGL and 3D scenes.
- Use one shared global canvas where practical.
- Keep all meaningful text in the HTML DOM.
- Never place important content only inside WebGL.
- Separate content data from visual components.
- Build reusable page sections instead of page-specific duplication.
- Keep service, product, project, blog and career pages CMS-ready.
- Prepare for future English and Arabic localization.
- Use logical CSS properties where practical.
- Use TypeScript strict mode with no avoidable `any`.
- Do not hardcode repeated navigation or page data.

## Design Rules

- Follow `/docs/03-ui-ux-design-system.md`.
- Brand colors are navy, blue and controlled gold accents.
- The visual style must feel enterprise, premium and futuristic.
- Avoid gaming aesthetics.
- Avoid excessive glow, bloom or glassmorphism.
- Use Outfit for display headings and Geist or Inter for body text.
- Every section must have one clear visual focus.
- Every page must have one primary conversion objective.

## Motion Rules

- Motion must support storytelling, hierarchy or feedback.
- Use CSS for simple hover transitions.
- Use Motion for React for UI, layout and scroll animation.
- Use React Three Fiber for 3D animation.
- Use Lenis only for restrained smooth scrolling.
- Never hijack scrolling.
- Avoid long pinned sections without a clear narrative purpose.
- Respect `prefers-reduced-motion`.
- Provide static alternatives for all major animated experiences.
- Pause animation when scenes are offscreen or the browser tab is hidden.

## Performance Rules

- Keep a visible HTML page while 3D loads.
- Dynamically import 3D.
- Compress GLB models and textures.
- Cap device pixel ratio.
- Reduce geometry, particles and effects on mobile.
- Avoid multiple concurrent WebGL canvases.
- Do not use continuous React state updates for animation.
- Use refs, MotionValues or frame loops where appropriate.
- Reserve layout space to prevent CLS.
- Test on mobile and integrated graphics.

## Accessibility Rules

- Target WCAG 2.2 AA.
- Use semantic HTML.
- Maintain correct heading hierarchy.
- All controls must be keyboard accessible.
- Focus states must remain visible.
- Minimum touch targets: 44 × 44 CSS pixels.
- Decorative canvas content must be hidden from screen readers.
- Provide text or image alternatives for meaningful visual scenes.
- Forms require labels, inline errors and error summaries.

## Working Process

Before implementing a major feature:

1. Read the relevant documents in `/docs`.
2. Inspect existing components and patterns.
3. Write a short implementation plan.
4. Implement the smallest complete unit.
5. Run lint, type-check and tests.
6. Review responsive behavior.
7. Report changed files, tests run and unresolved issues.

Do not rewrite unrelated files.
Do not mark work complete while linting, type checks or tests fail.