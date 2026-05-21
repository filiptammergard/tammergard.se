# tammergard.se

Filip Tammergård's personal website and blog, built with [Docusaurus](https://docusaurus.io/).

Available at [tammergard.se](https://tammergard.se).

## Requirements

- Node.js 24+
- pnpm 10+

## Development

```sh
pnpm install
pnpm start
```

The site is served at [http://localhost:3000](http://localhost:3000) with hot reload.

To preview the Swedish locale, run `pnpm start -- --locale sv`.

## Scripts

- `pnpm start` — start the dev server
- `pnpm build` — build the static site to `build/`
- `pnpm serve` — serve the production build locally
- `pnpm typecheck` — run TypeScript
- `pnpm format` — format with Prettier
- `pnpm review` — install, format-check, typecheck, and build (used in CI)

## Structure

- `blog/` — blog posts as MDX, one folder per post
- `src/` — React components, hooks, and custom CSS
- `static/` — files copied as-is to the site root
- `i18n/sv/` — Swedish translations
- `docusaurus.config.ts` — site configuration
