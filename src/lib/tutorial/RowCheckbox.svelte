<script lang="ts">
  let {
    checked,
    indeterminate = false,
    label,
    onchange,
  }: {
    checked: boolean
    indeterminate?: boolean
    label: string
    onchange: (checked: boolean) => void
  } = $props()

  let input = $state<HTMLInputElement | null>(null)

  // `indeterminate` is a DOM property, not an attribute
  $effect(() => {
    if (input) input.indeterminate = indeterminate
  })
</script>

<input
  bind:this={input}
  type="checkbox"
  {checked}
  aria-label={label}
  onchange={(event) => onchange(event.currentTarget.checked)}
/>
