# Grassy Theme Redesign — 2026-10-10

## Summary
Redesigned the entire site around a "grassy" meadow theme using the materials
in `src/assets/meterials/` (fire-user mascots, glossy folder & keycap icons).

## New palette
- Deep moss dark: `#0b150e` (replaces `#0c0c0b` / `#0e0e0d`)
- Grass accent: `#22b34a` (bright), `#2c8a4b` (mid), `#37a558` / `#8ed9a5` / `#5ed88a` (support)
- Light meadow: `#f1f6ec` background, `#e6f0dd` alt, `#eaf7e2` soft cards

## New utilities in globals.css
- `.grass-blob` + `.grass-blob-a/b/c` — drifting iridescent light blobs
- `.grass-grid` — hairline hero grid overlay

## Materials used
- `fire users/1.png` — hero mascot bottom-right
- `fire users/3.png`, `4.png` — hero companions + AboutDrawer manifesto portrait
- `fire users/2.png`, `3.png`, `4.png` — FloatingJewelShowcase mood switcher (Ember/Jade/Flare)
- `icons/help.png` — NavBar "Start a project" emblem
- `icons/folder-blue.png`, `folder glassy big.png`, `folder glassy small.png`, `ctrl.png`, `esc.png` — FolderProjectCards banners

## Sections reworked
HeroMonolog (rebuilt), NavBar (glass pill + help keycap), GapSection,
SuccessStoriesSection, ProblemSolutionSection (frosted grass disc),
FloatingJewelShowcase (fire-user exhibit), FolderProjectCards (folder banners),
ServicesSectionMonolog, ProcessSectionMonolog (grass-gradient PROCESS heading),
FaqSectionMonolog, FooterMonolog ("Grown from curiosity"),
AboutDrawer (mascot manifesto), CustomCursor, app pages (about/contact/projects).

## Housekeeping
- All emails point to `javaadde@gmail.com`

## Verification
- `npx tsc --noEmit` → pass
- `npm run build` → pass (12 routes)
- Dev server port 3417, visually inspected hero/work/footer; no console errors
