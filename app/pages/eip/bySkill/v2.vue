<script setup>
import PortalPage from '~/components/eip/PortalPage.vue'
import '~/assets/css/eip-optimized.css'
import '~/assets/css/eip-v2.css'

definePageMeta({ layout: false })
useHead({ title: '員工資訊入口網站｜優化版 V2' })
</script>

<template>
  <PortalPage optimized class="eip-v2" />
</template>
