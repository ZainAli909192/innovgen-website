# 13 — 3D Scene Bible

Version: 1.0

## Purpose

This document is the master reference for every 3D experience on the InnovGen website.
It defines scene composition, camera choreography, lighting, optimization, interaction,
and implementation rules so every scene feels like part of one premium enterprise story.

---

# 1. Design Philosophy

- 3D must support storytelling.
- Never place readable body text inside WebGL.
- Abstract enterprise visuals only.
- Avoid gaming aesthetics.
- Calm, premium, intelligent motion.

---

# 2. Approved Technology

| Layer | Tool |
|---|---|
| Renderer | Three.js |
| React Integration | React Three Fiber |
| Helpers | Drei |
| Models | Blender |
| Scroll | Lenis + Motion |
| Compression | Draco / Meshopt |
| Textures | WebP / KTX2 |

---

# 3. Global Scene Rules

- One shared canvas where practical.
- Dynamic imports.
- Adaptive DPR.
- Pause when offscreen.
- Respect reduced motion.
- Poster fallback for unsupported devices.

---

# 4. Scene Inventory

| Page | Scene |
|---|---|
| Home | Hero Core |
| Home | Services Constellation |
| Home | Industry Orbit |
| Home | Product Stage |
| Home | Project Corridor |
| About | Timeline Tunnel |
| Services | Capability Grid |
| Products | Product Lab |
| Projects | Portfolio Gallery |
| Partners | Partner Network |
| Careers | Talent Field |
| Consultation | Conversion Portal |

---

# 5. Hero Scene

Purpose:
Position InnovGen as a premium enterprise technology company.

Composition:
- Gold IG mark
- Blue orbit rings
- Neural network
- Floating particles
- Glass panels

Camera:
- Starts close
- Slowly pulls back
- Very subtle pointer movement

Interaction:
- Desktop pointer parallax
- Mobile auto motion only

---

# 6. Services Scene

Show every service as part of one connected ecosystem.

Animation:
- Nodes activate
- Connections illuminate
- Camera remains stable

---

# 7. Industry Scene

Industries rotate around a central InnovGen core.

Each scroll segment highlights:

- Government
- Healthcare
- Finance
- Retail
- Manufacturing

---

# 8. Product Scene

Floating dashboard cards.

Slow rotation.

Minimal depth.

---

# 9. Project Corridor

Horizontal storytelling.

Challenge →
Solution →
Technology →
Results

---

# 10. Partner Scene

Connected network.

Partner nodes.

Certification highlights.

---

# 11. Careers Scene

Abstract particles form collaborative structures.

Warm lighting.

Human feeling.

---

# 12. Consultation Scene

Calm portal.

Motion converges toward CTA.

No distracting effects.

---

# 13. Camera Rules

| Rule | Requirement |
|---|---|
| Fast movement | Never |
| Sudden rotation | Never |
| Motion sickness | Avoid |
| Scroll mapping | Smooth |
| Idle motion | Very subtle |

---

# 14. Lighting

- HDRI
- Area lights
- Soft rim lights
- Minimal bloom

---

# 15. Materials

Approved:

- Glass
- Brushed metal
- Matte plastic
- Soft emissive accents

Avoid:

- Chrome overload
- Neon overload

---

# 16. Particle Rules

Desktop:
- 1500–2000 max

Tablet:
- 800 max

Mobile:
- 300–500 max

---

# 17. Performance Budget

| Item | Target |
|---|---|
| Hero GLB | <1.5MB |
| Other GLB | <800KB |
| Draw Calls | <100 |
| FPS | 60 target |
| Canvas | One |

---

# 18. Mobile Strategy

- Lower geometry
- Fewer particles
- Disable heavy shaders
- Poster fallback if needed

---

# 19. Asset Pipeline

Blender →
Optimize →
GLB →
Compress →
Test →
Deploy

Naming:

hero-core.glb
services-grid.glb
product-stage.glb

---

# 20. Folder Structure

```text
public/
  models/
    hero/
    services/
    products/
    projects/
  textures/
  hdri/

src/components/three/
  GlobalCanvas.tsx
  SceneManager.tsx
  CameraRig.tsx
  PerformanceController.tsx
  scenes/
```

# 21. QA Checklist

- WebGL fallback
- Mobile performance
- Reduced motion
- No layout shift
- No console errors
- Scene pauses offscreen
- Accessible HTML overlays
- Optimized assets

# 22. Codex Rules

Before implementing any scene:

1. Read AGENTS.md
2. Read this document
3. Use existing motion tokens
4. Reuse shared camera and lighting
5. Do not create a new Canvas
6. Lazy-load assets
7. Test desktop and mobile
8. Run lint
9. Run type-check
10. Run production build

# Future Expansion

Expand this document with:
- Camera keyframes
- Blender screenshots
- Scene timing diagrams
- Shader guidelines
- Material library
- Lighting presets
- Interaction diagrams
