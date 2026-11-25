import type { PageLoad } from './$types'

export const load: PageLoad = () => ({
  title: 'SSR' as const,
})
