<script lang="ts">
  let {
    code,
    filename,
    language = 'svelte',
  }: { code: string; filename?: string; language?: string } = $props()

  let copied = $state(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  async function copy() {
    try {
      await navigator.clipboard.writeText(code.trim())
      copied = true
      clearTimeout(timer)
      timer = setTimeout(() => (copied = false), 1500)
    } catch {
      // clipboard blocked; leave the label alone
    }
  }

  $effect(() => () => clearTimeout(timer))
</script>

<div class="overflow-hidden rounded-lg border bg-muted/30">
  <div class="flex items-center justify-between gap-3 border-b px-3 py-1.5">
    <span class="truncate font-mono text-xs text-muted-foreground">
      {filename ?? language}
    </span>
    <button
      type="button"
      class="shrink-0 rounded px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
      onclick={copy}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  </div>
  <pre class="max-h-[540px] overflow-auto p-4 text-xs leading-relaxed"><code
      >{code.trim()}</code
    ></pre>
</div>
