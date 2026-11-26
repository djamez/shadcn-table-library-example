# Shadcn Table — Svelte 5 examples

A standalone SvelteKit app containing **every example** from the
[Shadcn Table](https://www.shad-table.dev) library, implemented in **Svelte 5**
only, with [shadcn-svelte](https://www.shadcn-svelte.com) components and the
native [`@tanstack/svelte-table`](https://tanstack.com/table) v9 adapter.

It is a proof of concept: the same tables, filtering, sorting, pagination,
expansion, selection, editing and server-style flows as the React docs, running
on TanStack Table v9's native Svelte adapter — no `@tanstack/table-core` and no
custom adapter files.

## Stack

- Svelte 5 (runes) + SvelteKit 3
- Tailwind CSS 4 + shadcn-svelte components (bits-ui)
- `@tanstack/svelte-table@^9` — `createTable`, `tableFeatures`, atoms
- `@lucide/svelte`, `date-fns`, `@internationalized/date`, `sortablejs`

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

Other commands:

```bash
npm run check        # svelte-check, 0 errors
npm run build        # adapter-node production build
npm run preview      # preview the build
npm run smoke        # Playwright: every route renders with no console errors
npm run interactions # Playwright: search, pagination, tree, edit, logs, pinning…
```

`smoke` and `interactions` expect a server on `BASE_URL`
(default `http://localhost:5188`, matching `npm run dev -- --port 5188`), e.g.:

```bash
npm run dev -- --port 5188 &
npm run smoke
npm run interactions
```

## Layout

```
src/
  app.css                     shadcn-svelte theme (nova preset, neutral base)
  lib/
    table-v9-features.ts      shared v9 features object (all stock features)
    utils.ts                  cn() + shadcn-svelte helper types
    components/ui/            shadcn-svelte primitives + shared icon components
    examples/<example>/       one folder per example, same file layout as the
                              library's Svelte ports (demo, table, columns, cells)
    examples.remote.ts        prerender() catalog query for the shell/gallery
  routes/
    +layout.svelte            docs-style shell with a sidebar
    +page.svelte              gallery of all examples
    <example>/+page.svelte    renders that example's demo component
scripts/
  smoke.mjs                   all-route SSR + console error check
  interactions.mjs            browser interaction checks
```

## Examples

- **Basics** — Data Table, Summary / KPI, Comparison, Utility, Mobile Cards
- **Filtering** — Toolbar Filter, Filter State Shape, Filter Toolbar, Params
  Filter, Deployments, Logs (expandable rows and side panel)
- **Structure** — Tree Table (org chart, product variants, detail card), Grouped,
  Pivot, Master Detail, Tree Selection, Tree Reorder, Reorderable rows
- **Editing** — Editable, Inventory Allocation, Excel-like Spreadsheet
- **Columns** — Column Pinning, Resizable / Reorderable, Conditional Formatting,
  Heatmap
- **Interaction** — Async Row Actions, Animated Icons, Live Status, Infinite Scroll
- **Server** — SSR pagination, SSR filtering, SSR sort + filter + pagination
- **Export** — Export Configuration, Export Selected, Density & Export
- **Production Dashboard** — progress bars, conditional rules and sparklines
- **Previously v8-only** — Anomaly Investigation (metrics and finance),
  Change Review, Cohort Retention, CRM Employees, CRM Employees (multi-filter),
  CSV Import, Draft Rows, Empty / Error / Loading states, File Browser,
  Job Queue, Permissions Matrix, Schedule Matrix, Split Detail

## v9 notes worth knowing

- **State is read through atoms.** `table.atoms.<slice>.get()` replaces
  `table.getState()`, and a read inside a template, `$derived` or `$effect`
  tracks the slice. `table.store.get()` is only for whole-state reads.
- **Options stay live through getters.** `get data()`, `get columns()` and the
  `state` getters are how rune changes reach the table. Controlled slices pair a
  getter with the matching `onXChange` callback.
- **Demos own their rows in `$state`.** The adapter re-syncs options on every
  update; a plain array is re-proxied each time, which makes row-model inputs
  look changed and fires `autoReset*` (page index, expanded rows). Keeping the
  rows in `$state` keeps their identity stable.
- **Column pinning uses `start` / `end`** instead of `left` / `right`.
- **`FlexRender` takes the header or cell** — `<FlexRender {header} />` — instead
  of the v8 `content` / `context` props.
- **Filter toolbar meta is per table.** v9 has no global `ColumnMeta`
  augmentation, so that example registers `columnMeta: metaHelper<…>()` on its
  own features object.
- **SSR examples use remote functions.** Each table calls a `query` from
  `src/lib/examples/ssr/queries.remote.ts` with its URL state, so filtering,
  sorting and slicing run on the server and the first page is rendered during
  SSR. Remote functions are enabled with `experimental.remoteFunctions` and
  `compilerOptions.experimental.async` in `vite.config.ts`. Route titles come
  from a `prerender` remote function (`src/lib/examples.remote.ts`) — there are
  no `+page.ts` loaders.
- **URL state is namespaced per table** (`?pagination.page=1`,
  `?filter.role=Viewer`) because three SSR examples share one route. The
  `useUrlSearch` helper uses the History API; in a real app, read
  `page.url.searchParams` and call `goto` instead.
- **`$lib` alias.** SvelteKit 3 renamed its built-in alias to `#lib`. The ports
  and shadcn-svelte components still use `$lib`, so `vite.config.ts` maps it to
  `src/lib` via Vite's `resolve.alias`.
