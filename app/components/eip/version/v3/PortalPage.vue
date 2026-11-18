<script setup>
import PortalHome from './PortalHome.vue'
import PortalShell from './PortalShell.vue'
import { usePortal, usePortalDialog } from '~/features/eip/version/v3/state'
import '~/assets/css/eip-version-v3.css'

defineProps({ optimized: Boolean })

const portal = usePortal()
const { request } = usePortalDialog()
const storageKey = 'eip-version-v3-demo'

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null')
    if (saved && typeof saved === 'object') {
      const appearanceRevision = portal.value.appearanceRevision
      const settings = { ...portal.value.settings, ...saved.settings }
      if (saved.appearanceRevision !== appearanceRevision) settings.theme = false
      Object.assign(portal.value, saved, { appearanceRevision, settings })
    }
  } catch { /* An unavailable local store can use the demo defaults. */ }

  watch(portal, (value) => {
    try { localStorage.setItem(storageKey, JSON.stringify(value)) } catch { /* Keep changes for this tab. */ }
  }, { deep: true })
})

onBeforeUnmount(() => { request.value = null })
</script>

<template>
  <PortalShell :optimized="optimized">
    <PortalHome />
  </PortalShell>
</template>
