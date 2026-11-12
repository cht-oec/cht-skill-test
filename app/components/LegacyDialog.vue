<script setup>
const dialog = ref(null)

function open() {
  dialog.value.showModal()
}

defineExpose({ open })
</script>

<template>
  <dialog ref="dialog" class="legacy-dialog" aria-label="模擬功能視窗">
    <h2 class="mb-3 bg-[#b4d7f7] px-3 py-2 text-base font-bold">
      <slot name="title" />
    </h2>
    <div class="px-3">
      <slot />
    </div>
    <form method="dialog" class="flex justify-end p-3">
      <button class="legacy-button" type="submit">關閉</button>
    </form>
  </dialog>
</template>
