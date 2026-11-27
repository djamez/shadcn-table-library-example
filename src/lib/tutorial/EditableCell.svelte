<script lang="ts">
  let {
    value,
    editing,
    draft,
    onstart,
    ondraft,
    oncommit,
    oncancel,
  }: {
    value: string
    editing: boolean
    draft: string
    onstart: () => void
    ondraft: (value: string) => void
    oncommit: () => void
    oncancel: () => void
  } = $props()
</script>

{#if editing}
  <input
    class="h-7 w-full rounded border bg-transparent px-1.5"
    value={draft}
    oninput={(event) => ondraft(event.currentTarget.value)}
    onblur={oncommit}
    onkeydown={(event) => {
      if (event.key === 'Enter') oncommit()
      if (event.key === 'Escape') oncancel()
    }}
    {@attach (input) => input.focus()}
  />
{:else}
  <button
    type="button"
    class="w-full rounded px-1.5 py-0.5 text-left outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
    onclick={onstart}
  >
    {value}
  </button>
{/if}
