<script setup>
import { demoComputer, userPath } from '~/data/demo'
import { downloadCsv } from '~/utils/downloadCsv'

definePageMeta({ layout: 'optimized', legacyPath: '/irmas/computers' })
useHead({ title: '個人電腦列表 | IRMAS' })

const actions = [
  '變更場域',
  '申請安全查核項目豁免',
  '刪除安全查核項目豁免',
  '申請Java授權豁免',
  '刪除Java授權豁免',
  '申請軟體EOS豁免',
  '匯出資安檢核表',
  '遠端移除Agent',
]

const dialog = ref(null)
const dialogTitle = ref('')
const dialogMessage = ref('')

function showDetails(title, message) {
  dialogTitle.value = title
  dialogMessage.value = message
  dialog.value.open()
}

function handleAction(action) {
  if (action === '匯出資安檢核表') {
    downloadCsv('資安檢核表.csv', [
      ['資產ID', '電腦名稱', 'IP位址', '作業系統', 'Agent版本'],
      [demoComputer.assetId, demoComputer.name, demoComputer.ip, demoComputer.operatingSystem, demoComputer.agentVersion],
    ])
    return
  }

  showDetails(action, `模擬操作對象為 ${demoComputer.name}（${demoComputer.assetId}）。目前為介面展示。`)
}
</script>

<template>
  <section aria-labelledby="optimized-computers-title">
    <header class="optimized-page-heading">
      <h1 id="optimized-computers-title">個人電腦列表</h1>
      <p class="optimized-muted">{{ userPath }}</p>
    </header>

    <div class="optimized-panel">
      <p id="optimized-computers-scroll" class="optimized-scroll-hint">左右捲動可查看完整欄位與操作。</p>
      <div class="optimized-table-scroll" role="region" aria-labelledby="optimized-computers-title" aria-describedby="optimized-computers-scroll" tabindex="0">
        <table class="optimized-table optimized-computers" aria-labelledby="optimized-computers-title">
          <thead>
            <tr>
              <th scope="col">IP位址</th>
              <th scope="col">電腦名稱</th>
              <th scope="col">資產ID</th>
              <th scope="col">作業系統 <span class="optimized-muted block">(場域名稱)</span></th>
              <th scope="col">Agent版本</th>
              <th scope="col">更新時間</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button type="button" class="optimized-button optimized-text-button optimized-ip" @click="showDetails('電腦資料', `${demoComputer.ip}　${demoComputer.name}　${demoComputer.assetId}`)">{{ demoComputer.ip }}</button>
              </td>
              <td class="font-bold">{{ demoComputer.name }}</td>
              <td class="tabular-nums">{{ demoComputer.assetId }}</td>
              <td>
                <span class="block">{{ demoComputer.operatingSystem }}</span>
                <span class="optimized-muted block">{{ demoComputer.location }}</span>
              </td>
              <td class="tabular-nums">{{ demoComputer.agentVersion }}</td>
              <td class="tabular-nums"><time :datetime="demoComputer.updatedAt.replace(' ', 'T')">{{ demoComputer.updatedAt }}</time></td>
              <td class="optimized-computer-actions">
                <div class="grid grid-cols-2 gap-2">
                  <button v-for="action in actions" :key="action" type="button" class="optimized-button" @click="handleAction(action)">{{ action }}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <LegacyDialog ref="dialog">
      <template #title>{{ dialogTitle }}</template>
      <p>{{ dialogMessage }}</p>
    </LegacyDialog>
  </section>
</template>
