# WashU Design-Build-Fly Website

The public website for the Washington University in St. Louis **Design-Build-Fly (DBF)** team.
It is built with [Next.js 14](https://nextjs.org/) (App Router) and deploys as a **static site**
to DreamHost (or any other static host).

If you just want to change some text, a photo, a team blurb, or a person's name — you do **not**
need to touch React. Everything editable lives in plain JavaScript object files under `data/`.
If you want to change how things *look* or *behave*, that's the component layer under `components/`
and `app/`.

---

## Table of Contents

1. [What This Project Is](#what-this-project-is)
2. [Prerequisites & First-Time Setup](#prerequisites--first-time-setup)
3. [Daily Commands](#daily-commands)
4. [Project Layout](#project-layout)
5. [The Easy Way: Editing JSON-style Data Files](#the-easy-way-editing-json-style-data-files)
6. [The Hard Way: Editing Components, Styles, and Routes](#the-hard-way-editing-components-styles-and-routes)
7. [Assets & Images](#assets--images)
8. [Building for Production](#building-for-production)
9. [Deployment](#deployment)
   - [DreamHost (our current host)](#dreamhost-our-current-host)
   - [Other static hosts](#other-static-hosts)
10. [Known Quirks & Gotchas](#known-quirks--gotchas)
11. [Troubleshooting](#troubleshooting)
12. [For Future AI Agents](#for-future-ai-agents)

---

## What This Project Is

DBF is a competition team that designs, builds, and flies a new R/C aircraft every year for the
AIAA Design-Build-Fly competition. This website:

- Introduces the team and mission (homepage)
- Shows off each subteam with its own page
- Displays past aircraft, sponsors, and leadership
- Includes a recruitment / "join" page
- Ships an internal `/photos` dashboard for quickly auditing image usage

**Key characteristics:**

- Next.js 14 (App Router, `/app` directory)
- React 18 + CSS Modules (no Tailwind, no UI framework)
- Framer Motion for animations (vendored locally — see [Known Quirks](#known-quirks--gotchas))
- GSAP for scroll/hero effects
- Lenis for smooth scrolling
- Configured as a **static export** (`output: 'export'` in `next.config.js`)

There is no backend, no database, and no server-rendered API routes at runtime. Everything that
ships to users is plain HTML/CSS/JS in the `out/` folder after a build.

---

## Prerequisites & First-Time Setup

### Required tools

| Tool   | Version        | Notes                                                                 |
| ------ | -------------- | --------------------------------------------------------------------- |
| Node.js | **22.x LTS** (or 20.x) | **Do not use Node 24.** It has a module-resolver bug that Next 14.2 trips over, causing `ERR_INVALID_PACKAGE_CONFIG` intermittently at build time. |
| npm    | 10+            | Ships with Node.                                                      |
| Git    | any modern     | For pushing changes to GitHub.                                        |

### Install Node 22 on macOS (Homebrew)

```bash
brew install node@22
# node@22 is keg-only; either link it globally:
brew link --overwrite node@22
# or just add it to PATH for this project:
echo 'export PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> ~/.zshrc
```

Verify:

```bash
node --version   # should print v22.x.x
npm --version
```

### Clone and install

```bash
git clone https://github.com/cifyr/DBFApp.git
cd DBFApp
npm install
```

That pulls **only** the direct deps listed in `package.json`. Next 14 ships most of its own
internals bundled under `node_modules/next/dist/compiled/`, so a normal install looks small
(~26 packages) — that's correct, not broken.

---

## Daily Commands

```bash
npm run dev       # start the dev server at http://localhost:3000
npm run build     # produce the static site in ./out
npm run start     # serve the previously built site (rarely used for static export)
npm run clean:runtime  # wipe the scratch .next/.next-dev symlink state
```

The `predev` and `prebuild` hooks run `scripts/prepare-next-runtime.mjs`, which symlinks
`.next` and `.next-dev` to a temp directory. This exists because the repo lives on an
iCloud-backed Desktop and iCloud sometimes corrupts the live build cache. Don't remove it.

---

## Project Layout

```text
app/                    Route entrypoints (App Router)
  layout.js             Root HTML/metadata shell
  page.js               Homepage (/)
  join/page.js          /join
  partners/page.js      /partners
  photos/page.js        /photos (internal image dashboard)
  team/[slug]/page.js   /team/aerodynamics, /team/structures, etc.
  globals.css           Site-wide CSS variables and resets

components/             Reusable React components
  Navbar, Footer, Hero, ...
  templates/            Sub-team page templates
    SubTeamHero.js, SubTeamContent.js, AdminContent.js
    TeamCarousel.js     The per-team image carousel
    TeamLegacy.js       "Legacy & Leadership" grid

data/                   ⭐ Main content layer (edit here for most updates)
  homeContent.js        Brand, homepage copy, nav, footer, sponsors, past aircraft
  teamData.js           Per-team title/slug/hero/about/carousel
  people.js             Presidents, team leads, admin leads
  photos.js             Central map of all image paths

public/                 Static assets served as-is
  images/               Site images, past aircraft photos, logos
  images/Carousel/      Per-team carousel images
  headshots/            People photos
  frames/               UI frame/border assets
  plane.svg             Homepage plane graphic

lib/framer-motion.js    Re-exports the vendored framer-motion build
vendor/framer-motion/   Local unpacked copy of framer-motion@11.18.2
                        (used because iCloud occasionally mangles node_modules)
framer-motion-11.18.2.tgz  Source tarball for the vendored copy (re-extract if vendor/ breaks)

scripts/
  prepare-next-runtime.mjs  Symlinks .next/.next-dev into /tmp to dodge iCloud sync
  clean-runtime-state.mjs   Removes those symlinks

next.config.js          Static export config
jsconfig.json           "@/..." path alias mapping to repo root
package.json            Commands + deps
out/                    Build output (gitignored, regenerated by npm run build)
```

Route map:

| URL                  | Source                    |
| -------------------- | ------------------------- |
| `/`                  | `app/page.js`             |
| `/join`              | `app/join/page.js`        |
| `/partners`          | `app/partners/page.js`    |
| `/photos`            | `app/photos/page.js`      |
| `/team/:slug`        | `app/team/[slug]/page.js` |

The `[slug]` values come from `data/teamData.js` (currently: `aerodynamics`, `structures`,
`propulsion`, `manufacturing`, `electrics`, `dev`, `admin`). `generateStaticParams` in the
page file pre-renders one HTML page per slug at build time.

---

## The Easy Way: Editing JSON-style Data Files

**Almost all content on the site is driven by four files in `data/`.** These are plain JS
objects — no React knowledge required. Edit them like JSON, with these conventions:

- Strings: `'text'` or `"text"` (single quotes are fine; escape with `\`).
- Lists: `[ 'first', 'second', 'third' ]`.
- Every item in a list or object **must end with a comma** (except the last).
- If you break the file, `npm run dev` will show a syntax error in the terminal telling you
  the exact line — fix that and save.

### `data/homeContent.js` — homepage + shared site chrome

Controls:

- Brand name, page title, meta description, logo path
- Homepage hero text and callouts
- Mission section copy
- "Who We Are" section
- **Past Aircraft** section (the `pastAircraft.aircraft` array — each entry is one plane card)
- "Meet the Crew" labels
- Social links (Instagram, LinkedIn)
- Footer contact info and links
- Sponsor and join CTA copy
- Navigation labels

**Adding a new past aircraft** (example):

```js
createLegacyAircraft({
    name: 'Next Year Plane',
    year: '2026',
    placement: 'Placed ?th',
    rotation: -2,
    imageUrl: photos.home.legacy.plane2026,   // add key in data/photos.js first
    overview: 'Short paragraph about the aircraft.',
    competitionFocus: '...',
    buildGist: '...',
}),
```

### `data/teamData.js` — per-team pages

Each team object has:

- `slug` — URL segment (`/team/<slug>`); changing this changes the URL
- `title`, `description` — shown in the team hero
- `heroImage` — from `photos.teams.<slug>.hero`
- `about` — prose block(s) shown on the page
- `carousel` — `{ heading, maxHeight, items: [...] }` — each item has `src`, optional
  `displaySrc` (cleaner presentation copy), `alt`, `caption`, `description`

**Carousel caption layout (new):** the `TeamCarousel` component now auto-detects each
image's orientation. Vertical images get the caption to the right (50/50 split).
Horizontal images get a prominent caption below. You don't configure this — it just works.

### `data/people.js` — roster

Presidents, per-team leads (keyed by team slug), and admin leads. Each entry:

```js
{
  name: 'First Last',
  major: 'Mechanical Engineering',
  gradYear: '2026',
  email: 'someone@wustl.edu',
  image: photos.people.teams.aerodynamics.firstlast,  // or a direct path
}
```

Add a new person → add an entry in `data/people.js` → add their image path to
`data/photos.js` → drop the image file into `public/headshots/`.

### `data/photos.js` — single source of truth for image URLs

Change one path here to update everywhere it's referenced. Keep keys stable; moving a key
means hunting down its consumers.

---

## The Hard Way: Editing Components, Styles, and Routes

When data changes aren't enough, drop into code.

### Structure of a typical component

Each component is a pair:

```
components/Hero.js           React component (logic + JSX)
components/Hero.module.css   Scoped CSS (classes imported via `styles`)
```

CSS Modules mean class names are locally scoped — no global collisions. Shared tokens
(colors, spacing, typography) live in `app/globals.css` as CSS custom properties
(`--color-navy`, `--space-lg`, `--text-xl`, etc.). **Use those variables**; don't hardcode
colors if a matching token exists.

### Common "hard" changes

| Task                                     | Where to go                                                     |
| ---------------------------------------- | --------------------------------------------------------------- |
| Adjust colors, spacing, typography tokens | `app/globals.css`                                               |
| Change the nav bar behavior              | `components/Navbar.js` / `Navbar.module.css`                    |
| Change how team pages are composed       | `components/templates/SubTeamContent.js` + `Templates.module.css` |
| Change carousel behavior/layout          | `components/templates/TeamCarousel.js` + `Templates.module.css` |
| Change the homepage past-aircraft gallery | `components/PolaroidGallery.js`                                  |
| Add/remove a top-level route             | Create `app/<route>/page.js`                                     |
| Add a new subteam page                   | Add an entry to `data/teamData.js` with a new `slug` — the dynamic route picks it up automatically |
| Change page `<title>` / favicon          | `app/layout.js` + `data/homeContent.js`                          |

### Adding a route

```
app/newpage/page.js
```

Inside, export a default React component. For anything static, no extra config is needed —
`output: 'export'` will generate `/newpage/index.html` at build time.

### Dynamic routes

`app/team/[slug]/page.js` uses `generateStaticParams()` to pre-render all team slugs.
Any new slug added to `data/teamData.js` will be picked up automatically next build.

### Path alias

Import with `@/` to mean "repo root":

```js
import { teamData } from '@/data/teamData';
import Navbar from '@/components/Navbar';
```

### Framer Motion

**Import from `@/lib/framer-motion`, not `framer-motion` directly.**

```js
import { motion, AnimatePresence } from '@/lib/framer-motion';
```

`lib/framer-motion.js` re-exports from the vendored copy in `vendor/framer-motion/`, which
sidesteps an iCloud bug that occasionally nukes files inside `node_modules/framer-motion/`.
If you see `Module not found: Can't resolve './...mjs'` pointing at the vendor dir, the
vendored copy has been partially desynced — re-extract:

```bash
rm -rf vendor/framer-motion
tar -xzf framer-motion-11.18.2.tgz -C /tmp/
mv /tmp/package vendor/framer-motion
```

---

## Assets & Images

- **Put assets in `public/`.** Anything under `public/foo.png` is served as `/foo.png`.
- **Reference them in `data/photos.js`** — don't hardcode paths in components if you can avoid it.
- Supported: PNG, JPG/JPEG, SVG, WebP. GIFs work but bloat bundle size.
- Headshots go in `public/headshots/`; carousel images in `public/images/Carousel/`.
- There's no image-optimization pipeline in production because static export runs with
  `images: { unoptimized: true }`. Optimize/compress images before committing (TinyPNG,
  ImageOptim, squoosh.app).

---

## Building for Production

```bash
npm run build
```

On success this produces `out/` with:

- `index.html`, `404.html`
- one folder per route (`join/`, `partners/`, `photos/`, `team/<slug>/`, etc.)
- `_next/` — hashed JS/CSS bundles
- Copies of everything you put in `public/`

The whole folder is typically 20–30 MB depending on image assets.

**Do not commit `out/`** to git. It's regenerated every build. (It's already in `.gitignore`.)

---

## Deployment

### DreamHost (our current host)

DreamHost serves the `out/` folder as a plain static site over its shared hosting. Once
initial DNS and HTTPS are set up in the DreamHost panel, deploying a new version is just
"replace the files":

1. Build locally:
   ```bash
   npm run build
   ```
2. Upload the **contents of `out/`** (not the folder itself) to the DreamHost web root for
   this domain. You can use:
   - **SFTP** (Transmit, Cyberduck, FileZilla, or the CLI `sftp`/`rsync`)
   - **rsync over SSH** — fastest for incremental updates:
     ```bash
     rsync -avz --delete out/ USER@SERVER:/home/USER/YOUR_DOMAIN/
     ```
     (Use `--delete` only if you want removed files at source to also be removed on the server.)
3. Hard-refresh the live site to confirm.

Tips:

- DreamHost shared hosting serves whatever file it finds. `trailingSlash: true` in
  `next.config.js` means routes export as `foo/index.html`, which DreamHost resolves cleanly
  for URLs like `/team/aerodynamics/`.
- Cache headers are controlled by DreamHost's panel or an `.htaccess` file; the build itself
  doesn't emit one.

### Other static hosts

The `out/` directory is a standard static-site bundle and will work anywhere:

| Host                | How                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------- |
| **Netlify**         | Connect the repo → set build command `npm run build` and publish dir `out`.         |
| **Vercel**          | Works with zero config (just import the repo). Good match since it's Next.js.       |
| **GitHub Pages**    | Push `out/` to `gh-pages` branch or use `peaceiris/actions-gh-pages`.                |
| **Cloudflare Pages** | Build command `npm run build`, build output dir `out`.                              |
| **AWS S3 + CloudFront** | `aws s3 sync out/ s3://your-bucket --delete`, invalidate CloudFront.            |
| **Any cPanel / nginx / Apache host** | Upload `out/` contents to the web root. Nothing else to configure. |

Switching hosts does not require code changes — `output: 'export'` keeps the build portable.

---

## Known Quirks & Gotchas

### iCloud Desktop sync can corrupt `node_modules` and `vendor/`

If files inside `node_modules/<pkg>/` or `vendor/framer-motion/` disappear unexpectedly
(build errors like `Can't resolve './utils/can-animate.mjs'`), iCloud has partially synced
a stale tree. Fixes:

- For `node_modules`: `rm -rf node_modules && npm install`
- For `vendor/framer-motion`: re-extract from `framer-motion-11.18.2.tgz` (command above)
- Long-term: move the repo off the iCloud-synced Desktop folder, or disable Desktop syncing
  in System Settings → Apple Account → iCloud → iCloud Drive.

### `.next 2`, `.next-dev 3`, and similar duplicates

These are iCloud conflict copies. Safe to `rm -rf` any folder or symlink named
`.next N` / `.next-dev N` / `.next-stale-*`. They should never be committed.

### Node 24 is unsupported

Next 14.2's internal `require-hook.js` throws `ERR_INVALID_PACKAGE_CONFIG` on Node 24.
Stay on Node 20 or 22 until Next is bumped.

### `app/layout 2.js` is stale

Ignore it. The canonical layout is `app/layout.js`. If you feel tidy, delete the duplicate
after verifying git history doesn't depend on it.

### Static export ⇒ no server-side features

Because the site builds statically, you can't use:

- API routes (`app/api/...`) at runtime
- Server actions at runtime
- `revalidate`, `fetch` on the server during user requests
- Dynamic `cookies()`/`headers()` reads per-request

Anything that needs a backend would have to be a separate service.

---

## Troubleshooting

**`ERR_INVALID_PACKAGE_CONFIG` during build**
→ You're on Node 24. Downgrade to 20 or 22.

**`Module not found: Can't resolve './...mjs'` in `vendor/framer-motion`**
→ iCloud ate part of the vendored copy. Re-extract from the tarball.

**Blank page / weird 404 after deploy**
→ Check that you uploaded the *contents* of `out/` to the web root, not the `out` folder
itself. The file `index.html` should sit at the domain root.

**Team page shows the wrong image**
→ Check `data/photos.js` first, then `data/teamData.js`.

**Dev server won't start on port 3000**
→ Next will pick a different port automatically. Look at the URL it prints.

**Build succeeds but homepage looks broken in production only**
→ Hard-refresh (Cmd-Shift-R). DreamHost and CDNs cache aggressively.

---

## For Future AI Agents

See [`ai.readme`](./ai.readme) for a machine-oriented briefing intended to let another AI
agent make changes to this repo safely without a human walkthrough.
