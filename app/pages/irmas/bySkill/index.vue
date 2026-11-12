<script setup>
import { demoUser } from '~/data/demo'

definePageMeta({ layout: 'optimized', legacyPath: '/irmas' })
useHead({ title: 'MyIRMAS | IRMAS' })
</script>

<template>
  <section aria-labelledby="optimized-home-title">
    <header class="optimized-page-heading">
      <h1 id="optimized-home-title">MyIRMAS</h1>
    </header>

    <div class="optimized-home-grid grid gap-6">
      <section class="optimized-panel optimized-home-profile" aria-labelledby="optimized-profile-title">
        <h2 id="optimized-profile-title" class="optimized-section-label">登入人員</h2>
        <p class="optimized-profile-name">{{ demoUser.name }}</p>
        <p class="optimized-muted">{{ demoUser.division }} / {{ demoUser.department }} / {{ demoUser.team }}</p>
      </section>

      <section class="optimized-panel optimized-home-computers" aria-labelledby="optimized-home-computers-title">
        <h2 id="optimized-home-computers-title" class="optimized-section-label">個人終端電腦</h2>
        <div class="flex flex-wrap items-end justify-between gap-4">
          <p class="optimized-device-count"><strong>1</strong> 台</p>
          <NuxtLink to="/irmas/bySkill/computers" class="optimized-button optimized-primary-button">檢視個人電腦</NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>
