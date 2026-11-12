<script setup>
import '~/assets/css/optimized.css'

const route = useRoute()
const navItems = [
  { label: '下載專區' },
  { label: 'MyIRMAS', to: '/irmas/bySkill' },
  { label: '電腦資料', to: '/irmas/bySkill/computers' },
  { label: '資安公告' },
  { label: '報表中心', to: '/irmas/bySkill/reports/service-ports' },
  { label: '權限管理' },
  { label: '電腦管理' },
]

const dialog = ref(null)
const dialogTitle = ref('')

function showDemoNotice(label) {
  dialogTitle.value = label
  dialog.value.open()
}
</script>

<template>
  <div class="optimized-frame">
    <header class="optimized-header">
      <div class="optimized-container optimized-masthead flex flex-wrap items-center justify-between gap-3">
        <NuxtLink to="/irmas/bySkill" class="optimized-brand flex flex-wrap items-baseline gap-x-3">
          <span>IRMAS</span>
          <span>資訊資源管理系統</span>
        </NuxtLink>
        <div class="flex flex-wrap items-center gap-2">
          <NuxtLink :to="route.meta.legacyPath" class="optimized-button optimized-text-button">原版介面</NuxtLink>
          <button type="button" class="optimized-button" @click="showDemoNotice('角色切換')">角色切換</button>
        </div>
      </div>

      <nav class="optimized-navigation" aria-label="系統導覽">
        <div class="optimized-container flex flex-wrap items-center gap-1">
          <template v-for="item in navItems" :key="item.label">
            <NuxtLink v-if="item.to" :to="item.to" class="optimized-tab">{{ item.label }}</NuxtLink>
            <button v-else type="button" class="optimized-tab" @click="showDemoNotice(item.label)">{{ item.label }}</button>
          </template>
        </div>
      </nav>
    </header>

    <main class="optimized-container optimized-main">
      <slot />
    </main>

    <footer class="optimized-footer">
      <div class="optimized-container">
        <p class="font-bold">版權所有：中華電信股份有限公司</p>
        <p>Copyright ©2020 Chunghwa Telecom Co., Ltd.</p>
        <p class="mt-3">您現在存取的是中華電信股份有限公司之資訊系統，所有的系統使用情形將會受到監控與記錄， 使用本系統表示您已同意被監控與記錄。 如未經授權使用本系統，本公司將保留法律追訴權。</p>
      </div>
    </footer>

    <LegacyDialog ref="dialog">
      <template #title>{{ dialogTitle }}</template>
      <p>目前為介面展示，這個功能沒有連接正式系統。</p>
    </LegacyDialog>
  </div>
</template>
