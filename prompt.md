# DBF Website Build Prompt

> **Purpose**: This document is a structured prompt for an LLM to build the Design/Build/Fly website. It uses Chain of Thought (stepwise) techniques with explicit checkpoints after each task.

---

## Role & Context

You are an expert front-end developer specializing in modern, high-performance websites. You will build a single-page website for a university Design/Build/Fly team.

**Tech Stack:**
- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS (NO Tailwind)
- **Animation**: GSAP + ScrollTrigger + Flip plugins
- **Smooth Scroll**: Lenis

**Reference Documents (READ THESE FIRST):**
1. `competition_guide.md` – Context on the competition and competitor websites.
2. `design_choices.md` – Color palette, typography, spacing, anti-AI patterns.
3. `gimmicks.md` – Scroll animations, Polaroid gallery, accordion team navigation.
4. `website_layout.md` – Section-by-section breakdown with transitions.

**Asset Locations:**
- Hero animation frames: `ezgif-split/` (310 `.gif` frames, rename to `.webp` and sequence as `frame_001.webp` to `frame_310.webp`)
- Team photos: Use placeholder from `https://picsum.photos/` for now (e.g., `https://picsum.photos/400/300`)
- Aircraft photos: Use placeholder from `https://picsum.photos/` for now

---

## What We Want

| Priority | Requirement |
| :--- | :--- |
| **P0** | A seamless, scroll-driven journey that cascades naturally between sections. |
| **P0** | The hero canvas animation must scrub smoothly tied to scroll position. |
| **P0** | "DESIGN", "BUILD", "FLY" text appears sequentially during hero scroll. |
| **P0** | White/bright aesthetic with subtle, organic details (see `design_choices.md`). |
| **P1** | Polaroid-style gallery with horizontal scroll triggered by vertical scroll. |
| **P1** | Accordion slider for 7 teams (not a card grid). |
| **P1** | Social CTA section with Instagram and LinkedIn links. |
| **P2** | Responsive design (mobile-friendly). |

---

## What to Avoid (Anti-Patterns)

These patterns make a website look AI-generated. **DO NOT DO THESE:**

- [ ] Uniform card grids with identical sizing
- [ ] Hero → Features → Testimonials → Footer sequence
- [ ] Pill-shaped buttons (`border-radius: 9999px`)
- [ ] Soft "aurora" gradients as backgrounds
- [ ] Stock icons from FontAwesome or Material Icons
- [ ] Generic stock photos or AI-generated faces
- [ ] Fade-in animations on *every* element
- [ ] Perfectly symmetrical layouts
- [ ] Over-consistent spacing (same padding everywhere)

---

## What to Focus On

- **Intentional Imperfection**: Slight rotation on Polaroid cards, asymmetric layouts.
- **Human Touch**: Real photos, handwritten-style captions (Caveat font).
- **Performance**: Preload hero frames, lazy-load other images.
- **Accessibility**: Semantic HTML, proper heading hierarchy, alt text.
- **Code Quality**: Component-based architecture, clear naming, comments.

---

## Task Breakdown (Chain of Thought)

Complete each task **one at a time**. After each task, stop and perform the checkpoint. Do not proceed until the checkpoint passes.

---

### Task 1: Project Setup

**Goal**: Initialize a Next.js 14 project with required dependencies.

**Steps:**
1. Run `npx -y create-next-app@latest ./ --js --app --no-tailwind --no-eslint --no-src-dir --import-alias "@/*"` (non-interactive).
2. Install GSAP: `npm install gsap @studio-freight/lenis`
3. Create folder structure:
   ```
   /app
     /page.js
     /layout.js
     /globals.css
   /components
     /Hero.js
     /WhoWeAre.js
     /PolaroidGallery.js
     /MeetTheTeams.js
     /SocialCTA.js
     /Footer.js
   /public
     /frames (copy ezgif-split frames here, renamed)
     /images
   ```

**Checkpoint 1:**
- [ ] `npm run dev` starts without errors
- [ ] Browser shows default Next.js page at `http://localhost:3000`

---

### Task 2: Global Styles & Design Tokens

**Goal**: Implement the design system from `design_choices.md`.

**Steps:**
1. In `globals.css`, define:
   - CSS custom properties for colors, fonts, spacing
   - Import Google Fonts: Playfair Display, Inter, Caveat
   - Base resets (box-sizing, margins)
2. Set `html` background to `#FAFAFA`.

**Checkpoint 2:**
- [ ] Page background is off-white (`#FAFAFA`)
- [ ] Fonts load correctly (check Network tab)

---

### Task 3: Hero Section (Canvas + Scroll Animation)

**Goal**: Implement the scroll-scrubbed image sequence.

**Steps:**
1. In `Hero.js`:
   - Create a `<canvas>` element, `position: fixed`, covering viewport.
   - Preload all 310 frames into an array of `Image` objects.
   - Use GSAP ScrollTrigger with `scrub: true` to draw the correct frame on scroll.
   - Pin the canvas for the duration of the scroll (300vh).
