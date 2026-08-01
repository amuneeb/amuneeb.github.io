# amuneeb.github.io

Personal portfolio of **Muneeb Abbasi** — Principal AI Engineer.

Live at **[amuneeb.github.io](https://amuneeb.github.io)**.

## Stack

- [Next.js](https://nextjs.org) (App Router, static export)
- [Tailwind CSS](https://tailwindcss.com) v4 with project design tokens
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Architecture

| Path | Responsibility |
| --- | --- |
| `src/data/profile.ts` | All site content (typed). Editing the site means editing this file. |
| `src/data/corpus.ts` | Retrieval corpus for "Ask about my experience", derived from `profile.ts`. |
| `src/lib/retrieval.ts` | Client-side BM25 retrieval (unit-tested; `npm test`). |
| `src/config/site.ts` | Site-level configuration (URL, metadata). |
| `src/components/ui/` | Reusable primitives (`ButtonLink`, `InlineLink`, `ExternalLink`, `ImageLightbox`) — the single source of link/button styling. |
| `src/components/` | Section components (`ProjectCard`, `ExperienceItem`, `SkillGroup`, `SectionHeading`, `AskExperience`). |
| `src/app/` | App Router layout, page composition, and global styles. Accent design tokens live in `globals.css`. |
| `.github/workflows/deploy.yml` | CI: build and deploy to GitHub Pages. |

## Conventions

- Content never lives in components; components never hard-code copy or URLs.
- The accent color is defined once as `accent-*` design tokens in `globals.css`.
- Accessibility is a requirement: semantic landmarks, skip link, labelled sections and lists, screen-reader announcements for new-tab links, visible focus states, WCAG-AA contrast, and reduced-motion support.

## Development

```bash
npm install
npm run dev
```

Before committing:

```bash
npm run lint
npm run typecheck
npm run format:check
npm test
```

## Build

```bash
npm run build
```

Outputs a fully static site to `out/`.
