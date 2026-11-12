<script setup>
const navItems = [
  { label: '下載專區' },
  { label: 'MyIRMAS', to: '/irmas' },
  { label: '電腦資料', to: '/irmas/computers' },
  { label: '資安公告' },
  { label: '報表中心', to: '/irmas/reports/service-ports' },
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
  <div class="legacy-frame mx-auto">
    <header class="legacy-chrome mx-auto">
      <div class="legacy-banner relative overflow-hidden">
        <NuxtLink to="/irmas" class="legacy-brand-link absolute" aria-label="IRMAS 資訊資源管理系統首頁" />
        <button type="button" class="legacy-button legacy-role absolute" @click="showDemoNotice('角色切換')">
          角色切換
        </button>
      </div>

      <nav class="legacy-nav flex" aria-label="系統導覽">
        <template v-for="item in navItems" :key="item.label">
          <NuxtLink v-if="item.to" :to="item.to" class="legacy-tab">{{ item.label }}</NuxtLink>
          <button v-else type="button" class="legacy-tab" @click="showDemoNotice(item.label)">{{ item.label }}</button>
        </template>
      </nav>
    </header>

    <main class="bg-white">
      <slot />
    </main>

    <footer class="legacy-chrome mx-auto text-center">
      <div class="legacy-copyright flex flex-col justify-center">
        <p>Copyright ©2020 Chunghwa Telecom Co., Ltd.</p>
        <p>版權所有：中華電信股份有限公司</p>
      </div>
      <p class="legacy-warning">您現在存取的是中華電信股份有限公司之資訊系統，所有的系統使用情形將會受到監控與記錄， 使用本系統表示您已同意被監控與記錄。 如未經授權使用本系統，本公司將保留法律追訴權。</p>
    </footer>

    <LegacyDialog ref="dialog">
      <template #title>{{ dialogTitle }}</template>
      <p>目前為介面展示，這個功能沒有連接正式系統。</p>
    </LegacyDialog>
  </div>
</template>
