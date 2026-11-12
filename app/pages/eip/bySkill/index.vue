<script setup>
import PortalPage from '~/components/eip/PortalPage.vue'
import '~/assets/css/eip-optimized.css'

definePageMeta({ layout: false })
useHead({ title: '員工資訊入口網站｜優化版' })
</script>

<template>
  <PortalPage optimized />
</template>
