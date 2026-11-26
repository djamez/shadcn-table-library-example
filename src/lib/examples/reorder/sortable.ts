import Sortable from 'sortablejs'
import type { Attachment } from 'svelte/attachments'

type Options = {
  /** Called with the dragged item's old and new index in the rendered order */
  onMove: (oldIndex: number, newIndex: number) => void
  direction?: 'vertical' | 'horizontal'
}

/**
 * Svelte attachment that makes the children of a node draggable via their
 * `[data-drag-handle]`.
 *
 * SortableJS moves the DOM nodes itself, which leaves Svelte's keyed-each
 * bookkeeping out of sync with the DOM. Instead of patching those nodes back,
 * the tables commit the new order to their data and remount the list from
 * scratch (the `{#key}` wrapper), so Svelte always reconciles a fresh tree.
 */
export function sortable({
  onMove,
  direction = 'vertical',
}: Options): Attachment<HTMLElement> {
  return (node) => {
    let destroyed = false

    const instance = Sortable.create(node, {
      handle: '[data-drag-handle]',
      direction,
      animation: 150,
      onEnd({ oldIndex, newIndex }) {
        if (oldIndex === undefined || newIndex === undefined) return
        if (oldIndex === newIndex) return
        // Let SortableJS finish its own drop cleanup before the list unmounts
        queueMicrotask(() => {
          if (!destroyed) onMove(oldIndex, newIndex)
        })
      },
    })

    return () => {
      destroyed = true
      instance.destroy()
    }
  }
}
