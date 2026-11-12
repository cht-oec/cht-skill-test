<script setup>
import { userPath } from '~/data/demo'

definePageMeta({ layout: 'legacy' })
</script>

<template>
  <section class="legacy-home font-bold" aria-label="MyIRMAS 首頁">
    <p>※ 登入人員：{{ userPath }}</p>
    <p class="legacy-home-notice mt-4">
      ※ 提示訊息：個人終端電腦共有 1 台，詳細資料請
      <NuxtLink to="/irmas/computers" class="text-[#0000ff] underline">按此</NuxtLink>
      前往檢視。
    </p>
  </section>
</template>
