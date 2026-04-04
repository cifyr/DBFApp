# Website Layout & Section Flow

This document provides a section-by-section breakdown of the website structure, describing content, interactions, and transitions.

---

## Site Map (Linear Flow)

```
[Hero: Scroll Animation]
        ↓
[Who We Are]
        ↓
[Polaroid Gallery: Past Planes]
        ↓
[Meet The Teams (Accordion)]
        ↓
[Call to Action: Social Follow]
        ↓
[Footer]
```

---

## Section 1: Hero

**Purpose**: Immediate visual impact. Establish the "Design, Build, Fly" identity.

| Attribute | Value |
| :--- | :--- |
| **Height** | 300vh (user scrolls through 3 viewport heights to complete the animation) |
| **Background** | Sticky HTML5 `<canvas>` covering the viewport |
| **Content** | Text overlays ("DESIGN", "BUILD", "FLY") that fade in/out based on scroll % |
| **Transition Out** | The final frame of the animation is the plane in flight, which cross-fades into the "Who We Are" section background. |

**Technical Notes:**
- The `<canvas>` is `position: fixed` during the scroll sequence.
- GSAP `ScrollTrigger.pin()` keeps it in place.
- Once the sequence completes, the canvas unpins and scrolls away.

---

## Section 2: Who We Are

**Purpose**: Introduce the team's identity and mission.

| Attribute | Value |
| :--- | :--- |
| **Height** | 100vh (or content-height + padding) |
| **Background** | Off-white (`#FAFAFA`) |
| **Layout** | Two-column: Text on left, large team photo on right (asymmetric) |
| **Animation** | Text fades in from left, photo slides in from right (on-scroll trigger) |

**Content:**
- Heading: "Who We Are"
- Paragraph: A brief mission statement (2-3 sentences).
- Subtext: A statistic or quote (e.g., "Competing since 2012").

---

## Section 3: Polaroid Gallery

**Purpose**: A visual "memory lane" of past aircraft. Acts as a transition and breathing room.

| Attribute | Value |
| :--- | :--- |
| **Height** | 100vh |
| **Scroll Behavior** | Horizontal scroll triggered by vertical scroll (GSAP `horizontal` pattern) |
| **Cards** | 5-8 Polaroid-style image cards |

**Card Anatomy:**
```
+---------------------+
|                     |
|      [Photo]        |  ← Photo of past plane
|                     |
+---------------------+
|  "The Blue Jay"     |  ← Handwritten caption (Caveat font)
|      2023           |  ← Year
+---------------------+
```

**Styling:**
- `background: white; padding: 10px 10px 40px 10px;` (thick bottom border for label)
- `box-shadow: 0 4px 15px rgba(0,0,0,0.1);`
- `transform: rotate(random(-5, 5)deg);`

---

## Section 4: Meet The Teams

**Purpose**: Allow users to explore the 7 subteams without leaving the page.

| Attribute | Value |
| :--- | :--- |
| **Height** | 100vh (content stays in view) |
| **Interaction** | Accordion Slider (see `gimmicks.md`) |

**Teams (Example):**
1.  Aerodynamics
2.  Structures
3.  Propulsion
4.  Manufacturing
5.  Electronics / Avionics
6.  Payload
7.  Business / Operations

**Panel Content (Expanded):**
- Team Lead Photo (circular)
- Team Name (H3)
- Short Description (1-2 sentences)
- "Learn More" link (optional, for future deep-dive page)

---

## Section 5: Call to Action (Social)

**Purpose**: Invite users to follow the team's journey.

| Attribute | Value |
| :--- | :--- |
| **Height** | 50vh |
| **Background** | Full-bleed team photo with a light overlay (`rgba(255,255,255,0.7)`) |
| **Content** | Headline + Instagram / LinkedIn icons |

**Headline**: "Follow Our Journey"
**Icons**: Large, simple, side-by-side. Link to respective social profiles.

---

## Section 6: Footer

**Purpose**: Standard navigation and legal.

| Attribute | Value |
| :--- | :--- |
| **Height** | Auto |
| **Background** | Deep Navy (`#1A2A40`) |
| **Content** | Logo, copyright, links to About/Contact (if separate pages exist) |

**Styling:**
- Text: White/Light Gray
- Links: Accent Gold on hover

---

## Transition Summary

| From | To | Transition Style |
| :--- | :--- | :--- |
| Hero | Who We Are | Cross-fade (last frame blends into background) |
| Who We Are | Polaroid Gallery | Subtle gradient bleed (white to off-white) |
| Polaroid Gallery | Meet The Teams | "River" of photos flows off-screen, accordion appears |
| Meet The Teams | Call to Action | Clean cut with generous whitespace |
| Call to Action | Footer | Standard scroll |

---

## Responsive Considerations

- **Hero**: Image sequence still works, but text overlays may need size adjustments.
- **Polaroid Gallery**: Consider a vertical stack on mobile (swipe-able carousel).
- **Accordion**: May convert to a simple expandable list on narrow screens.
