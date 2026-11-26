import { prerender } from '$app/server'

import { examples } from '$lib/examples/catalog'

// Static catalog, resolved once at build time and reused by the layout and gallery
export const getExamples = prerender(async () => examples, {
  // The routes are dynamic, so the catalog may be requested at runtime too
  dynamic: true,
})
