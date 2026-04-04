# Design System & Visual Choices

This document defines the aesthetic philosophy for the DBF website. The core goal is a **white, bright, and organic** feel that avoids the telltale signs of AI-generated templates.

---

## 1. Core Aesthetic Principles

| Principle | Description |
| :--- | :--- |
| **Intentional Imperfection** | Slightly varied spacing, hand-drawn elements, and photos with natural tilt break the "too tidy" AI look. |
| **Warmth Over Sterility** | Use off-white backgrounds (`#FAFAFA`, `#F5F5F5`) instead of pure `#FFFFFF`. |
| **Human Touch** | Favor real photos of the team and planes over stock images or illustrations. |
| **Seamless Flow** | The user should feel they are on one continuous page, not discrete blocks. |

---

## 2. Color Palette

A restrained palette keeps the focus on content.

| Swatch | Hex | Usage |
| :--- | :--- | :--- |
| **White (Primary BG)** | `#FAFAFA` | Main background |
| **Soft Gray** | `#E5E5E5` | Borders, subtle dividers |
| **Deep Navy** | `#1A2A40` | Primary text, headings |
| **Accent Gold** | `#C9A227` | Highlights, links, CTAs (school color?) |
| **Sky Blue** | `#A8D0E6` | Subtle accents, hover states |

> [!NOTE]
> If the school has official brand colors, swap **Accent Gold** for the primary brand color. Keep it to **one** accent.

---

## 3. Typography

Avoid the "heavy, clean, sans-serif" AI default. Mix weights and introduce a personality font.

| Role | Font | Weight | Style |
| :--- | :--- | :--- | :--- |
| **Display Headings** | `Playfair Display` | 700 | Serif, editorial feel |
| **Body Text** | `Inter` | 400, 500 | Clean, readable |
| **Captions / Handwritten** | `Caveat` | 400 | For Polaroid captions, annotations |

**Hierarchy:**
- H1: `Playfair Display`, 64px, Navy
- H2: `Playfair Display`, 40px, Navy
- Body: `Inter`, 18px, `#333`
- Caption: `Caveat`, 20px, `#555`

---

## 4. Spacing & Layout Philosophy

The goal is to **break the grid** subtly.

- **Asymmetric Margins**: Content blocks don't always align to a center grid. A photo might bleed to the edge on one side.
- **Generous Whitespace**: Let sections breathe. Avoid cramming elements.
- **Variable Section Heights**: Not every section needs to be the same viewport height.

**Anti-Pattern Checklist (Things to Avoid):**
- [x] Perfectly symmetrical 3-column grids
- [x] Uniform card sizes in a row
- [x] Hero → Features → Testimonials → Footer sequence
- [x] Pill-shaped buttons with large border-radius

---

## 5. UI Elements

### Buttons
- **Shape**: Slightly rounded rectangle (`border-radius: 6px`), NOT pill-shaped.
- **Hover**: Subtle background color shift and `translateY(-2px)` lift.
- **Primary**: Filled with Accent Gold, Navy text.
- **Secondary**: Outlined with Navy border, transparent fill.

### Cards (if used)
- **Avoid** uniform card grids.
- If a card is needed, give it a slight rotation and a paper texture.

### Icons
- Use custom SVG icons if possible, or a refined set like **Feather Icons** (not FontAwesome).

---

## 6. Imagery

| Type | Source | Treatment |
| :--- | :--- | :--- |
| **Team Photos** | Real photos from competition/lab | Light color grade for warmth |
| **Aircraft Photos** | Real photos of past planes | Polaroid frame, slight tilt |
| **Hero Frames** | Rendered/Animated sequence | High quality `.webp` |

> [!IMPORTANT]
> Avoid using stock photos or AI-generated faces. Authenticity is key.

---

## 7. Motion & Interaction

- **Scroll Animations**: Should feel "earned." Content fades in gently as it enters the viewport, not all at once.
- **Timing**: Use `ease-out` curves. Animations should be quick (300-500ms) but not jarring.
- **Hover States**: Subtle lifts, shadow changes, or color shifts. No spinning logos or pulsing buttons.

---

## Summary

The website should feel like a **well-designed magazine spread** or a **premium product launch page**, not a Wix template. Every element should look like a deliberate choice, not a default setting.
