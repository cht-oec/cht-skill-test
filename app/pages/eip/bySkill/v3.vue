<script setup>
import PortalPage from '~/components/eip/PortalPage.vue'
import '~/assets/css/eip-optimized.css'
import '~/assets/css/eip-themed.css'
import '~/assets/css/eip-v3.css'

definePageMeta({ layout: false })
useHead({ title: '員工資訊入口網站｜橘色主題 V3' })
</script>

<template>
  <PortalPage optimized class="eip-v3" />
</template>
