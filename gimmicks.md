# Website Gimmicks & Interactive Techniques

This document outlines the key interactive patterns and "gimmicks" to implement for a memorable, hand-crafted experience. The goal is to avoid the polished, template-based aesthetic of AI-generated sites.

---

## 1. Hero Section: Scroll-Scrubbed Image Sequence

**The Concept:**
As the user scrolls, a series of pre-rendered images (e.g., 60-120 frames) are displayed on an HTML5 `<canvas>`. This creates the illusion of a video playing in sync with scroll position. This is the "Apple-style" effect.

**Implementation:**
- **Library**: GSAP with the **ScrollTrigger** plugin (`scrub: true`).
- **Assets**: A folder of numbered `.webp` images (e.g., `frame_001.webp` to `frame_100.webp`).
- **Behavior**: As the user scrolls through the hero section viewport, the canvas redraws the corresponding frame.
- **Text Overlay**: The words "DESIGN", "BUILD", "FLY" fade in/out at specific scroll progress percentages (e.g., 0-33%, 33-66%, 66-100%).

**Why It's Not AI-Like:**
AI builders cannot generate 100 custom frames or wire up a canvas animation. This is bespoke.

---

## 2. Polaroid Photo Gallery (Between Sections)

**The Concept:**
A horizontal "river" of photos that scrolls past as the user navigates. Each photo is styled like a physical Polaroid or Instax print: white border, slight tilt, handwritten-style caption.

**Implementation:**
- **CSS**: Use `transform: rotate()` with slight, random values (e.g., `-3deg` to `5deg`) on each card.
- **Animation**: Use GSAP `horizontal scroll` (a vertical scroll triggers horizontal movement of the photo strip).
- **Font**: Use a handwriting font like "Caveat" or "Indie Flower" for captions.
- **Texture**: Add a subtle paper grain texture overlay (a repeating `.png` with low opacity).

**Why It's Not AI-Like:**
It breaks the "uniform grid" pattern. The irregular rotation and handwritten font add organic imperfection.

---

## 3. "Meet the Teams" Navigation

**The Concept:**
A single, persistent visual (e.g., an aircraft schematic or a stylized team badge) that morphs or changes state as the user interacts. The user clicks or hovers on labeled hotspots to reveal content about each of the 7 teams.

**Options:**

| Pattern | Description | Pros |
| :--- | :--- | :--- |
| **Radial Menu** | Teams arranged in a circle around a central logo. Clicking one expands it. | Unique, compact, avoids cards. |
| **Accordion Slider** | Slim vertical strips side-by-side. Hovering one expands it to reveal content. | Elegant, no page jump. |
| **Tabbed Carousel** | A horizontal carousel with visual tabs (icons). Clicking a tab slides to that team's panel. | Good for mobile. |

**Recommended: Accordion Slider**
- 7 narrow panels, each with the team's icon/logo.
- On hover/click, the panel expands (others shrink) to show: team photo, description, lead name.
- Uses GSAP `Flip` plugin for smooth re-layout.

**Why It's Not AI-Like:**
It's an intentional, spatial interaction—not a grid of equal-sized cards.

---

## 4. Section Transitions: "The Journey"

**The Concept:**
Each section should feel connected. Instead of abrupt cuts, use subtle transitional elements.

**Techniques:**
- **Shared Color Bleed**: The bottom of one section has a gradient that bleeds into the top of the next (e.g., white fading to a very light off-white, then back to white).
- **"Sticky" Dividers**: A thin, hand-drawn line (SVG) that stays fixed as content scrolls past it, then releases.
- **Parallax Depth**: Background elements (like subtle aircraft silhouettes) move at a different scroll speed than foreground content.

---

## 5. Call-to-Action (Social Follow)

**The Concept:**
A friendly, non-pushy section that invites users to connect.

**Implementation:**
- **Headline**: "Follow Our Journey" or "Stay in the Loop".
- **Icons**: Large, simple Instagram and LinkedIn logos (not stock icon buttons).
- **Interaction**: On hover, the icon slightly lifts (`translateY`) and a subtle shadow appears. No garish color changes.
- **Background**: A full-bleed photo of the team (slightly blurred or with a light overlay) to add warmth.

---

## Summary of Libraries & Tools

| Tool | Purpose |
| :--- | :--- |
| **GSAP** | Core animation library |
| **ScrollTrigger** (GSAP Plugin) | Binding animations to scroll |
| **Flip** (GSAP Plugin) | Smooth layout transitions (for Accordion) |
| **Lenis** | Smooth native scrolling feel |
| **Three.js** (Optional) | If a 3D aircraft model is desired |
