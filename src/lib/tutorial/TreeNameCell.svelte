<script lang="ts">
  let {
    name,
    depth,
    canExpand,
    expanded,
    ontoggle,
  }: {
    name: string
    depth: number
    canExpand: boolean
    expanded: boolean
    ontoggle: () => void
  } = $props()
</script>

<div class="flex items-center gap-1" style="padding-left: {depth * 1.25}rem">
  {#if canExpand}
    <button
      type="button"
      class="flex size-4 items-center justify-center text-muted-foreground"
      aria-label={expanded ? 'Collapse row' : 'Expand row'}
      onclick={ontoggle}
    >
      <span class="transition-transform" class:rotate-90={expanded}>▸</span>
    </button>
  {:else}
    <span class="w-4"></span>
  {/if}
  {name}
</div>
