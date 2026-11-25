import type { PageLoad } from './$types'

export const load: PageLoad = () => ({
  title: 'Production dashboard' as const,
})
