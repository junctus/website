# junctus-website

Marketing/spec site for **Junctus** — the privacy overlay network built on the
[neo](../neo) engine. Single-page Next.js app; all routes prerender statically.

## Design

Terminal-specification aesthetic: near-black, phosphor green accents, amber
for warnings/research, CRT scanlines. Type is Instrument Serif (display),
Newsreader (body), Fragment Mono (labels/code) via `next/font`.

Content is sourced from `neo/docs/` (ARCHITECTURE, PROTOCOL, THREAT_MODEL,
MILESTONES) — the honest-limits framing is deliberate and should survive
future edits.

## Develop

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```

## Notes

- `https://github.com/junctus/neo` is a placeholder repo URL — update `REPO`
  in `src/app/page.tsx` when the code has a public home.
- Scroll-reveal animations are gated behind an `html.js` class, so the page
  is fully readable without JavaScript.
