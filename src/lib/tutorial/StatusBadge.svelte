<script lang="ts">
  import { cn } from '$lib/utils.js'
  import type { Employee } from './data'

  let { status }: { status: Employee['status'] } = $props()

  const styles: Record<Employee['status'], string> = {
    Active: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    'On leave': 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    Inactive: 'bg-muted text-muted-foreground',
  }
</script>

<span
  class={cn(
    'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
    styles[status],
  )}
>
  {status}
</span>
