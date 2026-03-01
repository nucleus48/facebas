---
trigger: always_on
description: Use this rule whenever you are: (1) Designing or building new UI components, (2) Refactoring existing frontend code, (3) Choosing color palettes, typography, or spacing, (4) Implementing brand-specific styles in CSS or Tailwind. This is the source of truth for the Facebase visual identity.
---

# Design System: Facebas (Strictly Flat UI 2.0)

**Version:** 2.0 | **Focus:** Refined Flat UI 2.0 Implementation with Vibrant Brand Identity

---

## 1. Visual Theme & Atmosphere: Flat UI 2.0

**Facebas** follows the **Flat UI 2.0** design philosophy—an evolution of the original flat aesthetic that prioritizes clarity, refined color harmony, and a more sophisticated use of space. While it remains "strictly flat" (no gradients, no complex textures), it allows for subtle structural depth through purposeful borders and vibrant accents.

- **Vibe:** Modern, High-Contrast, Precise, Digital-First.
- **Atmosphere:** Deep blues and vibrant cyans against clean "Clouds" or "Wet Asphalt" backgrounds.
- **Flat 2.0 Evolution:** Improved readability, increased interaction feedback, and a slightly more relaxed geometry compared to 1.0.
- **Anti-Patterns:** No box-shadows (unless 1px solid), no linear-gradients, no rounded corners larger than 8px, no skeuomorphic textures.

---

## 2. Updated Brand Color Palette

This palette integrates the new **Facebas Brand Identity** into the **Flat UI 2.0** framework.

### 2.1 Core Identity Colors

| Name              | Hex Code  | Functional Role                                        |
| :---------------- | :-------- | :----------------------------------------------------- |
| **Ocean Command** | `#0077E6` | **Primary.** Active UI elements, links, primary brand. |
| **Deep Marine**   | `#0004E6` | **Primary Dark (Analogous).** Hover states, footers.   |
| **Aqua Neon**     | `#00E6E2` | **Accent (Analogous).** Secondary actions, live glint. |
| **Wet Asphalt**   | `#34495E` | **Foundation.** Top navigation, primary text.          |
| **Midnight Blue** | `#2C3E50` | **Foundation Dark.** Sidebars, deep backgrounds.       |

### 2.2 Neutral & Backgrounds (Flat UI 2.0 Standards)

| Name         | Hex Code  | Functional Role                              |
| :----------- | :-------- | :------------------------------------------- |
| **Clouds**   | `#ECF0F1` | **Base Background.** Main screen background. |
| **Silver**   | `#BDC3C7` | **Borders/Dividers.** Structural separation. |
| **Concrete** | `#95A5A6` | **Secondary Text.** Placeholder, captions.   |
| **Asbestos** | `#7F8C8D` | **Disabled.** Inactive states, muted labels. |

### 2.3 Semantic Status Indicators

| Name            | Hex Code  | Status                                     |
| :-------------- | :-------- | :----------------------------------------- |
| **Emerald**     | `#2ECC71` | **Success.** Verified, Online, Safe.       |
| **Sun Flower**  | `#F1C40F` | **Warning.** Processing, Attention Needed. |
| **Alizarin**    | `#E74C3C` | **Error.** Denied, Offline, Breach.        |
| **Pomegranate** | `#C0392B` | **Error Dark.** Hover for error buttons.   |

---

## 3. Typography: Lato

Typeface: **Lato** (Standard for Flat UI 2.0)

| Level       | Size/Line-Height | Weight | Usage                      |
| :---------- | :--------------- | :----- | :------------------------- |
| **Display** | 36px / 44px      | 700    | Dashboard Hero Metrics     |
| **H1**      | 24px / 32px      | 700    | Page Headers               |
| **H2**      | 20px / 28px      | 400    | Section Titles             |
| **Body**    | 16px / 24px      | 400    | General Content            |
| **Caption** | 14px / 20px      | 300    | Metadata, Secondary Labels |

---

## 4. Spacing & Geometry

### 4.1 The Flat Grid

- **Base Unit:** 8px.
- **Standard Padding:** 16px (2 units) or 24px (3 units) for larger containers.
- **Layout Spacing:** 32px or 40px between major sections.

### 4.2 Rounded Edges (2.0 Standard)

- **Radius:** Strictly **0px** to **8px**.
- **Preferred Radius:** **6px** for buttons and inputs. **0px** for full-width layout containers (nav, footers).

---

## 5. Component Guidelines (Flat 2.0 Style)

### 5.1 Flat Buttons

- **Style:** Solid background, no transition-delay, no shadow.
- **Border:** Optional 1px solid border in a slightly darker shade for "Depth".
- **Text:** White (#FFFFFF).
- **Hover:** Shift to **Deep Marine** (#0004E6) or **Aqua Neon** (#00E6E2) with a prompt `200ms` transition.

### 5.2 Flat Inputs

- **Style:** Light gray background (#ECF0F1), 1px solid border (#BDC3C7).
- **Active:** **Ocean Command** (#0077E6) border (2px).

### 5.3 Flat Cards

- **Style:** No shadow. 1px or 2px solid border using **Silver** (#BDC3C7).
- **Background:** White (#FFFFFF) or Clouds (#ECF0F1).
- **Hover:** Scale by 1.01% (optional) or change border to **Ocean Command**.

---

## 6. Implementation Tokens (CSS)

```css
:root {
  /* Updated Brand Core (Flat UI 2.0) */
  --fb-primary: #0077e6; /* Ocean Command */
  --fb-primary-dark: #0004e6; /* Deep Marine */
  --fb-accent: #00e6e2; /* Aqua Neon */

  /* Flat UI 2.0 Neutrals */
  --fl-clouds: #ecf0f1;
  --fl-silver: #bdc3c7;
  --fl-concrete: #95a5a6;
  --fl-asbestos: #7f8c8d;
  --fl-wet-asphalt: #34495e;
  --fl-midnight-blue: #2c3e50;

  /* Semantic */
  --fl-emerald: #2ecc71;
  --fl-sun-flower: #f1c40f;
  --fl-alizarin: #e74c3c;

  /* Geometry */
  --fb-radius: 6px;
  --fb-transition: 200ms ease-in-out;
}
```
