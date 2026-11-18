<script setup>
import PortalPage from '~/components/eip/version/v2/PortalPage.vue'

// 原型為 /eip；V2 的設計、額外參考來源與狀態僅限本版本。
definePageMeta({ layout: false })
useHead({ title: '員工資訊入口網站｜V2' })
</script>

<template>
  <PortalPage />
</template>