2. Add text overlays ("DESIGN", "BUILD", "FLY") that fade in/out at 0-33%, 33-66%, 66-100% scroll progress.
3. Unpin and fade out canvas at end.

**Checkpoint 3:**
- [ ] Scrolling through hero section plays the frame sequence forward/backward
- [ ] Text appears in sequence: DESIGN → BUILD → FLY
- [ ] Canvas unpins after animation completes

---

### Task 4: "Who We Are" Section

**Goal**: Introduce the team with asymmetric layout.

**Steps:**
1. In `WhoWeAre.js`:
   - Two-column layout (text left, image right).
   - Use `Playfair Display` for heading, `Inter` for body.
   - Animate text fade-in from left, image slide-in from right (on-scroll).
2. Use a placeholder image: `https://picsum.photos/600/400`.

**Checkpoint 4:**
- [ ] Section displays with correct typography
- [ ] Scroll animation triggers as section enters viewport

---

### Task 5: Polaroid Gallery

**Goal**: Horizontal photo strip with organic styling.

**Steps:**
1. In `PolaroidGallery.js`:
   - Create a horizontal container with 6-8 Polaroid cards.
   - Each card: thick white border, slight random rotation, handwritten caption (Caveat).
   - Use GSAP horizontal scroll pattern (vertical scroll → horizontal movement).
2. Use placeholder images: `https://picsum.photos/300/300?random=N`.

**Checkpoint 5:**
- [ ] Vertical scroll triggers horizontal gallery movement
- [ ] Cards have varied rotations (not all aligned)
- [ ] Captions display in Caveat font

---

### Task 6: Meet the Teams (Accordion Slider)

**Goal**: Interactive accordion for 7 teams.

**Steps:**
1. In `MeetTheTeams.js`:
   - Create 7 narrow vertical panels side-by-side.
   - On hover/click, expand the selected panel (others shrink).
   - Use GSAP Flip plugin for smooth layout transition.
   - Each expanded panel shows: team icon, name, description.
2. Define 7 teams: Aerodynamics, Structures, Propulsion, Manufacturing, Electronics, Payload, Business.

**Checkpoint 6:**
- [ ] Clicking a panel expands it smoothly
- [ ] Other panels shrink proportionally
- [ ] All 7 teams are navigable

---

### Task 7: Social CTA Section

**Goal**: Call-to-action for Instagram and LinkedIn.

**Steps:**
1. In `SocialCTA.js`:
   - Full-width section with background placeholder image (blurred/overlayed).
   - Centered heading: "Follow Our Journey".
   - Two large icons: Instagram, LinkedIn (custom SVGs or simple images).
   - Hover: subtle lift and shadow.

**Checkpoint 7:**
- [ ] Section displays with background image
- [ ] Icons are visible and link to `#` (placeholder URLs)
- [ ] Hover effect works

---

### Task 8: Footer

**Goal**: Simple footer with logo and links.

**Steps:**
1. In `Footer.js`:
   - Dark background (`#1A2A40`), white text.
   - Logo, copyright, and links (About, Contact – placeholder `#`).

**Checkpoint 8:**
- [ ] Footer displays with correct colors
- [ ] Links are functional (even if leading to `#`)

---

### Task 9: Integrate All Sections

**Goal**: Assemble the full page in `page.js`.

**Steps:**
1. Import all components.
2. Render in order: Hero, WhoWeAre, PolaroidGallery, MeetTheTeams, SocialCTA, Footer.
3. Ensure Lenis smooth scroll is initialized in `layout.js`.

**Checkpoint 9:**
- [ ] Full page scrolls smoothly from top to bottom
- [ ] All sections transition seamlessly
- [ ] No console errors

---

### Task 10: Polish & Responsiveness

**Goal**: Refine for mobile and add final touches.

**Steps:**
1. Add media queries for:
   - Hero text size
   - Polaroid gallery (vertical stack on mobile)
   - Accordion (expandable list on mobile)
2. Test on 375px viewport width.

**Checkpoint 10:**
- [ ] No horizontal overflow on mobile
- [ ] All content is readable
- [ ] Touch interactions work

---

## Self-Review Checklist (Final)

Before declaring the website complete, answer these questions:

1. [ ] Does the hero animation play smoothly tied to scroll?
2. [ ] Do the sections flow together like a "journey"?
3. [ ] Is there any visible "card grid" pattern? (If yes, fix it)
4. [ ] Are all fonts loading correctly?
5. [ ] Is the website responsive on mobile?
6. [ ] Are there any console errors or warnings?
7. [ ] Does the website look AI-generated? (If yes, add imperfections)

---

## Appendix: File References

| File | Purpose |
| :--- | :--- |
| `competition_guide.md` | Competition context and competitor analysis |
| `design_choices.md` | Visual design system |
| `gimmicks.md` | Interactive techniques |
| `website_layout.md` | Section flow and transitions |
| `ezgif-split/` | 310 hero animation frames |
